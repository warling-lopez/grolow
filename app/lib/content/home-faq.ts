/**
 * El FAQ de la portada.
 *
 * Vive aquí y no dentro de `FaqSection` porque el mismo contenido alimenta dos
 * consumidores: el componente que lo pinta y el `FAQPage` en JSON-LD que se
 * emite en el servidor. Si se duplicara, tarde o temprano el texto marcado y el
 * texto visible dejarían de coincidir, que es exactamente lo que Google trata
 * como datos estructurados engañosos.
 */

export type Faq = { q: string; a: string };

export const HOME_FAQ_EN: Faq[] = [
  {
    q: "How much does a project cost?",
    a: "You can start with the monthly plan: US$150 setup and US$45 a month, with domain, hosting and all changes included. If you'd rather pay it all at once, plans start at US$550. Before you decide anything, we'll tell you exactly what you need and how much it costs, for free."
  },
  {
    q: "What happens if I need changes after delivery?",
    a: "The first 15 days include adjustments at no cost. After that, on the monthly plan you message us on WhatsApp and we make the change; on the one-time plan, each change is quoted separately."
  },
  {
    q: "Do you use WordPress or visual builders?",
    a: "No. We build everything in custom code (usually React, though it depends on the platform and the project's needs) to guarantee speed, security and performance that builders can't match. Your site loads in under 1 second."
  },
  {
    q: "Can the site be edited once it's delivered?",
    a: "Yes. We deliver a system with the structure needed to make the content 100% editable and restructurable."
  },
  {
    q: "What do I need to get started?",
    a: "Photos of your products and a sense of what you want to achieve. If you don't have a logo or defined colors yet, that's not a problem — we sort it out on the first call."
  },
  {
    q: "Do you use templates, or is the design custom?",
    a: "Everything we build is custom — from the architecture to the development. Every project is unique, focused on functional systems and built to reach the brand's goals."
  },
  {
    q: "What kind of brands/businesses do you work with?",
    a: "Mostly businesses that sell through Instagram and WhatsApp and can no longer keep up sending photos one by one: perfume shops, clothing, food, distributors. If you sell through chat and lose orders, this is exactly for you."
  },
  {
    q: "What if my business is small?",
    a: "Most of our clients are. That's why the monthly plan exists: US$45 a month is less than what many spend in a single day of ads, and this works all 30 days."
  },
  {
    q: "Is the site mine?",
    a: "The content and your brand are always yours. On the monthly plan we maintain the domain and hosting while the plan is active; if you ever want to take it all with you, we can coordinate the handoff."
  },
  {
    q: "What services do you offer?",
    a: "At Grolow we offer: full-stack web design and development, mobile apps, software architecture and custom system development."
  }
];

export const HOME_FAQ_ES: Faq[] = [
  {
    q: "¿Cuánto cuesta un proyecto?",
    a: "Puedes empezar con el plan mensual: US$150 de setup y US$45 al mes, con dominio, hosting y todos los cambios incluidos. Si prefieres pagarlo de una vez, desde US$550. Antes de que decidas nada te decimos exactamente qué necesitas y cuánto cuesta, gratis."
  },
  {
    q: "¿Qué pasa si necesito cambios después de la entrega?",
    a: "Los primeros 15 días incluyen ajustes sin costo. Después, con el plan mensual nos escribes por WhatsApp y nosotros hacemos el cambio; si vas por pago único, cotizamos cada cambio aparte."
  },
  {
    q: "¿Usan WordPress o constructores visuales?",
    a: "No. Desarrollamos todo en código propio (React generalmente, pero depende la plataforma a desarrollar y las necesidades del proyecto) para garantizar velocidad, seguridad y un rendimiento que los constructores no pueden igualar. Tu web carga en menos de 1 segundo."
  },
  {
    q: "¿Se puede editar la web una vez entregada?",
    a: "Sí. Entregamos un sistema con la estructura necesaria para que el contenido sea 100% editable y restructurable."
  },
  {
    q: "¿Qué necesito para poder empezar?",
    a: "Fotos de tus productos y saber qué quieres lograr. Si no tienes logo ni colores definidos, no es un problema — lo resolvemos en la primera llamada."
  },
  {
    q: "¿Utilizan plantillas o los diseños son a medida?",
    a: "Todo lo que realizamos es a medida. Desde la arquitectura hasta el desarrollo. Cada proyecto es único, enfocado en sistemas funcionales y pensado para llegar a los objetivos de la marca."
  },
  {
    q: "¿Con qué tipo de marcas/negocios trabajan?",
    a: "Sobre todo con negocios que venden por Instagram y WhatsApp y ya no dan abasto mandando fotos una por una: perfumerías, ropa, comida, distribuidoras. Si vendes por chat y pierdes pedidos, es exactamente para ti."
  },
  {
    q: "¿Y si mi negocio es pequeño?",
    a: "La mayoría de nuestros clientes lo son. Por eso existe el plan mensual: US$45 al mes es menos de lo que muchos gastan en un solo día de anuncios, y esto trabaja los 30 días."
  },
  {
    q: "¿La web es mía?",
    a: "El contenido y tu marca son tuyos siempre. En el plan mensual nosotros mantenemos el dominio y el hosting mientras el plan esté activo; si algún día quieres llevártelo todo, se puede coordinar el traspaso."
  },
  {
    q: "¿Qué servicios ofrecen?",
    a: "En Grolow ofrecemos: Diseño y desarrollo web full-stack, aplicaciones móviles, arquitectura de software y desarrollo de sistemas a medida."
  }
];
