import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, BarChart, Clock, Lock } from 'lucide-react';
import CyberAtackMap from './CyberAtackMap';

const About: React.FC = () => {
  // Configuración para animaciones compartidas
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  // Estilos para las animaciones de estrellas
  const starAnimations = `
    @keyframes twinkle {
      0%, 100% {
        opacity: 0.2;
        transform: scale(0.8);
      }
      50% {
        opacity: 0.7;
        transform: scale(1.2);
      }
    }
    
    @keyframes floatY {
      0%, 100% {
        transform: translateY(-15px);
      }
      50% {
        transform: translateY(15px);
      }
    }

    @keyframes floatX {
      0%, 100% {
        transform: translateX(-10px);
      }
      50% {
        transform: translateX(10px);
      }
    }

    @keyframes scan {
      0% {
        transform: translateY(-100%);
      }
      100% {
        transform: translateY(100%);
      }
    }

    @keyframes scanX {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }
    
    @keyframes scanY {
      0% {
        transform: translateY(-100%);
      }
      100% {
        transform: translateY(100%);
      }
    }

    @keyframes scrollY {
      0% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(-50%);
      }
    }

    @keyframes dash {
      to {
        stroke-dashoffset: -20;
      }
    }

    .star-particle {
      position: absolute;
      background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
      border-radius: 50%;
      animation: twinkle ease-in-out infinite;
    }
  `;

  useEffect(() => {
    const createStars = () => {
      const container = document.querySelector('#about-section');
      if (!container) return;
      
      // Limpiamos estrellas existentes
      const existingStars = container.querySelectorAll('.star-particle');
      existingStars.forEach(star => star.remove());
      
      // Creamos nuevas estrellas
      for (let i = 0; i < 15; i++) {
        const star = document.createElement('div');
        star.classList.add('star-particle');
        
        // Posición aleatoria
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Tamaño aleatorio
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Animación retrasada aleatoria
        star.style.animationDelay = `${Math.random() * 10}s`;
        star.style.animationDuration = `${Math.random() * 5 + 5}s`;
        
        container.appendChild(star);
      }
    };
    
    createStars();
    
    // Limpieza al desmontar
    return () => {
      const container = document.querySelector('#about-section');
      if (container) {
        const stars = container.querySelectorAll('.star-particle');
        stars.forEach(star => star.remove());
      }
    };
  }, []);

  return (
    <section id="about-section" className="py-32 relative overflow-hidden">
      {/* Estilos para animaciones */}
      <style dangerouslySetInnerHTML={{ __html: starAnimations }} />
  
      {/* Fondo técnico de ciberseguridad */}
      <div className="absolute inset-0 z-0 opacity-5">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" />
            </pattern>
            <pattern id="circuitPattern" width="200" height="200" patternUnits="userSpaceOnUse">
              <path d="M10 10 L50 10 L50 50 L90 50 L90 90 L130 90 L130 130 L170 130 L170 170" fill="none" stroke="white" strokeWidth="1" opacity="0.4" />
              <circle cx="10" cy="10" r="5" fill="white" opacity="0.2" />
              <circle cx="50" cy="50" r="5" fill="white" opacity="0.2" />
              <circle cx="90" cy="90" r="5" fill="white" opacity="0.2" />
              <circle cx="130" cy="130" r="5" fill="white" opacity="0.2" />
              <circle cx="170" cy="170" r="5" fill="white" opacity="0.2" />
            </pattern>
            <pattern id="hexPattern" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
            </pattern>
            <pattern id="networkPattern" width="200" height="200" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="5" fill="white" opacity="0.3" />
              <circle cx="75" cy="75" r="5" fill="white" opacity="0.3" />
              <circle cx="125" cy="25" r="5" fill="white" opacity="0.3" />
              <circle cx="175" cy="75" r="5" fill="white" opacity="0.3" />
              <circle cx="25" cy="125" r="5" fill="white" opacity="0.3" />
              <circle cx="75" cy="175" r="5" fill="white" opacity="0.3" />
              <circle cx="125" cy="175" r="5" fill="white" opacity="0.3" />
              <circle cx="175" cy="125" r="5" fill="white" opacity="0.3" />
              <line x1="25" y1="25" x2="75" y2="75" stroke="white" strokeWidth="1" opacity="0.2" />
              <line x1="125" y1="25" x2="175" y2="75" stroke="white" strokeWidth="1" opacity="0.2" />
              <line x1="25" y1="125" x2="75" y2="175" stroke="white" strokeWidth="1" opacity="0.2" />
              <line x1="125" y1="175" x2="175" y2="125" stroke="white" strokeWidth="1" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <rect width="100%" height="100%" fill="url(#circuitPattern)" opacity="0.2" />
          <rect width="100%" height="100%" fill="url(#hexPattern)" opacity="0.1" />
          <rect width="100%" height="100%" fill="url(#networkPattern)" opacity="0.15" />
        </svg>
      </div>
      
      {/* Elementos gráficos ampliados de ciberseguridad */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-10">
        {/* Círculos pulsantes para representar señales de radar/detección */}
        <div className="absolute top-20 left-[10%] w-24 h-24 rounded-full border border-blue-400 animate-pulse opacity-30"></div>
        <div className="absolute top-[30%] right-[15%] w-32 h-32 rounded-full border border-cyan-300 animate-pulse opacity-20" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-[20%] left-[20%] w-20 h-20 rounded-full border border-yellow-400 animate-pulse opacity-25" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-[60%] right-[25%] w-16 h-16 rounded-full border-2 border-orange-400 animate-pulse opacity-20" style={{animationDelay: '1.5s'}}></div>
        
        {/* Sistema de seguridad simulado - anillos concéntricos con rotación */}
        <div className="absolute top-[40%] left-[30%] opacity-20">
          <div className="relative w-48 h-48">
            <div className="absolute inset-0 border border-blue-400/30 rounded-full animate-spin" style={{animationDuration: '15s'}}></div>
            <div className="absolute inset-4 border border-cyan-400/40 rounded-full animate-spin" style={{animationDuration: '12s', animationDirection: 'reverse'}}></div>
            <div className="absolute inset-8 border border-blue-400/50 rounded-full animate-spin" style={{animationDuration: '20s'}}></div>
            <div className="absolute inset-12 border border-cyan-400/60 rounded-full animate-spin" style={{animationDuration: '10s', animationDirection: 'reverse'}}></div>
            <div className="absolute inset-16 border border-blue-400/70 rounded-full animate-pulse" style={{animationDuration: '4s'}}></div>
          </div>
        </div>
        
        {/* Matriz digital - puntos de datos */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={`data-point-${i}`} 
                 className="absolute bg-blue-400 rounded-full w-1.5 h-1.5 animate-pulse"
                 style={{
                   top: `${Math.random() * 100}%`,
                   left: `${Math.random() * 100}%`,
                   animationDelay: `${Math.random() * 5}s`,
                   animationDuration: `${Math.random() * 3 + 2}s`
                 }}>
            </div>
          ))}
        </div>
        
        {/* Iconos estilizados de ciberseguridad */}
        <div className="absolute top-[15%] right-[10%] opacity-15">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        <div className="absolute top-[70%] left-[5%] opacity-15">
          <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        </div>
        
        {/* Nuevos iconos de ciberseguridad */}
        <div className="absolute bottom-[10%] right-[8%] opacity-15">
          <svg width="65" height="65" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="4"></circle>
            <line x1="21.17" y1="8" x2="12" y2="8"></line>
            <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
            <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
          </svg>
        </div>
        <div className="absolute top-[45%] left-[15%] opacity-15">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
        </div>
        
        {/* Código binario animado */}
        <div className="absolute bottom-[30%] right-[20%] font-mono text-xs opacity-20 whitespace-nowrap overflow-hidden" style={{width: '150px'}}>
          <div className="animate-marquee" style={{animationDuration: '15s'}}>
            10101010100101010101001010100101010100101
          </div>
        </div>
        <div className="absolute top-[25%] left-[25%] font-mono text-xs opacity-20 whitespace-nowrap overflow-hidden" style={{width: '120px'}}>
          <div className="animate-marquee" style={{animationDuration: '12s'}}>
            01001001110010101010110101001010101
          </div>
        </div>
      </div>
  
      {/* NUEVO SEPARADOR DISTINTIVO */}
      <div className="w-full bg-gradient-to-b from-transparent to-[#1e0b4c] h-24 -mt-24 relative overflow-hidden">
        {/* Elementos de seguridad en el separador */}
        <div className="absolute inset-0 flex justify-center items-end pb-4">
          <div className="relative">
            <div className="w-3 h-3 bg-indigo-400/50 rounded-full mb-2 mx-auto animate-pulse"></div>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent"></div>
          </div>
        </div>
      </div>
      
      {/* FONDO COMPLETAMENTE DISTINTIVO PARA ¿QUIÉNES SOMOS? */}
      <div className="bg-[#1e0b4c] py-20 relative overflow-hidden">      
        {/* Efectos especiales de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[#1e0b4c] bg-[length:30px_30px]"></div>
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-indigo-600/30 to-transparent blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-gradient-radial from-violet-500/20 to-transparent blur-3xl"></div>
          
          {/* Patrón grid */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="w-full h-full border border-indigo-500/10" style={{backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "20px 20px"}}></div>
          </div>
        </div>
        
        {/* Código binario animado */}
        <div className="absolute left-0 top-0 h-full w-16 overflow-hidden opacity-20">
          <div className="h-[200%] font-mono text-[10px] leading-tight text-white/70 animate-scrollY" style={{animationDuration: '30s'}}>
            {Array(40).fill(0).map((_, i) => (
              <div key={`binary-${i}`}>
                {Math.random() > 0.5 ? '1' : '0'}
              </div>
            ))}
          </div>
        </div>
        
        {/* Elementos de ciberseguridad */}
        <div className="absolute right-10 top-10">
          <div className="w-20 h-20 border border-indigo-400/20 rounded-full animate-pulse" style={{animationDuration: '4s'}}></div>
        </div>
        
        <div className="absolute left-10 bottom-10">
          <div className="w-32 h-32 border-2 border-indigo-500/10 rounded-md rotate-12"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-indigo-500/20 rounded-md -rotate-12 animate-pulse" style={{animationDuration: '5s'}}></div>
        </div>
        
        {/* Contenedor del contenido */}
        <div className="container mx-auto px-4 relative z-10">
            {/* Círculos decorativos */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-indigo-400/20 to-transparent opacity-40 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-radial from-blue-400/20 to-transparent opacity-30 blur-3xl"></div>
            
            {/* Elementos de ciberseguridad - Código binario flotando */}
            <div className="absolute inset-0 overflow-hidden opacity-5">
              <div className="animate-scrollY font-mono text-[10px] leading-tight text-white/80" style={{animationDuration: '30s'}}>
                {Array(30).fill(0).map((_, rowIndex) => (
                  <div key={`row-${rowIndex}`} className="flex">
                    {Array(150).fill(0).map((_, colIndex) => (
                      <span key={`cell-${rowIndex}-${colIndex}`} className="mx-px">
                        {Math.random() > 0.5 ? '1' : '0'}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Elementos de cyberseguridad animados */}
            <div className="absolute top-5 right-12">
              <div className="w-20 h-20 border border-indigo-500/30 rounded-full animate-pulse" style={{animationDuration: '4s'}}></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <svg className="w-10 h-10 text-indigo-500/30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
            </div>
                        
            <div className="absolute left-10 bottom-10">
              <div className="w-32 h-32 border-2 border-indigo-500/10 rounded-md rotate-12"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-indigo-500/20 rounded-md -rotate-12 animate-pulse" style={{animationDuration: '5s'}}></div>
            </div>
            
            {/* Líneas de conexión */}
            <div className="absolute inset-0 overflow-hidden">
              <svg width="100%" height="100%">
                <line x1="0" y1="70%" x2="100%" y2="30%" stroke="rgba(147, 197, 253, 0.1)" strokeWidth="1" strokeDasharray="5,5" />
                <line x1="0" y1="30%" x2="100%" y2="80%" stroke="rgba(147, 197, 253, 0.05)" strokeWidth="1" strokeDasharray="5,5" />
              </svg>
            </div>
          </div>
          
          <div className="relative py-20 px-6 sm:px-10 md:px-16 z-10">
          {/* Título con diseño moderno */}
          <motion.div
            className="relative z-10 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex flex-col items-center">
              <div className="bg-white/5 backdrop-blur-md px-6 py-2 rounded-full border border-indigo-500/20 shadow-lg shadow-indigo-500/5 mb-3 inline-block">
                <h2 className="text-sm uppercase tracking-[0.2em] font-medium text-indigo-300">Innovación en Seguridad</h2>
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-center mb-6 relative">
                <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-indigo-500 bg-clip-text text-transparent inline-block">¿Quiénes somos?</span>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full bg-gradient-to-r from-indigo-500 to-violet-400"></div>
              </h2>
              <p className="text-white/70 text-center max-w-3xl mx-auto mb-8 text-lg">
                Una empresa líder en ciberseguridad comprometida con la protección digital de negocios y organizaciones mediante soluciones avanzadas y personalizadas.
              </p>
            </div>
          </motion.div>
          
          {/* Diseño alternado en columnas */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 xl:gap-16 relative z-10">
            {/* Columna izquierda - Imagen/gráfico */}
            <motion.div 
              className="order-2 md:order-1 flex items-center justify-center"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative flex justify-center items-center w-full mx-auto mb-8">
                {/* Efectos de iluminación sutiles que no interfieren con la visibilidad */}
                <div className="absolute inset-0 -left-4 -right-4 -top-4 -bottom-4 bg-gradient-to-br from-blue-600/5 to-orange-500/5 rounded-xl blur-md"></div>
                <div className="relative z-0 w-full flex justify-center items-center">
                  <CyberAtackMap />
                </div>
              </div>
            </motion.div>
            
            {/* Columna derecha - Texto "Somos expertos..." */}
            <motion.div
              className="order-1 md:order-2 flex items-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 px-8 py-10 shadow-xl w-full transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Expertos en seguridad</h3>
                <p className="text-white/90 text-lg mb-4 leading-relaxed">
                  Somos expertos en 
                  <span className="relative inline-block group">
                    <span className="text-cyan-400 font-semibold">cibervigilancia</span>
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400/0 via-cyan-400/50 to-cyan-400/0"></div>
                    {/* Tooltip de ciberseguridad */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-full h-full rounded-full bg-cyan-400/20 animate-ping"></div>
                    </div>
                  </span> y ofrecemos 
                  <span className="relative inline-block bg-gradient-to-r from-blue-400/10 to-cyan-400/10 px-1 rounded">
                    soluciones personalizadas
                    <svg className="inline-block ml-1 w-4 h-4 text-blue-400 animate-pulse" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </span> para proteger tu empresa.
                </p>
              </div>
            </motion.div>
            
            {/* Segunda fila, columna izquierda - Texto "Nuestra modalidad..." */}
            <motion.div 
              className="order-3 flex items-center"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 px-8 py-10 shadow-xl w-full transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">Protección continua</h3>
                <p className="text-white/90 text-lg leading-relaxed">
                  Nuestra modalidad como servicio te brinda una <span className="text-blue-300 font-semibold relative inline-block">protección continua
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-300/0 via-blue-300/50 to-blue-300/0"></div></span> y eficiente.
                </p>
              </div>
            </motion.div>
            
            {/* Segunda fila, columna derecha - Elemento visual */}
            <motion.div
              className="order-4 flex items-center justify-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative w-full max-w-sm aspect-video">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-blue-400/10 rounded-2xl blur-[20px]"></div>
                <div className="absolute inset-0 border border-blue-400/20 rounded-2xl flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 flex flex-wrap gap-3 p-4 opacity-40">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div key={i} className="w-3 h-3 bg-blue-400/30 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                    ))}
                  </div>
                  <div className="relative z-10 bg-white/5 backdrop-blur-lg px-5 py-3 rounded-xl border border-white/10 shadow-lg">
                    <p className="text-cyan-300 font-medium text-center text-sm">Seguridad como servicio</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Sección Por qué elegir Sparkfound - Mejorada */}
        <div className="relative mb-20 mt-10">
          {/* Efectos de fondo cibernéticos */}
          <div className="absolute inset-0 -z-10 opacity-10">
            <div className="absolute top-[10%] left-[15%] w-40 h-40 border border-orange-400/30 rounded-md rotate-45 animate-pulse" 
                 style={{animationDuration: '10s'}}></div>
            <div className="absolute bottom-[20%] right-[10%] w-32 h-32 border border-cyan-400/30 rounded-md rotate-12 animate-pulse" 
                 style={{animationDuration: '8s'}}></div>
            
            {/* Elementos de conexión cibernética */}
            <div className="absolute w-full h-full pointer-events-none">
              <svg width="100%" height="100%" className="opacity-20">
                <defs>
                  <linearGradient id="cyberGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <path d="M50,50 L150,150 L250,100 L350,200" stroke="url(#cyberGradient)" strokeWidth="1" fill="none" />
                <path d="M100,200 L200,250 L300,150 L400,300" stroke="url(#cyberGradient)" strokeWidth="1" fill="none" />
                <circle cx="50" cy="50" r="5" fill="#f97316" opacity="0.3" className="animate-pulse" />
                <circle cx="150" cy="150" r="5" fill="#f97316" opacity="0.3" className="animate-pulse" />
                <circle cx="250" cy="100" r="5" fill="#06b6d4" opacity="0.3" className="animate-pulse" />
                <circle cx="350" cy="200" r="5" fill="#06b6d4" opacity="0.3" className="animate-pulse" />
                <circle cx="100" cy="200" r="5" fill="#f97316" opacity="0.3" className="animate-pulse" />
                <circle cx="200" cy="250" r="5" fill="#f97316" opacity="0.3" className="animate-pulse" />
                <circle cx="300" cy="150" r="5" fill="#06b6d4" opacity="0.3" className="animate-pulse" />
                <circle cx="400" cy="300" r="5" fill="#06b6d4" opacity="0.3" className="animate-pulse" />
              </svg>
            </div>
          </div>

          {/* Título con efecto futurista */}
          <motion.div 
            className="relative z-10 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex flex-col items-center">
              <div className="w-full max-w-md relative">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-600/10 to-red-500/10 blur-xl opacity-80"></div>
                <h3 className="relative z-10 text-3xl md:text-5xl font-bold text-center py-4">
                  <div className="relative inline-block">
                    <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-red-400 bg-clip-text text-transparent">¿Por qué elegir Sparkfound?</span>
                    <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500/0 via-orange-500/80 to-orange-500/0"></div>
                    
                    {/* Efecto de radar ciberseguridad */}
                    <div className="absolute -top-6 -right-6 w-12 h-12">
                      <div className="absolute inset-0 border-2 border-orange-400/20 rounded-full animate-ping opacity-30"></div>
                      <div className="absolute inset-2 border border-orange-400/40 rounded-full"></div>
                      <div className="absolute inset-4 bg-orange-400/20 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </h3>
              </div>
            </div>
          </motion.div>
          
          {/* Grid de ventajas con efectos mejorados y elementos cyber */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10 mb-12">
            {/* Protección integral */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group"
            >
              {/* Fondo de código binario animado */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                <div className="absolute inset-0 font-mono text-[8px] text-yellow-400 overflow-hidden p-4 leading-tight">
                  <div className="animate-scrollY" style={{animationDuration: '20s'}}>
                    01001110 01000101 01010100 01010111 01001111 01010010 01001011<br/>
                    01010011 01000101 01000011 01010101 01010010 01001001 01010100<br/>
                    01011001 00100000 01010000 01010010 01001111 01010100 01000101<br/>
                    01000011 01010100 01001001 01001111 01001110 00100000 01000110<br/>
                    01001001 01010010 01000101 01010111 01000001 01001100 01001100<br/>
                    01001100 01001111 01000011 01001011 01000101 01000100 00101010<br/>
                    01010011 01000101 01000011 01010101 01010010 01000101 01000100<br/>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/10 to-orange-600/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 group-hover:border-yellow-400/30 shadow-lg transition-all duration-500">
                <div className="text-2xl mb-6 relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                  
                  {/* Icono con efecto de escudo */}
                  <div className="relative">
                    <div className="absolute inset-0 rounded-xl border border-yellow-400/30 animate-ping opacity-40" style={{animationDuration: '3s'}}></div>
                    <div className="bg-yellow-400/10 p-3 rounded-xl relative group-hover:scale-110 transition-transform duration-500 overflow-hidden">
                      {/* Efecto de escaneo horizontal */}
                      <div className="absolute h-1 w-full bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent top-0 -left-full animate-scanX" style={{animationDuration: '1.5s', animationIterationCount: 'infinite'}}></div>
                      
                      <Lock className="w-8 h-8 text-yellow-400 relative z-10 group-hover:text-yellow-300 transition-colors duration-500" />
                      <div className="absolute inset-0 bg-yellow-400/5 rounded-lg animate-pulse"></div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-white font-bold text-xl mb-3 group-hover:text-yellow-300 transition-colors duration-300 flex items-center">
                    Protección integral
                    <div className="ml-2 w-5 h-5 relative opacity-70">
                      <div className="absolute inset-0 rounded-full border border-yellow-400/40 animate-ping" style={{animationDuration: '4s'}}></div>
                      <div className="absolute inset-1 rounded-full border border-yellow-400/60"></div>
                    </div>
                  </h3>
                  <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300 text-sm leading-relaxed">
                    Contamos con una malla de servicios de <span className="text-yellow-400/90 group-hover:text-yellow-400">ciberseguridad</span> que se adapta a las necesidades de cada empresa, brindando una <span className="border-b border-dashed border-yellow-400/30 group-hover:border-yellow-400/60">defensa completa</span> y personalizada.
                  </p>
                </div>
                
                {/* Elementos decorativos de ciberdefensa */}
                <div className="absolute -top-2 -right-2 w-8 h-8 opacity-30 group-hover:opacity-80 transition-opacity duration-500">
                  <div className="absolute inset-0 border border-yellow-400/30 rounded-md rotate-45"></div>
                  <div className="absolute inset-1 border border-yellow-400/20 rounded-md rotate-45"></div>
                </div>
                
                {/* Efecto de seguridad en el borde */}
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-yellow-600/0 via-yellow-400/50 to-yellow-600/0 group-hover:opacity-80 opacity-0 transition-opacity duration-500"></div>
                
                {/* Indicador de seguridad digital */}
                <div className="absolute right-3 bottom-3 flex items-center space-x-1 text-[10px] text-yellow-400/50 group-hover:text-yellow-400/80 transition-colors duration-300">
                  <span className="font-mono">SEC_LEVEL:</span>
                  <span className="animate-pulse">●●●●</span>
                </div>
              </div>
            </motion.div>

            {/* Escalabilidad */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group"
            >
              {/* Gráfico digital en el fondo */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                <svg width="100%" height="100%" className="text-blue-400/30">
                  <defs>
                    <pattern id="dataGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#dataGrid)" />
                  
                  {/* Gráfico de barras estilizado */}
                  <rect x="20%" y="70%" width="8%" height="15%" fill="currentColor" opacity="0.5" />
                  <rect x="35%" y="55%" width="8%" height="30%" fill="currentColor" opacity="0.6" />
                  <rect x="50%" y="40%" width="8%" height="45%" fill="currentColor" opacity="0.7" />
                  <rect x="65%" y="25%" width="8%" height="60%" fill="currentColor" opacity="0.8" className="animate-pulse" />
                </svg>
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 group-hover:border-blue-400/30 shadow-lg transition-all duration-500">
                <div className="text-2xl mb-6 relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                  
                  <div className="relative">
                    {/* Red de conexiones alrededor del icono */}
                    <div className="absolute -inset-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0">
                        <line x1="10" y1="40" x2="30" y2="10" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="2,2" className="animate-dash" />
                        <line x1="90" y1="40" x2="70" y2="10" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="2,2" className="animate-dash" style={{animationDelay: '0.3s'}} />
                        <line x1="90" y1="60" x2="70" y2="90" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="2,2" className="animate-dash" style={{animationDelay: '0.6s'}} />
                        <line x1="10" y1="60" x2="30" y2="90" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="2,2" className="animate-dash" style={{animationDelay: '0.9s'}} />
                        <circle cx="10" cy="40" r="2" fill="#38bdf8" />
                        <circle cx="90" cy="40" r="2" fill="#38bdf8" />
                        <circle cx="90" cy="60" r="2" fill="#38bdf8" />
                        <circle cx="10" cy="60" r="2" fill="#38bdf8" />
                      </svg>
                    </div>
                    
                    <div className="bg-blue-400/10 p-3 rounded-xl relative group-hover:scale-110 transition-transform duration-500 overflow-hidden">
                      {/* Efecto de datos fluyendo */}
                      <div className="absolute h-full w-1 bg-gradient-to-b from-transparent via-blue-400/40 to-transparent -top-full animate-scanY right-3" style={{animationDuration: '1.5s', animationIterationCount: 'infinite'}}></div>
                      
                      <BarChart className="w-8 h-8 text-blue-400 relative z-10 group-hover:text-blue-300 transition-colors duration-500" />
                      <div className="absolute inset-0 bg-blue-400/5 rounded-lg animate-pulse"></div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-white font-bold text-xl mb-3 group-hover:text-blue-300 transition-colors duration-300 flex items-center">
                    Escalabilidad
                    <div className="ml-2 flex space-x-0.5">
                      <div className="w-1 h-3 bg-blue-400/30 rounded-sm group-hover:h-2 transition-all duration-300"></div>
                      <div className="w-1 h-4 bg-blue-400/50 rounded-sm group-hover:h-3 transition-all duration-300 delay-100"></div>
                      <div className="w-1 h-5 bg-blue-400/70 rounded-sm group-hover:h-4 transition-all duration-300 delay-200"></div>
                    </div>
                  </h3>
                  <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300 text-sm leading-relaxed">
                    Modelo de suscripción <span className="text-blue-400/90 group-hover:text-blue-400">flexible</span> que se ajusta al <span className="relative inline-block">crecimiento
                      <svg className="absolute -right-4 -top-1 w-3 h-3 text-blue-400/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 15l7-7 7 7"></path>
                      </svg>
                    </span> de tu negocio sin necesidad de inversiones iniciales.
                  </p>
                </div>
                
                {/* Elementos decorativos de estructura de datos */}
                <div className="absolute -top-2 -right-2 w-8 h-8 opacity-30 group-hover:opacity-80 transition-opacity duration-500">
                  <div className="absolute inset-0 border border-blue-400/30 rounded-md rotate-45"></div>
                  <div className="absolute inset-1 border border-blue-400/20 rounded-md rotate-45"></div>
                </div>
                
                {/* Efecto digital en el borde */}
                <div className="absolute inset-y-0 right-0 w-0.5 bg-gradient-to-b from-blue-600/0 via-blue-400/50 to-blue-600/0 group-hover:opacity-80 opacity-0 transition-opacity duration-500"></div>
                
                {/* Gráfico de crecimiento simplificado */}
                <div className="absolute left-3 bottom-3 flex items-end h-4 opacity-40 group-hover:opacity-80 transition-opacity duration-300">
                  <div className="w-1 h-1 bg-blue-400 mx-px rounded-sm"></div>
                  <div className="w-1 h-2 bg-blue-400 mx-px rounded-sm"></div>
                  <div className="w-1 h-3 bg-blue-400 mx-px rounded-sm"></div>
                  <div className="w-1 h-full bg-blue-400 mx-px rounded-sm animate-pulse"></div>
                </div>
              </div>
            </motion.div>

            {/* Monitoreo constante */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group"
            >
              {/* Fondo de monitoreo y alertas */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                <div className="absolute inset-0 bg-black/20">
                  {/* Simulación de pantalla de monitoreo */}
                  <div className="absolute top-[15%] left-[10%] right-[10%] h-[3px] bg-orange-500/40 rounded-full"></div>
                  <div className="absolute top-[25%] left-[10%] right-[40%] h-[3px] bg-orange-400/40 rounded-full"></div>
                  <div className="absolute top-[35%] left-[10%] right-[20%] h-[3px] bg-orange-300/40 rounded-full"></div>
                  <div className="absolute top-[45%] left-[10%] right-[60%] h-[3px] bg-red-400/40 rounded-full animate-pulse"></div>
                  <div className="absolute top-[55%] left-[10%] right-[30%] h-[3px] bg-orange-400/40 rounded-full"></div>
                  <div className="absolute top-[65%] left-[10%] right-[50%] h-[3px] bg-orange-400/40 rounded-full"></div>
                  <div className="absolute top-[75%] left-[10%] right-[45%] h-[3px] bg-orange-300/40 rounded-full"></div>
                </div>
                
                {/* Reloj digital */}
                <div className="absolute top-[10%] right-[10%] font-mono text-[12px] text-orange-400/60 animate-pulse">
                  24:7:365
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-red-600/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 group-hover:border-orange-400/30 shadow-lg transition-all duration-500">
                <div className="text-2xl mb-6 relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                  
                  {/* Reloj con efecto radar */}
                  <div className="relative">
                    {/* Radar de monitoreo girando */}
                    <div className="absolute -inset-3 opacity-0 group-hover:opacity-70 transition-opacity duration-300">
                      <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0 opacity-20">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#f97316" strokeWidth="0.5" strokeDasharray="1,3" className="animate-spin" style={{animationDuration: '10s'}} />
                        <path d="M50,50 L95,50" stroke="#f97316" strokeWidth="1.5" className="animate-spin" style={{animationDuration: '3s', transformOrigin: 'center'}} />
                        <circle cx="50" cy="50" r="5" fill="#f97316" opacity="0.3" className="animate-ping" style={{animationDuration: '4s'}} />
                      </svg>
                    </div>
                    
                    <div className="bg-orange-400/10 p-3 rounded-xl relative group-hover:scale-110 transition-transform duration-500 overflow-hidden">
                      {/* Escaneo circular */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <Clock className="w-8 h-8 text-orange-400 relative z-10 group-hover:text-orange-300 transition-colors duration-500" />
                      <div className="absolute inset-0 bg-orange-400/5 rounded-lg animate-pulse"></div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-white font-bold text-xl mb-3 group-hover:text-orange-300 transition-colors duration-300 flex items-center">
                    Monitoreo constante
                    <div className="ml-2 relative w-8 h-4">
                      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-orange-400/30"></div>
                      <div className="absolute top-1/2 left-0 w-2 h-2 -mt-1 rounded-full bg-orange-400/80 animate-ping" style={{animationDuration: '1.5s'}}></div>
                      <div className="absolute top-1/2 right-1 w-1.5 h-1.5 -mt-0.5 rounded-full bg-orange-400/40"></div>
                    </div>
                  </h3>
                  <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300 text-sm leading-relaxed">
                    Vigilancia activa <span className="text-orange-400/90 group-hover:text-orange-400 font-mono">24/7</span> desde nuestro <span className="relative inline-block">NG-NSOC
                    <span className="absolute -top-2 -right-1 text-[8px] text-orange-300">®</span>
                    </span> en Buenos Aires.
                  </p>
                </div>
                
                {/* Indicador de status */}
                <div className="absolute bottom-3 left-3 flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse mr-1.5"></div>
                  <span className="text-[9px] font-mono text-orange-300/70">MONITORING</span>
                </div>
                
                {/* Elementos decorativos de monitoreo */}
                <div className="absolute -top-2 -right-2 w-8 h-8 opacity-30 group-hover:opacity-80 transition-opacity duration-500">
                  <div className="absolute inset-0 border border-orange-400/30 rounded-md rotate-45"></div>
                  <div className="absolute inset-1 border border-orange-400/20 rounded-md rotate-45"></div>
                </div>
                
                {/* Línea de tiempo de actividad */}
                <div className="absolute right-3 bottom-3 w-12 h-1 bg-orange-900/20 rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-1/3 bg-orange-400/50 animate-pulse"></div>
                </div>
              </div>
            </motion.div>

            {/* Cobertura global */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group"
            >
              {/* Mapa global estilizado en el fondo */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                <svg width="100%" height="100%" viewBox="0 0 200 100" className="text-cyan-400/30">
                  {/* Continentes simplificados */}
                  <path d="M30,40 Q40,38 50,42 Q60,46 70,40 Q75,38 80,40 Q85,42 90,38 L95,45 Q90,50 85,48 Q80,46 75,48 Q70,50 65,52 Q55,56 45,50 Q35,45 30,40 Z" fill="currentColor" opacity="0.2" />
                  <path d="M120,35 Q125,33 130,35 Q135,37 140,35 Q150,30 155,35 Q160,40 155,45 Q150,50 145,48 Q140,46 135,48 Q130,50 125,45 Q118,40 120,35 Z" fill="currentColor" opacity="0.2" />
                  <path d="M70,65 Q75,63 80,65 Q85,67 90,65 Q95,63 100,65 Q105,67 100,70 Q95,73 90,71 Q85,69 80,71 Q75,73 70,65 Z" fill="currentColor" opacity="0.2" />
                  
                  {/* Conexiones globales */}
                  <circle cx="45" cy="45" r="1.5" fill="currentColor" opacity="0.5" />
                  <circle cx="85" cy="45" r="1.5" fill="currentColor" opacity="0.5" />
                  <circle cx="135" cy="40" r="1.5" fill="currentColor" opacity="0.5" />
                  <circle cx="80" cy="67" r="1.5" fill="currentColor" opacity="0.5" />

                  {/* Líneas de conexión */}
                  <line x1="45" y1="45" x2="85" y2="45" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1,1" />
                  <line x1="85" y1="45" x2="135" y2="40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1,1" />
                  <line x1="85" y1="45" x2="80" y2="67" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1,1" />
                  <line x1="45" y1="45" x2="80" y2="67" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1,1" />

                  {/* Centro principal activado */}
                  <circle cx="80" cy="67" r="2.5" fill="currentColor" className="animate-ping" style={{animationDuration: '4s'}} />
                </svg>
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-blue-600/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 group-hover:border-cyan-400/30 shadow-lg transition-all duration-500">
                <div className="text-2xl mb-6 relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                  
                  {/* Globo con efecto de red global */}
                  <div className="relative">
                    {/* Red de conexiones globales */}
                    <div className="absolute -inset-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-spin" style={{animationDuration: '20s'}}></div>
                      <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0">
                        <circle cx="50" cy="50" r="30" fill="none" stroke="#22d3ee" strokeWidth="0.5" strokeDasharray="1,2" />
                        <circle cx="50" cy="50" r="20" fill="none" stroke="#22d3ee" strokeWidth="0.5" strokeDasharray="1,2" className="animate-spin" style={{animationDuration: '15s'}} />
                        
                        {/* Puntos de conexión */}
                        <circle cx="80" cy="50" r="1.5" fill="#22d3ee" />
                        <circle cx="50" cy="20" r="1.5" fill="#22d3ee" />
                        <circle cx="20" cy="50" r="1.5" fill="#22d3ee" />
                        <circle cx="50" cy="80" r="1.5" fill="#22d3ee" />
                        <circle cx="73" cy="27" r="1.5" fill="#22d3ee" />
                        <circle cx="73" cy="73" r="1.5" fill="#22d3ee" />
                        <circle cx="27" cy="73" r="1.5" fill="#22d3ee" />
                        <circle cx="27" cy="27" r="1.5" fill="#22d3ee" />

                        {/* Líneas de datos */}
                        <line x1="50" y1="50" x2="80" y2="50" stroke="#22d3ee" strokeWidth="0.5" className="animate-ping" style={{animationDuration: '3s'}} />
                        <line x1="50" y1="50" x2="50" y2="20" stroke="#22d3ee" strokeWidth="0.5" className="animate-ping" style={{animationDuration: '3.5s', animationDelay: '0.2s'}} />
                        <line x1="50" y1="50" x2="20" y2="50" stroke="#22d3ee" strokeWidth="0.5" className="animate-ping" style={{animationDuration: '3.2s', animationDelay: '0.4s'}} />
                        <line x1="50" y1="50" x2="50" y2="80" stroke="#22d3ee" strokeWidth="0.5" className="animate-ping" style={{animationDuration: '3.7s', animationDelay: '0.6s'}} />
                      </svg>
                    </div>
                    
                    <div className="bg-cyan-400/10 p-3 rounded-xl relative group-hover:scale-110 transition-transform duration-500 overflow-hidden">
                      {/* Efecto de rotación */}
                      <div className="absolute inset-0 rounded-full border border-cyan-400/10 group-hover:border-cyan-400/30 transition-colors duration-500 animate-spin" style={{animationDuration: '8s'}}></div>
                      
                      <Globe className="w-8 h-8 text-cyan-400 relative z-10 group-hover:text-cyan-300 transition-colors duration-500" />
                      <div className="absolute inset-0 bg-cyan-400/5 rounded-lg animate-pulse"></div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-white font-bold text-xl mb-3 group-hover:text-cyan-300 transition-colors duration-300 flex items-center">
                    Cobertura global
                    <div className="ml-2 relative">
                      <span className="inline-block w-3 h-3 bg-cyan-400/20 rounded-full animate-ping absolute" style={{animationDuration: '3s'}}></span>
                      <span className="inline-block w-3 h-3 bg-cyan-400/50 rounded-full relative"></span>
                    </div>
                  </h3>
                  <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300 text-sm leading-relaxed">
                    Presencia en <span className="text-cyan-400/90 group-hover:text-cyan-400">América Latina</span> y expansión en 
                    <span className="relative inline-block group-hover:border-b border-dashed border-cyan-400/40 transition-all duration-300">mercados internacionales
                      <span className="absolute -top-1 -right-1 text-[8px] text-cyan-300">+</span>
                    </span>.
                  </p>
                </div>
                
                {/* Indicador de ubicaciones activas */}
                <div className="absolute bottom-3 left-3 flex items-center">
                  <div className="mr-1 text-[8px] font-mono text-cyan-400/70 flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 mr-0.5 animate-pulse"></div>
                    <span>LATAM</span>
                  </div>
                </div>
                
                {/* Elementos decorativos geográficos */}
                <div className="absolute -top-2 -right-2 w-8 h-8 opacity-30 group-hover:opacity-80 transition-opacity duration-500">
                  <div className="absolute inset-0 border border-cyan-400/30 rounded-md rotate-45"></div>
                  <div className="absolute inset-1 border border-cyan-400/20 rounded-md rotate-45"></div>
                </div>
                
                {/* Coordenadas */}
                <div className="absolute right-3 bottom-3 text-[8px] font-mono text-cyan-400/40 group-hover:text-cyan-400/70 transition-colors duration-300">
                  34.6037°S, 58.3816°W
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Elemento decorativo de ciberseguridad */}
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="relative w-16 h-16 opacity-30">
              <div className="absolute inset-0 border border-orange-400/30 rounded-full animate-ping" style={{animationDuration: '3s'}}></div>
              <div className="absolute inset-2 border border-blue-400/30 rounded-full animate-ping" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
              <div className="absolute inset-4 border border-cyan-400/30 rounded-full animate-ping" style={{animationDuration: '2.5s', animationDelay: '0.5s'}}></div>
              <div className="absolute inset-6 bg-gradient-to-r from-orange-400/30 to-blue-400/30 rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </div> {/* Este cierre es el correcto del div.container */}
    </section>
  );
  
};


export default About;