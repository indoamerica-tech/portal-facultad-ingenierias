import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { MessageCircle, X, Send, Sparkles, ArrowLeft } from 'lucide-react';

/* ============================================================
   ASISTENTE DE LA FACULTAD
   ------------------------------------------------------------
   Conversación guiada: el usuario elige entre opciones y el
   asistente responde con la información y el enlace al trámite.

   Es deliberadamente determinista (sin LLM): las respuestas son
   institucionales y deben ser exactas. El árbol vive en TOPICS,
   así que ampliarlo es añadir un objeto.
   ============================================================ */

interface Topic {
  id: string;
  label: string;
  answer: string;
  links?: { label: string; href: string }[];
  followUps?: string[];
}

const TOPICS: Record<string, Topic> = {
  matriculas: {
    id: 'matriculas',
    label: '¿Cómo me matriculo?',
    answer:
      'Las matrículas ordinarias van hasta el 8 de agosto. Las extraordinarias, del 10 al 24 de agosto con un recargo del 10%. Necesitas estar al día en pagos y no tener novedades académicas pendientes.',
    links: [{ label: 'Proceso de matrícula', href: '/tramites/matriculas' }],
    followUps: ['horarios', 'faltas'],
  },
  horarios: {
    id: 'horarios',
    label: 'Consultar mi horario',
    answer:
      'Los horarios se publican por carrera, nivel y paralelo al inicio de cada periodo. Si encuentras un cruce de materias, avisa a la coordinación de tu carrera antes del cierre de matrículas.',
    links: [{ label: 'Horarios', href: '/tramites/horarios' }],
    followUps: ['matriculas', 'contacto'],
  },
  titulacion: {
    id: 'titulacion',
    label: 'Quiero titularme',
    answer:
      'Existen tres modalidades: Trabajo de Integración Curricular, Examen Complexivo y Artículo Científico. El proceso toma aproximadamente un semestre desde la inscripción.',
    links: [{ label: 'Trámite de titulación', href: '/tramites/titulacion' }],
    followUps: ['practicas', 'contacto'],
  },
  faltas: {
    id: 'faltas',
    label: 'Justificar una falta',
    answer:
      'Tienes 72 horas hábiles desde la inasistencia para presentar la justificación, con el documento de respaldo (certificado médico, citación, etc.). Se entrega mediante el formulario oficial.',
    links: [{ label: 'Justificación de faltas', href: '/tramites/justificacion-faltas' }],
    followUps: ['matriculas', 'contacto'],
  },
  practicas: {
    id: 'practicas',
    label: 'Prácticas y vinculación',
    answer:
      'Son 240 horas de prácticas preprofesionales y 160 de vinculación con la sociedad, en instituciones con convenio vigente. Ambas se cierran con un informe final avalado.',
    links: [
      { label: 'Prácticas preprofesionales', href: '/tramites/practicas' },
      { label: 'Vinculación', href: '/tramites/vinculacion' },
    ],
    followUps: ['titulacion', 'contacto'],
  },
  carreras: {
    id: 'carreras',
    label: 'Ver las carreras',
    answer:
      'En el campus Quito ofrecemos tres carreras: Ingeniería Industrial (presencial y semipresencial), Tecnologías de la Información e Ingeniería Eléctrica. En la página de cada una están sus eventos, noticias y anuncios.',
    links: [{ label: 'Explorar carreras', href: '/carreras' }],
    followUps: ['matriculas', 'horarios'],
  },
  contacto: {
    id: 'contacto',
    label: 'Hablar con alguien',
    answer:
      'Puedes escribirnos a ingenierias@uti.edu.ec o llamar al (02) 382 6970, campus Quito. Atención de lunes a viernes, de 08:00 a 17:00.',
    links: [
      { label: 'Enviar correo', href: 'mailto:ingenierias@uti.edu.ec' },
      { label: 'Preguntas frecuentes', href: '/faq' },
    ],
    followUps: ['carreras', 'matriculas'],
  },
};

const ENTRY_TOPICS = ['matriculas', 'horarios', 'faltas', 'carreras'];

