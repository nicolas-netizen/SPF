import React, { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: 'tilt' | 'raise' | 'glow' | 'none';
  borderColor?: string; // Color del borde, puede ser un color de tailwind
  glowColor?: string; // Color del resplandor al hacer hover
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hoverEffect = 'raise',
  borderColor = 'border-white/10',
  glowColor = 'neon-cyan',
  onClick
}) => {
  // Determinamos las clases de hover basadas en el efecto solicitado
  let hoverClasses = '';
  
  switch (hoverEffect) {
    case 'tilt':
      hoverClasses = 'hover:transform hover:-rotate-1 hover:scale-[1.02] transition-transform';
      break;
    case 'raise':
      hoverClasses = 'transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg';
      break;
    case 'glow':
      hoverClasses = `transition-all duration-300 hover:shadow-lg hover:shadow-${glowColor}/20`;
      break;
    case 'none':
      hoverClasses = '';
      break;
  }

  return (
    <div 
      className={`
        bg-black/30 backdrop-blur-glass rounded-xl
        border ${borderColor} 
        shadow-md
        ${hoverClasses}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassCard;
