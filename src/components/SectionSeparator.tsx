import React from 'react';

interface SectionSeparatorProps {
  type?: 'gradient' | 'wave' | 'line';
  className?: string;
}

const SectionSeparator: React.FC<SectionSeparatorProps> = ({ 
  type = 'gradient',
  className = ''
}) => {
  if (type === 'gradient') {
    return (
      <div className={`h-24 w-full bg-gradient-to-b from-transparent to-white/5 ${className}`} 
           aria-hidden="true" />
    );
  }
  
  if (type === 'wave') {
    return (
      <div className={`w-full overflow-hidden ${className}`}>
        <svg 
          className="w-full h-12 md:h-24" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          fill="rgba(255, 255, 255, 0.05)"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          />
        </svg>
      </div>
    );
  }
  
  // Line separator
  return (
    <div className={`w-full flex justify-center py-12 ${className}`}>
      <div className="w-full max-w-6xl h-px bg-white/10"></div>
    </div>
  );
};

export default SectionSeparator;
