"use client";

import ContactSection from "@/app/components/ContactSection";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { useLang } from "@/app/components/hooks/useLang";
import { pathFor, whatsappHref } from "@/app/lib/i18n";
import Link from "next/link";

const COPY = {
  es: {
    eyebrow: "Contacto",
    h1: "Solicita tu propuesta gratis",
    lead: [
      "Cuéntanos qué necesitas y te devolvemos una propuesta con alcance, inversión y fecha de entrega en menos de 24 horas. No hace falta una reunión previa para recibirla.",
      "Si creemos que no somos la opción correcta para tu proyecto, también te lo decimos. Preferimos perder una cotización a empezar algo que no te va a servir.",
    ],
    whatsappTitle: "¿Prefieres escribir directo?",
    whatsappText:
      "El WhatsApp lo contesta quien construye los proyectos, no un ejecutivo de cuentas.",
    whatsappLabel: "Escribir por WhatsApp",
    whatsappMessage: "Hola, quiero una propuesta para mi proyecto:",
    pricesLabel: "Ver cuánto cuesta una página web en RD",
  },
  en: {
    eyebrow: "Contact",
    h1: "Request your free proposal",
    lead: [
      "Tell us what you need and we'll send back a proposal with scope, investment and delivery date in under 24 hours. No prior meeting required to receive it.",
      "If we think we're not the right fit for your project, we'll tell you that too. We'd rather lose a quote than start something that won't serve you.",
    ],
    whatsappTitle: "Prefer to message directly?",
    whatsappText:
      "WhatsApp is answered by the person who builds the projects, not an account executive.",
    whatsappLabel: "Message us on WhatsApp",
    whatsappMessage: "Hi, I'd like a proposal for my project:",
    pricesLabel: "See what a website costs in the Dominican Republic",
  },
} as const;

export default function ContactoPage() {
  const lang = useLang();
  const c = COPY[lang];

  return (
    <main className="w-full pb-16">
      <Breadcrumbs routeId="contacto" lang={lang} />

      <header className="max-w-5xl mx-auto w-full px-4 md:px-8 pt-8 md:pt-10">
        <p className="text-xs font-mono uppercase tracking-widest text-grolow-light/40 mb-3">
          {c.eyebrow}
        </p>
        <h1 className="text-[clamp(2rem,5.5vw,4rem)] font-black uppercase text-grolow-light leading-[1.02] tracking-tight">
          {c.h1}
        </h1>
        <div className="mt-6 space-y-4 max-w-3xl">
          {c.lead.map((paragraph, i) => (
            <p
              key={i}
              className="text-base md:text-lg text-grolow-light/80 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8 max-w-3xl border-t border-grolow-light/10 pt-6">
          <h2 className="text-xl font-extrabold text-grolow-light">
            {c.whatsappTitle}
          </h2>
          <p className="text-grolow-light/70 mt-2">{c.whatsappText}</p>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <a
              href={whatsappHref(c.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-grolow-light text-grolow-dark font-bold px-6 py-3 text-sm hover:bg-grolow-cream hover:text-white transition-colors">
              {c.whatsappLabel}
            </a>
            <Link
              href={pathFor("precios", lang)!}
              className="text-grolow-cream font-semibold underline underline-offset-4 hover:text-grolow-accent transition-colors">
              {c.pricesLabel}
            </Link>
          </div>
        </div>
      </header>

      <ContactSection />
    </main>
  );
}
