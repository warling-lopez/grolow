import type { ContentTable } from "./types";

export const preciosContent: ContentTable = {
  es: {
    eyebrow: "Precios",
    h1: "Cuánto cuesta una página web en República Dominicana",
    lead: [
      "Es la pregunta que todo el mundo hace primero y casi nadie responde en su sitio. Aquí van los números, los nuestros y los del mercado, para que puedas comparar antes de escribir a nadie.",
      "Una página web en República Dominicana puede costar desde nada hasta varios miles de dólares. La diferencia no es el capricho de quien cotiza: es qué se construye y quién lo construye.",
    ],
    sections: [
      {
        h2: "Los rangos del mercado local",
        bullets: [
          {
            title: "Gratis o casi: constructores por tu cuenta",
            text: "Wix, un tema de WordPress o un enlace tipo Linktree. Entre 0 y 15 dólares al mes. Sirve para empezar, para validar una idea o para un evento puntual. El trabajo lo pones tú.",
          },
          {
            title: "Freelance de entrada: 150 a 400 dólares",
            text: "Normalmente una plantilla adaptada con tus colores y tus textos. Puede ser un buen negocio si tienes claro que eso es lo que estás comprando y no un desarrollo propio.",
          },
          {
            title: "Agencia local: 495 a 725 dólares por un sitio corporativo",
            text: "Es el rango que se ve publicado en los sitios de las agencias dominicanas. La mayoría entrega sobre WordPress con un tema comprado.",
          },
          {
            title: "Desarrollo a medida: desde 550 dólares y sin techo claro",
            text: "Aquí el precio deja de depender del número de páginas y pasa a depender de qué tiene que hacer el sistema. Un sitio de servicios y una plataforma con reservas y pagos no se parecen en nada.",
          },
        ],
      },
      {
        h2: "Lo que cobramos nosotros",
        subsections: [
          {
            h3: "Plan mensual: US$150 de setup + US$45 al mes",
            body: [
              "Incluye el sitio construido a medida, el dominio, el alojamiento y el mantenimiento mientras el plan esté activo. Está pensado para negocios que prefieren no desembolsar todo de una vez y no quieren ocuparse de la parte técnica.",
            ],
          },
          {
            h3: "Pago único: desde US$550",
            body: [
              "El mismo sistema, pagado de una vez. El dominio y el alojamiento corren por tu cuenta, y el código queda contigo. Es la opción de quien quiere control total y no quiere una cuota recurrente.",
            ],
          },
          {
            h3: "Proyectos con sistema o integraciones",
            body: [
              "Paneles internos, reservas, inventario o aplicaciones móviles se cotizan por proyecto, porque el alcance cambia demasiado entre un caso y otro como para publicar un número honesto. Lo que sí es fijo: el número se cierra antes de empezar y no se mueve durante el proyecto.",
            ],
          },
        ],
      },
      {
        h2: "De qué depende realmente el precio",
        body: [
          "El número de páginas es lo que menos pesa, aunque sea lo primero que se pregunta. Añadir una página más a un sitio ya construido cuesta poco.",
          "Lo que mueve el precio es si hay que producir el contenido o tú lo entregas, si hay funciones que guardan datos (formularios complejos, reservas, cuentas de usuario), si hay que conectar con sistemas que ya usas, y en cuánto tiempo lo necesitas. Un proyecto urgente cuesta más porque desplaza a otro.",
        ],
      },
      {
        h2: "Señales de alerta al comparar cotizaciones",
        bullets: [
          {
            title: "«Primera página de Google garantizada»",
            text: "Nadie puede garantizar una posición en Google. Ni una agencia local, ni una internacional, ni Google mismo lo permite en sus términos. Quien lo garantiza está vendiendo algo que no controla, o va a posicionarte por una frase que nadie busca para poder decir que cumplió.",
          },
          {
            title: "«50 backlinks incluidos»",
            text: "Los enlaces comprados por paquete vienen de redes creadas para eso, y son exactamente lo que los buscadores penalizan. Es un servicio que puede dejarte peor que antes.",
          },
          {
            title: "Un precio muy por debajo del resto sin explicación",
            text: "Suele significar plantilla, o que el mantenimiento y el alojamiento aparecen después como cargos separados. Pregunta qué incluye el primer año completo, no el primer mes.",
          },
          {
            title: "No queda claro de quién es el dominio",
            text: "Si el dominio se registra a nombre del proveedor, cambiar de proveedor se vuelve una negociación. Debe estar a tu nombre desde el primer día, siempre.",
          },
        ],
      },
      {
        h2: "Qué preguntar antes de firmar",
        body: [
          "¿El dominio queda a mi nombre? ¿Qué pasa si dejo de pagar la mensualidad: se apaga el sitio o me lo llevo? ¿El mantenimiento incluye cambios de contenido o solo que el sitio siga en línea? ¿Quién responde si algo falla un fin de semana?",
          "Son cuatro preguntas incómodas y las cuatro se contestan en un minuto. Un proveedor que se enreda respondiéndolas ya te dijo lo que necesitabas saber.",
        ],
      },
    ],
    faq: [
      {
        q: "¿Por qué no publican un precio para todo?",
        a: "Porque para los proyectos con sistema sería un número inventado. Publicamos los precios de lo que sí es estandarizable — el sitio a medida en sus dos modalidades — y cotizamos aparte lo que depende del alcance.",
      },
      {
        q: "¿El precio incluye el contenido y las fotos?",
        a: "Redactamos la primera versión de los textos. Las fotos de producto o de tu equipo las pones tú; si necesitas producción fotográfica, te decimos con quién y cuánto suele costar, pero no lo facturamos nosotros.",
      },
      {
        q: "¿Hay costos que aparezcan después?",
        a: "El dominio se renueva cada año y esa renovación es tuya. En el plan de pago único, el alojamiento también. Todo eso se dice en la propuesta, con su monto aproximado, antes de que firmes.",
      },
      {
        q: "¿Puedo empezar con el plan mensual y pasarme al pago único?",
        a: "Sí. Se calcula la diferencia según lo ya abonado y se hace el traspaso del código y los accesos.",
      },
    ],
    related: [
      { to: "desarrolloWeb", label: "Qué incluye el desarrollo web a medida" },
      { to: "empresas", label: "Sitios web para empresas medianas" },
      { to: "casos", label: "Casos de éxito con proyectos reales" },
    ],
    cta: {
      heading: "¿Cuánto costaría el tuyo?",
      text: "Cuéntanos qué necesitas y te devolvemos una propuesta con el número cerrado en menos de 24 horas. Sin reunión previa obligatoria y sin «desde».",
      label: "Pedir mi propuesta",
      message:
        "Hola, quiero una propuesta para mi proyecto. Lo que necesito es:",
    },
  },

  en: {
    eyebrow: "Pricing",
    h1: "What a website costs in the Dominican Republic",
    lead: [
      "It's the question everyone asks first and almost nobody answers on their site. Here are the numbers — ours and the market's — so you can compare before writing to anyone.",
      "A website in the Dominican Republic can cost anywhere from nothing to several thousand dollars. The difference isn't the whim of whoever quotes it: it's what gets built, and who builds it.",
    ],
    sections: [
      {
        h2: "Local market ranges",
        bullets: [
          {
            title: "Free or nearly: DIY builders",
            text: "Wix, a WordPress theme, or a Linktree-style link. Between 0 and 15 dollars a month. Fine to start, to validate an idea, or for a one-off event. You supply the work.",
          },
          {
            title: "Entry-level freelance: 150 to 400 dollars",
            text: "Usually a template adapted with your colors and your copy. It can be a fine deal, as long as you know that's what you're buying and not a custom build.",
          },
          {
            title: "Local agency: 495 to 725 dollars for a corporate site",
            text: "That's the range published on Dominican agency sites. Most deliver on WordPress with a purchased theme.",
          },
          {
            title: "Custom development: from 550 dollars, with no clear ceiling",
            text: "Here price stops depending on page count and starts depending on what the system has to do. A services site and a platform with bookings and payments have nothing in common.",
          },
        ],
      },
      {
        h2: "What we charge",
        subsections: [
          {
            h3: "Monthly plan: US$150 setup + US$45 per month",
            body: [
              "Includes the custom-built site, domain, hosting and maintenance while the plan is active. It's designed for businesses that would rather not pay everything at once and don't want to handle the technical side.",
            ],
          },
          {
            h3: "One-time payment: from US$550",
            body: [
              "The same system, paid at once. Domain and hosting are on you, and the code stays with you. This is the option for people who want full control and no recurring fee.",
            ],
          },
          {
            h3: "Projects with systems or integrations",
            body: [
              "Internal dashboards, bookings, inventory or mobile apps are quoted per project, because scope varies too much between cases to publish an honest number. What is fixed: the number closes before we start and doesn't move during the project.",
            ],
          },
        ],
      },
      {
        h2: "What actually drives the price",
        body: [
          "Page count matters least, even though it's the first thing people ask. Adding one more page to a built site costs little.",
          "What moves the price is whether content has to be produced or you supply it, whether there are features that store data (complex forms, bookings, user accounts), whether we connect to systems you already use, and how soon you need it. A rush project costs more because it displaces another.",
        ],
      },
      {
        h2: "Warning signs when comparing quotes",
        bullets: [
          {
            title: "«Guaranteed first page of Google»",
            text: "Nobody can guarantee a Google position. Not a local agency, not an international one, and Google's own terms don't allow the claim. Whoever guarantees it is selling something they don't control — or will rank you for a phrase nobody searches so they can say they delivered.",
          },
          {
            title: "«50 backlinks included»",
            text: "Links bought in bulk come from networks built for that purpose, and they're exactly what search engines penalize. It's a service that can leave you worse off than before.",
          },
          {
            title: "A price far below everyone else with no explanation",
            text: "It usually means a template, or that maintenance and hosting show up later as separate charges. Ask what a full first year includes, not the first month.",
          },
          {
            title: "It isn't clear who owns the domain",
            text: "If the domain is registered to the provider, changing provider becomes a negotiation. It should be in your name from day one, always.",
          },
        ],
      },
      {
        h2: "What to ask before signing",
        body: [
          "Is the domain in my name? What happens if I stop paying the monthly fee — does the site go dark or do I take it with me? Does maintenance include content changes or only keeping the site online? Who answers if something breaks on a weekend?",
          "Four uncomfortable questions, all answerable in a minute. A provider who tangles up answering them has already told you what you needed to know.",
        ],
      },
    ],
    faq: [
      {
        q: "Why don't you publish a price for everything?",
        a: "Because for projects with a system it would be an invented number. We publish prices for what can genuinely be standardized — the custom site in its two forms — and quote scope-dependent work separately.",
      },
      {
        q: "Does the price include content and photos?",
        a: "We write the first version of the copy. Product or team photos come from you; if you need a photo shoot we'll tell you who and roughly what it costs, but we don't bill it.",
      },
      {
        q: "Are there costs that appear later?",
        a: "The domain renews yearly and that renewal is yours. On the one-time plan, hosting is too. All of it is stated in the proposal, with approximate amounts, before you sign.",
      },
      {
        q: "Can I start on the monthly plan and move to one-time?",
        a: "Yes. We calculate the difference against what you've already paid and hand over the code and credentials.",
      },
    ],
    related: [
      { to: "desarrolloWeb", label: "What custom web development includes" },
      { to: "empresas", label: "Websites for mid-sized companies" },
      { to: "casos", label: "Case studies from real projects" },
    ],
    cta: {
      heading: "What would yours cost?",
      text: "Tell us what you need and we'll send back a proposal with a closed number in under 24 hours. No mandatory call first, and no «starting at».",
      label: "Request my proposal",
      message: "Hi, I'd like a proposal for my project. What I need is:",
    },
  },
};
