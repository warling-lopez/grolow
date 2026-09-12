# Auditoría SEO / GEO / AEO / Rendimiento / Responsive + capa de conversión — grolow.com

**v3 · re-verificada contra el código en producción el 12 de septiembre de 2026**
Cliente: **Grolow** — estudio de desarrollo web · Santo Domingo, República Dominicana · Fundador: Warling López
Base: auditoría v2 (10-sep-2026) de un auditor externo, comparada contra jeanmarte.com

---

## Qué cambia en la v3, y por qué importa

La v2 es un buen documento: el rastreo de las 19 páginas, el análisis de schema y las dos pruebas con agentes son trabajo serio y la mayoría de sus conclusiones siguen en pie. Esta revisión hace tres cosas que la v2 no podía hacer:

**1. Re-verifica cada hallazgo técnico contra el código.** La v2 se escribió el 10 de septiembre. Entre esa fecha y hoy el sitio cambió de forma sustancial. Cada fila de las tablas lleva ahora un estado explícito:

| | Significado |
|---|---|
| ✅ **Resuelto** | El hallazgo era correcto y ya no aplica. Se indica cómo se comprobó. |
| ⚠️ **Vigente** | Sigue siendo cierto hoy. |
| ❌ **Incorrecto en la v2** | El hallazgo era erróneo cuando se escribió. |
| 🆕 **Nuevo** | No aparecía en la v2. |

**2. Corrige un error factual y matiza dos más.** La v2 afirma que faltan `Offer` / `PriceSpecification`. No faltan: las páginas de servicio los emiten desde antes de la auditoría. Detalle en §3.3.

**3. Añade la dimensión que faltaba: rendimiento.** La v2 declara Core Web Vitals fuera de alcance y recomienda ejecutar PageSpeed. Se ejecutó. El resultado es el hallazgo más grave de toda la auditoría y no aparece en la v2: **el sitio publicado puntuaba 33/100 en rendimiento móvil**, con 2.840 ms de bloqueo del hilo principal. Eso pesa más que varios de los ⚠️ de la v2 juntos, porque el rendimiento es factor de ranking declarado y además degrada la conversión de forma directa. Ver §12.

> **Sobre la metodología de la v2.** Tres límites que conviene tener presentes al leerla, y que la propia v2 menciona de pasada pero no descuenta de sus conclusiones. Están desarrollados en §8.4.

---

## Resumen ejecutivo

El diagnóstico central de la v2 **se sostiene y es correcto**: Grolow tiene una base técnica muy por encima de la media del mercado dominicano y un problema de visibilidad que no está en la página, sino en las capas de autoridad y entidad que viven fuera de ella.

Lo que la re-verificación cambia:

- **La capa de accesibilidad y movimiento ya está resuelta.** `prefers-reduced-motion`, contraste y nombres accesibles: Lighthouse da **100/100 en accesibilidad**, medido. La v2 marcaba tres faltas aquí.
- **El rendimiento era el problema silencioso.** 33 → 91 (simulado) / 99 (throttling real de navegador). Bloqueo del hilo principal de 2.840 ms → 10 ms.
- **La capa de entidad sigue exactamente igual de rota.** Nada de lo prioritario en la v2 —Business Profile, reseñas, menciones externas, `/ceo-warling` huérfana, NAP, contradicción de experiencia— se ha tocado. **Sigue siendo la prioridad 1, y ahora con más razón**, porque ya no hay nada más grande delante.

### Puntuaciones

Escala: **10** = referencia del sector, nada accionable pendiente · **8** = sólido, huecos menores · **6** = funciona pero le falta una pieza estructural · **4** = defectos que cuestan tráfico o conversión hoy.

| Dimensión | v2 (10-sep) | v3 (12-sep) | Movimiento |
|---|---|---|---|
| **SEO técnico on-page** | 8 / 10 | **8 / 10** | = |
| **GEO (entidad y corroboración)** | 6 / 10 | **6 / 10** | = — nada cambió aquí |
| **AEO** | 8 / 10 | **8 / 10** | = |
| **Rendimiento** 🆕 | *fuera de alcance* | **8.5 / 10** | 🆕 medido: era 3/10 |
| **Responsive** | 7.5 / 10 | **8 / 10** | ↑ `srcset` y reduced-motion resueltos |
| **Accesibilidad** 🆕 | *implícita* | **9.5 / 10** | 🆕 100/100 Lighthouse |
| **Conversión** | 7 / 10 | **7 / 10** | = |
| **Detectabilidad por LLMs** | 60 / 100 | **~60 / 100** | = (ver §8.4 sobre este número) |

