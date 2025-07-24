import React, { useRef, useEffect, useState } from 'react';
import AnimatedText from '../AnimatedText';
import { ArrowRight, Eye, Shield, Activity } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import NeonButton from '../ui/NeonButton';
import DynamicBackground from '../DynamicBackground';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Hero: React.FC = () => {
  const particleRef = useRef<HTMLDivElement>(null);
  
  // Efecto para animación de partículas - versión mejorada
  useEffect(() => {
    if (!particleRef.current || prefersReducedMotion()) return;
    
    const PARTICLE_COUNT = 20; // Menos partículas iniciales
    const PARTICLE_INTERVAL = 500; // Intervalo más largo
    let animationFrameId: number;
    let lastParticleTime = Date.now();
    
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.classList.add('cyber-particle');
      
      // Posición aleatoria - por toda la pantalla pero evitando el centro
      let posX, posY;
      do {
        posX = Math.random() * 100;
        posY = Math.random() * 100;
        // Evitar el centro (25% - 75% en ambos ejes)
        // Solo continuar si está fuera del centro
      } while (posX > 30 && posX < 70 && posY > 30 && posY < 70);
      
      // Tamaño aleatorio con variación
      const size = Math.random() * 5 + 1;
      
      // Color aleatorio con tonos de la marca
      const colors = ['#FF6B00', '#FF8A3D', '#0066CC', '#0099FF'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      // Establecer estilos
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.background = color;
      particle.style.opacity = (Math.random() * 0.3 + 0.1).toString();
      particle.style.boxShadow = `0 0 ${size * 1.5}px ${color}`; // Brillo sutil
      particle.style.borderRadius = '50%';
      
      // Velocidad y dirección aleatoria
      const speedX = (Math.random() - 0.5) * 2;
      const speedY = (Math.random() - 0.5) * 2;
      
      // Animación flotante
      particle.style.animation = `float ${Math.random() * 15 + 10}s linear infinite`;
      particle.style.setProperty('--speed-x', `${speedX}px`);
      particle.style.setProperty('--speed-y', `${speedY}px`);
      
      particleRef.current?.appendChild(particle);
      
      // Eliminar después de un tiempo
      setTimeout(() => {
        if (particle.parentNode === particleRef.current) {
          particle.style.opacity = '0';
          particle.style.transition = 'opacity 1s';
          setTimeout(() => {
            if (particle.parentNode === particleRef.current) {
              particleRef.current?.removeChild(particle);
            }
          }, 1000);
        }
      }, Math.random() * 12000 + 8000);
    };
    
    // Agregar estilos para la animación float
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes float {
        0% { transform: translate(0, 0); }
        25% { transform: translate(calc(var(--speed-x) * 25), calc(var(--speed-y) * 25)); }
        50% { transform: translate(calc(var(--speed-x) * 15), calc(var(--speed-y) * 40)); }
        75% { transform: translate(calc(var(--speed-x) * 40), calc(var(--speed-y) * 25)); }
        100% { transform: translate(0, 0); }
      }
    `;
    document.head.appendChild(styleSheet);
    
    // Crear partículas cada cierto tiempo
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      createParticle();
    }
    
    const animateParticles = () => {
      const now = Date.now();
      if (now - lastParticleTime > PARTICLE_INTERVAL) {
        createParticle();
        lastParticleTime = now;
      }
      animationFrameId = requestAnimationFrame(animateParticles);
    };
    animationFrameId = requestAnimationFrame(animateParticles);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      // Eliminar el estilo al desmontar
      document.head.removeChild(styleSheet);
    };
  }, []);

  // Detectar scroll para efectos de parallax
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden flex items-center pt-32 pb-16">
      {/* Fondo dinámico con estrellas y gradiente */}
      <DynamicBackground />
      
      {/* Partículas que quedan como segunda capa con efecto parallax */}
      <div 
        ref={particleRef} 
        className="absolute inset-0 z-0 overflow-hidden" 
        style={{
          transform: `translateY(${scrollY * 0.15}px)` // Efecto parallax al hacer scroll
        }}
      />
      
      {/* Código decorativo mejorado con estilo neón */}
      <div 
        className="absolute top-20 right-10 opacity-20 text-neon-cyan text-xs whitespace-pre font-mono z-0 hidden lg:block"
        style={{
          transform: `translateY(${scrollY * -0.2}px)` // Parallax inverso
        }}
      >
        <pre className="backdrop-blur-sm bg-black/10 p-4 rounded-lg border border-neon-cyan/20">
          <code>
          {`// Monitoreo de seguridad 24/7
function detectThreats() {
  const network = new SecureNetwork();
  network.scan();
  return network.vulnerabilities.filter(v => 
    v.riskLevel > THRESHOLD
  );
}`}
          </code>
        </pre>
      </div>
      
      {/* Nodos de red cibernética */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-10">
        <svg width="100%" height="100%" className="absolute inset-0" style={{ transform: `translateY(${scrollY * 0.05}px)` }}>
          <pattern id="cyber-grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="none" stroke="#0066CC" strokeWidth="0.5" opacity="0.3" />
            <circle cx="50" cy="50" r="1" fill="#FF6B00" opacity="0.8" className="animate-pulse-slow" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#cyber-grid)" />
          
          {/* Líneas de conexión */}
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="#FF6B00" strokeWidth="1" strokeDasharray="5,15" opacity="0.2" className="animate-data-flow" />
          <line x1="100%" y1="0" x2="0" y2="100%" stroke="#0099FF" strokeWidth="1" strokeDasharray="5,15" opacity="0.2" className="animate-data-flow" style={{animationDelay: '2s'}} />
        </svg>
      </div>
      
      {/* Estrellas brillantes con efecto de parallax */}
      <div className="absolute inset-0 z-0" style={{ transform: `translateY(${scrollY * -0.1}px)` }}>
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white animate-twinkling"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              boxShadow: i % 3 === 0 ? '0 0 10px 2px rgba(10, 255, 233, 0.7)' : 
                         i % 3 === 1 ? '0 0 10px 2px rgba(255, 107, 0, 0.7)' : 
                                       '0 0 10px 2px rgba(0, 102, 204, 0.7)'
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative">
            <div className="space-y-8 max-w-lg mx-auto md:mx-0">
              
              {/* Título principal con efecto glitch y gradiente neón */}
              <div className="group">
                <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight slide-in relative">
                  <span className="relative inline-block cursor-default">
                    <span className="relative z-10 block bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90 font-inter">
                    Ciberseguridad gestionada 24/7
                    </span>
                    {/* Efecto glitch sutil en hover */}
                    <span className="absolute inset-0 z-0 hidden group-hover:block bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-white/90 animate-glitch opacity-70">DETECCIÓN DE AMENAZAS</span>
                  </span>
                  <br/>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B00] to-neon-orange drop-shadow-neon-orange inline-block">
                    <AnimatedText>adaptada a tu empresa.</AnimatedText>
                  </span>
                </h1>
                {/* Línea decorativa debajo del título */}
                <div className="h-1 w-32 bg-gradient-to-r from-[#FF6B00] to-neon-cyan mt-4 rounded-full animate-pulse-slow"></div>
              </div>
              
              {/* Descripción mejorada con fuente moderna y efecto fade-in */}
              <p className="text-lg text-white/80 fade-in-up delay-100 leading-relaxed max-w-xl font-inter mt-6">
                <span className="font-bold text-neon-cyan">NG-NSOC</span> (Next Generation Network & Security Operations Center) de última generación: <span className="text-[#FF6B00] font-semibold">Monitoreamos, analizamos y respondemos</span> amenazas con tecnologías avanzadas e innovadoras en modalidad como servicio.
              </p>
              
              {/* Features con tarjetas de vidrio y efectos neón */}
              <div className="grid grid-cols-3 gap-6 mt-10 mb-6">
                <GlassCard className="p-5 fade-in-up" hoverEffect="tilt" borderColor="border-neon-cyan/20" glowColor="neon-cyan">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-xl bg-black/30 border border-neon-cyan/30 flex items-center justify-center mb-3 transform transition-all duration-500 group-hover:rotate-12">
                      <Activity className="w-6 h-6 text-neon-cyan" />
                    </div>
                    <p className="text-sm font-medium text-white">Detección 24/7</p>
                  </div>
                </GlassCard>
                
                <GlassCard className="p-5 fade-in-up delay-100" hoverEffect="tilt" borderColor="border-[#FF6B00]/20" glowColor="neon-orange">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-xl bg-black/30 border border-[#FF6B00]/30 flex items-center justify-center mb-3 transform transition-all duration-500 group-hover:rotate-12">
                      <Shield className="w-6 h-6 text-[#FF6B00]" />
                    </div>
                    <p className="text-sm font-medium text-white">Protección Avanzada</p>
                  </div>
                </GlassCard>
                
                <GlassCard className="p-5 fade-in-up delay-200" hoverEffect="tilt" borderColor="border-neon-lime/20" glowColor="neon-cyan">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-xl bg-black/30 border border-neon-lime/30 flex items-center justify-center mb-3 transform transition-all duration-500 group-hover:rotate-12">
                      <Eye className="w-6 h-6 text-neon-lime" />
                    </div>
                    <p className="text-sm font-medium text-white">Vigilancia Inteligente</p>
                  </div>
                </GlassCard>
              </div>
              
              {/* CTA con botón neón */}
              <div className="pt-8 fade-in-up delay-200">
                <NeonButton 
                  color="orange" 
                  size="lg" 
                  animate={true}
                  icon={<ArrowRight className="w-5 h-5" />}
                  href="#contacto"
                  onClick={() => {
                    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Agenda tu reunión
                </NeonButton>
                {/* Eliminado: Botón secundario 'Conoce nuestra tecnología' */}
              </div>
            </div>
          </div>
          
          {/* Modelo 3D con efecto de glassmorphism avanzado */}
          <div className="relative ml-8 animate-rotate-3d">
            {/* Marco de vidrio con efectos de borde neón */}
            <GlassCard className="relative overflow-hidden rounded-2xl backdrop-blur-xl shadow-xl p-6 border-neon-cyan/20" hoverEffect="glow" glowColor="neon-cyan">
              {/* Elementos decorativos de cyberpunk */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-neon-cyan/20 to-transparent blur-2xl animate-pulse-slow"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-br from-[#FF6B00]/20 to-transparent blur-2xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
              
              {/* Líneas decorativas tipo circuito */}
              <div className="absolute top-0 left-0 w-20 h-1 bg-neon-cyan/40 rounded-full"></div>
              <div className="absolute top-0 left-0 w-1 h-20 bg-neon-cyan/40 rounded-full"></div>
              <div className="absolute bottom-0 right-0 w-20 h-1 bg-[#FF6B00]/40 rounded-full"></div>
              <div className="absolute bottom-0 right-0 w-1 h-20 bg-[#FF6B00]/40 rounded-full"></div>
              
              {/* Modelo 3D */}
              <div className="relative z-10 w-full h-full flex items-center justify-center fade-in-up p-2">
                <div className="w-full flex items-center justify-center" style={{ minHeight: 420 }}>
                  {/* Gif animado más grande, sin fondo y con bordes más limpios */}
                  <img 
                    src="/Export animación logo.gif" 
                    alt="Animación Logo SPF" 
                    className="w-full max-w-2xl h-[600px] object-contain rounded-xl shadow-xl border border-white/10"
                    style={{ background: 'transparent' }}
                  />
                </div>
              </div>
            </GlassCard>
            
            {/* Texto explicativo */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-xs text-white/70 border border-white/10 flex items-center">
              <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse mr-2"></span>
              Modelo de seguridad avanzada
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;