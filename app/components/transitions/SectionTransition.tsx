"use client";

import { useEffect, useRef, type ReactNode } from "react";
import {
  TRANSITION_CONFIG,
  type ColorLayer,
} from "@/app/lib/transitions/config";
import {
  getRenderer,
  prefersReducedMotion,
  transitionDpr,
  viewportHeight,
} from "@/app/lib/transitions/renderer";

/**
 * Fase 3: transición por scroll entre dos secciones.
 *
 * Envuelve la sección de DESTINO. `from` son los selectores de lo que se
 * rompe (la sección de origen), en orden de pintado.
 *
 * Mecánica:
 * - El destino sube `length` altos de ventana (margen negativo) y queda
 *   encima del final del origen, oculto (`visibility: hidden`).
 * - Cuando su borde superior toca el de la ventana se queda fijo durante
 *   `length` ventanas. En ese momento el canvas WebGL compartido pasa a
 *   mostrar la captura del origen —en la misma posición— y el shader la va
 *   rompiendo: donde revela es transparente y se ve el destino, HTML real.
 * - Se fija con `position: sticky` (seguido de un espaciador de `length`
 *   ventanas; con `padding` no vale, sticky no entra en el relleno), NO con el pin de ScrollTrigger. En iOS el scroll va en el hilo
 *   del compositor y el pin por JS llega unos frames tarde: el destino se
 *   veía entrando por abajo mientras la rotura ya estaba en marcha. Sticky lo
 *   resuelve el navegador sin retraso. ScrollTrigger solo mide el progreso.
 * - El margen negativo y el espaciador se compensan: la página
 *   mide lo mismo que antes.
 * - Al volver con scroll hacia arriba todo se deshace en orden inverso.
 *
 * La captura (html-to-image) se hace al acercarse (`captureAhead`) y se
 * rehace tras un resize. Sin WebGL o con reduced-motion: fundido.
 */

type Props = {
  /** Selector(es) de lo que se rompe, en orden de pintado. */
  from: string | string[];
  /** Capas de color; por defecto las de `config.section`. */
  layers?: readonly ColorLayer[];
  /** Recorrido en altos de ventana. */
  length?: number;
  /**
   * Para un destino al final de la página (el footer): durante la transición
   * ocupa al menos `length` ventanas, con su propio fondo. Sin esto, si el
   * destino mide menos que la ventana, no quedaría scroll para completar la
   * rotura y debajo se vería un hueco del fondo de la página.
   */
  fillViewport?: boolean;
  /** Al cambiar, se reconfigura (p. ej. la ruta, si vive en un layout). */
  resetKey?: string;
  className?: string;
  children: ReactNode;
};

/**
 * Primer fondo totalmente opaco subiendo desde `el`: el color de base de la
 * captura. Los semitransparentes (la línea central es `bg-white/10`) no
 * sirven: dejarían ver el destino a través de lo que aún no se ha roto.
 */
function backgroundOf(el: Element | null): string {
  for (let n = el; n; n = n.parentElement) {
    const bg = getComputedStyle(n).backgroundColor;
    if (!bg || bg === "transparent") continue;
    // Alfa en `rgba(r, g, b, a)` o en `color(... / a)`, `oklab(... / a)`…
    const a =
      bg.match(/^rgba\(.*,\s*([\d.]+)\)$/)?.[1] ??
      bg.match(/\/\s*([\d.]+%?)\s*\)$/)?.[1];
    if (a === undefined || parseFloat(a) >= (a.endsWith("%") ? 100 : 1)) {
      return bg;
    }
  }
  return getComputedStyle(document.body).backgroundColor || "#000";
}

/**
 * html-to-image copia los estilos calculados de los elementos HTML, pero no
 * los de los hijos de un <svg>: los `stroke-*`/`fill-*` de Tailwind se
 * pierden y el anillo del dial salía vacío. Mientras dura la captura se pasan
 * a estilo inline (mismo valor que el calculado, así que no se ve ningún
 * cambio) y después se restaura el atributo original.
 */
const SVG_PAINT = ["fill", "stroke", "fill-opacity", "stroke-opacity", "opacity", "stroke-width"];

