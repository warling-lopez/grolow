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
import { onIntroDone } from "@/app/lib/transitions/intro-events";
import Arrow from "@/app/components/Arrow";

/**
 * Hero de portada (/es y /en) + sección «lo que hacemos bien».
 *
 * Hero: dos columnas sobre negro —rótulo gigante y condensado que llena toda
 * la mitad izquierda; logo, texto y CTAs a la derecha— con una rejilla de
 * hexágonos con las letras de la marca en la esquina inferior derecha.
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

/**
 * Ancho de la línea más larga del título en em (Bebas Neue + tracking-tight),
 * con ~3% de margen. Medido con las métricas de la fuente:
 * ES «CONSTRUIMOS» 3,98em · EN «YOUR BUSINESS» 4,34em.
 * El h1 toma `100cqi / TITLE_FIT`: la línea más larga ocupa todo el ancho de
 * su columna. Si cambia el copy del título, hay que volver a medir.
 */
const TITLE_FIT = { es: 4.1, en: 4.47 } as const;

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
 *
 * El GLB publicado ya va optimizado (sin el cubo, sin COLOR_1 y con la malla
 * cuantizada: 916 KB → 548 KB). Para regenerarlo tras un re-export:
 *   gltf-transform quantize entrada.glb public/3d/logo_3d.glb
 * y quitar antes el cubo y COLOR_1. El póster (`logo_3d-poster.webp`) hay que
 * rehacerlo también si cambia el modelo, junto con sus versiones reducidas
 * (ver `posterSrcSet`).
 */
const STRAY_MATERIAL = "Material";

/**
 * El póster se sirve en varios anchos para que cada pantalla baje solo lo que
 * pinta: en móvil el logo mide ~200 px CSS y bajar el de 640 px malgastaba
 * ~30 KB (PageSpeed: «Mejorar la entrega de imágenes»).
 * Las versiones viven junto al original: logo_3d-poster-256.webp, -384, -512.
 * Para rehacerlas tras cambiar el póster (Python + Pillow):
 *   Image.open(p).resize((w, w), Image.LANCZOS).save(out, "WEBP", quality=82, method=6)
 */
const POSTER_WIDTHS = [256, 384, 512] as const;
const posterSrcSet = (src: string) =>
  [
    ...POSTER_WIDTHS.map(
      (w) => `${src.replace(/\.webp$/, `-${w}.webp`)} ${w}w`,
    ),
    `${src} 640w`,
  ].join(", ");
