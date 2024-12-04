import React from 'react';
import { Shield, Target, Users, Award } from 'lucide-react';

const stats = [
  {
    icon: Shield,
    value: "100%",
    label: "Seguridad Garantizada",
    gradient: "from-[#FF6B00] to-[#FF8A3D]"
  },
  {
    icon: Target,
    value: "24/7",
    label: "Monitoreo Continuo",
    gradient: "from-blue-400 to-cyan-300"
  },
  {
    icon: Users,
    value: "500+",
    label: "Clientes Satisfechos",
    gradient: "from-purple-400 to-pink-300"
  },
  {
    icon: Award,
    value: "10+",
    label: "Años de Experiencia",
    gradient: "from-green-400 to-emerald-300"
  }
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Sobre Nosotros
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Somos expertos en ciberseguridad comprometidos con la protección digital de su empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-black/30 backdrop-blur-md rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300 border border-gray-800"
            >
              <div className={`w-16 h-16 mx-auto rounded-lg bg-gradient-to-r ${stat.gradient} p-4 mb-6`}>
                <stat.icon className="w-full h-full text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;