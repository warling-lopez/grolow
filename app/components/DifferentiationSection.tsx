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
    title: { es: "Código, no plantillas.", en: "Code, not templates." },
    body: {
      es: "La mayoría de los sitios en RD se montan sobre WordPress y plugins. Nosotros programamos desde cero: más rápido, más seguro, y sin los límites de lo que el constructor permita.",
      en: "Most sites in the DR are assembled on WordPress and plugins. We write code from scratch: faster, safer, and without the limits of whatever the builder allows.",
    },
  },
  {
    title: {
      es: "Hablas con quien construye.",
      en: "You talk to whoever builds it.",
    },
    body: {
      es: "No hay capas ni ejecutivos de cuenta. El que diseña tu sistema es el que te responde cuando escribes.",
      en: "No layers and no account executives. The person who designs your system is the person who answers when you write.",
    },
  },
  {
    title: { es: "Sistemas, no páginas.", en: "Systems, not pages." },
    body: {
      es: "Si tu operación necesita reservas, catálogo, panel interno o integraciones, se construye. No te adaptamos a un tema comprado.",
      en: "If your operation needs bookings, a catalog, an internal dashboard or integrations, it gets built. We don't fit you into a purchased theme.",
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
