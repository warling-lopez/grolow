"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type ProjectId =
  | "laperfum"
  | "hellenscute"
  | "warling"
  | "aromacaribenio"
  | "deliscias-marijo"
  | "wai";

interface Project {
  id: ProjectId;
  title: string;
  description: string;
  tags: string[];
  serviceType: string;
  url: string;
  /**
   * Ruta relativa al screenshot del proyecto.
   * Coloca los archivos en /public/projects/
   * Ejemplo: "/projects/laperfum.webp"
   *
   * Herramientas para capturar screenshots:
   * - screely.com  → screenshot con marco de browser
   * - shots.so     → screenshot con mockup de dispositivo
   * - Cmd+Shift+5 / Snipping Tool → captura directa
   */
  image: string;
  imageAlt: string;
  /** Grados de rotación decorativa de la imagen flotante */
  imageRotation: number;
  isPersonal?: boolean;
  isCollab?: boolean;
  isFeatured?: boolean;
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      id: "laperfum",
      title: "La Perfurm RD",
      description:
        "Tienda online de perfumes nicho y exclusivos para el mercado dominicano. Catálogo visual, pedidos por WhatsApp y diseño de lujo que refleja la exclusividad de la marca.",
      tags: ["Tienda WhatsApp", "Perfumes", "Lujo", "RD"],
      serviceType: "Tienda Online → WhatsApp",
      url: "https://laperfum1.com/",
      image: "/projects/laperfum.webp",
      imageAlt: "Vista previa de La Perfurm RD",
      imageRotation: 4,
      isPersonal: true,
      isFeatured: true,
    },
    {
      id: "hellenscute",
      title: "Hellen's Cute Kids",
      description:
        "Landing page para marca de ropa infantil con sistema de distribuidoras autorizadas por zona y flujo de compra directo por WhatsApp.",
      tags: ["Landing Page", "Ropa Infantil", "Red de ventas"],
      serviceType: "Landing Page de Conversión",
      url: "https://hellenscute.com/",
      image: "/projects/hellenscute.webp",
      imageAlt: "Vista previa de Hellen's Cute Kids",
      imageRotation: -3,
    },
    {
      id: "warling",
      title: "Warling Dev.",
      description:
        "Portfolio profesional como desarrollador web independiente. Servicios técnicos, proceso de trabajo y CTA para agendar consultas gratis.",
      tags: ["Portfolio", "Full Stack", "Next.js"],
      serviceType: "Sitio Personal",
      url: "https://www.warling.top/",
      image: "/projects/warling.webp",
      imageAlt: "Vista previa de Warling Dev portfolio",
      imageRotation: 3,
      isPersonal: true,
    },
    {
      id: "aromacaribenio",
      title: "Aroma Caribeño",
      description:
        "Catálogo digital de perfumes originales árabes y de nicho con compra directa. Identidad visual tropical y experiencia enfocada en conversión.",
      tags: ["Tienda WhatsApp", "Perfumes Árabes", "Catálogo"],
      serviceType: "Tienda Online → WhatsApp",
      url: "https://aromacaribenio.vercel.app/",
      image: "/projects/aromacaribenio.webp",
      imageAlt: "Vista previa de Aroma Caribeño",
      imageRotation: -4,
      isCollab: true,
    },
    {
      id: "deliscias-marijo",
      title: "Delicias Marijo",
      description:
        "Sitio para negocio gastronómico local. Presentación de productos, identidad de marca y canal de contacto directo para pedidos.",
      tags: ["Gastronomía", "Negocio local", "WhatsApp"],
      serviceType: "Landing Page de Conversión",
      url: "https://deliscias-marijo.vercel.app/",
      image: "/projects/deliscias-marijo.webp",
      imageAlt: "Vista previa de Delicias Marijo",
      imageRotation: 3,
      isCollab: true,
    },
    {
      id: "wai",
      title: "WAI — IA para profesionales",
      description:
        "Landing page de producto SaaS de inteligencia artificial. Características, casos de uso, precios y modo claro/oscuro incluido.",
      tags: ["SaaS", "Inteligencia Artificial", "Dark mode"],
      serviceType: "Landing Page de Conversión",
      url: "https://w-bice-theta.vercel.app/",
      image: "/projects/wai.webp",
      imageAlt: "Vista previa de WAI",
      imageRotation: -3,
      isCollab: true,
    },
  ];

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");
      const floatImgs = gsap.utils.toArray<HTMLElement>(".project-float-img");

      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Entrada escalonada de todas las cards
        gsap.fromTo(
          cards,
          { opacity: 0, y: 56 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 78%",
              toggleActions: "play none none none",
            },
          }
        );

        // Parallax independiente en cada imagen flotante
        floatImgs.forEach((img) => {
          gsap.to(img, {
            y: -28,
            rotate: "+=2",
            ease: "none",
            scrollTrigger: {
              trigger: img.closest(".project-card"),
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        });

        // Inclinación suave en scroll (coherente con ServicesSection)
        cards.forEach((card, i) => {
          gsap.to(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 55%",
              end: "top 15%",
              scrub: true,
            },
            y: -28 * (i % 3),
            rotate: i % 2 === 0 ? 0.8 : -1.2,
          });
        });
      });

      mm.add("(max-width: 767px)", () => {
        // Móvil: sólo fade-in, sin rotación
        gsap.fromTo(
          cards,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="w-full bg-transparent my-20 py-10 md:py-20 px-4 md:px-8"
    >
      <div className="max-w-5xl mx-auto w-full">

        {/* ── Header ── */}
        <div className="mb-12 md:mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-white/40 mb-3">
            03. Proyectos
          </p>
          <h2 className="text-4xl md:text-7xl font-black uppercase text-white leading-none">
            Trabajo Real.
            <br />
            <span className="text-white/30">Resultados Reales.</span>
          </h2>
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "project-card",
                "group relative overflow-hidden",
                "bg-white/5 border border-white/10",
                "backdrop-blur-xl rounded-2xl",
                "p-6 md:p-10",
                "flex flex-col gap-4",
                "hover:border-white/20 hover:bg-white/[0.07]",
                "transition-colors duration-300 no-underline",
                "min-h-[220px] md:min-h-[260px]",
                project.isFeatured ? "md:col-span-2" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {/* ── Imagen flotante decorativa ──────────────────────────
                  - position: absolute, esquina superior derecha
                  - rotate variable por proyecto para dar variedad
                  - opacity baja (decorativa), sube al hacer hover
                  - parallax independiente vía GSAP (.project-float-img)
                  - onError oculta la img si no existe el archivo todavía
              ──────────────────────────────────────────────────────── */}
              <div
                className="project-float-img pointer-events-none absolute right-0 top-0"
                style={{
                  width: "clamp(140px, 28%, 220px)",
                  height: "clamp(100px, 22%, 165px)",
                  transform: `rotate(${project.imageRotation}deg) translate(10px, -10px)`,
                  transformOrigin: "top right",
                }}
                aria-hidden="true"
              >
                {/* Marco / borde sutil */}
                <div className="absolute inset-0 rounded-xl border border-white/10 z-10" />

                <img
                  src={project.image}
                  alt=""
                  className="w-full h-full object-cover object-top rounded-xl opacity-20 group-hover:opacity-35 transition-opacity duration-500"
                  loading="lazy"
                  onError={(e) => {
                    // Oculta la img rota; el fallback de abajo queda visible
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />

                {/* Fallback mientras no tienes screenshots */}
                <div className="absolute inset-0 rounded-xl bg-white/[0.03] flex items-end justify-start p-2">
                  <span className="text-white/10 font-mono text-[9px] uppercase tracking-widest leading-tight">
                    {project.url.replace("https://", "").replace(/\/$/, "")}
                  </span>
                </div>
              </div>

              {/* Glow en hover */}
              <div className="pointer-events-none absolute -bottom-24 -left-24 w-[320px] h-[320px] bg-grolow-cyan/10 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* ── Contenido (z-10 para estar sobre la imagen) ── */}
              <div className="relative z-10 flex flex-col gap-4 h-full">

                {/* Badges + flecha */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {project.isPersonal && (
                      <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-md border border-grolow-cyan/40 text-grolow-cyan bg-grolow-cyan/10">
                        ★ Personal
                      </span>
                    )}
                    {project.isCollab && (
                      <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-md border border-purple-400/40 text-purple-400 bg-purple-400/10">
                        Colaboración
                      </span>
                    )}
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-md border border-white/15 text-white/40">
                      {project.serviceType}
                    </span>
                  </div>

                  <span className="text-white/30 group-hover:text-grolow-cyan group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 text-base flex-shrink-0">
                    ↗
                  </span>
                </div>

                {/* Título — max-width para no chocar con la imagen */}
                <h3 className="text-2xl md:text-4xl font-black uppercase text-white leading-tight max-w-[62%]">
                  {project.title}
                </h3>

                {/* Descripción */}
                <p className="text-slate-400 text-sm leading-relaxed max-w-[58%] md:max-w-[52%]">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] md:text-xs border border-white/15 text-white/50 px-2 py-1 md:px-3 uppercase tracking-wider rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* ── Barra inferior ── */}
              <div className="relative z-10 border-t border-white/5 pt-4 flex items-center justify-between">
                <span className="text-white/25 font-mono text-xs uppercase tracking-widest">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-white/20 group-hover:text-grolow-cyan font-mono text-xs tracking-wider transition-colors duration-300">
                  {project.url.replace("https://", "").replace(/\/$/, "")}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}