// En tu page.tsx
import Hero2 from "@/app/components/Hero2";
import VideoScrollSection from "@/app/components/VideoScrollSection";
import ServicesSection from "@/app/components/ServicesSection";
import ProcessSection from "@/app/components/ProcessSection";
import TechSection from "@/app/components/TechSection";
import FaqSection from "@/app/components/FaqSection";
import ContactSection from "@/app/components/ContactSection";
import ProyectsSection from "@/app/components/ProjectsSection";

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

      <div className="h-[calc(100vh+3450px)] md:h-[calc(100vh+3800px)]">
        <ServicesSection />
      </div>

      <div className="h-[calc(100vh + 250px)] md:h-[calc(100vh+250px)]">
        <TechSection />
      </div>
      <div>
        <FaqSection />
        <ContactSection />
      </div>
    </main>
  );
}
