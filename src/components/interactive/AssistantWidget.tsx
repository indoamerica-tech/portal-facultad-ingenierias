import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { MessageCircle, X, Send, Sparkles, ArrowLeft, Bot } from 'lucide-react';

/* ============================================================
   ASISTENTE INTELIGENTE ACCESIBLE DE LA FACULTAD (NOVEDAD A)
   ------------------------------------------------------------
   - Activación por atajo de teclado global: Alt + A
   - Compatible con lector de pantalla (NVDA) mediante aria-live="polite"
   - Entrada en lenguaje natural con procesamiento semántico
   - Opciones guiadas accesibles por teclado sin trampas de foco
   ============================================================ */

interface Topic {
  id: string;
  label: string;
  keywords: string[];
  answer: string;
  links?: { label: string; href: string }[];
  followUps?: string[];
}

const TOPICS: Record<string, Topic> = {
  matriculas: {
    id: 'matriculas',
    label: '¿Cómo me matriculo?',
    keywords: ['matricula', 'matricularme', 'ordinaria', 'extraordinaria', 'pago', 'costo', 'inscripcion', 'arancel'],
    answer:
      'Las matrículas ordinarias van hasta el 8 de agosto. Las extraordinarias, del 10 al 24 de agosto con un recargo del 10%. Necesitas estar al día en pagos y no tener novedades académicas pendientes.',
    links: [{ label: 'Proceso de matrícula', href: '/tramites/matriculas' }],
    followUps: ['horarios', 'faltas'],
  },
  horarios: {
    id: 'horarios',
    label: 'Consultar mi horario',
    keywords: ['horario', 'clases', 'aulas', 'paralelo', 'cruce', 'materias'],
    answer:
      'Los horarios se publican por carrera, nivel y paralelo al inicio de cada periodo académico. Si encuentras un cruce de asignaturas, puedes solicitar el ajuste antes del cierre de matrículas.',
    links: [{ label: 'Horarios académicos', href: '/tramites/horarios' }],
    followUps: ['matriculas', 'contacto'],
  },
  titulacion: {
    id: 'titulacion',
    label: 'Quiero titularme',
    keywords: ['titulacion', 'grado', 'titularme', 'complexivo', 'tesis', 'integracion curricular', 'articulo cientifico'],
    answer:
      'Existen tres modalidades de titulación: Trabajo de Integración Curricular, Examen Complexivo y Artículo Científico. El proceso dura aproximadamente un periodo académico desde su registro.',
    links: [{ label: 'Trámite de titulación', href: '/tramites/titulacion' }],
    followUps: ['practicas', 'contacto'],
  },
  faltas: {
    id: 'faltas',
    label: 'Justificar una falta',
    keywords: ['falta', 'justificar', 'inasistencia', 'medico', 'permiso', 'certificado', '72 horas'],
    answer:
      'Dispones de 72 horas hábiles desde la inasistencia para presentar la justificación junto al documento de respaldo (certificado médico o calamidad). Se ingresa mediante solicitud oficial.',
    links: [{ label: 'Justificación de faltas', href: '/tramites/justificacion-faltas' }],
    followUps: ['matriculas', 'contacto'],
  },
  practicas: {
    id: 'practicas',
    label: 'Prácticas y vinculación',
    keywords: ['practicas', 'pasantias', 'vinculacion', 'horas', 'convenio', 'comunitario', 'sociedad', '240 horas'],
    answer:
      'Se requieren 240 horas de prácticas preprofesionales y 160 horas de vinculación con la sociedad en instituciones u organizaciones con convenio vigente, avaladas con informe final.',
    links: [
      { label: 'Prácticas preprofesionales', href: '/tramites/practicas' },
      { label: 'Vinculación comunitaria', href: '/tramites/vinculacion' },
    ],
    followUps: ['titulacion', 'contacto'],
  },
  carreras: {
    id: 'carreras',
    label: 'Carreras de ingeniería',
    keywords: ['carrera', 'carreras', 'oferta', 'oferta academica', 'estudiar', 'ingenierias'],
    answer:
      'La facultad ofrece tres carreras: Ingeniería en Tecnologías de la Información, Ingeniería Industrial e Ingeniería Eléctrica. Cada carrera cuenta con malla curricular detallada y perfiles de egreso.',
    links: [{ label: 'Ver todas las carreras', href: '/carreras' }],
    followUps: ['ti', 'matriculas'],
  },
  ti: {
    id: 'ti',
    label: 'Tecnologías de la Información',
    keywords: ['ti', 'tecnologias de la informacion', 'sistemas', 'software', 'redes', 'computacion', 'malla ti'],
    answer:
      'La carrera de Ingeniería en Tecnologías de la Información forma profesionales en desarrollo de software, ciberseguridad, redes e infraestructuras cloud. Su plan de estudios se organiza en 8 semestres.',
    links: [{ label: 'Malla y perfil de TI', href: '/carreras/ingenieria-en-tecnologias-de-la-informacion' }],
    followUps: ['matriculas', 'horarios'],
  },
  contacto: {
    id: 'contacto',
    label: 'Contacto y atención',
    keywords: ['contacto', 'telefono', 'correo', 'ubicacion', 'secretaria', 'campus', 'quito', 'atencion'],
    answer:
      'Puedes contactar a la facultad escribiendo a ingenierias@uti.edu.ec o llamando al teléfono (02) 382 6970 (Campus Quito). Horario de atención: lunes a viernes de 08:00 a 17:00.',
    links: [
      { label: 'Enviar correo', href: 'mailto:ingenierias@uti.edu.ec' },
      { label: 'Preguntas frecuentes (FAQ)', href: '/faq' },
    ],
    followUps: ['carreras', 'matriculas'],
  },
};

