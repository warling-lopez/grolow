/**
 * El FAQ de la portada.
 *
 * Vive aquí y no dentro de `FaqSection` porque el mismo contenido alimenta dos
 * consumidores: el componente que lo pinta y el `FAQPage` en JSON-LD que se
 * emite en el servidor. Si se duplicara, tarde o temprano el texto marcado y el
 * texto visible dejarían de coincidir, que es exactamente lo que Google trata
 * como datos estructurados engañosos.
 *
 * Regla de redacción: la respuesta y la cifra van en la PRIMERA oración, y el
 * contexto después. Es lo que extraen los motores generativos cuando alguien
 * pregunta por el tema; si la primera frase es un preámbulo, se cita el
 * preámbulo.
 *
 * Segunda regla: aquí no se afirma nada que la web no sostenga en otra parte.
 * Los importes salen de la misma tabla que publica `/es/precios`.
 */

export type Faq = { q: string; a: string };

export const HOME_FAQ_ES: Faq[] = [
  {
    q: "¿El código es mío cuando termina el proyecto?",
    a: "Sí, el repositorio queda a tu nombre al cerrar la última fase. Te entregamos el código, los accesos al servidor y al dominio, y la documentación para levantarlo. No cobramos licencia mensual por usar lo que ya pagaste, y si algún día quieres seguir con otro equipo, no tienes que pedirnos permiso ni esperar a que te lo liberemos.",
  },
  {
    q: "¿Qué pasa si la operación crece de golpe?",
    a: "El sistema se dimensiona para crecer sin reescribirse: se despliega en infraestructura que escala sola y la base de datos se diseña pensando en el volumen de dentro de dos años, no en el de hoy. Cuando el crecimiento pide funciones nuevas —otra sucursal, otro almacén, otro rol de usuario— se añaden como una fase más, sobre el mismo código.",
  },
  {
    q: "¿Por qué un sistema a medida y no WordPress, Shopify o un software enlatado?",
    a: "Porque un enlatado te obliga a operar como el enlatado espera, y tu negocio ya tiene una forma de trabajar. Si tu proceso tiene una excepción rara —un precio que depende del cliente, un descuento que solo aplica los martes, un flujo de aprobación propio— en una plataforma cerrada se resuelve con parches, plugins de terceros y gente copiando datos a mano. A medida se programa y ya está. La otra diferencia es el coste a tres años: no hay suscripciones que suban ni plugins que caduquen.",
  },
  {
    q: "¿Cómo protegen mis datos y los de mis clientes?",
    a: "Con HTTPS en todo el sitio, accesos por rol y copias de seguridad automáticas. Cada persona del equipo ve solo lo que necesita para su trabajo, las contraseñas nunca se guardan en texto plano y los datos viven en infraestructura gestionada, no en un servidor compartido. Si tu operación maneja datos sensibles, lo tratamos en el diagnóstico y queda escrito en la propuesta.",
  },
  {
    q: "¿Usan inteligencia artificial de verdad o es marketing?",
    a: "La usamos solo donde resuelve algo concreto y medible: clasificar pedidos que entran por chat, extraer los datos de una factura en foto, responder las consultas que se repiten. No vendemos «IA» como categoría. Si en tu caso una regla de negocio de diez líneas hace el mismo trabajo, te lo decimos y nos ahorramos los dos el sobrecoste.",
  },
  {
    q: "¿Qué pasa después de la entrega? ¿Hay soporte?",
    a: "Los primeros 15 días cualquier ajuste va incluido. A partir de ahí puedes contratar horas de soporte cuando las necesites o un acuerdo mensual si prefieres tenerlo cubierto; las dos opciones se cotizan aparte y sin permanencia. Lo que no hacemos es dejarte atado: como el código es tuyo, el soporte lo puede dar cualquier equipo.",
  },
  {
    q: "¿Trabajan con clientes fuera de República Dominicana?",
    a: "Sí. Trabajamos en remoto y atendemos en español e inglés, aunque la mayoría de nuestros clientes están en República Dominicana. El proceso es el mismo esté donde esté el cliente: diagnóstico por videollamada, propuesta por escrito y entregas revisables.",
  },
  {
    q: "¿Pueden trabajar sobre un sistema o una web que ya tengo?",
    a: "Sí, y muchas veces es lo más barato. En el diagnóstico miramos qué se aprovecha y qué no: a veces basta con conectar lo que ya usas, y otras veces reescribirlo sale más a cuenta que seguir parcheándolo. Te decimos cuál de los dos casos es el tuyo antes de cotizar, aunque la respuesta sea que no nos necesitas todavía.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Los proyectos van de US$250 a US$1,500 según el alcance, y las automatizaciones e integraciones se cobran a US$25 la hora. Una landing va de US$250 a US$450, un sitio corporativo de US$450 a US$800 y una tienda con pedidos por WhatsApp de US$800 a US$1,500. Un sistema de operación a medida se cotiza por fases, porque un inventario de farmacia y uno de repuestos no se parecen en nada. El precio se cierra por escrito antes de empezar.",
  },
  {
    q: "¿Cuánto tarda?",
    a: "Entre 2 y 6 semanas para la mayoría de los proyectos, y por fases cuando es un sistema de operación completo. La fecha sale del diagnóstico y va en la propuesta junto al alcance y al precio; lo que más suele retrasar un proyecto no es el código, sino esperar los contenidos y las decisiones del lado del cliente.",
  },
  {
    q: "¿Qué necesito para empezar?",
    a: "Saber qué parte de tu operación te está costando tiempo. Nada más. No hace falta que tengas el logo, los textos ni las fotos listas, ni que sepas qué tecnología quieres: eso es justamente lo que resolvemos en el diagnóstico. Salimos de ahí con un documento que dice qué se puede automatizar, qué no conviene tocar y en qué orden tiene sentido hacerlo.",
  },
];

