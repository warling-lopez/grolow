# AUDIT.md — Fase 0 del rediseño Grolow

> Auditoría de solo lectura del repo `grolow`, previa a cualquier cambio.
> Fecha: 2026-09-11 · Rama `main` · Commit base `7d2ccab`
> Corresponde a la Fase 0 de `spec/REDISENO-GROLOW.md` (§8).

---

## Resumen ejecutivo

El repo está **bastante más avanzado de lo que el spec asume**. Tres de los seis
"gaps confirmados" del §1 ya están cerrados y con buena ejecución: hay JSON-LD,
hay `hreflang` recíproco con `x-default`, y el sitemap es dinámico con `lastmod`
real. La Fase 2 del plan (SEO técnico), que el spec describe como "máximo
impacto", se reduce a tres tareas pequeñas.

A cambio, aparecen tres problemas que el spec no contempla y que son más graves
que los que sí contempla:

1. **El sitio es tema claro, no oscuro.** La paleta viva es crema `#F6F1E2` +
   ink `#0E1512` + verde profundo `#004643`. El color `#008F8B` que el spec
   declara "color de marca, confirmado, no cambia" **no aparece ni una sola vez
   en el código**. Esto es una decisión de negocio pendiente, no un detalle de
   implementación → ver §7.
2. **35 clases de color no generan CSS.** `grolow-cyan` solo está definido en
   `tailwind.config.ts`, y ese fichero no se carga (Tailwind v4 sin `@config`).
3. **`three.js` se carga en todas las páginas del sitio principal**, con import
   estático, para una esfera decorativa. Es el mayor coste de rendimiento y el
   spec ni lo menciona.

---

## 1. Stack exacto

| Pieza | Valor | Nota |
|---|---|---|
| Framework | **Next.js 16.2.6** | App Router, **Turbopack** en build |
| React | 19.2.4 | |
| Estilos | **Tailwind CSS v4** vía `@tailwindcss/postcss` | CSS-first, sin `tailwind.config` activo |
| TypeScript | 5.x | build con typecheck, pasa limpio |
| Animación | GSAP 3.15 + `@gsap/react`, Framer Motion 12.38 | las dos a la vez |
| 3D | `three` 0.184 + `@react-three/fiber` 9.6 + `drei` 10.7 | |
| Scroll | `@studio-freight/lenis` 1.0.42 | scroll suave global |
| Mail | nodemailer 8 | `/api/contact` |
| Sin usar | `clsx`, `tailwind-merge` | instaladas, **0 imports** |

**Directorio raíz del código: `app/`, no `src/`.** Todos los comandos y rutas
del spec que dicen `src/` hay que reescribirlos. No existe `src/`.

Estructura relevante:

```
app/
├── [lang]/[[...slug]]/page.tsx   ← una sola ruta sirve las 35 URLs del sitio
├── [lang]/layout.tsx             ← <html>, JSON-LD de negocio
├── (standalone)/                 ← 4 landings de cliente fuera del árbol i18n
├── api/contact/route.ts
├── og/[lang]/[[...slug]]/route.tsx  ← OG dinámico por ruta
├── robots.ts · sitemap.ts
├── components/  (45 ficheros)
└── lib/  (i18n, schema, pricing, seo-content, lastmod, content/×19)
```

La arquitectura de contenido (`app/lib/content/` + `app/lib/i18n.ts` como
registro único de rutas) es el mejor activo del repo. El rediseño debe
construirse encima, no al lado.

---

## 2. Inventario de color

### 2.1 La paleta viva no es la del spec

**156 ocurrencias de hex en `app/`, 53 valores únicos.** El color de marca que
el spec da por confirmado, `#008F8B`, aparece **0 veces**.

Lo que sí está en producción, definido en `app/globals.css` (`@theme inline`):

