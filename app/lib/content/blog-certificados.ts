import type { ContentTable } from "./types";

export const blogCertificadosContent: ContentTable = {
  es: {
    eyebrow: "Artículo · Seguridad",
    h1: "Qué revisar en tus servidores después del caso eMudhra",
    lead: [
      "Cuando se descubrió que ocho certificados intermedios de la certificadora eMudhra tenían claves débiles, Chrome, Firefox, Safari y Edge los bloquearon en tres días. El problema que queda es todo lo demás: el servidor de tu tienda que se conecta a la pasarela de pago, el script que sincroniza tu inventario, la imagen Docker que construiste en agosto.",
      "Todo ese software decide en quién confiar a partir de una lista de autoridades de certificación que trae consigo. Esta guía explica dónde están esas listas, cuáles ya tienen corrección y cómo comprobar que las tuyas están al día.",
    ],
    sections: [
      {
        h2: "El concepto clave: almacén de confianza",
        body: [
          "Un almacén de confianza (trust store) es un archivo con los certificados raíz en los que un programa confía. El navegador tiene el suyo y lo actualiza solo. Tu sistema operativo tiene otro, que se actualiza con el paquete ca-certificates. Y muchos lenguajes y librerías traen su propia copia: Python con certifi, Node.js con su lista interna, Java con cacerts, PHP con composer/ca-bundle.",
          "El riesgo de eMudhra no está en tu sitio web visto desde el navegador. Está en las conexiones que tu servidor hace hacia afuera usando un almacén viejo, porque ese almacén sigue aceptando certificados que cualquiera puede fabricar.",
        ],
      },
      {
        h2: "Qué ya tiene corrección",
        body: [
          "Endor Labs mantiene una lista de componentes corregidos. Estas son las versiones mínimas de los más comunes:",
        ],
        bullets: [
          {
            title: "Sistemas operativos",
            text: "ca-certificates en Ubuntu (versiones 20260816ubuntu0.x para 22.04, 24.04, 26.04 y 26.10), Debian (20250419~deb12u2 en bookworm, 20250419+deb13u1 en trixie), Alpine 20261020-r0, Fedora 2026.2.92_v9.0.319 y Arch ca-certificates-mozilla 3.131.1-1.",
          },
          {
            title: "Node.js",
            text: "22.23.4, 24.22.1 y 26.12.1. Node lleva su propia lista de autoridades compilada dentro, así que actualizar el sistema operativo no basta.",
          },
          {
            title: "Python",
            text: "certifi 2026.10.19, pip 26.2.2 y uv 0.13.4. certifi suele llegar como dependencia indirecta de requests o httpx, así que revisa el árbol completo y no solo tu requirements.txt.",
          },
          {
            title: "PHP",
            text: "composer/ca-bundle 1.4.16 o 1.6.0. Lo usan muchas librerías de PHP que se conectan a APIs externas.",
          },
          {
            title: "Go, Rust, Electron y otros",
            text: "Go 1.27.3 y 1.26.10; Electron 44.9.1, 43.8.1 y 42.11.16; rustls-webpki 0.103.16 y webpki-roots 1.0.10; NSS 3.131.1; el paquete de autoridades de curl del 20 de octubre de 2026.",
          },
        ],
      },
      {
        h2: "Los tres casos que se olvidan",
        subsections: [
          {
            h3: "Java",
            body: [
              "El JDK trae su propio almacén, cacerts, y en la lista de Endor Labs no aparecía corregido todavía. Trata cualquier servicio en Java como no confirmado hasta que tu proveedor de JDK publique la actualización.",
            ],
          },
          {
            h3: "Contenedores",
            body: [
              "Actualizar el servidor no actualiza las imágenes Docker que ya construiste. Cada imagen trae su propia copia de ca-certificates congelada en el momento en que se creó. Hay que reconstruirlas desde imágenes base actualizadas y volver a desplegarlas.",
            ],
          },
          {
            h3: "Almacenes escondidos",
            body: [
              "Algunas librerías traen un archivo .pem con certificados dentro de su propio código. No aparecen en ningún gestor de paquetes. La única forma de encontrarlos es buscarlos en el disco y compararlos con las huellas de las raíces afectadas.",
            ],
          },
        ],
      },
      {
        h2: "Cómo comprobar que estás corregido",
        bullets: [
          {
            title: "Actualiza el paquete del sistema",
            text: "En Ubuntu o Debian: sudo apt-get update && sudo apt-get install --only-upgrade ca-certificates. En Alpine: apk update && apk upgrade ca-certificates ca-certificates-bundle.",
          },
          {
            title: "Busca rastros de emSign",
            text: "grep -c \"emSign\" /etc/ssl/certs/ca-certificates.crt debería devolver 0 después de actualizar.",
          },
          {
            title: "Prueba con los servidores de prueba",
            text: "La página de divulgación del caso ofrece dos sitios firmados con las cadenas comprometidas. Si tu aplicación se conecta a ellos sin error, todavía confía en eMudhra. Si da error de certificado, estás protegido.",
          },
          {
            title: "Prueba por el camino real",
            text: "Cloudflare insiste en esto: que el navegador o curl rechacen el certificado no prueba que tu servicio en segundo plano lo rechace, porque puede usar otro almacén. Prueba desde la misma aplicación.",
          },
        ],
      },
      {
        h2: "El error que no hay que cometer",
        body: [
          "Después de actualizar, alguna integración puede empezar a fallar con errores de certificado. La tentación es desactivar la verificación de certificados para que vuelva a funcionar: verify=False en Python, rejectUnauthorized: false en Node, CURLOPT_SSL_VERIFYPEER en PHP.",
          "No lo hagas. Cloudflare lo dijo con todas las letras en su análisis del caso: estos errores no se resuelven desactivando la verificación. Si una conexión falla después de actualizar, es porque el otro lado tiene un certificado que ya no es de confianza, y lo que hay que cambiar es ese certificado. Desactivar la verificación deja la conexión abierta a exactamente el ataque del que te estabas protegiendo.",
        ],
      },
      {
        h2: "Si tu propio sitio tiene un certificado de eMudhra",
        body: [
          "Haz clic en el candado del navegador y mira quién emitió el certificado. Si aparece eMudhra o emSign, consigue uno de otra autoridad antes del 27 de octubre de 2026, que es cuando Chrome retira la raíz emSign ECC Root CA - G3. eMudhra se comprometió a ofrecer reemplazos gratuitos a través de sus socios.",
          "Si usas Cloudflare en modo Full (strict), revisa también el certificado del servidor de origen, no solo el que ve el visitante. Cloudflare anunció alertas para los sitios que sigan usando certificados retirados.",
        ],
      },
      {
        h2: "La lección de fondo: automatiza la renovación",
        body: [
          "La industria de certificados lleva años reduciendo la vida máxima de un certificado, y la tendencia es que pronto se renueven cada pocas semanas. Casos como este explican por qué: si mañana hay que cambiar de autoridad, quien renueva de forma automática lo hace en minutos y quien lo hace a mano pierde un fin de semana.",
          "Si tu certificado se renueva solo con Let's Encrypt o con tu proveedor de hosting, ya tienes la mitad del trabajo hecho. Si alguien lo instala a mano una vez al año, ese es el siguiente problema que conviene resolver.",
        ],
      },
      {
        h2: "Fuentes consultadas",
        bullets: [
          {
            title: "Endor Labs, «eMudhra CA Compromise: The Trust Stores You Didn't Patch»",
            text: "Lista de componentes corregidos, casos especiales y pasos de verificación.",
          },
          {
            title: "Cloudflare Blog",
            text: "Recomendaciones para servidores de origen, mTLS y contenedores.",
          },
          {
            title: "Google Security Blog",
            text: "Fecha de retirada de la raíz emSign ECC Root CA - G3 en Chrome.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Mi sitio está en hosting compartido. ¿Tengo que hacer algo?",
        a: "El almacén del servidor lo actualiza tu proveedor. Lo que sí te toca es revisar quién emitió tu certificado y, si tu sitio se conecta a servicios externos con código propio, preguntarle a quien lo programó si las librerías están al día.",
      },
      {
        q: "¿Esto afecta a mi teléfono?",
        a: "Android recibió el bloqueo a través de Google Play Services y iOS a través de Apple. Reiniciar el teléfono acelera la actualización en Android. Teléfonos muy viejos que ya no reciben actualizaciones pueden seguir confiando en los certificados afectados.",
      },
      {
        q: "¿Tengo que quitar a mano los certificados de eMudhra?",
        a: "Mejor no. Quitar raíces a mano puede romper conexiones legítimas. Lo recomendado es actualizar el paquete o la librería a la versión corregida.",
      },
    ],
    related: [
      { to: "blogEmudhra", label: "Qué pasó con la certificadora eMudhra" },
      {
        to: "blogNginx",
        label: "El fallo de tickets TLS en Nginx y otros cuatro",
      },
      {
        to: "blogCertificadosRd",
        label: "Certificados digitales en República Dominicana tras eMudhra",
      },
    ],
    cta: {
      heading: "¿Tu sistema se conecta a pasarelas o APIs?",
      text: "Si tu sitio cobra, factura o sincroniza datos con otros servicios, conviene revisar qué librerías usa para esas conexiones. Te ayudamos a hacerlo.",
      label: "Escribir por WhatsApp",
      message:
        "Hola, leí la guía sobre certificados después de eMudhra y quiero revisar mis integraciones:",
    },
  },
};