**El orden de prioridades no cambia.** Lo que cambia es que ya no hay excusa técnica delante:

1. 🔴 **Ganar la marca.** Search Console + indexación forzada + Google Business Profile + 5–10 reseñas reales + 3–5 menciones con anchor «Grolow». Sin esto el sitio no existe ni en búsqueda ni en recuperación abierta de LLMs.
2. 🔴 **Reconciliar la contradicción de experiencia** y publicar un bloque NAP consistente.
3. 🟠 **Arreglar `/ceo-warling`** (sitemap, `canonical`, `Person` schema, enlace en navegación).
4. 🟠 **Prueba visual y testimonios en los casos.**

---

## 1. Alcance y método

19 páginas ES rastreadas. Verificación v3 sobre el build de producción servido localmente, con:

- **Lighthouse 12.8.2** (móvil), en sus dos modos de throttling — simulado y real de navegador. Ver §8.4 sobre por qué importa la diferencia.
- **Playwright** para auditoría en vivo del DOM en 375 / 768 / 1024 / 1280 / 1440 px: áreas táctiles, desbordamiento, `srcset`, `<table>`, JSON-LD.
- **Inspección directa del código** para cada afirmación sobre schema y CSS.

**Estructura (sitemap.xml — 35 URLs, ~19 útiles por idioma):** home · servicios (índice + 5) · 3 landings por público · precios · casos (índice + 3, con 6 proyectos nombrados) · blog (índice + 2) · contacto. Más `/ceo-warling`, **fuera del sitemap**.

---

## 2. Visibilidad orgánica — sin cambios

El hallazgo de la v2 se mantiene íntegro: el sitio no rankea para ningún término, ni el de su propia marca. «Grolow» devuelve un arbusto ornamental, un vino y un jugador de League of Legends. Un competidor rankea para la consulta que contiene el propio nombre de Grolow.

**Dos matices metodológicos que la v2 anota pero no descuenta:**

- El scraping se hizo contra el **índice de EE. UU.**. Para un negocio local dominicano, el índice relevante es `google.com.do` con geolocalización en RD. La señal cualitativa —dominio nuevo sin tracción— es casi con certeza correcta, pero **las posiciones concretas de los competidores citados no son trasladables**. Conviene rehacerlo desde RD antes de usar esa tabla para tomar decisiones de contenido.
- «Grolow» compite con homónimos establecidos en inglés. Esto no es un problema de SEO, es un problema de **desambiguación de entidad**, y la solución es la de §10 (emparejar siempre marca + categoría + ciudad, `sameAs` completo, menciones externas).

**Dato de mercado que conviene no perder de vista:** los competidores que rankean cotizan entre 3× y 5× por encima de Grolow (corporativo desde US$1.400, tienda desde US$2.500). El rango de Grolow no solo es una cuña comercial: es una señal de posicionamiento que el copy debería encuadrar de forma explícita, o el visitante lo interpretará solo.

---

## 3. SEO — 8 / 10

### 3.1 Técnico on-page

| Señal | Estado v3 | Detalle |
|---|---|---|
| `title` 51–58 car., `meta` 142–154 | ⚠️ Vigente ✅ | 19/19 en rango. Mejor que la referencia de comparación. |
| Un H1 por página, H2 en pregunta | ⚠️ Vigente ✅ | Sin *stuffing*. |
| `canonical` autorreferencial | ⚠️ **Vigente** | Correcto salvo `/ceo-warling`, que sigue sin él. |
| `hreflang` `es-DO`/`en`/`x-default` | ⚠️ Vigente ✅ | Recíproco, derivado de un registro único de rutas: no puede desincronizarse. |
| OG dinámico `/og/es` | ⚠️ Vigente ✅ | Verificado: 200 `image/png`, 1200×630, ambos idiomas. |
| Sitemap 35 URLs | ⚠️ **Vigente** | Sigue omitiendo `/ceo-warling`. |
| **Imágenes en casos y servicios** | ⚠️ **Vigente — y es de lo más caro** | Verificado en vivo: `/es/casos/laperfum1` y `/es/precios` tienen **0 imágenes**. Un caso sobre trabajo de diseño sin mostrar el diseño. Se pierde Google Imágenes y toda prueba visual. |
| **Responsive images (`srcset`)** | ✅ **Resuelto (parcial)** | La v2 medía 0. Hoy la home sirve **6 `img[srcset]`** vía `next/image` con `sizes` explícito. Pendiente: casos y servicios, que no tienen imágenes que optimizar. |
| Blog: 2 artículos | ⚠️ Vigente | Ambos excelentes; 2 no sostienen una estrategia. |
| Índices delgados (`/casos` 477 pal., `/contacto` 170) | ⚠️ Vigente | |
| Fecha visible en artículos | ⚠️ Vigente | El `Article` la lleva; el cuerpo no. Y los títulos dicen «2026». |

