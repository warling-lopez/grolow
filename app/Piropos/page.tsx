'use client';

import { useMemo, useState } from 'react';
import { Playfair_Display, Jost } from 'next/font/google';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

/* ================================================================== */
/*  EDITAR AQUÍ · datos del negocio, catálogo y precios                */
/* ================================================================== */

/** WhatsApp de pedidos de PIROPOS: 829-556-5271.
 *  Solo dígitos con código de país (formato wa.me). */
const WHATSAPP_NUMBER = '18295565271';

const CONFIG = {
  nombre: 'PIROPOS · Casa de Perfumes',
  ubicacion: 'Santiago, República Dominicana',
  tagline: 'El perfume #1 de República Dominicana',
  instagram: { user: '@piroposdo', url: 'https://instagram.com/piroposdo' },
  distribuidores: { user: '@piropos.distribuidores', url: 'https://instagram.com/piropos.distribuidores' },
  /** Costo demo del envío al resto del país, en RD$. Entrega local en Santiago: gratis. */
  envioRestoPais: 300,
  /** Datos bancarios placeholder — editar con los reales. */
  banco: {
    nombre: 'Banco Demo',
    cuenta: '000-000000-0',
    titular: 'Piropos SRL',
  },
};

type Producto = {
  id: string;
  nombre: string;
  descripcion: string;
  notas: string; // notas olfativas ficticias, editar con las reales
  precio: number; // RD$, precio demo
  /** Colorway del frasco ilustrado: [líquido claro, líquido oscuro, brillo de fondo] */
  colorway: [string, string, string];
  /** Silueta del frasco: 0 clásico · 1 redondo · 2 esbelto */
  forma: 0 | 1 | 2;
};

/** EDITAR AQUÍ · catálogo demo (precios ficticios). */
const PRODUCTS: Producto[] = [
  {
    id: 'shadow-apex',
    nombre: 'Shadow Apex',
    descripcion: 'Extrait de Parfum · 100 ml · El best-seller',
    notas: 'Oud · Cuero · Ámbar negro',
    precio: 2500,
    colorway: ['#6E5B3A', '#171310', 'rgba(110,91,58,0.20)'],
    forma: 0,
  },
  {
    id: 'emerald-haven',
    nombre: 'Emerald Haven',
    descripcion: 'Extrait de Parfum · 100 ml · Fresco y elegante',
    notas: 'Vetiver · Bergamota · Musgo',
    precio: 2500,
    colorway: ['#3E7C5B', '#0D2A1D', 'rgba(62,124,91,0.18)'],
    forma: 1,
  },
  {
    id: 'demo-3',
    nombre: 'Producto Demo 3',
    descripcion: 'Extrait de Parfum · 100 ml',
    notas: 'Rosa · Azafrán · Vainilla',
    precio: 2500,
    colorway: ['#8E3B4A', '#2A0E15', 'rgba(142,59,74,0.16)'],
    forma: 2,
  },
  {
    id: 'demo-4',
    nombre: 'Producto Demo 4',
    descripcion: 'Extrait de Parfum · 100 ml',
    notas: 'Ámbar · Tabaco dulce · Sándalo',
    precio: 2500,
    colorway: ['#B07A2E', '#33200A', 'rgba(176,122,46,0.18)'],
    forma: 1,
  },
];

/* ================================================================== */
/*  Paleta clara — tinta sobre crema, como el logo                     */
/* ================================================================== */

const CREMA = '#F5F1E8'; // fondo general (crema/hueso del logo)
const TINTA = '#161511'; // texto principal / negro del logo
const ORO = '#C9A96A'; // dorado champagne (CTAs)
const ORO_TXT = '#8F7439'; // dorado oscurecido para texto pequeño sobre claro
// En las clases de Tailwind (valores literales): superficies #FCFAF5 ·
// bordes/divisores #E4DCC9 · texto secundario #7C7566

/* ================================================================== */
/*  Fuentes (convención del proyecto: next/font/google)                */
/* ================================================================== */

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});
const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jost',
  display: 'swap',
});

/* ================================================================== */
/*  CSS scopeado: niebla del hero, brillo del CTA y detalles           */
/* ================================================================== */

const STYLES = `
  .pp { background-color:${CREMA}; color:${TINTA}; font-family:var(--font-jost), sans-serif; overflow-x:hidden; min-height:100vh; }
  .pp ::selection { background:${TINTA}; color:${CREMA}; }
  .pp-serif { font-family:var(--font-playfair), serif; }

  /* Velo cálido muy tenue. background-image (no el shorthand) para no pisar el crema de .pp */
  .pp-veil {
    background-image:
      radial-gradient(1100px 500px at 50% -10%, rgba(201,169,106,0.14), transparent 65%),
      radial-gradient(800px 600px at 100% 110%, rgba(201,169,106,0.08), transparent 60%);
  }

  /* Niebla dorada detrás del frasco protagonista */
  .pp-smoke { position:absolute; border-radius:50%; filter:blur(46px); pointer-events:none; }
  .pp-smoke-1 { animation:pp-drift-1 13s ease-in-out infinite alternate; }
  .pp-smoke-2 { animation:pp-drift-2 17s ease-in-out infinite alternate; }
  .pp-smoke-3 { animation:pp-drift-3 21s ease-in-out infinite alternate; }
  @keyframes pp-drift-1 { from { transform:translate(-28%, 6%) scale(1); } to { transform:translate(22%, -14%) scale(1.25); } }
  @keyframes pp-drift-2 { from { transform:translate(24%, -6%) scale(1.15); } to { transform:translate(-18%, 10%) scale(0.9); } }
  @keyframes pp-drift-3 { from { transform:translate(0%, 12%) scale(0.95); } to { transform:translate(8%, -18%) scale(1.2); } }

  /* Brillo que recorre el botón dorado */
  .pp-shine { position:relative; overflow:hidden; }
  .pp-shine::after {
    content:''; position:absolute; inset:0;
    background:linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%);
    transform:translateX(-120%);
    animation:pp-shine 3.2s ease-in-out infinite;
  }
  @keyframes pp-shine { 0%,55% { transform:translateX(-120%); } 85%,100% { transform:translateX(120%); } }

  .pp-hairline { background:linear-gradient(90deg, transparent, rgba(143,116,57,0.55), transparent); height:1px; }

  /* iOS Safari hace zoom al enfocar campos con fuente <16px */
  .pp input, .pp textarea, .pp select { font-size: 16px; }

  input[type='file'].pp-file::file-selector-button {
    background:transparent; color:${TINTA}; border:1px solid ${TINTA};
    padding:.5rem 1rem; margin-right:1rem; cursor:pointer; font:inherit; letter-spacing:.08em;
  }

  @media (prefers-reduced-motion: reduce) {
    .pp-shine::after, .pp-smoke-1, .pp-smoke-2, .pp-smoke-3 { animation:none; }
  }
`;

