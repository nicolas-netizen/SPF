import React, { useEffect, useRef } from 'react';

interface ShieldLogoProps {
  width?: string;
  height?: string;
}

const ShieldLogo: React.FC<ShieldLogoProps> = ({ 
  width = '100%', 
  height = '100%' 
}) => {
  const svgContainerRef = useRef<HTMLDivElement>(null);
  
  // Configuración de rotación
  useEffect(() => {
    let angle = 0;
    let animationFrame: number;
    
    const rotate = () => {
      if (svgContainerRef.current) {
        angle += 0.2; // Velocidad de rotación
        svgContainerRef.current.style.transform = `rotateY(${angle}deg)`;
      }
      animationFrame = requestAnimationFrame(rotate);
    };
    
    rotate();
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);
  
  return (
    <div 
      style={{ 
        width, 
        height, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        perspective: '1000px'
      }}
    >
      <div 
        ref={svgContainerRef}
        style={{ 
          width: '80%', 
          height: '80%',
          transformStyle: 'preserve-3d',
          animation: 'float 6s ease-in-out infinite'
        }}
      >
        <svg 
          viewBox="0 0 500 500" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%' }}
        >
          {/* Efectos de luz y sombra */}
          <defs>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0066CC" />
              <stop offset="100%" stopColor="#0099FF" />
            </linearGradient>
            <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B00" />
              <stop offset="100%" stopColor="#FF8A3D" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          {/* Parte superior del escudo (azul) */}
          <path 
            d="M 250 50 C 350 130 350 200 250 280 C 150 200 150 130 250 50"
            fill="url(#blueGradient)"
            filter="url(#glow)"
            opacity="0.9"
          />
          
          {/* Parte inferior del escudo (llama naranja) */}
          <path 
            d="M 180 400 C 250 320 300 280 320 200 C 280 250 250 280 200 300 C 230 250 250 200 220 150 C 200 200 150 300 120 400"
            fill="url(#orangeGradient)"
            filter="url(#glow)"
            className="animate-flicker"
            opacity="0.95"
          />
          
          {/* Brillo central */}
          <circle cx="250" cy="180" r="15" fill="white" opacity="0.7" filter="url(#glow)" className="animate-pulse" />
        </svg>
      </div>
    </div>
  );
};

export default ShieldLogo;
