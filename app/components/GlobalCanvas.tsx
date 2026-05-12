'use client';
import { useRef, useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Environment } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

function ScrollReactiveModel() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  useFrame((state) => {
  if (!meshRef.current) return;
  
  // Interacción suave con el mouse: el objeto sigue levemente al cursor
  const targetX = state.mouse.x * 0.5;
  const targetY = state.mouse.y * 0.5;
  
  meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX + (window.innerWidth > 768 ? 2 : 0), 0.05);
  meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);
});

  useLayoutEffect(() => {
    if (!meshRef.current || !materialRef.current) return;

    // Aquí está la magia negra. Enlazamos el scroll de toda la página al objeto 3D.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body, // El scroll de todo el sitio
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, // Scrub hace que la animación siga el ritmo exacto de la rueda del ratón
      }
    });

    // A medida que bajas, el objeto se mueve, rota y se distorsiona agresivamente
    tl.to(meshRef.current.position, {
      y: -2,      // Baja en el eje Y
      x: -3,      // Se mueve a la izquierda para dejar espacio al texto
      z: 1,       // Se acerca a la cámara
      ease: "power2.inOut"
    }, 0)
    .to(meshRef.current.rotation, {
      x: Math.PI * 2,
      y: Math.PI * 4,
      ease: "none"
    }, 0)
    // Mutamos el shader del material dinámicamente con el scroll
    .to(materialRef.current, {
      distort: 0.8, // Se vuelve más caótico abajo
      speed: 4,     // Se mueve más rápido
      ease: "power1.inOut"
    }, 0);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 128, 128]} scale={2.8} position={[2, 1, -3]}>
        <MeshDistortMaterial
          ref={materialRef}
          color="#004643" 
          distort={0.2}
          speed={1}
          roughness={0.1}
          metalness={1}
          wireframe={true}
          transparent
          opacity={0.5}
        />
      </Sphere>
    </Float>
  );
}

export default function GlobalCanvas() {
  return (
    // position fixed y z-0 para que se quede de fondo, pointer-events-none para que no bloquee los clics del HTML
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#grolow-cyan" />
        <Environment preset="city" /> {/* Le da reflejos realistas al wireframe */}
        <ScrollReactiveModel />
      </Canvas>
    </div>
  );
}