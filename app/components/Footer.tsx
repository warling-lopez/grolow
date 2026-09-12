"use client";

import Link from "next/link";
import Brand from "@/app/components/Brand";
import { useLang } from "@/app/components/hooks/useLang";
import { pathFor, type Lang, type RouteId } from "@/app/lib/i18n";

/**
 * Pie del sitio.
 *
 * Patrón de cierre: wordmark gigante a sangre recortado por el borde, sobre
 * fondo oscuro, y debajo las columnas. Es el único bloque oscuro del sitio, y
 * ese contraste es justamente lo que lo convierte en un final y no en «una
 * sección más».
 *
 * Sobre el color: el acento aquí es `--color-grolow-brand` (#008F8B), que da
 * 4.95:1 sobre el fondo del pie y pasa AA de sobra. Ese mismo color sobre el
 * crema del resto del sitio se queda en 3.96:1 y no pasaría, por eso fuera de
 * aquí el acento sigue siendo `--color-grolow-cream` (#004643).
 */

const MENU: RouteId[] = [
  "desarrolloWeb",
  "disenoWeb",
  "software",
  "tiendaWhatsapp",
  "apps",
  "casos",
  "precios",
  "blog",
];

const LEGAL: RouteId[] = ["privacidad", "cookies", "terminos"];

const WHATSAPP = "18299946354";
const EMAIL = "grolow.web@gmail.com";

const COPY = {
  es: {
    tagline: "Construimos el software con el que un negocio opera.",
    accent: "Agenda un diagnóstico — salimos con un documento, no con una intuición.",
    menu: "Menú",
    legal: "Legal",
    contact: "Contacto",
    place: "Santo Domingo · República Dominicana",
    phoneNote: "WhatsApp",
    rights: "Todos los derechos reservados.",
    social: "Redes sociales",
  },
  en: {
    tagline: "We build the software a business runs on.",
    accent: "Book a diagnosis — we leave with a document, not a hunch.",
    menu: "Menu",
    legal: "Legal",
    contact: "Contact",
    place: "Santo Domingo · Dominican Republic",
    phoneNote: "WhatsApp",
    rights: "All rights reserved.",
    social: "Social media",
  },
} as const;

const LABEL: Record<string, Record<Lang, string>> = {
  desarrolloWeb: { es: "Desarrollo web a medida", en: "Custom web development" },
  disenoWeb: { es: "Diseño web Santo Domingo", en: "Web design Santo Domingo" },
  software: { es: "Software a medida", en: "Custom software" },
  tiendaWhatsapp: { es: "Tienda con WhatsApp", en: "WhatsApp store" },
  apps: { es: "Aplicaciones móviles", en: "Mobile apps" },
  precios: { es: "Precios", en: "Pricing" },
  casos: { es: "Casos de éxito", en: "Case studies" },
  blog: { es: "Blog", en: "Blog" },
  contacto: { es: "Contacto", en: "Contact" },
  privacidad: { es: "Política de privacidad", en: "Privacy policy" },
  cookies: { es: "Política de cookies", en: "Cookie policy" },
  terminos: { es: "Términos y condiciones", en: "Terms and conditions" },
};

/** SVG inline: 2 iconos pesan ~1kb y evitan arrastrar una librería entera. */
const SOCIALS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/grolow.studio/",
    path: "M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.43.42.7.83.91 1.4.17.42.37 1.05.42 2.23.06 1.28.07 1.66.07 4.89s0 3.6-.07 4.89c-.05 1.18-.25 1.8-.42 2.23a3.8 3.8 0 0 1-.9 1.38 3.8 3.8 0 0 1-1.4.91c-.42.17-1.05.37-2.23.42-1.28.06-1.66.07-4.89.07s-3.6 0-4.89-.07c-1.18-.05-1.8-.25-2.23-.42a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.91-1.4c-.17-.42-.37-1.05-.42-2.23C2.21 15.6 2.2 15.23 2.2 12s0-3.6.07-4.89c.05-1.18.25-1.8.42-2.23a3.8 3.8 0 0 1 .9-1.38 3.8 3.8 0 0 1 1.4-.91c.42-.17 1.05-.37 2.23-.42C8.5 2.21 8.88 2.2 12 2.2Zm0 1.8c-3.17 0-3.5.01-4.74.07-.9.04-1.38.19-1.7.31-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.12.32-.27.8-.31 1.7C3.44 8.5 3.43 8.83 3.43 12s.01 3.5.07 4.74c.4.9.19 1.38.31 1.7.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.12.8.27 1.7.31 1.24.06 1.57.07 4.74.07s3.5-.01 4.74-.07c.9-.04 1.38-.19 1.7-.31.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.12-.32.27-.8.31-1.7.06-1.24.07-1.57.07-4.74s-.01-3.5-.07-4.74c-.04-.9-.19-1.38-.31-1.7a2.9 2.9 0 0 0-.69-1.06 2.9 2.9 0 0 0-1.06-.69c-.32-.12-.8-.27-1.7-.31C15.5 4.01 15.17 4 12 4Zm0 3.03a4.97 4.97 0 1 1 0 9.94 4.97 4.97 0 0 1 0-9.94Zm0 1.8a3.17 3.17 0 1 0 0 6.34 3.17 3.17 0 0 0 0-6.34Zm5.17-.87a1.16 1.16 0 1 1 0-2.32 1.16 1.16 0 0 1 0 2.32Z",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/1KWFa6vDno/?mibextid=wwXIfr",
    path: "M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.9h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z",
  },
];