| Token Tailwind | Valor | Rol declarado | Usos |
|---|---|---|---|
| `grolow-light` | `#0E1512` ink | texto y bordes | **242** |
| `grolow-cream` | `#004643` verde profundo | acento, botones, eyebrow | **85** |
| `grolow-dark` | `#F6F1E2` crema | fondo | **40** |
| `grolow-cyan` | — **no definido** | — | **35 ⚠️ rotas** |
| `grolow-accent` | `#002B29` | final de gradiente | 14 |
| `grolow-card` | `#FFFCF4` | tarjeta clara | 6 |
| `grolow-lime` | `#BEF264` | mitad inferior de SplitText | 3 |
| `grolow-cream-seccion` | `#f0f0f0` | — | 0 (muerto) |

Nótese que los nombres mienten sobre los valores: `grolow-dark` **es el crema
claro** y `grolow-light` **es el casi negro**. Son restos de un tema oscuro
anterior renombrado por valor pero no por nombre. Cualquiera que lea
`bg-grolow-dark` esperando un fondo oscuro se equivoca. Esto hay que arreglarlo
en la Fase 1 sí o sí, sea cual sea la paleta que se elija.

### 2.2 Bug en vivo: 35 clases que no pintan nada

`grolow-cyan` (`#004643`) está definido **únicamente** en `tailwind.config.ts`.
Ese fichero **no se carga**: Tailwind v4 solo lee un config JS si el CSS lo
importa con `@config`, y `app/globals.css` no lo hace.

Verificado contra el CSS compilado del build:

```
grolow-cream   -> presente en .next/static/chunks/0b7d7i4nhqxrw.css
grolow-light   -> presente
grolow-dark    -> presente
grolow-cyan    -> AUSENTE en los 5 ficheros CSS del build
```

Consecuencia: `text-grolow-cyan`, `bg-grolow-cyan/20`, etc. heredan el color del
padre en vez de pintar verde. Afecta a acentos de título y a los iconos `+` del
acordeón en al menos:

`ProcessSection.tsx:124` · `VideoScrollSection.tsx:252,272` ·
`TechSection.tsx:94,105` · `FaqSection.tsx:61` · `ServicesSection.tsx:362,398`

`tailwind.config.ts` es código muerto completo y debe borrarse (o bien
importarse con `@config`, pero lo correcto en v4 es migrar sus 4 colores al
`@theme` de `globals.css`).

### 2.3 Deuda de hex sueltos

De las 156 ocurrencias, **89 están en `app/(standalone)/`** — landings de cliente
con su propia identidad (Hermon-Dental, VisualLab, for-you, ceo-warling). **Esas
no son deuda**: son proyectos de cliente que no deben heredar los tokens de
Grolow. Excluirlas del criterio de cierre de la Fase 1.

Deuda real, en el sitio de Grolow: **~30 ocurrencias**.

| Fichero | Hex | Comentario |
|---|---|---|
| `globals.css` | 9 | correcto, es la fuente de tokens |
| `api/contact/route.ts` | 25 | plantilla de email HTML — **no es deuda**, el email no puede usar CSS vars |
| `Hero2.tsx` | 5 | fallbacks de color de las tarjetas del mosaico |
| `og/[lang]/.../route.tsx` | 3 | imagen OG, se renderiza en el edge sin CSS → **no es deuda** |
| `WhatsAppButton.tsx` | 3 | incluye `#25d366`, verde oficial de WhatsApp |
| `ScrollToTopButton`, `HeroSection`, `GlobalCanvas` | 2 c/u | |
| `GraciasPage`, `NicheLanding`, `VideoScrollSection` | 1 c/u | |

> **Corrección al criterio de cierre del spec.** El DoD de la Fase 1 pide
> `grep -rn "#[0-9a-fA-F]\{6\}" src/ --include=*.tsx` → 0. Aplicado tal cual a
> este repo daría 156 y sería inalcanzable sin romper cosas legítimas (email,
> OG, verde de WhatsApp, landings de cliente). El criterio realista es:
> **0 hex en `app/components/` y `app/components/pages/`, excluyendo
> `WhatsAppButton` (marca de terceros)**. Son ~15 ocurrencias a limpiar.

