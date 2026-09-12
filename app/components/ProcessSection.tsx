import LetterReveal from "./LetterReveal";
import type { Lang } from "@/app/lib/i18n";

/**
 * El método, en cuatro pasos numerados.
 *
 * Antes era un carrusel horizontal con `ScrollTrigger` + `pin`: la sección
 * secuestraba el scroll durante ~4.000px (500 de pausa por panel más el
 * desplazamiento entre ellos) para enseñar tres tarjetas. Costaba GSAP en el
 * bundle, no funcionaba con el teclado y obligaba a `window.innerWidth`, que
 * se recalcula en cada resize.
 *
 * Ahora es una rejilla estática. Lo único que se mueve son las letras del
 * titular y la entrada de cada tarjeta, ambas en CSS. Sin `'use client'`: el
 * único componente de cliente es `LetterReveal`, así que el resto del bloque
 * —incluido todo el texto— se renderiza en el servidor y sale en el HTML
 * inicial, que es lo que rastrea el buscador.
 *
 * El numeral fantasma va en un `aria-hidden` detrás del contenido: es
 * decoración tipográfica, y un lector de pantalla que anuncie «cero uno» antes
 * de cada título solo estorba.
 */

type Step = {
  num: string;
  title: Record<Lang, string>;
  desc: Record<Lang, string>;
};

const STEPS: Step[] = [
  {
    num: "01",
    title: { es: "Diagnóstico", en: "Diagnosis" },
    desc: {
      es: "Nos sentamos sobre tu operación real: qué se hace a mano hoy, quién lo hace y cuánto tiempo cuesta. Salimos con un documento, no con una intuición. Parte del trabajo es decirte qué no conviene tocar.",
      en: "We sit down with how you actually operate: what gets done by hand today, who does it, and what it costs in time. We leave with a document, not a hunch. Part of the job is telling you what to leave alone.",
    },
  },
  {
    num: "02",
    title: { es: "Alcance y precio", en: "Scope and price" },
    desc: {
      es: "Propuesta por escrito con alcance cerrado, fases, fechas y precio cerrado. Antes de escribir una línea de código, sabes qué recibes y cuánto cuesta.",
      en: "A written proposal with fixed scope, phases, dates and a fixed price. Before a single line of code, you know what you get and what it costs.",
    },
  },
  {
    num: "03",
    title: { es: "Construcción", en: "Build" },
    desc: {
      es: "Código propio y entregas parciales revisables. Ves el sistema funcionando por fases, no un PDF de avance. Si algo no encaja con tu proceso, se corrige ahí.",
      en: "Custom code and reviewable partial deliveries. You see the system running phase by phase, not a progress PDF. If something doesn't fit your process, it gets fixed then.",
    },
  },
  {
    num: "04",
    title: { es: "Puesta en marcha", en: "Go live" },
    desc: {
      es: "Publicación, datos migrados y tu equipo formado. El repositorio queda a tu nombre: sin licencias mensuales y sin quedarte atrapado con nosotros.",
      en: "Launch, data migrated and your team trained. The repository is yours: no monthly licences, and no being locked in with us.",
    },
  },
];

const COPY = {
  en: { heading: "OUR", headingAccent: "METHOD.", label: "How we work" },
  es: { heading: "NUESTRO", headingAccent: "MÉTODO.", label: "Cómo trabajamos" },
} as const;

export default function ProcessSection({ lang }: { lang: Lang }) {
  const c = COPY[lang];

  return (
    <section
      id="proceso"
      className="w-full bg-grolow-dark border-y border-grolow-light/10">
      <div className="max-w-6xl mx-auto w-full px-4 md:px-8 py-20 md:py-28">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-grolow-light/75 mb-4">
          {c.label}
        </p>

        <h2 className="font-display text-[clamp(2rem,7vw,3.5rem)] font-extrabold text-grolow-light tracking-tighter uppercase leading-[0.95] mb-14 md:mb-20">
          <LetterReveal text={c.heading} />{" "}
          <LetterReveal
            text={c.headingAccent}
            className="text-grolow-cyan italic"
            delay={180}
          />
        </h2>

        <ol className="grid gap-px bg-grolow-light/10 sm:grid-cols-2 lg:grid-cols-4 border border-grolow-light/10">
          {STEPS.map((step, i) => (
            <li
              key={step.num}
              data-step={step.num}
              className="step-card relative isolate overflow-hidden bg-grolow-dark p-6 md:p-8 rise-in"
              style={{ animationDelay: `${i * 90}ms` }}>

              <span className="block text-sm font-mono font-bold text-grolow-cyan mb-4">
                {step.num}
              </span>

              <h3 className="font-display text-xl md:text-2xl lg:text-lg xl:text-xl font-black uppercase text-grolow-light tracking-tight leading-tight wrap-break-word hyphens-auto"
                lang={lang}>
                {step.title[lang]}
              </h3>

              <p className="mt-4 text-base text-grolow-light/75 leading-relaxed">
                {step.desc[lang]}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
