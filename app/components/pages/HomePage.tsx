import Link from "next/link";
import Hero3 from "@/app/components/Hero3";
import ProcessSection from "@/app/components/ProcessSection";
import EngineeringSection from "@/app/components/EngineeringSection";
import FaqSection from "@/app/components/FaqSection";
import ContactSection from "@/app/components/ContactSection";
import ProyectsSection from "@/app/components/ProjectsSection";
import TestimonialsSection from "@/app/components/TestimonialsSection";
import SiteLinksSection from "@/app/components/SiteLinksSection";
import DifferentiationSection from "@/app/components/DifferentiationSection";
import { pathFor, type Lang } from "@/app/lib/i18n";

/**
 * Portada.
 *
 * Ya no es `'use client'`: el idioma llega por props desde la ruta en vez de
 * leerse con `useLang()`, así que el árbol de la portada se renderiza en el
 * servidor y solo bajan al bundle las secciones que de verdad tienen estado
 * (hero, precios, FAQ, contacto…).
 */

const COPY = {
  en: { allServices: "See all services →" },
  es: { allServices: "Ver todos los servicios →" },
} as const;

export default function Home({ lang }: { lang: Lang }) {
  const c = COPY[lang];

  return (
    <main className="w-full">
      <Hero3 lang={lang} />

      {/* Por qué nosotros, antes que el proceso: es la pregunta que trae el
          visitante después del hero. */}
      <DifferentiationSection lang={lang} />

      {/* Proceso / método justo debajo del hero */}
      <ProcessSection lang={lang} />

      <ProyectsSection only={["laperfum", "hellenscute", "warling"]} />

      {/* Enlaces a las páginas de servicio y de segmento: es lo que reparte
          autoridad desde la portada hacia el resto del sitio. */}
      <SiteLinksSection lang={lang} />

      <div className="max-w-5xl mx-auto w-full px-4 md:px-8 -mt-10 md:-mt-14 mb-4 flex justify-center">
        <Link
          href={pathFor("servicios", lang)!}
          className="inline-flex min-h-11 items-center text-xs font-extrabold uppercase tracking-widest text-grolow-light/70 hover:text-grolow-cream transition-colors">
          {c.allServices}
        </Link>
      </div>

      <EngineeringSection lang={lang} />

      {/* Prueba social antes del FAQ: quien llega aquí ya entendió la oferta
          y lo siguiente que pesa es que otro lo haya hecho antes. Si todavía
          no hay testimonios reales, la sección no se pinta. */}
      <TestimonialsSection lang={lang} />

      <FaqSection />
      <ContactSection />
    </main>
  );
}
