import type { ContentTable } from "./types";

/**
 * Casos de éxito en detalle.
 *
 * Regla heredada de `ProjectsSection`: nada de porcentajes ni cifras que no se
 * hayan medido en ese cliente concreto. Lo que se cuenta es el cambio operativo
 * verificable, que además es lo que el lector puede comprobar abriendo el sitio.
 */

export const casoLaperfumContent: ContentTable = {
  es: {
    eyebrow: "Caso de éxito",
    h1: "La Perfurm RD: tienda en línea con pedidos por WhatsApp",
    lead: [
      "La Perfurm RD vende perfumería de nicho en República Dominicana. Construimos su tienda en línea con pedidos por WhatsApp: un catálogo visual centralizado donde el cliente ve todo el inventario y envía el pedido ya armado.",
      "El sitio está en línea en laperfum1.com y puedes recorrerlo mientras lees esto.",
    ],
    sections: [
      {
        h2: "La situación de partida",
        body: [
          "El catálogo se gestionaba de forma manual y repartida entre canales. Las fotos de los perfumes vivían en publicaciones de Instagram, en estados de WhatsApp y en conversaciones sueltas con clientes.",
          "Eso genera dos costos que no aparecen en ninguna cuenta. El primero es el tiempo: cada cliente nuevo pregunta lo mismo, y la respuesta es volver a buscar la foto y volver a escribir el precio. El segundo es la marca: una perfumería de nicho vende exclusividad, y esa percepción se pierde cuando el producto se muestra en una captura reenviada varias veces.",
          "Además, sin una vitrina central no había forma de que un cliente descubriera un perfume que no había visto pasar por el feed ese día.",
        ],
      },
      {
        h2: "Qué construimos",
        subsections: [
          {
            h3: "Un catálogo visual acorde al producto",
            body: [
              "El diseño se trabajó para que el producto se vea como lo que es. En perfumería de nicho la presentación no es decoración: es parte de lo que justifica el precio frente a una fragancia de tienda departamental.",
            ],
          },
          {
            h3: "Pedidos canalizados a WhatsApp",
            body: [
              "El cliente selecciona lo que quiere y el pedido llega al WhatsApp de la marca con el producto y la cantidad ya escritos. No hay que reconstruirlo leyendo hacia atrás una conversación de veinte mensajes.",
            ],
          },
          {
            h3: "Sin comisiones de terceros",
            body: [
              "No se montó sobre un marketplace ni sobre una plataforma que cobre por venta. El margen de cada perfume se queda completo en el negocio.",
            ],
          },
        ],
      },
      {
        h2: "Qué cambió",
        body: [
          "Todo el catálogo quedó en un solo enlace, el que va en la bio de Instagram. Un cliente que llega a cualquier hora ve el inventario completo sin que nadie tenga que contestarle.",
          "Los pedidos entran a WhatsApp ya armados, con el producto y la cantidad, en vez de irse construyendo a lo largo de una conversación. Ese es el cambio concreto y es el que se puede verificar entrando al sitio.",
        ],
      },
      {
        h2: "Por qué WhatsApp y no un carrito con pago en línea",
        body: [
          "Porque en este mercado la venta de perfumería todavía se cierra hablando: se coordina la entrega, a veces se ajusta el pedido y el pago suele ser en efectivo o por transferencia.",
          "Meter un checkout con tarjeta habría añadido un paso justo donde el cliente ya estaba decidido. La decisión fue mantener el cierre donde el negocio ya sabía cerrarlo, y usar el sitio para todo lo anterior.",
        ],
      },
      {
        h2: "Cómo se organizó el catálogo",
        body: [
          "Una perfumería no se ordena como una tienda de ropa. El cliente no llega buscando una talla: llega buscando una familia olfativa, una marca concreta o un rango de precio, y muchas veces llega sin saber el nombre exacto de lo que vio.",
          "Por eso el catálogo se estructuró para que se pueda recorrer de varias formas y no solo con una lista alfabética. También se contempló lo que pasa cuando un perfume se agota: en inventarios de nicho las existencias son cortas y rotan rápido, así que marcar algo como no disponible tiene que ser inmediato y sin escribirle a nadie.",
          "Es la clase de detalle que una plantilla genérica de comercio resuelve mal, porque está pensada para catálogos grandes y estables.",
        ],
      },
      {
        h2: "Qué mediríamos en una segunda fase",
        body: [
          "Con el catálogo publicado, la pregunta útil deja de ser cuánta gente entra y pasa a ser qué perfumes se miran mucho y se piden poco. Esa diferencia señala un problema de precio, de foto o de descripción, y se corrige sin tocar el resto del sitio.",
          "No publicamos aquí cifras de ventas porque no las hemos medido nosotros. Lo que sí es verificable es lo anterior: el catálogo está en línea y el flujo de pedido funciona como se describe.",
        ],
      },
    ],
    related: [
      {
        to: "tiendaWhatsapp",
        label: "El servicio: tienda en línea con pedidos por WhatsApp",
      },
      { to: "casos", label: "Ver los otros casos de éxito" },
      { to: "precios", label: "Cuánto cuesta una página web en RD" },
    ],
    cta: {
      heading: "¿Vendes por catálogo?",
      text: "Si tu inventario todavía vive en publicaciones y conversaciones, cuéntanos qué vendes y cuántos productos tienes. Te decimos qué necesitamos y en cuánto tiempo estaría publicado.",
      label: "Escribir por WhatsApp",
      message:
        "Hola, vi el caso de La Perfurm y vendo [producto]. Quiero un catálogo así para mi negocio.",
    },
  },

  en: {
    eyebrow: "Case study",
    h1: "La Perfurm RD: online store with WhatsApp ordering",
    lead: [
      "La Perfurm RD sells niche perfume in the Dominican Republic. We built their online store with WhatsApp ordering: a centralized visual catalog where customers see the full inventory and send the order already assembled.",
      "The site is live at laperfum1.com and you can browse it while reading this.",
    ],
    sections: [
      {
        h2: "The starting point",
        body: [
          "The catalog was managed manually and scattered across channels. Perfume photos lived in Instagram posts, WhatsApp statuses and loose conversations with customers.",
          "That creates two costs that appear on no ledger. The first is time: every new customer asks the same thing, and answering means finding the photo again and typing the price again. The second is brand: niche perfume sells exclusivity, and that perception erodes when the product is shown in a screenshot forwarded several times.",
          "On top of that, with no central showcase there was no way for a customer to discover a fragrance that hadn't passed through the feed that day.",
        ],
      },
      {
        h2: "What we built",
        subsections: [
          {
            h3: "A visual catalog matching the product",
            body: [
              "The design was built so the product looks like what it is. In niche perfume, presentation isn't decoration: it's part of what justifies the price against a department-store fragrance.",
            ],
          },
          {
            h3: "Orders channeled to WhatsApp",
            body: [
              "The customer selects what they want and the order reaches the brand's WhatsApp with product and quantity already written out. Nothing has to be reconstructed by reading back through twenty messages.",
            ],
          },
          {
            h3: "No third-party commissions",
            body: [
              "It wasn't built on a marketplace or a platform charging per sale. The full margin on each bottle stays in the business.",
            ],
          },
        ],
      },
      {
        h2: "What changed",
        body: [
          "The whole catalog now lives in a single link, the one in the Instagram bio. A customer arriving at any hour sees the complete inventory without anyone having to reply.",
          "Orders arrive on WhatsApp already assembled, with product and quantity, instead of being pieced together across a conversation. That's the concrete change, and it's the one you can verify by opening the site.",
        ],
      },
      {
        h2: "Why WhatsApp and not a cart with online payment",
        body: [
          "Because in this market perfume sales still close by talking: delivery gets arranged, the order sometimes gets adjusted, and payment is usually cash or bank transfer.",
          "Adding a card checkout would have introduced a step exactly where the customer had already decided. The decision was to keep the close where the business already knew how to close, and use the site for everything before it.",
        ],
      },
      {
        h2: "How the catalog was organized",
        body: [
          "A perfume shop doesn't sort like a clothing store. The customer doesn't arrive looking for a size: they arrive looking for an olfactory family, a specific house or a price range, and often without knowing the exact name of what they saw.",
          "So the catalog was structured to be browsed in several ways rather than as one alphabetical list. We also planned for what happens when a fragrance sells out: in niche inventories stock is short and turns over fast, so marking something unavailable has to be immediate and require writing to nobody.",
          "It's the kind of detail a generic commerce template handles badly, because it's designed for large, stable catalogs.",
        ],
      },
      {
        h2: "What we'd measure in a second phase",
        body: [
          "With the catalog live, the useful question stops being how many people visit and becomes which fragrances get viewed a lot and ordered rarely. That gap points to a price, photo or description problem, and it's fixable without touching the rest of the site.",
          "We don't publish sales figures here because we haven't measured them. What is verifiable is everything above: the catalog is live and the ordering flow works as described.",
        ],
      },
    ],
    related: [
      { to: "tiendaWhatsapp", label: "The service: online store with WhatsApp ordering" },
      { to: "casos", label: "See the other case studies" },
      { to: "precios", label: "What a website costs in the Dominican Republic" },
    ],
    cta: {
      heading: "Do you sell from a catalog?",
      text: "If your inventory still lives in posts and conversations, tell us what you sell and how many products you carry. We'll tell you what we need and how soon it would be live.",
      label: "Message us on WhatsApp",
      message:
        "Hi, I saw the La Perfurm case study and I sell [product]. I want a catalog like that for my business.",
    },
  },
};

