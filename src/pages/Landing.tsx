import React from 'react';
import Hero from '../components/sections/Hero.tsx';
import TechnologyCards from '../components/sections/TechnologyCards';
import ContactForm from '../components/sections/ContactForm.tsx';
import { motion } from 'framer-motion';
import '../styles/landing-animations.css';
import { Helmet } from 'react-helmet';

/**
 * Estilos de animación para la landing page
 */
const animationStyles = `
  /* Animaciones flotantes */
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-float-slow {
    animation: float 8s ease-in-out infinite;
  }

  .animate-float-reverse {
    animation: float-reverse 6s ease-in-out infinite;
  }
  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  
  @keyframes float-reverse {
    0% { transform: translateY(0px); }
    50% { transform: translateY(10px); }
    100% { transform: translateY(0px); }
  }
  
  /* Animaciones de entrada */
  .fade-in-up {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s forwards;
  }
  
  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Delays para crear efecto cascada */
  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-400 { animation-delay: 400ms; }
  .delay-500 { animation-delay: 500ms; }
`;

const heroAnim = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.9, type: 'spring' } }
};
const slideUp = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, type: 'spring' } }
};
const partnersAnim = (dir = 'left') => ({
  hidden: { opacity: 0, x: dir === 'left' ? -80 : 80 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, type: 'spring' } }
});
const fadeStagger = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.18, duration: 0.8, type: 'spring' } }
};
const slideRight = {
  hidden: { opacity: 0, x: 80 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, type: 'spring' } }
};
const blurFade = {
  hidden: { opacity: 0, filter: 'blur(12px)' },
  show: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.9, type: 'spring' } }
};

const Landing: React.FC = () => {
  return (
    <div className="landing-page relative overflow-hidden">
      <Helmet>
        <title>SparkFound | Ciberseguridad Gestionada 24/7</title>
        <meta name="description" content="Protege tu empresa con soluciones de ciberseguridad gestionada, monitoreo 24/7 y tecnología avanzada. Agenda tu reunión con SparkFound." />
        <meta property="og:title" content="SparkFound | Ciberseguridad Gestionada 24/7" />
        <meta property="og:description" content="Protege tu empresa con soluciones de ciberseguridad gestionada, monitoreo 24/7 y tecnología avanzada. Agenda tu reunión con SparkFound." />
        <meta property="og:type" content="website" />
      </Helmet>
      {/* Estilos CSS mínimos para animaciones básicas */}
      <main>
        {/* Hero Section - Bloque 1 */}
        <Hero />
        {/* Separador fuerte antes de Quiénes somos */}
        {/* Eliminado: Separador y sección ¿Quiénes somos? */}
        {/* <div className="w-full flex flex-col items-center my-12">
          <div className="w-2/3 h-1 rounded-full bg-gradient-to-r from-transparent via-orange-400/60 to-transparent blur-sm opacity-80"></div>
        </div>
        <motion.div variants={slideUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
          <Seguridad360 />
        </motion.div> */}
        {/* Separador sutil */}
        <div className="w-full flex flex-col items-center my-8 mt-24">
          <div className="w-1/2 h-1 rounded-full bg-gradient-to-r from-transparent via-blue-900/60 to-transparent blur-sm opacity-70"></div>
        </div>
        {/* Partners Showcase con animación alternada */}
        {/* Eliminado: Latent News */}
        {/* <motion.div variants={fadeStagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
          <LatentNews />
        </motion.div> */}
        {/* Technology Cards Section - slide-in desde la derecha */}
        <TechnologyCards />
        {/* Contact Form with Video - fade-in + blur */}
        <ContactForm />
      </main>
    </div>
  );
};

export default Landing;
