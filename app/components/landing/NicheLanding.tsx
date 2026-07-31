"use client";

import Hero2, { type HeroCTA } from "@/app/components/Hero2";
import SplitText from "@/app/components/SplitText";
import ProjectsSection, {
  type ProjectId,
} from "@/app/components/ProjectsSection";
import FaqSection, { type Faq } from "@/app/components/FaqSection";
import AboutSection from "@/app/components/AboutSection";

/* ------------------------------------------------------------------ */
/* Config de una landing de nicho                                      */
/* ------------------------------------------------------------------ */

export type NicheLandingConfig = {
  hero: {
    eyebrow: string;
    title: React.ReactNode;
    subtitle: React.ReactNode;
    ctas: HeroCTA[];
  };
  /** Los 3 dolores concretos del nicho, en su propio lenguaje. */
  pains: { title: string; body: string }[];
  /** Cómo funciona, paso a paso. */
  steps: { num: string; title: string; body: string }[];
  /**
   * Casos a mostrar. Se omite la sección entera si no hay ninguno: una
   * landing con "casos de éxito" vacíos convierte peor que no tenerla.
   */
  projects?: {
    only: ProjectId[];
    eyebrow: string;
    heading: React.ReactNode;
  };
  /** Banda de CTA intermedia, justo después de casos / cómo funciona. */
  midCta: { text: string; label: string; href: string };
  pricing: {
    headline: string;
    setup: string;
    bullets: string[];
    note?: string;
  };
  faqs: Faq[];
  finalCta: { text: string; label: string; href: string };
};

/* ------------------------------------------------------------------ */
/* Banda de CTA reutilizable                                           */
/* ------------------------------------------------------------------ */

function CtaBand({
  text,
  label,
  href,
  external = false,
}: {
  text: string;
  label: string;
  href: string;
  external?: boolean;
}) {
  return (
    <section className="w-full px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-5xl mx-auto w-full bg-white/60 border border-grolow-light/10 backdrop-blur-xl rounded-2xl p-8 md:p-14 flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
        <p className="text-[clamp(1.05rem,2.2vw,1.5rem)] text-grolow-light font-medium leading-relaxed flex-1">
          {text}
        </p>
        <a
          href={href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="group shrink-0 inline-flex items-center justify-center gap-3 px-6 md:px-8 py-4 bg-grolow-cream text-grolow-dark font-bold uppercase tracking-wider text-sm hover:bg-grolow-light transition-colors text-center"
        >
          {label}
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </a>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Landing                                                             */
/* ------------------------------------------------------------------ */

export default function NicheLanding({
  config,
}: {
  config: NicheLandingConfig;
}) {
  const { hero, pains, steps, projects, midCta, pricing, faqs, finalCta } =
    config;

  return (
    <main className="w-full">
      <Hero2
        eyebrow={
          <SplitText className="text-[clamp(0.8rem,3.2vw,1.5rem)]">
            {hero.eyebrow}
          </SplitText>
        }
        title={hero.title}
        subtitle={hero.subtitle}
        ctas={hero.ctas}
      />

      {/* ── El problema, en el lenguaje del nicho ── */}
      <section className="w-full px-4 md:px-8 py-20 md:py-28 backdrop-blur-xs">
        <div className="max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {pains.map((pain) => (
              <div
                key={pain.title}
                className="bg-white/60 border border-grolow-light/10 backdrop-blur-md rounded-2xl p-6 md:p-8 flex flex-col gap-3"
              >
                <h3 className="text-lg md:text-xl font-bold uppercase text-grolow-light leading-tight">
                  {pain.title}
                </h3>
                <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                  {pain.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cómo funciona ── */}
      {/* backdrop-blur: detrás va el canvas 3D global y sin difuminar compite
          con el texto (mismo recurso que usa TechSection en la home). */}
      <section
        id="como-funciona"
        className="w-full px-4 md:px-8 py-16 md:py-24 backdrop-blur-lg"
      >
        <div className="max-w-5xl mx-auto w-full">
          <h2 className="text-[clamp(2rem,5.5vw,4rem)] font-black uppercase text-grolow-light leading-none pb-10 md:pb-14 border-b border-grolow-light/10">
            Cómo funciona
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mt-10 md:mt-14">
            {steps.map((step) => (
              <div key={step.num} className="flex flex-col gap-4">
                {/* `grolow-card` (#FFFCF4) sólo se ve sobre fondo oscuro como
                    en ProcessSection; aquí el fondo es crema, así que el número
                    va en tinta translúcida. */}
                <span className="text-grolow-light/20 font-mono text-5xl md:text-7xl font-bold leading-none">
                  {step.num}
                </span>
                <h3 className="text-xl md:text-2xl font-bold uppercase text-grolow-light leading-tight">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Casos: sólo si existen de verdad ── */}
      {projects && (
        <ProjectsSection
          only={projects.only}
          eyebrow={projects.eyebrow}
          heading={projects.heading}
        />
      )}

      <CtaBand {...midCta} />

      {/* ── Precio ── */}
      <section
        id="precio"
        className="w-full px-4 md:px-8 py-16 md:py-24 backdrop-blur-xs"
      >
        <div className="max-w-5xl mx-auto w-full">
          <h2 className="text-[clamp(2rem,5.5vw,4rem)] font-black uppercase text-grolow-light leading-none pb-10 md:pb-14 border-b border-grolow-light/10">
            {pricing.headline}
          </h2>

          <div className="mt-10 md:mt-14 bg-white/60 border border-grolow-light/10 backdrop-blur-xl rounded-2xl p-6 md:p-12 flex flex-col lg:flex-row gap-10">
            <div className="lg:w-2/5">
              <p className="text-grolow-cyan font-mono text-[clamp(1.15rem,3vw,1.75rem)] leading-tight">
                {pricing.setup}
              </p>
              {pricing.note && (
                <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                  {pricing.note}
                </p>
              )}
              <a
                href="#contacto"
                className="mt-8 inline-block text-[10px] font-extrabold uppercase tracking-widest px-5 py-3 border border-grolow-light/20 text-grolow-light hover:bg-grolow-cyan hover:border-grolow-cyan hover:text-grolow-dark transition-colors"
              >
                Pedir mi propuesta gratis →
              </a>
            </div>

            <ul className="lg:w-3/5 space-y-3">
              {pricing.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="text-sm md:text-base text-slate-400 flex items-start gap-3 leading-relaxed"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-grolow-cyan inline-block shrink-0 mt-2" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <AboutSection />

      <FaqSection items={faqs} />

      {/* ── CTA final ── */}
      <section
        id="contacto"
        className="w-full border-t border-grolow-light/10"
      >
        <CtaBand {...finalCta} external />
      </section>
    </main>
  );
}
