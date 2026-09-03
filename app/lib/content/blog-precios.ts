import type { ContentTable } from "./types";

export const blogPreciosContent: ContentTable = {
  es: {
    eyebrow: "Artículo",
    h1: "¿Cuánto cuesta una página web en República Dominicana en 2026?",
    lead: [
      "Es la primera pregunta que hace todo el mundo y la que casi ningún proveedor contesta sin pedirte antes una reunión. Este artículo la contesta con números, incluidos los de la competencia.",
      "La respuesta corta: entre 0 y 3.000 dólares, y la diferencia no es capricho. La respuesta larga es entender qué compra cada rango, para que puedas mirar una cotización y saber si el número tiene sentido.",
    ],
    sections: [
      {
        h2: "La respuesta corta, por rangos",
        bullets: [
          {
            title: "0 a 15 dólares al mes — lo haces tú",
            text: "Wix, un tema de WordPress, un Linktree. El trabajo lo pones tú y el resultado se parecerá al de miles de negocios que usan la misma plantilla. Para validar una idea o cubrir un evento, es la decisión correcta.",
          },
          {
            title: "150 a 400 dólares — freelance de entrada",
            text: "Normalmente una plantilla adaptada con tus colores, tus textos y tus fotos. Es un trabajo legítimo y para muchos negocios pequeños es suficiente. El problema no es el precio: es creer que estás comprando un desarrollo propio.",
          },
          {
            title: "495 a 725 dólares — agencia local",
            text: "Es el rango que publican las agencias dominicanas por un sitio corporativo. La mayoría entrega sobre WordPress con un tema comprado y plugins. Incluye acompañamiento, correcciones y a veces contenido.",
          },
          {
            title: "550 dólares en adelante — desarrollo a medida",
            text: "Aquí el precio deja de depender del número de páginas y empieza a depender de qué tiene que hacer el sistema. Un sitio de servicios y una plataforma con reservas y pagos no se parecen en nada, aunque ambos se llamen «página web».",
          },
        ],
      },
      {
        h2: "Por qué el mismo sitio puede costar 200 o 2.000 dólares",
        body: [
          "Porque «página web» describe cosas muy distintas. Es como preguntar cuánto cuesta un vehículo: la respuesta depende de si necesitas una motocicleta para repartir o un camión para mudar mercancía.",
          "Cuando pides tres cotizaciones y una viene a 200 y otra a 1.500, lo más probable no es que una sea un abuso. Es que están cotizando dos cosas diferentes, y en la conversación nadie lo hizo explícito.",
          "El que cotiza 200 está pensando en adaptar una plantilla en dos días. El que cotiza 1.500 está pensando en escribir el contenido, programar un formulario que se conecte con tu correo y dejarte un panel para editar. Ninguno miente; están respondiendo preguntas distintas.",
        ],
      },
      {
        h2: "Lo que de verdad mueve el precio",
        subsections: [
          {
            h3: "Quién escribe el contenido",
            body: [
              "Es el factor que más subestima todo el mundo. Si entregas los textos listos, el proyecto es más corto y más barato. Si el proveedor tiene que redactarlos, está haciendo un trabajo distinto al de programar, y ese trabajo se cobra.",
              "También es la razón número uno por la que los proyectos se atrasan: no por el código, sino porque los textos y las fotos nunca terminan de llegar.",
            ],
          },
          {
            h3: "Si el sitio guarda datos o solo los muestra",
            body: [
              "Un sitio que presenta información es un trabajo. Un sitio donde alguien crea una cuenta, reserva una cita o consulta su historial es otro: hay base de datos, permisos, estados y casos raros que hay que contemplar.",
              "El salto de precio entre «mostrar» y «guardar» es el más grande de todos, y es donde más conviene preguntar exactamente qué está incluido.",
            ],
          },
          {
            h3: "Cuántas personas tienen que aprobar",
            body: [
              "Un proyecto con un dueño que decide avanza. Un proyecto con cuatro personas opinando y ninguna decidiendo puede durar el doble, y ese tiempo alguien lo paga. Los proveedores con experiencia lo incluyen en el precio aunque no lo digan.",
            ],
          },
          {
            h3: "Para cuándo lo necesitas",
            body: [
              "Un proyecto urgente cuesta más porque desplaza a otro que ya estaba agendado. Si tienes flexibilidad de fechas, dilo: normalmente se traduce en un mejor número.",
            ],
          },
        ],
      },
      {
        h2: "Los costos que no aparecen en la cotización",
        body: [
          "El precio del desarrollo es solo una parte. Antes de comparar dos propuestas, asegúrate de estar comparando el primer año completo y no el primer pago.",
        ],
        bullets: [
          {
            title: "Dominio",
            text: "Entre 10 y 25 dólares al año para un .com. Se renueva todos los años y debe estar a tu nombre, no al del proveedor.",
          },
          {
            title: "Alojamiento",
            text: "Desde gratis en planes básicos hasta 20 o 30 dólares al mes según el tráfico y lo que el sitio haga. En los planes mensuales suele venir incluido.",
          },
          {
            title: "Correo corporativo",
            text: "Si quieres tunombre@tuempresa.com, eso es un servicio aparte, normalmente unos pocos dólares por buzón al mes. Casi nunca viene incluido y casi nadie lo pregunta.",
          },
          {
            title: "Cambios después de la entrega",
            text: "Pregunta explícitamente qué pasa a los tres meses cuando quieras cambiar un precio o subir una foto. En algunos acuerdos está incluido y en otros cada cambio se cotiza.",
          },
          {
            title: "Fotografía",
            text: "Si tu negocio es visual y no tienes fotos decentes, ese es un costo real y separado. Una web bien hecha con fotos malas se ve peor que una plantilla con fotos buenas.",
          },
        ],
      },
      {
        h2: "Señales de alerta al comparar propuestas",
        subsections: [
          {
            h3: "«Primera página de Google garantizada»",
            body: [
              "Nadie puede garantizar una posición en Google. Ni una agencia local, ni una internacional: los propios términos de Google prohíben esa promesa, y ninguna empresa controla el algoritmo de otra.",
              "Cuando alguien la ofrece, normalmente va a posicionarte por una frase que nadie busca — el nombre exacto de tu empresa, por ejemplo — para poder enseñarte una captura y decir que cumplió. Técnicamente cierto, comercialmente inútil.",
            ],
          },
          {
            h3: "«50 backlinks incluidos»",
            body: [
              "Los enlaces vendidos por paquete vienen de redes creadas para eso, y son exactamente el patrón que los buscadores detectan y penalizan. Es de los pocos servicios que pueden dejar tu sitio peor que antes de contratarlo.",
              "Un enlace bueno viene de un sitio real que te menciona porque tiene razones para hacerlo. Esos no se venden de a cincuenta.",
            ],
          },
          {
            h3: "Un precio muy por debajo del resto, sin explicación",
            body: [
              "A veces significa una plantilla, y está bien si lo sabes. Otras veces significa que el mantenimiento, el alojamiento o el dominio aparecen después como cargos separados. Y a veces significa que quien cotiza no ha entendido el alcance, lo cual termina en un proyecto abandonado a la mitad.",
            ],
          },
          {
            h3: "No queda claro de quién es el dominio",
            body: [
              "Si el dominio se registra a nombre del proveedor, cambiar de proveedor deja de ser una decisión tuya y pasa a ser una negociación. Debe estar a tu nombre desde el primer día, sin excepción y sin importar quién lo pague.",
            ],
          },
        ],
      },
      {
        h2: "Cuándo lo barato es la decisión correcta",
        body: [
          "Hay una versión perezosa de este artículo que termina diciendo que lo barato sale caro. No siempre es verdad y conviene decirlo.",
          "Si estás validando si tu producto se vende, un constructor gratuito y un enlace en la bio son la decisión correcta. Gastar 800 dólares en un sitio para un negocio que todavía no sabes si va a existir en seis meses es peor inversión que gastarlos en inventario o en publicidad.",
          "Lo barato sale caro en un caso concreto: cuando ya tienes clientes, ya facturas, y el sitio se convierte en el cuello de botella. Ahí seguir ahorrando cuesta ventas todos los meses.",
        ],
      },
      {
        h2: "Entonces, ¿cuánto deberías gastar tú?",
        body: [
          "Una regla que funciona razonablemente bien: lo que gastes en el sitio debería recuperarse con las ventas de uno o dos meses. Si vendes servicios de 500 dólares y el sitio te trae un cliente al mes, un proyecto de 700 se paga solo rápido. Si tu ticket es de 15 dólares y vendes por volumen en redes, la cuenta es distinta y probablemente no necesitas todavía un desarrollo a medida.",
          "Haz esa cuenta antes de pedir cotizaciones, no después. Llegar con un rango claro cambia la conversación: en vez de que te digan un número y tú reacciones, puedes preguntar qué se puede construir con lo que tienes.",
        ],
      },
    ],
    faq: [
      {
        q: "¿Es más barato contratar a alguien fuera del país?",
        a: "A veces sí en tarifa por hora, pero la diferencia horaria y el idioma alargan cada revisión. Para un proyecto pequeño ese roce suele comerse el ahorro; para uno grande y bien especificado puede tener sentido.",
      },
      {
        q: "¿Cuánto cuesta mantener una página web al año?",
        a: "Como mínimo el dominio, entre 10 y 25 dólares. Si además quieres alojamiento gestionado, actualizaciones y cambios de contenido, en el mercado local eso ronda entre 30 y 60 dólares al mes según lo que incluya.",
      },
      {
        q: "¿Cómo suele estructurarse el pago?",
        a: "Lo habitual es dividirlo: una parte al empezar y el resto contra entrega. En proyectos largos se cobra por fases. La pregunta decisiva no es cómo se reparte el pago, sino qué pasa con tu sitio y tu dominio si la relación se acaba: pídelo por escrito.",
      },
      {
        q: "¿Por qué algunas agencias no publican precios?",
        a: "En proyectos con sistemas el alcance varía tanto que un precio de lista sería inventado. Pero para un sitio corporativo estándar, no publicarlo suele ser una decisión comercial: prefieren cotizar después de conocer tu presupuesto.",
      },
    ],
    related: [
      { to: "precios", label: "Nuestros precios, con los dos planes y qué incluye cada uno" },
      {
        to: "blogWordpress",
        label: "WordPress o código a medida: cuál le conviene a tu negocio",
      },
      { to: "desarrolloWeb", label: "Qué incluye el desarrollo web a medida" },
    ],
    cta: {
      heading: "¿Quieres el número de tu caso?",
      text: "Cuéntanos qué necesitas y te devolvemos una propuesta con alcance, inversión y fecha en menos de 24 horas. Si por lo que nos describes te conviene una opción más barata que la nuestra, te lo decimos.",
      label: "Pedir mi propuesta",
      message:
        "Hola, leí el artículo sobre precios y quiero una propuesta para mi caso. Lo que necesito es:",
    },
  },
};
