import React, { useState, useEffect, useRef, memo } from 'react';
import { Send, CheckCircle, XCircle, ArrowRight, Lock, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: ''
  });
  
  const [validation, setValidation] = useState({
    name: { valid: false, touched: false, message: '' },
    email: { valid: false, touched: false, message: '' },
    company: { valid: false, touched: false, message: '' }
  });
  
  const [formVisible, setFormVisible] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  
  // Efecto para la animación de entrada y observar cuando el formulario es visible
  useEffect(() => {
    const timer = setTimeout(() => {
      setFormVisible(true);
    }, 300);
    
    // Crear un IntersectionObserver para detectar cuando el formulario es visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFormVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    
    // Observar el formulario
    if (formRef.current) {
      observer.observe(formRef.current);
    }
    
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validación en tiempo real con un pequeño retraso para mejor UX
    setTimeout(() => {
      validateField(name, value);
    }, 200);
  };
  
  const validateField = (name: string, value: string) => {
    let isValid = false;
    let message = '';
    
    switch (name) {
      case 'name':
        isValid = value.length >= 3;
        message = isValid ? '' : 'El nombre debe tener al menos 3 caracteres';
        break;
      case 'email':
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        message = isValid ? '' : 'Ingresa un correo electrónico válido';
        break;
      case 'company':
        isValid = value.length >= 2;
        message = isValid ? '' : 'Ingresa el nombre de tu empresa';
        break;
      default:
        isValid = true;
    }
    
    setValidation(prev => ({
      ...prev,
      [name]: { valid: isValid, touched: true, message }
    }));
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar todos los campos antes de enviar
    const allFieldsValid = ['name', 'email', 'company'].every(field => {
      const value = formData[field as keyof typeof formData];
      validateField(field, value);
      return validation[field as keyof typeof validation].valid;
    });
    
    if (!allFieldsValid) {
      return;
    }
    
    // Cambiar estado a enviando
    setSubmitStatus('submitting');
    
    try {
      // Simulamos una API call con un timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Aquí se haría el fetch real a la API
      // console.log('Form submitted:', formData);
      
      // Cambiar estado a éxito y resetear el formulario
      setSubmitStatus('success');
      setFormSubmitted(true);
      
      // Esperar 3 segundos antes de resetear el formulario
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: ''
        });
        setFormSubmitted(false);
        setSubmitStatus('idle');
      }, 3000);
      
    } catch (error) {
      // console.error('Error al enviar el formulario:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <section id="contacto" className="py-20 bg-transparent relative overflow-hidden" ref={formRef}>
      {/* Estilos para animaciones */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideIn {
          0% { opacity: 0; transform: translateX(-20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animated-form {
          opacity: 0;
          animation: slideIn var(--transition-normal) forwards;
        }
        .animated-up {
          opacity: 0;
          animation: slideInUp var(--transition-normal) forwards;
        }
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 0 rgba(255, 107, 0, 0); }
          50% { box-shadow: 0 0 15px var(--color-primary-transparent); }
          100% { box-shadow: 0 0 0 rgba(255, 107, 0, 0); }
        }
        .input-error {
          border-color: rgb(239, 68, 68) !important;
          animation: shake 0.5s ease-in-out;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          background: rgba(255, 255, 255, 0.2);
          animation: ripple-animation 0.6s linear forwards;
        }
        @keyframes ripple-animation {
          to { transform: scale(2); opacity: 0; }
        }
      `}} />
      
      {/* Efectos visuales de fondo mejorados */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl animate-pulse" style={{animationDuration: '8s'}}></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{animationDuration: '10s', animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 -translate-y-1/2 right-1/4 w-40 h-40 bg-orange-500/3 rounded-full blur-2xl animate-pulse" style={{animationDuration: '7s', animationDelay: '0.5s'}}></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Título principal centrado con animación */}
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Contáctanos
        </motion.h2>
        
        <motion.div 
          className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-x4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid md:grid-cols-5 gap-0 md:gap-4">
            {/* Columna izquierda: Formulario */}
            <div className="p-8 md:p-10 md:col-span-2">
              <div className="animated-form" style={{ animationDelay: '0.1s', animationPlayState: formVisible ? 'running' : 'paused' }}>
                <h3 className="text-2xl font-bold mb-6 text-white">
                  <span className="text-orange-400">¿Listo</span> para mejorar tu seguridad?
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-5" ref={formRef}>
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
                    <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-1 flex items-center">
                      Teléfono (opcional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-white placeholder:text-white/60 transition-all"
                      placeholder="Ingresa tu número de teléfono"
                    />
                  </div>

                  <AnimatePresence>
                    {formSubmitted && submitStatus === 'success' ? (
                      <motion.div 
                        className="mt-6 w-full flex items-center justify-center gap-2 py-3 px-6 bg-green-500/90 text-white font-semibold rounded-xl shadow-lg shadow-green-500/20"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <span>¡Mensaje enviado con éxito!</span>
                      </motion.div>
                    ) : submitStatus === 'error' ? (
                      <motion.div 
                        className="mt-6 w-full flex items-center justify-center gap-2 py-3 px-6 bg-red-500/90 text-white font-semibold rounded-xl shadow-lg shadow-red-500/20"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <XCircle className="w-5 h-5 mr-2" />
                        <span>Error al enviar. Intenta nuevamente.</span>
                      </motion.div>
                    ) : (
                      <motion.button 
                        type="submit"
                        className="mt-6 w-full flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] hover:from-[var(--color-primary-light)] hover:to-[var(--color-primary)] text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-[var(--color-primary-transparent)] group overflow-hidden relative"
                        style={{animation: 'pulse-glow 2s infinite'}}
                        disabled={submitStatus === 'submitting'}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {submitStatus === 'submitting' ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            <span>Enviando...</span>
                          </>
                        ) : (
                          <>
                            <span>Enviar mensaje</span>
                            <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 animate-pulse" style={{animationDuration: '2s'}} />
                          </>
                        )}
                      </motion.button>
                    )}
                  </AnimatePresence>
                  
                  {/* Nota de seguridad */}
                  <motion.div 
                    className="mt-4 text-xs text-white/60 flex items-center gap-1.5 justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Lock size={12} className="text-[var(--color-primary)]" />
                    <span>Tus datos están protegidos por nuestra política de privacidad.</span>
                  </motion.div>
                </form>
              </div>
            </div>
            
            {/* Columna derecha: Video y logos - AMPLIADA */}
            <div className="bg-[#070b14] relative overflow-hidden md:col-span-3">
              <div className="p-8 md:p-10 h-full flex flex-col animated-form" style={{ animationDelay: '0.3s', animationPlayState: formVisible ? 'running' : 'paused' }}>
                <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                  ¿Querés saber cómo podemos ayudarte?
                </h3>
                
                {/* VIDEO MEJORADO - Comenzar con animación de resplandor */}
                <div className="relative group mb-6">
                  {/* Efecto de resplandor animado detrás del video */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 rounded-xl opacity-70 blur-xl animate-pulse z-0"></div>
                  
                  {/* Video con bordes y efectos mejorados - Tamaño ULTRA MAXIMIZADO */}
                  <div className="relative z-10 rounded-xl overflow-hidden border-2 border-blue-400/50 shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:shadow-[0_0_40px_rgba(59,130,246,0.8)] transition-all duration-300 w-full">
                    <div className="relative" style={{ paddingBottom: '56.25%' }}>
                      <video
                        className="absolute top-0 left-0 w-full h-full object-contain"
                        src="/nsoc.mp4"
                        title="SparkFound Video"
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls
                        style={{ filter: 'contrast(1.15) brightness(1.15)' }}
                      ></video>
                    </div>
                    
                    {/* Overlay gradients para mejorar la profundidad y visibilidad */}
                    <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-blue-900/60 to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-900/60 to-transparent pointer-events-none"></div>
                    
                    {/* Indicador de reproducción */}
                    <div className="absolute bottom-4 right-4 bg-blue-500/80 text-white text-xs font-bold py-1.5 px-3 rounded-full backdrop-blur-sm flex items-center gap-1.5 shadow-lg shadow-blue-500/30 animate-pulse" style={{animationDuration: '3s'}}>
                      <Play size={12} className="fill-white" />
                      <span>REPRODUCIENDO</span>
                    </div>
                    
                    {/* Overlay para efecto de brillo en hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 to-cyan-500/0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
                
                {/* Descripción del video con mejor contraste */}
                <div className="bg-white/5 backdrop-blur-sm p-3 rounded-lg border border-blue-500/20 mb-4">
                  <p className="text-xs md:text-sm text-white/90 leading-relaxed">
                    En este video, te mostramos cómo <span className="font-semibold text-blue-300">SparkFound</span> puede ayudarte a prevenir ataques cibernéticos.
                    <span className="block mt-1 text-blue-400 font-medium">🌐 Soluciones para tu empresa</span>
                  </p>
                </div>
                
                {/* Minicard con llamado a la acción mejorado */}
                <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-500/30 mb-6 hover:bg-blue-900/40 transition-all hover:border-blue-500/50 transform hover:-translate-y-1 duration-300">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/30 rounded-lg">
                      <ArrowRight size={18} className="text-blue-300" />
                    </div>
                    <p className="text-sm text-white/90">
                      <span className="text-blue-300 font-semibold">Agenda una demostración</span> y descubre cómo protegemos empresas como la tuya.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Memorizamos el componente para evitar re-renderizados innecesarios
export default memo(ContactForm);
