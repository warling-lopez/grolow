'use client';
import { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "¿Cuánto cuesta un proyecto?",
    a: "Puedes empezar con el plan mensual: US$150 de setup y US$45 al mes, con dominio, hosting y todos los cambios incluidos. Si prefieres pagarlo de una vez, desde US$550. Antes de que decidas nada te digo exactamente qué necesitas y cuánto cuesta, gratis."
  },
  {
    q: "¿Qué pasa si necesito cambios después de la entrega?",
    a: "Los primeros 15 días incluyen ajustes sin costo. Después, con el plan mensual me escribes por WhatsApp y yo hago el cambio; si vas por pago único, cotizamos cada cambio aparte."
  },
  { 
    q: "¿Usan WordPress o constructores visuales?", 
    a: "No. Desarrollamos todo en código propio (React generalmente, pero depende la plataforma a desarrollar y las necesidades del proyecto) para garantizar velocidad, seguridad y un rendimiento que los constructores no pueden igualar. Tu web carga en menos de 1 segundo." 
  },
  { 
    q: "¿Se puede editar la web una vez entregada?", 
    a: "Sí. Entregamos un sistema con la estructura necesaria para que el contenido sea 100% editable y restructurable." 
  },
  {
    q: "¿Qué necesito para poder empezar?",
    a: "Fotos de tus productos y saber qué quieres lograr. Si no tienes logo ni colores definidos, no es un problema — lo resolvemos en la primera llamada."
  },
  { 
    q: "¿Utilizan plantillas o los diseños son a medida?", 
    a: "Todo lo que realizamos es a medida. Desde la arquitectura hasta el desarrollo. Cada proyecto es único, enfocado en sistemas funcionales y pensado para llegar a los objetivos de la marca." 
  },
  {
    q: "¿Con qué tipo de marcas/negocios trabajan?",
    a: "Sobre todo con negocios que venden por Instagram y WhatsApp y ya no dan abasto mandando fotos una por una: perfumerías, ropa, comida, distribuidoras. Si vendes por chat y pierdes pedidos, es exactamente para ti."
  },
  {
    q: "¿Y si mi negocio es pequeño?",
    a: "La mayoría de mis clientes lo son. Por eso existe el plan mensual: US$45 al mes es menos de lo que muchos gastan en un solo día de anuncios, y esto trabaja los 30 días."
  },
  {
    q: "¿La web es mía?",
    a: "El contenido y tu marca son tuyos siempre. En el plan mensual yo mantengo el dominio y el hosting mientras el plan esté activo; si algún día quieres llevártelo todo, se puede coordinar el traspaso."
  },
  {
    q: "¿Qué servicios ofrecen?",
    a: "En Grolow ofrecemos: Diseño y desarrollo web full-stack, aplicaciones móviles, arquitectura de software y desarrollo de sistemas a medida."
  }
];

export type Faq = { q: string; a: string };

/** Sin props usa el FAQ general de la home; las landings pasan el suyo. */
export default function FaqSection({ items }: { items?: Faq[] } = {}) {
  const faqList = items ?? faqs;
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
                    <p className="p-8 pt-0 text-slate-400 text-base leading-relaxed border-t border-grolow-light/10 mt-4">
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