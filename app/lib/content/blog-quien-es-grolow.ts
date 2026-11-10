import type { ContentTable } from "./types";

export const blogQuienEsGrolowContent: ContentTable = {
  es: {
    eyebrow: "Sobre Grolow",
    h1: "Quién está detrás de Grolow y cómo se reparte el trabajo",
    lead: [
      "Antes de dejarle a una empresa el sistema del que depende tu negocio, es razonable preguntar quién hay detrás. Grolow es una empresa pequeña, y este artículo lo dice tal cual: quién la dirige, quién programa, quién contesta cuando algo falla y qué pasa con tu proyecto si una de esas personas cambia.",
      "Lo que no vas a encontrar aquí son cifras infladas de clientes, años de experiencia que no existen ni un equipo de diez personas en una foto de banco de imágenes.",
    ],
    sections: [
      {
        h2: "El fundador: Warling López",
        body: [
          "Grolow la fundó en 2025 Warling López, desarrollador full-stack dominicano. Antes de Grolow trabajó desde 2023 como desarrollador web independiente para negocios locales, con su propio sitio, warling.top, donde todavía publica su trabajo personal.",
          "Hoy dirige Grolow: decide qué se construye y cómo, vende, revisa todo lo que se entrega y atiende el soporte. Programa sobre todo con Next.js, React y TypeScript, y opera la infraestructura de los clientes en Vercel y Supabase.",
          "Su perfil profesional está en LinkedIn y su código público en GitHub, como warling-lopez. Si quieres saber con quién estás tratando, esos dos enlaces dicen más que cualquier párrafo de «sobre nosotros».",
        ],
      },
      {
        h2: "Quién programa",
        body: [
          "Grolow trabaja con colaboradores de desarrollo por proyecto. Desde noviembre de 2026 hay un colaborador fijo que construye catálogos, sistemas y cambios junto al fundador.",
          "No es un detalle menor y conviene decirlo claro, porque mucha gente da por hecho que la persona con la que habla es la que escribe todo el código. En Grolow no siempre es así, y eso es una ventaja más que un riesgo, siempre que se haga con reglas.",
        ],
        bullets: [
          {
            title: "Contrato antes de tocar código",
            text: "Todo colaborador firma cesión total de derechos, confidencialidad y no competencia antes de trabajar en el proyecto de un cliente. Sin esa cesión, Grolow no podría entregarle al cliente la propiedad del código.",
          },
          {
            title: "Cuentas de Grolow, accesos que se quitan",
            text: "Los colaboradores trabajan en repositorios y cuentas de Grolow, nunca en cuentas personales, y sus accesos se retiran al terminar.",
          },
          {
            title: "No atienden clientes",
            text: "El cliente trata con Grolow. La comunicación, las decisiones y el soporte los lleva el fundador.",
          },
        ],
      },
      {
        h2: "Quién contesta cuando algo falla",
        body: [
          "El soporte lo atiende directamente el fundador, por WhatsApp. No hay centro de llamadas ni sistema de tickets que nadie lee.",
          "La Perfurm RD, el cliente con más tiempo en Grolow, tuvo dos incidentes en su primera etapa: una caída de un proveedor externo y un error de Grolow. Los dos se resolvieron el mismo día, y por el error propio Grolow le compensó un mes sin que lo pidiera. Es un historial corto, y Grolow no pretende que sea más largo. Pero es real, y el cliente dio permiso por escrito para contarlo.",
        ],
      },
      {
        h2: "Por qué la marca es Grolow y no el nombre del fundador",
        body: [
          "Podría haberse vendido como «el desarrollador que te atiende personalmente». Grolow decidió no hacerlo, por una razón práctica: esa promesa caduca el día que el negocio crece.",
          "La promesa de Grolow es otra: alguien responde rápido y se hace cargo, y si el error es de Grolow, Grolow lo asume. Esa promesa sobrevive aunque mañana haya más personas en el soporte, porque nunca dependió de quién contesta, sino de cómo se trabaja.",
        ],
      },
      {
        h2: "Qué pasa con tu proyecto si una persona cambia",
        body: [
          "Es la pregunta que casi nadie hace y la más importante con una empresa pequeña. La respuesta de Grolow está en cómo entrega cada proyecto.",
        ],
        bullets: [
          {
            title: "El código queda documentado",
            text: "Todo proyecto se entrega con el repositorio completo y su historial, un documento que explica cómo desplegarlo y la lista de variables de configuración. Cualquier desarrollador competente puede continuarlo.",
          },
          {
            title: "Nada propietario ni cerrado",
            text: "Grolow no usa sistemas cerrados ni código ofuscado que te ate a ella.",
          },
          {
            title: "Si Grolow dejara de dar el servicio",
            text: "Avisa con 60 días de anticipación y entrega todo sin costo: base de datos, código, credenciales y el dominio.",
          },
          {
            title: "Si eres tú quien se va",
            text: "Te llevas todo en un máximo de 10 días hábiles, también sin costo.",
            to: "blogPropiedad",
          },
        ],
      },
      {
        h2: "Lo que Grolow todavía no tiene",
        body: [
          "Pocas reseñas en Google y un portafolio corto. Cualquier empresa que empieza está ahí, y la alternativa a decirlo sería inventar números, que es justo lo que la regla principal de Grolow prohíbe: nunca engañar al cliente.",
          "Lo que sí tiene se puede comprobar: sitios en línea que puedes abrir, un caso con permiso del cliente para contarlo, un fundador con nombre y apellido, y condiciones por escrito antes de que pagues nada.",
        ],
      },
    ],
    faq: [
      {
        q: "¿Grolow es una sola persona?",
        a: "No. La dirige su fundador y trabaja con colaboradores de desarrollo por proyecto. El soporte y la relación con el cliente los lleva el fundador.",
      },
      {
        q: "¿Puedo saber quién va a programar mi proyecto?",
        a: "Sí. Si lo preguntas, Grolow te lo dice. La responsabilidad frente a ti es siempre de Grolow, la programe quien la programe.",
      },
      {
        q: "¿Dónde puedo ver el trabajo del fundador?",
        a: "En los casos publicados en grolow.com, en su perfil de LinkedIn y en su GitHub, warling-lopez.",
      },
    ],
    related: [
      { to: "blogQueEsGrolow", label: "Qué es Grolow y qué hace" },
      { to: "blogPropiedad", label: "De quién es tu dominio, tu código y tus datos" },
      { to: "casos", label: "Casos de éxito de Grolow" },
    ],
    cta: {
      heading: "¿Quieres preguntar algo antes de contar tu proyecto?",
      text: "Escríbele al fundador por WhatsApp. Te contesta él, por escrito.",
      label: "Escribir por WhatsApp",
      message: "Hola Warling, leí quién está detrás de Grolow y tengo una pregunta:",
    },
  },
};
