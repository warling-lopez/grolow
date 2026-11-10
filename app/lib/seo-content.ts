import type { Lang, RouteId } from "@/app/lib/i18n";

/**
 * Title y description por ruta e idioma.
 *
 * Reglas que verifica `npm run seo:check` contra el HTML servido:
 *  - title entre 50 y 60 caracteres
 *  - description entre 140 y 160 caracteres
 *  - ambos únicos en todo el sitio
 *
 * Sin `keywords`: Google la ignora desde 2009 y Bing la trata como señal de
 * spam. La etiqueta se eliminó del sitio por completo.
 */
export type SeoEntry = { title: string; description: string };

type SeoTable = Partial<Record<Lang, SeoEntry>>;

export const SEO: Record<RouteId, SeoTable> = {
  home: {
    es: {
      title: "Estudio de diseño y desarrollo web a medida | Grolow",
      description:
        "Estudio de desarrollo web en Santo Domingo. Programamos en código propio, sin WordPress ni plantillas, para empresas, consultoras y creadores.",
    },
    en: {
      title: "Custom Web Design and Development in the DR | Grolow",
      description:
        "Web development studio in Santo Domingo, Dominican Republic. We write custom code, no WordPress and no templates, for companies and consultants.",
    },
  },

  servicios: {
    es: {
      title: "Servicios de diseño y desarrollo web a medida | Grolow",
      description:
        "Sitios a medida, tiendas con pedidos por WhatsApp, landings de conversión y sistemas internos. Programados desde cero, no montados sobre plantillas.",
    },
    en: {
      title: "Web Development and Design Services in the DR | Grolow",
      description:
        "Custom sites, WhatsApp ordering stores, conversion landing pages and internal systems. Written from scratch, not assembled on top of a template.",
    },
  },

  desarrolloWeb: {
    es: {
      title: "Desarrollo web a medida en República Dominicana | Grolow",
      description:
        "Escribimos el código de tu sitio en vez de montarlo sobre una plantilla. Más rápido, más seguro y sin los límites de lo que un tema comprado permita.",
    },
    en: {
      title: "Custom Web Development in the Dominican Republic | Grolow",
      description:
        "We write your site's code instead of assembling it on a template. Faster, safer, and without the limits of whatever a purchased theme happens to allow.",
    },
  },

  disenoWeb: {
    es: {
      title: "Diseño web en Santo Domingo — Estudio a medida | Grolow",
      description:
        "Estudio de diseño web en Santo Domingo. Diseñamos y programamos nosotros mismos, así que lo que apruebas es exactamente lo que termina publicado.",
    },
    en: {
      title: "Web Design in Santo Domingo — Custom Studio | Grolow",
      description:
        "Web design studio in Santo Domingo. We design and code it ourselves, so what you approve is exactly what gets published, with nothing trimmed to fit.",
    },
  },

  software: {
    es: {
      title: "Software a medida y sistemas internos en RD | Grolow",
      description:
        "Paneles internos, reservas, inventario e integraciones para negocios que ya crecieron por encima de lo que aguanta una hoja de cálculo compartida.",
    },
    en: {
      title: "Custom Software and Internal Systems in the DR | Grolow",
      description:
        "Internal dashboards, bookings, inventory and integrations for businesses that have outgrown what a shared spreadsheet can reasonably hold together.",
    },
  },

  tiendaWhatsapp: {
    es: {
      title: "Tienda en línea con pedidos directo a WhatsApp | Grolow",
      description:
        "Tu catálogo completo en un enlace para la bio de Instagram. El cliente elige y el pedido llega armado a tu WhatsApp. Sin comisiones por venta.",
    },
    en: {
      title: "Online Store with WhatsApp Ordering in the DR | Grolow",
      description:
        "Your full catalog in one link for your Instagram bio. Customers pick, and the order arrives on your WhatsApp already assembled. No sales commission.",
    },
  },

  apps: {
    es: {
      title: "Desarrollo de aplicaciones móviles a medida | Grolow",
      description:
        "Apps para Android y iPhone desde una sola base de código. Antes de cotizarla te decimos si de verdad la necesitas o si una web te resuelve lo mismo.",
    },
    en: {
      title: "Mobile App Development in the Dominican Republic | Grolow",
      description:
        "Apps for Android and iPhone from a single codebase. Before quoting we tell you whether you really need one, or whether mobile web solves the same thing.",
    },
  },

  empresas: {
    es: {
      title: "Páginas web para empresas en República Dominicana | Grolow",
      description:
        "Sitios para empresas con operación y equipo, cuyo sitio actual se quedó atrás. Una página por línea de negocio y contacto que llega a quien debe.",
    },
    en: {
      title: "Websites for Mid-Sized Companies in the DR | Grolow",
      description:
        "Sites for companies with a real operation whose current site has fallen behind. One page per line of business, and contact that reaches the right person.",
    },
  },

  consultores: {
    es: {
      title: "Páginas web para consultores y consultoras | Grolow",
      description:
        "Sitios para quien vende criterio: abogados, contadores, coaches y asesores. Una página por problema que resuelves, no por servicio que ofreces.",
    },
    en: {
      title: "Websites for Consultants and Professionals | Grolow",
      description:
        "Sites for people who sell judgment: lawyers, accountants, coaches and advisors. One page per problem you solve, not per service you happen to offer.",
    },
  },

  creadores: {
    es: {
      title: "Páginas web para creadores que ya monetizan | Grolow",
      description:
        "Para creadores con cursos, membresías o productos digitales. Cuando el dinero ya pasa por tu enlace en bio, esa herramienta se te queda corta.",
    },
    en: {
      title: "Websites for Content Creators Who Monetize | Grolow",
      description:
        "For creators with courses, memberships or digital products. Once money flows through your link in bio, that tool starts costing you more than it saves.",
    },
  },

  precios: {
    es: {
      title: "Cuánto cuesta una página web en RD | Precios Grolow",
      description:
        "Los rangos reales del mercado dominicano y lo que cobramos nosotros, con las señales de alerta que conviene mirar antes de comparar cotizaciones.",
    },
    en: {
      title: "What a Website Costs in the Dominican Republic | Grolow",
      description:
        "The real ranges in the Dominican market and what we charge, plus the warning signs worth checking before you compare quotes from anyone else.",
    },
  },

  casos: {
    es: {
      title: "Casos de éxito — Proyectos web reales en RD | Grolow",
      description:
        "Tres proyectos en línea que puedes abrir y revisar. Con qué llegó el cliente, qué construimos y qué cambió. Sin porcentajes que nadie ha medido.",
    },
    en: {
      title: "Case Studies — Real Web Projects in the DR | Grolow",
      description:
        "Three live projects you can open and inspect. What the client arrived with, what we built and what changed. No percentages nobody actually measured.",
    },
  },

  casoLaperfum: {
    es: {
      title: "La Perfurm RD — Tienda en línea con WhatsApp | Grolow",
      description:
        "Cómo pasó de un catálogo de perfumes repartido entre publicaciones y conversaciones a un solo enlace con los pedidos llegando ya armados a WhatsApp.",
    },
    en: {
      title: "La Perfurm RD — Online Store with WhatsApp | Grolow",
      description:
        "How a perfume catalog scattered across posts and conversations became a single link, with orders arriving on WhatsApp already put together and priced.",
    },
  },

  casoHellens: {
    es: {
      title: "Hellen's Cute Kids — Landing de conversión | Grolow",
      description:
        "Una red de distribuidoras de ropa infantil sin forma de repartir clientes. Hoy cada visitante llega solo a la distribuidora que le toca por zona.",
    },
    en: {
      title: "Hellen's Cute Kids — Zone-Based Landing Page | Grolow",
      description:
        "A children's clothing distributor network with no way to route customers. Today every visitor reaches the distributor for their zone automatically.",
    },
  },

  casoWarling: {
    es: {
      title: "Warling Dev — Sitio profesional de servicios | Grolow",
      description:
        "Un sitio que carga en menos de dos segundos y explica servicios y proceso, para dejar de repetir lo mismo en cada conversación con un cliente nuevo.",
    },
    en: {
      title: "Warling Dev — A Professional Services Site | Grolow",
      description:
        "A site that loads in under two seconds and explains services and process, so the same things stop being repeated in every conversation with a client.",
    },
  },

  contacto: {
    es: {
      title: "Contacto — Solicita tu propuesta sin costo | Grolow",
      description:
        "Cuéntanos qué necesitas y te devolvemos alcance, inversión y fecha en menos de 24 horas. Si no somos la opción correcta, también te lo decimos.",
    },
    en: {
      title: "Contact — Request a Free Project Proposal | Grolow",
      description:
        "Tell us what you need and we'll send back scope, investment and a date within 24 hours. If we're not the right fit, we'll tell you that as well.",
    },
  },

  blog: {
    es: {
      title: "Blog sobre desarrollo web en Rep. Dominicana | Grolow",
      description:
        "Artículos sobre las decisiones previas a contratar: cuánto cuesta un sitio de verdad, qué tecnología conviene y cómo leer una cotización sin dudas.",
    },    en: {
      title: "Web Development Blog from the Dominican Republic | Grolow",
      description:
        "Articles on the decisions before you hire anyone: what a website really costs, which technology fits and how to read a quote, plus keeping your site secure.",
    },
  },

  blogPrecios: {
    es: {
      title: "¿Cuánto cuesta una página web en RD en 2026? | Grolow",
      description:
        "Los rangos reales del mercado dominicano, qué compra cada uno, los costos que no salen en la cotización y las señales de alerta al comparar propuestas.",
    },    en: {
      title: "How Much Does a Website Cost in the DR in 2026? | Grolow",
      description:
        "The real price ranges in the Dominican market, what each one buys, the costs missing from quotes and the warning signs when you compare web proposals.",
    },
  },

  blogWordpress: {
    es: {
      title: "WordPress o código a medida: cuál te conviene | Grolow",
      description:
        "Comparación honesta, con declaración de interés incluida: cuándo WordPress es la decisión correcta y cuándo el desarrollo a medida se justifica de verdad.",
    },    en: {
      title: "WordPress or Custom Code: Which One Suits You | Grolow",
      description:
        "An honest comparison, conflict of interest disclosed: when WordPress is the right decision and when custom development is actually worth the extra cost.",
    },
  },

  blogPhp2shell: {
    es: {
      title: "PHP2Shell: qué pasó con PHP en octubre de 2026 | Grolow",
      description:
        "Los fallos CVE-2026-109618 y CVE-2026-109619 explicados sin jerga: cómo se descubrieron, por qué se apagaron sitios en Europa y qué sigue sin estar claro.",
    },    en: {
      title: "PHP2Shell: What Happened to PHP in October 2026 | Grolow",
      description:
        "CVE-2026-109618 and CVE-2026-109619 explained without jargon: how they were found, why sites in Europe went offline and what is still not clear today.",
    },
  },

  blogPhpRevisar: {
    es: {
      title: "Cómo saber si tu sitio PHP es vulnerable a PHP2Shell",
      description:
        "Guía práctica para revisar tu versión de PHP en cPanel o en tu servidor, aplicar la corrección, mitigar si no puedes actualizar y detectar si alguien entró.",
    },    en: {
      title: "How to Tell If Your PHP Site Is Vulnerable to PHP2Shell",
      description:
        "A practical guide to check your PHP version in cPanel or on your server, apply the fix, mitigate if you can't update yet and find out if someone got in.",
    },
  },

  blogNginx: {
    es: {
      title: "Los 5 fallos de Nginx de octubre de 2026 explicados | Grolow",
      description:
        "Qué configuraciones activan cada una de los cinco fallos corregidos en Nginx 1.30.6 y 1.31.7, cómo auditar la tuya y qué hacer si no puedes actualizar.",
    },    en: {
      title: "The 5 Nginx Flaws of October 2026, Explained | Grolow",
      description:
        "Which configurations trigger each of the five flaws fixed in Nginx 1.30.6 and 1.31.7, how to audit your own setup and what to do if you can't update yet.",
    },
  },

  blogEmudhra: {
    es: {
      title: "eMudhra: la certificadora con claves adivinables | Grolow",
      description:
        "Ocho certificados intermedios de eMudhra tenían claves privadas menores que 256. Qué pasó, cómo respondieron los navegadores y por qué te importa a ti también.",
    },    en: {
      title: "eMudhra: The Certificate Authority With Weak Keys | Grolow",
      description:
        "Eight eMudhra intermediate certificates had private keys smaller than 256. What happened, how the browsers responded and why it matters to you as well.",
    },
  },

  blogCertificados: {
    es: {
      title: "Certificados SSL: qué revisar tras el caso eMudhra | Grolow",
      description:
        "Los navegadores ya se protegieron, tus servidores quizás no. Qué almacenes de certificados actualizar en Linux, Node, Python, PHP y Docker, y cómo comprobarlo.",
    },    en: {
      title: "SSL Certificates: What to Check After eMudhra | Grolow",
      description:
        "Browsers already protected themselves, your servers may not have. Which certificate stores to update in Linux, Node, Python, PHP and Docker, and how.",
    },
  },

  blogPhpObsoleto: {
    es: {
      title: "Tu sitio sigue en PHP 7.4, 8.0 u 8.1: qué hacer | Grolow",
      description:
        "Sin corrección oficial de PHP2Shell para versiones sin soporte. Tus opciones, de migrar a PHP 8.3 a pagar soporte extendido, y cómo hacerlo sin romper el sitio.",
    },    en: {
      title: "Still on PHP 7.4, 8.0 or 8.1? What to Do Now | Grolow",
      description:
        "No official PHP2Shell fix for unsupported versions. Your options, from moving to PHP 8.3 to paying for extended support, and how to do it without breaking.",
    },
  },

  blogSemanaNegra: {
    es: {
      title: "La semana negra de los servidores web en 2026 | Grolow",
      description:
        "Nginx, PHP2Shell y eMudhra en diez días de octubre de 2026: lo que tienen en común, el papel de la IA y cinco decisiones para que la próxima te pille preparado.",
    },    en: {
      title: "The Black Week of Web Servers in October 2026 | Grolow",
      description:
        "Nginx, PHP2Shell and eMudhra in ten days of October 2026: what they have in common, the role of AI and five decisions so the next one finds you prepared.",
    },
  },

  blogPhpRd: {
    es: {
      title: "Cómo afectó PHP2Shell a República Dominicana | Grolow",
      description:
        "Lo que se sabe del impacto de la vulnerabilidad de PHP en el país, el contexto del CNCS, por qué el mercado local está expuesto y qué hacer esta misma semana.",
    },    en: {
      title: "How PHP2Shell Affected the Dominican Republic | Grolow",
      description:
        "What is known about the PHP flaw's impact in the country, the CNCS context, why the local market is exposed and what to do about it during this very week.",
    },
  },

  blogCertificadosRd: {
    es: {
      title: "Certificados digitales en RD: lecciones de eMudhra | Grolow",
      description:
        "Certificado SSL y firma digital no son lo mismo. Quién los emite en RD, qué enseña el caso eMudhra y cómo cuidar tu certificado de facturación.",
    },    en: {
      title: "Digital Certificates in the DR: eMudhra Lessons | Grolow",
      description:
        "An SSL certificate and a digital signature are not the same. Who issues them in the DR, what the eMudhra case teaches and how to protect your e-invoicing.",
    },
  },

  blogLeyRd: {
    es: {
      title: "Qué dice la ley dominicana si hackean tu sitio web | Grolow",
      description:
        "Ley 53-07, Ley 172-13 y los decretos de ciberseguridad: qué obliga a cada empresa en República Dominicana, a quién reportar y qué hacer ante un incidente.",
    },    en: {
      title: "What Dominican Law Says If Your Website Is Hacked | Grolow",
      description:
        "Law 53-07, Law 172-13 and the cybersecurity decrees: what each company in the Dominican Republic must do, whom to report to and how to handle an incident.",
    },
  },

  blogQueEsGrolow: {
    es: {
      title: "Qué es Grolow: empresa de software en Santo Domingo",
      description:
        "Grolow es una empresa de software de República Dominicana que construye el sistema de tu negocio y lo mantiene. Qué hace, qué no hace y cómo contactarla.",
    },
    en: {
      title: "What Is Grolow: a Software Company in Santo Domingo",
      description:
        "Grolow is a Dominican software company that builds your business's system and keeps it running. What it does, what it doesn't and how to get in touch.",
    },
  },

  blogQuienEsGrolow: {
    es: {
      title: "Quién está detrás de Grolow y cómo trabaja | Grolow",
      description:
        "Warling López fundó Grolow en 2025. Quién programa, quién atiende el soporte y qué pasa con tu proyecto si una persona cambia, sin cifras infladas.",
    },
    en: {
      title: "Who Is Behind Grolow and How the Work Is Split | Grolow",
      description:
        "Warling López founded Grolow in 2025. Who writes the code, who handles support and what happens to your project if a person changes, with no inflated numbers.",
    },
  },

  blogMensualidad: {
    es: {
      title: "Qué cubre la mensualidad de Grolow, punto por punto",
      description:
        "Servidores, dominio, respaldos diarios, seguridad y cambios: qué incluye la mensualidad de Grolow, qué no, cuánto cuesta y cómo se cancela sin penalidad.",
    },
    en: {
      title: "What the Grolow Monthly Fee Covers, Point by Point",
      description:
        "Servers, domain, daily backups, security and changes: what the Grolow monthly fee includes, what it does not, what it costs and how to cancel without penalty.",
    },
  },

  blogPropiedad: {
    es: {
      title: "De quién es tu dominio, tu código y tus datos | Grolow",
      description:
        "Con Grolow el dominio, el código y los datos son tuyos. Activo por activo, qué significa y qué te entregan en 10 días hábiles si decides irte, sin costo.",
    },
    en: {
      title: "Who Owns Your Domain, Your Code and Your Data | Grolow",
      description:
        "With Grolow the domain, the code and the data are yours. Asset by asset, what that means and what you get within 10 business days if you leave, at no cost.",
    },
  },

  blogLoQueNoHace: {
    es: {
      title: "Lo que Grolow no hace, y a quién buscar en cada caso",
      description:
        "Grolow no hace branding, marketing, redes sociales ni tiendas en WooCommerce o Shopify. Para cada caso, qué tipo de proveedor sí te conviene contratar.",
    },
    en: {
      title: "What Grolow Doesn't Do, and Who to Look For Instead",
      description:
        "Grolow doesn't do branding, marketing, social media or WooCommerce and Shopify stores. For each case, the kind of provider that is a better fit for you.",
    },
  },

  blogCatalogoTienda: {
    es: {
      title: "Catálogo digital o tienda online: qué necesitas en RD",
      description:
        "Cuándo te basta una herramienta gratis, cuándo conviene un catálogo con pedidos por WhatsApp y cuándo una tienda con pago en línea en República Dominicana.",
    },
    en: {
      title: "Digital Catalogue or Online Store: What You Need in the DR",
      description:
        "When a free tool is enough, when your own catalogue with WhatsApp orders makes sense and when you need a store with online payment in the Dominican Republic.",
    },
  },

  blogPagosRd: {
    es: {
      title: "Cómo cobrar con tarjeta en tu página web en RD | Grolow",
      description:
        "Azul, CardNet, enlaces de pago y PayPal: qué piden para cobrar con tarjeta en tu página web en República Dominicana, qué no te dicen y cómo elegir la opción.",
    },
    en: {
      title: "How to Accept Card Payments Online in the DR | Grolow",
      description:
        "Azul, CardNet, payment links and PayPal: what you need to take card payments on your website in the Dominican Republic, what they do not say and how to choose.",
    },
  },

  blogSistemaMedida: {
    es: {
      title: "Excel, software listo o sistema a medida: cómo decidir",
      description:
        "Cuándo basta la hoja de cálculo, cuándo conviene un software listo como Alegra y cuándo un sistema a medida, y cómo se calcula cuánto cuesta en RD.",
    },
    en: {
      title: "Spreadsheet, Off-the-Shelf or Custom Software: How to Choose",
      description:
        "When a spreadsheet is enough, when off-the-shelf software like Alegra fits and when a custom system pays off, plus how its cost is calculated in the DR.",
    },
  },

  blogAntesDeContratar: {
    es: {
      title: "Qué preguntar antes de contratar una página web en RD",
      description:
        "Las preguntas que separan a un buen proveedor web de uno problemático: dominio, mantenimiento, reseñas, contrato y salida, con las respuestas de Grolow.",
    },
    en: {
      title: "Questions to Ask Before Hiring a Web Developer in the DR",
      description:
        "The questions that separate a good web provider from a problematic one: domain, maintenance, reviews, contract and exit, with Grolow's answer to each.",
    },
  },

  blogNoApareceGoogle: {
    es: {
      title: "Por qué tu negocio no aparece en Google y qué hacer | Grolow",
      description:
        "El mapa y los resultados son dos sistemas. Las causas más comunes, cómo comprobarlas en una tarde con Search Console y por qué Google no reconoce tu marca.",
    },
    en: {
      title: "Why Your Business Doesn't Show Up on Google | Grolow",
      description:
        "The map and the results are two systems. The most common causes, how to check them in an afternoon with Search Console and why Google misses your brand.",
    },
  },

  // ── Legales ────────────────────────────────────────────────────────────
  privacidad: {
    es: {
      title: "Política de privacidad de Grolow: qué datos usamos",
      description:
        "Qué datos recogemos en grolow.com y en nuestros servicios, para qué los usamos, con qué proveedores se comparten y cómo pedir que los borremos.",
    },
    en: {
      title: "Grolow privacy policy: what data we collect and why",
      description:
        "What data we collect on grolow.com and through our services, what we use it for, which providers process it and how to ask us to delete it all.",
    },
  },


  cookies: {
    es: {
      title: "Política de cookies de Grolow: cuáles usamos y por qué",
      description:
        "Qué cookies usa grolow.com, para qué sirven y cómo desactivarlas desde tu navegador. Solo analítica: sin cookies publicitarias ni de remarketing.",
    },
    en: {
      title: "Grolow cookie policy: which cookies we use and why",
      description:
        "Which cookies grolow.com uses, what they do and how to turn them off in your browser. Analytics only: no advertising or remarketing cookies at all.",
    },
  },


  terminos: {
    es: {
      title: "Términos y condiciones para contratar a Grolow (RD)",
      description:
        "Cómo se contrata a Grolow: cotizaciones, pagos 50/50, plazos, revisiones, garantía de 90 días, propiedad del trabajo, terminación y ley aplicable.",
    },
    en: {
      title: "Grolow terms and conditions for hiring our services",
      description:
        "How hiring Grolow works: quotes, 50/50 payments, timelines, revisions, 90-day warranty, ownership of the work, termination and governing law.",
    },
  },


  propiedad: {
    es: {
      title: "Propiedad de tu código, tu dominio y tus datos | Grolow",
      description:
        "Tu dominio va a tu nombre y tu código y tu base de datos son tuyos. Grolow los opera, y si decides irte te llevas todo en 10 días hábiles, sin costo.",
    },
    en: {
      title: "Who owns your code, your domain and your data | Grolow",
      description:
        "Your domain is in your name, and your code and database are yours. Grolow runs them, and if you decide to leave you take everything within 10 days, free.",
    },
  },


  soporte: {
    es: {
      title: "Soporte, mantenimiento y tiempos de respuesta | Grolow",
      description:
        "Qué cubre la mensualidad de Grolow, tiempos de respuesta por gravedad, disponibilidad del 99.5%, respaldos diarios y cómo cancelar sin penalidad.",
    },
    en: {
      title: "Grolow support, maintenance and response time policy",
      description:
        "What Grolow's monthly plan covers, response times by severity, a 99.5% availability target, daily backups and how to cancel with no penalty at all.",
    },
  },


  reembolsos: {
    es: {
      title: "Política de reembolsos y cancelación de Grolow (RD)",
      description:
        "Qué pasa con tu pago si cancelas un proyecto o una mensualidad con Grolow: reembolsos, entrega del trabajo hecho y cancelación sin permanencia.",
    },
    en: {
      title: "Grolow refund and cancellation policy for our clients",
      description:
        "What happens to your payment if you cancel a project or monthly plan with Grolow: refunds, handover of the work done and cancelling with no lock-in.",
    },
  },


  clinicas: {
    es: {
      title: "Webs para clínicas con citas en línea | Grolow",
      description:
        "Tus pacientes agendan solos, a cualquier hora, sin ocupar a tu recepcionista. Recordatorios automáticos para que no falten a la cita.",
    },
  },

  blackFriday: {
    es: {
      title: "Black Friday Grolow: 15% en tu catálogo o tienda online",
      description:
        "Todo noviembre: 15% de descuento en catálogos digitales y tiendas online hechos desde cero, con el dominio de regalo. Deja tus datos y te mostramos cómo quedaría el tuyo.",
    },
    en: {
      title: "Grolow Black Friday: 15% off your online catalog or store",
      description:
        "All November: 15% off custom-built online catalogs and online stores, with your domain as a gift. Leave your details and see how yours would look.",
    },
  },

  gracias: {
    es: {
      title: "Solicitud recibida | Grolow",
      description:
        "Recibimos tu solicitud. Te contactamos en menos de 24 horas con una propuesta clara: alcance, inversión y tiempos de entrega.",
    },
    en: {
      title: "Request received | Grolow",
      description:
        "We got your request. We will reach out within 24 hours with a clear proposal: scope, investment and delivery timeline.",
    },
  },
};

export function seoFor(id: RouteId, lang: Lang): SeoEntry | null {
  return SEO[id][lang] ?? null;
}
