import type { ContentTable } from "./types";

export const blogContent: ContentTable = {
  es: {
    eyebrow: "Blog",
    h1: "Artículos sobre desarrollo web en República Dominicana",
    lead: [
      "Escribimos sobre las decisiones que hay que tomar antes de contratar a nadie — cuánto cuesta realmente un sitio, qué tecnología conviene y cómo leer una cotización — y sobre lo que pasa después: cómo mantenerlo seguro cuando algo se rompe en internet.",
      "Pocos artículos y largos, en vez de muchos y cortos. Si algo no aporta nada que no puedas encontrar en otro lado, no lo publicamos.",
    ],
    sections: [
      {
        h2: "Especial: la crisis de seguridad de octubre de 2026",
        body: [
          "En diez días coincidieron cinco fallos en Nginx, la vulnerabilidad PHP2Shell y el caso de la certificadora eMudhra. Lo investigamos a fondo en siete artículos, de lo general a lo práctico.",
        ],
        bullets: [
          {
            title: "PHP2Shell: qué pasó con PHP en octubre de 2026",
            to: "blogPhp2shell",
            text: "Los fallos explicados sin jerga, la cronología del descubrimiento y lo que todavía no está claro.",
          },
          {
            title: "Cómo saber si tu sitio PHP es vulnerable y qué hacer hoy",
            to: "blogPhpRevisar",
            text: "La guía práctica: revisar la versión, actualizar, mitigar si no puedes y comprobar si alguien entró.",
          },
          {
            title: "Tu sitio sigue en PHP 7.4, 8.0 u 8.1: qué hacer ahora",
            to: "blogPhpObsoleto",
            text: "Las opciones para versiones sin soporte, de mejor a peor, y cómo migrar sin romper el sitio.",
          },
          {
            title: "Los cinco fallos de Nginx de octubre de 2026",
            to: "blogNginx",
            text: "Qué configuración activa cada uno, cómo auditar la tuya y por qué las cifras de gravedad no coinciden.",
          },
          {
            title: "eMudhra: la certificadora cuyas claves cabían en un número",
            to: "blogEmudhra",
            text: "Cómo funcionan las autoridades de certificación, qué falló y cómo respondieron los navegadores.",
          },
          {
            title: "Qué revisar en tus servidores después del caso eMudhra",
            to: "blogCertificados",
            text: "Los almacenes de certificados que hay que actualizar fuera del navegador y cómo comprobarlo.",
          },
          {
            title: "La semana negra de los servidores web: qué aprender de ella",
            to: "blogSemanaNegra",
            text: "Lo que tienen en común los tres casos, el papel de la inteligencia artificial y cinco decisiones para la próxima vez.",
          },
        ],
      },
      {
        h2: "La crisis vista desde República Dominicana",
        bullets: [
          {
            title: "Cómo afectó PHP2Shell a República Dominicana",
            to: "blogPhpRd",
            text: "Lo que se sabe y lo que no del impacto en el país, el contexto del CNCS y por qué el mercado local está expuesto.",
          },
          {
            title: "Certificados digitales en República Dominicana tras eMudhra",
            to: "blogCertificadosRd",
            text: "La diferencia entre el certificado de tu sitio y tu firma digital, quién los emite aquí y cómo cuidar el de facturación.",
          },
          {
            title: "Qué dice la ley dominicana si hackean tu sitio web",
            to: "blogLeyRd",
            text: "Las normas vigentes, qué obliga a cada tipo de empresa, a quién reportar y qué hacer en las primeras horas.",
          },
        ],
      },
      {
        h2: "Antes de contratar un sitio web",
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
          "Por eso los artículos incluyen los casos en los que la respuesta correcta es contratar a otro, o no contratar a nadie todavía. Y en la serie de seguridad, separamos lo que está confirmado de lo que no, con las fuentes al final de cada texto.",
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
      {
        to: "blogPhp2shell",
        label: "PHP2Shell: qué pasó con PHP en octubre de 2026",
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
