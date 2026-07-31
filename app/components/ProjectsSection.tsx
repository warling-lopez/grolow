"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export type ProjectId =
  | "laperfum"
  | "hellenscute"
  | "warling"
  | "aromacaribenio"
  | "deliscias-marijo"
  | "wai";

interface Project {
  id: ProjectId;
  title: string;
  /** Situación previa del cliente: el problema de negocio que enfrentaba. */
  problem: string;
  /** Infraestructura/sistema que construimos para resolverlo. */
  solution: string;
  /**
   * Resultado: el cambio operativo real y verificable de ESTE proyecto.
   * Prohibido usar porcentajes o cifras que no se hayan medido en este cliente
   * concreto — una cifra inventada obliga a un descargo, y el descargo destruye
   * la credibilidad del resto de la página.
   */
  result: string;
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
  isFeatured?: boolean;
}

/**
 * URL visible de una tarjeta. Los proyectos alojados en un subdominio de
 * `.vercel.app` se leen como prácticas y no como clientes, así que en esos
 * casos no se muestra dominio alguno — la tarjeta sigue enlazando igual.
 */
function displayUrl(url: string): string | null {
  if (url.includes(".vercel.app")) return null;
  return url.replace("https://", "").replace(/\/$/, "");
}

export type ProjectsSectionProps = {
  /** Si se pasa, sólo se muestran estos proyectos y en este orden. */
  only?: ProjectId[];
  eyebrow?: string;
  heading?: React.ReactNode;
};

