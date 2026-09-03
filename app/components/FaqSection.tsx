'use client';
import { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLang } from './hooks/useLang';
import { HOME_FAQ_EN, HOME_FAQ_ES, type Faq } from '@/app/lib/content/home-faq';

gsap.registerPlugin(ScrollTrigger);



export type { Faq };

/**
 * Sin props usa el FAQ general de la home (bilingüe); las landings de nicho
 * pasan su propio `items` en español fijo, sin reaccionar al toggle.
 */
export default function FaqSection({ items }: { items?: Faq[] } = {}) {
  const lang = useLang();
  const faqList = items ?? (lang === "en" ? HOME_FAQ_EN : HOME_FAQ_ES);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".faq-item", {
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      }
    });
  }, { scope: sectionRef });

  return (
    <section id="faq" ref={sectionRef} className="w-full py-32 px-6 bg-grolow-dark border-t border-grolow-light/10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-[clamp(2rem,5vw,3rem)] font-extrabold text-grolow-light tracking-tighter mb-16 uppercase text-center" style={{ fontFamily: "'Syne', sans-serif" }}>
          FAQ 
        </h2>

        <div className="flex flex-col gap-4">
          {faqList.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="faq-item border border-grolow-light/10 bg-white/60 overflow-hidden"
              >
                <button 
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-8 flex justify-between items-center text-left hover:bg-grolow-light/4 transition-colors"
                >
                  <span className="text-lg md:text-xl font-bold text-grolow-light uppercase tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {faq.q}
                  </span>
                  <span className={`text-grolow-cyan text-2xl font-light transform transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                
                <div 
                  className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="p-8 pt-0 text-grolow-light/75 text-base leading-relaxed border-t border-grolow-light/10 mt-4">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}