"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import SplitText from "./SplitText";
import { useLang } from "./hooks/useLang";
import { pathFor, type RouteId } from "@/app/lib/i18n";

/* ------------------------------------------------------------------ */
/* Tipos / API del componente                                          */
/* ------------------------------------------------------------------ */

export type HeroCard = {
  /** Ruta del screenshot. Si falta → bloque de color. */
  src?: string;
  alt?: string;
  /** Color de fallback cuando no hay src. Si falta, se rota entre los del tema. */
  color?: string;
};

export type HeroCTA = {
  label: string;
  href: string;
  variant?: "solid" | "outline";
};

export type Hero2Props = {
  /** Array plano de screenshots; el componente los reparte en NUM_COLS columnas. */
  images?: HeroCard[];
  /** Duración (s) de cada columna → distintas = efecto parallax. */
  durations?: number[];
  /** Inclinación de la rejilla. */
  rotateX?: number; // deg
  rotateZ?: number; // deg
  perspective?: number; // px
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  ctas?: HeroCTA[];
};

/* ------------------------------------------------------------------ */
/* Defaults                                                            */
/* ------------------------------------------------------------------ */

const NUM_COLS = 4;

const FALLBACK_COLORS = ["#E8DEC4", "#DCEAE0", "#E3E9DD", "#EFE7D0"];

const DEFAULT_IMAGES: HeroCard[] = Array.from({ length: 12 }, (_, i) => ({
  color: FALLBACK_COLORS[i % FALLBACK_COLORS.length],
  alt: "",
}));

/** Los CTA por defecto ya no van a anclas: casos y contacto son páginas. */
const CTA_ROUTES: Record<string, RouteId> = {
  "#casos": "casos",
  "#contacto": "contacto",
};

const DEFAULT_DURATIONS = [40, 55, 48, 60];

