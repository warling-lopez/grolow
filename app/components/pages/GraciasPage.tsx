'use client';
import Link from 'next/link';
import { useLang } from '@/app/components/hooks/useLang';
import { pathFor } from '@/app/lib/i18n';

const COPY = {
  en: {
    headingLine1: 'Your request',
    headingLine2: 'was received.',
    body1a: "Our team is evaluating your project. In under ",
    body1strong: '24 hours',
    body1b:
      ' we’ll reach out on WhatsApp or email with a clear proposal: scope, investment and timeline.',
    body2: "Check your email — we've sent a confirmation there too.",
    whatsappCta: 'Message us on WhatsApp',
    home: 'Back to home',
    whatsappHref:
      'https://wa.me/18299946354?text=Hi%2C+I+just+filled+out+the+form+at+grolow.com',
  },
  es: {
    headingLine1: 'Tu solicitud',
    headingLine2: 'llegó correctamente.',
    body1a: 'Nuestro equipo está evaluando tu proyecto. En menos de ',
    body1strong: '24 horas',
    body1b:
      ' te contactamos por WhatsApp o correo con una propuesta clara: alcance, inversión y tiempos.',
    body2: 'Revisa tu correo — te enviamos una confirmación ahí mismo.',
    whatsappCta: 'Escribir por WhatsApp',
    home: 'Volver al inicio',
    whatsappHref:
      'https://wa.me/18299946354?text=Hola%2C+acabo+de+llenar+el+formulario+en+grolow.com',
  },
} as const;

export default function GraciasPage() {
  const lang = useLang();
  const c = COPY[lang];
  return (
    <main className="min-h-screen bg-grolow-dark flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center">
        <span className="inline-block text-5xl mb-8">✅</span>

        <h1
          className="font-extrabold text-4xl md:text-5xl uppercase leading-none tracking-tighter text-grolow-light mb-6"
          style={{ fontFamily: "'Syne', sans-serif" }}>
          {c.headingLine1} <br />
          <span className="text-grolow-cyan italic">{c.headingLine2}</span>
        </h1>

        <p className="text-grolow-light/75 text-lg leading-relaxed mb-4">
          {c.body1a}
          <strong className="text-grolow-light">{c.body1strong}</strong>
          {c.body1b}
        </p>

        <p className="text-grolow-light/75 text-sm mb-12">
          {c.body2}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={c.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#25D366] text-black font-extrabold uppercase tracking-widest text-xs hover:opacity-90 transition-opacity">
            {c.whatsappCta}
          </a>
          <Link
            href={pathFor("home", lang)!}
            className="px-8 py-4 border border-grolow-light/20 text-grolow-light font-bold uppercase tracking-widest text-xs hover:border-grolow-cyan hover:text-grolow-cyan transition-colors">
            {c.home}
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-grolow-light/10 text-[11px] text-grolow-light/80 uppercase tracking-widest">
          Grolow Studio · grolow.com ·{' '}
          <a
            href="https://instagram.com/grolow.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-grolow-cyan transition-colors">
            @grolow.studio
          </a>
        </div>
      </div>
    </main>
  );
}
