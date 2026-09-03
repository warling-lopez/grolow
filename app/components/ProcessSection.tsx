"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLang } from "./hooks/useLang";

gsap.registerPlugin(ScrollTrigger);

const stepsEn = [
  {
    num: "Step 01",
    title: "We talk for 20 minutes",
    desc: "We ask what you sell, how orders reach you today, and where time gets lost. We come out of that with a clear proposal and a fixed price. Free, no commitment.",
  },
  {
    num: "Step 02",
    title: "We build it and you approve it",
    desc: "We design and program your system from scratch, no templates. We show you progress before publishing anything. If something's off, it gets changed.",
  },
  {
    num: "Step 03",
    title: "We launch it and teach you to use it",
    desc: "We leave it running, connected to your WhatsApp, and walk you through using it on a call. The first 15 days, any adjustment is included.",
  },
];

const stepsEs = [
  {
    num: "Paso 01",
    title: "Hablamos 20 minutos",
    desc: "Te preguntamos qué vendes, cómo te llegan hoy los pedidos y dónde se te pierde el tiempo. Salimos de ahí con una propuesta clara y un precio cerrado. Gratis y sin compromiso.",
  },
  {
    num: "Paso 02",
    title: "Lo construimos y tú lo apruebas",
    desc: "Diseñamos y programamos tu sistema desde cero, sin plantillas. Te mostramos avances antes de publicar nada. Si algo no te gusta, se cambia.",
  },
  {
    num: "Paso 03",
    title: "Publicamos y te enseñamos a usarlo",
    desc: "Lo dejamos funcionando, conectado a tu WhatsApp, y te explicamos cómo usarlo en una llamada. Los primeros 15 días, cualquier ajuste va incluido.",
  },
];

const COPY = {
  en: { heading: "OUR", headingAccent: "METHOD." },
  es: { heading: "NUESTRO", headingAccent: "MÉTODO." },
} as const;

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const lang = useLang();
  const c = COPY[lang];
  const steps = lang === "en" ? stepsEn : stepsEs;


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
      id="proceso"
      ref={sectionRef}
      data-header-trigger="true"
      className="h-screen w-full overflow-hidden  bg-transparent relative flex items-center">
      <div className="absolute top-12 left-6 md:left-12 z-20">
        <h2
          className="text-3xl md:text-5xl font-extrabold text-white tracking-tighter uppercase"
          style={{ fontFamily: "'Syne', sans-serif" }}>
          {c.heading} <span className="text-grolow-cyan italic">{c.headingAccent}</span>
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
            <div className="absolute inset-0 border-r border-white/5 bg-black backdrop-blur-sm" />
            <div className="relative z-10 max-w-xl mx-auto flex flex-col gap-6">
              <span className="stagger-text block text-grolow-card font-mono text-7xl md:text-9xl opacity-25 font-bold leading-none">
                {step.num}
              </span>
              <h3
                className="stagger-text text-4xl md:text-6xl font-bold text-white uppercase tracking-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}>
                {step.title}
              </h3>
              <p className="stagger-text text-grolow-light/75 text-xl leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
