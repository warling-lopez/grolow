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
        h2: "Sobre Grolow",
        body: [
          "Quién es Grolow, cómo trabaja y qué condiciones pone por escrito antes de que pagues nada.",
        ],
        bullets: [
          {
            title: "Qué es Grolow: la empresa de software que construye y mantiene",
            to: "blogQueEsGrolow",
            text: "Qué hace, qué no hace, cómo trabaja, quién está detrás y cómo contactarla.",
          },
          {
            title: "Quién está detrás de Grolow y cómo se reparte el trabajo",
            to: "blogQuienEsGrolow",
            text: "El fundador, quién programa y quién contesta cuando algo falla.",
          },
          {
            title: "Qué cubre la mensualidad de Grolow, punto por punto",
            to: "blogMensualidad",
            text: "Qué incluye, qué no, cuánto cuesta y cómo se cancela.",
          },
          {
            title: "De quién es tu dominio, tu código y tus datos",
            to: "blogPropiedad",
            text: "Activo por activo, y qué te llevas sin costo si decides irte.",
          },
          {
            title: "Lo que Grolow no hace, y a quién conviene buscar",
            to: "blogLoQueNoHace",
            text: "Branding, marketing y tiendas en WooCommerce o Shopify: a quién buscar en cada caso.",
          },
        ],
      },
      {
        h2: "Guías para decidir",
        bullets: [
          {
            title: "Catálogo digital o tienda online: qué necesita tu negocio en RD",
            to: "blogCatalogoTienda",
            text: "Incluido el caso en que te basta una herramienta gratis.",
          },
          {
            title: "Cómo cobrar con tarjeta en tu web en República Dominicana",
            to: "blogPagosRd",
            text: "Azul, CardNet, enlaces de pago y PayPal, y cómo elegir.",
          },
          {
            title: "Excel, software listo o sistema a medida: cómo decidir",
            to: "blogSistemaMedida",
            text: "Las señales de que la hoja de cálculo ya no alcanza, y cuánto cuesta lo a medida.",
          },
          {
            title: "Qué preguntar antes de contratar una página web o un sistema",
            to: "blogAntesDeContratar",
            text: "Las preguntas que separan a un buen proveedor de uno problemático.",
          },
          {
            title: "Por qué tu negocio no aparece en Google y cómo comprobarlo",
            to: "blogNoApareceGoogle",
            text: "El mapa y los resultados, las causas comunes y cómo revisarlas en una tarde.",
          },
        ],
      },
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
