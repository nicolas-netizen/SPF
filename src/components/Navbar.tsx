import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NeonButton from './ui/NeonButton';
import { Shield, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Seguimiento de scroll con porcentaje para efectos graduales
  useEffect(() => {
    const handleScroll = () => {
      // Calcular el porcentaje de scroll (suavizado)
      const scrollY = window.scrollY;
      // Utilizamos 500px como límite para los efectos de scroll
      const scrollPercent = Math.min(scrollY / 500, 1); // Máximo 1 (100%) en 500px de scroll
      
      setScrollProgress(scrollPercent);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ajustes para cambios de página
  useEffect(() => {
    // Cerrar menú móvil al cambiar de página
    setIsMenuOpen(false);
    // Scroll al inicio cuando cambia la ubicación
    window.scrollTo(0, 0);
  }, [location]);





  // Cálculos de estilo basados en el scroll
  const navOpacity = 0.1 + scrollProgress * 0.8; // De 0.1 a 0.9
  const navBlur = Math.floor(scrollProgress * 16); // De 0px a 16px
  const navHeight = 96 - scrollProgress * 24; // De 96px a 72px
  const borderOpacity = scrollProgress * 0.3; // De 0 a 0.3
  
  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300`}
      style={{
        backgroundColor: `rgba(8, 12, 36, ${navOpacity})`,
        backdropFilter: `blur(${navBlur}px)`,
        borderBottom: `1px solid rgba(10, 255, 233, ${borderOpacity})`,
        height: `${navHeight}px`,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo con efecto de brillo */}
          <div className="flex-shrink-0 relative group">
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative">
                <img 
                  src="/SPF.png" 
                  alt="SPF Logo" 
                  className="h-16 sm:h-18 md:h-20 w-auto transition-transform duration-500 group-hover:scale-105 relative z-10" 
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan/0 via-neon-cyan/30 to-neon-cyan/0 rounded-full blur-xl group-hover:opacity-75 opacity-0 transition-opacity duration-500 z-0"></div>
              </div>

            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <a 
              href="#about" 
              className="text-white/80 hover:text-white text-sm font-medium transition-colors relative group"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Servicios</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-cyan group-hover:w-full transition-all duration-300"></span>
            </a>
            
            <a 
              href="#features" 
              className="text-white/80 hover:text-white text-sm font-medium transition-colors relative group"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Tecnología</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-lime group-hover:w-full transition-all duration-300"></span>
            </a>
            
            <NeonButton 
              color="cyan" 
              size="sm"
              icon={<Shield className="w-4 h-4" />}
              href="#contacto"
              onClick={() => {
                document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Agendar Reunión
            </NeonButton>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <a
              href="#contacto"
              className="text-neon-cyan border border-neon-cyan/30 rounded-full px-3 py-1 text-sm font-medium hover:bg-neon-cyan/10 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contacto
            </a>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-1"
              aria-label="Menú"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-cyber-dark-blue/95 backdrop-blur-xl">
          <div className="flex flex-col items-center justify-center h-full space-y-8 p-6">
            <a 
              href="#about"
              className="text-white text-xl font-medium hover:text-neon-cyan transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
            >
              Servicios
            </a>
            
            <a 
              href="#features"
              className="text-white text-xl font-medium hover:text-neon-cyan transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
            >
              Tecnología
            </a>
            
            <NeonButton 
              color="cyan" 
              size="md"
              icon={<Shield className="w-5 h-5" />}
              href="#contacto"
              onClick={() => {
                document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
            >
              Agendar Reunión
            </NeonButton>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
