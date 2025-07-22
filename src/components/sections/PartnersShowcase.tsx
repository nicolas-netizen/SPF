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
    <section className="relative py-40 flex items-center justify-center overflow-visible" style={{ minHeight: 600 }}>
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
      {/* Logos en posiciones fijas simétricas */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-visible" style={{ zIndex: 2 }}>
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
      {/* Contenido central */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 pt-32 pb-28">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
          Trabajando juntos para proteger tu nube
        </h2>
        <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl">
          Nos aliamos con los principales partners tecnológicos para ofrecer la cobertura y visibilidad más completa de riesgos en la nube.
        </p>
        <div className="flex gap-4 justify-center">
          <motion.a
            href="#partners"
            whileHover={{ scale: 1.06, boxShadow: "0 0 24px #6366f1cc" }}
            className="px-7 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all text-lg"
          >
            Ver Partners
          </motion.a>
          <a
            href="#integraciones"
            className="px-7 py-3 rounded-lg bg-[#181a2b] text-blue-100 font-semibold border border-[#23235b] shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all text-lg"
          >
            Ver Integraciones
          </a>
        </div>
      </div>
      <style>{`
        .clip-hexagon {
          clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
        }
      `}</style>
    </section>
  );
} 