### 3.2 Datos estructurados

| Señal | Estado v3 | Detalle |
|---|---|---|
| Grafo `Organization` + `ProfessionalService` + `WebSite` con `@id` | ⚠️ Vigente ✅ | Sólido. `priceRange` se calcula desde la tabla de precios, así que no puede desfasarse respecto a lo que dice la página. |
| `Service` + `FAQPage` en cada servicio; `Article` + `BreadcrumbList` en cada caso y post | ⚠️ Vigente ✅ | El mayor activo técnico del sitio. |
| **`Offer` / `PriceSpecification`** | ❌ **Incorrecto en la v2** | La v2 los da por ausentes y los pone en la matriz de recomendaciones como «🟠 Alta». **Ya existían.** Verificado en `/es/tienda-online-whatsapp`: `Service.offers` con `@type`, `name`, `description`, `priceCurrency`, `availability`, `url` y `priceSpecification`. Los importes se derivan de la misma tabla que publica `/precios`, así que el schema y la página no pueden contradecirse. **Esta recomendación debe salir de la lista.** |
| `founder` Person anidado y mínimo | ⚠️ **Vigente** | Sin `@id` propio, sin `sameAs`, sin `knowsAbout`. Y `/ceo-warling` sigue **sin ningún JSON-LD**. |
| `author` del blog = organización | ⚠️ Vigente | Debería ser el `Person` del fundador. |
| `HowTo`, `ContactPoint`, `ContactPage` | ⚠️ Vigente | Confirmado: 0 ocurrencias en el código. |
| `Review` / `AggregateRating` | ⚠️ Vigente — *y correcto que falte* | No hay reseñas reales. Marcarlas sin tenerlas es motivo de acción manual de Google. **No es un hueco que rellenar: es un hueco que ganar.** |
| `areaServed` solo a nivel país | ⚠️ Vigente | 3 ocurrencias, todas `Country`. |

---

## 4. GEO — 6 / 10

**Sin cambios respecto a la v2. Ninguno de sus hallazgos se ha atendido.** El análisis de la v2 es correcto y se reproduce en lo esencial:

- **Corroboración externa: ninguna.** Sin Business Profile, sin reseñas, sin directorios, sin menciones. Un motor puede confirmar que Grolow existe y describe un servicio coherente, pero **no puede corroborar que ningún proyecto se entregó**.
- **Entidad fragmentada.** `/ceo-warling` —donde viven LinkedIn y GitHub— está huérfana: fuera del sitemap, sin `canonical`, sin schema, sin enlace en navegación. Los `sameAs` de la organización solo listan Facebook e Instagram.
- **Contacto sin NAP.** Verificado: los correos que aparecen en el código son `grolow.web@gmail.com` y direcciones de ejemplo de formularios. **Ninguno `@grolow.com`.**

### La contradicción de experiencia — matizada

La v2 la señala entre la home («5 años de experiencia») y `/ceo-warling` («2025 — Presente»). Re-verificado hoy: **la home ya no la contiene** —esa sección cambió de sitio—, pero **la contradicción no está resuelta, solo se movió**: `/es/clinicas` sigue diciendo «5 años de experiencia» y `/ceo-warling` sigue diciendo «2025 — Presente».

