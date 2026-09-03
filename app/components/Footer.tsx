"use client";

import Link from "next/link";
import { useLang } from "@/app/components/hooks/useLang";
import { pathFor, type Lang, type RouteId } from "@/app/lib/i18n";

/**
 * Pie del sitio.
 *
 * No existía ninguno: sin él las páginas legales quedarían huérfanas, sin
 * ninguna ruta desde la que un visitante — o un rastreador — pueda llegar.
 * También aporta el landmark `footer` que faltaba en la estructura semántica.
 */
const COLUMNS: { title: Record<Lang, string>; links: RouteId[] }[] = [
  {
    title: { es: "Servicios", en: "Services" },
    links: ["desarrolloWeb", "disenoWeb", "software", "tiendaWhatsapp", "apps"],
  },
  {
    title: { es: "Para quién", en: "Who for" },
    links: ["empresas", "consultores", "creadores"],
  },
  {
    title: { es: "Grolow", en: "Grolow" },
    links: ["precios", "casos", "blog", "contacto"],
  },
];

const LEGAL: RouteId[] = ["privacidad", "cookies", "terminos"];

const COPY = {
  es: {
    tagline:
      "Estudio de diseño y desarrollo web en Santo Domingo. Programamos en código propio, sin WordPress ni plantillas.",
    legal: "Legal",
    rights: "Todos los derechos reservados.",
  },
  en: {
    tagline:
      "Web design and development studio in Santo Domingo. We write custom code, no WordPress and no templates.",
    legal: "Legal",
    rights: "All rights reserved.",
  },
} as const;

/** Etiqueta corta de cada enlace del pie, por idioma. */
const LABEL: Record<string, Record<Lang, string>> = {
  desarrolloWeb: { es: "Desarrollo web a medida", en: "Custom web development" },
  disenoWeb: { es: "Diseño web Santo Domingo", en: "Web design Santo Domingo" },
  software: { es: "Software a medida", en: "Custom software" },
  tiendaWhatsapp: { es: "Tienda con WhatsApp", en: "WhatsApp store" },
  apps: { es: "Aplicaciones móviles", en: "Mobile apps" },
  empresas: { es: "Empresas", en: "Companies" },
  consultores: { es: "Consultoras", en: "Consultancies" },
  creadores: { es: "Creadores", en: "Creators" },
  precios: { es: "Precios", en: "Pricing" },
  casos: { es: "Casos de éxito", en: "Case studies" },
  blog: { es: "Blog", en: "Blog" },
  contacto: { es: "Contacto", en: "Contact" },
  privacidad: { es: "Política de privacidad", en: "Privacy policy" },
  cookies: { es: "Política de cookies", en: "Cookie policy" },
  terminos: { es: "Términos y condiciones", en: "Terms and conditions" },
};

export default function Footer() {
  const lang = useLang();
  const c = COPY[lang];
  const year = new Date().getFullYear();

  /** El blog solo existe en español; se enlaza a su versión real. */
  const hrefFor = (id: RouteId) => pathFor(id, lang) ?? pathFor(id, "es");

  return (
    <footer className="relative z-10 w-full border-t border-grolow-light/15 bg-grolow-dark">
      <div className="max-w-5xl mx-auto w-full px-4 md:px-8 py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p
              className="font-extrabold tracking-tight lowercase italic text-2xl text-grolow-light"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              grolow
            </p>
            <p className="mt-4 text-sm text-grolow-light/75 leading-relaxed">
              {c.tagline}
            </p>
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.title.es} aria-label={column.title[lang]}>
              <h2 className="text-[11px] font-mono uppercase tracking-widest text-grolow-cream mb-4">
                {column.title[lang]}
              </h2>
              <ul className="space-y-2.5">
                {column.links.map((id) => {
                  const href = hrefFor(id);
                  if (!href) return null;
                  return (
                    <li key={id}>
                      <Link
                        href={href}
                        className="text-sm text-grolow-light/80 hover:text-grolow-cream transition-colors">
                        {LABEL[id][lang]}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-grolow-light/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-xs text-grolow-light/70">
            © {year} Grolow. {c.rights}
          </p>
          <nav aria-label={c.legal}>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {LEGAL.map((id) => {
                const href = hrefFor(id);
                if (!href) return null;
                return (
                  <li key={id}>
                    <Link
                      href={href}
                      className="text-xs text-grolow-light/70 hover:text-grolow-cream transition-colors">
                      {LABEL[id][lang]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
