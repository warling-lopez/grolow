"use client";

import { motion, useReducedMotion } from "framer-motion";
import SplitText from "./SplitText";
import { useLang } from "./hooks/useLang";
import { pathFor, type RouteId } from "@/app/lib/i18n";

/* ------------------------------------------------------------------ */
/* Tipos / API del componente                                          */
/* ------------------------------------------------------------------ */

export type HeroCard = {
  /** Ruta del screenshot (ej. "/proyects/uno.png"). Si falta → bloque de color. */
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
  /** Inclinación 3D — totalmente configurable. */
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

/** Set de placeholders para que se vea lleno sin pasar props.
 *  Reemplaza estos por tus screenshots reales pasando `images`. */
const DEFAULT_IMAGES: HeroCard[] = Array.from({ length: 16 }, (_, i) => ({
  color: FALLBACK_COLORS[i % FALLBACK_COLORS.length],
  alt: `Proyecto ${i + 1}`,
}));

/** Los CTA por defecto ya no van a anclas: casos y contacto son páginas. */
const CTA_ROUTES: Record<string, RouteId> = {
  "#casos": "casos",
  "#contacto": "contacto",
};

const DEFAULT_DURATIONS = [40, 55, 48, 60];

const COPY = {
  en: {
    eyebrow: "REAL CODE, NOT TEMPLATES",
    title: (
      <>
        Custom web development{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-grolow-cream to-grolow-accent italic">
          for companies,
        </span>{" "}
        consultancies and creators.
      </>
    ),
    subtitle: (
      <>
        We build in our own code, not on WordPress or templates.{" "}
        <span className="text-grolow-light font-medium">
          That means a site that does exactly what your business needs
        </span>
        , without the weight of twenty plugins you will never use — and a team
        you message directly, with no account executive in between.
      </>
    ),
    ctas: [
      { label: "See real work", href: "#casos", variant: "outline" as const },
      {
        label: "Request our free proposal",
        href: "#contacto",
        variant: "solid" as const,
      },
    ],
  },
  es: {
    eyebrow: "CÓDIGO PROPIO, NO PLANTILLAS",
    title: (
      <>
        Desarrollo web a medida{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-grolow-cream to-grolow-accent italic">
          para empresas,
        </span>{" "}
        consultoras y creadores.
      </>
    ),
    subtitle: (
      <>
        Construimos en código propio, no en WordPress ni en plantillas.{" "}
        <span className="text-grolow-light font-medium">
          Eso significa un sitio que hace exactamente lo que tu negocio necesita
        </span>
        , sin el peso de veinte plugins que nunca vas a usar, y un equipo al que
        le escribes directo sin pasar por un ejecutivo de cuentas.
      </>
    ),
    ctas: [
      { label: "Ver trabajos reales", href: "#casos", variant: "outline" as const },
      {
        label: "Pedir nuestra propuesta gratis",
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

function Card({ card }: { card: HeroCard }) {
  return (
    <div
      className="relative w-full aspect-16/10 rounded-xl overflow-hidden border border-grolow-light/10 shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
      style={{ backgroundColor: card.color ?? "#E8DEC4" }}>
      {card.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={card.src}
          alt={card.alt ?? ""}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
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

  // Por defecto mantiene el SplitText original de la home.
  //
  // SplitText es `whitespace-nowrap` (el efecto de doble capa recortada lo
  // exige), así que la etiqueta no puede partirse en dos líneas: si no cabe,
  // la sección la recorta. Con un texto de 36 caracteres el tamaño por
  // defecto de SplitText (clamp 1.5rem…3rem) se salía en móvil, de ahí este
  // clamp más contenido.
  const resolvedEyebrow = eyebrow ?? (
    <SplitText className="text-[clamp(0.8rem,3.2vw,1.5rem)]">
      {t.eyebrow}
    </SplitText>
  );
  const resolvedTitle = title ?? t.title;
  const resolvedSubtitle = subtitle ?? t.subtitle;
  // Los CTA por defecto apuntaban a anclas de la portada. Ahora casos y
  // contacto son páginas propias, así que el enlace va a la ruta real.
  const resolvedCtas =
    ctas ??
    t.ctas.map((cta) => {
      const route = CTA_ROUTES[cta.href];
      return { ...cta, href: route ? pathFor(route, lang)! : cta.href };
    });

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center px-6 overflow-hidden bg-grolow-dark">
      {/* ---------- Fondo: rejilla inclinada 3D (parallax) ---------- */}
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

      {/* ---------- Overlay oscuro (radial + lineal) ---------- */}
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
        <div className="mb-15 text-sm sm:text-base font-bold tracking-widest uppercase text-grolow-cream/80">
          {resolvedEyebrow}
        </div>
        {/* Tamaño fluido en vez de saltos por breakpoint: el titular pasó de
            41 a 70 caracteres y con `md:text-[92px]` fijo se iba a 6 líneas en
            tablet y sacaba el hero fuera del viewport en portátiles de 800px. */}
        <h1
          className="text-[clamp(1.75rem,6.2vw,5rem)] font-extrabold leading-[0.95] md:leading-[0.9] tracking-tight md:tracking-tighter text-grolow-light uppercase mb-10 max-w-5xl"
          style={{ fontFamily: "'Syne', sans-serif" }}
          lang={lang}>
          {resolvedTitle}
        </h1>

        <p className="text-[16px] text-grolow-light/75 max-w-xl font-light leading-relaxed mb-10">
          {resolvedSubtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-center">
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
