# 🔍 Análisis del Sitio Web Actual
## Universidad Indoamérica — www.indoamerica.edu.ec

> **Fecha de análisis:** 7 de julio de 2026  
> **URL analizada:** https://www.indoamerica.edu.ec/  
> **Páginas revisadas:** Homepage, Carreras de Grado, Sección Ingenierías  

---

## 1. Estructura General del Sitio

### 1.1 Barra Superior (Utility Bar)
- Links rápidos: **Aula Virtual** | **SGA** | **Correo**
- Selector de idioma: **🇪🇨 Español**
- Fondo oscuro casi negro
- Texto pequeño, alineado a la derecha

### 1.2 Header / Navegación Principal
- **Logo:** Isotipo (forma de "U" estilizada en naranja/blanco) + "Universidad Indoamérica" en texto blanco
- **Menú principal** (4 items con separadores verticales):
  1. **Conoce la Universidad** ▾ (dropdown)
  2. **Explora la Oferta Académica** ▾ (dropdown)
  3. **Experimenta la Vida Universitaria** ▾ (dropdown)
  4. **Investigación** (sin dropdown)
- Header con fondo transparente sobre hero, se vuelve sólido al hacer scroll
- Los dropdowns son **mega-menús** con columnas organizadas por categoría

### 1.3 Mega Menú — "Conoce la Universidad"
| Columna: QUIÉNES SOMOS | Columna: PILARES |
|-------------------------|------------------|
| Historia | Vinculación con la Sociedad |
| Autoridades | Bienestar Universitario |
| Misión, Visión | Aseguramiento de la Calidad |
| Transparencia | |
| Modelo Educativo | **INVESTIGACIÓN** |
| Legal Indoamérica | Investigación Indoamérica |
| Aseguramiento de la Calidad | Blog Investigación |

### 1.4 Homepage — Secciones Identificadas
1. **Hero Section:** Grid tipo bento con tarjetas promocionales
   - Tarjeta "41 Años" (Ambato • Quito • Latacunga) — con badge dorado
   - Tarjeta central grande: Estudiante graduado + "Extiende tu propia historia" + CTA "Posgrado"
   - Tarjeta "Somos TOP 10 Ranking Educativo Innovatec de Iberoamérica — En Innovación"
   - Tarjeta "1er Congreso Hábitat Resiliente y Arquitectura Sostenible"
   - Tarjeta "Grado" con foto de estudiantes
2. **Botón WhatsApp:** "Chatea con nosotros" (flotante, esquina inferior izquierda)

### 1.5 Página "Carreras de Grado"
- **Hero:** Foto grupal de estudiantes con overlay púrpura/violeta
- **Título:** "Oferta académica de GRADO" (GRADO en naranja)
- **Subtítulo:** "En Indoamérica potenciamos tu espíritu emprendedor..."
- **CTAs:** Botón "Admisiones →" (naranja) + "Carreras" (outline)
- **Filtros por Facultad:** Pills/botones redondeados
  - Ciencias Económicas, Administrativas y Negocios
  - Ciencias de la Salud y Bienestar Humano
  - Ciencias Sociales y Humanas
  - Jurisprudencia y Ciencias Políticas
  - **Ingenierías** (activo = fondo naranja)
  - Arquitectura, Diseño y Artes
  - Ciencias de la Educación
- **Grid de carreras:** 3 columnas con cards

---

## 2. Identidad Visual Actual

### 2.1 Paleta de Colores Identificada

| Color | Hex Aproximado | Uso |
|-------|---------------|-----|
| **Púrpura oscuro** | `#1E0A3C` / `#2D1B69` | Fondo principal, header, hero |
| **Púrpura medio** | `#4A2C8A` | Overlays, gradientes |
| **Naranja institucional** | `#E8611A` / `#F26522` | Botones CTA, acentos, tabs activos |
| **Blanco** | `#FFFFFF` | Texto sobre fondos oscuros |
| **Gris claro** | `#F5F5F5` | Fondos de secciones claras |
| **Negro** | `#1A1A1A` | Barra utility, textos |
| **Dorado** | `#C9A84C` | Badge "41 Años", elementos premium |
| **Rojo institucional** | `#C62828` | Acentos secundarios (ranking) |

### 2.2 Tipografía
- **Familia principal:** Sans-serif moderna (posiblemente Montserrat o similar)
- **Headings:** Bold, uppercase en algunos casos (ej: "GRADO", "POSGRADO")
- **Body:** Regular weight, legible
- **Navegación:** Medium weight, tamaño ~14px

