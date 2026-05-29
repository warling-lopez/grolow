


type Service = {
  id: string;
  title: string;
  description: string;
  deliveryTime: string;
  startingPrice: number;
  priceLabel: string;
  tags: string[];
  features: string[];
  highlight?: boolean;
};

export const services: Service[] = [
  {
    id: "landing",
    title: "Landing Page de Conversión",
    description:
      "Una sola página diseñada para convertir visitas en clientes. Ideal para lanzar un producto, capturar leads o validar tu idea rápidamente.",
    deliveryTime: "72 horas",
    startingPrice: 200,
    priceLabel: "Desde $200",
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
    id: "tienda-whatsapp",
    title: "Tienda Online → WhatsApp",
    description:
      "Tu catálogo en la web, los pedidos directo a tu WhatsApp. Sin comisiones de terceros, sin pasarelas que te cobren por venta. Tú controlas todo.",
    deliveryTime: "72 horas",
    startingPrice: 350,
    priceLabel: "Desde $350",
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
    id: "servicios-citas",
    title: "Web de Servicios y Citas",
    description:
      "Para consultores, salones, clínicas o cualquier negocio que agenda. Presenta tus servicios, capta clientes y automatiza las reservas.",
    deliveryTime: "5–7 días",
    startingPrice: 300,
    priceLabel: "Desde $300",
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
    description:
      "Tienda profesional con pasarela de pago, gestión de inventario, panel de administración y experiencia de compra optimizada para conversión.",
    deliveryTime: "2–3 semanas",
    startingPrice: 600,
    priceLabel: "Desde $600",
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
    description:
      "Plataformas, portales, dashboards o cualquier lógica de negocio personalizada. Si lo puedes describir, lo podemos construir.",
    deliveryTime: "Según alcance",
    startingPrice: 800,
    priceLabel: "Desde $800",
    tags: ["Plataforma", "Dashboard", "A medida"],
    features: [
      "Arquitectura y base de datos a medida",
      "Autenticación y roles de usuario",
      "Integraciones con APIs externas",
      "Panel de administración personalizado",
      "Soporte y mantenimiento post-entrega",
    ],
  },
];