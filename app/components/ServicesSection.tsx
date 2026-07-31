"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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
  description: string;
  tags: string[];
  features: string[];
  deliveryTime: string;
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
    description:
      "Tu inventario completo en un enlace que puedes poner en tu bio de Instagram. El cliente elige, y el pedido te llega a WhatsApp listo, con producto, cantidad y precio. Sin comisiones por venta, sin pasarelas que te descuenten.",
    deliveryTime: "72 horas",
    tags: ["E-commerce", "WhatsApp", "Sin comisiones"],
    features: [
      "Catálogo de productos con fotos",
      "Carrito de compras",
      "Pedidos directos por WhatsApp",
      "Sin comisiones por venta",
      "Panel para gestionar productos",
    ],
    highlight: true,
  },
  {
    id: "landing",
    title: "Landing Page de Conversión",
    description:
      "Una sola página diseñada para convertir visitas en clientes. Ideal para lanzar un producto, capturar leads o validar una idea rápidamente.",
    deliveryTime: "72 horas",
    tags: ["Conversión", "Leads", "Lanzamiento"],
    features: [
      "Diseño UI/UX premium",
      "Optimizada para velocidad < 1s",
      "Integración con WhatsApp o email",
      "Formulario de contacto incluido",
      "Adaptable a móvil y escritorio",
    ],
  },
  {
    id: "servicios-citas",
    title: "Web de Servicios y Citas",
    description:
      "Para consultores, salones, clínicas o cualquier negocio que agenda. Presentamos tus servicios, captamos clientes y automatizamos las reservas.",
    deliveryTime: "5–7 días",
    tags: ["Servicios", "Reservas", "Automatización"],
    features: [
      "Página de servicios",
      "Sistema de reservas o citas",
      "Integración con WhatsApp o calendario",
      "Galería de trabajos o testimonios",
      "Formulario de contacto",
    ],
  },
];

