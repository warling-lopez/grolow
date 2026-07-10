/* Hero estático de Visual Lab.
   Se usa en dos situaciones:
   1. Como `loading` del import dinámico del hero 3D (mientras baja three.js).
   2. Como fallback definitivo si WebGL no está disponible o falla la fuente.
   Simula el relieve del letrero corpóreo con text-shadow y la línea dorada
   de acento. NUNCA deja pantalla negra vacía. */

const GOLD = "#C9A227";

/* Subtítulo + CTA que se superponen al hero (3D o estático). */
export function HeroOverlay() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-4 pb-10 sm:pb-14">
      <p className="px-6 text-center text-sm text-white/70 sm:text-base">
        Cotiza tu proyecto en 2 minutos
      </p>
      {/* El ancla usa el scroll suave global (Lenis) hacia el cotizador */}
      <a
        href="#cotizador"
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full px-8 py-4 text-xs font-bold uppercase tracking-widest text-black transition-transform hover:scale-105 sm:text-sm"
        style={{ background: GOLD }}>
        Comenzar cotización
        <span aria-hidden>↓</span>
      </a>
    </div>
  );
}

export default function HeroFallback() {
  return (
    <section className="relative flex h-[70vh] items-center justify-center overflow-hidden bg-[#0A0A0A] md:h-screen">
      {/* Grid blueprint sutil (clase definida en los estilos de la página) */}
      <div className="vl-grid absolute inset-0 opacity-60" aria-hidden />

      <div className="relative -mt-10 text-center">
        <h1
          className="leading-[0.9] tracking-tight"
          style={{ fontFamily: "var(--font-anton), sans-serif" }}>
          <span
            className="block text-6xl text-white sm:text-8xl md:text-9xl"
            style={{
              /* Relieve: sombra dura desplazada, como letra corpórea */
              textShadow:
                "3px 4px 0 rgba(0,0,0,.9), 6px 8px 24px rgba(0,0,0,.8)",
            }}>
            VISUAL
          </span>
          <span
            className="mt-2 block text-3xl sm:text-5xl md:text-6xl"
            style={{
              color: "#1A1A1A",
              WebkitTextStroke: "1px rgba(255,255,255,.35)",
              textShadow: "2px 3px 0 rgba(0,0,0,.9)",
            }}>
            LAB
          </span>
        </h1>
        {/* Línea dorada de acento */}
        <span
          aria-hidden
          className="mx-auto mt-6 block h-1 w-24 rounded-full"
          style={{ background: GOLD, boxShadow: `0 0 18px ${GOLD}66` }}
        />
      </div>

      <HeroOverlay />
    </section>
  );
}
