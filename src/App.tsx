import React, { useEffect, useState, lazy, Suspense } from 'react';
import Navbar from './components/Navbar.tsx';


// Importar componentes pesados con lazy loading
const Landing = lazy(() => import('./pages/Landing.tsx'));
const DynamicBackground = lazy(() => import('./components/DynamicBackground'));
const Footer = lazy(() => import('./components/Footer.tsx'));
const ChatBot = lazy(() => import('./components/ChatBot'));

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
  
  return (
    <div className="relative min-h-screen overflow-hidden bg-cyber-dark">
      {/* Fondo espacial dinámico con Suspense fallback */}
      <Suspense fallback={<div className="absolute inset-0 bg-cyber-dark"></div>}>
        <DynamicBackground />
      </Suspense>
      
      {/* Contenido principal */}
      <div className="relative z-10">
        <Navbar />

        <Suspense fallback={
          <div className="flex items-center justify-center h-screen">
            <div className="w-12 h-12 border-t-2 border-b-2 border-neon-cyan rounded-full animate-spin"></div>
          </div>
        }>
          <Landing />
        </Suspense>
        <Suspense fallback={<div className="h-40 bg-cyber-dark"></div>}>
          <Footer />
        </Suspense>
        
        {/* Chatbot flotante */}
        <Suspense fallback={<></>}>
          <ChatBot />
        </Suspense>
      </div>
    </div>
  );
};

export default App;