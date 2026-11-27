# 🗺️ Mapa de Contenido y Páginas
## Portal Facultad de Ingenierías — Universidad Indoamérica

---

## 1. Sitemap Visual

```
🏠 INICIO (/)
├── 📰 NOTICIAS (/noticias)
│   └── 📰 Detalle Noticia (/noticias/[slug])
│
├── 🎓 CARRERAS (/carreras)
│   ├── 🤖 Mecatrónica (/carreras/mecatronica)
│   ├── 🏭 Ingeniería Industrial (/carreras/ingenieria-industrial)
│   ├── 💻 Ingeniería en Software (/carreras/ingenieria-software)
│   ├── ⚡ Electricidad (/carreras/electricidad)
│   ├── 🏗️ Ingeniería Civil (/carreras/ingenieria-civil)
│   └── 🌐 Ingeniería en TI (/carreras/ingenieria-ti)
│
├── 📋 TRÁMITES Y PROCESOS (/tramites)
│   ├── 📝 Matrículas (/tramites/matriculas)
│   ├── 🎓 Titulación (/tramites/titulacion)
│   ├── ✅ Justificación de Faltas (/tramites/justificacion-faltas)
│   ├── 🔄 Homologaciones (/tramites/homologaciones)
│   ├── 💼 Prácticas Preprofesionales (/tramites/practicas)
│   └── 🤝 Vinculación (/tramites/vinculacion)
│
├── 📅 EVENTOS (/eventos)
│   └── 📅 Detalle Evento (/eventos/[slug])
│
├── 📄 FORMULARIOS (/formularios)
│
├── ❓ FAQ (/faq)
│
└── 🚫 404 (/404)
```

---

## 2. Detalle por Página

### 2.1 🏠 Página de Inicio (`/`)

La homepage es la carta de presentación. Debe impresionar al primer vistazo y dar acceso rápido a todo.

