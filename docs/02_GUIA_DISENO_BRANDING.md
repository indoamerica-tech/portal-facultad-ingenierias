# 🎨 Guía de Diseño y Branding
## Portal Facultad de Ingenierías — Universidad Indoamérica

> **Principio rector:** Respetar la identidad institucional pero elevar la experiencia visual a un nivel premium con animaciones, interactividad y modernidad.

---

## 1. Paleta de Colores

### 1.1 Colores Institucionales (Base obligatoria)

Estos colores DEBEN usarse como base para mantener coherencia con la marca de la universidad.

```css
:root {
  /* === COLORES INSTITUCIONALES === */
  --color-purple-900: #1E0A3C;    /* Fondo principal oscuro */
  --color-purple-800: #2D1B69;    /* Header, cards oscuras */
  --color-purple-700: #3D2785;    /* Hover states oscuros */
  --color-purple-600: #4A2C8A;    /* Overlays, gradientes */
  --color-purple-500: #6B47B8;    /* Acentos secundarios */
  --color-purple-400: #8B6FD4;    /* Textos secundarios sobre oscuro */
  --color-purple-300: #B09AE6;    /* Bordes sutiles */
  --color-purple-200: #D4C8F2;    /* Highlights suaves */
  --color-purple-100: #EDE8FA;    /* Fondos claros sutiles */
  --color-purple-50:  #F7F4FD;    /* Fondos muy claros */

  --color-orange-600: #D4570F;    /* Hover CTA */
  --color-orange-500: #E8611A;    /* CTA principal — botones, acentos */
  --color-orange-400: #F26522;    /* Variante más clara */
  --color-orange-300: #F58A52;    /* Hover suave */
  --color-orange-200: #FBBF8E;    /* Fondos cálidos */
  --color-orange-100: #FDE8D4;    /* Fondos muy suaves */
}
```

### 1.2 Colores Extendidos (Nuestra propuesta)

Colores adicionales que complementan la paleta institucional para dar más riqueza visual.

```css
:root {
  /* === COLORES NEUTRALES === */
  --color-neutral-950: #0A0A0F;   /* Fondo máximo contraste */
  --color-neutral-900: #121218;   /* Fondo dark mode */
  --color-neutral-800: #1E1E2A;   /* Cards dark mode */
  --color-neutral-700: #2A2A3A;   /* Bordes dark mode */
  --color-neutral-600: #4A4A5A;   /* Texto deshabilitado */
  --color-neutral-500: #6B6B7B;   /* Placeholder text */
  --color-neutral-400: #9090A0;   /* Texto secundario */
  --color-neutral-300: #B8B8C8;   /* Bordes light mode */
  --color-neutral-200: #E0E0EA;   /* Fondos hover light */
  --color-neutral-100: #F0F0F5;   /* Fondos secundarios light */
  --color-neutral-50:  #FAFAFC;   /* Fondos principales light */

  /* === COLORES SEMÁNTICOS === */
  --color-success: #22C55E;       /* Éxito, aprobado */
  --color-warning: #F59E0B;       /* Advertencia */
  --color-error:   #EF4444;       /* Error */
  --color-info:    #3B82F6;       /* Información */

  /* === COLORES DE ACENTO PARA CARRERAS === */
  --color-mecatronica:  #6366F1;  /* Indigo — robótica, tecnología */
  --color-industrial:   #F59E0B;  /* Amber — producción, manufactura */
  --color-software:     #10B981;  /* Emerald — código, digital */
  --color-electricidad: #3B82F6;  /* Blue — electricidad, energía */
  --color-civil:        #8B5CF6;  /* Violet — construcción */
  --color-ti:           #06B6D4;  /* Cyan — redes, datos */

  /* === GRADIENTES === */
  --gradient-hero: linear-gradient(135deg, #1E0A3C 0%, #2D1B69 50%, #4A2C8A 100%);
  --gradient-card: linear-gradient(180deg, rgba(30, 10, 60, 0.8) 0%, rgba(45, 27, 105, 0.95) 100%);
  --gradient-cta:  linear-gradient(135deg, #E8611A 0%, #F26522 50%, #F58A52 100%);
  --gradient-glow: radial-gradient(circle at center, rgba(232, 97, 26, 0.15) 0%, transparent 70%);
  --gradient-mesh: radial-gradient(at 40% 20%, rgba(107, 71, 184, 0.3) 0%, transparent 50%),
                   radial-gradient(at 80% 80%, rgba(232, 97, 26, 0.15) 0%, transparent 50%);
}
```

### 1.3 Ejemplo de Aplicación de Colores

