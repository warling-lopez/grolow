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
    <main className="w-full">
      <Breadcrumbs routeId="servicios" lang={lang} />

      <div className="max-w-5xl mx-auto w-full px-4 md:px-8 pt-8 md:pt-10">
        <p className="text-xs font-mono uppercase tracking-widest text-grolow-light/40 mb-3">
          {c.eyebrow}
        </p>
        <h1 className="text-[clamp(2rem,5.5vw,4.5rem)] font-black uppercase text-grolow-light leading-none">
          {c.heading1}
          <br />
          <span className="text-grolow-light/30">{c.heading2}</span>
        </h1>
      </div>

      <ServicesSection />

      {/* Enlaces a cada página de servicio: el índice tiene que repartir
          hacia las páginas que compiten por cada palabra clave. */}
      <SiteLinksSection />

      <ProjectsSection />

      <ContactSection />
    </main>
  );
}
