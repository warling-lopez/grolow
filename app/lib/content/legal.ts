import type { ContentTable } from "./types";

/**
 * Páginas legales: privacidad, cookies y términos.
 *
 * Basadas en el paquete legal de Grolow (versión 2, sep. 2026), dejando fuera
 * todo lo que es de uso interno (credenciales, freelancers, acuerdos con
 * clientes concretos). Las otras tres políticas públicas (propiedad, soporte y
 * reembolsos) viven en `legal-servicio.ts`.
 *
 * Lo que se dice sobre el tratamiento de datos del sitio es real y verificable
 * en el código: Google Analytics en el layout, Gmail vía nodemailer en
 * `app/api/contact/route.ts` y Vercel como alojamiento.
 *
 * No incluye cédula ni dirección personal a propósito: es información que
 * va en el contrato firmado, no en una página pública.
 *
 * Es una base estándar, no asesoría legal: conviene que la revise un abogado.
 */

export const UPDATED_ES = "Última actualización: 1 de noviembre de 2026.";
export const UPDATED_EN = "Last updated: 1 November 2026.";

export const CONTACT_EMAIL = "grolow.web@gmail.com";

export const privacidadContent: ContentTable = {
  es: {
    eyebrow: "Legal",
    h1: "Política de privacidad",
    lead: [
      "Esta política explica qué datos personales recogemos, para qué los usamos, con quién se comparten y cómo puedes pedirnos que los corrijamos o eliminemos. Aplica a grolow.com y a los servicios que prestamos.",
      UPDATED_ES,
    ],
    sections: [
      {
        h2: "Quién es responsable de tus datos",
        body: [
          "Grolow Studio, estudio de diseño y desarrollo de software con sede en Santo Domingo, República Dominicana, representado por Warling Sebastián López Genao.",
          `Para cualquier asunto relacionado con tus datos personales escríbenos a ${CONTACT_EMAIL} o por WhatsApp al +1 (829) 994-6354.`,
        ],
      },
      {
        h2: "Qué datos recogemos",
        bullets: [
          {
            title: "Los que tú nos das",
            text: "Nombre, correo, teléfono, nombre de tu negocio y lo que nos cuentes en el formulario de contacto o por WhatsApp.",
          },
          {
            title: "Datos de uso del sitio",
            text: "Páginas visitadas, tiempo en el sitio, tipo de dispositivo y navegador, país aproximado y los clics hacia WhatsApp. Se recogen con herramientas de analítica.",
          },
          {
            title: "Registros técnicos",
            text: "Nuestro proveedor de alojamiento guarda la dirección IP y la hora de cada petición, por seguridad y para diagnosticar fallos.",
          },
        ],
      },
      {
        h2: "Para qué los usamos",
        body: [
          "Para responder tu solicitud, preparar cotizaciones, prestar los servicios que contrates y facturarlos. Y, solo si nos lo autorizas, para enviarte información sobre servicios de Grolow.",
          "No usamos tus datos para ningún otro fin.",
        ],
      },
      {
        h2: "Con quién los compartimos",
        body: [
          "No vendemos ni cedemos datos personales a terceros con fines comerciales. Solo los procesan los proveedores que necesitamos para operar:",
        ],
        bullets: [
          {
            title: "Alojamiento y base de datos",
            text: "Vercel aloja los sitios y Supabase guarda las bases de datos de los sistemas que desarrollamos.",
          },
          {
            title: "Correo y analítica",
            text: "Google (Gmail / Google Workspace para el correo y Google Analytics para las estadísticas de uso).",
          },
          {
            title: "Dominios y pagos",
            text: "El registrador de dominios y las plataformas de pago que uses para pagarnos (PayPal o Stripe).",
          },
          {
            title: "WhatsApp (Meta)",
            text: "Solo si nos escribes por WhatsApp. Esa conversación se rige además por las condiciones y la política de privacidad de WhatsApp.",
          },
        ],
      },
      {
        h2: "Cuánto tiempo los guardamos",
        bullets: [
          {
            title: "Si nos consultaste pero no contrataste",
            text: "Hasta 24 meses desde el último contacto, salvo que nos pidas antes que los eliminemos.",
          },
          {
            title: "Si eres cliente",
            text: "Mientras dure la relación y 5 años más, por obligaciones fiscales y contables.",
          },
        ],
      },
      {
        h2: "Tus derechos",
        body: [
          `Puedes pedirnos en cualquier momento acceder a tus datos, corregirlos, eliminarlos u oponerte a que los tratemos. Escríbenos a ${CONTACT_EMAIL} y te respondemos en un plazo máximo de 15 días hábiles. No hace falta que expliques por qué.`,
          "Este derecho se ofrece conforme a la Ley 172-13 sobre Protección de Datos Personales de la República Dominicana.",
        ],
      },
      {
        h2: "Si eres cliente: los datos de tus usuarios",
        body: [
          "Cuando desarrollamos y operamos un sistema para tu negocio, podemos tener acceso a datos de tus propios clientes (por ejemplo, pedidos o contactos). En esa relación tú eres el responsable de esos datos y Grolow actúa solo como encargado: los usamos únicamente para prestar el servicio contratado y bajo tus instrucciones.",
          "Esos datos están protegidos con los mismos controles de seguridad descritos abajo. Si la relación termina, te los entregamos completos y eliminamos nuestras copias 30 días después.",
        ],
      },
      {
        h2: "Seguridad",
        body: [
          "Usamos cifrado HTTPS, autenticación de dos factores, un gestor de contraseñas cifrado y control de accesos.",
          "Ningún sistema es infalible. Si ocurre una filtración que afecte tus datos, te lo notificaremos dentro de las 72 horas siguientes a detectarla.",
        ],
      },
      {
        h2: "Cookies",
        body: [
          "grolow.com usa cookies de analítica. En la política de cookies explicamos cuáles son y cómo desactivarlas.",
        ],
      },
      {
        h2: "Menores de edad",
        body: [
          "Nuestros servicios se dirigen a negocios. No recogemos a sabiendas datos de menores de edad; si crees que un menor nos envió datos, escríbenos y los eliminamos.",
        ],
      },
      {
        h2: "Cambios en esta política",
        body: [
          "Si cambia la forma en que tratamos los datos, publicaremos la nueva versión en esta página con su fecha.",
        ],
      },
    ],
    related: [
      { to: "cookies", label: "Política de cookies: qué cookies usa este sitio" },
      { to: "propiedad", label: "Propiedad de tu código, tu dominio y tus datos" },
      { to: "terminos", label: "Términos y condiciones" },
    ],
    cta: {
      heading: "¿Quieres consultar o borrar tus datos?",
      text: "Escríbenos y te decimos qué datos tenemos sobre ti, o los eliminamos si es lo que prefieres.",
      label: "Escribir por WhatsApp",
      message: "Hola, quiero hacer una consulta sobre mis datos personales:",
    },
  },

  en: {
    eyebrow: "Legal",
    h1: "Privacy policy",
    lead: [
      "This policy explains what personal data we collect, what we use it for, who it is shared with and how you can ask us to correct or delete it. It applies to grolow.com and to the services we provide.",
      UPDATED_EN,
    ],
    sections: [
      {
        h2: "Who is responsible for your data",
        body: [
          "Grolow Studio, a software design and development studio based in Santo Domingo, Dominican Republic, represented by Warling Sebastián López Genao.",
          `For anything related to your personal data, write to ${CONTACT_EMAIL} or message us on WhatsApp at +1 (829) 994-6354.`,
        ],
      },
      {
        h2: "What we collect",
        bullets: [
          {
            title: "What you give us",
            text: "Name, email, phone, business name and whatever you tell us in the contact form or on WhatsApp.",
          },
          {
            title: "Site usage data",
            text: "Pages visited, time on site, device and browser type, approximate country and clicks through to WhatsApp, collected with analytics tools.",
          },
          {
            title: "Technical logs",
            text: "Our hosting provider keeps the IP address and time of each request, for security and to diagnose failures.",
          },
        ],
      },
      {
        h2: "What we use it for",
        body: [
          "To answer your request, prepare quotes, provide the services you hire and invoice them. And, only if you allow it, to send you information about Grolow's services.",
          "We use your data for nothing else.",
        ],
      },
      {
        h2: "Who we share it with",
        body: [
          "We do not sell or transfer personal data to third parties for commercial purposes. It is processed only by the providers we need to operate:",
        ],
        bullets: [
          {
            title: "Hosting and database",
            text: "Vercel hosts the sites and Supabase stores the databases of the systems we build.",
          },
          {
            title: "Email and analytics",
            text: "Google (Gmail / Google Workspace for email and Google Analytics for usage statistics).",
          },
          {
            title: "Domains and payments",
            text: "The domain registrar and the payment platforms you use to pay us (PayPal or Stripe).",
          },
          {
            title: "WhatsApp (Meta)",
            text: "Only if you message us on WhatsApp. That conversation is also governed by WhatsApp's own terms and privacy policy.",
          },
        ],
      },
      {
        h2: "How long we keep it",
        bullets: [
          {
            title: "If you asked but didn't hire us",
            text: "Up to 24 months from the last contact, unless you ask us to delete it sooner.",
          },
          {
            title: "If you are a client",
            text: "For as long as the relationship lasts and 5 years afterwards, for tax and accounting obligations.",
          },
        ],
      },
      {
        h2: "Your rights",
        body: [
          `You can ask us at any time to access, correct or delete your data, or to stop processing it. Write to ${CONTACT_EMAIL} and we will reply within 15 business days at most. You don't need to explain why.`,
          "This right is offered under Dominican Republic Law 172-13 on Personal Data Protection.",
        ],
      },
      {
        h2: "If you are a client: your users' data",
        body: [
          "When we build and operate a system for your business, we may have access to data about your own customers (orders or contacts, for example). In that relationship you are the controller of that data and Grolow acts only as a processor: we use it solely to provide the contracted service, under your instructions.",
          "That data is protected with the same security controls described below. If the relationship ends, we hand it over in full and delete our copies 30 days later.",
        ],
      },
      {
        h2: "Security",
        body: [
          "We use HTTPS encryption, two-factor authentication, an encrypted password manager and access control.",
          "No system is infallible. If a breach affects your data, we will notify you within 72 hours of detecting it.",
        ],
      },
      {
        h2: "Cookies",
        body: [
          "grolow.com uses analytics cookies. The cookie policy explains which ones and how to turn them off.",
        ],
      },
      {
        h2: "Minors",
        body: [
          "Our services are aimed at businesses. We do not knowingly collect data from minors; if you believe a minor has sent us data, write to us and we will delete it.",
        ],
      },
      {
        h2: "Changes to this policy",
        body: [
          "If the way we handle data changes, we will publish the new version on this page with its date.",
        ],
      },
    ],
    related: [
      { to: "cookies", label: "Cookie policy: which cookies this site uses" },
      { to: "propiedad", label: "Ownership of your code, domain and data" },
      { to: "terminos", label: "Terms and conditions" },
    ],
    cta: {
      heading: "Want to check or delete your data?",
      text: "Write to us and we'll tell you what data we hold about you, or delete it if that's what you prefer.",
      label: "Message us on WhatsApp",
      message: "Hi, I have a question about my personal data:",
    },
  },
};