Que esté en una landing de nicho en vez de en la home la hace menos visible para un humano, **pero igual de detectable para un agente** que rastrea el sitio entero — que es exactamente como la encontró el agente de la v2. Sigue siendo prioridad 🔴, sin descuento.

---

## 5. AEO — 8 / 10

Sin cambios. El `FAQPage` en todo el sitio sigue siendo el gran activo. Vigentes:

- **`HowTo` ausente** — «Nuestro método» son ahora 4 pasos numerados, candidatos naturales.
- **`<table>` real ausente** — verificado en vivo: **0 `<table>`** en home, `/precios` y casos. La tabla de precios son divs. Sin `<table>` no se puede ganar fragmento de tabla.
- **Cola larga escasa** en «cuánto tarda», «qué incluye el mantenimiento», «landing vs corporativo», «cómo elegir agencia».
- **Señales locales débiles**: `areaServed` a nivel país, sin Business Profile, sin dirección visible.

---

## 6. Conversión — 7 / 10

El diagnóstico de la v2 se mantiene. Los nueve defectos C-1 a C-9 siguen vigentes salvo un matiz:

| # | Defecto | Estado v3 |
|---|---|---|
| C-1 | Sin testimonios | ⚠️ **Vigente.** El componente existe y está cableado, pero su fuente de datos está vacía a propósito: la sección no se pinta hasta que haya testimonios reales. **La decisión de no inventarlos es correcta** y coherente con la política declarada del sitio; lo que falta es conseguirlos. |
| C-2 | Casos sin una sola imagen | ⚠️ **Vigente.** Confirmado en vivo. Es el defecto de conversión más caro. |
| C-3 | Proceso corto, solo en la home | ✅ **Parcial.** Pasó de 3 a 4 pasos. Sigue sin URL `/proceso` propia y sin las etapas de Testing/Seguridad y Soporte, que son las que calman el miedo. |
| C-4 · C-5 | Sin «Nuestra participación» ni «Stack» / «Dificultades» por caso | ⚠️ Vigente |
| C-6 | CTA de propuesta, no de cita agendada | ⚠️ Vigente |
| C-7 | Página del fundador huérfana | ⚠️ Vigente |
| C-8 | Caso auto-referencial (`warling.top` es del propio fundador) | ⚠️ Vigente. No es deshonesto, pero pesa menos como prueba social y **debería etiquetarse como proyecto propio**. |
| C-9 | Contradicción de experiencia | ⚠️ Vigente (ver §4) |

---

## 7. Responsive — 8 / 10 *(era 7.5)*

| Señal | Estado v3 | Detalle |
|---|---|---|
| Sin scroll horizontal | ⚠️ Vigente ✅ | Re-verificado a 375 / 768 / 1024 / 1280 / 1440 px: `scrollWidth === clientWidth` en todos. |
| Mobile-first, `clamp()` fluido, `@media (hover:hover)` | ⚠️ Vigente ✅ | |
| **`prefers-reduced-motion`** | ✅ **Resuelto** | La v2 medía 0 referencias. Hoy existe un bloque global que neutraliza animaciones y transiciones, con el cuidado de forzar `opacity:1` en los elementos cuyo estado inicial es invisible — sin eso, «reducir movimiento» los dejaría en blanco. |
| **`srcset`** | ✅ **Resuelto (parcial)** | 0 → 6 en la home, vía `next/image` con `sizes` explícito. |
| **`100vh` vs `100dvh`** | ⚠️ **Vigente** | 2 instancias de `100vh`, cero `dvh`/`svh`/`lvh`. Sigue el salto con la barra de direcciones en Safari/Chrome móvil. Arreglo de un minuto. |
| **Áreas táctiles < 44×44 px** | ⚠️ **Vigente, y peor de lo que decía la v2** | Auditoría en vivo a 375 px: **36 elementos en la home** (la v2 contaba 25), 23 en `/precios`, 24 en un caso. Ejemplos: enlaces del footer de 16 px de alto, conmutador de idioma 33×25, botones flotantes 40×40. Las CTA principales sí cumplen. |
| Micro-tipografía 10–11 px | ⚠️ Vigente | 38 usos. Etiquetas «eyebrow», legibilidad justa en móvil. |
| `@container` | ⚠️ Vigente (0) | Anotado, no es defecto: los breakpoints de viewport siguen siendo lo mayoritario. La referencia de comparación tampoco las usa. |