/** Ancho que ocupa el logo en el hero: el de los huecos de móvil y desktop. */
const POSTER_SIZES = "(min-width: 1024px) min(30vh, 15vw), min(52vw, 300px)";

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
  const lang = useLang();
  // Junto al GLB: /3d/logo_3d.glb → /3d/logo_3d-poster.webp
  const poster = src.replace(/\.glb$/, "-poster.webp");

  // Fachada: hasta que el visitante interactúa (mueve el ratón, toca,
  // hace scroll o pulsa una tecla) solo se ve el póster estático del logo.
  // model-viewer + three.js cuestan ~340 KB de JS y, en el primer fotograma,
  // compilan shaders y generan el entorno de luz en una sola tarea que
  // bloquea el hilo principal (segundos en un móvil medio). Así ese coste
  // sale de la carga inicial y lo paga solo quien ya está usando la página.
  //
  // Además se espera a que termine la intro de portada: cargarlo durante el
  // palo y la rotura los congelaba. Sin intro (ya vista, otra navegación) no
  // hay que esperar nada más que la interacción.
  useEffect(() => {
    let cancelled = false;
    let introDone = !document.getElementById("intro-loader");
    let interacted = false;
    let started = false;

    const maybeLoad = () => {
      if (started || cancelled || !introDone || !interacted) return;
      started = true;
      import("@google/model-viewer").then(() => {
        if (!cancelled) setReady(true);
      });
    };

    const EVENTS = [
      "pointerdown",
      "pointermove",
      "touchstart",
      "wheel",
      "keydown",
      "scroll",
    ] as const;
    const onInteract = () => {
      interacted = true;
      EVENTS.forEach((e) => window.removeEventListener(e, onInteract, true));
      maybeLoad();
    };
    EVENTS.forEach((e) =>
      window.addEventListener(e, onInteract, { capture: true, passive: true }),
    );

    const off = introDone
      ? () => {}
      : onIntroDone(() => {
          introDone = true;
          maybeLoad();
        });

    return () => {
      cancelled = true;
      off();
      EVENTS.forEach((e) => window.removeEventListener(e, onInteract, true));
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

  return (
    <div className="relative h-full w-full">
      {ready && (
    <model-viewer
      ref={ref}
      src={src}
      // No va con aria-hidden: con camera-controls, model-viewer pone
      // tabindex="0" dentro de su shadow DOM (no se puede quitar) y un
      // elemento enfocable dentro de aria-hidden es un error de
      // accesibilidad. Se expone como imagen con nombre.
      alt={lang === "en" ? "Grolow 3D logo" : "Logo de Grolow en 3D"}
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
      className={`absolute inset-0 block h-full w-full bg-transparent transition-opacity duration-700 ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
      style={{ "--poster-color": "transparent" } as React.CSSProperties}
    />
      )}
      {/* Póster: el mismo logo, renderizado en el ángulo inicial de la
          cámara (-20°, 80°). Se ve desde el primer pintado y se funde cuando
          el 3D ya ha pintado su primer fotograma. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        srcSet={posterSrcSet(poster)}
        sizes={POSTER_SIZES}
        alt=""
        aria-hidden="true"
        width={640}
        height={640}
        decoding="async"
        fetchPriority="low"
        draggable={false}
        data-logo-poster=""
        className={`pointer-events-none absolute inset-0 h-full w-full select-none object-contain transition-opacity duration-700 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}

/**
 * Póster del logo pintado en su hueco del hero, que ya existe en el HTML del
 * servidor con su tamaño final. La capa que viaja con el scroll no tiene
 * medidas hasta que React hidrata y mide (`geo`), así que sin esto el logo no
 * aparecía hasta después del JS y pasaba a ser el LCP de la página (4,5 s en
 * móvil). En cuanto la capa móvil está colocada —encima, en el mismo sitio y
 * con la misma imagen— este se oculta.
 */
function SlotPoster({ src, hidden }: { src: string; hidden: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      srcSet={posterSrcSet(src)}
      sizes={POSTER_SIZES}
      alt=""
      width={640}
      height={640}
      fetchPriority="high"
      draggable={false}
      className={`pointer-events-none absolute inset-0 h-full w-full select-none object-contain ${
        hidden ? "invisible" : ""
      }`}
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

/**
 * Fracción del recorrido fijado en la que el anillo completa su vuelta. El
 * resto es una pausa quieta antes de la transición a «Nuestro método»: la
 * captura de la rotura se toma ahí, así que el dial tiene que estar ya en su
 * estado final (anillo a 360°, aguja en el primer servicio).
 */
const DIAL_SPIN_END = 0.85;
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
  const poster = model.replace(/\.glb$/, "-poster.webp");
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
  const spin = useTransform(pin, (p) => clamp01(p / DIAL_SPIN_END));
  const ringRotate = useTransform(spin, (p) => (reduce ? 0 : p * 360));

  // La aguja arranca arriba (N) y da una vuelta: cada cuarto enciende un servicio.
  useMotionValueEvent(spin, "change", (p) => {
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
      // Superficie oscura (hero + reloj): al pasar por detrás del header,
      // este cambia a sus tonos claros (ver useHeaderTrigger).
      data-header-trigger="true"
      className="relative w-full overflow-x-clip bg-black text-white">
      {/* ---------- Línea central: cruza hero y dial ---------- */}
      <div
        id="hero-center-line"
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

        <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 gap-8 px-6 pb-16 pt-28 lg:max-w-none lg:grid-cols-2 lg:gap-0 lg:px-0 lg:pb-24 lg:pt-36">
          {/* ---------- Columna izquierda: rótulo ---------- */}
          {/* `@container`: el h1 mide su tamaño contra el ancho de esta
              columna (100cqi), no contra el de la pantalla. */}
          <div className="@container flex flex-col items-start lg:items-end lg:justify-center lg:pl-[4vw] lg:pr-[3vw]">
            {/* Tamaño = lo que permita el ancho (la línea más larga llena la
                columna) o el alto, lo que sea menor: en móvil el rótulo no
                pasa del 60% de la pantalla; en escritorio, de lo que queda
                bajo el header. 3.44 = 4 líneas × leading 0.86. */}
            <h1
              lang={lang}
              className={`font-h1 w-full whitespace-nowrap uppercase leading-[0.86] tracking-tight text-white text-left lg:text-right [--cap:calc(60svh_/_3.44)] lg:[--cap:calc((100svh_-_13rem)_/_3.44)]`}
              style={
                {
                  "--fit": TITLE_FIT[lang],
                  fontSize: "min(calc(100cqi / var(--fit)), var(--cap))",
                } as React.CSSProperties
              }>
              {resolvedTitle}
            </h1>
          </div>

          {/* ---------- Hueco del logo en móvil ---------- */}
          <div
            ref={mobileSlotRef}
            className="relative -my-6 mx-auto aspect-square w-[min(52vw,300px)] lg:hidden"
            aria-hidden="true">
            <SlotPoster src={poster} hidden={!!geo} />
          </div>

          {/* ---------- Columna derecha: logo + texto + CTAs ---------- */}
          <div className="flex flex-col lg:justify-center lg:pl-[4vw] lg:pr-[5vw]">
            {/* Hueco del logo en desktop (lo ocupa la capa sticky). Vive aquí
                y no sobre la línea central para dejarle al rótulo toda la
                mitad izquierda. */}
            <div
              ref={deskSlotRef}
              className="relative mb-10 hidden aspect-square w-[min(30vh,15vw)] lg:block"
              aria-hidden="true">
              <SlotPoster src={poster} hidden={!!geo} />
            </div>

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
                    <Arrow />
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
        <div
          id="lo-que-hacemos-bien"
          className="sticky top-0 h-screen w-full overflow-hidden">
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
      {/* Sin aria-hidden: dentro está el <model-viewer>, que es enfocable
          (ver Logo3D). El póster ya va oculto por su cuenta. */}
      <div className="pointer-events-none absolute inset-0 z-20">
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
