import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    title: "Teléfono",
    info: "+1 (555) 123-4567",
    gradient: "from-[#FF6B00] to-[#FF8A3D]"
  },
  {
    icon: Mail,
    title: "Email",
    info: "contacto@sparktech.com",
    gradient: "from-blue-400 to-cyan-300"
  },
  {
    icon: MapPin,
    title: "Ubicación",
    info: "Silicon Valley, CA",
    gradient: "from-purple-400 to-pink-300"
  },
  {
    icon: Clock,
    title: "Horario",
    info: "24/7 Soporte",
    gradient: "from-green-400 to-emerald-300"
  }
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600 mb-4 relative inline-block">
            Contacto
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mt-2"></div>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mt-6">
            Estamos aquí para ayudarte. Contáctanos en cualquier momento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {contactInfo.map((item, index) => (
            <div 
              key={index}
              className="glass-card rounded-xl p-6 text-center hover-glow"
            >
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${item.gradient} mb-4`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-300">{item.info}</p>
            </div>
          ))}
        </div>

        {/* Formulario de contacto */}
        <div className="max-w-2xl mx-auto">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  placeholder="Nombre"
                  className="w-full px-4 py-3 rounded-lg glass-effect text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg glass-effect text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            <div>
              <textarea
                rows={4}
                placeholder="Mensaje"
                className="w-full px-4 py-3 rounded-lg glass-effect text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
              >
                Enviar Mensaje
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}