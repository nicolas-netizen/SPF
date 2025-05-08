import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, ShieldCheck } from 'lucide-react';

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
  
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Base de conocimiento de la empresa
  const knowledgeBase = {
    servicios: [
      { name: "Ciberseguridad", description: "Protección completa contra amenazas digitales con monitoreo 24/7, detección de intrusiones y respuesta a incidentes." },
      { name: "Consultoría", description: "Asesoramiento estratégico personalizado para fortalecer la postura de seguridad de tu empresa." },
      { name: "Seguridad en la Nube", description: "Protección específica para entornos cloud, asegurando la integridad de datos y aplicaciones." },
      { name: "Pentesting", description: "Pruebas de penetración para identificar vulnerabilidades antes que los atacantes." },
      { name: "SOC como Servicio", description: "Centro de Operaciones de Seguridad gestionado por expertos para monitoreo continuo." }
    ],
    empresa: {
      nombre: "SparkFound",
      ubicacion: "Buenos Aires, Argentina",
      mision: "Proteger el futuro digital de las empresas con soluciones de ciberseguridad avanzadas y personalizadas.",
      vision: "Ser líderes en innovación y protección digital, contribuyendo a un ciberespacio más seguro."
    },
    contacto: {
      email: "contacto@sparkfound.com",
      telefono: "+51 999 999 999",
      horario: "Lunes a Viernes, 9:00 - 18:00"
    },
    preguntas_frecuentes: [
      { pregunta: "¿Qué hace SparkFound?", respuesta: "Somos una empresa especializada en ciberseguridad que ofrece servicios de protección digital, consultoría y monitoreo de seguridad para empresas de todos los tamaños." },
      { pregunta: "¿Cómo puedo contratar sus servicios?", respuesta: "Puedes contactarnos a través del formulario en nuestra web, por email a contacto@sparkfound.com o llamando al +51 999 999 999. Te ofreceremos una evaluación inicial sin costo." },
      { pregunta: "¿Ofrecen servicios para pequeñas empresas?", respuesta: "Sí, tenemos planes adaptados a empresas de todos los tamaños, desde startups hasta grandes corporaciones." },
      { pregunta: "¿Qué es el SOC como servicio?", respuesta: "Es nuestro Centro de Operaciones de Seguridad que monitorea tu infraestructura 24/7, detectando y respondiendo a amenazas en tiempo real." }
    ]
  };
  
  // Categorías de preguntas para clasificación
  const categories = [
    { name: 'servicios', keywords: ['servicio', 'ciberseguridad', 'hacking', 'protección', 'monitoreo', 'soc', 'nube', 'cloud', 'pentesting', 'consultoría', 'ofrecen', 'tienen'] },
    { name: 'empresa', keywords: ['empresa', 'compañía', 'sparkfound', 'quienes', 'historia', 'donde', 'ubicación', 'misión', 'visión', 'valores'] },
    { name: 'contacto', keywords: ['contacto', 'email', 'correo', 'teléfono', 'llamar', 'ubicación', 'dirección', 'demo', 'reunión', 'agendar', 'cita'] },
    { name: 'costos', keywords: ['precio', 'costo', 'tarifa', 'pago', 'inversión', 'mensual', 'anual', 'presupuesto', 'cotización', 'plan'] },
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
  
  // Desplazar al final de los mensajes cuando se añade uno nuevo
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Clasificar tipo de pregunta
  const classifyQuestion = (question: string): string => {
    // Convertir a minúsculas y eliminar caracteres especiales para mejor coincidencia
    const normalizedQuestion = question.toLowerCase().replace(/[¿?.,;:!]/g, '');
    
    // Para cada categoría, contamos coincidencias de palabras clave
    const scores = categories.map(category => {
      const matchCount = category.keywords.filter(keyword => 
        normalizedQuestion.includes(keyword)
      ).length;
      return { name: category.name, score: matchCount };
    });
    
    // Ordenar por puntuación de mayor a menor
    scores.sort((a, b) => b.score - a.score);
    
    // Si la pregunta es una respuesta afirmativa o negativa simple
    if (/^(si|sí|claro|ok|vale|por supuesto|no|nope)/i.test(normalizedQuestion)) {
      return 'confirmation';
    }
    
    // Si hay saludo
    if (/^(hola|buenas|saludos|hey|buenos dias|buen dia|buenas tardes|buenas noches)/i.test(normalizedQuestion)) {
      return 'greeting';
    }
    
    // Si es agradecimiento
    if (/^(gracias|muchas gracias|genial|excelente|perfecto|buenisimo)/i.test(normalizedQuestion)) {
      return 'thanks';
    }
    
    // Si hay alguna categoría con coincidencias, usamos esa
    if (scores[0].score > 0) {
      return scores[0].name;
    }
    
    // Por defecto, categoría general
    return 'general';
  };
  
  // Generar respuesta basada en el tipo de pregunta
  const generateResponse = (question: string): string => {
    const category = classifyQuestion(question);
    
    switch (category) {
      case 'servicios':
        // Identificar si se pregunta por un servicio específico
        const service = knowledgeBase.servicios.find(s => 
          question.toLowerCase().includes(s.name.toLowerCase())
        );
        
        if (service) {
          return `${service.name}: ${service.description} ¿Deseas más información sobre este servicio?`;
        } else {
          return `En SparkFound ofrecemos varios servicios de ciberseguridad, incluyendo: ${knowledgeBase.servicios.map(s => s.name).join(', ')}. ¿Sobre cuál te gustaría más información?`;
        }
      
      case 'empresa':
        return `SparkFound es una empresa especializada en ciberseguridad, ubicada en ${knowledgeBase.empresa.ubicacion}. Nuestra misión es ${knowledgeBase.empresa.mision} ¿Hay algo específico que quieras saber sobre nosotros?`;
      
      case 'contacto':
        return `Puedes contactarnos por email a ${knowledgeBase.contacto.email} o por teléfono al ${knowledgeBase.contacto.telefono}. También puedes agendar una reunión a través del formulario de contacto. ¿Te gustaría que coordinemos una reunión con nuestro equipo de ventas?`;
      
      case 'costos':
        return `Nuestros precios varían según las necesidades específicas de cada empresa. Ofrecemos planes personalizados adaptados a tu infraestructura. ¿Te gustaría que te contactemos para brindarte una cotización personalizada?`;
      
      case 'greeting':
        return `¡Hola! Gracias por contactar con SparkFound. Soy el asistente virtual y estoy aquí para ayudarte. ¿En qué puedo asistirte hoy?`;
      
      case 'confirmation':
        return `¡Perfecto! Un especialista se pondrá en contacto contigo pronto. Mientras tanto, ¿hay algo más en lo que pueda ayudarte?`;
      
      case 'thanks':
        return `¡De nada! Estamos para ayudarte. Si tienes más preguntas en el futuro, no dudes en contactarnos nuevamente.`;
      
      default:
        // Buscar en preguntas frecuentes
        const faq = knowledgeBase.preguntas_frecuentes.find(item => 
          question.toLowerCase().includes(item.pregunta.toLowerCase().split(' ').slice(1).join(' '))
        );
        
        if (faq) {
          return faq.respuesta;
        }
        
        return `Gracias por tu pregunta. Para brindarte la mejor asistencia, ¿podrías darme más detalles sobre lo que necesitas? Puedo ayudarte con información sobre nuestros servicios, la empresa, o agendar una reunión con nuestros especialistas.`;
    }
  };

  // Procesar respuesta del bot
  const getBotResponse = (userMessage: string) => {
    setIsTyping(true);
    
    // Simular tiempo de respuesta para más naturalidad
    setTimeout(() => {
      const botResponse = generateResponse(userMessage);
      
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: botResponse,
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
    
    const userMessageText = newMessage.trim();
    
    // Agregar mensaje del usuario
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: userMessageText,
      isBot: false,
      timestamp: new Date()
    }]);
    
    setNewMessage('');
    
    // Obtener respuesta del bot basada en el mensaje del usuario
    getBotResponse(userMessageText);
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
        className="fixed bottom-6 right-6 bg-orange-500 text-cyber-dark rounded-full p-4 shadow-lg hover:bg-orange-500/90 z-50 transition-all duration-500 opacity-0 translate-y-10 transform hover:scale-110"
        aria-label="Abrir chat de asistencia"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-amber-400 animate-pulse"></span>
      </button>
      
      {/* Ventana de chat */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] bg-cyber-dark-blue border border-orange-500/20 rounded-lg shadow-2xl shadow-orange-500/10 z-50 flex flex-col overflow-hidden backdrop-blur-glass">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-400 p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center mr-3">
                <ShieldCheck className="h-5 w-5 text-white" />
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
                {message.isBot && (
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center mr-2 flex-shrink-0">
                    <ShieldCheck className="h-4 w-4 text-orange-500" />
                  </div>
                )}
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  message.isBot 
                    ? 'bg-orange-500/10 text-white border border-orange-500/30' 
                    : 'bg-amber-400/10 text-white border border-amber-400/30'
                }`}>
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs text-white/50 text-right mt-1">
                    {formatTime(message.timestamp)}
                  </p>
                </div>
                {!message.isBot && (
                  <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center ml-2 flex-shrink-0">
                    <User className="h-4 w-4 text-amber-400" />
                  </div>
                )}
              </div>
            ))}
            
            {/* Referencia para desplazar al final */}
            <div ref={messageEndRef}></div>
            
            {/* Indicador de escritura */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-orange-500/10 text-white border border-orange-500/30">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" style={{animationDelay: '0ms'}}></div>
                    <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" style={{animationDelay: '150ms'}}></div>
                    <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" style={{animationDelay: '300ms'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Sugerencias de preguntas */}
          {messages.length < 3 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-orange-500 mb-2">Preguntas frecuentes:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "¿Qué servicios ofrecen?",
                  "¿Cómo puedo contactarlos?",
                  "¿Qué es el SOC?",
                ].map((question, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setNewMessage(question);
                      // Pequeño delay para que el usuario vea la pregunta seleccionada
                      setTimeout(() => handleSendMessage(new Event('submit') as any), 100);
                    }}
                    className="text-xs bg-orange-500/10 text-white border border-orange-500/30 rounded-full px-3 py-1 hover:bg-orange-500/20 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Formulario */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-cyber-dark">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 bg-white/10 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                placeholder="Escribe tu mensaje..."
              />
              <button 
                type="submit"
                disabled={!newMessage.trim()}
                className={`${newMessage.trim() ? 'bg-orange-500 hover:bg-orange-500/90' : 'bg-gray-600'} text-cyber-dark rounded-full p-2 transition-colors`}
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
