// @ts-nocheck
/*
 * Figuras 3D animadas de cada carrera, con el mismo lenguaje que las vitrinas de INGENIAX
 * (materiales con barniz, luz cálida + contraluz morado, giran con el puntero y respiran).
 * Solo primitivas de three.js: sin modelos externos. Se cargan aparte, cuando la figura
 * entra en pantalla, para no pesar en la carga de la página.
 */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const C = { naranja: '#f36d1b', naranjaClaro: '#fb7f3c', blanco: '#f4f1f9', lila: '#b3a1d3', morado: '#6b4f9e', oscuro: '#3c235f' };

function material(color, brilloBase = 0.04) {
  const c = new THREE.Color(color);
  const metal = color === C.blanco || color === C.lila;
  const m = new THREE.MeshPhysicalMaterial({
    color: c, roughness: metal ? 0.28 : 0.38, metalness: metal ? 0.55 : 0.15,
    clearcoat: 0.8, clearcoatRoughness: 0.25, emissive: c, emissiveIntensity: brilloBase,
  });
  m.userData.base = brilloBase;
  return m;
}
const encender = (m, v) => { m.emissiveIntensity = m.userData.base + v * 1.6; };

function iluminar(render, escena) {
  render.toneMapping = THREE.NeutralToneMapping;
  render.toneMappingExposure = 1.05;
  render.outputColorSpace = THREE.SRGBColorSpace;
  const pmrem = new THREE.PMREMGenerator(render);
  escena.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();
  escena.add(new THREE.HemisphereLight('#d9ccff', '#180e2b', 0.6));
  const clave = new THREE.DirectionalLight('#ffd2b0', 2.2); clave.position.set(-3, 5, 4);
  const contra = new THREE.DirectionalLight('#8e74bb', 2.4); contra.position.set(4, 1, -4);
  const acento = new THREE.PointLight('#f36d1b', 14, 12); acento.position.set(2.5, -1.5, 3);
  escena.add(clave, contra, acento);
}

const caja = (w, h, d, color, r = 0.06) => new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 3, r), material(color));
const cilindro = (rt, rb, h, color, seg = 32) => new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), material(color));

function engranaje(radio, dientes, color) {
  const forma = new THREE.Shape();
  const ri = radio * 0.82;
  for (let i = 0; i < dientes * 2; i++) {
    const a0 = (i / (dientes * 2)) * Math.PI * 2;
    const a1 = ((i + 1) / (dientes * 2)) * Math.PI * 2;
    const r = i % 2 ? ri : radio;
    if (i === 0) forma.moveTo(Math.cos(a0) * r, Math.sin(a0) * r);
    forma.lineTo(Math.cos(a0) * r, Math.sin(a0) * r);
    forma.lineTo(Math.cos(a1) * r, Math.sin(a1) * r);
  }
  const hueco = new THREE.Path(); hueco.absarc(0, 0, radio * 0.28, 0, Math.PI * 2, true);
  forma.holes.push(hueco);
  const g = new THREE.ExtrudeGeometry(forma, { depth: 0.16, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 3 });
  g.center();
  return new THREE.Mesh(g, material(color));
}