type Message =
  | { kind: 'bot'; text: string; links?: Topic['links'] }
  | { kind: 'user'; text: string };

const GREETING: Message = {
  kind: 'bot',
  text: '¡Hola! Soy el asistente de la Facultad de Ingenierías. ¿En qué te ayudo?',
};

export default function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [options, setOptions] = useState<string[]>(ENTRY_TOPICS);
  const [typing, setTyping] = useState(false);
  const [nudge, setNudge] = useState(false);

  const reduce = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  /* Limpia cualquier temporizador pendiente al desmontar: evita
     setState sobre un componente muerto si el usuario navega. */
  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    []
  );

  /* Un único empujón visual a los 6s, si nunca se abrió */
  useEffect(() => {
    if (open) return;
    const t = window.setTimeout(() => setNudge(true), 6000);
    timers.current.push(t);
    return () => clearTimeout(t);
  }, [open]);

  /* Auto-scroll al último mensaje */
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? 'auto' : 'smooth' });
  }, [messages, typing, reduce]);

  const ask = (topicId: string) => {
    const topic = TOPICS[topicId];
    if (!topic) return;

    setMessages((m) => [...m, { kind: 'user', text: topic.label }]);
    setOptions([]);
    setTyping(true);

    const t = window.setTimeout(
      () => {
        setTyping(false);
        setMessages((m) => [...m, { kind: 'bot', text: topic.answer, links: topic.links }]);
        setOptions(topic.followUps ?? ENTRY_TOPICS);
      },
      reduce ? 0 : 780
    );
    timers.current.push(t);
  };

  const reset = () => {
    setMessages([GREETING]);
    setOptions(ENTRY_TOPICS);
    setTyping(false);
  };

  const toggle = () => {
    setNudge(false);
    setOpen((o) => !o);
  };

  const showBack = messages.length > 1;

  return (
    <>
      {/* ---------------- Lanzador ---------------- */}
      <motion.button
        className="assistant-fab"
        onClick={toggle}
        aria-label={open ? 'Cerrar asistente' : 'Abrir asistente de la Facultad'}
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

      {/* ---------------- Burbuja de invitación ---------------- */}
      <AnimatePresence>
        {nudge && !open && (
          <motion.div
            className="assistant-nudge"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          >
            <Sparkles size={14} />
            <span>¿Dudas con un trámite?</span>
            <button onClick={() => setNudge(false)} aria-label="Descartar">
              <X size={13} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------- Panel ---------------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="assistant"
            role="dialog"
            aria-label="Asistente de la Facultad de Ingenierías"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={
              reduce ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }
            }
          >
            <header className="assistant__head">
              <span className="assistant__avatar" aria-hidden="true">
                <Sparkles size={16} />
              </span>
              <div className="assistant__id">
                <strong>Asistente de Ingenierías</strong>
                <span className="assistant__status">
                  <i className="live-dot" /> En línea
                </span>
              </div>
              {showBack && (
                <button className="assistant__reset" onClick={reset} aria-label="Reiniciar conversación">
                  <ArrowLeft size={15} />
                </button>
              )}
            </header>

            <div className="assistant__body" ref={scrollRef}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  className={`bubble bubble--${m.kind}`}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p>{m.text}</p>
                  {m.kind === 'bot' && m.links && (
                    <div className="bubble__links">
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
                  aria-label="Escribiendo"
                >
                  <span /><span /><span />
                </motion.div>
              )}
            </div>

            <div className="assistant__options">
              <AnimatePresence mode="popLayout">
                {options.map((id, i) => (
                  <motion.button
                    key={id}
                    className="chip"
                    onClick={() => ask(id)}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ delay: reduce ? 0 : i * 0.05, duration: 0.26 }}
                  >
                    {TOPICS[id].label}
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>

            <footer className="assistant__foot">
              <p>
                Respuestas orientativas. Para casos particulares,{' '}
                <a href="mailto:ingenierias@uti.edu.ec">escríbenos</a>.
              </p>
              <Send size={13} aria-hidden="true" />
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