#### Secciones (de arriba a abajo):

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER (fijo, transparente → sólido al scroll)             │
│  Logo | Nav | Búsqueda | Theme Toggle                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  🎬 HERO SECTION                                            │
│  ─────────────────                                          │
│  Título: "Facultad de Ingenierías"                          │
│  Subtítulo: "Innovación, tecnología y excelencia            │
│              académica en cada carrera"                      │
│  CTA: [Explorar Carreras]  [Ver Eventos]                    │
│  Fondo: Imagen/video con overlay gradiente púrpura           │
│  Efecto: Partículas sutiles o mesh gradient animado          │
│  Stats animados: 6 Carreras | +2000 Estudiantes |           │
│                  41 Años | 3 Sedes                          │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ⚡ ACCESOS RÁPIDOS                                         │
│  ─────────────────                                          │
│  Grid de 6-8 cards con iconos:                              │
│  [Matrículas] [Titulación] [Justificación] [Formularios]   │
│  [Prácticas]  [Horarios]   [SGA]          [Aula Virtual]   │
│  Efecto: hover con elevación + glow naranja                  │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  📢 AVISOS IMPORTANTES                                      │
│  ─────────────────────                                      │
│  Banner tipo ticker o cards deslizables                      │
│  Para: fechas límite, cambios de horario, avisos urgentes   │
│  Estilo: Glassmorphism con icono ⚠️ y fondo semi-           │
│          transparente                                        │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  📰 NOTICIAS DESTACADAS                                     │
│  ──────────────────────                                     │
│  Layout: 1 noticia grande + 3 noticias pequeñas             │
│  Card grande: imagen grande, título, extracto, fecha        │
│  Cards pequeñas: thumbnail, título, fecha                   │
│  CTA: "Ver todas las noticias →"                            │
│  Efecto: Scroll reveal + hover con parallax sutil            │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  🎓 NUESTRAS CARRERAS                                       │
│  ─────────────────────                                      │
│  Grid 3 columnas con cards de carreras                       │
│  Cada card: Icono temático + nombre + modalidad + sede      │
│  Hover: flip o expand con más info                           │
│  CTA: "Conoce todas las carreras →"                         │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  📅 PRÓXIMOS EVENTOS                                        │
│  ─────────────────────                                      │
│  Layout: Calendario mini + lista de próximos eventos        │
│  Cada evento: fecha (badge), nombre, tipo, ubicación        │
│  Tipos: Hackaton, Conferencia, Taller, Congreso, Concurso  │
│  CTA: "Ver calendario completo →"                           │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  🏆 LOGROS Y RECONOCIMIENTOS                                │
│  ───────────────────────────                                │
│  Slider/carousel con logros destacados                       │
│  - Proyectos de investigación                               │
│  - Premios en competencias                                  │
│  - Publicaciones                                            │
│  - Estudiantes/docentes destacados                          │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  📞 CTA FINAL + REDES SOCIALES                              │
│  ─────────────────────────────                              │
│  "¿Tienes preguntas? Contáctanos"                           │
│  Links a redes: Instagram, Facebook, LinkedIn, YouTube      │
│  Botón: [WhatsApp] [Email] [FAQ]                            │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│  FOOTER                                                      │
│  Logo | Links | Contacto | Sedes | Legal | ©                │
└─────────────────────────────────────────────────────────────┘
```

---

### 2.2 🎓 Carreras (`/carreras`)

#### Listado General
- Hero con título "Nuestras Carreras de Ingeniería"
- Filtros por modalidad (Presencial / Semipresencial / En línea)
- Filtros por sede (Ambato / Quito / Nacional)
- Grid de cards con información resumida
- Cada card enlaza a la página detallada

#### Detalle de Carrera (`/carreras/[slug]`)
| Sección | Contenido |
|---------|-----------|
| Hero | Nombre, imagen representativa, badge de modalidad |
| Descripción | ¿Qué es esta carrera? Perfil profesional |
| Malla Curricular | Tabla o acordeón por semestres |
| Campo Laboral | Áreas donde puede trabajar el graduado |
| Modalidad y Sedes | Presencial/Online, campus disponibles |
| Requisitos | Requisitos de ingreso |
| Duración | Número de semestres, créditos |
| CTA | [Solicitar Información] [Admisiones] |

---

### 2.3 📋 Trámites y Procesos (`/tramites`)

#### Hub de Trámites (Index)
- Hero con título "Trámites y Procesos"
- Buscador de trámites
- Grid de cards con todos los trámites disponibles
- Cada card: icono, nombre, descripción corta, enlace

#### Página de Trámite Individual

Cada trámite sigue una estructura consistente:

| Sección | Contenido |
|---------|-----------|
| Título y descripción | Qué es este trámite |
| Requisitos | Lista de documentos y condiciones necesarias |
| Pasos del proceso | Timeline visual paso a paso |
| Documentos necesarios | Lista con links a formularios descargables |
| Plazos y fechas | Fechas límite, duración del proceso |
| Contacto | A quién dirigirse para dudas |
| FAQ del trámite | Preguntas frecuentes específicas |

##### Trámites planificados:

1. **Matrículas** (`/tramites/matriculas`)
   - Calendario de matrículas
   - Proceso paso a paso
   - Requisitos por tipo (ordinaria, extraordinaria, especial)

2. **Titulación** (`/tramites/titulacion`)
   - Modalidades de titulación
   - Requisitos de graduación
   - Proceso completo con timeline
   - Documentos del instructivo

3. **Justificación de Faltas** (`/tramites/justificacion-faltas`)
   - Cuándo aplica
   - Documentos requeridos
   - Formulario de solicitud
   - Plazos

4. **Homologaciones** (`/tramites/homologaciones`)
   - Tipos de homologación
   - Requisitos
   - Proceso

5. **Prácticas Preprofesionales** (`/tramites/practicas`)
   - Requisitos para iniciar
   - Empresas convenio
   - Documentación
   - Seguimiento

6. **Vinculación** (`/tramites/vinculacion`)
   - Programas de vinculación
   - Requisitos
   - Proyectos disponibles

---

### 2.4 📅 Eventos (`/eventos`)

#### Listado de Eventos
- **Calendario interactivo** (componente React) — Vista mensual con eventos marcados
- **Lista cronológica** — Próximos eventos en cards
- **Filtros:** Todos | Hackatones | Conferencias | Talleres | Congresos | Concursos
- **Eventos pasados** — Con resultados y galería

#### Detalle de Evento (`/eventos/[slug]`)
| Sección | Contenido |
|---------|-----------|
| Hero | Imagen del evento, nombre, fecha prominente |
| Información | Descripción, objetivos |
| Logística | Fecha, hora, lugar, modalidad |
| Agenda | Programa del evento (timeline) |
| Ponentes/Jurado | Cards con foto y bio |
| Inscripción | Formulario o link externo |
| Resultados | (Post-evento) Ganadores, proyectos, galería |

##### Tipos de eventos contemplados:
- 🏆 Semana de las Ingenierías
- 💻 Hackatones
- 🎤 Conferencias magistrales
- 🔧 Talleres prácticos
- 📊 Congresos académicos
- 🏅 Concursos estudiantiles

---

### 2.5 📰 Noticias (`/noticias`)

#### Listado de Noticias
- Grid tipo magazine (1 destacada + grid)
- Filtros por categoría/tag
- Paginación o infinite scroll
- Barra de búsqueda

#### Detalle de Noticia (`/noticias/[slug]`)
- Hero image
- Título, fecha, autor, tags
- Contenido en Markdown (rich text)
- Galería de imágenes (si aplica)
- Compartir en redes sociales
- Noticias relacionadas

---

### 2.6 📄 Formularios Descargables (`/formularios`)

| Contenido | Detalles |
|-----------|----------|
| Lista categorizada | Agrupados por tipo de trámite |
| Cada formulario | Nombre, descripción, formato (PDF/DOCX), tamaño |
| Acción | Botón de descarga directa |
| Búsqueda | Filtrar formularios por nombre o categoría |

```
Categorías:
├── Matrículas
│   └── Formulario de matrícula extraordinaria.pdf
├── Titulación
│   └── Solicitud de modalidad de titulación.pdf
├── Justificación de Faltas
│   ├── Justificacion de faltas-II.pdf
│   └── Justificacion de faltas-TI.pdf
├── Prácticas Preprofesionales
│   └── Formato de plan de prácticas.pdf
└── Otros
    └── Instructivo graduación.pdf
