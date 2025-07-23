import React, { useEffect, useRef } from 'react';
import { Search, Cog, Shield } from 'lucide-react';

// Estilos CSS para los hexágonos
const hexagonStyles = `
  .hexagon-card {
    position: relative;
    width: 100%;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;
  }

  /* Usando pseudo-elementos para crear bordes */
.hexagon-shape {
 clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
position: absolute;
z-index: 0;
inset: 0;
background: linear-gradient(to bottom, rgba(10, 15, 30, 0.6), rgba(15, 20, 40, 0.6));
transition: all 0.3s ease;
}

  
.technology-card:hover .hexagon-shape {
  backdrop-filter: blur(12px);
  background: rgba(20, 30, 50, 0.8);
  border-color: rgba(255, 165, 0, 1);
  box-shadow: 0 0 25px rgba(255, 165, 0, 0.6);
}


`;

interface TechnologyCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  delay: number;
}

const TechnologyCard: React.FC<TechnologyCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  color, 
  delay 
}) => {
  return (
    <div 
      className="technology-card relative group"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Hexagon card with orange border */}
      <div className="hexagon-card transform hover:scale-105 hover:-translate-y-2 transition-all duration-500">
        {/* Hexagon con borde */}
        <div className="hexagon-shape"></div>
        
        {/* Animated orbiting elements */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          <div className={`absolute w-2 h-2 rounded-full ${color === 'orange' ? 'bg-orange-500' : color === 'blue' ? 'bg-blue-500' : 'bg-red-500'} orbit-particle-1`}></div>
          <div className={`absolute w-1 h-1 rounded-full ${color === 'orange' ? 'bg-orange-300' : color === 'blue' ? 'bg-blue-300' : 'bg-red-300'} orbit-particle-2`}></div>
          <div className={`absolute w-1.5 h-1.5 rounded-full ${color === 'orange' ? 'bg-yellow-400' : color === 'blue' ? 'bg-cyan-400' : 'bg-pink-400'} orbit-particle-3`}></div>
        </div>
          
          {/* Card content container */}
          <div className="relative z-10 flex flex-col items-center px-4 pt-10">
            {/* Card header with icon */}
            <div className={`w-24 h-24 mb-6 flex items-center justify-center rounded-full 
              ${color === 'orange' ? 'bg-gradient-to-br from-orange-500/40 to-yellow-500/20' : 
                color === 'blue' ? 'bg-gradient-to-br from-blue-500/40 to-cyan-500/20' : 
                'bg-gradient-to-br from-red-500/40 to-pink-500/20'}
              transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6
              ${color === 'orange' ? 'shadow-[0_0_15px_rgba(255,165,0,0.4)]' : 
                color === 'blue' ? 'shadow-[0_0_15px_rgba(0,122,255,0.4)]' : 
                'shadow-[0_0_15px_rgba(255,59,48,0.4)]'}
              group-hover:${color === 'orange' ? 'shadow-[0_0_25px_rgba(255,165,0,0.6)]' : 
                color === 'blue' ? 'shadow-[0_0_25px_rgba(0,122,255,0.6)]' : 
                'shadow-[0_0_25px_rgba(255,59,48,0.6)]'}
            `}>
              <Icon className={`w-12 h-12 
                ${color === 'orange' ? 'text-orange-300' : 
                  color === 'blue' ? 'text-blue-300' : 
                  'text-red-300'} 
                group-hover:${color === 'orange' ? 'text-yellow-200' : 
                  color === 'blue' ? 'text-cyan-200' : 
                  'text-pink-200'} 
                transition-colors duration-500`} />
            </div>
            
            {/* Title with gradient text effect */}
            <h3 className={`text-2xl font-bold mb-4 text-center
                ${color === 'orange' ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300' : 
                  color === 'blue' ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300' : 
                  'text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-300'}`}>
                {title}
            </h3>
            
            {/* Description */}
            <p className="text-white/80 text-center text-sm md:text-base group-hover:text-white transition-colors duration-500 max-w-[280px]">
                {description}
            </p>
          </div>
        </div>
      </div>
  );
};

