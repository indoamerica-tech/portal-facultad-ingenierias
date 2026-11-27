/* ============================================================
   FUENTE ÚNICA DE VERDAD — contenido estructurado del portal.
   Header, portada, listados y páginas internas leen de aquí:
   un cambio de dato se propaga a todo el sitio.

   ALCANCE (fase 1, acordado con la coordinación):
   · Solo las carreras que se imparten en QUITO.
   · Eventos, noticias y anuncios viven DENTRO de cada carrera,
     no como secciones globales.
   · Sin Aula Virtual, SGA, Admisiones ni Correo en la navegación.
     (Las instrucciones de los trámites sí mencionan el SGA, porque
      el procedimiento real pasa por esa plataforma.)
   ============================================================ */

export interface Carrera {
  slug: string;
  nombre: string;
  nombreCorto: string;
  href: string;
  icon: string;
  color: string;
  campus: string;
  modalidad: string;
  duracion: string;
  titulo: string;
  descripcion: string;
  destacados: string[];
}

export const CARRERAS: Carrera[] = [
  {
    slug: 'ingenieria-industrial',
    nombre: 'Ingeniería Industrial',
    nombreCorto: 'Industrial',
    href: '/carreras/ingenieria-industrial',
    icon: 'factory',
    color: 'var(--c-industrial)',
    campus: 'Quito',
    modalidad: 'Presencial / Semipresencial',
    duracion: '9 semestres',
    titulo: 'Ingeniero/a Industrial',
    descripcion:
      'Optimiza procesos, cadenas de suministro y sistemas productivos con datos y método.',
    destacados: ['Lean manufacturing', 'Investigación de operaciones', 'Gestión de calidad'],
  },
  {
    slug: 'ingenieria-ti',
    nombre: 'Tecnologías de la Información',
    nombreCorto: 'Tecnologías de la Información',
    href: '/carreras/ingenieria-ti',
    icon: 'network',
    color: 'var(--c-ti)',
    campus: 'Quito',
    modalidad: 'Presencial',
    duracion: '8 semestres',
    titulo: 'Ingeniero/a en Tecnologías de la Información',
    descripcion:
      'Redes, ciberseguridad y ciencia de datos para la infraestructura digital.',
    destacados: ['Ciberseguridad', 'Ciencia de datos', 'Infraestructura de red'],
  },
  {
    slug: 'ingenieria-electrica',
    nombre: 'Ingeniería Eléctrica',
    nombreCorto: 'Eléctrica',
    href: '/carreras/ingenieria-electrica',
    icon: 'zap',
    color: 'var(--c-electricidad)',
    campus: 'Quito',
    modalidad: 'Presencial',
    duracion: '9 semestres',
    titulo: 'Ingeniero/a Eléctrico',
    descripcion:
      'Sistemas de potencia, energías renovables y redes eléctricas inteligentes.',
    destacados: ['Redes inteligentes', 'Energías renovables', 'Sistemas de potencia'],
  },
];

export const getCarrera = (slug: string) => CARRERAS.find((c) => c.slug === slug);

/* ------------------------------------------------------------------ */

export interface Tramite {
  slug: string;
  nombre: string;
  href: string;
  icon: string;
  descripcion: string;
  duracion: string;
  categoria: 'Académico' | 'Administrativo';
}

