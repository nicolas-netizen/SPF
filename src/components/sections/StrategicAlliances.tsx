import React from 'react';
import { motion } from 'framer-motion';

// Interfaces para los datos de las alianzas
interface AlliancePartner {
  id: number;
  name: string;
  logo: string;
  description: string;
}

// Datos de ejemplo para las alianzas (puedes reemplazarlos con tus alianzas reales)
const alliancePartners: AlliancePartner[] = [
  {
    id: 1,
    name: "Microsoft",
    logo: "/assets/logos/microsoft.svg",
    description: "Partner certificado en soluciones cloud y seguridad"
  },
  {
    id: 2,
    name: "AWS",
    logo: "/assets/logos/aws.svg",
    description: "Soluciones avanzadas de infraestructura en la nube"
  },
  {
    id: 3,
    name: "Cisco",
    logo: "/assets/logos/cisco.svg",
    description: "Tecnología de redes y comunicaciones seguras"
  },
  {
    id: 4,
    name: "IBM",
    logo: "/assets/logos/ibm.svg",
    description: "Inteligencia artificial y sistemas de protección"
  }
];

const StrategicAlliances: React.FC = () => {
  return (
    <section id="alianzas" className="py-16 bg-gradient-to-b from-gray-900 to-cyber-dark relative overflow-hidden">
      {/* Efectos decorativos de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-neon-cyan blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-neon-magenta blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Alianzas <span className="text-[#FF6B00]">Estratégicas</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Trabajamos junto a líderes del sector para ofrecer soluciones de seguridad integrales y de vanguardia 
            que garantizan la protección total de tus activos digitales.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-stretch">
          {alliancePartners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-[#FF6B00]/40 transition-all duration-300 h-full flex flex-col"
            >
              <div className="flex-1 flex flex-col items-center">
                <div className="h-20 w-full flex items-center justify-center mb-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B00]/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img 
                    src={partner.logo} 
                    alt={`Logo de ${partner.name}`} 
                    className="max-h-12 max-w-[120px] object-contain" 
                    // Imagen de respaldo si no se encuentra el logo
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/120x60?text=Logo';
                    }}
                  />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">{partner.name}</h3>
                <p className="text-sm text-gray-400 text-center">{partner.description}</p>
              </div>
              
              <motion.div 
                className="mt-4 pt-4 border-t border-gray-700/50 text-center"
                whileHover={{ scale: 1.03 }}
              >
                <a href="#contacto" className="text-xs text-[#FF6B00] hover:text-[#FF6B00]/80 font-medium inline-flex items-center group">
                  <span>Conocer soluciones</span>
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StrategicAlliances;
