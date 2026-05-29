// En tu page.tsx
import HeroSection from "@/app/components/HeroSection";
import VideoScrollSection from "@/app/components/VideoScrollSection";
import ServicesSection from "@/app/components/ServicesSection";
import ProcessSection from "@/app/components/ProcessSection";
import TechSection from "@/app/components/TechSection";
import FaqSection from "@/app/components/FaqSection";
import ContactSection from "@/app/components/ContactSection";

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <ServicesSection />
      <div style={{ height: "calc(100vh + 3200px)" }}>
        <VideoScrollSection />
      </div>
      <div style={{ height: "calc(100vh + 4300px)" }}>
        <ProcessSection />
      </div>
      <TechSection />
      <FaqSection />
      <ContactSection />
    </main>
  );
}
