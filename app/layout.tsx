'use client';
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import GlobalCanvas from '@/app/components/GlobalCanvas';
import './globals.css';

gsap.registerPlugin(ScrollTrigger);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    // CLAVE: Le decimos a ScrollTrigger que use la posición de Lenis
    // en vez de window.scrollY
    lenis.on('scroll', ScrollTrigger.update);

    // Metemos el RAF de Lenis dentro del ticker de GSAP
    // para que ambos corran en el mismo frame y nunca se desincronicen
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // GSAP usa segundos, Lenis usa milisegundos
    });

    // Desactivamos el RAF propio de GSAP para evitar frames duplicados
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <html lang="es" className="bg-grolow-dark">
      <body className="antialiased text-white relative">
        <GlobalCanvas />
        <div className="relative z-10 h-auto">
          {children}
        </div>
      </body>
    </html>
  );
}