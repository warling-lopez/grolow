"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Auditoría Técnica",
    desc: "Analizamos tu flujo de ventas actual y detectamos cuellos de botella.",
  },
  {
    num: "02",
    title: "Arquitectura & Desarrollo",
    desc: "Construimos el sistema a medida. Diseño UI/UX premium y código limpio.",
  },
  {
    num: "03",
    title: "Automatización & Despliegue",
    desc: "Conectamos tu web con WhatsApp o tu CRM. Listo para recibir tráfico.",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrapper = scrollWrapperRef.current;
      if (!wrapper) return;

      const panels = gsap.utils.toArray<HTMLElement>(".process-panel");

      // Usamos clientWidth para ignorar la barra de scroll del sistema
      const getTotalScrollDistance = () =>
        wrapper.scrollWidth - document.documentElement.clientWidth;

      const tween = gsap.to(wrapper, {
        x: () => -getTotalScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getTotalScrollDistance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // ... (tu código de animación interna stagger-text se queda igual)

      // Animación interna de los textos al aparecer
      panels.forEach((panel) => {
        gsap.from(panel.querySelectorAll(".stagger-text"), {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tween,
            start: "left center",
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full overflow-hidden bg-transparent relative flex items-center">
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