export const cookiesContent: ContentTable = {
  es: {
    eyebrow: "Legal",
    h1: "Política de cookies",
    lead: [
      "Las cookies son pequeños archivos que un sitio guarda en tu navegador. Esta página dice exactamente cuáles usa grolow.com y cómo desactivarlas.",
      UPDATED_ES,
    ],
    sections: [
      {
        h2: "Qué cookies usamos",
        body: [
          "Este sitio no usa cookies publicitarias ni de remarketing, ni vende datos a redes de anuncios. Las únicas cookies que se instalan son de medición.",
        ],
        bullets: [
          {
            title: "Cookies de analítica (Google Analytics)",
            text: "Las cookies `_ga` y `_ga_<identificador>` distinguen visitantes y sesiones para que podamos contar cuánta gente entra y qué páginas lee. Caducan a los dos años y no contienen tu nombre ni tu correo.",
          },
          {
            title: "Cookies técnicas",
            text: "El sitio no necesita cookies propias para funcionar: el idioma se decide por la URL, no por una cookie. Si en el futuro se añade alguna, aparecerá aquí antes de activarse.",
          },
        ],
      },
      {
        h2: "Cómo desactivarlas",
        body: [
          "Puedes bloquear o borrar las cookies desde la configuración de tu navegador. En Chrome, Safari, Firefox y Edge está en el apartado de privacidad, y puedes hacerlo solo para este sitio.",
          "Google también publica un complemento para el navegador que desactiva Google Analytics en todos los sitios que visites.",
          "Bloquearlas no afecta a nada de lo que el sitio hace: todo el contenido y el formulario siguen funcionando igual, aunque algunas funciones de medición dejarán de operar.",
        ],
      },
      {
        h2: "Qué pasa si las dejas activas",
        body: [
          "Veremos datos agregados: cuántas personas visitan cada página, desde qué país aproximado y cuántas hacen clic en WhatsApp. No vemos quién eres ni podemos identificarte con eso.",
        ],
      },
    ],
    related: [
      {
        to: "privacidad",
        label: "Política de privacidad: qué datos tratamos y con quién se comparten",
      },
      { to: "terminos", label: "Términos y condiciones" },
    ],
    cta: {
      heading: "¿Alguna duda con esto?",
      text: "Si algo de esta página no te queda claro, pregúntanos. Preferimos explicarlo a que te quedes con la duda.",
      label: "Escribir por WhatsApp",
      message: "Hola, tengo una pregunta sobre las cookies del sitio:",
    },
  },

  en: {
    eyebrow: "Legal",
    h1: "Cookie policy",
    lead: [
      "Cookies are small files a site stores in your browser. This page says exactly which ones grolow.com uses and how to turn them off.",
      UPDATED_EN,
    ],
    sections: [
      {
        h2: "Which cookies we use",
        body: [
          "This site uses no advertising or remarketing cookies, and sells no data to ad networks. The only cookies set are for measurement.",
        ],
        bullets: [
          {
            title: "Analytics cookies (Google Analytics)",
            text: "The `_ga` and `_ga_<identifier>` cookies distinguish visitors and sessions so we can count how many people arrive and which pages they read. They expire after two years and contain neither your name nor your email.",
          },
          {
            title: "Technical cookies",
            text: "The site needs no cookies of its own to work: language is decided by the URL, not by a cookie. If any are added in future, they will appear here before being switched on.",
          },
        ],
      },
      {
        h2: "How to turn them off",
        body: [
          "You can block or delete cookies from your browser settings. In Chrome, Safari, Firefox and Edge this lives under privacy, and you can do it for this site only.",
          "Google also publishes a browser add-on that disables Google Analytics across every site you visit.",
          "Blocking them doesn't affect what the site does: all content and the contact form keep working, although some measurement stops.",
        ],
      },
      {
        h2: "What happens if you leave them on",
        body: [
          "We see aggregate data: how many people visit each page, from roughly which country, and how many click through to WhatsApp. We cannot see who you are or identify you from it.",
        ],
      },
    ],
    related: [
      { to: "privacidad", label: "Privacy policy: what data we process and who it is shared with" },
      { to: "terminos", label: "Terms and conditions" },
    ],
    cta: {
      heading: "Any questions about this?",
      text: "If something on this page isn't clear, ask us. We'd rather explain it than leave you guessing.",
      label: "Message us on WhatsApp",
      message: "Hi, I have a question about the site's cookies:",
    },
  },
};

