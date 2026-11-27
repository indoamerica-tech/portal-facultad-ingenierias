// @ts-nocheck — portado tal cual de INGENIAX (src/ascii.js).
// Palabra en arte ASCII animado (Canvas2D), inspirada en la receta «oVONE» de 21st.dev:
// se muestrea la palabra por celdas, cada celda dibuja un carácter según su luz,
// con onda animada, luces que derivan (una sigue al puntero), brillo y líneas de escaneo.
const CARACTERES = ' .:-=+*x#%@';
const NARANJA = [232, 92, 12];
const LILA = [112, 78, 170];
const MORADO = [60, 35, 95]; // la luz oscurece hacia el morado UTI (fondo claro)
const LUNA = [236, 228, 252]; // en modo oscuro la luz aclara hacia lila

export function asciiPalabra(cont, { palabra = 'INGENIERÍAS', quieto = false } = {}) {
  const lienzo = document.createElement('canvas');
  const ctx = lienzo.getContext('2d');
  cont.appendChild(lienzo);

  let celdas = [], ancho = 0, alto = 0, celda = 12, dpr = 1, forma = null;
  const puntero = { x: 0.5, y: 0.5, activo: false };

  function muestrear() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    ancho = cont.clientWidth;
    // Más letras que INGENIAX (8): el alto se ajusta para que la palabra llene el ancho
    alto = Math.round(ancho * 0.23 * Math.min(1, 8.6 / palabra.length));
    celda = ancho < 700 ? 8 : ancho < 1100 ? 10 : 12;
    lienzo.width = ancho * dpr;
    lienzo.height = alto * dpr;
    lienzo.style.height = `${alto}px`;

    const off = document.createElement('canvas');
    off.width = ancho;
    off.height = alto;
    const o = off.getContext('2d');
    o.fillStyle = '#000';
    o.fillRect(0, 0, ancho, alto);
    o.fillStyle = '#fff';
    o.textBaseline = 'alphabetic';
    let t = alto * 1.15;
    o.font = `900 ${t}px 'Outfit', Arial, sans-serif`;
    const medida = o.measureText(palabra).width;
    t *= (ancho * 0.98) / medida;
    o.font = `900 ${t}px 'Outfit', Arial, sans-serif`;
    o.fillText(palabra, ancho * 0.01, alto * 0.86);

    // silueta de la palabra con degradado de marca: se pinta tenue debajo para que se lea de un vistazo
    forma = document.createElement('canvas');
    forma.width = ancho;
    forma.height = alto;
    const f = forma.getContext('2d');
    const deg = f.createLinearGradient(0, 0, ancho, 0);
    deg.addColorStop(0, '#3c235f');
    deg.addColorStop(0.55, '#8e74bb');
    deg.addColorStop(1, '#f36d1b');
    f.fillStyle = deg;
    f.font = o.font;
    f.textBaseline = 'alphabetic';
    f.fillText(palabra, ancho * 0.01, alto * 0.86);

    const px = o.getImageData(0, 0, ancho, alto).data;
    const cols = Math.floor(ancho / celda), filas = Math.floor(alto / celda);
    const lum = new Float32Array(cols * filas);
    for (let fy = 0; fy < filas; fy++) {
      for (let fx = 0; fx < cols; fx++) {
        let s = 0, n = 0;
        for (let y = fy * celda; y < (fy + 1) * celda; y += 2) {
          for (let x = fx * celda; x < (fx + 1) * celda; x += 2) { s += px[(y * ancho + x) * 4]; n++; }
        }
        lum[fy * cols + fx] = s / n / 255;
      }
    }
    celdas = [];
    for (let fy = 0; fy < filas; fy++) {
      for (let fx = 0; fx < cols; fx++) {
        const l = lum[fy * cols + fx];
        if (l < 0.04) continue;
        // borde: diferencia con los vecinos, para acentuar el contorno de las letras
        const v = (dx, dy) => lum[Math.min(filas - 1, Math.max(0, fy + dy)) * cols + Math.min(cols - 1, Math.max(0, fx + dx))];
        const borde = Math.min(1, Math.abs(l - v(1, 0)) + Math.abs(l - v(-1, 0)) + Math.abs(l - v(0, 1)) + Math.abs(l - v(0, -1)));
        celdas.push({ x: fx * celda + celda / 2, y: fy * celda + celda / 2, l, borde, azar: Math.random() });
      }
    }
  }

  const luces = [
    { x: 0.27, y: 0.41, r: 0.25, i: 0.74, v: 0.13 },
    { x: 0.70, y: 0.31, r: 0.21, i: 0.80, v: -0.11 },
    { x: 0.45, y: 0.77, r: 0.13, i: 0.80, v: 0.17 },
  ];

  function mezclar(a, b, k) { return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k]; }

  function cuadro(ms) {
    const t = quieto ? 0 : ms / 1000;
    const oscuro = document.documentElement.dataset.theme === 'dark';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, ancho, alto);
    ctx.globalAlpha = 0.34;
    ctx.drawImage(forma, 0, 0, ancho, alto);
    ctx.globalAlpha = 1;
    ctx.font = `700 ${celda * 1.1}px 'Roboto Mono', ui-monospace, monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const pts = luces.map((L, k) => ({
      x: (L.x + Math.sin(t * L.v * 2 + k) * 0.08) * ancho,
      y: (L.y + Math.cos(t * L.v * 3 + k) * 0.1) * alto,
      r: L.r * ancho, i: L.i,
    }));
    if (puntero.activo) pts.push({ x: puntero.x * ancho, y: puntero.y * alto, r: 0.16 * ancho, i: 1 });

    for (const c of celdas) {
      if (c.azar > 0.985) continue; // cobertura ~98 %
      const onda = Math.sin(c.x * 0.018 - t * 2.6 + c.y * 0.01) * 0.5 + 0.5;
      let luz = 0;
      for (const p of pts) {
        const d = Math.hypot(c.x - p.x, c.y - p.y);
        luz += Math.max(0, 1 - d / p.r) * p.i;
      }
      luz = Math.min(1, luz);
      const valor = Math.min(1, c.l * 0.7 + c.borde * 0.45 + onda * 0.25 * c.l + luz * 0.3);
      const ch = CARACTERES[Math.min(CARACTERES.length - 1, Math.floor(valor * CARACTERES.length))];
      const base = mezclar(LILA, NARANJA, Math.min(1, onda * 0.6 + c.borde * 0.6));
      const [r, g, b] = mezclar(base, oscuro ? LUNA : MORADO, luz * 0.7);
      ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${0.7 + valor * 0.3})`;
      ctx.fillText(ch, c.x, c.y);
    }

    // brillo: copia desenfocada sumada encima
    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 0.14;
    ctx.filter = `blur(${celda * 0.9}px)`;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(lienzo, 0, 0);
    ctx.restore();

    // líneas de escaneo
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0, 0, 0, .12)';
    for (let y = 0; y < alto; y += 3) ctx.fillRect(0, y, ancho, 1);
    ctx.globalCompositeOperation = 'source-over';
  }

  let visible = true, ultimo = 0, id = 0;
  function bucle(ms) {
    id = requestAnimationFrame(bucle);
    if (!visible || document.hidden || ms - ultimo < 33) return; // ~30 fps
    ultimo = ms;
    cuadro(ms);
  }

  cont.addEventListener('pointermove', (e) => {
    const r = lienzo.getBoundingClientRect();
    puntero.x = (e.clientX - r.left) / r.width;
    puntero.y = (e.clientY - r.top) / r.height;
    puntero.activo = true;
  });
  cont.addEventListener('pointerleave', () => { puntero.activo = false; });
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(cont);

  let ultimoAncho = 0;
  const rehacer = () => {
    if (cont.clientWidth === ultimoAncho) return;
    ultimoAncho = cont.clientWidth;
    muestrear();
    cuadro(performance.now());
  };
  new ResizeObserver(rehacer).observe(cont);
  (document.fonts?.ready || Promise.resolve()).then(() => {
    ultimoAncho = 0;
    rehacer();
    if (!quieto && id !== -1) id = requestAnimationFrame(bucle);
  });
  return () => { cancelAnimationFrame(id); id = -1; lienzo.remove(); };
}
