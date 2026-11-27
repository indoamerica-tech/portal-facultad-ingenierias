import React from 'react';
import ProcessStepper from './ProcessStepper';
import { Video, FileText, Download, CheckCircle, AlertTriangle } from 'lucide-react';

export default function TitulacionWidget() {
  const steps = [
    {
      number: 1,
      title: 'Ingreso del Abstract',
      badge: 'Estudiante',
      badgeType: 'purple' as const,
      content: (
        <div className="step-details-body">
          <p>
            Una vez aprobado el proyecto formativo de Integración Curricular, el primer paso obligatorio es registrar el resumen de tu trabajo:
          </p>
          <ul>
            <li>Sube el abstract (inglés) y el resumen (español) en el módulo "Proyectos de Grado - Acciones y Abstract" del SGA.</li>
            <li>Asegúrate de incorporar palabras clave bajo normas estandarizadas.</li>
            <li>No se aceptarán errores de traducción en los títulos ni campos incompletos.</li>
          </ul>
          <div className="media-links">
            <a href="https://youtu.be/s_dO2ndhOdk" target="_blank" rel="noopener noreferrer" className="media-link video">
              <Video size={16} /> Ver Tutorial de Carga de Abstract
            </a>
          </div>
        </div>
      )
    },
    {
      number: 2,
      title: 'Solicitud de Par Lector',
      badge: 'Tutor / Director',
      badgeType: 'purple' as const,
      content: (
        <div className="step-details-body">
          <p>
            El tutor/director enviará tu trabajo a revisión inicial de similitud y asignará un par lector:
          </p>
          <ul>
            <li><strong>Requisitos:</strong> Documento completo formateado (Word y PDF) y el Informe de Tutorías al 100% firmado por el tutor.</li>
            <li><strong>Envío:</strong> Por correo institucional a <strong>blancatopon@uti.edu.ec</strong> y <strong>cristhianpalomino@uti.edu.ec</strong>, con copia al estudiante. Asunto: <em>Asignación de par lector</em>.</li>
            <li><strong>Evaluación:</strong> El par lector tiene un plazo de <strong>5 días</strong> para revisar y emitir las oportunidades de mejora correspondientes.</li>
          </ul>
          <div className="media-links">
            <a href="https://n9.cl/ind-word-pdf" target="_blank" rel="noopener noreferrer" className="media-link doc">
              <FileText size={16} /> Guía de Formatos Word/PDF
            </a>
            <a href="https://youtu.be/SnIUi--bvs" target="_blank" rel="noopener noreferrer" className="media-link video">
              <Video size={16} /> Video Explicativo de Tutorías
            </a>
          </div>
        </div>
      )
    },
    {
      number: 3,
      title: 'Corrección y Firmas',
      badge: 'Tutor y Estudiante',
      badgeType: 'purple' as const,
      content: (
        <div className="step-details-body">
          <p>
            Aplica las correcciones indicadas por el par lector y recopila las firmas digitales oficiales:
          </p>
          <ul>
            <li>Tienes un plazo máximo de <strong>5 días</strong> para enviar las correcciones.</li>
            <li>Copia el abstract aprobado por el SGA en tu documento final. Si las correcciones requieren modificar el abstract, solicita su reapertura a la coordinación.</li>
            <li><strong>Firma Electrónica:</strong> El documento corregido y definitivo debe contar con la firma electrónica del estudiante, tutor y los lectores.</li>
            <li><strong>Verificación:</strong> Es obligatorio validar la autenticidad de todas las firmas digitales mediante el aplicativo oficial <strong>FIRMA.EC</strong>.</li>
          </ul>
          <div className="media-links">
            <a href="https://www.firmadigital.gob.ec/descargar-firmaec/" target="_blank" rel="noopener noreferrer" className="media-link doc">
              <Download size={16} /> Descargar Aplicativo FIRMA.EC
            </a>
            <a href="https://youtu.be/R0N3zksokYU" target="_blank" rel="noopener noreferrer" className="media-link video">
              <Video size={16} /> Video de Comprobación de Firmas
            </a>
          </div>
        </div>
      )
    },
    {
      number: 4,
      title: 'Solicitud de Defensa',
      badge: 'Predefensa',
      badgeType: 'orange' as const,
      content: (
        <div className="step-details-body">
          <p>
            Una vez tengas el documento completamente firmado y verificado, solicita formalmente la fecha para tu defensa:
          </p>
          <ul>
            <li>Envía a <strong>blancatopon@uti.edu.ec</strong> el documento final firmado y el PDF de aprobación del abstract generado por el SGA. Asunto: <em>SOLICITUD DE FECHA Y HORA DE DEFENSA</em>.</li>
            <li><strong>Predefensa:</strong> Realiza la predefensa con tu tutor usando la plantilla oficial y envía el acta firmada al mismo correo institucional.</li>
          </ul>
          <div className="media-links">
            <a href="https://tinyurl.com/plantilla-UTI" target="_blank" rel="noopener noreferrer" className="media-link doc">
              <Download size={16} /> Plantilla de Presentación UTI
            </a>
            <a href="https://tinyurl.com/acta-predefensa" target="_blank" rel="noopener noreferrer" className="media-link doc">
              <Download size={16} /> Descargar Formato de Acta de Predefensa
            </a>
          </div>
        </div>
      )
    },
    {
      number: 5,
      title: 'Defensa Final',
      badge: 'Tribunal',
      badgeType: 'success' as const,
      content: (
        <div className="step-details-body">
          <p>
            La sustentación final es el último paso del proceso de graduación:
          </p>
          <ul>
            <li>Recibirás una notificación oficial con el día, hora y el aula o enlace de tu defensa.</li>
            <li>Preséntate al menos <strong>30 minutos antes</strong> de la hora fijada.</li>
            <li><strong>Entrega de CD:</strong> Prepara y entrega un CD institucional que contenga el archivo PDF final con las firmas electrónicas válidas y la captura de pantalla de su validación en Firma.ec.</li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <div className="titulacion-stepper-wrapper">
      <div className="alert-warning-box">
        <AlertTriangle size={20} className="warning-icon" />
        <div>
          <h4>Nota de Seguridad de Firmas</h4>
          <p>Toda firma electrónica debe ser generada y validada según la normativa vigente en el Ecuador. Los documentos firmados con simples imágenes escaneadas serán rechazados de inmediato.</p>
        </div>
      </div>
      
      <ProcessStepper steps={steps} />

      <style>{`
        .titulacion-stepper-wrapper {
          width: 100%;
        }

        .alert-warning-box {
          display: flex;
          gap: var(--space-4);
          background: rgba(245, 158, 11, 0.1);
          border-left: 4px solid var(--color-warning);
          color: var(--text-primary);
          padding: var(--space-4) var(--space-6);
          border-radius: var(--radius-lg);
          margin-bottom: var(--space-8);
        }

        .warning-icon {
          color: var(--color-warning);
          flex-shrink: 0;
        }

        .alert-warning-box h4 {
          margin: 0 0 2px 0;
          font-size: var(--text-sm);
          font-weight: 700;
        }

        .alert-warning-box p {
          margin: 0;
          font-size: var(--text-sm);
          color: var(--text-secondary);
        }

        .media-links {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
          margin-top: var(--space-4);
        }

        .media-link {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-4);
          border-radius: var(--radius-md);
          font-size: var(--text-sm);
          font-weight: 600;
          text-decoration: none;
          transition: all var(--transition-base);
        }

        .media-link.video {
          background: rgba(239, 68, 68, 0.1);
          color: #EF4444;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .media-link.video:hover {
          background: #EF4444;
          color: white;
        }

        .media-link.doc {
          background: var(--bg-tertiary);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
        }

        .media-link.doc:hover {
          background: var(--color-purple-50);
          color: var(--color-purple-600);
          border-color: var(--color-purple-200);
        }

        [data-theme='dark'] .media-link.doc:hover {
          background: rgba(90, 58, 140, 0.1);
          color: var(--color-purple-300);
          border-color: var(--color-purple-800);
        }
      `}</style>
    </div>
  );
}
