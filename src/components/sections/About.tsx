import React, { useState, useEffect, useRef } from 'react';
import { Shield, Target, Users } from 'lucide-react';

interface CounterProps {
  end: number;
}

const Counter: React.FC<CounterProps> = ({ end }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<number>(0);
  const rafRef = useRef<number>();
  const ANIMATION_DURATION = 10000;

  const animateCounter = () => {
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / ANIMATION_DURATION, 1);
      const easeOutQuad = progress * (2 - progress);
      countRef.current = Math.floor(startValue + easeOutQuad * (end - startValue));
      setCount(countRef.current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setCount(0);
    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    animateCounter();
  }, [end]);

  return (
    <span className="counter-value font-bold text-4xl glow-orange">
      {count.toLocaleString()}
    </span>
  );
};

const About: React.FC = () => {
  const [stats, setStats] = useState<{ title: string; value: string; label: string }[]>([]);
  const icons = [Shield, Target, Users];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/aboutData.txt');
        const content = await response.text();
        const data = content
          .split('\n')
          .filter((line) => line.trim())
          .map((line) => {
            const [title, value, label] = line.split(',');
            return {
              title: title.trim(),
              value: value.trim(),
              label: label.trim(),
            };
          });
        setStats(data);
      } catch (error) {
        console.error('Error loading data:', error);
        setStats([
          { title: 'Log Management', value: '3000', label: 'Assets' },
          { title: 'Endpoint Detection', value: '1200', label: 'Devices' },
          { title: 'Total Assets', value: '1500', label: 'Monitored' },
        ]);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="about" className="min-h-screen py-20 relative overflow-hidden">
      <div className="stars-overlay absolute inset-0 pointer-events-none"></div>
      <div className="container mx-auto px-8 relative z-10 max-w-[1800px]">
        <div className="text-center mb-20">
          <h1 className="text-6xl lg:text-7xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 animate-gradient drop-shadow-lg">
            Monitored Assets Overview
          </h1>

          <p className="text-4xl lg:text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 animate-gradient drop-shadow-lg">
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
                className="stat-card transform hover:scale-105 transition-all duration-500 bg-gradient-to-br from-[#8B5CF6]/20 via-[#A78BFA]/20 to-[#C084FC]/20 rounded-3xl p-12 backdrop-blur-xl border border-[#8B5CF6]/30 shadow-2xl flex flex-col items-center justify-between min-h-[300px] hover:shadow-glow"
              >
                <div className="text-center">
                  <div className="icon-wrapper mb-6">
                    <Icon className="w-16 h-16 mx-auto text-[#8B5CF6] opacity-90 hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-semibold mb-6 text-white">
                    {stat.label}
                  </h3>
                </div>
                <div className="w-full text-center">
                  <p className="text-5xl lg:text-6xl font-bold text-[#8B5CF6]">
                    <Counter end={value} />
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
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: -200% -200%;
          }
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

        .hover\:shadow-glow {
          box-shadow: 0 0 20px 8px rgba(139, 92, 246, 0.3);
        }

        .glow-orange {
          color: #FF6B35;
          text-shadow: 
            0px 0px 10px rgba(255, 107, 53, 0.7), 
            0px 0px 20px rgba(255, 107, 53, 0.5),
            0px 0px 30px rgba(255, 107, 53, 0.3);
          animation: pulse-orange 2s infinite alternate;
        }

        @keyframes pulse-orange {
          0% {
            text-shadow: 
              0px 0px 10px rgba(255, 107, 53, 0.7), 
              0px 0px 20px rgba(255, 107, 53, 0.5),
              0px 0px 30px rgba(255, 107, 53, 0.3);
          }
          100% {
            text-shadow: 
              0px 0px 15px rgba(255, 107, 53, 0.9), 
              0px 0px 25px rgba(255, 107, 53, 0.7),
              0px 0px 35px rgba(255, 107, 53, 0.5);
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
      `}</style>
    </section>
  );
};

export default About;
