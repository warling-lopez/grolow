// En tu page.tsx
import Hero2 from "@/app/components/Hero2";
import VideoScrollSection from "@/app/components/VideoScrollSection";
import ServicesSection from "@/app/components/ServicesSection";
import ProcessSection from "@/app/components/ProcessSection";
import TechSection from "@/app/components/TechSection";
import FaqSection from "@/app/components/FaqSection";
import ContactSection from "@/app/components/ContactSection";
import ProyectsSection from "@/app/components/ProjectsSection";
import PricingSection from "@/app/components/PricingSection";
import AboutSection from "@/app/components/AboutSection";

export default function Home() {
  return (
    <main className="w-full">
      <Hero2 />

      {/* Proceso / método justo debajo del hero */}
      <div className="h-[calc(100vh+2200px)] md:h-[calc(100vh+4100px)]">
        <ProcessSection />
      </div>

      <ProyectsSection />

      <div
        className="hidden md:block"
        style={{ height: "calc(100vh + 3200px)" }}>
        <VideoScrollSection />
      </div>

      {/* Sin altura fija: ServicesSection no está pineada, así que se mide
          sola. La altura reservada anterior estaba calculada para las 8
          tarjetas y dejaba ~2.500px en blanco ahora que sólo se muestran 3
          hasta abrir el acordeón. */}
      <ServicesSection />

      {/* Planes justo después de servicios: el precio es lo siguiente que
          pregunta quien acaba de entender qué se le vende. */}
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
