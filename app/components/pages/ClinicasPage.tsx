import NicheLanding, {
  type NicheLandingConfig,
} from "@/app/components/landing/NicheLanding";

/**
 * SIN PUBLICAR hasta cerrar la primera clínica. Ver la nota en layout.tsx.
 *
 * Deliberadamente NO lleva bloque `projects`: todavía no hay ningún caso de
 * clínica, y una landing con "casos de éxito" vacíos convierte peor que no
 * tenerla. En su lugar el peso lo carga "Cómo funciona".
 */

/** Mensaje precargado del CTA final. */
const WHATSAPP_HREF =
  "https://wa.me/18299946354?text=" +
  encodeURIComponent(
    "Hola, tengo una clínica y quiero que mis pacientes agenden en línea"
  );

const config: NicheLandingConfig = {
  hero: {
    eyebrow: "RECEPCIÓN LIBRE, AGENDA LLENA",
    title: (
      <>
        Tus pacientes agendan{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-grolow-cream to-grolow-accent italic">
          solos.
        </span>{" "}
        Tu recepción deja de vivir en el teléfono.
      </>
    ),
    subtitle: (
      <>
        Una web donde el paciente ve tus servicios, elige hora y confirma sin
        llamar.{" "}
        <span className="text-grolow-light font-medium">
          Con recordatorios automáticos para que no falten a la cita
        </span>
        . Listo en una semana.
      </>
    ),
    ctas: [
      {
        label: "Quiero automatizar mis citas",
        href: "#contacto",
        variant: "solid",
      },
      { label: "Ver cómo funciona", href: "#como-funciona", variant: "outline" },
    ],
  },

  pains: [
    {
      title: "La recepción vive en el teléfono",
      body: "Cada cita se agenda, se mueve o se cancela por llamada. Mientras tanto hay un paciente esperando en el mostrador y otro que llamó y no le contestaron.",
    },
    {
      title: "Los pacientes no aparecen",
      body: "La cita se agendó hace tres semanas y nadie la recordó. La silla queda vacía una hora y ese hueco ya no se recupera.",
    },
    {
      title: "Fuera de horario no existes",
      body: "Quien quiere agendar a las diez de la noche se encuentra un teléfono apagado. Mañana quizá llame — o quizá llame a otra clínica.",
    },
  ],

  steps: [
    {
      num: "01",
      title: "Hablamos 20 minutos",
      body: "Me cuentas cómo agendas hoy, cuántas citas manejas por semana y qué servicios ofreces. Salgo de ahí con una propuesta clara y un precio cerrado. Gratis.",
    },
    {
      num: "02",
      title: "Monto tu sistema de citas",
      body: "Tus servicios, tus horarios reales y las reglas de tu consulta. El paciente elige hora libre y confirma solo. Tú lo ves todo en un panel.",
    },
    {
      num: "03",
      title: "Publicamos y te enseño a usarlo",
      body: "Lo dejo funcionando y te explico cómo usarlo en una llamada, a ti y a tu recepción. Los primeros 15 días, cualquier ajuste va incluido.",
    },
  ],

  midCta: {
    text: "Tus pacientes agendan solos, a cualquier hora, sin ocupar a tu recepcionista. Listo en una semana.",
    label: "Pedir mi propuesta gratis",
    href: "#contacto",
  },

  pricing: {
    headline: "Cuánto cuesta",
    setup: "Setup US$290 + US$50 al mes",
    note: "Un sistema de reservas tiene más piezas que un catálogo: horarios, disponibilidad y recordatorios. Por eso va aparte del plan de catálogos.",
    bullets: [
      "Tu web completa con servicios, horarios y equipo",
      "Sistema de reservas conectado a tu calendario",
      "Recordatorios automáticos por WhatsApp antes de la cita",
      "Dominio y hosting incluidos, no pagas nada aparte",
      "Cambios ilimitados: me escribes por WhatsApp y yo lo hago",
      "Respaldos y monitoreo",
      "Permanencia mínima de 12 meses",
    ],
  },

  faqs: [
    {
      q: "¿Se conecta con mi calendario actual?",
      a: "Sí. El sistema puede sincronizarse con Google Calendar para que veas las citas donde ya miras tu agenda, sin abrir otra herramienta.",
    },
    {
      q: "¿Qué pasa si un paciente quiere cambiar la cita?",
      a: "La reprograma él mismo desde el enlace de su confirmación, dentro de las reglas que definas. Tu recepción se entera sola, sin una llamada de por medio.",
    },
    {
      q: "¿Y si prefiero aprobar cada cita a mano?",
      a: "Se puede. Configuramos el sistema para que las solicitudes te lleguen y tú confirmes, en vez de que la hora se bloquee automáticamente.",
    },
    {
      q: "¿Mi recepcionista va a tener que aprender algo complicado?",
      a: "No. El panel muestra la agenda del día y poco más. Le explico cómo usarlo en la misma llamada de entrega.",
    },
    {
      q: "¿Cuánto tarda?",
      a: "Una semana desde que tengo tus servicios, horarios y reglas de agenda. Si tu consulta tiene casos especiales te lo digo en la primera llamada, antes de que pagues nada.",
    },
    {
      q: "¿La web es mía?",
      a: "El dominio se registra a tu nombre, y el contenido y tu marca son tuyos siempre. Al entregar te paso los accesos completos; si algún día quieres llevártelo a otro equipo, se coordina el traspaso sin condiciones.",
    },
  ],

  finalCta: {
    text: "Cuéntame cómo agendas hoy y cuántas citas manejas por semana. Te respondo con una propuesta clara en menos de 24 horas.",
    label: "Escribirme por WhatsApp",
    href: WHATSAPP_HREF,
  },
};

export default function WebsParaClinicasPage() {
  return <NicheLanding config={config} />;
}
