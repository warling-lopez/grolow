'use client';
import { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  { q: "¿Usan WordPress o constructores visuales?", a: "No. Desarrollamos todo desde cero usando tecnologías modernas (React, TypeScript) para garantizar tiempos de carga menores a 1 segundo y máxima seguridad." },
  { q: "¿Tengo que pagar comisiones por las ventas en mi tienda?", a: "Absolutamente cero. Tu sistema envía los pedidos directo a tu WhatsApp. No dependes de pasarelas de pago que te roban un porcentaje de tu facturación." },
  { q: "¿En cuánto tiempo me entregan el sistema?", a: "Un promedio de 72 horas para tiendas a WhatsApp y Landing Pages, una vez nos entregues la información y catálogo de tu negocio." },
];

export default function FaqSection() {
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
    <section ref={sectionRef} className="w-full py-32 px-6 bg-[#080808] border-t border-white/[.05]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter mb-16 uppercase text-center" style={{ fontFamily: "'Syne', sans-serif" }}>
          PREGUNTAS <span className="text-grolow-cyan italic">FRECUENTES.</span>
        </h2>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="faq-item border border-white/[.05] bg-[#050505] overflow-hidden"
              >
                <button 
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-8 flex justify-between items-center text-left hover:bg-white/[.02] transition-colors"
                >
                  <span className="text-lg md:text-xl font-bold text-white uppercase tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
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
                    <p className="p-8 pt-0 text-slate-400 text-base leading-relaxed border-t border-white/[.02] mt-4">
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