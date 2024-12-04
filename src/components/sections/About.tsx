import React, { useState, useEffect } from 'react';
import { Shield, Target, Users } from 'lucide-react';

const About: React.FC = () => {
  const [stats, setStats] = useState<{ title: string; value: string; label: string }[]>([]);

  useEffect(() => {
    fetch('/aboutData.txt')
      .then(response => response.text())
      .then(content => {
        const data = content.split('\n').slice(0, 3).map(line => {
          const [title, value, label] = line.split(',');
          return { title, value, label };
        });
        setStats(data);
      })
      .catch(error => console.error('Error loading data:', error));
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const data = content.split('\n').slice(0, 3).map(line => {
        const [title, value, label] = line.split(',');
        return { title, value, label };
      });
      setStats(data);
    };
    reader.readAsText(file);
  };

  const icons = [Shield, Target, Users];

  useEffect(() => {
    const updatedStats = stats.map(stat => ({ ...stat, value: stat.value }));
    setStats(updatedStats);
  }, []);

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

        <input type="file" accept=".txt" onChange={handleFileUpload} className="hidden" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div
                key={index}
                className="bg-blue-500/70 backdrop-blur-sm rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300 shadow-2xl border border-gray-700"
              >
                <Icon className="w-10 h-10 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-2 drop-shadow-lg">{stat.title}</h3>
                <p className="text-xl text-white drop-shadow-md">{stat.value}</p>
                <p className="text-sm text-gray-200 drop-shadow-md">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;