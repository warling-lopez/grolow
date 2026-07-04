'use client';

import { useEffect, useState } from 'react';
import type Lenis from '@studio-freight/lenis';

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    const lenis = window.lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Volver arriba"
      className={[
        'fixed bottom-24 right-6 z-50 flex items-center gap-3 group',
        'transition-all duration-300',
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none',
      ].join(' ')}>
      {/* Tooltip */}
      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#111] text-white text-xs font-medium px-3 py-2 rounded-lg whitespace-nowrap border border-white/10 pointer-events-none">
        Volver arriba
      </span>

      {/* Botón circular */}
      <div className="w-14 h-14 rounded-full bg-[#111] flex items-center justify-center shadow-lg shadow-black/30 border border-white/10 hover:scale-110 transition-transform duration-200">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M12 19V5" />
          <path d="M5 12l7-7 7 7" />
        </svg>
      </div>
    </button>
  );
}
