import type { ContentTable } from "./types";

export const appsContent: ContentTable = {
  es: {
    eyebrow: "Servicio",
    h1: "Aplicaciones móviles a medida",
    lead: [
      "Desarrollamos aplicaciones móviles a medida para negocios de República Dominicana: apps para tu equipo en calle, para tus clientes recurrentes o para operar un servicio que hoy se coordina por llamadas y mensajes sueltos.",
      "Antes de cotizarla te vamos a preguntar algo incómodo: si de verdad necesitas una app, o si lo que necesitas es una web que funcione bien en el celular.",
    ],
    sections: [
      {
        h2: "Cuándo una app se justifica y cuándo no",
        body: [
          "Una app tiene sentido cuando necesitas algo que el navegador no te da: trabajar sin conexión, leer códigos con la cámara de forma constante, mandar notificaciones que la gente realmente vea, usar el GPS en segundo plano, o estar en la pantalla de inicio de alguien que te va a abrir todas las semanas.",
          "No tiene sentido cuando lo único que quieres es que tu negocio «tenga app». Bajar una aplicación es una barrera real: el cliente tiene que buscarla, aceptar permisos y darte espacio en su teléfono. Para una compra ocasional, casi nadie hace ese recorrido.",
          "Si tu caso es el segundo, te lo decimos y construimos una web para móvil. Sale más barata, se actualiza al instante y no depende de que nadie apruebe una versión nueva.",
        ],
      },
      {
        h2: "Qué tipo de apps construimos",
        bullets: [
          {
            title: "Apps para equipos en campo",
            text: "Técnicos, repartidores o vendedores que registran visitas, capturan firmas o fotos y sincronizan cuando vuelven a tener señal.",
          },
          {
            title: "Apps de servicio recurrente",
            text: "Para negocios donde el mismo cliente vuelve seguido: reservas, historial, saldo o puntos, notificaciones de su próxima cita.",
          },
          {
            title: "Apps internas de operación",
            text: "Inventario, control de entradas y salidas, checklists de cumplimiento. La versión móvil de un panel que ya usas en escritorio.",
          },
        ],
      },
      {
        h2: "Cómo lo construimos",
        body: [
          "Trabajamos con una sola base de código que corre en Android y en iPhone. Eso significa un proyecto en lugar de dos, y que un arreglo se aplica en ambos sistemas a la vez.",
          "Android suele ser la prioridad en el mercado dominicano por cuota de dispositivos, pero la app sale para los dos salvo que tú decidas otra cosa.",
          "La app se conecta al mismo sistema que ya te construimos, si lo hay. No se duplican datos ni se mantienen dos verdades distintas.",
        ],
      },
      {
        h2: "Publicación en las tiendas",
        body: [
          "Publicar en Google Play y en la App Store tiene sus propios requisitos: cuentas de desarrollador a tu nombre, política de privacidad, capturas, descripciones y una revisión que puede tardar días y rechazar la primera versión por detalles.",
          "Nos encargamos del proceso completo, pero las cuentas se abren a tu nombre y con tu tarjeta. Es tu app: no queremos que dependa de una cuenta nuestra para seguir existiendo.",
          "Ten en cuenta que las tiendas cobran su propia cuota anual de desarrollador, que no forma parte de lo que nos pagas a nosotros.",
        ],
      },
      {
        h2: "Después de publicar",
        subsections: [
          {
            h3: "Las apps necesitan mantenimiento",
            body: [
              "Android e iOS sacan versiones nuevas cada año y de vez en cuando rompen algo. Una app abandonada dos años deja de funcionar sola. Eso se contempla desde el principio, no como una sorpresa.",
            ],
          },
          {
            h3: "Actualizar no es instantáneo",
            body: [
              "Cada cambio pasa por revisión de la tienda. Por eso lo que cambia seguido — precios, textos, promociones — se controla desde un panel y no se mete dentro de la app.",
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: "¿Cuánto cuesta una app?",
        a: "Bastante más que un sitio web, y por eso no publicamos un precio de lista. Una app sencilla conectada a un sistema existente es un proyecto; una plataforma con varios roles y pagos es otro. El número se cierra antes de empezar.",
      },
      {
        q: "¿Sale para Android y iPhone?",
        a: "Sí, con una sola base de código. Si tu presupuesto solo alcanza para uno, recomendamos empezar por Android por cuota de mercado local.",
      },
      {
        q: "¿Puede funcionar sin internet?",
        a: "Puede, si el caso lo requiere. Se guarda lo que se hace sin señal y se sincroniza al reconectar. Es una de las razones legítimas para hacer una app y no una web.",
      },
      {
        q: "¿Y si mejor necesito una web?",
        a: "Te lo vamos a decir en la primera conversación, aunque signifique un proyecto más pequeño. Cobrar por una app que nadie va a descargar no nos sirve a ninguno de los dos.",
      },
    ],
    related: [
      { to: "software", label: "Desarrollo de software a medida y sistemas internos" },
      { to: "desarrolloWeb", label: "Cómo funciona el desarrollo web a medida" },
      { to: "contacto", label: "Solicitar una propuesta" },
    ],
    cta: {
      heading: "Cuéntanos qué haría la app",
      text: "Descríbenos quién la usaría y para qué. Te decimos con franqueza si una app es el camino o si una web para móvil te resuelve lo mismo por menos.",
      label: "Escribir por WhatsApp",
      message:
        "Hola, estoy evaluando una aplicación móvil para mi negocio. La usarían [quién] para [qué]:",
    },
  },

  en: {
    eyebrow: "Service",
    h1: "Custom mobile apps",
    lead: [
      "We develop custom mobile apps for businesses in the Dominican Republic: apps for field teams, for returning customers, or to run a service that today is coordinated through calls and scattered messages.",
      "Before quoting one we'll ask you an uncomfortable question: whether you actually need an app, or whether what you need is a website that works properly on a phone.",
    ],
    sections: [
      {
        h2: "When an app is justified and when it isn't",
        body: [
          "An app makes sense when you need something the browser won't give you: working offline, scanning codes with the camera constantly, sending notifications people actually see, using GPS in the background, or living on the home screen of someone who opens it every week.",
          "It doesn't make sense when all you want is for your business to «have an app». Downloading one is a real barrier: the customer has to search for it, accept permissions and give you space on their phone. For an occasional purchase, almost nobody makes that trip.",
          "If that's your case, we'll say so and build a mobile web experience instead. It costs less, updates instantly, and doesn't depend on anyone approving a new version.",
        ],
      },
      {
        h2: "The kinds of apps we build",
        bullets: [
          {
            title: "Apps for field teams",
            text: "Technicians, drivers or sales reps logging visits, capturing signatures or photos, and syncing once they have signal again.",
          },
          {
            title: "Recurring-service apps",
            text: "For businesses where the same customer returns often: bookings, history, balance or points, reminders for their next appointment.",
          },
          {
            title: "Internal operations apps",
            text: "Inventory, check-in and check-out, compliance checklists. The mobile version of a dashboard you already use on desktop.",
          },
        ],
      },
      {
        h2: "How we build it",
        body: [
          "We work from a single codebase that runs on both Android and iPhone. That means one project instead of two, and a fix applies to both systems at once.",
          "Android is usually the priority in the Dominican market by device share, but the app ships for both unless you decide otherwise.",
          "The app connects to the same system we already built for you, if there is one. No duplicated data and no two competing versions of the truth.",
        ],
      },
      {
        h2: "Publishing to the stores",
        body: [
          "Publishing on Google Play and the App Store has its own requirements: developer accounts in your name, a privacy policy, screenshots, descriptions, and a review that can take days and reject the first version over details.",
          "We handle the whole process, but the accounts are opened in your name and on your card. It's your app: we don't want it depending on an account of ours to keep existing.",
          "Keep in mind the stores charge their own annual developer fee, which isn't part of what you pay us.",
        ],
      },
      {
        h2: "After launch",
        subsections: [
          {
            h3: "Apps need maintenance",
            body: [
              "Android and iOS ship new versions every year and occasionally break something. An app abandoned for two years stops working on its own. That's planned for from the start, not sprung on you later.",
            ],
          },
          {
            h3: "Updating isn't instant",
            body: [
              "Every change goes through store review. That's why anything that changes often — prices, copy, promotions — is controlled from a panel rather than baked into the app.",
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: "What does an app cost?",
        a: "Considerably more than a website, which is why we don't publish a list price. A simple app connected to an existing system is one project; a platform with several roles and payments is another. The number is closed before we start.",
      },
      {
        q: "Does it ship for both Android and iPhone?",
        a: "Yes, from one codebase. If your budget only covers one, we recommend starting with Android given local market share.",
      },
      {
        q: "Can it work without internet?",
        a: "It can, if the case calls for it. Work done offline is stored and synced on reconnect. It's one of the legitimate reasons to build an app rather than a website.",
      },
      {
        q: "What if I actually need a website instead?",
        a: "We'll tell you in the first conversation, even if it means a smaller project. Charging for an app nobody downloads doesn't serve either of us.",
      },
    ],
    related: [
      { to: "software", label: "Custom software development and internal systems" },
      { to: "desarrolloWeb", label: "How custom web development works" },
      { to: "contacto", label: "Request a proposal" },
    ],
    cta: {
      heading: "Tell us what the app would do",
      text: "Describe who would use it and what for. We'll tell you frankly whether an app is the right path or whether mobile web solves the same thing for less.",
      label: "Message us on WhatsApp",
      message:
        "Hi, I'm considering a mobile app for my business. It would be used by [who] to [what]:",
    },
  },
};
