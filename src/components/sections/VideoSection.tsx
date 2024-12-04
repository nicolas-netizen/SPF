import React, { useRef, useEffect, useState } from 'react';

const VideoSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
          if (entry.isIntersecting && videoRef.current) {
            videoRef.current.play();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-purple-900/10 to-orange-900/20 pointer-events-none" />
      <div className="absolute -inset-x-40 inset-y-0 bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10 transform rotate-12 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-4">
            Nuestro Centro de Operaciones
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Descubre cómo nuestro equipo de expertos monitorea y protege tu infraestructura 24/7
            desde nuestro centro de operaciones de seguridad de última generación.
          </p>
        </div>

        <div className={`relative rounded-2xl overflow-hidden transform transition-all duration-1000 ${
          isInView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          {/* Video overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent pointer-events-none z-10" />
          
          {/* Glowing border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-orange-500/30 animate-pulse" style={{ filter: 'blur(20px)' }} />
          
          {/* Video container */}
          <div className="relative z-0 rounded-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
            <video
              ref={videoRef}
              className="w-full h-auto"
              loop
              muted
              playsInline
              poster="/video-poster.jpg"
            >
              <source src="/nsoc.mp4" type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>
          </div>

          {/* Interactive overlay */}
          <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/40">
            <div className="text-white text-center p-6 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold mb-2">Centro de Operaciones SPF</h3>
              <p className="text-gray-200">Monitoreo continuo y respuesta inmediata</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
