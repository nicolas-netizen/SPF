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
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] bg-clip-text text-transparent">
            ¿Quiénes somos?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Somos expertos en cibervigilancia y ofrecemos soluciones personalizadas para proteger tu empresa. Nuestra modalidad como servicio te brinda una protección continua y eficiente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-transparent rounded-xl p-6 flex items-start transform hover:scale-102 transition-all duration-300 border border-gray-800"
            >
              <div className={`w-12 h-12 flex-shrink-0 rounded-lg bg-gradient-to-r ${reason.gradient} p-3 mr-4`}>
                <reason.icon className="w-full h-full text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{reason.title}</h3>
                <p className="text-gray-300">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;