const ENTRY_TOPICS = ['carreras', 'matriculas', 'horarios', 'titulacion', 'faltas', 'practicas'];

type Message =
  | { kind: 'bot'; text: string; links?: Topic['links'] }
  | { kind: 'user'; text: string };

const GREETING: Message = {
  kind: 'bot',
  text: '¡Hola! Soy el Asistente Accesible de la Facultad de Ingenierías. Puedes elegir una opción rápida o escribir tu consulta en lenguaje natural (Atajo rápido: Alt + A).',
};

export default function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [options, setOptions] = useState<string[]>(ENTRY_TOPICS);
  const [typing, setTyping] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [inputText, setInputText] = useState('');
  const [liveAnnouncement, setLiveAnnouncement] = useState('');

  const reduce = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const timers = useRef<number[]>([]);

  // Limpieza de timers al desmontar
  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    []
  );

  // Atajo de teclado global: Alt + A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setOpen((prev) => {
          const next = !prev;
          if (next) {
            setLiveAnnouncement('Asistente accesible abierto. Escribe tu consulta o presiona Escape para cerrar.');
          } else {
            setLiveAnnouncement('Asistente cerrado.');
          }
          return next;
        });
      } else if (e.key === 'Escape' && open) {
        e.preventDefault();
        setOpen(false);
        setLiveAnnouncement('Asistente cerrado.');
        fabRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  // Enfocar el input cuando se abre el asistente
  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      timers.current.push(t);
    }
  }, [open]);

  // Nudge sutil tras 6 segundos
  useEffect(() => {
    if (open) return;
    const t = window.setTimeout(() => setNudge(true), 6000);
    timers.current.push(t);
    return () => clearTimeout(t);
  }, [open]);

  // Auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? 'auto' : 'smooth' });
  }, [messages, typing, reduce]);

  const respondWithTopic = (topic: Topic) => {
    setTyping(true);
    const t = window.setTimeout(
      () => {
        setTyping(false);
        setMessages((m) => [...m, { kind: 'bot', text: topic.answer, links: topic.links }]);
        setOptions(topic.followUps ?? ENTRY_TOPICS);
        setLiveAnnouncement(`Respuesta del asistente: ${topic.answer}`);
      },
      reduce ? 0 : 400
    );
    timers.current.push(t);
  };

  const ask = (topicId: string) => {
    const topic = TOPICS[topicId];
    if (!topic) return;

    setMessages((m) => [...m, { kind: 'user', text: topic.label }]);
    setOptions([]);
    respondWithTopic(topic);
  };

  // Procesamiento semántico en lenguaje natural
  const handleQuery = (query: string) => {
    const clean = query.trim().toLowerCase();
    if (!clean) return;

    setMessages((m) => [...m, { kind: 'user', text: query }]);
    setInputText('');
    setOptions([]);

    // Búsqueda de coincidencia en tópicos
    const match = Object.values(TOPICS).find((topic) =>
      topic.keywords.some((kw) => clean.includes(kw)) || clean.includes(topic.id)
    );

    if (match) {
      respondWithTopic(match);
    } else {
      setTyping(true);
      const t = window.setTimeout(
        () => {
          setTyping(false);
          const fallbackText =
            'No encontré información exacta para tu consulta, pero puedes consultar las secciones de Mallas Curriculares o Trámites Estudiantiles, o comunicarte con secretaría.';
          setMessages((m) => [
            ...m,
            {
              kind: 'bot',
              text: fallbackText,
              links: [
                { label: 'Explorar Carreras', href: '/carreras' },
                { label: 'Trámites Estudiantiles', href: '/tramites' },
                { label: 'Preguntas Frecuentes', href: '/faq' },
              ],
            },
          ]);
          setOptions(ENTRY_TOPICS);
          setLiveAnnouncement(`Respuesta del asistente: ${fallbackText}`);
        },
        reduce ? 0 : 400
      );
      timers.current.push(t);
    }
  };

  const reset = () => {
    setMessages([GREETING]);
    setOptions(ENTRY_TOPICS);
    setTyping(false);
    setLiveAnnouncement('Conversación reiniciada.');
  };

  const toggle = () => {
    setNudge(false);
    setOpen((o) => {
      const next = !o;
      if (next) {
        setLiveAnnouncement('Asistente accesible abierto.');
      }
      return next;
    });
  };

  return (
    <>
      {/* Región activa para lectores de pantalla (NVDA) */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {liveAnnouncement}
      </div>

      {/* Botón flotante activador con indicador de atajo */}
      <motion.button
        ref={fabRef}
        className="assistant-fab"
        onClick={toggle}
        aria-label={open ? 'Cerrar asistente inteligente (Alt+A)' : 'Abrir asistente inteligente con IA (Atajo: Alt+A)'}
        aria-expanded={open}
        initial={false}
        whileHover={reduce ? undefined : { scale: 1.06 }}
        whileTap={reduce ? undefined : { scale: 0.94 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'close' : 'open'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="assistant-fab__icon"
          >
            {open ? <X size={21} /> : <MessageCircle size={21} />}
          </motion.span>
        </AnimatePresence>

        {!open && <span className="assistant-fab__ping" aria-hidden="true" />}
      </motion.button>

      {/* Burbuja informativa inicial */}
      <AnimatePresence>
        {nudge && !open && (
          <motion.div
            className="assistant-nudge"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          >
            <Sparkles size={14} aria-hidden="true" />
            <span>Asistente con IA (Alt+A)</span>
            <button onClick={() => setNudge(false)} aria-label="Descartar aviso">
              <X size={13} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel del Asistente */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="assistant"
            role="dialog"
            aria-modal="false"
            aria-label="Asistente Inteligente de la Facultad de Ingenierías"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={
              reduce ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }
            }
          >
            <header className="assistant__head">
              <span className="assistant__avatar" aria-hidden="true">
                <Bot size={18} />
              </span>
              <div className="assistant__id">
                <strong>Asistente IA Accesible</strong>
                <span className="assistant__status">
                  <i className="live-dot" /> Atajo: Alt + A
                </span>
              </div>
              {messages.length > 1 && (
                <button
                  className="assistant__reset"
                  onClick={reset}
                  aria-label="Reiniciar conversación"
                  title="Reiniciar conversación"
                >
                  <ArrowLeft size={15} />
                </button>
              )}
              <button
                className="assistant__reset"
                onClick={() => setOpen(false)}
                aria-label="Cerrar asistente"
                title="Cerrar asistente (Escape)"
              >
                <X size={16} />
              </button>
            </header>

            <div className="assistant__body" ref={scrollRef} tabIndex={0} aria-label="Historial de mensajes">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  className={`bubble bubble--${m.kind}`}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p>{m.text}</p>
                  {m.kind === 'bot' && m.links && (
                    <div className="bubble__links" role="group" aria-label="Enlaces sugeridos">
                      {m.links.map((l) => (
                        <a key={l.href} href={l.href} className="bubble__link">
                          {l.label}
                        </a>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              {typing && (
                <motion.div
                  className="bubble bubble--bot bubble--typing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  aria-label="Procesando respuesta"
                >
                  <span /><span /><span />
                </motion.div>
              )}
            </div>

            {/* Opciones rápidas */}
            {options.length > 0 && (
              <div className="assistant__options" role="group" aria-label="Preguntas frecuentes sugeridas">
                <AnimatePresence mode="popLayout">
                  {options.map((id, i) => (
                    <motion.button
                      key={id}
                      className="chip"
                      onClick={() => ask(id)}
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ delay: reduce ? 0 : i * 0.04, duration: 0.2 }}
                    >
                      {TOPICS[id]?.label}
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Campo de entrada en lenguaje natural */}
            <form
              className="assistant__input-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleQuery(inputText);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 0.75rem',
                borderTop: '1px solid var(--border-color)',
                background: 'var(--surface-card)',
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Escribe tu duda aquí..."
                aria-label="Escribe tu consulta para el asistente"
                style={{
                  flex: 1,
                  padding: '0.45rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--surface-input, rgba(255,255,255,0.06))',
                  color: 'inherit',
                  fontSize: '0.85rem',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                aria-label="Enviar pregunta"
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--accent, #FF6600)',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                <Send size={15} />
              </button>
            </form>

            <footer className="assistant__foot">
              <p>
                Información institucional oficial. Para dudas específicas,{' '}
                <a href="mailto:ingenierias@uti.edu.ec">escríbenos</a>.
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
