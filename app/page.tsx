import HeroSection from '@/app/components/HeroSection'
import ValuePropSection from '@/app/components/ValuePropSection'
import ServicesSection from '@/app/components/ServicesSection'
import ProcessSection from '@/app/components/ProcessSection' // NUEVO
import TechSection from '@/app/components/TechSection'       // NUEVO
import FaqSection from '@/app/components/FaqSection'         // NUEVO
import ContactSection from '@/app/components/ContactSection'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#050505] h-10000">
      <HeroSection />
      <ValuePropSection />
      <ServicesSection />
      <ProcessSection />
      <TechSection />
      <FaqSection />
      <ContactSection />
    </main>
  )
}