import React from "react";
import { motion } from "framer-motion";
import { FaBullseye, FaEye, FaHeart, FaHandshake } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: (i = 1) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 0.10 * i, duration: 0.7, type: "spring" }
  }),
};

const blocks = [
  {
    icon: <FaBullseye className="text-5xl text-orange-400 mb-4" />,
    title: 'Misión',
    titleClass: 'text-orange-400',
    text: 'Proteger a empresas y organizaciones mediante soluciones de ciberseguridad innovadoras, adaptadas y efectivas.'
  },
  {
    icon: <FaEye className="text-5xl text-blue-200 mb-4" />,
    title: 'Visión',
    titleClass: 'text-blue-200',
    text: 'Ser referentes en el sector, impulsando la confianza digital y la innovación segura en todo el mundo.'
  },
  {
    icon: <FaHeart className="text-5xl text-pink-400 mb-4" />,
    title: 'Valores',
    titleClass: 'text-pink-400',
    text: 'Ética, transparencia y pasión por la excelencia en cada proyecto y relación.'
  },
  {
    icon: <FaHandshake className="text-5xl text-green-300 mb-4" />,
    title: 'Compromiso',
    titleClass: 'text-green-300',
    text: 'Acompañamos a nuestros clientes en cada paso, garantizando resultados y confianza.'
  }
];

export default function QuienesSomos() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-24">
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
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center px-4">
        <motion.h2
          initial={{ opacity: 0, scale: 0.92, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.7, type: "spring" }}
          className="text-5xl md:text-7xl font-extrabold mb-8 text-orange-400 tracking-tight text-center drop-shadow-lg"
        >
          Quiénes Somos
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="text-xl md:text-2xl text-blue-100 mb-14 font-medium text-center max-w-3xl leading-relaxed"
        >
          En <span className="text-orange-400 font-bold">SparkFound</span> transformamos la <span className="text-blue-400 font-semibold">ciberseguridad</span> en una ventaja competitiva. Nuestro equipo combina <span className="text-orange-400 font-semibold">experiencia técnica</span> y <span className="text-blue-400 font-semibold">visión estratégica</span> para proteger datos, innovar con seguridad y generar confianza digital.
        </motion.p>
        <div className="relative w-full max-w-4xl mx-auto mb-12">
          {/* Líneas divisorias */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-orange-400/80 -translate-y-1/2 z-10"></div>
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-0.5 bg-orange-400/80 -translate-x-1/2 z-10"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-10 md:gap-8 w-full relative z-20">
            {blocks.map((block, i) => (
              <motion.div
                key={block.title}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={i + 3}
                className="flex flex-col items-center text-center px-4 py-8 rounded-2xl transition-all duration-300"
              >
                {block.icon}
                <span className={`text-2xl font-bold mb-2 ${block.titleClass}`}>{block.title}</span>
                <p className="text-blue-100 text-lg max-w-md">
                  {block.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
      <style>{`
        .drop-shadow-glow {
          filter: drop-shadow(0 0 12px #ff9900cc) drop-shadow(0 0 8px #4f46e5cc);
        }
        @keyframes floatY {
          0% { transform: translateY(0) scale(1);}
          50% { transform: translateY(-30px) scale(1.08);}
          100% { transform: translateY(0) scale(1);}
        }
      `}</style>
    </section>
  );
}