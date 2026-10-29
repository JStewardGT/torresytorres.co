# TORRES & TORRES Abogados Asociados

Sitio web corporativo de alta gama para la firma jurídica **"TORRES & TORRES Abogados Asociados"**, diseñado con inspiración editorial de lujo europeo (referencia: [Lacourte Raquin Tatar](https://lacourte.com/en/home) por Studio Bonhomme) y desarrollado bajo una arquitectura de máximo rendimiento en **Next.js (App Router)** con exportación estática (`output: 'export'`), animaciones GSAP sincronizadas con Lenis y WebGL ligero con React Three Fiber (R3F).

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
   - La suite 3D de `@react-three/fiber` y `three` está completamente aislada en `src/components/canvas/HeroCanvasWrapper.tsx` y se carga bajo demanda mediante `next/dynamic({ ssr: false })` con un elegante fallback visual en CSS puro (`CanvasFallback.tsx`).
   - El bundle inicial de First Load JS se mantiene ultra ligero (~159 kB total).
2. **Renderizado Bajo Demanda (On-Demand Loop):**
   - El canvas 3D opera estrictamente con `frameloop="demand"` y `dpr={[1, 1.5]}`, consumiendo **0% de GPU/CPU** en estado estático e invalidando frames únicamente durante interacción de scroll o movimiento del cursor.
3. **Animaciones GSAP Limpias:**
   - Implementadas con `@gsap/react` (`useGSAP()`) y `gsap.context()` para eliminación automática de listeners al desmontar componentes.
   - Puntero magnético de precisión implementado con `gsap.quickTo()` para garantizar 60fps estables.
4. **Smooth Scroll Sincronizado:**
   - `lenis` integrado directamente al ticker de GSAP (`gsap.ticker.add`) para que `ScrollTrigger` y el desplazamiento inercial estén sincronizados a nivel de frame.
5. **SEO & Accesibilidad:**
   - Datos estructurados `JSON-LD` (`LegalService` / `Attorney`) incluidos en `<head>` detallando los 10 servicios oficiales, horarios y ubicación en Bogotá D.C.

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

## 🛠️ Comandos de Ejecución

```bash
# Desarrollo local
npm run dev

# Compilación y generación de exportación estática ('out/')
npm run build

# Previsualización del sitio estático exportado
npx serve out
```
