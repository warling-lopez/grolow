"use client";

import ContactSection from "@/app/components/ContactSection";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { useLang } from "@/app/components/hooks/useLang";
import WhatsAppLink from "@/app/components/WhatsAppLink";
import { pathFor } from "@/app/lib/i18n";
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
    <main className="w-full bg-grolow-dark pb-16">
      <Breadcrumbs routeId="contacto" lang={lang} />

      <header className="max-w-7xl mx-auto w-full px-4 md:px-8 pt-4 md:pt-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-grolow-cream mb-3">
          {c.eyebrow}
        </p>
        <h1 className="max-w-3xl font-serif font-black text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.08] tracking-tight text-neutral-900">
          {c.h1}
        </h1>
        <div className="mt-6 space-y-4 max-w-3xl">
          {c.lead.map((paragraph, i) => (
            <p
              key={i}
              className="text-lg text-neutral-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8 max-w-3xl rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
          <h2 className="text-xl font-extrabold text-grolow-light">
            {c.whatsappTitle}
          </h2>
          <p className="text-grolow-light/70 mt-2">{c.whatsappText}</p>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <WhatsAppLink
              message={c.whatsappMessage}
              placement="contact-page"
              className="inline-flex items-center gap-2 rounded-full bg-neutral-900 text-white font-bold px-6 py-3 text-sm hover:bg-grolow-cream transition-colors">
              {c.whatsappLabel}
            </WhatsAppLink>
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
