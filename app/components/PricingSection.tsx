"use client";
import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLang } from "./hooks/useLang";
import { TIERS, priceLabel } from "@/app/lib/pricing";
import { pathFor } from "@/app/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

/**
 * Precios por tipo de proyecto, leídos de `app/lib/pricing.ts`.
 *
 * Antes eran dos planes de suscripción. Ahora se cotiza por alcance, que es lo
 * que de verdad mueve el número, así que la sección enseña el rango de cada
 * tipo y de qué depende caer en la parte baja o alta.
 *
 * NOTA DE COPY: nunca usar la palabra "mantenimiento" de cara al cliente.
 * Un dueño mira su web funcionando y no entiende qué se le mantiene.
 */
const COPY = {
  en: {
    heading: "What it costs",
    intro:
      "Ranges, not «starting at». Where you land inside each range depends on scope, and we tell you which end before we start.",
    depends: "What moves the price",
    cta: "See the full pricing breakdown",
  },
  es: {
    heading: "Cuánto cuesta",
    intro:
      "Rangos, no «desde». Dónde caes dentro de cada rango depende del alcance, y te decimos en qué extremo estás antes de empezar.",
    depends: "Qué mueve el precio",
    cta: "Ver el desglose completo de precios",
  },
} as const;

export default function PricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lang = useLang();
  const c = COPY[lang];

  useGSAP(
    () => {
      gsap.from(".pricing-card", {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef },
  );

  // backdrop-blur: detrás va el canvas 3D global y sin difuminar compite con
  // el titular (mismo recurso que ProjectsSection y TechSection).
  return (
    <section
      id="planes"
      ref={sectionRef}
      className="w-full py-24 md:py-32 px-4 md:px-8 flex flex-col items-center backdrop-blur-xs">
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="text-3xl md:text-5xl font-black uppercase text-grolow-light pb-8 md:pb-12 border-b border-grolow-light/10">
          {c.heading}
        </h2>

        <p className="mt-8 text-base md:text-lg text-grolow-light/80 leading-relaxed max-w-2xl">
          {c.intro}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-10 md:mt-14">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className="pricing-card group relative overflow-hidden bg-white/60 border border-grolow-light/10 p-6 md:p-8 backdrop-blur-xl flex flex-col rounded-2xl">
              <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-xl md:text-2xl font-black uppercase text-grolow-light leading-tight">
                  {tier.name[lang]}
                </h3>

                <p className="mt-3 text-grolow-cream font-mono text-lg md:text-xl font-bold">
                  {priceLabel(tier, lang)}
                </p>

                <p className="mt-4 text-sm md:text-base text-grolow-light/80 leading-relaxed">
                  {tier.what[lang]}
                </p>

                <div className="mt-5 pt-5 border-t border-grolow-light/10">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-grolow-cream mb-2">
                    {c.depends}
                  </p>
                  <p className="text-sm text-grolow-light/75 leading-relaxed">
                    {tier.depends[lang]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href={pathFor("precios", lang)!}
            className="inline-block text-xs font-extrabold uppercase tracking-widest px-6 py-4 border border-grolow-light/30 text-grolow-light hover:bg-grolow-cream hover:border-grolow-cream hover:text-white transition-colors">
            {c.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
