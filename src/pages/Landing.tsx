import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, CheckCircle, ArrowRight, ExternalLink, ChevronDown, Server, Globe } from 'lucide-react';
import SpaceBackground from '../components/SpaceBackground.tsx';
import SolutionsBenefits from '../components/SolutionsBenefits.tsx';

/**
 * Estilos de animación para la landing page
 */
const animationStyles = `
  /**
   * Grupo 1: Animaciones basadas en scroll (se activan al scrollear)
   * Utilizadas en: secciones de servicios, CTA y elementos principales
   */
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
  
  .animate-on-scroll.animate-active {
    opacity: 1;
    transform: translateY(0);
  }
  
  .animate-fade-in {
    opacity: 0;
    transition: opacity 1s ease-out;
  }
  
  .animate-fade-in.animate-active {
    opacity: 1;
  }
  
  .animate-slide-left {
    opacity: 0;
    transform: translateX(-50px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
  
  .animate-slide-left.animate-active {
    opacity: 1;
    transform: translateX(0);
  }
  
  .animate-slide-right {
    opacity: 0;
    transform: translateX(50px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
  
  .animate-slide-right.animate-active {
    opacity: 1;
    transform: translateX(0);
  }
  
  .animate-scale {
    opacity: 0;
    transform: scale(0.8);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
  
  .animate-scale.animate-active {
    opacity: 1;
    transform: scale(1);
  }
  
  /**
   * Grupo 2: Animaciones continuas (siempre activas)
   * Utilizadas en: elementos decorativos, textos destacados y fondos
   */
  .animate-gradient-x {
    background-size: 200% 200%;
    animation: gradientPosition 3s ease infinite;
  }
  
  @keyframes gradientPosition {
    0% { background-position: 0% 50% }
    50% { background-position: 100% 50% }
    100% { background-position: 0% 50% }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-float-slow {
    animation: float 8s ease-in-out infinite;
  }
  
  .animate-float-reverse {
    animation: float-reverse 6s ease-in-out infinite;
  }
  
  .animate-float-slow-reverse {
    animation: float-reverse 8s ease-in-out infinite;
  }
  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
  }
  
  @keyframes float-reverse {
    0% { transform: translateY(0px); }
    50% { transform: translateY(20px); }
    100% { transform: translateY(0px); }
  }
  
  .animate-pulse-custom {
    animation: pulse-custom 3s ease-in-out infinite;
  }
  
  @keyframes pulse-custom {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }
  
  /**
   * Grupo 3: Retrasos para crear efecto cascada
   * Utilizados en: tarjetas de servicios y listas de beneficios
   */
  .delay-100 { transition-delay: 100ms; }
  .delay-200 { transition-delay: 200ms; }
  .delay-300 { transition-delay: 300ms; }
  .delay-400 { transition-delay: 400ms; }
  .delay-500 { transition-delay: 500ms; }
  .delay-600 { transition-delay: 600ms; }
  .delay-700 { transition-delay: 700ms; }
  .delay-800 { transition-delay: 800ms; }
`;