/* ---------- Ingeniería Industrial: brazo robótico que pasa cajas por la banda ---------- */
function industrial() {
  const grupo = new THREE.Group();
  const base = caja(3.6, 0.16, 2.2, C.blanco, 0.06); base.position.y = -1.1; grupo.add(base);

  // banda transportadora con rodillos
  const banda = caja(3.0, 0.12, 0.7, C.oscuro, 0.04); banda.position.set(0, -0.72, 0.45); grupo.add(banda);
  for (let i = 0; i < 9; i++) {
    const r = cilindro(0.07, 0.07, 0.74, C.lila, 16); r.rotation.x = Math.PI / 2; r.position.set(-1.4 + i * 0.35, -0.8, 0.45); grupo.add(r);
  }
  [-1.3, 1.3].forEach((x) => { const p = caja(0.12, 0.34, 0.6, C.lila); p.position.set(x, -0.95, 0.45); grupo.add(p); });
  const cajas = Array.from({ length: 3 }, (_, i) => {
    const c = caja(0.34, 0.28, 0.34, i === 1 ? C.naranja : C.blanco, 0.04); grupo.add(c); return c;
  });

  // brazo: base, hombro, codo y pinza
  const brazo = new THREE.Group(); brazo.position.set(0.2, -1.0, -0.45); grupo.add(brazo);
  brazo.add(cilindro(0.34, 0.4, 0.22, C.lila));
  const giro = new THREE.Group(); giro.position.y = 0.12; brazo.add(giro);
  const hombro = new THREE.Group(); hombro.position.y = 0.2; giro.add(hombro);
  const seg1 = caja(0.2, 1.05, 0.2, C.naranja); seg1.position.y = 0.5; hombro.add(seg1);
  hombro.add(Object.assign(new THREE.Mesh(new THREE.SphereGeometry(0.16, 20, 14), material(C.blanco)), {}));
  const codo = new THREE.Group(); codo.position.y = 1.02; hombro.add(codo);
  codo.add(new THREE.Mesh(new THREE.SphereGeometry(0.14, 20, 14), material(C.blanco)));
  const seg2 = caja(0.16, 0.85, 0.16, C.naranja); seg2.position.y = 0.42; codo.add(seg2);
  const muneca = new THREE.Group(); muneca.position.y = 0.86; codo.add(muneca);
  const led = new THREE.Mesh(new THREE.SphereGeometry(0.07, 14, 10), material(C.naranjaClaro, 0.2)); muneca.add(led);
  const dedos = [-1, 1].map((s) => { const d = caja(0.05, 0.2, 0.12, C.blanco, 0.02); d.position.set(s * 0.08, 0.12, 0); muneca.add(d); return d; });

  // engranajes que giran engranados
  const g1 = engranaje(0.42, 12, C.morado); g1.position.set(-1.25, 0.15, -0.6);
  const g2 = engranaje(0.28, 8, C.naranja); g2.position.set(-0.62, 0.4, -0.6);
  grupo.add(g1, g2);

  grupo.rotation.set(0.32, -0.5, 0);
  grupo.scale.setScalar(0.82);
  return {
    grupo,
    animar(t) {
      cajas.forEach((c, i) => { const x = ((t * 0.45 + i * 1.0) % 3.0) - 1.5; c.position.set(x, -0.52, 0.45); });
      const ciclo = (Math.sin(t * 1.1) + 1) / 2;
      giro.rotation.y = -0.6 + ciclo * 1.4;
      hombro.rotation.z = 0.25 - ciclo * 0.35;
      codo.rotation.z = 0.9 + Math.sin(t * 1.1 + 1) * 0.25;
      dedos.forEach((d, i) => { d.position.x = (i ? 1 : -1) * (0.06 + ciclo * 0.04); });
      encender(led.material, (Math.sin(t * 3) + 1) / 2);
      g1.rotation.z = t * 0.6; g2.rotation.z = -t * 0.6 * (12 / 8) + 0.2;
    },
  };
}

/* ---------- Tecnologías de la Información: rack de servidores y red de nodos ---------- */
function ti() {
  const grupo = new THREE.Group();
  const rack = caja(1.2, 2.3, 0.9, C.oscuro, 0.08); rack.position.set(-0.6, 0, 0); grupo.add(rack);
  const leds = [];
  for (let i = 0; i < 6; i++) {
    const y = 0.9 - i * 0.36;
    const hoja = caja(1.02, 0.26, 0.08, i === 2 ? C.naranja : C.blanco, 0.03); hoja.position.set(-0.6, y, 0.46); grupo.add(hoja);
    for (let k = 0; k < 3; k++) {
      const l = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 8), material(k === 0 ? C.naranjaClaro : '#7fe0c4', 0.1));
      l.position.set(-0.98 + k * 0.1, y, 0.52); grupo.add(l); leds.push(l);
    }
    const ranuras = caja(0.42, 0.05, 0.02, C.lila, 0.01); ranuras.position.set(-0.3, y, 0.51); grupo.add(ranuras);
  }

  // nodos de red alrededor y paquetes de datos que viajan por los enlaces
  const nodos = [
    new THREE.Vector3(0.9, 0.95, 0.2), new THREE.Vector3(1.45, 0.1, -0.2), new THREE.Vector3(0.85, -0.8, 0.35),
    new THREE.Vector3(0.2, 1.45, -0.4), new THREE.Vector3(0.15, -1.35, -0.3),
  ];
  const origen = new THREE.Vector3(-0.05, 0.2, 0.3);
  const esferas = nodos.map((p, i) => {
    const s = new THREE.Mesh(new THREE.SphereGeometry(i === 1 ? 0.17 : 0.12, 24, 16), material(i === 1 ? C.naranja : C.lila));
    s.position.copy(p); grupo.add(s); return s;
  });
  const enlaces = [];
  const unir = (a, b) => {
    const curva = new THREE.CatmullRomCurve3([a, a.clone().lerp(b, 0.5).add(new THREE.Vector3(0, 0.12, 0.15)), b]);
    grupo.add(new THREE.Mesh(new THREE.TubeGeometry(curva, 24, 0.018, 6), material(C.lila)));
    const paquete = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 8), material(C.naranjaClaro, 0.5));
    grupo.add(paquete); enlaces.push({ curva, paquete, desfase: enlaces.length * 0.37 });
  };
  nodos.forEach((p) => unir(origen, p));
  unir(nodos[0], nodos[1]); unir(nodos[1], nodos[2]);

  // escudo de ciberseguridad
  const forma = new THREE.Shape();
  forma.moveTo(0, 0.42); forma.quadraticCurveTo(0.28, 0.36, 0.34, 0.3); forma.lineTo(0.3, -0.05);
  forma.quadraticCurveTo(0.2, -0.32, 0, -0.44); forma.quadraticCurveTo(-0.2, -0.32, -0.3, -0.05);
  forma.lineTo(-0.34, 0.3); forma.quadraticCurveTo(-0.28, 0.36, 0, 0.42);
  const gEscudo = new THREE.ExtrudeGeometry(forma, { depth: 0.1, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 4 });
  gEscudo.center();
  const escudo = new THREE.Mesh(gEscudo, material(C.naranja)); escudo.position.set(1.35, 1.05, 0.5); grupo.add(escudo);

  grupo.rotation.set(0.12, -0.35, 0);
  grupo.scale.setScalar(0.82);
  return {
    grupo,
    animar(t) {
      leds.forEach((l, i) => encender(l.material, Math.sin(t * (3 + (i % 5)) + i * 1.7) > 0.3 ? 0.8 : 0.02));
      enlaces.forEach((e) => e.paquete.position.copy(e.curva.getPoint((t * 0.5 + e.desfase) % 1)));
      esferas.forEach((s, i) => s.scale.setScalar(1 + Math.sin(t * 2 + i) * 0.06));
      escudo.rotation.y = Math.sin(t * 0.8) * 0.5;
      escudo.position.y = 1.05 + Math.sin(t * 1.2) * 0.06;
    },
  };
}

