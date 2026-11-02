"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Brand from "@/app/components/Brand";
import WhatsAppLink from "@/app/components/WhatsAppLink";
import ReadingProgress from "@/app/components/blog/ReadingProgress";
import {
  langFromPathname,
  pathFor,
  switchLocale,
  type Lang,
  type RouteId,
} from "@/app/lib/i18n";

/**
 * Nav de empresa: el del blog y el de todas las páginas internas.
 *
 * Distinto al de la portada: quien llega a una página interna viene de Google
 * buscando un servicio concreto o a leer algo. Así que el nav, además de
 * orientar, le cuenta en una línea qué hace Grolow (webs, automatizaciones,
 * software) y le deja la cotización a un clic.
 *
 * - En el blog lleva además el rótulo «Blog» junto al logo y la barra de
 *   lectura.
 * - En todas lleva el selector ES / EN (el blog existe en los dos idiomas).
 */

const SERVICES: { route: RouteId; label: Record<Lang, string> }[] = [
  { route: "desarrolloWeb", label: { es: "Páginas web", en: "Websites" } },
  { route: "software", label: { es: "Automatizaciones", en: "Automation" } },
  { route: "tiendaWhatsapp", label: { es: "Tiendas online", en: "Online stores" } },
  { route: "apps", label: { es: "Apps", en: "Apps" } },
  { route: "casos", label: { es: "Proyectos", en: "Projects" } },
];

const COPY = {
  es: {
    tagline: "Webs, automatizaciones y software a medida",
    place: "Santo Domingo, RD",
    quote: "Cotiza gratis →",
    cta: "Cotizar proyecto",
    home: "Ir al inicio de Grolow",
    nav: "Servicios",
    language: "Idioma",
    open: "Abrir menú",
    close: "Cerrar menú",
  },
  en: {
    tagline: "Websites, automation and custom software",
    place: "Santo Domingo, DR",
    quote: "Free quote →",
    cta: "Get a quote",
    home: "Go to the Grolow home page",
    nav: "Services",
    language: "Language",
    open: "Open menu",
    close: "Close menu",
  },
} as const;

const LANGS: Lang[] = ["es", "en"];

function LangSwitch({ lang, pathname, label }: { lang: Lang; pathname: string; label: string }) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center rounded-full border border-neutral-300 overflow-hidden text-[11px] font-extrabold">
      {LANGS.map((l) => (
        // Enlace nativo (no <Link>): cambiar de idioma remonta el layout raíz
        // y así <html lang> cambia de verdad. Ver LangToggle en Header.
        <a
          key={l}
          href={switchLocale(pathname, l)}
          hrefLang={l}
          aria-current={lang === l ? "true" : undefined}
          className={`grid min-h-8 min-w-10 place-items-center px-2.5 uppercase tracking-wide transition-colors ${
            lang === l ? "bg-neutral-900 text-white" : "text-neutral-600 hover:text-neutral-900"
          }`}>
          {l}
        </a>
      ))}
    </div>
  );
}

export default function BlogHeader({ section = "site" }: { section?: "blog" | "site" }) {
  const pathname = usePathname() ?? "/";
  const lang: Lang = langFromPathname(pathname);
  const c = COPY[lang];
  const isBlog = section === "blog";

  // El menú móvil guarda la ruta en la que se abrió: al navegar deja de
  // coincidir y se cierra solo.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt !== null && openAt === pathname;
  const setOpen = (fn: (v: boolean) => boolean) =>
    setOpenAt(fn(open) ? pathname : null);

  // Un servicio que no existe en este idioma no se enlaza.
  const services = SERVICES.flatMap((s) => {
    const href = pathFor(s.route, lang);
    return href === null ? [] : [{ href, label: s.label[lang], route: s.route }];
  });
  const contacto = pathFor("contacto", lang) ?? pathFor("contacto", "es")!;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-neutral-200">
      {/* Franja de servicios: lo que hacemos, en una línea. */}
      <div className="bg-grolow-cream text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-9 flex items-center justify-between gap-4 text-xs">
          <p className="truncate">
            <span className="font-semibold">{c.tagline}</span>
            <span className="hidden sm:inline text-white/75"> · {c.place}</span>
          </p>
          <WhatsAppLink
            message={
              isBlog
                ? lang === "es"
                  ? "Hola, vengo del blog y quiero cotizar un proyecto."
                  : "Hi, I'm coming from the blog and I'd like a quote for a project."
                : lang === "es"
                  ? "Hola, vengo de la web de Grolow y quiero cotizar un proyecto."
                  : "Hi, I'm coming from the Grolow website and I'd like a quote for a project."
            }
            placement={isBlog ? "blog-topbar" : "site-topbar"}
            className="shrink-0 font-semibold underline-offset-4 hover:underline">
            {c.quote}
          </WhatsAppLink>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Link
            href={pathFor("home", lang)!}
            aria-label={c.home}
            className="text-2xl text-neutral-900 hover:opacity-70 transition-opacity">
            <Brand />
          </Link>
          {isBlog && (
            <>
              <span className="h-6 w-px bg-neutral-300" aria-hidden="true" />
              <Link
                href={pathFor("blog", lang) ?? pathFor("blog", "es")!}
                className="text-sm font-bold uppercase tracking-widest text-grolow-cream hover:text-grolow-brand transition-colors">
                Blog
              </Link>
            </>
          )}
        </div>

        <nav aria-label={c.nav} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {services.map((s) => (
              <li key={s.route}>
                <Link
                  href={s.href}
                  aria-current={pathname === s.href ? "page" : undefined}
                  className={`px-3 py-2 rounded-full text-sm font-semibold transition-colors hover:text-grolow-cream hover:bg-neutral-100 ${
                    pathname === s.href ? "text-grolow-cream bg-neutral-100" : "text-neutral-700"
                  }`}>
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden sm:block">
            <LangSwitch lang={lang} pathname={pathname} label={c.language} />
          </div>
          <Link
            href={contacto}
            className="hidden sm:inline-flex items-center rounded-full bg-neutral-900 text-white text-sm font-bold px-5 py-2.5 hover:bg-grolow-cream transition-colors">
            {c.cta}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-mobile-menu"
            aria-label={open ? c.close : c.open}
            className="lg:hidden grid h-11 w-11 place-items-center rounded-full hover:bg-neutral-100">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-neutral-900" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="site-mobile-menu" aria-label={c.nav} className="lg:hidden border-t border-neutral-200 bg-white">
          <ul className="max-w-7xl mx-auto px-4 py-3">
            {services.map((s) => (
              <li key={s.route}>
                <Link
                  href={s.href}
                  className="block py-3 text-base font-semibold text-neutral-800 hover:text-grolow-cream">
                  {s.label}
                </Link>
              </li>
            ))}
            <li className="py-3">
              <LangSwitch lang={lang} pathname={pathname} label={c.language} />
            </li>
            <li className="pt-2 pb-1">
              <Link
                href={contacto}
                className="block rounded-full bg-neutral-900 text-white text-center text-sm font-bold py-3">
                {c.cta}
              </Link>
            </li>
          </ul>
        </nav>
      )}
      {isBlog && <ReadingProgress />}
    </header>
  );
}
