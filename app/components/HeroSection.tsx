'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';

export default function HeroSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".hero-line", { y: 120, opacity: 0, stagger: 0.15, duration: 1.2, ease: "power4.out", delay: 0.2 });
    tl.from(".hero-fade", { opacity: 0, y: 30, stagger: 0.1, duration: 1 }, "-=0.6");
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full min-h-screen flex flex-col justify-center px-6 overflow-hidden bg-grolow-dark">
      
      {/* Fondo 3D - Ahora usa tu verde medio #004643 */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
            <Sphere args={[1, 128, 128]} scale={2.8} position={[1, 0, -2]}>
              <MeshDistortMaterial
                color="#004643" 
                attach="material"
                distort={0.3}
                speed={1.5}
                roughness={0.2}
                metalness={0.8}
                wireframe={true}
                transparent
                opacity={0.4}
              />
            </Sphere>
          </Float>
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full pt-20">
        <div className="overflow-hidden mb-2">
          <span className="hero-line block text-[11px] font-bold tracking-[.3em] uppercase text-grolow-cream mb-8">
            Grolow • Web Development Studio
          </span>
        </div>
        
        <h1 className="text-6xl md:text-[110px] font-extrabold leading-[0.9] tracking-tighter text-grolow-light uppercase mb-12" style={{ fontFamily: "'Syne', sans-serif" }}>
          <div className="overflow-hidden pb-2"><span className="hero-line block">Construimos</span></div>
          <div className="overflow-hidden pb-2"><span className="hero-line block text-transparent bg-clip-text bg-gradient-to-r from-grolow-cream to-grolow-accent italic">Sistemas Web</span></div>
          <div className="overflow-hidden pb-2"><span className="hero-line block">Para El Futuro</span></div>
        </h1>
        
        <div className="flex flex-col md:flex-row gap-10 md:items-end justify-between border-t border-grolow-light/10 pt-10">
          <p className="hero-fade text-[16px] text-grolow-light/70 max-w-md font-light leading-relaxed">
            Diseñamos y desarrollamos sitios web estratégicos que combinan diseño visual, tecnología moderna y una estructura pensada para 
            <span className="text-grolow-light font-medium"> generar resultados y automatizar ventas.</span>
          </p>

          <div className="hero-fade flex gap-6 items-center">
            {/* Botón ahora en color Crema con texto del verde más oscuro */}
            <a href="#contacto" className="group flex items-center gap-4 px-8 py-4 bg-grolow-cream text-grolow-dark font-bold uppercase tracking-wider text-sm hover:bg-grolow-light transition-colors">
              Cotizar Proyecto
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}