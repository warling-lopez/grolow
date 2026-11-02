"use client";
import ServicesSection from "@/app/components/ServicesSection";
import ProjectsSection from "@/app/components/ProjectsSection";
import ContactSection from "@/app/components/ContactSection";
import { useLang } from "@/app/components/hooks/useLang";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import SiteLinksSection from "@/app/components/SiteLinksSection";

const COPY = {
  en: {
    eyebrow: "What we do",
    heading1: "All our services,",
    heading2: "in one place.",
  },
  es: {
    eyebrow: "Lo que hacemos",
    heading1: "Todos los servicios,",
    heading2: "en un solo lugar.",
  },
} as const;

export default function ServiciosPage() {
  const lang = useLang();
  const c = COPY[lang];
  return (
    <main className="w-full bg-grolow-dark">
      <Breadcrumbs routeId="servicios" lang={lang} />

      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 pt-4 md:pt-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-grolow-cream mb-3">
          {c.eyebrow}
        </p>
        <h1 className="font-serif font-black text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.08] tracking-tight text-neutral-900">
          {c.heading1}
          <br />
          <span className="text-grolow-cream">{c.heading2}</span>
        </h1>
      </div>

      <ServicesSection />

      {/* Enlaces a cada página de servicio: el índice tiene que repartir
          hacia las páginas que compiten por cada palabra clave. */}
      <SiteLinksSection lang={lang} />

      <ProjectsSection />

      <ContactSection />
    </main>
  );
}
