"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".service-card", {
        y: 100,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: sectionRef },
  );

  const services = [
    {
      num: "01",
      title: "Landing Pages de Conversión",
      desc: "Embudos sin fugas. Convertimos tráfico de redes en leads calificados. Desde el primer clic hasta la consulta.",
      result: "Hasta 4× más leads vs web genérica",
    },
    {
      num: "02",
      title: "Tienda Online → WhatsApp",
      desc: "Catálogo digital con carrito que envía el pedido estructurado directo a tu WhatsApp. Sin fricción.",
      result: "0% comisión por venta procesada",
    },
    {
      num: "03",
      title: "Web de Servicios y Citas",
      desc: "Plataformas que muestran tu portafolio, filtran clientes y agendan citas antes de llegar a tu bandeja.",
      result: "Clientes pre-calificados en agenda",
    },
  ];

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="w-full bg-[#050505] overflow-hidden">
      {/* Marquee Banner */}
      {/* Marquee Banner */}
      <div className="w-full bg-grolow-cream text-grolow-dark py-3 flex overflow-hidden whitespace-nowrap">
        <div className="animate-[marquee_20s_linear_infinite] flex gap-8 items-center text-sm font-bold uppercase tracking-widest">
          <span>• GROLOW WEB DEVELOPMENT STUDIO</span>
          <span>• AUTOMATIZACIÓN DE VENTAS</span>
          <span>• SISTEMAS DE ALTO RENDIMIENTO</span>
        </div>
        {/* ... (el div duplicado igual) ... */}

        {/* Duplicado para loop infinito fluido */}
        <div className="animate-[marquee_20s_linear_infinite] flex gap-8 items-center text-sm font-bold uppercase tracking-widest absolute top-0 left-[100%]">
          <span>• GROLOW WEB DEVELOPMENT STUDIO</span>
          <span>• AUTOMATIZACIÓN DE VENTAS</span>
          <span>• SISTEMAS DE ALTO RENDIMIENTO</span>
          <span>• GROLOW WEB DEVELOPMENT STUDIO</span>
          <span>• AUTOMATIZACIÓN DE VENTAS</span>
          <span>• SISTEMAS DE ALTO RENDIMIENTO</span>
        </div>
      </div>

      <div className="w-full py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[.14em] uppercase text-grolow-cyan border border-grolow-cyan/20 bg-grolow-cyan/[.06] px-3 py-1.5 rounded-full mb-8">
                <i className="ti ti-cpu text-[13px]" aria-hidden="true" />
                Infraestructura
              </div>
              <h2
                className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter"
                style={{ fontFamily: "'Syne', sans-serif" }}>
                SISTEMAS QUE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-grolow-cyan to-white/50 italic">
                  NO DESCANSAN.
                </span>
              </h2>
            </div>
            <p className="text-slate-500 max-w-sm text-sm uppercase tracking-widest leading-relaxed">
              Tres módulos. Un solo objetivo: que tu negocio capture y cierre
              sin tu intervención.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-white/[.05]">
            {services.map((s) => (
              <div
                key={s.num}
                className="service-card group relative p-12 border-r border-b border-white/[.05] bg-[#05614B] hover:bg-white/[.02] transition-colors duration-500 flex flex-col justify-between min-h-[400px]">
                <div>
                  <span className="block text-grolow-dark font-mono text-sm mb-12 opacity-50 group-hover:opacity-100 transition-opacity">
                    {s.num} /
                  </span>
                  <h3
                    className="text-2xl font-bold text-white mb-6 uppercase tracking-tight leading-snug"
                    style={{ fontFamily: "'Syne', sans-serif" }}>
                    {s.title}
                  </h3>
                  <p className="text-grolow-dark text-sm leading-relaxed mb-8">
                    {s.desc}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 pt-6 border-t border-white/10 text-xs font-bold uppercase tracking-wider text-grolow-dark">
                    <span className="w-1.5 h-1.5 rounded-full bg-grolow-cyan animate-pulse" />
                    {s.result}
                  </div>
                </div>

                <span className="absolute top-12 right-12 text-4xl text-white/10 group-hover:text-grolow-dark group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300">
                  ↗
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
