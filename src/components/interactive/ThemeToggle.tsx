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

const SOL = `
  <svg viewBox="0 0 200 200" aria-hidden="true">
    <defs>
      <radialGradient id="cambio-sol" cx="40%" cy="38%" r="70%">
        <stop offset="0" stop-color="#fff4c2"/><stop offset=".45" stop-color="#ffc56b"/><stop offset="1" stop-color="#f36d1b"/>
      </radialGradient>
    </defs>
    <g class="cambio__rayos">
      ${Array.from({ length: 12 }, (_, i) =>
        `<rect x="96" y="6" width="8" height="${i % 2 ? 22 : 32}" rx="4" fill="#f9a774" transform="rotate(${i * 30} 100 100)"/>`
      ).join('')}
    </g>
    <circle cx="100" cy="100" r="52" fill="url(#cambio-sol)"/>
  </svg>`;

const LUNA = `
  <svg viewBox="0 0 200 200" aria-hidden="true">
    <defs>
      <radialGradient id="cambio-luna" cx="35%" cy="35%" r="75%">
        <stop offset="0" stop-color="#fffdf6"/><stop offset=".6" stop-color="#e9e2fb"/><stop offset="1" stop-color="#c9b2ee"/>
      </radialGradient>
      <mask id="cambio-luna-mascara">
        <rect width="200" height="200" fill="#fff"/>
        <circle cx="132" cy="74" r="56" fill="#000"/>
      </mask>
    </defs>
    <g mask="url(#cambio-luna-mascara)">
      <circle cx="100" cy="100" r="62" fill="url(#cambio-luna)"/>
      <circle cx="74" cy="122" r="9" fill="#c9b2ee" opacity=".55"/>
      <circle cx="58" cy="92" r="5" fill="#c9b2ee" opacity=".5"/>
      <circle cx="92" cy="146" r="4" fill="#c9b2ee" opacity=".45"/>
    </g>
  </svg>`;

function animarCambio(next: Theme, desde: DOMRect) {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const ox = desde.left + desde.width / 2;
  const oy = desde.top + desde.height / 2;

  // Capa del astro: va por encima de todo. Fuera del círculo se ve la captura vieja
  // (con el astro quieto en el centro) y dentro, la página nueva con el astro vivo.
  const capa = document.createElement('div');
  capa.className = `cambio-tema cambio-tema--${next === 'light' ? 'sol' : 'luna'}`;
  capa.setAttribute('aria-hidden', 'true');
  const estrellas = next === 'dark'
    ? Array.from({ length: 14 }, (_, i) => {
        const ang = (i / 14) * Math.PI * 2 + (i % 3) * 0.4;
        const dist = 130 + ((i * 37) % 90);
        return `<i class="cambio__estrella" style="--x:${Math.cos(ang) * dist}px;--y:${Math.sin(ang) * dist}px;--d:${(i % 5) * 90}ms"></i>`;
      }).join('')
    : '';
  capa.innerHTML = `<div class="cambio__halo"></div><div class="cambio__astro">${next === 'light' ? SOL : LUNA}</div>${estrellas}`;
  document.body.appendChild(capa);

  const astro = capa.querySelector<HTMLElement>('.cambio__astro')!;
  // La curva va en cada tramo (no en las opciones): llega al centro hacia el 40 %,
  // se queda mientras se revela el tema y al final se disuelve hacia arriba.
  const ida = 'cubic-bezier(.22, 1, .36, 1)';
  const giro = next === 'light' ? -90 : 40;
  const viaje = astro.animate(
    [
      { transform: `translate(${ox - cx}px, ${oy - cy}px) scale(.12) rotate(${giro}deg)`, opacity: 0, easing: 'ease-out' },
      { transform: `translate(${ox - cx}px, ${oy - cy}px) scale(.2) rotate(${giro * 0.8}deg)`, opacity: 1, offset: 0.06, easing: ida },
      { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1, offset: 0.4, easing: 'ease-in-out' },
      { transform: 'translate(0, 0) scale(1.06) rotate(0deg)', opacity: 1, offset: 0.78, easing: 'ease-in' },
      { transform: 'translate(0, -12px) scale(1.5) rotate(0deg)', opacity: 0 },
    ],
    { duration: 1600, fill: 'forwards' }
  );
  capa.querySelector<HTMLElement>('.cambio__halo')!.animate(
    [
      { opacity: 0, transform: 'scale(.4)', easing: 'ease-out' },
      { opacity: 1, transform: 'scale(1)', offset: 0.4, easing: 'ease-in' },
      { opacity: 1, transform: 'scale(1.1)', offset: 0.75, easing: 'ease-in' },
      { opacity: 0, transform: 'scale(1.6)' },
    ],
    { duration: 1600, fill: 'forwards' }
  );
  viaje.finished.finally(() => capa.remove());

  // Cuando el astro llega al centro, el tema nuevo se revela desde ahí.
  window.setTimeout(() => {
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
    if (!doc.startViewTransition) { aplicarTema(next); return; }
    const raiz = document.documentElement;
    raiz.classList.add('tema-cambiando');
    const vt = doc.startViewTransition(() => aplicarTema(next));
    const radio = Math.hypot(Math.max(cx, window.innerWidth - cx), Math.max(cy, window.innerHeight - cy));
    vt.ready
      .then(() =>
        raiz.animate(
          { clipPath: [`circle(0px at ${cx}px ${cy}px)`, `circle(${radio}px at ${cx}px ${cy}px)`] },
          { duration: 850, easing: 'cubic-bezier(.65, 0, .35, 1)', pseudoElement: '::view-transition-new(root)' }
        ).finished
      )
      .catch(() => {})
      .finally(() => raiz.classList.remove('tema-cambiando'));
  }, 620);
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
    window.setTimeout(() => { ocupado.current = false; }, 1600);
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