export default function Footer() {
  const lang = useLang();
  const c = COPY[lang];
  const year = new Date().getFullYear();

  /** El blog solo existe en español; se enlaza a su versión real. */
  const hrefFor = (id: RouteId) => pathFor(id, lang) ?? pathFor(id, "es");

  // `block py-3` lleva el objetivo táctil de 20px a 44px sin añadir un hueco
  // visible: sustituye al `space-y-3` que tenía la lista.
  const linkClass =
    "block py-3 text-sm text-white/65 hover:text-grolow-brand-bright transition-colors";

  return (
    <footer
      // Mismo motivo que en el hero: es superficie oscura, y al llegar abajo
      // cruza la banda del header.
      data-header-trigger="true"
      className="relative z-10 w-full bg-grolow-ink text-white">
      {/* ── Wordmark a sangre ──────────────────────────────────────────────
          `leading-[0.72]` más el recorte del contenedor cortan las astas
          inferiores, que es lo que hace que el logotipo parezca salirse del
          lienzo en vez de estar centrado en una caja. Es decoración pura: el
          nombre accesible ya lo da el enlace de la columna de marca.

          El cuerpo se deriva del ancho disponible en vez de fijarse en `vw`:
          en Sergio Trendy «grolow» mide 3.64× su font-size, y el contenedor
          descuenta 2rem de padding en móvil y 4rem a partir de `md`. Con un
          `vw` plano el rótulo se salía 7px a 375 y 13px a 768 —el padding es
          fijo y el cuerpo no—, y como el contenedor recorta, lo que se perdía
          era la «w». El 3.7 en vez de 3.64 deja el margen para la barra de
          scroll, que `100vw` sí cuenta. */}
      <div className="overflow-hidden px-4 md:px-8 pt-14 md:pt-20" aria-hidden="true">
        <Brand
          as="div"
          className="block select-none tracking-[-0.045em] leading-[0.72] text-white text-[calc((100vw-2rem)/3.7)] md:text-[calc((100vw-4rem)/3.7)]"
        />
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 pt-14 md:pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* ── Marca ── */}
          <div className="lg:pr-8">
            <p className="text-base text-white/70 leading-relaxed">
              {c.tagline}
            </p>
            <Link
              href={hrefFor("contacto")!}
              className="mt-6 inline-block text-sm leading-relaxed text-grolow-brand-bright hover:underline underline-offset-4">
              {c.accent}
            </Link>
          </div>

          {/* ── Menú ── */}
          <nav aria-label={c.menu}>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white mb-5">
              {c.menu}
            </h2>
            <ul className="-my-2">
              {MENU.map((id) => {
                const href = hrefFor(id);
                if (!href) return null;
                return (
                  <li key={id}>
                    <Link href={href} className={linkClass}>
                      {LABEL[id][lang]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ── Legal ── */}
          <nav aria-label={c.legal}>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white mb-5">
              {c.legal}
            </h2>
            <ul className="-my-2">
              {LEGAL.map((id) => {
                const href = hrefFor(id);
                if (!href) return null;
                return (
                  <li key={id}>
                    <Link href={href} className={linkClass}>
                      {LABEL[id][lang]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ── Contacto ── */}
          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white mb-5">
              {c.contact}
            </h2>
            <ul className="-my-2">
              <li>
                <a href={`mailto:${EMAIL}`} className={linkClass}>
                  {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}>
                  +1 829 994 6354 ({c.phoneNote})
                </a>
              </li>
              <li className="py-3 text-sm text-white/65">{c.place}</li>
            </ul>

            <ul className="mt-7 flex items-center gap-4" aria-label={c.social}>
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    // 44×44 de área táctil: el icono mide 24 y el resto lo
                    // aporta el padding, que no se ve pero sí se toca.
                    className="grid h-11 w-11 place-items-center -m-1.5 text-grolow-brand hover:text-white transition-colors">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6"
                      fill="currentColor"
                      aria-hidden="true">
                      <path d={s.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Barra inferior ── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-xs uppercase tracking-wider text-white/50">
            © {year} <Brand />. {c.rights}
          </p>
          <ul className="flex flex-wrap gap-x-5 -my-2">
            {LEGAL.map((id) => {
              const href = hrefFor(id);
              if (!href) return null;
              return (
                <li key={id}>
                  <Link
                    href={href}
                    className="inline-flex min-h-11 items-center text-xs text-white/50 hover:text-grolow-brand-bright transition-colors">
                    {LABEL[id][lang]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}
