import HeroSection from '@/app/components/HeroSection'
import ValuePropSection from '@/app/components/ValuePropSection'
import ServicesSection from '@/app/components/ServicesSection'
import ContactSection from '@/app/components/ContactSection'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <HeroSection />
      <ValuePropSection />
      <ServicesSection />
      <ContactSection />
    </main>
  )
}