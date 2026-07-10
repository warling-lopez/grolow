"use client";

import { useMemo, useState } from "react";
import { Anton, Inter, Space_Mono } from "next/font/google";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

/* ================================================================== */
/*  CONSTANTES EDITABLES  —  cambia aquí los datos del negocio         */
/* ================================================================== */

/** WhatsApp del negocio. Solo dígitos con código de país (formato wa.me).
 *  Número humano de referencia: +1 (224) 713-4650  */
const WHATSAPP_NUMBER = "12247134650";
const EMAIL = "graphiclabsrl@gmail.com";
const ADDRESS =
  "231 Av. 25 de Febrero, Villa Duarte, Santo Domingo, República Dominicana";
const HORARIO = "Lunes a Sábado · 8:00 AM – 6:00 PM";
const INSTAGRAM_USER = "laboratorio_visual_";
const INSTAGRAM_URL = "https://instagram.com/laboratorio_visual_";
/** Acento único de la marca: amarillo dorado (evoca los letreros luminosos). */
const ACCENT = "#FFC42E";

/* ================================================================== */
/*  Fuentes (convención del proyecto: next/font/google)               */
/* ================================================================== */

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});
const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

/* ================================================================== */
/*  CSS scopeado — solo lo que Tailwind no expresa cómodo             */
/*  (parpadeo de letrero, glow, grid blueprint, marquee)             */
/* ================================================================== */

const STYLES = `
  .vl { background:#0A0A0A; color:#F5F5F5; overflow-x:hidden; }
  .vl ::selection { background: var(--acc); color:#0A0A0A; }

  /* Fondo tipo plano técnico / blueprint */
  .vl-grid {
    background-image:
      linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px);
    background-size: 44px 44px;
  }

  /* Letrero luminoso: glow + parpadeo al cargar (2-3 flashes, sin loop) */
  .vl-sign { color:#fff; }
  .vl-sign--on {
    color: var(--acc);
    text-shadow:
      0 0 6px rgba(255,196,46,.55),
      0 0 22px rgba(255,196,46,.45),
      0 0 48px rgba(255,196,46,.28);
    animation: vl-flicker 1.5s ease-in-out .25s 1 both;
  }
  @keyframes vl-flicker {
    0%   { opacity:.15; text-shadow:none; }
    5%   { opacity:1; }
    9%   { opacity:.25; text-shadow:none; }
    13%  { opacity:1; }
    17%  { opacity:.2; text-shadow:none; }
    22%  { opacity:1; }
    26%  { opacity:.4; text-shadow:none; }
    30%  { opacity:1; }
    100% { opacity:1; }
  }

  /* Marquee infinito */
  .vl-marquee { animation: vl-marquee 26s linear infinite; }
  @keyframes vl-marquee { from { transform:translateX(0); } to { transform:translateX(-50%); } }

  @media (prefers-reduced-motion: reduce) {
    .vl-sign--on { animation:none; }
    .vl-marquee { animation:none; }
  }
`;

/* ================================================================== */
/*  Datos                                                             */
/* ================================================================== */

const SERVICES: { title: string; desc: string; icon: React.JSX.Element }[] = [
  {
    title: "Letreros",
    desc: "Corporativos, luminosos, letras 3D y números residenciales retroiluminados.",
    icon: (
      <path d="M4 5h16v9H4zM8 18h8M12 14v4M8 9h8M8 11.5h5" />
    ),
  },
  {
    title: "Placas de acrílico",
    desc: "Misión, visión y valores a full color para empresas y clínicas.",
    icon: <path d="M6 3h12v18H6zM9 8h6M9 12h6M9 16h4" />,
  },
  {
    title: "Diseño gráfico",
    desc: "Identidad visual y piezas creativas hechas a la medida de tu marca.",
    icon: (
      <path d="M12 3l3 6 6 .9-4.5 4.3 1 6.3L12 17.8 6.5 20.5l1-6.3L3 9.9 9 9z" />
    ),
  },
  {
    title: "Papelería empresarial",
    desc: "Tarjetas de presentación, carnets y sellos con acabado profesional.",
    icon: <path d="M4 4h16v16H4zM8 8h8M8 12h8M8 16h5" />,
  },
  {
    title: "Plotteo e impresión",
    desc: "Impresiones de todo tipo, gran formato y vinil de corte.",
    icon: <path d="M6 9V4h12v5M6 18h12v3H6zM4 9h16v6H4zM17 12h.01" />,
  },
  {
    title: "Regalos personalizados",
    desc: "Tazas, vasos térmicos y kits souvenir para tu equipo o evento.",
    icon: <path d="M6 8h9v4a4.5 4.5 0 01-9 0zM15 9h2.5a2 2 0 010 4H15M6 20h9" />,
  },
  {
    title: "Uniformes y textiles",
    desc: "Polos bordados, t-shirts y prendas personalizadas para tu empresa.",
    icon: (
      <path d="M8 4l4 2 4-2 4 3-3 3v10H7V10L4 7zM10 4a2 2 0 004 0" />
    ),
  },
];

