import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * Leads de la landing de anuncios (/es/black-friday).
 *
 * Cada lead se guarda de dos formas, para que no se pierda ninguno:
 *  1. Una línea `[lead]` en los logs de Vercel (Logs → buscar "[lead]").
 *  2. Un correo a NOTIFICATION_EMAIL con los mismos datos.
 *
 * Si el correo falla, el lead ya quedó en el log y la página sigue y abre
 * WhatsApp igual: el prospecto nunca se queda colgado por un error nuestro.
 */

const INTERESTS: Record<string, string> = {
  catalogo: "Catálogo Digital (US$450 → US$382.50)",
  tienda: "Tienda online con pago (US$850 → US$722.50)",
  web: "Página web empresarial",
  sistema: "Sistema a medida",
  nose: "No sabe todavía",
};

const clean = (v: unknown, max = 200) =>
  typeof v === "string" ? v.replace(/[<>]/g, "").trim().slice(0, max) : "";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  // Campo trampa: los bots lo rellenan, las personas no lo ven.
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const lead = {
    name: clean(body.name, 80),
    business: clean(body.business, 120),
    phone: clean(body.phone, 30),
    interest: clean(body.interest, 20),
    sells: clean(body.sells, 200),
    source: clean(body.source, 40),
    utm: clean(body.utm, 300),
    at: new Date().toISOString(),
  };

  if (!lead.name || !lead.phone || lead.phone.replace(/\D/g, "").length < 7) {
    return NextResponse.json({ error: "Faltan nombre o WhatsApp" }, { status: 400 });
  }

  console.log("[lead]", JSON.stringify(lead));

  const interestLabel = INTERESTS[lead.interest] ?? (lead.interest || "—");
  const waDigits = lead.phone.replace(/\D/g, "");

  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD && process.env.NOTIFICATION_EMAIL) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
      });
      const row = (k: string, v: string) =>
        `<tr><td style="padding:6px 0;color:#475569;width:150px">${k}</td><td style="padding:6px 0;font-weight:bold">${v || "—"}</td></tr>`;
      await transporter.sendMail({
        from: `"Grolow Leads" <${process.env.GMAIL_USER}>`,
        to: process.env.NOTIFICATION_EMAIL,
        subject: `🔥 Lead Black Friday: ${lead.name}${lead.business ? ` — ${lead.business}` : ""}`,
        html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#F6F1E2;color:#0E1512;padding:32px;border-radius:12px">
          <h2 style="color:#004643;margin-top:0">Nuevo lead de la landing Black Friday</h2>
          <table style="width:100%;border-collapse:collapse">
            ${row("Nombre", lead.name)}
            ${row("Negocio", lead.business)}
            ${row("WhatsApp", `<a href="https://wa.me/${waDigits}" style="color:#004643">${lead.phone}</a>`)}
            ${row("Le interesa", interestLabel)}
            ${row("Qué vende", lead.sells)}
            ${row("Anuncio", lead.source)}
            ${row("UTM", lead.utm)}
            ${row("Fecha", lead.at)}
          </table>
          <p style="margin-top:20px"><a href="https://wa.me/${waDigits}" style="background:#25D366;color:#000;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold">Escribirle por WhatsApp</a></p>
        </div>`,
      });
    } catch (err) {
      console.error("[lead] correo falló (el lead quedó en el log):", err);
    }
  }

  return NextResponse.json({ ok: true });
}
