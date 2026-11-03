"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { WHATSAPP_NUMBER } from "@/app/lib/i18n";

/**
 * Landing de los anuncios de Black Friday (noviembre 2026).
 *
 * Llega tráfico pagado de 3 anuncios. Cada uno trae su palabra en la URL
 * (`?a=ia`, `?a=catalogo`, `?a=tienda`) para saber cuál convierte; esa palabra
 * viaja con el lead y en el mensaje de WhatsApp.
 *
 * Flujo: el prospecto deja nombre, negocio y WhatsApp → se guarda en
 * /api/lead → se abre WhatsApp con el mensaje ya escrito. Si el guardado
 * falla, WhatsApp se abre igual.
 *
 * Precios: los del vault (identidad-y-reglas §6). El 15% aplica al proyecto;
 * la mensualidad no se rebaja y se dice claro (regla madre).
 */

const OFFER_END = new Date("2026-12-01T00:00:00-04:00"); // fin del 30 nov, hora RD

const ADS: Record<string, { keyword: string; interest: string }> = {
  ia: { keyword: "IA", interest: "catalogo" },
  catalogo: { keyword: "CATÁLOGO", interest: "catalogo" },
  tienda: { keyword: "TIENDA", interest: "tienda" },
};

type Lang = "es" | "en";

