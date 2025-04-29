import React, { useState, useEffect, useCallback, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './navbar.css';

const Navbar: React.FC = memo(() => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const location = useLocation();

  const handleScroll = useCallback(() => {
    const scrollPercent = Math.min(window.scrollY / 200, 1);
    if (Math.abs(scrollPercent - scrollProgress) > 0.01) {
      setScrollProgress(scrollPercent);
    }
  }, [scrollProgress]);
  
  useEffect(() => {
    const throttledScroll = () => {
      window.requestAnimationFrame(handleScroll);
    };
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [handleScroll]);

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const navOpacity = 0.1 + scrollProgress * 0.8;
  const navBlur = Math.floor(scrollProgress * 5);
  const navHeight = 90 - scrollProgress * 20;
  const borderOpacity = scrollProgress * 0.25;
  const logoScale = 1 - scrollProgress * 0.08;
  
  return (
    <nav 
      className="fixed w-full z-50 transition-all duration-200"
      style={{
        backgroundColor: `rgba(8, 12, 36, ${navOpacity})`,
        backdropFilter: `blur(${navBlur}px)`,
        borderBottom: `1px solid rgba(255, 107, 0, ${borderOpacity})`,
        height: `${navHeight}px`,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0 relative group">
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative">
                <img 
                  src="/SPF.png" 
                  alt="SPF Logo" 
                  style={{ transform: `scale(${logoScale})` }}
                  className="h-16 sm:h-18 md:h-20 w-auto transition-all duration-200 group-hover:scale-105 relative z-10" 
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-[#FF6B00]/0 via-[#FF6B00]/20 to-[#0066CC]/10 rounded-full group-hover:opacity-75 opacity-0 transition-opacity duration-200 z-0"></div>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <div className="relative group" onMouseLeave={() => setIsServicesOpen(false)}>
              <button
                className="text-white/80 hover:text-white text-sm font-medium transition-colors flex items-center space-x-1 group focus:outline-none"
                onMouseEnter={() => setIsServicesOpen(true)}
                onClick={() => setIsServicesOpen(prev => !prev)}
              >
                <span>Servicios</span>
                <ChevronDown className="w-4 h-4 group-hover:text-[#FF6B00] transition-colors" />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6B00] group-hover:w-full transition-all duration-300"></span>
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    className="absolute left-0 mt-2 w-56 bg-gray-900/95 backdrop-blur-md border border-gray-800 rounded-md overflow-hidden shadow-lg z-50"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="py-1">
                      {[
                        ['Ciberseguridad', '#servicios-cyber'],
                        ['Consultoría', '#servicios-consultoria'],
                        ['Seguridad en la Nube', '#servicios-cloud'],
                        ['Pentesting', '#servicios-pentesting'],
                      ].map(([name, url]) => (
                        <a
                          href={url}
                          className="block px-4 py-2 text-sm text-gray-200 hover:text-white hover:bg-gray-800/50 flex items-center space-x-2 transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsServicesOpen(false);
                            const element = document.getElementById(url.substring(1));
                            if (element) {
                              setTimeout(() => {
                                element.scrollIntoView({ behavior: 'smooth' });
                              }, 10);
                            }
                          }}
                        >
                          {name}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative group" onMouseLeave={() => setIsAboutOpen(false)}>
              <button
                className="text-white/80 hover:text-white text-sm font-medium transition-colors flex items-center space-x-1 group focus:outline-none"
                onMouseEnter={() => setIsAboutOpen(true)}
                onClick={() => setIsAboutOpen((prev) => !prev)}
              >
                <span>Quiénes Somos</span>
                <ChevronDown className="w-4 h-4 group-hover:text-[#0066CC] transition-colors" />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0066CC] group-hover:w-full transition-all duration-300"></span>
              </button>

              <AnimatePresence>
                {isAboutOpen && (
                  <motion.div
                    className="absolute left-0 mt-2 w-56 bg-gray-900/95 backdrop-blur-md border border-gray-800 rounded-md overflow-hidden shadow-lg z-50"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="py-1">
                      {[
                        ['Nosotros', '#quienes-somos'],
                        ['Misión y Visión', '#mision-vision'],
                        ['Equipo', '#equipo'],
                        ['Alianzas', '#alianzas']
                      ].map(([name, url]) => (
                        <a
                          key={name}
                          href={url}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#0066CC]/10 hover:text-white transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            const element = document.getElementById(url.substring(1));
                            if (element) element.scrollIntoView({ behavior: 'smooth' });
                            setIsAboutOpen(false);
                          }}
                        >
                          {name}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="#tecnologia"
              className="text-white/80 hover:text-white text-sm font-medium transition-colors relative group"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('tecnologia');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Tecnología</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
            </a>

            <a
              href="#contacto"
              className="px-5 py-2 bg-gradient-to-r from-[#FF6B00] to-[#FF8C40] text-white rounded-full shadow-[0_0_10px_rgba(255,107,0,0.4)] hover:shadow-[0_0_15px_rgba(255,107,0,0.6)] hover:scale-[1.02] transition-all duration-200 flex items-center space-x-2 text-sm font-medium"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('contacto');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Shield className="w-4 h-4" />
              <span>Agendar Reunión</span>
            </a>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <a
              href="#contacto"
              className="text-[#FF6B00] border border-[#FF6B00]/30 rounded-full px-3 py-1 text-sm font-medium hover:bg-[#FF6B00]/10 active:scale-95 transition-all"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('contacto');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contacto
            </a>

            <button
              onClick={() => setIsMenuOpen(prev => !prev)}
              className="text-white p-1 focus:outline-none active:scale-90 transition-transform"
              aria-label="Menú"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
        <motion.div 
          className="md:hidden fixed inset-0 z-40 bg-gradient-to-b from-gray-900/98 to-black/98 backdrop-blur-sm"  
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}>
          <div className="absolute top-0 right-0 p-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white p-2 active:scale-90 transition-transform"
              aria-label="Cerrar menú"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center h-full space-y-8 p-6 fade-in-up">
            <div className="w-full max-w-xs">
              <h3 className="text-[#FF6B00] text-sm font-semibold uppercase tracking-wider mb-4">Navegación</h3>
              <div className="flex flex-col space-y-4">
                {[
                  ['Inicio', '#hero'],
                  ['Quiénes Somos', '#quienes-somos'],
                  ['Servicios', '#servicios'],
                  ['Tecnología', '#tecnologia'],
                  ['Alianzas', '#alianzas'],
                ].map(([name, url]) => (
                  <a
                    key={name}
                    href={url}
                    className="text-white text-lg font-medium hover:text-[#FF6B00] hover:translate-x-1 active:scale-95 transition-all flex items-center"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById(url.substring(1));
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                      setIsMenuOpen(false);
                    }}
                  >
                    <ArrowRight className="w-4 h-4 mr-2 text-[#0066CC]" />
                    {name}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="w-full max-w-xs pt-6 border-t border-gray-800">
              <a
                href="#contacto"
                className="w-full py-3 bg-gradient-to-r from-[#FF6B00] to-[#FF8C40] text-white rounded-md shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-2"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('contacto');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
              >
                <Shield className="w-5 h-5" />
                <span>Agendar Reunión</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </nav>
  );
});

export default Navbar;