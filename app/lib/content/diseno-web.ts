import type { ContentTable } from "./types";

export const disenoWebContent: ContentTable = {
  es: {
    eyebrow: "Servicio",
    h1: "Diseño web en Santo Domingo",
    lead: [
      "Somos un estudio de diseño web en Santo Domingo. Diseñamos y programamos el sitio nosotros mismos, así que lo que apruebas en el diseño es exactamente lo que termina publicado: no hay una etapa intermedia donde un tema comprado recorta la idea para que quepa.",
      "Atendemos negocios de la capital y del resto del país, y trabajamos en español y en inglés.",
    ],
    sections: [
      {
        h2: "Diseño y programación en el mismo equipo",
        body: [
          "El reparto habitual es que una persona diseña en Figma y otra intenta reproducirlo dentro de las limitaciones de una plantilla. Ahí se pierde la mitad de las decisiones: los espacios cambian, las tipografías se sustituyen por las que el tema trae, y la versión móvil termina siendo la que el constructor decidió.",
          "Cuando el que diseña también escribe el código, esa negociación no existe. Se diseña sabiendo lo que se puede construir, y se construye sin recortar lo diseñado.",
        ],
      },
      {
        h2: "Diseñar para el mercado dominicano",
        body: [
          "La mayor parte del tráfico en República Dominicana llega desde el celular y con datos móviles, muchas veces fuera de una red buena. Eso condiciona el diseño más de lo que parece.",
          "Significa que el peso de la página importa tanto como la estética: una portada con un video de fondo de doce megas se ve espectacular en la oficina y se abandona antes de cargar en la calle. Significa también que el primer contacto casi siempre termina en WhatsApp, y que el camino hasta ese mensaje tiene que ser corto y evidente desde el primer scroll.",
          "Diseñamos con esas dos restricciones delante, no como un ajuste al final.",
        ],
      },
      {
        h2: "Qué recibes",
        bullets: [
          {
            title: "Una identidad aplicada, no una plantilla teñida",
            text: "Tipografía, paleta, ritmo de espacios y tono de los textos se deciden para tu negocio. Si ya tienes manual de marca, se respeta; si no lo tienes, se define lo mínimo para que el sitio sea coherente.",
          },
          {
            title: "Diseño móvil primero",
            text: "La versión de celular se diseña antes que la de escritorio, porque es la que va a ver la mayoría de tus clientes.",
          },
          {
            title: "Accesibilidad como parte del diseño",
            text: "Contraste suficiente para leer al sol, áreas de toque cómodas y navegación con teclado. Además de ser lo correcto, tanto Google como Bing lo toman en cuenta.",
          },
          {
            title: "Textos escritos, no rellenados",
            text: "No entregamos un sitio con texto de relleno esperando que tú lo completes. Redactamos la primera versión de los textos y la ajustamos contigo.",
          },
        ],
      },
      {
        h2: "El diseño se mide, no solo se mira",
        body: [
          "Un diseño bonito que nadie usa no sirve. Dejamos instalada la analítica desde el primer día y marcamos los clics que importan: cuántas personas llegan al formulario, cuántas escriben por WhatsApp y desde qué página lo hacen.",
          "Con eso, a los dos meses la conversación deja de ser sobre gustos y pasa a ser sobre qué página trae clientes y cuál no.",
        ],
      },
      {
        h2: "Cómo empieza un proyecto de diseño",
        subsections: [
          {
            h3: "Una conversación, no un formulario de veinte campos",
            body: [
              "La primera llamada es para entender qué vendes, a quién y qué te está costando conseguir hoy. De ahí sale el alcance.",
            ],
          },
          {
            h3: "Una propuesta con número cerrado",
            body: [
              "En menos de 24 horas recibes qué incluye, cuánto cuesta y cuándo está listo. Si el proyecto necesita más discovery del que cabe en una llamada, se dice ahí y no después.",
            ],
          },
          {
            h3: "Revisión sobre el sitio real",
            body: [
              "Revisas el diseño navegándolo en tu propio celular, con un enlace privado. Las correcciones se aplican sobre eso.",
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: "¿Tienen oficina para reunirnos en Santo Domingo?",
        a: "Trabajamos en remoto y coordinamos videollamada o reunión presencial según el proyecto. La mayoría de nuestros clientes prefiere resolverlo por WhatsApp y videollamada, que es más rápido para ambos.",
      },
      {
        q: "¿Puedo usar mi logo actual?",
        a: "Sí. Si tienes los archivos originales los usamos tal cual. Si solo tienes una imagen de baja resolución, lo redibujamos para que se vea bien en pantalla.",
      },
      {
        q: "¿Cuántas rondas de cambios incluye?",
        a: "No contamos rondas. Ajustamos hasta que el diseño esté aprobado, dentro del alcance acordado. Lo que sí se cotiza aparte es cambiar el alcance a mitad del proyecto.",
      },
      {
        q: "¿El diseño se ve igual en todos los celulares?",
        a: "Se prueba en pantallas pequeñas, medianas y de escritorio. No se congela un ancho fijo: el diseño se adapta, que es distinto a hacer tres versiones separadas.",
      },
    ],
    related: [
      { to: "desarrolloWeb", label: "Cómo funciona el desarrollo web a medida" },
      {
        to: "casoHellens",
        label: "Caso: Hellen's Cute Kids, una landing de conversión por zonas",
      },
      { to: "precios", label: "Cuánto cuesta una página web en RD" },
    ],
    cta: {
      heading: "¿Diseñamos el tuyo?",
      text: "Mándanos el enlace de tu sitio actual, o dinos que empiezas de cero. Te decimos qué haríamos distinto y cuánto costaría, en menos de 24 horas.",
      label: "Escribir por WhatsApp",
      message:
        "Hola, quiero rediseñar (o crear) el sitio de mi negocio en Santo Domingo. Les cuento:",
    },
  },

  en: {
    eyebrow: "Service",
    h1: "Web design in Santo Domingo",
    lead: [
      "We are a web design studio in Santo Domingo. We design and code the site ourselves, so what you approve in the design is exactly what gets published: there is no middle stage where a purchased theme trims the idea down to fit.",
      "We serve businesses in the capital and across the country, and we work in Spanish and English.",
    ],
    sections: [
      {
        h2: "Design and code in the same hands",
        body: [
          "The usual split is that one person designs in Figma and another tries to reproduce it inside a template's limits. Half the decisions get lost there: spacing shifts, typefaces are swapped for whatever the theme ships, and the mobile version ends up being whatever the builder decided.",
          "When the person designing also writes the code, that negotiation doesn't happen. You design knowing what can be built, and you build without trimming what was designed.",
        ],
      },
      {
        h2: "Designing for the Dominican market",
        body: [
          "Most traffic in the Dominican Republic arrives from a phone on mobile data, often outside a good network. That shapes the design more than it seems.",
          "It means page weight matters as much as aesthetics: a homepage with a twelve-megabyte background video looks spectacular in the office and gets abandoned before it loads on the street. It also means first contact almost always ends in WhatsApp, and the path to that message has to be short and obvious from the first scroll.",
          "We design with both constraints in front of us, not as a final adjustment.",
        ],
      },
      {
        h2: "What you get",
        bullets: [
          {
            title: "An identity applied, not a tinted template",
            text: "Typography, palette, spacing rhythm and tone of voice are decided for your business. If you have brand guidelines we follow them; if you don't, we define the minimum needed for the site to hold together.",
          },
          {
            title: "Mobile designed first",
            text: "The phone version is designed before the desktop one, because that's what most of your customers will see.",
          },
          {
            title: "Accessibility as part of the design",
            text: "Contrast you can read in sunlight, comfortable tap targets and keyboard navigation. Besides being right, both Google and Bing take it into account.",
          },
          {
            title: "Copy written, not filled in",
            text: "We don't hand over a site full of placeholder text for you to complete. We write the first version of the copy and refine it with you.",
          },
        ],
      },
      {
        h2: "Design gets measured, not just looked at",
        body: [
          "A beautiful design nobody uses is worthless. We install analytics from day one and tag the clicks that matter: how many people reach the form, how many message on WhatsApp, and which page they came from.",
          "Two months in, the conversation stops being about taste and starts being about which page brings clients and which doesn't.",
        ],
      },
      {
        h2: "How a design project starts",
        subsections: [
          {
            h3: "A conversation, not a twenty-field form",
            body: [
              "The first call is to understand what you sell, to whom, and what it's costing you to win business today. Scope comes out of that.",
            ],
          },
          {
            h3: "A proposal with a closed number",
            body: [
              "Within 24 hours you get what's included, what it costs and when it's ready. If the project needs more discovery than fits in one call, we say so then, not later.",
            ],
          },
          {
            h3: "Review on the real site",
            body: [
              "You review the design by navigating it on your own phone, through a private link. Corrections are applied to that.",
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: "Do you have an office to meet in Santo Domingo?",
        a: "We work remotely and arrange a video or in-person meeting depending on the project. Most of our clients prefer WhatsApp and video calls, which is faster for everyone.",
      },
      {
        q: "Can I keep my current logo?",
        a: "Yes. If you have the original files we use them as they are. If you only have a low-resolution image, we redraw it so it looks right on screen.",
      },
      {
        q: "How many rounds of changes are included?",
        a: "We don't count rounds. We adjust until the design is approved, within the agreed scope. Changing the scope mid-project is what gets quoted separately.",
      },
      {
        q: "Will the design look the same on every phone?",
        a: "It's tested on small, medium and desktop screens. We don't freeze a fixed width: the design adapts, which is different from making three separate versions.",
      },
    ],
    related: [
      { to: "desarrolloWeb", label: "How custom web development works" },
      { to: "casoHellens", label: "Case study: Hellen's Cute Kids, a landing page built around service areas" },
      { to: "precios", label: "What a website costs in the Dominican Republic" },
    ],
    cta: {
      heading: "Shall we design yours?",
      text: "Send us the link to your current site, or tell us you're starting from zero. We'll tell you what we'd do differently and what it would cost, in under 24 hours.",
      label: "Message us on WhatsApp",
      message:
        "Hi, I want to redesign (or create) my business website in Santo Domingo. Here's the context:",
    },
  },
};