export const casoHellensContent: ContentTable = {
  es: {
    eyebrow: "Caso de éxito",
    h1: "Hellen's Cute Kids: landing de conversión por zonas",
    lead: [
      "Hellen's Cute Kids vende ropa infantil a través de una red de distribuidoras. Construimos una landing de conversión que asigna a cada visitante la distribuidora autorizada de su zona y encamina la compra por WhatsApp.",
      "El sitio está en línea en hellenscute.com.",
    ],
    sections: [
      {
        h2: "El problema de vender con una red",
        body: [
          "Cuando el producto se vende a través de varias distribuidoras, aparece un problema que no tienen los negocios que venden directo: hay que decidir quién atiende a cada cliente.",
          "Sin un sistema, esa decisión la toma una persona a mano. El cliente escribe al número principal, alguien le pregunta de qué zona es y luego lo reenvía a la distribuidora que corresponde. En cada uno de esos pasos se pierde tiempo, y en algunos se pierde el cliente: entre que pregunta y lo reenvían, se enfrió.",
          "También genera fricción interna. Si el reparto de zonas no es evidente y automático, dos distribuidoras pueden terminar atendiendo al mismo cliente, y eso desgasta la red.",
        ],
      },
      {
        h2: "Qué construimos",
        subsections: [
          {
            h3: "Asignación automática por zona",
            body: [
              "El visitante indica dónde está y el sitio lo dirige a la distribuidora autorizada de esa zona. La regla queda escrita en el sistema y deja de depender de que alguien la recuerde y la aplique bien.",
            ],
          },
          {
            h3: "Una landing enfocada en una acción",
            body: [
              "No es un sitio de varias secciones para explorar. Es una página construida para que el visitante haga una sola cosa: elegir su zona y escribir a quien le corresponde.",
            ],
          },
          {
            h3: "Compra directa por WhatsApp",
            body: [
              "El flujo termina en el WhatsApp de la distribuidora correcta, con el contexto ya cargado, para que la conversación empiece en el punto útil.",
            ],
          },
        ],
      },
      {
        h2: "Qué cambió",
        body: [
          "Cada visitante se dirige automáticamente a la distribuidora de su zona. Se acabó el reenvío manual de clientes entre vendedoras, que era el paso donde se iba el tiempo y donde se enfriaban las conversaciones.",
          "Para la marca, además, significa que la red se puede ampliar sin que crezca el trabajo de coordinación: sumar una distribuidora nueva es sumar una zona, no reentrenar a quien repartía a mano.",
        ],
      },
      {
        h2: "Por qué una landing y no un sitio completo",
        body: [
          "Porque el negocio no necesitaba que nadie explorara. Necesitaba que el visitante que llega desde redes haga una acción concreta antes de irse.",
          "Un sitio de seis secciones habría dado más lugares donde perderse. Cuando el objetivo es una sola acción, cada sección adicional es una oportunidad de que el visitante no la complete.",
        ],
      },
      {
        h2: "La decisión difícil: quién queda fuera",
        body: [
          "Asignar zonas obliga a tomar una decisión que antes quedaba difusa: qué pasa con un cliente de una zona donde todavía no hay distribuidora. Con reparto manual eso se resolvía improvisando; con un sistema hay que decidirlo de antemano.",
          "Definirlo fue parte del proyecto, y es la clase de conversación que un sitio bien planteado obliga a tener. El sistema no inventó el problema: lo hizo visible.",
        ],
      },
      {
        h2: "Por qué el flujo termina en WhatsApp y no en un formulario",
        body: [
          "Un formulario habría dejado el contacto en un buzón que alguien tiene que revisar. Con una red de distribuidoras eso reintroduce justo el retraso que el proyecto venía a eliminar.",
          "Terminar en WhatsApp pone la conversación en el teléfono de la persona que va a vender, en el momento en que el cliente todavía está interesado. Es menos elegante en un diagrama y funciona mejor en la calle.",
        ],
      },
    ],
    related: [
      { to: "disenoWeb", label: "El servicio: diseño web en Santo Domingo" },
      { to: "casos", label: "Ver los otros casos de éxito" },
      { to: "empresas", label: "Sitios web para empresas medianas" },
    ],
    cta: {
      heading: "¿Vendes con una red?",
      text: "Si tienes distribuidores, sucursales o vendedoras por zona y hoy repartes los clientes a mano, cuéntanos cómo funciona tu red. Te decimos cómo se automatiza.",
      label: "Escribir por WhatsApp",
      message:
        "Hola, vi el caso de Hellen's Cute Kids. Yo vendo a través de una red y quiero organizar los clientes por zona.",
    },
  },

  en: {
    eyebrow: "Case study",
    h1: "Hellen's Cute Kids: a landing page built around service areas",
    lead: [
      "Hellen's Cute Kids sells children's clothing through a network of distributors. We built a conversion landing page that assigns each visitor the authorized distributor for their zone and routes the purchase through WhatsApp.",
      "The site is live at hellenscute.com.",
    ],
    sections: [
      {
        h2: "The problem with selling through a network",
        body: [
          "When a product is sold through several distributors, a problem appears that direct sellers don't have: someone has to decide who serves each customer.",
          "Without a system, a person makes that decision by hand. The customer writes to the main number, someone asks which zone they're in, then forwards them to the right distributor. Time is lost at every step, and sometimes the customer is lost too: between asking and being forwarded, they cooled off.",
          "It also creates internal friction. If zone assignment isn't obvious and automatic, two distributors can end up serving the same customer, and that wears the network down.",
        ],
      },
      {
        h2: "What we built",
        subsections: [
          {
            h3: "Automatic assignment by zone",
            body: [
              "The visitor indicates where they are and the site routes them to the authorized distributor for that zone. The rule lives in the system instead of depending on someone remembering and applying it correctly.",
            ],
          },
          {
            h3: "A landing page focused on one action",
            body: [
              "It isn't a multi-section site to explore. It's a page built so the visitor does exactly one thing: pick their zone and message the right person.",
            ],
          },
          {
            h3: "Direct purchase over WhatsApp",
            body: [
              "The flow ends in the correct distributor's WhatsApp, with context already loaded, so the conversation starts at the useful point.",
            ],
          },
        ],
      },
      {
        h2: "What changed",
        body: [
          "Every visitor is routed automatically to the distributor in their zone. Manually forwarding customers between sellers is over — that was the step where time went and where conversations cooled.",
          "For the brand it also means the network can grow without coordination work growing with it: adding a distributor means adding a zone, not retraining whoever was routing by hand.",
        ],
      },
      {
        h2: "Why a landing page and not a full site",
        body: [
          "Because the business didn't need anyone to explore. It needed the visitor arriving from social media to take one concrete action before leaving.",
          "A six-section site would have offered more places to get lost. When the goal is a single action, every extra section is another chance the visitor doesn't complete it.",
        ],
      },
      {
        h2: "The hard decision: who gets left out",
        body: [
          "Assigning zones forces a decision that used to stay vague: what happens to a customer in an area with no distributor yet. With manual routing that got improvised; with a system it has to be decided in advance.",
          "Defining it was part of the project, and it's the kind of conversation a well-planned site forces you to have. The system didn't invent the problem — it made it visible.",
        ],
      },
      {
        h2: "Why the flow ends in WhatsApp and not a form",
        body: [
          "A form would have left the contact sitting in an inbox someone has to check. With a distributor network that reintroduces exactly the delay the project set out to remove.",
          "Ending in WhatsApp puts the conversation on the phone of the person who will actually sell, while the customer is still interested. It's less elegant in a diagram and works better on the street.",
        ],
      },
    ],
    related: [
      { to: "disenoWeb", label: "The service: web design in Santo Domingo" },
      { to: "casos", label: "See the other case studies" },
      { to: "empresas", label: "Websites for mid-sized companies" },
    ],
    cta: {
      heading: "Do you sell through a network?",
      text: "If you have distributors, branches or sellers by zone and you're routing customers by hand today, tell us how your network works. We'll tell you how it gets automated.",
      label: "Message us on WhatsApp",
      message:
        "Hi, I saw the Hellen's Cute Kids case study. I sell through a network and want to organize customers by zone.",
    },
  },
};

