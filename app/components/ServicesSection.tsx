'use client';
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.service-card');
    
    // Pinning de la sección completa para dar espacio
    

    cards.forEach((card: any, i) => {
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 50%",
          end: "top 20%",
          scrub: true,
        },
        y: -80 * i, // Efecto cascada
        rotate: i % 2 === 0 ? 2 : -4,
      });

      // Efecto interactivo individual al mover el mouse sobre la tarjeta
      
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full h-screen bg-transparent my-50 py-20 flex items-center">
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 gap-10">
        {[1, 2, 3].map((num) => (
          <div key={num} className="service-card group relative overflow-hidden bg-white/5 border border-white/10 p-16 backdrop-blur-xl h-[400px]">
            {/* El "Glow" que sigue al mouse dentro de la tarjeta */}
            <div className="glow pointer-events-none absolute w-[300px] h-[300px] bg-grolow-cyan/20 rounded-full blur-[100px] opacity-0 transition-opacity" />
            
            <h3 className="text-5xl font-black uppercase">Servicio {num}</h3>
            <p className="mt-4 text-slate-400 max-w-md">Tecnología de punta para despliegues masivos.</p>
          </div>
        ))}
      </div>
    </section>
  );
}