| Elemento | Light Mode | Dark Mode |
|----------|-----------|-----------|
| Fondo de página | `--color-neutral-50` | `--color-neutral-950` |
| Fondo de card | `#FFFFFF` | `--color-neutral-800` |
| Header | `--color-purple-900` | `--color-purple-900` |
| Texto principal | `--color-neutral-900` | `#FFFFFF` |
| Texto secundario | `--color-neutral-500` | `--color-neutral-400` |
| CTA principal | `--color-orange-500` | `--color-orange-500` |
| Links | `--color-purple-600` | `--color-purple-400` |
| Bordes | `--color-neutral-200` | `--color-neutral-700` |

---

## 2. Tipografía

### 2.1 Fuentes Seleccionadas

```css
/* Google Fonts Import */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

:root {
  /* Headings — Plus Jakarta Sans: moderna, geométrica, premium */
  --font-heading: 'Plus Jakarta Sans', sans-serif;
  
  /* Body — Inter: la más legible para UI, diseñada para pantallas */
  --font-body: 'Inter', sans-serif;
  
  /* Monospace — JetBrains Mono: para código y datos técnicos */
  --font-mono: 'JetBrains Mono', monospace;
}
```

### 2.2 Escala Tipográfica

```css
:root {
  /* === ESCALA DE TAMAÑOS === */
  --text-xs:   0.75rem;    /* 12px — captions, badges */
  --text-sm:   0.875rem;   /* 14px — texto secundario, metadata */
  --text-base: 1rem;       /* 16px — cuerpo principal */
  --text-lg:   1.125rem;   /* 18px — párrafos destacados */
  --text-xl:   1.25rem;    /* 20px — subtítulos pequeños */
  --text-2xl:  1.5rem;     /* 24px — subtítulos */
  --text-3xl:  1.875rem;   /* 30px — títulos de sección */
  --text-4xl:  2.25rem;    /* 36px — títulos de página */
  --text-5xl:  3rem;       /* 48px — hero headings */
  --text-6xl:  3.75rem;    /* 60px — hero principal */
  --text-7xl:  4.5rem;     /* 72px — display headlines */

  /* === LINE HEIGHTS === */
  --leading-none:    1;
  --leading-tight:   1.2;
  --leading-snug:    1.35;
  --leading-normal:  1.5;
  --leading-relaxed: 1.65;
  --leading-loose:   2;

  /* === LETTER SPACING === */
  --tracking-tighter: -0.05em;
  --tracking-tight:   -0.025em;
  --tracking-normal:  0;
  --tracking-wide:    0.025em;
  --tracking-wider:   0.05em;
  --tracking-widest:  0.1em;
}
```

### 2.3 Uso Tipográfico

| Elemento | Fuente | Tamaño | Peso | Tracking |
|----------|--------|--------|------|----------|
| Hero Principal | Jakarta Sans | `--text-6xl` → `--text-7xl` | 800 (ExtraBold) | `--tracking-tight` |
| H1 | Jakarta Sans | `--text-5xl` | 700 (Bold) | `--tracking-tight` |
| H2 | Jakarta Sans | `--text-4xl` | 700 (Bold) | `--tracking-tight` |
| H3 | Jakarta Sans | `--text-3xl` | 600 (SemiBold) | `--tracking-normal` |
| H4 | Jakarta Sans | `--text-2xl` | 600 (SemiBold) | `--tracking-normal` |
| H5 | Jakarta Sans | `--text-xl` | 500 (Medium) | `--tracking-normal` |
| Cuerpo | Inter | `--text-base` | 400 (Regular) | `--tracking-normal` |
| Cuerpo grande | Inter | `--text-lg` | 400 (Regular) | `--tracking-normal` |
| Subtexto | Inter | `--text-sm` | 400 (Regular) | `--tracking-wide` |
| Captions | Inter | `--text-xs` | 500 (Medium) | `--tracking-wider` |
| Código | JetBrains Mono | `--text-sm` | 400 (Regular) | `--tracking-normal` |
| Navegación | Inter | `--text-sm` | 500 (Medium) | `--tracking-wide` |
| Botones | Inter | `--text-sm` | 600 (SemiBold) | `--tracking-wide` |
| Badges | Inter | `--text-xs` | 600 (SemiBold) | `--tracking-widest` |

---

## 3. Espaciado y Layout

### 3.1 Sistema de Espaciado

```css
:root {
  /* Basado en múltiplos de 4px */
  --space-1:  0.25rem;   /* 4px */
  --space-2:  0.5rem;    /* 8px */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-5:  1.25rem;   /* 20px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */
  --space-32: 8rem;      /* 128px */
}
```

