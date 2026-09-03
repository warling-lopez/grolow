import type { ContentTable } from "./types";

/**
 * Páginas legales.
 *
 * Lo que aquí se afirma sobre tratamiento de datos es real y verificable en el
 * código: Google Analytics (G-Q8RNVKKBJZ) en el layout, Gmail vía nodemailer en
 * `app/api/contact/route.ts`, y Vercel como alojamiento. No se declara ningún
 * tratamiento que el sitio no haga.
 *
 * Los datos de identidad fiscal que no constan en el repositorio quedan como
 * `[COMPLETAR: ...]`. Mientras haya alguno, estas rutas están marcadas
 * `index: false` en `i18n.ts`: publicar un aviso legal a medio rellenar en los
 * resultados de búsqueda es peor que no tenerlo indexado.
 *
 * Esto es una base estándar, no asesoría legal: conviene que lo revise un
 * abogado antes de darlo por definitivo.
 */

const UPDATED_ES = "Última actualización: 3 de septiembre de 2026.";
const UPDATED_EN = "Last updated: 3 September 2026.";

export const privacidadContent: ContentTable = {
  es: {
    eyebrow: "Legal",
    h1: "Política de privacidad",
    lead: [
      "Esta política explica qué datos personales recogemos cuando usas grolow.com, para qué los usamos y con quién se comparten.",
      UPDATED_ES,
    ],
    sections: [
      {
        h2: "Quién es responsable de tus datos",
        body: [
          "Responsable: Grolow, [COMPLETAR: razón social completa], con RNC [COMPLETAR: número de RNC] y domicilio en [COMPLETAR: dirección fiscal], Santo Domingo, República Dominicana.",
          "Correo de contacto para cualquier asunto relacionado con datos personales: grolow.web@gmail.com.",
        ],
      },
      {
        h2: "Qué datos recogemos y para qué",
        bullets: [
          {
            title: "Los que nos das en el formulario de contacto",
            text: "Nombre, teléfono, correo electrónico, el servicio que te interesa, el rango de presupuesto y lo que nos cuentes del proyecto. Los usamos únicamente para responderte y preparar tu propuesta.",
          },
          {
            title: "Datos de uso del sitio",
            text: "Páginas que visitas, tiempo de permanencia, tipo de dispositivo, navegador y país aproximado, además de los clics hacia WhatsApp. Nos sirven para saber qué páginas funcionan y cuáles hay que reescribir.",
          },
          {
            title: "Registros del servidor",
            text: "Nuestro proveedor de alojamiento guarda registros técnicos que incluyen la dirección IP y la hora de la petición, por seguridad y para diagnosticar fallos.",
          },
        ],
      },
      {
        h2: "Con qué base legal los tratamos",
        body: [
          "Los datos del formulario los tratamos porque tú nos los envías con la intención de recibir una propuesta, es decir, para gestionar una relación precontractual que tú inicias.",
          "La analítica se apoya en tu consentimiento, que puedes retirar en cualquier momento bloqueando las cookies como se explica en la política de cookies.",
          "El tratamiento se rige por la Ley No. 172-13 sobre Protección Integral de los Datos Personales de la República Dominicana.",
        ],
      },
      {
        h2: "Con quién se comparten",
        body: [
          "No vendemos ni cedemos tus datos a terceros con fines comerciales. Sí los procesan los proveedores que hacen funcionar el sitio:",
        ],
        bullets: [
          {
            title: "Google",
            text: "Google Analytics para las estadísticas de uso, y Gmail para recibir y responder los mensajes del formulario. Google puede tratar estos datos en servidores fuera de República Dominicana, incluidos los Estados Unidos.",
          },
          {
            title: "Vercel",
            text: "Alojamiento del sitio. Procesa los registros técnicos del servidor descritos arriba.",
          },
          {
            title: "WhatsApp (Meta)",
            text: "Solo si tú pulsas un botón de WhatsApp. A partir de ese momento la conversación se rige por las condiciones y la política de privacidad de WhatsApp, no por esta.",
          },
        ],
      },
      {
        h2: "Cuánto tiempo los conservamos",
        body: [
          "Los mensajes del formulario se conservan mientras dure la conversación comercial y [COMPLETAR: plazo de conservación posterior] después, salvo que nos pidas antes que los eliminemos.",
          "Los datos de analítica se conservan durante el periodo configurado en Google Analytics, [COMPLETAR: periodo de retención configurado].",
        ],
      },
      {
        h2: "Tus derechos",
        body: [
          "Puedes pedirnos acceder a los datos que tenemos sobre ti, rectificarlos si son incorrectos, cancelarlos u oponerte a que los tratemos. También puedes retirar tu consentimiento para la analítica cuando quieras.",
          "Para ejercer cualquiera de esos derechos escríbenos a grolow.web@gmail.com desde la misma dirección que usaste, o por WhatsApp. Respondemos en un plazo máximo de [COMPLETAR: plazo de respuesta] días.",
        ],
      },
      {
        h2: "Menores de edad",
        body: [
          "Este sitio se dirige a personas que contratan servicios para un negocio. No recogemos conscientemente datos de menores de edad. Si crees que un menor nos ha enviado datos, escríbenos y los eliminamos.",
        ],
      },
      {
        h2: "Cambios en esta política",
        body: [
          "Si cambiamos la forma en que tratamos los datos, actualizaremos esta página y la fecha de arriba. Los cambios importantes se avisarán en el propio sitio.",
        ],
      },
    ],
    related: [
      { to: "cookies", label: "Política de cookies: qué cookies usa este sitio" },
      { to: "terminos", label: "Términos y condiciones del servicio" },
    ],
    cta: {
      heading: "¿Quieres ejercer tus derechos?",
      text: "Escríbenos y te decimos qué datos tenemos sobre ti, o los eliminamos si es lo que prefieres. No hace falta que expliques por qué.",
      label: "Escribir por WhatsApp",
      message: "Hola, quiero hacer una consulta sobre mis datos personales:",
    },
  },

  en: {
    eyebrow: "Legal",
    h1: "Privacy policy",
    lead: [
      "This policy explains what personal data we collect when you use grolow.com, what we use it for, and who it is shared with.",
      UPDATED_EN,
    ],
    sections: [
      {
        h2: "Who is responsible for your data",
        body: [
          "Controller: Grolow, [COMPLETAR: razón social completa], tax ID [COMPLETAR: número de RNC], registered at [COMPLETAR: dirección fiscal], Santo Domingo, Dominican Republic.",
          "Contact for anything related to personal data: grolow.web@gmail.com.",
        ],
      },
      {
        h2: "What we collect and why",
        bullets: [
          {
            title: "What you give us in the contact form",
            text: "Name, phone, email, the service you're interested in, your budget range and whatever you tell us about the project. We use it only to reply and prepare your proposal.",
          },
          {
            title: "Site usage data",
            text: "Pages visited, time on page, device type, browser and approximate country, plus clicks through to WhatsApp. It tells us which pages work and which need rewriting.",
          },
          {
            title: "Server logs",
            text: "Our hosting provider keeps technical logs including IP address and request time, for security and to diagnose failures.",
          },
        ],
      },
      {
        h2: "The legal basis",
        body: [
          "Form data is processed because you send it to us intending to receive a proposal — that is, to manage a pre-contractual relationship you initiate.",
          "Analytics relies on your consent, which you can withdraw at any time by blocking cookies as described in the cookie policy.",
          "Processing is governed by Dominican Republic Law No. 172-13 on the Comprehensive Protection of Personal Data.",
        ],
      },
      {
        h2: "Who it is shared with",
        body: [
          "We do not sell or transfer your data to third parties for commercial purposes. It is processed by the providers that make the site run:",
        ],
        bullets: [
          {
            title: "Google",
            text: "Google Analytics for usage statistics, and Gmail to receive and answer form messages. Google may process this data on servers outside the Dominican Republic, including the United States.",
          },
          {
            title: "Vercel",
            text: "Site hosting. It processes the technical server logs described above.",
          },
          {
            title: "WhatsApp (Meta)",
            text: "Only if you tap a WhatsApp button. From that point the conversation is governed by WhatsApp's own terms and privacy policy, not by this one.",
          },
        ],
      },
      {
        h2: "How long we keep it",
        body: [
          "Form messages are kept for the duration of the commercial conversation and [COMPLETAR: plazo de conservación posterior] afterwards, unless you ask us to delete them sooner.",
          "Analytics data is kept for the period configured in Google Analytics, [COMPLETAR: periodo de retención configurado].",
        ],
      },
      {
        h2: "Your rights",
        body: [
          "You can ask us to access the data we hold about you, correct it if it is wrong, delete it, or object to us processing it. You can also withdraw consent for analytics whenever you like.",
          "To exercise any of these, write to grolow.web@gmail.com from the address you used, or message us on WhatsApp. We reply within [COMPLETAR: plazo de respuesta] days at most.",
        ],
      },
      {
        h2: "Minors",
        body: [
          "This site is aimed at people contracting services for a business. We do not knowingly collect data from minors. If you believe a minor has sent us data, write to us and we will delete it.",
        ],
      },
      {
        h2: "Changes to this policy",
        body: [
          "If we change how we handle data, we will update this page and the date above. Significant changes will be announced on the site itself.",
        ],
      },
    ],
    related: [
      { to: "cookies", label: "Cookie policy: which cookies this site uses" },
      { to: "terminos", label: "Terms and conditions of service" },
    ],
    cta: {
      heading: "Want to exercise your rights?",
      text: "Write to us and we'll tell you what data we hold about you, or delete it if that's what you prefer. You don't have to explain why.",
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
          "Este sitio no usa cookies publicitarias, ni de remarketing, ni vende datos a redes de anuncios. Las únicas cookies que se instalan son de medición.",
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
          "Bloquearlas no afecta a nada de lo que el sitio hace: todo el contenido y el formulario siguen funcionando igual.",
        ],
      },
      {
        h2: "Qué pasa si aceptas",
        body: [
          "Si dejas las cookies activas, veremos datos agregados: cuántas personas visitan cada página, desde qué país aproximado y cuáles hacen clic en WhatsApp. No vemos quién eres ni podemos identificarte con eso.",
        ],
      },
    ],
    related: [
      {
        to: "privacidad",
        label: "Política de privacidad: qué datos tratamos y con quién se comparten",
      },
      { to: "terminos", label: "Términos y condiciones del servicio" },
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
          "Blocking them affects nothing the site does: all content and the contact form keep working the same.",
        ],
      },
      {
        h2: "What happens if you accept",
        body: [
          "If you leave cookies on, we see aggregate data: how many people visit each page, from roughly which country, and which ones click through to WhatsApp. We cannot see who you are or identify you from it.",
        ],
      },
    ],
    related: [
      { to: "privacidad", label: "Privacy policy: what data we process and who it is shared with" },
      { to: "terminos", label: "Terms and conditions of service" },
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
      "Estas condiciones regulan el uso de grolow.com y la contratación de nuestros servicios de diseño y desarrollo.",
      UPDATED_ES,
    ],
    sections: [
      {
        h2: "Quiénes somos",
        body: [
          "Grolow, [COMPLETAR: razón social completa], RNC [COMPLETAR: número de RNC], con domicilio en [COMPLETAR: dirección fiscal], Santo Domingo, República Dominicana. Contacto: grolow.web@gmail.com.",
        ],
      },
      {
        h2: "Uso del sitio",
        body: [
          "Puedes navegar y usar el contenido de este sitio libremente para informarte y solicitar una propuesta. No puedes copiarlo para revenderlo ni presentarlo como propio.",
          "Los textos, el diseño y el código de grolow.com son nuestros, salvo las marcas y logotipos de clientes, que pertenecen a cada cliente y se muestran con su permiso.",
        ],
      },
      {
        h2: "Cotizaciones y alcance",
        body: [
          "Los precios publicados en la página de precios son rangos orientativos por tipo de proyecto. La propuesta que te enviamos es la que manda: recoge el alcance concreto, el importe y la fecha de entrega.",
          "Una propuesta tiene una validez de [COMPLETAR: días de validez de la propuesta] días. Lo que no aparezca en el alcance no está incluido, y si surge durante el proyecto se cotiza aparte y se te dice en el momento, no al final.",
        ],
      },
      {
        h2: "Pagos",
        body: [
          "Los proyectos con rango cerrado se pagan en dos partes: una al empezar y el resto contra entrega. El trabajo por horas se factura por el tiempo trabajado. Los proyectos por fases se cobran fase a fase.",
          "El trabajo comienza cuando se recibe el primer pago. Los importes están expresados en dólares estadounidenses y [COMPLETAR: indicar si los precios incluyen o no ITBIS].",
        ],
      },
      {
        h2: "Plazos y colaboración",
        body: [
          "Las fechas de entrega asumen que recibimos a tiempo lo que necesitamos de tu parte: textos, fotos, accesos y aprobaciones. El motivo más común de retraso no es el desarrollo, sino el contenido que no llega.",
          "Si un proyecto queda detenido por tu parte más de [COMPLETAR: plazo de inactividad] sin respuesta, podemos cerrarlo y facturar lo trabajado hasta ese punto.",
        ],
      },
      {
        h2: "Propiedad del trabajo entregado",
        body: [
          "El dominio se registra a tu nombre desde el principio. Una vez pagado el proyecto completo, el código y el contenido entregados son tuyos, con los accesos traspasados y sin condiciones.",
          "Nos reservamos el derecho de mostrar el trabajo en nuestro portafolio, salvo que nos pidas lo contrario por escrito.",
        ],
      },
      {
        h2: "Garantías y límites",
        body: [
          "Corregimos sin costo cualquier fallo atribuible a nuestro desarrollo durante los 15 días siguientes a la entrega. Fuera de eso, los cambios y las mejoras se cotizan.",
          "No garantizamos posiciones en buscadores ni volúmenes de venta: dependen de factores que no controlamos. Sí garantizamos que lo entregado funciona como se describió en la propuesta.",
          "No respondemos por fallos de servicios de terceros — alojamiento, pasarelas de pago, redes sociales o WhatsApp — ni por el contenido que tú publiques.",
        ],
      },
      {
        h2: "Ley aplicable",
        body: [
          "Estas condiciones se rigen por las leyes de la República Dominicana. Cualquier controversia se someterá a los tribunales de [COMPLETAR: jurisdicción acordada], renunciando a cualquier otro fuero.",
        ],
      },
    ],
    related: [
      { to: "precios", label: "Precios por tipo de proyecto" },
      {
        to: "privacidad",
        label: "Política de privacidad: qué datos tratamos y con quién se comparten",
      },
    ],
    cta: {
      heading: "¿Algo que aclarar antes de contratar?",
      text: "Si una de estas condiciones no te encaja, dilo antes de empezar. Casi todo es conversable y preferimos acordarlo por escrito desde el principio.",
      label: "Escribir por WhatsApp",
      message: "Hola, tengo una consulta sobre los términos y condiciones:",
    },
  },

  en: {
    eyebrow: "Legal",
    h1: "Terms and conditions",
    lead: [
      "These terms govern the use of grolow.com and the contracting of our design and development services.",
      UPDATED_EN,
    ],
    sections: [
      {
        h2: "Who we are",
        body: [
          "Grolow, [COMPLETAR: razón social completa], tax ID [COMPLETAR: número de RNC], registered at [COMPLETAR: dirección fiscal], Santo Domingo, Dominican Republic. Contact: grolow.web@gmail.com.",
        ],
      },
      {
        h2: "Use of the site",
        body: [
          "You may browse and use this site's content freely to inform yourself and request a proposal. You may not copy it to resell it or present it as your own.",
          "The copy, design and code of grolow.com are ours, except client brands and logos, which belong to each client and are shown with their permission.",
        ],
      },
      {
        h2: "Quotes and scope",
        body: [
          "The prices published on the pricing page are indicative ranges by project type. The proposal we send you is what governs: it sets out the concrete scope, the amount and the delivery date.",
          "A proposal is valid for [COMPLETAR: días de validez de la propuesta] days. Anything not in the scope is not included, and if it comes up during the project it is quoted separately and raised at the time, not at the end.",
        ],
      },
      {
        h2: "Payment",
        body: [
          "Projects with a closed range are paid in two parts: one at the start and the rest on delivery. Hourly work is invoiced for time worked. Phased projects are billed phase by phase.",
          "Work begins once the first payment is received. Amounts are in US dollars and [COMPLETAR: indicar si los precios incluyen o no ITBIS].",
        ],
      },
      {
        h2: "Timelines and collaboration",
        body: [
          "Delivery dates assume we receive what we need from you on time: copy, photos, credentials and approvals. The most common cause of delay isn't development — it's content that never arrives.",
          "If a project is held up on your side for more than [COMPLETAR: plazo de inactividad] without a reply, we may close it and invoice the work done up to that point.",
        ],
      },
      {
        h2: "Ownership of delivered work",
        body: [
          "The domain is registered in your name from the start. Once the project is paid in full, the delivered code and content are yours, with credentials handed over and no conditions attached.",
          "We reserve the right to show the work in our portfolio, unless you ask us in writing not to.",
        ],
      },
      {
        h2: "Warranties and limits",
        body: [
          "We fix any fault attributable to our development at no cost for 15 days after delivery. Beyond that, changes and improvements are quoted.",
          "We do not guarantee search engine positions or sales volumes: they depend on factors we don't control. We do guarantee that what we deliver works as described in the proposal.",
          "We are not liable for failures of third-party services — hosting, payment gateways, social networks or WhatsApp — nor for content you publish.",
        ],
      },
      {
        h2: "Governing law",
        body: [
          "These terms are governed by the laws of the Dominican Republic. Any dispute will be submitted to the courts of [COMPLETAR: jurisdicción acordada], waiving any other jurisdiction.",
        ],
      },
    ],
    related: [
      { to: "precios", label: "Pricing by project type" },
      { to: "privacidad", label: "Privacy policy: what data we process and who it is shared with" },
    ],
    cta: {
      heading: "Anything to clarify before hiring?",
      text: "If one of these terms doesn't work for you, say so before we start. Almost everything is negotiable and we'd rather agree it in writing up front.",
      label: "Message us on WhatsApp",
      message: "Hi, I have a question about the terms and conditions:",
    },
  },
};
