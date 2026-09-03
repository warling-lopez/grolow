import type { ContentTable } from "./types";

export const casosContent: ContentTable = {
  es: {
    eyebrow: "Casos reales",
    h1: "Casos de éxito: proyectos web en República Dominicana",
    lead: [
      "Tres proyectos que están en línea ahora mismo y que puedes abrir y revisar tú. No hay capturas de pantalla de sitios que ya no existen ni logos de clientes sin explicación.",
      "En cada caso contamos con qué llegó el cliente, qué se construyó y qué cambió en su operación. Sin porcentajes: no publicamos cifras de aumento de ventas que no hayamos medido nosotros en ese cliente concreto.",
    ],
    sections: [
      {
        h2: "Los proyectos",
        bullets: [
          {
            title: "La Perfurm RD — perfumería de nicho",
            to: "casoLaperfum",
            text: "Un catálogo de perfumes que se gestionaba a mano y disperso entre canales. Hoy vive en un solo enlace y los pedidos llegan a WhatsApp ya armados.",
          },
          {
            title: "Hellen's Cute Kids — red de distribuidoras",
            to: "casoHellens",
            text: "Ropa infantil vendida por una red de distribuidoras sin forma de organizar quién atiende a quién. Hoy cada visitante va automáticamente a la distribuidora de su zona.",
          },
          {
            title: "Warling Dev — servicios profesionales",
            to: "casoWarling",
            text: "Un desarrollador sin presencia que explicara sus servicios y su proceso. Hoy un sitio que carga en menos de dos segundos lo explica por él.",
          },
        ],
      },
      {
        h2: "Por qué no publicamos porcentajes",
        body: [
          "Es tentador escribir «aumentamos las ventas un 300%». El problema es que casi nunca se puede sostener: haría falta haber medido el antes con el mismo método que el después, y aislar el efecto del sitio del resto de cosas que el cliente hizo ese mes.",
          "Cuando una agencia publica esa cifra sin explicar cómo la midió, normalmente es porque no la midió. Preferimos contar el cambio operativo concreto, que sí es verificable: pedidos que llegan ordenados, clientes que ya no hay que reenviar a mano, preguntas que el sitio contesta solo.",
        ],
      },
      {
        h2: "Qué tienen en común",
        body: [
          "Ninguno de los tres es un folleto. En los tres casos el sitio se metió dentro de una operación que ya existía y se llevó una tarea repetitiva que antes hacía una persona.",
          "Ese es el criterio con el que trabajamos: si el sitio no le quita trabajo a alguien o no le trae clientes que antes no llegaban, no valía la pena construirlo.",
        ],
      },
    ],
    related: [
      { to: "casoLaperfum", label: "Caso completo: La Perfurm RD" },
      { to: "casoHellens", label: "Caso completo: Hellen's Cute Kids" },
      { to: "casoWarling", label: "Caso completo: Warling Dev" },
      { to: "servicios", label: "Todos los servicios de Grolow" },
    ],
    cta: {
      heading: "¿Y el tuyo?",
      text: "Si alguno de estos casos se parece a tu situación, cuéntanos el tuyo. Te decimos qué construiríamos y cuánto costaría en menos de 24 horas.",
      label: "Escribir por WhatsApp",
      message: "Hola, vi los casos en su sitio. Mi situación se parece a:",
    },
  },

  en: {
    eyebrow: "Real work",
    h1: "Case studies: web projects in the Dominican Republic",
    lead: [
      "Three projects that are live right now and that you can open and inspect yourself. No screenshots of sites that no longer exist, and no client logos without explanation.",
      "For each one we describe what the client arrived with, what got built, and what changed in their operation. No percentages: we don't publish sales-increase figures we haven't measured ourselves for that specific client.",
    ],
    sections: [
      {
        h2: "The projects",
        bullets: [
          {
            title: "La Perfurm RD — niche perfume",
            to: "casoLaperfum",
            text: "A perfume catalog managed by hand and scattered across channels. Today it lives in one link and orders arrive on WhatsApp already assembled.",
          },
          {
            title: "Hellen's Cute Kids — distributor network",
            to: "casoHellens",
            text: "Children's clothing sold through a network of distributors with no way to organize who serves whom. Today every visitor goes automatically to the distributor for their zone.",
          },
          {
            title: "Warling Dev — professional services",
            to: "casoWarling",
            text: "A developer with no presence explaining his services or process. Today a site that loads in under two seconds explains it for him.",
          },
        ],
      },
      {
        h2: "Why we don't publish percentages",
        body: [
          "It's tempting to write «we increased sales by 300%». The problem is it almost never holds up: you'd need to have measured the before with the same method as the after, and isolated the site's effect from everything else the client did that month.",
          "When an agency publishes that figure without explaining how it was measured, it's usually because it wasn't. We'd rather describe the concrete operational change, which is verifiable: orders arriving organized, customers who no longer need forwarding by hand, questions the site answers on its own.",
        ],
      },
      {
        h2: "What they have in common",
        body: [
          "None of the three is a brochure. In all three the site went inside an operation that already existed and took over a repetitive task a person used to do.",
          "That's the standard we work to: if the site doesn't take work off someone's hands or bring clients who weren't arriving before, it wasn't worth building.",
        ],
      },
    ],
    related: [
      { to: "casoLaperfum", label: "Full case study: La Perfurm RD" },
      { to: "casoHellens", label: "Full case study: Hellen's Cute Kids" },
      { to: "casoWarling", label: "Full case study: Warling Dev" },
      { to: "servicios", label: "All Grolow services" },
    ],
    cta: {
      heading: "And yours?",
      text: "If one of these cases resembles your situation, tell us about it. We'll tell you what we'd build and what it would cost in under 24 hours.",
      label: "Message us on WhatsApp",
      message: "Hi, I saw the case studies on your site. My situation resembles:",
    },
  },
};
