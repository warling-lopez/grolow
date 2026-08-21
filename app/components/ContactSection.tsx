"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useLang } from "./hooks/useLang";

/** Mismo orden que la portada: la tienda WhatsApp primero. */
const SERVICE_OPTIONS = [
  {
    value: "tienda-whatsapp",
    label: { en: "Online Store → WhatsApp", es: "Tienda Online → WhatsApp" },
  },
  {
    value: "landing",
    label: {
      en: "Conversion Landing Page",
      es: "Landing Page de Conversión",
    },
  },
  {
    value: "servicios-citas",
    label: {
      en: "Services & Booking Website",
      es: "Web de Servicios y Citas",
    },
  },
  {
    value: "ecommerce",
    label: { en: "Full E-commerce", es: "E-commerce Completo" },
  },
  {
    value: "rediseno",
    label: {
      en: "Redesign of Existing Site",
      es: "Rediseño de Sitio Existente",
    },
  },
  {
    value: "mantenimiento",
    label: {
      en: "We handle the changes",
      es: "Nosotros nos encargamos de los cambios",
    },
  },
  { value: "app-movil", label: { en: "Mobile App", es: "App Móvil" } },
  {
    value: "sistema-medida",
    label: { en: "Custom System", es: "Sistema a Medida" },
  },
  {
    value: "other",
    label: { en: "Consulting / Other", es: "Asesoría / Otro" },
  },
];

// Rangos ajustados al cliente real (perfumería, ropa, comida): los tramos
// anteriores empezaban en $5,000/mes y descartaban a quien sí compra.
const BILLING_OPTIONS = [
  { en: "Less than US$1,000 / mo", es: "Menos de US$1,000 / mes" },
  { en: "US$1,000 – US$5,000 / mo", es: "US$1,000 – US$5,000 / mes" },
  { en: "US$5,000 – US$20,000 / mo", es: "US$5,000 – US$20,000 / mes" },
  { en: "More than US$20,000 / mo", es: "Más de US$20,000 / mes" },
];

// Alineado con la sección de planes. Sin mínimo de $1,500: la barrera de
// entrada ahora es el plan mensual.
const BUDGET_OPTIONS = [
  {
    en: "Monthly plan (US$150 setup + US$45/mo)",
    es: "Plan mensual (US$150 setup + US$45/mes)",
  },
  { en: "US$550 – US$900 (one-time)", es: "US$550 – US$900 (pago único)" },
  { en: "US$900 – US$1,500", es: "US$900 – US$1,500" },
  { en: "More than US$1,500", es: "Más de US$1,500" },
];

/** Mensaje precargado del enlace de WhatsApp. */
const WHATSAPP_MESSAGE = {
  en: "Hi, I have a business selling [type] and I'd like to see how a catalog with WhatsApp orders would work for us.",
  es: "Hola, tengo un negocio de [tipo] y quiero ver cómo funcionaría un catálogo con pedidos por WhatsApp.",
};

const COPY = {
  en: {
    eyebrow: "Let's talk about your project",
    titleLine1: "Let's build",
    titleLine2: "infrastructure that scales.",
    intro:
      "Tell us what you sell and how orders reach you today. We'll get back to you with a proposal and a fixed price in under 24 hours.",
    directEmail: "Direct email",
    whatsappLabel: "WhatsApp",
    whatsappCta: "Message us on WhatsApp",
    instagram: "Instagram",
    nameLabel: "Name / Business",
    namePlaceholder: "Your name or brand",
    phonePlaceholder: "+1 829 123 4567",
    emailLabel: "Email",
    emailPlaceholder: "email@company.com",
    needsLabel: "What do you need?",
    needsPlaceholder: "Select an option",
    billingLabel: "Current business revenue",
    billingPlaceholder: "Select a range",
    processLabel: "What process do you want to automate?",
    processPlaceholder:
      "E.g.: we take orders by hand over WhatsApp and lose sales; we want a catalog with real-time inventory.",
    budgetLabel: "Budget or plan you're interested in",
    budgetPlaceholder: "Select a range",
    errorGeneric: "There was a problem sending your request. Try WhatsApp instead.",
    submitting: "Sending...",
    submit: "Request our free proposal",
    disclaimer:
      "Proposal and fixed price · Free, no commitment · Response in under 24 hours.",
  },
  es: {
    eyebrow: "Hablemos de tu proyecto",
    titleLine1: "Construyamos",
    titleLine2: "infraestructura que escala.",
    intro:
      "Cuéntanos qué vendes y cómo te llegan hoy los pedidos. Te respondemos con una propuesta y un precio cerrado en menos de 24 horas.",
    directEmail: "Correo directo",
    whatsappLabel: "WhatsApp",
    whatsappCta: "Escríbenos por WhatsApp",
    instagram: "Instagram",
    nameLabel: "Nombre / Empresa",
    namePlaceholder: "Tu nombre o marca",
    phonePlaceholder: "+1 829 123 4567",
    emailLabel: "Correo Electrónico",
    emailPlaceholder: "correo@empresa.com",
    needsLabel: "¿Qué necesitas?",
    needsPlaceholder: "Selecciona una opción",
    billingLabel: "Facturación actual del negocio",
    billingPlaceholder: "Selecciona un rango",
    processLabel: "¿Qué proceso quieres automatizar?",
    processPlaceholder:
      "Ej: tomamos pedidos a mano por WhatsApp y perdemos ventas; queremos un catálogo con inventario en tiempo real.",
    budgetLabel: "Presupuesto o plan que te interesa",
    budgetPlaceholder: "Selecciona un rango",
    errorGeneric: "Hubo un problema al enviar tu solicitud. Intenta por WhatsApp.",
    submitting: "Enviando...",
    submit: "Pedir nuestra propuesta gratis",
    disclaimer:
      "Propuesta y precio cerrado · Gratis y sin compromiso · Respuesta en menos de 24 horas.",
  },
} as const;

function ContactForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lang = useLang();
  const c = COPY[lang];
  const whatsappHref =
    "https://wa.me/18299946354?text=" +
    encodeURIComponent(WHATSAPP_MESSAGE[lang]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const needsRef = useRef<HTMLSelectElement>(null);
  const billingRef = useRef<HTMLSelectElement>(null);
  const processRef = useRef<HTMLTextAreaElement>(null);
  const budgetRef = useRef<HTMLSelectElement>(null);

  const preselectedService = searchParams.get("servicio") ?? "";

  useEffect(() => {
    if (preselectedService && needsRef.current) {
      needsRef.current.value = preselectedService;
    }
  }, [preselectedService]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const payload = {
      name: nameRef.current?.value ?? "",
      phone: phoneRef.current?.value ?? "",
      email: emailRef.current?.value ?? "",
      needs: needsRef.current?.value ?? "",
      billing: billingRef.current?.value ?? "",
      process: processRef.current?.value ?? "",
      budget: budgetRef.current?.value ?? "",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al enviar");

      router.push("/gracias");
    } catch {
      setError(c.errorGeneric);
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contacto"
      className="w-full py-32 px-6 bg-grolow-dark border-t border-grolow-light/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* Lado izquierdo */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="block text-[11px] font-bold tracking-[.3em] uppercase text-grolow-cyan mb-8">
              {c.eyebrow}
            </span>
            <h2
              className="font-extrabold text-3xl sm:text-5xl md:text-6xl leading-tight md:leading-none tracking-tight md:tracking-tighter text-grolow-light mb-6 uppercase wrap-break-word hyphens-auto"
              style={{ fontFamily: "'Syne', sans-serif" }}
              lang={lang}>
              {c.titleLine1} <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-grolow-cyan to-grolow-light/50 italic">
                {c.titleLine2}
              </span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
              {c.intro}
            </p>
          </div>

          <div className="mt-20 space-y-8 border-t border-grolow-light/20 pt-10">
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">
                {c.directEmail}
              </p>
              <a
                href="mailto:grolow.web@gmail.com"
                className="text-xl font-medium text-grolow-light hover:text-grolow-cyan transition-colors">
                grolow.web@gmail.com
              </a>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">
                {c.whatsappLabel}
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-medium text-grolow-light hover:text-grolow-cyan transition-colors">
                {c.whatsappCta}
              </a>
              <p className="text-sm text-slate-500 mt-1">+1 829 994 6354</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">
                {c.instagram}
              </p>
              <a
                href="https://instagram.com/grolow.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-medium text-grolow-light hover:text-grolow-cyan transition-colors">
                @grolow.studio
              </a>
            </div>
          </div>
        </div>

        {/* Lado derecho: Formulario */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-grolow-light/10 p-10 md:p-14 flex flex-col gap-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {[
              {
                ref: nameRef,
                id: "name",
                label: c.nameLabel,
                type: "text",
                placeholder: c.namePlaceholder,
              },
              {
                ref: phoneRef,
                id: "phone",
                label: c.whatsappLabel,
                type: "tel",
                placeholder: c.phonePlaceholder,
              },
            ].map((f) => (
              <div key={f.id} className="flex flex-col gap-4">
                <label
                  htmlFor={f.id}
                  className="text-[10px] font-bold text-slate-400 tracking-[.2em] uppercase">
                  {f.label}
                </label>
                <input
                  ref={f.ref as React.RefObject<HTMLInputElement>}
                  id={f.id}
                  type={f.type}
                  required
                  placeholder={f.placeholder}
                  className="w-full bg-transparent border-b border-grolow-light/20 pb-3 text-grolow-light placeholder:text-slate-500 text-sm focus:outline-none focus:border-grolow-cyan transition-colors"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <label
              htmlFor="email"
              className="text-[10px] font-bold text-slate-400 tracking-[.2em] uppercase">
              {c.emailLabel}
            </label>
            <input
              ref={emailRef}
              id="email"
              type="email"
              required
              placeholder={c.emailPlaceholder}
              className="w-full bg-transparent border-b border-grolow-light/20 pb-3 text-grolow-light placeholder:text-slate-500 text-sm focus:outline-none focus:border-grolow-cyan transition-colors"
            />
          </div>

          <div className="flex flex-col gap-4">
            <label
              htmlFor="needs"
              className="text-[10px] font-bold text-slate-400 tracking-[.2em] uppercase">
              {c.needsLabel}
            </label>
            <select
              ref={needsRef}
              id="needs"
              required
              defaultValue={preselectedService}
              className="w-full bg-transparent border-b border-grolow-light/20 pb-3 text-grolow-light text-sm focus:outline-none focus:border-grolow-cyan transition-colors appearance-none cursor-pointer">
              <option value="" className="bg-white">
                {c.needsPlaceholder}
              </option>
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-white">
                  {opt.label[lang]}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-4">
            <label
              htmlFor="billing"
              className="text-[10px] font-bold text-slate-400 tracking-[.2em] uppercase">
              {c.billingLabel}
            </label>
            <select
              ref={billingRef}
              id="billing"
              required
              defaultValue=""
              className="w-full bg-transparent border-b border-grolow-light/20 pb-3 text-grolow-light text-sm focus:outline-none focus:border-grolow-cyan transition-colors appearance-none cursor-pointer">
              <option value="" className="bg-white">
                {c.billingPlaceholder}
              </option>
              {BILLING_OPTIONS.map((opt, i) => (
                <option key={i} value={opt[lang]} className="bg-white">
                  {opt[lang]}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-4">
            <label
              htmlFor="process"
              className="text-[10px] font-bold text-slate-400 tracking-[.2em] uppercase">
              {c.processLabel}
            </label>
            <textarea
              ref={processRef}
              id="process"
              required
              rows={3}
              placeholder={c.processPlaceholder}
              className="w-full bg-transparent border-b border-grolow-light/20 pb-3 text-grolow-light placeholder:text-slate-500 text-sm focus:outline-none focus:border-grolow-cyan transition-colors resize-none"
            />
          </div>

          <div className="flex flex-col gap-4">
            <label
              htmlFor="budget"
              className="text-[10px] font-bold text-slate-400 tracking-[.2em] uppercase">
              {c.budgetLabel}
            </label>
            <select
              ref={budgetRef}
              id="budget"
              required
              defaultValue=""
              className="w-full bg-transparent border-b border-grolow-light/20 pb-3 text-grolow-light text-sm focus:outline-none focus:border-grolow-cyan transition-colors appearance-none cursor-pointer">
              <option value="" className="bg-white">
                {c.budgetPlaceholder}
              </option>
              {BUDGET_OPTIONS.map((opt, i) => (
                <option key={i} value={opt[lang]} className="bg-white">
                  {opt[lang]}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <p className="text-red-400 text-xs text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-6 mt-4 bg-grolow-cream text-grolow-dark font-extrabold uppercase tracking-widest text-xs hover:bg-grolow-accent transition-colors disabled:opacity-50 flex justify-center items-center gap-3">
            {isSubmitting ? c.submitting : c.submit}
            {!isSubmitting && <span>→</span>}
          </button>
          <p className="text-center text-[10px] text-slate-600 uppercase tracking-widest -mt-2.5">
            {c.disclaimer}
          </p>
        </form>
      </div>
    </section>
  );
}

export default function ContactSection() {
  return (
    <Suspense fallback={null}>
      <ContactForm />
    </Suspense>
  );
}
