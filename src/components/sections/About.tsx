import React, { useEffect, useRef } from 'react';
import { Shield, TrendingUp, Clock, Globe } from 'lucide-react';
import CompaniesCarousel from '../CompaniesCarousel';

// Datos de nuestras capacidades
const capabilities = [
  {
    icon: Shield,
    title: "Protección integral",
    description: "Servicios de ciberseguridad adaptables y personalizados.",
    gradient: "from-[#FF6B00] to-[#FF8A3D]",
    delay: 100
  },
  {
    icon: TrendingUp,
    title: "Escalabilidad",
    description: "Modelo de suscripción flexible, sin inversiones iniciales.",
    gradient: "from-[#0066CC] to-[#0099FF]",
    delay: 200
  },
  {
    icon: Clock,
    title: "Monitoreo constante",
    description: "Vigilancia activa 24/7 desde nuestro centro de operaciones.",
    gradient: "from-[#FF6B00] to-[#FF8A3D]",
    delay: 300
  },
  {
    icon: Globe,
    title: "Cobertura global",
    description: "Operamos en toda América Latina con expansión internacional.",
    gradient: "from-[#0066CC] to-[#0099FF]",
    delay: 400
  }
];

// El contenido de servicios ha sido reemplazado por el carrusel de empresas

const About: React.FC = () => {
  // Referencia para efectos de animación
  const gridRef = useRef<HTMLDivElement>(null);
  
  // Efecto para animación de líneas de conexión
  useEffect(() => {
    if (!gridRef.current) return;
    
    // Creamos estilos para las animaciones
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes grid-pulse {
        0%, 100% { opacity: 0.1; }
        50% { opacity: 0.3; }
      }
      
      @keyframes data-flow {
        0% { stroke-dashoffset: 1000; }
        100% { stroke-dashoffset: 0; }
      }
    `;
    document.head.appendChild(styleSheet);
    
    return () => {
      // Limpieza al desmontar
      document.head.removeChild(styleSheet);
    };
  }, []);
  
  // Efecto para animar elementos al hacer scroll
  useEffect(() => {
    const animateOnScroll = () => {
      const section = document.getElementById('about');
      if (!section) return;
      
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      // Si la sección está visible en el viewport
      if (sectionTop < windowHeight * 0.75) {
        section.classList.add('about-visible');
      }
    };
    
    // Verificar al cargar la página
    animateOnScroll();
    
    // Verificar al hacer scroll
    window.addEventListener('scroll', animateOnScroll);
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);
  
  return (
    <section id="about" className="py-20 relative overflow-hidden transition-all duration-1000 opacity-0">
      {/* Añadimos estilos CSS internos para las animaciones */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Estilo base */
        #about {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 1s ease-out, transform 1s ease-out;
        }
        
        /* Cuando es visible */
        #about.about-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Animación de elementos internos */
        #about.about-visible .animate-item {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Configuración de retrasos */
        #about .animate-item:nth-child(1) { transition-delay: 0.2s; }
        #about .animate-item:nth-child(2) { transition-delay: 0.4s; }
        #about .animate-item:nth-child(3) { transition-delay: 0.6s; }
        #about .animate-item:nth-child(4) { transition-delay: 0.8s; }
      ` }} />
      {/* Fondo técnico */}
      <div className="absolute inset-0 z-0 opacity-5">
        <svg width="100%" height="100%" className="absolute inset-0">
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <rect width="50" height="50" fill="none" stroke="#0066CC" strokeWidth="0.5" opacity="0.3" className="animate-pulse-slow" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Líneas diagonales animadas */}
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="#FF6B00" strokeWidth="0.5" strokeDasharray="5,10" opacity="0.2" className="animate-pulse-slow" style={{animationDuration: '15s'}} />
          <line x1="100%" y1="0" x2="0" y2="100%" stroke="#0066CC" strokeWidth="0.5" strokeDasharray="5,10" opacity="0.2" className="animate-pulse-slow" style={{animationDuration: '20s'}} />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Nueva estructura asimétrica - Grid moderno con columnas asimétricas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-20 relative animate-item transition-all duration-700 opacity-0 transform translate-y-6">
          {/* Columna Izquierda: Texto principal */}
          <div className="relative">
            {/* Círculos de fondo */}
            <div className="absolute w-64 h-64 bg-gradient-to-r from-[#FF6B00]/10 to-transparent rounded-full blur-3xl -top-20 -left-20 animate-pulse-slow" style={{animationDuration: '8s'}}></div>
            
            {/* Título principal con línea debajo */}
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] bg-clip-text text-transparent relative inline-block">
              ¿Quiénes somos?
              <span className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-[#FF6B00] to-[#0066CC] rounded-full transform origin-left opacity-70"></span>
            </h2>
            
            {/* Descripción con estilo mejorado */}
            <p className="text-lg text-white/80 mt-8 leading-relaxed pr-6">
              Somos un equipo de <span className="text-orange-300 font-semibold">expertos en ciberseguridad</span> enfocados en proteger 
              infraestructuras críticas con soluciones personalizadas y escalables. Nuestra misión es garantizar la seguridad digital 
              de nuestros clientes mediante <span className="text-cyan-300 font-semibold">tecnología de vanguardia</span> y metodologías 
              probadas en el campo.
            </p>
          </div>
          
          {/* Columna Derecha: Grid 2x2 de beneficios */}
          <div className="grid grid-cols-2 gap-6" ref={gridRef}>
            {capabilities.map((item, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:bg-white/15 border border-white/5 hover:border-white/20 hover:shadow-xl hover:shadow-[#FF6B00]/5"
              >
                {/* Icono más limpio */}
                <div className={`text-2xl mb-3 relative ${index % 2 === 0 ? 'text-orange-400' : 'text-blue-400'}`}>
                  <div className="absolute -inset-1 opacity-20 rounded-full blur-sm bg-gradient-to-r from-orange-400 to-blue-500"></div>
                  <item.icon className="w-8 h-8 relative z-10" />
                </div>
                
                {/* Título y descripción más compactos */}
                <h3 className="text-white font-bold text-lg mb-1">
                  {item.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Segunda sección: Empresas que confían en nosotros - Carrusel con temática espacial */}
        <div className="mt-20 relative animate-item transition-all duration-700 opacity-0 transform translate-y-6">
          <h3 className="text-3xl font-bold mb-12 text-center">

          </h3>
          
          <div className="animate-item transition-all duration-700 opacity-0 transform translate-y-6">
            {/* Carrusel de empresas con temática espacial */}
            <CompaniesCarousel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;