/** Se revelan al abrir "¿Necesitas algo distinto? También construimos →". */
const secondaryServices: Service[] = [
    {
      id: "ecommerce",
      title: "E-commerce Completo",
      description:
        "Tienda profesional con pasarela de pago, gestión de inventario, panel de administración y experiencia de compra optimizada para conversión.",
      deliveryTime: "2–3 semanas",
      tags: ["Tienda", "Pagos online", "Inventario"],
      features: [
        "Pasarela de pago integrada",
        "Gestión de inventario en tiempo real",
        "Panel de administración completo",
        "Historial de pedidos y clientes",
        "Optimización SEO incluida",
      ],
    },
    {
      id: "rediseno",
      title: "Rediseño de Sitio Existente",
      description:
        "Tienes un sitio pero se ve viejo, lento o no convierte. Lo analizamos, rediseñamos y optimizamos sin perder tu contenido ni tu dominio.",
      deliveryTime: "1 semana",
      tags: ["Rediseño", "Velocidad", "Conversión"],
      features: [
        "Auditoría de diseño y rendimiento",
        "Rediseño UI/UX completo",
        "Migración de contenido existente",
        "Optimización de velocidad",
        "Mismo dominio, nueva imagen",
      ],
      isNew: true,
    },
    {
      // Nunca "mantenimiento" de cara al cliente: un dueño mira su web
      // funcionando y no entiende qué se le mantiene. Se vende como
      // "yo me encargo de los cambios".
      id: "mantenimiento",
      title: "Yo me encargo de los cambios",
      description:
        "Me escribes por WhatsApp cuando quieras subir un producto, cambiar un precio o actualizar una foto, y yo lo hago. Tú no tocas nada.",
      deliveryTime: "Mes a mes",
      tags: ["Recurrente", "Cambios", "Respaldos"],
      features: [
        "Cambios de productos, precios y fotos",
        "Respaldos semanales automatizados",
        "Monitoreo 24/7",
        "Dominio y hosting incluidos",
        "Respuesta prioritaria por WhatsApp",
      ],
      isNew: true,
      isRecurring: true,
    },
    {
      id: "app-movil",
      title: "App Móvil",
      description:
        "Lleva tu negocio al bolsillo de tus clientes. Apps nativas o híbridas para iOS y Android con diseño profesional y experiencia fluida.",
      deliveryTime: "1–2 meses",
      tags: ["iOS", "Android", "Multiplataforma"],
      features: [
        "Diseño UI/UX para móvil",
        "iOS y Android desde un mismo código",
        "Notificaciones push",
        "Publicación en App Store y Play Store",
        "Panel de administración web incluido",
      ],
      isNew: true,
    },
    {
      id: "sistema-medida",
      title: "Sistema a Medida",
      description:
        "Plataformas, portales, dashboards o cualquier lógica de negocio personalizada. Si lo puedes describir, lo construimos.",
      deliveryTime: "Según alcance",
      tags: ["Plataforma", "Dashboard", "A medida"],
      features: [
        "Arquitectura y base de datos a medida",
        "Autenticación y roles de usuario",
        "Integraciones con APIs externas",
        "Panel de administración personalizado",
        "Soporte incluido tras la entrega",
      ],
    },
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showMore, setShowMore] = useState(false);

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
      <h1 className="text-3xl md:text-5xl font-black uppercase text-grolow-light pr-16 md:pr-0 pb-8 md:pb-12 border-b border-grolow-light/10 w-full max-w-5xl mx-auto">
        Servicios
      </h1>
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 gap-8 md:gap-10">
        {primaryServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
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
            ¿Necesitas algo distinto? También construimos
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
              <ServiceCard key={service.id} service={service} />
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

function ServiceCard({ service }: { service: Service }) {
  return (
    <div
      className="service-card group relative overflow-hidden bg-white/60 border border-grolow-light/10 p-6 md:p-16 backdrop-blur-xl h-auto md:h-125 flex flex-col justify-between rounded-2xl"
    >
      <div className="glow pointer-events-none absolute w-75 h-75 bg-grolow-cyan/20 rounded-full blur-[100px] opacity-0 transition-opacity" />

      {/* Badges: Nuevo / Recurrente / Principal */}
      <div className="absolute top-6 left-6 flex gap-2 z-20">
        {service.isNew && (
          <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest px-2 py-1 rounded-md border border-emerald-400/40 text-emerald-400 bg-emerald-400/10">
            Nuevo
          </span>
        )}
        {service.isRecurring && (
          <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest px-2 py-1 rounded-md border border-sky-400/40 text-sky-400 bg-sky-400/10">
            Mensual
          </span>
        )}
        {service.highlight && (
          <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest px-2 py-1 rounded-md border border-grolow-cyan/40 text-grolow-cyan bg-grolow-cyan/10">
            Principal
          </span>
        )}
      </div>

      {/* Delivery time */}
      <div className="absolute top-6 right-6 md:inset-0 md:text-center group-hover:opacity-100 transition-opacity pointer-events-none text-xs md:text-base text-grolow-light/50 font-mono">
        {service.deliveryTime}
      </div>

      <div className="flex flex-col h-full z-10 mt-8 md:mt-0">
        <div className="flex items-start justify-between">
          <h3 className="text-2xl md:text-5xl font-black uppercase text-grolow-light pr-16 md:pr-0">
            {service.title}
          </h3>
        </div>

        <p className="mt-3 md:mt-4 text-slate-400 max-w-md text-sm md:text-base leading-relaxed">
          {service.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] md:text-xs border border-grolow-light/20 text-grolow-light/60 px-2 py-1 md:px-3 uppercase tracking-wider rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        <ul className="mt-6 md:mt-auto space-y-2 mb-6 md:mb-0">
          {service.features.map((feature, index) => (
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
            Quiero este →
          </a>
        </div>
      </div>
    </div>
  );
}