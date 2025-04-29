import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionSeparator from '../SectionSeparator';
import { Shield, TrendingUp, Clock, Globe } from 'lucide-react';
import CompaniesCarousel from '../CompaniesCarousel';

const capabilities = [
  {
    title: 'Seguridad Avanzada',
    icon: Shield,
    description: 'Implementamos soluciones de última generación para proteger tus activos críticos contra amenazas emergentes.'
  },
  {
    title: 'Eficiencia Optimizada',
    icon: TrendingUp,
    description: 'Mejoramos tu postura de seguridad sin comprometer el rendimiento o la productividad de tu empresa.'
  },
  {
    title: 'Monitoreo 24/7',
    icon: Clock,
    description: 'Nuestro centro de operaciones de seguridad trabaja ininterrumpidamente para identificar y neutralizar amenazas.'
  },
  {
    title: 'Alcance Global',
    icon: Globe,
    description: 'Ofrecemos protección unificada para organizaciones con presencia internacional y múltiples sucursales.'
  },
  {
    title: 'Cumplimiento Normativo',
    icon: Shield,
    description: 'Aseguramos que tus sistemas cumplan con los requisitos regulatorios más exigentes del sector.'
  },
  {
    title: 'Respuesta a Incidentes',
    icon: Clock,
    description: 'Contamos con protocolos rápidos y efectivos para minimizar el impacto de cualquier brecha de seguridad.'
  }
];

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
      
      {/* Fondo técnico */}
      <div className="absolute inset-0 z-0 opacity-5">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Separador superior sutil */}
      <SectionSeparator type="wave" className="-mt-32" />
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Título principal */}
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">¿Quiénes somos?</span>
        </motion.h2>
        
        {/* Grid de capacidades */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInScale}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              {/* Icono con efecto de resplandor */}
              <div className={`text-2xl mb-3 relative ${index % 2 === 0 ? 'text-orange-400' : 'text-blue-400'}`}>
                <div className="absolute -inset-1 opacity-20 rounded-full blur-sm bg-gradient-to-r from-orange-400 to-blue-500"></div>
                <capability.icon className="w-8 h-8 relative z-10" />
              </div>
              
              {/* Título y descripción */}
              <h3 className="text-white font-bold text-lg mb-2">
                {capability.title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {capability.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        {/* Separador entre secciones */}
        <SectionSeparator type="line" className="my-16" />
        
        {/* Sección: Nuestra misión */}
        <div className="mb-24 relative">
          {/* Efecto de fondo */}
          <div className="absolute -z-10 -left-20 top-20 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/5 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute -z-10 right-0 bottom-0 w-80 h-80 bg-gradient-to-tl from-orange-500/10 to-transparent rounded-full blur-3xl opacity-40"></div>
          
          {/* Elemento decorativo - línea horizontal con nodos */}
          <div className="w-full flex items-center justify-center mb-16">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-blue-400/40"></div>
            <div className="w-3 h-3 rounded-full bg-blue-400/40 mx-2"></div>
            <motion.div 
              className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 mx-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            ></motion.div>
            <div className="w-3 h-3 rounded-full bg-blue-400/40 mx-2"></div>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-blue-400/40"></div>
          </div>
          
          {/* Título estilizado */}
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h3 className="inline-block text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] bg-clip-text text-transparent relative">
              <span className="absolute -top-8 left-0 text-xs text-orange-400/70 font-mono uppercase tracking-widest">Nuestra misión</span>
              Definiendo el futuro de la ciberseguridad
            </h3>
            <div className="w-32 h-1 bg-gradient-to-r from-[#FF6B00] to-[#0066CC] rounded-full mx-auto mt-4 opacity-70"></div>
          </motion.div>
          
          {/* Cards con contenido */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {/* Card 1 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInScale}
              transition={{ delay: 0.1 }}
              className="rounded-2xl bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm border border-white/10 p-8 hover:border-orange-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/5 group"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-500/20 to-orange-500/5 mb-5 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-6 h-6 text-orange-400" />
              </div>
              <h4 className="text-xl font-medium text-white mb-3">Empresa especializada</h4>
              <p className="text-white/70 leading-relaxed">
                Somos expertos en ciberseguridad para proteger infraestructuras críticas y empresas de primer nivel con tecnología de vanguardia.
              </p>
            </motion.div>
            
            {/* Card 2 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInScale}
              transition={{ delay: 0.2 }}
              className="rounded-2xl bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm border border-white/10 p-8 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 group"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-blue-500/5 mb-5 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="text-xl font-medium text-white mb-3">Protección continua</h4>
              <p className="text-white/70 leading-relaxed">
                Vigilancia 24/7 con tecnología avanzada y sistemas de detección temprana para neutralizar amenazas antes de que afecten tu organización.
              </p>
            </motion.div>
            
            {/* Card 3 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInScale}
              transition={{ delay: 0.3 }}
              className="rounded-2xl bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm border border-white/10 p-8 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/5 group"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 mb-5 group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-6 h-6 text-cyan-400" />
              </div>
              <h4 className="text-xl font-medium text-white mb-3">Soluciones a medida</h4>
              <p className="text-white/70 leading-relaxed">
                Estrategias personalizadas para cada tipo de organización, identificando vulnerabilidades específicas y adaptando protocolos a tus necesidades.
              </p>
            </motion.div>
          </div>
          
          {/* Panel de estadísticas */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-16 grid grid-cols-3 gap-4 max-w-3xl mx-auto"
          >
            <div className="text-center p-4 rounded-lg backdrop-blur-sm bg-white/5 border border-white/10">
              <h5 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">100%</h5>
              <p className="text-xs text-white/60 uppercase tracking-wider mt-1">Clientes satisfechos</p>
            </div>
            <div className="text-center p-4 rounded-lg backdrop-blur-sm bg-white/5 border border-white/10">
              <h5 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">24/7</h5>
              <p className="text-xs text-white/60 uppercase tracking-wider mt-1">Monitoreo activo</p>
            </div>
            <div className="text-center p-4 rounded-lg backdrop-blur-sm bg-white/5 border border-white/10">
              <h5 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">+200</h5>
              <p className="text-xs text-white/60 uppercase tracking-wider mt-1">Amenazas bloqueadas</p>
            </div>
          </motion.div>
        </div>
        
        {/* Separador inferior */}
        <SectionSeparator type="gradient" className="mt-24" />
        
        {/* Segunda sección: Empresas que confían en nosotros - Carrusel */}
        <div className="mt-12 text-center">
          {/* Carrusel de empresas con temática espacial */}
          <CompaniesCarousel />
        </div>
      </div>
    </section>
  );
};

export default About;