import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 ¡Hola! Soy el asistente virtual de SparkFound. ¿En qué puedo ayudarte hoy?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Respuestas preestablecidas para la demo
  const botResponses = [
    "¿Te gustaría más información sobre nuestra solución de monitoreo 24/7?",
    "Podemos agendar una demo personalizada para tu empresa. ¿Te interesa?",
    "Nuestros expertos pueden realizar un análisis de vulnerabilidades sin costo. ¿Quieres que te contactemos?",
    "Entiendo tu preocupación. La seguridad de tu infraestructura es nuestra prioridad.",
    "¡Excelente! Un asesor te contactará en breve para coordinar los siguientes pasos.",
  ];
  
  // Efecto para animación de entrada
  useEffect(() => {
    // Mostrar el botón después de 3 segundos
    const timer = setTimeout(() => {
      const button = document.getElementById('chat-button');
      if (button) {
        button.classList.add('opacity-100', 'translate-y-0');
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Simular respuesta del bot
  const simulateBotResponse = () => {
    setIsTyping(true);
    
    // Simular tiempo de respuesta
    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: randomResponse,
        isBot: true,
        timestamp: new Date()
      }]);
      
      setIsTyping(false);
    }, 1500);
  };
  
  // Manejar envío de mensaje
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Agregar mensaje del usuario
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: newMessage,
      isBot: false,
      timestamp: new Date()
    }]);
    
    setNewMessage('');
    
    // Simular respuesta del bot
    simulateBotResponse();
  };
  
  // Formatear hora
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <>
      {/* Botón flotante */}
      <button
        id="chat-button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-neon-cyan text-cyber-dark rounded-full p-4 shadow-lg hover:bg-neon-cyan/90 z-50 transition-all duration-500 opacity-0 translate-y-10 transform hover:scale-110"
        aria-label="Abrir chat de asistencia"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-neon-magenta animate-pulse"></span>
      </button>
      
      {/* Ventana de chat */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] bg-cyber-dark-blue border border-neon-cyan/20 rounded-lg shadow-2xl shadow-neon-cyan/10 z-50 flex flex-col overflow-hidden backdrop-blur-glass">
          {/* Header */}
          <div className="bg-gradient-to-r from-neon-cyan to-neon-blue p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center mr-3">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">Asistente SparkFound</h3>
                <p className="text-white/70 text-xs">Atención 24/7</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white"
              aria-label="Cerrar chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  message.isBot 
                    ? 'bg-neon-cyan/10 text-white border border-neon-cyan/30' 
                    : 'bg-neon-magenta/10 text-white border border-neon-magenta/30'
                }`}>
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs text-white/50 text-right mt-1">
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Indicador de escritura */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-neon-cyan/10 text-white border border-neon-cyan/30">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-neon-cyan animate-bounce" style={{animationDelay: '0ms'}}></div>
                    <div className="w-2 h-2 rounded-full bg-neon-cyan animate-bounce" style={{animationDelay: '150ms'}}></div>
                    <div className="w-2 h-2 rounded-full bg-neon-cyan animate-bounce" style={{animationDelay: '300ms'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Formulario */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-cyber-dark">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 bg-white/10 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50"
                placeholder="Escribe tu mensaje..."
              />
              <button 
                type="submit"
                className="bg-neon-cyan hover:bg-neon-cyan/90 text-cyber-dark rounded-full p-2 transition-colors"
                aria-label="Enviar mensaje"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;

function Shield(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  );
}