---

## 8. Validación con agentes — ~60 / 100

Las dos pruebas de la v2 son el aporte más original del documento y su conclusión —**«el sitio se lee bien; la marca no se corrobora»**— es exacta y sigue vigente.

### 8.1–8.3 Resultados (de la v2, sin cambios)

- **Agente A · extracción: 62/100.** Con las URLs en contexto, 12 preguntas de hecho: 7 CLARA, 4 PARCIAL, 1 con contradicción.
- **Agente B · citación: 58/100.** Con las URLs en contexto, **Grolow salió #1** en la respuesta simulada, por audiencia exacta y rangos de precio concretos. Pero con reservas: emparejado con una alternativa «con plazos y devolución garantizados». **En recuperación abierta, sin pista de URL, quedaría omitido.**

### 8.4 Los tres límites del método 🆕

Esto es lo que la v3 añade, y afecta a cómo debe leerse el 60/100.

**1. El agente A no pudo ver el schema, y eso contamina su nota.** La v2 lo dice: el fetch convierte a Markdown y descarta `<head>` y `<script>`, así que el JSON-LD era invisible para el agente. La v2 verifica aparte que el schema sí existe — y aun así **incluye el 62/100 en la media**. Eso mezcla dos cosas distintas: cuánto se puede extraer del sitio, y cuánto pudo extraer *esa herramienta concreta*. La conclusión útil no es el número, es la observación cualitativa que la acompaña y que sí es valiosa: **ningún hecho vino del markup, todos de la prosa**. Un motor con recuperación ligera se pierde el schema, así que **el texto visible debe sostenerse solo**. Ese es el argumento real para el bloque NAP, y es bueno.

**2. El SERP se midió contra el índice equivocado.** Ver §2.

**3. Conflicto de interés en la referencia de comparación.** jeanmarte.com es, según el propio encabezado, el portafolio del auditor. La v2 lo declara —bien— pero después lo usa como vara de medir en 21 filas comparativas y cierra con *«casi todo lo que le falta a Grolow ya está resuelto en el sitio del auditor»*. Eso es a la vez un hallazgo útil y una propuesta comercial, y conviene leerlo sabiéndolo. **No invalida la comparación**: las diferencias señaladas (`Person` con `sameAs`, `areaServed` granular, testimonios, garantía, `dvh`) son reales y verificables. Pero la elección de *ese* sitio como referencia, en vez de los competidores que de hecho rankean, deja fuera la comparación más accionable: **qué hacen Rival Design, Pixel City y Nubesoft que les da el ranking que Grolow no tiene.** Esa es la comparación que falta.

---

## 9. Rendimiento — 8.5 / 10 🆕

**La v2 declara esta dimensión fuera de alcance y recomienda ejecutar PageSpeed. Se ejecutó, y el resultado cambia el orden de gravedad del informe.**

### 9.1 El sitio publicado estaba roto de rendimiento

Lighthouse 12.8.2, móvil, sobre `https://www.grolow.com/es`:

| Métrica | Sitio publicado (10-sep) | Build actual (12-sep) |
|---|---|---|
| **Rendimiento** | **33 / 100** | **91** simulado · **99** throttling real |
| Accesibilidad | 100 | 100 |
| Buenas prácticas | 100 | 100 |
| SEO | 100 | 100 |
| LCP | 6,4 s | 3,4 s sim · 1,6 s real |
| **TBT (bloqueo del hilo principal)** | **2.840 ms** | **10 ms** |
| CLS | 0 | 0 |

Un TBT de 2.840 ms significa que la página **no responde al dedo durante casi tres segundos** tras cargar. Eso no es un matiz técnico: es la diferencia entre un visitante que pulsa el CTA y uno que se va. Y con 33/100, el rendimiento era un lastre de ranking activo, no un «pendiente».

**Causa:** `three.js` + `@react-three/fiber` + `drei` cargándose en **todas** las páginas, con import estático, para una esfera decorativa; GSAP y Lenis en el chunk raíz; y un favicon de 137 KB.

**Corregido:** −48% de JavaScript servido, −119 KB de peso total, favicon 137 KB → 15 KB, GSAP y Lenis fuera de la ruta crítica.

### 9.2 Los dos modos de Lighthouse discrepan, y conviene saberlo

