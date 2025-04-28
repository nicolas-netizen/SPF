import React from 'react';
import { Shield, TrendingUp, Clock, Globe } from 'lucide-react';

const reasons = [
  {
    icon: Shield,
    title: "Protección integral",
    description: "Servicios de ciberseguridad adaptables y personalizados.",
    gradient: "from-[#FF6B00] to-[#FF8A3D]"
  },
  {
    icon: TrendingUp,
    title: "Escalabilidad",
    description: "Modelo de suscripción flexible, sin inversiones iniciales.",
    gradient: "from-blue-400 to-cyan-300"
  },
  {
    icon: Clock,
    title: "Monitoreo constante",
    description: "Vigilancia activa 24/7 desde su centro NG-NSOC en Buenos Aires.",
    gradient: "from-purple-400 to-pink-300"
  },
  {
    icon: Globe,
    title: "Cobertura global",
    description: "Operan en toda América Latina y se están expandiendo a nivel internacional.",
    gradient: "from-green-400 to-emerald-300"
  }
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 relative animate-float">
          <div className="absolute w-48 h-48 bg-[#FF6B00]/10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] bg-clip-text text-transparent fade-in-up">
            ¿Quiénes somos?
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-16 fade-in-up delay-100">
            Somos expertos en cibervigilancia y ofrecemos soluciones personalizadas para proteger tu empresa. Nuestra modalidad como servicio te brinda una protección continua y eficiente.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className={`border-[#FF6B00] bg-black/30 backdrop-blur-sm rounded-xl p-6 flex items-start transform hover:scale-105 hover:bg-black/40 transition-all duration-500 border shadow-lg hover:shadow-[#FF6B00]/20 hover:shadow-xl fade-in-up delay-${index * 100 + 200}`}
              style={{
                animationDelay: `${index * 0.2 + 0.4}s`
              }}
            >
              <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-[#FF6B00] p-3 mr-4 transform transition-all duration-500 hover:rotate-12 relative overflow-hidden shadow-inner animate-pulse-slow"
                style={{
                  boxShadow: '0 0 15px 2px rgba(255, 107, 0, 0.4)'
                }}
              >
                <reason.icon className="w-full h-full text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent mb-2 transition-all duration-300 hover:from-[#FF6B00] hover:to-white">{reason.title}</h3>
                <p className="text-gray-300 hover:text-white transition-colors duration-500">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;