"use client";

import { useEffect, useState } from "react";

/** Altura de la banda superior del viewport que ocupa el header fijo. */
const HEADER_BAND_PX = 72;

/**
 * Devuelve `true` mientras alguna sección marcada con
 * `data-header-trigger` cruza la banda del header (los primeros
 * ~72px del viewport).
 *
 * Escalable: cualquier sección nueva solo necesita el atributo
 * `data-header-trigger="true"` en su elemento raíz; no hay que
 * tocar esta lógica ni el Header.
 */
export function useHeaderTrigger() {
  const [isOverTrigger, setIsOverTrigger] = useState(false);

  useEffect(() => {
    const targets = document.querySelectorAll("[data-header-trigger]");
    if (targets.length === 0) return;

    let observer: IntersectionObserver | null = null;
    const visible = new Set<Element>();

    const observe = () => {
      observer?.disconnect();
      visible.clear();
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) visible.add(entry.target);
            else visible.delete(entry.target);
          }
          setIsOverTrigger(visible.size > 0);
        },
        {
          // Recorta el área de intersección a la banda del header:
          // solo cuenta lo que pasa por detrás de él.
          rootMargin: `0px 0px -${window.innerHeight - HEADER_BAND_PX}px 0px`,
          threshold: 0,
        }
      );
      targets.forEach((el) => observer!.observe(el));
    };

    observe();

    // rootMargin depende de la altura del viewport: recalcula al redimensionar.
    let resizeRaf = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(observe);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(resizeRaf);
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
    };
  }, []);

  return isOverTrigger;
}