### 3.2 Breakpoints Responsive

```css
:root {
  --bp-sm:  640px;    /* Mobile landscape */
  --bp-md:  768px;    /* Tablet portrait */
  --bp-lg:  1024px;   /* Tablet landscape / laptop */
  --bp-xl:  1280px;   /* Desktop */
  --bp-2xl: 1536px;   /* Desktop grande */
}
```

### 3.3 Contenedores

```css
:root {
  --container-sm:  640px;
  --container-md:  768px;
  --container-lg:  1024px;
  --container-xl:  1200px;
  --container-2xl: 1400px;
  --container-padding: var(--space-4); /* 16px en mobile, 32px en desktop */
}
```

---

## 4. Componentes Visuales

### 4.1 Bordes y Redondeo

```css
:root {
  --radius-sm:   0.375rem;   /* 6px — inputs, badges pequeños */
  --radius-md:   0.5rem;     /* 8px — cards pequeñas */
  --radius-lg:   0.75rem;    /* 12px — cards, modales */
  --radius-xl:   1rem;       /* 16px — cards grandes */
  --radius-2xl:  1.5rem;     /* 24px — sections */
  --radius-full: 9999px;     /* Píldora — botones, tags */
}
```

### 4.2 Sombras

```css
:root {
  --shadow-sm:  0 1px 2px rgba(0,0,0,0.05);
  --shadow-md:  0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
  --shadow-lg:  0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
  --shadow-xl:  0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
  --shadow-2xl: 0 25px 50px -12px rgba(0,0,0,0.25);
  
  /* Sombras de color (para glow effects) */
  --shadow-orange-glow: 0 0 20px rgba(232, 97, 26, 0.3);
  --shadow-purple-glow: 0 0 20px rgba(107, 71, 184, 0.3);
  --shadow-card-hover:  0 20px 40px rgba(30, 10, 60, 0.15);
}
```

### 4.3 Glassmorphism

```css
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
}

.glass-card--light {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
```

### 4.4 Transiciones y Animaciones

```css
:root {
  /* === TRANSITIONS === */
  --transition-fast:   150ms ease;
  --transition-base:   250ms ease;
  --transition-slow:   350ms ease;
  --transition-slower: 500ms ease;
  
  /* === EASINGS PERSONALIZADOS === */
  --ease-in-out-expo:  cubic-bezier(0.87, 0, 0.13, 1);
  --ease-out-expo:     cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-back:     cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-spring:       cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
```

---

## 5. Iconografía

### 5.1 Sistema de Iconos Recomendado
- **Librería primaria:** [Lucide Icons](https://lucide.dev/) — consistente, moderna, ligera
- **Estilo:** Outline (stroke: 1.5px-2px)
- **Tamaños estándar:** 16px, 20px, 24px, 32px

### 5.2 Iconos por Sección

| Sección | Icono Sugerido |
|---------|---------------|
| Matrículas | `clipboard-list` |
| Titulación | `graduation-cap` |
| Justificación de faltas | `file-check` |
| Homologaciones | `arrow-left-right` |
| Prácticas preprofesionales | `briefcase` |
| Vinculación | `handshake` |
| Eventos | `calendar-days` |
| Formularios | `file-down` |
| FAQ | `help-circle` |
| Noticias | `newspaper` |

---

## 6. Fotografía e Imágenes

### 6.1 Lineamientos
- **Prioridad:** Usar fotografía real de la universidad cuando esté disponible
- **Estilo:** Natural, iluminación cálida, mostrando diversidad
- **Overlays:** Gradientes púrpura con transparencia (60-80% opacity)
- **Fallback:** Para imágenes placeholder, usar ilustraciones vectoriales temáticas de ingeniería

### 6.2 Tratamiento de Imágenes
```css
.img-hero-overlay {
  position: relative;
}
.img-hero-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg, 
    rgba(30, 10, 60, 0.85) 0%, 
    rgba(74, 44, 138, 0.6) 100%
  );
}
```

---

## 7. Principios de Diseño

1. **Consistencia institucional** — Siempre usar colores y logo de la universidad como base
2. **Elevación premium** — Cada componente debe sentirse más pulido que el sitio principal
3. **Movimiento con propósito** — Animaciones que guíen la atención, nunca distraigan
4. **Jerarquía clara** — El usuario debe saber qué hacer en cada página en < 3 segundos
5. **Accesibilidad** — Contraste WCAG AA mínimo, navegación por teclado
6. **Mobile-first** — Diseñar primero para móvil, escalar a desktop
7. **Contenido primero** — El diseño sirve al contenido, no al revés
