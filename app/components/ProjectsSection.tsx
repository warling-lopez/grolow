"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLang, type Lang } from "./hooks/useLang";

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
  problemEn: string;
  /** Infraestructura/sistema que construimos para resolverlo. */
  solution: string;
  solutionEn: string;
  /**
   * Resultado: el cambio operativo real y verificable de ESTE proyecto.
   * Prohibido usar porcentajes o cifras que no se hayan medido en este cliente
   * concreto — una cifra inventada obliga a un descargo, y el descargo destruye
   * la credibilidad del resto de la página.
   */
  result: string;
  resultEn: string;
  tags: string[];
  tagsEn: string[];
  serviceType: string;
  serviceTypeEn: string;
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

const HEADING_DEFAULT: Record<Lang, React.ReactNode> = {
  en: (
    <>
      Business problems.
      <br />
      <span className="text-grolow-light/55">Solutions that scale.</span>
    </>
  ),
  es: (
    <>
      Problemas de negocio.
      <br />
      <span className="text-grolow-light/55">Soluciones que escalan.</span>
    </>
  ),
};

const LABELS = {
  en: {
    eyebrow: "Success Stories",
    problem: "Problem",
    solution: "Solution",
    result: "Result",
  },
  es: {
    eyebrow: "Casos de Éxito",
    problem: "Problema",
    solution: "Solución",
    result: "Resultado",
  },
} as const;

