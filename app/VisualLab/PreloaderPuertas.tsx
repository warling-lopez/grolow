"use client";

/* ==================================================================
   PreloaderPuertas: puertas corredizas de Visual Lab

   Dos paneles negros cubren la pantalla con el letrero VISUAL LAB
   partido por la mitad (cada mitad viaja con su puerta al abrir).
   Un tubo de ensayo se llena de dorado como indicador de carga.

   Secuencia (2s duras, nunca más):
     0.00s - 1.20s  el tubo se llena (0 → 100%)
     1.20s - 1.35s  destello del tubo + el letrero se enciende
     1.35s - 1.45s  las puertas tiemblan (mecanismo que se destraba)
     1.45s - 2.00s  las puertas se abren y revelan el hero
     2.00s          desmontaje + onComplete()

   El hero 3D debe estar montado DETRÁS desde el inicio; recibe
   onComplete para disparar su animación de entrada. Solo corre en la
   primera visita de la sesión (bandera de módulo, sin storage) y se
   salta por completo con prefers-reduced-motion.
   ================================================================== */

import { useEffect, useRef, useState } from "react";

const GOLD = "#C9A227";

/* Bandera de módulo: sobrevive a navegaciones client-side dentro de la
   sesión SPA. No usar localStorage/sessionStorage (no disponibles en
   este entorno). */
let alreadyShown = false;

type Phase = "fill" | "lit" | "shake" | "open";

/* ------------------------------ Estilos ---------------------------- */
/* Solo transform + opacity en las animaciones: todo corre en GPU. */

const PL_STYLES = `
  .pl-root { position: fixed; inset: 0; z-index: 9999; }
  .pl-open { pointer-events: none; }

  .pl-door {
    position: absolute; top: 0; height: 100%; width: 50vw;
    overflow: hidden; will-change: transform;
    background:
      radial-gradient(120% 90% at 50% 38%, #121212 0%, #0A0A0A 62%);
    transition: transform .55s cubic-bezier(.76, 0, .24, 1);
  }
  .pl-door-l { left: 0; }
  .pl-door-r { right: 0; }
  .pl-open .pl-door-l { transform: translateX(-100%); }
  .pl-open .pl-door-r { transform: translateX(100%); }
  .pl-shake .pl-door-l { animation: pl-shake-l .1s ease-in-out; }
  .pl-shake .pl-door-r { animation: pl-shake-r .1s ease-in-out; }
  @keyframes pl-shake-l {
    0% { transform: translateX(0); } 30% { transform: translateX(-3px); }
    65% { transform: translateX(3px); } 100% { transform: translateX(0); }
  }
  @keyframes pl-shake-r {
    0% { transform: translateX(0); } 30% { transform: translateX(3px); }
    65% { transform: translateX(-3px); } 100% { transform: translateX(0); }
  }

  /* Junta dorada: 1px en el borde interior de cada puerta. Al abrir,
     brilla y se desvanece. */
  .pl-junta {
    position: absolute; top: 0; bottom: 0; width: 1px;
    background: ${GOLD}; opacity: .55;
    transition: opacity .45s ease, box-shadow .45s ease;
  }
  .pl-door-l .pl-junta { right: 0; }
  .pl-door-r .pl-junta { left: 0; }
  .pl-open .pl-junta {
    opacity: 0; box-shadow: 0 0 26px 8px rgba(201,162,39,.8);
  }

  /* Copia del letrero: ancho de viewport completo anclado al centro de
     la pantalla; el clip-path deja ver solo la mitad de cada puerta. */
  .pl-copy {
    position: absolute; top: 0; height: 100%; width: 100vw;
    display: flex; flex-direction: column; align-items: center;
    justify-content: center; gap: 26px;
  }
  .pl-copy-l { left: 0; clip-path: inset(0 50% 0 0); }
  .pl-copy-r { left: -50vw; clip-path: inset(0 0 0 50%); }

  /* Letrero 2D: gris apagado que se enciende al terminar la carga */
  .pl-letrero { display: flex; flex-direction: column; align-items: center; gap: 12px; }
  .pl-visual {
    font-family: var(--font-anton), sans-serif;
    font-size: clamp(3rem, 9vw, 5.5rem); line-height: .9;
    letter-spacing: .02em; color: #6f6f6f;
    transition: color .25s ease, text-shadow .25s ease;
  }
  .pl-lab {
    font-family: var(--font-anton), sans-serif;
    font-size: clamp(1rem, 2.6vw, 1.5rem); letter-spacing: .4em;
    padding: 3px 16px 3px 22px; color: #6f6f6f;
    border: 1px solid #3d3d3d;
    transition: color .25s ease, border-color .25s ease, box-shadow .25s ease;
  }
  .pl-lit .pl-visual { color: #fff; text-shadow: 0 0 24px rgba(255,255,255,.18); }
  .pl-lit .pl-lab {
    color: ${GOLD}; border-color: ${GOLD};
    box-shadow: 0 0 18px rgba(201,162,39,.35);
  }

  /* Tubo de ensayo: destello al llegar a 100% */
  .pl-tubo { border-radius: 40px; }
  .pl-lit .pl-tubo { animation: pl-flash .35s ease-out both; }
  @keyframes pl-flash {
    0% { box-shadow: 0 0 0 0 rgba(201,162,39,.55); }
    100% { box-shadow: 0 0 70px 34px rgba(201,162,39,0); }
  }
  .pl-liquid { transition: transform .1s linear; }

  .pl-bubble { animation: pl-bubble 1.6s ease-in infinite; opacity: 0; }
  @keyframes pl-bubble {
    0% { transform: translateY(0); opacity: 0; }
    15% { opacity: .9; }
    80% { opacity: .5; }
    100% { transform: translateY(-62px); opacity: 0; }
  }

  .pl-pct {
    font-family: var(--font-mono), monospace;
    font-size: 12px; color: ${GOLD}; letter-spacing: .15em;
  }
`;

