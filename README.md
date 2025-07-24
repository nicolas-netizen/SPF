# SPF Security Website

Sitio web moderno y responsive para SPF Security, desarrollado con React, TypeScript y Vite.

## Características

- 🎨 Diseño moderno con tema espacial y efectos de partículas
- 📱 Totalmente responsive para móviles y escritorio
- 🔄 Menús desplegables interactivos
- 🎥 Sección de video del centro de operaciones
- 🌈 Efectos visuales y animaciones modernas

## Tecnologías Utilizadas

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React (iconos)

## Estructura del Proyecto

- `/src/components`: Componentes reutilizables
- `/src/pages`: Páginas principales
- `/src/styles`: Estilos globales
- `/public`: Recursos estáticos

## Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

## Características Principales

### Navegación
- Menú responsive con dropdowns
- Animaciones suaves
- Diseño moderno y minimalista

### Páginas
- Home con secciones dinámicas
- Página de contacto
- Secciones de servicios e industrias

### Diseño
- Tema oscuro con estética espacial
- Gradientes y efectos visuales
- Optimizado para rendimiento

## Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.

# Recomendaciones de Optimización de Imágenes

Para mejorar la performance de la landing:

- Convierte imágenes pesadas (por ejemplo, `Export animación logo.gif`, `Soc.jpg`, `shield-logo.png`, `SPF.png`) a formatos modernos como WebP o AVIF.
- Usa el utilitario `generateSrcSet` de `src/utils/optimizeImages.ts` para servir imágenes responsivas según el tamaño de pantalla.
- Reemplaza los `<img src="...">` por `<img srcSet="...">` donde sea posible.
- Para videos, considera comprimirlos o usar un CDN si el tráfico es alto.

**Ejemplo de uso de srcSet:**
```tsx
<img
  srcSet={generateSrcSet('/assets/SPF', [320, 640, 1280], 'webp')}
  src="/assets/SPF-640.webp"
  alt="Logo SPF"
  width={320}
  height={320}
/>
```

Esto ayuda a reducir el tiempo de carga y mejora el puntaje de Lighthouse.
