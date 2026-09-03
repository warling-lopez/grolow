"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  DEFAULT_LOCALE,
  langFromPathname,
  switchLocale,
  type Lang,
} from "@/app/lib/i18n";

export type { Lang };

/** Español: es el mercado principal y el idioma del `x-default`. */
export const DEFAULT_LANG: Lang = DEFAULT_LOCALE;

/**
 * Idioma activo, derivado del prefijo de la URL (`/es/...`, `/en/...`).
 *
 * Antes se leía de `localStorage`, lo que obligaba al servidor a renderizar
 * siempre un idioma fijo: el HTML servido salía en inglés aunque las meta
 * tags fueran en español, y los rastreadores (Bing en particular) indexaban
 * esa versión. Al depender de la URL, el mismo valor se resuelve en servidor
 * y en cliente, y cada URL sirve un solo idioma coherente.
 */
export function useLang(): Lang {
  return langFromPathname(usePathname());
}

/**
 * Cambia de idioma navegando a la URL equivalente, en vez de sustituir texto
 * en el cliente. Cada idioma tiene su propia URL indexable.
 */
export function useLangSwitch(): (lang: Lang) => void {
  const router = useRouter();
  const pathname = usePathname();
  return (lang: Lang) => router.push(switchLocale(pathname ?? "/", lang));
}
