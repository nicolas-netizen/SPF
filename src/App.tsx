import React from 'react';
import Navbar from './components/Navbar.tsx';
import Landing from './pages/Landing.tsx';
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
        <Landing />
        <Footer />
      </div>
    </div>
  );
};

export default App;