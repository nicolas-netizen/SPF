import React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const timeline = [
  {
    img: "/Soc.jpg",
    title: "Equipo en acción",
    desc: "SparkFound es un equipo de expertos en ciberseguridad que protege empresas de todos los tamaños." 
  },
  {
    img: "/SPF.png",
    title: "Soluciones a medida",
    desc: "Desarrollamos soluciones innovadoras y personalizadas para anticipar y mitigar riesgos digitales."
  },
  {
    img: "/shield-logo.png",
    title: "Soporte y confianza",
    desc: "Acompañamos a nuestros clientes 24/7, generando confianza y resultados reales en cada proyecto."
  }
];

// Hook para detectar mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

export default function QuienesSomos() {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <section className="relative py-20 px-6 md:px-20 overflow-hidden">
        {/* Separador superior visual */}
        <div className="w-full flex flex-col items-center mb-12">
          <svg width="320" height="16" viewBox="0 0 320 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="sep-gradient" x1="0" y1="8" x2="320" y2="8" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF6B00" stopOpacity="0" />
                <stop offset="0.5" stopColor="#FF6B00" stopOpacity="0.7" />
                <stop offset="1" stopColor="#0099FF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect x="0" y="7" width="320" height="2" rx="1" fill="url(#sep-gradient)" />
            <circle cx="40" cy="8" r="3" fill="#FF6B00" className="animate-pulse" />
            <circle cx="160" cy="8" r="4" fill="#0099FF" className="animate-pulse" />
            <circle cx="280" cy="8" r="3" fill="#FF6B00" className="animate-pulse" />
          </svg>
        </div>
        {/* Fondo de hexágonos grande y poco denso */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-15">
          <svg width="100%" height="100%" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hex-bg" width="160" height="160" patternUnits="userSpaceOnUse">
                <polygon points="80,10 150,45 150,115 80,150 10,115 10,45" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.08" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hex-bg)" />
          </svg>
        </div>
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-orange-400 mb-6 text-center drop-shadow-[0_2px_12px_rgba(255,160,0,0.6)]">
            ¿Quiénes somos?
          </h2>
          <div className="text-blue-100 text-lg text-center mb-2">Conoce nuestro equipo y nuestra misión</div>
          <div className="flex justify-center mb-8">
            <div className="h-1 w-24 rounded-full bg-gradient-to-r from-orange-400 via-blue-400 to-orange-400 opacity-70"></div>
          </div>
          <div className="max-w-4xl mx-auto flex flex-col gap-16 relative">
            <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-orange-400/60 via-blue-400/40 to-orange-400/60 -translate-x-1/2 z-0" style={{ minHeight: '100%' }}></div>
            {timeline.map((step, i) => (
              <div
                key={step.title}
                className={`relative flex flex-col md:flex-row items-center gap-8 z-10 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="w-full md:w-1/2 flex justify-center">
                  <img
                    src={step.img}
                    alt={step.title}
                    className="rounded-2xl shadow-xl w-72 h-72 md:w-80 md:h-80 object-cover bg-[#23235b] border-4 border-[#23235b]"
                  />
                </div>
                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="bg-[#393963]/80 rounded-2xl p-6 md:p-8 shadow-lg w-full">
                    <h3 className="text-3xl md:text-4xl font-extrabold text-orange-400 mb-2 drop-shadow-[0_2px_12px_rgba(255,160,0,0.6)]">{step.title}</h3>
                    {i === 0 ? (
                      <>
                        <p className="text-orange-300 font-semibold text-lg mb-1">SparkFound es un equipo de expertos en ciberseguridad</p>
                        <p className="text-blue-100 text-lg">
                          que protege empresas de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300 font-bold">todos los tamaños.</span>
                        </p>
                      </>
                    ) : i === 1 ? (
                      <>
                        <p className="text-orange-300 font-semibold text-lg mb-1">Desarrollamos soluciones innovadoras y personalizadas</p>
                        <p className="text-blue-100 text-lg">
                          para anticipar y mitigar <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300 font-bold">riesgos digitales.</span>
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-orange-300 font-semibold text-lg mb-1">Acompañamos a nuestros clientes 24/7</p>
                        <p className="text-blue-100 text-lg">
                          generando confianza y <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300 font-bold">resultados reales</span> en cada proyecto.
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Separador inferior visual */}
        <div className="w-full flex flex-col items-center mt-16">
          <svg width="320" height="16" viewBox="0 0 320 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="sep-gradient2" x1="0" y1="8" x2="320" y2="8" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0099FF" stopOpacity="0" />
                <stop offset="0.5" stopColor="#0099FF" stopOpacity="0.7" />
                <stop offset="1" stopColor="#FF6B00" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect x="0" y="7" width="320" height="2" rx="1" fill="url(#sep-gradient2)" />
            <circle cx="40" cy="8" r="3" fill="#0099FF" className="animate-pulse" />
            <circle cx="160" cy="8" r="4" fill="#FF6B00" className="animate-pulse" />
            <circle cx="280" cy="8" r="3" fill="#0099FF" className="animate-pulse" />
          </svg>
        </div>
      </section>
    );
  }
  // Desktop: con animaciones
  return (
    <motion.section
      className="relative py-20 px-6 md:px-20 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, type: "spring" }}
    >
      {/* Separador superior visual */}
      <div className="w-full flex flex-col items-center mb-12">
        <svg width="320" height="16" viewBox="0 0 320 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sep-gradient" x1="0" y1="8" x2="320" y2="8" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF6B00" stopOpacity="0" />
              <stop offset="0.5" stopColor="#FF6B00" stopOpacity="0.7" />
              <stop offset="1" stopColor="#0099FF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="0" y="7" width="320" height="2" rx="1" fill="url(#sep-gradient)" />
          <circle cx="40" cy="8" r="3" fill="#FF6B00" className="animate-pulse" />
          <circle cx="160" cy="8" r="4" fill="#0099FF" className="animate-pulse" />
          <circle cx="280" cy="8" r="3" fill="#FF6B00" className="animate-pulse" />
        </svg>
      </div>
      {/* Fondo de hexágonos grande y poco denso */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-15">
        <svg width="100%" height="100%" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hex-bg" width="160" height="160" patternUnits="userSpaceOnUse">
              <polygon points="80,10 150,45 150,115 80,150 10,115 10,45" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.08" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-bg)" />
        </svg>
      </div>
      <div className="relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-orange-400 mb-6 text-center drop-shadow-[0_2px_12px_rgba(255,160,0,0.6)]">
          ¿Quiénes somos?
        </h2>
        <div className="text-blue-100 text-lg text-center mb-2">Conoce nuestro equipo y nuestra misión</div>
        <div className="flex justify-center mb-8">
          <div className="h-1 w-24 rounded-full bg-gradient-to-r from-orange-400 via-blue-400 to-orange-400 opacity-70"></div>
        </div>
        <motion.div
          className="max-w-4xl mx-auto flex flex-col gap-16 relative"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.18 }
            }
          }}
        >
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-orange-400/60 via-blue-400/40 to-orange-400/60 -translate-x-1/2 z-0" style={{ minHeight: '100%' }}></div>
          {timeline.map((step, i) => (
            <motion.div
              key={step.title}
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, type: "spring", delay: 0.1 * i } }
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className={`relative flex flex-col md:flex-row items-center gap-8 z-10 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="w-full md:w-1/2 flex justify-center">
                <img
                  src={step.img}
                  alt={step.title}
                  className="rounded-2xl shadow-xl w-72 h-72 md:w-80 md:h-80 object-cover bg-[#23235b] border-4 border-[#23235b]"
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="bg-[#393963]/80 rounded-2xl p-6 md:p-8 shadow-lg w-full">
                  <h3 className="text-3xl md:text-4xl font-extrabold text-orange-400 mb-2 drop-shadow-[0_2px_12px_rgba(255,160,0,0.6)]">{step.title}</h3>
                  {i === 0 ? (
                    <>
                      <p className="text-orange-300 font-semibold text-lg mb-1">SparkFound es un equipo de expertos en ciberseguridad</p>
                      <p className="text-blue-100 text-lg">
                        que protege empresas de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300 font-bold">todos los tamaños.</span>
                      </p>
                    </>
                  ) : i === 1 ? (
                    <>
                      <p className="text-orange-300 font-semibold text-lg mb-1">Desarrollamos soluciones innovadoras y personalizadas</p>
                      <p className="text-blue-100 text-lg">
                        para anticipar y mitigar <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300 font-bold">riesgos digitales.</span>
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-orange-300 font-semibold text-lg mb-1">Acompañamos a nuestros clientes 24/7</p>
                      <p className="text-blue-100 text-lg">
                        generando confianza y <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300 font-bold">resultados reales</span> en cada proyecto.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="w-full flex flex-col items-center mt-16">
        <svg width="320" height="16" viewBox="0 0 320 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sep-gradient2" x1="0" y1="8" x2="320" y2="8" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0099FF" stopOpacity="0" />
              <stop offset="0.5" stopColor="#0099FF" stopOpacity="0.7" />
              <stop offset="1" stopColor="#FF6B00" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="0" y="7" width="320" height="2" rx="1" fill="url(#sep-gradient2)" />
          <circle cx="40" cy="8" r="3" fill="#0099FF" className="animate-pulse" />
          <circle cx="160" cy="8" r="4" fill="#FF6B00" className="animate-pulse" />
          <circle cx="280" cy="8" r="3" fill="#0099FF" className="animate-pulse" />
        </svg>
      </div>
    </motion.section>
  );
}