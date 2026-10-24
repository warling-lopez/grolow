import type { ContentTable } from "./types";

export const blogPhpRdContent: ContentTable = {
  es: {
    eyebrow: "Artículo · República Dominicana",
    h1: "Cómo afectó PHP2Shell a República Dominicana",
    lead: [
      "Mientras en Francia y en los Países Bajos se apagaban sitios del gobierno por la vulnerabilidad PHP2Shell, en República Dominicana la noticia llegó por la prensa y por los avisos de los proveedores de hosting. Este artículo reúne lo que se sabe del impacto en el país, lo que no se sabe, y por qué el mercado dominicano tiene motivos concretos para tomárselo en serio.",
      "Una advertencia desde el principio: al momento de escribir no encontramos reportes públicos de intrusiones en sitios dominicanos atribuidas a PHP2Shell. Eso no significa que no las haya habido. Significa que, si las hubo, no se han hecho públicas.",
    ],
    sections: [
      {
        h2: "Cómo llegó la noticia al país",
        body: [
          "Los medios dominicanos cubrieron el caso desde el primer día. Ensegundos publicó el 21 de octubre la nota de la AFP sobre los sitios desconectados en Europa. Almomento, con fecha en Santo Domingo, describió la alerta internacional y el tráfico malicioso detectado por Cloudflare. Diario Libre publicó el 22 de octubre una nota con los identificadores de los fallos, las cifras de ataques y recomendaciones para usuarios y administradores.",
          "Ninguna de esas notas menciona instituciones o empresas dominicanas afectadas. Tampoco encontramos, al cierre de este artículo, una alerta pública específica sobre PHP2Shell del Centro Nacional de Ciberseguridad (CNCS), aunque el CNCS ha publicado alertas sobre PHP en el pasado — sobre fallos de PHP 7 entre 2019 y 2021 y sobre phpMyAdmin en 2022 — y es la fuente a consultar para cualquier aviso oficial.",
        ],
      },
      {
        h2: "El contexto: un año de récord en intentos de ataque",
        body: [
          "PHP2Shell llegó a un país que ya estaba recibiendo más ataques que nunca. El 16 de octubre, una semana antes de la crisis, CDN publicó que el CNCS había bloqueado 510 millones de intentos de ataque contra sistemas del Estado en lo que iba de 2026, frente a 481 millones en todo 2025. El propio CNCS aclara que esa cifra solo cubre los sistemas de protección del Estado, no el total del país.",
          "Su director ejecutivo, Carlos Leonardo, atribuyó el aumento a la transformación digital y a la automatización de los ataques, y advirtió que combinar datos de distintas filtraciones permite a grupos criminales armar perfiles de ciudadanos. En la misma entrevista se mencionaron denuncias de filtraciones vinculadas a una empresa telefónica, a la Policía Nacional y a la Junta Central Electoral, con investigaciones abiertas.",
          "Un fallo que permite tomar un servidor sin contraseña, en el lenguaje que mueve a la mayoría de los sitios web, es exactamente el tipo de herramienta que esos ataques automatizados incorporan en cuanto está disponible.",
        ],
      },
      {
        h2: "Por qué el mercado dominicano está especialmente expuesto",
        body: [
          "No tenemos una cifra oficial de cuántos sitios dominicanos usan PHP. Lo que sí podemos contar es lo que vemos al trabajar en este mercado, y cualquiera que haya cotizado un sitio web en Santo Domingo lo reconocerá.",
        ],
        bullets: [
          {
            title: "WordPress en hosting compartido es la norma",
            text: "La gran mayoría de los sitios de pymes, consultorios, restaurantes y profesionales que vemos están hechos en WordPress, sobre hosting compartido con cPanel. Eso es PHP.",
          },
          {
            title: "Sitios entregados y abandonados",
            text: "Es muy común que un sitio se entregue, se pague y nadie lo vuelva a tocar. Ni el cliente sabe que hay que actualizarlo ni el proveedor lo ofrece. Esos sitios suelen seguir en la versión de PHP con la que se crearon.",
          },
          {
            title: "Versiones viejas por miedo a romper",
            text: "Muchos proveedores locales mantienen sitios en PHP 7.4 porque un plugin o un tema antiguo no funciona en PHP 8. Para PHP 7.4 no hubo corrección oficial de PHP2Shell.",
          },
          {
            title: "Tiendas conectadas a pasarelas de pago",
            text: "Las tiendas en WooCommerce que cobran a través de pasarelas locales o internacionales guardan en el servidor las claves de conexión a esas pasarelas. Uno de los fallos de PHP2Shell permite leer memoria del servidor.",
          },
          {
            title: "Nadie a quien llamar",
            text: "El técnico que montó el sitio ya no contesta, el sobrino que lo hizo se fue a estudiar fuera, la agencia cerró. Es la situación más común y la más peligrosa.",
          },
        ],
      },
      {
        h2: "Lo que sí jugó a favor",
        body: [
          "La mayoría de los sitios dominicanos pequeños no están alojados en servidores propios dentro del país, sino en proveedores de hosting internacionales grandes. Esos proveedores actualizaron PHP en sus servidores compartidos en los días siguientes al parche, en muchos casos sin que el cliente hiciera nada.",
          "Eso protege a quien está en una versión con soporte. No protege a quien tiene su sitio fijado en PHP 7.4 u 8.1, porque el proveedor no puede actualizar lo que el cliente decidió mantener viejo. Y tampoco a quien tiene un servidor propio o un VPS que nadie administra.",
        ],
      },
      {
        h2: "Qué debería hacer un negocio dominicano esta semana",
        bullets: [
          {
            title: "Pregunta a tu proveedor",
            text: "¿Mi sitio usa PHP? ¿Qué versión exacta? ¿Ya incluye las correcciones de CVE-2026-109618 y CVE-2026-109619? Si no te contestan en dos días, ese también es un dato.",
          },
          {
            title: "Si estás en PHP 7.4, 8.0 u 8.1, planifica la migración",
            text: "No hay corrección oficial para esas versiones. Explicamos las opciones en un artículo aparte.",
          },
          {
            title: "Revisa los administradores de tu sitio",
            text: "Entra al panel de WordPress y comprueba que no haya usuarios administradores que no reconozcas.",
          },
          {
            title: "Cambia las claves de las pasarelas si tienes dudas",
            text: "Si tienes una tienda y no puedes confirmar que tu servidor se actualizó a tiempo, pide a tu pasarela de pago que te genere claves nuevas.",
          },
          {
            title: "Reporta si ves algo raro",
            text: "El CNCS recibe reportes de incidentes. Si tu sitio fue alterado o sospechas una intrusión, reportarlo ayuda a que se detecten patrones que afecten a otros.",
          },
        ],
      },
      {
        h2: "Fuentes consultadas",
        bullets: [
          {
            title: "Diario Libre, 22 de octubre de 2026",
            text: "«Vulnerabilidad PHP2Shell provoca ataques informáticos masivos».",
          },
          {
            title: "Ensegundos, 21 de octubre de 2026",
            text: "Nota de la AFP sobre sitios fuera de servicio en el mundo.",
          },
          {
            title: "Almomento",
            text: "Alerta internacional por los fallos de PHP y tráfico malicioso detectado por Cloudflare.",
          },
          {
            title: "CDN, 16 de octubre de 2026",
            text: "Cifras del CNCS sobre intentos de ataque bloqueados y declaraciones de su director.",
          },
          {
            title: "Centro Nacional de Ciberseguridad (cncs.gob.do)",
            text: "Alertas históricas sobre PHP, WordPress y phpMyAdmin.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "¿Hubo sitios del gobierno dominicano afectados?",
        a: "No encontramos reportes públicos de ello. Tampoco de desconexiones preventivas como las de Europa. Para información oficial, la fuente es el CNCS.",
      },
      {
        q: "Mi sitio lo hizo alguien que ya no contesta. ¿Qué hago?",
        a: "Si tienes acceso al panel del hosting, puedes ver y cambiar la versión de PHP tú mismo, o pedírselo al soporte del hosting. Si no tienes acceso a nada, lo primero es recuperar las credenciales del dominio y del hosting, porque sin ellas no puedes proteger el sitio.",
      },
      {
        q: "¿Debo reportar al CNCS si mi sitio fue atacado?",
        a: "Las instituciones públicas tienen obligación de notificar incidentes, y el sector financiero tiene su propio reglamento. Para el resto de las empresas privadas no encontramos una obligación general equivalente, pero reportarlo es recomendable. Lo explicamos con detalle en el artículo sobre la ley dominicana.",
      },
    ],
    related: [
      {
        to: "blogPhpRevisar",
        label: "Cómo saber si tu sitio PHP es vulnerable y qué hacer hoy",
      },
      {
        to: "blogLeyRd",
        label: "Qué dice la ley dominicana si hackean tu sitio web",
      },
      {
        to: "blogPrecios",
        label: "Cuánto cuesta una página web en República Dominicana",
      },
    ],
    cta: {
      heading: "¿Tu sitio quedó sin nadie que lo cuide?",
      text: "Somos un estudio en Santo Domingo. Revisamos tu sitio, te decimos en qué estado está y qué hace falta, aunque no lo hayamos hecho nosotros.",
      label: "Escribir por WhatsApp",
      message:
        "Hola, leí el artículo sobre PHP2Shell en República Dominicana y quiero revisar mi sitio:",
    },
  },
};
