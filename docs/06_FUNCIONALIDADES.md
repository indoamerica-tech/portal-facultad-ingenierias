# ✨ Funcionalidades y Features
## Portal Facultad de Ingenierías — Universidad Indoamérica

---

## 1. Animaciones y Efectos Visuales

### 1.1 Animaciones de Scroll (Scroll Reveal)

Cada sección aparece con animaciones al entrar en el viewport usando la **Intersection Observer API** (nativo, sin librerías externas).

| Tipo | Descripción | Elementos que lo usan |
|------|-------------|----------------------|
| **Fade Up** | Aparece desde abajo con opacidad | Cards, secciones de texto |
| **Fade In** | Aparece con opacidad gradual | Imágenes, backgrounds |
| **Slide In Left/Right** | Desliza desde un lado | Columnas en layout 50/50 |
| **Scale Up** | Escala desde 0.8 a 1 | Cards de carreras, stats |
| **Stagger** | Elementos aparecen en secuencia | Grids de cards, listas |

```css
/* Ejemplo de implementación */
[data-animate] {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s var(--ease-out-expo), 
              transform 0.6s var(--ease-out-expo);
}

[data-animate].is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger delay para grids */
[data-animate-delay="1"] { transition-delay: 0.1s; }
[data-animate-delay="2"] { transition-delay: 0.2s; }
[data-animate-delay="3"] { transition-delay: 0.3s; }
```

### 1.2 Hover Effects

| Componente | Efecto Hover |
|-----------|-------------|
| **Cards de carreras** | Elevación (translateY -8px) + sombra expandida + borde glow naranja |
| **Cards de noticias** | Imagen zoom (scale 1.05) + overlay gradiente más visible |
| **Botones CTA** | Gradiente shift + shadow glow + escala sutil (1.02) |
| **Links de navegación** | Underline animado de izquierda a derecha |
| **Iconos de acceso rápido** | Rotación sutil (5deg) + cambio de color |
| **Cards de trámites** | Background gradient reveal + icono animado |

### 1.3 Efectos de Hero

| Efecto | Descripción |
|--------|-------------|
| **Parallax suave** | La imagen de fondo se mueve más lento que el contenido |
| **Mesh Gradient animado** | Gradientes que se mueven sutilmente con CSS animation |
| **Texto con gradient** | Título principal con gradiente naranja-dorado animado |
| **Floating elements** | Formas geométricas flotando suavemente (CSS animation) |
| **Counter animation** | Los números de stats cuentan desde 0 al scroll |

### 1.4 Transiciones de Página

```css
/* View Transitions API (nativa de Astro) */
::view-transition-old(root) {
  animation: fade-out 0.2s ease-in;
}
::view-transition-new(root) {
  animation: fade-in 0.3s ease-out;
}

/* Transición suave entre páginas sin recarga completa */
```

### 1.5 Micro-animaciones

| Elemento | Animación |
|----------|-----------|
| **Loading skeleton** | Shimmer effect (gradiente que se desliza) |
| **Botón de WhatsApp** | Pulse animation cada 5 segundos |
| **Badge "Nuevo"** | Shine effect (brillo que cruza) |
| **Accordion open/close** | Expand con ease-out-back |
| **Toast notifications** | Slide in + fade desde la esquina |
| **Scroll to top** | Aparece con fade al bajar 300px |
| **Progress bar** | En trámites, barra que se llena al scroll |

---

## 2. Componentes Interactivos

### 2.1 🔍 Buscador Global (SearchModal)

```
Comportamiento:
- Se activa con click en icono de búsqueda o atajo Ctrl+K
- Modal con overlay oscuro (glassmorphism)
- Input con auto-focus
- Búsqueda en tiempo real (fuzzy search)
- Resultados agrupados: Carreras | Trámites | Eventos | Noticias | FAQ
- Navegación con teclado (↑ ↓ Enter Esc)
- Tecnología: React island con Pagefind (búsqueda estática)
```

### 2.2 📅 Calendario de Eventos (EventCalendar)

