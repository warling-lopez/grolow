'use client';
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import GlobalCanvas from '@/app/components/GlobalCanvas'; // <-- Importa esto
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <html lang="es" className="bg-grolow-dark">
      <body className="antialiased text-white relative">
        <GlobalCanvas /> {/* <-- El lienzo 3D maestro */}
        <div className="relative z-10 h-2000">
          {children}
        </div>
      </body>
    </html>
  );
}