/* ============================================================
   HERO CANVAS — red de nodos "estructura de ingeniería"
   ------------------------------------------------------------
   Nodos que derivan lentamente y se enlazan cuando están cerca,
   como el diagrama de una estructura o una red. El cursor empuja
   los nodos y enciende los enlaces cercanos.

   Diseñado para ser barato: sin librerías, O(n²) sobre ~70 nodos,
   se pausa fuera de viewport y se apaga con prefers-reduced-motion.
   ============================================================ */

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

export function initHeroCanvas(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let nodes: Node[] = [];
  let rafId = 0;
  let running = true;

  const pointer = { x: -9999, y: -9999, active: false };

  /** Densidad: ~1 nodo por cada 16.000 px², acotado para móviles y 4K. */
  const nodeCount = () => {
    const target = Math.round((width * height) / 16000);
    return Math.max(28, Math.min(84, target));
  };

  const readColors = () => {
    const styles = getComputedStyle(document.documentElement);
    return {
      node: styles.getPropertyValue('--accent').trim() || '#EA600A',
      link: styles.getPropertyValue('--text-primary').trim() || '#F6F4FB',
    };
  };

  let colors = readColors();

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
  };

  const seed = () => {
    const count = nodeCount();
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.4 + 0.7,
    }));
  };

  /** Distancia máxima de enlace, relativa al tamaño del lienzo. */
  const linkDist = () => Math.min(160, Math.max(110, width * 0.11));

  const draw = () => {
    ctx.clearRect(0, 0, width, height);

    const maxD = linkDist();
    const maxD2 = maxD * maxD;

    // --- Enlaces ---
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > maxD2) continue;

        const t = 1 - d2 / maxD2; // 0 lejos → 1 cerca

        // Los enlaces cerca del cursor se tiñen del color de acento
        const mx = (a.x + b.x) / 2 - pointer.x;
        const my = (a.y + b.y) / 2 - pointer.y;
        const near = pointer.active && mx * mx + my * my < 150 * 150;

        ctx.strokeStyle = near ? colors.node : colors.link;
        ctx.globalAlpha = (near ? 0.5 : 0.14) * t;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    // --- Nodos ---
    for (const n of nodes) {
      const dx = n.x - pointer.x;
      const dy = n.y - pointer.y;
      const near = pointer.active && dx * dx + dy * dy < 130 * 130;

      ctx.globalAlpha = near ? 0.95 : 0.5;
      ctx.fillStyle = near ? colors.node : colors.link;
      ctx.beginPath();
      ctx.arc(n.x, n.y, near ? n.r * 1.8 : n.r, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
  };

  const step = () => {
    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;

      // Rebote en los bordes
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;
      n.x = Math.max(0, Math.min(width, n.x));
      n.y = Math.max(0, Math.min(height, n.y));

      // Repulsión suave del cursor
      if (pointer.active) {
        const dx = n.x - pointer.x;
        const dy = n.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 120 * 120 && d2 > 1) {
          const d = Math.sqrt(d2);
          const force = (1 - d / 120) * 0.7;
          n.x += (dx / d) * force;
          n.y += (dy / d) * force;
        }
      }
    }
    draw();
    rafId = requestAnimationFrame(step);
  };

  const onPointerMove = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
    pointer.active = true;
  };
  const onPointerLeave = () => {
    pointer.active = false;
    pointer.x = -9999;
    pointer.y = -9999;
  };

  // Pausa cuando el hero sale de pantalla: no quema batería en el footer.
  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !running && !reduced) {
        running = true;
        rafId = requestAnimationFrame(step);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(rafId);
      }
    },
    { threshold: 0 }
  );

  const ro = new ResizeObserver(resize);

  // El tema cambia los colores: vuelve a leerlos
  const themeObserver = new MutationObserver(() => {
    colors = readColors();
  });

  resize();
  ro.observe(canvas);
  io.observe(canvas);
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });

  if (reduced) {
    running = false;
    draw(); // una sola imagen estática
  } else {
    const parent = canvas.parentElement ?? canvas;
    parent.addEventListener('pointermove', onPointerMove as EventListener);
    parent.addEventListener('pointerleave', onPointerLeave);
    rafId = requestAnimationFrame(step);
  }

  return () => {
    cancelAnimationFrame(rafId);
    io.disconnect();
    ro.disconnect();
    themeObserver.disconnect();
    const parent = canvas.parentElement ?? canvas;
    parent.removeEventListener('pointermove', onPointerMove as EventListener);
    parent.removeEventListener('pointerleave', onPointerLeave);
  };
}
