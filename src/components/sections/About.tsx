import React, { useState, useEffect, useRef } from 'react';
import { Shield, Target, Users } from 'lucide-react';

interface CounterProps {
  end: number;
}

const Counter: React.FC<CounterProps> = ({ end }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<number>(0);
  const rafRef = useRef<number>();
  const ANIMATION_DURATION = 10000; // 10 segundos para la animación

  const animateCounter = () => {
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / ANIMATION_DURATION, 1);
      
      // Función de easing para hacer la animación más suave y lenta
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      countRef.current = Math.floor(startValue + (easeOutCubic * (end - startValue)));
      setCount(countRef.current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    setCount(0); // Resetear el contador antes de empezar
    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    // Iniciar la primera animación
    animateCounter();

    // Configurar el intervalo de 5 minutos
    const intervalId = setInterval(() => {
      animateCounter();
    }, 5 * 60 * 1000); // 5 minutos en milisegundos

    return () => {
      clearInterval(intervalId);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [end]);

  return (
    <span className="counter-value">
      {count.toLocaleString()}
    </span>
  );
};

const About: React.FC = () => {
  const [stats, setStats] = useState<{ title: string; value: string; label: string }[]>([]);

  useEffect(() => {
    fetch('/aboutData.txt')
      .then(response => response.text())
      .then(content => {
        const data = content.split('\n').filter(line => line.trim()).map(line => {
          const [title, value, label] = line.split(',');
          return { title, value: value.trim(), label: label.trim() };
        });
        setStats(data);
      })
      .catch(error => console.error('Error loading data:', error));
  }, []);

  const icons = [Shield, Target, Users];

  return (
    <section id="about" className="min-h-screen py-20 relative overflow-hidden">
      <div className="stars-overlay absolute inset-0 pointer-events-none"></div>
      <div className="container mx-auto px-8 relative z-10 max-w-[1800px]">
        <div className="text-center mb-20">
          <h1 className="text-6xl lg:text-7xl font-bold mb-8 text-[#7DD3FC] animate-title">
            Monitored Assets Overview
          </h1>
          <p className="text-2xl lg:text-3xl text-gray-400 max-w-4xl mx-auto">
            Security Operations Control Panel
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {stats.map((stat, index) => {
            const Icon = icons[index];
            const value = parseFloat(stat.value);

            return (
              <div
                key={stat.title}
                className="stat-card transform hover:scale-105 transition-all duration-500 bg-[#00000040] rounded-3xl p-12 backdrop-blur-sm border border-[#ffffff10] shadow-2xl flex flex-col items-center justify-between min-h-[300px]"
              >
                <div className="text-center">
                  <div className="icon-wrapper mb-6">
                    <Icon className="w-16 h-16 mx-auto text-[#7DD3FC] opacity-80" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-medium mb-6 text-white opacity-90">
                    {stat.label}
                  </h3>
                </div>
                <div className="w-full text-center">
                  <p className="text-5xl lg:text-6xl font-bold text-[#7DD3FC]">
                    <Counter 
                      end={value}
                    />
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        .stars-overlay {
          background-image: url('/stars.svg');
          background-size: 200% 200%;
          animation: moveStars 30s linear infinite;
        }
        
        @keyframes moveStars {
          0% { background-position: 0 0; }
          100% { background-position: -200% -200%; }
        }

        .stat-card {
          animation: fadeIn 1.5s ease-out;
        }

        @keyframes fadeIn {
          0% { 
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          100% { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-title {
          animation: slideDown 1.2s ease-out;
        }

        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .counter-value {
          display: inline-block;
          min-width: 5ch;
          text-align: center;
        }
      `}</style>
    </section>
  );
};

export default About;