export default function ProjectsSection({
  only,
  eyebrow,
  heading,
}: ProjectsSectionProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lang = useLang();
  const l = LABELS[lang];
  const resolvedEyebrow = eyebrow ?? l.eyebrow;
  const resolvedHeading = heading ?? HEADING_DEFAULT[lang];

  const projects: Project[] = [
    {
      id: "laperfum",
      title: "La Perfurm RD",
      problem:
        "Gestionaba un catálogo de perfumes nicho de forma manual y dispersa, sin una vitrina centralizada que reflejara la exclusividad de la marca ni canalizara los pedidos.",
      problemEn:
        "They managed a niche perfume catalog manually and scattered across channels, with no centralized showcase reflecting the brand's exclusivity or channeling orders.",
      solution:
        "Construimos una tienda digital centralizada con catálogo visual de lujo y pedidos canalizados directo a WhatsApp, sin comisiones de terceros.",
      solutionEn:
        "We built a centralized digital store with a luxury visual catalog and orders channeled straight to WhatsApp, with no third-party commissions.",
      result:
        "Todo el catálogo quedó en un solo enlace. Los pedidos entran por WhatsApp ya armados, con el producto y la cantidad, en vez de reconstruirse a lo largo de una conversación.",
      resultEn:
        "The whole catalog now lives in a single link. Orders arrive on WhatsApp already put together, with product and quantity, instead of being pieced together across a conversation.",
      tags: ["Tienda WhatsApp", "Perfumes", "Lujo", "RD"],
      tagsEn: ["WhatsApp Store", "Perfume", "Luxury", "DR"],
      serviceType: "Tienda Online → WhatsApp",
      serviceTypeEn: "Online Store → WhatsApp",
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
      problemEn:
        "A network of children's clothing distributors with no system to organize sales by zone or route purchases in an orderly way.",
      solution:
        "Implementamos una landing de conversión con asignación de distribuidoras autorizadas por zona y flujo de compra directo por WhatsApp.",
      solutionEn:
        "We implemented a conversion landing page that assigns authorized distributors by zone, with a direct purchase flow through WhatsApp.",
      result:
        "Cada visitante se dirige automáticamente a la distribuidora de su zona. Se acabó el reenvío manual de clientes entre vendedoras.",
      resultEn:
        "Every visitor is automatically routed to the distributor in their zone. Manually forwarding customers between sellers is over.",
      tags: ["Landing Page", "Ropa Infantil", "Red de ventas"],
      tagsEn: ["Landing Page", "Children's Clothing", "Sales Network"],
      serviceType: "Landing Page de Conversión",
      serviceTypeEn: "Conversion Landing Page",
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
      problemEn:
        "No professional presence to communicate technical services and work process to potential clients.",
      solution:
        "Desarrollamos un sitio profesional con servicios, proceso de trabajo y un CTA claro para agendar consultas.",
      solutionEn:
        "We built a professional site with services, work process and a clear CTA to book consultations.",
      result:
        "Un sitio que carga en menos de 2 segundos y explica servicios y proceso sin que él tenga que repetirlo en cada conversación.",
      resultEn:
        "A site that loads in under 2 seconds and explains services and process so he doesn't have to repeat them in every conversation.",
      tags: ["Sitio Profesional", "Servicios"],
      tagsEn: ["Professional Site", "Services"],
      serviceType: "Sitio Profesional",
      serviceTypeEn: "Professional Site",
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
      problemEn:
        "A catalog of Arabic and niche perfumes with no digital showcase enabling direct purchase or reflecting the brand's identity.",
      solution:
        "Construimos un catálogo digital con compra directa, identidad visual tropical y una experiencia enfocada en conversión.",
      solutionEn:
        "We built a digital catalog with direct purchase, tropical visual identity and an experience focused on conversion.",
      result:
        "Catálogo con compra directa e identidad visual propia, en lugar de un feed de Instagram donde los productos se pierden hacia abajo.",
      resultEn:
        "A catalog with direct purchase and its own visual identity, instead of an Instagram feed where products get lost scrolling down.",
      tags: ["Tienda WhatsApp", "Perfumes Árabes", "Catálogo"],
      tagsEn: ["WhatsApp Store", "Arabic Perfume", "Catalog"],
      serviceType: "Tienda Online → WhatsApp",
      serviceTypeEn: "Online Store → WhatsApp",
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
      problemEn:
        "A local food business with no digital channel to present products or receive orders directly and in an orderly way.",
      solution:
        "Diseñamos un sitio con presentación de productos, identidad de marca y un canal de contacto directo para pedidos.",
      solutionEn:
        "We designed a site with product presentation, brand identity and a direct contact channel for orders.",
      result:
        "Los pedidos dejaron de tomarse por mensajes sueltos y pasaron a un canal ordenado, con los productos presentados y con precios visibles.",
      resultEn:
        "Orders stopped being taken through scattered messages and moved to an orderly channel, with products presented and prices visible.",
      tags: ["Gastronomía", "Negocio local", "WhatsApp"],
      tagsEn: ["Food", "Local Business", "WhatsApp"],
      serviceType: "Landing Page de Conversión",
      serviceTypeEn: "Conversion Landing Page",
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
      problemEn:
        "An AI SaaS product with no page communicating its value proposition, use cases and pricing.",
      solution:
        "Construimos una landing de producto con características, casos de uso, precios y modo claro/oscuro para presentar el SaaS con claridad.",
      solutionEn:
        "We built a product landing page with features, use cases, pricing and light/dark mode to present the SaaS clearly.",
      result:
        "Una página que explica el producto, sus casos de uso y sus precios sin necesidad de una demo en vivo.",
      resultEn:
        "A page that explains the product, its use cases and its pricing without needing a live demo.",
      tags: ["SaaS", "Inteligencia Artificial", "Producto"],
      tagsEn: ["SaaS", "Artificial Intelligence", "Product"],
      serviceType: "Landing Page de Conversión",
      serviceTypeEn: "Conversion Landing Page",
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
          <p className="text-xs font-mono uppercase tracking-widest text-grolow-cream mb-3">
            {resolvedEyebrow}
          </p>
          <h2 className="text-[clamp(2rem,5.5vw,4.5rem)] font-black uppercase text-grolow-light leading-none">
            {resolvedHeading}
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
                  <span className="text-grolow-light/60 font-mono text-[9px] uppercase tracking-widest leading-tight">
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
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-md border border-grolow-light/15 text-grolow-light/70">
                    {lang === "en" ? project.serviceTypeEn : project.serviceType}
                  </span>

                  <span className="text-grolow-light/75 group-hover:text-grolow-cream group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 text-base shrink-0">
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
                    <p className="text-[10px] font-mono uppercase tracking-widest text-grolow-cream mb-1">
                      {l.problem}
                    </p>
                    <p className="text-grolow-light/75 text-sm leading-relaxed">
                      {lang === "en" ? project.problemEn : project.problem}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-grolow-cream mb-1">
                      {l.solution}
                    </p>
                    <p className="text-grolow-light/75 text-sm leading-relaxed">
                      {lang === "en" ? project.solutionEn : project.solution}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-grolow-cyan/70 mb-1">
                      {l.result}
                    </p>
                    <p className="text-grolow-cyan text-sm font-medium leading-relaxed">
                      {lang === "en" ? project.resultEn : project.result}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                  {(lang === "en" ? project.tagsEn : project.tags).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] md:text-xs border border-grolow-light/15 text-grolow-light/70 px-2 py-1 md:px-3 uppercase tracking-wider rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* ── Barra inferior ── */}
              <div className="relative z-10 border-t border-grolow-light/5 pt-4 flex items-center justify-between">
                <span className="text-grolow-light/70 font-mono text-xs uppercase tracking-widest">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-grolow-light/75 group-hover:text-grolow-cream font-mono text-xs tracking-wider transition-colors duration-300">
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