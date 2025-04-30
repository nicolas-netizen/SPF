import React, { useState, useEffect, useCallback, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './navbar.css';

const Navbar: React.FC = memo(() => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
                  className="h-20 sm:h-24 md:h-28 w-auto transition-all duration-200 group-hover:scale-105 relative z-10" 
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-[#FF6B00]/0 via-[#FF6B00]/20 to-[#0066CC]/10 rounded-full group-hover:opacity-75 opacity-0 transition-opacity duration-200 z-0"></div>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center">
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