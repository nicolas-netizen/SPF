import React, { useRef, useEffect, ReactNode } from 'react';

// Importamos el tipo para la biblioteca vanilla-tilt
declare global {
  interface Window {
    VanillaTilt: any;
  }
}

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  glareColor?: string;
  max?: number;
  speed?: number;
  scale?: number;
  perspective?: number;
  glare?: boolean;
  'data-tilt-max-glare'?: number;
}

const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  glareColor = 'rgba(255, 107, 0, 0.4)',
  max = 10,
  speed = 400,
  scale = 1.04,
  perspective = 1000,
  glare = true,
  'data-tilt-max-glare': maxGlare = 0.5,
}) => {
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cargar vanilla-tilt dinámicamente
    const loadTilt = async () => {
      // Verificar si ya está cargado
      if (!window.VanillaTilt) {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/vanilla-tilt@1.8.0/dist/vanilla-tilt.min.js';
        script.async = true;
        script.onload = initTilt;
        document.head.appendChild(script);
      } else {
        initTilt();
      }
    };

    // Inicializar el efecto tilt
    const initTilt = () => {
      if (tiltRef.current && window.VanillaTilt) {
        window.VanillaTilt.init(tiltRef.current, {
          max,
          speed,
          scale,
          glare,
          perspective,
          "max-glare": maxGlare,
          gyroscope: true,  // Habilitar giroscopio para dispositivos móviles
          "glare-prerender": false,
          "full-page-listening": false,
        });
        
        // Aplicar color personalizado al efecto de brillo
        if (glare && tiltRef.current) {
          const glareElement = tiltRef.current.querySelector('.js-tilt-glare-inner');
          if (glareElement) {
            (glareElement as HTMLElement).style.background = `linear-gradient(0deg, transparent 0%, ${glareColor} 100%)`;
          }
        }
      }
    };

    loadTilt();

    // Limpiar al desmontar
    return () => {
      if (tiltRef.current && window.VanillaTilt) {
        window.VanillaTilt.destroy(tiltRef.current);
      }
    };
  }, [max, speed, scale, glare, perspective, maxGlare, glareColor]);

  return (
    <div 
      ref={tiltRef}
      className={`transform-gpu will-change-transform ${className}`}
      data-tilt
    >
      {children}
    </div>
  );
};

export default TiltCard;