export const TRAMITES: Tramite[] = [
  {
    slug: 'matriculas',
    nombre: 'Matrículas',
    href: '/tramites/matriculas',
    icon: 'clipboard-list',
    descripcion: 'Ordinarias, extraordinarias y especiales. Fechas, requisitos y pagos.',
    duracion: '3–5 días',
    categoria: 'Académico',
  },
  {
    slug: 'horarios',
    nombre: 'Horarios',
    href: '/tramites/horarios',
    icon: 'calendar-days',
    descripcion: 'Consulta el horario de clases de tu carrera, nivel y paralelo.',
    duracion: 'Consulta',
    categoria: 'Académico',
  },
  {
    slug: 'justificacion-faltas',
    nombre: 'Justificación de faltas',
    href: '/tramites/justificacion-faltas',
    icon: 'file-check',
    descripcion: 'Plazos, causales admitidas y formulario de justificación.',
    duracion: '72 horas',
    categoria: 'Administrativo',
  },
  {
    slug: 'titulacion',
    nombre: 'Titulación',
    href: '/tramites/titulacion',
    icon: 'graduation-cap',
    descripcion: 'Modalidades, cronograma y el instructivo completo de graduación.',
    duracion: '1 semestre',
    categoria: 'Académico',
  },
  {
    slug: 'practicas',
    nombre: 'Prácticas preprofesionales',
    href: '/tramites/practicas',
    icon: 'briefcase',
    descripcion: 'Convenios, horas requeridas y seguimiento de tu práctica.',
    duracion: '240 horas',
    categoria: 'Administrativo',
  },
  {
    slug: 'vinculacion',
    nombre: 'Vinculación con la sociedad',
    href: '/tramites/vinculacion',
    icon: 'handshake',
    descripcion: 'Proyectos, horas de vinculación y certificación.',
    duracion: '160 horas',
    categoria: 'Administrativo',
  },
];

/* ------------------------------------------------------------------
   NOVEDADES POR CARRERA
   Eventos, noticias y anuncios. Cada entrada declara a qué carreras
   pertenece; `carreras: 'todas'` la muestra en las tres.

   ⚠ CONTENIDO DE MUESTRA — pendiente de reemplazar por información
   real de la coordinación antes de publicar.
   ------------------------------------------------------------------ */

export type TipoNovedad = 'Evento' | 'Noticia' | 'Anuncio';

export interface Novedad {
  id: string;
  tipo: TipoNovedad;
  titulo: string;
  resumen: string;
  fecha: string;
  fechaISO: string;
  /** Slugs de carrera, o 'todas' */
  carreras: string[] | 'todas';
  /** Solo para eventos */
  lugar?: string;
  hora?: string;
}

