import type { ContentTable } from "./types";

export const blogSemanaNegraContent: ContentTable = {
  es: {
    eyebrow: "Artículo · Seguridad",
    h1: "La semana negra de los servidores web: qué aprender de ella",
    lead: [
      "En diez días de octubre de 2026 coincidieron tres problemas en las tres capas que sostienen casi cualquier sitio web: cinco fallos en Nginx, el servidor que recibe las visitas; PHP2Shell, en el lenguaje que ejecuta la mayoría de los sitios; y el caso eMudhra, en el sistema de certificados que hace funcionar el candado del navegador.",
      "Ya escribimos sobre cada uno por separado. Este artículo es sobre lo que tienen en común, el papel que jugó la inteligencia artificial y las decisiones que un negocio puede tomar hoy para que la próxima semana así le pille preparado.",
    ],
    sections: [
      {
        h2: "Diez días, tres capas",
        bullets: [
          {
            title: "14 de octubre: Nginx",
            text: "Las versiones 1.30.6 y 1.31.7 corrigen cinco fallos que, con ciertas configuraciones, pueden tumbar el servidor, ejecutar código o saltarse la verificación de certificados de cliente.",
            to: "blogNginx",
          },
          {
            title: "17 al 22 de octubre: eMudhra",
            text: "Se descubre que ocho certificados intermedios de esta certificadora tenían claves privadas que se podían adivinar. Los navegadores los bloquean en tres días y la empresa abandona el negocio de certificados web.",
            to: "blogEmudhra",
          },
          {
            title: "20 al 23 de octubre: PHP2Shell",
            text: "Se filtran dos fallos críticos en PHP antes de que exista la corrección. Gobiernos europeos desconectan sitios, Cloudflare registra millones de intentos de ataque y PHP publica parches de urgencia.",
            to: "blogPhp2shell",
          },
        ],
      },
      {
        h2: "Lo que tienen en común",
        body: [
          "Ninguno de los tres es culpa del dueño del sitio. Nadie que haya contratado un sitio en WordPress eligió el fallo de PHP, y nadie que tenga un certificado HTTPS eligió a eMudhra como autoridad de confianza de su navegador. Son problemas de la infraestructura compartida sobre la que todos construimos.",
          "Pero los tres tienen la misma solución práctica: alguien tiene que enterarse a tiempo, entender si le afecta y actualizar. Los sitios que salieron bien parados esa semana no eran los que tenían la mejor tecnología. Eran los que tenían a una persona responsable que respondió el mismo día.",
        ],
      },
      {
        h2: "El papel de la inteligencia artificial",
        body: [
          "Según la AFP, los fallos de PHP los reportaron en agosto, de forma independiente, la firma Calif y OpenAI. Diario Libre recoge que Calif usó un modelo de OpenAI para identificar uno de ellos. La misma nota de la AFP sitúa el caso en una ola de descubrimientos impulsada por modelos de IA cada vez más capaces, con la proyección de que 2026 podría duplicar el récord de vulnerabilidades del año anterior.",
          "Esto tiene dos caras. La buena: fallos que llevaban catorce años escondidos en PHP se encuentran y se corrigen. La incómoda: si las herramientas para encontrar fallos son más accesibles, también lo son para quien quiere explotarlos, y el tiempo entre que se publica una corrección y aparecen los ataques se acorta. En PHP2Shell, los ataques empezaron antes que la corrección.",
          "Para un negocio, la conclusión es sencilla: el ritmo de actualizaciones de seguridad no va a bajar. Va a subir.",
        ],
      },
      {
        h2: "Lo que funcionó",
        body: [
          "Vale la pena decir también lo que salió bien, porque es lo que hay que copiar.",
        ],
        bullets: [
          {
            title: "La coordinación entre navegadores",
            text: "Google bloqueó los certificados de eMudhra en Chrome en menos de dos horas desde el reporte, sin que nadie tuviera que actualizar el navegador. Apple, Mozilla y Microsoft lo hicieron en tres días.",
          },
          {
            title: "La transparencia de certificados",
            text: "Como Chrome exige que todo certificado esté en registros públicos, se pudo comprobar que nadie había emitido certificados falsos con las claves débiles antes del bloqueo.",
          },
          {
            title: "Las actualizaciones automáticas",
            text: "Los sitios en plataformas gestionadas, donde el proveedor actualiza PHP por ti, quedaron protegidos sin que su dueño hiciera nada.",
          },
          {
            title: "Desconectar a tiempo",
            text: "Apagar un sitio unas horas es incómodo. Los gobiernos que lo hicieron eligieron un problema pequeño y seguro en vez de uno grande e incierto.",
          },
        ],
      },
      {
        h2: "Lo que falló",
        bullets: [
          {
            title: "La filtración antes del parche",
            text: "Los detalles de PHP2Shell circularon un día antes de que existiera la corrección. Nadie pudo actualizar antes de que empezaran los ataques.",
          },
          {
            title: "Las versiones sin soporte",
            text: "Miles de sitios corren en PHP 7.4, 8.0 u 8.1, para los que no hubo versión corregida oficial.",
          },
          {
            title: "El software que no es un navegador",
            text: "Los navegadores se protegieron solos de eMudhra. Los servidores, contenedores y aplicaciones que traen su propia lista de certificados no, y muchos siguen sin actualizar.",
          },
          {
            title: "Los servidores sin dueño",
            text: "El servidor que configuró un técnico que ya no trabaja con la empresa, el sistema interno que «funciona y no se toca». En esa semana, nadie sabía a quién llamar.",
          },
        ],
      },
      {
        h2: "Cinco decisiones para la próxima vez",
        bullets: [
          {
            title: "Ten un responsable con nombre",
            text: "Una persona o empresa que reciba los avisos de seguridad de lo que usas y a la que puedas llamar un martes por la noche. Si hoy no sabes quién es, esa es la primera tarea.",
          },
          {
            title: "Haz un inventario de una página",
            text: "Qué sitios y sistemas tienes, dónde están alojados, en qué tecnología y versión, y quién los mantiene. Con eso, ante el próximo aviso sabes en cinco minutos si te afecta.",
          },
          {
            title: "Prefiere lo que se actualiza solo",
            text: "Hosting gestionado, renovación automática de certificados, plataformas donde el proveedor aplica los parches. Pagas un poco más y duermes mejor.",
          },
          {
            title: "Sal de las versiones sin soporte",
            text: "No esperes al próximo fallo. Migrar con calma cuesta menos que migrar de urgencia.",
          },
          {
            title: "Ten respaldos que hayas probado",
            text: "Un respaldo que nunca intentaste restaurar no es un respaldo. Si mañana tienes que volver a empezar, es lo único que te salva.",
          },
        ],
      },
      {
        h2: "Una nota sobre nosotros",
        body: [
          "Nosotros desarrollamos con Next.js y Node.js, no con PHP, así que PHP2Shell no afectó a los sitios que hemos entregado. Pero Node.js sí necesitó actualizarse por el caso eMudhra, y React, la base de lo que usamos, tuvo su propio fallo crítico en diciembre de 2025. Ninguna tecnología te libra de esto. Lo que te libra es que alguien esté pendiente.",
        ],
      },
      {
        h2: "Fuentes consultadas",
        bullets: [
          {
            title: "AFP vía Ensegundos, 21 de octubre",
            text: "Descubrimiento de los fallos de PHP, papel de la IA y sitios desconectados en Europa.",
          },
          {
            title: "Diario Libre, 22 de octubre",
            text: "Cifras de ataques reportadas por Cloudflare y uso de un modelo de OpenAI por parte de Calif.",
          },
          {
            title: "Google Security Blog y Help Net Security",
            text: "Respuesta de los navegadores al caso eMudhra.",
          },
          {
            title: "The Hacker News y Sevydevy",
            text: "Detalle de los cinco fallos de Nginx.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "¿Fue un ataque coordinado?",
        a: "No. Son tres problemas independientes que coincidieron en el tiempo. Lo que los une es que afectan a la infraestructura común de internet, no a un sitio o empresa concretos.",
      },
      {
        q: "¿Mi negocio necesita un equipo de seguridad?",
        a: "Un negocio pequeño no necesita un equipo propio. Necesita saber quién mantiene cada cosa y que esa persona o empresa responda a tiempo. Para muchos, eso es un contrato de mantenimiento o un hosting gestionado.",
      },
      {
        q: "¿Cada cuánto debería revisar mis sistemas?",
        a: "Las actualizaciones de seguridad deberían aplicarse en días, no en meses. Una revisión general de versiones y respaldos cada trimestre es un buen mínimo para un negocio pequeño.",
      },
    ],
    related: [
      {
        to: "blogPhpRd",
        label: "Cómo afectó PHP2Shell a República Dominicana",
      },
      {
        to: "blogLeyRd",
        label: "Qué dice la ley dominicana si hackean tu sitio web",
      },
      { to: "desarrolloWeb", label: "Cómo trabajamos el desarrollo web a medida" },
    ],
    cta: {
      heading: "¿Quieres el inventario de una página hecho?",
      text: "Te ayudamos a listar qué sistemas tienes, en qué están hechos y quién los mantiene. Es el primer paso y el que más gente se salta.",
      label: "Escribir por WhatsApp",
      message:
        "Hola, leí el artículo sobre la semana negra de los servidores y quiero ordenar mis sistemas:",
    },
  },
};
