import React, { useEffect, useRef, useCallback } from 'react';

interface Model3DViewerProps {
  width?: string;
  height?: string;
}

const Model3DViewer: React.FC<Model3DViewerProps> = ({ 
  width = '100%', 
  height = '450px' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobileDevice = useRef<boolean>(
    typeof navigator !== 'undefined' && 
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  );

  useEffect(() => {
    const hasScript = document.querySelector('script[src*="model-viewer.min.js"]');
    
    if (!hasScript) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
      document.head.appendChild(script);
      script.onload = createModelViewer;
    } else {
      createModelViewer();
    }
    
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);
  
  const createModelViewer = useCallback(() => {
    if (!containerRef.current) return;
    
    containerRef.current.innerHTML = `
      <div class="loading-container" style="
        width: 100%; height: 100%;
        display: flex; align-items: center; justify-content: center;
        position: relative;
      ">
        <div class="spinner" style="
          width: 70px; height: 70px;
          border: 3px solid rgba(255,107,0,0.1);
          border-radius: 50%;
          border-left-color: #FF6B00;
          animation: spin 0.8s linear infinite;
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

    if (!document.querySelector('style#model-viewer-styles')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'model-viewer-styles';
      styleSheet.textContent = `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(styleSheet);
    }
    
    const modelViewer = document.createElement('model-viewer');
    
    const modelAttributes = {
      'src': '/base.obj.glb',
      'alt': '3D Model',
      'auto-rotate': '',
      'rotation-per-second': '30deg',
      'exposure': '1.5',
      'environment-image': 'neutral',
      'shadow-intensity': '1.0',
      'background-color': 'transparent',
      'camera-controls': 'false',
      'disable-tap': '',
      'disable-pan': '',
      'disable-zoom': '',
      'interaction-prompt': 'none',
      'reveal': 'auto',
      'loading': 'eager',
      'poster': '/shield-logo.png'
    };
    
    Object.entries(modelAttributes).forEach(([key, value]) => {
      modelViewer.setAttribute(key, value);
    });
    
    if (isMobileDevice.current) {
      const preventTouch = (e: Event) => e.preventDefault();
      modelViewer.addEventListener('touchstart', preventTouch, { passive: false });
      modelViewer.addEventListener('touchmove', preventTouch, { passive: false });
      modelViewer.addEventListener('touchend', preventTouch, { passive: false });
      modelViewer.style.pointerEvents = 'none';
    }
    
    const modelStyles = {
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
      '--poster-color': 'transparent',
      '--progress-bar-color': '#FF6B00',
      '--progress-mask': 'linear-gradient(to right, #FF6B00, #FF8A3D)'
    };
    
    Object.entries(modelStyles).forEach(([key, value]) => {
      modelViewer.style.setProperty(key, value as string);
    });
    
    modelViewer.addEventListener('load', () => {
      if (containerRef.current) {
        containerRef.current.querySelector('.loading-container')?.remove();
      }
    });
    
    modelViewer.addEventListener('error', () => {
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
    
    containerRef.current.appendChild(modelViewer);
    
    if (!document.querySelector('style#model-materials')) {
      const materialStyle = document.createElement('style');
      materialStyle.id = 'model-materials';
      materialStyle.textContent = `
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
      document.head.appendChild(materialStyle);
    }
    
    fetch('/SPF3D.json')
      .then(response => response.ok ? response.json() : Promise.reject('Error HTTP'))
      .then(config => {
        if (config.color) {
          modelViewer.style.setProperty('--material-color', config.color);
        }
        if (config.exposure) {
          modelViewer.setAttribute('exposure', config.exposure.toString());
        }
        if (config.rotationSpeed) {
          modelViewer.setAttribute('rotation-per-second', config.rotationSpeed);
        }
        if (config.autoRotate !== undefined) {
          config.autoRotate ? 
            modelViewer.setAttribute('auto-rotate', '') : 
            modelViewer.removeAttribute('auto-rotate');
        }
      })
      .catch(() => {
        modelViewer.style.setProperty('--material-color', '#FF6B00');
      });
  }, []);
  

  return (
    <div ref={containerRef} style={{ width, height, position: 'relative' }}></div>
  );
};

export default Model3DViewer;
