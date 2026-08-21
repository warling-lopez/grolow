'use client';
import { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLang } from './hooks/useLang';

gsap.registerPlugin(ScrollTrigger);

const faqsEn = [
  {
    q: "How much does a project cost?",
    a: "You can start with the monthly plan: US$150 setup and US$45 a month, with domain, hosting and all changes included. If you'd rather pay it all at once, plans start at US$550. Before you decide anything, we'll tell you exactly what you need and how much it costs, for free."
  },
  {
    q: "What happens if I need changes after delivery?",
    a: "The first 15 days include adjustments at no cost. After that, on the monthly plan you message us on WhatsApp and we make the change; on the one-time plan, each change is quoted separately."
  },
  {
    q: "Do you use WordPress or visual builders?",
    a: "No. We build everything in custom code (usually React, though it depends on the platform and the project's needs) to guarantee speed, security and performance that builders can't match. Your site loads in under 1 second."
  },
  {
    q: "Can the site be edited once it's delivered?",
    a: "Yes. We deliver a system with the structure needed to make the content 100% editable and restructurable."
  },
  {
    q: "What do I need to get started?",
    a: "Photos of your products and a sense of what you want to achieve. If you don't have a logo or defined colors yet, that's not a problem — we sort it out on the first call."
  },
  {
    q: "Do you use templates, or is the design custom?",
    a: "Everything we build is custom — from the architecture to the development. Every project is unique, focused on functional systems and built to reach the brand's goals."
  },
  {
    q: "What kind of brands/businesses do you work with?",
    a: "Mostly businesses that sell through Instagram and WhatsApp and can no longer keep up sending photos one by one: perfume shops, clothing, food, distributors. If you sell through chat and lose orders, this is exactly for you."
  },
  {
    q: "What if my business is small?",
    a: "Most of our clients are. That's why the monthly plan exists: US$45 a month is less than what many spend in a single day of ads, and this works all 30 days."
  },
  {
    q: "Is the site mine?",
    a: "The content and your brand are always yours. On the monthly plan we maintain the domain and hosting while the plan is active; if you ever want to take it all with you, we can coordinate the handoff."
  },
  {
    q: "What services do you offer?",
    a: "At Grolow we offer: full-stack web design and development, mobile apps, software architecture and custom system development."
  }
];

const faqsEs = [
  {
    q: "¿Cuánto cuesta un proyecto?",
    a: "Puedes empezar con el plan mensual: US$150 de setup y US$45 al mes, con dominio, hosting y todos los cambios incluidos. Si prefieres pagarlo de una vez, desde US$550. Antes de que decidas nada te decimos exactamente qué necesitas y cuánto cuesta, gratis."
  },
  {
    q: "¿Qué pasa si necesito cambios después de la entrega?",
    a: "Los primeros 15 días incluyen ajustes sin costo. Después, con el plan mensual nos escribes por WhatsApp y nosotros hacemos el cambio; si vas por pago único, cotizamos cada cambio aparte."
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
    a: "La mayoría de nuestros clientes lo son. Por eso existe el plan mensual: US$45 al mes es menos de lo que muchos gastan en un solo día de anuncios, y esto trabaja los 30 días."
  },
  {
    q: "¿La web es mía?",
    a: "El contenido y tu marca son tuyos siempre. En el plan mensual nosotros mantenemos el dominio y el hosting mientras el plan esté activo; si algún día quieres llevártelo todo, se puede coordinar el traspaso."
  },
  {
    q: "¿Qué servicios ofrecen?",
    a: "En Grolow ofrecemos: Diseño y desarrollo web full-stack, aplicaciones móviles, arquitectura de software y desarrollo de sistemas a medida."
  }
];

export type Faq = { q: string; a: string };

/**
 * Sin props usa el FAQ general de la home (bilingüe); las landings de nicho
 * pasan su propio `items` en español fijo, sin reaccionar al toggle.
 */
export default function FaqSection({ items }: { items?: Faq[] } = {}) {
  const lang = useLang();
  const faqList = items ?? (lang === "en" ? faqsEn : faqsEs);
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