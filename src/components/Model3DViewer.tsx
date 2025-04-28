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
    
    // Mostrar un loader mientras carga
    containerRef.current.innerHTML = `
      <div class="loading-container" style="
        width: 100%; height: 100%;
        display: flex; align-items: center; justify-content: center;
        position: relative;
      ">
        <div class="spinner" style="
          width: 80px; height: 80px;
          border: 4px solid rgba(255,107,0,0.1);
          border-radius: 50%;
          border-left-color: #FF6B00;
          animation: spin 1s linear infinite;
        "></div>
        <div style="
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-size: 14px;
          color: white;
          text-align: center;
          opacity: 0.7;
        ">Cargando modelo 3D...</div>
      </div>
    `;

    // Crear una regla de estilo para la animación del spinner
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(styleSheet);
    
    // Crear elemento model-viewer
    const modelViewer = document.createElement('model-viewer');
    
    // Configurar atributos
    // Eliminamos la precarga que causaba advertencias
    // y confiamos en la carga integrada del model-viewer
    
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
    
    // Escuchar eventos de carga
    modelViewer.addEventListener('load', () => {
      console.log('Modelo 3D cargado exitosamente');
      if (containerRef.current) {
        containerRef.current.querySelector('.loading-container')?.remove();
      }
    });
    
    modelViewer.addEventListener('error', (error) => {
      console.error('Error cargando modelo 3D:', error);
      if (containerRef.current) {
        containerRef.current.innerHTML = `
          <div style="
            width: 100%; height: 100%;
            display: flex; align-items: center; justify-content: center;
            flex-direction: column;
          ">
            <div style="color: #FF6B00; font-size: 18px; margin-bottom: 10px;">Error cargando modelo</div>
            <img src="/shield-logo.png" alt="Logo SPF" style="max-width: 70%; max-height: 70%;" />
          </div>
        `;
      }
    });
    
    // Optimizar rendimiento
    modelViewer.setAttribute('reveal', 'auto');
    modelViewer.setAttribute('loading', 'eager');
    modelViewer.setAttribute('poster', '/shield-logo.png');
    
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
    try {
      fetch('/SPF3D.json')
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
          }
          return response.json();
        })
        .then(config => {
          console.log('Configuración cargada:', config);
          
          // Aplicar la configuración al modelo
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
          // Valores por defecto si hay error
          modelViewer.style.setProperty('--material-color', '#FF6B00');
        });
    } catch (err) {
      console.log('Error en fetch:', err);
    }
  };

  return (
    <div ref={containerRef} style={{ width, height, position: 'relative' }}></div>
  );
};

export default Model3DViewer;
