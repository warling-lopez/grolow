'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function TechSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".tech-item", {
      y: 60,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "expo.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      }
    });
  }, { scope: sectionRef });

  const techStack = [
    { name: "TypeScript", role: "Arquitectura robusta" },
    { name: "Next.js / React", role: "Rendimiento ultrarrápido" },
    { name: "Three.js & WebGL", role: "Experiencias 3D interactivas" },
    { name: "Supabase / SQL", role: "Bases de datos seguras" }
  ];

  return (
    <section ref={sectionRef} className="w-full py-32 px-6 bg-[#050505] border-t border-white/[.05]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20">
        <div className="md:w-1/3">
          <span className="block text-[11px] font-bold tracking-[.3em] uppercase text-grolow-cyan mb-8">
            Stack Tecnológico
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter mb-6 uppercase" style={{ fontFamily: "'Syne', sans-serif" }}>
            CÓDIGO <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-grolow-cyan to-white/30 italic">A MEDIDA.</span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            No usamos plantillas prefabricadas. Construimos la infraestructura digital de tu empresa desde cero, garantizando velocidad extrema, seguridad y escalabilidad total.
          </p>
        </div>

        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {techStack.map((tech, i) => (
            <div key={i} className="tech-item p-10 border border-white/[.05] bg-[#080808] hover:border-grolow-cyan/40 transition-colors group">
              <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight group-hover:text-grolow-cyan transition-colors" style={{ fontFamily: "'Syne', sans-serif" }}>
                {tech.name}
              </h3>
              <p className="text-sm text-slate-500 font-mono tracking-wide">{tech.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}