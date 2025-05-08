import React, { useRef, useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import { motion } from 'framer-motion';

interface AttackArc {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
  time: number;
}

const CyberAttackMap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any>();
  const [arcs, setArcs] = useState<AttackArc[]>([]);
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });
  const [isVisible, setIsVisible] = useState(false);

  const attackCenters = [
    { name: 'Nueva York', lat: 40.7128, lng: -74.0060 },
    { name: 'Silicon Valley', lat: 37.3875, lng: -122.0575 },
    { name: 'Londres', lat: 51.5074, lng: -0.1278 },
    { name: 'Moscú', lat: 55.7558, lng: 37.6173 },
    { name: 'Beijing', lat: 39.9042, lng: 116.4074 },
    { name: 'Tokio', lat: 35.6762, lng: 139.6503 },
    { name: 'Seúl', lat: 37.5665, lng: 126.9780 },
    { name: 'Tel Aviv', lat: 32.0853, lng: 34.7818 },
    { name: 'Singapur', lat: 1.3521, lng: 103.8198 }
  ];

  const attackTargets = [
    { name: 'Europa', lat: 48.8566, lng: 2.3522 },
    { name: 'Washington DC', lat: 38.9072, lng: -77.0369 },
    { name: 'LATAM', lat: -15.7801, lng: -47.9292 },
    { name: 'Australia', lat: -33.8688, lng: 151.2093 },
    { name: 'Sudáfrica', lat: -33.9249, lng: 18.4241 },
    { name: 'India', lat: 28.6139, lng: 77.2090 },
    { name: 'Medio Oriente', lat: 25.2048, lng: 55.2708 },
    { name: 'Canadá', lat: 43.6532, lng: -79.3832 },
    { name: 'Sudamérica', lat: -34.6037, lng: -58.3816 },
    { name: 'Asia Oriental', lat: 22.3193, lng: 114.1694 },
    { name: 'Escandinavia', lat: 59.9139, lng: 10.7522 }
  ];

  const generateAttack = (): AttackArc => {
    const center = attackCenters[Math.floor(Math.random() * attackCenters.length)];
    const target = attackTargets[Math.floor(Math.random() * attackTargets.length)];
    const jitterLat = (Math.random() - 0.5) * 5;
    const jitterLng = (Math.random() - 0.5) * 5;

    return {
      startLat: center.lat + jitterLat * 0.3,
      startLng: center.lng + jitterLng * 0.3,
      endLat: target.lat + jitterLat,
      endLng: target.lng + jitterLng,
      color: Math.random() > 0.5 ? '#3a97ff' : '#ff7b00',
      time: Math.random() * 8 + 12
    };
  };

  useEffect(() => {
    const handleResize = () => {
      const width = Math.min(window.innerWidth * 0.9, 600);
      const height = width;
      setDimensions({ width, height });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const timer = setTimeout(() => setIsVisible(true), 300);

    const observer = new IntersectionObserver(
      (entries) => setIsVisible(entries[0].isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    setArcs([generateAttack(), generateAttack(), generateAttack()]);

    let attackTimer: NodeJS.Timeout;

    const addSingleAttack = () => {
      setArcs(prev => {
        const remaining = prev.filter(() => Math.random() > 0.15);
        return [...remaining, generateAttack()].slice(0, 10);
      });

      attackTimer = setTimeout(addSingleAttack, Math.random() * 3000 + 3000);
    };

    attackTimer = setTimeout(addSingleAttack, 2000);

    return () => clearTimeout(attackTimer);
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || !globeRef.current) return;

    const controls = globeRef.current.controls();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.enableZoom = false;
      controls.enablePan = false;
    }

    const animate = () => {
      controls.update();
      requestAnimationFrame(animate);
    };

    animate();
  }, [isVisible]);

  return (
    <div
      className="relative w-full h-[600px] flex items-center justify-center overflow-hidden"
      ref={containerRef}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="relative h-full w-full flex items-center justify-center"
      >
        {isVisible && (
          <Globe
            ref={globeRef}
            width={dimensions.width}
            height={dimensions.height}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            backgroundColor="rgba(0, 0, 0, 0)"
            atmosphereColor="rgba(65, 105, 225, 0.4)"
            atmosphereAltitude={0.25}
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
            arcAltitude={0.3}
            arcAltitudeAutoScale={0.4}
            showGraticules={true}
            enablePointerInteraction={false}
          />
        )}
      </motion.div>
    </div>
  );
};

export default CyberAttackMap;
