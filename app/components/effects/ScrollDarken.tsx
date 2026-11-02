"use client";

import { useEffect, useRef, type ReactNode } from "react";

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/** Tokens que cambian: [claro (tema base), oscuro (igual que .home-dark)].
 *  `text` indica si siguen la curva del texto en vez de la del fondo. */
const TOKENS: { name: string; light: string; dark: string; text: boolean }[] = [
  { name: "--color-grolow-dark", light: "#f6f1e2", dark: "#000000", text: false },
  { name: "--color-grolow-card", light: "#fffcf4", dark: "#0b1111", text: false },
  { name: "--color-grolow-light", light: "#0e1512", dark: "#eef3f2", text: true },
  { name: "--color-grolow-cream", light: "#004643", dark: "#06e0da", text: true },
  { name: "--color-grolow-cyan", light: "#004643", dark: "#06e0da", text: true },
  { name: "--color-grolow-accent", light: "#002b29", dark: "#7cf1ed", text: true },
];

const toRgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const PARSED = TOKENS.map((t) => ({ ...t, a: toRgb(t.light), b: toRgb(t.dark) }));

const mix = (a: number[], b: number[], t: number) =>
  `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(" ")})`;

/**
 * Oscurece su contenido poco a poco según el scroll (ver .home-fade en
 * app/components/pages/home-theme.css).
 *
 * - Empieza (0) cuando la mitad de la sección asoma por abajo de la pantalla.
 * - Termina (1) cuando la sección `untilId` asoma por abajo, así esa sección
 *   —que ya es negra— entra sin corte.
 *
 * El fondo se oscurece de forma continua; el texto cambia de tinta a claro en
 * una franja corta alrededor de la mitad, donde el fondo ya es un gris medio
 * y ambos tonos se leen. Los colores se calculan aquí y se escriben como
 * variables en el contenedor (las utilidades de Tailwind las leen).
 *
 * El centinela con `data-header-trigger` empieza justo donde el texto pasa a
 * claro, para que el header cambie a blanco en el mismo momento.
 */
export default function ScrollDarken({
  untilId,
  children,
}: {
  untilId: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const sentinel = sentinelRef.current;
    if (!el || !sentinel) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const r = el.getBoundingClientRect();
      const until = document.getElementById(untilId)?.getBoundingClientRect();

      // Distancias (en px de scroll) que faltan para el inicio y el final.
      const start = r.top + r.height / 2 - vh;
      const stop = (until ? until.top : r.bottom) - vh;
      const span = stop - start;

      const t = span > 0 ? clamp01(-start / span) : start <= 0 ? 1 : 0;
      const text = clamp01((t - 0.42) / 0.16);
      for (const tok of PARSED) {
        el.style.setProperty(tok.name, mix(tok.a, tok.b, tok.text ? text : t));
      }
      el.dataset.fade = t.toFixed(3);

      // Punto (dentro de la sección) donde el texto pasa a claro.
      const flip = span > 0 ? start + span * 0.5 - r.top : 0;
      sentinel.style.top = `${Math.min(Math.max(flip, 0), r.height - 1)}px`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [untilId]);

  return (
    <div ref={ref} className="home-fade">
      {children}
      <div
        ref={sentinelRef}
        data-header-trigger="true"
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{ top: "100%" }}
      />
    </div>
  );
}
