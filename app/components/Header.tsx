"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { services } from "./services/Services";
import { useHeaderTrigger } from "./hooks/useHeaderTrigger";
import { usePathname, useRouter } from "next/navigation";
import { useLang, type Lang } from "./hooks/useLang";
import { pathFor, switchLocale, type RouteId } from "@/app/lib/i18n";

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

const LANGS: Lang[] = ["es", "en"];

/**
 * `route` => enlace real a una página propia. `target` => sección de la
 * portada: fuera de la portada el ancla no existe, así que se navega a la
 * portada con el fragmento en vez de dejar un botón que no hace nada.
 */
const NAV_LINKS: {
  target: string;
  route?: RouteId;
  label: Record<Lang, string>;
}[] = [
  { target: "casos", route: "casos", label: { en: "Projects", es: "Proyectos" } },
  { target: "proceso", label: { en: "Process", es: "Proceso" } },
  { target: "faq", label: { en: "FAQ's", es: "FAQ´s" } },
  {
    target: "contacto",
    route: "contacto",
    label: { en: "Contact", es: "Contacto" },
  },
];

const COPY = {
  en: {
    home: "Go to home",
    services: "Services",
    allServices: "See all services →",
    delivery: (time: string) => `Delivery in ${time}`,
    popular: "Popular",
    cta: "Let's Work Together",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
  },
  es: {
    home: "Ir al inicio",
    services: "Servicios",
    allServices: "Ver todos los servicios →",
    delivery: (time: string) => `Entrega en ${time}`,
    popular: "Popular",
    cta: "Trabajemos Juntos",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    language: "Idioma",
  },
} as const;

/** Compensa la altura del header fijo al hacer scroll a una sección. */
const SCROLL_OFFSET = -88;

/* ------------------------------------------------------------------ */
/* Toggle EN / ES                                                      */
/* ------------------------------------------------------------------ */