```

---

### 2.7 ❓ Preguntas Frecuentes (`/faq`)

- Buscador de preguntas
- Categorías con acordeones
- Categorías propuestas:

| Categoría | Ejemplos de preguntas |
|-----------|----------------------|
| **Matrículas** | ¿Cuándo son las matrículas? ¿Puedo hacer matrícula en línea? |
| **Titulación** | ¿Cuáles son las modalidades? ¿Cuánto dura el proceso? |
| **Prácticas** | ¿Cuántas horas necesito? ¿Dónde puedo hacerlas? |
| **Administrativo** | ¿Cómo justifico faltas? ¿Cómo solicito homologación? |
| **Vida Universitaria** | ¿Hay clubes de ingeniería? ¿Cómo participo en eventos? |
| **Contacto** | ¿Dónde queda la secretaría? ¿Horarios de atención? |

---

### 2.8 🚫 Página 404

- Diseño divertido/temático de ingeniería
- Mensaje amigable: "¡Oops! Esta página no existe"
- Ilustración o animación (engranaje roto, código 404 estilizado)
- Links sugeridos: Inicio, Carreras, Trámites
- Buscador integrado

---

## 3. Footer Global

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│  [Logo UTI]  Facultad de Ingenierías                        │
│              Universidad Indoamérica                        │
│                                                              │
│  CARRERAS          TRÁMITES           RECURSOS              │
│  Mecatrónica       Matrículas         Formularios           │
│  Ing. Industrial   Titulación         FAQ                   │
│  Ing. Software     Just. Faltas       Calendario            │
│  Electricidad      Homologaciones     Noticias              │
│  Ing. Civil        Prácticas          Eventos               │
│  Ing. TI           Vinculación                              │
│                                                              │
│  CONTACTO                                                    │
│  📍 Ambato: Bolívar 20-35 y Guayaquil                       │
│  📍 Quito: Machala y Sabanilla                               │
│  📧 ingenierias@indoamerica.edu.ec                           │
│  📞 (03) 2 421-452                                           │
│                                                              │
│  REDES SOCIALES                                              │
│  [Instagram] [Facebook] [LinkedIn] [YouTube] [TikTok]       │
│                                                              │
│  ENLACES INSTITUCIONALES                                     │
│  [Sitio Principal UTI] [Aula Virtual] [SGA] [Correo]        │
│                                                              │
│  ─────────────────────────────────────────────────────       │
│  © 2026 Universidad Indoamérica — Todos los derechos        │
│  reservados. | Política de Privacidad                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Flujo de Navegación del Usuario

### 4.1 Estudiante que necesita un trámite

```
Inicio → Acceso Rápido "Matrículas" → /tramites/matriculas
  └── Lee requisitos → Descarga formulario → Contacto si tiene dudas
```

### 4.2 Aspirante que quiere información

```
Inicio → "Explorar Carreras" → /carreras → Filtra por modalidad
  └── Click en "Ing. Software" → /carreras/ingenieria-software
       └── Lee perfil → Click "Admisiones" → Link externo UTI
```

### 4.3 Estudiante buscando eventos

```
Inicio → "Próximos Eventos" → /eventos
  └── Click en "Hackaton 2026" → /eventos/hackaton-2026
       └── Ve agenda → Se inscribe
```
