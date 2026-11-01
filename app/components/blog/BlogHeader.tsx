"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Brand from "@/app/components/Brand";
import WhatsAppLink from "@/app/components/WhatsAppLink";
import { pathFor, type RouteId } from "@/app/lib/i18n";

/**
 * Nav del blog.
 *
 * Distinto al del resto del sitio: quien llega a un artículo viene de Google
 * buscando otra cosa, no a contratar una web. Así que el nav, además de
 * orientar, le cuenta en una línea qué hace Grolow (webs, automatizaciones,
 * software) y le deja la cotización a un clic.
 *
 * El blog solo existe en español, por eso los textos van en español.
 */

const SERVICES: { route: RouteId; label: string }[] = [
  { route: "desarrolloWeb", label: "Páginas web" },
  { route: "software", label: "Automatizaciones" },
  { route: "tiendaWhatsapp", label: "Tiendas online" },
  { route: "apps", label: "Apps" },
  { route: "casos", label: "Proyectos" },
];

export default function BlogHeader() {
  const pathname = usePathname();
  // El menú móvil guarda la ruta en la que se abrió: al navegar deja de
  // coincidir y se cierra solo.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt !== null && openAt === pathname;
  const setOpen = (fn: (v: boolean) => boolean) =>
    setOpenAt(fn(open) ? pathname : null);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-neutral-200">
      {/* Franja de servicios: lo que hacemos, en una línea. */}
      <div className="bg-grolow-cream text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-9 flex items-center justify-between gap-4 text-xs">
          <p className="truncate">
            <span className="font-semibold">Webs, automatizaciones y software a medida</span>
            <span className="hidden sm:inline text-white/75"> · Santo Domingo, RD</span>
          </p>
          <WhatsAppLink
            message="Hola, vengo del blog y quiero cotizar un proyecto."
            placement="blog-topbar"
            className="shrink-0 font-semibold underline-offset-4 hover:underline">
            Cotiza gratis →
          </WhatsAppLink>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Link
            href={pathFor("home", "es")!}
            aria-label="Ir al inicio de Grolow"
            className="text-2xl text-neutral-900 hover:opacity-70 transition-opacity">
            <Brand />
          </Link>
          <span className="h-6 w-px bg-neutral-300" aria-hidden="true" />
          <Link
            href={pathFor("blog", "es")!}
            className="text-sm font-bold uppercase tracking-widest text-grolow-cream hover:text-grolow-brand transition-colors">
            Blog
          </Link>
        </div>

        <nav aria-label="Servicios" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {SERVICES.map((s) => (
              <li key={s.route}>
                <Link
                  href={pathFor(s.route, "es")!}
                  className="px-3 py-2 rounded-full text-sm font-semibold text-neutral-700 hover:text-grolow-cream hover:bg-neutral-100 transition-colors">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={pathFor("contacto", "es")!}
            className="hidden sm:inline-flex items-center rounded-full bg-neutral-900 text-white text-sm font-bold px-5 py-2.5 hover:bg-grolow-cream transition-colors">
            Cotizar proyecto
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="blog-mobile-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="lg:hidden grid h-11 w-11 place-items-center rounded-full hover:bg-neutral-100">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-neutral-900" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="blog-mobile-menu" aria-label="Servicios" className="lg:hidden border-t border-neutral-200 bg-white">
          <ul className="max-w-7xl mx-auto px-4 py-3">
            {SERVICES.map((s) => (
              <li key={s.route}>
                <Link
                  href={pathFor(s.route, "es")!}
                  className="block py-3 text-base font-semibold text-neutral-800 hover:text-grolow-cream">
                  {s.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 pb-1">
              <Link
                href={pathFor("contacto", "es")!}
                className="block rounded-full bg-neutral-900 text-white text-center text-sm font-bold py-3">
                Cotizar proyecto
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