function inlineSvgPaint(roots: HTMLElement[]) {
  const restore: [Element, string | null][] = [];
  for (const root of roots) {
    root.querySelectorAll<SVGElement>("svg *").forEach((n) => {
      const cs = getComputedStyle(n);
      restore.push([n, n.getAttribute("style")]);
      for (const prop of SVG_PAINT) {
        n.style.setProperty(prop, cs.getPropertyValue(prop));
      }
    });
  }
  return () =>
    restore.forEach(([n, prev]) =>
      prev === null ? n.removeAttribute("style") : n.setAttribute("style", prev),
    );
}

type ModelViewerLike = HTMLElement & {
  loaded?: boolean;
  toBlob?: (options?: { idealAspect?: boolean }) => Promise<Blob>;
};

/** Elementos con WebGL propio que se capturan con su propio `toBlob()`. */
const isLive = (el: HTMLElement) => el.tagName === "MODEL-VIEWER";

async function grabLive(el: HTMLElement): Promise<ImageBitmap | null> {
  const mv = el as ModelViewerLike;
  if (!mv.loaded || !mv.toBlob) return null;
  try {
    return await createImageBitmap(await mv.toBlob({ idealAspect: false }));
  } catch {
    return null;
  }
}

export default function SectionTransition({
  from,
  layers = TRANSITION_CONFIG.section.layers,
  length = TRANSITION_CONFIG.section.length,
  fillViewport = false,
  resetKey,
  className,
  children,
}: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const fromKey = [from].flat().join("|");

  useEffect(() => {
    const outer = outerRef.current;
    const spacer = spacerRef.current;
    const pinEl = pinRef.current;
    if (!outer || !spacer || !pinEl) return;

    const cfg = TRANSITION_CONFIG.section;
    const selectors = fromKey.split("|");
    const owner = {};
    const reduce = prefersReducedMotion();
    let cancelled = false;
    let teardown: (() => void) | undefined;

    type Shot = { el: HTMLElement; image: CanvasImageSource; live: boolean };
    let shots: Shot[] | null = null;
    let capturing: Promise<void> | null = null;
    let background = "#000";
    const fontCSS = new Map<HTMLElement, string>();
    const texCanvas = document.createElement("canvas");

    const sources = () =>
      selectors
        .map((s) => document.querySelector<HTMLElement>(s))
        .filter((el): el is HTMLElement => !!el);

    const capture = () => {
      if (reduce || !getRenderer()) return Promise.resolve();
      capturing ??= (async () => {
        const { toCanvas, getFontEmbedCSS } = await import("html-to-image");
        const els = sources();
        const pixelRatio = transitionDpr();
        const next: Shot[] = [];
        const restoreSvg = inlineSvgPaint(els.filter((el) => !isLive(el)));
        try {
          for (const el of els) {
            if (isLive(el)) {
              const image = await grabLive(el);
              if (image) next.push({ el, image, live: true });
              continue;
            }
            if (!fontCSS.has(el)) fontCSS.set(el, await getFontEmbedCSS(el));
            next.push({
              el,
              image: await toCanvas(el, {
                pixelRatio,
                fontEmbedCSS: fontCSS.get(el),
                skipAutoScale: true,
              }),
              live: false,
            });
          }
        } finally {
          restoreSvg();
        }
        background = backgroundOf(els[0] ?? null);
        if (!cancelled) shots = next;
      })()
        .catch(() => {})
        .finally(() => {
          capturing = null;
        });
      return capturing;
    };

    /**
     * El logo 3D (<model-viewer>) no se puede capturar con html-to-image: su
     * WebGL va aparte. Se pide su propio fotograma con `toBlob()` y, como gira
     * sin parar, se refresca mientras la transición está cerca (`refreshLive`)
     * para que el fotograma congelado sea el de ese instante.
     */
    let refreshing = false;
    const refreshLive = async () => {
      if (refreshing || !shots) return;
      refreshing = true;
      try {
        for (const shot of shots) {
          if (!shot.live) continue;
          const image = await grabLive(shot.el);
          if (image) shot.image = image;
        }
      } finally {
        refreshing = false;
      }
    };

    /** Compone la textura: el origen tal y como estaba al empezar. */
    const compose = (shift: number) => {
      const renderer = getRenderer();
      if (!renderer || !shots) return;
      // Escala contra el alto ESTABLE del canvas, no contra innerHeight, que
      // cambia con la barra del navegador móvil.
      const { w, h, cssH } = renderer.resize();
      texCanvas.width = w;
      texCanvas.height = h;
      const ctx = texCanvas.getContext("2d")!;
      const sx = w / window.innerWidth;
      const sy = h / cssH;
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, w, h);
      for (const { el, image, live } of shots) {
        const r = el.getBoundingClientRect();
        // Desde el inicio de la transición el origen se desplaza 1:1 con el
        // scroll: `shift` lo devuelve a donde estaba en ese instante. El logo
        // lleva transform (escala), así que se usa su caja visible; el resto,
        // su tamaño de layout, que es el de la captura.
        ctx.drawImage(
          image,
          r.left * sx,
          (r.top + shift) * sy,
          (live ? r.width : el.offsetWidth) * sx,
          (live ? r.height : el.offsetHeight) * sy,
        );
      }
      renderer.setTexture(texCanvas);
    };

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/dist/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      // En móvil la barra del navegador aparece/desaparece al hacer scroll y
      // dispara `resize`: que ScrollTrigger no re-mida todo por eso (las
      // posiciones no cambian; todo va en `vh` estables).
      ScrollTrigger.config({ ignoreMobileResize: true });

      // Sin sección de origen en esta página no hay nada que romper: el
      // destino se queda tal cual (p. ej. el footer fuera de la portada).
      if (sources().length === 0) return;

      outer.style.marginTop = `-${length * 100}vh`;
      spacer.style.height = `${length * 100}vh`;
      pinEl.style.position = "sticky";
      pinEl.style.top = "0px";
      if (fillViewport) {
        pinEl.style.minHeight = `${length * 100}vh`;
        const first = pinEl.firstElementChild;
        if (first) pinEl.style.backgroundColor = getComputedStyle(first).backgroundColor;
      }

      /** Deja la sección como estaba, en su sitio y visible. */
      const restore = () => {
        outer.style.marginTop = "";
        spacer.style.height = "";
        pinEl.style.position = "";
        pinEl.style.top = "";
        pinEl.style.minHeight = "";
        pinEl.style.backgroundColor = "";
        pinEl.style.visibility = "";
        pinEl.style.opacity = "";
        getRenderer()?.release(owner);
      };

      // Progreso actual (0 → 1). Sale directo del trigger —en `onUpdate` y en
      // `onRefresh`—, sin tween intermedio: un tween con scrub se reinicia a 0
      // en cada refresh y no se recupera hasta el siguiente evento de scroll.
      // El suavizado ya lo pone Lenis.
      let progress = 0;
      // Lo que dura el sticky, medido en píxeles reales: en iOS `100vh` es el
      // alto con la barra oculta y no coincide con `innerHeight`.
      const distance = () => spacer.offsetHeight;
      // Se rellena tras crear el tween; `apply` puede llamarse antes.
      const ref: { st?: ScrollTrigger } = {};

      const composeNow = () => {
        const shift = ref.st ? ref.st.scroll() - ref.st.start : 0;
        compose(shift);
      };

      const apply = () => {
        const p = progress;
        const renderer = getRenderer();
        pinEl.style.visibility = p > 0 ? "visible" : "hidden";

        if (p <= 0 || p >= 1) {
          renderer?.release(owner);
          pinEl.style.opacity = "";
          return;
        }

        const fade = () => {
          pinEl.style.opacity = String(p);
        };
        if (reduce || !renderer) return fade();

        if (!renderer.isOwner(owner)) {
          if (!shots) {
            // Scroll muy rápido: aún no hay captura. Fundido mientras llega.
            capture().then(() => !cancelled && apply());
            return fade();
          }
          if (!renderer.acquire(owner, cfg.zIndex)) return fade();
          composeNow();
        } else if (renderer.needsResize()) {
          // Cambio real de tamaño (girar el móvil, redimensionar la
          // ventana) a mitad de transición. La barra del navegador móvil no
          // entra aquí: el canvas mide con el alto estable.
          composeNow();
        }
        pinEl.style.opacity = "";
        renderer.render(p, layers);
      };

      const sync = (self: ScrollTrigger) => {
        progress = self.progress;
        apply();
      };
      const main = ScrollTrigger.create({
        trigger: outer,
        start: "top top",
        end: () => `+=${distance()}`,
        invalidateOnRefresh: true,
        onUpdate: sync,
        onRefresh: sync,
      });
      ref.st = main;

      // Captura previa: al acercarse al inicio y mientras dure la transición.
      let liveTimer = 0;
      const prepare = ScrollTrigger.create({
        trigger: outer,
        start: `top ${cfg.captureAhead * 100}%`,
        end: () => `+=${distance() + viewportHeight() * cfg.captureAhead}`,
        onToggle: (self) => {
          clearInterval(liveTimer);
          if (!self.isActive) return;
          if (!shots) capture();
          liveTimer = window.setInterval(() => {
            // Una vez empezada la rotura el fotograma ya está en la textura.
            if (!getRenderer()?.isOwner(owner)) refreshLive();
          }, 120);
        },
      });

      // Tras un resize la captura ya no vale: se descarta y se rehace. Solo
      // cuenta si cambia el ANCHO: en móvil la barra del navegador dispara
      // `resize` al hacer scroll (solo cambia el alto), y rehacer la captura
      // ahí hacía que la transición diera saltos.
      let resizeTimer = 0;
      let lastWidth = window.innerWidth;
      const onResize = () => {
        if (window.innerWidth === lastWidth) return;
        lastWidth = window.innerWidth;
        clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          shots = null;
          if (!prepare.isActive) return;
          capture().then(() => {
            if (cancelled) return;
            getRenderer()?.release(owner);
            apply();
          });
        }, cfg.resizeDebounce);
      };
      window.addEventListener("resize", onResize);

      // Las fuentes de la captura se preparan en reposo: es lo más lento de
      // la primera captura y no depende del estado de la sección.
      const idle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 1500));
      idle(() => {
        if (cancelled || reduce) return;
        import("html-to-image").then(async ({ getFontEmbedCSS }) => {
          for (const el of sources()) {
            if (!fontCSS.has(el)) fontCSS.set(el, await getFontEmbedCSS(el));
          }
        }).catch(() => {});
      });

      ScrollTrigger.refresh();
      apply();

      // Salvaguarda: si el trigger desaparece (lo mata otro código) la
      // sección vuelve a su sitio y a ser visible; y si ya se ha pasado su
      // inicio real y sigue en 0, las posiciones están desfasadas y se
      // re-miden. Nunca debe quedar el destino oculto.
      //
      // Se comprueba al parar el scroll, no en cada evento: ScrollTrigger se
      // actualiza en el rAF de Lenis, después del evento `scroll`, y en ese
      // instante su progreso todavía es el del frame anterior.
      let watchTimer = 0;
      const check = () => {
        const st = ref.st;
        if (!st || !ScrollTrigger.getAll().includes(st)) {
          window.removeEventListener("scroll", watchdog);
          restore();
          return;
        }
        if (st.progress === 0 && outer.getBoundingClientRect().top < -2) {
          ScrollTrigger.refresh();
        }
      };
      const watchdog = () => {
        clearTimeout(watchTimer);
        watchTimer = window.setTimeout(check, 200);
      };
      window.addEventListener("scroll", watchdog, { passive: true });

      // ScrollTrigger solo re-mide en resize/load. Si el layout de encima
      // cambia después (fuentes, el hero re-renderizado, contenido tardío) el
      // inicio quedaría desfasado: se re-mide cuando cambia el alto de la página.
      let refreshTimer = 0;
      let lastHeight = document.body.scrollHeight;
      const ro = new ResizeObserver(() => {
        const h = document.body.scrollHeight;
        if (h === lastHeight) return;
        lastHeight = h;
        clearTimeout(refreshTimer);
        refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
      });
      ro.observe(document.body);

      teardown = () => {
        clearInterval(liveTimer);
        clearTimeout(watchTimer);
        window.removeEventListener("scroll", watchdog);
        ro.disconnect();
        clearTimeout(refreshTimer);
        clearTimeout(resizeTimer);
        window.removeEventListener("resize", onResize);
        prepare.kill();
        main.kill();
        restore();
      };
    })();

    return () => {
      cancelled = true;
      teardown?.();
    };
    // `resetKey` no se lee dentro: solo fuerza a rehacer el montaje.
  },[fromKey, layers, length, fillViewport, resetKey]);

  return (
    <div
      ref={outerRef}
      className={className}
      // Por encima del origen (y de la capa del logo 3D, z-20) para que, al
      // hacerse visible, lo revelado muestre el destino y no lo de detrás.
      style={{ position: "relative", zIndex: 30 }}>
      <div ref={pinRef}>{children}</div>
      <div ref={spacerRef} aria-hidden="true" />
    </div>
  );
}
