import type { ContentTable } from "./types";

export const blogPhp2shellContent: ContentTable = {
  es: {
    eyebrow: "Artículo · Seguridad",
    h1: "PHP2Shell: qué pasó con PHP en octubre de 2026",
    lead: [
      "Entre el 20 y el 23 de octubre de 2026, PHP — el lenguaje con el que funciona alrededor del 70% de los sitios web cuyo lenguaje de servidor se puede identificar — publicó correcciones de urgencia para dos fallos críticos que permiten ejecutar código en el servidor sin iniciar sesión. A la pareja se le conoce como PHP2Shell.",
      "Este artículo explica qué es exactamente, cómo se descubrió, por qué hubo gobiernos que apagaron sus sitios y qué sigue sin estar claro. Declaración de interés: nosotros no programamos en PHP. Eso no lo convierte en un mal lenguaje, y al final explicamos por qué.",
    ],
    sections: [
      {
        h2: "El resumen en un párrafo",
        body: [
          "Los fallos tienen los identificadores CVE-2026-109618 y CVE-2026-109619, y ambos recibieron una puntuación de 9.2 sobre 10 en la escala CVSS v4. Están en el propio motor de PHP, no en WordPress ni en ningún plugin, y el código vulnerable existe desde PHP 5.4, publicado en 2012. Las versiones corregidas son 8.5.12, 8.4.27, 8.3.36 y 8.2.35. PHP 8.1 y anteriores ya no reciben actualizaciones normales.",
          "Lo que los hace graves es el momento en que ocurren: el ataque se dispara mientras PHP procesa la petición, antes de que se ejecute una sola línea del código de tu sitio. Por eso no importa lo bien escrito que esté tu WordPress, tu Laravel o tu tienda en Magento. Si el PHP de debajo es vulnerable, el sitio también.",
        ],
      },
      {
        h2: "Qué hace cada fallo, sin jerga",
        subsections: [
          {
            h3: "CVE-2026-109618: el que aprovecha la falta de memoria",
            body: [
              "PHP limita cuánta memoria puede usar cada petición. Cuando una petición se pasa del límite, PHP la corta de golpe. El problema es que ese corte puede ocurrir a mitad de leer un formulario, cuando algunos datos internos están a medio preparar. Al limpiar, PHP trata esos datos a medias como si fueran válidos y libera memoria que puede contener datos que puso el atacante.",
              "El equipo de investigación de Abstract Security lo llama «rawkey» y describe el ataque como un formulario enorme, de más de 1 MB, con un nombre de campo desproporcionado. PHP confirmó ejecución remota de código con mod_php de Apache en configuración por defecto.",
            ],
          },
          {
            h3: "CVE-2026-109619: el que reutiliza restos de una petición anterior",
            body: [
              "Un mismo proceso de PHP atiende muchas peticiones seguidas. Este fallo hace que información de una petición sobreviva después de que su memoria se haya liberado, por ejemplo tras un error fatal. La siguiente petición que atienda ese proceso puede usar esos restos antes de que se reinicien.",
              "El camino de ataque más citado pasa por una función de PHP llamada session.upload_progress, que muestra el progreso de las subidas de archivos y que se ejecuta en cualquier formulario que reciba datos, antes que el código de la aplicación. Según Abstract, la petición maliciosa pesa unos 450 bytes, así que los filtros que bloquean peticiones grandes no la detienen.",
            ],
          },
          {
            h3: "El tercer fallo: CVE-2026-115560",
            body: [
              "El 23 de octubre PHP divulgó un tercer fallo de ejecución remota. No publicó detalles técnicos: solo dijo que afecta a aplicaciones web configuradas de forma poco habitual, que lo considera un riesgo poco probable y que lo corregirá en la próxima versión regular, sin publicación de emergencia. Mientras tanto recomienda desactivar session.upload_progress.",
            ],
          },
        ],
      },
      {
        h2: "La cronología, día por día",
        bullets: [
          {
            title: "1 de agosto de 2026",
            text: "La firma de seguridad Calif encuentra varios caminos de ejecución remota. Según la agencia AFP, OpenAI reportó de forma independiente el mismo hallazgo, y Diario Libre recoge que Calif usó un modelo de OpenAI para identificar uno de los fallos.",
          },
          {
            title: "11 y 24 de agosto",
            text: "Calif reporta el primer fallo al equipo de PHP. Trece días después, Wiz Research reporta más formas de explotarlos. PHP coordina las correcciones en privado.",
          },
          {
            title: "17 de octubre",
            text: "Amazon Web Services identifica un intento de explotación, según Diario Libre. Es la señal más temprana de que alguien más conocía el problema.",
          },
          {
            title: "20 de octubre",
            text: "Se filtran en internet capturas, videos y detalles parciales de los fallos, un día antes de la fecha prevista. PHP anuncia una publicación de emergencia y empieza la carrera.",
          },
          {
            title: "21 de octubre",
            text: "Cloudflare reporta ataques desde las 07:43 UTC. Las correcciones salen alrededor de las 14:00 UTC. Gobiernos y empresas desconectan sitios de forma preventiva.",
          },
          {
            title: "22 y 23 de octubre",
            text: "La firma Sansec rebaja la expectativa de explotación masiva: los exploits públicos fallan contra una instalación por defecto. PHP divulga el tercer fallo.",
          },
        ],
      },
      {
        h2: "Por qué hubo gobiernos que apagaron sus sitios",
        body: [
          "Cuando un fallo de este tipo se filtra antes de que exista la corrección, los responsables tienen dos opciones: dejar el sitio expuesto y esperar, o desconectarlo. Muchos eligieron lo segundo.",
          "Según la AFP, en Francia quedaron inaccesibles sitios de administraciones locales, entre ellos el de la Prefectura de Policía de París, a pedido de la agencia nacional de ciberseguridad. En los Países Bajos se desconectaron como precaución DigiD — el servicio de identidad digital del país —, el sitio de la Cámara de Representantes y el del propio centro nacional de ciberseguridad. Hubo interrupciones también en Finlandia y Dinamarca, y muchos medios suspendieron los comentarios de sus lectores.",
          "La AFP también reportó que la Agencia de Seguridad Nacional de Estados Unidos pidió aplicar la corrección de inmediato o desconectar los sistemas vulnerables. La fundación de PHP fue igual de directa: si usas PHP, actualizar es imperativo.",
        ],
      },
      {
        h2: "Cuántos ataques hubo de verdad",
        body: [
          "Cloudflare describió una curva muy empinada: miles de intentos en las diez horas previas a la divulgación, decenas de miles en los primeros 45 minutos después del anuncio, cientos de miles en dos horas y luego millones.",
          "Un intento no es una intrusión. Sansec explicó al día siguiente que un ataque exitoso requiere conocer bien el objetivo y que el servidor cumpla ciertas condiciones, que los exploits que circulan fallan contra un PHP con configuración por defecto y que la mayoría necesita, además, otro fallo en la aplicación: una inclusión local de archivos. Al cierre de este artículo no hay una cifra verificada de sitios comprometidos ni de datos robados.",
          "Que la explotación masiva sea menos probable de lo que se temió el primer día no quiere decir que el riesgo sea bajo. Quiere decir que los ataques serán más selectivos: tiendas con datos de tarjetas, paneles de administración y servidores con información valiosa.",
        ],
      },
      {
        h2: "Qué plataformas están afectadas",
        body: [
          "Todas las que corren sobre PHP, porque el fallo está debajo de ellas. Calif reportó ejecución de código sin iniciar sesión en versiones recientes de WordPress, Magento, Drupal, Joomla, MediaWiki, Roundcube, phpMyAdmin, Nextcloud, Laravel, Symfony y WHMCS. Sansec añade tiendas Shopware y WooCommerce.",
          "Afecta a todas las formas habituales de ejecutar PHP en un servidor web: PHP-FPM detrás de Nginx, mod_php en Apache, php-cgi, LiteSpeed y FrankenPHP. PHP considera mod_php la configuración de mayor riesgo.",
        ],
      },
      {
        h2: "Lo que todavía no está claro",
        body: [
          "Hay tres cosas que conviene leer con cautela. La primera: las fuentes no coinciden del todo en cuál de los dos fallos permite leer memoria del servidor, aunque todas coinciden en que uno de ellos lo permite, lo que podría exponer contraseñas, claves de API o tokens de sesión.",
          "La segunda: Abstract Security afirmó el 22 de octubre que logró ejecución de código en un servidor ya actualizado a PHP 8.2.35, usando la misma función de progreso de subidas. Es una afirmación de una empresa, no confirmada por PHP, pero es la razón por la que PHP y varios expertos recomiendan desactivar session.upload_progress incluso después de actualizar si no la usas.",
          "La tercera: si alguien entró en tu servidor antes de que actualizaras, la actualización no lo saca. Cierra la puerta, pero no revisa quién está dentro.",
        ],
      },
      {
        h2: "¿Entonces PHP es inseguro?",
        body: [
          "No más que cualquier otra tecnología con su tamaño. En diciembre de 2025, React — la base de lo que nosotros usamos — tuvo su propio fallo crítico de ejecución remota, conocido como React2Shell. El parecido en el nombre no es casualidad: los investigadores bautizan así los fallos que permiten tomar un servidor.",
          "La lección no es cambiar de lenguaje. Es que cualquier sitio que corra en un servidor necesita a alguien que lo actualice cuando pasa algo así, y que la mayoría de los negocios no sabe quién es esa persona hasta que la necesita.",
        ],
      },
      {
        h2: "Fuentes consultadas",
        bullets: [
          {
            title: "CERT-EU, aviso de seguridad 2026-018 (versión 1.2, 23 de octubre)",
            text: "Versiones afectadas, descripción de los tres fallos y mitigaciones oficiales.",
          },
          {
            title: "Sansec, «PHP2Shell: PHP RCE»",
            text: "Cronología del descubrimiento, plataformas afectadas y evaluación de la explotación real.",
          },
          {
            title: "Abstract Security, equipo ASTRO",
            text: "Detalle técnico de cada fallo, reglas de detección y la afirmación sobre servidores ya actualizados.",
          },
          {
            title: "AFP vía Ensegundos y Diario Libre (21 y 22 de octubre)",
            text: "Sitios desconectados en Europa, postura de la NSA y cifras de ataques reportadas por Cloudflare.",
          },
          {
            title: "W3Techs",
            text: "Porcentaje de sitios web que usan PHP como lenguaje de servidor.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "¿Tengo que cambiar mis contraseñas por PHP2Shell?",
        a: "Como usuario de sitios web, no por este caso en particular. Sí conviene usar contraseñas distintas en cada servicio y activar la verificación en dos pasos, sobre todo en banca y correo. Si un servicio te informa de una filtración, cambia esa contraseña.",
      },
      {
        q: "Mi sitio está en WordPress. ¿Basta con actualizar WordPress?",
        a: "No. El fallo está en PHP, que es lo que hace funcionar a WordPress. Hay que actualizar la versión de PHP del servidor, que normalmente se cambia desde el panel del hosting o la gestiona tu proveedor.",
      },
      {
        q: "¿Qué versiones de PHP están corregidas?",
        a: "PHP 8.5.12, 8.4.27, 8.3.36 y 8.2.35 o posteriores. Las ramas 8.1 y anteriores están fuera de soporte y no tienen una corrección oficial normal.",
      },
      {
        q: "¿Un firewall de aplicaciones web me protege?",
        a: "Ayuda, pero no sustituye la actualización. Varios de estos ataques ocurren dentro de PHP antes de que tu aplicación vea la petición, y algunas protecciones a nivel de aplicación no los cubren.",
      },
    ],
    related: [
      {
        to: "blogPhpRevisar",
        label: "Cómo saber si tu sitio PHP es vulnerable y qué hacer hoy",
      },
      {
        to: "blogPhpRd",
        label: "Cómo afectó PHP2Shell a República Dominicana",
      },
      {
        to: "blogSemanaNegra",
        label: "La semana negra de los servidores web: qué aprender",
      },
    ],
    cta: {
      heading: "¿No sabes qué versión de PHP tiene tu sitio?",
      text: "Mándanos la dirección de tu sitio y te decimos qué podemos ver desde fuera y qué tienes que pedirle a tu proveedor de hosting. Sin costo y sin compromiso.",
      label: "Escribir por WhatsApp",
      message:
        "Hola, leí el artículo sobre PHP2Shell y quiero saber si mi sitio está expuesto. Mi sitio es:",
    },
  },
};
