"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const SERVICE_OPTIONS = [
  { value: "landing", label: "Landing Page de Conversión" },
  { value: "tienda-whatsapp", label: "Tienda Online → WhatsApp" },
  { value: "servicios-citas", label: "Web de Servicios y Citas" },
  { value: "ecommerce", label: "E-commerce Completo" },
  { value: "rediseno", label: "Rediseño de Sitio Existente" },
  { value: "mantenimiento", label: "Mantenimiento Mensual" },
  { value: "app-movil", label: "App Móvil" },
  { value: "sistema-medida", label: "Sistema a Medida" },
  { value: "other", label: "Asesoría / Otro" },
];

function ContactForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const needsRef = useRef<HTMLSelectElement>(null);

  const preselectedService = searchParams.get("servicio") ?? "";

  useEffect(() => {
    if (preselectedService && needsRef.current) {
      needsRef.current.value = preselectedService;
    }
  }, [preselectedService]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const payload = {
      name: nameRef.current?.value ?? "",
      phone: phoneRef.current?.value ?? "",
      email: emailRef.current?.value ?? "",
      needs: needsRef.current?.value ?? "",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al enviar");

      router.push("/gracias");
    } catch {
      setError("Hubo un problema al enviar tu solicitud. Intenta por WhatsApp.");
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contacto"
      className="w-full py-32 px-6 bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* Lado izquierdo */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="block text-[11px] font-bold tracking-[.3em] uppercase text-grolow-cyan mb-8">
              ¿Listo para
            </span>
            <h2
              className="font-extrabold text-5xl md:text-6xl leading-none tracking-tighter text-white mb-6 uppercase"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              tener <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-grolow-cyan to-white/80 italic">
                un sistema que trabaje por ti?.
              </span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
              Cuéntanos qué vendes o qué quieres lograr. En 24 horas te decimos
              exactamente qué necesitas, cuánto cuesta y cuándo lo tienes listo.
              Sin rodeos.
            </p>
          </div>

          <div className="mt-20 space-y-8 border-t border-white/10 pt-10">
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">
                Correo directo
              </p>
              <a
                href="mailto:grolow.web@gmail.com"
                className="text-xl font-medium text-white hover:text-grolow-cyan transition-colors">
                grolow.web@gmail.com
              </a>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">
                WhatsApp
              </p>
              <a
                href="https://wa.me/18299926354?text=Hola%2C+vi+tu+web+y+quiero+un+diagn%C3%B3stico+gratis"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-medium text-white hover:text-grolow-cyan transition-colors">
                +1 829 992 6354
              </a>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">
                Instagram
              </p>
              <a
                href="https://instagram.com/grolow.agency"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-medium text-white hover:text-grolow-cyan transition-colors">
                @grolow.agency
              </a>
            </div>
          </div>
        </div>

        {/* Lado derecho: Formulario */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#080808] border border-white/5 p-10 md:p-14 flex flex-col gap-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {[
              {
                ref: nameRef,
                id: "name",
                label: "Nombre / Empresa",
                type: "text",
                placeholder: "Tu nombre o marca",
              },
              {
                ref: phoneRef,
                id: "phone",
                label: "WhatsApp",
                type: "tel",
                placeholder: "+1 829 123 4567",
              },
            ].map((f) => (
              <div key={f.id} className="flex flex-col gap-4">
                <label
                  htmlFor={f.id}
                  className="text-[10px] font-bold text-slate-400 tracking-[.2em] uppercase">
                  {f.label}
                </label>
                <input
                  ref={f.ref as React.RefObject<HTMLInputElement>}
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
            <label
              htmlFor="email"
              className="text-[10px] font-bold text-slate-400 tracking-[.2em] uppercase">
              Correo Electrónico
            </label>
            <input
              ref={emailRef}
              id="email"
              type="email"
              required
              placeholder="correo@empresa.com"
              className="w-full bg-transparent border-b border-white/10 pb-3 text-white placeholder:text-slate-700 text-sm focus:outline-none focus:border-grolow-cyan transition-colors"
            />
          </div>

          <div className="flex flex-col gap-4">
            <label
              htmlFor="needs"
              className="text-[10px] font-bold text-slate-400 tracking-[.2em] uppercase">
              ¿Qué necesitas?
            </label>
            <select
              ref={needsRef}
              id="needs"
              required
              defaultValue={preselectedService}
              className="w-full bg-transparent border-b border-white/10 pb-3 text-white text-sm focus:outline-none focus:border-grolow-cyan transition-colors appearance-none cursor-pointer">
              <option value="" className="bg-[#080808]">
                Selecciona una opción
              </option>
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-[#080808]">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <p className="text-red-400 text-xs text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-6 mt-4 bg-white text-black font-extrabold uppercase tracking-widest text-xs hover:bg-grolow-cyan transition-colors disabled:opacity-50 flex justify-center items-center gap-3">
            {isSubmitting ? "Enviando..." : "Solicitar Diagnóstico"}
            {!isSubmitting && <span>→</span>}
          </button>
          <p className="text-center text-[10px] text-slate-600 uppercase tracking-widest -mt-2.5">
            Sin compromisos. Diagnóstico gratis. Respuesta en menos de 24 horas.
          </p>
        </form>
      </div>
    </section>
  );
}

export default function ContactSection() {
  return (
    <Suspense fallback={null}>
      <ContactForm />
    </Suspense>
  );
}
