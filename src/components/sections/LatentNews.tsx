import React from "react";
import { motion } from "framer-motion";
import { FaRegNewspaper } from "react-icons/fa";

const news = [
  {
    title: "Nueva alianza estratégica con CloudX",
    date: "2024-06-10",
    summary: "SparkFound se asocia con CloudX para potenciar la seguridad en la nube de empresas de LATAM.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Reconocimiento internacional",
    date: "2024-05-28",
    summary: "Fuimos destacados por CyberTech Review como una de las startups más innovadoras en ciberseguridad.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Lanzamiento de plataforma ZeroTrust",
    date: "2024-05-15",
    summary: "Presentamos nuestra nueva solución ZeroTrust para proteger infraestructuras críticas.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80"
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

export default function LatentNews() {
  return (
    <section className="relative py-20 flex flex-col items-center bg-transparent">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-4xl md:text-5xl font-extrabold mb-10 text-orange-400 tracking-tight text-center drop-shadow-lg"
      >
        Latent News
      </motion.h2>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl justify-center">
        {news.map((item, i) => (
          <motion.div
            key={item.title}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={i + 1}
            className="flex-1 min-w-[260px] bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-orange-400/20 flex flex-col items-center"
            whileHover={{ scale: 1.03, boxShadow: "0 0 32px #ff9900cc" }}
          >
            <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded-xl mb-4" />
            <div className="flex items-center gap-2 mb-2 w-full">
              <FaRegNewspaper className="text-orange-400 text-xl" />
              <span className="text-xs text-blue-200">{item.date}</span>
            </div>
            <h3 className="text-lg font-bold text-orange-400 mb-1 w-full text-left">{item.title}</h3>
            <p className="text-blue-100 text-base w-full text-left">{item.summary}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 