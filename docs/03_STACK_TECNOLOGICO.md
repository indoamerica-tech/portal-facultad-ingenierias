# ⚙️ Stack Tecnológico
## Portal Facultad de Ingenierías — Universidad Indoamérica

> **Criterios de selección:** Rendimiento, SEO, facilidad de mantenimiento, escalabilidad, capacidad de deploy estático/SSR, y que pueda ser mantenido por un equipo pequeño.

---

## 1. Decisión Principal: Framework

### 1.1 Opción Elegida: **Astro + React**

| Criterio | Justificación |
|----------|--------------|
| **Rendimiento** | Astro genera HTML estático por defecto (0 JS innecesario) → carga ultra rápida |
| **SEO** | SSG/SSR nativo, meta tags, sitemap automático, Open Graph |
| **Contenido** | Content Collections de Astro para noticias, eventos, carreras (archivos Markdown/MDX) |
| **Interactividad** | React para componentes interactivos (Islands Architecture) → solo carga JS donde se necesita |
| **Animaciones** | Compatible con CSS animations, Framer Motion, GSAP |
| **Deploy** | Exporta como sitio estático → Netlify, Vercel, o hosting institucional |
| **Mantenibilidad** | Contenido en Markdown = cualquier persona puede actualizar sin tocar código |
| **DX (Developer Experience)** | TypeScript, hot reload, excelente documentación |

### 1.2 ¿Por qué NO otras opciones?

| Alternativa | Razón de descarte |
|-------------|-------------------|
| **Next.js** | Excesivo para un sitio mayormente informativo, requiere servidor Node.js |
| **WordPress** | El sitio principal ya es WordPress; queremos diferenciarnos y tener más control |
| **HTML/CSS/JS puro** | Difícil de mantener a escala, sin componentes reutilizables |
| **Vue/Nuxt** | Viable, pero React tiene más ecosistema de animaciones (Framer Motion) |
| **Gatsby** | Ecosistema en declive, build times lentos |

---

## 2. Stack Completo

### 2.1 Core

```
┌─────────────────────────────────────────┐
│              STACK PRINCIPAL             │
├─────────────────────────────────────────┤
│                                         │
│  🚀 Astro v5.x        — Framework      │
│  ⚛️  React 19          — UI Components  │
│  📘 TypeScript         — Type Safety    │
│  🎨 Vanilla CSS        — Estilos        │
│     (CSS Custom Props + CSS Modules)    │
│                                         │
└─────────────────────────────────────────┘
```

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **Astro** | ^5.x | Framework principal (SSG/SSR, routing, content) |
| **React** | ^19.x | Componentes interactivos (islands) |
| **TypeScript** | ^5.x | Tipado estático, mejor DX |
| **CSS Vanilla** | — | Estilos con CSS Custom Properties + CSS Modules |

### 2.2 Animaciones y Visual

| Librería | Propósito |
|----------|-----------|
| **CSS Animations/Transitions** | Micro-interacciones, hovers, transiciones simples |
| **Intersection Observer API** | Scroll reveal animations (nativo, sin dependencia) |
| **GSAP** (opcional) | Animaciones complejas de timeline si se requieren |
| **Framer Motion** (React) | Animaciones en componentes React interactivos |
| **Lottie** (opcional) | Animaciones vectoriales para íconos y micro-estados |

### 2.3 Contenido y Datos

| Herramienta | Propósito |
|-------------|-----------|
| **Astro Content Collections** | Gestión de noticias, eventos, carreras (Markdown/MDX) |
| **Archivos Markdown (.md)** | Contenido de páginas estáticas |
| **JSON estático** | Datos de formularios, FAQs, enlaces rápidos |
| **Archivos PDF** | Formularios descargables (se sirven desde `/public/docs/`) |

### 2.4 Iconos y Assets

| Herramienta | Propósito |
|-------------|-----------|
| **Lucide Icons** | Sistema de iconos consistente |
| **SVG inline** | Logo, ilustraciones personalizadas |
| **Astro Image** | Optimización automática de imágenes (WebP, lazy loading) |

### 2.5 SEO y Performance

| Herramienta | Propósito |
|-------------|-----------|
| **@astrojs/sitemap** | Generación automática de sitemap.xml |
| **Astro Head / SEO** | Meta tags, Open Graph, Twitter Cards |
| **Lighthouse CI** | Auditoría de rendimiento en cada build |

