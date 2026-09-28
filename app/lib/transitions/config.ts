/**
 * Único sitio de configuración de las transiciones de marca.
 *
 * Tres fases comparten el mismo shader (ver `shader.ts`):
 *   1. Loader — el palo crece de abajo arriba mientras cargan fuentes y logo.
 *   2. Intro — la pantalla del loader se rompe y revela el hero (1 capa).
 *   3. Sección — transición por scroll entre secciones (2 capas).
 *
 * Para cambiar el look basta con tocar este archivo.
 */

/** Verde de marca (--color-grolow-brand). */
export const BRAND_GREEN = "#008f8b";
/** Verde brillante (--color-grolow-brand-bright): el que usan las capas. */
export const BRAND_GREEN_BRIGHT = "#06e0da";
/** Fondo negro de las secciones oscuras. */
export const SITE_BLACK = "#000000";

/**
 * Capa de color que va por delante del borde de la rotura.
 * - `lead`: cuánto se adelanta respecto al borde que revela (>1 = por delante).
 *   La capa con mayor `lead` es la que aparece primero.
 * - `seed`: semilla del ruido, para que cada capa tenga su propio borde.
 * - `edge`: anchura de la franja tramada del borde.
 *
 * El orden del array es el orden de pintado: la última queda encima.
 * Para invertir verde/negro, intercambia los `lead` (y el orden si quieres
 * que el negro quede por debajo).
 */
export type ColorLayer = {
  color: string;
  lead: number;
  seed: number;
  edge: number;
};

export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

/**
 * easeInOutCubic aplicado a cada pasada por separado: la intro son dos
 * pasadas (verde que cubre, verde que se rompe) y cada una arranca y frena
 * por su cuenta, en vez de ser un único acelerón.
 *
 * `split` es la fracción del TIEMPO que ocupa la primera pasada; la salida
 * siempre pone el cambio de pasada en 0.5 de progreso (ver `revealDelay`).
 */
export const easeTwoPasses = (split: number) => (t: number) =>
  t < split
    ? 0.5 * easeInOutCubic(t / split)
    : 0.5 + 0.5 * easeInOutCubic((t - split) / (1 - split));

/** Duraciones de las dos pasadas de la intro, en ms. */
const INTRO_COVER_MS = 1000; // el verde sube hasta cubrir la pantalla
const INTRO_REVEAL_MS = 500; // el verde se rompe y revela el hero

export const TRANSITION_CONFIG = {
  shader: {
    /** Intensidad del borde irregular (original 0.6). Más bajo = más recto. */
    edgeAmp: 0.45,
    /** Deformación del ruido (original 1.8). Más bajo = borde más tranquilo. */
    warp: 1.4,
    /** Anchura de la franja tramada del borde que revela la sección. */
    baseEdge: 0.08,
    /**
     * Estilo del borde: `false` = sólido (corte limpio de papel roto),
     * `true` = trama Bayer pixelada.
     */
    dither: false,
    /** Tamaño de cada punto de la trama (solo con `dither`), en px CSS × DPR. */
    dotSize: 2,
    /** DPR máximo del canvas. En pantallas táctiles se baja por rendimiento. */
    maxDpr: 2,
    maxDprCoarse: 1.5,
  },

  loader: {
    /**
     * Solo en la primera visita de la sesión. `false` = en cada carga.
     * En desarrollo sale siempre, para poder verlo al recargar. En cualquier
     * entorno, `?intro` en la URL lo fuerza.
     */
    oncePerSession: process.env.NODE_ENV === "production",
    storageKey: "grolow:intro-seen",
    /** Alto máximo del palo. En móvil manda `maxHeightVh`. */
    height: 300,
    maxHeightVh: 40,
    thickness: 4,
    color: "#ffffff",
    background: SITE_BLACK,
    /**
     * Duración del palo si la página ya cargó (y mínima si no, para que no
     * parpadee). Cuenta desde el inicio de la navegación. Si la página sigue
     * cargando, el palo espera hasta `maxWait`.
     */
    minDuration: 1000,
    /** Si algún recurso no llega en este tiempo, el palo completa igual. */
    maxWait: 4500,
    /** Pausa con el palo lleno antes de romper. */
    holdAtFull: 60,
  },

  /**
   * Dos pasadas, con una pantalla entera de distancia entre ellas:
   *   1. El verde se come la pantalla negra del loader hasta cubrirla entera.
   *   2. Ese verde se rompe y revela el hero (negro).
   * `revealDelay: 0.5` → el hero no empieza a verse hasta la mitad, y las
   * capas terminan justo ahí (`lead` 2.4 y 2.0; el brillante va un 20% por
   * delante del de marca).
   */
  intro: {
    // Las duraciones de cada pasada se tocan arriba: INTRO_COVER_MS e
    // INTRO_REVEAL_MS.
    duration: INTRO_COVER_MS + INTRO_REVEAL_MS,
    ease: easeTwoPasses(INTRO_COVER_MS / (INTRO_COVER_MS + INTRO_REVEAL_MS)),
    revealDelay: 0.5,
    layers: [
      { color: BRAND_GREEN_BRIGHT, lead: 2.4, seed: 3.1, edge: 0.1 },
      { color: BRAND_GREEN, lead: 2.0, seed: 7.4, edge: 0.09 },
    ] as ColorLayer[],
    /** Sin WebGL o con prefers-reduced-motion: fundido simple. */
    fadeDuration: 500,
  },

  section: {
    /** Recorrido de scroll de la transición, en altos de ventana. */
    length: 1,
    /** Captura previa cuando falta esta fracción de ventana para empezar. */
    captureAhead: 0.2,
    resizeDebounce: 250,
    /** z-index del canvas: por debajo del header (z-50). */
    zIndex: 40,
    // 20% de diferencia entre capas: brillante 1.4 → marca 1.2 → revela 1.0.
    layers: [
      { color: BRAND_GREEN_BRIGHT, lead: 1.4, seed: 3.1, edge: 0.1 },
      { color: BRAND_GREEN, lead: 1.2, seed: 7.4, edge: 0.09 },
    ] as ColorLayer[],
  },
} as const;
