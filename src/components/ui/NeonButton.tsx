import React, { ReactNode } from 'react';

interface NeonButtonProps {
  children: ReactNode;
  color?: 'cyan' | 'magenta' | 'orange' | 'lime';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  href?: string;
  onClick?: () => void;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  animate?: boolean;
}

const NeonButton: React.FC<NeonButtonProps> = ({
  children,
  color = 'orange',
  size = 'md',
  className = '',
  href,
  onClick,
  fullWidth = false,
  icon,
  iconPosition = 'right',
  animate = false
}) => {
  // Configuración de colores basada en el color seleccionado
  const colorConfig = {
    cyan: {
      bg: 'bg-neon-cyan/10 hover:bg-neon-cyan/20',
      text: 'text-neon-cyan',
      border: 'border-neon-cyan/30',
      shadow: 'shadow-neon-cyan',
      glow: 'group-hover:drop-shadow-neon-cyan'
    },
    magenta: {
      bg: 'bg-neon-magenta/10 hover:bg-neon-magenta/20',
      text: 'text-neon-magenta',
      border: 'border-neon-magenta/30',
      shadow: 'shadow-neon-magenta',
      glow: 'group-hover:drop-shadow-neon-magenta'
    },
    orange: {
      bg: 'bg-primary/10 hover:bg-primary/20',
      text: 'text-primary',
      border: 'border-primary/30',
      shadow: 'shadow-neon-orange',
      glow: 'group-hover:drop-shadow-neon-orange'
    },
    lime: {
      bg: 'bg-neon-lime/10 hover:bg-neon-lime/20',
      text: 'text-neon-lime',
      border: 'border-neon-lime/30',
      shadow: 'shadow-neon-cyan',
      glow: 'group-hover:drop-shadow-neon-cyan'
    }
  };

  // Configuración de tamaño
  const sizeConfig = {
    sm: 'text-sm py-2 px-4',
    md: 'text-base py-3 px-6',
    lg: 'text-lg py-4 px-8'
  };

  // Crear el elemento de botón o enlace
  const ButtonContent = (
    <div className="relative overflow-hidden group">
      <div className={`
        ${colorConfig[color].bg}
        ${colorConfig[color].text}
        ${colorConfig[color].border}
        ${sizeConfig[size]}
        ${fullWidth ? 'w-full' : ''}
        font-medium rounded-full border 
        transition-all duration-300
        flex items-center justify-center gap-2
        ${animate ? 'animate-pulse-slow' : ''}
        ${className}
      `}>
        {/* Agregar icono a la izquierda si existe */}
        {icon && iconPosition === 'left' && (
          <span className={`transition-transform duration-300 ${animate ? 'group-hover:scale-110' : ''}`}>
            {icon}
          </span>
        )}
        
        {/* Texto del botón */}
        <span className={`${colorConfig[color].glow} transition-all duration-300`}>
          {children}
        </span>
        
        {/* Agregar icono a la derecha si existe */}
        {icon && iconPosition === 'right' && (
          <span className={`transition-transform duration-300 ${animate ? 'group-hover:translate-x-1' : ''}`}>
            {icon}
          </span>
        )}
      </div>
      
      {/* Efecto de resplandor al hacer hover */}
      <div className={`
        absolute -inset-0.5 rounded-full opacity-0 group-hover:opacity-30
        transition-opacity duration-300 blur-md ${colorConfig[color].bg}
      `} />
    </div>
  );

  // Devolver como enlace o botón según corresponda
  return href ? (
    <a href={href} onClick={onClick} className={fullWidth ? 'block w-full' : 'inline-block'}>
      {ButtonContent}
    </a>
  ) : (
    <button onClick={onClick} className={fullWidth ? 'block w-full' : 'inline-block'}>
      {ButtonContent}
    </button>
  );
};

export default NeonButton;
