"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLang } from "./hooks/useLang";

gsap.registerPlugin(ScrollTrigger);

/**
 * Dos formas de contratar. Reutiliza el estilo de tarjeta de ServicesSection
 * (bg-white/60 + borde + blur + esquinas redondeadas) para que la sección no
 * introduzca lenguaje visual nuevo.
 *
 * NOTA DE COPY: nunca usar la palabra "mantenimiento" de cara al cliente.
 * Un dueño mira su web funcionando y no entiende qué se le mantiene; el plan
 * se vende como "nosotros nos encargamos de los cambios".
 */
type Plan = {
  id: string;
  title: string;
  price: string;
  features: string[];
  recommended?: boolean;
};

const plansEn: Plan[] = [
  {
    id: "mensual",
    title: "Monthly Plan",
    price: "Setup US$150 + US$45/mo",
    features: [
      "Your full store or site, custom-built",
      "Domain and hosting included, nothing extra to pay",
      "Unlimited changes to products, prices and photos: you message us on WhatsApp and we make it happen",
      "Backups and monitoring",
      "12-month minimum term",
    ],
    recommended: true,
  },
  {
    id: "unico",
    title: "One-Time Payment",
    price: "From US$550",
    features: [
      "The same system, paid all at once",
      "Domain and hosting are on you",
      "15 days of adjustments included",
      "Later changes are quoted separately",
    ],
  },
];

const plansEs: Plan[] = [
  {
    id: "mensual",
    title: "Plan Mensual",
    price: "Setup US$150 + US$45 al mes",
    features: [
      "Tu tienda o web completa, hecha a medida",
      "Dominio y hosting incluidos, no pagas nada aparte",
      "Cambios ilimitados de productos, precios y fotos: nos escribes por WhatsApp y nosotros lo hacemos",
      "Respaldos y monitoreo",
      "Permanencia mínima de 12 meses",
    ],
    recommended: true,
  },
  {
    id: "unico",
    title: "Pago Único",
    price: "Desde US$550",
    features: [
      "El mismo sistema, pagado de una vez",
      "Dominio y hosting corren por tu cuenta",
      "15 días de ajustes incluidos",
      "Los cambios posteriores se cotizan aparte",
    ],
  },
];

const COPY = {
  en: {
    heading: "Two ways to work with us",
    recommended: "Recommended",
    cta: "I want this →",
    footer:
      "Most people choose the monthly plan because they never have to worry about uploading a new product or renewing anything.",
  },
  es: {
    heading: "Dos formas de trabajar con nosotros",
    recommended: "Recomendado",
    cta: "Quiero este →",
    footer:
      "La mayoría elige el plan mensual porque nunca tiene que preocuparse por subir un producto nuevo ni por renovar nada.",
  },
} as const;

export default function PricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lang = useLang();
  const c = COPY[lang];
  const plans = lang === "en" ? plansEn : plansEs;

  useGSAP(
    () => {
      gsap.from(".pricing-card", {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  // backdrop-blur: detrás va el canvas 3D global y sin difuminar compite con
  // el titular (mismo recurso que ProjectsSection y TechSection).
  return (
    <section
      id="planes"
      ref={sectionRef}
      className="w-full py-24 md:py-32 px-4 md:px-8 flex flex-col items-center backdrop-blur-xs"
    >
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="text-3xl md:text-5xl font-black uppercase text-grolow-light pb-8 md:pb-12 border-b border-grolow-light/10">
          {c.heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mt-10 md:mt-14">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="pricing-card group relative overflow-hidden bg-white/60 border border-grolow-light/10 p-6 md:p-10 backdrop-blur-xl flex flex-col rounded-2xl"
            >
              {plan.recommended && (
                <span className="self-start text-[10px] md:text-xs font-mono uppercase tracking-widest px-2 py-1 rounded-md border border-grolow-cyan/40 text-grolow-cyan bg-grolow-cyan/10 mb-6">
                  {c.recommended}
                </span>
              )}

              <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-2xl md:text-4xl font-black uppercase text-grolow-light leading-tight">
                  {plan.title}
                </h3>

                <p className="mt-3 md:mt-4 text-grolow-cyan font-mono text-base md:text-lg">
                  {plan.price}
                </p>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className="text-xs md:text-sm text-slate-400 flex items-start gap-2 leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-grolow-cyan inline-block shrink-0 mt-1.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 md:mt-auto">
                  <a
                    href="#contacto"
                    className="inline-block text-[10px] font-extrabold uppercase tracking-widest px-5 py-3 border border-grolow-light/20 text-grolow-light hover:bg-grolow-cyan hover:border-grolow-cyan hover:text-grolow-dark transition-colors whitespace-nowrap"
                  >
                    {c.cta}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 md:mt-10 text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl">
          {c.footer}
        </p>
      </div>
    </section>
  );
}
