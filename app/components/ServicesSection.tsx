"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLang } from "./hooks/useLang";

gsap.registerPlugin(ScrollTrigger);

export type ServiceId =
  | "landing"
  | "tienda-whatsapp"
  | "servicios-citas"
  | "ecommerce"
  | "rediseno"
  | "mantenimiento"
  | "app-movil"
  | "sistema-medida";

type Service = {
  id: ServiceId;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  tags: string[];
  tagsEn: string[];
  features: string[];
  featuresEn: string[];
  deliveryTime: string;
  deliveryTimeEn: string;
  highlight?: boolean;
  isNew?: boolean;
  isRecurring?: boolean;
};

/**
 * Los tres servicios que se ven de entrada. Ocho servicios en portada
 * transmiten "hago cualquier cosa", que es lo contrario de especialista:
 * el resto vive detrás del acordeón de abajo.
 */
const primaryServices: Service[] = [
  {
    id: "tienda-whatsapp",
    title: "Tienda Online → WhatsApp",
    titleEn: "Online Store → WhatsApp",
    description:
      "Tu inventario completo en un enlace que puedes poner en tu bio de Instagram. El cliente elige, y el pedido te llega a WhatsApp listo, con producto, cantidad y precio. Sin comisiones por venta, sin pasarelas que te descuenten.",
    descriptionEn:
      "Your full inventory in one link you can put in your Instagram bio. The customer chooses, and the order lands on WhatsApp ready, with product, quantity and price. No sales commissions, no payment gateways taking a cut.",
    deliveryTime: "72 horas",
    deliveryTimeEn: "72 hours",
    tags: ["E-commerce", "WhatsApp", "Sin comisiones"],
    tagsEn: ["E-commerce", "WhatsApp", "No Commissions"],
    features: [
      "Catálogo de productos con fotos",
      "Carrito de compras",
      "Pedidos directos por WhatsApp",
      "Sin comisiones por venta",
      "Panel para gestionar productos",
    ],
    featuresEn: [
      "Product catalog with photos",
      "Shopping cart",
      "Direct orders via WhatsApp",
      "No sales commissions",
      "Panel to manage products",
    ],
    highlight: true,
  },
  {
    id: "landing",
    title: "Landing Page de Conversión",
    titleEn: "Conversion Landing Page",
    description:
      "Una sola página diseñada para convertir visitas en clientes. Ideal para lanzar un producto, capturar leads o validar una idea rápidamente.",
    descriptionEn:
      "A single page designed to convert visits into customers. Ideal for launching a product, capturing leads or validating an idea quickly.",
    deliveryTime: "72 horas",
    deliveryTimeEn: "72 hours",
    tags: ["Conversión", "Leads", "Lanzamiento"],
    tagsEn: ["Conversion", "Leads", "Launch"],
    features: [
      "Diseño UI/UX premium",
      "Optimizada para velocidad < 1s",
      "Integración con WhatsApp o email",
      "Formulario de contacto incluido",
      "Adaptable a móvil y escritorio",
    ],
    featuresEn: [
      "Premium UI/UX design",
      "Optimized for < 1s load speed",
      "WhatsApp or email integration",
      "Contact form included",
      "Adaptable to mobile and desktop",
    ],
  },
  {
    id: "servicios-citas",
    title: "Web de Servicios y Citas",
    titleEn: "Services & Booking Website",
    description:
      "Para consultores, salones, clínicas o cualquier negocio que agenda. Presentamos tus servicios, captamos clientes y automatizamos las reservas.",
    descriptionEn:
      "For consultants, salons, clinics or any business that books appointments. We present your services, capture clients and automate bookings.",
    deliveryTime: "5–7 días",
    deliveryTimeEn: "5–7 days",
    tags: ["Servicios", "Reservas", "Automatización"],
    tagsEn: ["Services", "Bookings", "Automation"],
    features: [
      "Página de servicios",
      "Sistema de reservas o citas",
      "Integración con WhatsApp o calendario",
      "Galería de trabajos o testimonios",
      "Formulario de contacto",
    ],
    featuresEn: [
      "Services page",
      "Booking or appointment system",
      "WhatsApp or calendar integration",
      "Portfolio or testimonials gallery",
      "Contact form",
    ],
  },
];

