import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const SERVICE_LABELS: Record<string, string> = {
  landing: 'Landing Page de Conversión',
  'tienda-whatsapp': 'Tienda Online → WhatsApp',
  'servicios-citas': 'Web de Servicios y Citas',
  ecommerce: 'E-commerce Completo',
  rediseno: 'Rediseño de Sitio Existente',
  mantenimiento: 'Mantenimiento Mensual',
  'app-movil': 'App Móvil',
  'sistema-medida': 'Sistema a Medida',
  store: 'Tienda Online → WhatsApp',
  service: 'Web de Servicios / Citas',
  other: 'Asesoría / Otro',
};

function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, phone, email, needs, billing, process: automationProcess, budget } = body;

  if (!name || !phone || !email || !needs || !billing || !automationProcess || !budget) {
    return NextResponse.json({ error: 'Campos incompletos' }, { status: 400 });
  }

  const serviceLabel = SERVICE_LABELS[needs] ?? needs;

  const transporter = createTransporter();

  // Email de notificación al equipo de Grolow
  const notificationHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #F6F1E2; color: #0E1512; padding: 40px; border-radius: 12px;">
      <h2 style="color: #004643; margin-top: 0;">🔔 Nuevo lead en Grolow</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; color: #475569; width: 160px;">Nombre / Empresa</td><td style="padding: 8px 0; font-weight: bold;">${name}</td></tr>
        <tr><td style="padding: 8px 0; color: #475569;">WhatsApp</td><td style="padding: 8px 0; font-weight: bold;">${phone}</td></tr>
        <tr><td style="padding: 8px 0; color: #475569;">Correo</td><td style="padding: 8px 0; font-weight: bold;">${email}</td></tr>
        <tr><td style="padding: 8px 0; color: #475569;">Servicio</td><td style="padding: 8px 0; font-weight: bold; color: #004643;">${serviceLabel}</td></tr>
        <tr><td style="padding: 8px 0; color: #475569;">Facturación</td><td style="padding: 8px 0; font-weight: bold;">${billing}</td></tr>
        <tr><td style="padding: 8px 0; color: #475569; vertical-align: top;">Proceso a automatizar</td><td style="padding: 8px 0; font-weight: bold;">${automationProcess}</td></tr>
        <tr><td style="padding: 8px 0; color: #475569;">Presupuesto</td><td style="padding: 8px 0; font-weight: bold; color: #004643; font-size: 16px;">${budget}</td></tr>
      </table>
      <hr style="border-color: #D8D0BB; margin: 24px 0;" />
      <p style="margin: 0; color: #64748b; font-size: 13px;">Grolow Studio · grolow.agency</p>
    </div>
  `;

  // Email de confirmación al cliente
  const confirmationHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #F6F1E2; color: #0E1512; padding: 40px; border-radius: 12px;">
      <h2 style="color: #004643; margin-top: 0;">Recibimos tu solicitud ✅</h2>
      <p>Hola <strong>${name}</strong>,</p>
      <p>Tu solicitud de propuesta para <strong>${serviceLabel}</strong> llegó correctamente.</p>
      <p style="color: #475569;">Nuestro equipo está evaluando tu proyecto. En menos de 24 horas te contactamos por WhatsApp o correo con una propuesta clara: alcance, inversión y tiempos.</p>
      <div style="margin: 32px 0; padding: 20px; background: #EFE7D0; border-left: 3px solid #004643; border-radius: 4px;">
        <p style="margin: 0; font-size: 14px; color: #475569;">¿Necesitas algo urgente? Escríbenos directo:</p>
        <p style="margin: 8px 0 0; font-weight: bold;">WhatsApp: <a href="https://wa.me/18299946354" style="color: #004643;">+1 829 994 6354</a></p>
        <p style="margin: 4px 0 0; font-weight: bold;">Instagram: <a href="https://instagram.com/grolow.agency" style="color: #004643;">@grolow.agency</a></p>
      </div>
      <hr style="border-color: #D8D0BB; margin: 24px 0;" />
      <p style="margin: 0; color: #64748b; font-size: 13px;">Grolow Studio · grolow.agency</p>
    </div>
  `;

  try {
    await Promise.all([
      transporter.sendMail({
        from: `"Grolow Studio" <${process.env.GMAIL_USER}>`,
        to: process.env.NOTIFICATION_EMAIL,
        subject: `🔔 Nuevo lead: ${name} — ${serviceLabel}`,
        html: notificationHtml,
      }),
      transporter.sendMail({
        from: `"Grolow Studio" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: 'Recibimos tu solicitud — Grolow',
        html: confirmationHtml,
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] Error enviando email:', err);
    return NextResponse.json({ error: 'Error al enviar el mensaje' }, { status: 500 });
  }
}
