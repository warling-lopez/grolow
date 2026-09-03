/**
 * Eventos de analítica, sin atarse a un proveedor.
 *
 * El objetivo de negocio es saber **qué página de segmento convierte**: cuando
 * alguien escribe por WhatsApp, desde dónde salió. Sin eso no hay forma de
 * decidir qué páginas ampliar y cuáles reescribir.
 *
 * El evento se envía a la herramienta que esté presente en la página. Hoy eso
 * es Google Analytics, que ya estaba instalado. Cuando se conecte una
 * alternativa respetuosa de privacidad (Plausible o Umami), empieza a
 * recibirlo sola: basta con añadir su script, sin tocar este fichero ni los
 * componentes que lo llaman.
 */

type GtagFn = (
  command: "event",
  action: string,
  params: Record<string, string>,
) => void;

type PlausibleFn = (
  event: string,
  options?: { props?: Record<string, string> },
) => void;

type UmamiApi = { track: (event: string, data?: Record<string, string>) => void };

declare global {
  interface Window {
    gtag?: GtagFn;
    plausible?: PlausibleFn;
    umami?: UmamiApi;
  }
}

/** Nombre del evento, igual en las tres herramientas para poder compararlas. */
const WHATSAPP_EVENT = "whatsapp_click";

/**
 * Registra un clic hacia WhatsApp.
 *
 * `source` identifica la página de origen (la ruta, p. ej. `/es/precios`) y
 * `placement` dónde estaba el botón, para distinguir el botón flotante del
 * CTA del final de la página.
 */
export function trackWhatsAppClick(source: string, placement: string): void {
  if (typeof window === "undefined") return;

  const props = { source, placement };

  try {
    window.gtag?.("event", WHATSAPP_EVENT, props);
    window.plausible?.(WHATSAPP_EVENT, { props });
    window.umami?.track(WHATSAPP_EVENT, props);
  } catch {
    // La analítica nunca debe impedir que el enlace funcione: si el script
    // está bloqueado por una extensión, el clic sigue su curso.
  }
}
