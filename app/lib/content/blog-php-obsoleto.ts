import type { ContentTable } from "./types";

export const blogPhpObsoletoContent: ContentTable = {
  es: {
    eyebrow: "Artículo · Seguridad",
    h1: "Tu sitio sigue en PHP 7.4, 8.0 u 8.1: qué hacer ahora",
    lead: [
      "Cuando PHP publicó las correcciones de PHP2Shell el 21 de octubre de 2026, lo hizo para las versiones 8.2, 8.3, 8.4 y 8.5. Las demás quedaron fuera porque ya no tienen soporte. El problema es que el código vulnerable existe desde PHP 5.4, de 2012, y en internet sigue habiendo muchísimos sitios en versiones viejas.",
      "Si el tuyo es uno de ellos, este artículo explica tus opciones, de la más recomendable a la menos, y lo que cuesta cada una en tiempo y en riesgo.",
    ],
    sections: [
      {
        h2: "Qué significa que una versión esté «fuera de soporte»",
        body: [
          "Cada versión de PHP recibe dos años de mejoras y correcciones y, después, dos años más solo de correcciones de seguridad. Cuando se acaba ese plazo, el equipo de PHP deja de publicar arreglos. La versión sigue funcionando exactamente igual que el día anterior, pero ya nadie la repara cuando aparece un fallo.",
          "Las fechas de fin de soporte de seguridad son: PHP 7.4 en noviembre de 2022, PHP 8.0 en noviembre de 2023 y PHP 8.1 el 31 de diciembre de 2025. Y una que pocos tienen presente: PHP 8.2 deja de recibir correcciones el 31 de diciembre de 2026, dentro de dos meses.",
        ],
      },
      {
        h2: "Lo que pasó con las versiones viejas en esta crisis",
        body: [
          "Esta vez hubo algo de ayuda. Según CERT-EU y Abstract Security, el equipo de PHP publicó parches mínimos en código fuente para 7.4, 8.0 y 8.1, sin versión oficial empaquetada. Algunas distribuciones Linux y empresas de soporte extendido también publicaron correcciones para sus clientes.",
          "Pero esa ayuda es una excepción por la gravedad del caso, no una política. Con el próximo fallo puede no haberla. Y para PHP 7.3 o anteriores, o para cualquier 5.x, no hay nada.",
        ],
      },
      {
        h2: "Tus opciones, de mejor a peor",
        subsections: [
          {
            h3: "1. Migrar a PHP 8.3 o 8.4",
            body: [
              "Es la única solución que también te cubre frente al próximo problema. PHP 8.3 recibe correcciones de seguridad hasta finales de 2027 y PHP 8.4 hasta finales de 2028. Saltar a 8.2 hoy no tiene mucho sentido: en enero te vuelves a quedar sin soporte.",
              "El costo depende de tu sitio. Un WordPress con plugins populares y actualizados suele migrar en una tarde. Un sistema a medida escrito para PHP 7 hace siete años puede necesitar días de ajustes, porque PHP 8 cambió cómo trata algunos errores y eliminó funciones antiguas.",
            ],
          },
          {
            h3: "2. Soporte extendido de tu distribución o de un tercero",
            body: [
              "Si tu servidor corre una distribución con soporte de largo plazo — Ubuntu con ESM, Red Hat, AlmaLinux, CloudLinux — puede que tu versión vieja de PHP reciba parches de seguridad de ellos. También hay empresas que venden soporte extendido para versiones de PHP fuera de soporte.",
              "Es una opción legítima para ganar tiempo mientras planificas la migración. No es una forma de no migrar nunca: pagas por mantener vivo algo que de todas formas vas a tener que cambiar.",
            ],
          },
          {
            h3: "3. Aplicar tú mismo el parche mínimo",
            body: [
              "Solo es viable si compilas PHP desde el código fuente y tienes a alguien que sepa hacerlo y probarlo. Para la mayoría de los negocios no es realista, y si nadie mantiene ese PHP compilado a mano, en seis meses estás peor que hoy.",
            ],
          },
          {
            h3: "4. Mitigar y esperar",
            body: [
              "Apagar session.upload_progress, limitar el tamaño de las peticiones y poner un firewall delante reduce el riesgo de PHP2Shell, pero no lo elimina y no te cubre frente a los fallos anteriores ya conocidos de esas versiones, que son muchos. Es lo que haces el primer día, no una estrategia.",
            ],
          },
        ],
      },
      {
        h2: "Cómo migrar sin romper el sitio",
        bullets: [
          {
            title: "Haz una copia completa",
            text: "Archivos y base de datos. Comprueba que la copia se puede restaurar antes de tocar nada.",
          },
          {
            title: "Prueba en un entorno de pruebas",
            text: "Muchos hostings permiten crear una copia del sitio en un subdominio. Cámbiale la versión de PHP a la copia y recórrela entera: formularios, carrito, pagos, panel de administración.",
          },
          {
            title: "Actualiza plugins y temas primero",
            text: "En WordPress, la mayoría de los problemas de migración vienen de plugins abandonados. Si un plugin no se actualiza desde hace años, busca un reemplazo antes de migrar.",
          },
          {
            title: "Activa los registros de errores",
            text: "Los avisos de funciones obsoletas te dicen qué partes del código van a dejar de funcionar. Léelos en la copia, no en el sitio en vivo.",
          },
          {
            title: "Cambia en horario tranquilo y vigila",
            text: "Haz el cambio cuando menos visitas tengas y revisa el sitio durante las horas siguientes. Si algo falla, volver a la versión anterior en cPanel toma un minuto.",
          },
        ],
      },
      {
        h2: "Cuando migrar no compensa",
        body: [
          "A veces el sistema viejo es tan viejo que adaptarlo cuesta casi lo mismo que hacerlo de nuevo, y además nadie entiende ya cómo funciona por dentro. Es el caso típico de un sistema interno hecho a medida hace diez años por alguien que ya no trabaja con la empresa.",
          "Ahí la conversación cambia: no es «cómo lo actualizo», sino «qué hace este sistema que todavía necesito y cuál es la forma más sencilla de seguir haciéndolo». A veces la respuesta es reescribirlo. A veces es reemplazarlo por un servicio que ya existe. Y a veces es apagarlo, porque nadie lo usaba.",
          "Lo que no conviene es lo que hace la mayoría: dejarlo como está hasta que el próximo fallo decida por ti.",
        ],
      },
      {
        h2: "Fuentes consultadas",
        bullets: [
          {
            title: "CERT-EU, aviso 2026-018",
            text: "Versiones afectadas, ausencia de corrección oficial para 8.1 y anteriores, y parches mínimos para 7.4, 8.0 y 8.1.",
          },
          {
            title: "Sansec",
            text: "Opciones de soporte extendido mediante distribuciones y proveedores comerciales.",
          },
          {
            title: "php.net, versiones con soporte",
            text: "Calendario de fin de soporte de cada rama de PHP.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "¿Cómo sé qué versión de PHP tengo?",
        a: "En cPanel, en MultiPHP Manager. En WordPress, en Herramientas → Salud del sitio → Información → Servidor. Si no tienes acceso, pregúntale a tu proveedor de hosting.",
      },
      {
        q: "Mi hosting me cobra extra por mantener PHP 7.4. ¿Es normal?",
        a: "Sí, cada vez más proveedores cobran por mantener versiones fuera de soporte, porque les cuesta parchearlas. Si te están cobrando, pregunta si ese cargo incluye las correcciones de PHP2Shell.",
      },
      {
        q: "¿Cuánto cuesta migrar un WordPress a PHP 8.3?",
        a: "Si los plugins y el tema están actualizados, a menudo es solo cambiar la versión y probar. Si hay plugins abandonados o código personalizado viejo, el trabajo está en reemplazarlos o adaptarlos, y eso varía mucho según el sitio.",
      },
    ],
    related: [
      {
        to: "blogPhpRevisar",
        label: "Cómo saber si tu sitio PHP es vulnerable y qué hacer hoy",
      },
      { to: "blogPhp2shell", label: "Qué es PHP2Shell y cómo se descubrió" },
      {
        to: "blogWordpress",
        label: "WordPress o código a medida: cuál le conviene a tu negocio",
      },
    ],
    cta: {
      heading: "¿Tienes un sistema viejo que nadie quiere tocar?",
      text: "Cuéntanos qué hace y en qué está hecho. Te decimos si conviene migrarlo, reemplazarlo o rehacerlo, incluso si la respuesta no es contratarnos.",
      label: "Escribir por WhatsApp",
      message:
        "Hola, leí el artículo sobre versiones viejas de PHP. Mi sistema está en:",
    },
  },
};