function LangToggle({
  lang,
  compact,
  label,
}: {
  lang: Lang;
  compact: boolean;
  label: string;
}) {
  const pathname = usePathname() ?? "/";
  return (
    <div
      role="group"
      aria-label={label}
      className={`flex items-center rounded-full border overflow-hidden font-extrabold transition-colors duration-300 ${
        compact
          ? "border-white/30 text-[10px]"
          : "border-grolow-light/20 text-[11px]"
      }`}>
      {LANGS.map((l) => (
        // Enlace nativo a propósito, no <Link>.
        //
        // El idioma vive en el segmento dinámico de la ruta, así que cambiarlo
        // obliga a Next a remontar el root layout entero: con una transición de
        // cliente se destruía y recreaba el canvas WebGL en cada cambio, y los
        // contextos se acumulaban hasta que el navegador empezaba a descartar
        // los más viejos. Una navegación de documento completa reinicia el 3D
        // una sola vez y limpia, y además es la única forma de que <html lang>
        // cambie de verdad. Sigue siendo un <a href> rastreable.
        <a
          key={l}
          href={switchLocale(pathname, l)}
          hrefLang={l}
          aria-current={lang === l ? "true" : undefined}
          className={`px-2.5 py-1 uppercase tracking-wide transition-colors ${
            lang === l
              ? compact
                ? "bg-white text-grolow-dark"
                : "bg-grolow-light text-grolow-dark"
              : compact
                ? "text-white/60 hover:text-white"
                : "text-grolow-light/75 hover:text-grolow-light"
          }`}>
          {l}
        </a>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  const lang = useLang();
  const router = useRouter();

  const c = COPY[lang];

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 32));

  // True mientras una sección con [data-header-trigger] cruza la banda
  // del header: texto blanco y header compacto para mantener contraste.
  const overTrigger = useHeaderTrigger();

  const scrollTo = useCallback((target: string, serviceId?: string) => {
    setServicesOpen(false);
    setMobileOpen(false);

    // Preselecciona el servicio en el formulario de contacto (mismo
    // comportamiento que el botón "Quiero este" de ServicesSection).
    if (serviceId) {
      const select =
        document.querySelector<HTMLSelectElement>("#contacto #needs");
      if (select) select.value = serviceId;
    }

    const el = document.getElementById(target);
    if (!el) return;
    const lenis = window.lenis;
    if (lenis) {
      lenis.scrollTo(el, { offset: SCROLL_OFFSET, duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  /**
   * Secciones que solo existen en la portada. Si ya estamos en ella se hace
   * scroll suave; si no, se navega a la portada con el fragmento, en vez de
   * dejar un botón que no responde.
   */
  const goToSection = useCallback(
    (target: string) => {
      if (document.getElementById(target)) {
        scrollTo(target);
        return;
      }
      setServicesOpen(false);
      setMobileOpen(false);
      router.push(`${pathFor("home", lang)}#${target}`);
    },
    [lang, router, scrollTo],
  );

  const scrollTop = useCallback(() => {
    setServicesOpen(false);
    setMobileOpen(false);
    const lenis = window.lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Cierra el dropdown de servicios con click fuera o Escape.
  useEffect(() => {
    if (!servicesOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!servicesRef.current?.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicesOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [servicesOpen]);

  // Con un menú abierto el header necesita fondo opaco propio: el
  // fondo translúcido del estado scrolled dejaría ver el hero a través de
  // los ítems del panel.
  const menuOpen = servicesOpen || mobileOpen;

  // overTrigger sigue mandando en los tamaños, pero los colores claros solo
  // valen sobre la sección oscura: con el menú abierto el fondo es crema.
  const onDark = overTrigger && !menuOpen;

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 isolate transition-colors duration-500 ${
        menuOpen
          ? "bg-grolow-dark/80 border-b border-grolow-light/10 shadow-[0_8px_30px_rgba(14,21,18,0.35)]"
          : scrolled
            // Antes llevaba `mix-blend-difference`, que sobre el fondo crema
            // invertía el texto y dejaba el logo y el menú casi ilegibles al
            // hacer scroll. Un crema translúcido con desenfoque mantiene la
            // tinta a pleno contraste.
            ? "bg-transparent backdrop-blur-md border-b border-grolow-light/10 shadow-[0_8px_30px_rgba(14,21,18,0.06)]"
            : "bg-transparent border-b border-transparent"
      }`}>
      <nav
        className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-6 transition-all duration-300 h-12">
        {/* ---------- Logo ---------- */}
        <button
          onClick={scrollTop}
          aria-label={c.home}
          className={`font-extrabold tracking-tight lowercase italic hover:opacity-70 transition-all duration-300 ${
            overTrigger ? "text-lg" : "text-2xl"
          } ${onDark ? "text-white" : "text-grolow-light"}`}
          style={{ fontFamily: "'Syne', sans-serif" }}>
          grolow
        </button>

        {/* ---------- Nav desktop ---------- */}
        <div className="hidden md:flex items-center gap-1">
          {/* Servicios: botón con mini modal */}
          <div ref={servicesRef} className="relative">
            <button
              onClick={() => setServicesOpen((v) => !v)}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              className={`flex items-center gap-1.5 px-4 py-2 font-semibold tracking-wide transition-all duration-300 ${
                overTrigger ? "text-xs" : "text-sm"
              } ${
                servicesOpen
                  ? onDark
                    ? "text-white"
                    : "text-grolow-cream"
                  : onDark
                    ? "text-white/80 hover:text-white"
                    : "text-grolow-light/80 hover:text-grolow-light"
              }`}>
              {c.services}
              <motion.span
                animate={{ rotate: servicesOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-[10px] leading-none">
                ▾
              </motion.span>
            </button>

            {/* ---------- Mini modal de servicios ---------- */}
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-[560px] rounded-2xl bg-grolow-card border border-grolow-light/10 shadow-[0_30px_60px_rgba(14,21,18,0.18)] p-2 origin-top">
                  <ul>
                    {services.map((service, i) => (
                      <motion.li
                        key={service.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}>
                        <button
                          onClick={() => scrollTo("contacto", service.id)}
                          className="w-full flex items-center justify-between gap-4 rounded-xl px-4 py-3 text-left hover:bg-grolow-dark transition-colors group">
                          <span>
                            <span className="flex items-center gap-2 text-sm font-bold text-grolow-light group-hover:text-grolow-cream transition-colors">
                              {lang === "en" ? service.titleEn : service.title}
                              {service.highlight && (
                                <span className="text-[9px] font-extrabold uppercase tracking-widest bg-grolow-lime text-grolow-light px-2 py-0.5 rounded-full">
                                  {c.popular}
                                </span>
                              )}
                            </span>
                            <span className="block text-xs text-grolow-light/55 mt-0.5">
                              {c.delivery(
                                lang === "en"
                                  ? service.deliveryTimeEn
                                  : service.deliveryTime,
                              )}
                            </span>
                          </span>
                          <span className="text-xs font-extrabold text-grolow-cream whitespace-nowrap">
                            {lang === "en"
                              ? service.priceLabelEn
                              : service.priceLabel}
                            <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">
                              →
                            </span>
                          </span>
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                  <div className="border-t border-grolow-light/10 mt-1 pt-1">
                    <Link
                      href={pathFor("servicios", lang)!}
                      onClick={() => setServicesOpen(false)}
                      className="block w-full rounded-xl px-4 py-3 text-xs font-extrabold uppercase tracking-widest text-grolow-light/70 hover:text-grolow-cream hover:bg-grolow-dark transition-colors text-left">
                      {c.allServices}
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {NAV_LINKS.map((link) => {
            const className = `px-4 py-2 font-semibold tracking-wide transition-all duration-300 ${
              overTrigger ? "text-xs" : "text-sm"
            } ${
              onDark
                ? "text-white/80 hover:text-white"
                : "text-grolow-light/80 hover:text-grolow-light"
            }`;
            return link.route ? (
              <Link key={link.target} href={pathFor(link.route, lang)!} className={className}>
                {link.label[lang]}
              </Link>
            ) : (
              <button
                key={link.target}
                onClick={() => goToSection(link.target)}
                className={className}>
                {link.label[lang]}
              </button>
            );
          })}
        </div>

        {/* ---------- Idioma + CTA + hamburguesa ---------- */}
        <div className="flex items-center gap-2 md:gap-3">
          <LangToggle lang={lang} compact={onDark} label={c.language} />

          {/* ---------- CTA desktop ---------- */}
          <Link
            href={pathFor("contacto", lang)!}
            className={`hidden md:inline-flex items-center gap-2 rounded-full bg-grolow-light text-grolow-dark font-bold hover:bg-grolow-cream hover:text-white transition-all duration-300 ${
              overTrigger ? "px-4 py-2 text-xs" : "px-4 py-2 text-sm"
            }`}>
            {c.cta}
          </Link>

          {/* ---------- Hamburguesa móvil ---------- */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? c.closeMenu : c.openMenu}
            aria-expanded={mobileOpen}
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5">
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              className={`block w-6 h-0.5 rounded-full transition-colors duration-300 ${
                onDark ? "bg-white" : "bg-grolow-light"
              }`}
            />
            <motion.span
              animate={
                mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }
              }
              className={`block w-6 h-0.5 rounded-full transition-colors duration-300 ${
                onDark ? "bg-white" : "bg-grolow-light"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* ---------- Menú móvil ---------- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-grolow-dark border-b border-grolow-light/10">
            <div className="px-6 pb-8 pt-2 max-h-[calc(100vh-72px)] overflow-y-auto">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-grolow-light/70 mt-4 mb-2">
                {c.services}
              </p>
              <ul className="space-y-1">
                {services.map((service) => (
                  <li key={service.id}>
                    <button
                      onClick={() => scrollTo("contacto", service.id)}
                      className="w-full flex items-center justify-between gap-3 py-2.5 text-left">
                      <span className="text-sm font-bold text-grolow-light">
                        {lang === "en" ? service.titleEn : service.title}
                      </span>
                      <span className="text-xs font-extrabold text-grolow-cream whitespace-nowrap">
                        {lang === "en"
                          ? service.priceLabelEn
                          : service.priceLabel}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <Link
                href={pathFor("servicios", lang)!}
                onClick={() => setMobileOpen(false)}
                className="block w-full py-3 text-left text-xs font-extrabold uppercase tracking-widest text-grolow-light/70 hover:text-grolow-cream transition-colors">
                {c.allServices}
              </Link>

              <div className="border-t border-grolow-light/10 mt-4 pt-2">
                {NAV_LINKS.map((link) =>
                  link.route ? (
                    <Link
                      key={link.target}
                      href={pathFor(link.route, lang)!}
                      onClick={() => setMobileOpen(false)}
                      className="block w-full py-3 text-left text-base font-bold text-grolow-light/85 hover:text-grolow-light transition-colors">
                      {link.label[lang]}
                    </Link>
                  ) : (
                    <button
                      key={link.target}
                      onClick={() => goToSection(link.target)}
                      className="block w-full py-3 text-left text-base font-bold text-grolow-light/85 hover:text-grolow-light transition-colors">
                      {link.label[lang]}
                    </button>
                  ),
                )}
              </div>

              <Link
                href={pathFor("contacto", lang)!}
                onClick={() => setMobileOpen(false)}
                className="mt-6 block w-full rounded-full bg-grolow-light text-grolow-dark py-4 text-sm font-bold text-center">
                {c.cta}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
