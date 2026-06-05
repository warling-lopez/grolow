// En tu page.tsx
import HeroSection from "@/app/components/HeroSection";
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
      <div>
        <HeroSection />
        <ProyectsSection />
        <ServicesSection />
      </div>
      <div
        className="hidden md:block"
        style={{ height: "calc(100vh + 3200px)" }}>
        <VideoScrollSection />
      </div>
      <div className="h-[calc(100vh+2000px)] md:h-[calc(100vh+4800px)]">
        {" "}
        <ProcessSection />
      </div>

      <div style={{ height: "calc(100vh + 1200px)" }}>
        <TechSection />
      </div>
      <div>
        <FaqSection />
        <ContactSection />
      </div>
    </main>
  );
}
