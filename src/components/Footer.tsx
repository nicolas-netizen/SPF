import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Instagram, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const hoverAnimation = {
  whileHover: { scale: 1.02, transition: { duration: 0.15 } },
  whileTap: { scale: 0.98 }
};

const fadeInUp = {
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-5%" },
  transition: { duration: 0.25 }
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative bg-gray-900 text-gray-300 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF6B00] to-transparent opacity-20"></div>
        <div className="absolute top-0 right-0 w-1/3 h-64 bg-gradient-radial from-[#FF6B00]/5 to-transparent opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-64 bg-gradient-radial from-[#0066CC]/5 to-transparent opacity-30"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <motion.div 
            className="flex flex-col"
            {...fadeInUp}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            <Link to="/" className="inline-block mb-4">
              <img
                src="/SPF.png"
                alt="SPF Logo"
                className="h-16 w-auto"
              />
            </Link>
            <h3 className="text-xl font-bold mb-3 text-white">SparkFound</h3>
            <p className="text-sm text-gray-400 max-w-xs mb-6">
              Protegiendo el futuro digital de las empresas con soluciones de ciberseguridad avanzadas y personalizadas.
            </p>
            <div className="flex space-x-4 mt-auto">
              <motion.a
                href="https://linkedin.com/company/sparkfound"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800/50 p-2.5 rounded-full text-gray-400 hover:text-[#FF6B00] hover:bg-gray-800 transition-colors duration-300"
                aria-label="LinkedIn"
                {...hoverAnimation}
              >
                <Linkedin size={18} />
              </motion.a>
              <motion.a
                href="https://github.com/sparkfound"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800/50 p-2.5 rounded-full text-gray-400 hover:text-[#FF6B00] hover:bg-gray-800 transition-colors duration-300"
                aria-label="GitHub"
                {...hoverAnimation}
              >
                <Github size={18} />
              </motion.a>
              <motion.a
                href="https://instagram.com/sparkfound"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800/50 p-2.5 rounded-full text-gray-400 hover:text-[#FF6B00] hover:bg-gray-800 transition-colors duration-300"
                aria-label="Instagram"
                {...hoverAnimation}
              >
                <Instagram size={18} />
              </motion.a>
            </div>
          </motion.div>
          

          <motion.div
            className="flex flex-col md:items-center"
            {...fadeInUp}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-6 text-white">Navegación</h3>
            <nav className="flex flex-col space-y-3">
              {[
                ['Inicio', '#hero'],
                ['¿Quiénes somos?', '#quienes-somos'],
                ['Alianzas', '#alianzas'],
                ['Servicios', '#servicios'],
                ['Contacto', '#contacto'],
              ].map(([title, url]) => (
                <motion.a
                  key={url}
                  href={url}
                  className="text-sm text-gray-400 hover:text-white flex items-center group transition-colors duration-300"
                  {...hoverAnimation}
                >
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#FF6B00]" />
                  <span>{title}</span>
                </motion.a>
              ))}
            </nav>
          </motion.div>
          

          <motion.div
            className="flex flex-col"
            {...fadeInUp}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <h3 className="text-lg font-semibold mb-6 text-white">Contacto</h3>
            <div className="flex flex-col space-y-4 text-sm">
              <a href="https://maps.google.com/maps?q=Buenos+Aires,+Argentina" target="_blank" rel="noopener noreferrer" className="flex items-start group">
                <MapPin className="w-5 h-5 mr-3 mt-0.5 text-gray-500 group-hover:text-[#FF6B00] transition-colors duration-200" />
                <div>
                  <p className="text-gray-300 group-hover:text-white transition-colors duration-200">Buenos Aires, Argentina</p>
                  <p className="text-gray-500 text-xs mt-1">América del Sur</p>
                </div>
              </a>
              
              <a href="mailto:contacto@sparkfound.com" className="flex items-center group">
                <Mail className="w-5 h-5 mr-3 text-gray-500 group-hover:text-[#FF6B00] transition-colors duration-300" />
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">contacto@sparkfound.com</span>
              </a>
              
              <a href="tel:+51999999999" className="flex items-center group">
                <Phone className="w-5 h-5 mr-3 text-gray-500 group-hover:text-[#FF6B00] transition-colors duration-300" />
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">+51 999 999 999</span>
              </a>
            </div>
          </motion.div>
          
        </div>
        
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent my-6"></div>
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {currentYear} SparkFound. Todos los derechos reservados.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="hover:text-gray-300 transition-colors duration-300">Términos y Condiciones</a>
            <a href="#" className="hover:text-gray-300 transition-colors duration-300">Política de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
