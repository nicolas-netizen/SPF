import React from 'react';
import { Shield, ArrowRight } from 'lucide-react';
import AnimatedText from '../AnimatedText';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <AnimatedText 
                text="CIBERSEGURIDAD GESTIONADA 24/7"
                className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D]"
                speed={100}
              />
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Ciberseguridad gestionada 24/7, adaptada a tu empresa. Protegé tus activos digitales con Sparkfound: tecnología de vanguardia y monitoreo constante, sin inversiones iniciales.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="group flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 transform hover:-translate-y-1">
                Agendá una reunión
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            <div className="mt-12 flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-[#FF6B00]" />
                <span className="text-gray-300">Seguridad Garantizada</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 w-full h-[400px] flex items-center justify-center">
              <img 
                src="/shield-logo.png" 
                alt="Sparkfound Shield"
                className="w-72 h-72 object-contain animate-float"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;