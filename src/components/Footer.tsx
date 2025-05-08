import React from 'react';
import { Github, Linkedin, Instagram } from 'lucide-react';
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
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#FF6B00] to-transparent opacity-20"></div>
        <div className="absolute top-0 right-0 w-1/3 h-32 bg-gradient-radial from-[#FF6B00]/5 to-transparent opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-32 bg-gradient-radial from-[#0066CC]/5 to-transparent opacity-30"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="flex items-center"
            {...fadeInUp}
            transition={{ duration: 0.3 }}
          >
            <img
              src="/SPF.png"
              alt="SPF Logo"
              className="h-20 w-auto"
            />
          </motion.div>

          <motion.div
            className="flex space-x-4 mt-3 md:mt-0"
            {...fadeInUp}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <motion.a
              href="https://linkedin.com/company/sparkfound"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800/50 p-2 rounded-full text-gray-400 hover:text-[#FF6B00] hover:bg-gray-800 transition-colors duration-300"
              aria-label="LinkedIn"
              {...hoverAnimation}
            >
              <Linkedin size={16} />
            </motion.a>
            <motion.a
              href="https://github.com/sparkfound"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800/50 p-2 rounded-full text-gray-400 hover:text-[#FF6B00] hover:bg-gray-800 transition-colors duration-300"
              aria-label="GitHub"
              {...hoverAnimation}
            >
              <Github size={16} />
            </motion.a>
            <motion.a
              href="https://instagram.com/sparkfound"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800/50 p-2 rounded-full text-gray-400 hover:text-[#FF6B00] hover:bg-gray-800 transition-colors duration-300"
              aria-label="Instagram"
              {...hoverAnimation}
            >
              <Instagram size={16} />
            </motion.a>
          </motion.div>
        </div>
        
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent my-3"></div>
        <div className="flex justify-center items-center text-[10px] text-gray-500">
          <p>© {currentYear} SparkFound. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
