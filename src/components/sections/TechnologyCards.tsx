import React, { useEffect, useRef } from 'react';
import { Search, Cog, Shield } from 'lucide-react';

interface TechnologyCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
  delay: number;
}

const TechnologyCard: React.FC<TechnologyCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  color, 
  gradient,
  delay 
}) => {
  return (
    <div 
      className="technology-card relative group"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Card background with glassmorphism effect */}
      <div className={`relative overflow-hidden h-full flex flex-col items-center justify-start p-8 rounded-2xl backdrop-blur-xl border transition-all duration-500 
        bg-opacity-5 bg-white
        ${color === 'orange' ? 'border-orange-500/20 hover:border-orange-500/50' : 
          color === 'blue' ? 'border-blue-500/20 hover:border-blue-500/50' : 
          'border-red-500/20 hover:border-red-500/50'}
        transform hover:scale-105 hover:-translate-y-2
        ${color === 'orange' ? 'shadow-[0_5px_15px_rgba(255,165,0,0.15)]' : 
          color === 'blue' ? 'shadow-[0_5px_15px_rgba(0,122,255,0.15)]' : 
          'shadow-[0_5px_15px_rgba(255,59,48,0.15)]'}
        hover:${color === 'orange' ? 'shadow-[0_10px_25px_rgba(255,165,0,0.25)]' : 
          color === 'blue' ? 'shadow-[0_10px_25px_rgba(0,122,255,0.25)]' : 
          'shadow-[0_10px_25px_rgba(255,59,48,0.25)]'}
      `}>
        {/* Background glow */}
        <div className={`absolute inset-0 ${gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
        
        {/* Animated orbiting elements */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          <div className={`absolute w-2 h-2 rounded-full ${color === 'orange' ? 'bg-orange-500' : color === 'blue' ? 'bg-blue-500' : 'bg-red-500'} orbit-particle-1`}></div>
          <div className={`absolute w-1 h-1 rounded-full ${color === 'orange' ? 'bg-orange-300' : color === 'blue' ? 'bg-blue-300' : 'bg-red-300'} orbit-particle-2`}></div>
          <div className={`absolute w-1.5 h-1.5 rounded-full ${color === 'orange' ? 'bg-yellow-400' : color === 'blue' ? 'bg-cyan-400' : 'bg-pink-400'} orbit-particle-3`}></div>
        </div>
        
        {/* Card header with icon */}
        <div className={`w-20 h-20 mb-6 flex items-center justify-center rounded-full 
          ${color === 'orange' ? 'bg-gradient-to-br from-orange-500/20 to-yellow-500/10' : 
            color === 'blue' ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/10' : 
            'bg-gradient-to-br from-red-500/20 to-pink-500/10'}
          transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12
          ${color === 'orange' ? 'shadow-[0_0_15px_rgba(255,165,0,0.2)]' : 
            color === 'blue' ? 'shadow-[0_0_15px_rgba(0,122,255,0.2)]' : 
            'shadow-[0_0_15px_rgba(255,59,48,0.2)]'}
          group-hover:${color === 'orange' ? 'shadow-[0_0_20px_rgba(255,165,0,0.4)]' : 
            color === 'blue' ? 'shadow-[0_0_20px_rgba(0,122,255,0.4)]' : 
            'shadow-[0_0_20px_rgba(255,59,48,0.4)]'}
        `}>
          <Icon className={`w-10 h-10 
            ${color === 'orange' ? 'text-orange-400' : 
              color === 'blue' ? 'text-blue-400' : 
              'text-red-400'} 
            group-hover:${color === 'orange' ? 'text-orange-300' : 
              color === 'blue' ? 'text-blue-300' : 
              'text-red-300'} 
            transition-colors duration-500`} />
        </div>
        
        {/* Title with gradient text effect */}
        <h3 className={`text-2xl font-bold mb-4 
          ${color === 'orange' ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300' : 
            color === 'blue' ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300' : 
            'text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-300'}`}>
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-white/70 text-center group-hover:text-white/90 transition-colors duration-500">
          {description}
        </p>
        
        {/* Bottom decorative element */}
        <div className={`absolute bottom-0 left-0 w-full h-1 
          ${color === 'orange' ? 'bg-gradient-to-r from-transparent via-orange-500 to-transparent' : 
            color === 'blue' ? 'bg-gradient-to-r from-transparent via-blue-500 to-transparent' : 
            'bg-gradient-to-r from-transparent via-red-500 to-transparent'} 
          opacity-30 group-hover:opacity-60 transition-opacity duration-500`}></div>
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
      description: "Sistema de Gestión de Eventos e Información de Seguridad que recopila y analiza registros en tiempo real desde toda la infraestructura.",
      icon: Search,
      color: "orange",
      gradient: "bg-gradient-to-br from-orange-500 to-yellow-500",
      delay: 100
    },
    {
      title: "SOAR",
      description: "Orquestación, Automatización y Respuesta de Seguridad que acelera el tiempo de reacción ante amenazas mediante flujos de trabajo predefinidos.",
      icon: Cog,
      color: "blue",
      gradient: "bg-gradient-to-br from-blue-500 to-cyan-500",
      delay: 200
    },
    {
      title: "EDR",
      description: "Detección y Respuesta de Endpoint que monitorea continuamente todos los dispositivos finales para identificar y neutralizar amenazas avanzadas.",
      icon: Shield,
      color: "red",
      gradient: "bg-gradient-to-br from-red-500 to-pink-500",
      delay: 300
    }
  ];
  
  useEffect(() => {
    // Animation for connecting lines between cards
    const animateConnectingLines = () => {
      const section = sectionRef.current;
      if (!section) return;
      
      const cards = section.querySelectorAll('.technology-card');
      if (cards.length < 2) return;
      
      // Add this to set it up if needed, would be better with canvas for actual connecting lines
      // This is a placeholder for where you would add connecting line animation logic
    };
    
    // Animate particles orbiting around cards
    const setupOrbitAnimations = () => {
      const style = document.createElement('style');
      style.textContent = `
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
        
        .technology-cards-section {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .technology-cards-section.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .technology-card {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .technology-cards-section.visible .technology-card {
          opacity: 1;
          transform: translateY(0);
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    };
    
    // Intersection Observer to trigger animations when section comes into view
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };
    
    const cleanupOrbit = setupOrbitAnimations();
    animateConnectingLines();
    
    // Setup intersection observer
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1
    });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      cleanupOrbit();
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
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
        
        {/* Glowing base light */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-500/10 to-transparent"></div>
      </div>
      
      {/* Main content */}
      <div ref={sectionRef} className="technology-cards-section container mx-auto px-4 relative z-10 max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Tecnologías Avanzadas
            </span>
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></span>
          </h2>
          <p className="text-white/70 mt-6 max-w-3xl mx-auto">
            Nuestra plataforma integra las tecnologías más potentes del mercado para brindarte una protección
            completa y proactiva contra todo tipo de amenazas cibernéticas
          </p>
        </div>
        
        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting lines background (visible on desktop) */}
          <div className="absolute inset-0 hidden md:block pointer-events-none">
            <svg width="100%" height="100%" className="absolute inset-0">
              <line x1="33%" y1="50%" x2="67%" y2="50%" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1" strokeDasharray="5,5" />
              <line x1="33%" y1="30%" x2="67%" y2="30%" stroke="rgba(239, 68, 68, 0.1)" strokeWidth="1" strokeDasharray="5,5" />
              <line x1="33%" y1="70%" x2="67%" y2="70%" stroke="rgba(249, 115, 22, 0.1)" strokeWidth="1" strokeDasharray="5,5" />
              <circle cx="33%" cy="50%" r="2" fill="rgba(59, 130, 246, 0.5)" />
              <circle cx="67%" cy="50%" r="2" fill="rgba(59, 130, 246, 0.5)" />
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
              gradient={tech.gradient}
              delay={tech.delay}
            />
          ))}
        </div>
        
        {/* Bottom decorative elements */}
        <div className="flex justify-center mt-16 space-x-4">
          <div className="w-3 h-3 rounded-full bg-orange-500 opacity-70 animate-pulse"></div>
          <div className="w-3 h-3 rounded-full bg-blue-500 opacity-70 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="w-3 h-3 rounded-full bg-red-500 opacity-70 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyCards;