/* ================================================================== */
/*  Helpers                                                            */
/* ================================================================== */

const money = (n: number) => `RD$ ${n.toLocaleString('en-US')}`;

/** Máscara (809) 000-0000 mientras se escribe. */
function maskPhone(value: string): string {
  const d = value.replace(/\D/g, '').slice(0, 10);
  if (d.length === 0) return '';
  if (d.length <= 3) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

/* ================================================================== */
/*  Piezas visuales                                                    */
/* ================================================================== */

/** Corona del logo de Piropos, recreada en SVG: tridente central,
 *  cuernos laterales con ojal y doble banda en la base. */
function Corona({ className = '', color = TINTA }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 64 48" className={className} aria-hidden fill={color}>
      {/* tridente central */}
      <path d="M32 2 L37.5 13 L34.1 11.2 L34.1 33 L29.9 33 L29.9 11.2 L26.5 13 Z" />
      {/* cuerno izquierdo (con ojal) */}
      <path
        fillRule="evenodd"
        d="M13.5 8 C20 10.5 24.5 17 25.6 25.5 L26.4 33 L19.8 33 C19.8 24 17.6 14.8 13.5 8 Z
           M21.3 21.2 a2.6 2.6 0 1 0 0.01 0 Z"
      />
      {/* cuerno derecho (con ojal) */}
      <path
        fillRule="evenodd"
        d="M50.5 8 C44 10.5 39.5 17 38.4 25.5 L37.6 33 L44.2 33 C44.2 24 46.4 14.8 50.5 8 Z
           M42.7 21.2 a2.6 2.6 0 1 0 0.01 0 Z"
      />
      {/* bandas de la base */}
      <path d="M17.5 36 L46.5 36 L45.4 39 L18.6 39 Z" />
      <path d="M19.2 41 L44.8 41 L43.8 43.6 L20.2 43.6 Z" />
    </svg>
  );
}

/** Destello cruzado bajo el wordmark (las «espadas» del logo). */
function Espadas({ className = '', color = TINTA }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 140 26" fill="none" className={className} aria-hidden>
      <path d="M6 7 C48 11, 92 16, 134 21" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M134 5 C92 10, 48 15, 6 19" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function Logo({ size = 'md', flourish = false }: { size?: 'sm' | 'md' | 'lg'; flourish?: boolean }) {
  const s = { sm: 'text-lg', md: 'text-2xl', lg: 'text-5xl sm:text-7xl' }[size];
  const c = { sm: 'w-6', md: 'w-8', lg: 'w-14 sm:w-20' }[size];
  const e = { sm: 'w-16', md: 'w-24', lg: 'w-40 sm:w-56' }[size];
  return (
    <span className="inline-flex flex-col items-center gap-1">
      <Corona className={c} />
      <span className={`pp-serif ${s} font-medium tracking-[0.28em]`} style={{ color: TINTA }}>
        PIROPOS
      </span>
      {flourish && <Espadas className={`${e} mt-1`} />}
    </span>
  );
}