const Landing: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Al cargar el componente, activar animaciones iniciales
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    // Función para manejar el scroll y activar animaciones
    const handleScroll = () => {
      // Seleccionar todos los elementos con clases de animación
      const animatedElements = document.querySelectorAll(
        '.animate-on-scroll, .animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-scale'
      );
      
      animatedElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        // Considerar un elemento visible cuando está en el 75% superior de la pantalla
        const isVisible = (rect.top <= window.innerHeight * 0.75);
        
        if (isVisible) {
          element.classList.add('animate-active');
        }
      });
    };
    
    // Agregar el evento de scroll
    window.addEventListener('scroll', handleScroll);
    // Llamar a la función una vez para verificar elementos en la vista inicial
    setTimeout(handleScroll, 100);
    
    // Limpiar el evento cuando el componente se desmonte
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="landing-page relative overflow-hidden">
      {/* Estilos CSS para animaciones */}
      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />
      {/* Fondo espacial */}
      <div className="absolute inset-0 z-0">
        <SpaceBackground />
      </div>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute -left-20 top-20 w-80 h-80 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute right-20 bottom-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute left-1/2 top-1/3 w-40 h-40 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-full blur-3xl animate-float"></div>
        
        {/* Floating security elements */}
        <div className="absolute top-1/4 left-10 animate-float opacity-20 text-orange-400">
          <Shield size={32} />
        </div>
        <div className="absolute top-1/3 right-10 animate-float-slow opacity-20 text-blue-400">
          <Lock size={32} />
        </div>
        <div className="absolute bottom-1/4 left-20 animate-float-reverse opacity-20 text-purple-400">
          <Server size={32} />
        </div>
        <div className="absolute bottom-1/3 right-20 animate-float-slow-reverse opacity-20 text-teal-400">
          <Globe size={32} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 py-16">
          <div className={`text-center mb-8 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-block bg-gradient-to-r from-orange-500/30 via-purple-500/30 to-blue-500/30 px-6 py-2 rounded-full mb-6 backdrop-blur-sm border border-orange-500/20">
              <span className="text-orange-400 font-semibold tracking-wider text-sm md:text-base">SERVICIO PREMIUM</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-8 leading-tight">
              <div className="mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-[#FF4F8B] to-[#FF8A3D] animate-gradient-x">Ciberseguridad</span>
              </div>
              <div className="mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-[#FF4F8B] to-[#FF8A3D] animate-gradient-x">gestionada 24/7</span>
              </div>
              <div>
                <span className="text-white">adaptada a tu empresa</span>
              </div>
            </h1>
            
            <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto leading-relaxed backdrop-blur-sm py-4 px-6 rounded-lg bg-black/30 border border-gray-800/50">
              <span className="font-medium text-white">Protegé</span> tus activos digitales con <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] font-bold">Sparkfound</span>: 
              tecnología de vanguardia y monitoreo constante, <span className="font-bold text-white">sin inversiones iniciales</span>.
            </p>
          </div>
          
          <div className={`flex flex-col items-center justify-center max-w-4xl mx-auto transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <Link to="/contacto" className="group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF6B00] via-[#FF4F8B] to-[#FF8A3D] text-white font-semibold rounded-lg hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-1 text-lg animate-gradient-x">
                SOLICITAR PRESUPUESTO
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <a href="tel:+123456789" className="flex items-center justify-center gap-2 px-8 py-4 bg-black/20 backdrop-blur-sm border-2 border-gray-600/50 text-white font-semibold rounded-lg hover:border-orange-400/80 hover:bg-black/30 transition-all duration-300 text-lg">
                LLAMAR AHORA
              </a>
            </div>
            
            <a href="#conoce-soluciones" className="animate-bounce mt-16 text-center opacity-80 hover:opacity-100 transition-all duration-300 block group">
              <p className="text-gray-300 mb-2 group-hover:text-orange-400 transition-colors">Descubre más</p>
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500/20 to-pink-500/20 flex items-center justify-center mx-auto group-hover:from-orange-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                <ChevronDown className="w-6 h-6 text-orange-400 group-hover:text-white transition-colors" />
              </div>
            </a>
          </div>
        </div>
      </section>
      

      {/* Features Section - Detailed */}
      <section id="conoce-soluciones" className="py-24">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-block bg-gradient-to-r from-orange-500/20 to-orange-600/20 px-4 py-1 rounded-full mb-4 animate-pulse-custom">
              <span className="text-orange-400 font-medium">SOLUCIONES EMPRESARIALES</span>
            </div>
            <h2 className="text-3xl md:text-6xl font-bold text-white mb-6">
              Conocé nuestras <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] animate-gradient-x">soluciones</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Nuestras soluciones de ciberseguridad te permitirán optimizar procesos, ahorrar recursos y proteger lo más valioso de tu empresa
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Feature Card 1 */}
            <div className="relative bg-[rgba(0,0,0,0.2)] backdrop-blur-sm p-7 rounded-2xl border border-orange-500/20 hover:border-orange-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 group animate-slide-left delay-100 transform hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#8A33FF]/5 to-[#FF3333]/5 z-0"></div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-xl"></div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-5">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 flex items-center justify-center group-hover:from-orange-500/30 group-hover:to-red-500/30 transition-all duration-300 shadow-lg">
                    <Shield className="w-8 h-8 text-orange-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 text-center group-hover:text-orange-400 transition-colors duration-300">Protección Avanzada</h3>
                <p className="text-gray-300 text-center">
                  Soluciones de seguridad de última generación contra amenazas complejas y ataques dirigidos.
                </p>
              </div>
            </div>
            
            {/* Feature Card 2 */}
            <div className="relative bg-[rgba(0,0,0,0.2)] backdrop-blur-sm p-7 rounded-2xl border border-orange-500/20 hover:border-orange-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 group animate-scale delay-300 transform hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#3358FF]/5 to-[#FF33A8]/5 z-0"></div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-xl"></div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-5">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 flex items-center justify-center group-hover:from-orange-500/30 group-hover:to-red-500/30 transition-all duration-300 shadow-lg">
                    <Lock className="w-8 h-8 text-orange-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 text-center group-hover:text-orange-400 transition-colors duration-300">Cifrado de Datos</h3>
                <p className="text-gray-300 text-center">
                  Protección de información sensible y confidencial con los mejores protocolos de encriptación.
                </p>
              </div>
            </div>
            
            {/* Feature Card 3 */}
            <div className="relative bg-[rgba(0,0,0,0.2)] backdrop-blur-sm p-7 rounded-2xl border border-orange-500/20 hover:border-orange-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 group animate-slide-right delay-500 transform hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#FF5533]/5 to-[#FFCC33]/5 z-0"></div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-xl"></div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-5">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 flex items-center justify-center group-hover:from-orange-500/30 group-hover:to-red-500/30 transition-all duration-300 shadow-lg">
                    <ExternalLink className="w-8 h-8 text-orange-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 text-center group-hover:text-orange-400 transition-colors duration-300">Monitoreo 24/7</h3>
                <p className="text-gray-300 text-center">
                  Vigilancia continua con respuesta inmediata ante cualquier incidente de seguridad.
                </p>
              </div>
            </div>
            
            {/* Feature Card 4 */}
            <div className="relative bg-[rgba(0,0,0,0.2)] backdrop-blur-sm p-7 rounded-2xl border border-orange-500/20 hover:border-orange-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 group animate-scale delay-700 transform hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#33FFCC]/5 to-[#FF5533]/5 z-0"></div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-xl"></div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-5">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 flex items-center justify-center group-hover:from-orange-500/30 group-hover:to-red-500/30 transition-all duration-300 shadow-lg">
                    <CheckCircle className="w-8 h-8 text-orange-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 text-center group-hover:text-orange-400 transition-colors duration-300">Análisis de Riesgos</h3>
                <p className="text-gray-300 text-center">
                  Identificación de vulnerabilidades y evaluación completa de la seguridad de tu infraestructura.
                </p>
              </div>
            </div>
          </div>
          
          {/* Sección de beneficios */}
          <SolutionsBenefits />
        </div>
      </section>
      
      {/* Contact CTA */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="py-10 px-8 backdrop-blur-md bg-[rgba(20,10,30,0.8)] border border-orange-500/30 rounded-xl max-w-3xl mx-auto animate-fade-in shadow-lg">
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">
              ¿Listo para proteger tu empresa?
            </h3>
            <p className="text-gray-300 mb-6">
              Contacta ahora con nuestros especialistas y obtén una <span className="text-orange-400 font-bold">evaluación gratuita</span> de la seguridad de tu infraestructura
            </p>
            
            <div className="flex justify-center">
              <Link to="/contacto" className="flex items-center justify-center gap-2 px-8 py-3 bg-[#FF6B00] text-white font-semibold rounded-md hover:brightness-110 transition-all">
                CONTÁCTANOS AHORA
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer muy simplificado basado en la imagen de referencia */}
      <footer className="bg-black py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Columna 1: Logo y descripción */}
            <div>
              <h3 className="text-[#FF6B00] font-medium mb-3">SparkFound</h3>
              <p className="text-gray-400 text-sm mb-3">
                Soluciones de ciberseguridad avanzada para empresas que buscan protección y tranquilidad en el mundo digital.
              </p>
            </div>

            {/* Columna 2: Enlaces rápidos */}
            <div>
              <h4 className="text-white text-base font-medium mb-3">Enlaces rápidos</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-white text-sm hover:text-[#FF6B00] transition-colors">Inicio</Link></li>
                <li><Link to="/servicios" className="text-white text-sm hover:text-[#FF6B00] transition-colors">Servicios</Link></li>
                <li><Link to="/nosotros" className="text-white text-sm hover:text-[#FF6B00] transition-colors">Nosotros</Link></li>
                <li><Link to="/contacto" className="text-white text-sm hover:text-[#FF6B00] transition-colors">Contacto</Link></li>
              </ul>
            </div>

            {/* Columna 3: Nuestros servicios */}
            <div>
              <h4 className="text-white text-base font-medium mb-3">Nuestros servicios</h4>
              <ul className="space-y-2">
                <li><Link to="/servicios/proteccion" className="text-white text-sm hover:text-[#FF6B00] transition-colors">Protección Avanzada</Link></li>
                <li><Link to="/servicios/cifrado" className="text-white text-sm hover:text-[#FF6B00] transition-colors">Cifrado de Datos</Link></li>
                <li><Link to="/servicios/monitoreo" className="text-white text-sm hover:text-[#FF6B00] transition-colors">Monitoreo 24/7</Link></li>
                <li><Link to="/servicios/analisis" className="text-white text-sm hover:text-[#FF6B00] transition-colors">Análisis de Riesgos</Link></li>
              </ul>
            </div>

            {/* Columna 4: Contacto */}
            <div>
              <h4 className="text-white text-base font-medium mb-3">Contacto</h4>
              <p className="text-sm mb-1"><span className="text-[#FF6B00]">Email:</span> <a href="mailto:info@sparkfound.com" className="text-white hover:text-[#FF6B00] transition-colors">info@sparkfound.com</a></p>
              <p className="text-sm mb-1"><span className="text-[#FF6B00]">Teléfono:</span> <a href="tel:+12345678" className="text-white hover:text-[#FF6B00] transition-colors">+12 345 6789</a></p>
              <p className="text-sm mb-3"><span className="text-[#FF6B00]">Dirección:</span> <span className="text-white">Av. Principal 123, Ciudad</span></p>
              
              <div className="flex space-x-2 mt-2">
                <a href="https://twitter.com" className="text-[#FF6B00] hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="https://linkedin.com" className="text-[#FF6B00] hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Copyright y enlaces de política */}
          <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-xs">&copy; {new Date().getFullYear()} SparkFound. Todos los derechos reservados.</p>
            <div className="mt-3 md:mt-0 flex space-x-4 items-center">
              <Link to="/privacidad" className="text-gray-500 text-xs hover:text-[#FF6B00] transition-colors">Política de Privacidad</Link>
              <Link to="/terminos" className="text-gray-500 text-xs hover:text-[#FF6B00] transition-colors">Términos de Servicio</Link>
              <div className="flex items-center space-x-2 ml-4">
                <a href="/es" className="text-[#FF6B00] text-xs hover:text-[#FF8A3D] transition-colors">ES</a>
                <span className="text-gray-600 text-xs">|</span>
                <a href="/en" className="text-gray-500 text-xs hover:text-white transition-colors">EN</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
