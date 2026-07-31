"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * PENDIENTE: coloca una foto real en /public/warling.webp
 *
 * Tiene que ser una foto de la persona. No una ilustración, no un logo, no un
 * avatar generado: la sección entera existe para poner una cara donde antes
 * había una marca anónima. Mientras el archivo no exista, la tarjeta muestra
 * las iniciales como fallback.
 */
const PHOTO_SRC = "/warling.webp";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".about-block", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="quien-soy"
      ref={sectionRef}
      className="w-full py-24 md:py-32 px-4 md:px-8 flex justify-center"
    >
      <div className="about-block max-w-5xl w-full p-8 md:p-12 bg-white/60 border border-grolow-light/10 backdrop-blur-md rounded-2xl flex flex-col md:flex-row gap-8 md:gap-12 items-start">
        {/* Foto */}
        <div className="relative w-32 h-32 md:w-44 md:h-44 shrink-0 rounded-2xl overflow-hidden border border-grolow-light/10 bg-white/40">
          {/* Fallback: iniciales, visibles mientras no exista la foto */}
          <span className="absolute inset-0 flex items-center justify-center text-3xl md:text-5xl font-black uppercase text-grolow-light/25">
            WL
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PHOTO_SRC}
            alt="Warling López, fundador de Grolow"
            className="relative w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              // Sin foto todavía: se oculta la img y quedan las iniciales.
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        {/* Texto */}
        <div className="flex flex-col gap-4">
          <p className="text-xs font-mono uppercase tracking-widest text-grolow-light/40">
            Quién está detrás
          </p>
          <p className="text-base md:text-xl text-slate-400 leading-relaxed">
            Soy{" "}
            <span className="text-grolow-light font-medium">Warling López</span>,
            programador con 5 años de experiencia. Grolow no es una agencia con
            veinte personas y un formulario de contacto: hablas conmigo, yo
            construyo tu sistema y yo respondo cuando escribes. Eso significa que
            sé exactamente qué hay dentro de tu web y puedo arreglar cualquier
            cosa el mismo día.
          </p>
        </div>
      </div>
    </section>
  );
}