/* ---------- Ingeniería Eléctrica: torre de alta tensión, aerogenerador y energía en las líneas ---------- */
function electrica() {
  const grupo = new THREE.Group();
  const base = caja(3.6, 0.14, 1.8, C.blanco, 0.06); base.position.y = -1.25; grupo.add(base);

  // torre en celosía (patas, travesaños y crucetas)
  const torre = new THREE.Group(); torre.position.set(-0.7, -1.18, 0); grupo.add(torre);
  const barra = (a, b, grosor = 0.035, color = C.lila) => {
    const d = new THREE.Vector3().subVectors(b, a);
    const m = new THREE.Mesh(new THREE.CylinderGeometry(grosor, grosor, d.length(), 8), material(color));
    m.position.copy(a).add(d.multiplyScalar(0.5));
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3().subVectors(b, a).normalize());
    torre.add(m);
  };
  const H = 2.5, abajo = 0.42, arriba = 0.12;
  const esquina = (y, s) => { const w = abajo + (arriba - abajo) * (y / H); return new THREE.Vector3(s[0] * w, y, s[1] * w); };
  const lados = [[1, 1], [-1, 1], [-1, -1], [1, -1]];
  lados.forEach((s) => barra(esquina(0, s), esquina(H, s), 0.045, C.morado));
  for (let k = 0; k < 5; k++) {
    const y0 = (k / 5) * H, y1 = ((k + 1) / 5) * H;
    lados.forEach((s, i) => { const s2 = lados[(i + 1) % 4]; barra(esquina(y0, s), esquina(y1, s2), 0.022); barra(esquina(y1, s), esquina(y1, s2), 0.022); });
  }
  const crucetas = [H * 0.72, H * 0.9];
  crucetas.forEach((y, k) => barra(new THREE.Vector3(-0.75 + k * 0.15, y, 0), new THREE.Vector3(0.75 - k * 0.15, y, 0), 0.04, C.morado));

  // líneas que salen de la torre con pulsos de energía
  const pulsos = [];
  crucetas.forEach((y, k) => [-1, 1].forEach((s) => {
    const x0 = -0.7 + s * (0.72 - k * 0.15);
    const a = new THREE.Vector3(x0, -1.18 + y, 0);
    const b = new THREE.Vector3(x0 + 2.4, -1.18 + y - 0.5, 0.2 * s);
    const curva = new THREE.QuadraticBezierCurve3(a, a.clone().lerp(b, 0.5).add(new THREE.Vector3(0, -0.28, 0)), b);
    grupo.add(new THREE.Mesh(new THREE.TubeGeometry(curva, 30, 0.014, 6), material(C.lila)));
    const p = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 8), material(C.naranjaClaro, 0.6));
    grupo.add(p); pulsos.push({ curva, p, desfase: pulsos.length * 0.25 });
  }));

  // aerogenerador
  const turbina = new THREE.Group(); turbina.position.set(1.2, -1.18, -0.4); grupo.add(turbina);
  const mastil = cilindro(0.04, 0.07, 1.9, C.blanco, 16); mastil.position.y = 0.95; turbina.add(mastil);
  const gondola = caja(0.22, 0.14, 0.32, C.blanco, 0.04); gondola.position.set(0, 1.92, 0.04); turbina.add(gondola);
  const rotor = new THREE.Group(); rotor.position.set(0, 1.92, 0.22); turbina.add(rotor);
  rotor.add(new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 12), material(C.naranja)));
  for (let i = 0; i < 3; i++) {
    const pala = caja(0.07, 0.72, 0.03, C.blanco, 0.02); pala.position.y = 0.38;
    const brazo = new THREE.Group(); brazo.rotation.z = (i / 3) * Math.PI * 2; brazo.add(pala); rotor.add(brazo);
  }

  // panel solar
  const panel = caja(0.9, 0.04, 0.55, C.oscuro, 0.02); panel.position.set(0.35, -0.95, 0.55); panel.rotation.x = -0.5; grupo.add(panel);
  for (let i = 0; i < 3; i++) { const l = caja(0.02, 0.05, 0.5, C.lila, 0.005); l.position.set(0.1 + i * 0.25, -0.94, 0.56); l.rotation.x = -0.5; grupo.add(l); }
  const soporte = cilindro(0.03, 0.03, 0.3, C.lila, 8); soporte.position.set(0.35, -1.1, 0.55); grupo.add(soporte);

  grupo.rotation.set(0.22, -0.45, 0);
  grupo.scale.setScalar(0.72);
  grupo.position.y = -0.12;
  return {
    grupo,
    animar(t) {
      rotor.rotation.z = -t * 1.6;
      pulsos.forEach((e) => {
        const k = (t * 0.55 + e.desfase) % 1;
        e.p.position.copy(e.curva.getPoint(k));
        encender(e.p.material, Math.sin(k * Math.PI));
      });
      encender(panel.material, (Math.sin(t * 1.4) + 1) * 0.06);
    },
  };
}

