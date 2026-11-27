# 🏗️ Arquitectura del Proyecto
## Portal Facultad de Ingenierías — Universidad Indoamérica

---

## 1. Estructura de Carpetas

```
Sitio_Web_INGENIERIAS/
├── docs/                              # 📚 Documentación del proyecto (NO se deploya)
│   ├── 00_INDICE_PROYECTO.md
│   ├── 01_ANALISIS_SITIO_ACTUAL.md
│   ├── 02_GUIA_DISENO_BRANDING.md
│   ├── 03_STACK_TECNOLOGICO.md
│   ├── 04_ARQUITECTURA.md
│   ├── 05_MAPA_CONTENIDO.md
│   ├── 06_FUNCIONALIDADES.md
│   ├── 07_ROADMAP.md
│   └── assets/                        # Recursos de la documentación
│
├── info_entregada/                    # 📁 Archivos entregados por la facultad
│   ├── Instructivo graduación.pdf
│   ├── Justificacion de faltas-II.pdf
│   └── Justificacion de faltas-TI.pdf
│
├── src/                               # 💻 Código fuente
│   ├── components/                    # Componentes reutilizables
│   │   ├── layout/                    # Layout global
│   │   │   ├── Header.astro           # Navegación principal
│   │   │   ├── Footer.astro           # Pie de página
│   │   │   ├── MobileMenu.astro       # Menú hamburguesa
│   │   │   ├── Breadcrumb.astro       # Migas de pan
│   │   │   └── SEOHead.astro          # Meta tags SEO
│   │   │
│   │   ├── ui/                        # Componentes UI base
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   ├── Badge.astro
│   │   │   ├── Tag.astro
│   │   │   ├── Accordion.astro
│   │   │   ├── Modal.astro
│   │   │   ├── Tabs.astro
│   │   │   ├── SearchBar.astro
│   │   │   └── Icon.astro
│   │   │
│   │   ├── sections/                  # Secciones de página
│   │   │   ├── HeroSection.astro      # Hero principal
│   │   │   ├── NewsGrid.astro         # Grid de noticias
│   │   │   ├── QuickAccess.astro      # Accesos rápidos
│   │   │   ├── EventCalendar.astro    # Calendario de eventos
│   │   │   ├── CareerCards.astro      # Cards de carreras
│   │   │   ├── StatsCounter.astro     # Contadores animados
│   │   │   ├── TestimonialSlider.astro # Testimonios
│   │   │   └── CTABanner.astro        # Banner de llamada a la acción
│   │   │
│   │   └── interactive/               # Componentes React (islands)
│   │       ├── SearchModal.tsx        # Búsqueda interactiva
│   │       ├── EventCalendar.tsx      # Calendario interactivo
│   │       ├── FAQAccordion.tsx       # FAQ con búsqueda
│   │       ├── FormDownloader.tsx     # Descargador de formularios
│   │       ├── CareerFilter.tsx       # Filtro de carreras
│   │       └── ThemeToggle.tsx        # Toggle dark/light mode
│   │
│   ├── layouts/                       # Layouts de página
│   │   ├── BaseLayout.astro           # Layout base (HTML, head, scripts)
│   │   ├── PageLayout.astro           # Layout con header + footer
│   │   ├── TramiteLayout.astro        # Layout para páginas de trámites
│   │   └── PostLayout.astro           # Layout para noticias/blog
│   │
│   ├── pages/                         # Páginas (rutas automáticas)
│   │   ├── index.astro                # /  — Página de inicio
│   │   ├── about.astro                # /about — Sobre la Facultad
│   │   │
│   │   ├── carreras/                  # /carreras — Carreras
│   │   │   ├── index.astro            # Lista de todas las carreras
│   │   │   └── [slug].astro           # /carreras/mecatronica, etc.
│   │   │
│   │   ├── tramites/                  # /tramites — Trámites y procesos
│   │   │   ├── index.astro            # Lista de todos los trámites
│   │   │   ├── matriculas.astro       # /tramites/matriculas
│   │   │   ├── titulacion.astro       # /tramites/titulacion
│   │   │   ├── justificacion-faltas.astro
│   │   │   ├── homologaciones.astro
│   │   │   ├── practicas.astro
│   │   │   └── vinculacion.astro
│   │   │
│   │   ├── eventos/                   # /eventos — Eventos
│   │   │   ├── index.astro            # Calendario y lista de eventos
│   │   │   └── [slug].astro           # Detalle de evento
│   │   │
│   │   ├── noticias/                  # /noticias — Noticias
│   │   │   ├── index.astro            # Lista de noticias
│   │   │   └── [slug].astro           # Detalle de noticia
│   │   │
│   │   ├── formularios.astro          # /formularios — Formularios descargables
│   │   ├── faq.astro                  # /faq — Preguntas frecuentes
│   │   └── 404.astro                  # Página de error 404
│   │
│   ├── content/                       # Contenido (Markdown/MDX)
│   │   ├── config.ts                  # Schemas de content collections
│   │   ├── noticias/                  # Archivos .md de noticias
│   │   ├── eventos/                   # Archivos .md de eventos
│   │   ├── carreras/                  # Archivos .md de carreras
│   │   └── tramites/                  # Archivos .md de trámites
│   │
│   ├── styles/                        # Estilos CSS
│   │   ├── global.css                 # Reset, variables, base styles
│   │   ├── typography.css             # Estilos tipográficos
│   │   ├── animations.css             # Keyframes y animaciones
│   │   ├── components.css             # Estilos de componentes comunes
│   │   └── utilities.css              # Clases utilitarias custom
│   │
│   ├── scripts/                       # JavaScript client-side
│   │   ├── scroll-animations.js       # Intersection Observer para scroll reveal
│   │   ├── theme.js                   # Dark/Light mode toggle
│   │   └── mobile-menu.js             # Toggle menú móvil
│   │
│   ├── utils/                         # Funciones utilitarias
│   │   ├── formatDate.ts              # Formateo de fechas
│   │   ├── slugify.ts                 # Generador de slugs
│   │   └── constants.ts               # Constantes globales
│   │
│   └── assets/                        # Assets procesados por Astro
│       ├── images/                    # Imágenes (se optimizan en build)
│       │   ├── logo/
│       │   ├── hero/
│       │   ├── carreras/
│       │   └── eventos/
│       └── icons/                     # SVGs personalizados
│
├── public/                            # Archivos estáticos (NO procesados)
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── og-image.png                   # Open Graph image
│   ├── robots.txt
│   └── docs/                          # PDFs y documentos descargables
│       ├── formularios/
│       └── instructivos/
│
├── astro.config.mjs                   # Configuración de Astro
├── tsconfig.json                      # Configuración TypeScript
├── package.json                       # Dependencias
├── .gitignore
└── README.md                          # Instrucciones del proyecto
```

