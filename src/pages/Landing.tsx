import React from 'react';
import Hero from '../components/sections/Hero.tsx';
import Seguridad360 from '../components/sections/Seguridad360';
import TechnologyCards from '../components/sections/TechnologyCards';
import ContactForm from '../components/sections/ContactForm.tsx';

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

const Landing: React.FC = () => {
  
  return (
    <div className="landing-page relative overflow-hidden">
      {/* Estilos CSS mínimos para animaciones básicas */}
      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />
      
      <main>
        {/* Hero Section - Bloque 1 */}
        <Hero />

        {/* Seguridad360 Section - Bloque 2 */}
        <Seguridad360 />

        {/* Technology Cards Section - Bloque 4 */}
        <TechnologyCards />

        {/* Contact Form with Video - Bloque 5 */}
        <ContactForm />
      </main>
    </div>
  );
};

export default Landing;