### 2.6 Deploy y Hosting

| Opción | Detalles |
|--------|----------|
| **Opción A: Netlify** | Deploy automático desde Git, CDN global, formularios, gratis (tier free) |
| **Opción B: Vercel** | Deploy automático, Edge Functions si se necesitan, gratis (hobby) |
| **Opción C: GitHub Pages** | Hosting estático gratuito, CI/CD con GitHub Actions |
| **Opción D: Hosting institucional** | Si la universidad provee servidor, se sube el build estático |

> **Recomendación:** Netlify o Vercel para desarrollo y staging. Si la universidad requiere hosting propio, se entrega el build estático (`/dist/`).

---

## 3. Estructura de Dependencias

```json
{
  "dependencies": {
    "astro": "^5.x",
    "@astrojs/react": "^4.x",
    "@astrojs/sitemap": "^3.x",
    "react": "^19.x",
    "react-dom": "^19.x",
    "lucide-react": "^0.4xx",
    "framer-motion": "^12.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "@types/react": "^19.x",
    "@types/react-dom": "^19.x"
  }
}
```

> **Nota:** Las versiones exactas se definirán al momento de inicializar el proyecto.

---

## 4. Gestión de Contenido

### 4.1 Content Collections (Astro)

El contenido dinámico (noticias, eventos, carreras) se maneja con archivos Markdown en carpetas organizadas:

```
src/content/
├── noticias/
│   ├── 2026-07-01-semana-ingenierias.md
│   ├── 2026-06-15-hackaton-resultados.md
│   └── ...
├── eventos/
│   ├── semana-ingenierias-2026.md
│   ├── taller-ia-julio.md
│   └── ...
├── carreras/
│   ├── mecatronica.md
│   ├── ingenieria-software.md
│   ├── ingenieria-industrial.md
│   ├── electricidad.md
│   ├── ingenieria-civil.md
│   └── ingenieria-ti.md
└── tramites/
    ├── matriculas.md
    ├── titulacion.md
    ├── justificacion-faltas.md
    ├── homologaciones.md
    ├── practicas-preprofesionales.md
    └── vinculacion.md
```

### 4.2 Ejemplo de Frontmatter (Noticia)

```markdown
---
title: "Resultados del Hackaton de Ingenierías 2026"
description: "Los equipos ganadores presentaron soluciones innovadoras..."
date: 2026-07-01
author: "Facultad de Ingenierías"
image: "./hackaton-2026.jpg"
tags: ["hackaton", "software", "innovación"]
featured: true
---

Contenido de la noticia en Markdown...
```

### 4.3 Ventajas de este Enfoque

- ✅ **Sin base de datos** — No requiere backend ni servidor
- ✅ **Versionable** — Todo el contenido está en Git
- ✅ **Fácil de editar** — Markdown es universal, cualquiera puede actualizar
- ✅ **Tipado** — Los schemas se validan con Zod en Astro
- ✅ **Rápido** — Se genera HTML estático en build time
- ✅ **Portable** — Se puede migrar fácilmente a cualquier plataforma

---

## 5. Herramientas de Desarrollo

| Herramienta | Propósito |
|-------------|-----------|
| **VS Code / Cursor** | Editor de código |
| **Git + GitHub** | Control de versiones |
| **ESLint** | Linting de código |
| **Prettier** | Formateo de código |
| **Astro Check** | Validación de templates Astro |

---

## 6. Flujo de Trabajo

```
1. Desarrollo local (astro dev)
   ↓
2. Commit + Push a GitHub
   ↓
3. Build automático (astro build)
   ↓
4. Deploy a staging (Preview URL)
   ↓
5. Revisión y aprobación
   ↓
6. Deploy a producción
```

---

## 7. Consideraciones Futuras

| Feature | Tecnología Sugerida |
|---------|-------------------|
| CMS visual (para no-técnicos) | Decap CMS (Git-based, sin backend) |
| Formularios de contacto | Netlify Forms o Formspree |
| Búsqueda en el sitio | Pagefind (búsqueda estática) |
| Analytics | Plausible Analytics o Google Analytics |
| Notificaciones push | Web Push API |
| Integración con SGA | API REST si la universidad la expone |
| Chat/FAQ bot | Widget personalizado o integración |