const TechnologyCards: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Technologies data
  const technologies = [
    {
      title: "SIEM",
      description: "Centraliza y analiza los eventos de seguridad de toda tu infraestructura para detectar amenazas en tiempo real.",
      icon: Search,
      color: "orange",
      delay: 100
    },
    {
      title: "SOAR",
      description: "Automatiza la respuesta ante incidentes y acelera la mitigación con flujos inteligentes y eficientes.",
      icon: Cog,
      color: "blue",
      delay: 200
    },
    {
      title: "EDR",
      description: "Protege tus dispositivos críticos con detección continua, aislamiento remoto y acciones de contención.",
      icon: Shield,
      color: "red",
      delay: 300
    }
  ];
  
  useEffect(() => {
    // Solo mantener animaciones de partículas y estilos, eliminar IntersectionObserver y lógica de aparición
    const setupOrbitAnimations = () => {
      const style = document.createElement('style');
      style.textContent = `
        ${hexagonStyles}
        @keyframes orbit1 {
          0% { transform: translateX(-50%) translateY(-50%) rotate(0deg) translateX(50px) rotate(0deg); }
          100% { transform: translateX(-50%) translateY(-50%) rotate(360deg) translateX(50px) rotate(-360deg); }
        }
        @keyframes orbit2 {
          0% { transform: translateX(-50%) translateY(-50%) rotate(0deg) translateX(35px) rotate(0deg); }
          100% { transform: translateX(-50%) translateY(-50%) rotate(-360deg) translateX(35px) rotate(360deg); }
        }
        @keyframes orbit3 {
          0% { transform: translateX(-50%) translateY(-50%) rotate(0deg) translateX(25px) rotate(0deg); }
          100% { transform: translateX(-50%) translateY(-50%) rotate(360deg) translateX(25px) rotate(-360deg); }
        }
        .orbit-particle-1 {
          top: 50%;
          left: 50%;
          transform-origin: center;
          animation: orbit1 8s linear infinite;
        }
        .orbit-particle-2 {
          top: 50%;
          left: 50%;
          transform-origin: center;
          animation: orbit2 6s linear infinite;
        }
        .orbit-particle-3 {
          top: 50%;
          left: 50%;
          transform-origin: center;
          animation: orbit3 10s linear infinite;
        }
        @keyframes borderGlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `;
      document.head.appendChild(style);
      return () => {
        document.head.removeChild(style);
      };
    };
    const cleanupOrbit = setupOrbitAnimations();
    return () => {
      cleanupOrbit();
    };
  }, []);
  
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-blue-900/5 to-black/0"></div>
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 pointer-events-none">
          {[...Array(12)].map((_, colIndex) => (
            [...Array(6)].map((_, rowIndex) => (
              <div 
                key={`${colIndex}-${rowIndex}`} 
                className="border border-blue-500/5"
              ></div>
            ))
          ))}
        </div>
        
        {/* Espacio sin gradiente en la base */}
      </div>
      
      {/* Main content */}
      <div ref={sectionRef} className="technology-cards-section container mx-auto px-4 relative z-10 max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-16">
          {/* Decorador superior - efecto hexagonal cyber */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-transparent">
                <div className="absolute w-full h-full border border-blue-400/40 rotate-45 animate-pulse"></div>
                <div className="absolute inset-1 border border-orange-400/30 rotate-45"></div>
                <div className="absolute inset-[5px] w-1 h-1 bg-blue-400/70 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <h2 className="text-5xl md:text-6xl font-extrabold relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-blue-400 to-orange-400">
                SparkProtect
              </span>
              {/* Línea inferior con efecto pulsante */}
              <div className="absolute -bottom-3 left-0 right-0 flex justify-center"> 
                <div className="relative w-full">
                  <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/80 to-transparent"></div>
                  <div className="absolute left-1/2 -bottom-1 transform -translate-x-1/2 w-3 h-3">
                    <div className="absolute w-full h-full rounded-full border border-blue-500/50 animate-ping" style={{animationDuration: '3s'}}></div>
                    <div className="absolute inset-1 rounded-full border border-blue-400/20"></div>
                    <div className="absolute inset-[5px] w-1 h-1 bg-blue-400/80 rounded-full"></div>
                  </div>
                </div>
              </div>
            </h2>
            
            <h3 className="text-2xl md:text-3xl font-semibold text-white/90 mt-6 mb-4">
              El núcleo de nuestra defensa inteligente
            </h3>
            
            <p className="text-white/70 mt-6 max-w-3xl mx-auto">
              La ciberseguridad moderna exige velocidad, visibilidad y respuesta automática.
              SparkProtect combina tres tecnologías clave en una única solución gestionada:
            </p>
          </div>
        </div>
        
        {/* Separador tecnológico antes de las cards */}
        <div className="relative py-6 flex justify-center mb-10">
          <div className="relative">
            {/* Doble línea para efecto de corte tecnológico */}
            <div className="w-36 h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent"></div>
            <div className="w-24 h-[1px] mt-1 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent mx-auto"></div>
            
            {/* Elementos decorativos laterales */}
            <div className="absolute -left-10 top-0 transform -translate-y-1/2 w-6 h-[1px] bg-gradient-to-r from-blue-500/30 to-transparent"></div>
            <div className="absolute -right-10 top-0 transform -translate-y-1/2 w-6 h-[1px] bg-gradient-to-l from-blue-500/30 to-transparent"></div>
            
            {/* Elemento central */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative flex items-center justify-center w-4 h-4">
                <div className="absolute inset-0 border border-blue-400/40 rotate-45"></div>
                <div className="w-1.5 h-1.5 bg-orange-400/90 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting lines background with enhanced cyber style (visible on desktop) */}
          <div className="absolute inset-0 hidden md:block pointer-events-none">
            <svg width="100%" height="100%" className="absolute inset-0">
              {/* Líneas principales con efecto pulsante */}
              <line x1="33%" y1="50%" x2="67%" y2="50%" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1.5" strokeDasharray="5,5" className="animate-pulse" style={{animationDuration: '3s'}} />
              <line x1="33%" y1="30%" x2="67%" y2="30%" stroke="rgba(239, 68, 68, 0.2)" strokeWidth="1" strokeDasharray="5,5" className="animate-pulse" style={{animationDuration: '4s'}} />
              <line x1="33%" y1="70%" x2="67%" y2="70%" stroke="rgba(249, 115, 22, 0.2)" strokeWidth="1" strokeDasharray="5,5" className="animate-pulse" style={{animationDuration: '4.5s'}} />
              
              {/* Nodos de conexión con efecto pulsante */}
              <circle cx="33%" cy="50%" r="3" fill="rgba(59, 130, 246, 0.2)" className="animate-ping" style={{animationDuration: '3s'}} />
              <circle cx="33%" cy="50%" r="2" fill="rgba(59, 130, 246, 0.6)" />
              <circle cx="67%" cy="50%" r="3" fill="rgba(59, 130, 246, 0.2)" className="animate-ping" style={{animationDuration: '3s'}} />
              <circle cx="67%" cy="50%" r="2" fill="rgba(59, 130, 246, 0.6)" />
              
              {/* Nodos secundarios */}
              <circle cx="33%" cy="30%" r="1.5" fill="rgba(239, 68, 68, 0.5)" />
              <circle cx="67%" cy="30%" r="1.5" fill="rgba(239, 68, 68, 0.5)" />
              <circle cx="33%" cy="70%" r="1.5" fill="rgba(249, 115, 22, 0.5)" />
              <circle cx="67%" cy="70%" r="1.5" fill="rgba(249, 115, 22, 0.5)" />
              
              {/* Líneas adicionales para efecto de red */}
              <line x1="33%" y1="30%" x2="33%" y2="50%" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="67%" y1="30%" x2="67%" y2="50%" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="33%" y1="50%" x2="33%" y2="70%" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="67%" y1="50%" x2="67%" y2="70%" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="1" strokeDasharray="3,3" />
            </svg>
          </div>
          
          {/* Technology cards */}
          {technologies.map((tech, index) => (
            <TechnologyCard
              key={index}
              title={tech.title}
              description={tech.description}
              icon={tech.icon}
              color={tech.color}
              delay={tech.delay}
            />
          ))}
        </div>
        
        {/* Separador cyber entre cards y texto final */}
        <div className="relative py-12 my-4">
          <div className="flex justify-center">
            {/* Patrón de línea futurista */}
            <div className="relative">
              {/* Líneas centrales */}
              <div className="w-64 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent mt-2 mx-auto"></div>
              
              {/* Divisores en forma de diamante */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                <div className="relative w-5 h-5">
                  <div className="absolute w-full h-full rotate-45 border border-blue-400/40"></div>
                  <div className="absolute inset-1 rotate-45 border border-orange-400/30"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-blue-400/80 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              {/* Líneas diagonales */}
              <div className="absolute -left-14 top-0 w-12 h-px transform -rotate-30 bg-gradient-to-r from-blue-500/20 to-transparent"></div>
              <div className="absolute -right-14 top-0 w-12 h-px transform rotate-30 bg-gradient-to-l from-blue-500/20 to-transparent"></div>
              
              {/* Puntos conectores */}
              <div className="absolute -left-16 top-0 w-1.5 h-1.5 bg-blue-400/50 rounded-full"></div>
              <div className="absolute -right-16 top-0 w-1.5 h-1.5 bg-blue-400/50 rounded-full"></div>
            </div>
          </div>
        </div>
        
        <p className="text-white/100 mt-8 max-w-3xl mx-auto text-center">
          Todo esto gestionado por nuestro equipo de expertos 24/7, desde el NG-NSOC de SparkFound.
        </p>
        
        {/* Separador inferior */}
        <div className="relative py-8 my-4 overflow-hidden">
          <div className="w-full max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-3 h-3">
              <div className="absolute w-full h-full border border-blue-400/30 rounded-full animate-pulse"></div>
              <div className="absolute inset-1 border border-orange-400/20 rounded-full"></div>
            </div>
          </div>
          
          {/* Patrón de puntos para reforzar el corte */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center">
            <div className="flex space-x-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={`dot-${i}`} className="w-1 h-1 bg-blue-400/50 rounded-full" 
                     style={{ opacity: i === 2 ? 0.7 : 0.3 - Math.abs(2-i) * 0.1 }}></div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom decorative elements */}
        <div className="flex justify-center mt-4 space-x-4">
          <div className="w-3 h-3 rounded-full bg-orange-500 opacity-70 animate-pulse"></div>
          <div className="w-3 h-3 rounded-full bg-blue-500 opacity-70 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="w-3 h-3 rounded-full bg-red-500 opacity-70 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
      </div>
    </section>
  );
};

export default TechnologyCards;