Mismo build, misma URL, mismo minuto: **91** con throttling simulado, **99** con throttling real del navegador. El desglose explica por qué: el LCP simulado atribuye 3.064 ms a «render delay» con 0 ms de descarga, es decir, tiempo de CPU estimado por el modelo. Medido en un navegador real con 4G y CPU 4× lenta, el LCP es de **776 ms** y hay un único candidato.

**Qué número usar:** el simulado, porque es el que usa PageSpeed Insights y por tanto el que verá cualquiera que audite el sitio. Pero conviene saber que la experiencia real es mejor que lo que marca, y que **una parte del margen que queda hasta 100 no es optimizable, es el modelo.**

### 9.3 Lo que queda

- **Google Analytics: 171 KB, el 26% del peso de la página.** Ya no bloquea (`lazyOnload`), pero sigue descargándose. Sustituirlo por una alternativa ligera (<2 KB) bajaría la página de 665 a ~495 KB. Decisión de negocio: se pierde histórico y funciones.
- **Medir en producción.** Todas las cifras del build actual son de localhost, donde el TTFB no es representativo. Rehacer tras desplegar.

---

## 10. Matriz de recomendaciones — v3

Reordenada por impacto real, con las resueltas fuera y las estimaciones corregidas.

### 🔴 Crítica — la marca no existe

| Acción | Dimensión | Esfuerzo | Impacto |
|---|---|---|---|
| **Search Console + indexación forzada** de home, servicios y casos | SEO | Bajo | Muy alto |
| **Google Business Profile** + 5–10 reseñas reales de los clientes que ya existen | SEO local / GEO | Bajo | Muy alto |
| **Desambiguar «Grolow»**: emparejar siempre con «estudio de desarrollo web» + «Santo Domingo»; `sameAs` completo; 3–5 menciones con anchor de marca en directorios y roundups dominicanos | GEO | Medio | Muy alto |
| **Reconciliar «5 años» vs «2025 — Presente»** a un solo número, en `/es/clinicas` y `/ceo-warling` | GEO / Conversión | Muy bajo | Alto |

### 🟠 Alta — la entidad y la prueba

| Acción | Dimensión | Esfuerzo | Impacto |
|---|---|---|---|
| **Bloque NAP** en footer y `/contacto`: nombre legal, «Santo Domingo, Distrito Nacional», correo `@grolow.com`, horario, WhatsApp. Más `ContactPoint` / `ContactPage` schema. **El texto visible debe sostenerse sin el schema** (§8.4) | SEO local / GEO | Bajo | Alto |
| **Arreglar `/ceo-warling`**: sitemap + `canonical` + `Person` schema (`@id`, `sameAs` → LinkedIn/GitHub, `knowsAbout`, `worksFor`) + enlace en navegación; y que `founder.url` y el `author` de los artículos apunten a ese `@id` | GEO / SEO | Bajo | Alto |
| **Capturas reales en casos y servicios** — 2–3 pantallas o un vídeo corto del sistema en uso, con `alt` descriptivo. Hoy son **0 imágenes** | SEO / Conversión | Medio | Alto |
| **Casos verificables**: enlace en vivo, testimonio con nombre y rol, plazo de entrega, métrica operativa que el cliente confirme. Etiquetar los proyectos propios | Conversión / GEO | Medio | Alto |
| **Publicar plazos por escrito** y una garantía en lenguaje llano en `/precios` | Conversión / GEO | Bajo | Alto |
| **`areaServed` granular** (Santo Domingo, Distrito Nacional, Santiago, Punta Cana, sectores) | SEO local | Bajo | Alto |

### 🟡 Media

| Acción | Dimensión | Esfuerzo | Impacto |
|---|---|---|---|
| `HowTo` schema sobre «Nuestro método» (ya son 4 pasos) + página `/proceso` con las etapas de Testing y Soporte | AEO / Conversión | Bajo | Medio |
| `<table>` real en la tabla de precios y en la comparativa WordPress-vs-código | AEO | Bajo | Medio |
| Fecha visible en artículos + ampliar el blog (4 temas de cola larga identificados en §5) | SEO / AEO | Medio | Medio |
| **Áreas táctiles a 44×44 px** — 36 elementos en la home | Responsive / A11y | Bajo | Medio |
| **`100vh` → `100dvh`** — 2 instancias | Responsive | Muy bajo | Medio |
| Sustituir Google Analytics por una alternativa ligera (−171 KB) | Rendimiento | Bajo | Medio |

