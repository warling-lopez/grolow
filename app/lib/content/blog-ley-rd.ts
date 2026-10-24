import type { ContentTable } from "./types";

export const blogLeyRdContent: ContentTable = {
  es: {
    eyebrow: "Artículo · República Dominicana",
    h1: "Qué dice la ley dominicana si hackean tu sitio web",
    lead: [
      "Crisis como la de PHP2Shell dejan una pregunta que casi ningún negocio dominicano se ha hecho antes de necesitarla: si entran a mi sitio y se llevan datos de mis clientes, ¿qué me obliga la ley a hacer, a quién le aviso y qué puedo reclamar?",
      "Este artículo resume el marco legal vigente en República Dominicana a octubre de 2026, con sus huecos. No es asesoría legal: si tienes un incidente con datos de clientes, habla con un abogado. Pero sí te sirve para saber qué preguntarle.",
    ],
    sections: [
      {
        h2: "Las normas que importan, en una tabla mental",
        bullets: [
          {
            title: "Ley 53-07 sobre crímenes y delitos de alta tecnología",
            text: "Tipifica como delito el acceso no autorizado a sistemas, el sabotaje y el robo de datos, entre otros. Es la ley que te protege como víctima. Según el CNCS, su actualización está en fase de ser remitida al Congreso.",
          },
          {
            title: "Ley 172-13 de protección de datos personales",
            text: "Impone a quien maneja datos personales un deber de seguridad y un deber de secreto. Es la ley que te obliga como responsable de los datos de tus clientes.",
          },
          {
            title: "Decreto 313-22: Estrategia Nacional de Ciberseguridad 2030",
            text: "Define la política del Estado en ciberseguridad y el marco en el que opera el CNCS.",
          },
          {
            title: "Decreto 685-22",
            text: "Establece la notificación obligatoria de eventos e incidentes de ciberseguridad para la Administración Pública.",
          },
          {
            title: "Reglamento de Seguridad Cibernética y de la Información (Junta Monetaria, 2018)",
            text: "Reglas específicas para bancos y entidades del sistema financiero, que tienen obligaciones propias y más estrictas.",
          },
        ],
      },
      {
        h2: "Si eres una institución pública",
        body: [
          "Tienes obligación de notificar. El Decreto 685-22 hizo obligatoria la notificación de eventos e incidentes de ciberseguridad en la Administración Pública, y el CNCS publicó una guía para identificar y reportar incidentes. Si un sitio .gob.do fue comprometido por PHP2Shell o por cualquier otra vía, el reporte al CNCS no es opcional.",
        ],
      },
      {
        h2: "Si eres un banco o una entidad financiera",
        body: [
          "Te rige el Reglamento de Seguridad Cibernética y de la Información aprobado por la Junta Monetaria en noviembre de 2018, supervisado por la Superintendencia de Bancos. Tiene obligaciones propias de gestión de riesgos e incidentes. Si estás en este sector, tu área de cumplimiento ya lo conoce; si eres un proveedor tecnológico de una entidad financiera, pregúntale qué te exige a ti.",
        ],
      },
      {
        h2: "Si eres una empresa privada de cualquier otro sector",
        body: [
          "Aquí está el hueco. La Ley 172-13 te obliga a proteger los datos personales que manejas, pero, a diferencia de leyes como el reglamento europeo, no establece una obligación general de notificar las filtraciones a una autoridad en un plazo concreto. Entre otras razones, porque el país no tiene una autoridad independiente de protección de datos: la Superintendencia de Bancos actúa como órgano de control solo para las sociedades de información crediticia.",
          "Que no haya un plazo de notificación no significa que no haya responsabilidad. El deber de seguridad de la Ley 172-13 sigue ahí: si se filtran datos de tus clientes porque tu sitio corría una versión de PHP sin corregir durante semanas después de un aviso mundial, va a ser difícil argumentar que tomaste medidas de seguridad razonables.",
          "Hubo un proyecto de ley de ciberseguridad en el Senado, y el director del CNCS ha dicho públicamente que el país necesita una ley que formalice obligaciones y protecciones. Al momento de escribir no encontramos que se haya aprobado. Es razonable esperar que, cuando llegue, incluya obligaciones de notificación también para el sector privado.",
        ],
      },
      {
        h2: "Qué hacer si hackean tu sitio",
        subsections: [
          {
            h3: "Las primeras horas",
            body: [
              "Contén el daño: cambia contraseñas del hosting, del panel, de la base de datos y de las pasarelas de pago, y si hace falta, desconecta el sitio. Pero antes de borrar o restaurar nada, guarda una copia de los registros del servidor y de los archivos modificados. Es la evidencia de lo que pasó, y la vas a necesitar si denuncias o si un cliente reclama.",
            ],
          },
          {
            h3: "Reportar",
            body: [
              "Puedes reportar el incidente al CNCS a través de su CSIRT, que recibe reportes y ayuda a detectar patrones que afectan a otros. Si hubo un delito — robo de datos, fraude, extorsión —, la denuncia penal se presenta ante el Departamento de Investigación de Crímenes y Delitos de Alta Tecnología (DICAT) de la Policía Nacional o ante la Procuraduría Especializada contra Crímenes y Delitos de Alta Tecnología (PEDATEC) del Ministerio Público.",
            ],
          },
          {
            h3: "Tus clientes",
            body: [
              "Aunque la ley no te ponga un plazo, si se expusieron datos de clientes, avisarles es lo correcto y suele ser lo más inteligente. Un cliente que se entera por ti puede cambiar sus contraseñas y estar atento a intentos de fraude. Un cliente que se entera por la prensa o por un fraude deja de ser cliente.",
            ],
          },
          {
            h3: "Tu proveedor",
            body: [
              "Revisa qué dice tu contrato con quien desarrolló o mantiene el sitio. Si tenías un contrato de mantenimiento que incluía actualizaciones de seguridad y no se aplicaron, eso es una conversación con tu proveedor y, si hace falta, con tu abogado. Si no tenías contrato de mantenimiento, es una conversación pendiente contigo mismo.",
            ],
          },
        ],
      },
      {
        h2: "Lo que conviene hacer antes de que pase",
        bullets: [
          {
            title: "Sabe qué datos personales manejas y dónde están",
            text: "Formularios de contacto, pedidos, citas, historiales. Si no sabes qué guardas, no puedes protegerlo ni saber qué se filtró.",
          },
          {
            title: "Guarda solo lo que necesitas",
            text: "Los datos que no tienes no se pueden filtrar. Si tu formulario guarda cédulas o fechas de nacimiento que nadie usa, deja de pedirlas.",
          },
          {
            title: "Pon las actualizaciones de seguridad en el contrato",
            text: "Que quede por escrito quién aplica las actualizaciones, en qué plazo y qué pasa si no se aplican.",
          },
          {
            title: "Ten una política de privacidad real",
            text: "Que diga qué datos recoges, para qué y con quién los compartes. La Ley 172-13 reconoce el derecho de las personas a ser informadas sobre el uso de sus datos, y una política clara es la forma práctica de cumplirlo. Además, es lo primero que alguien va a leer si hay un problema.",
          },
          {
            title: "Ten a mano los contactos",
            text: "El de tu proveedor técnico, el de tu abogado y el canal de reporte del CNCS. En medio de un incidente no es el momento de buscarlos.",
          },
        ],
      },
      {
        h2: "Fuentes consultadas",
        bullets: [
          {
            title: "Ley 53-07 y Ley 172-13",
            text: "Textos legales vigentes sobre delitos de alta tecnología y protección de datos personales.",
          },
          {
            title: "Centro Nacional de Ciberseguridad",
            text: "Guía de identificación y reporte de incidentes, Estrategia Nacional de Ciberseguridad 2030 y estado de la actualización de la Ley 53-07.",
          },
          {
            title: "Superintendencia de Bancos",
            text: "Reglamento de Seguridad Cibernética y de la Información de la Junta Monetaria (2018).",
          },
          {
            title: "Acento y El Caribe",
            text: "Declaraciones del director del CNCS sobre la necesidad de una ley de ciberseguridad.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "¿Me pueden multar si hackean mi sitio?",
        a: "La Ley 172-13 contempla sanciones por incumplir sus obligaciones, entre ellas la de seguridad. Si te aplican depende de las circunstancias concretas, y eso es una pregunta para un abogado.",
      },
      {
        q: "¿Tengo que avisar a mis clientes si se filtraron sus datos?",
        a: "Para empresas fuera del sector público y financiero no encontramos una obligación legal general con plazo fijo. Aun así, avisarles es lo recomendable para que puedan protegerse.",
      },
      {
        q: "¿El CNCS atiende a empresas privadas?",
        a: "El CNCS recibe reportes de incidentes y publica alertas para todo el país. Su función principal es la protección del Estado, pero reportar un incidente privado ayuda a detectar ataques que pueden estar afectando a otros.",
      },
    ],
    related: [
      {
        to: "blogPhpRd",
        label: "Cómo afectó PHP2Shell a República Dominicana",
      },
      {
        to: "blogCertificadosRd",
        label: "Certificados digitales en República Dominicana tras eMudhra",
      },
      {
        to: "blogSemanaNegra",
        label: "La semana negra de los servidores web: qué aprender",
      },
    ],
    cta: {
      heading: "¿Tu sitio guarda datos de clientes?",
      text: "Te ayudamos a revisar qué datos guarda tu sitio, dónde y cómo están protegidos. Lo legal se lo dejamos a tu abogado; lo técnico, a nosotros.",
      label: "Escribir por WhatsApp",
      message:
        "Hola, leí el artículo sobre la ley dominicana y la seguridad web, y quiero revisar mi sitio:",
    },
  },
};
