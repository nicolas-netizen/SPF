import React from 'react';

interface SectionSeparatorProps {
  type?: 'gradient' | 'wave' | 'line' | 'cyber-grid' | 'security-pulse' | 'data-flow';
  className?: string;
  color?: 'blue' | 'cyan' | 'orange';
}

const SectionSeparator: React.FC<SectionSeparatorProps> = ({ 
  type = 'gradient',
  className = '',
  color = 'blue'
}) => {
  // Color mapping for theme consistency
  const colorMap = {
    blue: {
      primary: '#0284c7', // sky-600
      secondary: '#0ea5e9', // sky-500
      tertiary: '#38bdf8', // sky-400
      light: '#7dd3fc', // sky-300
    },
    cyan: {
      primary: '#0891b2', // cyan-600
      secondary: '#06b6d4', // cyan-500
      tertiary: '#22d3ee', // cyan-400
      light: '#67e8f9', // cyan-300
    },
    orange: {
      primary: '#ea580c', // orange-600
      secondary: '#f97316', // orange-500
      tertiary: '#fb923c', // orange-400
      light: '#fdba74', // orange-300
    }
  };

  const selectedColors = colorMap[color];

  if (type === 'cyber-grid') {
    return (
      <div className={`relative w-full h-20 overflow-hidden ${className}`} aria-hidden="true">
        {/* Background grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cyber-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke={selectedColors.tertiary} strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cyber-grid)" />
          </svg>
        </div>
        
        {/* Center line with nodes */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-center">
          <div className="w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-white/20 to-transparent relative">
            {/* Circuit points along the line */}
            {[0.1, 0.3, 0.5, 0.7, 0.9].map((position, index) => (
              <div 
                key={`node-${index}`}
                className={`absolute top-1/2 -translate-y-1/2`} 
                style={{ left: `${position * 100}%` }}
              >
                <div className={`w-2 h-2 rounded-full bg-${color}-400/70 animate-pulse`} 
                     style={{ animationDelay: `${index * 0.3}s` }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* Animated data flows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent animate-dataFlow" style={{animationDuration: '2s'}}></div>
          <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent animate-dataFlow" style={{animationDuration: '2.2s', animationDelay: '0.5s'}}></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent animate-dataFlow" style={{animationDuration: '3s', animationDelay: '0.8s'}}></div>
        </div>
      </div>
    );
  }

  if (type === 'security-pulse') {
    return (
      <div className={`relative w-full py-8 overflow-hidden ${className}`} aria-hidden="true">
        <div className="flex justify-center items-center">
          {/* Center security node */}
          <div className="relative">
            {/* Pulsing rings */}
            <div className="absolute -inset-4 rounded-full border border-white/5 animate-ping" style={{animationDuration: '3s'}}></div>
            <div className="absolute -inset-8 rounded-full border border-white/5 animate-ping" style={{animationDuration: '3.5s', animationDelay: '0.5s'}}></div>
            <div className="absolute -inset-12 rounded-full border border-white/5 animate-ping" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
            
            {/* Center lock icon */}
            <div className="relative w-8 h-8 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm z-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={selectedColors.light}>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Horizontal connecting lines */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex justify-center items-center space-x-2">
          <div className="flex-grow h-px bg-gradient-to-r from-transparent to-white/20 max-w-xs"></div>
          <div className="flex-grow h-px bg-gradient-to-l from-transparent to-white/20 max-w-xs"></div>
        </div>
      </div>
    );
  }
  
  if (type === 'data-flow') {
    return (
      <div className={`relative w-full h-16 overflow-hidden ${className}`} aria-hidden="true">
        {/* Binary background */}
        <div className="absolute inset-0 flex justify-center">
          <div className="w-full max-w-4xl h-full overflow-hidden opacity-5">
            <div className="animate-scrollY font-mono text-[10px] leading-tight" style={{animationDuration: '20s'}}>
              {Array(20).fill(0).map((_, rowIndex) => (
                <div key={`row-${rowIndex}`} className="flex">
                  {Array(100).fill(0).map((_, colIndex) => (
                    <span key={`cell-${rowIndex}-${colIndex}`} className="mx-px">
                      {Math.random() > 0.5 ? '1' : '0'}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Network flow lines */}
        <div className="absolute inset-0 flex justify-center items-center">
          <svg className="w-full max-w-6xl" height="2" viewBox="0 0 1000 2">
            <line x1="0" y1="1" x2="1000" y2="1" stroke="url(#network-gradient)" strokeWidth="2" strokeDasharray="2,2" />
            <defs>
              <linearGradient id="network-gradient">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="10%" stopColor={selectedColors.light} />
                <stop offset="50%" stopColor="white" />
                <stop offset="90%" stopColor={selectedColors.light} />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>

            {/* Data packets */}
            <circle cx="250" cy="1" r="3" fill={selectedColors.tertiary} className="animate-dataPacket" style={{animationDuration: '3s'}} />
            <circle cx="500" cy="1" r="3" fill="white" className="animate-dataPacket" style={{animationDuration: '4s', animationDelay: '1s'}} />
            <circle cx="750" cy="1" r="3" fill={selectedColors.tertiary} className="animate-dataPacket" style={{animationDuration: '3.5s', animationDelay: '2s'}} />
          </svg>
        </div>
      </div>
    );
  }

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
  
  // Line separator (default)
  return (
    <div className={`w-full flex justify-center py-8 ${className}`}>
      <div className="w-full max-w-6xl h-px bg-white/10"></div>
    </div>
  );
};

export default SectionSeparator;
