import React, { useState } from 'react';
import ProcessStepper from './ProcessStepper';
import { Mail, Calendar, DollarSign, Clock, HelpCircle, FileText, CheckCircle } from 'lucide-react';

export default function FaltasWidget() {
  const [selectedCarrera, setSelectedCarrera] = useState<'industrial' | 'ti'>('industrial');

  const stepsIndustrial = [
    {
      number: 1,
      title: 'Redactar Solicitud',
      badge: 'Estudiante',
      badgeType: 'purple' as const,
      content: (
        <div className="step-details-body">
          <p>Debes preparar un documento en formato PDF de <strong>dos o más hojas</strong> que contenga la solicitud oficial firmada:</p>
          <ul>
            <li><strong>Primera hoja:</strong> Solicitud general dirigida a la <strong>Psic. Valeria Fiallos</strong> (Coordinadora del Área de Seguimiento Estudiantil). Debe ser llenada con tus datos personales y firmada obligatoriamente con <strong>esfero azul</strong>.</li>
            <li><strong>Segunda hoja:</strong> Información académica detallada. Especifica el proyecto formativo, docente a cargo y las actividades/tareas que no pudiste presentar a causa de la inasistencia.</li>
          </ul>
          <div className="alert-info-box">
            <Info size={16} />
            <span>El formato oficial consta de estas dos páginas y debe llenarse completamente sin tachones.</span>
          </div>
        </div>
      )
    },
    {
      number: 2,
      title: 'Reunir Respaldos',
      badge: 'Requisito',
      badgeType: 'orange' as const,
      content: (
        <div className="step-details-body">
          <p>Adjunta las evidencias válidas que justifiquen tu inasistencia en las fechas señaladas:</p>
          <ul>
            <li><strong>Certificado Médico:</strong> Debe estar sellado físicamente por el médico de la institución (atención los sábados de 08h00 a 12h00).</li>
            <li><strong>Certificado Laboral:</strong> Emitido en hoja membretada de la empresa, especificando tu horario de trabajo que impidió tu asistencia.</li>
            <li><strong>Calamidad Doméstica:</strong> Documentación y evidencias correspondientes a la situación de fuerza mayor.</li>
          </ul>
        </div>
      )
    },
    {
      number: 3,
      title: 'Subir al SGA',
      badge: 'SGA',
      badgeType: 'purple' as const,
      content: (
        <div className="step-details-body">
          <p>Genera el trámite digital en la plataforma SGA consolidando todo en un único archivo PDF:</p>
          <ol className="styled-list">
            <li>Ingresa al <strong>SGA</strong> e ir al módulo <strong>Solicitudes a Secretaría</strong>.</li>
            <li>Haz clic en <strong>Adicionar</strong> y selecciona el tipo: <strong>Solicitud de justificación de faltas</strong>.</li>
            <li>En comentarios, copia íntegramente el texto de tu solicitud escrita.</li>
            <li><strong>Importante:</strong> Asigna el trámite al <strong>Sr. Christian Palomino</strong>.</li>
            <li>Carga el PDF con la solicitud y los respaldos, y haz clic en <strong>Guardar</strong>.</li>
          </ol>
        </div>
      )
    },
    {
      number: 4,
      title: 'Pagar Trámite',
      badge: '$5.00',
      badgeType: 'success' as const,
      content: (
        <div className="step-details-body">
          <p>Para que la secretaría pueda procesar tu solicitud, debes realizar el pago del arancel correspondiente:</p>
          <ul>
            <li>El costo del trámite es de <strong>$5.00 USD</strong>.</li>
            <li>El pago se habilita en el SGA una vez que guardas la solicitud. Puedes pagarlo mediante los canales autorizados de la universidad.</li>
            <li>El trámite se iniciará formalmente solo después de que el pago se haya registrado.</li>
          </ul>
        </div>
      )
    },
    {
      number: 5,
      title: 'Resolución',
      badge: '24-48h',
      badgeType: 'purple' as const,
      content: (
        <div className="step-details-body">
          <p>Una vez completado el pago, el trámite toma de <strong>24 a 48 horas laborables</strong> en resolverse:</p>
          <ul>
            <li><strong>Favorable:</strong> Recibirás la resolución en tu correo institucional. Debes verificar que los docentes hayan registrado la justificación en el SGA. Si no es así, contáctalos adjuntando la resolución de Seguimiento Estudiantil.</li>
            <li><strong>No Favorable:</strong> Puedes revisar los motivos de rechazo en el módulo de solicitudes del SGA. En caso de dudas, solicita soporte respondiendo al correo de notificación.</li>
          </ul>
          <div className="alert-info-box">
            <Clock size={16} />
            <span>Si subes el trámite un viernes o fin de semana, el plazo de 24-48h empieza a correr a partir del lunes (primer día hábil).</span>
          </div>
        </div>
      )
    }
  ];

  const stepsTI = [
    {
      number: 1,
      title: 'Redactar Solicitud',
      badge: 'Estudiante',
      badgeType: 'purple' as const,
      content: (
        <div className="step-details-body">
          <p>Prepara una solicitud en formato PDF de <strong>dos o más hojas</strong> firmada por ti y dirigida a tu coordinador:</p>
          <ul>
            <li><strong>Ing. Hernán Espejo Viñán</strong> (para Ingeniería Industrial).</li>
            <li><strong>Ing. Patricio Arellano</strong> (para Ingeniería en TI y Software).</li>
          </ul>
          <p>En el cuerpo de la solicitud debes detallar claramente: día, horas exactas, nombres de los docentes y proyectos formativos que deseas justificar.</p>
        </div>
      )
    },
    {
      number: 2,
      title: 'Validar Certificados',
      badge: 'Requisito',
      badgeType: 'orange' as const,
      content: (
        <div className="step-details-body">
          <p>Las evidencias médicas deben ser validadas por el área médica de la institución:</p>
          <ul>
            <li>Puedes llevar tu certificado médico físicamente al campus los sábados de 08h00 a 12h00 para que lo sellen.</li>
            <li><strong>Validación virtual:</strong> Si no puedes asistir, debes enviar tu certificado médico por correo electrónico al <strong>Dr. Juan Galindo</strong> (<strong>juangalindo@uti.edu.ec</strong>) solicitando su validación, en un plazo máximo de <strong>3 días</strong> después de la inasistencia.</li>
          </ul>
        </div>
      )
    },
    {
      number: 3,
      title: 'Crear Trámite',
      badge: 'SGA',
      badgeType: 'purple' as const,
      content: (
        <div className="step-details-body">
          <p>Une la solicitud y todos los respaldos en un único archivo PDF y súbelo al SGA:</p>
          <ol className="styled-list">
            <li>Accede al <strong>SGA</strong> e ingresa a <strong>Solicitudes a Secretaría</strong>.</li>
            <li>Haz clic en <strong>Adicionar</strong> y selecciona <strong>Solicitud de justificación de faltas</strong>.</li>
            <li>Completa todos los campos obligatorios.</li>
            <li><strong>Importante:</strong> Asigna el trámite al <strong>Sr. Christian Palomino</strong>.</li>
            <li>Carga el PDF consolidado y haz clic en <strong>Guardar</strong>.</li>
          </ol>
        </div>
      )
    },
    {
      number: 4,
      title: 'Pago del Trámite',
      badge: '$5.00',
      badgeType: 'success' as const,
      content: (
        <div className="step-details-body">
          <p>Realiza el pago de la tasa administrativa:</p>
          <ul>
            <li>El costo reglamentario del trámite es de <strong>$5.00 USD</strong>.</li>
            <li>Realiza el depósito o transferencia y registra el pago en los canales del SGA para activar el proceso.</li>
          </ul>
        </div>
      )
    },
    {
      number: 5,
      title: 'Resolución y Copia',
      badge: 'Registro',
      badgeType: 'purple' as const,
      content: (
        <div className="step-details-body">
          <p>La resolución del trámite tarda entre <strong>24 y 48 horas laborables</strong>:</p>
          <ul>
            <li><strong>Favorable:</strong> Deberás enviar un correo formal a cada docente del proyecto formativo solicitando el registro de la justificación de faltas en el SGA, enviando obligatoriamente copia al correo del coordinador: <strong>hernanespejo@uti.edu.ec</strong>.</li>
            <li><strong>No Favorable:</strong> Revisa el SGA para ver los comentarios. Si faltó algún documento o validación médica, deberás reiniciar todo el trámite incluyendo un nuevo pago de $5.</li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <div className="faltas-container">
      {/* Selector de Modalidad */}
      <div className="carrera-selector">
        <button
          onClick={() => setSelectedCarrera('industrial')}
          className={`carrera-tab-btn ${selectedCarrera === 'industrial' ? 'active' : ''}`}
        >
          Modalidad Presencial / Semipresencial (Industrial)
        </button>
        <button
          onClick={() => setSelectedCarrera('ti')}
          className={`carrera-tab-btn ${selectedCarrera === 'ti' ? 'active' : ''}`}
        >
          Modalidad En Línea (TI / Software)
        </button>
      </div>

      {/* Widget Interactivo */}
      <div className="stepper-wrapper-card">
        {selectedCarrera === 'industrial' ? (
          <ProcessStepper steps={stepsIndustrial} />
        ) : (
          <ProcessStepper steps={stepsTI} />
        )}
      </div>

      <style>{`
        .faltas-container {
          width: 100%;
        }

        .carrera-selector {
          display: flex;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 6px;
          margin-bottom: var(--space-8);
          gap: 4px;
        }

        .carrera-tab-btn {
          flex: 1;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          padding: var(--space-3) var(--space-4);
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: var(--text-sm);
          cursor: pointer;
          transition: all var(--transition-base);
          text-align: center;
        }

        .carrera-tab-btn:hover {
          color: var(--text-primary);
        }

        .carrera-tab-btn.active {
          background: var(--bg-secondary);
          color: var(--color-orange-500);
          box-shadow: var(--shadow-sm);
        }

        .stepper-wrapper-card {
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .alert-info-box {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          background: var(--color-purple-50);
          border-left: 4px solid var(--color-purple-500);
          color: var(--color-purple-900);
          padding: var(--space-3) var(--space-4);
          border-radius: var(--radius-md);
          margin-top: var(--space-4);
          font-size: var(--text-sm);
        }

        [data-theme='dark'] .alert-info-box {
          background: rgba(90, 58, 140, 0.1);
          color: var(--color-purple-200);
        }

        .styled-list {
          padding-left: var(--space-6);
          margin-top: var(--space-3);
        }

        .styled-list li {
          margin-bottom: var(--space-2);
          position: relative;
        }
      `}</style>
    </div>
  );
}

// Icono auxiliar para Info
function Info({ size, className }: { size: number; className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}