### 2.3 Logo Institucional
- **Isotipo:** Forma abstracta de "U" con corte diagonal
- **Colores del isotipo:** Naranja (#F26522) y blanco
- **Logotipo:** "Universidad Indoamérica" en sans-serif bold, blanco
- **Variante:** Se usa sobre fondos oscuros (versión blanca)

---

## 3. Componentes UI Identificados

### 3.1 Cards de Carreras
```
┌──────────────────────────┐
│  ┌──────────────────┐    │
│  │                  │    │
│  │   [FOTOGRAFÍA]   │    │
│  │                  │    │
│  └──────────────────┘    │
│                          │
│  Nombre de la Carrera    │
│                          │
│  📍 Ambato / Quito       │
│  🏛️ Presencial           │
│                          │
│  ┌──────────┐            │
│  │ Ver más  │            │
│  └──────────┘            │
│         (naranja)        │
└──────────────────────────┘
```
- Fondo oscuro (púrpura/navy)
- Borde sutil con brillo púrpura
- Imagen con overlay suave
- Botón "Ver más" naranja con bordes redondeados

### 3.2 Botones
| Tipo | Estilo |
|------|--------|
| **CTA Principal** | Fondo naranja, texto blanco, bordes redondeados (~25px), icono flecha → |
| **CTA Secundario** | Outline blanco/gris, texto blanco, bordes redondeados |
| **Tab/Filtro Activo** | Fondo naranja, texto blanco, pill shape |
| **Tab/Filtro Inactivo** | Outline gris/blanco, texto blanco, pill shape |

### 3.3 Elementos Flotantes
- **WhatsApp Widget:** Botón verde con ícono + "Chatea con nosotros"
- Posición: Esquina inferior izquierda
- Siempre visible (fixed position)

---

## 4. Evaluación Crítica

### 4.1 ✅ Fortalezas
- Paleta de colores institucional sólida (púrpura + naranja)
- Fotografía de calidad con estudiantes reales
- Navegación con mega-menús bien organizados
- Identidad visual coherente a lo largo del sitio
- Grid tipo bento en homepage es moderno

### 4.2 ⚠️ Debilidades y Oportunidades
| Aspecto | Problema | Oportunidad para nuestro portal |
|---------|----------|--------------------------------|
| **Animaciones** | Casi nulas, el sitio se siente estático | Implementar scroll animations, hover effects, transiciones |
| **Micro-interacciones** | Botones sin feedback visual rico | Hover states elaborados, ripple effects, transiciones suaves |
| **Contenido dinámico** | Todo es estático, no hay feeds en vivo | Calendario interactivo, noticias dinámicas, contadores |
| **Experiencia móvil** | Básica, sin optimización premium | Diseño mobile-first con gestos y animaciones nativas |
| **Velocidad visual** | Carga sin skeleton screens | Loading states, skeleton screens, lazy loading |
| **Interactividad** | Sin buscador visible, sin filtros avanzados | Búsqueda inteligente, filtros dinámicos |
| **Dark mode** | Solo una versión oscura | Toggle dark/light con persistencia |
| **Accesibilidad** | No se observan features de accesibilidad | Alto contraste, navegación por teclado, ARIA |
| **Personalización** | Mismo contenido para todos | Vistas contextuales según perfil (estudiante/docente/aspirante) |

### 4.3 Lo que NO debemos cambiar (respetar marca)
- ✅ Colores institucionales (púrpura + naranja)
- ✅ Logo y sus proporciones
- ✅ Tono profesional y académico
- ✅ Fotografía de calidad con personas reales

### 4.4 Lo que SÍ podemos mejorar (nuestra propuesta)
- 🚀 Animaciones con scroll reveal y parallax
- 🚀 Glassmorphism sutil en cards y overlays
- 🚀 Gradientes más ricos y dinámicos
- 🚀 Micro-animaciones en cada interacción
- 🚀 Layout más dinámico y visual
- 🚀 Tipografía con más jerarquía y personalidad
- 🚀 Componentes interactivos (acordeones, tabs animados, modales)
- 🚀 Sistema de iconografía consistente
- 🚀 Particle effects sutiles o mesh gradients en heroes

---

## 5. Screenshots de Referencia

> Las capturas del sitio actual se encuentran en la carpeta de recursos del análisis.  
> Páginas capturadas:
> - Homepage (hero con grid bento)
> - Carreras de Grado (hero + filtros + cards)
> - Sección Ingenierías (6 carreras listadas)
> - Mega menú "Conoce la Universidad"
> - Footer y secciones inferiores
