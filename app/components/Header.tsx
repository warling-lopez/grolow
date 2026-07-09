"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { services } from "./services/Services";

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "Proyectos", target: "casos" },
  { label: "Proceso", target: "proceso" },
  { label: "FAQ´s", target: "faq" },
  { label: "Contacto", target: "contacto" },
];

/** Compensa la altura del header fijo al hacer scroll a una sección. */
const SCROLL_OFFSET = -88;

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 32));

  const scrollTo = useCallback((target: string, serviceId?: string) => {
    setServicesOpen(false);
    setMobileOpen(false);

    // Preselecciona el servicio en el formulario de contacto (mismo
    // comportamiento que el botón "Quiero este" de ServicesSection).
    if (serviceId) {
      const select = document.querySelector<HTMLSelectElement>(
        "#contacto #needs"
      );
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

  const solid = scrolled || servicesOpen || mobileOpen;

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        solid
          ? "bg-grolow-dark/85 backdrop-blur-xl border-b border-grolow-light/10 shadow-[0_8px_30px_rgba(14,21,18,0.06)]"
          : "bg-transparent border-b border-transparent"
      }`}>
      <nav className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-6 h-[72px]">
        {/* ---------- Logo ---------- */}
        <button
          onClick={scrollTop}
          aria-label="Ir al inicio"
          className="text-2xl font-extrabold tracking-tight text-grolow-light lowercase italic hover:opacity-70 transition-opacity"
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
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold tracking-wide transition-colors ${
                servicesOpen
                  ? "text-grolow-cream"
                  : "text-grolow-light/80 hover:text-grolow-light"
              }`}>
              Servicios
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
                              {service.title}
                              {service.highlight && (
                                <span className="text-[9px] font-extrabold uppercase tracking-widest bg-grolow-lime text-grolow-light px-2 py-0.5 rounded-full">
                                  Popular
                                </span>
                              )}
                            </span>
                            <span className="block text-xs text-grolow-light/55 mt-0.5">
                              Entrega en {service.deliveryTime}
                            </span>
                          </span>
                          <span className="text-xs font-extrabold text-grolow-cream whitespace-nowrap">
                            {service.priceLabel}
                            <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">
                              →
                            </span>
                          </span>
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                  <div className="border-t border-grolow-light/10 mt-1 pt-1">
                    <button
                      onClick={() => scrollTo("servicios")}
                      className="w-full rounded-xl px-4 py-3 text-xs font-extrabold uppercase tracking-widest text-grolow-light/70 hover:text-grolow-cream hover:bg-grolow-dark transition-colors text-left">
                      Ver todos los servicios →
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {NAV_LINKS.map((link) => (
            <button
              key={link.target}
              onClick={() => scrollTo(link.target)}
              className="px-4 py-2 text-sm font-semibold tracking-wide text-grolow-light/80 hover:text-grolow-light transition-colors">
              {link.label}
            </button>
          ))}
        </div>

        {/* ---------- CTA desktop ---------- */}
        <button
          onClick={() => scrollTo("contacto")}
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-grolow-light text-grolow-dark px-6 py-3 text-sm font-bold hover:bg-grolow-cream hover:text-white transition-colors">
          Trabajemos Juntos
        </button>

        {/* ---------- Hamburguesa móvil ---------- */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
          className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5">
          <motion.span
            animate={
              mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }
            }
            className="block w-6 h-0.5 bg-grolow-light rounded-full"
          />
          <motion.span
            animate={
              mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }
            }
            className="block w-6 h-0.5 bg-grolow-light rounded-full"
          />
        </button>
      </nav>

      {/* ---------- Menú móvil ---------- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-grolow-dark/95 backdrop-blur-xl border-b border-grolow-light/10">
            <div className="px-6 pb-8 pt-2 max-h-[calc(100vh-72px)] overflow-y-auto">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-grolow-light/50 mt-4 mb-2">
                Servicios
              </p>
              <ul className="space-y-1">
                {services.map((service) => (
                  <li key={service.id}>
                    <button
                      onClick={() => scrollTo("contacto", service.id)}
                      className="w-full flex items-center justify-between gap-3 py-2.5 text-left">
                      <span className="text-sm font-bold text-grolow-light">
                        {service.title}
                      </span>
                      <span className="text-xs font-extrabold text-grolow-cream whitespace-nowrap">
                        {service.priceLabel}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="border-t border-grolow-light/10 mt-4 pt-2">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.target}
                    onClick={() => scrollTo(link.target)}
                    className="block w-full py-3 text-left text-base font-bold text-grolow-light/85 hover:text-grolow-light transition-colors">
                    {link.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => scrollTo("contacto")}
                className="mt-6 w-full rounded-full bg-grolow-light text-grolow-dark py-4 text-sm font-bold text-center">
                Trabajemos Juntos
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
