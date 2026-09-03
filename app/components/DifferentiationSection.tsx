"use client";

import { useLang } from "@/app/components/hooks/useLang";
import type { Lang } from "@/app/lib/i18n";

/**
 * Los tres puntos que separan a Grolow de las agencias locales.
 *
 * Ocupa el lugar del tícker «PEDIDOS ORDENADOS, NO CHATS PERDIDOS», que
 * describía un servicio concreto y no la identidad del estudio. Va justo bajo
 * el hero porque es la respuesta a la pregunta que trae el visitante: por qué
 * tú y no cualquiera de los otros cinco presupuestos que está pidiendo.
 */
const BLOCKS: {
  title: Record<Lang, string>;
  body: Record<Lang, string>;
}[] = [
  {
    title: {
      es: "Se adapta a ti.",
      en: "It adapts to you.",
    },
    body: {
      es: "La herramienta cambia según tu negocio, no al revés. Construimos exactamente lo que necesitas, en lugar de obligarte a cambiar tu forma de trabajar.",
      en: "The tool adapts to your business, not the other way around. We build exactly what you need instead of forcing you to change how you work.",
    },
  },

  {
    title: {
      es: "Sin límites artificiales.",
      en: "No artificial limits.",
    },
    body: {
      es: "Añade las funciones que realmente necesitas, sin depender de lo que una plataforma decidió ofrecerte. Tu idea no tiene que encajar en lo que ya existe.",
      en: "Add the features you actually need without depending on what a platform decided to offer. Your idea doesn't have to fit into what already exists.",
    },
  },

  {
    title: {
      es: "Crece contigo.",
      en: "Grows with you.",
    },
    body: {
      es: "Empieza con lo necesario y amplíalo cuando tu negocio lo requiera. Añade nuevas funciones, integraciones y capacidades sin tener que reconstruir todo desde cero.",
      en: "Start with what you need and expand as your business requires it. Add new features, integrations, and capabilities without having to rebuild everything from scratch.",
    },
  },
];

export default function DifferentiationSection() {
  const lang = useLang();

  return (
    <section className="w-full bg-grolow-dark border-y border-grolow-light/10">
      <div className="max-w-5xl mx-auto w-full px-4 md:px-8 py-16 md:py-24">
        <ul className="grid gap-10 md:grid-cols-3">
          {BLOCKS.map((block) => (
            <li key={block.title.es}>
              <h2 className="text-xl md:text-2xl font-black uppercase text-grolow-light tracking-tight leading-tight">
                {block.title[lang]}
              </h2>
              <p className="mt-4 text-base text-grolow-light/80 leading-relaxed">
                {block.body[lang]}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
