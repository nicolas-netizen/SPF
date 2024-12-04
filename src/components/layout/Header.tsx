import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <img src="/logo.svg" alt="Logo" className="h-10" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex items-center space-x-8">
              <a href="#servicios" className="text-gray-300 hover:text-white transition-colors">SERVICIOS</a>
              <a href="#industria" className="text-gray-300 hover:text-white transition-colors">INDUSTRIA</a>
              <a href="#contacto" className="text-gray-300 hover:text-white transition-colors">CONTACTO</a>
              <a href="#sobre-nosotros" className="text-gray-300 hover:text-white transition-colors">SOBRE NOSOTROS</a>
            </div>
            <div className="flex items-center space-x-4 pl-8 border-l border-gray-700">
              <a href="/socios" className="text-gray-300 hover:text-white transition-colors">SOCIOS</a>
              <a href="/reunion" className="text-gray-300 hover:text-white transition-colors">COORDINE UNA REUNIÓN</a>
              <a href="/privacidad" className="text-gray-300 hover:text-white transition-colors">POLÍTICA DE PRIVACIDAD</a>
              <a href="/carreras" className="text-gray-300 hover:text-white transition-colors">CARRERAS</a>
              <a href="/login" className="text-gray-300 hover:text-white transition-colors">LOGIN</a>
              <div className="flex items-center space-x-2">
                <a href="/es" className="text-[#FF6B00] hover:text-[#FF8A3D] transition-colors">ES</a>
                <span className="text-gray-600">|</span>
                <a href="/en" className="text-gray-300 hover:text-white transition-colors">EN</a>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-[#0a0a0a]/95 backdrop-blur-sm">
            <nav className="flex flex-col space-y-4 py-4">
              <a href="#servicios" className="text-gray-300 hover:text-white transition-colors px-4">SERVICIOS</a>
              <a href="#industria" className="text-gray-300 hover:text-white transition-colors px-4">INDUSTRIA</a>
              <a href="#contacto" className="text-gray-300 hover:text-white transition-colors px-4">CONTACTO</a>
              <a href="#sobre-nosotros" className="text-gray-300 hover:text-white transition-colors px-4">SOBRE NOSOTROS</a>
              <div className="border-t border-gray-800 pt-4 mt-4">
                <a href="/socios" className="text-gray-300 hover:text-white transition-colors px-4 block py-2">SOCIOS</a>
                <a href="/reunion" className="text-gray-300 hover:text-white transition-colors px-4 block py-2">COORDINE UNA REUNIÓN</a>
                <a href="/privacidad" className="text-gray-300 hover:text-white transition-colors px-4 block py-2">POLÍTICA DE PRIVACIDAD</a>
                <a href="/carreras" className="text-gray-300 hover:text-white transition-colors px-4 block py-2">CARRERAS</a>
                <a href="/login" className="text-gray-300 hover:text-white transition-colors px-4 block py-2">LOGIN</a>
                <div className="flex items-center space-x-2 px-4 py-2">
                  <a href="/es" className="text-[#FF6B00] hover:text-[#FF8A3D] transition-colors">ES</a>
                  <span className="text-gray-600">|</span>
                  <a href="/en" className="text-gray-300 hover:text-white transition-colors">EN</a>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}