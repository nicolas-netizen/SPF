import React, { useState, useEffect } from 'react';
import { Send, Lock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: ''
  });
  
  const [validation, setValidation] = useState({
    name: { valid: false, touched: false },
    email: { valid: false, touched: false },
    company: { valid: false, touched: false }
  });
  
  const [formVisible, setFormVisible] = useState(false);
  
  // Efecto para la animación de entrada
  useEffect(() => {
    const timer = setTimeout(() => {
      setFormVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validación en tiempo real
    validateField(name, value);
  };
  
  const validateField = (name: string, value: string) => {
    let isValid = false;
    
    switch (name) {
      case 'name':
        isValid = value.length >= 3;
        break;
      case 'email':
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        break;
      case 'company':
        isValid = value.length >= 2;
        break;
      default:
        isValid = true;
    }
    
    setValidation(prev => ({
      ...prev,
      [name]: { valid: isValid, touched: true }
    }));
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the form submission, like sending to a backend
    console.log('Form submitted:', formData);
    // Show success message or reset form
    alert('¡Gracias por contactarnos! Nos comunicaremos a la brevedad.');
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: ''
    });
  };

  // La declaración de clientLogos ha sido eliminada

  return (
    <section id="contacto" className="py-20 bg-transparent relative overflow-hidden">
      {/* Estilos para animaciones */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideIn {
          0% { opacity: 0; transform: translateX(-20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animated-form {
          opacity: 0;
          animation: slideIn 0.5s ease-out forwards;
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 rgba(255, 107, 0, 0); }
          50% { box-shadow: 0 0 15px rgba(255, 107, 0, 0.3); }
        }
      `}} />
      
      {/* Efectos visuales de fondo */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Título principal centrado */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] bg-clip-text text-transparent">
          Contáctanos
        </h2>
        
        <div className="bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-xl">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Columna izquierda: Formulario */}
            <div className="p-8 md:p-10">
              <div className="animated-form" style={{ animationDelay: '0.1s', animationPlayState: formVisible ? 'running' : 'paused' }}>
                <h3 className="text-2xl font-bold mb-6 text-white">
                  <span className="text-orange-400">¿Listo</span> para mejorar tu seguridad?
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <p className="text-sm text-white/70 mb-4">Complete el formulario y un especialista se comunicará contigo.</p>
                  
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 bg-white/10 backdrop-blur-md border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-white placeholder:text-white/60 transition-all ${validation.name.touched ? (validation.name.valid ? 'border-green-500/50' : 'border-red-500/50') : 'border-white/10'}`}
                      placeholder="Tu nombre"
                    />
                    {validation.name.touched && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {validation.name.valid ? (
                          <CheckCircle size={16} className="text-green-500" />
                        ) : (
                          <XCircle size={16} className="text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 bg-white/10 backdrop-blur-md border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-white placeholder:text-white/60 transition-all ${validation.email.touched ? (validation.email.valid ? 'border-green-500/50' : 'border-red-500/50') : 'border-white/10'}`}
                      placeholder="Tu email"
                    />
                    {validation.email.touched && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {validation.email.valid ? (
                          <CheckCircle size={16} className="text-green-500" />
                        ) : (
                          <XCircle size={16} className="text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="relative">
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 bg-white/10 backdrop-blur-md border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-white placeholder:text-white/60 transition-all ${validation.company.touched ? (validation.company.valid ? 'border-green-500/50' : 'border-red-500/50') : 'border-white/10'}`}
                      placeholder="Empresa"
                    />
                    {validation.company.touched && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {validation.company.valid ? (
                          <CheckCircle size={16} className="text-green-500" />
                        ) : (
                          <XCircle size={16} className="text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-white placeholder:text-white/60 transition-all"
                      placeholder="Teléfono (opcional)"
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    className="mt-6 w-full flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-orange-500/20 group overflow-hidden relative"
                    style={{animation: 'pulse-glow 2s infinite'}}
                  >
                    <span>Enviar mensaje</span>
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 animate-pulse" style={{animationDuration: '2s'}} />
                  </button>
                  
                  {/* Nota de seguridad */}
                  <div className="mt-4 text-xs text-white/60 flex items-center gap-1.5 justify-center">
                    <Lock size={12} className="text-orange-500" />
                    <span>Tus datos están protegidos por nuestra política de privacidad.</span>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Columna derecha: Video y logos */}
            <div className="bg-[#070b14] relative overflow-hidden">
              <div className="p-8 md:p-10 h-full flex flex-col animated-form" style={{ animationDelay: '0.3s', animationPlayState: formVisible ? 'running' : 'paused' }}>
                <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                  ¿Querés saber cómo podemos ayudarte?
                </h3>
                
                <div className="aspect-video bg-black/30 rounded-xl overflow-hidden mb-4 hover:shadow-lg hover:shadow-blue-900/30 transition-all border border-blue-500/10">
                  <video 
                    className="w-full h-full object-cover"
                    src="/nsoc.mp4" 
                    title="Sparkfound Video"
                    autoPlay
                    muted
                    loop
                    playsInline
                  ></video>
                </div>
                
                <p className="text-sm text-white/70 mb-6 leading-relaxed">
                  En este breve video, te mostramos cómo SparkFound puede ayudarte a prevenir ataques cibernéticos sofisticados.
                  <span className="block mt-2 text-blue-400 font-medium">🌐 Soluciones para empresas modernas.</span>
                </p>
                
                {/* Minicard con llamado a la acción */}
                <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/20 mb-8 hover:bg-blue-900/30 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <ArrowRight size={16} className="text-blue-400" />
                    </div>
                    <p className="text-xs text-white/80">
                      <span className="text-blue-400 font-medium">Agenda una demostración</span> y descubre cómo protegemos empresas como la tuya.
                    </p>
                  </div>
                </div>
                
                {/* La sección de logos de clientes ha sido eliminada */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
