'use client';

import { useState } from 'react';

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Aquí conectas tu lógica, ej. fetch a tu API de envío de correos o webhook a WhatsApp
    setTimeout(() => {
      alert("Solicitud enviada. Nos pondremos en contacto pronto.");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contacto" className="w-full py-24 px-6 bg-slate-100 dark:bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para escalar?</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Déjanos tus datos y evaluaremos la infraestructura que tu negocio necesita.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-white dark:bg-grolow-dark p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold text-sm">Nombre o Empresa</label>
            <input 
              type="text" 
              id="name" 
              required
              className="w-full p-4 rounded-lg bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-grolow-teal dark:focus:border-grolow-cyan transition-colors text-base"
              placeholder="Ej. Juan Pérez / Mi Negocio"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold text-sm">Correo Electrónico</label>
            <input 
              type="email" 
              id="email" 
              required
              className="w-full p-4 rounded-lg bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-grolow-teal dark:focus:border-grolow-cyan transition-colors text-base"
              placeholder="correo@empresa.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="needs" className="font-semibold text-sm">¿Qué infraestructura necesitas?</label>
            <select 
              id="needs" 
              required
              className="w-full p-4 rounded-lg bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-grolow-teal dark:focus:border-grolow-cyan transition-colors text-base appearance-none"
            >
              <option value="">Selecciona una opción</option>
              <option value="landing">Landing Page de Conversión</option>
              <option value="store">Tienda Online (Pedidos a WhatsApp)</option>
              <option value="service">Web de Servicios / Citas</option>
              <option value="other">Otro / Asesoría</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="mt-4 w-full p-4 bg-grolow-teal text-white dark:bg-grolow-cyan dark:text-black font-bold rounded-lg text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isSubmitting ? 'Procesando...' : 'Solicitar Análisis'}
          </button>
        </form>
      </div>
    </section>
  )
}