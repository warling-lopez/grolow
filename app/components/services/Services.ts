type Service = {
  id: string;
  title: string;
  /** Versión en inglés de los campos visibles en el nav (idioma por defecto). */
  titleEn: string;
  description: string;
  deliveryTime: string;
  deliveryTimeEn: string;
  startingPrice: number;
  priceLabel: string;
  priceLabelEn: string;
  tags: string[];
  features: string[];
  highlight?: boolean;
};

/**
 * Orden intencional: la tienda WhatsApp va primera porque es la especialidad,
 * no un servicio más de la lista.
 *
 * Los precios de entrada están alineados con la sección de planes: nada por
 * debajo de US$550 en pago único, con el plan mensual como alternativa.
 */
export const services: Service[] = [
  {
    id: "tienda-whatsapp",
    title: "Tienda Online → WhatsApp",
    titleEn: "Online Store → WhatsApp",
    description:
      "Tu inventario completo en un enlace que puedes poner en tu bio de Instagram. El cliente elige, y el pedido te llega a WhatsApp listo, con producto, cantidad y precio. Sin comisiones por venta, sin pasarelas que te descuenten.",
    deliveryTime: "72 horas",
    deliveryTimeEn: "72 hours",
    startingPrice: 550,
    priceLabel: "Desde US$550 o US$45/mes",
    priceLabelEn: "From US$550 or US$45/mo",
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
    titleEn: "Conversion Landing Page",
    description:
      "Una sola página diseñada para convertir visitas en clientes. Ideal para lanzar un producto, capturar leads o validar tu idea rápidamente.",
    deliveryTime: "72 horas",
    deliveryTimeEn: "72 hours",
    startingPrice: 550,
    priceLabel: "Desde US$550 o US$45/mes",
    priceLabelEn: "From US$550 or US$45/mo",
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
    titleEn: "Services & Booking Website",
    description:
      "Para consultores, salones, clínicas o cualquier negocio que agenda. Presenta tus servicios, capta clientes y automatiza las reservas.",
    deliveryTime: "5–7 días",
    deliveryTimeEn: "5–7 days",
    startingPrice: 550,
    priceLabel: "Desde US$550 o US$45/mes",
    priceLabelEn: "From US$550 or US$45/mo",
    tags: ["Servicios", "Reservas", "Automatización"],
    features: [
      "Página de servicios con precios",
      "Sistema de reservas o citas",
      "Integración con WhatsApp o calendario",
      "Galería de trabajos o testimonios",
      "Formulario de contacto",
    ],
  },
  {
    id: "ecommerce",
    title: "E-commerce Completo",
    titleEn: "Full E-commerce",
    description:
      "Tienda profesional con pasarela de pago, gestión de inventario, panel de administración y experiencia de compra optimizada para conversión.",
    deliveryTime: "2–3 semanas",
    deliveryTimeEn: "2–3 weeks",
    startingPrice: 600,
    priceLabel: "Desde US$600",
    priceLabelEn: "From US$600",
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
    id: "sistema-medida",
    title: "Sistema a Medida",
    titleEn: "Custom System",
    description:
      "Plataformas, portales, dashboards o cualquier lógica de negocio personalizada. Si lo puedes describir, lo podemos construir.",
    deliveryTime: "Según alcance",
    deliveryTimeEn: "Scope-based",
    startingPrice: 800,
    priceLabel: "Desde US$800",
    priceLabelEn: "From US$800",
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