```
Comportamiento:
- Vista de calendario mensual
- Navegación entre meses (← →)
- Días con eventos marcados con punto de color
- Click en un día muestra lista de eventos
- Click en evento lleva al detalle
- Colores por tipo de evento:
  - 🟠 Hackatones
  - 🔵 Conferencias
  - 🟢 Talleres
  - 🟣 Congresos
  - 🔴 Concursos
- Tecnología: React island con client:visible
```

### 2.3 ❓ FAQ Interactivo (FAQAccordion)

```
Comportamiento:
- Buscador de preguntas en la parte superior
- Filtro por categoría (tabs)
- Acordeones animados (uno abierto a la vez)
- Expandir/colapsar con animación smooth
- Highlight de término buscado en las respuestas
- Tecnología: React island
```

### 2.4 📄 Descargador de Formularios (FormDownloader)

```
Comportamiento:
- Lista filtrable de formularios
- Búsqueda por nombre
- Filtro por categoría
- Preview del documento (nombre, tamaño, formato)
- Botón de descarga directa
- Contador de descargas (opcional)
- Tecnología: React island con client:visible
```

### 2.5 🎓 Filtro de Carreras (CareerFilter)

```
Comportamiento:
- Filtros: Modalidad | Sede | Todas
- Animación de reorder al filtrar (layout animation)
- Cards que aparecen/desaparecen con transición
- Tecnología: React island con Framer Motion
```

### 2.6 🌙 Toggle Dark/Light Mode (ThemeToggle)

```
Comportamiento:
- Icono sol/luna con animación de transición
- Persiste preferencia en localStorage
- Respeta prefers-color-scheme del sistema
- Transición suave de todos los colores
- Tecnología: React island con client:load
```

---

## 3. Funcionalidades UX

### 3.1 Navegación

| Feature | Descripción |
|---------|-------------|
| **Sticky Header** | Se oculta al bajar, reaparece al subir (hide-on-scroll) |
| **Progress Indicator** | Barra de progreso en la parte superior al leer artículos |
| **Breadcrumbs** | Migas de pan en páginas internas |
| **Scroll to Top** | Botón flotante que aparece al bajar |
| **Active nav highlight** | Resalta la página actual en la navegación |
| **Mobile hamburger** | Menú slide-in desde la derecha con overlay |

### 3.2 Accesibilidad

| Feature | Implementación |
|---------|---------------|
| **Navegación por teclado** | Todos los elementos interactivos son focusables |
| **Skip to content** | Link oculto "Saltar al contenido" para lectores de pantalla |
| **Alt text** | Todas las imágenes con texto alternativo descriptivo |
| **ARIA labels** | Roles y labels en componentes interactivos |
| **Contraste** | WCAG AA mínimo en todas las combinaciones de color |
| **Focus visible** | Outline claro en elementos enfocados |
| **Reduced motion** | Respeta `prefers-reduced-motion` del sistema |

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 3.3 Responsive Design

| Breakpoint | Adaptaciones |
|-----------|-------------|
| **Mobile (< 640px)** | Stack vertical, hamburger menu, cards full width |
| **Tablet (640-1024px)** | Grid 2 columnas, nav condensada |
| **Desktop (1024-1280px)** | Grid 3 columnas, sidebar en algunas páginas |
| **Desktop XL (> 1280px)** | Max-width container, espaciado amplio |

---

## 4. Funcionalidades de Contenido

### 4.1 Sistema de Noticias

| Feature | Descripción |
|---------|-------------|
| **Featured posts** | Noticias marcadas como destacadas aparecen primero |
| **Tags/categorías** | Filtrado por temática |
| **Fecha formateada** | "Hace 2 días", "15 de julio de 2026" |
| **Tiempo de lectura** | Calculado automáticamente del contenido |
| **Compartir** | Botones de compartir en redes sociales |
| **Noticias relacionadas** | Sugerencias basadas en tags comunes |

### 4.2 Sistema de Eventos

