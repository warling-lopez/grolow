'use client';
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <html lang="es" className="bg-grolow-dark">
      <body className="antialiased text-white">
        {children}
      </body>
    </html>
  );
}