También hay **25 `rgba()` literales** (sombras, velos, glows), en su mayoría
derivados de `#F6F1E2` y `#0E1512`. Entran en el mismo saco.

---

## 3. Tipografía — hay un bug

- **No se usa `next/font` en el sitio principal.** `globals.css` fija
  `font-family: Arial, Helvetica, sans-serif` en `html, body`.
- **`Syne` está roto.** Se aplica como estilo inline
  `style={{ fontFamily: "'Syne', sans-serif" }}` en **10 componentes del sitio
  principal** (Header, Footer, Hero2, HeroSection, FaqSection, TechSection,
  ProcessSection, ContactSection, VideoScrollSection, GraciasPage) — pero la
  fuente **solo se carga en `app/(standalone)/ceo-warling/layout.tsx`**, que es
  otra rama del árbol.

  Resultado: en `/es` y `/en`, esos 10 componentes caen al fallback
  `sans-serif`. **Todos los titulares del sitio se están renderizando en la
  fuente del sistema.** Nadie ha visto el diseño como se pensó.

- Fuentes que sí cargan, todas en `(standalone)`: `Syne`, `Caveat`,
  `EB_Garamond`, `Bricolage_Grotesque`, `Manrope` — todas desde
  `next/font/google`, ninguna self-hosted.
- No hay `.woff2` en el repo. Para la fuente display que pide el spec (§3.2) hay
  que añadir el fichero; hoy no existe.

Esto es una buena noticia para el rediseño: la capa tipográfica está
efectivamente vacía, así que montarla bien no rompe nada existente.

---

## 4. SEO técnico — el spec está desactualizado

| Punto del spec | Estado real | Fichero |
|---|---|---|
| "JSON-LD no detectado, ganancia #1" | ✅ **Ya existe, y bien** | `app/lib/schema.ts` (208 L) + `app/[lang]/layout.tsx:123` + `[[...slug]]/page.tsx:137` |
| "hreflang no detectado" | ✅ **Ya existe, recíproco + `x-default`** | `app/lib/i18n.ts:340` `alternatesFor()` |
| "sitemap con `lastmod` real" | ✅ Ya hecho | `app/sitemap.ts` + `app/lib/lastmod.ts` |
| FAQ y schema desde la misma fuente | ✅ **Ya cumplido** | `app/lib/content/home-faq.ts` → `FaqSection.tsx:7` y `schema.ts:12` |
| `robots.txt` con bots de IA | ❌ **Falta** | `app/robots.ts` — solo `User-agent: *` |
| `llms.txt` | ❌ **Falta** | `public/` no lo tiene |
| Página de entidad autor | ⚠️ Existe como `/ceo-warling`, **fuera del árbol i18n y sin `Person` schema enlazado** | `app/(standalone)/ceo-warling/` |

Lo que ya emite el `@graph`:

- **Layout (todas las páginas):** `Organization` + `ProfessionalService` (con
  `priceRange` calculado desde `pricing.ts`, no hardcodeado) + `WebSite`.
- **Por página:** `Service` con `offers` derivados de la tabla de precios real,
  `FAQPage`, `BreadcrumbList`.

El código incluso documenta la política antimentira del spec §0 por su cuenta:
*"el schema no puede afirmar algo que la página no diga"*, y omite `logo`,
`geo` y `openingHours` porque no hay dato real. Está alineado con la regla de
oro sin necesitar el spec.

Además hay **dos guardarraíles ya escritos** que el spec no sabe que existen y
que conviene extender en vez de sustituir:

- `scripts/seo-check.mjs` (14 KB) — valida canonical, reciprocidad de hreflang,
  conteo de palabras, infraestructura y placeholders legales.
- `scripts/qa-check.mjs` (7 KB)
- `scripts/indexnow.mjs` — ping a IndexNow en `postbuild`.

**Redimensionamiento de la Fase 2:** de 7 tareas quedan 3 reales — `llms.txt`,
bots de IA en `robots.ts`, y el nodo `Person` + página de autor dentro de `/es`.
Más validar en Rich Results Test lo que ya se emite. Es media sesión, no una
fase.

