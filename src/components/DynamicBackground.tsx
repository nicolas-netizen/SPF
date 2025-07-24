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
    
    // Reduciendo la cantidad de estrellas para mejor rendimiento
    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        // Velocidad reducida significativamente para movimiento más lento
        speed: Math.random() * 0.02 + 0.004, // Reducido de 0.05 a 0.02
        color: neonColors[Math.floor(Math.random() * neonColors.length)],
        // Velocidad de parpadeo reducida para un efecto más sutil
        twinkleSpeed: Math.random() * 0.005 + 0.002, // Reducido para parpadeo más lento
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }
    
    starsRef.current = stars;

    // Crear estrellas fugaces
    const shootingStars: {x: number, y: number, len: number, speed: number, active: boolean, alpha: number}[] = [];
    for (let i = 0; i < 2; i++) {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5,
        len: Math.random() * 120 + 80,
        speed: Math.random() * 8 + 6,
        active: false,
        alpha: 0
      });
    }

    // Función de dibujo con gradiente animado y auroras
    let animationPhase = 0;
    let auroraPhase = 0;
    const draw = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fondo base con gradiente animado
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

      // Auroras boreales animadas
      for (let i = 0; i < 2; i++) {
        const auroraGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        auroraGradient.addColorStop(0, 'rgba(10,255,233,0.08)');
        auroraGradient.addColorStop(0.5, i === 0 ? 'rgba(59,130,246,0.18)' : 'rgba(255,107,0,0.13)');
        auroraGradient.addColorStop(1, 'rgba(248,55,255,0.10)');
        ctx.save();
        ctx.globalAlpha = 0.5 + 0.2 * Math.sin(auroraPhase * 0.008 + i);
        ctx.beginPath();
        ctx.moveTo(0, canvas.height * (0.18 + i * 0.12) + Math.sin(auroraPhase * 0.01 + i) * 30);
        for (let x = 0; x <= canvas.width; x += 10) {
          ctx.lineTo(
            x,
            canvas.height * (0.18 + i * 0.12) +
              Math.sin(auroraPhase * 0.01 + i + x * 0.002) * 30 +
              Math.cos(auroraPhase * 0.02 + i + x * 0.001) * 10
          );
        }
        ctx.lineTo(canvas.width, 0);
        ctx.lineTo(0, 0);
        ctx.closePath();
        ctx.fillStyle = auroraGradient;
        ctx.fill();
        ctx.restore();
      }

      // Estrellas
      stars.forEach(star => {
        const twinkle = Math.sin(animationPhase * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * twinkle, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.opacity * twinkle;
        ctx.shadowBlur = star.size * 5;
        ctx.shadowColor = star.color;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      // Estrellas fugaces
      shootingStars.forEach(star => {
        if (!star.active && Math.random() < 0.002) {
          star.x = Math.random() * canvas.width * 0.7;
          star.y = Math.random() * canvas.height * 0.4;
          star.len = Math.random() * 120 + 80;
          star.speed = Math.random() * 8 + 6;
          star.alpha = 1;
          star.active = true;
        }
        if (star.active) {
          ctx.save();
          ctx.globalAlpha = star.alpha;
          ctx.strokeStyle = 'white';
          ctx.shadowColor = '#0affe9';
          ctx.shadowBlur = 18;
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(star.x + star.len, star.y + star.len * 0.2);
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();
          star.x += star.speed;
          star.y += star.speed * 0.2;
          star.alpha -= 0.012;
          if (star.x > canvas.width || star.y > canvas.height || star.alpha <= 0) {
            star.active = false;
          }
        }
      });

      animationPhase += 0.6;
      auroraPhase += 1.2;
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
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
