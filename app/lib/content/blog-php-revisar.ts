import type { ContentTable } from "./types";

export const blogPhpRevisarContent: ContentTable = {
  es: {
    eyebrow: "Artículo · Seguridad",
    h1: "Cómo saber si tu sitio PHP es vulnerable y qué hacer hoy",
    lead: [
      "Si tu sitio web, tu tienda o tu sistema interno funciona con PHP, la vulnerabilidad PHP2Shell de octubre de 2026 te afecta hasta que se demuestre lo contrario. Esta es la guía práctica: cómo averiguar qué versión tienes, qué hacer si estás en hosting compartido o en servidor propio, y qué revisar después para saber si alguien entró.",
      "Está escrita en dos niveles. La primera mitad es para el dueño del negocio, que no tiene por qué saber qué es PHP-FPM. La segunda es para quien administra el servidor.",
    ],
    sections: [
      {
        h2: "Paso 1: averigua si tu sitio usa PHP",
        body: [
          "Si tu sitio está hecho en WordPress, WooCommerce, Joomla, Drupal, Magento, PrestaShop, Moodle o Laravel, usa PHP. Si tienes un hosting con cPanel o Plesk y nunca te preguntaste en qué está hecho tu sitio, es muy probable que también.",
          "Si no lo sabes, pregúntale a quien te hizo el sitio o a tu proveedor de hosting con estas palabras exactas: «¿Mi sitio corre sobre PHP? ¿Qué versión? ¿Ya está actualizada a la que corrige CVE-2026-109618 y CVE-2026-109619?». Un proveedor serio te contesta las tres en el mismo día.",
        ],
      },
      {
        h2: "Paso 2: comprueba la versión",
        body: [
          "Las versiones seguras frente a los dos fallos principales son PHP 8.5.12, 8.4.27, 8.3.36 y 8.2.35, o cualquiera posterior dentro de la misma rama. Cualquier cosa por debajo es vulnerable. PHP 8.1, 8.0, 7.4 y anteriores no tienen corrección oficial normal, y explicamos qué hacer con ellas en un artículo aparte.",
        ],
        subsections: [
          {
            h3: "En hosting compartido con cPanel",
            body: [
              "Entra a cPanel y busca «MultiPHP Manager» o «Seleccionar versión de PHP». Ahí ves qué versión usa cada dominio. Ojo: el número que muestra suele ser la rama (8.2, 8.3), no la versión exacta. La versión exacta la instala el proveedor, y es lo que tienes que confirmar con su soporte.",
              "En WordPress también puedes verla en Herramientas → Salud del sitio → Información → Servidor.",
            ],
          },
          {
            h3: "En servidor propio o VPS",
            body: [
              "Desde la terminal, php -v te da la versión de la línea de comandos, pero lo que importa es la que atiende la web, que puede ser otra. Para PHP-FPM ejecuta php-fpm -v (o php-fpm8.3 -v según tu distribución).",
              "Si usas los paquetes de tu distribución Linux, el número de versión puede no coincidir con el oficial porque las distribuciones aplican el parche sobre su propia versión. En ese caso, busca los identificadores CVE-2026-109618 y CVE-2026-109619 en el registro de cambios del paquete. Si aparecen, estás corregido.",
            ],
          },
        ],
      },
      {
        h2: "Paso 3: actualiza y reinicia",
        body: [
          "Actualizar es la única corrección completa. Todo lo demás reduce la exposición, pero no te deja a salvo.",
          "Un detalle que se olvida mucho: después de instalar la nueva versión hay que reiniciar todos los procesos de PHP. Los procesos que ya estaban corriendo siguen ejecutando el código vulnerable hasta que se reinician. En un VPS eso es reiniciar el servicio de PHP-FPM o Apache; en hosting compartido lo hace el proveedor.",
          "Si tienes una tienda, después de actualizar haz una compra de prueba completa. Es la parte del sitio que más depende de que todo funcione, y la que más dinero te cuesta si se rompe.",
        ],
      },
      {
        h2: "Si no puedes actualizar hoy",
        body: [
          "A veces no se puede: un sistema viejo que no funciona con PHP nuevo, un proveedor que tarda o un fin de semana sin nadie disponible. Estas medidas, recogidas del aviso de CERT-EU y de las guías de Sansec y Abstract Security, reducen el riesgo mientras tanto. Ninguna sustituye la actualización.",
        ],
        bullets: [
          {
            title: "Desactiva el progreso de subidas de sesión",
            text: "En php.ini o en la configuración del pool de PHP-FPM: session.upload_progress.enabled = 0, y reinicia todos los procesos. No sirve hacerlo con ini_set() ni con un .user.ini. Casi ningún sitio usa esta función, y PHP recomienda dejarla apagada incluso después de actualizar.",
          },
          {
            title: "En PHP 8.5, apaga las trazas de errores fatales",
            text: "fatal_error_backtraces = 0 en la configuración del servidor, con reinicio de procesos.",
          },
          {
            title: "Limita el tamaño de las peticiones en el servidor web",
            text: "post_max_size a 8M si el sitio no recibe archivos, o 32M si sí, con upload_max_filesize por debajo. En Nginx o Apache, limita también el tamaño de los formularios antes de que lleguen a PHP, incluyendo las peticiones que no declaran su tamaño.",
          },
          {
            title: "Bloquea nombres de campo gigantes",
            text: "Abstract Security recomienda bloquear en el firewall de aplicaciones cualquier campo de formulario cuyo nombre supere los 1.000 bytes. Ningún formulario legítimo los usa.",
          },
          {
            title: "Como último recurso, desconecta",
            text: "Es lo que hicieron varios gobiernos europeos. Si el servidor tiene datos sensibles y no puedes actualizar, sacarlo de internet unas horas es más barato que una intrusión.",
          },
        ],
      },
      {
        h2: "Paso 4: revisa si alguien entró",
        body: [
          "La actualización impide ataques nuevos, pero no expulsa a quien ya entró. Revisa desde el 20 de octubre de 2026 en adelante, no desde el día en que actualizaste. Estas son las señales que proponen los investigadores:",
        ],
        bullets: [
          {
            title: "Errores fatales raros en los registros",
            text: "Mensajes de PHP con «tried to allocate» y «in Unknown on line 0». Indican que algo pidió memoria fuera de la ejecución normal de un script.",
          },
          {
            title: "Ráfagas de formularios enormes",
            text: "Peticiones de más de 1 MB contra páginas PHP, sobre todo diez o más desde la misma dirección en diez minutos. Abstract describe una fase del ataque de unas 590 peticiones en unos 15 minutos.",
          },
          {
            title: "El servidor web ejecutando comandos",
            text: "Procesos de nginx, apache, php-fpm o php-cgi que lanzan sh o bash con comandos como curl, wget, id o base64.",
          },
          {
            title: "Archivos y accesos que nadie creó",
            text: "Archivos nuevos en /tmp o /dev/shm, archivos PHP desconocidos en la carpeta del sitio, tareas programadas nuevas para el usuario web, claves SSH añadidas, usuarios nuevos en la base de datos o administradores nuevos en WordPress.",
          },
        ],
      },
      {
        h2: "Si encuentras algo",
        body: [
          "No borres nada todavía. Guarda una copia de los registros y del estado del servidor, porque es la evidencia de lo que pasó. Después cambia las contraseñas de la base de datos, del panel y de las cuentas de administración, y las claves de API que estuvieran en el servidor, porque uno de los fallos permite leer memoria y pudieron haberse filtrado.",
          "Si el sitio maneja datos de clientes o pagos, busca ayuda profesional antes de restaurar. Restaurar un respaldo sin saber cómo entraron suele terminar con la misma intrusión una semana después.",
        ],
      },
      {
        h2: "Fuentes consultadas",
        bullets: [
          {
            title: "CERT-EU, aviso 2026-018",
            text: "Versiones corregidas, mitigaciones oficiales por cada fallo y recomendación de aislar sistemas sin parche.",
          },
          {
            title: "Abstract Security, equipo ASTRO",
            text: "Indicadores de explotación, reglas para firewall y recomendaciones de búsqueda de intrusiones.",
          },
          {
            title: "Sansec",
            text: "Mitigaciones temporales en el servidor web y advertencias sobre sus efectos secundarios.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Mi hosting dice que ya actualizó. ¿Tengo que hacer algo más?",
        a: "Pide que te confirmen la versión exacta o que el paquete incluye los dos identificadores CVE. Después revisa en tu panel de WordPress o de tu sistema que no haya usuarios administradores que no reconozcas.",
      },
      {
        q: "¿Cambiar de PHP 8.1 a 8.3 puede romper mi sitio?",
        a: "Puede, sobre todo si usa plugins o temas viejos. Por eso conviene probarlo primero en una copia del sitio. Aun así, quedarse en 8.1 es más arriesgado que el trabajo de migrar.",
      },
      {
        q: "¿Cloudflare me protege de PHP2Shell?",
        a: "Cloudflare publicó reglas para bloquear intentos conocidos y eso reduce mucho el ruido, pero un servidor sin actualizar sigue siendo vulnerable a variantes que esas reglas no reconozcan. Actualiza igual.",
      },
    ],
    related: [
      { to: "blogPhp2shell", label: "Qué es PHP2Shell y cómo se descubrió" },
      {
        to: "blogPhpObsoleto",
        label: "Qué hacer si tu sitio sigue en PHP 7.4, 8.0 u 8.1",
      },
      {
        to: "blogNginx",
        label: "Los cinco fallos de Nginx de octubre de 2026",
      },
    ],
    cta: {
      heading: "¿Prefieres que lo revisemos contigo?",
      text: "Si tu proveedor no contesta o no sabes por dónde empezar, escríbenos. Te decimos qué revisar y, si hace falta, lo hacemos.",
      label: "Escribir por WhatsApp",
      message:
        "Hola, leí la guía para revisar PHP2Shell y necesito ayuda con mi sitio:",
    },
  },
};
