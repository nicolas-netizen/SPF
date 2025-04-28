import React from 'react';
import Hero from '../components/sections/Hero.tsx';
import About from '../components/sections/About.tsx';
import SparkProtect from '../components/sections/SparkProtect.tsx';
import ContactForm from '../components/sections/ContactForm.tsx';

/**
 * Estilos básicos para animaciones esenciales
 */
const animationStyles = `
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
`;

const Landing: React.FC = () => {
  
  return (
    <div className="landing-page relative overflow-hidden">
      {/* Estilos CSS mínimos para animaciones básicas */}
      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />
      
      <main>
        {/* Hero Section - Bloque 1 */}
        <Hero />

        {/* About Section - Bloque 2 */}
        <About />

        {/* SparkProtect Section - Bloque 3 */}
        <SparkProtect />

        {/* Contact Form with Video - Bloque 4 */}
        <ContactForm />
      </main>
    </div>
  );
};

export default Landing;
