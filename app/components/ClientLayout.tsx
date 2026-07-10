'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import GlobalCanvas from '@/app/components/GlobalCanvas';
import WhatsAppButton from '@/app/components/WhatsAppButton';
import ScrollToTopButton from '@/app/components/ScrollToTopButton';
import Header from '@/app/components/Header';

gsap.registerPlugin(ScrollTrigger);

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Rutas de landings de cliente que se muestran sin el branding de Grolow
  // (canvas 3D, botón de WhatsApp de Grolow, etc.)
  const standalone =
    pathname?.startsWith('/Hermon-Dental') ||
    pathname?.startsWith('/VisualLab') ||
    false;

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

  // Intercepta clicks en enlaces de ancla (#seccion o /#seccion) para que el
  // scroll sea suave con Lenis en vez del salto nativo del navegador.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.(
        'a[href*="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const match = (anchor.getAttribute('href') ?? '').match(/^\/?#([\w-]+)/);
      if (!match) return;
      const el = document.getElementById(match[1]);
      if (!el) return;
      e.preventDefault();
      const lenis = window.lenis;
      if (lenis) lenis.scrollTo(el, { offset: -88, duration: 1.4 });
      else el.scrollIntoView({ behavior: 'smooth' });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <>
      {!standalone && <GlobalCanvas />}
      {!standalone && <Header />}
      <div className="relative z-10 h-auto">
        {children}
      </div>
      {!standalone && <WhatsAppButton />}
      {!standalone && <ScrollToTopButton />}
    </>
  );
}
