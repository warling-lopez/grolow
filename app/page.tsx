import HeroSection from '@/app/components/HeroSection'
import VideoScrollSection from '@/app/components/VideoScrollSection' // <-- TU NUEVA SECCIÓN
import ValuePropSection from '@/app/components/ValuePropSection'
import ServicesSection from '@/app/components/ServicesSection'
import ProcessSection from '@/app/components/ProcessSection'
import TechSection from '@/app/components/TechSection'
import FaqSection from '@/app/components/FaqSection'
import ContactSection from '@/app/components/ContactSection'

export default function Home() {
  return (
    // Quitamos los fondos sólidos de aquí para que el GlobalCanvas (que está en layout.tsx) 
    // se pueda ver en las secciones transparentes.
    <main className="flex min-h-screen flex-col items-center justify-between">
      
      {/* 1. Hero interactivo con mouse parallax */}
      <HeroSection />

      {/* 2. El video controlado por scroll entra aquí como un golpe visual fuerte */}
      <VideoScrollSection />

      {/* 3. El resto de tu contenido */}
      <ValuePropSection />
      <ServicesSection />
      <ProcessSection />
      <TechSection />
      <FaqSection />
      <ContactSection />
      
    </main>
  )
}

