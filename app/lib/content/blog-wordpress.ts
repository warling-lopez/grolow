import type { ContentTable } from "./types";

export const blogWordpressContent: ContentTable = {
  es: {
    eyebrow: "Artículo",
    h1: "WordPress o código a medida: cuál le conviene a tu negocio",
    lead: [
      "Antes de nada, la declaración de interés: nosotros programamos en código propio y no montamos sobre WordPress. Léelo sabiendo eso.",
      "Dicho lo cual, este artículo no va a terminar diciendo que WordPress es malo, porque no lo es. Va a terminar diciendo para qué sirve cada uno, incluidos los casos en que lo que te conviene es lo que nosotros no vendemos.",
    ],
    sections: [
      {
        h2: "Qué es cada cosa, sin marketing",
        subsections: [
          {
            h3: "WordPress",
            body: [
              "Es un gestor de contenidos: un programa ya escrito que se instala en un servidor y te da un panel para publicar. Encima se le monta un «tema», que decide cómo se ve, y «plugins», que añaden funciones que el programa base no trae.",
              "Mueve una porción enorme de la web, tiene veinte años de historia y una comunidad gigantesca. Nada de eso es accidente: resuelve muy bien el problema para el que se creó.",
            ],
          },
          {
            h3: "Código a medida",
            body: [
              "Es escribir el programa desde cero para tu caso. No hay tema ni plugins: cada pantalla y cada comportamiento se programan. Hoy se hace con herramientas como React o Next.js, que resuelven la parte repetitiva sin imponerte una estructura.",
              "No es más «artesanal» ni más noble. Es una decisión de ingeniería con ventajas y costos concretos.",
            ],
          },
        ],
      },
      {
        h2: "Cuándo WordPress es la decisión correcta",
        body: [
          "Esta sección es la que casi ningún estudio que vende desarrollo a medida escribe, y es la más útil del artículo.",
        ],
        bullets: [
          {
            title: "Publicas contenido a menudo y con varias personas",
            text: "Si tienes un blog activo, una revista o un medio con dos o tres redactores, con borradores, revisiones y permisos, WordPress hace eso muy bien y de fábrica. Reconstruirlo a medida es gastar dinero en reinventar algo resuelto.",
          },
          {
            title: "Necesitas poder cambiar de proveedor sin drama",
            text: "Hay muchísima gente que sabe trabajar con WordPress. Si tu relación con quien te lo hizo se rompe, encuentras reemplazo la semana siguiente. Con código a medida el grupo de personas que puede continuar el trabajo es más pequeño, y eso es un riesgo real que hay que decir.",
          },
          {
            title: "Tu presupuesto está por debajo de los 500 dólares",
            text: "Con ese número, un desarrollo a medida honesto no da. Es preferible un WordPress bien montado que un desarrollo a medida recortado hasta que deja de tener sentido.",
          },
          {
            title: "Necesitas algo publicado esta semana",
            text: "Con un tema decente se llega antes. Si tienes una fecha inamovible y el sitio es sencillo, la velocidad de salida pesa más que la elegancia técnica.",
          },
        ],
      },
      {
        h2: "Cuándo WordPress se te queda corto",
        body: [
          "El patrón es casi siempre el mismo: el sitio deja de ser un folleto y empieza a formar parte de la operación.",
          "Mientras publiques páginas y artículos, todo va bien. El problema aparece cuando necesitas que el sitio haga algo que tu negocio hace de una forma particular: un flujo de reserva con reglas propias, un panel donde tu equipo vea el estado de cada pedido, una integración con el sistema que ya usas.",
          "En ese punto la respuesta habitual es instalar un plugin que hace el 80% de lo que necesitas, y luego otro que parchea el 20% restante. Cada uno añade código que no controlas, y todos tienen que seguir siendo compatibles entre sí en cada actualización. La complejidad deja de estar en tu sitio y pasa a estar en las costuras entre piezas de terceros.",
          "La segunda señal es el rendimiento. Un tema comprado trae funciones para todos sus compradores, no solo para ti, y el visitante descarga todas.",
        ],
      },
      {
        h2: "El mito de la velocidad, con matiz",
        body: [
          "Se dice que WordPress es lento y que el código a medida es rápido. Es una simplificación.",
          "Un WordPress bien montado — un tema ligero, pocos plugins, caché e imágenes optimizadas — puede ser perfectamente rápido, y hay sitios que lo demuestran. Un desarrollo a medida hecho sin cuidado puede ser lento, cargando librerías innecesarias y bloqueando la primera pintura.",
          "La diferencia real es el punto de partida y el techo. Con código propio empiezas en cero y añades solo lo que hace falta; con un tema empiezas con lo que el tema trae y trabajas para quitarlo. Se puede llegar rápido por los dos caminos, pero uno rema a favor.",
          "Y lo importante: exige que te lo midan. Que te enseñen PageSpeed Insights de un sitio real que hayan entregado, no una promesa en la propuesta.",
        ],
      },
      {
        h2: "Seguridad: dos riesgos distintos",
        body: [
          "WordPress recibe muchos ataques porque es popular: automatizar un ataque contra una plataforma que usan millones de sitios sale muy rentable. La mayoría de las intrusiones no explotan WordPress en sí, sino un plugin desactualizado.",
          "Eso hace el riesgo predecible y manejable: actualizar a tiempo, usar pocos plugins y elegirlos con criterio resuelve casi todo. Lo que pasa es que «actualizar a tiempo» requiere que alguien lo haga, y en muchos negocios ese alguien no existe.",
          "En código a medida no hay plugins que actualizar, así que esa superficie desaparece. A cambio, los errores que existan son tuyos y solo quien escribió el código puede encontrarlos: no hay una comunidad publicando parches para tu sistema.",
          "Ninguno de los dos es seguro por sí solo. Los dos dependen de que alguien se ocupe.",
        ],
      },
      {
        h2: "Lo que pierdes con el código a medida",
        body: [
          "Para que la comparación sea útil hay que decir también esta parte.",
          "Pierdes ecosistema: no hay un plugin que resuelva en diez minutos lo que se te ocurra un martes; si lo quieres, se programa y se paga. Pierdes precio de entrada: el primer proyecto cuesta más. Y asumes un riesgo de continuidad, porque la cantidad de gente capaz de retomar tu sistema es menor.",
          "Ese último riesgo se mitiga con dos cosas concretas, y conviene exigirlas: que el código quede en un repositorio a tu nombre y que el sistema esté documentado. Si un proveedor de desarrollo a medida se resiste a cualquiera de las dos, ese es el problema, no la tecnología.",
        ],
      },
      {
        h2: "Cómo decidir en cinco minutos",
        bullets: [
          {
            title: "¿Tu sitio publica contenido o hace funcionar tu negocio?",
            text: "Si publica, WordPress es un buen candidato. Si tu operación pasa por ahí — pedidos, reservas, datos de clientes — el desarrollo a medida se justifica.",
          },
          {
            title: "¿Cuántas personas van a editarlo y con qué frecuencia?",
            text: "Varias personas publicando cada semana favorece WordPress. Una persona cambiando precios de vez en cuando no necesita todo ese aparato.",
          },
          {
            title: "¿Qué pasa si el sitio se cae un sábado?",
            text: "Si la respuesta es «pierdo ventas», invierte en algo que controles y en alguien que responda. Si es «lo vemos el lunes», no pagues de más.",
          },
          {
            title: "¿Tienes presupuesto para el primer año completo?",
            text: "No solo para el desarrollo: también dominio, alojamiento y mantenimiento. Si el número solo alcanza para construirlo y no para sostenerlo, empieza más sencillo.",
          },
        ],
      },
      {
        h2: "La respuesta honesta",
        body: [
          "Para la mayoría de los negocios pequeños que apenas empiezan, WordPress o incluso un constructor es suficiente, y quien les venda un desarrollo a medida de dos mil dólares les está vendiendo algo que todavía no necesitan.",
          "Para un negocio con operación, equipo y clientes que ya facturan, donde el sitio tiene que hacer algo particular y el rendimiento se traduce en dinero, el desarrollo a medida se paga.",
          "El error caro no es elegir mal la tecnología. Es elegirla sin haber definido antes qué tiene que hacer el sitio.",
        ],
      },
    ],
    faq: [
      {
        q: "¿Se puede migrar de WordPress a código a medida sin perder el posicionamiento?",
        a: "Sí, si la migración se hace con redirecciones de cada URL antigua a la nueva y se conserva el contenido que ya rankea. El posicionamiento se pierde cuando se migra sin redirecciones, no por cambiar de tecnología.",
      },
      {
        q: "¿Y Shopify, Wix o Squarespace?",
        a: "Son la misma conversación con otro nombre: cambias control por velocidad de salida. Shopify en particular es una buena decisión si vendes muchos productos con pago en línea y no necesitas nada fuera de lo que ofrece.",
      },
      {
        q: "Tengo un WordPress lento. ¿Lo arreglo o lo rehago?",
        a: "Casi siempre conviene intentar arreglarlo primero: quitar plugins que no se usan, cambiar a un tema ligero y optimizar imágenes suele dar una mejora grande por poco dinero. Rehacer se justifica cuando además necesitas funciones que el tema no permite.",
      },
      {
        q: "¿El código a medida necesita mantenimiento?",
        a: "Sí, aunque distinto. No hay plugins que actualizar, pero las dependencias del proyecto y la plataforma donde corre sí reciben versiones nuevas. Es menos frecuente y más predecible, no inexistente.",
      },
    ],
    related: [
      {
        to: "desarrolloWeb",
        label: "Cómo trabajamos el desarrollo web a medida",
      },
      {
        to: "blogPrecios",
        label: "Cuánto cuesta una página web en República Dominicana",
      },
      { to: "empresas", label: "Sitios web para empresas medianas" },
    ],
    cta: {
      heading: "¿No sabes cuál te toca?",
      text: "Cuéntanos qué tiene que hacer tu sitio y te decimos cuál de los dos caminos te conviene. Si es WordPress, te lo diremos aunque no sea lo que nosotros vendemos.",
      label: "Escribir por WhatsApp",
      message:
        "Hola, leí el artículo sobre WordPress y código a medida. Mi caso es el siguiente:",
    },
  },
};