export const HOME_FAQ_EN: Faq[] = [
  {
    q: "Do I own the code when the project ends?",
    a: "Yes — the repository is transferred to your name when the last phase closes. We hand over the code, the server and domain credentials, and the documentation to run it. We don't charge a monthly licence for something you already paid for, and if you ever want to continue with another team, you don't need our permission or our sign-off.",
  },
  {
    q: "What happens if the operation grows suddenly?",
    a: "The system is sized to grow without being rewritten: it's deployed on infrastructure that scales on its own, and the database is designed for the volume you'll have in two years, not today's. When growth calls for new features — another branch, another warehouse, another user role — they're added as one more phase, on the same codebase.",
  },
  {
    q: "Why custom software instead of WordPress, Shopify or off-the-shelf?",
    a: "Because off-the-shelf makes you operate the way it expects, and your business already has a way of working. If your process has an odd exception — a price that depends on the client, a discount that only applies on Tuesdays, an approval flow of your own — a closed platform solves it with patches, third-party plugins and people copying data by hand. Custom code just programs it. The other difference is the three-year cost: no subscriptions that rise, no plugins that expire.",
  },
  {
    q: "How do you protect my data and my clients' data?",
    a: "With HTTPS across the site, role-based access and automatic backups. Each person on your team sees only what their job requires, passwords are never stored in plain text, and data lives on managed infrastructure, not a shared server. If your operation handles sensitive data, we cover it in the diagnosis and it goes into the written proposal.",
  },
  {
    q: "Do you use real AI, or is it marketing?",
    a: "We use it only where it solves something concrete and measurable: classifying orders that arrive by chat, pulling data off a photographed invoice, answering the questions that repeat. We don't sell \"AI\" as a category. If a ten-line business rule does the same job in your case, we'll say so and save us both the overhead.",
  },
  {
    q: "What happens after delivery? Is there support?",
    a: "The first 15 days include any adjustment at no cost. After that you can buy support hours as you need them, or a monthly agreement if you'd rather have it covered; both are quoted separately and neither locks you in. What we don't do is tie you down: since the code is yours, any team can support it.",
  },
  {
    q: "Do you work with clients outside the Dominican Republic?",
    a: "Yes. We work remotely and in both Spanish and English, though most of our clients are in the Dominican Republic. The process is the same wherever the client is: a diagnosis over video call, a written proposal, and reviewable deliveries.",
  },
  {
    q: "Can you work on a system or site I already have?",
    a: "Yes, and it's often the cheaper route. In the diagnosis we look at what's worth keeping: sometimes connecting what you already use is enough, and sometimes rewriting costs less than continuing to patch it. We tell you which of the two your case is before quoting — even when the answer is that you don't need us yet.",
  },
  {
    q: "How much does it cost?",
    a: "Projects run from US$250 to US$1,500 depending on scope, and automations and integrations are billed at US$25 an hour. A landing page runs US$250 to US$450, a corporate site US$450 to US$800, and a store with WhatsApp ordering US$800 to US$1,500. A full custom operations system is quoted in phases, because a pharmacy's inventory and an auto-parts inventory have nothing in common. The price is fixed in writing before we start.",
  },
  {
    q: "How long does it take?",
    a: "Between 2 and 6 weeks for most projects, and in phases when it's a full operations system. The date comes out of the diagnosis and goes into the proposal alongside scope and price; what usually delays a project isn't the code, it's waiting on content and decisions from the client's side.",
  },
  {
    q: "What do I need to get started?",
    a: "Knowing which part of your operation is costing you time. That's it. You don't need a logo, copy or photos ready, and you don't need to know what technology you want — that's exactly what the diagnosis is for. You leave it with a document saying what can be automated, what's better left alone, and what order makes sense.",
  },
];
