"use client";

/* ==================================================================
   HeroLetrero: letrero corpóreo 3D de VISUAL LAB (three.js)

   Recrea un letrero real montado sobre pared: letras extruidas con
   canto dorado, separadas del muro por soportes cilíndricos, con una
   luz direccional dura que proyecta la sombra característica.

   Nota de versión: el proyecto usa three 0.184 (lo requieren
   @react-three/fiber y drei, que ya viven en este repo), así que se
   usa la API actual: outputColorSpace en vez de outputEncoding y
   `depth` en vez de `height` en TextGeometry. El resultado visual es
   el mismo que con r128.

   Importar SIEMPRE con next/dynamic y ssr:false (three no corre en
   SSR):

     const HeroLetrero = dynamic(() => import("./HeroLetrero"), {
       ssr: false,
       loading: () => <HeroFallback />,
     });
   ================================================================== */

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
// Fuente sans bold empaquetada con three: no depende de red ni CDN.
import helvetikerBold from "three/examples/fonts/helvetiker_bold.typeface.json";
import HeroFallback, { HeroOverlay } from "./HeroFallback";

/* ------------------------------ Ajustes ---------------------------- */

const GOLD = 0xc9a227; // acento dorado del canto
const WALL = 0x0a0a0a; // negro profundo de la pared
const GAP = 0.4; // separación letra-pared (z)
const DEPTH_MAIN = 0.35; // grosor de extrusión de "VISUAL"
const DEPTH_SUB = 0.18; // grosor de "LAB"
const ENTER_STAGGER = 0.08; // 80ms entre letras
const ENTER_DURATION = 0.6; // duración de entrada por letra
const IDLE_AFTER = 3000; // ms sin mouse para pasar a oscilación
const IDLE_CYCLE = 20; // segundos por ciclo de oscilación

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/* ------------------------- Escena three.js ------------------------- */

type LetterAnim = { mesh: THREE.Mesh; delay: number };

