import type { ContentTable } from "./types";

export const blogNoApareceGoogleContent: ContentTable = {
  es: {
    eyebrow: "Guía",
    h1: "Por qué tu negocio no aparece en Google y cómo comprobarlo",
    lead: [
      "Buscas el nombre de tu negocio en Google y no sale. O sale otra cosa. Es más común de lo que parece, y casi nunca es mala suerte: hay un puñado de causas concretas, y casi todas se pueden comprobar en una tarde.",
      "Grolow lo sabe de primera mano. Si hoy buscas «grolow» en Google, lo primero que aparece es un arbusto que en inglés se llama Gro-Low. Este artículo explica por qué pasa eso, qué se puede hacer y qué no depende de nadie más que del tiempo.",
    ],
    sections: [
      {
        h2: "Dos cosas distintas: el mapa y los resultados",
        body: [
          "Cuando alguien busca «empresa de algo en Santo Domingo», Google suele mostrar dos bloques. Arriba, un mapa con tres negocios: eso sale del Perfil de Empresa de Google, la ficha que aparece en Google Maps. Debajo, los resultados normales: eso sale de tu página web.",
          "Son dos sistemas distintos, con reglas distintas. Puedes aparecer en uno y no en el otro. Por eso lo primero es saber cuál de los dos te falta.",
        ],
      },
      {
        h2: "Si no apareces en el mapa",
        bullets: [
          {
            title: "No tienes Perfil de Empresa, o no está verificado",
            text: "Se crea gratis desde Google Business Profile. Hasta que Google verifica que el negocio existe, el perfil no se muestra o se muestra poco.",
          },
          {
            title: "La categoría principal no es la correcta",
            text: "Google usa la categoría para decidir en qué búsquedas mostrarte. Elige la que describe lo que haces, no la más amplia.",
          },
          {
            title: "Tienes pocas reseñas",
            text: "En las búsquedas de servicios del país, los negocios que salen en el mapa suelen tener decenas de reseñas. Pídelas a clientes reales después de cada trabajo; no las compres, Google las detecta y las borra.",
          },
          {
            title: "El nombre del perfil tiene palabras de más",
            text: "Las normas de Google piden el nombre real del negocio, sin añadir servicios ni ciudades. Meter «diseño web Santo Domingo» en el nombre puede hacer que te suspendan el perfil.",
          },
          {
            title: "Trabajas sin local abierto al público",
            text: "Si atiendes a domicilio o en remoto, configura el perfil como negocio de área de servicio, indicando las zonas donde trabajas, en lugar de inventar una dirección.",
          },
        ],
      },
      {
        h2: "Si no apareces en los resultados",
        bullets: [
          {
            title: "Tu sitio es nuevo",
            text: "Google puede tardar días o semanas en descubrir e indexar un sitio nuevo. Avisarle a través de Search Console acelera el proceso.",
          },
          {
            title: "El sitio le dice a Google que no lo indexe",
            text: "Una etiqueta «noindex» olvidada o un archivo robots.txt mal configurado, muy comunes en sitios que se publicaron desde un entorno de pruebas.",
          },
          {
            title: "Google no puede leer el contenido",
            text: "Si el texto de la página solo aparece después de que se ejecuta código en el navegador, algunos buscadores ven una página vacía.",
          },
          {
            title: "El sitio es muy lento o no funciona bien en el móvil",
            text: "La mayoría de las búsquedas en el país se hacen desde el teléfono, y Google lo tiene en cuenta.",
          },
          {
            title: "Tu nombre se parece a otra cosa",
            text: "Si tu marca coincide con una palabra común o con algo más conocido, Google tarda en entender que buscas tu negocio y no lo otro. Es el caso de Grolow con el arbusto.",
          },
        ],
      },
      {
        h2: "Cómo comprobarlo en una tarde",
        bullets: [
          {
            title: "Busca site:tudominio.com en Google",
            text: "Te muestra las páginas de tu sitio que Google tiene indexadas. Si no sale ninguna, el problema es de indexación, no de posición.",
          },
          {
            title: "Da de alta tu sitio en Google Search Console",
            text: "Es gratis. Te dice qué páginas están indexadas, cuáles no y por qué. Envía ahí tu sitemap.",
          },
          {
            title: "Usa la inspección de URL",
            text: "Dentro de Search Console, te dice si una página concreta está en Google y, si no, el motivo.",
          },
          {
            title: "Busca tu negocio en Google Maps",
            text: "Si no aparece, crea o reclama tu Perfil de Empresa y verifícalo.",
          },
        ],
      },
      {
        h2: "Por qué Google no reconoce el nombre de tu marca",
        body: [
          "Este es el caso más difícil, y el de Grolow. Google no busca palabras: intenta entender entidades, es decir, cosas concretas del mundo. Para él, «Grolow» todavía es sobre todo un arbusto, porque hay mucho más escrito sobre la planta que sobre la empresa.",
          "Lo que ayuda es que muchas fuentes digan lo mismo sobre ti: tu sitio, tu Perfil de Empresa, tus redes y otros sitios que te mencionen, todos con el mismo nombre, la misma ciudad y la misma descripción de lo que haces. Y datos estructurados en tu web que le digan a Google, en su idioma, qué es tu negocio y cuáles son sus perfiles oficiales.",
          "No hay atajo. Se construye con tiempo, con coherencia y con artículos como este, que explican quién eres con tu nombre completo.",
        ],
      },
      {
        h2: "Qué hace Grolow en esta parte, y qué no",
        body: [
          "Todo lo que Grolow construye sale con la base técnica que Google necesita: el contenido en el HTML desde el primer momento, un sitemap que se actualiza solo, títulos y descripciones únicos por página, datos estructurados del negocio y un sitio rápido en el móvil.",
          "Lo que Grolow no hace son campañas de posicionamiento ni marketing de contenidos para tu negocio. Las reseñas, el Perfil de Empresa y la constancia publicando dependen de ti, o de una agencia de marketing si prefieres delegarlo. Quien te prometa el primer lugar de Google en una fecha concreta te está prometiendo algo que no controla.",
        ],
      },
    ],
    faq: [
      {
        q: "¿Cuánto tarda Google en mostrar un sitio nuevo?",
        a: "Desde unos días hasta unas semanas para que aparezca indexado. Aparecer arriba en búsquedas competidas es otra cosa y suele llevar meses.",
      },
      {
        q: "¿Pagar anuncios en Google mejora mi posición en los resultados normales?",
        a: "No. Los anuncios y los resultados normales son sistemas separados. Pagar anuncios no te sube en los resultados que no son anuncios.",
      },
      {
        q: "¿Necesito una página web si ya tengo Perfil de Empresa?",
        a: "Para aparecer en el mapa, no es imprescindible. Para aparecer en los resultados normales y explicar lo que haces con detalle, sí.",
      },
    ],
    related: [
      { to: "blogQueEsGrolow", label: "Qué es Grolow y qué hace" },
      { to: "blogAntesDeContratar", label: "Qué preguntar antes de contratar una página web" },
      { to: "blogLoQueNoHace", label: "Lo que Grolow no hace, y a quién buscar" },
    ],
    cta: {
      heading: "¿Tu sitio no aparece y no sabes por qué?",
      text: "Mándale a Grolow tu dominio por WhatsApp. Te dice qué se ve desde fuera y qué revisar primero.",
      label: "Escribir por WhatsApp",
      message: "Hola, leí por qué un negocio no aparece en Google. Mi sitio es:",
    },
  },
};