const TEXT = {
  es: {
    interests: [
      { value: "catalogo", label: "Catálogo digital (pedidos por WhatsApp)" },
      { value: "tienda", label: "Tienda online con pago con tarjeta" },
      { value: "web", label: "Página web para mi empresa" },
      { value: "sistema", label: "Un sistema a medida" },
      { value: "nose", label: "No sé todavía, quiero que me orienten" },
    ],
    plans: [
      { name: "Catálogo Digital", tag: "El más pedido", before: "US$450", now: "US$382.50", monthly: "+ US$45/mes",
        points: ["Todos tus productos con fotos, precios y buscador", "El cliente escoge y el pedido te llega listo por WhatsApp", "Panel para cambiar productos y precios sin tocar código", "Listo en ~1 semana"] },
      { name: "Tienda online", tag: "Cobra con tarjeta", before: "US$850", now: "US$722.50", monthly: "+ desde US$80/mes",
        points: ["Todo lo del catálogo, más pago con tarjeta", "Aprobación de pedidos y analítica real de ventas", "Hecha desde cero, rápida y a nombre de tu negocio", "Lista en máximo 3 semanas"] },
      { name: "Web o sistema a medida", tag: "Cotización", before: "", now: "15% menos", monthly: "sobre la cotización",
        points: ["Página web empresarial con tu dominio", "Sistemas para ordenar procesos: cobros, citas, inventario", "Te digo precio cerrado antes de empezar", "El 15% aplica si cierras en noviembre"] },
    ],
    faqs: [
      { q: "¿El 15% aplica también a la mensualidad?", a: "No. El descuento es sobre el proyecto. La mensualidad se queda igual porque paga lo que mantiene tu sistema funcionando: hosting, dominio, base de datos, backups, seguridad y los cambios que pidas." },
      { q: "¿Qué cubre exactamente la mensualidad?", a: "Hosting, renovación del dominio, base de datos, backups, parches de seguridad, monitoreo y cambios puntuales. Grolow se encarga de todo lo técnico; tú solo usas el sistema." },
      { q: "¿De quién es el dominio, el código y los datos?", a: "De tu negocio. El dominio se registra a tu nombre. Si un día decides irte, te entregamos el código, los datos y el dominio sin cobrarte la salida." },
      { q: "¿Qué pasa si algo falla?", a: "Se resuelve. Y si el error es de Grolow, Grolow lo asume. Los primeros meses de ajustes ya van incluidos en el precio del proyecto." },
      { q: "¿Cuánto tarda?", a: "Un catálogo, alrededor de una semana. Una tienda online, máximo 3 semanas. Si cierras en noviembre, la tienda queda lista antes de la regalía." },
      { q: "¿Por qué hay cupos?", a: "Porque se entrega bien o no se entrega. La capacidad real es de 6 catálogos o 3 tiendas al mes, y cada proyecto lleva su soporte de estabilización." },
    ],
    heroes: {
      ia: { top: "Si tu negocio no tiene web,", accent: "la IA no te puede recomendar.", sub: "Este Black Friday mucha gente le pregunta a la IA dónde comprar. Grolow te construye tu catálogo web desde cero, con tu propio dominio, y los pedidos te llegan listos por WhatsApp." },
      tienda: { top: "La regalía cae antes del 20 de diciembre.", accent: "¿Tu tienda online va a estar lista?", sub: "Grolow te monta tu tienda online con pago con tarjeta, hecha desde cero, rápida y a nombre de tu negocio. Si cierras en noviembre, queda lista antes de la regalía." },
      base: { top: "Deja de mandar fotos y precios", accent: "uno por uno por WhatsApp.", sub: "Con un catálogo digital el cliente ve todo, escoge y el pedido te llega listo. Grolow te lo hace en una semana y se encarga de todo lo técnico." },
    },
    form: {
      title: "Te muestro cómo quedaría el tuyo", sub: "Deja tus datos y sigues la conversación por WhatsApp. Sin compromiso.",
      name: "Tu nombre", namePh: "Ej.: María Pérez", phone: "Tu WhatsApp", phonePh: "Ej.: 809 555 1234",
      business: "Nombre de tu negocio", businessPh: "Ej.: Perfumería Sol", interest: "¿Qué te interesa?",
      sells: "¿Qué vendes?", optional: "(opcional)", sellsPh: "Ej.: perfumes, ropa, repuestos…",
      error: "Escribe tu nombre y un WhatsApp válido.", sending: "Enviando…", submit: "Quiero mi 15% por WhatsApp",
      privacy: "Solo uso tu número para escribirte sobre tu proyecto.",
      doneTitle: "¡Listo, recibido!", doneBody: "Te estoy abriendo WhatsApp con tu mensaje ya escrito. Si no se abrió, toca el botón.", doneBtn: "Abrir WhatsApp",
      msg: (name: string, business: string, keyword: string, interest: string, sells: string) =>
        `Hola, soy ${name}${business ? ` de ${business}` : ""}. Vi el anuncio de Black Friday (${keyword}). Me interesa: ${interest}.` +
        (sells ? ` Vendo / trabajo con: ${sells}.` : "") + ` ¿Me muestras cómo quedaría el mío?`,
    },
    band: ["BLACK FRIDAY", " · 15% en todos los servicios + dominio de regalo · hasta el 30 de noviembre"],
    eyebrow: "Grolow · Oferta de noviembre",
    bullets: ["En todos los servicios", "Dominio propio de regalo", "Hecho desde cero para tu negocio"],
    dcto: "DCTO", endsIn: "La oferta termina en", units: ["días", "horas", "min", "seg"],
    pricesEyebrow: "Precios de Black Friday", pricesTitle: "Lo mismo de siempre, 15% menos", want: "Lo quiero",
    pricesNote: "El 15% aplica al proyecto. La mensualidad (hosting, dominio, mantenimiento, backups y cambios) no se rebaja: es lo que mantiene tu sistema funcionando. Oferta válida hasta el 30 de noviembre de 2026.",
    today: "Hoy", todayList: ["✕ Mandas la misma foto y el mismo precio 20 veces al día", "✕ Los pedidos se pierden entre chats", "✕ Si no tienes web, Google y la IA no te encuentran", "✕ Te escriben a las 11 pm preguntando “¿precio?”"],
    withG: "Con Grolow", withList: ["Mandas un link y el cliente ve todo", "El pedido te llega listo por WhatsApp", "Tu marca con dominio propio y más credibilidad", "Grolow se encarga de todo lo técnico"],
    caseEyebrow: "Caso real", caseTitle: "LaPerfum: más de 800 productos en un solo catálogo",
    caseBody: "Catálogo digital con buscador, panel para administrar productos sin tocar código y pedidos que llegan listos por WhatsApp. Grolow lo opera completo: dominio, hosting, base de datos y backups.",
    caseBtn: "Ver el catálogo", howTitle: "Cómo funciona",
    steps: [["01", "Dejas tus datos", "Te abro WhatsApp con tu mensaje listo. Me dices qué vendes y cómo te llegan hoy los pedidos."], ["02", "Te muestro cómo quedaría", "Te mando cómo se vería el tuyo y un precio cerrado, con el 15% ya aplicado."], ["03", "Lo construyo y lo mantengo", "Catálogo en ~1 semana, tienda en máximo 3. Después Grolow se encarga de lo técnico."]],
    cupos: ["Cupos reales:", " Grolow entrega 6 catálogos o 3 tiendas online al mes."],
    faqTitle: "Preguntas frecuentes",
    closeTitle: ["Aparta tu 15% antes del ", "30 de noviembre"],
    closeBody: "Deja tus datos y te muestro cómo quedaría el tuyo. Si prefieres, escríbeme directo al +1 (829) 994-6354.",
  },
  en: {
    interests: [
      { value: "catalogo", label: "Online catalog (orders via WhatsApp)" },
      { value: "tienda", label: "Online store with card payments" },
      { value: "web", label: "Website for my business" },
      { value: "sistema", label: "A custom system" },
      { value: "nose", label: "Not sure yet, I'd like advice" },
    ],
    plans: [
      { name: "Online Catalog", tag: "Most popular", before: "US$450", now: "US$382.50", monthly: "+ US$45/month",
        points: ["All your products with photos, prices and search", "Customers pick and the order reaches your WhatsApp ready", "Dashboard to change products and prices, no code", "Ready in ~1 week"] },
      { name: "Online store", tag: "Take card payments", before: "US$850", now: "US$722.50", monthly: "+ from US$80/month",
        points: ["Everything in the catalog, plus card payments", "Order approvals and real sales analytics", "Built from scratch, fast and in your business's name", "Ready in 3 weeks max"] },
      { name: "Custom website or system", tag: "Quote", before: "", now: "15% off", monthly: "on the quote",
        points: ["Business website with your own domain", "Systems to organize processes: billing, bookings, inventory", "Fixed price before we start", "15% applies if you sign in November"] },
    ],
    faqs: [
      { q: "Does the 15% apply to the monthly fee?", a: "No. The discount is on the project. The monthly fee stays the same because it pays for keeping your system running: hosting, domain, database, backups, security and the changes you ask for." },
      { q: "What exactly does the monthly fee cover?", a: "Hosting, domain renewal, database, backups, security patches, monitoring and small changes. Grolow handles everything technical; you just use the system." },
      { q: "Who owns the domain, the code and the data?", a: "Your business does. The domain is registered in your name. If you ever leave, you get the code, the data and the domain with no exit fee." },
      { q: "What if something breaks?", a: "It gets fixed. And if the mistake is Grolow's, Grolow owns it. The first months of adjustments are included in the project price." },
      { q: "How long does it take?", a: "A catalog takes about a week. An online store, 3 weeks max." },
      { q: "Why are spots limited?", a: "Because it gets delivered well or not at all. Real capacity is 6 catalogs or 3 stores per month, each with its own stabilization support." },
    ],
    heroes: {
      ia: { top: "If your business has no website,", accent: "AI can't recommend you.", sub: "This Black Friday many shoppers ask AI where to buy. Grolow builds your online catalog from scratch, on your own domain, and orders reach your WhatsApp ready." },
      tienda: { top: "Holiday spending peaks in December.", accent: "Will your online store be ready?", sub: "Grolow builds your online store with card payments, from scratch, fast and in your business's name. Sign in November and it's live before the holiday rush." },
      base: { top: "Stop sending photos and prices", accent: "one by one on WhatsApp.", sub: "With an online catalog customers see everything, pick, and the order reaches you ready. Grolow builds it in a week and handles everything technical." },
    },
    form: {
      title: "See how yours would look", sub: "Leave your details and we continue on WhatsApp. No commitment.",
      name: "Your name", namePh: "e.g. Maria Perez", phone: "Your WhatsApp", phonePh: "e.g. +1 809 555 1234",
      business: "Business name", businessPh: "e.g. Sol Perfumes", interest: "What are you interested in?",
      sells: "What do you sell?", optional: "(optional)", sellsPh: "e.g. perfumes, clothing, parts…",
      error: "Enter your name and a valid WhatsApp number.", sending: "Sending…", submit: "Get my 15% on WhatsApp",
      privacy: "I only use your number to message you about your project.",
      doneTitle: "Got it!", doneBody: "Opening WhatsApp with your message ready. If it didn't open, tap the button.", doneBtn: "Open WhatsApp",
      msg: (name: string, business: string, keyword: string, interest: string, sells: string) =>
        `Hi, I'm ${name}${business ? ` from ${business}` : ""}. I saw the Black Friday ad (${keyword}). I'm interested in: ${interest}.` +
        (sells ? ` I sell / work with: ${sells}.` : "") + ` Can you show me how mine would look?`,
    },
    band: ["BLACK FRIDAY", " · 15% off every service + free domain · until November 30"],
    eyebrow: "Grolow · November offer",
    bullets: ["On every service", "Your own domain, free", "Built from scratch for your business"],
    dcto: "OFF", endsIn: "Offer ends in", units: ["days", "hours", "min", "sec"],
    pricesEyebrow: "Black Friday pricing", pricesTitle: "Same quality, 15% less", want: "I want it",
    pricesNote: "The 15% applies to the project. The monthly fee (hosting, domain, maintenance, backups and changes) is not discounted: it's what keeps your system running. Offer valid until November 30, 2026.",
    today: "Today", todayList: ["✕ You send the same photo and price 20 times a day", "✕ Orders get lost between chats", "✕ Without a website, Google and AI can't find you", "✕ People message you at 11 pm asking “price?”"],
    withG: "With Grolow", withList: ["You send one link and customers see everything", "Orders reach your WhatsApp ready", "Your brand on its own domain, more credibility", "Grolow handles everything technical"],
    caseEyebrow: "Real case", caseTitle: "LaPerfum: 800+ products in a single catalog",
    caseBody: "Online catalog with search, a dashboard to manage products without code and orders that arrive ready on WhatsApp. Grolow runs all of it: domain, hosting, database and backups.",
    caseBtn: "See the catalog", howTitle: "How it works",
    steps: [["01", "Leave your details", "WhatsApp opens with your message ready. Tell me what you sell and how orders reach you today."], ["02", "I show you how it would look", "I send you a preview of yours and a fixed price, with the 15% already applied."], ["03", "I build it and maintain it", "Catalog in ~1 week, store in 3 max. Then Grolow handles everything technical."]],
    cupos: ["Real capacity:", " Grolow delivers 6 catalogs or 3 online stores per month."],
    faqTitle: "Frequently asked questions",
    closeTitle: ["Lock in your 15% before ", "November 30"],
    closeBody: "Leave your details and I'll show you how yours would look. Or message me directly at +1 (829) 994-6354.",
  },
};