---

## 2. Diagrama de Arquitectura

```
┌────────────────────────────────────────────────────────────┐
│                        USUARIO                              │
│                    (Navegador Web)                           │
└─────────────────────────┬──────────────────────────────────┘
                          │
                          ▼
┌────────────────────────────────────────────────────────────┐
│                     CDN / HOSTING                           │
│              (Netlify / Vercel / Static)                     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                  HTML ESTÁTICO                        │   │
│  │              (Pre-renderizado por Astro)              │   │
│  │                                                      │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐    │   │
│  │  │   Inicio   │  │  Carreras  │  │  Trámites  │    │   │
│  │  │   (.html)  │  │  (.html)   │  │  (.html)   │    │   │
│  │  └────────────┘  └────────────┘  └────────────┘    │   │
│  │                                                      │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐    │   │
│  │  │  Eventos   │  │  Noticias  │  │    FAQ     │    │   │
│  │  │  (.html)   │  │  (.html)   │  │  (.html)   │    │   │
│  │  └────────────┘  └────────────┘  └────────────┘    │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │               ISLANDS (React Hydrated)               │   │
│  │          Solo se cargan JS donde se necesita          │   │
│  │                                                      │   │
│  │  🏝️ SearchModal   🏝️ EventCalendar                  │   │
│  │  🏝️ FAQAccordion  🏝️ ThemeToggle                    │   │
│  │  🏝️ CareerFilter  🏝️ FormDownloader                 │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                   ASSETS ESTÁTICOS                    │   │
│  │                                                      │   │
│  │  📄 PDFs (formularios, instructivos)                 │   │
│  │  🖼️ Imágenes (optimizadas WebP/AVIF)                │   │
│  │  🎨 CSS (minificado)                                │   │
│  │  ⚡ JS (minificado, tree-shaken)                     │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────┘
```

---

## 3. Islands Architecture (Patrón de Astro)

El concepto clave de Astro es que la mayoría de la página es **HTML estático** y solo los componentes que necesitan interactividad se "hidratan" con JavaScript (React).

