'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

export default function TechSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Revelado de las letras del título
    gsap.from(".tech-title span", {
      rotateX: -90,
      opacity: 0,
      y: 50,
      stagger: 0.05,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        end: "top 20%",
        scrub: 1,
      }
    });

    // Parallax en el grid de tecnologías
    gsap.utils.toArray('.tech-item').forEach((item: any, i) => {
      gsap.from(item, {
        y: (i % 2 === 0) ? 100 : 200, // Los items pares se mueven diferente a los impares
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        }
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="w-full py-64 px-6 bg-transparent">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
        <div className="lg:w-1/2 sticky top-32 h-fit">
          <h2 className="tech-title text-6xl md:text-8xl font-extrabold text-white leading-none uppercase" style={{ fontFamily: "'Syne', sans-serif" }}>
            {"CÓDIGO".split("").map((l, i) => <span key={i} className="inline-block">{l}</span>)} <br />
            <span className="text-grolow-cyan italic">A MEDIDA.</span>
          </h2>
        </div>

        <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-32">
          {[
            { name: "TypeScript", role: "Arquitectura" },
            { name: "Next.js", role: "Rendimiento" },
            { name: "Three.js", role: "Inmersión" },
            { name: "Supabase", role: "Seguridad" }
          ].map((tech, i) => (
            <div key={i} className="tech-item p-12 bg-white/5 border border-white/10 backdrop-blur-md">
              <h3 className="text-2xl font-bold uppercase">{tech.name}</h3>
              <p className="text-grolow-cyan font-mono text-xs mt-2">{tech.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}