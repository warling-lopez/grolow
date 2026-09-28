/**
 * Aviso de «la intro terminó», para lanzar la animación de entrada del hero.
 *
 * Se dispara también cuando la intro no se reproduce (ya vista en la sesión,
 * navegación en cliente), así que quien escuche siempre recibe su señal.
 */

export const INTRO_DONE_EVENT = "grolow:intro-done";

declare global {
  interface Window {
    __grolowIntroDone?: boolean;
    /** Lo pone el script inline de IntroLoader si la intro debe reproducirse. */
    __grolowIntroPlay?: boolean;
  }
}

export function announceIntroDone() {
  window.__grolowIntroDone = true;
  window.dispatchEvent(new Event(INTRO_DONE_EVENT));
}

/** Llama a `cb` cuando termine la intro (o ya, si terminó). Devuelve la baja. */
export function onIntroDone(cb: () => void) {
  if (window.__grolowIntroDone) {
    cb();
    return () => {};
  }
  window.addEventListener(INTRO_DONE_EVENT, cb, { once: true });
  return () => window.removeEventListener(INTRO_DONE_EVENT, cb);
}
