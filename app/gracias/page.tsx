import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solicitud recibida — Grolow Studio',
  robots: { index: false, follow: false },
};

export default function GraciasPage() {
  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center">
        <span className="inline-block text-5xl mb-8">✅</span>

        <h1
          className="font-extrabold text-4xl md:text-5xl uppercase leading-none tracking-tighter text-white mb-6"
          style={{ fontFamily: "'Syne', sans-serif" }}>
          Tu solicitud <br />
          <span className="text-grolow-cyan italic">llegó correctamente.</span>
        </h1>

        <p className="text-slate-400 text-lg leading-relaxed mb-4">
          Nuestro equipo está evaluando tu proyecto. En menos de{' '}
          <strong className="text-white">24 horas</strong> te contactamos por WhatsApp o
          correo con una propuesta clara: alcance, inversión y tiempos.
        </p>

        <p className="text-slate-500 text-sm mb-12">
          Revisa tu correo — te enviamos una confirmación ahí mismo.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/18299926354?text=Hola%2C+acabo+de+llenar+el+formulario+en+grolow.agency"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#25D366] text-black font-extrabold uppercase tracking-widest text-xs hover:opacity-90 transition-opacity">
            Escribir por WhatsApp
          </a>
          <Link
            href="/"
            className="px-8 py-4 border border-white/10 text-white font-bold uppercase tracking-widest text-xs hover:border-grolow-cyan hover:text-grolow-cyan transition-colors">
            Volver al inicio
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 text-[11px] text-slate-600 uppercase tracking-widest">
          Grolow Studio · grolow.agency ·{' '}
          <a
            href="https://instagram.com/grolow.agency"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-grolow-cyan transition-colors">
            @grolow.agency
          </a>
        </div>
      </div>
    </main>
  );
}
