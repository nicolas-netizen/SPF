import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionSeparator from '../SectionSeparator';
import { Clock, Globe, Lock, BarChart } from 'lucide-react';
import { section } from 'framer-motion/client';

const About: React.FC = () => {
  // Definimos variantes para animaciones
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };
  
  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  
  // Estilos para animaciones
  const starAnimations = `
    @keyframes twinkle {
      0%, 100% { opacity: 0.2; }
      50% { opacity: 0.8; }
    }
    
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 0 rgba(72, 207, 255, 0); }
      50% { box-shadow: 0 0 12px rgba(72, 207, 255, 0.5); }
    }
    
    .star-particle {
      position: absolute;
      background-color: rgba(255, 255, 255, 0.7);
      border-radius: 50%;
      animation: twinkle 5s infinite, float 15s infinite;
      pointer-events: none;
      z-index: 1;
    }
    
    .animate-glow {
      animation: pulseGlow 2s infinite;
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
      
      {/* Elementos gráficos flotantes de ciberseguridad */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-10">
        <div className="absolute top-20 left-[10%] w-24 h-24 rounded-full border border-blue-400 animate-pulse opacity-30"></div>
        <div className="absolute top-[30%] right-[15%] w-32 h-32 rounded-full border border-cyan-300 animate-pulse opacity-20" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-[20%] left-[20%] w-20 h-20 rounded-full border border-yellow-400 animate-pulse opacity-25" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-[60%] right-[25%] w-16 h-16 rounded-full border-2 border-orange-400 animate-pulse opacity-20" style={{animationDelay: '1.5s'}}></div>
        
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
      </div>
  
      {/* Separador superior sutil */}
      <SectionSeparator type="wave" className="-mt-32" />
  
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Título principal */}
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-6 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">¿Quiénes somos?</span>
        </motion.h2>
        
        {/* Descripción principal */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <p className="text-white/80 text-lg mb-4">
            Somos expertos en <span className="text-cyan-400 font-medium">cibervigilancia</span> y ofrecemos soluciones personalizadas para proteger tu empresa.
          </p>
          <p className="text-white/70 text-lg">
            Nuestra modalidad como servicio te brinda una protección continua y eficiente.
          </p>
        </motion.div>

        {/* Subtítulo - Por qué elegirnos */}
        <motion.h3
          className="text-3xl md:text-4xl font-bold mb-10 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span className="bg-gradient-to-r from-orange-400 to-red-300 bg-clip-text text-transparent">¿Por qué elegir Sparkfound?</span>
        </motion.h3>
        
        {/* Grid de ventajas */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInScale}
            className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            <div className="text-2xl mb-3 relative text-yellow-400">
              <div className="absolute -inset-1 opacity-20 rounded-full blur-sm bg-gradient-to-r from-yellow-400 to-orange-500"></div>
              <Lock className="w-8 h-8 relative z-10" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Protección integral</h3>
            <p className="text-white/70 text-sm leading-relaxed">Contamos con una malla de servicios de ciberseguridad que se adapta a las necesidades de cada empresa, brindando una defensa completa y personalizada.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInScale}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            <div className="text-2xl mb-3 relative text-blue-400">
              <div className="absolute -inset-1 opacity-20 rounded-full blur-sm bg-gradient-to-r from-blue-400 to-cyan-500"></div>
              <BarChart className="w-8 h-8 relative z-10" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Escalabilidad</h3>
            <p className="text-white/70 text-sm leading-relaxed">Modelo de suscripción flexible que se ajusta al crecimiento de tu negocio sin necesidad de inversiones iniciales.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInScale}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            <div className="text-2xl mb-3 relative text-orange-400">
              <div className="absolute -inset-1 opacity-20 rounded-full blur-sm bg-gradient-to-r from-orange-400 to-red-500"></div>
              <Clock className="w-8 h-8 relative z-10" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Monitoreo constante</h3>
            <p className="text-white/70 text-sm leading-relaxed">Vigilancia activa 24/7 desde nuestro NG-NSOC en Buenos Aires.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInScale}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            <div className="text-2xl mb-3 relative text-cyan-400">
              <div className="absolute -inset-1 opacity-20 rounded-full blur-sm bg-gradient-to-r from-cyan-400 to-blue-500"></div>
              <Globe className="w-8 h-8 relative z-10" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Cobertura global</h3>
            <p className="text-white/70 text-sm leading-relaxed">Presencia en América Latina y expansión en mercados internacionales.</p>
          </motion.div>
        </div>
        {/* Separador inferior */}
        <SectionSeparator type="gradient" className="mt-24" />
      </div> {/* Este cierre es el correcto del div.container */}
    </section>
  );
  
};


export default About;