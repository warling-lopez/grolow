// En tu page.tsx
"use client";
import Link from "next/link";
import Hero2 from "@/app/components/Hero2";
import VideoScrollSection from "@/app/components/VideoScrollSection";
import ProcessSection from "@/app/components/ProcessSection";
import TechSection from "@/app/components/TechSection";
import FaqSection from "@/app/components/FaqSection";
import ContactSection from "@/app/components/ContactSection";
import ProyectsSection from "@/app/components/ProjectsSection";
import PricingSection from "@/app/components/PricingSection";
import AboutSection from "@/app/components/AboutSection";
import { useLang } from "@/app/components/hooks/useLang";
import { pathFor } from "@/app/lib/i18n";
import SiteLinksSection from "@/app/components/SiteLinksSection";
import DifferentiationSection from "@/app/components/DifferentiationSection";

/**
 * Capturas reales de los proyectos en línea, para el mosaico del hero.
 *
 * Hero2 traía 16 rectángulos de color como marcador de posición, con la nota
 * de reemplazarlos por capturas reales. Se ciclan los seis proyectos hasta
 * llenar las columnas.
 */
const PREVIEWS = [
  { src: "/projects/laperfum.webp", name: "La Perfurm RD" },
  { src: "/projects/hellenscute.webp", name: "Hellen's Cute Kids" },
  { src: "/projects/warling.webp", name: "Warling Dev" },
  { src: "/projects/aromacaribenio.webp", name: "Aroma Caribeño" },
  { src: "/projects/deliscias-marijo.webp", name: "Delicias Marijo" },
  { src: "/projects/wai.webp", name: "WAI" },
];

const COPY = {
  en: { allServices: "See all services →" },
  es: { allServices: "Ver todos los servicios →" },
} as const;

export default function Home() {
  const lang = useLang();
  const c = COPY[lang];

  const heroImages = Array.from({ length: 16 }, (_, i) => {
    const project = PREVIEWS[i % PREVIEWS.length];
    return {
      src: project.src,
      alt:
        lang === "es"
          ? `Vista previa del sitio de ${project.name}`
          : `Preview of the ${project.name} website`,
    };
  });
  return (
    <main className="w-full">
      <Hero2 images={heroImages} />

      {/* Por qué nosotros, antes que el proceso: es la pregunta que trae el
          visitante después del hero. */}
      <DifferentiationSection />

      {/* Proceso / método justo debajo del hero */}
      <ProcessSection />

      <ProyectsSection only={["laperfum", "hellenscute", "warling"]} />

      {/* Enlaces a las páginas de servicio y de segmento: es lo que reparte
          autoridad desde la portada hacia el resto del sitio. */}
      <SiteLinksSection />

      <div className="max-w-5xl mx-auto w-full px-4 md:px-8 -mt-10 md:-mt-14 mb-4 flex justify-center">
        <Link
          href={pathFor("servicios", lang)!}
          className="text-xs font-extrabold uppercase tracking-widest text-grolow-light/70 hover:text-grolow-cream transition-colors">
          {c.allServices}
        </Link>
      </div>

      <div
        className="hidden md:block"
        style={{ height: "calc(100vh + 3200px)" }}>
        <VideoScrollSection />
      </div>

      {/* Planes: el precio es lo siguiente que pregunta quien acaba de
          entender qué se le vende. */}
      <PricingSection />

      <div className="h-[calc(100vh + 250px)] md:h-[calc(100vh+250px)]">
        <TechSection />
      </div>

      {/* La persona detrás, antes del FAQ y del formulario. */}
      <AboutSection />

      <div>
        <FaqSection />
        <ContactSection />
      </div>
    </main>
  );
}