const COPY = {
  en: {
    eyebrow: "OPERATIONS SYSTEMS",
    title: (
      <>
        We build the{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-grolow-cream to-grolow-accent italic">
          system
        </span>{" "}
        your business runs on.
      </>
    ),
    subtitle: (
      <>
        Internal dashboards, inventory, scheduling and client portals.{" "}
        <span className="text-grolow-light font-medium">
          For when the business has outgrown the spreadsheet and the WhatsApp
          group.
        </span>{" "}
        Custom code, built on how you actually work.
      </>
    ),
    ctas: [
      {
        label: "Systems in production",
        href: "#casos",
        variant: "outline" as const,
      },
      {
        label: "Book a diagnosis",
        href: "#contacto",
        variant: "solid" as const,
      },
    ],
  },
  es: {
    eyebrow: "SISTEMAS DE OPERACIÓN",
    title: (
      <>
        Construimos{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-grolow-cream to-grolow-accent italic">
          sistemas de operación
        </span>{" "}
        a medida.
      </>
    ),
    subtitle: (
      <>
        Paneles internos, inventario, reservas y portales de cliente.{" "}
        <span className="text-grolow-light font-medium">
          Cuando el negocio ya creció más de lo que aguanta el Excel y el grupo
          de WhatsApp.
        </span>{" "}
        Código propio, sobre tu proceso real.
      </>
    ),
    ctas: [
      {
        label: "Sistemas en producción",
        href: "#casos",
        variant: "outline" as const,
      },
      {
        label: "Agendar diagnóstico",
        href: "#contacto",
        variant: "solid" as const,
      },
    ],
  },
} as const;

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/** Reparte un array plano de cards en NUM_COLS columnas (round-robin). */
function splitIntoColumns(images: HeroCard[]): HeroCard[][] {
  const cols: HeroCard[][] = Array.from({ length: NUM_COLS }, () => []);
  images.forEach((img, i) => cols[i % NUM_COLS].push(img));
  return cols;
}

/* ------------------------------------------------------------------ */
/* Card                                                               */
/* ------------------------------------------------------------------ */

/**
 * `sizes` es obligatorio aquí: la rejilla mide 170% del viewport en móvil y
 * 120% a partir de `sm`, repartido en 2 y 4 columnas respectivamente. Sin este
 * dato Next asume 100vw y sirve una imagen ~4× más pesada de la que se ve.
 */
const CARD_SIZES = "(max-width: 639px) 42vw, (max-width: 1024px) 30vw, 320px";

function Card({ card }: { card: HeroCard }) {
  return (
    <div
      className="relative w-full aspect-16/10 rounded-xl overflow-hidden border border-grolow-light/10 shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
      style={{ backgroundColor: card.color ?? FALLBACK_COLORS[0] }}>
      {card.src ? (
        <Image
          src={card.src}
          alt={card.alt ?? ""}
          fill
          sizes={CARD_SIZES}
          className="object-cover"
          draggable={false}
        />
      ) : (
        <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent" />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Columna animada                                                     */
/* ------------------------------------------------------------------ */

function Column({
  cards,
  duration,
  reduce,
  hideOnMobile = false,
}: {
  cards: HeroCard[];
  duration: number;
  reduce: boolean;
  hideOnMobile?: boolean;
}) {
  // Duplicamos el contenido para que el loop sea seamless (0% → -50%).
  const loop = [...cards, ...cards];

  return (
    <div
      className={`relative flex-1 overflow-hidden ${
        hideOnMobile ? "hidden sm:block" : ""
      }`}>
      <motion.div
        className="flex flex-col gap-4"
        style={{ willChange: "transform" }}
        animate={reduce ? undefined : { y: ["0%", "-50%"] }}
        transition={
          reduce ? undefined : { duration, ease: "linear", repeat: Infinity }
        }>
        {loop.map((card, i) => (
          <Card key={i} card={card} />
        ))}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero2                                                               */
/* ------------------------------------------------------------------ */

export default function Hero2({
  images = DEFAULT_IMAGES,
  durations = DEFAULT_DURATIONS,
  rotateX = 15,
  rotateZ = -8,
  perspective = 1000,
  eyebrow,
  title,
  subtitle,
  ctas,
}: Hero2Props) {
  const reduce = useReducedMotion() ?? false;
  const columns = splitIntoColumns(images);
  const lang = useLang();
  const t = COPY[lang];

  // SplitText es `whitespace-nowrap` (el efecto de doble capa recortada lo
  // exige), así que la etiqueta no puede partirse en dos líneas. Con la
  // etiqueta nueva —21 caracteres frente a los 28 de antes— cabe un cuerpo
  // bastante mayor en móvil sin que la sección la recorte.
  const resolvedEyebrow = eyebrow ?? (
    <SplitText className="text-[clamp(1rem,4.4vw,1.75rem)]">
      {t.eyebrow}
    </SplitText>
  );
  const resolvedTitle = title ?? t.title;
  const resolvedSubtitle = subtitle ?? t.subtitle;
  const resolvedCtas =
    ctas ??
    t.ctas.map((cta) => {
      const route = CTA_ROUTES[cta.href];
      return { ...cta, href: route ? pathFor(route, lang)! : cta.href };
    });

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center px-6 overflow-hidden bg-grolow-dark">
      {/* ---------- Fondo: rejilla inclinada (parallax) ---------- */}
      <div
        className="absolute bg-black inset-0 z-0 flex items-start justify-center"
        style={{ perspective: `${perspective}px` }}
        aria-hidden="true">
        <div
          // --tilt-scale y --grid-scale se ajustan por breakpoint (clases),
          // mientras --rot-x/--rot-z vienen de props (inline). La cascada de
          // variables CSS permite combinarlas en el transform inline.
          className="flex justify-center gap-4 w-[170%] sm:w-[120%] mt-[-20%] [--tilt-scale:0.55] [--grid-scale:1.5] sm:[--tilt-scale:1] sm:[--grid-scale:1.25]"
          style={
            {
              "--rot-x": `${rotateX}deg`,
              "--rot-z": `${rotateZ}deg`,
              transform:
                "rotateX(calc(var(--rot-x) * var(--tilt-scale))) rotateZ(calc(var(--rot-z) * var(--tilt-scale))) scale(var(--grid-scale))",
              transformOrigin: "center top",
            } as React.CSSProperties
          }>
          {columns.map((cards, i) => (
            <Column
              key={i}
              cards={cards}
              duration={durations[i] ?? DEFAULT_DURATIONS[i % NUM_COLS]}
              reduce={reduce}
              // 3ª y 4ª columna sólo en >= sm (mobile = 2 columnas).
              hideOnMobile={i >= 2}
            />
          ))}
        </div>
      </div>

      {/* ---------- Velo (radial + lineal) ---------- */}
      <div
        className="absolute inset-0 z-5"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(246,241,226,0.45) 0%, rgba(246,241,226,0.82) 55%, rgba(246,241,226,0.97) 100%), linear-gradient(180deg, rgba(246,241,226,0.75) 0%, rgba(246,241,226,0.35) 38%, rgba(246,241,226,0.95) 100%)",
        }}
      />

      {/* ---------- Contenido del hero ---------- */}
      <div className="relative z-10 max-w-7xl mx-auto w-full text-center flex flex-col items-center pt-20">
        <div className="mb-10 md:mb-14 font-bold tracking-widest uppercase text-grolow-cream/80">
          {resolvedEyebrow}
        </div>

        {/* `w-full` no es decorativo: el contenedor es un flex en columna con
            `items-center`, así que sus hijos se dimensionan a su contenido. Sin
            esto el h1 tomaba el ancho de su palabra más larga —525px en un
            móvil de 375— y la sección, que es `overflow-hidden`, la recortaba
            por los dos lados. El desbordamiento no aparecía en un test de
            scroll horizontal justamente porque se recorta en vez de desplazar.

            `hyphens-auto` es la red de seguridad: con `lang` declarado, una
            palabra que no quepa se parte en vez de salirse. Con el clamp actual
            no debería llegar a usarse, pero evita que un copy más largo vuelva
            a recortarse sin avisar. */}
        <h1
          className="font-display w-full text-[clamp(1.5rem,6.6vw,4.5rem)] font-extrabold leading-[0.95] md:leading-[0.9] tracking-tight md:tracking-tighter text-grolow-light uppercase mb-8 md:mb-10 max-w-5xl text-balance wrap-break-word hyphens-auto"
          lang={lang}>
          {resolvedTitle}
        </h1>

        <p className="w-full text-[clamp(1rem,4.2vw,1.1875rem)] text-grolow-light/75 max-w-xl font-light leading-relaxed mb-10">
          {resolvedSubtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-center w-full sm:w-auto">
          {resolvedCtas.map((cta) => (
            <a
              key={cta.href}
              href={cta.href}
              className={
                cta.variant === "solid"
                  ? "group flex items-center justify-center gap-3 px-6 md:px-8 py-4 bg-grolow-cream text-grolow-dark font-bold uppercase tracking-wider text-sm hover:bg-grolow-light transition-colors whitespace-nowrap"
                  : "group flex items-center justify-center gap-3 px-6 md:px-8 py-4 border border-grolow-cream/40 text-grolow-cream font-bold uppercase tracking-wider text-sm hover:border-grolow-cream transition-colors whitespace-nowrap"
              }>
              {cta.label}
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