### 🟢 Rápida

| Acción | Esfuerzo |
|---|---|
| Declarar `GPTBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended` en `robots.txt` (permitidos) | Muy bajo |
| Iconos de redes visibles en header/footer | Muy bajo |
| CTA de agenda (Cal.com) junto a «Pedir propuesta» | Bajo |
| 150–250 palabras de marco en `/casos` y `/blog` | Bajo |
| Re-medir rendimiento en producción tras desplegar | Muy bajo |

### Fuera de la lista

| Recomendación de la v2 | Motivo |
|---|---|
| ~~`Offer` / `PriceSpecification` schema~~ | ❌ Ya existía. Error de la v2 (§3.2) |
| ~~`prefers-reduced-motion`~~ | ✅ Resuelto |
| ~~`srcset` / `next/image`~~ | ✅ Resuelto en la home |

---

## 11. Lo que funciona bien

| Fortaleza | Evidencia |
|---|---|
| Disciplina de `title` / `meta` | 19/19 en rango, con keyword + marca + localización |
| Datos estructurados por plantilla | `Service` + `Offer` + `FAQPage` en cada servicio; `Article` + `BreadcrumbList` en cada caso y post; grafo con `@id`. Los importes se derivan de la tabla de precios: schema y página no pueden contradecirse |
| Precios públicos | Rareza en el sector, y el motivo por el que el agente de citación lo puso #1 |
| Honestidad como estrategia | «Sin porcentajes que nadie ha medido», «si no somos la opción correcta, te lo decimos». Es material que una IA prefiere citar — y la razón por la que **no inventar testimonios es la decisión correcta**, aunque duela |
| Accesibilidad | **100/100 Lighthouse**, medido |
| Rendimiento tras la corrección | TBT 2.840 → 10 ms; JS servido −48% |
| `hreflang` bilingüe real | Recíproco y derivado de un registro único: no puede desincronizarse |
| Sin scroll horizontal | Verificado en 5 anchos. El fallo responsive nº 1, y Grolow lo pasa |

---

## Glosario

**SEO** · Optimización para buscadores tradicionales: qué se indexa, por qué términos y en qué posición.

**GEO** — *Generative Engine Optimization* · Optimización para buscadores con IA que redactan una respuesta citando fuentes. Premian entidad clara, autoría verificable y datos coherentes.

**AEO** — *Answer Engine Optimization* · Optimización para fragmentos destacados, «Otras preguntas» y voz. Depende de `FAQPage`/`HowTo` y de encabezados en pregunta con respuesta directa.

**Entidad / `sameAs`** · Una entidad es algo que Google reconoce como tal. `sameAs` son los enlaces a los perfiles oficiales: le dicen a Google «esta marca y ese perfil son lo mismo».

**NAP** — *Name, Address, Phone* · Escritos igual en todas partes. Señal central del SEO local y de la confianza para LLMs.

**TBT** — *Total Blocking Time* · Milisegundos en que la página no responde al usuario tras cargar. Junto a LCP y CLS, uno de los indicadores que Google usa como factor de ranking.

**Throttling simulado vs real** · Simulado (el de PageSpeed) reconstruye la carga sobre un modelo de red y CPU. Real aplica la limitación al navegador y mide. Pueden discrepar mucho; el simulado es el que ve el público.

**`dvh` / `svh` / `lvh`** · Unidades de altura de viewport dinámica / pequeña / grande, que sí tienen en cuenta la barra de direcciones móvil, a diferencia de `vh`.

---

*v3 · 12 de septiembre de 2026. Re-verificación de la auditoría v2 (10-sep) contra el código en producción, con Lighthouse 12.8.2 en ambos modos de throttling y auditoría del DOM en vivo con Playwright a cinco anchos. Quedan fuera de alcance: perfil de enlaces entrantes y autoridad de dominio (usar Ahrefs, Semrush o el informe de enlaces de Search Console una vez verificada la propiedad) y el comportamiento en dispositivo real iOS. Las cifras de rendimiento del build actual se tomaron en localhost: rehacerlas en producción tras desplegar.*
