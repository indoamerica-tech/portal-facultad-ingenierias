import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, Info } from 'lucide-react';

interface Step {
  number: number;
  title: string;
  badge?: string;
  badgeType?: 'purple' | 'orange' | 'success';
  content: React.ReactNode;
}

interface ProcessStepperProps {
  steps: Step[];
}

export default function ProcessStepper({ steps }: ProcessStepperProps) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="stepper-widget">
      {/* Lista de pasos a la izquierda */}
      <div className="stepper-nav">
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isCompleted = index < activeStep;
          return (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`stepper-nav-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
            >
              <div className="stepper-indicator">
                {isCompleted ? (
                  <CheckCircle2 size={20} className="indicator-icon-completed" />
                ) : (
                  <span>{step.number}</span>
                )}
              </div>
              <div className="stepper-nav-text">
                <span className="stepper-nav-title">{step.title}</span>
                {step.badge && (
                  <span className={`stepper-nav-badge badge-${step.badgeType || 'purple'}`}>
                    {step.badge}
                  </span>
                )}
              </div>
              <ChevronRight size={18} className="stepper-nav-arrow" />
            </button>
          );
        })}
      </div>

      {/* Contenido de paso a la derecha */}
      <div className="stepper-content-box">
        <div key={activeStep} className="stepper-details-panel">
          <div className="stepper-details-header">
            <span className="stepper-details-step-num">Paso {steps[activeStep].number}</span>
            <h2>{steps[activeStep].title}</h2>
          </div>
          <div className="stepper-details-body">
            {steps[activeStep].content}
          </div>
        </div>
      </div>

      <style>{`
        .stepper-widget {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-6);
          width: 100%;
        }

        @media (min-width: 992px) {
          .stepper-widget {
            grid-template-columns: 1fr 1.8fr;
            gap: var(--space-8);
          }
        }

        .stepper-nav {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .stepper-nav-item {
          display: flex;
          align-items: center;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: var(--space-4);
          cursor: pointer;
          text-align: left;
          width: 100%;
          transition: all var(--transition-base);
          position: relative;
        }

        .stepper-nav-item:hover {
          border-color: var(--color-orange-400);
          transform: translateX(4px);
        }

        .stepper-nav-item.active {
          border-color: var(--color-purple-500);
          background: var(--bg-tertiary);
          box-shadow: var(--shadow-md);
        }

        [data-theme='dark'] .stepper-nav-item.active {
          background: rgba(90, 58, 140, 0.1);
        }

        .stepper-indicator {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--border-color);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: var(--text-sm);
          margin-right: var(--space-4);
          transition: all var(--transition-base);
          flex-shrink: 0;
        }

        .stepper-nav-item.active .stepper-indicator {
          background: var(--color-purple-500);
          color: white;
        }

        .stepper-nav-item.completed .stepper-indicator {
          background: var(--color-success);
          color: white;
        }

        .indicator-icon-completed {
          color: white;
        }

        .stepper-nav-text {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .stepper-nav-title {
          font-weight: 600;
          font-size: var(--text-sm);
          color: var(--text-primary);
        }

        .stepper-nav-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          width: fit-content;
          margin-top: 4px;
        }

        .badge-purple {
          background: var(--color-purple-100);
          color: var(--color-purple-600);
        }
        [data-theme='dark'] .badge-purple {
          background: rgba(90, 58, 140, 0.2);
          color: var(--color-purple-300);
        }

        .badge-orange {
          background: var(--color-orange-100);
          color: var(--color-orange-600);
        }
        [data-theme='dark'] .badge-orange {
          background: rgba(232, 97, 26, 0.2);
          color: var(--color-orange-300);
        }

        .badge-success {
          background: rgba(34, 197, 94, 0.1);
          color: var(--color-success);
        }

        .stepper-nav-arrow {
          color: var(--text-secondary);
          opacity: 0;
          transform: translateX(-5px);
          transition: all var(--transition-base);
        }

        .stepper-nav-item.active .stepper-nav-arrow {
          opacity: 1;
          transform: translateX(0);
          color: var(--color-purple-500);
        }

        .stepper-content-box {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: var(--space-8);
          box-shadow: var(--shadow-sm);
          min-height: 300px;
          position: relative;
          overflow: hidden;
        }

        .stepper-details-panel {
          animation: fadeSlideIn 0.3s ease-out forwards;
          opacity: 0;
          transform: translateY(10px);
        }

        @keyframes fadeSlideIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .stepper-details-header {
          border-bottom: 1px solid var(--border-color);
          padding-bottom: var(--space-4);
          margin-bottom: var(--space-6);
        }

        .stepper-details-step-num {
          font-size: var(--text-xs);
          font-weight: 700;
          text-transform: uppercase;
          color: var(--color-orange-500);
          letter-spacing: 0.1em;
        }

        .stepper-details-header h2 {
          margin: 4px 0 0 0;
          font-size: var(--text-xl);
        }

        .stepper-details-body {
          color: var(--text-secondary);
          line-height: var(--leading-relaxed);
        }
        
        .stepper-details-body p {
          margin-bottom: var(--space-4);
        }

        .stepper-details-body ul {
          list-style-type: none;
          padding: 0;
          margin-bottom: var(--space-6);
        }

        .stepper-details-body li {
          position: relative;
          padding-left: var(--space-6);
          margin-bottom: var(--space-3);
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2322c55e' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: left 4px;
        }
      `}</style>
    </div>
  );
}
