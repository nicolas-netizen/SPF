import React, { useRef, useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import { motion } from 'framer-motion';

// Tipos para los arcos de ataque
interface AttackArc {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
  time: number;
}

const CyberAtackMap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [arcs, setArcs] = useState<AttackArc[]>([]);
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });
  const [isVisible, setIsVisible] = useState(false);

  // Generar ataques aleatorios
  const generateAttacks = (count: number): AttackArc[] => {
    return Array.from({ length: count }, () => {
      const startLat = (Math.random() - 0.5) * 180;
      const startLng = (Math.random() - 0.5) * 360;
      const endLat = (Math.random() - 0.5) * 180;
      const endLng = (Math.random() - 0.5) * 360;
      
      return {
        startLat,
        startLng,
        endLat,
        endLng,
        color: Math.random() > 0.5 ? '#3a97ff' : '#ff7b00', // Azul y naranja
        time: Math.random() * 8 + 2 // Entre 2 y 10 segundos
      };
    });
  };

  // Ajustar tamaño según la ventana
  useEffect(() => {
    const handleResize = () => {
      const width = Math.min(window.innerWidth * 0.9, 600);
      const height = width; // Mantener proporción cuadrada
      setDimensions({ width, height });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Detectar cuando el componente es visible
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => setIsVisible(entries[0].isIntersecting),
      { threshold: 0.2 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Generar y actualizar ataques
  useEffect(() => {
    if (!isVisible) return;

    // Ataques iniciales
    setArcs(generateAttacks(10));

    // Actualizar ataques periódicamente
    const interval = setInterval(() => {
      setArcs(prev => {
        const remaining = prev.filter(() => Math.random() > 0.2);
        const newArcs = generateAttacks(3);
        return [...remaining, ...newArcs].slice(0, 15);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isVisible]);

  // Rotación automática
  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    let angle = 0;
    let animationId: number;

    const rotateGlobe = () => {
      const globeEl = containerRef.current?.querySelector('canvas');
      if (globeEl) {
        try {
          const threeObj = (globeEl as any).__globe;
          if (threeObj && threeObj.rotation) {
            angle += 0.002;
            threeObj.rotation.y = angle;
          }
        } catch (e) {
          // Silenciar errores
        }
      }
      animationId = requestAnimationFrame(rotateGlobe);
    };

    rotateGlobe();
    return () => cancelAnimationFrame(animationId);
  }, [isVisible]);

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden" ref={containerRef}>
      {/* Fondo sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-purple-900/5 to-indigo-900/10"></div>
      
      {/* Brillo central */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-3xl"></div>
      
      {/* Globo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="relative h-full w-full flex items-center justify-center"
      >
        {isVisible && (
          <Globe
            width={dimensions.width}
            height={dimensions.height}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            backgroundColor="rgba(13, 4, 41, 0)" // Fondo transparente
            atmosphereColor="rgba(65, 105, 225, 0.6)"
            atmosphereAltitude={0.2}
            arcsData={arcs}
            arcStartLat="startLat"
            arcStartLng="startLng"
            arcEndLat="endLat"
            arcEndLng="endLng"
            arcColor="color"
            arcDashLength={0.4}
            arcDashGap={0.2}
            arcDashAnimateTime={(d: any) => d.time * 1000}
            arcsTransitionDuration={800}
            arcStroke={1.2}
            showGraticules={true}
          />
        )}
      </motion.div>
    </div>
  );
};

export default CyberAtackMap;