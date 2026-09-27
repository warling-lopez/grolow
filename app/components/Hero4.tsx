"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useLang } from "./hooks/useLang";
import { pathFor, type RouteId } from "@/app/lib/i18n";

/**
 * Hero de portada (/es y /en) + sección «lo que hacemos bien».
 *
 * Hero: dos columnas sobre negro —rótulo enorme y condensado a la izquierda,
 * texto y CTAs a la derecha— con una rejilla de hexágonos con las letras de
 * la marca en la esquina inferior derecha.
 *
 * El logo 3D no vive dentro de ninguna de las dos secciones: va en una capa
 * `sticky` que las cubre a ambas. Al hacer scroll baja desde su hueco en el
 * hero hasta el centro del dial de la sección siguiente, y gira según lo que
 * se haya desplazado. Mientras el dial está fijado, su anillo rota como un
 * reloj y se ilumina el servicio al que apunta.
 *
 * El modelo (`/3d/logo_3d.glb`) se pinta con <model-viewer>. Su librería
 * arrastra three.js, así que se importa en un efecto: no entra en el bundle
 * inicial ni bloquea el primer pintado, y el texto —que es el LCP— sale solo.
 */

/* ------------------------------------------------------------------ */
/* Tipos / API del componente                                          */
/* ------------------------------------------------------------------ */

export type HeroCTA = {
  label: string;
  href: string;
  variant?: "solid" | "outline";
};

export type Hero4Props = {
  /** Cada línea en su propio bloque queda como en el diseño; un nodo en línea
   *  también funciona, se reparte con `text-balance`. */
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  ctas?: HeroCTA[];
  /** Ruta del GLB. */
  model?: string;
};

/* ------------------------------------------------------------------ */
/* Copy por defecto                                                    */
/* ------------------------------------------------------------------ */

/** Los CTA por defecto ya no van a anclas: casos y contacto son páginas. */
const CTA_ROUTES: Record<string, RouteId> = {
  "#casos": "casos",
  "#contacto": "contacto",
};

const Accent = ({ children }: { children: React.ReactNode }) => (
  <span className="text-grolow-brand-bright">{children}</span>
);

const COPY = {
  en: {
    title: (
      <>
        <span className="block">We build</span>
        <span className="block">
          the <Accent>system</Accent>
        </span>
        <span className="block">your business</span>
        <span className="block">runs on.</span>
      </>
    ),
    subtitle: (
      <>
        Internal dashboards, inventory, scheduling and client portals. For when
        the business has outgrown the spreadsheet and the WhatsApp group.{" "}
        <span className="text-white">
          Custom code, built on how you actually work.
        </span>
      </>
    ),
    ctas: [
      {
        label: "Book a diagnosis",
        href: "#contacto",
        variant: "solid" as const,
      },
      {
        label: "Systems in production",
        href: "#casos",
        variant: "outline" as const,
      },
    ],
    dialTitle: (
      <>
        We are <Accent>good</Accent> at
      </>
    ),
    // Orden de las agujas del reloj empezando arriba: N, E, S, O.
    services: ["Dashboards", "Inventory", "Scheduling", "Portals"],
  },
  es: {
    title: (
      <>
        <span className="block">Construimos</span>
        <Accent>
          <span className="block">sistemas de</span>
          <span className="block">operación</span>
        </Accent>
        <span className="block">a medida.</span>
      </>
    ),
    subtitle: (
      <>
        Experiencias digitales centradas en el cliente que alinean estrategia,
        diseño y tecnología.{" "}
        <span className="text-white">
          Creadas para escalar. Diseñadas para perdurar.
        </span>
      </>
    ),
    ctas: [
      {
        label: "Agendar diagnóstico",
        href: "#contacto",
        variant: "solid" as const,
      },
      {
        label: "Sistemas en producción",
        href: "#casos",
        variant: "outline" as const,
      },
    ],
    dialTitle: (
      <>
        Lo que hacemos <Accent>bien</Accent>
      </>
    ),
    services: ["Paneles", "Inventario", "Reservas", "Portales"],
  },
} as const;

/* ------------------------------------------------------------------ */
/* Logo 3D                                                             */
/* ------------------------------------------------------------------ */

