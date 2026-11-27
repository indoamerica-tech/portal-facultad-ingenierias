/* ============================================================
   MOTION ENGINE — Facultad de Ingenierías
   ------------------------------------------------------------
   Un único módulo que gobierna todo el movimiento del sitio.

   API declarativa (sin escribir JS en las páginas):

     data-reveal="up|down|left|right|scale|blur|mask|fade"
        Revela el elemento al entrar en viewport.
     data-reveal-delay="1..6"
        Retraso escalonado manual.
     data-stagger[="90"]
        Escalona automáticamente los [data-reveal] hijos, cada 90ms.
     data-split-lines
        Parte el titular en líneas y las levanta una a una.
     data-counter="2400" [data-counter-prefix="+"] [data-counter-suffix="%"]
        Cuenta hasta el número cuando entra en pantalla.
     data-magnetic[="0.35"]
        El elemento se imanta al cursor.
     data-tilt[="8"]
        Inclinación 3D siguiendo al cursor.
     data-parallax="0.15"
        Desplazamiento parallax al hacer scroll.
     data-marquee
        Duplica el contenido del track para bucle infinito.
     .spotlight / .border-glow
        Reciben --mx / --my con la posición del cursor.

   Todo respeta prefers-reduced-motion y funciona con las
   transiciones de vista de Astro (astro:page-load).
   ============================================================ */

import Lenis from 'lenis';

type Cleanup = () => void;

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isCoarsePointer = () =>
  window.matchMedia('(pointer: coarse)').matches;

/* Limpieza acumulada del ciclo de página actual */
let cleanups: Cleanup[] = [];
const onCleanup = (fn: Cleanup) => cleanups.push(fn);

function runCleanups() {
  cleanups.forEach((fn) => {
    try {
      fn();
    } catch {
      /* noop */
    }
  });
  cleanups = [];
}

/* ------------------------------------------------------------------
   Bucle rAF compartido: un solo rAF para parallax, magnéticos y tilt.
   ------------------------------------------------------------------ */
type Ticker = (time: number) => void;
const tickers = new Set<Ticker>();
let rafId = 0;

function startTicker() {
  if (rafId) return;
  const loop = (time: number) => {
    tickers.forEach((t) => t(time));
    rafId = requestAnimationFrame(loop);
  };
  rafId = requestAnimationFrame(loop);
}

function addTicker(fn: Ticker): Cleanup {
  tickers.add(fn);
  startTicker();
  return () => tickers.delete(fn);
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* ==================================================================
   1. SCROLL SUAVE (Lenis) — singleton, sobrevive a las navegaciones
   ================================================================== */
let lenis: Lenis | null = null;

function initSmoothScroll() {
  if (lenis || prefersReducedMotion()) return;

  lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    // En táctil el scroll nativo se siente mejor (y no rompe el pull-to-refresh)
    syncTouch: false,
  });

  addTicker((time) => lenis?.raf(time));

  // Los enlaces de ancla usan el scroll suave de Lenis
  document.addEventListener('click', (e) => {
    const link = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
    if (!link) return;
    const id = link.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    lenis?.scrollTo(target as HTMLElement, { offset: -90 });
  });
}

/* ==================================================================
   2. REVELADO AL SCROLL + ESCALONADO AUTOMÁTICO
   ================================================================== */
function initReveal() {
  const reduced = prefersReducedMotion();

  // Escalonado: asigna --reveal-delay a los hijos que aún no tienen retraso.
  document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
    const step = Number(group.dataset.stagger) || 90;
    const kids = Array.from(group.children).filter((c) =>
      (c as HTMLElement).hasAttribute('data-reveal')
    ) as HTMLElement[];
    kids.forEach((kid, i) => {
      if (!kid.hasAttribute('data-reveal-delay')) {
        kid.style.setProperty('--reveal-delay', `${i * step}ms`);
      }
    });
  });

  const targets = document.querySelectorAll<HTMLElement>('[data-reveal], [data-animate]');

  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
  );

  targets.forEach((el) => {
    // Si ya está sobre el pliegue al cargar, revélalo de inmediato: evita el
    // parpadeo de contenido invisible en la parte alta de la página.
    observer.observe(el);
  });

  onCleanup(() => observer.disconnect());
}

