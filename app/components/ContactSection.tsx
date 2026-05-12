'use client';
import { useState } from 'react';

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert("Solicitud enviada. Te contactamos en menos de 24 horas.");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contacto" className="w-full py-32 px-6 bg-[#050505] border-t border-white/[.05]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
        
        {/* Lado izquierdo: Copy y contacto directo */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="block text-[11px] font-bold tracking-[.3em] uppercase text-grolow-cyan mb-8">
              Siguiente Paso
            </span>
            <h2 className="font-extrabold text-5xl md:text-7xl leading-[1] tracking-tighter text-white mb-6 uppercase" style={{ fontFamily: "'Syne', sans-serif" }}>
              Escala <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-grolow-cyan to-white/30 italic">Tu Negocio.</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
              Cuéntanos qué vendes y te decimos exactamente qué infraestructura necesitas. Sin rodeos, directo a la conversión.
            </p>
          </div>
          
          <div className="mt-20 space-y-8 border-t border-white/10 pt-10">
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Contacto directo</p>
              <a href="mailto:info@grolow.com" className="text-xl font-medium text-white hover:text-grolow-cyan transition-colors">info@grolow.com</a>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">WhatsApp</p>
              <a href="tel:+18090000000" className="text-xl font-medium text-white hover:text-grolow-cyan transition-colors">+1 809 000 0000</a>
            </div>
          </div>
        </div>

        {/* Lado derecho: Formulario Brutalista */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#080808] border border-white/[.05] p-10 md:p-14 flex flex-col gap-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {[
              { id: "name", label: "Nombre / Empresa", type: "text", placeholder: "Tu nombre o marca" },
              { id: "phone", label: "WhatsApp", type: "tel", placeholder: "+1 (---) --- ----" },
            ].map((f) => (
              <div key={f.id} className="flex flex-col gap-4">
                <label htmlFor={f.id} className="text-[10px] font-bold text-slate-400 tracking-[.2em] uppercase">
                  {f.label}
                </label>
                <input
                  id={f.id}
                  type={f.type}
                  required
                  placeholder={f.placeholder}
                  className="w-full bg-transparent border-b border-white/10 pb-3 text-white placeholder:text-slate-700 text-sm focus:outline-none focus:border-grolow-cyan transition-colors"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <label htmlFor="email" className="text-[10px] font-bold text-slate-400 tracking-[.2em] uppercase">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="correo@empresa.com"
              className="w-full bg-transparent border-b border-white/10 pb-3 text-white placeholder:text-slate-700 text-sm focus:outline-none focus:border-grolow-cyan transition-colors"
            />
          </div>

          <div className="flex flex-col gap-4">
            <label htmlFor="needs" className="text-[10px] font-bold text-slate-400 tracking-[.2em] uppercase">
              ¿Qué necesitas?
            </label>
            <select
              id="needs"
              required
              className="w-full bg-transparent border-b border-white/10 pb-3 text-white text-sm focus:outline-none focus:border-grolow-cyan transition-colors appearance-none cursor-pointer"
            >
              <option value="" className="bg-[#080808]">Selecciona una opción</option>
              <option value="landing" className="bg-[#080808]">Landing Page de conversión</option>
              <option value="store" className="bg-[#080808]">Tienda online → WhatsApp</option>
              <option value="service" className="bg-[#080808]">Web de servicios / citas</option>
              <option value="other" className="bg-[#080808]">Asesoría / Otro</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-6 mt-4 bg-white text-black font-extrabold uppercase tracking-widest text-xs hover:bg-grolow-cyan transition-colors disabled:opacity-50 flex justify-center items-center gap-3"
          >
            {isSubmitting ? "Procesando..." : "Solicitar Diagnóstico"}
            {!isSubmitting && <span>→</span>}
          </button>
          <p className="text-center text-[10px] text-slate-600 uppercase tracking-widest mt-[-10px]">
            Sin rodeos. Respuesta en 24 horas.
          </p>
        </form>
      </div>
    </section>
  );
}