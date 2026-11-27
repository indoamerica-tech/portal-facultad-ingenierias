# 📅 Roadmap de Desarrollo
## Portal Facultad de Ingenierías — Universidad Indoamérica

---

## Visión General de Fases

```
FASE 0          FASE 1              FASE 2              FASE 3
Planificación   Foundation & Core   Contenido & UX      Polish & Launch
─────────────   ─────────────────   ─────────────────   ─────────────────
[██████████]    [                ]  [                ]  [                ]
  Completada       Pendiente           Pendiente           Pendiente

1-2 días         5-7 días             4-5 días            3-4 días
```

---

## Fase 0: Planificación ✅

> **Estado:** Completada  
> **Duración:** 1-2 días  

| Tarea | Estado | Entregable |
|-------|--------|------------|
| Análisis del sitio actual | ✅ | `01_ANALISIS_SITIO_ACTUAL.md` |
| Guía de diseño y branding | ✅ | `02_GUIA_DISENO_BRANDING.md` |
| Definición del stack | ✅ | `03_STACK_TECNOLOGICO.md` |
| Arquitectura del proyecto | ✅ | `04_ARQUITECTURA.md` |
| Mapa de contenido | ✅ | `05_MAPA_CONTENIDO.md` |
| Funcionalidades detalladas | ✅ | `06_FUNCIONALIDADES.md` |
| Roadmap | ✅ | `07_ROADMAP.md` (este archivo) |

---

## Fase 1: Foundation & Core 🔲

> **Estado:** Pendiente  
> **Duración estimada:** 5-7 días  

### Sprint 1.1 — Setup del Proyecto (Día 1)

| Tarea | Prioridad | Estimación |
|-------|-----------|------------|
| Inicializar proyecto Astro + React + TypeScript | 🟢 Alta | 30 min |
| Configurar estructura de carpetas | 🟢 Alta | 30 min |
| Configurar CSS global (variables, reset, tipografía) | 🟢 Alta | 2 hrs |
| Configurar content collections (schemas) | 🟢 Alta | 1 hr |
| Setup de Git + .gitignore | 🟢 Alta | 15 min |

### Sprint 1.2 — Layout Base (Días 2-3)

| Tarea | Prioridad | Estimación |
|-------|-----------|------------|
| `BaseLayout.astro` — HTML base, head, scripts | 🟢 Alta | 1 hr |
| `Header.astro` — Navegación desktop con dropdowns | 🟢 Alta | 3 hrs |
| `MobileMenu.astro` — Menú hamburguesa responsive | 🟢 Alta | 2 hrs |
| `Footer.astro` — Footer completo con links | 🟢 Alta | 2 hrs |
| `SEOHead.astro` — Meta tags dinámicos | 🟢 Alta | 1 hr |
| `Breadcrumb.astro` — Migas de pan | 🟡 Media | 30 min |
| Sistema de scroll animations (JS) | 🟢 Alta | 2 hrs |
| Dark/Light mode toggle | 🟡 Media | 1.5 hrs |

### Sprint 1.3 — Componentes UI Base (Días 3-4)

| Tarea | Prioridad | Estimación |
|-------|-----------|------------|
| `Button.astro` — Variantes (primary, secondary, outline, ghost) | 🟢 Alta | 1 hr |
| `Card.astro` — Variantes (default, career, news, event, tramite) | 🟢 Alta | 2 hrs |
| `Badge.astro` — Badges de estado y categoría | 🟡 Media | 30 min |
| `Tag.astro` — Tags de categoría | 🟡 Media | 30 min |
| `Accordion.astro` — Para FAQ y contenido expandible | 🟡 Media | 1 hr |
| `Tabs.astro` — Para filtros y contenido tabulado | 🟡 Media | 1.5 hrs |
| `Icon.astro` — Wrapper de Lucide Icons | 🟢 Alta | 30 min |

### Sprint 1.4 — Página de Inicio (Días 4-6)