export const casoWarlingContent: ContentTable = {
  es: {
    eyebrow: "Caso de éxito",
    h1: "Warling Dev: sitio profesional de servicios",
    lead: [
      "Warling Dev es la práctica de desarrollo de Warling López. Construimos un sitio profesional de servicios que explica qué hace, cómo trabaja y cómo contratarlo, sin que él tenga que repetirlo en cada conversación.",
      "El sitio está en línea en warling.top.",
    ],
    sections: [
      {
        h2: "El costo de no tener dónde explicarse",
        body: [
          "Quien vende servicios técnicos por referencia enfrenta el mismo problema una y otra vez: cada cliente potencial llega sin saber qué se ofrece exactamente, cómo es el proceso ni qué pasa después de decir que sí.",
          "Sin un sitio donde eso esté escrito, se explica en vivo. Cada conversación empieza desde cero, con las mismas preguntas y las mismas respuestas. Es tiempo que no se factura y que se repite con cada persona.",
          "Hay un costo adicional menos evidente: sin una presencia propia, quien te recomienda no tiene nada que enviar. La recomendación llega como un número de teléfono y un «él sabe», que es mucho más débil que un enlace.",
        ],
      },
      {
        h2: "Qué construimos",
        subsections: [
          {
            h3: "Servicios explicados uno por uno",
            body: [
              "Qué se ofrece, para quién y qué incluye. Escrito para que alguien no técnico entienda qué está comprando.",
            ],
          },
          {
            h3: "El proceso de trabajo visible",
            body: [
              "Cómo arranca un proyecto, qué se espera del cliente y en qué momentos se revisa. Publicar el proceso reduce la ansiedad de quien va a contratar y filtra a quien buscaba otra cosa.",
            ],
          },
          {
            h3: "Una llamada a la acción clara",
            body: [
              "Un solo camino para agendar una consulta, en lugar de un correo genérico al pie de la página.",
            ],
          },
        ],
      },
      {
        h2: "Qué cambió",
        body: [
          "El sitio carga en menos de dos segundos y explica servicios y proceso sin que él tenga que repetirlo en cada conversación. Quien llega recomendado ya viene sabiendo cómo se trabaja, y la primera llamada empieza donde antes terminaba.",
          "Es el caso más pequeño de los tres y probablemente el más replicable: la mayoría de los profesionales de servicios está exactamente en esta situación.",
        ],
      },
      {
        h2: "Por qué el rendimiento importaba aquí",
        body: [
          "Un desarrollador que entrega sitios lentos tiene un problema de credibilidad que ningún texto arregla. El sitio es, en este caso, una muestra del trabajo.",
          "Por eso se midió la velocidad en lugar de prometerla. Es el mismo criterio que aplicamos al nuestro: si vamos a decir que construimos sitios rápidos, el nuestro tiene que soportar que alguien lo compruebe.",
        ],
      },
      {
        h2: "Qué se dejó fuera a propósito",
        body: [
          "No se construyó blog, ni portafolio extenso, ni sección de testimonios. Los tres son buenos elementos cuando hay con qué llenarlos, y ninguno cuando no.",
          "Un blog vacío con la última entrada de hace dos años comunica abandono. Una sección de testimonios con dos frases sin nombre ni contexto comunica que no hubo más. Se prefirió un sitio corto que dice lo que hay, a un sitio largo con secciones a medio llenar.",
          "Crecer luego es fácil: la estructura ya está preparada para sumar esas piezas cuando exista material real que ponerles.",
        ],
      },
      {
        h2: "Cuánto de esto aplica a cualquier profesional de servicios",
        body: [
          "Casi todo. Un abogado, un contador o un arquitecto que trabaja por referencia tiene exactamente el mismo problema: explica lo mismo en cada conversación y quien lo recomienda no tiene qué enviar.",
          "La estructura que funcionó aquí — servicios explicados uno por uno, proceso visible y un solo camino para contactar — es la misma que usamos para consultoras. Cambia el contenido, no el esqueleto.",
        ],
      },
    ],
    related: [
      { to: "consultores", label: "Sitios web para consultoras y profesionales" },
      { to: "desarrolloWeb", label: "El servicio: desarrollo web a medida" },
      { to: "casos", label: "Ver los otros casos de éxito" },
    ],
    cta: {
      heading: "¿Vendes servicios por referencia?",
      text: "Si explicas lo mismo en cada conversación, eso es una página que todavía no existe. Cuéntanos qué vendes y te decimos qué habría que escribir.",
      label: "Escribir por WhatsApp",
      message:
        "Hola, vi el caso de Warling Dev. Yo vendo servicios profesionales y necesito un sitio que me explique.",
    },
  },

  en: {
    eyebrow: "Case study",
    h1: "Warling Dev: a professional services site",
    lead: [
      "Warling Dev is Warling López's development practice. We built a professional services site that explains what he does, how he works and how to hire him, so he doesn't have to repeat it in every conversation.",
      "The site is live at warling.top.",
    ],
    sections: [
      {
        h2: "The cost of having nowhere to explain yourself",
        body: [
          "Anyone selling technical services by referral faces the same problem repeatedly: every prospect arrives without knowing exactly what's offered, what the process is, or what happens after they say yes.",
          "With no site where that's written down, it gets explained live. Every conversation starts from zero, with the same questions and the same answers. That's unbilled time, repeated with each person.",
          "There's a less obvious cost too: without a presence of your own, the person recommending you has nothing to send. The referral arrives as a phone number and a «he knows his stuff», which is far weaker than a link.",
        ],
      },
      {
        h2: "What we built",
        subsections: [
          {
            h3: "Services explained one by one",
            body: [
              "What's offered, for whom, and what's included. Written so a non-technical person understands what they're buying.",
            ],
          },
          {
            h3: "The work process made visible",
            body: [
              "How a project starts, what's expected from the client, and when reviews happen. Publishing the process lowers the anxiety of whoever is about to hire and filters out people looking for something else.",
            ],
          },
          {
            h3: "One clear call to action",
            body: [
              "A single path to book a consultation, instead of a generic email address in the footer.",
            ],
          },
        ],
      },
      {
        h2: "What changed",
        body: [
          "The site loads in under two seconds and explains services and process so he doesn't have to repeat them in every conversation. People arriving by referral already know how he works, and the first call starts where it used to end.",
          "It's the smallest of the three cases and probably the most replicable: most service professionals are in exactly this situation.",
        ],
      },
      {
        h2: "Why performance mattered here",
        body: [
          "A developer who ships slow sites has a credibility problem no copy can fix. In this case the site is itself a sample of the work.",
          "So speed was measured rather than promised. It's the same standard we hold ourselves to: if we're going to say we build fast sites, ours has to survive someone checking.",
        ],
      },
      {
        h2: "What was deliberately left out",
        body: [
          "No blog, no extensive portfolio, no testimonials section. All three are good elements when you have something to fill them with, and none of them are when you don't.",
          "An empty blog whose last post is two years old signals abandonment. A testimonials section with two unattributed lines signals there weren't any more. We preferred a short site that says what exists over a long one with half-filled sections.",
          "Growing later is easy: the structure is already prepared to add those pieces once there's real material for them.",
        ],
      },
      {
        h2: "How much of this applies to any service professional",
        body: [
          "Nearly all of it. A lawyer, an accountant or an architect working by referral has exactly the same problem: explaining the same thing in every conversation, with nothing for referrers to send.",
          "The structure that worked here — services explained one by one, a visible process, and a single path to contact — is the same one we use for consultancies. The content changes, the skeleton doesn't.",
        ],
      },
    ],
    related: [
      { to: "consultores", label: "Websites for consultancies and professionals" },
      { to: "desarrolloWeb", label: "The service: custom web development" },
      { to: "casos", label: "See the other case studies" },
    ],
    cta: {
      heading: "Do you sell services by referral?",
      text: "If you explain the same thing in every conversation, that's a page that doesn't exist yet. Tell us what you sell and we'll tell you what needs writing.",
      label: "Message us on WhatsApp",
      message:
        "Hi, I saw the Warling Dev case study. I sell professional services and need a site that explains me.",
    },
  },
};