export const terminosContent: ContentTable = {
  es: {
    eyebrow: "Legal",
    h1: "Términos y condiciones",
    lead: [
      "Estas condiciones regulan el uso de grolow.com y la contratación de nuestros servicios de diseño y desarrollo de software: sitios web, tiendas en línea, sistemas a medida y mantenimiento.",
      UPDATED_ES,
    ],
    sections: [
      {
        h2: "Quiénes somos",
        body: [
          `Este sitio lo opera Grolow Studio, representado por Warling Sebastián López Genao, con sede en Santo Domingo, República Dominicana. Contacto: ${CONTACT_EMAIL} · +1 (829) 994-6354.`,
        ],
      },
      {
        h2: "Uso del sitio",
        body: [
          "Puedes navegar y usar el contenido de este sitio libremente para informarte y pedir una propuesta. No puedes copiarlo para revenderlo ni presentarlo como propio.",
          "Los textos, el diseño y la marca «Grolow» son propiedad de Grolow Studio. Las marcas y logos de clientes pertenecen a cada cliente y se muestran con su permiso.",
          "No garantizamos que grolow.com esté disponible sin interrupciones, y podemos cambiar o retirar contenidos sin aviso previo.",
        ],
      },
      {
        h2: "Cotizaciones",
        body: [
          "Los precios publicados son precios de inicio («desde») y rangos orientativos, no una oferta vinculante. El precio final es el de la cotización formal que te enviamos, que tiene validez de 15 días.",
          "La cotización detalla qué se construye, qué no incluye, cuánto cuesta y cuándo se entrega. Lo que no aparezca ahí es trabajo adicional y se cotiza aparte antes de hacerse, no al final.",
        ],
      },
      {
        h2: "Cómo se contrata",
        body: [
          "Todo proyecto se formaliza con un contrato escrito firmado por ambas partes. Aceptar una cotización por WhatsApp o correo y hacer el pago inicial equivale a aceptar estos términos y el contrato correspondiente.",
        ],
      },
      {
        h2: "Pagos",
        bullets: [
          {
            title: "Proyectos con precio cerrado",
            text: "50% al firmar y 50% a la entrega, antes de publicar. El proyecto empieza al recibir el primer pago y se publica en tu dominio al recibir el último.",
          },
          {
            title: "Trabajo por horas o por fases",
            text: "Se factura por el tiempo trabajado, o fase por fase, según lo indique la cotización.",
          },
          {
            title: "Atrasos",
            text: "Un pago con más de 15 días de atraso detiene el trabajo y genera un recargo del 5% mensual.",
          },
        ],
      },
      {
        h2: "Plazos y colaboración",
        body: [
          "El plazo cuenta desde el pago inicial y desde que recibimos tu material: textos, fotos, logo y accesos. Mientras esperamos información o aprobaciones de tu parte, el plazo se detiene y esos días se suman al final.",
          "Te pediremos una sola persona autorizada para aprobar y respuestas en un máximo de 3 días hábiles. Si pasan 15 días sin respuesta, el proyecto queda en pausa; si la pausa supera 45 días, se archiva y retomarlo requiere una nueva cotización.",
        ],
      },
      {
        h2: "Revisiones",
        body: [
          "Cada proyecto incluye 2 rondas de revisión durante el desarrollo y 7 días de ajustes después de la entrega: corrección de errores, cambios de texto o de imágenes y ajustes visuales menores.",
          "Nuevas páginas, nuevas funciones o rediseños no son ajustes: son cambios de alcance y se cotizan aparte. Cada ronda de revisión adicional se cotiza aparte.",
        ],
      },
      {
        h2: "Garantía y estabilización",
        body: [
          "Garantizamos que lo entregado funciona como se describe en la cotización. Durante los 90 días siguientes a la entrega corregimos sin costo cualquier error atribuible a nuestro desarrollo y hacemos los ajustes técnicos para que el sistema funcione estable.",
          "Después de ese periodo, mientras tengas una mensualidad activa, los errores atribuibles a nosotros se siguen corrigiendo sin costo.",
          "La garantía no cubre fallos causados por cambios hechos por terceros, caídas de servicios externos (alojamiento, base de datos, WhatsApp, pasarelas de pago), cambios en servicios de terceros ni mal uso del sistema. Con mensualidad activa, igualmente gestionamos la solución.",
        ],
      },
      {
        h2: "Propiedad del trabajo",
        body: [
          "Al recibir el pago final, el código de tu proyecto, el dominio y los datos son tuyos. El dominio se registra a tu nombre desde el principio. Los detalles están en la política de propiedad intelectual y de activos.",
          "Podemos mostrar el proyecto en nuestro portafolio y mencionar tu negocio como referencia, salvo que nos pidas por escrito que no lo hagamos.",
        ],
      },
      {
        h2: "Confidencialidad",
        body: [
          "Toda la información comercial, técnica o financiera a la que accedamos durante el proyecto es confidencial, y esa obligación se mantiene 2 años después de terminar la relación.",
        ],
      },
      {
        h2: "Limitación de responsabilidad",
        body: [
          "Nuestra responsabilidad máxima por cualquier reclamo se limita al monto que hayas pagado por el servicio contratado. No respondemos por lucro cesante, pérdida de ventas ni daños indirectos.",
          "No garantizamos posiciones en buscadores ni volúmenes de venta: dependen de factores que no controlamos.",
        ],
      },
      {
        h2: "Terminación",
        body: [
          "Cualquiera de las partes puede terminar el proyecto con 15 días de aviso por escrito. Si lo terminas tú, se paga el trabajo hecho hasta esa fecha y el pago inicial no es reembolsable. Si lo terminamos nosotros sin causa, devolvemos la parte no ejecutada y te entregamos todo lo hecho.",
          "En cualquier caso te entregamos el código, la base de datos y los accesos en un máximo de 10 días hábiles. Las condiciones de reembolso están en la política de reembolsos y cancelación.",
        ],
      },
      {
        h2: "Cambios y ley aplicable",
        body: [
          "Estos términos pueden actualizarse; la versión vigente es la publicada en esta página con su fecha.",
          "Se rigen por las leyes de la República Dominicana. Antes de cualquier reclamo buscaremos resolverlo conversando; de no lograrlo, la jurisdicción son los tribunales de Santo Domingo.",
        ],
      },
    ],
    related: [
      { to: "propiedad", label: "Propiedad de tu código, tu dominio y tus datos" },
      { to: "soporte", label: "Soporte, mantenimiento y tiempos de respuesta" },
      { to: "reembolsos", label: "Política de reembolsos y cancelación" },
      { to: "precios", label: "Precios por tipo de proyecto" },
    ],
    cta: {
      heading: "¿Algo que aclarar antes de contratar?",
      text: "Si alguna de estas condiciones no te funciona, dínoslo antes de empezar. Preferimos acordarlo por escrito desde el principio.",
      label: "Escribir por WhatsApp",
      message: "Hola, tengo una pregunta sobre los términos y condiciones:",
    },
  },

  en: {
    eyebrow: "Legal",
    h1: "Terms and conditions",
    lead: [
      "These terms govern the use of grolow.com and the hiring of our software design and development services: websites, online stores, custom systems and maintenance.",
      UPDATED_EN,
    ],
    sections: [
      {
        h2: "Who we are",
        body: [
          `This site is operated by Grolow Studio, represented by Warling Sebastián López Genao, based in Santo Domingo, Dominican Republic. Contact: ${CONTACT_EMAIL} · +1 (829) 994-6354.`,
        ],
      },
      {
        h2: "Use of the site",
        body: [
          "You can browse and use this site's content freely to learn about us and request a proposal. You may not copy it to resell or pass it off as your own.",
          "The text, design and the «Grolow» brand belong to Grolow Studio. Client brands and logos belong to each client and are shown with their permission.",
          "We do not guarantee uninterrupted availability of grolow.com, and we may change or remove content without notice.",
        ],
      },
      {
        h2: "Quotes",
        body: [
          "Published prices are starting prices («from») and guide ranges, not a binding offer. The final price is the one in the formal quote we send you, valid for 15 days.",
          "The quote details what will be built, what is not included, what it costs and when it will be delivered. Anything not listed is extra work and is quoted before it is done, not at the end.",
        ],
      },
      {
        h2: "How hiring works",
        body: [
          "Every project is formalised with a written contract signed by both parties. Accepting a quote by WhatsApp or email and making the first payment counts as accepting these terms and the corresponding contract.",
        ],
      },
      {
        h2: "Payment",
        bullets: [
          {
            title: "Fixed-price projects",
            text: "50% on signing and 50% on delivery, before going live. Work starts when the first payment arrives and the site goes live on your domain when the last one does.",
          },
          {
            title: "Hourly or phased work",
            text: "Invoiced for the time worked, or phase by phase, as stated in the quote.",
          },
          {
            title: "Late payment",
            text: "A payment more than 15 days late pauses the work and incurs a 5% monthly surcharge.",
          },
        ],
      },
      {
        h2: "Timelines and collaboration",
        body: [
          "The timeline runs from the first payment and from when we receive your material: copy, photos, logo and access. While we wait for information or approvals from you, the clock stops and those days are added at the end.",
          "We'll ask for a single person authorised to approve, and replies within 3 business days. After 15 days without a reply the project is paused; if the pause exceeds 45 days it is archived and restarting it needs a new quote.",
        ],
      },
      {
        h2: "Revisions",
        body: [
          "Every project includes 2 rounds of revisions during development and 7 days of adjustments after delivery: bug fixes, text or image changes and minor visual tweaks.",
          "New pages, new features or redesigns are not adjustments: they are scope changes and are quoted separately. Each extra revision round is quoted separately.",
        ],
      },
      {
        h2: "Warranty and stabilisation",
        body: [
          "We guarantee that what we deliver works as described in the quote. For 90 days after delivery we fix, at no cost, any error attributable to our development and make the technical adjustments needed for the system to run stably.",
          "After that period, while you have an active monthly plan, errors attributable to us are still fixed at no cost.",
          "The warranty does not cover faults caused by third-party changes, outages of external services (hosting, database, WhatsApp, payment gateways), changes to third-party services or misuse of the system. With an active monthly plan, we still manage the fix.",
        ],
      },
      {
        h2: "Ownership of the work",
        body: [
          "Once the final payment is received, your project's code, domain and data are yours. The domain is registered in your name from the start. The details are in the intellectual property and assets policy.",
          "We may show the project in our portfolio and mention your business as a reference, unless you ask us in writing not to.",
        ],
      },
      {
        h2: "Confidentiality",
        body: [
          "All commercial, technical or financial information we access during the project is confidential, and that obligation lasts for 2 years after the relationship ends.",
        ],
      },
      {
        h2: "Limitation of liability",
        body: [
          "Our maximum liability for any claim is limited to the amount you paid for the service. We are not liable for lost profits, lost sales or indirect damages.",
          "We do not guarantee search engine rankings or sales volumes: they depend on factors we don't control.",
        ],
      },
      {
        h2: "Termination",
        body: [
          "Either party may end the project with 15 days' written notice. If you end it, the work done to that date is paid and the first payment is non-refundable. If we end it without cause, we refund the unexecuted part and hand over everything done.",
          "Either way, we deliver the code, database and access within 10 business days at most. Refund conditions are in the refund and cancellation policy.",
        ],
      },
      {
        h2: "Changes and governing law",
        body: [
          "These terms may be updated; the version in force is the one published on this page with its date.",
          "They are governed by the laws of the Dominican Republic. Before any claim we will try to resolve it by talking; failing that, the courts of Santo Domingo have jurisdiction.",
        ],
      },
    ],
    related: [
      { to: "propiedad", label: "Ownership of your code, domain and data" },
      { to: "soporte", label: "Support, maintenance and response times" },
      { to: "reembolsos", label: "Refund and cancellation policy" },
      { to: "precios", label: "Pricing by project type" },
    ],
    cta: {
      heading: "Anything to clarify before hiring?",
      text: "If one of these terms doesn't work for you, tell us before we start. We'd rather agree it in writing up front.",
      label: "Message us on WhatsApp",
      message: "Hi, I have a question about the terms and conditions:",
    },
  },
};
