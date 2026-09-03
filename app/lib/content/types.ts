import type { Lang, RouteId } from "@/app/lib/i18n";

/**
 * Modelo de contenido de las páginas de servicio, segmento y utilidad.
 *
 * Las páginas se describen como datos y las renderiza una única plantilla.
 * Eso mantiene la jerarquía de encabezados correcta por construcción (un solo
 * `h1`, `h2` por sección, `h3` solo dentro de una sección) en vez de depender
 * de que cada página la respete a mano.
 */

export type Bullet = { title: string; text: string };

export type Section = {
  h2: string;
  body?: string[];
  bullets?: Bullet[];
  subsections?: { h3: string; body: string[] }[];
};

export type Faq = { q: string; a: string };

/** Enlace interno con anchor text descriptivo — nunca "ver más". */
export type RelatedLink = { to: RouteId; label: string };

export type Cta = {
  heading: string;
  text: string;
  label: string;
  /** Mensaje precargado de WhatsApp, contextual a esta página. */
  message: string;
};

export type PageContent = {
  eyebrow?: string;
  h1: string;
  /** Primer párrafo: debe contener la palabra clave principal. */
  lead: string[];
  sections: Section[];
  faq?: Faq[];
  related?: RelatedLink[];
  cta: Cta;
};

export type ContentTable = Partial<Record<Lang, PageContent>>;
