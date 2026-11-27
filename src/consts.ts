/**
 * Versión de los assets de marca (favicon, og-image, apple-touch-icon).
 *
 * Estos ficheros tienen nombre fijo, así que las cachés intermedias —Cloudflare
 * está delante de este sitio— los conservan aunque cambie el contenido.
 * Al subir este número cambia la URL y la caché se salta limpiamente.
 *
 * Súbelo cada vez que reemplaces uno de esos ficheros.
 */
export const ASSET_VERSION = '2';

/** Añade el sufijo de versión a la ruta de un asset de marca. */
export const versioned = (path: string) => `${path}?v=${ASSET_VERSION}`;

export const SITE_NAME = 'Facultad de Ingenierías — Universidad Indoamérica';
