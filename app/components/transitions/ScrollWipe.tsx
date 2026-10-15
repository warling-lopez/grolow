"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { TRANSITION_CONFIG } from "@/app/lib/transitions/config";
import { getRenderer, prefersReducedMotion } from "@/app/lib/transitions/renderer";

/**
 * Máscara de scroll superpuesta (la transición del footer).
 *
 * A diferencia de `SectionTransition`, NO toca la página: no mueve el
 * contenido, no usa márgenes negativos ni `position: sticky`, no oculta nada y
 * no captura ninguna sección. El hijo se queda en su sitio, en el flujo, con
 * la altura que tiene.
 *
 * Solo dibuja, encima de todo y sin recibir clics, la franja verde del shader
 * subiendo por la pantalla mientras el hijo entra en vista. La textura es
 * transparente, así que lo único que se ve es la propia franja; lo que hay
 * debajo (las secciones, el footer) no cambia nunca.
 *
 * Progreso: 0 a `RUNWAY` ventanas antes de que el hijo asome por abajo, 1 en
 * el final de la página. Sin WebGL o
 * con reduced-motion no se pinta nada.
 */
/** Grosor de la franja verde, en fracción del alto de la ventana. */
const BAND = 0.35;

/** Altos de ventana, antes de que asome el footer, en los que ya empieza a subir. */
const LEAD_IN = 0.6;

const { edgeAmp, baseEdge } = TRANSITION_CONFIG.shader;

/**
 * Progreso del shader (0..1) cuyo frente queda en la altura `t` (0 = abajo,
 * 1 = arriba). Es la inversa de la fórmula de `reveal()` en shader.ts.
 */
const progressFor = (t: number, edge: number) =>
  (t + 0.5 * edgeAmp + edge) / (1 + edgeAmp + edge);

export default function ScrollWipe({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const { layers: base, zIndex } = TRANSITION_CONFIG.section;
    const owner = {};
    let cancelled = false;
    let teardown: (() => void) | undefined;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/dist/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const clear = document.createElement("canvas");
      clear.width = clear.height = 1;

      const draw = (s: number) => {
        const renderer = getRenderer();
        if (!renderer) return;
        if (s <= 0 || s >= 1) return renderer.release(owner);

        // La franja sigue a la costura entre la sección de arriba y el footer
        // (su borde superior) y la cubre por los dos lados, con un grosor
        // fijo: así la línea de unión nunca queda a la vista. Empieza
        // antes de que asome el footer (`LEAD_IN`).
        const vh = window.innerHeight;
        const seam = 1 - el.getBoundingClientRect().top / vh;
        // Centrada en la costura (`BAND / 2` por debajo de ella). Solo al final
        // (último 10 % del recorrido) se levanta para sacar la máscara por
        // arriba; antes, la franja y la costura suben juntas.
        const out = Math.max(0, (s - 0.9) / 0.1);
        const front = seam - BAND / 2 + out * out * (3 - 2 * out) * 1.8;
        const band = BAND * Math.min(1, s * 6);
        const p = Math.max(progressFor(front, baseEdge), 1e-3);
        const layers = base.map((l, i) => ({
          ...l,
          // El shader multiplica progreso × lead: se despeja para que cada
          // capa quede a su altura, la brillante arriba del todo.
          lead:
            progressFor(front + band * (i === 0 ? 1 : 0.55), l.edge) / p,
        }));
        if (!renderer.isOwner(owner)) {
          if (!renderer.acquire(owner, zIndex)) return;
          renderer.setTexture(clear);
        } else if (renderer.needsResize()) {
          renderer.resize();
        }
        renderer.render(p, layers);
      };

      const st = ScrollTrigger.create({
        trigger: el,
        start: () =>
          el.getBoundingClientRect().top +
          window.scrollY -
          window.innerHeight * (1 + LEAD_IN),
        end: "max",
        invalidateOnRefresh: true,
        onUpdate: (self) => draw(self.progress),
        onRefresh: (self) => draw(self.progress),
        onLeave: () => getRenderer()?.release(owner),
        onLeaveBack: () => getRenderer()?.release(owner),
      });

      teardown = () => {
        st.kill();
        getRenderer()?.release(owner);
      };
    })();

    return () => {
      cancelled = true;
      teardown?.();
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