const MODELOS = { 'ingenieria-industrial': industrial, 'ingenieria-ti': ti, 'ingenieria-electrica': electrica };

/** Monta la figura de `slug` en `cont`. Devuelve una función que la desmonta. */
export function figura(cont, slug, { quieto = false } = {}) {
  const crear = MODELOS[slug];
  if (!crear) return () => {};
  const render = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  render.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  cont.appendChild(render.domElement);
  const escena = new THREE.Scene();
  iluminar(render, escena);
  const camara = new THREE.PerspectiveCamera(32, 1, 0.1, 60);
  camara.position.set(0, 0, 7);
  const medir = () => {
    const { width, height } = cont.getBoundingClientRect();
    render.setSize(width, height, false);
    camara.aspect = width / height || 1;
    camara.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(medir); ro.observe(cont); medir();

  const raton = { x: 0, y: 0, tx: 0, ty: 0 };
  const mover = (e) => {
    const r = cont.getBoundingClientRect();
    raton.tx = ((e.clientX - r.left) / r.width) * 2 - 1;
    raton.ty = ((e.clientY - r.top) / r.height) * 2 - 1;
  };
  const soltar = () => { raton.tx = 0; raton.ty = 0; };
  cont.addEventListener('pointermove', mover);
  cont.addEventListener('pointerleave', soltar);
  let visible = true;
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }); io.observe(cont);

  const m = crear();
  escena.add(m.grupo);
  const rx = m.grupo.rotation.x, ry = m.grupo.rotation.y;
  const reloj = new THREE.Clock();
  const cuadro = () => {
    const t = quieto ? 1.2 : reloj.getElapsedTime();
    raton.x += (raton.tx - raton.x) * 0.06;
    raton.y += (raton.ty - raton.y) * 0.06;
    m.animar(t);
    m.grupo.rotation.x = rx + raton.y * 0.3;
    m.grupo.rotation.y = ry + raton.x * 0.6 + (quieto ? 0 : Math.sin(t * 0.4) * 0.25);
    render.render(escena, camara);
  };
  if (quieto) cuadro(); else render.setAnimationLoop(() => { if (visible && !document.hidden) cuadro(); });

  return () => {
    render.setAnimationLoop(null);
    ro.disconnect(); io.disconnect();
    cont.removeEventListener('pointermove', mover);
    cont.removeEventListener('pointerleave', soltar);
    escena.traverse((o) => { o.geometry?.dispose?.(); o.material?.dispose?.(); });
    render.dispose();
    render.domElement.remove();
  };
}
