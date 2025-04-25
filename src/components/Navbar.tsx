import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cambiar navbar cuando cambia la ubicación
  useEffect(() => {
    // (manejo de cambios de página)
  }, [location]);





  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/80 backdrop-blur-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/SPF.png" alt="SPF Logo" className="h-16 w-auto transition-transform duration-300 hover:scale-105" />
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <Link
              to="/reunion"
              className="bg-transparent text-white px-4 py-2 rounded-md font-medium hover:text-[#FF6B00] transition-colors duration-300"
            >
              Agenda tu reunión
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Link
              to="/reunion"
              className="bg-transparent text-white px-4 py-2 font-medium hover:text-[#FF6B00] transition-colors duration-300"
            >
              Agenda
            </Link>
          </div>
        </div>

        {/* No mobile menu needed */}
      </div>
    </nav>
  );
};

export default Navbar;
