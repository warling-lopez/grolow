// En tu page.tsx
import HeroSection from '@/app/components/HeroSection'
import VideoScrollSection from '@/app/components/VideoScrollSection'
import ServicesSection from '@/app/components/ServicesSection'
import ProcessSection from '@/app/components/ProcessSection'
import TechSection from '@/app/components/TechSection'
import FaqSection from '@/app/components/FaqSection'
import ContactSection from '@/app/components/ContactSection'

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />

      {/* El wrapper le da al pin de GSAP espacio real en el DOM */}
      {/* 100vh = la sección visible + 3000px = el runway del scroll */}
      <div style={{ height: 'calc(100vh + 3200px)' }}>
        <VideoScrollSection />
      </div>

      <ServicesSection />
      <ProcessSection />
      <TechSection />
      <FaqSection />
      <ContactSection />
    </main>
  )
}