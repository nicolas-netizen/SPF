import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import SectionSeparator from './SectionSeparator';

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  alternate?: boolean;
  withSeparator?: boolean;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

const Section: React.FC<SectionProps> = ({
  id,
  title,
  subtitle,
  children,
  alternate = false,
  withSeparator = true,
  className = '',
  titleClassName = '',
  subtitleClassName = ''
}) => {
  // Variante de animación para título y subtítulo
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  return (
    <section 
      id={id} 
      className={`relative py-16 ${alternate ? 'bg-gradient-to-b from-cyber-dark-blue/40 to-cyber-dark' : 'bg-cyber-dark'} ${className} overflow-hidden`}
    >
      {/* Efectos de difuminado en los bordes */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/20 to-transparent pointer-events-none opacity-40"></div>
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/20 to-transparent pointer-events-none opacity-40"></div>
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black/20 to-transparent pointer-events-none opacity-30"></div>
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black/20 to-transparent pointer-events-none opacity-30"></div>
      
      {/* Efectos luminosos en las esquinas */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-radial from-blue-500/5 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-radial from-cyan-500/5 to-transparent rounded-full blur-3xl"></div>
      
      {withSeparator && <SectionSeparator type="cyber-grid" color="blue" className="absolute top-0 left-0 w-full" />}
      
      <div className="container mx-auto px-4">
        {title && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 inline-block
              border-b-2 border-neon-cyan pb-2 
              bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent
              ${titleClassName}`}
            >
              {title}
            </h2>
            
            {subtitle && (
              <p className={`text-lg text-white/70 max-w-2xl mx-auto mt-4 ${subtitleClassName}`}>
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        
        {children}
      </div>
    </section>
  );
};

export default Section;
