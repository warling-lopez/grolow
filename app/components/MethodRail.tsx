"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Raíl del método con flechas para móvil.
 *
 * En móvil el raíl se desplaza a mano (scroll-snap) y el asomo de la
 * siguiente tarjeta no basta para que todo el mundo entienda que hay más.
 * Las flechas avanzan tarjeta a tarjeta y se desactivan en los extremos.
 * A partir de `lg` la tira se mueve sola con el scroll (ver globals.css) y
 * las flechas se ocultan.
 */
export default function MethodRail({
  label,
  prevLabel,
  nextLabel,
  children,
}: {
  label: string;
  prevLabel: string;
  nextLabel: string;
  children: React.ReactNode;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const update = () => {
      const max = rail.scrollWidth - rail.clientWidth;
      setAtStart(rail.scrollLeft <= 8);
      setAtEnd(rail.scrollLeft >= max - 8);
    };
    update();
    rail.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      rail.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const go = (dir: 1 | -1) => {
    const rail = railRef.current;
    const card = rail?.querySelector<HTMLElement>(".method-card");
    if (!rail || !card) return;
    const gap = parseFloat(getComputedStyle(card.parentElement!).columnGap) || 0;
    const max = rail.scrollWidth - rail.clientWidth;
    const target = Math.min(
      max,
      Math.max(0, rail.scrollLeft + dir * (card.offsetWidth + gap)),
    );
    rail.scrollTo({ left: target, behavior: "smooth" });
  };

  const btn =
    "grid h-11 w-11 place-items-center rounded-full border border-grolow-light/20 text-grolow-light transition-colors hover:border-grolow-light disabled:opacity-30 disabled:hover:border-grolow-light/20";

  return (
    <>
      <div
        ref={railRef}
        className="method-rail -mx-4 px-4 scroll-px-4 md:-mx-8 md:px-8 md:scroll-px-8"
        role="group"
        aria-label={label}>
        {children}
      </div>

      {/* A la izquierda: la esquina derecha la ocupan los botones flotantes. */}
      <div className="mt-6 flex gap-3 lg:hidden">
        <button
          type="button"
          className={btn}
          onClick={() => go(-1)}
          disabled={atStart}
          aria-label={prevLabel}>
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          className={btn}
          onClick={() => go(1)}
          disabled={atEnd}
          aria-label={nextLabel}>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </>
  );
}