| Feature | Descripción |
|---------|-------------|
| **Estado del evento** | Próximo / En curso / Finalizado |
| **Countdown** | Cuenta regresiva para eventos próximos |
| **Resultados post-evento** | Galería de fotos, ganadores, proyectos |
| **Agregar a calendario** | Generar archivo .ics para Google Calendar/Outlook |
| **Mapa de ubicación** | Embed de Google Maps si es presencial |

### 4.3 Trámites con Timeline

```
Timeline visual para cada trámite:

  ① ──── ② ──── ③ ──── ④ ──── ⑤
  │      │      │      │      │
  │      │      │      │      └─ Resolución
  │      │      │      └──────── Revisión
  │      │      └─────────────── Envío de documentos
  │      └────────────────────── Preparar requisitos  
  └───────────────────────────── Iniciar solicitud

  Cada paso: título, descripción, documentos necesarios
  Visual: línea conectora con puntos animados
```

---

## 5. Integraciones Externas

### 5.1 Links Institucionales (Existentes)

| Sistema | URL | Integración |
|---------|-----|-------------|
| **Aula Virtual** | aula.indoamerica.edu.ec | Link externo en header |
| **SGA** | sga.indoamerica.edu.ec | Link externo en header |
| **Correo** | correo.indoamerica.edu.ec | Link externo en header |
| **Sitio Principal** | www.indoamerica.edu.ec | Link en footer |

### 5.2 Integraciones Futuras (Roadmap)

| Integración | Descripción | Prioridad |
|-------------|-------------|-----------|
| **Google Calendar API** | Sincronizar eventos con calendario institucional | Media |
| **WhatsApp Business** | Chat directo con secretaría | Alta |
| **Google Forms** | Formularios de inscripción a eventos | Media |
| **API del SGA** | Consulta de calificaciones (si se expone API) | Baja |
| **Notificaciones Push** | Avisos de fechas límite y eventos | Baja |

---

## 6. SEO y Marketing Digital

### 6.1 Optimización SEO

| Aspecto | Implementación |
|---------|---------------|
| **Title tags** | Único por página, con keywords y nombre de facultad |
| **Meta descriptions** | Descripción compelling < 160 caracteres |
| **Open Graph** | Título, descripción, imagen para compartir en redes |
| **Sitemap.xml** | Generado automáticamente por Astro |
| **robots.txt** | Configurado para indexación correcta |
| **Schema.org** | Structured data para eventos y organización educativa |
| **Canonical URLs** | Para evitar contenido duplicado |
| **Performance** | Core Web Vitals optimizados |

### 6.2 Analytics

| Herramienta | Propósito |
|-------------|-----------|
| **Google Analytics 4** | Métricas de tráfico, comportamiento |
| **Google Search Console** | Rendimiento en búsquedas |
| **Hotjar** (opcional) | Heatmaps de comportamiento |

---

## 7. Resumen de Features por Prioridad

### 🟢 Prioridad Alta (MVP)
- [ ] Header con navegación responsiva
- [ ] Hero section con animaciones
- [ ] Accesos rápidos
- [ ] Páginas de trámites (6 trámites)
- [ ] Páginas de carreras (6 carreras)
- [ ] Formularios descargables
- [ ] Footer completo
- [ ] SEO básico
- [ ] Responsive design
- [ ] Dark/Light mode

### 🟡 Prioridad Media (V1.1)
- [ ] Noticias con content collections
- [ ] Eventos con calendario
- [ ] FAQ interactivo
- [ ] Buscador global
- [ ] Animaciones de scroll
- [ ] View transitions
- [ ] Schema.org structured data
- [ ] Share buttons

### 🔵 Prioridad Baja (V2.0)
- [ ] Integración WhatsApp Business
- [ ] Push notifications
- [ ] Seguimiento de solicitudes
- [ ] Galería de eventos pasados
- [ ] CMS visual (Decap CMS)
- [ ] Analytics avanzado
- [ ] PWA (Progressive Web App)
- [ ] Chatbot de FAQ
