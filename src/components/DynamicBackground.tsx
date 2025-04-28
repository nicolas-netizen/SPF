import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  color: string;
  twinkleSpeed: number;
  twinklePhase: number;
}

const DynamicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const rafRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Ajustar canvas al tamaño de la ventana
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Crear estrellas
    const stars: Star[] = [];
    const neonColors = ['#0affe9', '#f837ff', '#ccff00', '#FF6B00', '#0066CC'];
    
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        speed: Math.random() * 0.05 + 0.01,
        color: neonColors[Math.floor(Math.random() * neonColors.length)],
        twinkleSpeed: Math.random() * 0.01 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }
    
    starsRef.current = stars;
    
    // Función de dibujo con gradiente animado
    let animationPhase = 0;
    const draw = () => {
      if (!canvas || !ctx) return;
      
      // Limpiar canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Dibujar gradiente animado de fondo
      const gradient = ctx.createLinearGradient(
        canvas.width * Math.sin(animationPhase * 0.01) * 0.5 + canvas.width * 0.5,
        0,
        canvas.width * Math.cos(animationPhase * 0.01) * 0.5 + canvas.width * 0.5,
        canvas.height
      );
      
      gradient.addColorStop(0, '#0a0521');
      gradient.addColorStop(0.3, '#121b3b');
      gradient.addColorStop(0.6, '#1a1342');
      gradient.addColorStop(1, '#150d35');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Dibujar estrellas
      stars.forEach(star => {
        // Calcular opacidad con efecto de parpadeo
        const twinkle = Math.sin(animationPhase * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.7;
        
        // Dibujar estrella
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * twinkle, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.opacity * twinkle;
        
        // Añadir resplandor
        ctx.shadowBlur = star.size * 5;
        ctx.shadowColor = star.color;
        
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
        
        // Mover estrella
        star.y += star.speed;
        
        // Reposicionar si sale de la pantalla
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
      
      // Incrementar fase de animación
      animationPhase += 1;
      
      // Solicitar siguiente cuadro
      rafRef.current = requestAnimationFrame(draw);
    };
    
    // Iniciar animación
    rafRef.current = requestAnimationFrame(draw);
    
    // Limpiar al desmontar
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default DynamicBackground;
