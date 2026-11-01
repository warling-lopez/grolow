import type { ContentTable } from "./types";
import { CONTACT_EMAIL, UPDATED_EN, UPDATED_ES } from "./legal";

/**
 * Políticas públicas del servicio: propiedad de los activos, soporte (SLA) y
 * reembolsos. Salen del paquete legal de Grolow, sin lo que es de uso interno:
 * gestor de contraseñas, contratos con freelancers, acuerdos particulares con
 * clientes concretos ni notas operativas.
 *
 * Las mensualidades no llevan precio aquí: el precio de cada plan va en la
 * propuesta, y así esta página no se desfasa de la de precios.
 */

export const propiedadContent: ContentTable = {
  es: {
    eyebrow: "Legal",
    h1: "Propiedad de tu código, tu dominio y tus datos",
    lead: [
      "La regla es simple: tú eres dueño de todo y Grolow lo opera por ti. No tienes que manejar cuentas técnicas, pero la titularidad es tuya, y si un día decides irte, te llevas todo sin costo.",
      UPDATED_ES,
    ],
    sections: [
      {
        h2: "El código",
        body: [
          "Al recibir el pago final eres dueño del 100% del código desarrollado para tu proyecto, incluido el repositorio completo con su historial de cambios.",
          "Algunos componentes y librerías internas de Grolow se reutilizan entre proyectos. Esos siguen siendo nuestros, pero te damos una licencia perpetua, irrevocable y sin pagos adicionales para usarlos en tu proyecto. Puedes modificarlos y contratar a cualquier otro desarrollador para continuar el trabajo.",
        ],
      },
      {
        h2: "Quién es dueño de qué",
        bullets: [
          {
            title: "Dominio",
            text: "Tuyo: se registra siempre con tu nombre como titular legal, nunca a nombre de Grolow. Nosotros administramos la cuenta del registrador y las renovaciones.",
          },
          {
            title: "Código del proyecto",
            text: "Tuyo, una vez completado el pago. Nosotros lo mantenemos en el repositorio y lo desplegamos.",
          },
          {
            title: "Base de datos y su contenido",
            text: "Tuya. Nosotros la operamos, la respaldamos y la mantenemos segura.",
          },
          {
            title: "Diseño gráfico del proyecto",
            text: "Tuyo.",
          },
          {
            title: "Cuenta de la pasarela de pago",
            text: "Tuya y a tu nombre: el dinero de tus ventas nunca pasa por Grolow.",
          },
          {
            title: "Google Analytics, Google Business y Meta",
            text: "Tuyas. Si nos lo pides, entramos como colaboradores para ayudarte.",
          },
          {
            title: "Fuentes, fotos e iconos de terceros",
            text: "De sus autores. Cuando hace falta una licencia, se saca a tu nombre.",
          },
        ],
      },
      {
        h2: "Continuidad: nadie depende de nosotros",
        body: [
          "Cada proyecto se entrega con el repositorio completo, un documento que explica cómo instalarlo y publicarlo, y la lista de configuraciones que necesita para funcionar.",
          "No usamos sistemas cerrados ni código ofuscado. Cualquier desarrollador competente puede continuar un proyecto hecho por Grolow.",
        ],
      },
      {
        h2: "Si la relación termina",
        body: [
          "En un máximo de 10 días hábiles, y sin costo, te entregamos:",
        ],
        bullets: [
          {
            title: "La base de datos completa",
            text: "Todas las tablas, no solo un archivo con el catálogo.",
          },
          {
            title: "El código",
            text: "El repositorio completo con su historial y la documentación técnica.",
          },
          {
            title: "Todos los accesos",
            text: "Las credenciales de cada servicio del proyecto.",
          },
          {
            title: "Tu dominio",
            text: "El código de transferencia y acompañamiento hasta que el dominio quede en la cuenta que nos indiques.",
          },
        ],
      },
      {
        h2: "Sin penalidades de salida",
        body: [
          "Mantenemos el sistema funcionando hasta que la transferencia se complete, con un máximo de 30 días desde tu aviso. Eliminamos nuestras copias 30 días después de la entrega, salvo que nos pidas conservarlas.",
          "Salir de Grolow cuesta US$0. No retenemos ningún activo y nunca borramos tus datos sin haberte entregado antes la copia completa.",
        ],
      },
    ],
    related: [
      { to: "soporte", label: "Soporte, mantenimiento y tiempos de respuesta" },
      { to: "terminos", label: "Términos y condiciones" },
      { to: "reembolsos", label: "Política de reembolsos y cancelación" },
    ],
    cta: {
      heading: "¿Tu sistema actual está a nombre de otro?",
      text: "Si tu dominio o tu código hoy están a nombre de tu proveedor, te ayudamos a revisar qué es tuyo y cómo recuperarlo.",
      label: "Escribir por WhatsApp",
      message: "Hola, quiero saber si mi dominio y mi código están a mi nombre:",
    },
  },

  en: {
    eyebrow: "Legal",
    h1: "Ownership of your code, domain and data",
    lead: [
      "The rule is simple: you own everything and Grolow operates it for you. You don't have to deal with technical accounts, but the ownership is yours — and if you ever decide to leave, you take everything at no cost.",
      UPDATED_EN,
    ],
    sections: [
      {
        h2: "The code",
        body: [
          "Once the final payment is received you own 100% of the code built for your project, including the full repository with its change history.",
          "Some of Grolow's internal components and libraries are reused across projects. Those remain ours, but we grant you a perpetual, irrevocable, royalty-free licence to use them in your project. You can modify them and hire any other developer to continue the work.",
        ],
      },
      {
        h2: "Who owns what",
        bullets: [
          {
            title: "Domain",
            text: "Yours: it is always registered with you as the legal registrant, never in Grolow's name. We manage the registrar account and renewals.",
          },
          {
            title: "Project code",
            text: "Yours, once payment is complete. We keep it in the repository and deploy it.",
          },
          {
            title: "Database and its content",
            text: "Yours. We run it, back it up and keep it secure.",
          },
          {
            title: "Project graphic design",
            text: "Yours.",
          },
          {
            title: "Payment gateway account",
            text: "Yours and in your name: the money from your sales never goes through Grolow.",
          },
          {
            title: "Google Analytics, Google Business and Meta",
            text: "Yours. If you ask, we join as collaborators to help.",
          },
          {
            title: "Third-party fonts, photos and icons",
            text: "Their authors'. When a licence is needed, it is taken out in your name.",
          },
        ],
      },
      {
        h2: "Continuity: nobody depends on us",
        body: [
          "Every project is delivered with the full repository, a document explaining how to install and deploy it, and the list of settings it needs to run.",
          "We use no closed systems or obfuscated code. Any competent developer can continue a project built by Grolow.",
        ],
      },
      {
        h2: "If the relationship ends",
        body: ["Within 10 business days at most, and at no cost, we hand over:"],
        bullets: [
          {
            title: "The complete database",
            text: "Every table, not just a catalogue export.",
          },
          {
            title: "The code",
            text: "The full repository with its history and the technical documentation.",
          },
          {
            title: "All access",
            text: "The credentials for every service in the project.",
          },
          {
            title: "Your domain",
            text: "The transfer code, and help until the domain is in the account you choose.",
          },
        ],
      },
      {
        h2: "No exit penalties",
        body: [
          "We keep the system running until the transfer is complete, up to 30 days from your notice. We delete our copies 30 days after handover, unless you ask us to keep them.",
          "Leaving Grolow costs US$0. We hold back no assets and never delete your data without first handing you the complete copy.",
        ],
      },
    ],
    related: [
      { to: "soporte", label: "Support, maintenance and response times" },
      { to: "terminos", label: "Terms and conditions" },
      { to: "reembolsos", label: "Refund and cancellation policy" },
    ],
    cta: {
      heading: "Is your current system in someone else's name?",
      text: "If your domain or code is registered to your provider today, we'll help you check what's yours and how to get it back.",
      label: "Message us on WhatsApp",
      message: "Hi, I want to check whether my domain and code are in my name:",
    },
  },
};

