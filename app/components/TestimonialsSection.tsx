"use client";

import Image from "next/image";
import { useState } from "react";
import LetterReveal from "./LetterReveal";
import { COPY, TESTIMONIALS } from "@/app/lib/content/testimonials";
import type { Lang } from "@/app/lib/i18n";

/**
 * Carrusel de testimonios.
 *
 * Ocupa el sitio que tenía «Quién está detrás» en la portada. `AboutSection`
 * sigue existiendo y se usa en las landings de nicho: aquí solo cambia el
 * orden de la portada, no se borra el componente.
 *
 * Si no hay testimonios reales la sección no se pinta. Ver `testimonials.ts`.
 *
 * Accesible: los puntos son botones con `aria-label` y estado `aria-current`,
 * las flechas tienen etiqueta, y el bloque que cambia es un `aria-live`
 * discreto para que un lector de pantalla anuncie el testimonio nuevo en vez
 * de quedarse en silencio. No auto-avanza.
 */
export default function TestimonialsSection({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const [index, setIndex] = useState(0);

  // Sin datos no hay sección: mejor nada que un hueco con texto de relleno.
  if (TESTIMONIALS.length === 0) return null;

  const total = TESTIMONIALS.length;
  const current = TESTIMONIALS[index];
  const go = (next: number) => setIndex((next + total) % total);

  return (
    <section
      data-header-trigger="true"
      className="w-full bg-grolow-ink text-white">
      <div className="mx-auto w-full max-w-5xl px-4 py-20 md:px-8 md:py-28">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-white/55">
          {c.label}
        </p>

        <h2 className="font-display text-[clamp(2rem,6.5vw,4rem)] font-bold uppercase tracking-tight leading-[0.95] text-white">
          <LetterReveal text={c.title} step={16} />
        </h2>

        <figure
          className="mt-12 rounded-2xl border border-white/10 bg-white/[0.025] p-8 md:p-12"
          aria-live="polite">
          <blockquote className="text-center text-[clamp(1.05rem,2.4vw,1.375rem)] italic leading-relaxed text-white/85">
            “{current.quote[lang]}”
          </blockquote>

          <figcaption className="mt-8 flex items-center justify-center gap-4">
            {current.avatar ? (
              <Image
                src={current.avatar}
                alt=""
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <span
                aria-hidden="true"
                className="grid h-12 w-12 place-items-center rounded-full bg-grolow-brand/20 text-lg font-bold text-grolow-brand">
                {current.name.charAt(0)}
              </span>
            )}
            <span className="text-left">
              <span className="block font-semibold text-white">
                {current.url ? (
                  <a
                    href={current.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-4 hover:text-grolow-brand hover:underline">
                    {current.name}
                  </a>
                ) : (
                  current.name
                )}
              </span>
              <span className="block text-sm text-white/55">
                {current.role[lang]}
              </span>
            </span>
          </figcaption>
        </figure>

        {total > 1 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label={lang === "es" ? "Testimonio anterior" : "Previous testimonial"}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-colors hover:border-grolow-brand hover:text-grolow-brand">
              ‹
            </button>

            <ul className="flex items-center gap-2">
              {TESTIMONIALS.map((t, i) => (
                <li key={t.name}>
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-current={i === index ? "true" : undefined}
                    aria-label={
                      lang === "es"
                        ? `Ver testimonio de ${t.name}`
                        : `See testimonial from ${t.name}`
                    }
                    className={`block h-2.5 w-2.5 rounded-full transition-colors ${
                      i === index ? "bg-grolow-brand" : "bg-white/25 hover:bg-white/50"
                    }`}
                  />
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label={lang === "es" ? "Siguiente testimonio" : "Next testimonial"}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-colors hover:border-grolow-brand hover:text-grolow-brand">
              ›
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