/** Frasco dibujado en SVG — cero imágenes externas, un tinte por producto. */
function Frasco({ p, className = '' }: { p: Producto; className?: string }) {
  const [liqA, liqB] = p.colorway;
  const gid = `pp-liq-${p.id}`;
  const cid = `pp-cap-${p.id}`;

  const cuerpo = {
    0: { el: <rect x="27" y="54" width="66" height="106" rx="10" />, liq: <rect x="32" y="59" width="56" height="96" rx="8" /> },
    1: { el: <path d="M60 54 C88 54 100 78 100 110 C100 142 84 160 60 160 C36 160 20 142 20 110 C20 78 32 54 60 54 Z" />, liq: <path d="M60 60 C84 60 94 81 94 110 C94 138 80 154 60 154 C40 154 26 138 26 110 C26 81 36 60 60 60 Z" /> },
    2: { el: <rect x="38" y="52" width="44" height="108" rx="8" />, liq: <rect x="43" y="57" width="34" height="98" rx="6" /> },
  }[p.forma];

  return (
    <svg viewBox="0 0 120 170" className={className} aria-hidden>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={liqA} />
          <stop offset="100%" stopColor={liqB} />
        </linearGradient>
        <linearGradient id={cid} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8A6D3A" />
          <stop offset="45%" stopColor="#E7D3A0" />
          <stop offset="100%" stopColor="#9C7F43" />
        </linearGradient>
      </defs>

      {/* tapa y cuello */}
      <rect x="46" y="8" width="28" height="26" rx="4" fill={`url(#${cid})`} />
      <rect x="49" y="35" width="22" height="6" rx="1.5" fill="#4A4438" />
      <rect x="52" y="41" width="16" height="13" fill="rgba(0,0,0,0.08)" />

      {/* cristal */}
      <g fill="rgba(0,0,0,0.03)" stroke="rgba(22,21,17,0.28)" strokeWidth="1.5">
        {cuerpo.el}
      </g>
      {/* líquido */}
      <g fill={`url(#${gid})`} opacity="0.92">{cuerpo.liq}</g>
      {/* brillo del cristal */}
      <rect x={p.forma === 2 ? 45 : 34} y="64" width="6" height="80" rx="3" fill="rgba(255,255,255,0.45)" />

      {/* etiqueta con corona (tinta sobre crema, como el logo) */}
      <g>
        <rect x="40" y="96" width="40" height="30" rx="2" fill="#F5F1E8" stroke="rgba(22,21,17,0.5)" strokeWidth="1" />
        <path d="M55 103 L57.5 106.5 L60 102 L62.5 106.5 L65 103 L64.4 108 H55.6 Z" fill={TINTA} />
        <text
          x="60" y="118" textAnchor="middle" fill={TINTA} fontSize="6.4" letterSpacing="1.6"
          style={{ fontFamily: 'var(--font-playfair), serif' }}
        >
          PIROPOS
        </text>
        <text x="60" y="123.5" textAnchor="middle" fill="rgba(143,116,57,0.95)" fontSize="3.2" letterSpacing="1.1">
          EXTRAIT DE PARFUM
        </text>
      </g>
    </svg>
  );
}

function BotonOro({
  children, onClick, href, disabled = false, className = '', shine = false,
}: {
  children: React.ReactNode; onClick?: () => void; href?: string;
  disabled?: boolean; className?: string; shine?: boolean;
}) {
  const base =
    `inline-flex w-full items-center justify-center gap-2 px-8 py-4 text-sm font-semibold uppercase ` +
    `tracking-[0.22em] transition-all duration-300 ` +
    `${disabled
      ? 'cursor-not-allowed bg-[#DDD5C2] text-[#A29A88]'
      : `text-[#161511] shadow-[0_10px_30px_rgba(201,169,106,0.35)] hover:brightness-105 active:scale-[0.99] ${shine ? 'pp-shine' : ''}`
    } ${className}`;
  if (href && !disabled) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={base} style={{ backgroundColor: ORO }}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={base}
      style={disabled ? undefined : { backgroundColor: ORO }}>
      {children}
    </button>
  );
}

function BotonAtras({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button" onClick={onClick}
      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#7C7566] transition-colors hover:text-[#161511]"
    >
      <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10 3 L5 8 L10 13" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Atrás
    </button>
  );
}

const WA_PATH =
  'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z';

function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola PIROPOS 👋 Quisiera más información sobre sus perfumes.')}`}
      target="_blank" rel="noopener noreferrer" aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_8px_30px_rgba(37,211,102,0.4)] transition-transform hover:scale-110"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white"><path d={WA_PATH} /></svg>
    </a>
  );
}

/* ================================================================== */
/*  Tipos del flujo                                                    */
/* ================================================================== */

type Paso = 1 | 2 | 3 | 4 | 5;
type Zona = 'santiago' | 'pais';
type Cliente = { nombre: string; telefono: string; ciudad: string; direccion: string };
type Comprobante = { nombre: string; url: string; esPdf: boolean };

const PASOS: Record<Paso, string> = {
  1: 'Catálogo',
  2: 'Datos de envío',
  3: 'Pago',
  4: 'Comprobante',
  5: 'Confirmación',
};

/* ================================================================== */
/*  Página                                                             */
/* ================================================================== */

