import type { ContentTable } from "./types";

export const blogPropiedadContent: ContentTable = {
  es: {
    eyebrow: "Sobre Grolow",
    h1: "De quién es tu dominio, tu código y tus datos cuando trabajas con Grolow",
    lead: [
      "Hay una historia que se repite en República Dominicana: un negocio quiere cambiar de proveedor web y descubre que el dominio está a nombre de la agencia, que no tiene acceso al código y que sus datos están en una cuenta que no controla. Salir cuesta dinero, o directamente no se puede.",
      "Grolow funciona al revés: el cliente es dueño de todo, y Grolow lo opera. Este artículo explica qué significa eso en la práctica, activo por activo, y qué pasa el día que decides irte.",
    ],
    sections: [
      {
        h2: "Ser dueño no es lo mismo que operar",
        body: [
          "La confusión viene de mezclar dos cosas. Ser dueño de un activo significa que está a tu nombre y que puedes llevártelo. Operarlo significa encargarse de que funcione: renovarlo, actualizarlo, vigilarlo.",
          "Muchos proveedores operan y además se quedan con la propiedad. Otros te dan la propiedad y te dejan solo con la operación. Grolow separa las dos: la propiedad es tuya desde el principio y la operación la hace Grolow mientras dure la relación, para que no tengas que manejar cuentas técnicas.",
        ],
      },
      {
        h2: "Activo por activo",
        bullets: [
          {
            title: "El dominio",
            text: "Se registra siempre con tu nombre y tus datos como registrante legal. Nunca a nombre de Grolow ni del fundador. Grolow administra la cuenta del registrador y lo renueva cada año.",
          },
          {
            title: "El código",
            text: "Al recibir el pago final, eres dueño del 100% del código desarrollado para tu proyecto, incluido el repositorio completo con todo su historial.",
          },
          {
            title: "La base de datos",
            text: "Tus productos, clientes, pedidos o citas son tuyos. Grolow los guarda y los respalda, pero no los usa para nada más.",
          },
          {
            title: "La cuenta de la pasarela de pago",
            text: "Si tu sistema cobra con tarjeta, la cuenta con la pasarela está a tu nombre y la controlas tú. El dinero llega directo a tu banco, no pasa por Grolow.",
          },
          {
            title: "Google Analytics, tu Perfil de Empresa de Google y Meta",
            text: "Son tuyos. Si lo pides, Grolow entra como colaborador para ayudarte, nunca como dueño.",
          },
          {
            title: "El diseño",
            text: "El diseño gráfico de tu proyecto es tuyo.",
          },
          {
            title: "El hosting",
            text: "Es un servicio, no un activo. Grolow lo contrata y lo opera como parte de la mensualidad.",
          },
        ],
      },
      {
        h2: "La única excepción, explicada",
        body: [
          "Grolow usa componentes y librerías internas que reutiliza entre proyectos: piezas de código que resuelven cosas comunes, como el acceso a un panel o el envío de un formulario. Esas piezas siguen siendo de Grolow, porque las usa en otros proyectos.",
          "Pero te las licencia de forma perpetua, irrevocable y sin costo adicional para tu proyecto. En la práctica, eso significa que puedes modificarlas y contratar a cualquier otro desarrollador para seguir trabajando sobre ellas. No hay nada que se apague el día que te vas.",
        ],
      },
      {
        h2: "Qué pasa si decides irte",
        body: [
          "Puedes cancelar la mensualidad cuando quieras, con 30 días de aviso y sin penalidad. En un máximo de 10 días hábiles, Grolow te entrega sin costo:",
        ],
        bullets: [
          {
            title: "La base de datos completa",
            text: "Todas las tablas, no solo una hoja de cálculo con tus productos.",
          },
          {
            title: "El repositorio con su historial",
            text: "El código completo, con cada cambio que se hizo desde el principio.",
          },
          {
            title: "Todas las credenciales",
            text: "Los accesos a cada servicio que use tu sistema.",
          },
          {
            title: "El código de transferencia del dominio",
            text: "Y ayuda hasta que el dominio esté en la cuenta que tú indiques.",
          },
          {
            title: "La documentación técnica",
            text: "Cómo se despliega el sistema y para qué sirve cada variable de configuración, para que tu siguiente proveedor no empiece a ciegas.",
          },
        ],
      },
      {
        h2: "Mientras te mudas, el sistema sigue funcionando",
        body: [
          "Grolow mantiene el sistema en línea hasta que la transferencia se completa, con un máximo de 30 días desde el aviso. Después borra sus copias 30 días tras la entrega, salvo que pidas que las conserve.",
          "El costo de salir de Grolow es cero. No hay penalidades ni activos retenidos.",
        ],
      },
      {
        h2: "Por qué Grolow lo hace así",
        body: [
          "Porque retener a un cliente con su propio dominio es una forma de engañarlo, y la regla principal de Grolow es no engañar nunca al cliente.",
          "Y por una razón práctica: un cliente que sabe que puede irse cuando quiera se queda porque el servicio le sirve, no porque no tenga salida. Esa es la única clase de cliente que Grolow quiere tener.",
        ],
      },
      {
        h2: "Cómo comprobar de quién es tu dominio hoy",
        body: [
          "Si ya tienes un sitio con otro proveedor, puedes comprobarlo en cinco minutos. Para dominios .com, busca tu dominio en una herramienta de consulta WHOIS o RDAP: el campo del registrante dice a nombre de quién está, aunque a veces aparece oculto por privacidad. Para dominios .do, consulta en NIC.DO, que es quien administra esa extensión en el país.",
          "Si no sale tu nombre ni el de tu empresa, pregúntale a tu proveedor por escrito a nombre de quién está y qué hace falta para pasarlo al tuyo. La respuesta te dice mucho de la relación.",
        ],
      },
    ],
    faq: [
      {
        q: "¿Puedo tener acceso a las cuentas técnicas aunque las opere Grolow?",
        a: "La titularidad del dominio, el código y los datos es tuya desde el principio. Si pides las credenciales o una exportación de tus datos, Grolow te las da.",
      },
      {
        q: "¿Y si Grolow cierra?",
        a: "Grolow se compromete a avisar con 60 días de anticipación y a entregar todo sin costo, igual que si te fueras tú.",
      },
      {
        q: "¿Puedo contratar a otro desarrollador para trabajar sobre lo que hizo Grolow?",
        a: "Sí. El código es tuyo, está documentado y no usa sistemas cerrados. Cualquier desarrollador competente puede continuarlo.",
      },
    ],
    related: [
      { to: "blogMensualidad", label: "Qué cubre la mensualidad de Grolow" },
      { to: "blogAntesDeContratar", label: "Qué preguntar antes de contratar una página web o un sistema" },
      { to: "blogQuienEsGrolow", label: "Quién está detrás de Grolow" },
    ],
    cta: {
      heading: "¿Tu dominio está a nombre de otro?",
      text: "Escríbele a Grolow. Te ayuda a entender qué tienes, dónde está y qué hace falta para que quede a tu nombre, contrates o no.",
      label: "Escribir por WhatsApp",
      message: "Hola, leí sobre la propiedad del dominio y el código, y quiero revisar mi caso:",
    },
  },
};