const HIGHLIGHTS = [
  "Acrílicos",
  "Vasos Térmicos",
  "Kit Souvenirs",
  "Letreros",
  "Papelería",
  "Carnets",
  "Clientes",
];

/* Portafolio: cada item usa un mockup CSS/SVG (placeholder elegante).
   Reemplazar cada <Mockup/> por la foto real cuando estén disponibles. */
const PORTFOLIO: { title: string; cat: string; kind: MockKind }[] = [
  { title: "Letrero corporativo luminoso", cat: "Letreros", kind: "sign" },
  { title: "Placa Misión · Visión · Valores", cat: "Acrílicos", kind: "acrylic" },
  { title: "Número residencial retroiluminado 300", cat: "Letreros", kind: "number" },
  { title: "Vasos térmicos personalizados", cat: "Vasos Térmicos", kind: "mug" },
  { title: "Uniformes bordados", cat: "Uniformes", kind: "shirt" },
  { title: "Tarjetas de presentación", cat: "Papelería", kind: "card" },
  { title: "Kit souvenir de evento", cat: "Kit Souvenirs", kind: "gift" },
  { title: "Carnets corporativos", cat: "Carnets", kind: "id" },
];

const PORTFOLIO_FILTERS = [
  "Todos",
  ...Array.from(new Set(PORTFOLIO.map((p) => p.cat))),
];

/* ================================================================== */
/*  Cotizador: configuración de campos por categoría (escalable)      */
/* ================================================================== */

type FieldDef = {
  name: string;
  label: string;
  type: "select" | "text" | "number";
  options?: string[];
  placeholder?: string;
};

const QUOTE_CATEGORIES: { id: string; label: string; icon: React.JSX.Element }[] = [
  { id: "Letreros", label: "Letreros", icon: <path d="M4 5h16v9H4zM8 18h8M12 14v4" /> },
  { id: "Acrílicos", label: "Acrílicos", icon: <path d="M6 3h12v18H6zM9 8h6M9 12h6" /> },
  { id: "Papelería", label: "Papelería", icon: <path d="M4 4h16v16H4zM8 8h8M8 12h8" /> },
  { id: "Vasos / Tazas", label: "Vasos / Tazas", icon: <path d="M6 8h9v4a4.5 4.5 0 01-9 0zM15 9h2.5a2 2 0 010 4H15" /> },
  { id: "Uniformes", label: "Uniformes", icon: <path d="M8 4l4 2 4-2 4 3-3 3v10H7V10L4 7z" /> },
  { id: "Regalos personalizados", label: "Regalos", icon: <path d="M4 12h16v8H4zM12 12v8M4 8h16v4H4zM12 8a3 3 0 10-3-3" /> },
  { id: "Otro", label: "Otro", icon: <path d="M12 8v8M8 12h8" /> },
];

