import React from 'react';
import About from './components/sections/About';
import SpaceBackground from './components/SpaceBackground';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fondo espacial */}
      <SpaceBackground />
      
      {/* Contenido principal */}
      <div className="relative z-10">
        <About />
      </div>
    </div>
  );
};

export default App;