/* ==================================================================
   3. TITULARES LÍNEA POR LÍNEA
   ================================================================== */
function initSplitLines() {
  if (prefersReducedMotion()) return;

  document.querySelectorAll<HTMLElement>('[data-split-lines]').forEach((el) => {
    if (el.dataset.splitDone === 'true') return;

    // Separa por palabras, mide dónde salta la línea, y reagrupa.
    const words = (el.textContent || '').trim().split(/\s+/);
    if (!words.length) return;

    el.textContent = '';
    const spans = words.map((word, i) => {
      const s = document.createElement('span');
      s.textContent = word + (i < words.length - 1 ? ' ' : '');
      s.style.display = 'inline-block';
      el.appendChild(s);
      return s;
    });

    // Agrupa por posición vertical (offsetTop)
    const lines: HTMLElement[][] = [];
    let lastTop: number | null = null;
    spans.forEach((s) => {
      const top = s.offsetTop;
      if (lastTop === null || Math.abs(top - lastTop) > 2) {
        lines.push([s]);
        lastTop = top;
      } else {
        lines[lines.length - 1].push(s);
      }
    });

    el.textContent = '';
    lines.forEach((lineSpans, i) => {
      const outer = document.createElement('span');
      outer.className = 'line-reveal';
      const inner = document.createElement('span');
      inner.style.setProperty('--line-delay', `${i * 110}ms`);
      lineSpans.forEach((s) => {
        s.style.display = 'inline';
        inner.appendChild(s);
      });
      outer.appendChild(inner);
      el.appendChild(outer);
    });

    el.dataset.splitDone = 'true';
  });
}

/* ==================================================================
   4. CONTADORES
   ================================================================== */
