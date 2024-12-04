import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contacto: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-orange-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Contáctanos
          </h1>
          <p className="text-gray-400 text-center mb-12">
            Estamos aquí para ayudarte con todas tus necesidades de seguridad
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-purple-900/30 via-black/30 to-orange-900/30 backdrop-blur-md p-8 rounded-xl border border-purple-800/50">
              <h2 className="text-2xl font-bold text-white mb-6">Información de Contacto</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 group">
                  <div className="bg-gradient-to-r from-purple-500 via-orange-400 to-blue-500 p-3 rounded-lg transform transition-all duration-300 group-hover:scale-110">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400">Email</p>
                    <p className="text-white group-hover:text-orange-400 transition-colors">contacto@spf-security.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 group">
                  <div className="bg-gradient-to-r from-orange-400 via-blue-500 to-purple-500 p-3 rounded-lg transform transition-all duration-300 group-hover:scale-110">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400">Teléfono</p>
                    <p className="text-white group-hover:text-blue-400 transition-colors">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 group">
                  <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400 p-3 rounded-lg transform transition-all duration-300 group-hover:scale-110">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400">Dirección</p>
                    <p className="text-white group-hover:text-purple-400 transition-colors">123 Security Street, Tech City</p>
                  </div>
                </div>
              </div>
            </div>

            <form className="bg-gradient-to-br from-blue-900/30 via-black/30 to-purple-900/30 backdrop-blur-md p-8 rounded-xl border border-blue-800/50">
              <h2 className="text-2xl font-bold text-white mb-6">Envíanos un Mensaje</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                    placeholder="Tu mensaje..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-400 via-purple-500 to-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/20 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Enviar Mensaje</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
