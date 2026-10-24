import type { ContentTable } from "./types";

export const blogEmudhraContent: ContentTable = {
  es: {
    eyebrow: "Artículo · Seguridad",
    h1: "eMudhra: la certificadora cuyas claves cabían en un número",
    lead: [
      "El candado del navegador funciona porque confiamos en un grupo reducido de empresas, las autoridades de certificación, que garantizan que un sitio es quien dice ser. En octubre de 2026 una de ellas, la india eMudhra, resultó tener ocho certificados intermedios con claves privadas tan débiles que cualquiera podía calcularlas en menos de un segundo.",
      "Una de esas claves era, literalmente, el número 4. Este artículo explica qué es una autoridad de certificación, qué falló en eMudhra, cómo respondieron Google, Mozilla, Apple y Microsoft, y por qué esto importa aunque tu sitio nunca haya tenido un certificado de esa empresa.",
    ],
    sections: [
      {
        h2: "Qué es una autoridad de certificación",
        body: [
          "Cuando entras a tu banco, el navegador recibe un certificado que dice «este servidor es el de tu banco». Ese certificado lo firma una autoridad de certificación. El navegador confía en la firma porque esa autoridad está en su lista de confianza, el llamado almacén raíz.",
          "En la práctica hay una cadena: un certificado raíz, muy protegido, firma certificados intermedios, y los intermedios firman los certificados de los sitios. Quien tenga la clave privada de un intermedio de confianza puede fabricar un certificado válido para cualquier dominio del mundo: tu banco, tu correo o tu tienda.",
          "Por eso la clave privada de un intermedio tiene que ser un número aleatorio enorme, de más de cien dígitos, imposible de adivinar.",
        ],
      },
      {
        h2: "Qué falló",
        body: [
          "Según Help Net Security, las ocho claves afectadas eran números menores que 256. Para encontrar cualquiera bastaba con probar como máximo 256 valores, algo que un computador hace en una fracción de segundo. El investigador Scott Helme recuperó claves como 4, 56 y 115. Qualys estima que la entropía efectiva de esas claves P-384 era de entre 3 y 8 bits, cuando debería ser de cientos.",
          "El origen está en una ceremonia de generación de claves del 30 de abril de 2025, en la que eMudhra creó 24 certificados intermedios. Un script defectuoso generó un segundo juego de claves débiles con etiquetas parecidas a las buenas, y el personal eligió las equivocadas. De las ocho afectadas, seis eran para sitios web (TLS) y dos para firma de código.",
          "eMudhra admite errores humanos en varios pasos. Asegura que solo uno de los ocho intermedios llegó a producción, que ninguno emitió certificados a clientes y que su infraestructura no fue vulnerada. Lo que nadie puede asegurar es si alguien encontró y usó esas claves en los 17 meses que pasaron entre la ceremonia y el descubrimiento.",
        ],
      },
      {
        h2: "Cómo se descubrió y cómo respondió cada uno",
        bullets: [
          {
            title: "17 de octubre de 2026",
            text: "Un investigador conocido como Wayne revisa la base de datos común de autoridades de certificación (CCADB), detecta las claves débiles, firma un mensaje de prueba con cada una y lo reporta a Apple, Google, Microsoft, Mozilla y eMudhra. Google recibe el reporte a las 18:05 UTC y a las 19:45 UTC ya ha bloqueado los intermedios en Chrome, sin necesidad de actualizar el navegador. Firefox los bloquea el mismo día.",
          },
          {
            title: "18 de octubre",
            text: "eMudhra revoca los certificados. Su presidente, V. Srinivasan, dice que lo hicieron en menos de 14 horas.",
          },
          {
            title: "19 de octubre",
            text: "Apple bloquea los certificados. Android recibe el bloqueo a través de Google Play Services. Cloudflare se entera del problema esa tarde.",
          },
          {
            title: "20 de octubre",
            text: "Microsoft los bloquea. Dennis Jackson, de Mozilla, hace público el caso, y Mozilla retira la confianza en el certificado raíz que firmó los intermedios.",
          },
          {
            title: "22 de octubre",
            text: "eMudhra anuncia que abandona el negocio global de certificados SSL/TLS. Estima que unos 30.000 certificados de clientes tendrán que reemplazarse.",
          },
          {
            title: "27 de octubre (previsto)",
            text: "Chrome elimina de su almacén de confianza la raíz emSign ECC Root CA - G3. Los certificados legítimos que dependan de ella dejarán de funcionar en Chrome.",
          },
        ],
      },
      {
        h2: "Lo que salvó la situación: la transparencia de certificados",
        body: [
          "Desde hace años, Chrome exige que cada certificado de sitio web se publique en registros públicos llamados Certificate Transparency antes de aceptarlo. Google comprobó que no había ningún certificado encadenado a los intermedios afectados en esos registros antes del bloqueo.",
          "Eso significa que, aunque alguien hubiera fabricado un certificado falso, Chrome y las aplicaciones Android recientes lo habrían rechazado por no estar registrado. Es un ejemplo poco frecuente de una protección diseñada hace una década funcionando exactamente como se esperaba.",
        ],
      },
      {
        h2: "Por qué te importa aunque no uses eMudhra",
        body: [
          "Los navegadores se actualizaron en horas. El resto del software no. Las aplicaciones de servidor, los scripts que se conectan a una API, los contenedores Docker, los teléfonos sin actualizar y muchos equipos embebidos traen su propia lista de autoridades de confianza, y esa lista no se actualiza sola.",
          "Mientras no se actualice, ese software sigue confiando en los intermedios comprometidos. Un atacante en posición de interceptar el tráfico — una red wifi pública, un router comprometido — podría hacerse pasar por cualquier servicio ante él. Scott Helme lo resumió advirtiendo que eso podría exponer datos de usuarios a cualquiera que pueda interceptar el tráfico.",
          "Lo que hay que actualizar, y cómo comprobarlo, está en nuestro artículo sobre qué revisar en tus servidores después del caso eMudhra.",
        ],
      },
      {
        h2: "Lo que dice este caso del sistema de certificados",
        body: [
          "Hay dos lecturas. La pesimista: una sola empresa entre decenas, por un error humano en un script, puso en riesgo la confianza de todo internet durante 17 meses sin que nadie lo notara. La optimista: cuando se descubrió, los cuatro grandes navegadores actuaron en tres días, la transparencia de certificados evitó el peor escenario y la empresa responsable salió del mercado.",
          "Las dos son ciertas. Y explican por qué la industria lleva años empujando hacia certificados de vida más corta y renovación automática: cuanto menos dura un certificado, menos daño hace uno que salga mal.",
        ],
      },
      {
        h2: "Fuentes consultadas",
        bullets: [
          {
            title: "Google Security Blog",
            text: "Cronología de la respuesta de Chrome y Android, bloqueo por CRLSet y retirada de la raíz emSign ECC Root CA - G3.",
          },
          {
            title: "Help Net Security, 21 de octubre",
            text: "Origen de las claves débiles, ceremonia de abril de 2025, salida de eMudhra del negocio y número de clientes afectados.",
          },
          {
            title: "Qualys y Kudelski Security",
            text: "Análisis de la entropía de las claves y lista de certificados afectados.",
          },
          {
            title: "Cloudflare Blog",
            text: "Impacto en sus productos y advertencia de no desactivar la verificación de certificados.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "¿Mi sitio puede tener un certificado de eMudhra sin que yo lo sepa?",
        a: "Es posible si tu proveedor de hosting o tu revendedor de certificados trabajaba con ellos, aunque es poco frecuente fuera de India. Haz clic en el candado del navegador y revisa quién emitió el certificado. Si aparece eMudhra o emSign, pide uno nuevo antes del 27 de octubre.",
      },
      {
        q: "¿Alguien usó las claves para atacar?",
        a: "No hay evidencia pública de ello. Mozilla indicó que no encontró señales de ataques mediante estos certificados en Firefox, Chrome, Edge ni Safari. Lo que no se puede descartar es su uso contra software que no exige transparencia de certificados.",
      },
      {
        q: "¿Por qué Chrome elimina toda la raíz si solo fallaron ocho intermedios?",
        a: "Porque las autoridades de certificación tienen que demostrar rigor de forma continua para seguir en la lista de confianza. Un error así en una ceremonia de claves pone en duda los controles de la empresa, no solo de esos ocho certificados.",
      },
    ],
    related: [
      {
        to: "blogCertificados",
        label: "Qué revisar en tus servidores después del caso eMudhra",
      },
      {
        to: "blogCertificadosRd",
        label: "Certificados digitales en República Dominicana tras eMudhra",
      },
      {
        to: "blogNginx",
        label: "Los cinco fallos de Nginx de octubre de 2026",
      },
    ],
    cta: {
      heading: "¿No sabes quién emitió tu certificado?",
      text: "Mándanos tu dominio y te decimos quién lo emitió, cuándo vence y si se renueva solo. Toma cinco minutos.",
      label: "Escribir por WhatsApp",
      message:
        "Hola, leí el artículo sobre eMudhra y quiero revisar el certificado de mi sitio:",
    },
  },
};
