"use client";

import { useLayoutEffect, useRef } from "react";
import LoaderMark from "./LoaderMark";
import { TRANSITION_CONFIG } from "@/app/lib/transitions/config";
import {
  getRenderer,
  prefersReducedMotion,
} from "@/app/lib/transitions/renderer";
import { announceIntroDone } from "@/app/lib/transitions/intro-events";

/**
 * Fases 1 y 2: el palo crece mientras carga el hero y, al llenarse, la
 * pantalla del loader se rompe con el shader y revela el hero.
 *
 * Solo se monta en la portada (/es y /en). El overlay sale en el HTML del
 * servidor pero oculto por CSS; el script inline que va justo detrás decide,
 * antes del primer pintado, si se reproduce (primera visita de la sesión) y
 * le pone `data-state="play"`. Así:
 * - no hay destello del hero antes del loader,
 * - sin JS el overlay nunca aparece,
 * - en una navegación en cliente el script no corre y la intro no se repite.
 *
 * Estados (`data-state`, gestionado a mano en el DOM, fuera de React):
 *   play   → loader visible, scroll bloqueado (ver globals.css)
 *   reveal → el canvas WebGL muestra la rotura; el overlay ya está oculto
 *   done   → fin
 */

const ID = "intro-loader";
const cfg = TRANSITION_CONFIG.loader;

const DECIDE_SCRIPT = `(function(){try{var el=document.getElementById("${ID}");if(!el)return;if(${cfg.oncePerSession}&&sessionStorage.getItem("${cfg.storageKey}"))return;el.setAttribute("data-state","play");window.__grolowIntroPlay=true;if("scrollRestoration" in history)history.scrollRestoration="manual";window.scrollTo(0,0)}catch(e){}})()`;

/** Script inline sin el aviso de React por `<script>` en cliente (ver docs de Next). */
function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/** Promesas de lo que pinta el hero: fuentes, página y el GLB del logo. */
function heroResources(): Promise<unknown>[] {
  const fonts = document.fonts?.ready ?? Promise.resolve();

  const page =
    document.readyState === "complete"
      ? Promise.resolve()
      : new Promise((r) => window.addEventListener("load", r, { once: true }));

  // <model-viewer> emite `load` sin burbujear: se escucha en captura.
  const model = new Promise<void>((resolve) => {
    const mv = document.querySelector("model-viewer") as
      | (HTMLElement & { loaded?: boolean })
      | null;
    if (mv?.loaded) return resolve();
    const onLoad = (e: Event) => {
      if ((e.target as Element | null)?.tagName !== "MODEL-VIEWER") return;
      document.removeEventListener("load", onLoad, true);
      resolve();
    };
    document.addEventListener("load", onLoad, true);
  });

  return [fonts, page, model];
}