### Pendiente de dato (bloquea schema, no es código)

`app/[lang]/layout.tsx` documenta que `logo` e `image` están fuera del schema
porque **`logo.png` devuelve 404**. Hay que producir ese fichero: sin `logo`,
`Organization` no opta a varios rich results.

---

## 5. Rendimiento — baseline y el problema gordo

### Baseline del build (`npm run build`, Turbopack)

```
✓ Compiled successfully in 2.3s
✓ TypeScript en 1591ms, sin errores
✓ 98 páginas estáticas generadas en 442ms
  43 rutas de contenido (×2 idiomas) + 43 rutas OG + robots + sitemap
```

| Métrica | Valor |
|---|---|
| `.next/static` total | **3.6 MB** |
| `.next/static/chunks` (JS) | **2.2 MB** sin comprimir |
| Chunk mayor | **708 KB** (`0.ib.vlsa1vbd.js`) |
| Siguientes 2 chunks | 292 KB · 224 KB |
| CSS total | 89 KB en 5 ficheros |
| URLs en sitemap | **35** ✅ coincide con el spec |

> Nota: Next 16 con Turbopack ya no imprime la tabla de *First Load JS* por
> ruta. Para tener el número contra el presupuesto de <120 KB del spec §6 hay
> que medir con `@next/bundle-analyzer` o desde el navegador. **Pendiente.**
> El chunk de 708 KB solo es casi con certeza `three` + `drei`.

### El problema: 3D en todas las páginas, con import estático

`app/components/ClientLayout.tsx` envuelve **todo** el sitio principal y hace:

```tsx
import GlobalCanvas from '@/app/components/GlobalCanvas';   // estático
...
{!standalone && <GlobalCanvas />}
```

y `GlobalCanvas.tsx` importa `three`, `@react-three/fiber` y
`@react-three/drei` para renderizar **una esfera distorsionada decorativa**.
Al ser import estático, `three` entra en el grafo de módulos de la ruta
**aunque `standalone` sea true** — el `dynamic()` del spec §6 no está aplicado
en ningún sitio del repo.

`HeroSection.tsx` monta **un segundo `<Canvas>`** con su propia esfera.

Coste estimado: `three` + `fiber` + `drei` ronda 600–700 KB sin comprimir
(~180 KB gzip) para un elemento puramente decorativo. Es, con diferencia, la
mayor palanca de rendimiento del proyecto y **no aparece en el spec**.

### Otros hallazgos de rendimiento

- **Lenis (scroll suave global)** en `ClientLayout.tsx:28`. El spec §3.5 dice
  literalmente *"Nada de scroll hijacking"*. Lenis es exactamente eso.
  **Conflicto directo entre el spec y el código actual** → decisión en §7.
- **Dos librerías de animación a la vez**: GSAP (10 componentes) y Framer Motion
  (Header, Hero2). Consolidar en una ahorra ~40–60 KB.
- **Cero `next/image` en el sitio principal.** Solo `(standalone)/VisualLab` lo
  usa. Las capturas de proyectos se sirven con `<img>` crudo y
  `eslint-disable @next/next/no-img-element` (`Hero2.tsx:149`,
  `ProjectsSection.tsx:412`), **sin `sizes`, sin `width`/`height`, sin
  `priority`**. Riesgo alto de CLS y de servir imágenes sobredimensionadas en
  móvil. Los `.webp` ya existen en `public/projects/` (los 6 proyectos), así que
  migrar es barato.
- **`HomePage.tsx` es `'use client'` entero**, solo para leer `useLang()`. Todo
  el árbol de la portada queda en el bundle de cliente. El idioma ya está en
  `params` del servidor: pasarlo como prop convierte la mayoría de la portada en
  Server Components.
- `public/tu-video-3d.mp4` pesa **11 MB** y `public/video 3d/mp__000.zip` está
  versionado. `VideoScrollSection` está comentado en `HomePage.tsx:75-82`, así
  que probablemente son peso muerto del repo.
