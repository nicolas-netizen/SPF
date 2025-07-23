import React from "react";
import { motion } from "framer-motion";

const logos = [
  "/assets/logos/aws.svg",
  "/assets/logos/cisco.svg",
  "/assets/logos/ibm.svg",
  "/assets/logos/microsoft.svg",
  "/assets/logos/aws.svg",
  "/assets/logos/cisco.svg",
  "/assets/logos/ibm.svg",
  "/assets/logos/microsoft.svg",
];

const positions = [
  { top: '6%', left: '12%' },      // top-left
  { top: '6%', left: '50%', transform: 'translateX(-50%)' }, // top-center
  { top: '6%', right: '12%' },     // top-right
  { top: '40%', left: '2%' },      // mid-left
  { top: '40%', right: '2%' },     // mid-right
  { bottom: '6%', left: '12%' },   // bottom-left
  { bottom: '6%', left: '50%', transform: 'translateX(-50%)' }, // bottom-center
  { bottom: '6%', right: '12%' },  // bottom-right
];

export default function PartnersShowcase() {
  return (
    <section className="relative py-40 flex flex-col items-center justify-center overflow-visible" style={{ minHeight: 600 }}>
      {/* Fondo espacial/partículas animadas */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(24)].map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 0.12 + Math.random() * 0.12, scale: 1 + Math.random() * 0.3 }}
            transition={{ delay: 0.2 + i * 0.05, duration: 2, repeat: Infinity, repeatType: "reverse" }}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: 12 + Math.random() * 18,
              height: 12 + Math.random() * 18,
              background: "radial-gradient(circle, #4f46e5bb 0%, #ff990055 100%)",
              filter: "blur(2.5px)"
            }}
          />
        ))}
      </div>
      {/* Texto principal */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Trabajando juntos para proteger tu nube</h2>
        <p className="text-lg md:text-xl text-blue-100 mb-2">Nos aliamos con los principales partners tecnológicos para ofrecer la cobertura y visibilidad más completa de riesgos en la nube.</p>
        {/* Grid de hexágonos solo en mobile */}
        <div className="block md:hidden grid grid-cols-2 gap-4 mt-8 w-full max-w-xs mx-auto">
          {logos.map((logo, i) => (
            <div
              key={i}
              className="clip-hexagon bg-[#18122B]/80 shadow-lg flex items-center justify-center"
              style={{
                width: '110px',
                height: '110px',
                margin: '0 auto',
                minWidth: '90px',
                minHeight: '90px',
                maxWidth: '120px',
                maxHeight: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#18122B',
                boxShadow: '0 4px 16px rgba(0,0,0,0.18)'
              }}
            >
              <img
                src={logo}
                alt={`Partner logo ${i + 1}`}
                className="object-contain w-12 h-12"
                style={{ maxWidth: '60%', maxHeight: '60%' }}
              />
            </div>
          ))}
        </div>
        {/* Botones u otros elementos debajo */}
        <div className="flex justify-center gap-4 mt-8">
          <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:bg-blue-700 transition">Ver Partners</button>
          <button className="bg-[#18122B] text-white font-bold py-3 px-6 rounded-xl shadow-md hover:bg-blue-900 transition">Ver Integraciones</button>
        </div>
      </div>
      {/* Layout absoluto solo en desktop */}
      <div className="hidden md:block absolute inset-0 pointer-events-none select-none overflow-visible" style={{ zIndex: 2 }}>
        {logos.map((src, i) => (
          <motion.div
            key={src + i}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 0.98, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.7, type: "spring" }}
            style={{ position: 'absolute', ...positions[i % positions.length] }}
            className="w-24 h-24 flex items-center justify-center"
          >
            <motion.div
              animate={{ y: [0, -18, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, repeatType: "reverse", delay: i * 0.18 }}
              className="w-24 h-24 bg-cyber-dark shadow-xl clip-hexagon flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-[0_0_32px_#ff9900]"
            >
              <img src={src} alt="Partner logo" className="w-16 h-16 object-contain" style={{ display: 'block' }} />
            </motion.div>
          </motion.div>
        ))}
      </div>
      <style>{`
        .clip-hexagon {
          clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
        }
      `}</style>
    </section>
  );
} 