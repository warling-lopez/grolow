import type { ContentTable } from "./types";

export const blogContent: ContentTable = {
  es: {
    eyebrow: "Blog",
    h1: "Artículos sobre desarrollo web en República Dominicana",
    lead: [
      "Escribimos sobre las decisiones que hay que tomar antes de contratar a nadie: cuánto cuesta realmente un sitio, qué tecnología conviene y cómo leer una cotización sin quedarse con dudas.",
      "Pocos artículos y largos, en vez de muchos y cortos. Si algo no aporta nada que no puedas encontrar en otro lado, no lo publicamos.",
    ],
    sections: [
      {
        h2: "Publicado hasta ahora",
        bullets: [
          {
            title: "¿Cuánto cuesta una página web en República Dominicana en 2026?",
            to: "blogPrecios",
            text: "Los rangos reales del mercado local, qué compra cada uno, los costos que no aparecen en la cotización y las señales de alerta al comparar propuestas.",
          },
          {
            title: "WordPress o código a medida: cuál le conviene a tu negocio",
            to: "blogWordpress",
            text: "Una comparación con declaración de interés incluida, que reconoce los casos en los que WordPress es la decisión correcta y el desarrollo a medida sería gastar de más.",
          },
        ],
      },
      {
        h2: "Por qué publicamos esto",
        body: [
          "La mayor parte de la información sobre precios y tecnología en este mercado la escribe quien quiere venderte algo, y se nota. Nosotros también queremos venderte algo, así que la única forma de que estos textos sirvan es que digan también lo que no nos conviene.",
          "Por eso los dos artículos incluyen los casos en los que la respuesta correcta es contratar a otro, o no contratar a nadie todavía.",
        ],
      },
    ],
    related: [
      {
        to: "blogPrecios",
        label: "Cuánto cuesta una página web en República Dominicana en 2026",
      },
      {
        to: "blogWordpress",
        label: "WordPress o código a medida: cuál le conviene a tu negocio",
      },
      { to: "precios", label: "Nuestros precios y qué incluye cada plan" },
    ],
    cta: {
      heading: "¿Te quedó una pregunta?",
      text: "Si hay algo que no encontraste en los artículos, escríbenos y te lo contestamos. Si la respuesta le sirve a más gente, termina siendo el próximo artículo.",
      label: "Escribir por WhatsApp",
      message: "Hola, leí el blog y me quedó una duda:",
    },
  },
};
