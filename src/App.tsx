import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Home from './pages/Home.tsx';
import Contacto from './pages/Contacto.tsx';
import SpaceBackground from './components/SpaceBackground.tsx';
import Footer from './components/Footer.tsx';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fondo espacial */}
      <SpaceBackground />
      
      {/* Contenido principal */}
      <div className="relative z-10">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;