/** Se revelan al abrir "¿Necesitas algo distinto? También construimos →". */
const secondaryServices: Service[] = [
    {
      id: "ecommerce",
      title: "E-commerce Completo",
      titleEn: "Full E-commerce",
      description:
        "Tienda profesional con pasarela de pago, gestión de inventario, panel de administración y experiencia de compra optimizada para conversión.",
      descriptionEn:
        "Professional store with payment gateway, inventory management, admin panel and a purchase experience optimized for conversion.",
      deliveryTime: "2–3 semanas",
      deliveryTimeEn: "2–3 weeks",
      tags: ["Tienda", "Pagos online", "Inventario"],
      tagsEn: ["Store", "Online Payments", "Inventory"],
      features: [
        "Pasarela de pago integrada",
        "Gestión de inventario en tiempo real",
        "Panel de administración completo",
        "Historial de pedidos y clientes",
        "Optimización SEO incluida",
      ],
      featuresEn: [
        "Integrated payment gateway",
        "Real-time inventory management",
        "Full admin panel",
        "Order and customer history",
        "SEO optimization included",
      ],
    },
    {
      id: "rediseno",
      title: "Rediseño de Sitio Existente",
      titleEn: "Redesign of Existing Site",
      description:
        "Tienes un sitio pero se ve viejo, lento o no convierte. Lo analizamos, rediseñamos y optimizamos sin perder tu contenido ni tu dominio.",
      descriptionEn:
        "You have a site but it looks dated, slow, or isn't converting. We analyze, redesign and optimize it without losing your content or your domain.",
      deliveryTime: "1 semana",
      deliveryTimeEn: "1 week",
      tags: ["Rediseño", "Velocidad", "Conversión"],
      tagsEn: ["Redesign", "Speed", "Conversion"],
      features: [
        "Auditoría de diseño y rendimiento",
        "Rediseño UI/UX completo",
        "Migración de contenido existente",
        "Optimización de velocidad",
        "Mismo dominio, nueva imagen",
      ],
      featuresEn: [
        "Design and performance audit",
        "Full UI/UX redesign",
        "Migration of existing content",
        "Speed optimization",
        "Same domain, new look",
      ],
      isNew: true,
    },
    {
      // Nunca "mantenimiento" de cara al cliente: un dueño mira su web
      // funcionando y no entiende qué se le mantiene. Se vende como
      // "nosotros nos encargamos de los cambios".
      id: "mantenimiento",
      title: "Nosotros nos encargamos de los cambios",
      titleEn: "We handle the changes",
      description:
        "Nos escribes por WhatsApp cuando quieras subir un producto, cambiar un precio o actualizar una foto, y nosotros lo hacemos. Tú no tocas nada.",
      descriptionEn:
        "You message us on WhatsApp whenever you want to add a product, change a price or update a photo, and we take care of it. You don't touch anything.",
      deliveryTime: "Mes a mes",
      deliveryTimeEn: "Month to month",
      tags: ["Recurrente", "Cambios", "Respaldos"],
      tagsEn: ["Recurring", "Changes", "Backups"],
      features: [
        "Cambios de productos, precios y fotos",
        "Respaldos semanales automatizados",
        "Monitoreo 24/7",
        "Dominio y hosting incluidos",
        "Respuesta prioritaria por WhatsApp",
      ],
      featuresEn: [
        "Changes to products, prices and photos",
        "Automated weekly backups",
        "24/7 monitoring",
        "Domain and hosting included",
        "Priority response on WhatsApp",
      ],
      isNew: true,
      isRecurring: true,
    },
    {
      id: "app-movil",
      title: "App Móvil",
      titleEn: "Mobile App",
      description:
        "Lleva tu negocio al bolsillo de tus clientes. Apps nativas o híbridas para iOS y Android con diseño profesional y experiencia fluida.",
      descriptionEn:
        "Put your business in your customers' pockets. Native or hybrid apps for iOS and Android with professional design and a smooth experience.",
      deliveryTime: "1–2 meses",
      deliveryTimeEn: "1–2 months",
      tags: ["iOS", "Android", "Multiplataforma"],
      tagsEn: ["iOS", "Android", "Cross-platform"],
      features: [
        "Diseño UI/UX para móvil",
        "iOS y Android desde un mismo código",
        "Notificaciones push",
        "Publicación en App Store y Play Store",
        "Panel de administración web incluido",
      ],
      featuresEn: [
        "Mobile UI/UX design",
        "iOS and Android from one codebase",
        "Push notifications",
        "App Store and Play Store publishing",
        "Web admin panel included",
      ],
      isNew: true,
    },
    {
      id: "sistema-medida",
      title: "Sistema a Medida",
      titleEn: "Custom System",
      description:
        "Plataformas, portales, dashboards o cualquier lógica de negocio personalizada. Si lo puedes describir, lo construimos.",
      descriptionEn:
        "Platforms, portals, dashboards or any custom business logic. If you can describe it, we can build it.",
      deliveryTime: "Según alcance",
      deliveryTimeEn: "Scope-based",
      tags: ["Plataforma", "Dashboard", "A medida"],
      tagsEn: ["Platform", "Dashboard", "Custom"],
      features: [
        "Arquitectura y base de datos a medida",
        "Autenticación y roles de usuario",
        "Integraciones con APIs externas",
        "Panel de administración personalizado",
        "Soporte incluido tras la entrega",
      ],
      featuresEn: [
        "Custom architecture and database",
        "Authentication and user roles",
        "Integrations with external APIs",
        "Custom admin panel",
        "Support included after delivery",
      ],
    },
];

