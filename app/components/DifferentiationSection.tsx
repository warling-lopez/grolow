import type { Lang } from "@/app/lib/i18n";

/**
 * Los tres pilares del posicionamiento.
 *
 * Sustituyen a «Se adapta a ti / Sin límites artificiales / Crece contigo»,
 * que eran ciertos pero podía firmarlos cualquier estudio. Estos tres solo los
 * puede decir quien construye el sistema con el que se opera un negocio.
 *
 * El tercero —la propiedad del código— estaba enterrado en la FAQ y es el más
 * fuerte comercialmente, así que sube aquí.
 */
const BLOCKS: {
  title: Record<Lang, string>;
  body: Record<Lang, string>;
}[] = [
  {
    title: {
      es: "Sobre tu proceso, no sobre una plantilla.",
      en: "On your process, not on a template.",
    },
    body: {
      es: "El sistema se construye sobre cómo trabajas hoy. No al revés. Si tu negocio tiene una excepción rara, se programa — no se descarta.",
      en: "The system is built on how you work today, not the other way around. If your business has an odd exception, it gets programmed — not dropped.",
    },
  },

  {
    title: {
      es: "Una sola fuente de verdad.",
      en: "A single source of truth.",
    },
    body: {
      es: "Se acabó el dato que vive en tres sitios y no coincide en ninguno. Un lugar, actualizado, al que todos miran.",
      en: "No more data living in three places and matching in none. One place, up to date, that everyone looks at.",
    },
  },

  {
    title: {
      es: "El código es tuyo.",
      en: "The code is yours.",
    },
    body: {
      es: "El repositorio queda a tu nombre. Sin licencias mensuales, sin plugins que caducan, sin quedarte atrapado con nosotros.",
      en: "The repository is in your name. No monthly licences, no plugins that expire, no being locked in with us.",
    },
  },
];

export default function DifferentiationSection({ lang }: { lang: Lang }) {
  return (
    <section className="w-full bg-grolow-dark border-y border-grolow-light/10">
      <div className="max-w-5xl mx-auto w-full px-4 md:px-8 py-16 md:py-24">
        <ul className="grid gap-10 md:grid-cols-3">
          {BLOCKS.map((block, i) => (
            <li
              key={block.title.es}
              className="rise-in"
              style={{ animationDelay: `${i * 90}ms` }}>
              <h2 className="font-display text-xl md:text-2xl font-black uppercase text-grolow-light tracking-tight leading-tight">
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
