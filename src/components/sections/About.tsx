import React, { useEffect, useRef } from 'react';
import { Shield, TrendingUp, Clock, Globe, CheckCircle, Code, Server, Lock } from 'lucide-react';

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

// Datos de nuestros servicios principales
const services = [
  {
    icon: Lock,
    title: "Gestión de Vulnerabilidades",
    highlights: [
      "Escaneo automatizado",
      "Análisis de riesgos",
      "Corrección priorizada"
    ]
  },
  {
    icon: Server,
    title: "Monitoreo de Infraestructura",
    highlights: [
      "Detección de amenazas",
      "Análisis de tráfico",
      "Alerta temprana"
    ]
  },
  {
    icon: Code,
    title: "Seguridad de Aplicaciones",
    highlights: [
      "Pruebas de penetración",
      "Auditoría de código",
      "Protección contra ataques"
    ]
  }
];

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
      <style jsx>{`
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
      `}</style>
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
        {/* Encabezado de la sección */}
        <div className="text-center mb-20 relative animate-item transition-all duration-700 opacity-0 transform translate-y-6">
          {/* Círculos de fondo */}
          <div className="absolute w-64 h-64 bg-gradient-to-r from-[#FF6B00]/10 to-transparent rounded-full blur-3xl -top-20 -left-20 animate-pulse-slow" style={{animationDuration: '8s'}}></div>
          <div className="absolute w-80 h-80 bg-gradient-to-r from-[#0066CC]/10 to-transparent rounded-full blur-3xl -bottom-40 -right-20 animate-pulse-slow" style={{animationDuration: '10s'}}></div>
          
          {/* Título principal con efecto revelado por la estrella */}
          <div className="relative inline-block">
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] bg-clip-text text-transparent relative z-10">
              ¿Quiénes somos?
            </h2>
            <span className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-[#FF6B00] to-[#0066CC] rounded-full transform scale-x-50 opacity-70 animate-pulse-slow"></span>
          </div>
          
          {/* Descripción con mejora visual */}
          <p className="text-xl text-white/80 max-w-3xl mx-auto mt-8 leading-relaxed">
            Somos un equipo de <span className="text-[#FF6B00] font-medium">expertos en ciberseguridad</span> enfocados en proteger 
            infraestructuras críticas con soluciones adaptadas a las necesidades de cada cliente.
          </p>
        </div>
        
        {/* Primera sección: Capacidades con tarjetas modernas */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {capabilities.map((item, index) => (
            <div 
              key={index}
              className="relative group overflow-hidden"
              style={{animationDelay: `${item.delay}ms`}}
            >
              <div className="relative z-10 bg-black/40 backdrop-blur-md rounded-xl p-8 h-full flex flex-col border border-white/5 transition-all duration-500 group-hover:border-[#FF6B00]/30 group-hover:bg-black/50 transform group-hover:-translate-y-2">
                {/* Icono con fondo de gradiente */}
                <div className={`w-16 h-16 rounded-xl mb-5 flex items-center justify-center bg-gradient-to-br ${item.gradient} transform transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110 shadow-lg`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Título y descripción */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#FF6B00] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                  {item.description}
                </p>
                
                {/* Decoración de esquina */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className={`absolute transform rotate-45 translate-x-8 -translate-y-8 w-16 h-16 bg-gradient-to-r ${item.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Segunda sección: Servicios con diseño técnico */}
        <div className="mt-20 relative animate-item transition-all duration-700 opacity-0 transform translate-y-6">
          <h3 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0066CC] to-[#0099FF]">Servicios Especializados</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-10 animate-item transition-all duration-700 opacity-0 transform translate-y-6">
            {services.map((service, index) => (
              <div key={index} className="relative bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-md p-8 rounded-xl border border-white/5 hover:border-[#0066CC]/30 transition-all duration-500 group transform hover:-translate-y-2">
                {/* Elemento decorativo */}
                <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0066CC] to-transparent opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                
                {/* Icono con efecto */}
                <div className="mb-6 relative">
                  <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-[#0066CC]/20 to-[#0099FF]/10 rounded-2xl group-hover:from-[#0066CC]/30 group-hover:to-[#0099FF]/20 transition-colors duration-300">
                    <service.icon className="w-8 h-8 text-[#0099FF] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="absolute inset-0 bg-[#0066CC]/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </div>
                
                {/* Título */}
                <h4 className="text-xl font-bold mb-4 text-white group-hover:text-[#0099FF] transition-colors duration-300">
                  {service.title}
                </h4>
                
                {/* Características */}
                <ul className="space-y-2">
                  {service.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-[#FF6B00] mr-2 flex-shrink-0" />
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-300">{highlight}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Decoración de código binario */}
                <div className="absolute bottom-4 right-4 text-[8px] opacity-20 font-mono text-[#0066CC] group-hover:text-[#FF6B00] transition-colors duration-300">
                  {"101001".split('').map((char, i) => (
                    <span key={i} style={{ animationDelay: `${i * 0.5}s` }} className="animate-pulse">{char}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;