/* ------------------------------------------------------------------ */

const subscribeSecond = (cb: () => void) => {
  const id = setInterval(cb, 1000);
  return () => clearInterval(id);
};
const noopSubscribe = () => () => {};

function useCountdown(end: Date) {
  const sec = useSyncExternalStore(
    subscribeSecond,
    () => Math.floor(Date.now() / 1000),
    () => -1
  );
  const now = sec < 0 ? null : sec * 1000;
  if (now === null) return null;
  const ms = Math.max(0, end.getTime() - now);
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms / 3_600_000) % 24,
    minutes: Math.floor(ms / 60_000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
    over: ms === 0,
  };
}

function trackLead(source: string, interest: string) {
  try {
    const w = window as unknown as {
      gtag?: (...a: unknown[]) => void;
      fbq?: (...a: unknown[]) => void;
    };
    w.gtag?.("event", "generate_lead", { source, interest });
    w.fbq?.("track", "Lead", { content_name: `black-friday-${source}` });
  } catch {
    /* la analítica nunca bloquea el envío */
  }
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-[#00938c]" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.15" />
      <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */

function LeadForm({
  lang,
  id,
  defaultInterest,
  source,
  keyword,
  utm,
  compact = false,
}: {
  lang: Lang;
  id: string;
  defaultInterest: string;
  source: string;
  keyword: string;
  utm: string;
  compact?: boolean;
}) {
  const T = TEXT[lang];
  const F = T.form;
  const [interest, setInterest] = useState(defaultInterest);
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const [waHref, setWaHref] = useState("");


  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const business = String(fd.get("business") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const sells = String(fd.get("sells") ?? "").trim();

    if (!name || phone.replace(/\D/g, "").length < 7) {
      setError(F.error);
      return;
    }
    setError("");
    setState("sending");

    const interestLabel =
      T.interests.find((o) => o.value === interest)?.label ?? interest;
    const message = F.msg(name, business, keyword, interestLabel, sells);
    const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    setWaHref(href);

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          business,
          phone,
          sells,
          interest,
          source: lang === "en" ? `${source}-en` : source,
          utm,
          website: String(fd.get("website") ?? ""),
        }),
      });
    } catch {
      /* si falla el guardado, WhatsApp se abre igual */
    }

    trackLead(source, interest);
    setState("done");
    window.location.href = href;
  }

  if (state === "done") {
    return (
      <div id={id} className="rounded-3xl bg-white p-7 text-center shadow-xl ring-1 ring-black/5">
        <p className="text-2xl font-bold text-[#003b38]">{F.doneTitle}</p>
        <p className="mt-2 text-[#33403d]">
          {F.doneBody}
        </p>
        <a
          href={waHref}
          className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-[#25D366] px-6 py-4 text-lg font-bold text-black"
        >
          {F.doneBtn}
        </a>
      </div>
    );
  }

  const input =
    "w-full rounded-xl border border-[#cfe3dd] bg-white px-4 py-3.5 text-base text-[#0e1512] placeholder:text-[#8a9894] outline-none focus:border-[#00938c] focus:ring-2 focus:ring-[#00938c]/25";

  return (
    <form
      id={id}
      onSubmit={onSubmit}
      className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-black/5 sm:p-7"
      noValidate
    >
      <p className="text-xl font-bold text-[#003b38]">
        {F.title}
      </p>
      <p className="mt-1 text-sm text-[#55625f]">
        {F.sub}
      </p>

      <div className="mt-5 grid gap-3">
        <label className="grid gap-1.5">
          <span className="text-sm font-semibold text-[#33403d]">{F.name}</span>
          <input name="name" autoComplete="name" required className={input} placeholder={F.namePh} />
        </label>
        <label className="grid gap-1.5">
          <span className="text-sm font-semibold text-[#33403d]">{F.phone}</span>
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" required className={input} placeholder={F.phonePh} />
        </label>
        {!compact && (
          <label className="grid gap-1.5">
            <span className="text-sm font-semibold text-[#33403d]">{F.business}</span>
            <input name="business" autoComplete="organization" className={input} placeholder={F.businessPh} />
          </label>
        )}
        <label className="grid gap-1.5">
          <span className="text-sm font-semibold text-[#33403d]">{F.interest}</span>
          <select
            name="interest"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className={input}
          >
            {T.interests.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        {!compact && (
          <label className="grid gap-1.5">
            <span className="text-sm font-semibold text-[#33403d]">
              {F.sells} <span className="font-normal text-[#8a9894]">{F.optional}</span>
            </span>
            <input name="sells" className={input} placeholder={F.sellsPh} />
          </label>
        )}
        {/* Campo trampa para bots: invisible para las personas. */}
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      </div>

      {error && <p className="mt-3 text-sm font-semibold text-[#d43c3c]">{error}</p>}

      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-4 text-lg font-bold text-black shadow-lg shadow-[#25D366]/30 transition hover:brightness-95 disabled:opacity-60"
      >
        {state === "sending" ? F.sending : F.submit}
      </button>
      <p className="mt-3 text-center text-xs text-[#8a9894]">
        {F.privacy}
      </p>
    </form>
  );
}

/* ------------------------------------------------------------------ */

export default function BlackFridayPage({ lang = "es" }: { lang?: Lang }) {
  const T = TEXT[lang];
  const search = useSyncExternalStore(
    noopSubscribe,
    () => window.location.search,
    () => ""
  );
  const left = useCountdown(OFFER_END);

  const { source, utm } = useMemo(() => {
    const p = new URLSearchParams(search);
    const a = (p.get("a") ?? p.get("utm_content") ?? "").toLowerCase();
    const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "fbclid"];
    return {
      source: a in ADS ? a : "directo",
      utm: keys
        .filter((k) => p.get(k))
        .map((k) => `${k}=${p.get(k)}`)
        .join("&"),
    };
  }, [search]);

  const ad = ADS[source];
  const keyword = ad?.keyword ?? "WEB";
  const defaultInterest = ad?.interest ?? "catalogo";

  const headline = useMemo(
    () => (source === "ia" ? T.heroes.ia : source === "tienda" ? T.heroes.tienda : T.heroes.base),
    [source, T]
  );

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <main className="min-h-screen bg-[#eafbf3] font-body text-[#0e1512]">
      {/* ── Banda superior ─────────────────────────────────────────── */}
      <div className="bg-[#04292b] px-4 py-2.5 text-center text-sm font-semibold text-white">
        <span className="text-[#34ecb2]">{T.band[0]}</span>{T.band[1]}
      </div>

      {/* ── Hero + formulario ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#04292b] text-white">
        <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#34ecb2_1.5px,transparent_1.5px)] [background-size:28px_28px]" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pt-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-[#34ecb2] ring-1 ring-white/15">
              {T.eyebrow}
            </span>
            <h1 className="mt-5 font-heading text-[2.1rem] font-extrabold leading-[1.08] sm:text-5xl">
              {headline.top}{" "}
              <span className="text-[#34ecb2]">{headline.accent}</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
              {headline.sub}
            </p>

            <div className="mt-7 flex flex-wrap items-end gap-5">
              <div className="relative grid h-28 w-28 place-items-center">
                <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-12 text-[#34ecb2]" aria-hidden="true">
                  <polygon
                    fill="currentColor"
                    points={Array.from({ length: 24 }, (_, i) => {
                      const r = i % 2 ? 40 : 50;
                      const a = (Math.PI * i) / 12;
                      return `${50 + r * Math.cos(a)},${50 + r * Math.sin(a)}`;
                    }).join(" ")}
                  />
                </svg>
                <span className="relative -rotate-12 text-center font-heading font-black leading-none text-[#04292b]">
                  <span className="block text-3xl">15%</span>
                  <span className="block text-sm">{T.dcto}</span>
                </span>
              </div>
              <ul className="grid gap-2 text-white/90">
                {T.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2"><Check /> {b}</li>
                ))}
              </ul>
            </div>

            {left && !left.over && (
              <div className="mt-8">
                <p className="text-xs font-bold uppercase tracking-widest text-white/60">
                  {T.endsIn}
                </p>
                <div className="mt-2 flex gap-2">
                  {[
                    [left.days, T.units[0]],
                    [left.hours, T.units[1]],
                    [left.minutes, T.units[2]],
                    [left.seconds, T.units[3]],
                  ].map(([v, l]) => (
                    <div key={l as string} className="min-w-16 rounded-xl bg-white/10 px-3 py-2 text-center ring-1 ring-white/15">
                      <div className="font-heading text-2xl font-bold tabular-nums">{pad(v as number)}</div>
                      <div className="text-[11px] uppercase tracking-wider text-white/60">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <LeadForm key={`a-${defaultInterest}`} lang={lang} id="form" defaultInterest={defaultInterest} source={source} keyword={keyword} utm={utm} />
        </div>
      </section>

      {/* ── Precios ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-center text-sm font-bold uppercase tracking-widest text-[#00938c]">
          {T.pricesEyebrow}
        </p>
        <h2 className="mt-2 text-center font-heading text-3xl font-extrabold text-[#04292b] sm:text-4xl">
          {T.pricesTitle}
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {T.plans.map((p) => (
            <div key={p.name} className="flex flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <span className="w-fit rounded-full bg-[#eafbf3] px-3 py-1 text-xs font-bold text-[#00938c]">{p.tag}</span>
              <h3 className="mt-3 font-heading text-2xl font-bold text-[#04292b]">{p.name}</h3>
              <div className="mt-3">
                {p.before && <span className="mr-2 text-[#8a9894] line-through">{p.before}</span>}
                <span className="font-heading text-3xl font-extrabold text-[#00605b]">{p.now}</span>
                <p className="text-sm text-[#55625f]">{p.monthly}</p>
              </div>
              <ul className="mt-5 grid gap-2.5 text-[#33403d]">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-2"><Check /> <span>{pt}</span></li>
                ))}
              </ul>
              <a
                href="#form"
                className="mt-6 inline-flex items-center justify-center rounded-2xl border-2 border-[#04292b] px-5 py-3 font-bold text-[#04292b] transition hover:bg-[#04292b] hover:text-white"
              >
                {T.want}
              </a>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-[#55625f]">
          {T.pricesNote}
        </p>
      </section>

      {/* ── Antes / después ───────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-2">
          <div className="rounded-3xl bg-[#fff1f1] p-7">
            <p className="text-sm font-bold uppercase tracking-widest text-[#d43c3c]">{T.today}</p>
            <ul className="mt-4 grid gap-3 text-[#4a2b2b]">
              {T.todayList.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>
          <div className="rounded-3xl bg-[#04292b] p-7 text-white">
            <p className="text-sm font-bold uppercase tracking-widest text-[#34ecb2]">{T.withG}</p>
            <ul className="mt-4 grid gap-3">
              {T.withList.map((x) => (
                <li key={x} className="flex gap-2"><Check /> {x}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Caso real ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 rounded-3xl bg-[#d3f5e6] p-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-[#00938c]">{T.caseEyebrow}</p>
            <h2 className="mt-2 font-heading text-3xl font-extrabold text-[#04292b]">
              {T.caseTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-[#33403d]">
              {T.caseBody}
            </p>
          </div>
          <a
            href="https://laperfum1.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-2xl bg-[#04292b] px-6 py-4 font-bold text-white"
          >
            {T.caseBtn}
          </a>
        </div>
      </section>

      {/* ── Cómo funciona ─────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-center font-heading text-3xl font-extrabold text-[#04292b] sm:text-4xl">{T.howTitle}</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {T.steps.map(([n, t, b]) => (
              <div key={n} className="rounded-3xl bg-[#eafbf3] p-6">
                <span className="font-heading text-4xl font-black text-[#34ecb2]">{n}</span>
                <h3 className="mt-2 text-xl font-bold text-[#04292b]">{t}</h3>
                <p className="mt-2 text-[#33403d]">{b}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl rounded-2xl bg-[#04292b] px-5 py-4 text-center text-white">
            <span className="font-bold text-[#34ecb2]">{T.cupos[0]}</span>
            {T.cupos[1]}
          </p>
        </div>
      </section>

      {/* ── Preguntas ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="text-center font-heading text-3xl font-extrabold text-[#04292b]">{T.faqTitle}</h2>
        <div className="mt-8 grid gap-3">
          {T.faqs.map((f) => (
            <details key={f.q} className="group rounded-2xl bg-white p-5 ring-1 ring-black/5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-[#04292b]">
                {f.q}
                <span className="text-2xl text-[#00938c] transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-[#33403d]">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── Cierre ────────────────────────────────────────────────── */}
      <section className="bg-[#04292b] text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-heading text-3xl font-extrabold sm:text-4xl">
              {T.closeTitle[0]}<span className="text-[#34ecb2]">{T.closeTitle[1]}</span>
            </h2>
            <p className="mt-4 text-lg text-white/80">
              {T.closeBody}
            </p>
          </div>
          <LeadForm key={`b-${defaultInterest}`} lang={lang} id="form-final" defaultInterest={defaultInterest} source={source} keyword={keyword} utm={utm} compact />
        </div>
      </section>

      {/* Botón fijo en móvil */}
      <a
        href="#form"
        className="fixed left-4 right-24 bottom-4 z-40 inline-flex items-center justify-center rounded-2xl bg-[#25D366] px-6 py-4 text-base font-bold text-black shadow-2xl md:hidden"
      >
        {T.form.submit}
      </a>
    </main>
  );
}
