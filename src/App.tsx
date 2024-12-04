import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Contacto from './pages/Contacto.tsx';
import SpaceBackground from './components/SpaceBackground.tsx';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fondo espacial */}
      <SpaceBackground />
      
      {/* Contenido principal */}
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;