"use client";

import { useEffect, useRef } from "react";

/**
 * Barra de progreso de lectura bajo el nav del blog. Mide cuánto se ha
 * recorrido del cuerpo del artículo (`[data-article-body]`); en páginas sin
 * artículo no se ve.
 *
 * Escribe el ancho directamente en el DOM en vez de usar estado: así no se
 * vuelve a renderizar React en cada evento de scroll.
 */
export default function ReadingProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const body = document.querySelector<HTMLElement>("[data-article-body]");
      if (!bar.current) return;
      if (!body) {
        bar.current.style.transform = "scaleX(0)";
        return;
      }
      const rect = body.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.6;
      const done = Math.min(1, Math.max(0, (160 - rect.top) / Math.max(total, 1)));
      bar.current.style.transform = `scaleX(${done})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="absolute inset-x-0 bottom-0 h-[3px]" aria-hidden="true">
      <div
        ref={bar}
        className="h-full origin-left bg-grolow-brand"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
