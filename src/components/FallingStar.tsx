import React, { useEffect, useState, useRef } from 'react';

interface FallingStarProps {
  targetSection: string; // ID de la sección a revelar
}

const FallingStar: React.FC<FallingStarProps> = ({ targetSection }) => {
  const starRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [starPosition, setStarPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  
  // Detectar cuando estamos cerca de la sección
  useEffect(() => {
    const handleScroll = () => {
      if (hasTriggered) return;
      
      const triggerPoint = window.innerHeight * 0.6; // 60% del viewport
      const section = document.getElementById(targetSection);
      
      if (section) {
        const sectionTop = section.getBoundingClientRect().top;
        
        // Cuando nos acercamos a la sección
        if (sectionTop < triggerPoint && sectionTop > 0) {
          setIsVisible(true);
          
          // Calcular posición inicial aleatoria (arriba, pero x aleatorio)
          const startX = Math.random() * window.innerWidth;
          setStarPosition({ x: startX, y: -50 });
          
          // Calcular posición objetivo (centro de la sección)
          const targetX = section.getBoundingClientRect().left + (section.offsetWidth / 2);
          const targetY = section.getBoundingClientRect().top + 100; // Un poco por debajo del inicio
          setTargetPosition({ x: targetX, y: targetY });
          
          setHasTriggered(true);
          
          // Revelar la sección gradualmente
          setTimeout(() => {
            revealSection(section);
          }, 1000); // Darle tiempo a la estrella para que caiga
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [targetSection, hasTriggered]);
  
  // Revelar la sección gradualmente
  const revealSection = (section: HTMLElement) => {
    // Añadir clase para revelar con un efecto
    section.classList.add('section-revealed');
    
    // Encontrar elementos hijos para animarlos secuencialmente
    const elements = section.querySelectorAll('.fade-in-element');
    elements.forEach((el, index) => {
      setTimeout(() => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'translateY(0)';
      }, 300 + (index * 150)); // Revelar elementos secuencialmente
    });
  };
  
  // Animar la estrella de la posición inicial a la objetivo
  useEffect(() => {
    if (isVisible && starRef.current) {
      // Configurar posición inicial
      starRef.current.style.left = `${starPosition.x}px`;
      starRef.current.style.top = `${starPosition.y}px`;
      
      // Animar hacia la posición objetivo
      setTimeout(() => {
        if (starRef.current) {
          starRef.current.style.left = `${targetPosition.x}px`;
          starRef.current.style.top = `${targetPosition.y}px`;
          starRef.current.style.opacity = '1';
          
          // Explosión al llegar
          setTimeout(() => {
            if (starRef.current) {
              starRef.current.classList.add('exploding');
              
              // Desaparecer después de la explosión
              setTimeout(() => {
                if (starRef.current) {
                  starRef.current.style.opacity = '0';
                }
              }, 500);
            }
          }, 800); // Tiempo hasta la explosión
        }
      }, 50);
    }
  }, [isVisible, starPosition, targetPosition]);
  
  if (!isVisible) return null;
  
  return (
    <div 
      ref={starRef}
      className="fixed z-40 pointer-events-none transition-all duration-800"
      style={{
        width: '20px',
        height: '20px',
        opacity: 0.8,
      }}
    >
      {/* Estrella con cola */}
      <div className="relative">
        {/* Núcleo de la estrella */}
        <div className="absolute top-0 left-0 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_6px_rgba(10,255,233,0.8)]"></div>
        
        {/* Cola de la estrella */}
        <div className="absolute top-1 left-2 w-20 h-1.5 bg-gradient-to-r from-neon-cyan via-white to-transparent rounded-full transform -rotate-45 origin-left"></div>
        
        {/* Resplandor */}
        <div className="absolute top-0 left-0 w-5 h-5 bg-neon-cyan rounded-full blur-sm opacity-70"></div>
      </div>
    </div>
  );
};

export default FallingStar;
