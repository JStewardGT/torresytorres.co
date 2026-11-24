# TORRES & TORRES Abogados Asociados

Sitio web corporativo de alta gama para la firma jurídica **"TORRES & TORRES Abogados Asociados"**, diseñado con inspiración editorial de lujo europeo (referencia: [Lacourte Raquin Tatar](https://lacourte.com/en/home) por Studio Bonhomme) y desarrollado bajo una arquitectura moderna de máximo rendimiento en **Astro 5** con islas de componentes **React**, animaciones GSAP sincronizadas con Lenis y WebGL ligero con React Three Fiber (R3F).

---

## 🏛️ Dirección de Arte y Estética
- **Paleta Cromática:**
  - `bg-primary-dark` (`#081225`): Azul medianoche profundo para atmósfera institucional, Hero y Carrusel 3D.
  - `bg-secondary-dark` (`#0D1C39`): Azul Oxford para tarjetas de pilares y paneles laterales.
  - `bg-light` (`#E4E3E3` / `#F4F4F2`): Color piedra editorial para secciones de lectura y metodología de la firma.
  - `accent-ice` (`#D1E3FF`): Azul hielo para micro-interacciones, píldoras y estados interactivos.
  - `accent-gold` (`#C5A880`): Tono oro sobrio para monograma `T&T` y acentos tipográficos selectos.
- **Tipografía:**
  - **Display / Títulos:** `Cormorant Garamond` (Serif editorial de alto contraste y cursivas fluidas).
  - **Cuerpo y Datos:** `Plus Jakarta Sans` e `Inter` (Sans-serif geométrica para lectura legal y numeración técnica `01`, `02`).

---

## ⚡ Reglas de Oro de Rendimiento Cumplidas
1. **Zero Main-Thread Blocking en Carga Inicial:**
   - La suite 3D de `@react-three/fiber` y `three` está completamente aislada en `src/components/canvas/HeroCanvasWrapper.tsx` y se carga bajo demanda mediante `React.lazy` y `Suspense` con un elegante fallback visual en CSS puro (`CanvasFallback.tsx`).
   - Astro genera el HTML estático en tiempo de compilación y empaqueta Three.js en un chunk asíncrono diferido (`dist/_astro/HeroCanvas.*.js`), logrando un First Load JS ultra liviano (~44 kB gzipped de runtime cliente).
2. **Renderizado Bajo Demanda (On-Demand Loop):**
   - El canvas 3D opera estrictamente con `frameloop="demand"` y `dpr={[1, 1.5]}`, consumiendo **0% de GPU/CPU** en estado estático e invalidando frames únicamente durante interacción de scroll o movimiento del cursor.
3. **Animaciones GSAP Limpias:**
   - Implementadas con `@gsap/react` (`useGSAP()`) y `ScrollTrigger` para manipulación de timelines y sección horizontal con pineo interactivo.
   - Puntero magnético de precisión implementado con `gsap.quickTo()` para garantizar 60fps estables.
4. **Smooth Scroll Sincronizado:**
   - `lenis` integrado directamente al ticker de GSAP (`gsap.ticker.add`) para que `ScrollTrigger` y el desplazamiento inercial estén sincronizados a nivel de frame en `SmoothScrollProvider`.
5. **SEO & Accesibilidad:**
   - Estructurado en `Layout.astro` con datos `JSON-LD` (`LegalService`), OpenGraph, Twitter Cards, Google Analytics (GTag) y Microsoft Clarity, detallando los 10 servicios oficiales, horarios y ubicación en Bogotá D.C.

---

## ⚖️ Catálogo de los 10 Servicios y 4 Pilares
El sitio estructura y desglosa con exactitud las 10 áreas de práctica de la firma:

### Pilar 01 — Derecho Corporativo y Negocios (`CORP-01`)
1. **Derecho de sociedades:** Reorganización societaria, pactos de socios, M&A y gobierno corporativo.
2. **Derecho empresarial:** Contratación mercantil omnicanal, blindaje operativo y distribución.
3. **Consultoría empresarial:** Diagnóstico legal continuo (Legal Health Check) y estrategia para juntas directivas.
4. **Gestión de proyectos:** Estructuración y cierre contractual de megaproyectos (EPC, O&M, Dispute Boards).

### Pilar 02 — Litigios, Consumo y Responsabilidad (`LIT-02`)
5. **Derecho del consumidor:** Defensa administrativa ante órganos reguladores y auditoría preventiva de garantías.
6. **Derecho de daños personales:** Responsabilidad civil contractual y extracontractual, tasación de perjuicios e indemnizaciones.

### Pilar 03 — Patrimonio, Bienes y Sucesiones (`PAT-03`)
7. **Derecho de sucesiones:** Planificación hereditaria fiduciaria, testamentos solemnes y partición pacífica.
8. **Derecho de propiedad:** Estudios de títulos a 20+ años, saneamiento inmobiliario y litigio reivindicatorio.

### Pilar 04 — Relaciones Laborales y Estrategia Legal (`LAB-04`)
9. **Derecho laboral:** Gestión patronal, compliance de nómina, desvinculaciones directivas y contencioso laboral.
10. **Consultoría legal:** Mesa de ayuda normativa on-demand con emisión de conceptos vinculantes.

---

## 📁 Estructura del Proyecto

```
torresytorres.co/
├── astro.config.mjs         # Configuración de Astro, Vite SSR y alias
├── tailwind.config.ts       # Tokens de diseño, fuentes y paleta cromática
├── tsconfig.json            # Configuración TypeScript estricta para Astro
├── public/                  # Archivos estáticos y .well-known
├── src/
│   ├── env.d.ts             # Tipos de Astro y cliente
│   ├── layouts/
│   │   └── Layout.astro     # Plantilla base (SEO, JSON-LD, Analytics, Fonts)
│   ├── pages/
│   │   ├── index.astro      # Página principal (isla React con client:load)
│   │   └── 404.astro        # Página 404 estática
│   ├── styles/
│   │   └── globals.css      # Estilos globales, Lenis y directivas Tailwind
│   ├── data/
│   │   └── services.ts      # Modelos y contenidos de los 10 servicios y 4 pilares
│   └── components/
│       ├── App.tsx          # Wrapper raíz de scroll y cursor
│       ├── HomePage.tsx     # Ensamblaje interactivo de secciones
│       ├── canvas/          # Three.js WebGL & fallback
│       ├── providers/       # SmoothScrollProvider (Lenis + GSAP)
│       ├── sections/        # Hero, Carrusel, Catálogo Drawer, Firm, Contacto
│       └── ui/              # Header, FullscreenMenu, Footer, CustomCursor
└── scripts/
    └── cloudflare-worker-resend.js # Worker serverless para envío de formularios
```

---

## 🛠️ Comandos de Ejecución

```bash
# Desarrollo local
npm run dev

# Chequeo estático de tipos y templates
npm run check

# Compilación y generación de salida estática ('dist/')
npm run build

# Previsualización del sitio estático generado
npm run preview
```

---

## 🌐 Variables de Entorno

Crear un archivo `.env.local` en la raíz del proyecto para configurar el endpoint del formulario de contacto:

```env
PUBLIC_CONTACT_ENDPOINT=https://torres-contact-api.johans-galeanot.workers.dev
```

*(También se mantiene compatibilidad retrospectiva con `NEXT_PUBLIC_CONTACT_ENDPOINT`).*

## Publicación y seguimiento SEO

Astro genera las fichas `/servicios/<slug>/`, `/robots.txt` y `/sitemap.xml` a partir del catálogo y del dominio configurado en `astro.config.mjs`.

1. Identificar en Cloudflare el proyecto u origen que sirve `torresytorres.co` y publicar el resultado de `npm run build` desde `dist/`. Configurar el alias `www` con una redirección permanente que preserve la ruta y la consulta.
2. Confirmar que la portada, las fichas, el sitemap y robots responden `200`; una ruta desconocida debe devolver `404`. Si Cloudflare administra robots.txt, comprobar que la respuesta pública conserva el sitemap y el acceso de los rastreadores de búsqueda. Revisar Googlebot mediante Inspección de URL y los demás rastreadores identificados en los registros del CDN. Cualquier política para rastreadores de entrenamiento se decide por separado.
3. Enviar `https://torresytorres.co/sitemap.xml` en Google Search Console y Bing Webmaster Tools. Revisar las canónicas y medir el rendimiento móvil de la portada con WebGL activo. Comprobar en GA4 que un envío real de consulta emite `generate_lead`. Registrar `lead_source_path` como dimensión de evento para distinguir la portada de la ficha de origen.
4. Validar con la firma la dirección, el teléfono y los horarios antes de sincronizarlos con el Perfil de Empresa de Google. Incorporar las fichas de abogados, sus credenciales, sus especialidades y las fechas de revisión cuando la firma confirme esos datos.
5. A los 30, 60 y 90 días, registrar páginas indexadas, impresiones, clics y consultas recibidas por página de entrada. Comparar búsquedas de marca con búsquedas por problema y ciudad. Repetir mensualmente en asistentes con búsqueda web las mismas preguntas y registrar fecha, asistente, firma mencionada, URL citada y exactitud de los datos. Usar como consultas iniciales «¿Qué firma en Bogotá asesora en conflictos entre socios?», «¿Qué abogados en Bogotá asesoran a empresas en defensa del consumidor?», «¿Qué firma en Bogotá asesora en sucesiones familiares?» y «¿Qué abogados en Bogotá asesoran a empleadores en asuntos laborales?».
