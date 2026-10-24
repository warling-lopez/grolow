import type { ContentTable } from "./types";

export const blogCertificadosRdContent: ContentTable = {
  es: {
    eyebrow: "Artículo · República Dominicana",
    h1: "Certificados digitales en República Dominicana tras eMudhra",
    lead: [
      "El caso de la certificadora india eMudhra, que tuvo ocho certificados con claves privadas que se podían adivinar, no involucró a ninguna entidad dominicana. Pero en República Dominicana los certificados digitales dejaron de ser un tema de técnicos: con la facturación electrónica, miles de empresas tienen hoy uno y dependen de él para facturar.",
      "Este artículo explica los dos tipos de certificado que usa un negocio dominicano, quién los emite y supervisa aquí, y qué enseña el caso eMudhra sobre cómo cuidarlos.",
    ],
    sections: [
      {
        h2: "Dos certificados distintos con el mismo nombre",
        body: [
          "En la conversación diaria se mezclan, pero son cosas diferentes con reglas diferentes.",
        ],
        subsections: [
          {
            h3: "El certificado de tu sitio web (SSL/TLS)",
            body: [
              "Es el que pone el candado en el navegador y demuestra que tu sitio es tu sitio. Lo emiten autoridades de certificación internacionales que están en las listas de confianza de Chrome, Safari, Firefox y Edge — Let's Encrypt, Sectigo, DigiCert, entre otras —, y las reglas las ponen los navegadores, no un gobierno.",
              "Este es el tipo de certificado que estuvo en juego en el caso eMudhra. Hasta donde sabemos, ninguna entidad dominicana está en esas listas de confianza, así que los sitios .do usan certificadoras internacionales, igual que el resto del mundo.",
            ],
          },
          {
            h3: "Tu certificado de firma digital",
            body: [
              "Es el que te identifica a ti o a tu empresa para firmar documentos electrónicos con validez legal: contratos, trámites y, sobre todo, comprobantes fiscales electrónicos. En República Dominicana se rige por la Ley 126-02 de comercio electrónico, documentos y firmas digitales, y lo emiten entidades de certificación autorizadas y supervisadas por el INDOTEL.",
              "Entre las entidades que se mencionan habitualmente están Avansi, que opera con tecnología Viafirma, y la Cámara de Comercio y Producción de Santo Domingo con su servicio Digifirma. Antes de contratar, confirma la lista vigente en el sitio del INDOTEL, porque puede cambiar.",
            ],
          },
        ],
      },
      {
        h2: "Por qué la firma digital ya no es opcional",
        body: [
          "La Ley 32-23 de facturación electrónica y su reglamento, el Decreto 587-24, obligan a emitir comprobantes fiscales electrónicos (e-CF) firmados digitalmente, y la obligación se ha ido extendiendo por fases a más contribuyentes. Cada e-CF lleva la firma del emisor, y esa firma se hace con un certificado digital emitido por una entidad autorizada.",
          "Eso convierte al certificado en una pieza operativa: si vence, se revoca o se pierde, tu sistema de facturación deja de poder emitir comprobantes válidos. Y si alguien lo copia, puede emitir comprobantes a tu nombre.",
        ],
      },
      {
        h2: "Lo que enseña eMudhra al ecosistema dominicano",
        bullets: [
          {
            title: "La confianza depende de la ceremonia de claves",
            text: "eMudhra no fue hackeada. Un script defectuoso generó claves débiles y el personal eligió las equivocadas durante una ceremonia de generación de claves. Toda firma digital es tan confiable como los controles de quien genera y custodia sus claves. Por eso importa que las entidades estén auditadas y supervisadas, que es el papel que la ley le asigna al INDOTEL.",
          },
          {
            title: "Los errores pueden pasar inadvertidos mucho tiempo",
            text: "Las claves débiles de eMudhra estuvieron 17 meses en circulación hasta que un investigador independiente las detectó revisando datos públicos. La transparencia — que los certificados y sus datos se puedan revisar desde fuera — fue lo que permitió descubrirlo.",
          },
          {
            title: "La validación y la revocación son la red de seguridad",
            text: "Lo que protegió a los usuarios fue que los navegadores pudieron bloquear los certificados en horas. En el mundo de la firma digital, el equivalente es comprobar el estado del certificado: el gobierno lanzó Validafirma, una plataforma para verificar si un certificado o sello electrónico es válido, está vencido o fue revocado.",
          },
          {
            title: "Cambiar de proveedor tiene que ser posible",
            text: "Unos 30.000 clientes de eMudhra tienen que reemplazar sus certificados porque la empresa salió del negocio. Si tu entidad de certificación desapareciera mañana, ¿sabrías cuánto tardas en obtener un certificado nuevo y cargarlo en tu sistema de facturación?",
          },
        ],
      },
      {
        h2: "Cómo cuidar tu certificado de firma digital",
        body: [
          "La mayoría de los problemas con certificados de firma en pymes no vienen de fallos sofisticados, sino de cómo se manejan en el día a día.",
        ],
        bullets: [
          {
            title: "No lo mandes por WhatsApp ni por correo",
            text: "El archivo del certificado (normalmente .p12 o .pfx) junto con su contraseña es tu firma. Mandarlo por chat al contador o al proveedor del sistema de facturación es como dejarle un talonario de cheques firmados en blanco.",
          },
          {
            title: "Sabe dónde está instalado",
            text: "Anota en qué equipos y sistemas está cargado: el software de facturación, la computadora de contabilidad, el servidor del proveedor. Si un empleado se va o un proveedor cambia, sabrás qué revocar.",
          },
          {
            title: "Apunta la fecha de vencimiento",
            text: "Pon un recordatorio un mes antes. Un certificado vencido detiene la facturación electrónica el mismo día.",
          },
          {
            title: "Si sospechas que se copió, revócalo",
            text: "Pide a tu entidad de certificación la revocación y un certificado nuevo. Es más barato que explicar a la DGII comprobantes que no emitiste.",
          },
          {
            title: "Exige lo mismo a tu proveedor de facturación",
            text: "Si tu sistema de facturación guarda tu certificado en sus servidores, pregunta cómo lo protege, quién tiene acceso y qué tecnología usa. Si ese sistema corre sobre PHP, pregunta también si ya aplicó las correcciones de PHP2Shell.",
          },
        ],
      },
      {
        h2: "Y el certificado de tu sitio web",
        body: [
          "Para el candado de tu sitio, la recomendación es la misma que en cualquier país: que se renueve solo. La mayoría de los hostings lo hacen con Let's Encrypt sin costo. Haz clic en el candado y comprueba quién lo emitió y cuándo vence; si alguien lo instala a mano una vez al año, ese proceso es el que conviene cambiar.",
          "Si tu sitio se conecta a la DGII, a una pasarela de pago o a cualquier otro servicio desde el servidor, el caso eMudhra también te toca: el servidor necesita tener al día su lista de autoridades de confianza. Lo explicamos en la guía de qué revisar después de eMudhra.",
        ],
      },
      {
        h2: "Fuentes consultadas",
        bullets: [
          {
            title: "Ley 126-02 de comercio electrónico, documentos y firmas digitales",
            text: "Marco legal de las entidades de certificación en República Dominicana.",
          },
          {
            title: "Ley 32-23 y Decreto 587-24",
            text: "Obligación de facturación electrónica con comprobantes firmados digitalmente.",
          },
          {
            title: "El Caribe y DPL News",
            text: "Lanzamiento de la plataforma Validafirma.",
          },
          {
            title: "Help Net Security y Google Security Blog",
            text: "Detalles del caso eMudhra, sus causas y el número de clientes afectados.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "¿eMudhra emitía certificados en República Dominicana?",
        a: "No encontramos ninguna relación entre eMudhra y entidades dominicanas. El caso afectó a certificados de sitios web emitidos por esa empresa en cualquier país y a software que confiaba en ellos.",
      },
      {
        q: "¿Mi certificado para facturación electrónica sirve para el candado de mi sitio?",
        a: "No. Son certificados distintos, emitidos para usos distintos. El de firma te identifica a ti para firmar documentos; el del sitio identifica a tu servidor ante los navegadores.",
      },
      {
        q: "¿Quién autoriza a las entidades de certificación en el país?",
        a: "El INDOTEL, según la Ley 126-02. Confirma en su sitio la lista vigente de entidades autorizadas antes de contratar un certificado.",
      },
    ],
    related: [
      { to: "blogEmudhra", label: "Qué pasó con la certificadora eMudhra" },
      {
        to: "blogCertificados",
        label: "Qué revisar en tus servidores después del caso eMudhra",
      },
      {
        to: "blogLeyRd",
        label: "Qué dice la ley dominicana si hackean tu sitio web",
      },
    ],
    cta: {
      heading: "¿Tu sistema de facturación es un misterio?",
      text: "Si no sabes dónde está tu certificado ni quién tiene acceso a él, te ayudamos a ordenarlo y a hacer las preguntas correctas a tu proveedor.",
      label: "Escribir por WhatsApp",
      message:
        "Hola, leí el artículo sobre certificados digitales en RD y tengo una consulta:",
    },
  },
};
