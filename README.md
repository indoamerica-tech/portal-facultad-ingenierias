# Portal de la Facultad de Ingenierías — Universidad Indoamérica

Sitio publicado en https://facultad.indoamericatech.com

Portal estático para estudiantes de la Facultad de Ingenierías, campus Quito: carreras,
trámites con guías paso a paso, preguntas frecuentes y un asistente de búsqueda.

## Stack

- Astro 7 (salida estática) con islas de React 19 para los componentes interactivos.
- Animación con `motion` y desplazamiento suave con `lenis`; iconos con `lucide-react`.
- Node 22.12 o superior.
- Producción: imagen Docker de dos etapas (build con Node, servido con nginx) detrás de
  Traefik.

## Comandos

```sh
npm ci            # instala dependencias desde package-lock.json
npm run dev       # servidor local en http://localhost:4321
npm run build     # genera ./dist
npm run preview   # sirve ./dist en local
```

## Estructura

```text
src/
├── data/site.ts         fuente única del contenido: carreras, trámites, FAQ, novedades
├── consts.ts            nombre del sitio y versión de los assets de marca
├── pages/               una página por ruta (inicio, carreras/, tramites/, faq, 404)
├── layouts/             BaseLayout, PageLayout y TramiteLayout
├── components/
│   ├── layout/          cabecera, pie y SEO
│   ├── sections/        bloques de portada y de página
│   ├── interactive/     islas React: buscador de trámites, asistente, guías de faltas
│   │                    y titulación, stepper de procesos, cambio de tema
│   └── ui/              botón, tarjeta, icono y aviso de contenido pendiente
├── scripts/             motion.ts (sistema de animación) y hero-canvas.ts
└── styles/              global.css (paleta y variables), tipografía y componentes
public/                  favicon, apple-touch-icon y og-image
docs/                    documentación de planificación del proyecto (julio 2026)
info_entregada/          instructivos originales entregados por la facultad (PDF y texto)
```

Añadir o quitar una carrera o un trámite se hace en `src/data/site.ts`; el cambio se
propaga a menú, portada, pie, buscador y asistente.

## Alcance actual (fase 1)

Revisado con la coordinación el 2026-07-09, que pidió quedarse con lo esencial.

- Carreras, solo campus Quito: Ingeniería Industrial (presencial y semipresencial),
  Tecnologías de la Información e Ingeniería Eléctrica.
- Trámites: matrículas, horarios, justificación de faltas, titulación, prácticas
  preprofesionales y vinculación.
- Menú: Inicio · Carreras · Trámites · FAQ. Las novedades viven dentro de cada carrera
  (`CareerNews.astro`, alimentado por `NOVEDADES` en `src/data/site.ts`).
- Fuera de esta fase: enlaces a Aula Virtual, SGA, Admisiones y Correo, y las páginas
  globales de noticias, eventos y formularios. Las instrucciones de los trámites sí
  mencionan el SGA porque el procedimiento real pasa por él.

## Contenido pendiente antes de presentarlo como oficial

1. `NOVEDADES` en `src/data/site.ts`: los eventos, noticias y anuncios por carrera son de
   muestra.
2. `/tramites/horarios`: la lista está vacía a propósito y la página muestra un aviso de
   «aún no publicados» hasta que la coordinación entregue los horarios.
3. Plantillas descargables: no hay ningún PDF en `public/`. Donde iría una descarga se
   muestra `PendingNote.astro` en lugar de un botón que no hace nada.
4. Coordinación de justificación de faltas de Ingeniería Eléctrica: falta. Industrial y TI
   están tomadas de los instructivos de `info_entregada/`.
5. Cifras de la portada (`STATS`): solo quedan las comprobables.

`grep -rn "⚠" src/` localiza los puntos marcados en el código.

## Identidad visual

Colores tomados del kit de marca del sitio oficial de la universidad:

| Hex | Uso |
|---|---|
| `#120230` | morado profundo, fondo institucional |
| `#3C235F` | morado medio |
| `#EA600A` | naranja de llamadas a la acción |
| `#F9A01B` / `#FFD540` | dorado, reservado a logros y distinciones |

Esos valores van exactos en `src/styles/global.css` y el resto de la rampa se interpola.
Tipografía: Fraunces para titulares (con los ejes `SOFT` y `WONK` pedidos en la URL de
Google Fonts; si no, quedan fijados a 0) e IBM Plex Sans y Mono para el cuerpo.

## Animación

Todo el movimiento sale de `src/scripts/motion.ts` con atributos declarativos:
`data-reveal`, `data-stagger`, `data-counter`, `data-magnetic`, `data-tilt`,
`data-parallax`, `data-marquee`. Se inicializa en `astro:page-load` y se limpia en
`astro:before-swap`; las páginas no llevan JS de animación propio.

El estado oculto de un `[data-reveal]` nunca puede recortar el elemento a área cero
(`clip-path: inset(0 0 100% 0)`, `height: 0`): IntersectionObserver no lo detectaría y el
elemento no aparecería nunca. `opacity: 0` sí es seguro.

## Despliegue

El sitio corre en un VPS con Docker, detrás de Traefik (gestionado por Coolify, red externa
`coolify`, certificados de Let's Encrypt). El `docker-compose.yml` ya trae las etiquetas de
enrutamiento para `facultad.indoamericatech.com`. El acceso al servidor lo gestiona la
universidad.

```sh
# en el servidor, dentro de la carpeta del proyecto
sudo docker compose up -d --build
```

Dos detalles de nginx (`nginx.conf`) que conviene no deshacer:

- Traefik termina el TLS y habla HTTP con nginx, así que los redirects absolutos saldrían
  con `http://`. Por eso van `absolute_redirect off`, `port_in_redirect off` y
  `try_files $uri $uri.html $uri/index.html =404`, que sirve `/carreras/index.html` sin
  redirigir.
- Un `add_header` dentro de un `location` anula los del bloque `server`: las cabeceras de
  seguridad se repiten en cada `location` que añade las suyas.

Cloudflare está delante del sitio. `favicon.svg`, `favicon.ico`, `apple-touch-icon.png` y
`og-image.png` tienen nombre fijo, así que al reemplazar cualquiera de ellos hay que subir
`ASSET_VERSION` en `src/consts.ts` para que la URL cambie. Se comprueba contra la URL
pública:

```sh
curl -sI https://facultad.indoamericatech.com/favicon.svg | grep -i cf-cache-status
```
