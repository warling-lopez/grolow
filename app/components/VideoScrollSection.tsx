"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLang } from "./hooks/useLang";

gsap.registerPlugin(ScrollTrigger);

const COPY = {
  en: {
    eyebrow: "Grolow System",
    wordControl: "Total",
    wordAbsoluto: "Control",
    wordSolocon: "Only with",
    wordGrolow: "Grolow.",
  },
  es: {
    eyebrow: "Grolow System",
    wordControl: "Control",
    wordAbsoluto: "Absoluto",
    wordSolocon: "Solo con",
    wordGrolow: "Grolow.",
  },
} as const;

export default function VideoScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lang = useLang();
  const c = COPY[lang];
  const videoRef = useRef<HTMLVideoElement>(null);
  const textFirstRef = useRef<HTMLDivElement>(null);
  const textSecondRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const RUNWAY = 3200;
      const t1 = textFirstRef.current;
      const t2 = textSecondRef.current;
      const video = videoRef.current;

      if (!t1 || !t2) return;

      let mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: "(max-width: 767px)",
          isDesktop: "(min-width: 768px)",
        },
        (context) => {
          let { isMobile, isDesktop } = context.conditions as {
            isMobile: boolean;
            isDesktop: boolean;
          };

          const xOffsetLarge = isMobile ? 30 : 80;
          const xOffsetSmall = isMobile ? 20 : 50;
          const yOffset = isMobile ? 30 : 60;

          // ── Pin del contenedor (Obligatorio para ambos entornos) ────
          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: `+=${RUNWAY}`,
            pin: true,
            pinSpacing: false,
          });

          // ── Video scrub (Exclusivo de PC) ───────────────────────────
          if (isDesktop && video) {
            const initVideo = () => {
              gsap.to(video, {
                currentTime: video.duration || 1, // Fallback de seguridad
                ease: "none",
                scrollTrigger: {
                  trigger: containerRef.current,
                  start: "top top",
                  end: `+=${RUNWAY}`,
                  scrub: 1,
                },
              });
            };

            // Validar si los metadatos ya cargaron para no bloquear el hilo
            if (video.readyState >= 1) {
              initVideo();
            } else {
              video.onloadedmetadata = initVideo;
            }
          }

          // ── Texto 1: entrada ─────────────────────────────────────────
          gsap.fromTo(
            t1.querySelector("span"),
            { opacity: 0, y: isMobile ? 8 : 16, letterSpacing: isMobile ? "0.2em" : "0.5em" },
            {
              opacity: 1,
              y: 0,
              letterSpacing: isMobile ? "0.1em" : "0.25em",
              ease: "power2.out",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top+=800 bottom",
                end: "top +=1200 top",
                scrub: 1,
              },
            }
          );

          gsap.fromTo(
            t1.querySelector(".word-control"),
            { opacity: 0, x: -xOffsetLarge, skewX: -10 },
            {
              opacity: 1,
              x: 0,
              skewX: 0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top+=800 bottom",
                end: "top +=1200 top",
                scrub: 1,
              },
            }
          );

          gsap.fromTo(
            t1.querySelector(".word-absoluto"),
            { opacity: 0, x: xOffsetLarge, skewX: 10 },
            {
              opacity: 1,
              x: 0,
              skewX: 0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
                end: "top 35%",
                scrub: 1,
              },
            }
          );

          // ── Texto 1: salida ───────────────────────────────────────────
          gsap.to(t1, {
            y: -yOffset,
            opacity: 0,
            ease: "power2.in",
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${RUNWAY * 0.42} top`,
              end: `top+=${RUNWAY * 0.52} top`,
              scrub: 1,
            },
          });

          // ── Texto 2: entrada ──────────────────────────────────────────
          gsap.fromTo(
            t2,
            { y: yOffset, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: containerRef.current,
                start: `top+=${RUNWAY * 0.5} top`,
                end: `top+=${RUNWAY * 0.65} top`,
                scrub: 1,
              },
            }
          );

          gsap.fromTo(
            t2.querySelector("span"),
            { opacity: 0, y: isMobile ? 6 : 12 },
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: containerRef.current,
                start: `top+=${RUNWAY * 0.51} top`,
                end: `top+=${RUNWAY * 0.62} top`,
                scrub: 1,
              },
            }
          );

          gsap.fromTo(
            t2.querySelector(".word-solocon"),
            { opacity: 0, x: -xOffsetSmall, skewX: -8 },
            {
              opacity: 1,
              x: 0,
              skewX: 0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: containerRef.current,
                start: `top+=${RUNWAY * 0.53} top`,
                end: `top+=${RUNWAY * 0.66} top`,
                scrub: 1,
              },
            }
          );

          gsap.fromTo(
            t2.querySelector(".word-grolow"),
            { opacity: 0, x: xOffsetSmall, skewX: 8, scale: 0.9 },
            {
              opacity: 1,
              x: 0,
              skewX: 0,
              scale: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: containerRef.current,
                start: `top+=${RUNWAY * 0.55} top`,
                end: `top+=${RUNWAY * 0.68} top`,
                scrub: 1,
              },
            }
          );
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      data-header-trigger="true"
      className="relative h-screen w-full bg-[#020E0E] overflow-hidden"
    >
      {/* Se añade 'hidden md:block' para anular el video en móviles por completo */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-40 hidden md:block"
        src="/tu-video-3d.mp4"
        muted
        playsInline
        preload="auto"
      />

      {/* Texto 1: "Control Absoluto" */}
      <div
        ref={textFirstRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 md:px-6"
      >
        <span className="text-grolow-cyan font-mono tracking-widest text-[10px] md:text-sm mb-4 md:mb-6 uppercase">
          {c.eyebrow}
        </span>
        <h2
          className="text-5xl sm:text-6xl md:text-8xl font-extrabold text-white text-center uppercase leading-[0.9]"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          <span className="word-control inline-block">{c.wordControl}</span>
          <br />
          <span className="word-absoluto italic text-transparent bg-clip-text bg-gradient-to-r from-white to-grolow-cyan inline-block mt-2 md:mt-0">
            {c.wordAbsoluto}
          </span>
        </h2>
      </div>

      {/* Texto 2: "Solo con Grolow" */}
      <div
        ref={textSecondRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 md:px-6 opacity-0"
      >
        <span className="text-grolow-cyan font-mono tracking-widest text-[10px] md:text-sm mb-4 md:mb-6 uppercase">
          {c.eyebrow}
        </span>
        <h2
          className="text-5xl sm:text-6xl md:text-8xl font-extrabold text-white text-center uppercase leading-[0.9]"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          <span className="word-solocon inline-block">{c.wordSolocon}</span>{" "}
          <span className="word-grolow italic text-transparent bg-clip-text bg-gradient-to-r from-white to-grolow-cyan inline-block mt-2 md:mt-0">
            {c.wordGrolow}
          </span>
        </h2>
      </div>
    </section>
  );
}