import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="h-screen w-screen flex items-center justify-center bg-gradient-to-b from-[#1a1a1a] via-[#2d1f4d] to-[#462818] overflow-hidden fixed top-0 left-0">
      <div className="stars-overlay absolute inset-0 pointer-events-none"></div>
      
      <div className="container relative z-10 max-w-[1800px] h-full px-4">
        <div className="flex h-full items-center justify-between gap-8 lg:gap-16">
          {/* Logo Column */}
          <div className="w-full lg:w-1/2 flex items-center justify-center animate-fadeIn">
            <img 
              src="/SPF.png" 
              alt="SPF Logo" 
              className="w-auto h-40 md:h-48 lg:h-64 xl:h-72 animate-float shadow-orange"
            />
          </div>

          {/* Content Column */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="backdrop-blur-lg bg-gradient-to-br from-[#FF6B35]/5 via-[#8B5CF6]/5 to-[#FF8C4B]/5 rounded-3xl p-8 border border-white/10 shadow-glow-orange animate-slideUp">
              <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-6 text-center lg:text-left animate-pulse-soft">
                Términos y Condiciones
              </h2>
              
              <div className="mb-8 space-y-4">
                <p className="text-white/90 text-base md:text-lg leading-relaxed animate-fadeIn opacity-0" style={{ animationDelay: '0.3s' }}>
                  Al aceptar los términos y condiciones, usted reconoce y acepta que toda la información proporcionada será utilizada de acuerdo con nuestra política de privacidad.
                </p>
                <p className="text-white/80 text-base md:text-lg leading-relaxed animate-fadeIn opacity-0" style={{ animationDelay: '0.6s' }}>
                  Nos comprometemos a proteger y salvaguardar sus datos personales, utilizándolos únicamente para los fines específicos detallados en nuestros términos de servicio.
                </p>
              </div>

              <div className="flex justify-center lg:justify-start space-x-4 animate-fadeIn opacity-0" style={{ animationDelay: '0.9s' }}>
                <button 
                  className="px-6 py-2.5 bg-gradient-to-r from-orange-500/90 to-orange-600/90 hover:from-green-500 hover:to-green-600 text-white rounded-lg font-medium transform hover:scale-105 transition-all duration-300"
                >
                  Aceptar
                </button>
                <button 
                  className="px-6 py-2.5 bg-white/10 hover:bg-red-600/90 text-white rounded-lg font-medium transform hover:scale-105 transition-all duration-300 border border-white/20 hover:border-transparent"
                >
                  Rechazar
                </button>
              </div>
            </div>

            <div className="mt-4 text-white/50 text-sm animate-fadeIn opacity-0 lg:text-left text-center" style={{ animationDelay: '1.2s' }}>
              &copy; 2024 SPF. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .stars-overlay {
          background-image: url('/stars.svg');
          background-size: 200% 200%;
          animation: moveStars 30s linear infinite;
          opacity: 0.5;
        }

        @keyframes moveStars {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: -200% -200%;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 1s ease-out;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-pulse-soft {
          animation: pulseSoft 3s ease-in-out infinite;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulseSoft {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .shadow-glow-orange {
          box-shadow: 0 0 50px rgba(255, 107, 53, 0.1);
        }

        .shadow-orange {
          filter: drop-shadow(0 0 20px rgba(255, 107, 53, 0.3));
        }
      `}</style>
    </section>
  );
};

export default About;