- `public/vercel.svg` pesa 150 KB (un SVG de 150 KB es un error).
- Directorio `undefined/` en la raíz con 3 PNG de checks — basura de un script.

---

## 6. Componentes

**45 ficheros en `app/components/`. 34 llevan `'use client'` (76%).**

### Primitivas reutilizables: **ninguna**

No existe `Button`, `Card`, `Section`, `Chip`, `Accordion` ni `Container`.
`clsx` y `tailwind-merge` están instaladas pero **sin un solo import**. Cada
sección repite sus propias clases de botón y tarjeta a mano.

Esto significa que la Fase 1 del spec (§3.4) se construye **desde cero**, sin
migración previa. Es trabajo limpio, pero es trabajo entero.

### Sí reutilizables hoy

| Componente | Reutilización |
|---|---|
| `FaqSection` | acepta `items?` → home bilingüe + landings de nicho |
| `ProjectsSection` | acepta `only={[...]}` para filtrar |
| `ContentPage` | **renderiza la mayoría de las 35 rutas** desde `lib/content` |
| `NicheLanding` | plantilla de landing por nicho |
| `Hero2` | acepta `images` |
| `WhatsAppLink`, `Breadcrumbs`, `SplitText` | utilidades |

### One-offs de la portada

`DifferentiationSection`, `ProcessSection`, `TechSection`, `PricingSection`,
`AboutSection`, `ContactSection`, `SiteLinksSection`, `ValuePropSection`,
`ServicesSection`, `VideoScrollSection`.

### Candidatos claros a dejar de ser cliente

- `HomePage` — solo por `useLang()`
- `SiteLinksSection`, `DifferentiationSection` — sin estado, solo animación de entrada
- `Footer` — sin estado real
- `TechSection` — la animación puede ir en un wrapper `<Reveal>` cliente

### Duplicación viva

`HeroSection.tsx` y `Hero2.tsx` coexisten; solo `Hero2` está en uso
(`HomePage.tsx:53`). `HeroSection` es código muerto con un `<Canvas>` dentro.
Igual `VideoScrollSection`, comentado en la portada.

---

## 7. Decisiones que necesito de ti antes de la Fase 1

El spec da por cerradas dos cosas que el repo contradice. Ninguna se puede
resolver leyendo código.

### 7.1 El color de marca (bloqueante)

El spec §3.1 dice: *"El color de marca es `#008F8B` y NO cambia"*, y monta un
sistema **oscuro** completo encima. El sitio en producción es **claro**, con
`#004643` de acento — un verde bastante más oscuro y menos saturado que
`#008F8B`.

Son tres escenarios distintos, con costes muy distintos:

- **A — El spec manda: rediseño a oscuro con `#008F8B`.** Se adopta §3.1 tal
  cual. Es el trabajo mayor: se reescribe la capa de color entera y los 242
  usos de `grolow-light` cambian de significado. Los tokens del spec ya vienen
  verificados contra AA, así que el riesgo de accesibilidad es bajo.
- **B — El repo manda: se conserva el tema claro.** Se construye el sistema de
  tokens del spec (jerarquía de botones, escalas, ritmo) pero sobre
  `#F6F1E2`/`#0E1512`/`#004643`. **Toda la tabla de contraste del §3.1 hay que
  recalcularla**: está medida contra fondos oscuros y no aplica. Aviso concreto:
  `#004643` sobre crema `#F6F1E2` da buen contraste para texto, pero el CTA
  primario blanco del spec es invisible sobre crema — la jerarquía de botones
  necesita rediseño completo.
- **C — Híbrido.** Marca clara, secciones oscuras a sangre (hero y cierre).
  Requiere las dos rampas bien medidas.

Mi recomendación: **A**, si `#008F8B` es de verdad el color de marca que quieres
proyectar. El repo no tiene nada de valor invertido en la capa de color —los
nombres de token ya están mal, `grolow-cyan` está roto y la tipografía tampoco
funciona—, así que rehacerla no destruye trabajo. Pero necesito que lo confirmes
tú: cambiar un sitio de claro a oscuro es una decisión de marca, no técnica, y
el spec puede estar describiendo una versión del sitio anterior a la actual.

