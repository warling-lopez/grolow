'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import GlobalCanvas from '@/app/components/GlobalCanvas';
import WhatsAppButton from '@/app/components/WhatsAppButton';
import ScrollToTopButton from '@/app/components/ScrollToTopButton';

gsap.registerPlugin(ScrollTrigger);

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Rutas de landings de cliente que se muestran sin el branding de Grolow
  // (canvas 3D, botón de WhatsApp de Grolow, etc.)
  const standalone = pathname?.startsWith('/Hermon-Dental') ?? false;

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    window.lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      delete window.lenis;
    };
  }, []);

  return (
    <>
      {!standalone && <GlobalCanvas />}
      <div className="relative z-10 h-auto">
        {children}
      </div>
      {!standalone && <WhatsAppButton />}
      {!standalone && <ScrollToTopButton />}
    </>
  );
}
