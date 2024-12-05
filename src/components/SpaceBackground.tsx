import React from 'react';

const SpaceBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden bg-[#0a0a0a] space-background">
      {/* Fondo base con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-900/10 to-blue-900/5"></div>
      
      {/* Capas de nebulosa */}
      <div className="absolute inset-0 nebula-layer nebula-1">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-orange-600/20 via-pink-500/10 to-transparent transform rotate-45 blur-3xl"></div>
      </div>
      <div className="absolute inset-0 nebula-layer nebula-2">
        <div className="absolute top-[10%] right-[10%] w-[80%] h-[80%] bg-gradient-to-bl from-orange-500/20 via-blue-500/10 to-transparent transform rotate-45 blur-2xl"></div>
      </div>
      <div className="absolute inset-0 nebula-layer nebula-3">
        <div className="absolute top-[20%] right-[20%] w-[60%] h-[60%] bg-gradient-to-bl from-orange-500/30 via-pink-500/15 to-transparent transform rotate-45 blur-xl"></div>
      </div>
      
      {/* Rayos de luz */}
      <div className="absolute inset-0 light-beam">
        <div className="absolute -top-[10%] left-[20%] w-[60%] h-[40%] bg-gradient-to-b from-orange-500/25 via-blue-500/10 to-transparent blur-[80px] animate-aurora"></div>
      </div>
      <div className="absolute inset-0 light-beam">
        <div className="absolute top-[30%] right-[10%] w-[40%] h-[60%] bg-gradient-to-t from-blue-500/20 via-orange-500/10 to-transparent blur-[60px] animate-aurora"></div>
      </div>
    </div>
  );
};

export default SpaceBackground;
