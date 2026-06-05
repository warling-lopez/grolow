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
  client: string;
  description: string;
  tags: string[];
  serviceType: string;
  url: string;
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
      client: "La Perfurm RD",
      description:
        "Tienda online de perfumes nicho y exclusivos para el mercado dominicano. Catálogo visual, pedidos por WhatsApp y diseño de lujo que refleja la exclusividad de la marca.",
      tags: ["Tienda WhatsApp", "Perfumes", "Diseño de lujo", "RD"],
      serviceType: "Tienda Online → WhatsApp",
      url: "https://laperfum1.com/",
      isPersonal: true,
      isFeatured: true,
    },
    {
      id: "hellenscute",
      title: "Hellen's Cute Kids",
      client: "Hellen's Cute Kids",
      description:
        "Landing page para marca de ropa infantil con sistema de distribuidoras autorizadas por zona. Directorio de representantes de ventas y flujo de compra por WhatsApp.",
      tags: ["Landing Page", "Ropa Infantil", "Red de distribución"],
      serviceType: "Landing Page de Conversión",
      url: "https://hellenscute.com/",
    },
    {
      id: "warling",
      title: "Warling Dev.",
      client: "Portfolio Personal",
      description:
        "Portfolio profesional como desarrollador web independiente. Presentación de servicios técnicos, proceso de trabajo y llamada a la acción para agendar consultas.",
      tags: ["Portfolio", "Full Stack", "Next.js"],
      serviceType: "Sitio Personal",
      url: "https://www.warling.top/",
      isPersonal: true,
    },
    {
      id: "aromacaribenio",
      title: "Aroma Caribeño",
      client: "Aroma Caribeño",
      description:
        "Catálogo digital de perfumes originales árabes y de nicho con compra directa. Tienda enfocada en conversión con identidad visual tropical y elegante.",
      tags: ["Tienda WhatsApp", "Perfumes Árabes", "Catálogo digital"],
      serviceType: "Tienda Online → WhatsApp",
      url: "https://aromacaribenio.vercel.app/",
      isCollab: true,
    },
    {
      id: "deliscias-marijo",
      title: "Delicias Marijo",
      client: "Marijo",
      description:
        "Sitio para negocio gastronómico local. Presentación de productos, identidad de marca y canal de contacto directo para pedidos.",
      tags: ["Gastronomía", "Negocio local", "Contacto directo"],
      serviceType: "Landing Page de Conversión",
      url: "https://deliscias-marijo.vercel.app/",
      isCollab: true,
    },
    {
      id: "wai",
      title: "WAI — IA para profesionales",
      client: "WAI",
      description:
        "Landing page de producto SaaS de inteligencia artificial. Secciones de características, casos de uso y precios. Diseño moderno con modo claro/oscuro.",
      tags: ["SaaS", "Inteligencia Artificial", "Landing Page", "Dark mode"],
      serviceType: "Landing Page de Conversión",
      url: "https://w-bice-theta.vercel.app/",
      isCollab: true,
    },
  ];

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".project-card");

      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Fade + slide up en entrada
        cards.forEach((card: any) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        // Efecto parallax sutil en scroll
        cards.forEach((card: any, i) => {
          gsap.to(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 60%",
              end: "top 10%",
              scrub: true,
            },
            y: -40 * (i % 3),
            rotate: i % 2 === 0 ? 1 : -1.5,
          });
        });
      });

      mm.add("(max-width: 767px)", () => {
        cards.forEach((card: any) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            }
          );
        });
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

        {/* Header */}
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

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`project-card group relative overflow-hidden bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl flex flex-col justify-between transition-colors duration-300 hover:border-white/20 hover:bg-white/8 no-underline
                ${project.isFeatured ? "md:col-span-2" : ""}
              `}
            >
              {/* Glow hover */}
              <div className="pointer-events-none absolute -top-20 -left-20 w-[350px] h-[350px] bg-grolow-cyan/10 rounded-full blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className={`p-6 md:p-10 flex flex-col gap-5 ${project.isFeatured ? "md:flex-row md:items-start md:gap-12" : ""}`}>

                {/* Left / main content */}
                <div className={`flex flex-col gap-4 ${project.isFeatured ? "flex-1" : ""}`}>

                  {/* Top row */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
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

                    {/* Arrow icon — animated on hover */}
                    <span className="text-white/30 group-hover:text-grolow-cyan group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 text-lg flex-shrink-0">
                      ↗
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-4xl font-black uppercase text-white leading-tight">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-md">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-1">
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

                {/* Featured extra: URL display */}
                {project.isFeatured && (
                  <div className="flex-shrink-0 flex items-end md:items-center">
                    <span className="text-grolow-cyan font-mono text-xs md:text-sm tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                      {project.url.replace("https://", "")}
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom bar */}
              <div className="border-t border-white/5 px-6 md:px-10 py-3 flex items-center justify-between">
                <span className="text-white/30 font-mono text-xs uppercase tracking-widest">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-white/20 font-mono text-xs group-hover:text-grolow-cyan transition-colors duration-300 tracking-wider">
                  {project.url.replace("https://", "")}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}