const QUOTE_FIELDS: Record<string, FieldDef[]> = {
  Letreros: [
    { name: "tipo", label: "Tipo de letrero", type: "select", options: ["Luminoso", "Letras 3D", "Acrílico", "Número residencial retroiluminado"] },
    { name: "medidas", label: "Medidas aproximadas", type: "text", placeholder: "ej. 2m x 1m" },
    { name: "ubicacion", label: "Ubicación", type: "select", options: ["Interior", "Exterior"] },
  ],
  Acrílicos: [
    { name: "tipo", label: "Tipo de placa", type: "select", options: ["Misión / Visión / Valores", "Señalización", "Reconocimiento"] },
    { name: "cantidad", label: "Cantidad", type: "number", placeholder: "1" },
    { name: "tamano", label: "Tamaño aproximado", type: "text", placeholder: "ej. 40 x 60 cm" },
  ],
  Papelería: [
    { name: "tipo", label: "Producto", type: "select", options: ["Tarjetas de presentación", "Carnets", "Hojas timbradas", "Sellos"] },
    { name: "cantidad", label: "Cantidad", type: "number", placeholder: "100" },
  ],
  "Vasos / Tazas": [
    { name: "tipo", label: "Tipo", type: "select", options: ["Taza cerámica", "Vaso térmico", "Kit souvenir"] },
    { name: "cantidad", label: "Cantidad", type: "number", placeholder: "12" },
    { name: "conLogo", label: "¿Con logo?", type: "select", options: ["Sí", "No"] },
  ],
  Uniformes: [
    { name: "tipo", label: "Prenda", type: "select", options: ["Polo", "T-shirt", "Camisa", "Gorra"] },
    { name: "cantidad", label: "Cantidad", type: "number", placeholder: "10" },
    { name: "tecnica", label: "Técnica", type: "select", options: ["Bordado", "Estampado"] },
  ],
  "Regalos personalizados": [
    { name: "tipo", label: "Tipo de regalo", type: "text", placeholder: "ej. termo, kit souvenir…" },
    { name: "cantidad", label: "Cantidad", type: "number", placeholder: "1" },
  ],
  Otro: [],
};

/* ================================================================== */
/*  Helpers                                                           */
/* ================================================================== */

function waLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** Fecha ISO (YYYY-MM-DD) desplazada `days` días desde hoy. */
function isoOffset(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

/* ================================================================== */
/*  Página                                                            */
/* ================================================================== */

export default function VisualLabPage() {
  return (
    <main
      className={`vl ${inter.variable} ${anton.variable} ${mono.variable} relative min-h-screen`}
      style={
        {
          "--acc": ACCENT,
          fontFamily: "var(--font-inter), system-ui, sans-serif",
        } as React.CSSProperties
      }>
      <style>{STYLES}</style>

      <Nav />
      <Hero />
      <Marquee />
      <Services />
      <Portfolio />
      <Cotizador />
      <About />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}

/* ------------------------------- Nav ------------------------------ */

function Nav() {
  const links = [
    { label: "Servicios", href: "#servicios" },
    { label: "Portafolio", href: "#portafolio" },
    { label: "Cotizador", href: "#cotizador" },
    { label: "Contacto", href: "#contacto" },
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0A0A0A]/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" aria-label="Visual Lab — inicio">
          <LogoMark />
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-[color:var(--acc)]">
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#cotizador"
          className="rounded-full bg-[var(--acc)] px-4 py-2 text-xs font-bold uppercase tracking-wider text-black transition-transform hover:scale-105 md:px-5 md:text-sm">
          Cotiza ahora
        </a>
      </nav>
    </header>
  );
}

/** Logo tipográfico "VISUAL LAB" con marco de corchetes cuadrados. */
function LogoMark({ big = false }: { big?: boolean }) {
  return (
    <span
      className={`inline-flex flex-col border-l-2 border-t-2 border-b-2 border-[color:var(--acc)] pl-2.5 pr-6 leading-none ${
        big ? "py-2" : "py-1"
      }`}
      style={{ fontFamily: "var(--font-anton), sans-serif" }}>
      <span
        className={`tracking-tight text-white ${big ? "text-4xl md:text-6xl" : "text-lg"}`}>
        VISUAL
      </span>
      <span
        className={`self-end tracking-[0.2em] text-[color:var(--acc)] ${
          big ? "text-2xl md:text-4xl" : "text-sm"
        }`}>
        LAB
      </span>
    </span>
  );
}

/* ------------------------------ Hero ------------------------------ */

function Hero() {
  return (
    <section
      id="top"
      className="vl-grid relative flex min-h-screen items-center overflow-hidden pt-16">
      {/* Halo de luz del acento */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
        style={{ background: ACCENT }}
      />
      <div className="relative mx-auto w-full max-w-6xl px-5 py-20">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[color:var(--acc)]"
          style={{ fontFamily: "var(--font-mono), monospace" }}>
          <span className="h-px w-8 bg-[color:var(--acc)]" />
          Laboratorio Gráfico Visual · Santo Domingo
        </motion.p>

        <h1
          className="max-w-4xl text-5xl leading-[0.92] tracking-tight sm:text-7xl md:text-8xl"
          style={{ fontFamily: "var(--font-anton), sans-serif" }}>
          <span className="block text-white">HACEMOS QUE</span>
          <span className="block text-white">TU MARCA</span>
          <span className="vl-sign vl-sign--on block uppercase">se vea</span>
        </h1>

        <p className="mt-8 max-w-xl text-lg text-white/70">
          Letreros luminosos, placas de acrílico, papelería, regalos y textiles
          personalizados.{" "}
          <span className="font-semibold text-white">
            Todo lo personalizamos.
          </span>
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="#cotizador"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--acc)] px-7 py-4 text-sm font-bold uppercase tracking-wider text-black transition-transform hover:scale-[1.03]">
            Cotiza en 1 minuto
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href={waLink("Hola Visual Lab, quiero información sobre sus servicios.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:border-[color:var(--acc)] hover:text-[color:var(--acc)]">
            <WhatsAppIcon className="h-5 w-5" />
            WhatsApp directo
          </a>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Marquee ---------------------------- */

function Marquee() {
  const items = ["TODO LO PERSONALIZAMOS", ...HIGHLIGHTS];
  const strip = (
    <div className="flex shrink-0 items-center">
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span
            className="px-6 text-lg font-bold uppercase tracking-wider text-white/90 sm:text-2xl"
            style={{ fontFamily: "var(--font-anton), sans-serif" }}>
            {t}
          </span>
          <span className="text-[color:var(--acc)]">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="border-y border-white/10 bg-[#0d0d0d] py-4">
      <div className="flex w-max vl-marquee">
        {strip}
        {strip}
      </div>
    </div>
  );
}

/* ---------------------------- Servicios --------------------------- */

function Services() {
  return (
    <section id="servicios" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHead
        kicker="Qué hacemos"
        title="Servicios del laboratorio"
        sub="Cada pieza sale calibrada al detalle. Elige un servicio o pásate directo al cotizador."
      />
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.title}
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-[color:var(--acc)] hover:shadow-[0_0_40px_-14px_var(--acc)]">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 text-[color:var(--acc)] transition-colors group-hover:bg-[var(--acc)] group-hover:text-black">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6">
                {s.icon}
              </svg>
            </div>
            <h3
              className="text-xl uppercase tracking-tight text-white"
              style={{ fontFamily: "var(--font-anton), sans-serif" }}>
              {s.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------- Portafolio -------------------------- */

function Portfolio() {
  const [filter, setFilter] = useState("Todos");
  const items =
    filter === "Todos"
      ? PORTFOLIO
      : PORTFOLIO.filter((p) => p.cat === filter);

  return (
    <section
      id="portafolio"
      className="border-y border-white/10 bg-[#0d0d0d] py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead
          kicker="Sala de exhibición"
          title="Portafolio"
          sub="Proyectos reales del laboratorio. (Placeholders — se reemplazan por fotos reales.)"
        />

        <div className="mt-8 flex flex-wrap gap-2">
          {PORTFOLIO_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                filter === f
                  ? "border-[color:var(--acc)] bg-[var(--acc)] text-black"
                  : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
              }`}>
              {f}
            </button>
          ))}
        </div>

        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          <AnimatePresence mode="popLayout">
            {items.map((p) => (
              <motion.figure
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="group break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A]">
                {/* Reemplazar con foto real */}
                <Mockup kind={p.kind} />
                <figcaption className="flex items-center justify-between gap-3 p-4">
                  <span className="text-sm font-semibold text-white">
                    {p.title}
                  </span>
                  <span
                    className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-[color:var(--acc)]"
                    style={{ fontFamily: "var(--font-mono), monospace" }}>
                    {p.cat}
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ---- Mockups CSS/SVG (placeholders elegantes, sin fotos externas) ---- */

type MockKind =
  | "sign"
  | "acrylic"
  | "number"
  | "mug"
  | "shirt"
  | "card"
  | "gift"
  | "id";

function Mockup({ kind }: { kind: MockKind }) {
  const shapes: Record<MockKind, React.JSX.Element> = {
    sign: (
      <>
        <rect x="20" y="45" width="160" height="50" rx="6" fill="#141414" stroke={ACCENT} strokeWidth="2" />
        <text x="100" y="78" textAnchor="middle" fontFamily="var(--font-anton)" fontSize="24" fill={ACCENT}>MARCA</text>
      </>
    ),
    acrylic: (
      <>
        <rect x="45" y="25" width="110" height="90" rx="4" fill="#111" stroke="#fff" strokeOpacity="0.4" />
        <line x1="60" y1="48" x2="140" y2="48" stroke={ACCENT} strokeWidth="3" />
        <line x1="60" y1="66" x2="130" y2="66" stroke="#fff" strokeOpacity="0.4" strokeWidth="2" />
        <line x1="60" y1="82" x2="135" y2="82" stroke="#fff" strokeOpacity="0.4" strokeWidth="2" />
      </>
    ),
    number: (
      <text x="100" y="95" textAnchor="middle" fontFamily="var(--font-anton)" fontSize="72" fill="none" stroke={ACCENT} strokeWidth="2">300</text>
    ),
    mug: (
      <>
        <rect x="60" y="40" width="60" height="60" rx="8" fill="#141414" stroke={ACCENT} strokeWidth="2" />
        <path d="M120 55 h14 a10 10 0 0 1 0 30 h-14" fill="none" stroke="#fff" strokeOpacity="0.4" strokeWidth="2" />
        <circle cx="90" cy="70" r="10" fill={ACCENT} fillOpacity="0.8" />
      </>
    ),
    shirt: (
      <path d="M70 40 l20 8 20-8 22 14-14 14v42H62V68L48 54z" fill="#141414" stroke={ACCENT} strokeWidth="2" />
    ),
    card: (
      <>
        <rect x="45" y="45" width="100" height="60" rx="6" fill="#141414" stroke="#fff" strokeOpacity="0.4" />
        <rect x="55" y="55" width="26" height="26" rx="4" fill={ACCENT} />
        <line x1="90" y1="60" x2="132" y2="60" stroke="#fff" strokeOpacity="0.5" strokeWidth="3" />
        <line x1="90" y1="72" x2="122" y2="72" stroke="#fff" strokeOpacity="0.3" strokeWidth="2" />
      </>
    ),
    gift: (
      <>
        <rect x="55" y="60" width="90" height="55" rx="4" fill="#141414" stroke={ACCENT} strokeWidth="2" />
        <rect x="55" y="45" width="90" height="18" rx="3" fill={ACCENT} fillOpacity="0.85" />
        <line x1="100" y1="45" x2="100" y2="115" stroke="#0A0A0A" strokeWidth="4" />
      </>
    ),
    id: (
      <>
        <rect x="65" y="30" width="70" height="90" rx="8" fill="#141414" stroke="#fff" strokeOpacity="0.4" />
        <circle cx="100" cy="60" r="16" fill={ACCENT} fillOpacity="0.85" />
        <line x1="80" y1="90" x2="120" y2="90" stroke="#fff" strokeOpacity="0.5" strokeWidth="3" />
        <line x1="85" y1="102" x2="115" y2="102" stroke="#fff" strokeOpacity="0.3" strokeWidth="2" />
      </>
    ),
  };
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-[#161616] to-[#0A0A0A]">
      <div className="vl-grid absolute inset-0 opacity-40" />
      <svg viewBox="0 0 200 140" className="relative h-full w-full">
        {shapes[kind]}
      </svg>
      <span
        className="absolute bottom-2 right-3 text-[9px] uppercase tracking-widest text-white/25"
        style={{ fontFamily: "var(--font-mono), monospace" }}>
        muestra · foto real pendiente
      </span>
    </div>
  );
}

/* ---------------------------- Cotizador --------------------------- */

type QuoteForm = {
  categoria: string;
  tipo: string;
  medidas: string;
  ubicacion: string;
  cantidad: string;
  tamano: string;
  conLogo: string;
  tecnica: string;
  nota: string;
  fecha: string;
  nombre: string;
  empresa: string;
  telefono: string;
};

const EMPTY_FORM: QuoteForm = {
  categoria: "",
  tipo: "",
  medidas: "",
  ubicacion: "",
  cantidad: "",
  tamano: "",
  conLogo: "",
  tecnica: "",
  nota: "",
  fecha: "",
  nombre: "",
  empresa: "",
  telefono: "",
};

const STEP_LABELS = ["Producto", "Detalles", "Tus datos", "Resumen"];

function Cotizador() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<QuoteForm>(EMPTY_FORM);
  const [error, setError] = useState("");
  const reduce = useReducedMotion();

  const set = (patch: Partial<QuoteForm>) =>
    setForm((f) => ({ ...f, ...patch }));

  const fields = form.categoria ? QUOTE_FIELDS[form.categoria] ?? [] : [];

  const detalles = useMemo(() => {
    // Todos los campos condicionales excepto "tipo" (que va en la línea Producto).
    return fields
      .filter((f) => f.name !== "tipo")
      .map((f) => {
        const v = (form as Record<string, string>)[f.name];
        return v ? `${f.label}: ${v}` : null;
      })
      .filter(Boolean)
      .join(" · ");
  }, [fields, form]);

  const message = useMemo(() => {
    const empresa = form.empresa ? ` (${form.empresa})` : "";
    return [
      "🧪 NUEVA COTIZACIÓN — VISUAL LAB",
      "━━━━━━━━━━━━━━━",
      `👤 Cliente: ${form.nombre}${empresa}`,
      `📱 Tel: ${form.telefono}`,
      `📦 Producto: ${form.categoria}${form.tipo ? " — " + form.tipo : ""}`,
      `📐 Detalles: ${detalles || "—"}`,
      `📝 Nota: ${form.nota || "—"}`,
      `📅 Entrega deseada: ${form.fecha || "A convenir"}`,
    ].join("\n");
  }, [form, detalles]);

  function next() {
    setError("");
    if (step === 0 && !form.categoria) {
      setError("Elige un producto para continuar.");
      return;
    }
    if (step === 2) {
      if (!form.nombre.trim()) return setError("Escribe tu nombre.");
      if (!form.telefono.trim())
        return setError("Escribe un teléfono de contacto.");
    }
    setStep((s) => Math.min(s + 1, STEP_LABELS.length - 1));
  }
  function back() {
    setError("");
    setStep((s) => Math.max(s - 1, 0));
  }

  return (
    <section id="cotizador" className="relative mx-auto max-w-3xl px-5 py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full opacity-20 blur-[110px]"
        style={{ background: ACCENT }}
      />
      <div className="relative">
        <SectionHead
          center
          kicker="⭐ El cotizador"
          title="Arma tu cotización"
          sub="En 4 pasos preparas tu pedido y te lo llevas directo al WhatsApp del negocio."
        />

        {/* Barra de progreso */}
        <div className="mx-auto mt-10 max-w-md">
          <div className="mb-3 flex justify-between">
            {STEP_LABELS.map((l, i) => (
              <span
                key={l}
                className={`text-[11px] font-bold uppercase tracking-wider transition-colors ${
                  i <= step ? "text-[color:var(--acc)]" : "text-white/30"
                }`}>
                {l}
              </span>
            ))}
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-[var(--acc)]"
              initial={false}
              animate={{
                width: `${((step + 1) / STEP_LABELS.length) * 100}%`,
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        {/* Pasos */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={reduce ? false : { opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}>
              {step === 0 && (
                <StepProducto value={form.categoria} onPick={(c) => set({ categoria: c })} />
              )}
              {step === 1 && (
                <StepDetalles form={form} fields={fields} set={set} />
              )}
              {step === 2 && <StepDatos form={form} set={set} />}
              {step === 3 && <StepResumen message={message} />}
            </motion.div>
          </AnimatePresence>

          {error && (
            <p className="mt-4 text-sm font-semibold text-red-400">{error}</p>
          )}

          {/* Navegación */}
          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              onClick={back}
              disabled={step === 0}
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white/70 transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-0">
              ← Atrás
            </button>

            {step < STEP_LABELS.length - 1 ? (
              <button
                onClick={next}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--acc)] px-7 py-3 text-sm font-bold uppercase tracking-wider text-black transition-transform hover:scale-[1.03]">
                Siguiente →
              </button>
            ) : (
              <a
                href={waLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 text-sm font-bold uppercase tracking-wider text-black transition-transform hover:scale-[1.02] sm:flex-none">
                <WhatsAppIcon className="h-5 w-5" />
                Enviar cotización por WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepProducto({
  value,
  onPick,
}: {
  value: string;
  onPick: (c: string) => void;
}) {
  return (
    <div>
      <StepTitle n={1} title="¿Qué necesitas?" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {QUOTE_CATEGORIES.map((c) => {
          const active = value === c.id;
          return (
            <button
              key={c.id}
              onClick={() => onPick(c.id)}
              className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all ${
                active
                  ? "border-[color:var(--acc)] bg-[var(--acc)]/10 shadow-[0_0_30px_-12px_var(--acc)]"
                  : "border-white/10 hover:border-white/30"
              }`}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`h-7 w-7 ${active ? "text-[color:var(--acc)]" : "text-white/70"}`}>
                {c.icon}
              </svg>
              <span
                className={`text-xs font-semibold ${active ? "text-white" : "text-white/70"}`}>
                {c.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepDetalles({
  form,
  fields,
  set,
}: {
  form: QuoteForm;
  fields: FieldDef[];
  set: (p: Partial<QuoteForm>) => void;
}) {
  return (
    <div>
      <StepTitle n={2} title={`Detalles · ${form.categoria}`} />
      <div className="grid gap-4">
        {fields.map((f) => (
          <Field key={f.name} label={f.label}>
            {f.type === "select" ? (
              <select
                value={(form as Record<string, string>)[f.name]}
                onChange={(e) => set({ [f.name]: e.target.value } as Partial<QuoteForm>)}
                className={inputClass}>
                <option value="">Selecciona…</option>
                {f.options?.map((o) => (
                  <option key={o} value={o} className="bg-[#141414]">
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={f.type}
                inputMode={f.type === "number" ? "numeric" : undefined}
                min={f.type === "number" ? 1 : undefined}
                placeholder={f.placeholder}
                value={(form as Record<string, string>)[f.name]}
                onChange={(e) => set({ [f.name]: e.target.value } as Partial<QuoteForm>)}
                className={inputClass}
              />
            )}
          </Field>
        ))}

        {/* Campos comunes a todas las categorías */}
        <Field label="Descripción / notas (opcional)">
          <textarea
            rows={3}
            value={form.nota}
            onChange={(e) => set({ nota: e.target.value })}
            placeholder="Cuéntanos colores, referencias, cualquier detalle…"
            className={`${inputClass} resize-none`}
          />
        </Field>
        <Field label="Fecha de entrega deseada (opcional · hasta 3 días)">
          <input
            type="date"
            min={isoOffset(0)}
            max={isoOffset(3)}
            value={form.fecha}
            onChange={(e) => set({ fecha: e.target.value })}
            className={inputClass}
          />
        </Field>
      </div>
    </div>
  );
}

function StepDatos({
  form,
  set,
}: {
  form: QuoteForm;
  set: (p: Partial<QuoteForm>) => void;
}) {
  return (
    <div>
      <StepTitle n={3} title="¿A nombre de quién?" />
      <div className="grid gap-4">
        <Field label="Nombre *">
          <input
            value={form.nombre}
            onChange={(e) => set({ nombre: e.target.value })}
            placeholder="Tu nombre"
            className={inputClass}
          />
        </Field>
        <Field label="Empresa (opcional)">
          <input
            value={form.empresa}
            onChange={(e) => set({ empresa: e.target.value })}
            placeholder="Nombre de tu negocio"
            className={inputClass}
          />
        </Field>
        <Field label="Teléfono *">
          <input
            type="tel"
            inputMode="tel"
            value={form.telefono}
            onChange={(e) => set({ telefono: e.target.value })}
            placeholder="(809) 000-0000"
            className={inputClass}
          />
        </Field>
      </div>
    </div>
  );
}

function StepResumen({ message }: { message: string }) {
  return (
    <div>
      <StepTitle n={4} title="Así llegará tu pedido" />
      <pre
        className="whitespace-pre-wrap rounded-2xl border border-white/10 bg-[#0A0A0A] p-5 text-sm leading-relaxed text-white/90"
        style={{ fontFamily: "var(--font-mono), monospace" }}>
        {message}
      </pre>
      <p className="mt-4 text-sm text-white/50">
        Revisa que todo esté correcto. Al enviar se abrirá WhatsApp con este
        mensaje listo para el negocio.
      </p>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/15 bg-[#0A0A0A] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[color:var(--acc)]";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/50">
        {label}
      </span>
      {children}
    </label>
  );
}

function StepTitle({ n, title }: { n: number; title: string }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span
        className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--acc)] text-sm font-bold text-black"
        style={{ fontFamily: "var(--font-mono), monospace" }}>
        {n}
      </span>
      <h3
        className="text-2xl uppercase tracking-tight text-white"
        style={{ fontFamily: "var(--font-anton), sans-serif" }}>
        {title}
      </h3>
    </div>
  );
}

/* ------------------------------ About ----------------------------- */

function About() {
  const stats = [
    { n: "38.9K", l: "Seguidores en Instagram" },
    { n: "+2,500", l: "Proyectos publicados" },
    { n: "100%", l: "Personalizado a tu marca" },
  ];
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHead
            kicker="Por qué Visual Lab"
            title="Un laboratorio, no una imprenta"
          />
          <p className="mt-6 text-lg leading-relaxed text-white/70">
            Somos un laboratorio gráfico en Santo Domingo donde la precisión se
            encuentra con la experimentación. Desde un letrero luminoso para tu
            local hasta el kit souvenir de tu evento: lo diseñamos, lo
            fabricamos y lo entregamos con acabado de marca.
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[color:var(--acc)] hover:underline">
            <InstagramIcon className="h-5 w-5" />@{INSTAGRAM_USER}
          </a>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {stats.map((s) => (
            <div
              key={s.l}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-center">
              <div
                className="text-3xl text-[color:var(--acc)] sm:text-4xl"
                style={{ fontFamily: "var(--font-anton), sans-serif" }}>
                {s.n}
              </div>
              <div className="mt-2 text-[11px] uppercase leading-tight tracking-wider text-white/50">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Contact ---------------------------- */

function Contact() {
  return (
    <section
      id="contacto"
      className="border-t border-white/10 bg-[#0d0d0d] py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead
          kicker="Dónde estamos"
          title="Visítanos o escríbenos"
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <InfoRow label="Dirección" value={ADDRESS} />
            <InfoRow label="Horario" value={HORARIO} />
            <InfoRow label="Email" value={EMAIL} href={`mailto:${EMAIL}`} />
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <a
                href={waLink("Hola Visual Lab, me gustaría cotizar un pedido.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-black transition-transform hover:scale-[1.03]">
                <WhatsAppIcon className="h-5 w-5" />
                WhatsApp
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:border-[color:var(--acc)] hover:text-[color:var(--acc)]">
                <InstagramIcon className="h-5 w-5" />
                Instagram
              </a>
            </div>
          </div>

          {/* Mini-mapa */}
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title="Ubicación de Visual Lab"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                ADDRESS
              )}&z=15&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[300px] w-full grayscale"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const body = (
    <span className="text-lg font-medium text-white transition-colors group-hover:text-[color:var(--acc)]">
      {value}
    </span>
  );
  return (
    <div className="group">
      <div
        className="mb-1 text-xs font-bold uppercase tracking-widest text-[color:var(--acc)]"
        style={{ fontFamily: "var(--font-mono), monospace" }}>
        {label}
      </div>
      {href ? (
        <a href={href} className="block">
          {body}
        </a>
      ) : (
        body
      )}
    </div>
  );
}

/* ----------------------------- Footer ----------------------------- */

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0A0A0A] py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 text-center sm:flex-row sm:justify-between sm:text-left">
        <LogoMark />
        <p className="text-xs text-white/40">
          © {new Date().getFullYear()} Visual Lab · Laboratorio Gráfico Visual ·
          Santo Domingo, RD
        </p>
        <p
          className="text-xs font-bold uppercase tracking-widest text-[color:var(--acc)]"
          style={{ fontFamily: "var(--font-mono), monospace" }}>
          Todo lo personalizamos
        </p>
      </div>
    </footer>
  );
}

/* -------------------------- WhatsApp float ------------------------ */

function WhatsAppFloat() {
  return (
    <a
      href={waLink("Hola Visual Lab, quiero hacer una cotización.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-black/40 transition-transform hover:scale-110">
      <WhatsAppIcon className="h-7 w-7 text-black" />
    </a>
  );
}

/* --------------------------- Compartidos -------------------------- */

function SectionHead({
  kicker,
  title,
  sub,
  center,
}: {
  kicker: string;
  title: string;
  sub?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p
        className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[color:var(--acc)]"
        style={{ fontFamily: "var(--font-mono), monospace" }}>
        {kicker}
      </p>
      <h2
        className="text-4xl uppercase leading-none tracking-tight text-white sm:text-5xl"
        style={{ fontFamily: "var(--font-anton), sans-serif" }}>
        {title}
      </h2>
      {sub && <p className="mt-4 text-white/60">{sub}</p>}
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.47 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.48.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12 2a10 10 0 00-8.6 15.05L2 22l5.05-1.32A10 10 0 1012 2z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
