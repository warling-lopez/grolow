import ServicesSection from "@/app/components/ServicesSection";
import ProjectsSection from "@/app/components/ProjectsSection";
import ContactSection from "@/app/components/ContactSection";

export default function ServiciosPage() {
  return (
    <main className="w-full">
      <div className="max-w-5xl mx-auto w-full px-4 md:px-8 pt-36 md:pt-44">
        <p className="text-xs font-mono uppercase tracking-widest text-grolow-light/40 mb-3">
          Lo que hacemos
        </p>
        <h1 className="text-[clamp(2rem,5.5vw,4.5rem)] font-black uppercase text-grolow-light leading-none">
          Todos los servicios,
          <br />
          <span className="text-grolow-light/30">en un solo lugar.</span>
        </h1>
      </div>

      <ServicesSection />

      <ProjectsSection />

      <ContactSection />
    </main>
  );
}