export default function IntroLoader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<SVGRectElement>(null);

  useLayoutEffect(() => {
    const el = rootRef.current;
    const bar = barRef.current;
    if (!el || !bar) return;
    // Si la hidratación falla más arriba (p. ej. un desajuste por
    // reduced-motion), React rehace el DOM y se pierde el atributo que puso el
    // script; la decisión queda también en `window` para recuperarla.
    if (el.dataset.state !== "play" && window.__grolowIntroPlay) {
      el.dataset.state = "play";
    }
    if (el.dataset.state !== "play") {
      announceIntroDone();
      return;
    }

    const owner = {};
    let raf = 0;
    let timer = 0;
    let cancelled = false;

    // Lenis se crea de forma asíncrona en ClientLayout: puede aparecer en
    // cualquier momento de la intro, así que se para en cada frame.
    const holdLenis = () => {
      const lenis = window.lenis;
      if (lenis && !lenis.isStopped) lenis.stop();
    };

    const finish = () => {
      el.dataset.state = "done";
      window.__grolowIntroPlay = false;
      el.style.opacity = "";
      getRenderer()?.release(owner);
      window.lenis?.start();
      if ("scrollRestoration" in history) history.scrollRestoration = "auto";
      try {
        sessionStorage.setItem(cfg.storageKey, "1");
      } catch {}
      announceIntroDone();
    };

    /* ---------- Fase 1: el palo ---------- */
    const resources = heroResources();
    let done = 0;
    resources.forEach((p) => p.then(() => done++, () => done++));

    const start = performance.now();
    let last = start;
    let shown = 0;
    let fullAt = 0;

    const load = (now: number) => {
      if (cancelled) return;
      holdLenis();
      const t = now - start;
      const dt = now - last;
      last = now;

      // Lo pendiente avanza despacio hacia el 70% para que el palo nunca se
      // quede clavado; solo llega al 100% cuando todo ha cargado (o expira).
      const total = resources.length;
      const creep = 0.7 * (1 - Math.exp(-t / 1200));
      const real = t >= cfg.maxWait ? 1 : (done + (total - done) * creep) / total;
      const target = Math.min(real, t / cfg.minDuration);
      shown += (target - shown) * (1 - Math.exp(-dt / 140));
      if (target >= 1 && shown > 0.995) shown = 1;
      bar.style.transform = `scaleY(${shown})`;

      if (shown === 1) {
        fullAt ||= now;
        if (now - fullAt >= cfg.holdAtFull) return reveal();
      }
      raf = requestAnimationFrame(load);
    };

    /* ---------- Fase 2: la rotura ---------- */
    const reveal = () => {
      const intro = TRANSITION_CONFIG.intro;
      const renderer = prefersReducedMotion() ? null : getRenderer();

      if (!renderer || !renderer.acquire(owner, 9999)) {
        el.style.transition = `opacity ${intro.fadeDuration}ms ease`;
        el.style.opacity = "0";
        timer = window.setTimeout(finish, intro.fadeDuration);
        return;
      }

      // La pantalla del loader, redibujada en 2D con el palo en su sitio
      // exacto: se rompe todo junto, fondo y palo.
      const { canvas } = renderer;
      const tex = document.createElement("canvas");
      tex.width = canvas.width;
      tex.height = canvas.height;
      const ctx = tex.getContext("2d")!;
      const sx = tex.width / window.innerWidth;
      const sy = tex.height / window.innerHeight;
      ctx.fillStyle = cfg.background;
      ctx.fillRect(0, 0, tex.width, tex.height);
      const r = bar.getBoundingClientRect();
      ctx.fillStyle = cfg.color;
      ctx.fillRect(r.left * sx, r.top * sy, r.width * sx, r.height * sy);

      renderer.setTexture(tex);
      renderer.render(0, intro.layers);
      // Mismo frame: el canvas (idéntico) sustituye al overlay HTML.
      el.dataset.state = "reveal";

      const t0 = performance.now();
      const step = (now: number) => {
        if (cancelled) return;
        holdLenis();
        const p = Math.min(1, (now - t0) / intro.duration);
        renderer.render(intro.ease(p), intro.layers);
        if (p < 1) raf = requestAnimationFrame(step);
        else finish();
      };
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(load);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      getRenderer()?.release(owner);
      window.lenis?.start();
      // En desarrollo (StrictMode) el efecto se vuelve a montar: se deja el
      // overlay listo para arrancar de cero.
      if (el.dataset.state === "reveal") el.dataset.state = "play";
    };
  }, []);

  return (
    <>
      <div
        id={ID}
        ref={rootRef}
        className="intro-loader fixed inset-0 z-[100] items-center justify-center"
        style={{ background: cfg.background }}
        suppressHydrationWarning
        aria-hidden="true">
        <LoaderMark
          barRef={barRef}
          progress={0}
          height={`min(${cfg.height}px, ${cfg.maxHeightVh}vh)`}
          thickness={cfg.thickness}
          color={cfg.color}
        />
      </div>
      <InlineScript html={DECIDE_SCRIPT} />
    </>
  );
}
