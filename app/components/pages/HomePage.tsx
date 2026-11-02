import Link from "next/link";
import Hero4 from "@/app/components/Hero4";
import Arrow from "@/app/components/Arrow";
import IntroLoader from "@/app/components/transitions/IntroLoader";
import SectionTransition from "@/app/components/transitions/SectionTransition";
import ProcessSection from "@/app/components/ProcessSection";
import EngineeringSection from "@/app/components/EngineeringSection";
import FaqSection from "@/app/components/FaqSection";
import ContactSection from "@/app/components/ContactSection";
import ProyectsSection from "@/app/components/ProjectsSection";
import TestimonialsSection from "@/app/components/TestimonialsSection";
import FounderSection from "@/app/components/FounderSection";
import SiteLinksSection from "@/app/components/SiteLinksSection";
import ScrollDarken from "@/app/components/effects/ScrollDarken";
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
  en: { allServices: "See all services" },
  es: { allServices: "Ver todos los servicios" },
} as const;

export default function Home({ lang }: { lang: Lang }) {
  const c = COPY[lang];

  return (
    <main className="w-full">
      {/* Loader + rotura de entrada. Solo en la portada, y va antes del hero
          para que su script decida antes de que el hero se pinte. */}
      <IntroLoader />
      <Hero4 />

      {/* Por qué nosotros, antes que el proceso: es la pregunta que trae el
          visitante después del hero. */}

      {/* Proceso / método justo debajo del hero */}
      {/* «Lo que hacemos bien» (el dial de Hero4) se rompe y revela el método.
          Orden de pintado: línea central, dial y encima el logo 3D. */}
      <SectionTransition
        from={[
          "#hero-center-line",
          "#lo-que-hacemos-bien",
          // El 3D si ya se cargó; si no, su póster (ver Logo3D en Hero4).
          "model-viewer, img[data-logo-poster]",
        ]}>
        <ProcessSection lang={lang} />
      </SectionTransition>

      {/* Estándares de ingeniería: entre el método y los casos, porque es la
          prueba de que el método se cumple antes de enseñar a quién se le
          cumplió. */}
      {/* Desde la mitad de esta sección la página se va oscureciendo con el
          scroll, hasta llegar a negro justo cuando entran los casos. */}
      <ScrollDarken untilId="zona-oscura">
        <EngineeringSection lang={lang} />
      </ScrollDarken>

      {/* Desde «Casos de éxito» hasta Contacto, en oscuro (ver .home-dark en
          globals.css). El fundador queda fuera, en claro.
          data-header-trigger: el header pasa a texto blanco encima. */}
      <div id="zona-oscura" className="home-dark" data-header-trigger="true">
      <ProyectsSection only={["laperfum", "hellenscute", "warling"]} />

      {/* Enlaces a las páginas de servicio y de segmento: es lo que reparte
          autoridad desde la portada hacia el resto del sitio. */}
      <SiteLinksSection lang={lang} />

      <div className="max-w-5xl mx-auto w-full px-6 md:px-8 -mt-10 md:-mt-14 mb-4 flex justify-center">
        <Link
          href={pathFor("servicios", lang)!}
          className="inline-flex min-h-11 items-center text-xs font-extrabold uppercase tracking-widest text-grolow-light/70 hover:text-grolow-cream transition-colors">
          {c.allServices}
          <Arrow className="ml-1.5" />
        </Link>
      </div>

      {/* Prueba social antes del FAQ: quien llega aquí ya entendió la oferta
          y lo siguiente que pesa es que otro lo haya hecho antes. Si todavía
          no hay testimonios reales, la sección no se pinta. */}
      <TestimonialsSection lang={lang} />

      <FaqSection />
      <ContactSection />
      </div>

      <FounderSection lang={lang} />
    </main>
  );
}
