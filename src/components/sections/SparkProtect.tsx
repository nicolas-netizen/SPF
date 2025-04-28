import React from 'react';
import { Search, Cpu, ShieldCheck } from 'lucide-react';

const SparkProtect: React.FC = () => {
  // The three components of SparkProtect
  const components = [
    {
      icon: Search,
      title: "SIEM",
      description: "Centraliza y analiza eventos de seguridad en tiempo real."
    },
    {
      icon: Cpu,
      title: "SOAR",
      description: "Automatiza respuestas ante incidentes."
    },
    {
      icon: ShieldCheck,
      title: "EDR",
      description: "Detecta amenazas en los dispositivos y puede aislar o contener ataques."
    }
  ];

  return (
    <section className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] bg-clip-text text-transparent fade-in-up">
            SparkProtect
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto fade-in-up delay-100 px-4">
            Nuestra solución principal de ciberseguridad con protección avanzada.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-12 mt-16 mb-12 max-w-5xl mx-auto">
          {components.map((component, index) => (
            <div key={index} className="relative group fade-in-up delay-200">
              {/* Hexagon shape using clip-path */}
              <div className="w-72 h-80 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-105 mx-auto">
                <div className="w-full h-full absolute bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] opacity-20 clip-hexagon"></div>
                <div className="w-[98%] h-[98%] absolute bg-gray-800 clip-hexagon"></div>
                <div className="relative z-10 text-center px-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] rounded-full flex items-center justify-center mb-4">
                    <component.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{component.title}</h3>
                  <p className="text-gray-300">{component.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 max-w-4xl mx-auto">
          <p className="text-lg text-[#FF6B00] font-medium fade-in-up delay-300">
            Gestionado 24/7 por el equipo de Sparkfound desde su NG-NSOC.
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .clip-hexagon {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
      `}} />
    </section>
  );
};

export default SparkProtect;
