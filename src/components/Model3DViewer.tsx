import React, { useEffect, useRef } from 'react';

interface Model3DViewerProps {
  width?: string;
  height?: string;
}

const Model3DViewer: React.FC<Model3DViewerProps> = ({ 
  width = '100%', 
  height = '450px' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Verificar si el script ya está cargado
    const hasScript = document.querySelector('script[src*="model-viewer.min.js"]');
    
    if (!hasScript) {
      // Cargar el script de model-viewer
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
      document.head.appendChild(script);
      
      script.onload = () => {
        createModelViewer();
      };
    } else {
      // Si ya está cargado, crear el visor
      createModelViewer();
    }
    
    return () => {
      // Limpiar al desmontar
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);
  
  const createModelViewer = () => {
    if (!containerRef.current) return;
    
    // Limpiar el contenedor
    containerRef.current.innerHTML = '';
    
    // Crear elemento model-viewer
    const modelViewer = document.createElement('model-viewer');
    
    // Configurar atributos
    modelViewer.src = '/base.obj.glb';
    modelViewer.alt = '3D Model';
    modelViewer.setAttribute('auto-rotate', '');
    modelViewer.setAttribute('rotation-per-second', '30deg');
    modelViewer.setAttribute('exposure', '1.5');
    modelViewer.setAttribute('environment-image', 'neutral');
    modelViewer.setAttribute('shadow-intensity', '1.0');
    modelViewer.setAttribute('background-color', 'transparent');
    modelViewer.setAttribute('camera-controls', 'false');
    modelViewer.setAttribute('disable-tap', '');
    modelViewer.setAttribute('disable-pan', '');
    modelViewer.setAttribute('disable-zoom', '');
    modelViewer.setAttribute('interaction-prompt', 'none');
    
    // Aplicar estilos
    modelViewer.style.width = '100%';
    modelViewer.style.height = '100%';
    modelViewer.style.backgroundColor = 'transparent';
    modelViewer.style.setProperty('--poster-color', 'transparent');
    modelViewer.style.setProperty('--progress-bar-color', '#FF6B00');
    modelViewer.style.setProperty('--progress-mask', 'linear-gradient(to right, #FF6B00, #FF8A3D)');
    
    // Agregar al contenedor
    containerRef.current.appendChild(modelViewer);
    
    // Aplicar colores al modelo
    const style = document.createElement('style');
    style.textContent = `
      model-viewer::part(default-material) {
        --material-color: #FF6B00;
        --material-metalness: 0.8;
        --material-roughness: 0.2;
      }
      
      model-viewer::part(material-1) {
        --material-color: #0066CC;
        --material-metalness: 0.8;
        --material-roughness: 0.2;
      }
    `;
    document.head.appendChild(style);
    
    // Cargar configuración desde SPF3D.json
    fetch('/SPF3D.json')
      .then(response => response.json())
      .then(config => {
        console.log('Configuración cargada:', config);
        
        // Aplicar configuración
        if (config.color) {
          modelViewer.style.setProperty('--material-color', config.color);
        }
        if (config.exposure) modelViewer.setAttribute('exposure', config.exposure.toString());
        if (config.rotationSpeed) modelViewer.setAttribute('rotation-per-second', config.rotationSpeed);
        if (config.autoRotate !== undefined) {
          if (config.autoRotate) {
            modelViewer.setAttribute('auto-rotate', '');
          } else {
            modelViewer.removeAttribute('auto-rotate');
          }
        }
      })
      .catch(error => {
        console.log('Error cargando configuración:', error);
      });
  };

  return (
    <div ref={containerRef} style={{ width, height, position: 'relative' }}></div>
  );
};

export default Model3DViewer;
