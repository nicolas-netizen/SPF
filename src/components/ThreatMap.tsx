import React, { useEffect, useRef, useState } from 'react';

interface Threat {
  id: number;
  lat: number;
  lng: number;
  type: 'ransomware' | 'phishing' | 'ddos' | 'malware' | 'intrusion';
  origin: string;
  target: string;
  timestamp: Date;
}

interface ThreatMapProps {
  title?: string;
  className?: string;
}

const ThreatMap: React.FC<ThreatMapProps> = ({
  title = "Detecciones en tiempo real",
  className = ""
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [threats, setThreats] = useState<Threat[]>([]);
  const [activeThreat, setActiveThreat] = useState<Threat | null>(null);
  
  // Coordenadas de ejemplo (países principales)
  const locations = {
    'US': { lat: 37.0902, lng: -95.7129 },
    'UK': { lat: 55.3781, lng: -3.4360 },
    'China': { lat: 35.8617, lng: 104.1954 },
    'Russia': { lat: 61.5240, lng: 105.3188 },
    'Brazil': { lat: -14.2350, lng: -51.9253 },
    'India': { lat: 20.5937, lng: 78.9629 },
    'Germany': { lat: 51.1657, lng: 10.4515 },
    'Argentina': { lat: -38.4161, lng: -63.6167 },
    'Australia': { lat: -25.2744, lng: 133.7751 },
    'Spain': { lat: 40.4168, lng: -3.7038 },
  };
  
  const countries = Object.keys(locations);
  
  const threatTypes = ['ransomware', 'phishing', 'ddos', 'malware', 'intrusion'];
  const typeColors = {
    'ransomware': '#f837ff', // magenta
    'phishing': '#0affe9',   // cyan
    'ddos': '#ff5500',       // orange
    'malware': '#ccff00',    // lime
    'intrusion': '#3633ff',  // blue
  };
  
  // Generar una nueva amenaza aleatoria
  const generateThreat = (): Threat => {
    const origin = countries[Math.floor(Math.random() * countries.length)];
    let target;
    do {
      target = countries[Math.floor(Math.random() * countries.length)];
    } while (target === origin);
    
    const type = threatTypes[Math.floor(Math.random() * threatTypes.length)] as Threat['type'];
    
    return {
      id: Date.now(),
      lat: (locations as any)[target].lat,
      lng: (locations as any)[target].lng,
      type,
      origin,
      target,
      timestamp: new Date()
    };
  };
  
  // Inicializar y animar el mapa
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Establecer dimensiones
    const updateCanvasSize = () => {
      if (!mapRef.current || !canvas) return;
      const rect = mapRef.current.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    // Cargar imagen del mapa
    const worldMap = new Image();
    worldMap.src = '/world-map-outline.png'; // Imagen de mapa mundial (estilo minimalista)
    
    worldMap.onload = () => {
      // Función para dibujar el mapa
      const drawMap = () => {
        if (!ctx || !canvas) return;
        
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Dibujar mapa base (líneas de contorno)
        ctx.globalAlpha = 0.15;
        ctx.drawImage(worldMap, 0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        
        // Dibujar grid
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 102, 204, 0.1)';
        ctx.lineWidth = 0.5;
        
        // Líneas horizontales
        for (let i = 0; i <= canvas.height; i += 40) {
          ctx.moveTo(0, i);
          ctx.lineTo(canvas.width, i);
        }
        
        // Líneas verticales
        for (let i = 0; i <= canvas.width; i += 40) {
          ctx.moveTo(i, 0);
          ctx.lineTo(i, canvas.height);
        }
        
        ctx.stroke();
        
        // Dibujar amenazas
        threats.forEach(threat => {
          // Convertir coordenadas lat/lng a coordenadas del canvas
          const x = ((threat.lng + 180) / 360) * canvas.width;
          const y = ((90 - threat.lat) / 180) * canvas.height;
          
          // Dibujar resplandor
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 20);
          gradient.addColorStop(0, (typeColors as any)[threat.type]);
          gradient.addColorStop(1, 'transparent');
          
          ctx.beginPath();
          ctx.fillStyle = gradient;
          ctx.arc(x, y, 20, 0, Math.PI * 2);
          ctx.fill();
          
          // Dibujar punto central
          ctx.beginPath();
          ctx.fillStyle = (typeColors as any)[threat.type];
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fill();
          
          // Dibujar línea desde origen a destino si es la amenaza activa
          if (activeThreat && activeThreat.id === threat.id) {
            const originX = ((locations as any)[threat.origin].lng + 180) / 360 * canvas.width;
            const originY = ((90 - (locations as any)[threat.origin].lat) / 180) * canvas.height;
            
            // Línea curva
            ctx.beginPath();
            ctx.strokeStyle = (typeColors as any)[threat.type];
            ctx.lineWidth = 1;
            
            // Controlar la curvatura de la línea basado en la distancia
            const dx = x - originX;
            const dy = y - originY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const curveFactor = dist / 3;
            
            // Punto de control para la curva (altura proporcional a la distancia)
            const cpX = (originX + x) / 2;
            const cpY = (originY + y) / 2 - curveFactor;
            
            ctx.beginPath();
            ctx.moveTo(originX, originY);
            ctx.quadraticCurveTo(cpX, cpY, x, y);
            ctx.stroke();
            
            // Punto de origen
            ctx.beginPath();
            ctx.fillStyle = (typeColors as any)[threat.type];
            ctx.arc(originX, originY, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      };
      
      // Iniciar animación
      let animationFrame: number;
      const animate = () => {
        drawMap();
        animationFrame = requestAnimationFrame(animate);
      };
      
      animate();
      
      // Limpiar al desmontar
      return () => {
        cancelAnimationFrame(animationFrame);
      };
    };
    
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [threats, activeThreat]);
  
  // Generar nuevas amenazas periódicamente
  useEffect(() => {
    // Generar amenaza inicial
    const initialThreats = Array.from({ length: 5 }, () => generateThreat());
    setThreats(initialThreats);
    
    // Generar nueva amenaza cada 3-7 segundos
    const interval = setInterval(() => {
      const newThreat = generateThreat();
      
      setThreats(prev => {
        // Mantener hasta 10 amenazas, eliminando las más antiguas
        const updated = [...prev, newThreat];
        if (updated.length > 10) {
          return updated.slice(-10);
        }
        return updated;
      });
      
      // Mostrar información detallada sobre la amenaza durante unos segundos
      setActiveThreat(newThreat);
      setTimeout(() => {
        setActiveThreat(null);
      }, 5000);
      
    }, Math.random() * 4000 + 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Formatear fecha
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };
  
  return (
    <div className={`relative rounded-xl overflow-hidden border border-neon-blue/20 bg-cyber-dark-blue/60 backdrop-blur-glass ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-cyber-dark-blue to-cyber-dark p-4 border-b border-neon-blue/20">
        <h3 className="text-white text-lg font-medium flex items-center">
          <span className="w-3 h-3 rounded-full bg-neon-cyan animate-pulse mr-2"></span>
          {title}
        </h3>
      </div>
      
      {/* Mapa */}
      <div ref={mapRef} className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-cyber-dark-blue/30">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>
      
      {/* Panel de información */}
      <div className="p-4 border-t border-neon-blue/20 bg-cyber-dark/50">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            {threatTypes.map(type => (
              <div key={type} className="flex items-center">
                <span 
                  className="w-3 h-3 rounded-full mr-1"
                  style={{ backgroundColor: (typeColors as any)[type] }}
                ></span>
                <span className="text-white/70 text-xs capitalize">{type}</span>
              </div>
            ))}
          </div>
          
          <div className="text-white/70 text-xs">
            {activeThreat ? (
              <span className="animate-pulse">Nuevo ataque detectado</span>
            ) : (
              <span>Monitoreo activo</span>
            )}
          </div>
        </div>
        
        {/* Información de amenaza activa */}
        {activeThreat && (
          <div className="mt-3 p-3 rounded-lg bg-white/5 border border-white/10 text-white/90 text-sm">
            <div className="flex justify-between">
              <span className="font-medium capitalize" style={{ color: (typeColors as any)[activeThreat.type] }}>
                {activeThreat.type}
              </span>
              <span className="text-xs opacity-70">{formatTime(activeThreat.timestamp)}</span>
            </div>
            <div className="mt-1">
              Origen: <span className="font-mono text-neon-lime">{activeThreat.origin}</span> → 
              Destino: <span className="font-mono text-neon-orange">{activeThreat.target}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreatMap;
