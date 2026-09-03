import type { ContentTable } from "./types";

export const softwareContent: ContentTable = {
  es: {
    eyebrow: "Servicio",
    h1: "Desarrollo de software a medida",
    lead: [
      "Hacemos desarrollo de software a medida para negocios que ya crecieron por encima de lo que aguanta una hoja de cálculo. Paneles internos, sistemas de reservas, control de inventario, portales para clientes y las integraciones que los conectan.",
      "No vendemos una licencia mensual de un producto que ya existe: construimos la pieza que a tu operación le falta.",
    ],
    sections: [
      {
        h2: "La señal de que necesitas un sistema propio",
        body: [
          "Casi nunca llega como «necesito software». Llega como síntomas: dos personas se pisan editando el mismo Excel, alguien tiene que copiar a mano los pedidos de WhatsApp a una planilla, o nadie sabe cuál es el número bueno porque hay tres archivos con el mismo nombre y fechas distintas.",
          "También llega cuando la operación depende de una persona: si esa persona se enferma, nadie más sabe en qué estado está cada cliente. Eso no es un problema de disciplina, es que la información vive en la cabeza de alguien en lugar de en un sistema.",
          "Cuando aparece cualquiera de esos síntomas, un sistema a medida deja de ser un lujo y empieza a pagarse solo en horas recuperadas.",
        ],
      },
      {
        h2: "Qué construimos",
        bullets: [
          {
            title: "Paneles internos",
            text: "Un lugar donde tu equipo ve el estado real de cada pedido, cliente o proyecto, con permisos distintos según quién entra.",
          },
          {
            title: "Reservas y citas",
            text: "Agenda en línea con disponibilidad real, confirmaciones y recordatorios automáticos, para que la recepción deje de ser un cuello de botella.",
          },
          {
            title: "Inventario y catálogo",
            text: "Control de existencias conectado a lo que se muestra en el sitio, para que no se venda lo que no hay.",
          },
          {
            title: "Integraciones",
            text: "Conectar lo que ya usas: WhatsApp, correo, pasarelas de pago, hojas de cálculo o el sistema contable, para que los datos dejen de copiarse a mano.",
          },
        ],
      },
      {
        h2: "Empezamos por lo más pequeño que resuelva algo",
        body: [
          "El error más caro en software a medida es intentar construir todo el sistema de una vez. El proyecto se alarga, el presupuesto se dispara y cuando por fin se entrega la operación ya cambió.",
          "Preferimos identificar el punto donde más tiempo se pierde hoy y resolver solo eso primero, en semanas y no en meses. Ese primer módulo entra en uso real, y lo que se aprende usándolo define qué se construye después. Es más barato y se equivoca menos.",
        ],
      },
      {
        h2: "Sobre los datos y quién los controla",
        body: [
          "La base de datos es tuya y se te entregan los accesos. Si algún día decides seguir con otro equipo, te llevas la información completa y en un formato estándar, sin tener que pedir permiso.",
          "Tampoco metemos datos de tus clientes en servicios de terceros sin decírtelo. Si una integración necesita enviar información fuera, se te explica qué sale, a dónde y para qué, antes de conectarla.",
        ],
      },
      {
        h2: "Qué pasa después de entregar",
        subsections: [
          {
            h3: "El sistema se documenta",
            body: [
              "Se entrega con una explicación de cómo funciona cada parte y cómo se opera. No queda una caja negra que solo nosotros sabemos abrir.",
            ],
          },
          {
            h3: "Los ajustes son normales",
            body: [
              "El primer mes de uso real siempre revela detalles que ninguna reunión anticipa. Ese ajuste está contemplado y no se cobra aparte.",
            ],
          },
          {
            h3: "Crecer es opcional, no obligatorio",
            body: [
              "Si el sistema resuelve lo que tenía que resolver y no necesitas nada más, ahí se queda. No hay una suscripción que te obligue a seguir pagando por funciones que no pediste.",
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: "¿Cuánto cuesta un sistema a medida?",
        a: "Depende del alcance y por eso no publicamos un precio fijo: un módulo único cuesta bastante menos que una plataforma con varios roles e integraciones. Lo que sí garantizamos es que el número que te damos es cerrado antes de empezar.",
      },
      {
        q: "¿Puede conectarse con el sistema que ya uso?",
        a: "Si ese sistema tiene forma de conectarse — una API, exportación de archivos o acceso a su base de datos — sí. En la primera conversación revisamos qué usas y te decimos con franqueza si la conexión es viable.",
      },
      {
        q: "¿Qué pasa si el sistema falla un domingo?",
        a: "Los proyectos con sistema incluyen un canal directo para incidencias. Escribes al mismo WhatsApp de siempre y responde quien construyó el sistema, no un ticket que pasa por tres niveles.",
      },
      {
        q: "¿Necesito ser técnico para operarlo?",
        a: "No. El panel se diseña para la persona que va a usarlo todos los días, que normalmente no es técnica. Si algo necesita un manual de veinte páginas, está mal diseñado.",
      },
    ],
    related: [
      { to: "desarrolloWeb", label: "Cómo funciona el desarrollo web a medida" },
      { to: "empresas", label: "Sitios y sistemas para empresas medianas" },
      { to: "apps", label: "Desarrollo de aplicaciones móviles" },
    ],
    cta: {
      heading: "Cuéntanos dónde se te va el tiempo",
      text: "Descríbenos el proceso que hoy resuelves a mano y te decimos si se puede automatizar, cuánto tomaría y cuánto costaría. Si la respuesta es que no lo necesitas todavía, también te lo decimos.",
      label: "Escribir por WhatsApp",
      message:
        "Hola, necesito un sistema a medida para mi negocio. El proceso que quiero resolver es:",
    },
  },

  en: {
    eyebrow: "Service",
    h1: "Custom software development",
    lead: [
      "We do custom software development for businesses that have outgrown what a spreadsheet can hold. Internal dashboards, booking systems, inventory control, client portals and the integrations that tie them together.",
      "We don't sell you a monthly licence for a product that already exists: we build the piece your operation is missing.",
    ],
    sections: [
      {
        h2: "The signs you need a system of your own",
        body: [
          "It almost never arrives as «I need software». It arrives as symptoms: two people overwriting each other in the same spreadsheet, someone copying WhatsApp orders into a sheet by hand, or nobody knowing which number is right because there are three files with the same name and different dates.",
          "It also arrives when the operation depends on one person: if they get sick, nobody else knows where each client stands. That isn't a discipline problem — it's information living in someone's head instead of in a system.",
          "Once any of those show up, a custom system stops being a luxury and starts paying for itself in recovered hours.",
        ],
      },
      {
        h2: "What we build",
        bullets: [
          {
            title: "Internal dashboards",
            text: "One place where your team sees the real status of every order, client or project, with different permissions depending on who logs in.",
          },
          {
            title: "Bookings and appointments",
            text: "Online scheduling with real availability, confirmations and automatic reminders, so the front desk stops being the bottleneck.",
          },
          {
            title: "Inventory and catalog",
            text: "Stock control connected to what the site shows, so you don't sell what you don't have.",
          },
          {
            title: "Integrations",
            text: "Connecting what you already use: WhatsApp, email, payment gateways, spreadsheets or your accounting system, so data stops being copied by hand.",
          },
        ],
      },
      {
        h2: "We start with the smallest thing that solves something",
        body: [
          "The most expensive mistake in custom software is trying to build the whole system at once. The project stretches, the budget balloons, and by the time it ships the operation has changed.",
          "We prefer to find where the most time is lost today and solve only that first, in weeks rather than months. That first module goes into real use, and what you learn using it decides what gets built next. It's cheaper and it guesses wrong less often.",
        ],
      },
      {
        h2: "About your data and who controls it",
        body: [
          "The database is yours and you get the credentials. If one day you decide to continue with another team, you take the full data in a standard format, without asking permission.",
          "We also don't put your customers' data into third-party services without telling you. If an integration needs to send information out, we explain what leaves, where it goes and why, before connecting it.",
        ],
      },
      {
        h2: "What happens after delivery",
        subsections: [
          {
            h3: "The system is documented",
            body: [
              "It ships with an explanation of how each part works and how it's operated. You're not left with a black box only we know how to open.",
            ],
          },
          {
            h3: "Adjustments are expected",
            body: [
              "The first month of real use always reveals details no meeting anticipates. That adjustment is accounted for and not billed separately.",
            ],
          },
          {
            h3: "Growing is optional",
            body: [
              "If the system solves what it had to solve and you need nothing else, it stays there. There's no subscription forcing you to keep paying for features you didn't ask for.",
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: "What does a custom system cost?",
        a: "It depends on scope, which is why we don't publish a fixed price: a single module costs considerably less than a platform with several roles and integrations. What we do guarantee is that the number we give you is closed before we start.",
      },
      {
        q: "Can it connect to the system I already use?",
        a: "If that system offers a way in — an API, file export or database access — yes. In the first conversation we review what you use and tell you frankly whether the connection is workable.",
      },
      {
        q: "What if the system fails on a Sunday?",
        a: "Projects with a system include a direct channel for incidents. You write to the same WhatsApp as always and the person who built the system answers, not a ticket passing through three levels.",
      },
      {
        q: "Do I need to be technical to run it?",
        a: "No. The panel is designed for the person using it every day, who usually isn't technical. If something needs a twenty-page manual, it's badly designed.",
      },
    ],
    related: [
      { to: "desarrolloWeb", label: "How custom web development works" },
      { to: "empresas", label: "Sites and systems for mid-sized companies" },
      { to: "apps", label: "Mobile app development" },
    ],
    cta: {
      heading: "Tell us where your time goes",
      text: "Describe the process you handle by hand today and we'll tell you whether it can be automated, how long it would take and what it would cost. If the answer is that you don't need it yet, we'll say that too.",
      label: "Message us on WhatsApp",
      message:
        "Hi, I need a custom system for my business. The process I want to solve is:",
    },
  },
};
