import React, { useState, useEffect, useRef } from 'react';

const CompaniesCarousel: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Datos de empresas que confían en SparkFound (duplicados para crear efecto de bucle infinito)
  const companies = [
    { name: 'TechNova', logo: '/logos/technova.svg', description: 'Líder en soluciones de IA' },
    { name: 'GlobalSecure', logo: '/logos/globalsecure.svg', description: 'Multinacional financiera' },
    { name: 'Quantum Systems', logo: '/logos/quantum.svg', description: 'Tecnología cuántica avanzada' },
    { name: 'NexusHealth', logo: '/logos/nexushealth.svg', description: 'Innovación en salud digital' },
    { name: 'AstroTech', logo: '/logos/astrotech.svg', description: 'Navegación y sistema satelital' },
    { name: 'CyberShield', logo: '/logos/cybershield.svg', description: 'Protección de infraestructura crítica' },
  ];
  
  // Para el efecto de bucle infinito, duplicamos los elementos
  const allCompanies = [...companies, ...companies];
  
  // Efecto para animación al entrar en viewport
  useEffect(() => {
    // Función para manejar la animación de entrada
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fadeElements = document.querySelectorAll('.fade-up');
          fadeElements.forEach((el, index) => {
            setTimeout(() => {
              (el as HTMLElement).style.opacity = '1';
            }, index * 200); // Escalonamos las animaciones
          });
        }
      });
    };

    // Crear observer
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.2,
    });

    // Observar el contenedor principal
    const sectionElement = document.querySelector('section');
    if (sectionElement) observer.observe(sectionElement);

    return () => observer.disconnect();
  }, []);

  // Efecto para el movimiento automático del carrusel sin interacción del usuario
  useEffect(() => {
    // Intervalo para cambiar de tarjeta automáticamente
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % companies.length);
    }, 3000); // Cambiar cada 3 segundos
    
    return () => clearInterval(timer);
  }, [companies.length]);
  
  // Estilos para las animaciones del carrusel
  const carouselStyles = `
    /* El fondo de estrellas ha sido eliminado */
    
    /* Animación de desplazamiento horizontal */
    @keyframes slide {
      0% { transform: translateX(0); }
      100% { transform: translateX(calc(-180px * ${companies.length})); }
    }
    
    /* Animación para las tarjetas */
    .company-card {
      transition: all 0.3s ease;
    }
    
    .company-card:hover {
      transform: scale(1.05);
      border-color: rgba(255, 255, 255, 0.3);
    }
    
    /* Ocultar cualquier scrollbar */
    .carousel-container::-webkit-scrollbar {
      display: none;
    }
    
    /* Eliminar cualquier sombra de fondo */
    .company-card, .carousel-container, section {
      box-shadow: none !important;
    }
    
    /* Animación automática (más lenta para transmitir prestigio) */
    /* Animación automática del carrusel */
    .animate-slide {
      animation: slide 30s linear infinite;
    }

    /* Animación al aparecer en viewport */
    @keyframes fadeUp {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    
    .fade-up {
      animation: fadeUp 0.8s ease-out forwards;
    }
  `;
  
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Estilos para el carrusel */}
      <style dangerouslySetInnerHTML={{ __html: carouselStyles }} />
      
      {/* Título de la sección */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 fade-up" style={{ opacity: 0 }}>
        <span className="relative">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 text-4xl tracking-tight">Empresas que confían en nosotros</span>
          <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/80 to-cyan-400/50 transform scale-x-0 transition-transform group-hover:scale-x-100 mx-auto w-1/2"></span>
        </span>
      </h2>
      
      {/* Contenedor principal */}
      <div className="relative max-w-6xl mx-auto px-4 overflow-hidden fade-up" style={{ opacity: 0, animationDelay: '0.2s', background: 'transparent' }}>

        
        {/* Los efectos de fundido en los bordes han sido eliminados */}
        
        {/* Carrusel de empresas - Sin scroll manual */}
        <div 
          ref={carouselRef}
          className="carousel-container relative py-8 overflow-hidden z-1 bg-transparent"
          style={{ pointerEvents: 'none' }} // Deshabilitar cualquier interacción del usuario
        >
          {/* Loop infinito de tarjetas */}
          <div className="inline-flex animate-slide">
            {allCompanies.map((company, index) => (
              <div 
                key={`${company.name}-${index}`}
                className={`company-card flex-shrink-0 w-44 h-32 mx-3 bg-white/10 backdrop-blur-lg border ${index % companies.length === activeIndex ? 'border-blue-400/40' : 'border-white/10'} 
                          rounded-xl flex flex-col items-center justify-center 
                          transition-all duration-500`}
              >
                {/* Logo de la empresa */}
                <div className="h-14 w-14 mb-2 flex items-center justify-center opacity-90 transition-all duration-300 hover:opacity-100 transform hover:-translate-y-1">
                  {/* Esta estructura permite usar logos SVG o iniciales */}
                  {company.logo.endsWith('.svg') ? (
                    <img 
                      src={company.logo} 
                      alt={company.name} 
                      className="h-10 w-10 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                      onError={(e) => {
                        // Fallback a iniciales si el logo no carga
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement?.classList.add('fallback-active');
                      }} 
                    />
                  ) : (
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-blue-400/30">
                      <span className="text-xl font-bold text-blue-100">{company.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                
                {/* Nombre de la empresa */}
                <p className="text-xs uppercase tracking-widest text-blue-100/90 font-mono transition-colors duration-300 mt-1">
                  {company.name}
                </p>
                
                {/* Descripción en hover con efecto más limpio */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-500 bg-white/15 rounded-xl backdrop-blur-md border border-white/20">
                  <div className="px-4 py-2 transform scale-95 hover:scale-100 transition-all duration-300">
                    <p className="text-xs text-white text-center leading-snug">{company.description}</p>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-300 mx-auto mt-2 opacity-70"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Indicadores simples sin interactividad */}
        <div className="flex justify-center mt-6 space-x-1.5">
          {companies.map((_, idx) => (
            <div
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? 'bg-blue-400 w-3' : 'bg-blue-400/30'}`}
              aria-label={`Indicador ${idx + 1} de ${companies.length}`}
            />
          ))}
        </div>
      </div>
      
      <p className="mt-8 text-center text-cyan-200/60 font-light fade-up" style={{ opacity: 0, animationDelay: '0.4s' }}>
        Más de <span className="text-orange-400 font-semibold">200+ empresas</span> confían en SparkFound para su ciberseguridad
      </p>
    </section>
  );
};

export default CompaniesCarousel;
