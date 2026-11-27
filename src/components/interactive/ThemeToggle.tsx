import { useEffect, useId, useRef, useState, type MouseEvent } from 'react';

type Theme = 'light' | 'dark';

/**
 * Interruptor de tema (estilos en `src/styles/ingeniax.css`, sección «Interruptor de tema»).
 * - El botón es un cielo: de día un sol con rayos que giran; de noche el disco se vuelve
 *   una luna creciente con cráteres y aparecen estrellas.
 * - Al cambiar, un sol (a claro) o una luna (a oscuro) sale del botón hacia el centro de la
 *   pantalla y desde ahí se revela el tema nuevo en un círculo que crece (View Transitions).
 *   Sin View Transitions el tema cambia igual; con movimiento reducido, cambia al instante.
 */

const reducido = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function aplicarTema(next: Theme) {
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

// Astros de línea fina: sobrios, del tamaño de un icono grande (no ilustraciones).
const SOL = `
  <svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke-linecap="round">
    <circle cx="24" cy="24" r="8.5" fill="#f68d52" stroke="#d9590c" stroke-width="1.5"/>
    <g class="cambio__rayos" stroke="#e2702a" stroke-width="2">
      ${Array.from({ length: 8 }, (_, i) => `<line x1="24" y1="5" x2="24" y2="10" transform="rotate(${i * 45} 24 24)"/>`).join('')}
    </g>
  </svg>`;

const LUNA = `
  <svg viewBox="0 0 48 48" aria-hidden="true" fill="none">
    <path d="M30.5 9.5a15 15 0 1 0 8 21.6A12.5 12.5 0 0 1 30.5 9.5z" fill="#ece4fc" stroke="#c9b2ee" stroke-width="1.5" stroke-linejoin="round"/>
  </svg>`;

function animarCambio(next: Theme, desde: DOMRect) {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const ox = desde.left + desde.width / 2;
  const oy = desde.top + desde.height / 2;

  const capa = document.createElement('div');
  capa.className = `cambio-tema cambio-tema--${next === 'light' ? 'sol' : 'luna'}`;
  capa.setAttribute('aria-hidden', 'true');
  capa.innerHTML = `<div class="cambio__astro">${next === 'light' ? SOL : LUNA}</div>`;
  document.body.appendChild(capa);

  // Un solo gesto: el astro sale del botón, llega al centro y se disuelve mientras
  // el tema nuevo se abre desde ahí. Curvas por tramo para que no haya saltos.
  const astro = capa.querySelector<HTMLElement>('.cambio__astro')!;
  const giro = next === 'light' ? -60 : 25;
  const viaje = astro.animate(
    [
      { transform: `translate(${ox - cx}px, ${oy - cy}px) scale(.35) rotate(${giro}deg)`, opacity: 0, easing: 'ease-out' },
      { transform: `translate(${ox - cx}px, ${oy - cy}px) scale(.45) rotate(${giro * 0.8}deg)`, opacity: 1, offset: 0.08, easing: 'cubic-bezier(.22, 1, .36, 1)' },
      { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1, offset: 0.45, easing: 'ease-in-out' },
      { transform: 'translate(0, 0) scale(1.08) rotate(0deg)', opacity: 0 },
    ],
    { duration: 1250, fill: 'forwards' }
  );
  viaje.finished.finally(() => capa.remove());

  window.setTimeout(() => {
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> } };
    const raiz = document.documentElement;
    // Sin transiciones de color mientras dura el cambio: si no, la página nueva
    // anima desde los colores viejos y se ve un segundo destello.
    raiz.classList.add('tema-cambiando');
    if (!doc.startViewTransition) {
      aplicarTema(next);
      requestAnimationFrame(() => requestAnimationFrame(() => raiz.classList.remove('tema-cambiando')));
      return;
    }
    const vt = doc.startViewTransition(() => aplicarTema(next));
    const radio = Math.hypot(Math.max(cx, window.innerWidth - cx), Math.max(cy, window.innerHeight - cy));
    vt.ready
      .then(() =>
        raiz.animate(
          { clipPath: [`circle(0px at ${cx}px ${cy}px)`, `circle(${radio}px at ${cx}px ${cy}px)`] },
          { duration: 700, easing: 'cubic-bezier(.65, 0, .35, 1)', pseudoElement: '::view-transition-new(root)' }
        ).finished
      )
      .catch(() => {})
      .finally(() => raiz.classList.remove('tema-cambiando'));
  }, 480);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);
  const ocupado = useRef(false);
  const id = useId().replace(/:/g, '');

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'dark' : 'light');
    setMounted(true);
  }, []);

  const toggleTheme = (e: MouseEvent<HTMLButtonElement>) => {
    if (ocupado.current) return;
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (reducido()) { aplicarTema(next); return; }
    ocupado.current = true;
    animarCambio(next, e.currentTarget.getBoundingClientRect());
    window.setTimeout(() => { ocupado.current = false; }, 1300);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="tema-switch"
      data-tema={theme}
      data-mounted={mounted}
      aria-label={`Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}
      aria-pressed={theme === 'dark'}
      title={`Modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}
    >
      <span className="tema-switch__cielo" aria-hidden="true">
        <i className="tema-switch__nube" />
        <i className="tema-switch__estrella" style={{ left: 30, top: 6 }} />
        <i className="tema-switch__estrella" style={{ left: 40, top: 17, animationDelay: '.6s' }} />
        <i className="tema-switch__estrella" style={{ left: 22, top: 19, animationDelay: '1.2s' }} />
      </span>
      <span className="tema-switch__astro" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <defs>
            <mask id={`luna-${id}`} maskUnits="userSpaceOnUse" x="-6" y="-6" width="36" height="36">
              <rect x="-6" y="-6" width="36" height="36" fill="#fff" />
              <circle className="tema-switch__sombra" cx="16.5" cy="7.5" r="6.5" fill="#000" />
            </mask>
          </defs>
          <g className="tema-switch__rayos">
            {Array.from({ length: 8 }, (_, i) => (
              <line key={i} x1="12" y1="1.6" x2="12" y2="4.2" transform={`rotate(${i * 45} 12 12)`} />
            ))}
          </g>
          <g mask={`url(#luna-${id})`}>
            <circle className="tema-switch__disco" cx="12" cy="12" r="5.2" />
            <circle className="tema-switch__crater" cx="9" cy="14" r="1.3" />
            <circle className="tema-switch__crater" cx="7.4" cy="10.2" r=".8" />
          </g>
        </svg>
      </span>
    </button>
  );
}
