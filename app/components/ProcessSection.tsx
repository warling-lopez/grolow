'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: "01", title: "Auditoría Técnica", desc: "Analizamos tu flujo de ventas actual y detectamos cuellos de botella." },
  { num: "02", title: "Arquitectura & Desarrollo", desc: "Construimos el sistema a medida. Diseño UI/UX premium y código limpio." },
  { num: "03", title: "Automatización & Despliegue", desc: "Conectamos tu web con WhatsApp o tu CRM. Listo para recibir tráfico." }
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray('.process-panel');
    
    // Calculamos cuánto tenemos que mover el contenedor en el eje X
    const getScrollAmount = () => {
      let wrapperWidth = scrollWrapperRef.current?.scrollWidth || 0;
      return -(wrapperWidth - window.innerWidth);
    };

    const tween = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top", // Empieza cuando la sección llega arriba
        end: () => `+=${getScrollAmount() * -1}`, // La duración del scroll = ancho total
        pin: true, // ¡ESTO ES CLAVE! Fija la pantalla
        scrub: 1, // Suavizado
        invalidateOnRefresh: true,
      }
    });

    // Animación interna de los textos al aparecer en pantalla
    sections.forEach((panel: any) => {
      gsap.from(panel.querySelectorAll('.stagger-text'), {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: panel,
          containerAnimation: tween, // Enlaza este trigger a la animación horizontal
          start: "left center",
        }
      });
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="h-screen w-full overflow-hidden bg-transparent relative flex items-center">
      <div className="absolute top-12 left-6 md:left-12 z-20">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tighter uppercase" style={{ fontFamily: "'Syne', sans-serif" }}>
          NUESTRO <span className="text-grolow-cyan italic">MÉTODO.</span>
        </h2>
      </div>

      <div ref={scrollWrapperRef} className="flex h-full w-[300vw]">
        {steps.map((step, index) => (
          <div key={step.num} className="process-panel w-screen h-full flex items-center justify-center relative p-6">
            
            {/* Elementos de diseño técnicos de fondo */}
            <div className="absolute inset-0 border-r border-white/5 bg-black/40 backdrop-blur-sm" />
            
            <div className="relative z-10 max-w-xl mx-auto flex flex-col gap-6">
              <span className="stagger-text block text-grolow-cyan font-mono text-6xl md:text-8xl opacity-20 font-bold leading-none">
                {step.num}
              </span>
              <h3 className="stagger-text text-4xl md:text-6xl font-bold text-white uppercase tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                {step.title}
              </h3>
              <p className="stagger-text text-slate-400 text-xl leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}