/* --------------------------- Tubo de ensayo ------------------------ */

function TuboEnsayo({
  pct,
  small,
  bubbles,
  clipId,
}: {
  pct: number;
  small: boolean;
  bubbles: boolean;
  clipId: string; // único por copia: los IDs de SVG no pueden duplicarse
}) {
  const FILL_H = 92; // recorrido vertical del líquido (interior del tubo)
  const offset = (1 - pct / 100) * FILL_H;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="pl-tubo">
        <svg
          width={small ? 42 : 58}
          viewBox="0 0 64 118"
          fill="none"
          aria-hidden>
          <defs>
            {/* Interior del tubo: clip para líquido y burbujas */}
            <clipPath id={clipId}>
              <path d="M22 11 V93 a10 10 0 0 0 20 0 V11 Z" />
            </clipPath>
          </defs>

          {/* Líquido dorado con superficie ondulante (sube con pct) */}
          <g clipPath={`url(#${clipId})`}>
            <g className="pl-liquid" style={{ transform: `translateY(${offset}px)` }}>
              <path fill={GOLD} d="M22 15 Q27 11 32 15 T42 15 V118 H22 Z">
                <animate
                  attributeName="d"
                  dur="2.2s"
                  repeatCount="indefinite"
                  values="M22 15 Q27 11 32 15 T42 15 V118 H22 Z;
                          M22 13 Q27 17 32 13 T42 13 V118 H22 Z;
                          M22 15 Q27 11 32 15 T42 15 V118 H22 Z"
                />
              </path>
            </g>
            {/* Burbujas: solo en desktop (móvil anima menos elementos) */}
            {bubbles &&
              [
                { cx: 28, r: 2, delay: "0s" },
                { cx: 34, r: 1.5, delay: ".4s" },
                { cx: 38, r: 2.4, delay: ".8s" },
                { cx: 31, r: 1.3, delay: "1.15s" },
              ].map((b, i) => (
                <circle
                  key={i}
                  className="pl-bubble"
                  style={{ animationDelay: b.delay }}
                  cx={b.cx}
                  cy={92}
                  r={b.r}
                  fill={GOLD}
                  opacity={0.85}
                />
              ))}
          </g>

          {/* Contorno: boca ancha arriba, fondo redondeado */}
          <path d="M14 9 H50" stroke="#fff" strokeWidth={3} strokeLinecap="round" />
          <path
            d="M20 10 V93 a12 12 0 0 0 24 0 V10"
            stroke="#fff"
            strokeWidth={3}
            strokeLinecap="round"
          />
          {/* Marcas de medición (lado derecho) */}
          <path
            d="M37 28 H43 M37 44 H43 M37 60 H43 M37 76 H43"
            stroke="rgba(255,255,255,.35)"
            strokeWidth={1.5}
          />
        </svg>
      </div>
      <span className="pl-pct">{Math.round(pct)}%</span>
    </div>
  );
}

