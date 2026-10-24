import type { ContentTable } from "./types";

export const blogNginxContent: ContentTable = {
  es: {
    eyebrow: "Artículo · Seguridad",
    h1: "Los cinco fallos de Nginx de octubre de 2026",
    lead: [
      "Una semana antes de PHP2Shell, Nginx — el servidor web que atiende cerca de un tercio de los sitios de internet — publicó las versiones 1.30.6 y 1.31.7 para corregir cinco vulnerabilidades. Pasaron con menos ruido que las de PHP, pero tres de ellas podrían permitir ejecutar código en el servidor.",
      "La diferencia con PHP es importante: ninguno de estos fallos afecta a una instalación de Nginx por el simple hecho de existir. Cada uno necesita una configuración concreta. Este artículo explica cuáles son, cómo saber si tu configuración las tiene y por qué las etiquetas de gravedad no se ponen de acuerdo.",
    ],
    sections: [
      {
        h2: "Por qué Nginx importa si tu sitio está en PHP",
        body: [
          "Nginx es lo primero que toca la petición de un visitante. Recibe la conexión, maneja el certificado HTTPS, sirve las imágenes y, si la página está hecha en PHP, le pasa el trabajo a PHP-FPM. Según W3Techs, Nginx atiende alrededor del 31% de los sitios cuyo servidor web se puede identificar, y entre los que usan Nginx y tienen un lenguaje identificable, cerca del 88% usa PHP.",
          "Por eso octubre de 2026 fue una mala combinación: el mismo tipo de servidor podía tener un fallo en la puerta de entrada (Nginx) y otro en el motor de la aplicación (PHP). Corregir uno no corrige el otro.",
        ],
      },
      {
        h2: "Los cinco fallos, uno por uno",
        subsections: [
          {
            h3: "CVE-2026-15176: desbordamiento con alias y rewrite",
            body: [
              "Un desbordamiento de memoria que ocurre cuando un bloque location usa alias, una regla rewrite cambia la dirección pedida y algo lee la variable $request_filename, ya sea set, return o el formato de los registros. Afecta desde la versión 0.1.29, es decir, a casi cualquier Nginx que siga en servicio.",
              "Alternativa temporal: evitar alias en ese bloque o dejar de leer $request_filename. Cambiar alias por root modifica cómo se construyen las rutas, así que hay que probar los enlaces viejos.",
            ],
          },
          {
            h3: "CVE-2026-93479: desbordamiento en map con expresiones regulares",
            body: [
              "Aparece cuando un bloque map usa una expresión regular y sus capturas numeradas ($1, $2…) se leen desde root o desde el formato de registro antes que la propia variable del map. Afecta a 1.30.0–1.30.5 y 1.31.2–1.31.6. F5 menciona un segundo camino que no detalla.",
              "Alternativa temporal: usar capturas con nombre en vez de numeradas, solo dentro del bloque que hace la comparación.",
            ],
          },
          {
            h3: "CVE-2026-97205: memoria liberada antes de tiempo con AIO y SSI",
            body: [
              "Si están activados a la vez la lectura asíncrona de disco (aio) y las inclusiones del lado del servidor (SSI con include virtual), un contador interno de 8 bits puede dar la vuelta y Nginx libera una petición mientras todavía hay lecturas pendientes. Afecta desde la 0.8.11.",
              "Alternativa temporal: apagar aio o dejar de servir páginas SSI. Lo primero puede volver a bloquear procesos con discos lentos.",
            ],
          },
          {
            h3: "CVE-2026-95101: inyección de datos por HTTP/3",
            body: [
              "Afecta a servidores con HTTP/3 activado (una línea listen con quic) y el buffering de peticiones al backend activado, que es lo que viene por defecto. Permite inyectar datos o saltarse el límite de tamaño del cuerpo de la petición. Afecta desde la 1.25.0.",
              "Si tu Nginx no se compiló con el módulo HTTP/3, este fallo no te alcanza. Alternativa temporal: quitar quic de las líneas listen; los navegadores vuelven a HTTP/2 sin que el usuario lo note.",
            ],
          },
          {
            h3: "CVE-2026-97629: tickets de sesión TLS falsificados",
            body: [
              "Es el que conecta este artículo con los certificados. Si usas ssl_session_cache compartida sin definir tu propia clave de tickets (ssl_session_ticket_key) y los tickets están activados, que es lo normal, un atacante puede falsificar un ticket de sesión. En servidores que exigen certificado de cliente — paneles internos, APIs entre empresas, sistemas bancarios — eso puede saltarse la verificación del certificado al reanudar la sesión. Afecta desde la 1.23.2.",
              "Alternativa temporal: definir ssl_session_ticket_key con 80 bytes aleatorios (openssl rand 80), en un archivo legible solo por root, y rotarla tú mismo; o desactivar los tickets.",
            ],
          },
        ],
      },
      {
        h2: "¿Media o crítica? Por qué las cifras no coinciden",
        body: [
          "El proyecto Nginx clasificó los cinco como de gravedad media. F5, la empresa dueña de Nginx, les asignó hasta 9.2 sobre 10 en la escala CVSS v4 y 8.1 en la v3.1. HKCERT, el centro de respuesta de Hong Kong, los calificó de riesgo medio.",
          "Las dos lecturas tienen sentido. Si tu configuración no tiene el patrón, el riesgo es nulo. Si lo tiene, el riesgo es alto. Por eso la recomendación de quienes analizaron estos fallos es decidir la urgencia según tu configuración, no según la etiqueta.",
        ],
      },
      {
        h2: "Cómo revisar tu configuración",
        body: [
          "Esto es para quien administra el servidor. Son cinco comandos y una lectura atenta.",
        ],
        bullets: [
          {
            title: "Versión",
            text: "nginx -v. Corregido significa 1.30.6 o superior en la rama estable, o 1.31.7 o superior en la principal.",
          },
          {
            title: "Módulo HTTP/3",
            text: "nginx -V 2>&1 | grep -o -- --with-http_v3_module. Si no devuelve nada, el fallo de HTTP/3 no te afecta.",
          },
          {
            title: "Configuración completa",
            text: "sudo nginx -T > completo.conf vuelca toda la configuración, incluidos los archivos incluidos. Busca alias, rewrite, $request_filename, map con claves que empiecen por ~, aio, ssi on, quic y ssl_session_cache shared, y revisa cada coincidencia dentro de su bloque.",
          },
          {
            title: "Paquetes de la distribución",
            text: "En Debian y Ubuntu, busca los cinco identificadores CVE en /usr/share/doc/nginx/changelog.Debian.gz. Según el análisis de sevydevy publicado el 19 de octubre, Ubuntu 24.04 y 26.04 y Debian bookworm y trixie todavía no tenían los arreglos ese día.",
          },
          {
            title: "Antes de recargar",
            text: "nginx -t comprueba la sintaxis. Actualiza un servidor a la vez: sácalo del balanceador, actualiza, comprueba y mira el registro de errores antes de pasar al siguiente.",
          },
        ],
      },
      {
        h2: "Un aviso sobre la rama 1.28",
        body: [
          "A 19 de octubre no había corrección oficial para la rama 1.28, y cuatro de los cinco rangos afectados la incluyen. Si tu servidor depende de ella porque es la que trae tu distribución, toca aplicar las alternativas temporales o planificar el cambio de rama.",
          "Quien use Ingress NGINX en Kubernetes puede respirar un poco: HeroDevs indica que, con la configuración por defecto, ninguno de los cinco es explotable ahí. Pero ese proyecto ya está fuera de soporte, y eso es un problema en sí mismo.",
        ],
      },
      {
        h2: "Si estás en hosting compartido",
        body: [
          "No tienes acceso a la configuración de Nginx ni te corresponde revisarla: es trabajo del proveedor. Lo que sí puedes hacer es preguntar si ya actualizaron a 1.30.6 o 1.31.7, o si aplicaron las alternativas. Muchos hostings compartidos usan Apache o LiteSpeed en vez de Nginx, y en ese caso este artículo no te aplica, aunque el de PHP sí.",
        ],
      },
      {
        h2: "Fuentes consultadas",
        bullets: [
          {
            title: "The Hacker News, «NGINX Fixes 5 Flaws»",
            text: "Lista de fallos, puntuaciones de F5 y el fallo de tickets TLS.",
          },
          {
            title: "Sevydevy, «NGINX October 2026 vulnerability explained»",
            text: "Patrones de configuración de riesgo, rangos de versiones y comandos de auditoría.",
          },
          {
            title: "HKCERT, boletín del 21 de octubre",
            text: "Evaluación de riesgo e impactos posibles.",
          },
          {
            title: "HeroDevs",
            text: "Impacto en despliegues de Ingress NGINX.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "¿Tengo que actualizar Nginx si ninguno de los patrones aparece en mi configuración?",
        a: "Sí, aunque con menos prisa. Hoy no te afecta, pero basta un cambio de configuración el mes que viene para que te afecte sin que nadie se acuerde de este aviso.",
      },
      {
        q: "¿Nginx Plus también está afectado?",
        a: "F5 publicó los avisos para sus productos Nginx. Si usas la versión comercial, revisa el portal de soporte de F5 para la versión corregida que te corresponde.",
      },
      {
        q: "¿Estos fallos tienen relación con PHP2Shell?",
        a: "No. Son independientes y se corrigen por separado. Coincidieron en el tiempo y en muchos servidores, que es lo que hizo tan pesada esa semana.",
      },
    ],
    related: [
      { to: "blogPhp2shell", label: "Qué es PHP2Shell y cómo se descubrió" },
      {
        to: "blogCertificados",
        label: "Qué revisar en tus servidores después del caso eMudhra",
      },
      {
        to: "blogSemanaNegra",
        label: "La semana negra de los servidores web: qué aprender",
      },
    ],
    cta: {
      heading: "¿Tu servidor lo configuró alguien que ya no está?",
      text: "Es más común de lo que parece. Podemos revisar la configuración contigo y decirte cuáles de estos patrones tienes, si es que tienes alguno.",
      label: "Escribir por WhatsApp",
      message:
        "Hola, leí el artículo sobre los fallos de Nginx y quiero revisar mi servidor:",
    },
  },
};