function initCounters() {
  const els = document.querySelectorAll<HTMLElement>('[data-counter]');
  if (!els.length) return;

  const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

  const format = (n: number, decimals: number) =>
    n.toLocaleString('es-EC', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  const run = (el: HTMLElement) => {
    const target = Number(el.dataset.counter) || 0;
    const decimals = Number(el.dataset.counterDecimals) || 0;
    const prefix = el.dataset.counterPrefix ?? '';
    const suffix = el.dataset.counterSuffix ?? '';
    const duration = Number(el.dataset.counterDuration) || 1900;

    if (prefersReducedMotion()) {
      el.textContent = `${prefix}${format(target, decimals)}${suffix}`;
      return;
    }

    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const value = target * easeOutExpo(p);
      el.textContent = `${prefix}${format(value, decimals)}${suffix}`;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if (!('IntersectionObserver' in window)) {
    els.forEach(run);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        run(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  els.forEach((el) => observer.observe(el));
  onCleanup(() => observer.disconnect());
}

/* ==================================================================
   5. SPOTLIGHT / BORDER GLOW (posición del cursor como CSS vars)
   ================================================================== */
function initPointerVars() {
  if (isCoarsePointer()) return;

  const els = document.querySelectorAll<HTMLElement>('.spotlight, .border-glow');
  if (!els.length) return;

  const onMove = (e: PointerEvent) => {
    const el = e.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  els.forEach((el) => {
    el.addEventListener('pointermove', onMove as EventListener);
    onCleanup(() => el.removeEventListener('pointermove', onMove as EventListener));
  });
}

/* ==================================================================
   6. BOTONES MAGNÉTICOS
   ================================================================== */
function initMagnetic() {
  if (isCoarsePointer() || prefersReducedMotion()) return;

  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const strength = Number(el.dataset.magnetic) || 0.3;
    const state = { x: 0, y: 0, tx: 0, ty: 0 };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      state.tx = (e.clientX - (r.left + r.width / 2)) * strength;
      state.ty = (e.clientY - (r.top + r.height / 2)) * strength;
    };
    const onLeave = () => {
      state.tx = 0;
      state.ty = 0;
    };

    el.addEventListener('pointermove', onMove as EventListener);
    el.addEventListener('pointerleave', onLeave);

    const stopTick = addTicker(() => {
      state.x = lerp(state.x, state.tx, 0.14);
      state.y = lerp(state.y, state.ty, 0.14);
      if (Math.abs(state.x) < 0.01 && Math.abs(state.y) < 0.01) {
        el.style.transform = '';
        return;
      }
      el.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`;
    });

    onCleanup(() => {
      el.removeEventListener('pointermove', onMove as EventListener);
      el.removeEventListener('pointerleave', onLeave);
      stopTick();
      el.style.transform = '';
    });
  });
}

/* ==================================================================
   7. TILT 3D
   ================================================================== */
function initTilt() {
  if (isCoarsePointer() || prefersReducedMotion()) return;

  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    const max = Number(el.dataset.tilt) || 7;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${-py * max}deg) rotateY(${px * max}deg) scale(1.015)`;
    };
    const onLeave = () => {
      el.style.transform = '';
    };

    el.addEventListener('pointermove', onMove as EventListener);
    el.addEventListener('pointerleave', onLeave);
    onCleanup(() => {
      el.removeEventListener('pointermove', onMove as EventListener);
      el.removeEventListener('pointerleave', onLeave);
      el.style.transform = '';
    });
  });
}

/* ==================================================================
   8. PARALLAX
   ================================================================== */
function initParallax() {
  if (prefersReducedMotion()) return;

  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
  if (!els.length) return;

  const items = els.map((el) => ({
    el,
    speed: Number(el.dataset.parallax) || 0.12,
    current: 0,
    target: 0,
  }));

  const compute = () => {
    const vh = window.innerHeight;
    items.forEach((item) => {
      const r = item.el.getBoundingClientRect();
      // -1 (bajo el viewport) → 1 (encima del viewport)
      const progress = (r.top + r.height / 2 - vh / 2) / vh;
      item.target = -progress * item.speed * vh;
    });
  };

  const stopTick = addTicker(() => {
    compute();
    items.forEach((item) => {
      item.current = lerp(item.current, item.target, 0.1);
      item.el.style.transform = `translate3d(0, ${item.current.toFixed(2)}px, 0)`;
    });
  });

  onCleanup(() => {
    stopTick();
    items.forEach((i) => (i.el.style.transform = ''));
  });
}

/* ==================================================================
   9. MARQUESINA — duplica el track para que el bucle sea perfecto
   ================================================================== */
function initMarquee() {
  document.querySelectorAll<HTMLElement>('[data-marquee]').forEach((track) => {
    if (track.dataset.marqueeDone === 'true') return;
    const clone = track.cloneNode(true) as HTMLElement;
    clone.setAttribute('aria-hidden', 'true');
    clone.dataset.marqueeDone = 'true';
    track.parentElement?.appendChild(clone);
    track.dataset.marqueeDone = 'true';
  });
}

/* ==================================================================
   10. BARRA DE PROGRESO DE SCROLL
   ================================================================== */
function initScrollProgress() {
  const bar = document.querySelector<HTMLElement>('.scroll-progress');
  if (!bar) return;

  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? window.scrollY / max : 0;
    bar.style.transform = `scaleX(${p})`;
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  onCleanup(() => {
    window.removeEventListener('scroll', update);
    window.removeEventListener('resize', update);
  });
}

/* ==================================================================
   11. CABECERA REACTIVA AL SCROLL
   ================================================================== */
function initHeaderState() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;

  let lastY = window.scrollY;

  const update = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 24);
    // Oculta al bajar, revela al subir — solo pasado el hero
    if (y > 320) {
      header.classList.toggle('is-hidden', y > lastY && y - lastY > 4);
    } else {
      header.classList.remove('is-hidden');
    }
    lastY = y;
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
  onCleanup(() => window.removeEventListener('scroll', update));
}

/* ==================================================================
   BOOTSTRAP
   ================================================================== */
export function initMotion() {
  runCleanups();

  document.documentElement.classList.remove('no-js');

  initSmoothScroll();
  initSplitLines();
  initMarquee();
  // El revelado va después del split para que las líneas ya existan.
  initReveal();
  initCounters();
  initPointerVars();
  initMagnetic();
  initTilt();
  initParallax();
  initScrollProgress();
  initHeaderState();
}

export function teardownMotion() {
  runCleanups();
}