export default function PiroposPage() {
  const reduce = useReducedMotion();

  const [paso, setPaso] = useState<Paso>(1);
  const [carrito, setCarrito] = useState<Record<string, number>>({});
  const [zona, setZona] = useState<Zona>('santiago');
  const [cliente, setCliente] = useState<Cliente>({ nombre: '', telefono: '', ciudad: '', direccion: '' });
  const [comprobante, setComprobante] = useState<Comprobante | null>(null);
  const [intento, setIntento] = useState(false); // ya intentó avanzar (muestra errores)

  const items = useMemo(
    () =>
      Object.entries(carrito)
        .map(([id, qty]) => ({ producto: PRODUCTS.find((p) => p.id === id)!, qty }))
        .filter((i) => i.producto && i.qty > 0),
    [carrito],
  );
  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.producto.precio * i.qty, 0);
  const envio = zona === 'pais' ? CONFIG.envioRestoPais : 0;
  const total = subtotal + envio;

  const irA = (p: Paso) => {
    setIntento(false);
    setPaso(p);
    if (typeof window !== 'undefined') {
      if (window.lenis) window.lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    }
  };

  const agregar = (id: string) => setCarrito((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  const cambiarQty = (id: string, delta: number) =>
    setCarrito((c) => {
      const qty = (c[id] ?? 0) + delta;
      const next = { ...c };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });

  /* ---------- Validación del paso 2 ---------- */
  const telValido = cliente.telefono.replace(/\D/g, '').length === 10;
  const errores = {
    nombre: cliente.nombre.trim() === '' ? 'Escribe tu nombre completo' : '',
    telefono: !telValido ? 'Escribe un teléfono válido de 10 dígitos' : '',
    ciudad: cliente.ciudad.trim() === '' ? 'Escribe tu ciudad o sector' : '',
    direccion: cliente.direccion.trim() === '' ? 'Escribe la dirección de entrega' : '',
  };
  const datosOk = Object.values(errores).every((e) => e === '');

  const onFile = (file: File | undefined | null) => {
    if (comprobante) URL.revokeObjectURL(comprobante.url);
    if (!file) return setComprobante(null);
    setComprobante({
      nombre: file.name,
      url: URL.createObjectURL(file),
      esPdf: file.type === 'application/pdf',
    });
  };

  /* ---------- Mensaje de WhatsApp ----------
     NOTA TÉCNICA: los enlaces wa.me NO pueden adjuntar archivos. Por eso la
     pantalla final le pide al cliente adjuntar la foto del comprobante en el
     chat, y el mensaje lleva la línea «Comprobante: listo para adjuntar».
     En producción esto se resuelve con la API de WhatsApp Business
     (recepción del comprobante y confirmación automática) — es el upgrade
     natural de esta demo. */
  const waUrl = useMemo(() => {
    const entregaLinea =
      zona === 'pais'
        ? `Envío: ${cliente.ciudad.trim()} — ${cliente.direccion.trim()}`
        : `Entrega local (Santiago): ${cliente.ciudad.trim()} — ${cliente.direccion.trim()}`;
    const lineas = [
      'NUEVO PEDIDO — PIROPOS',
      '------------------------------',
      `Cliente: ${cliente.nombre.trim()} · Tel: ${cliente.telefono}`,
      entregaLinea,
      '',
      'PEDIDO:',
      ...items.map((i) => `· ${i.producto.nombre} x${i.qty} — ${money(i.producto.precio * i.qty)}`),
      `Envío: ${money(envio)}`,
      `TOTAL: ${money(total)}`,
      '',
      'Pago: Transferencia',
      comprobante ? 'Comprobante: listo para adjuntar' : 'Comprobante: lo envío en el chat',
    ];
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lineas.join('\n'))}`;
  }, [items, cliente, zona, envio, total, comprobante]);

  /* ---------- Animación entre pasos ---------- */
  const anim = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -16 },
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
      };

  const inputCls =
    'w-full border border-[#E4DCC9] bg-[#FCFAF5] px-4 py-3.5 text-base outline-none ' +
    'placeholder:text-[#B4AC99] transition-colors focus:border-[#161511]';
  const labelCls = 'mb-2 block text-[11px] uppercase tracking-[0.24em] text-[#7C7566]';
  const errCls = 'mt-1.5 block text-xs text-[#B3261E]';

  return (
    <div className={`${playfair.variable} ${jost.variable} pp pp-veil`}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Banner superior (tinta sobre crema invertido, como el logo) */}
      <div className="bg-[#161511] py-2 text-center text-[11px] uppercase tracking-[0.28em] text-[#F5F1E8]">
        {CONFIG.tagline} 🇩🇴 · Envíos a todo el país
      </div>

      {/* Barra de progreso (pasos 2-5) */}
      {paso > 1 && (
        <div className="sticky top-0 z-40 border-b border-[#E4DCC9] bg-[#F5F1E8]/95 backdrop-blur">
          <div className="mx-auto flex max-w-2xl items-center justify-between gap-4 px-5 py-3">
            <button type="button" onClick={() => irA(1)} aria-label="Volver al catálogo" className="shrink-0">
              <span className="pp-serif text-base tracking-[0.3em]">PIROPOS</span>
            </button>
            <span className="text-right text-[11px] uppercase leading-relaxed tracking-[0.2em] text-[#7C7566]">
              Paso {paso} de 5 <span className="hidden sm:inline">· {PASOS[paso]}</span>
            </span>
          </div>
          <div className="h-0.5 w-full bg-[#E7E0CF]">
            <motion.div
              className="h-full"
              style={{ backgroundColor: TINTA }}
              animate={{ width: `${(paso / 5) * 100}%` }}
              transition={reduce ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* ============================================================ */}
        {/* PASO 1 · CATÁLOGO                                            */}
        {/* ============================================================ */}
        {paso === 1 && (
          <motion.main key="catalogo" {...anim}>
            {/* Hero: corona + PIROPOS + frasco protagonista entre niebla */}
            <section className="relative overflow-hidden px-6 pb-20 pt-14 text-center sm:pt-20">
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
                className="relative z-10"
              >
                <Logo size="lg" flourish />
                <p className="mt-6 text-[12px] uppercase tracking-[0.4em] text-[#8F7439]">
                  {CONFIG.tagline}
                </p>
              </motion.div>

              {/* Frasco protagonista: Shadow Apex con niebla animada detrás */}
              <div className="relative mx-auto mt-10 h-72 w-full max-w-xs sm:h-80">
                <div className="pp-smoke pp-smoke-1 left-[8%] top-[16%] h-44 w-44" style={{ background: 'radial-gradient(circle, rgba(201,169,106,0.4), transparent 70%)' }} />
                <div className="pp-smoke pp-smoke-2 right-[4%] top-[36%] h-52 w-52" style={{ background: 'radial-gradient(circle, rgba(22,21,17,0.10), transparent 70%)' }} />
                <div className="pp-smoke pp-smoke-3 left-[26%] bottom-[2%] h-40 w-40" style={{ background: 'radial-gradient(circle, rgba(201,169,106,0.3), transparent 70%)' }} />
                <motion.div
                  className="relative z-10 flex h-full items-end justify-center"
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
                >
                  <Frasco p={PRODUCTS[0]} className="h-full drop-shadow-[0_30px_40px_rgba(22,21,17,0.25)]" />
                </motion.div>
              </div>

              <p className="relative z-10 mt-6 text-[13px] font-light text-[#7C7566]">
                Shadow Apex — el best-seller de la casa
              </p>
              <a
                href="#coleccion"
                className="relative z-10 mt-8 inline-block border border-[#161511] px-10 py-4 text-[11px] uppercase tracking-[0.3em] text-[#161511] transition-colors hover:bg-[#161511] hover:text-[#F5F1E8]"
              >
                Ver la colección
              </a>
            </section>

            {/* Catálogo */}
            <section id="coleccion" className="mx-auto max-w-6xl px-5 pb-24">
              <header className="mb-12 text-center">
                <p className="text-[11px] uppercase tracking-[0.34em] text-[#8F7439]">La Colección</p>
                <h2 className="pp-serif mt-3 text-3xl font-medium uppercase tracking-[0.12em] sm:text-4xl">
                  Extrait de Parfum
                </h2>
                <div className="pp-hairline mx-auto mt-5 w-40" />
              </header>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {PRODUCTS.map((p, i) => (
                  <motion.article
                    key={p.id}
                    className="group border border-[#E4DCC9] bg-[#FCFAF5] shadow-[0_2px_14px_rgba(22,21,17,0.04)] transition-all duration-300 hover:border-[#C9A96A] hover:shadow-[0_18px_40px_rgba(22,21,17,0.10)]"
                    initial={reduce ? false : { opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.55, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
                  >
                    <div
                      className="relative flex aspect-4/5 items-center justify-center overflow-hidden"
                      style={{ background: `radial-gradient(closest-side at 50% 62%, ${p.colorway[2]}, transparent 75%)` }}
                    >
                      <Frasco
                        p={p}
                        className="h-[78%] transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:drop-shadow-[0_24px_30px_rgba(22,21,17,0.22)]"
                      />
                    </div>
                    <div className="border-t border-[#E4DCC9] p-5">
                      <h3 className="pp-serif text-xl">{p.nombre}</h3>
                      <p className="mt-1 text-[12px] font-light text-[#7C7566]">{p.descripcion}</p>
                      <p className="mt-1 text-[12px] text-[#8F7439]">{p.notas}</p>
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <span className="text-lg font-medium">{money(p.precio)}</span>
                        {carrito[p.id] ? (
                          <div className="flex items-center gap-3 border border-[#161511] px-3 py-2">
                            <button type="button" onClick={() => cambiarQty(p.id, -1)} className="px-1" aria-label={`Quitar un ${p.nombre}`}>−</button>
                            <span className="min-w-4 text-center text-sm">{carrito[p.id]}</span>
                            <button type="button" onClick={() => cambiarQty(p.id, +1)} className="px-1" aria-label={`Agregar un ${p.nombre}`}>+</button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => agregar(p.id)}
                            className="border border-[#161511] px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-[#161511] transition-colors hover:bg-[#161511] hover:text-[#F5F1E8]"
                          >
                            Agregar
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>

            {/* Franja de confianza: los 4 pilares */}
            <section className="border-y border-[#E4DCC9] bg-[#FCFAF5] py-14">
              <div className="mx-auto grid max-w-5xl grid-cols-2 gap-10 px-6 text-center lg:grid-cols-4">
                {[
                  {
                    t: 'Garantía',
                    d: 'Fórmulas propias de la casa, selladas y verificadas.',
                    icon: <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6zM9 12l2 2 4-4.5" />,
                  },
                  {
                    t: 'Envíos a todo el país',
                    d: 'Despachamos desde Santiago a las 32 provincias.',
                    icon: <path d="M3 7h11v8H3zM14 10h4l3 3v2h-7zM7 18a1.8 1.8 0 100-.01M18 18a1.8 1.8 0 100-.01" />,
                  },
                  {
                    t: 'Depósito seguro',
                    d: 'Pagas por transferencia bancaria, sin intermediarios.',
                    icon: <path d="M3 9l9-5 9 5M5 9v9M9.5 9v9M14.5 9v9M19 9v9M3 18h18M3 21h18" />,
                  },
                  {
                    t: '+11K seguidores',
                    d: `Comunidad verificada en Instagram ${CONFIG.instagram.user}.`,
                    icon: <path d="M8 21v-2a4 4 0 014-4 4 4 0 014 4v2M12 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM4 21v-1.5A3.5 3.5 0 017.5 16M20 21v-1.5a3.5 3.5 0 00-3.5-3.5" />,
                  },
                ].map((f) => (
                  <div key={f.t}>
                    <svg viewBox="0 0 24 24" className="mx-auto h-8 w-8" fill="none" stroke={ORO_TXT} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      {f.icon}
                    </svg>
                    <h3 className="pp-serif mt-4 text-base sm:text-lg">{f.t}</h3>
                    <p className="mt-2 text-[12px] font-light leading-relaxed text-[#7C7566] sm:text-[13px]">{f.d}</p>
                  </div>
                ))}
              </div>
            </section>

            <FooterPiropos />

            {/* Carrito: barra fija inferior (mobile-first) */}
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.div
                  className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4"
                  initial={reduce ? false : { y: 90, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 90, opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <button
                    type="button"
                    onClick={() => irA(2)}
                    className="pp-shine mx-auto flex w-full max-w-md items-center justify-between px-6 py-4 text-[#F5F1E8] shadow-[0_14px_40px_rgba(22,21,17,0.35)]"
                    style={{ backgroundColor: TINTA }}
                  >
                    <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em]">
                      Continuar ·
                      {/* micro-animación del contador al agregar */}
                      <motion.span
                        key={totalItems}
                        initial={reduce ? false : { scale: 1.6 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                        className="inline-block"
                      >
                        {totalItems}
                      </motion.span>
                      {totalItems === 1 ? 'perfume' : 'perfumes'}
                    </span>
                    <span className="text-sm font-bold text-[#C9A96A]">{money(subtotal)} →</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.main>
        )}

        {/* ============================================================ */}
        {/* PASO 2 · DATOS DE ENVÍO                                      */}
        {/* ============================================================ */}
        {paso === 2 && (
          <motion.main key="envio" {...anim} className="mx-auto max-w-2xl px-5 pb-28 pt-10">
            <BotonAtras onClick={() => irA(1)} />
            <h1 className="pp-serif mt-4 text-3xl">Datos de envío</h1>

            {items.length === 0 ? (
              <div className="mt-14 text-center">
                <p className="font-light text-[#7C7566]">Tu carrito está vacío por ahora.</p>
                <div className="mt-8">
                  <BotonOro onClick={() => irA(1)} className="max-w-xs">Ver la colección</BotonOro>
                </div>
              </div>
            ) : (
              <>
                {/* Resumen del pedido con cantidades ajustables */}
                <ul className="mt-8 divide-y divide-[#E4DCC9] border-y border-[#E4DCC9]">
                  {items.map(({ producto: p, qty }) => (
                    <li key={p.id} className="flex items-center gap-4 py-4">
                      <div
                        className="flex h-16 w-13 shrink-0 items-center justify-center"
                        style={{ background: `radial-gradient(closest-side, ${p.colorway[2]}, transparent 80%)` }}
                      >
                        <Frasco p={p} className="h-14" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="pp-serif truncate text-base">{p.nombre}</h3>
                        <p className="text-sm text-[#8F7439]">{money(p.precio)}</p>
                      </div>
                      <div className="flex items-center gap-3 border border-[#161511]/25 px-3 py-1.5">
                        <button type="button" onClick={() => cambiarQty(p.id, -1)} className="px-1" aria-label={`Quitar un ${p.nombre}`}>−</button>
                        <span className="min-w-4 text-center text-sm">{qty}</span>
                        <button type="button" onClick={() => cambiarQty(p.id, +1)} className="px-1" aria-label={`Agregar un ${p.nombre}`}>+</button>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Zona de entrega */}
                <h2 className="mt-8 text-[11px] uppercase tracking-[0.24em] text-[#7C7566]">Zona de entrega</h2>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {(
                    [
                      { id: 'santiago', t: 'Santiago', d: 'Entrega local', precio: 'Gratis' },
                      { id: 'pais', t: 'Resto del país', d: 'Envío nacional 24-72h', precio: money(CONFIG.envioRestoPais) },
                    ] as const
                  ).map((op) => (
                    <button
                      key={op.id}
                      type="button"
                      onClick={() => setZona(op.id)}
                      aria-pressed={zona === op.id}
                      className={`border p-4 text-left transition-colors ${
                        zona === op.id
                          ? 'border-[#161511] bg-[#FCFAF5] shadow-[0_6px_20px_rgba(22,21,17,0.08)]'
                          : 'border-[#E4DCC9] hover:border-[#B4AC99]'
                      }`}
                    >
                      <span className="flex items-center justify-between text-sm font-medium">
                        {op.t}
                        <span className={zona === op.id ? 'text-[#8F7439]' : 'text-[#7C7566]'}>{op.precio}</span>
                      </span>
                      <span className="mt-1 block text-xs font-light text-[#7C7566]">{op.d}</span>
                    </button>
                  ))}
                </div>

                {/* Formulario */}
                <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()} noValidate>
                  <div>
                    <label htmlFor="pp-nombre" className={labelCls}>Nombre completo *</label>
                    <input
                      id="pp-nombre" type="text" autoComplete="name" placeholder="Ej. Juan Peralta"
                      className={inputCls} value={cliente.nombre}
                      onChange={(e) => setCliente((c) => ({ ...c, nombre: e.target.value }))}
                    />
                    {intento && errores.nombre && <span className={errCls}>{errores.nombre}</span>}
                  </div>
                  <div>
                    <label htmlFor="pp-tel" className={labelCls}>Teléfono / WhatsApp *</label>
                    <input
                      id="pp-tel" type="tel" inputMode="tel" autoComplete="tel-national"
                      placeholder="(809) 000-0000" className={inputCls} value={cliente.telefono}
                      onChange={(e) => setCliente((c) => ({ ...c, telefono: maskPhone(e.target.value) }))}
                    />
                    {intento && errores.telefono && <span className={errCls}>{errores.telefono}</span>}
                  </div>
                  <div>
                    <label htmlFor="pp-ciudad" className={labelCls}>Ciudad / sector *</label>
                    <input
                      id="pp-ciudad" type="text" placeholder={zona === 'santiago' ? 'Ej. Gurabo' : 'Ej. Piantini, Santo Domingo'}
                      className={inputCls} value={cliente.ciudad}
                      onChange={(e) => setCliente((c) => ({ ...c, ciudad: e.target.value }))}
                    />
                    {intento && errores.ciudad && <span className={errCls}>{errores.ciudad}</span>}
                  </div>
                  <div>
                    <label htmlFor="pp-direccion" className={labelCls}>Dirección *</label>
                    <textarea
                      id="pp-direccion" rows={3} placeholder="Calle, número, referencia…"
                      className={`${inputCls} resize-none`} value={cliente.direccion}
                      onChange={(e) => setCliente((c) => ({ ...c, direccion: e.target.value }))}
                    />
                    {intento && errores.direccion && <span className={errCls}>{errores.direccion}</span>}
                  </div>

                  {/* Total en vivo */}
                  <dl className="space-y-2 border-t border-[#E4DCC9] pt-5 text-[15px]">
                    <div className="flex justify-between font-light text-[#7C7566]">
                      <dt>Subtotal</dt><dd>{money(subtotal)}</dd>
                    </div>
                    <div className="flex justify-between font-light text-[#7C7566]">
                      <dt>Envío</dt><dd>{envio > 0 ? money(envio) : 'Gratis'}</dd>
                    </div>
                    <div className="flex items-baseline justify-between border-t border-[#C9A96A]/50 pt-4">
                      <dt className="text-[11px] uppercase tracking-[0.24em] text-[#7C7566]">Total</dt>
                      <dd className="pp-serif text-3xl">{money(total)}</dd>
                    </div>
                  </dl>

                  <BotonOro
                    onClick={() => {
                      if (datosOk) irA(3);
                      else setIntento(true);
                    }}
                    shine
                  >
                    Continuar al pago →
                  </BotonOro>
                </form>
              </>
            )}
          </motion.main>
        )}

        {/* ============================================================ */}
        {/* PASO 3 · PAGO                                                */}
        {/* ============================================================ */}
        {paso === 3 && (
          <motion.main key="pago" {...anim} className="mx-auto max-w-2xl px-5 pb-28 pt-10">
            <BotonAtras onClick={() => irA(2)} />
            <h1 className="pp-serif mt-4 text-3xl">Pago</h1>
            <p className="mt-2 text-sm font-light text-[#7C7566]">
              Transfiere el monto exacto y continúa para cargar tu comprobante.
            </p>

            {/* Datos para transferencia */}
            <div className="mt-8 border border-[#C9A96A] bg-[#FCFAF5] p-6 shadow-[0_10px_30px_rgba(22,21,17,0.06)]">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#8F7439]">Datos para transferencia</p>
              <dl className="mt-4 space-y-2.5 text-[15px]">
                <div className="flex justify-between gap-4"><dt className="font-light text-[#7C7566]">Banco</dt><dd>{CONFIG.banco.nombre}</dd></div>
                <div className="flex justify-between gap-4"><dt className="font-light text-[#7C7566]">Cuenta</dt><dd className="tracking-wider">{CONFIG.banco.cuenta}</dd></div>
                <div className="flex justify-between gap-4"><dt className="font-light text-[#7C7566]">A nombre de</dt><dd>{CONFIG.banco.titular}</dd></div>
              </dl>
              <div className="pp-hairline my-5" />
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] uppercase tracking-[0.24em] text-[#7C7566]">Monto exacto</span>
                <span className="pp-serif text-3xl">{money(total)}</span>
              </div>
            </div>

            <p className="mt-6 text-xs font-light leading-relaxed text-[#7C7566]">
              Tu pedido queda reservado al confirmar la transferencia. Si tienes dudas,
              escríbenos directo por WhatsApp con el botón verde.
            </p>

            <div className="mt-8">
              <BotonOro onClick={() => irA(4)} shine>Ya realicé la transferencia →</BotonOro>
            </div>
          </motion.main>
        )}

        {/* ============================================================ */}
        {/* PASO 4 · COMPROBANTE                                         */}
        {/* ============================================================ */}
        {paso === 4 && (
          <motion.main key="comprobante" {...anim} className="mx-auto max-w-2xl px-5 pb-28 pt-10">
            <BotonAtras onClick={() => irA(3)} />
            <h1 className="pp-serif mt-4 text-3xl">Comprobante</h1>
            <p className="mt-2 text-sm font-light text-[#7C7566]">
              Carga la foto o PDF de tu transferencia para dejar tu orden lista.
            </p>

            <div className="mt-8">
              <label htmlFor="pp-comprobante" className={labelCls}>Comprobante de transferencia (imagen o PDF)</label>
              <input
                id="pp-comprobante" type="file" accept="image/*,.pdf"
                className="pp-file w-full cursor-pointer border border-dashed border-[#B4AC99] bg-[#FCFAF5] px-4 py-4 text-sm text-[#7C7566]"
                onChange={(e) => onFile(e.target.files?.[0])}
              />

              {comprobante && (
                <div className="mt-4 flex items-center gap-4 border border-[#E4DCC9] bg-[#FCFAF5] p-4 shadow-[0_6px_18px_rgba(22,21,17,0.05)]">
                  {comprobante.esPdf ? (
                    <div className="flex h-16 w-14 shrink-0 items-center justify-center border border-[#8F7439]/50 text-[10px] font-semibold tracking-widest text-[#8F7439]">
                      PDF
                    </div>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element -- preview local de un blob, no pasa por el optimizador
                    <img src={comprobante.url} alt="Vista previa del comprobante" className="h-16 w-14 shrink-0 border border-[#E4DCC9] object-cover" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{comprobante.nombre}</p>
                    {/* check verde «Comprobante cargado» */}
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-[#15803D]">
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="8" cy="8" r="6.5" strokeWidth="1.2" />
                        <path d="M5.5 8.2 L7.2 10 L10.5 6.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Comprobante cargado
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onFile(null)}
                    className="text-xs uppercase tracking-[0.15em] text-[#B3261E] hover:underline"
                  >
                    Quitar
                  </button>
                </div>
              )}

              <p className="mt-4 text-xs font-light leading-relaxed text-[#7C7566]">
                El comprobante <strong className="font-medium" style={{ color: TINTA }}>no se envía automáticamente</strong>:
                al final abrirás WhatsApp con tu orden y ahí mismo adjuntas la foto en el chat.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <BotonOro onClick={() => irA(5)} disabled={!comprobante} shine>
                Continuar →
              </BotonOro>
              {!comprobante && (
                <button
                  type="button"
                  onClick={() => irA(5)}
                  className="block w-full text-center text-xs font-light text-[#7C7566] underline-offset-4 hover:text-[#161511] hover:underline"
                >
                  Prefiero adjuntarlo directamente en WhatsApp
                </button>
              )}
            </div>
          </motion.main>
        )}

        {/* ============================================================ */}
        {/* PASO 5 · CONFIRMACIÓN + WHATSAPP                             */}
        {/* ============================================================ */}
        {paso === 5 && (
          <motion.main key="confirmacion" {...anim} className="mx-auto max-w-2xl px-5 pb-28 pt-10">
            <BotonAtras onClick={() => irA(4)} />
            <div className="mt-4 text-center">
              <Corona className="mx-auto w-12" />
              <h1 className="pp-serif mt-3 text-3xl">Tu pedido está listo</h1>
              <p className="mt-2 text-sm font-light text-[#7C7566]">
                Revisa el recibo y envíalo por WhatsApp. Te confirmamos enseguida.
              </p>
            </div>

            {/* Recibo elegante */}
            <div className="mt-8 border border-[#E4DCC9] bg-[#FCFAF5] shadow-[0_14px_40px_rgba(22,21,17,0.07)]">
              <div className="p-6">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#8F7439]">Pedido</p>
                <ul className="mt-3 space-y-2 text-[15px]">
                  {items.map(({ producto: p, qty }) => (
                    <li key={p.id} className="flex justify-between gap-4">
                      <span className="font-light">{p.nombre} <span className="text-[#7C7566]">×{qty}</span></span>
                      <span>{money(p.precio * qty)}</span>
                    </li>
                  ))}
                  <li className="flex justify-between gap-4 font-light text-[#7C7566]">
                    <span>Envío</span><span>{envio > 0 ? money(envio) : 'Gratis'}</span>
                  </li>
                </ul>
                <div className="mt-4 flex items-baseline justify-between border-t border-[#C9A96A]/50 pt-4">
                  <span className="text-[11px] uppercase tracking-[0.24em] text-[#7C7566]">Total</span>
                  <span className="pp-serif text-3xl">{money(total)}</span>
                </div>
              </div>

              <div className="border-t border-[#E4DCC9] p-6">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#8F7439]">Entrega</p>
                <dl className="mt-3 space-y-2 text-[15px]">
                  <div className="flex justify-between gap-4"><dt className="font-light text-[#7C7566]">Cliente</dt><dd className="text-right">{cliente.nombre}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="font-light text-[#7C7566]">Teléfono</dt><dd>{cliente.telefono}</dd></div>
                  <div className="flex justify-between gap-4">
                    <dt className="font-light text-[#7C7566]">Zona</dt>
                    <dd className="text-right">{zona === 'pais' ? 'Resto del país (envío)' : 'Santiago (entrega local)'}</dd>
                  </div>
                  <div className="flex justify-between gap-4"><dt className="font-light text-[#7C7566]">Dirección</dt><dd className="max-w-[60%] text-right">{cliente.ciudad} — {cliente.direccion}</dd></div>
                  <div className="flex justify-between gap-4">
                    <dt className="font-light text-[#7C7566]">Pago</dt>
                    <dd>Transferencia</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="font-light text-[#7C7566]">Comprobante</dt>
                    <dd className={comprobante ? 'text-[#15803D]' : 'text-[#7C7566]'}>
                      {comprobante ? 'Cargado ✓' : 'Se adjunta en el chat'}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="mt-8">
              <BotonOro href={waUrl} shine>
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d={WA_PATH} /></svg>
                Enviar mi pedido por WhatsApp
              </BotonOro>
              <p className="mt-4 text-center text-xs font-light leading-relaxed text-[#7C7566]">
                Al abrir WhatsApp, <strong className="font-medium" style={{ color: TINTA }}>adjunta la foto de tu comprobante</strong> en el chat antes de enviar.
              </p>
              <p className="mt-2 text-center text-[11px] font-light leading-relaxed text-[#B4AC99]">
                * En la versión de producción, el comprobante se recibe y valida automático vía API de WhatsApp Business.
              </p>
            </div>
          </motion.main>
        )}
      </AnimatePresence>

      {paso > 1 && <FooterPiropos />}
      <WhatsAppFloat />
    </div>
  );
}

/* ================================================================== */
/*  Footer (invertido: crema sobre tinta, como el sello de la marca)   */
/* ================================================================== */

function FooterPiropos() {
  return (
    <footer className="bg-[#161511] px-6 py-12 text-center">
      <span className="inline-flex flex-col items-center gap-1">
        <Corona className="w-6" color={CREMA} />
        <span className="pp-serif text-lg tracking-[0.28em]" style={{ color: CREMA }}>PIROPOS</span>
        <Espadas className="mt-1 w-20" color={ORO} />
      </span>
      <p className="mt-4 text-[11px] uppercase tracking-[0.28em] text-[#B4AC99]">
        Casa de Perfumes · {CONFIG.ubicacion}
      </p>
      <p className="mt-4 space-x-4 text-[12px] font-light">
        <a href={CONFIG.instagram.url} target="_blank" rel="noopener noreferrer" className="text-[#B4AC99] underline-offset-4 transition-colors hover:text-[#C9A96A] hover:underline">
          {CONFIG.instagram.user}
        </a>
        <a href={CONFIG.distribuidores.url} target="_blank" rel="noopener noreferrer" className="text-[#B4AC99] underline-offset-4 transition-colors hover:text-[#C9A96A] hover:underline">
          {CONFIG.distribuidores.user}
        </a>
      </p>
      <p className="mt-6 text-[11px] font-light text-[#7C7566]">
        Desarrollado por{' '}
        <a href="https://grolow.com" target="_blank" rel="noopener noreferrer" className="text-[#B4AC99] underline-offset-4 transition-colors hover:text-[#C9A96A] hover:underline">
          Grolow Studio · grolow.com
        </a>
      </p>
    </footer>
  );
}
