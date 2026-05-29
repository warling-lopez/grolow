"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "Paso 01",
    title: "Diagnóstico",
    desc: "Analizamos tu negocio, tus clientes y tu objetivo real. Detectamos qué frena tus ventas y qué tipo de sistema necesitas.",
  },
  {
    num: "Paso 02",
    title: "Diseño y desarrollo",
    desc: "Construimos tu sistema desde cero. UI/UX premium, código limpio, sin plantillas genéricas. Tú apruebas antes del lanzamiento.",
  },
  {
    num: "Paso 03",
    title: "Entrega y soporte",
    desc: "Desplegamos, conectamos WhatsApp o tu CRM, y te entregamos listo para recibir tráfico. Con guía de uso incluida.",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);


  useGSAP(
    () => {
      const wrapper = scrollWrapperRef.current;
      const panels = gsap.utils.toArray<HTMLElement>(".process-panel");
      if (!wrapper || panels.length === 0) return;

      const numPanels = panels.length;
      const pauseDistance = 500; // Los 500px que me pediste de pausa por método
      
      // Calculamos cuánto mide un panel (100vw en píxeles)
      const panelWidth = window.innerWidth; 
      
      // El scroll total será el movimiento horizontal de los paneles restantes + las pausas de cada uno
      const totalScroll = ((numPanels - 1) * panelWidth) + (numPanels * pauseDistance);

      // Creamos una Timeline maestra vinculada al ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalScroll}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Construimos el comportamiento paso a paso en la Timeline
      panels.forEach((panel, index) => {
        // 1. Animación de entrada de los textos de este panel específico
        tl.from(panel.querySelectorAll(".stagger-text"), {
          y: 50,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
        });

        // 2. PAUSA: Añadimos un espacio vacío en la timeline para congelar la pantalla 500px
        tl.to({}, { duration: pauseDistance / 1000 }); 

        // 3. MOVIMIENTO: Si NO es el último panel, hacemos el scroll horizontal hacia el siguiente
        if (index < numPanels - 1) {
          tl.to(wrapper, {
            x: `-${panelWidth * (index + 1)}`,
            duration: 1, // Duración del viaje entre paneles
            ease: "power2.inOut", // Suaviza la transición de movimiento
          });
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full overflow-hidden  bg-transparent relative flex items-center">
      <div className="absolute top-12 left-6 md:left-12 z-20">
        <h2
          className="text-3xl md:text-5xl font-extrabold text-white tracking-tighter uppercase"
          style={{ fontFamily: "'Syne', sans-serif" }}>
          NUESTRO <span className="text-grolow-cyan italic">MÉTODO.</span>
        </h2>
      </div>

      {/* Cambiamos w-[300vw] por w-max para que tome el ancho exacto de sus hijos */}
      <div
        ref={scrollWrapperRef}
        className="flex h-full w-max"
        style={{ willChange: "transform" }}>
        {steps.map((step) => (
          // Cambiamos w-screen por w-[100vw] restringido, asegurando que no pase el ancho real
          <div
            key={step.num}
            className="process-panel w-[100vw] max-w-full h-full flex items-center shrink-0 justify-center relative p-6">
            {/* ... resto de tu código */}{" "}
            <div className="absolute inset-0 border-r border-white/5 bg-black/40 backdrop-blur-sm" />
            <div className="relative z-10 max-w-xl mx-auto flex flex-col gap-6">
              <span className="stagger-text block text-grolow-cyan font-mono text-6xl md:text-8xl opacity-20 font-bold leading-none">
                {step.num}
              </span>
              <h3
                className="stagger-text text-4xl md:text-6xl font-bold text-white uppercase tracking-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}>
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
