'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function ProcessSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const lines = gsap.utils.toArray('.process-line');
    const items = gsap.utils.toArray('.process-item');

    items.forEach((item: any, i) => {
      gsap.from(item, {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
        }
      });
      
      if (lines[i]) {
        gsap.fromTo(lines[i] as Element, 
          { height: 0 },
          {
            height: "100%",
            duration: 1.5,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: item,
              start: "top 70%",
            }
          }
        );
      }
    });
  }, { scope: container });

  const steps = [
    { num: "01", title: "Auditoría Técnica", desc: "Analizamos tu flujo de ventas actual y detectamos cuellos de botella." },
    { num: "02", title: "Arquitectura & Desarrollo", desc: "Construimos el sistema a medida. Diseño UI/UX premium y código limpio." },
    { num: "03", title: "Automatización & Despliegue", desc: "Conectamos tu web con WhatsApp o tu CRM. Listo para recibir tráfico." }
  ];

  return (
    <section ref={container} className="w-full py-32 px-6 bg-[#080808]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter mb-20 uppercase" style={{ fontFamily: "'Syne', sans-serif" }}>
          NUESTRO <span className="text-grolow-cyan italic">MÉTODO.</span>
        </h2>

        <div className="flex flex-col gap-0">
          {steps.map((step, index) => (
            <div key={step.num} className="process-item relative pl-12 md:pl-20 pb-20 group">
              {/* Línea vertical animada */}
              {index !== steps.length - 1 && (
                <div className="absolute left-[11px] md:left-[15px] top-10 bottom-0 w-[1px] bg-white/10">
                  <div className="process-line w-full bg-grolow-cyan origin-top" />
                </div>
              )}
              
              {/* Punto indicador */}
              <div className="absolute left-0 md:left-1 top-2 w-6 h-6 rounded-full border-2 border-white/20 bg-[#080808] group-hover:border-grolow-cyan transition-colors z-10 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-grolow-cyan rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <span className="block text-grolow-cyan font-mono text-sm mb-4">{step.num} //</span>
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 uppercase tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                {step.title}
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}