| Tarea | Prioridad | Estimación |
|-------|-----------|------------|
| `HeroSection.astro` — Hero con animaciones y gradientes | 🟢 Alta | 3 hrs |
| `QuickAccess.astro` — Grid de accesos rápidos | 🟢 Alta | 2 hrs |
| `NewsGrid.astro` — Noticias destacadas (mock data) | 🟢 Alta | 2 hrs |
| `CareerCards.astro` — Grid de carreras | 🟢 Alta | 2 hrs |
| `StatsCounter.astro` — Contadores animados | 🟡 Media | 1.5 hrs |
| `CTABanner.astro` — Banner de llamada a acción | 🟡 Media | 1 hr |
| Sección de avisos importantes | 🟢 Alta | 1 hr |
| Sección de próximos eventos (estática) | 🟡 Media | 1.5 hrs |
| Integración completa de la homepage | 🟢 Alta | 2 hrs |

### Sprint 1.5 — Páginas de Trámites (Días 6-7)

| Tarea | Prioridad | Estimación |
|-------|-----------|------------|
| `TramiteLayout.astro` — Layout para trámites | 🟢 Alta | 1 hr |
| `/tramites/index.astro` — Hub de trámites | 🟢 Alta | 2 hrs |
| `/tramites/matriculas.astro` | 🟢 Alta | 1.5 hrs |
| `/tramites/titulacion.astro` | 🟢 Alta | 1.5 hrs |
| `/tramites/justificacion-faltas.astro` | 🟢 Alta | 1.5 hrs |
| `/tramites/homologaciones.astro` | 🟡 Media | 1 hr |
| `/tramites/practicas.astro` | 🟡 Media | 1 hr |
| `/tramites/vinculacion.astro` | 🟡 Media | 1 hr |
| Timeline visual para procesos | 🟢 Alta | 2 hrs |

**Entregable Fase 1:** Homepage completa + 6 páginas de trámites + Layout responsivo + Dark mode

---

## Fase 2: Contenido & UX 🔲

> **Estado:** Pendiente  
> **Duración estimada:** 4-5 días  

### Sprint 2.1 — Carreras (Días 1-2)

| Tarea | Prioridad | Estimación |
|-------|-----------|------------|
| Contenido Markdown para 6 carreras | 🟢 Alta | 2 hrs |
| `/carreras/index.astro` — Listado con filtros | 🟢 Alta | 2 hrs |
| `/carreras/[slug].astro` — Página detalle | 🟢 Alta | 3 hrs |
| `CareerFilter.tsx` — Filtros interactivos (React) | 🟡 Media | 2 hrs |
| Animaciones de filtrado | 🟡 Media | 1 hr |

### Sprint 2.2 — Noticias y Eventos (Días 2-3)

| Tarea | Prioridad | Estimación |
|-------|-----------|------------|
| Contenido Markdown de prueba (5 noticias, 5 eventos) | 🟢 Alta | 1.5 hrs |
| `/noticias/index.astro` — Grid de noticias | 🟢 Alta | 2 hrs |
| `/noticias/[slug].astro` — Detalle de noticia | 🟢 Alta | 2 hrs |
| `PostLayout.astro` — Layout de post | 🟢 Alta | 1 hr |
| `/eventos/index.astro` — Lista + calendario | 🟢 Alta | 2 hrs |
| `/eventos/[slug].astro` — Detalle de evento | 🟢 Alta | 2 hrs |
| `EventCalendar.tsx` — Calendario interactivo (React) | 🟡 Media | 3 hrs |

### Sprint 2.3 — FAQ y Formularios (Días 3-4)

| Tarea | Prioridad | Estimación |
|-------|-----------|------------|
| `/faq.astro` — Página de FAQ | 🟡 Media | 2 hrs |
| `FAQAccordion.tsx` — FAQ interactivo (React) | 🟡 Media | 2 hrs |
| `/formularios.astro` — Página de formularios | 🟢 Alta | 2 hrs |
| `FormDownloader.tsx` — Lista filtrable (React) | 🟡 Media | 2 hrs |
| Contenido de FAQ (20+ preguntas) | 🟡 Media | 1.5 hrs |

### Sprint 2.4 — Búsqueda Global (Día 4-5)

| Tarea | Prioridad | Estimación |
|-------|-----------|------------|
| `SearchModal.tsx` — Modal de búsqueda (React) | 🟡 Media | 3 hrs |
| Integración con Pagefind | 🟡 Media | 2 hrs |
| Atajo de teclado Ctrl+K | 🟡 Media | 30 min |
| `/404.astro` — Página de error | 🟡 Media | 1 hr |

