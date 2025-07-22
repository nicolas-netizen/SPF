import React from "react";
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

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.10 * i, duration: 0.7, type: "spring" }
  }),
};

export default function QuienesSomos() {
  return (
    <section className="relative py-20 px-6 md:px-20 overflow-hidden">
      <h2 className="text-4xl md:text-5xl font-bold text-orange-400 mb-6 text-center drop-shadow-[0_2px_12px_rgba(255,160,0,0.6)]">
        ¿Quiénes somos?
      </h2>
      <div className="text-blue-100 text-lg text-center mb-2">Conoce nuestro equipo y nuestra misión</div>
      <div className="flex justify-center mb-8">
        <div className="h-1 w-24 rounded-full bg-gradient-to-r from-orange-400 via-blue-400 to-orange-400 opacity-70"></div>
      </div>
      <div className="max-w-4xl mx-auto flex flex-col gap-16 relative">
        {/* Línea vertical de unión (solo desktop) */}
        <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-orange-400/60 via-blue-400/40 to-orange-400/60 -translate-x-1/2 z-0" style={{ minHeight: '100%' }}></div>
        {timeline.map((step, i) => (
          <motion.div
            key={step.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            custom={i + 1}
            className={`relative flex flex-col md:flex-row items-center gap-8 z-10 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
          >
            {/* Foto */}
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src={step.img}
                alt={step.title}
                className="rounded-2xl shadow-xl w-72 h-72 md:w-80 md:h-80 object-cover bg-[#23235b] border-4 border-[#23235b]"
              />
            </div>
            {/* Texto */}
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
      </div>
    </section>
  );
}