export const soporteContent: ContentTable = {
  es: {
    eyebrow: "Legal",
    h1: "Soporte, mantenimiento y tiempos de respuesta",
    lead: [
      "Desde la entrega, Grolow opera toda la parte técnica de tu sistema: dominio, servidores, base de datos, respaldos, seguridad y monitoreo. Tú solo lo usas. Esta página explica qué cubre la mensualidad y cuánto tardamos en responder.",
      UPDATED_ES,
    ],
    sections: [
      {
        h2: "Qué cubre la mensualidad",
        body: [
          "Hay tres planes: Catálogo, Ecommerce y Plus. El que corresponde a tu proyecto, con su precio, se indica en tu propuesta antes de firmar: sabes exactamente qué pagas.",
        ],
        bullets: [
          {
            title: "Incluido en todos los planes",
            text: "Alojamiento y base de datos, renovación del dominio, respaldos diarios verificados, monitoreo de caídas, actualizaciones de seguridad y certificados, y la adaptación a cambios de los proveedores.",
          },
          {
            title: "Cambios de contenido al mes",
            text: "1 en Catálogo, 3 en Ecommerce y 6 en Plus. Son cambios de textos, imágenes, horarios o contacto que no puedas hacer desde tu panel, de menos de 30 minutos cada uno. Productos y precios los manejas tú desde el panel.",
          },
          {
            title: "Solo en Ecommerce y Plus",
            text: "Reporte mensual del sistema.",
          },
          {
            title: "Solo en Plus",
            text: "Una mejora funcional pequeña al mes y soporte los fines de semana.",
          },
        ],
      },
      {
        h2: "Qué no incluye",
        body: [
          "Funciones nuevas, rediseños, creación de contenido o fotografía, gestión de redes, campañas de publicidad, soporte a programas de terceros que no instalamos nosotros, y recuperación de datos perdidos por acciones propias. Todo eso se cotiza aparte, por hora o por proyecto.",
        ],
      },
      {
        h2: "Por qué se paga aunque «no pase nada»",
        body: [
          "Los primeros meses son los de más ajustes. Después el sistema se estabiliza y el trabajo se vuelve preventivo: respaldos, actualizaciones, vigilancia. Que no pase nada es justamente el resultado de ese trabajo.",
        ],
      },
      {
        h2: "Disponibilidad",
        body: [
          "Nuestro objetivo es un 99.5% de disponibilidad mensual en la infraestructura que operamos.",
          "No cuentan los mantenimientos avisados con 48 horas de anticipación, las caídas de proveedores externos, los ataques de denegación de servicio ni los fallos causados por cambios de terceros.",
        ],
      },
      {
        h2: "Tiempos de respuesta",
        body: [
          "Tiempo de respuesta es lo que tardamos en confirmarte que estamos trabajando en tu caso, no lo que tarda la solución.",
        ],
        subsections: [
          {
            h3: "Crítica: el sistema está caído o no puedes recibir pedidos",
            body: [
              "Catálogo: el mismo día hábil (máximo 8 horas hábiles). Ecommerce: 4 horas hábiles. Plus: 2 horas, fines de semana incluidos.",
            ],
          },
          {
            h3: "Alta: una función importante falla, pero hay alternativa",
            body: [
              "Catálogo: 24 horas hábiles. Ecommerce: 12 horas hábiles. Plus: 4 horas hábiles.",
            ],
          },
          {
            h3: "Media: un error que no detiene la operación",
            body: [
              "Catálogo: 3 días hábiles. Ecommerce: 2 días hábiles. Plus: 1 día hábil.",
            ],
          },
          {
            h3: "Baja: un cambio de contenido o una consulta",
            body: [
              "Catálogo: 5 días hábiles. Ecommerce: 3 días hábiles. Plus: 2 días hábiles.",
            ],
          },
        ],
      },
      {
        h2: "Horario y canales",
        body: [
          "Catálogo y Ecommerce: lunes a viernes de 9:00 a 18:00, hora de República Dominicana. Plus: lunes a domingo de 8:00 a 20:00.",
          `Escríbenos por WhatsApp al +1 (829) 994-6354 o a ${CONTACT_EMAIL}.`,
        ],
      },
      {
        h2: "Si fallamos, compensamos",
        body: [
          "Si incumplimos los tiempos de respuesta más de 2 veces en un mes, el mes siguiente no se cobra.",
          "Si una falla la causó un error nuestro, te lo decimos con claridad y te compensamos, aunque no lo pidas.",
        ],
      },
      {
        h2: "Respaldos",
        body: [
          "Copias de seguridad diarias y automáticas. Se guardan 7 días en Catálogo y Ecommerce, y 30 días en Plus. Cada trimestre probamos que se pueden restaurar.",
        ],
      },
      {
        h2: "Facturación y cancelación",
        body: [
          "La mensualidad se cobra por adelantado el día 1 de cada mes, desde la entrega del proyecto, por transferencia local, PayPal o Stripe.",
          "Puedes cancelar cuando quieras con 30 días de aviso por escrito, sin penalidad y sin contratos de permanencia. Al cancelar te entregamos todo según la política de propiedad.",
          "Si la mensualidad acumula 30 días de atraso te avisamos por escrito. A los 45 días te entregamos todos tus activos y dejamos de cubrir los costos de infraestructura. Nunca borramos tus datos sin entregarte antes la copia completa.",
        ],
      },
    ],
    related: [
      { to: "propiedad", label: "Propiedad de tu código, tu dominio y tus datos" },
      { to: "reembolsos", label: "Política de reembolsos y cancelación" },
      { to: "terminos", label: "Términos y condiciones" },
    ],
    cta: {
      heading: "¿Qué plan le conviene a tu proyecto?",
      text: "Cuéntanos qué tienes o qué necesitas y te decimos qué plan corresponde y cuánto cuesta.",
      label: "Escribir por WhatsApp",
      message: "Hola, quiero saber qué plan de mantenimiento me conviene:",
    },
  },

  en: {
    eyebrow: "Legal",
    h1: "Support, maintenance and response times",
    lead: [
      "From delivery onwards, Grolow runs the whole technical side of your system: domain, servers, database, backups, security and monitoring. You just use it. This page explains what the monthly plan covers and how quickly we respond.",
      UPDATED_EN,
    ],
    sections: [
      {
        h2: "What the monthly plan covers",
        body: [
          "There are three plans: Catalogue, Ecommerce and Plus. The one for your project, with its price, is stated in your proposal before you sign: you know exactly what you're paying for.",
        ],
        bullets: [
          {
            title: "Included in every plan",
            text: "Hosting and database, domain renewal, verified daily backups, downtime monitoring, security and certificate updates, and adapting to provider changes.",
          },
          {
            title: "Content changes per month",
            text: "1 on Catalogue, 3 on Ecommerce and 6 on Plus. These are changes to text, images, opening hours or contact details you can't make from your panel, under 30 minutes each. You manage products and prices yourself from the panel.",
          },
          {
            title: "Ecommerce and Plus only",
            text: "Monthly system report.",
          },
          {
            title: "Plus only",
            text: "One small functional improvement a month and weekend support.",
          },
        ],
      },
      {
        h2: "What it doesn't include",
        body: [
          "New features, redesigns, content creation or photography, social media management, ad campaigns, support for third-party software we didn't install, and recovery of data lost through your own actions. All of that is quoted separately, hourly or per project.",
        ],
      },
      {
        h2: "Why you pay even when «nothing happens»",
        body: [
          "The first months are the busiest. After that the system settles and the work becomes preventive: backups, updates, monitoring. Nothing happening is precisely the result of that work.",
        ],
      },
      {
        h2: "Availability",
        body: [
          "We aim for 99.5% monthly availability on the infrastructure we operate.",
          "Maintenance announced 48 hours ahead, outages of external providers, denial-of-service attacks and faults caused by third-party changes don't count.",
        ],
      },
      {
        h2: "Response times",
        body: [
          "Response time is how long it takes us to confirm we're working on your case, not how long the fix takes.",
        ],
        subsections: [
          {
            h3: "Critical: the system is down or you can't take orders",
            body: [
              "Catalogue: same business day (8 business hours at most). Ecommerce: 4 business hours. Plus: 2 hours, weekends included.",
            ],
          },
          {
            h3: "High: an important feature fails, but there's a workaround",
            body: ["Catalogue: 24 business hours. Ecommerce: 12 business hours. Plus: 4 business hours."],
          },
          {
            h3: "Medium: an error that doesn't stop operations",
            body: ["Catalogue: 3 business days. Ecommerce: 2 business days. Plus: 1 business day."],
          },
          {
            h3: "Low: a content change or a question",
            body: ["Catalogue: 5 business days. Ecommerce: 3 business days. Plus: 2 business days."],
          },
        ],
      },
      {
        h2: "Hours and channels",
        body: [
          "Catalogue and Ecommerce: Monday to Friday, 9:00 to 18:00 Dominican Republic time. Plus: Monday to Sunday, 8:00 to 20:00.",
          `Message us on WhatsApp at +1 (829) 994-6354 or write to ${CONTACT_EMAIL}.`,
        ],
      },
      {
        h2: "If we fail, we compensate",
        body: [
          "If we miss the response times more than twice in a month, the following month is free.",
          "If a fault was caused by our mistake, we tell you plainly and compensate you, even if you don't ask.",
        ],
      },
      {
        h2: "Backups",
        body: [
          "Automatic daily backups. They are kept for 7 days on Catalogue and Ecommerce and 30 days on Plus. Every quarter we test that they can be restored.",
        ],
      },
      {
        h2: "Billing and cancellation",
        body: [
          "The monthly fee is charged in advance on the 1st of each month from project delivery, by local bank transfer, PayPal or Stripe.",
          "You can cancel whenever you like with 30 days' written notice, with no penalty and no lock-in. On cancellation we hand over everything under the ownership policy.",
          "If the monthly fee is 30 days overdue we notify you in writing. At 45 days we hand over all your assets and stop covering infrastructure costs. We never delete your data without first handing you the complete copy.",
        ],
      },
    ],
    related: [
      { to: "propiedad", label: "Ownership of your code, domain and data" },
      { to: "reembolsos", label: "Refund and cancellation policy" },
      { to: "terminos", label: "Terms and conditions" },
    ],
    cta: {
      heading: "Which plan suits your project?",
      text: "Tell us what you have or need and we'll tell you which plan fits and what it costs.",
      label: "Message us on WhatsApp",
      message: "Hi, I'd like to know which maintenance plan suits me:",
    },
  },
};

