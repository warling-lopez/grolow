'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function TechSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Revelado de las letras del título
    gsap.fromTo(
      '.tech-title span',
      { rotateX: -90, opacity: 0, y: 50 },
      {
        rotateX: 0,
        opacity: 1,
        y: 0,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 10%',
          end: 'top 3%',
          scrub: 1,
        },
      }
    );

    // Parallax con fromTo para garantizar posición final correcta
    gsap.utils.toArray<HTMLElement>('.tech-item').forEach((item, i) => {
      const startY = i % 2 === 0 ? 80 : 140;

      gsap.fromTo(
        item,
        { y: startY, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            end: 'top 80%',
            scrub: 1,
          },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="w-full  pt-64 pb-80  px-6 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
        <div className="lg:w-1/2 sticky pt-32 h-fit" style={{ perspective: '800px' }}>
          <h2
            className="tech-title text-6xl md:text-8xl font-extrabold text-grolow-light leading-none uppercase"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {'SISTEMAS'.split('').map((l, i) => (
              <span key={i} className="inline-block">
                {l}
              </span>
            ))}{' '}
            <br />
            <span className="text-grolow-cyan italic">QUE ESCALAN.</span>
          </h2>
        </div>

        <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-32">
          {[
            { name: 'Automatización', role: 'Procesos sin trabajo manual' },
            { name: 'Tiempo Real', role: 'Datos sincronizados al instante' },
            { name: 'Seguridad', role: 'Protección de tus datos' },
            { name: 'Escalabilidad', role: 'Crece sin rehacer todo' },
          ].map((tech, i) => (
            <div
              key={i}
              className="tech-item p-12 bg-white/60 border border-grolow-light/10 backdrop-blur-md"
            >
              <h3 className="text-2xl font-bold uppercase">{tech.name}</h3>
              <p className="text-grolow-cyan font-mono text-xs mt-2">{tech.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}