```
┌─────────────────────────────────────────────────┐
│                 Página de Inicio                 │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │  HEADER (Astro)            [HTML puro]   │   │
│  │  - Logo, nav links                       │   │
│  │  - 🏝️ ThemeToggle (React)  [Hydrated]   │   │
│  │  - 🏝️ SearchButton (React) [Hydrated]   │   │
│  └──────────────────────────────────────────┘   │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │  HERO SECTION (Astro)      [HTML puro]   │   │
│  │  - Título, subtítulo, CTA                │   │
│  │  - Animaciones CSS puras                 │   │
│  └──────────────────────────────────────────┘   │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │  NOTICIAS GRID (Astro)     [HTML puro]   │   │
│  │  - Cards estáticas de noticias           │   │
│  │  - Scroll animations (CSS/IO API)        │   │
│  └──────────────────────────────────────────┘   │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │  🏝️ CALENDARIO (React)    [Hydrated]    │   │
│  │  - Interactivo, cambio de mes            │   │
│  │  - client:visible (lazy hydration)       │   │
│  └──────────────────────────────────────────┘   │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │  FOOTER (Astro)            [HTML puro]   │   │
│  └──────────────────────────────────────────┘   │
│                                                  │
└─────────────────────────────────────────────────┘

Resultado: ~95% HTML estático + ~5% JS hidratado
         = Carga rápida + Interactividad donde importa
```

---

## 4. Flujo de Datos

### 4.1 Contenido Estático (Build Time)

```
Markdown/MDX files (src/content/)
       │
       ▼
Astro Content Collections (Schema validation con Zod)
       │
       ▼
Astro Build Process (astro build)
       │
       ▼
HTML estático + CSS + JS mínimo (dist/)
       │
       ▼
Deploy a CDN
```

### 4.2 Contenido Interactivo (Client Side)

```
React Island Component
       │
       ▼
client:visible / client:load directive
       │
       ▼
Hydration solo cuando es necesario
       │
       ▼
Estado local (useState/useReducer)
```

---

## 5. Routing

### 5.1 Mapa de Rutas

| Ruta | Archivo | Descripción |
|------|---------|-------------|
| `/` | `pages/index.astro` | Homepage |
| `/carreras` | `pages/carreras/index.astro` | Listado de carreras |
| `/carreras/[slug]` | `pages/carreras/[slug].astro` | Detalle de carrera |
| `/tramites` | `pages/tramites/index.astro` | Hub de trámites |
| `/tramites/matriculas` | `pages/tramites/matriculas.astro` | Proceso de matrículas |
| `/tramites/titulacion` | `pages/tramites/titulacion.astro` | Proceso de titulación |
| `/tramites/justificacion-faltas` | `pages/tramites/justificacion-faltas.astro` | Justificación de faltas |
| `/tramites/homologaciones` | `pages/tramites/homologaciones.astro` | Homologaciones |
| `/tramites/practicas` | `pages/tramites/practicas.astro` | Prácticas preprofesionales |
| `/tramites/vinculacion` | `pages/tramites/vinculacion.astro` | Vinculación |
| `/eventos` | `pages/eventos/index.astro` | Calendario y lista de eventos |
| `/eventos/[slug]` | `pages/eventos/[slug].astro` | Detalle de evento |
| `/noticias` | `pages/noticias/index.astro` | Lista de noticias |
| `/noticias/[slug]` | `pages/noticias/[slug].astro` | Detalle de noticia |
| `/formularios` | `pages/formularios.astro` | Formularios descargables |
| `/faq` | `pages/faq.astro` | Preguntas frecuentes |
| `/404` | `pages/404.astro` | Página no encontrada |

### 5.2 Navegación Principal

```
Header Nav:
├── Inicio
├── Carreras ▾
│   ├── Mecatrónica
│   ├── Ingeniería Industrial
│   ├── Ingeniería en Software
│   ├── Electricidad
│   ├── Ingeniería Civil
│   └── Ingeniería en TI
├── Trámites y Procesos ▾
│   ├── Matrículas
│   ├── Titulación
│   ├── Justificación de Faltas
│   ├── Homologaciones
│   ├── Prácticas Preprofesionales
│   └── Vinculación
├── Eventos
├── Noticias
├── Formularios
├── FAQ
└── [Botón: Portal UTI] (link externo)
```

---

## 6. SEO y Meta Tags

### 6.1 Componente SEOHead

Cada página incluye un componente `SEOHead.astro` con:

```astro
---
interface Props {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  publishDate?: string;
}
---
<title>{title} | Facultad de Ingenierías — Universidad Indoamérica</title>
<meta name="description" content={description} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={image || '/og-image.png'} />
<meta property="og:type" content={type || 'website'} />
<link rel="canonical" href={Astro.url} />
```

---

## 7. Performance Budget

| Métrica | Objetivo |
|---------|----------|
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | ≥ 90 |
| Lighthouse SEO | ≥ 95 |
| First Contentful Paint (FCP) | < 1.5s |
| Largest Contentful Paint (LCP) | < 2.5s |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Total Blocking Time (TBT) | < 200ms |
| Total JS bundle | < 50KB (gzipped) |
