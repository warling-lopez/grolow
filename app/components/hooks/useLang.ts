"use client";

import { useSyncExternalStore } from "react";

/** Inglés es el idioma por defecto; español queda como opción del toggle. */
export type Lang = "en" | "es";

export const DEFAULT_LANG: Lang = "en";

const LANG_STORAGE_KEY = "grolow-lang";
const LANG_EVENT = "grolow:langchange";

function readLang(): Lang {
  const saved = localStorage.getItem(LANG_STORAGE_KEY);
  return saved === "en" || saved === "es" ? saved : DEFAULT_LANG;
}

function subscribeLang(onChange: () => void) {
  window.addEventListener(LANG_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(LANG_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function writeLang(lang: Lang) {
  localStorage.setItem(LANG_STORAGE_KEY, lang);
  window.dispatchEvent(new Event(LANG_EVENT));
}

/**
 * Idioma activo, leído de localStorage y sincronizado entre pestañas y con
 * el toggle del header. El servidor y la hidratación siempre rinden
 * DEFAULT_LANG; la preferencia guardada se aplica en cuanto está disponible.
 */
export function useLang(): Lang {
  return useSyncExternalStore(subscribeLang, readLang, () => DEFAULT_LANG);
}