### 7.2 Lenis (menor, pero decide arquitectura)

El spec §3.5 prohíbe el scroll hijacking; el sitio lo tiene desde
`ClientLayout`, acoplado a GSAP ScrollTrigger y a los anclajes del Header.
Quitarlo es coherente con el spec y ahorra JS, pero toca navegación y el
`ScrollToTopButton`. ¿Lo quitamos en la Fase 1 o lo dejamos vivo?

---

## 8. Plan revisado que propongo

Reordenado según lo que el repo realmente necesita, no según lo que el spec
suponía.

| Fase | Contenido revisado | Cambio respecto al spec |
|---|---|---|
| **0** | Este documento | ✅ hecho |
| **0.5 · Correcciones sueltas** | Arreglar `grolow-cyan` (35 clases muertas); cargar la fuente display en `[lang]/layout`; borrar `tailwind.config.ts`; borrar `HeroSection` y el dir `undefined/`; sacar el vídeo de 11 MB | **Nuevo.** Bugs en vivo, ~1 sesión, sin riesgo |
| **1 · Fundaciones** | Tokens + primitivas + `<Reveal>` | Igual, pero **desde cero**: no hay primitivas que migrar. Bloqueado por §7.1 |
| **2 · SEO** | `llms.txt`, bots de IA, `Person` + `/es/sobre-warling-lopez`, `logo.png` | **Reducida de 7 a 4 tareas.** Lo demás ya existe |
| **2.5 · Rendimiento crítico** | `dynamic()` sobre `GlobalCanvas`; `next/image` con `sizes`; `HomePage` a Server Component; consolidar GSAP/Framer | **Subida desde la Fase 5.** El chunk de 708 KB condiciona cualquier objetivo de LCP; arreglarlo después de rediseñar es medir dos veces |
| **3** | Rediseño de la home, bloques 1→13 | Igual |
| **4** | Páginas internas | Igual |
| **5** | Lighthouse CI + axe + a11y | Queda solo la parte de verificación |
| **6** | Contenido y prueba social | Igual (marketing) |

---

## 9. Accesibilidad — estado de partida

| Requisito §7 | Estado |
|---|---|
| Skip link a `<main>` | ❌ **No existe** |
| `prefers-reduced-motion` | ⚠️ Solo `Hero2` en el sitio principal (los otros 4 usos están en `(standalone)`). **GSAP y Lenis no lo respetan** |
| `aria-expanded` | ⚠️ 3 usos. Acordeón FAQ y menú móvil a revisar |
| `:focus-visible` | ⚠️ 7 referencias a focus/outline, sin sistema |
| `lang` en `<html>` | ✅ `HTML_LANG[lang]` en `[lang]/layout.tsx:118` |
| `alt` en capturas | ✅ Descriptivo y bilingüe (`HomePage.tsx:44-47`) |
| Botón WhatsApp accesible | ⚠️ a verificar (tamaño táctil, `aria-label`) |
| Contraste | ⚠️ **Sin medir.** Depende de §7.1 |

---

## 10. Anexo — comandos de verificación

```bash
# Confirmar que grolow-cyan no genera CSS
npm run build && grep -rl "grolow-cyan" $(find .next -name '*.css' -not -path '*/cache/*')
# (vacío = confirmado)

# Inventario de hex, excluyendo landings de cliente
grep -rhoE "#[0-9a-fA-F]{3,8}\b" app/components app/lib --include='*.tsx' --include='*.ts' \
  | tr 'A-F' 'a-f' | sort | uniq -c | sort -rn

# Confirmar que Syne no se carga en el sitio principal
grep -rn "Syne" app --include='*.tsx' | grep -v fontFamily
# (solo debe aparecer (standalone)/ceo-warling/layout.tsx)

# Guardarraíles ya existentes
npm run seo:check
npm run qa:check
```

---

*Fase 0 completada. No se ha modificado ningún fichero del código.*