**Entregable Fase 2:** Todas las páginas funcionales + Búsqueda + Calendario interactivo

---

## Fase 3: Polish & Launch 🔲

> **Estado:** Pendiente  
> **Duración estimada:** 3-4 días  

### Sprint 3.1 — Pulido Visual (Días 1-2)

| Tarea | Prioridad | Estimación |
|-------|-----------|------------|
| Review de todas las animaciones | 🟢 Alta | 2 hrs |
| Optimización de micro-interacciones | 🟡 Media | 2 hrs |
| View Transitions entre páginas | 🟡 Media | 1.5 hrs |
| Revisión de responsive en todos los breakpoints | 🟢 Alta | 3 hrs |
| Revisión dark mode en todas las páginas | 🟢 Alta | 2 hrs |
| Accesibilidad: keyboard nav, ARIA, focus styles | 🟢 Alta | 2 hrs |

### Sprint 3.2 — Performance y SEO (Día 2-3)

| Tarea | Prioridad | Estimación |
|-------|-----------|------------|
| Optimización de imágenes (WebP/AVIF) | 🟢 Alta | 1 hr |
| Lazy loading de imágenes | 🟢 Alta | 30 min |
| Auditoría Lighthouse | 🟢 Alta | 1 hr |
| Sitemap.xml configuración | 🟢 Alta | 30 min |
| robots.txt | 🟢 Alta | 15 min |
| Meta tags y Open Graph en todas las páginas | 🟢 Alta | 1.5 hrs |
| Schema.org structured data | 🟡 Media | 1 hr |
| Minificación y tree-shaking | 🟢 Alta | 30 min |

### Sprint 3.3 — Testing y Deploy (Días 3-4)

| Tarea | Prioridad | Estimación |
|-------|-----------|------------|
| Testing en Chrome, Firefox, Safari, Edge | 🟢 Alta | 2 hrs |
| Testing en dispositivos móviles reales | 🟢 Alta | 1.5 hrs |
| Fix de bugs encontrados | 🟢 Alta | 3 hrs |
| Configurar deploy (Netlify/Vercel) | 🟢 Alta | 1 hr |
| Deploy a staging para revisión | 🟢 Alta | 30 min |
| Documentación README.md | 🟡 Media | 1 hr |
| Deploy a producción | 🟢 Alta | 30 min |

**Entregable Fase 3:** Sitio optimizado, testeado y desplegado en producción

---

## Resumen de Timeline

```
Semana 1                          Semana 2                    Semana 3
├── Fase 0 (✅)                    ├── Fase 2                  ├── Fase 3
│   └── Planificación              │   ├── Carreras            │   ├── Pulido visual
│                                  │   ├── Noticias/Eventos    │   ├── Performance
├── Fase 1                         │   ├── FAQ/Formularios     │   ├── Testing
│   ├── Setup proyecto             │   └── Búsqueda global     │   └── Deploy
│   ├── Layout base                │                           │
│   ├── Componentes UI             │                           │
│   ├── Homepage                   │                           │
│   └── Trámites                   │                           │

Total estimado: 12-16 días de desarrollo
```

---

## Métricas de Éxito

| Métrica | Objetivo |
|---------|----------|
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | ≥ 90 |
| Lighthouse SEO | ≥ 95 |
| Lighthouse Best Practices | ≥ 95 |
| Tiempo de carga (FCP) | < 1.5s |
| Páginas completadas | 20+ |
| Responsive (breakpoints) | 4 (mobile, tablet, desktop, XL) |
| Navegadores testeados | 4 (Chrome, Firefox, Safari, Edge) |

---

## Registro de Progreso

| Fecha | Fase | Actividad | Estado |
|-------|------|-----------|--------|
| 2026-07-07 | Fase 0 | Creación de documentación de planificación | ✅ Completado |
| — | Fase 1 | — | 🔲 Pendiente |
| — | Fase 2 | — | 🔲 Pendiente |
| — | Fase 3 | — | 🔲 Pendiente |