/* ----------------------- Contenido de cada puerta ------------------ */

function CopiaLetrero({
  pct,
  small,
  bubbles,
  side,
}: {
  pct: number;
  small: boolean;
  bubbles: boolean;
  side: "l" | "r";
}) {
  return (
    <div className={`pl-copy pl-copy-${side}`}>
      <div className="pl-letrero">
        <span className="pl-visual">VISUAL</span>
        <span className="pl-lab">LAB</span>
      </div>
      <TuboEnsayo
        pct={pct}
        small={small}
        bubbles={bubbles}
        clipId={`pl-clip-${side}`}
      />
    </div>
  );
}

/* ----------------------------- Componente -------------------------- */

export default function PreloaderPuertas({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  // Solo primera visita de la sesión. En SSR la bandera es false, así
  // que el HTML inicial siempre incluye las puertas (cubren el primer
  // paint); en navegaciones client-side posteriores ya no se monta.
  const [active, setActive] = useState(() => !alreadyShown);
  const [phase, setPhase] = useState<Phase>("fill");
  const [pct, setPct] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    // Ya terminó (o nunca debió mostrarse): avisar al hero y salir.
    if (!active) {
      onCompleteRef.current?.();
      return;
    }
    alreadyShown = true;

    // Accesibilidad primero: con reduced-motion no hay teatro.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(false);
      return;
    }

    setIsMobile(window.matchMedia("(max-width: 767px)").matches);

    // Bloquear scroll mientras las puertas están cerradas.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.lenis?.stop();

    // Progreso simulado 0 → 100 en 1.2s: arranca rápido, se frena
    // cerca del final y remata de golpe (más creíble que una lineal).
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const e = (now - t0) / 1200;
      if (e >= 1) {
        setPct(100);
        return;
      }
      setPct(Math.min(92, 92 * (1 - Math.pow(1 - Math.min(e / 0.95, 1), 2.4))));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Secuencia completa. Regla dura: a los 2s se desmonta, pase lo
    // que pase con la carga real.
    const timers = [
      setTimeout(() => setPhase("lit"), 100),
      setTimeout(() => setPhase("shake"), 350),
      setTimeout(() => setPhase("open"), 650),
      setTimeout(() => setActive(false), 2000),
    ];

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      document.body.style.overflow = prevOverflow;
      window.lenis?.start();
    };
  }, [active]);

  if (!active) return null;

  const phaseClass = {
    fill: "",
    lit: "pl-lit",
    shake: "pl-lit pl-shake",
    open: "pl-lit pl-open",
  }[phase];

  return (
    <div className={`pl-root ${phaseClass}`} aria-hidden>
      <style>{PL_STYLES}</style>
      <div className="pl-door pl-door-l">
        <CopiaLetrero pct={pct} small={isMobile} bubbles={!isMobile} side="l" />
        <span className="pl-junta" />
      </div>
      <div className="pl-door pl-door-r">
        <CopiaLetrero pct={pct} small={isMobile} bubbles={!isMobile} side="r" />
        <span className="pl-junta" />
      </div>
    </div>
  );
}
