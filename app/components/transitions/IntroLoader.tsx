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

const DECIDE_SCRIPT = `(function(){try{var el=document.getElementById("${ID}");if(!el)return;if(!/[?&]intro\\b/.test(location.search)&&${cfg.oncePerSession}&&sessionStorage.getItem("${cfg.storageKey}"))return;el.setAttribute("data-state","play");window.__grolowIntroPlay=true;if("scrollRestoration" in history)history.scrollRestoration="manual";window.scrollTo(0,0)}catch(e){}})()`;

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

/**
 * Lo que tiene que haber cargado para que el palo llegue arriba: fuentes y
 * la página. El logo 3D (900 KB) no se espera: aparece solo con su fundido,
 * y esperarlo alargaba el palo sin necesidad.
 */
function pageResources(): Promise<unknown>[] {
  const fonts = document.fonts?.ready ?? Promise.resolve();
  const page =
    document.readyState === "complete"
      ? Promise.resolve()
      : new Promise((r) => window.addEventListener("load", r, { once: true }));
  return [fonts, page];
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
    const resources = pageResources();
    let done = 0;
    resources.forEach((p) => p.then(() => done++, () => done++));

    let last = performance.now();
    let shown = 0;
    let fullAt = 0;

    const load = (now: number) => {
      if (cancelled) return;
      holdLenis();
      // El reloj cuenta desde que empezó la navegación (performance.now() es
      // 0 ahí), no desde la hidratación: si React tarda, ese tiempo ya cuenta
      // para la duración mínima y el palo no se alarga por ello.
      const t = now;
      // El timestamp del rAF es el inicio del frame y puede ser anterior a
      // `last`: sin el max() el primer paso sale negativo y el palo arranca
      // por debajo de cero.
      const dt = Math.max(0, now - last);
      last = now;

      // Con todo cargado, el palo tarda exactamente `minDuration`. Si aún
      // falta algo, lo pendiente avanza despacio hacia el 70% para que nunca
      // se quede clavado, y solo llega arriba cuando termina (o expira).
      const total = resources.length;
      const creep = 0.7 * (1 - Math.exp(-t / 1200));
      const real = t >= cfg.maxWait ? 1 : (done + (total - done) * creep) / total;
      const timed = 1 - (1 - Math.min(1, t / cfg.minDuration)) ** 2; // ease-out
      const target = Math.min(real, timed);
      // Suavizado corto: solo evita saltos si la carga avanza a golpes.
      shown += (target - shown) * (1 - Math.exp(-dt / 50));
      shown = Math.min(1, Math.max(0, shown));
      if (target >= 1 && shown > 0.985) shown = 1;
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
      renderer.render(0, intro.layers, intro.revealDelay);
      // Mismo frame: el canvas (idéntico) sustituye al overlay HTML.
      el.dataset.state = "reveal";

      const t0 = performance.now();
      const step = (now: number) => {
        if (cancelled) return;
        holdLenis();
        const p = Math.min(1, (now - t0) / intro.duration);
        renderer.render(intro.ease(p), intro.layers, intro.revealDelay);
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