function initScene(
  container: HTMLDivElement,
  playRef: { current: boolean }
): () => void {
  // Detección temprana de WebGL: si no hay contexto, lanzamos y el
  // componente cae al fallback estático.
  const probe = document.createElement("canvas");
  if (!probe.getContext("webgl2") && !probe.getContext("webgl")) {
    throw new Error("WebGL no disponible");
  }

  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- Renderer ---------- */
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.shadowMap.enabled = true;
  // PCFSoftShadowMap fue deprecado en three moderno; PCF es el
  // equivalente al que three cae de todas formas.
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(WALL);

  /* ---------- Pared con ruido sutil ---------- */
  // Textura de ruido generada en canvas: variaciones casi negras para
  // que la pared no sea un plano muerto.
  const noiseCanvas = document.createElement("canvas");
  noiseCanvas.width = noiseCanvas.height = 256;
  const nctx = noiseCanvas.getContext("2d")!;
  const img = nctx.createImageData(256, 256);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = 9 + Math.random() * 8; // gris 9..17: casi negro, bajo contraste
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  nctx.putImageData(img, 0, 0);
  const noiseTex = new THREE.CanvasTexture(noiseCanvas);
  noiseTex.colorSpace = THREE.SRGBColorSpace;
  noiseTex.wrapS = noiseTex.wrapT = THREE.RepeatWrapping;
  // Grano fino: con pocos repeats el ruido se ve como grava, no textura.
  noiseTex.repeat.set(10, 6);

  const wallMat = new THREE.MeshStandardMaterial({
    color: 0xffffff, // el color real lo aporta la textura de ruido
    map: noiseTex,
    roughness: 0.95,
    metalness: 0,
  });
  const wall = new THREE.Mesh(new THREE.PlaneGeometry(40, 24), wallMat);
  wall.receiveShadow = true;
  scene.add(wall);

  /* ---------- Materiales de las letras ---------- */
  const font = new FontLoader().parse(
    helvetikerBold as unknown as Parameters<FontLoader["parse"]>[0]
  );

  const matFront = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.6,
    metalness: 0.05, // acrílico mate, no plástico brillante
  });
  const matGold = new THREE.MeshStandardMaterial({
    color: GOLD,
    roughness: 0.35,
    metalness: 0.8, // el canto dorado que atrapa la luz
  });
  const matDark = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    roughness: 0.7,
    metalness: 0.05,
  });
  // "LAB" con luz propia: emissive controlado por tiempo para el efecto
  // de bombillo que hace falso contacto al encender y luego se fija.
  const matLabFront = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffffee, // blanco cálido, como filamento de bombillo
    emissiveIntensity: 0, // inicia apagado
    roughness: 0.4,
    metalness: 0.1,
  });

  const sign = new THREE.Group();
  scene.add(sign);
  const letters: LetterAnim[] = [];
  let delayCursor = 0;

  /* Construye una palabra letra a letra (cada letra es un mesh propio
     para poder animar la entrada escalonada). Devuelve el ancho total. */
  function buildWord(
    text: string,
    size: number,
    depth: number,
    materials: THREE.Material[],
    offsetX: number,
    offsetY: number
  ): number {
    let cursor = 0;
    const spacing = size * 0.08;
    for (const ch of text) {
      const geo = new TextGeometry(ch, {
        font,
        size,
        depth,
        curveSegments: 8,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.01,
        bevelSegments: 2,
      });
      geo.computeBoundingBox();
      const bb = geo.boundingBox!;
      const width = bb.max.x - bb.min.x;

      const mesh = new THREE.Mesh(geo, materials);
      mesh.castShadow = true;
      mesh.position.set(offsetX + cursor - bb.min.x, offsetY, GAP);
      sign.add(mesh);
      letters.push({ mesh, delay: delayCursor });
      delayCursor += ENTER_STAGGER;

      // Soporte cilíndrico letra-pared: hijo del mesh para que entre
      // junto con la letra. Casi invisible, pero vende la separación.
      const support = new THREE.Mesh(
        new THREE.CylinderGeometry(size * 0.04, size * 0.04, GAP, 10),
        matDark
      );
      support.rotation.x = Math.PI / 2;
      support.position.set(
        bb.min.x + width / 2,
        size * 0.35,
        -GAP / 2
      );
      mesh.add(support);

      cursor += width + spacing;
    }
    return cursor - spacing;
  }

  // "VISUAL": marca grande en blanco con canto dorado.
  const mainWidth = buildWord("VISUAL", 1.0, DEPTH_MAIN, [matFront, matGold], 0, 0);
  // "LAB": descriptor pequeño que enciende como bombillo (cara emisiva
  // + canto dorado), alineado a la derecha como en el logo tipográfico.
  const subWidth = buildWord("LAB", 0.34, DEPTH_SUB, [matLabFront, matGold], 0, 0);
  // Recolocar: centrar VISUAL y colgar LAB debajo, alineado a la
  // derecha (las 6 primeras letras son "VISUAL", el resto "LAB").
  letters.forEach(({ mesh }, i) => {
    if (i >= 6) {
      mesh.position.x += mainWidth - subWidth;
      mesh.position.y -= 0.62;
    }
    mesh.position.x -= mainWidth / 2;
  });

  // En pantallas angostas el letrero completo debe caber en el encuadre.
  if (isMobile) sign.scale.setScalar(0.72);

  /* ---------- Iluminación ---------- */
  // Direccional dura desde arriba-izquierda: la que crea la sombra
  // definida sobre la pared (el efecto que vende el letrero).
  const sun = new THREE.DirectionalLight(0xffffff, 2.2);
  sun.position.set(-5, 7, 6);
  sun.castShadow = true;
  const shadowRes = isMobile ? 1024 : 2048;
  sun.shadow.mapSize.set(shadowRes, shadowRes);
  sun.shadow.camera.left = -6;
  sun.shadow.camera.right = 6;
  sun.shadow.camera.top = 6;
  sun.shadow.camera.bottom = -6;
  sun.shadow.camera.near = 0.5;
  sun.shadow.camera.far = 25;
  sun.shadow.bias = -0.0004;
  scene.add(sun);
  scene.add(sun.target);

  // Ambiente tenue: sombras profundas pero no negro absoluto.
  scene.add(new THREE.AmbientLight(0xffffff, 0.15));

  // Rebote dorado desde abajo, para el brillo del canto.
  // decay 0 para que se comporte como la intensidad clásica de r128.
  const bounce = new THREE.PointLight(GOLD, 0.4, 0, 0);
  bounce.position.set(0, -2.5, 2.5);
  scene.add(bounce);

  /* ---------- Cámara en tres cuartos ---------- */
  const pivot = new THREE.Vector3(0, -0.25, GAP);
  const camera = new THREE.PerspectiveCamera(
    isMobile ? 55 : 40,
    container.clientWidth / container.clientHeight,
    0.1,
    60
  );
  const radius = isMobile ? 5.8 : 7.2; // más cerca en móvil: que se lea
  const baseYaw = THREE.MathUtils.degToRad(isMobile ? 16 : 22); // tres cuartos
  const basePitch = THREE.MathUtils.degToRad(6);

  let yawOff = 0;
  let pitchOff = 0;
  let targetYaw = 0;
  let targetPitch = 0;

  function placeCamera() {
    const yaw = baseYaw + yawOff;
    const pitch = basePitch + pitchOff;
    camera.position.set(
      pivot.x + radius * Math.sin(yaw) * Math.cos(pitch),
      pivot.y + radius * Math.sin(pitch),
      pivot.z + radius * Math.cos(yaw) * Math.cos(pitch)
    );
    camera.lookAt(pivot);
  }
  placeCamera();

  /* ---------- Interacción: parallax / giroscopio / oscilación ------- */
  const MAX_YAW = THREE.MathUtils.degToRad(8);
  const MAX_PITCH = THREE.MathUtils.degToRad(4);
  let lastInput = 0; // último mouse/giro; 0 = nunca

  function onMouseMove(e: MouseEvent) {
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = (e.clientY / window.innerHeight) * 2 - 1;
    targetYaw = nx * MAX_YAW;
    targetPitch = -ny * MAX_PITCH;
    lastInput = performance.now();
  }

  function onOrientation(e: DeviceOrientationEvent) {
    if (e.gamma == null || e.beta == null) return;
    targetYaw = THREE.MathUtils.clamp(e.gamma / 45, -1, 1) * MAX_YAW;
    targetPitch = THREE.MathUtils.clamp((e.beta - 45) / 45, -1, 1) * MAX_PITCH;
    lastInput = performance.now();
  }

  if (!reducedMotion) {
    if (!isMobile) {
      window.addEventListener("mousemove", onMouseMove);
    } else if (typeof DeviceOrientationEvent !== "undefined") {
      // En iOS 13+ requiere permiso explícito; si no hay eventos,
      // simplemente queda la oscilación automática.
      window.addEventListener("deviceorientation", onOrientation);
    }
  }

  /* ---------- Loop de animación ---------- */
  let raf = 0;
  let running = false;
  let enterStart: number | null = null; // arranca al ser visible

  // Posición inicial de la entrada: detrás de la pared.
  if (!reducedMotion) {
    for (const { mesh } of letters) mesh.position.z = -1;
  }

  function frame(now: number) {
    raf = requestAnimationFrame(frame);
    const t = now / 1000;

    // 1. Entrada escalonada de letras (efecto "instalación"). No
    // arranca hasta que `playRef` lo permita (el preloader avisa con
    // onComplete cuando las puertas terminaron de abrir).
    if (!reducedMotion && playRef.current) {
      if (enterStart === null) enterStart = now;
      const elapsed = (now - enterStart) / 1000;
      for (const { mesh, delay } of letters) {
        const p = THREE.MathUtils.clamp(
          (elapsed - delay) / ENTER_DURATION,
          0,
          1
        );
        mesh.position.z = THREE.MathUtils.lerp(-1, GAP, easeOutCubic(p));
      }

      // Encendido "bombillo dañado" de LAB: entre 1.2s y 2.8s hace falso
      // contacto (chispazos aleatorios), luego calienta y se fija. Sin
      // loop: pasado el rango queda encendido y ya no vuelve a parpadear.
      if (elapsed > 1.2 && elapsed < 2.8) {
        matLabFront.emissiveIntensity =
          Math.random() > 0.75 ? Math.random() * 2.5 : 0;
      } else if (elapsed >= 2.8) {
        matLabFront.emissiveIntensity = 2.0;
      }
    }

    // 2 y 3. Parallax con inercia u oscilación automática tras 3s.
    if (!reducedMotion) {
      const idle = lastInput === 0 || now - lastInput > IDLE_AFTER;
      if (idle) {
        const w = (Math.PI * 2) / IDLE_CYCLE;
        targetYaw = Math.sin(t * w) * THREE.MathUtils.degToRad(2);
        targetPitch = Math.sin(t * w * 0.7) * THREE.MathUtils.degToRad(1);
      }
      // Lerp lento: el encuadre se siente pesado, como un objeto real.
      yawOff += (targetYaw - yawOff) * 0.04;
      pitchOff += (targetPitch - pitchOff) * 0.04;
      placeCamera();
    }

    renderer.render(scene, camera);
  }

  function start() {
    if (!running) {
      running = true;
      raf = requestAnimationFrame(frame);
    }
  }
  function stop() {
    if (running) {
      running = false;
      cancelAnimationFrame(raf);
    }
  }

  // Pausar el render cuando el hero sale del viewport: cero batería
  // quemada mientras el usuario lee el resto de la página.
  const io = new IntersectionObserver(
    ([entry]) => (entry.isIntersecting ? start() : stop()),
    { threshold: 0 }
  );
  io.observe(container);

  /* ---------- Resize ---------- */
  function onResize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener("resize", onResize);

  /* ---------- Cleanup completo ---------- */
  return () => {
    stop();
    io.disconnect();
    window.removeEventListener("resize", onResize);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("deviceorientation", onOrientation);
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        for (const m of mats) m.dispose();
      }
    });
    noiseTex.dispose();
    renderer.dispose();
    if (renderer.domElement.parentElement === container) {
      container.removeChild(renderer.domElement);
    }
  };
}

/* --------------------------- Componente ---------------------------- */

export default function HeroLetrero({ play = true }: { play?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  // Ref para que el loop imperativo de three lea el valor actual de
  // `play` sin re-crear la escena.
  const playRef = useRef(play);
  useEffect(() => {
    playRef.current = play;
  }, [play]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let cleanup: (() => void) | undefined;
    try {
      cleanup = initScene(container, playRef);
    } catch (err) {
      // WebGL no disponible o falló la fuente: hero estático, nunca
      // pantalla negra vacía.
      console.error("HeroLetrero: usando fallback estático.", err);
      setFailed(true);
    }
    return () => cleanup?.();
  }, []);

  if (failed) return <HeroFallback />;

  return (
    <section className="relative h-[70vh] overflow-hidden bg-[#0A0A0A] md:h-screen">
      <div ref={containerRef} className="absolute inset-0" aria-hidden />
      {/* Título accesible para lectores de pantalla y SEO */}
      <h1 className="sr-only">VISUAL LAB, Laboratorio Gráfico Visual</h1>
      <HeroOverlay />
    </section>
  );
}
