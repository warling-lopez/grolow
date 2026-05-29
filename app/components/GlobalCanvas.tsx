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
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // 1. Efecto ola matemática (ondulación tranquila de fondo)
    // Rota sutilmente de forma constante simulando un fluido masivo
    meshRef.current.rotation.z = time * 0.03;
    meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;

    // 2. Interacción ultra suave con el mouse
    const targetX = state.mouse.x * 0.3;
    const targetY = state.mouse.y * 0.3;
    
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.03);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.03);
  });

  useLayoutEffect(() => {
    if (!meshRef.current || !materialRef.current) return;

    // Vinculamos al scroll global de la página
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    // En lugar de deformarse agresivo, el plano rota y cambia de profundidad
    // simulando que navegas "a través" de la red de la agencia al bajar scroll
    tl.to(meshRef.current.position, {
      z: -1, // Se aleja ligeramente de forma elegante
      y: -0.5,
      ease: "none"
    }, 0)
    .to(meshRef.current.rotation, {
      y: Math.PI * 0.5, // Rota suave en su eje para cambiar la perspectiva de la red
      ease: "none"
    }, 0)
    .to(materialRef.current, {
      opacity: 0.25, // Se vuelve un poco más invisible en el footer para no molestar
      ease: "none"
    }, 0);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.5}>
      {/* Usamos un Plane de alta densidad inclinado en el espacio 3D */}
      <mesh 
        ref={meshRef} 
        position={[0, 0, -2]} 
        rotation={[-Math.PI / 3, 0, 0]}
      >
        <planeGeometry args={[12, 12, 45, 45]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#004643" 
          wireframe={true}
          transparent={true}
          opacity={0.4}
          roughness={1}
          metalness={0.2}
        />
      </mesh>
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