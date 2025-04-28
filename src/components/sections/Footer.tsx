import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Columna 1: Logo y descripción */}
          <div>
            <h3 className="text-[#FF6B00] font-medium mb-3">SparkFound</h3>
            <p className="text-gray-400 text-sm mb-3">
              Soluciones de ciberseguridad avanzada para empresas que buscan protección y tranquilidad en el mundo digital.
            </p>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h4 className="text-white text-base font-medium mb-3">Enlaces rápidos</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white text-sm hover:text-[#FF6B00] transition-colors">Inicio</Link></li>
              <li><Link to="/servicios" className="text-white text-sm hover:text-[#FF6B00] transition-colors">Servicios</Link></li>
              <li><Link to="/nosotros" className="text-white text-sm hover:text-[#FF6B00] transition-colors">Nosotros</Link></li>
              <li><Link to="/contacto" className="text-white text-sm hover:text-[#FF6B00] transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Columna 3: Nuestros servicios */}
          <div>
            <h4 className="text-white text-base font-medium mb-3">Nuestros servicios</h4>
            <ul className="space-y-2">
              <li><Link to="/servicios/proteccion" className="text-white text-sm hover:text-[#FF6B00] transition-colors">Protección Avanzada</Link></li>
              <li><Link to="/servicios/cifrado" className="text-white text-sm hover:text-[#FF6B00] transition-colors">Cifrado de Datos</Link></li>
              <li><Link to="/servicios/monitoreo" className="text-white text-sm hover:text-[#FF6B00] transition-colors">Monitoreo 24/7</Link></li>
              <li><Link to="/servicios/analisis" className="text-white text-sm hover:text-[#FF6B00] transition-colors">Análisis de Riesgos</Link></li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h4 className="text-white text-base font-medium mb-3">Contacto</h4>
            <p className="text-sm mb-1"><span className="text-[#FF6B00]">Email:</span> <a href="mailto:info@sparkfound.com" className="text-white hover:text-[#FF6B00] transition-colors">info@sparkfound.com</a></p>
            <p className="text-sm mb-1"><span className="text-[#FF6B00]">Teléfono:</span> <a href="tel:+12345678" className="text-white hover:text-[#FF6B00] transition-colors">+12 345 6789</a></p>
            <p className="text-sm mb-3"><span className="text-[#FF6B00]">Dirección:</span> <span className="text-white">Av. Principal 123, Ciudad</span></p>
            
            <div className="flex space-x-2 mt-2">
              <a href="https://twitter.com" className="text-[#FF6B00] hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://linkedin.com" className="text-[#FF6B00] hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright y enlaces de política */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs">&copy; 2025 SparkFound. Todos los derechos reservados.</p>
          <div className="mt-3 md:mt-0 flex space-x-4 items-center">
            <Link to="/privacidad" className="text-gray-500 text-xs hover:text-[#FF6B00] transition-colors">Política de Privacidad</Link>
            <Link to="/terminos" className="text-gray-500 text-xs hover:text-[#FF6B00] transition-colors">Términos de Servicio</Link>
            <div className="flex items-center space-x-2 ml-4">
              <a href="/es" className="text-[#FF6B00] text-xs hover:text-[#FF8A3D] transition-colors">ES</a>
              <span className="text-gray-600 text-xs">|</span>
              <a href="/en" className="text-gray-500 text-xs hover:text-white transition-colors">EN</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
