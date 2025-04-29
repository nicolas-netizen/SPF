import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar.tsx';
import Landing from './pages/Landing.tsx';
import DynamicBackground from './components/DynamicBackground';
import Footer from './components/Footer.tsx';
import ChatBot from './components/ChatBot';
import ThreatMap from './components/ThreatMap';

// Importar variables CSS globales
import './styles/variables.css';

const App: React.FC = () => {
  // Cargar fuentes adicionales
  useEffect(() => {
    // Agregar enlaces para cargar JetBrains Mono e Inter
    const jetbrainsLink = document.createElement('link');
    jetbrainsLink.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap';
    jetbrainsLink.rel = 'stylesheet';
    
    const interLink = document.createElement('link');
    interLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    interLink.rel = 'stylesheet';
    
    document.head.appendChild(jetbrainsLink);
    document.head.appendChild(interLink);
    
    return () => {
      document.head.removeChild(jetbrainsLink);
      document.head.removeChild(interLink);
    };
  }, []);
  
  // Estados para el mapa de amenazas
  const [showThreatMap, setShowThreatMap] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  
  // Mostrar brevemente el mapa de amenazas cada cierto tiempo
  useEffect(() => {
    // Mostrar inicialmente después de 10 segundos
    const initialTimer = setTimeout(() => {
      setShowThreatMap(true);
      
      // Minimizar automáticamente después de 8 segundos
      const minimizeTimer = setTimeout(() => {
        setIsMinimized(true);
      }, 8000);
      
      return () => clearTimeout(minimizeTimer);
    }, 10000);
    
    return () => clearTimeout(initialTimer);
  }, []);
  
  return (
    <div className="relative min-h-screen overflow-hidden bg-cyber-dark">
      {/* Fondo espacial dinámico */}
      <DynamicBackground />
      
      {/* Contenido principal */}
      <div className="relative z-10">
        <Navbar />
        <Landing />
        <Footer />
        
        {/* Chatbot flotante */}
        <ChatBot />
      </div>
      
      {/* Panel de amenazas flotante (minimizable) */}
      {showThreatMap && (
        <div 
          className={`fixed bottom-6 left-6 z-40 transition-all duration-500 ${isMinimized ? 'max-w-[80px]' : 'w-full max-w-xs xs:max-w-sm'}`}
          style={{
            transform: isMinimized ? 'translateX(-8px)' : 'translateX(0)',
            opacity: 1
          }}
        >
          {/* Botón de minimizar/maximizar */}
          <button 
            onClick={() => setIsMinimized(!isMinimized)}
            className="absolute -top-3 -right-3 bg-cyber-dark border border-neon-cyan/50 rounded-full p-1 z-50 hover:bg-neon-cyan/10 transition-colors"
            aria-label={isMinimized ? "Expandir panel" : "Minimizar panel"}
          >
            {isMinimized ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neon-cyan">
                <polyline points="15 3 21 3 21 9"></polyline>
                <polyline points="9 21 3 21 3 15"></polyline>
                <line x1="21" y1="3" x2="14" y2="10"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neon-cyan">
                <polyline points="4 14 10 14 10 20"></polyline>
                <polyline points="20 10 14 10 14 4"></polyline>
                <line x1="14" y1="10" x2="21" y2="3"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
              </svg>
            )}
          </button>
          
          {/* Botón para cerrar */}
          <button 
            onClick={() => setShowThreatMap(false)}
            className="absolute -top-3 left-2 bg-cyber-dark border border-neon-magenta/50 rounded-full p-1 z-50 hover:bg-neon-magenta/10 transition-colors"
            aria-label="Cerrar panel"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neon-magenta">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          {/* Contenido del mapa */}
          <div className={`overflow-hidden transition-all duration-500 ${isMinimized ? 'opacity-0 h-0' : 'opacity-100'}`}>
            <ThreatMap title="Monitoreo" className="shadow-lg shadow-neon-blue/10 scale-[0.95] origin-bottom-left" />
          </div>
          
          {/* Indicador minimizado */}
          {isMinimized && (
            <div className="bg-cyber-dark-blue border border-neon-cyan/20 rounded-lg p-2 pl-3 flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></div>
              <span className="text-white/70 text-xs">SOC</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;