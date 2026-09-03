"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLang } from "./hooks/useLang";

gsap.registerPlugin(ScrollTrigger);

const COPY = {
  en: {
    eyebrow: "Who's behind it",
    alt: "Warling López, founder of Grolow",
    body: (
      <>
        We&apos;re led by{" "}
        <span className="text-grolow-light font-medium">Warling López</span>,
        a programmer with 5 years of experience. Grolow isn&apos;t an agency
        with twenty people and a contact form: you talk directly with us, we
        build your system and we answer when you write. That means we know
        exactly what&apos;s inside your site and we can fix anything the same
        day.
      </>
    ),
  },
  es: {
    eyebrow: "Quién está detrás",
    alt: "Warling López, fundador de Grolow",
    body: (
      <>
        Estamos liderados por{" "}
        <span className="text-grolow-light font-medium">Warling López</span>,
        programador con 5 años de experiencia. Grolow no es una agencia con
        veinte personas y un formulario de contacto: hablas con nosotros
        directamente, nosotros construimos tu sistema y respondemos cuando
        escribes. Eso significa que sabemos exactamente qué hay dentro de tu
        web y podemos arreglar cualquier cosa el mismo día.
      </>
    ),
  },
} as const;

/**
 * PENDIENTE: coloca una foto real en /public/warling.webp
 *
 * Tiene que ser una foto de la persona. No una ilustración, no un logo, no un
 * avatar generado: la sección entera existe para poner una cara donde antes
 * había una marca anónima. Mientras el archivo no exista, la tarjeta muestra
 * las iniciales como fallback.
 */
// `null` mientras el archivo no exista: con una ruta fija el navegador pedía
// /warling.webp en cada carga y se llevaba un 404. Pon aquí la ruta
// ("/warling.webp") en cuanto subas la foto a /public y la tarjeta la usa.
const PHOTO_SRC: string | null = null;

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lang = useLang();
  const c = COPY[lang];

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
          <span className="absolute inset-0 flex items-center justify-center text-3xl md:text-5xl font-black uppercase text-grolow-light/60">
            WL
          </span>
          {PHOTO_SRC && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={PHOTO_SRC}
              alt={c.alt}
              className="relative w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                // Si el archivo desaparece, quedan las iniciales.
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          )}
        </div>

        {/* Texto */}
        <div className="flex flex-col gap-4">
          <p className="text-xs font-mono uppercase tracking-widest text-grolow-cream">
            {c.eyebrow}
          </p>
          <p className="text-base md:text-xl text-grolow-light/75 leading-relaxed">
            {c.body}
          </p>
        </div>
      </div>
    </section>
  );
}
