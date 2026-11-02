"use client";

import { useEffect, useState } from "react";
import type { Lang } from "@/app/lib/i18n";

export type TocItem = { id: string; label: string };

/**
 * Índice del artículo. Marca la sección que se está leyendo y salta a ella
 * con scroll suave (ClientLayout ya intercepta los enlaces `#ancla`).
 *
 * `variant="rail"`: columna fija a la izquierda en pantallas grandes.
 * `variant="inline"`: desplegable al inicio del artículo, para móvil y tablet.
 */
export default function TableOfContents({
  items,
  variant,
  lang = "es",
}: {
  items: TocItem[];
  variant: "rail" | "inline";
  lang?: Lang;
}) {
  const inThis = lang === "en" ? "In this article" : "En este artículo";
  const sectionsLabel = lang === "en" ? "sections" : "secciones";
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    // La sección activa es la última cuyo título ya pasó por debajo del header.
    const update = () => {
      let current: string | null = null;
      for (const el of els) {
        if (el.getBoundingClientRect().top < 160) current = el.id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [items]);

  if (items.length < 2) return null;

  const list = (
    <ol className="space-y-0.5">
      {items.map((item) => {
        const on = item.id === active;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={on ? "location" : undefined}
              className={`block border-l-2 py-1.5 pl-3 text-sm leading-snug transition-colors ${
                on
                  ? "border-grolow-cream font-semibold text-grolow-cream"
                  : "border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:border-neutral-400"
              }`}>
              {item.label}
            </a>
          </li>
        );
      })}
    </ol>
  );

  if (variant === "rail") {
    return (
      <nav aria-label={inThis} className="sticky top-32">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-neutral-900">
          {inThis}
        </p>
        {list}
      </nav>
    );
  }

  return (
    <details className="group rounded-xl border border-neutral-200 bg-neutral-50 [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-5 text-sm font-bold text-neutral-900">
        {inThis} · {items.length} {sectionsLabel}
        <svg viewBox="0 0 24 24" className="h-5 w-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>
      <nav aria-label={inThis} className="px-5 pb-4">
        {list}
      </nav>
    </details>
  );
}
