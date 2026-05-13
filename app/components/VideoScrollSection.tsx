'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function VideoScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    const video = videoRef.current;
    if (!video) return;

    // MUY IMPORTANTE: Tenemos que esperar a que el video cargue sus metadatos 
    // para saber exactamente cuánto dura (video.duration)
    video.onloadedmetadata = () => {
      gsap.to(video, {
        currentTime: video.duration, // Llevamos el video hasta el final
        ease: "none", // Sin aceleración, puro movimiento lineal atado al ratón
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3000", // Esto es tu "Runway". Tendrás que scrollear 3000px para que el video termine. Ajústalo a tu gusto.
          scrub: 1,      // Scrub en 1 o 0.5 le da un ligero suavizado para que no se vea cortado si scrolleas brusco
          pin: true,     // Fija la pantalla hasta que acabe el efecto
        }
      });
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-[#020E0E] overflow-hidden">
      
      {/* El Video de Fondo */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-40"
        src="/tu-video-3d.mp4" // Pon tu video en la carpeta /public
        muted         // OBLIGATORIO para que el navegador permita autoplay/manipulación
        playsInline   // OBLIGATORIO para móviles (iOS)
        preload="auto"// OBLIGATORIO para que descargue el video antes de scrollear
      />
      
      {/* Contenido por encima del video */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        <span className="text-grolow-cyan font-mono tracking-widest text-sm mb-6 uppercase">
          Grolow System
        </span>
        <h2 className="text-6xl md:text-8xl font-extrabold text-white text-center uppercase leading-[0.9]" style={{ fontFamily: "'Syne', sans-serif" }}>
          Control <br /> <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white to-grolow-cyan">Absoluto</span>
        </h2>
      </div>
    </section>
  );
}
