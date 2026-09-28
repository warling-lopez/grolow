"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

/**
 * Distorsión ondulada que sigue al ratón (solo escritorio).
 *
 * Filtro SVG sobre el HTML real —no una captura—: el texto sigue siendo
 * texto, seleccionable y con sus enlaces. La cadena del filtro:
 *
 *   ruido suave (feTurbulence, estirado en horizontal → bandas de onda)
 *   × máscara radial centrada en el ratón (feImage que se mueve)
 *   → mapa de desplazamiento neutro (0.5) fuera del círculo
 *   → feDisplacementMap sobre el contenido.
 *
 * El ruido «respira» variando un poco su frecuencia, y la máscara persigue
 * al ratón con inercia. Solo hay rAF y filtro mientras dura el hover (y su
 * salida suave); en reposo el elemento no lleva `filter` y no cuesta nada.
 *
 * Se desactiva en táctil (`hover: none` / `pointer: coarse`) y con
 * prefers-reduced-motion.
 */

const WAVE = {
  /** Desplazamiento máximo en px (±scale/2). Más alto = más ondulado. */
  scale: 18,
  /** Radio de influencia alrededor del ratón, en px. */
  radius: 240,
  /** Frecuencia del ruido (x, y). x baja + y alta = bandas horizontales. */
  frequency: [0.0035, 0.008] as const,
  /** Cuánto «respira» la frecuencia y a qué velocidad. */
  breathe: 0.18,
  speed: 0.0012,
  /** Inercia con la que la máscara sigue al ratón (0–1, más bajo = más lento). */
  follow: 0.12,
  /** Velocidad de entrada/salida de la intensidad. */
  fade: 0.08,
};

/** Máscara radial: blanco en el centro → negro en el borde. */
const MASK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'>" +
      "<defs><radialGradient id='g'>" +
      "<stop offset='0' stop-color='white'/>" +
      "<stop offset='0.45' stop-color='rgb(150,150,150)'/>" +
      "<stop offset='1' stop-color='black'/>" +
      "</radialGradient></defs>" +
      "<rect width='100' height='100' fill='url(#g)'/></svg>",
  );

export default function WaveHover({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const id = `wave-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const ref = useRef<HTMLDivElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const maskRef = useRef<SVGFEImageElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    const turb = turbRef.current;
    const mask = maskRef.current;
    const disp = dispRef.current;
    if (!el || !host || !turb || !mask || !disp) return;

    const desktop = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );

    let raf = 0;
    let hovering = false;
    let strength = 0;
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };

    const tick = (now: number) => {
      strength += ((hovering ? 1 : 0) - strength) * WAVE.fade;
      pos.x += (target.x - pos.x) * WAVE.follow;
      pos.y += (target.y - pos.y) * WAVE.follow;

      const b = 1 + WAVE.breathe * Math.sin(now * WAVE.speed);
      const b2 = 1 + WAVE.breathe * Math.cos(now * WAVE.speed * 0.7);
      turb.setAttribute(
        "baseFrequency",
        `${(WAVE.frequency[0] * b).toFixed(5)} ${(WAVE.frequency[1] * b2).toFixed(5)}`,
      );
      mask.setAttribute("x", String(pos.x - WAVE.radius));
      mask.setAttribute("y", String(pos.y - WAVE.radius));
      disp.setAttribute("scale", (WAVE.scale * strength).toFixed(2));

      if (!hovering && strength < 0.01) {
        el.style.filter = "";
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const toLocal = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;
    };

    const onEnter = (e: PointerEvent) => {
      if (!desktop.matches || e.pointerType !== "mouse") return;
      toLocal(e);
      // Entra desde donde está el ratón, sin arrastrarse desde la esquina.
      if (!raf) {
        pos.x = target.x;
        pos.y = target.y;
      }
      hovering = true;
      el.style.filter = `url(#${id})`;
      raf ||= requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      if (hovering) toLocal(e);
    };
    const onLeave = () => {
      hovering = false;
    };

    host.addEventListener("pointerenter", onEnter);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.style.filter = "";
      host.removeEventListener("pointerenter", onEnter);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [id]);

  const d = WAVE.radius * 2;

  return (
    <>
      <svg
        aria-hidden="true"
        width="0"
        height="0"
        style={{ position: "absolute", pointerEvents: "none" }}>
        <filter
          id={id}
          x="-5%"
          y="-5%"
          width="110%"
          height="110%"
          primitiveUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB">
          <feTurbulence
            ref={turbRef}
            type="fractalNoise"
            baseFrequency={WAVE.frequency.join(" ")}
            // Una sola octava: ondas largas y limpias. Con más, las letras se
            // doblan una a una y parece un fallo en vez de una onda.
            numOctaves={1}
            seed={7}
            result="noise"
          />
          {/* Alfa del ruido a 1: si no, la premultiplicación sesga el mapa. */}
          <feColorMatrix
            in="noise"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0 1"
            result="noiseOpaque"
          />
          <feFlood floodColor="black" result="black" />
          <feImage
            ref={maskRef}
            href={MASK}
            x={-d}
            y={-d}
            width={d}
            height={d}
            preserveAspectRatio="none"
            result="spot"
          />
          <feComposite in="spot" in2="black" operator="over" result="mask" />
          {/* mapa = ruido·máscara + 0.5·(1 − máscara): neutro fuera del círculo */}
          <feComposite
            in="noiseOpaque"
            in2="mask"
            operator="arithmetic"
            k1={1}
            k2={0}
            k3={-0.5}
            k4={0.5}
            result="map"
          />
          <feDisplacementMap
            ref={dispRef}
            in="SourceGraphic"
            in2="map"
            scale={0}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      <div ref={ref} className={className}>
        {children}
      </div>
    </>
  );
}
