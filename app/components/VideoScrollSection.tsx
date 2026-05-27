"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function VideoScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textFirstRef = useRef<HTMLDivElement>(null);
  const textSecondRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const video = videoRef.current;
      if (!video) return;

      video.onloadedmetadata = () => {
        const RUNWAY = 3200;

        gsap.to(video, {
          currentTime: video.duration,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${RUNWAY}`,
            scrub: 1,
            pin: true,
            pinSpacing: false, // GSAP no inserta su propio spacer, lo maneja el wrapper
          },
        });

        // Salida del primer texto (a mitad del runway)
        gsap.to(textFirstRef.current, {
          y: -60,
          opacity: 0,
          ease: "power2.in",
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top+=${RUNWAY * 0.42} top`,
            end: `top+=${RUNWAY * 0.52} top`,
            scrub: 1,
          },
        });

        // Entrada del segundo texto
        gsap.fromTo(
          textSecondRef.current,
          { y: 60, opacity: 0 },
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
          },
        );
        ScrollTrigger.refresh();
      };
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-[#020E0E] overflow-hidden">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-40"
        src="/tu-video-3d.mp4"
        muted
        playsInline
        preload="auto"
      />

      {/* Texto 1: "Control Absoluto" */}
      <div
        ref={textFirstRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6">
        <span className="text-grolow-cyan font-mono tracking-widest text-sm mb-6 uppercase">
          Grolow System
        </span>
        <h2
          className="text-6xl md:text-8xl font-extrabold text-white text-center uppercase leading-[0.9]"
          style={{ fontFamily: "'Syne', sans-serif" }}>
          Control <br />
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white to-grolow-cyan">
            Absoluto
          </span>
        </h2>
      </div>

      {/* Texto 2: "Solo con Grolow" */}
      <div
        ref={textSecondRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 opacity-0">
        <span className="text-grolow-cyan font-mono tracking-widest text-sm mb-6 uppercase">
          Grolow System
        </span>
        <h2
          className="text-6xl md:text-8xl font-extrabold text-white text-center uppercase leading-[0.9]"
          style={{ fontFamily: "'Syne', sans-serif" }}>
          Solo con{" "}
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white to-grolow-cyan">
            Grolow.
          </span>
        </h2>
      </div>
    </section>
  );
}
