/**
 * Utilidades para optimización de imágenes
 */

/**
 * Precarga imágenes para mejorar la experiencia de usuario
 * @param sources Array de URLs de imágenes a precargar
 * @returns Promise que se resuelve cuando todas las imágenes están precargadas
 */
export const preloadImages = (sources: string[]): Promise<void[]> => {
  const promises = sources.map(src => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve();
      img.onerror = reject;
    });
  });
  
  return Promise.all(promises);
};

/**
 * Función para generar atributos srcSet para imágenes responsivas
 * @param basePath Ruta base de la imagen
 * @param sizes Tamaños de imagen disponibles
 * @param ext Extensión del archivo
 * @returns String de srcSet formateado
 */
export const generateSrcSet = (basePath: string, sizes: number[], ext: string = 'webp'): string => {
  return sizes
    .map(size => `${basePath}-${size}.${ext} ${size}w`)
    .join(', ');
};

/**
 * Reduce el número de animaciones en dispositivos con preferencia por movimiento reducido
 * @returns Verdadero si el usuario prefiere movimiento reducido
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Formatea el tamaño de imágenes para mostrar al usuario
 * @param bytes Tamaño en bytes
 * @returns Tamaño formateado (KB o MB)
 */
export const formatImageSize = (bytes: number): string => {
  if (bytes < 1024) {
    return `${bytes} B`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  } else {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
};