export const NOVEDADES: Novedad[] = [
  {
    id: 'matriculas-extraordinarias',
    tipo: 'Anuncio',
    titulo: 'Matrículas extraordinarias abiertas',
    resumen: 'Del 10 al 24 de agosto, con recargo del 10% sobre el arancel ordinario.',
    fecha: '10 Jul 2026',
    fechaISO: '2026-07-10',
    carreras: 'todas',
  },
  {
    id: 'horarios-publicados',
    tipo: 'Anuncio',
    titulo: 'Publicación de horarios del periodo',
    resumen: 'Ya puedes consultar el horario de clases por nivel y paralelo.',
    fecha: '05 Jul 2026',
    fechaISO: '2026-07-05',
    carreras: 'todas',
  },

  /* --- Ingeniería Industrial --- */
  {
    id: 'visita-planta-industrial',
    tipo: 'Evento',
    titulo: 'Visita técnica a planta de manufactura',
    resumen: 'Recorrido por una línea de producción real para estudiantes de 5.º semestre en adelante.',
    fecha: '28 Ago 2026',
    fechaISO: '2026-08-28',
    hora: '08:00',
    lugar: 'Salida desde Campus Quito',
    carreras: ['ingenieria-industrial'],
  },
  {
    id: 'taller-lean',
    tipo: 'Evento',
    titulo: 'Taller de Lean Manufacturing',
    resumen: 'Simulación de una célula de producción y cálculo de indicadores de eficiencia.',
    fecha: '12 Sep 2026',
    fechaISO: '2026-09-12',
    hora: '09:00',
    lugar: 'Campus Quito — Laboratorio de Procesos',
    carreras: ['ingenieria-industrial'],
  },
  {
    id: 'convenio-manufactura',
    tipo: 'Noticia',
    titulo: 'Nuevo convenio para prácticas en el sector manufacturero',
    resumen: 'Doce empresas se suman a la red de prácticas preprofesionales de la carrera.',
    fecha: '01 Jul 2026',
    fechaISO: '2026-07-01',
    carreras: ['ingenieria-industrial'],
  },

  /* --- Tecnologías de la Información --- */
  {
    id: 'hackaton-ti',
    tipo: 'Evento',
    titulo: 'Hackaton de Ciberseguridad',
    resumen: 'Cuarenta y ocho horas para resolver retos de seguridad ofensiva y defensiva.',
    fecha: '22 Ago 2026',
    fechaISO: '2026-08-22',
    hora: '08:00',
    lugar: 'Campus Quito — Laboratorio de Redes',
    carreras: ['ingenieria-ti'],
  },
  {
    id: 'charla-datos',
    tipo: 'Evento',
    titulo: 'Charla: ciencia de datos en la industria',
    resumen: 'Casos reales de analítica y modelos predictivos aplicados en empresas del país.',
    fecha: '05 Sep 2026',
    fechaISO: '2026-09-05',
    hora: '17:00',
    lugar: 'Campus Quito — Auditorio',
    carreras: ['ingenieria-ti'],
  },
  {
    id: 'certificaciones-redes',
    tipo: 'Noticia',
    titulo: 'Estudiantes obtienen certificación internacional en redes',
    resumen: 'Quince estudiantes aprobaron la certificación tras el programa de la carrera.',
    fecha: '24 Jun 2026',
    fechaISO: '2026-06-24',
    carreras: ['ingenieria-ti'],
  },

  /* --- Ingeniería Eléctrica --- */
  {
    id: 'taller-fotovoltaico',
    tipo: 'Evento',
    titulo: 'Taller de sistemas fotovoltaicos',
    resumen: 'Dimensionamiento y montaje de una instalación solar, de la teoría a la práctica.',
    fecha: '19 Sep 2026',
    fechaISO: '2026-09-19',
    hora: '09:00',
    lugar: 'Campus Quito — Laboratorio de Electricidad',
    carreras: ['ingenieria-electrica'],
  },
  {
    id: 'laboratorio-potencia',
    tipo: 'Noticia',
    titulo: 'Renovación del laboratorio de sistemas de potencia',
    resumen: 'Nuevos bancos de pruebas para ensayos de protecciones y calidad de energía.',
    fecha: '18 Jun 2026',
    fechaISO: '2026-06-18',
    carreras: ['ingenieria-electrica'],
  },
];

/** Novedades de una carrera: las suyas más las marcadas como 'todas'. */
export const novedadesDeCarrera = (slug: string): Novedad[] =>
  NOVEDADES.filter(
    (n) => n.carreras === 'todas' || (Array.isArray(n.carreras) && n.carreras.includes(slug))
  ).sort((a, b) => b.fechaISO.localeCompare(a.fechaISO));

/* ------------------------------------------------------------------ */

export interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  detail: string;
}

/* Solo cifras verificables. Las de matrícula y empleabilidad se retiran
   hasta que la coordinación entregue el dato oficial. */
export const STATS: Stat[] = [
  { value: 3, label: 'Carreras', detail: 'Programas de ingeniería en Quito' },
  { value: 41, label: 'Años', detail: 'De trayectoria institucional' },
  { value: 6, label: 'Trámites', detail: 'Gestionables desde el portal' },
];

/** Pilares diferenciales de la Facultad — sección "por qué aquí". */
export const PILARES = [
  {
    icon: 'flask-conical',
    titulo: 'Laboratorios de verdad',
    descripcion:
      'Procesos, redes y potencia. Se aprende con la máquina encendida, no con diapositivas.',
  },
  {
    icon: 'handshake',
    titulo: 'Puente con la industria',
    descripcion:
      'Convenios activos con empresas del sector para prácticas, proyectos de titulación y contratación directa.',
  },
  {
    icon: 'lightbulb',
    titulo: 'Investigación aplicada',
    descripcion:
      'Semilleros y grupos de investigación donde el estudiante publica, patenta y compite.',
  },
  {
    icon: 'globe',
    titulo: 'Modalidad flexible',
    descripcion:
      'Presencial y semipresencial. La carrera se adapta a tu vida, no al revés.',
  },
];