const COPY = {
  en: {
    heading: "Services",
    moreToggle: "Need something different? We also build",
  },
  es: {
    heading: "Servicios",
    moreToggle: "¿Necesitas algo distinto? También construimos",
  },
} as const;

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showMore, setShowMore] = useState(false);
  const lang = useLang();
  const c = COPY[lang];

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".service-card");

      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        cards.forEach((card: any, i) => {
          gsap.to(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 50%",
              end: "top 20%",
              scrub: true,
            },
            y: -70 * i,
            rotate: i % 2 === 0 ? 2 : -4,
          });
        });
      });

      mm.add("(max-width: 767px)", () => {
        cards.forEach((card: any, i) => {
          gsap.to(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 30%",
              scrub: true,
            },
            y: -15 * i,
          });
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="servicios"
      ref={containerRef}
      className="w-full min-h-screen  my-20 md:my-20 py-10 md:py-20 flex flex-col items-center px-4 md:px-8"
    >
      <h2 className="text-3xl md:text-5xl font-black uppercase text-grolow-light pr-16 md:pr-0 pb-8 md:pb-12 border-b border-grolow-light/10 w-full max-w-5xl mx-auto">
        {c.heading}
      </h2>
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 gap-8 md:gap-10">
        {primaryServices.map((service) => (
          <ServiceCard key={service.id} service={service} lang={lang} />
        ))}
      </div>

      {/* ── Los demás servicios, detrás de un acordeón ──────────────────
          Se muestran sólo bajo petición para que la portada siga leyéndose
          como una especialidad y no como un catálogo de "hago de todo". */}
      <div className="max-w-5xl mx-auto w-full mt-10 md:mt-14">
        <button
          type="button"
          onClick={() => {
            setShowMore((open) => !open);
            // Las tarjetas nuevas cambian la altura del documento: sin este
            // refresh los ScrollTrigger de la página quedan descuadrados.
            requestAnimationFrame(() => ScrollTrigger.refresh());
          }}
          aria-expanded={showMore}
          className="w-full flex items-center justify-between gap-6 text-left border-t border-grolow-light/10 pt-8 group"
        >
          <span className="text-base md:text-xl font-bold uppercase tracking-tight text-grolow-light">
            {c.moreToggle}
          </span>
          <span
            className={`text-grolow-cyan text-2xl font-light transition-transform duration-300 shrink-0 ${
              showMore ? "rotate-45" : ""
            }`}
          >
            +
          </span>
        </button>

        {showMore && (
          <div className="grid grid-cols-1 gap-8 md:gap-10 mt-8 md:mt-10">
            {secondaryServices.map((service) => (
              <ServiceCard key={service.id} service={service} lang={lang} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Tarjeta de servicio                                                 */
/* ------------------------------------------------------------------ */

const BADGE_COPY = {
  en: { new: "New", recurring: "Monthly", highlight: "Main", cta: "I want this →" },
  es: { new: "Nuevo", recurring: "Mensual", highlight: "Principal", cta: "Quiero este →" },
} as const;

function ServiceCard({ service, lang }: { service: Service; lang: "en" | "es" }) {
  const b = BADGE_COPY[lang];
  const isEn = lang === "en";
  return (
    <div
      className="service-card group relative overflow-hidden bg-white/60 border border-grolow-light/10 p-6 md:p-16 backdrop-blur-xl h-auto md:h-125 flex flex-col justify-between rounded-2xl"
    >
      <div className="glow pointer-events-none absolute w-75 h-75 bg-grolow-cyan/20 rounded-full blur-[100px] opacity-0 transition-opacity" />

      {/* Badges: Nuevo / Recurrente / Principal */}
      <div className="absolute top-6 left-6 flex gap-2 z-20">
        {service.isNew && (
          <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest px-2 py-1 rounded-md border border-emerald-400/40 text-emerald-400 bg-emerald-400/10">
            {b.new}
          </span>
        )}
        {service.isRecurring && (
          <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest px-2 py-1 rounded-md border border-sky-400/40 text-sky-400 bg-sky-400/10">
            {b.recurring}
          </span>
        )}
        {service.highlight && (
          <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest px-2 py-1 rounded-md border border-grolow-cyan/40 text-grolow-cyan bg-grolow-cyan/10">
            {b.highlight}
          </span>
        )}
      </div>

      {/* Delivery time */}
      <div className="absolute top-6 right-6 md:inset-0 md:text-center group-hover:opacity-100 transition-opacity pointer-events-none text-xs md:text-base text-grolow-light/50 font-mono">
        {isEn ? service.deliveryTimeEn : service.deliveryTime}
      </div>

      <div className="flex flex-col h-full z-10 mt-8 md:mt-0">
        <div className="flex items-start justify-between">
          <h3 className="text-2xl md:text-5xl font-black uppercase text-grolow-light pr-16 md:pr-0">
            {isEn ? service.titleEn : service.title}
          </h3>
        </div>

        <p className="mt-3 md:mt-4 text-slate-400 max-w-md text-sm md:text-base leading-relaxed">
          {isEn ? service.descriptionEn : service.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {(isEn ? service.tagsEn : service.tags).map((tag) => (
            <span
              key={tag}
              className="text-[10px] md:text-xs border border-grolow-light/20 text-grolow-light/60 px-2 py-1 md:px-3 uppercase tracking-wider rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        <ul className="mt-6 md:mt-auto space-y-2 mb-6 md:mb-0">
          {(isEn ? service.featuresEn : service.features).map((feature, index) => (
            <li
              key={index}
              className="text-xs md:text-sm text-slate-400 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-grolow-cyan inline-block shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-4 md:mt-0 md:absolute md:bottom-8 md:right-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          {/* El scroll suave lo maneja el listener global de anclas
              (ClientLayout) vía Lenis; aquí solo se preselecciona el
              servicio en el formulario de contacto. */}
          <a
            href="#contacto"
            onClick={() => {
              const select = document.querySelector<HTMLSelectElement>(
                '#contacto #needs'
              );
              if (select) select.value = service.id;
            }}
            className="text-[10px] font-extrabold uppercase tracking-widest px-5 py-3 border border-grolow-light/20 text-grolow-light hover:bg-grolow-cyan hover:border-grolow-cyan hover:text-grolow-dark transition-colors whitespace-nowrap">
            {b.cta}
          </a>
        </div>
      </div>
    </div>
  );
}