type ModelViewerElement = HTMLElement & {
  cameraOrbit: string;
  getCameraOrbit?: () => { theta: number };
  model?: {
    materials: {
      name: string;
      setAlphaMode: (mode: "OPAQUE" | "MASK" | "BLEND") => void;
      pbrMetallicRoughness: {
        setBaseColorFactor: (rgba: [number, number, number, number]) => void;
      };
    }[];
  };
};

/**
 * El GLB salió de Blender con el cubo por defecto aún en la escena (material
 * «Material», gris). Aquí se vuelve transparente en vez de tocar el fichero,
 * así un re-export desde Blender no lo trae de vuelta sin que nadie lo vea.
 */
const STRAY_MATERIAL = "Material";

/** Inclinación fija de la cámara. min = max → solo se puede girar en horizontal. */
const PHI = "80deg";

/** Grados de giro del logo por cada píxel de scroll. */
const SPIN_PER_PX = 0.35;

function Logo3D({
  src,
  reduce,
  scroll,
}: {
  src: string;
  reduce: boolean;
  scroll: MotionValue<number>;
}) {
  const ref = useRef<ModelViewerElement>(null);
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const lastScroll = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    import("@google/model-viewer").then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!ready || !el) return;
    const onLoad = () => {
      el.model?.materials
        .filter((m) => m.name === STRAY_MATERIAL)
        .forEach((m) => {
          m.setAlphaMode("BLEND");
          m.pbrMetallicRoughness.setBaseColorFactor([0, 0, 0, 0]);
        });
      setLoaded(true);
    };
    el.addEventListener("load", onLoad);
    return () => el.removeEventListener("load", onLoad);
  }, [ready]);

  // El scroll suma giro al ángulo actual en vez de fijarlo: así no se pierde
  // lo que el usuario haya girado arrastrando ni el auto-rotate.
  useMotionValueEvent(scroll, "change", (y) => {
    const el = ref.current;
    const prev = lastScroll.current;
    lastScroll.current = y;
    if (reduce || !el?.getCameraOrbit || prev === null) return;
    const theta =
      el.getCameraOrbit().theta + ((y - prev) * SPIN_PER_PX * Math.PI) / 180;
    el.cameraOrbit = `${theta}rad ${PHI} auto`;
  });

  if (!ready) return null;

  return (
    <model-viewer
      ref={ref}
      src={src}
      alt=""
      aria-hidden="true"
      camera-orbit={`-20deg ${PHI} auto`}
      min-camera-orbit={`-Infinity ${PHI} auto`}
      max-camera-orbit={`Infinity ${PHI} auto`}
      auto-rotate={reduce ? undefined : ""}
      auto-rotate-delay="0"
      rotation-per-second="12deg"
      interaction-prompt="none"
      disable-zoom=""
      disable-pan=""
      camera-controls=""
      // pan-y: el scroll vertical del móvil pasa de largo; el arrastre
      // horizontal gira el logo.
      touch-action="pan-y"
      exposure="1.1"
      shadow-intensity="0"
      environment-image="neutral"
      className={`block h-full w-full bg-transparent transition-opacity duration-700 ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
      style={{ "--poster-color": "transparent" } as React.CSSProperties}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Rejilla de hexágonos                                                */
/* ------------------------------------------------------------------ */

const HEX_R = 30;
const HEX_COLS = 8;
const HEX_ROWS = 6;
const HEX_W = HEX_R * 1.5;
const HEX_H = Math.sqrt(3) * HEX_R;

/** Celdas encendidas → letra. [columna, fila] */
const LIT: Record<string, string> = {
  "2,0": "G",
  "0,2": "R",
  "2,2": "O",
  "3,2": "L",
  "5,2": "O",
  "5,3": "W",
};

function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
}

function HexGrid({ reduce }: { reduce: boolean }) {
  const cells = [];
  for (let c = 0; c < HEX_COLS; c++) {
    for (let r = 0; r < HEX_ROWS; r++) {
      const cx = HEX_R + c * HEX_W;
      const cy = HEX_H / 2 + r * HEX_H + (c % 2 ? HEX_H / 2 : 0);
      const letter = LIT[`${c},${r}`];
      cells.push(
        <g key={`${c}-${r}`}>
          <polygon
            points={hexPoints(cx, cy, HEX_R - 1)}
            className={
              letter
                ? `fill-grolow-brand stroke-grolow-brand-bright/60 ${
                    reduce ? "" : "hex-glow"
                  }`
                : "fill-none stroke-white/10"
            }
            style={
              letter
                ? ({
                    filter: "drop-shadow(0 0 14px rgba(6,224,218,0.55))",
                    animationDelay: `${(c + r) * 0.35}s`,
                  } as React.CSSProperties)
                : undefined
            }
          />
          {letter && (
            <text
              x={cx}
              y={cy}
              dy="0.36em"
              textAnchor="middle"
              className={`font-display fill-black text-[22px]`}>
              {letter}
            </text>
          )}
        </g>,
      );
    }
  }

  const w = HEX_R * 2 + (HEX_COLS - 1) * HEX_W;
  const h = HEX_ROWS * HEX_H + HEX_H / 2;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full h-auto"
      aria-hidden="true"
      style={{
        maskImage:
          "radial-gradient(ellipse at 40% 40%, black 45%, transparent 80%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at 40% 40%, black 45%, transparent 80%)",
      }}>
      <style>{`
        @keyframes hex-glow { 0%,100% { opacity: 1 } 50% { opacity: .65 } }
        .hex-glow { animation: hex-glow 3.2s ease-in-out infinite; }
      `}</style>
      {cells}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Dial                                                                */
/* ------------------------------------------------------------------ */

const TICKS = 16;
const DIAL_R = 46; // % del lado del dial

/** Anillo punteado con marcas; gira con `rotate`. */
function DialRing({ rotate }: { rotate: MotionValue<number> }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="absolute inset-0 h-full w-full overflow-visible"
      style={{ rotate }}
      aria-hidden="true">
      <circle
        cx="50"
        cy="50"
        r={DIAL_R}
        fill="none"
        className="stroke-grolow-brand-bright/60"
        strokeWidth="0.25"
        strokeDasharray="0.6 0.9"
      />
      {Array.from({ length: TICKS }, (_, i) => (
        <line
          key={i}
          x1="50"
          x2="50"
          y1={50 - DIAL_R - 1.8}
          y2={50 - DIAL_R + 1.8}
          className="stroke-grolow-brand-bright"
          strokeWidth="0.3"
          transform={`rotate(${(360 / TICKS) * i + 11.25} 50 50)`}
        />
      ))}
      {/* Aguja: señala el servicio activo. */}
      <circle
        cx="50"
        cy={50 - DIAL_R}
        r="1.4"
        className="fill-grolow-brand-bright"
      />
    </motion.svg>
  );
}

/** Posición de cada etiqueta: N, E, S, O. */
const LABEL_POS = [
  "left-1/2 top-0 -translate-x-1/2 -translate-y-[170%]",
  // E y O: dentro del anillo solo en móvil (el punto sobre la línea, a 4% del
  // borde porque el radio es 46), que es donde se salían de la pantalla. A
  // partir de `lg` vuelven a su sitio de siempre, fuera del anillo.
  "right-[4%] top-1/2 flex-row-reverse translate-x-[5px] -translate-y-1/2 lg:left-full lg:right-auto lg:flex-row lg:translate-x-[-10px]",
  "left-1/2 top-full -translate-x-1/2 translate-y-[70%]",
  "left-[4%] top-1/2 translate-x-[-5px] -translate-y-1/2 lg:right-full lg:left-auto lg:flex-row-reverse lg:translate-x-[10px]",
];

/* ------------------------------------------------------------------ */
/* Hero4                                                               */
/* ------------------------------------------------------------------ */

type Geometry = {
  /** Centro y lado del logo en el hero, relativos a la parte alta del wrapper. */
  start: { x: number; y: number; size: number };
  /** Centro y lado del logo dentro del dial, relativos al viewport fijado. */
  end: { x: number; y: number; size: number };
  /** Top absoluto del wrapper, alto del hero y recorrido del dial fijado. */
  top: number;
  heroH: number;
  pinLen: number;
};

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

export default function Hero4({
  title,
  subtitle,
  ctas,
  model = "/3d/logo_3d.glb",
}: Hero4Props) {
  const reduce = useReducedMotion() ?? false;
  const lang = useLang();
  const t = COPY[lang];

  const wrapRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const dialSectionRef = useRef<HTMLElement>(null);
  const deskSlotRef = useRef<HTMLDivElement>(null);
  const mobileSlotRef = useRef<HTMLDivElement>(null);
  const dialRef = useRef<HTMLDivElement>(null);
  const [geo, setGeo] = useState<Geometry | null>(null);
  const [active, setActive] = useState(0);

  const { scrollY } = useScroll();

  // Medidas de layout (sin transformaciones ni scroll de por medio): se
  // recalculan al cambiar el tamaño de cualquiera de las piezas.
  useLayoutEffect(() => {
    const measure = () => {
      const wrap = wrapRef.current;
      const hero = heroRef.current;
      const section = dialSectionRef.current;
      const dial = dialRef.current;
      const slot = [deskSlotRef.current, mobileSlotRef.current].find(
        (el) => el && el.offsetWidth > 0,
      );
      if (!wrap || !hero || !section || !dial || !slot) return;

      const wrapRect = wrap.getBoundingClientRect();
      const slotRect = slot.getBoundingClientRect();
      // Offsets dentro del contenedor sticky del dial (top 0 cuando está fijado).
      const sticky = dial.offsetParent as HTMLElement;
      // El dial se centra con translate(-50%, -50%), que offsetLeft/Top
      // ignoran: su offset ya ES el centro.
      const dialX = dial.offsetLeft;
      const dialY = dial.offsetTop;

      setGeo({
        start: {
          x: slotRect.left - wrapRect.left + slotRect.width / 2,
          y: slotRect.top - wrapRect.top + slotRect.height / 2,
          size: slotRect.width,
        },
        end: {
          x: dialX,
          y: dialY,
          size: dial.offsetWidth * 0.42,
        },
        top: wrapRect.top + window.scrollY,
        heroH: hero.offsetHeight,
        pinLen: Math.max(1, section.offsetHeight - sticky.offsetHeight),
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    [
      wrapRef,
      heroRef,
      dialSectionRef,
      dialRef,
      deskSlotRef,
      mobileSlotRef,
    ].forEach((r) => r.current && ro.observe(r.current));
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  /** 0 → 1 mientras el logo viaja del hero al dial. */
  const travel = useTransform(scrollY, (y) =>
    geo ? ease(clamp01((y - geo.top) / geo.heroH)) : 0,
  );
  /** 0 → 1 mientras el dial está fijado. */
  const pin = useTransform(scrollY, (y) =>
    geo ? clamp01((y - geo.top - geo.heroH) / geo.pinLen) : 0,
  );

  const size = geo?.start.size ?? 0;
  const logoX = useTransform(travel, (p) =>
    geo ? lerp(geo.start.x, geo.end.x, p) - size / 2 : 0,
  );
  const logoY = useTransform(travel, (p) =>
    geo ? lerp(geo.start.y, geo.end.y, p) - size / 2 : 0,
  );
  const logoScale = useTransform(travel, (p) =>
    geo ? lerp(1, geo.end.size / geo.start.size, p) : 1,
  );
  const ringRotate = useTransform(pin, (p) => (reduce ? 0 : p * 360));

  // La aguja arranca arriba (N) y da una vuelta: cada cuarto enciende un servicio.
  useMotionValueEvent(pin, "change", (p) => {
    setActive(Math.round(p * 4) % 4);
  });

  const resolvedTitle = title ?? t.title;
  const resolvedSubtitle = subtitle ?? t.subtitle;
  const resolvedCtas =
    ctas ??
    t.ctas.map((cta) => {
      const route = CTA_ROUTES[cta.href];
      return { ...cta, href: route ? pathFor(route, lang)! : cta.href };
    });

  return (
    <div
      ref={wrapRef}
      className="relative w-full overflow-x-clip bg-black text-white">
      {/* ---------- Línea central: cruza hero y dial ---------- */}
      <div
        className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-white/10"
        aria-hidden="true"
      />

      {/* ================= HERO ================= */}
      <section
        ref={heroRef}
        className="relative min-h-screen w-full overflow-hidden">
        {/* ---------- Hexágonos (esquina inferior derecha) ---------- */}
        <div
          className="pointer-events-none absolute bottom-[4%] right-[3%] hidden w-[22vw] max-w-sm lg:block"
          aria-hidden="true">
          <HexGrid reduce={reduce} />
        </div>

        {/* ---------- Hueco del logo en desktop (lo ocupa la capa sticky) ---------- */}
        <div
          ref={deskSlotRef}
          className="absolute hidden lg:block left-1/2 bottom-[5%] h-[min(38vh,24vw)] w-[min(38vh,24vw)] -translate-x-1/2"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 gap-8 px-6 pb-16 pt-28 lg:grid-cols-2 lg:gap-0 lg:px-0 lg:pb-24 lg:pt-36">
          {/* ---------- Columna izquierda: rótulo ---------- */}
          <div className="flex flex-col items-end lg:justify-center lg:pr-16">
            <h1
              lang={lang}
              className={`font-display w-full uppercase leading-[0.9] tracking-tight text-white text-right text-[clamp(2.5rem,11vw,4.5rem)] lg:text-[clamp(5rem,5vw,6rem)] text-balance wrap-break-word hyphens-auto`}>
              {resolvedTitle}
            </h1>
          </div>

          {/* ---------- Hueco del logo en móvil ---------- */}
          <div
            ref={mobileSlotRef}
            className="-my-6 mx-auto aspect-square w-[min(52vw,300px)] lg:hidden"
            aria-hidden="true"
          />

          {/* ---------- Columna derecha: texto + CTAs ---------- */}
          <div className="flex flex-col lg:pl-16 lg:pt-4">
            <p className="max-w-md text-[clamp(1rem,4.2vw,1.25rem)] font-light leading-relaxed text-white/70">
              {resolvedSubtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-start gap-3">
              {resolvedCtas.map((cta) => (
                <a
                  key={cta.href}
                  href={cta.href}
                  className={
                    cta.variant === "solid"
                      ? "group inline-flex items-center justify-center gap-4 bg-grolow-brand-bright px-5 sm:px-7 py-4 text-sm font-bold uppercase tracking-widest sm:tracking-[0.18em] text-black transition-colors hover:bg-white whitespace-nowrap"
                      : "group inline-flex items-center justify-center gap-4 border border-white/25 px-5 sm:px-7 py-4 text-sm font-bold uppercase tracking-widest sm:tracking-[0.18em] text-white transition-colors hover:border-white whitespace-nowrap"
                  }>
                  {cta.label}
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= DIAL ================= */}
      {/* El alto extra es el recorrido de scroll durante el que el dial se
          queda fijado y el anillo da su vuelta. */}
      <section ref={dialSectionRef} className="relative h-[260vh] w-full">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Línea horizontal del punto de mira */}
          <div
            className="absolute inset-x-0 top-[56%] h-px bg-white/10"
            aria-hidden="true"
          />

          <h2
            className={`font-display absolute inset-x-0 top-[9%] text-center uppercase leading-none tracking-tight text-white text-[clamp(2.5rem,10vw,6rem)]`}>
            {t.dialTitle}
          </h2>

          <div
            ref={dialRef}
            className="absolute left-1/2 top-[56%] aspect-square w-[min(72vw,56vh,520px)] -translate-x-1/2 -translate-y-1/2">
            <DialRing rotate={ringRotate} />

            <ul>
              {t.services.map((label, i) => (
                <li
                  key={label}
                  className={`font-display absolute flex items-center gap-2 whitespace-nowrap uppercase leading-none tracking-wide transition-colors duration-300 text-[clamp(0.95rem,3.8vw,1.75rem)] ${LABEL_POS[i]} ${
                    active === i ? "text-white" : "text-white/40"
                  }`}>
                  <span
                    className={`h-2.5 w-2.5 shrink-0 rounded-full transition-all duration-300 ${
                      active === i
                        ? "bg-grolow-brand-bright shadow-[0_0_14px_rgba(6,224,218,0.8)]"
                        : "bg-grolow-brand"
                    }`}
                  />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================= LOGO (capa sticky sobre hero + dial) ================= */}
      <div
        className="pointer-events-none absolute inset-0 z-20"
        aria-hidden="true">
        <div className="sticky top-0 h-screen w-full">
          <motion.div
            className="pointer-events-auto absolute left-0 top-0"
            style={{
              width: size,
              height: size,
              x: logoX,
              y: logoY,
              scale: logoScale,
              opacity: geo ? 1 : 0,
            }}>
            <Logo3D src={model} reduce={reduce} scroll={scrollY} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