export const reembolsosContent: ContentTable = {
  es: {
    eyebrow: "Legal",
    h1: "Política de reembolsos y cancelación",
    lead: [
      "Qué pasa con tu dinero si un proyecto o una mensualidad se cancela, explicado antes de firmar y no después.",
      UPDATED_ES,
    ],
    sections: [
      {
        h2: "Proyectos de desarrollo",
        bullets: [
          {
            title: "Si cancelas antes de que empecemos",
            text: "Te devolvemos el 100% del pago inicial.",
          },
          {
            title: "Si cancelas durante el desarrollo",
            text: "El pago inicial del 50% no se reembolsa, y te entregamos todo el trabajo hecho hasta ese momento.",
          },
          {
            title: "Si cancelamos nosotros sin causa",
            text: "Te devolvemos la parte proporcional al trabajo no hecho y te entregamos todo lo realizado.",
          },
          {
            title: "Después de la entrega",
            text: "No hay reembolso. A cambio, durante 90 días corregimos sin costo cualquier error atribuible a nuestro desarrollo.",
          },
        ],
      },
      {
        h2: "Por qué el pago inicial no se reembolsa",
        body: [
          "Ese 50% cubre el tiempo ya invertido en tu proyecto y la capacidad que reservamos para él, que no podemos ofrecerle a otro cliente. Es la práctica estándar del sector, y por eso te lo explicamos antes de firmar.",
        ],
      },
      {
        h2: "Mensualidades",
        body: [
          "Puedes cancelar en cualquier momento con 30 días de aviso. Los meses ya iniciados no se reembolsan. No hay contratos de permanencia.",
          "Al cancelar te entregamos sin costo tu base de datos, tu código, tus accesos y tu dominio.",
        ],
      },
      {
        h2: "Si no cumplimos lo acordado",
        body: [
          "Si no entregamos lo pactado en la propuesta y no lo corregimos en un plazo razonable, tienes derecho al reembolso de la parte que corresponde al trabajo no entregado.",
          "Antes de llegar ahí, conversamos: casi siempre hay una solución.",
        ],
      },
    ],
    related: [
      { to: "terminos", label: "Términos y condiciones" },
      { to: "soporte", label: "Soporte, mantenimiento y tiempos de respuesta" },
      { to: "propiedad", label: "Propiedad de tu código, tu dominio y tus datos" },
    ],
    cta: {
      heading: "¿Dudas antes de pagar?",
      text: "Pregúntanos lo que necesites antes de firmar. Preferimos que todo quede claro desde el principio.",
      label: "Escribir por WhatsApp",
      message: "Hola, tengo una pregunta sobre pagos y reembolsos:",
    },
  },

  en: {
    eyebrow: "Legal",
    h1: "Refund and cancellation policy",
    lead: [
      "What happens to your money if a project or a monthly plan is cancelled, explained before you sign rather than after.",
      UPDATED_EN,
    ],
    sections: [
      {
        h2: "Development projects",
        bullets: [
          {
            title: "If you cancel before we start",
            text: "We refund 100% of the first payment.",
          },
          {
            title: "If you cancel during development",
            text: "The 50% first payment is not refunded, and we hand over all the work done up to that point.",
          },
          {
            title: "If we cancel without cause",
            text: "We refund the share for the work not done and hand over everything completed.",
          },
          {
            title: "After delivery",
            text: "No refund. Instead, for 90 days we fix at no cost any error attributable to our development.",
          },
        ],
      },
      {
        h2: "Why the first payment isn't refunded",
        body: [
          "That 50% covers the time already spent on your project and the capacity we reserved for it, which we can't offer to another client. It's standard practice in the industry, which is why we explain it before you sign.",
        ],
      },
      {
        h2: "Monthly plans",
        body: [
          "You can cancel at any time with 30 days' notice. Months already started are not refunded. There is no lock-in.",
          "On cancellation we hand over your database, code, access and domain at no cost.",
        ],
      },
      {
        h2: "If we don't deliver what was agreed",
        body: [
          "If we don't deliver what the proposal promised and don't fix it within a reasonable time, you are entitled to a refund of the share for the undelivered work.",
          "Before it gets there, we talk: there is almost always a solution.",
        ],
      },
    ],
    related: [
      { to: "terminos", label: "Terms and conditions" },
      { to: "soporte", label: "Support, maintenance and response times" },
      { to: "propiedad", label: "Ownership of your code, domain and data" },
    ],
    cta: {
      heading: "Questions before paying?",
      text: "Ask us anything before you sign. We'd rather everything is clear from the start.",
      label: "Message us on WhatsApp",
      message: "Hi, I have a question about payments and refunds:",
    },
  },
};