export default function ProjectsSection({
  only,
  eyebrow = "Casos de Éxito",
  heading,
}: ProjectsSectionProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      id: "laperfum",
      title: "La Perfurm RD",
      problem:
        "Gestionaba un catálogo de perfumes nicho de forma manual y dispersa, sin una vitrina centralizada que reflejara la exclusividad de la marca ni canalizara los pedidos.",
      solution:
        "Construimos una tienda digital centralizada con catálogo visual de lujo y pedidos canalizados directo a WhatsApp, sin comisiones de terceros.",
      result:
        "Todo el catálogo quedó en un solo enlace. Los pedidos entran por WhatsApp ya armados, con el producto y la cantidad, en vez de reconstruirse a lo largo de una conversación.",
      tags: ["Tienda WhatsApp", "Perfumes", "Lujo", "RD"],
      serviceType: "Tienda Online → WhatsApp",
      url: "https://laperfum1.com/",
      image: "/projects/laperfum.webp",
      imageAlt: "Vista previa de La Perfurm RD",
      imageRotation: 4,
      isFeatured: true,
    },
    {
      id: "hellenscute",
      title: "Hellen's Cute Kids",
      problem:
        "Una red de distribuidoras de ropa infantil sin un sistema que organizara las ventas por zona ni encaminara la compra de forma ordenada.",
      solution:
        "Implementamos una landing de conversión con asignación de distribuidoras autorizadas por zona y flujo de compra directo por WhatsApp.",
      result:
        "Cada visitante se dirige automáticamente a la distribuidora de su zona. Se acabó el reenvío manual de clientes entre vendedoras.",
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
      problem:
        "Sin una presencia profesional que comunicara servicios técnicos y proceso de trabajo a clientes potenciales.",
      solution:
        "Desarrollamos un sitio profesional con servicios, proceso de trabajo y un CTA claro para agendar consultas.",
      result:
        "Un sitio que carga en menos de 2 segundos y explica servicios y proceso sin que él tenga que repetirlo en cada conversación.",
      tags: ["Sitio Profesional", "Servicios"],
      serviceType: "Sitio Profesional",
      url: "https://www.warling.top/",
      image: "/projects/warling.webp",
      imageAlt: "Vista previa de Warling Dev",
      imageRotation: 3,
    },
    {
      id: "aromacaribenio",
      title: "Aroma Caribeño",
      problem:
        "Un catálogo de perfumes árabes y de nicho sin una vitrina digital que permitiera la compra directa ni reflejara la identidad de marca.",
      solution:
        "Construimos un catálogo digital con compra directa, identidad visual tropical y una experiencia enfocada en conversión.",
      result:
        "Catálogo con compra directa e identidad visual propia, en lugar de un feed de Instagram donde los productos se pierden hacia abajo.",
      tags: ["Tienda WhatsApp", "Perfumes Árabes", "Catálogo"],
      serviceType: "Tienda Online → WhatsApp",
      url: "https://aromacaribenio.vercel.app/",
      image: "/projects/aromacaribenio.webp",
      imageAlt: "Vista previa de Aroma Caribeño",
      imageRotation: -4,
    },
    {
      id: "deliscias-marijo",
      title: "Delicias Marijo",
      problem:
        "Un negocio gastronómico local sin canal digital para presentar productos ni recibir pedidos de forma directa y ordenada.",
      solution:
        "Diseñamos un sitio con presentación de productos, identidad de marca y un canal de contacto directo para pedidos.",
      result:
        "Los pedidos dejaron de tomarse por mensajes sueltos y pasaron a un canal ordenado, con los productos presentados y con precios visibles.",
      tags: ["Gastronomía", "Negocio local", "WhatsApp"],
      serviceType: "Landing Page de Conversión",
      url: "https://deliscias-marijo.vercel.app/",
      image: "/projects/deliscias-marijo.webp",
      imageAlt: "Vista previa de Delicias Marijo",
      imageRotation: 3,
    },
    {
      id: "wai",
      title: "WAI — IA para profesionales",
      problem:
        "Un producto SaaS de inteligencia artificial sin una página que comunicara su propuesta de valor, casos de uso y precios.",
      solution:
        "Construimos una landing de producto con características, casos de uso, precios y modo claro/oscuro para presentar el SaaS con claridad.",
      result:
        "Una página que explica el producto, sus casos de uso y sus precios sin necesidad de una demo en vivo.",
      tags: ["SaaS", "Inteligencia Artificial", "Producto"],
      serviceType: "Landing Page de Conversión",
      url: "https://w-bice-theta.vercel.app/",
      image: "/projects/wai.webp",
      imageAlt: "Vista previa de WAI",
      imageRotation: -3,
    },
  ];

  // `only` filtra y además fija el orden de aparición.
  const visibleProjects = only
    ? only
        .map((id) => projects.find((p) => p.id === id))
        .filter((p): p is Project => Boolean(p))
    : projects;

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");
      const floatImgs = gsap.utils.toArray<HTMLElement>(".project-float-img");

      const mm = gsap.matchMedia();

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
      id="casos"
      ref={containerRef}
      className="w-full backdrop-blur-xs my-20 py-10 md:py-20 px-4 md:px-8"
    >
      <div className="max-w-5xl mx-auto w-full">

        {/* ── Header ── */}
        <div className="mb-12 md:mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-grolow-light/40 mb-3">
            {eyebrow}
          </p>
          <h2 className="text-[clamp(2rem,5.5vw,4.5rem)] font-black uppercase text-grolow-light leading-none">
            {heading ?? (
              <>
                Problemas de negocio.
                <br />
                <span className="text-grolow-light/30">
                  Soluciones que escalan.
                </span>
              </>
            )}
          </h2>
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {visibleProjects.map((project, index) => (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "project-card",
                "group relative overflow-hidden",
                "bg-white/60 border border-grolow-light/10",
                "backdrop-blur-xl rounded-2xl",
                "p-6 md:p-10",
                "flex flex-col gap-4",
                "hover:border-grolow-light/20 hover:bg-white/70",
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
                <div className="absolute inset-0 rounded-xl border border-grolow-light/10 z-10" />

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
                <div className="absolute inset-0 rounded-xl bg-white/40 flex items-end justify-start p-2">
                  <span className="text-grolow-light/10 font-mono text-[9px] uppercase tracking-widest leading-tight">
                    {displayUrl(project.url) ?? project.title}
                  </span>
                </div>
              </div>

              {/* Glow en hover */}
              <div className="pointer-events-none absolute -bottom-24 -left-24 w-[320px] h-[320px] bg-grolow-cyan/10 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* ── Contenido (z-10 para estar sobre la imagen) ── */}
              <div className="relative z-10 flex flex-col gap-4 h-full">

                {/* Tipo de servicio + flecha */}
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-md border border-grolow-light/15 text-grolow-light/40">
                    {project.serviceType}
                  </span>

                  <span className="text-grolow-light/30 group-hover:text-grolow-cyan group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 text-base shrink-0">
                    ↗
                  </span>
                </div>

                {/* Título — max-width para no chocar con la imagen */}
                <h3 className="text-2xl md:text-4xl font-black uppercase text-grolow-light leading-tight max-w-[62%]">
                  {project.title}
                </h3>

                {/* Problema → Solución → Resultado */}
                <div className="flex flex-col gap-3 mt-1 max-w-[88%] md:max-w-[80%]">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-grolow-light/30 mb-1">
                      Problema
                    </p>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {project.problem}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-grolow-light/30 mb-1">
                      Solución
                    </p>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-grolow-cyan/70 mb-1">
                      Resultado
                    </p>
                    <p className="text-grolow-cyan text-sm font-medium leading-relaxed">
                      {project.result}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] md:text-xs border border-grolow-light/15 text-grolow-light/50 px-2 py-1 md:px-3 uppercase tracking-wider rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* ── Barra inferior ── */}
              <div className="relative z-10 border-t border-grolow-light/5 pt-4 flex items-center justify-between">
                <span className="text-grolow-light/25 font-mono text-xs uppercase tracking-widest">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-grolow-light/20 group-hover:text-grolow-cyan font-mono text-xs tracking-wider transition-colors duration-300">
                  {displayUrl(project.url) ?? project.title}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}