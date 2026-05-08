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
    <section id="contacto" className="w-full py-24 px-6 bg-grolow-dark">
      <div className="max-w-[560px] mx-auto">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[.14em] uppercase text-grolow-cyan border border-grolow-cyan/20 bg-grolow-cyan/[.06] px-3 py-1.5 rounded-full mb-5">
            <i className="ti ti-bolt text-[13px]" aria-hidden="true" />
            Diagnóstico gratuito
          </div>
          <h2 className="font-extrabold text-3xl md:text-[38px] leading-[1.1] tracking-tight text-grolow-light mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
            ¿Tu negocio está listo<br />para escalar?
          </h2>
          <p className="text-slate-500 text-[15px] leading-relaxed">
            Cuéntanos qué vendes y te decimos exactamente qué sistema necesitas. Sin rodeos, sin ventas de humo.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#0a0a0a] border border-white/[.07] rounded-2xl p-10 flex flex-col gap-5"
        >
          {[
            { id: "name",  label: "Nombre o empresa",    req: "requerido", type: "text",  placeholder: "Ej. Juan Pérez / Mi Negocio" },
            { id: "phone", label: "WhatsApp",             req: "recomendado", type: "tel", placeholder: "+1 809 000 0000" },
            { id: "email", label: "Correo electrónico",   req: "",          type: "email", placeholder: "correo@empresa.com" },
          ].map((f) => (
            <div key={f.id} className="flex flex-col gap-2">
              <label htmlFor={f.id} className="flex items-center justify-between text-[12px] font-medium text-slate-400 tracking-[.04em] uppercase">
                {f.label}
                {f.req && <span className="text-[10px] font-normal text-grolow-cyan/60 normal-case tracking-normal">{f.req}</span>}
              </label>
              <input
                id={f.id}
                type={f.type}
                required={f.req === "requerido"}
                placeholder={f.placeholder}
                className="w-full px-4 py-3.5 bg-[#111] border border-white/[.07] rounded-lg text-grolow-light placeholder:text-slate-700 text-[15px] focus:outline-none focus:border-grolow-cyan transition-colors"
              />
            </div>
          ))}

          <div className="flex flex-col gap-2">
            <label htmlFor="needs" className="flex items-center justify-between text-[12px] font-medium text-slate-400 tracking-[.04em] uppercase">
              ¿Qué necesitas?
              <span className="text-[10px] font-normal text-grolow-cyan/60 normal-case tracking-normal">requerido</span>
            </label>
            <select
              id="needs"
              required
              className="w-full px-4 py-3.5 bg-[#111] border border-white/[.07] rounded-lg text-grolow-light text-[15px] focus:outline-none focus:border-grolow-cyan transition-colors appearance-none"
            >
              <option value="">Selecciona una opción</option>
              <option value="landing">Landing Page de conversión</option>
              <option value="store">Tienda online → WhatsApp</option>
              <option value="service">Web de servicios / citas</option>
              <option value="other">Otro / Asesoría</option>
            </select>
          </div>

          <hr className="border-white/[.05] my-1" />

          <div className="flex items-center gap-2 text-[12px] text-slate-600">
            <i className="ti ti-shield-check text-grolow-cyan text-sm" aria-hidden="true" />
            Respuesta en menos de 24 horas · Sin compromiso
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-grolow-cyan text-grolow-dark font-extrabold text-[15px] rounded-lg hover:bg-[#00b3b3] transition-colors disabled:opacity-50 tracking-wide"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {isSubmitting ? "Procesando..." : "Solicitar diagnóstico gratis →"}
          </button>
          <p className="text-center text-[12px] text-slate-700 leading-relaxed">
            No spam. Solo te contactamos si podemos ayudarte realmente.
          </p>
        </form>
      </div>
    </section>
  );
}