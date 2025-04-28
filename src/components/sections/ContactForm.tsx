import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  return (
    <section id="contacto" className="py-20 bg-transparent">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] bg-clip-text text-transparent fade-in-up">
              Contactá con nosotros
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6 fade-in-up delay-200">
              <div>
                <label htmlFor="name" className="block text-white mb-2">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-white"
                  placeholder="Tu nombre"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-white mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-white"
                  placeholder="Tu email"
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-white mb-2">Empresa</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-white"
                  placeholder="Nombre de tu empresa"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-white mb-2">Teléfono (opcional)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-white"
                  placeholder="Tu teléfono (opcional)"
                />
              </div>
              
              <button 
                type="submit"
                className="mt-4 w-full flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] text-white font-medium rounded-lg transition-all hover:shadow-lg hover:shadow-orange-500/20"
              >
                Enviar mensaje
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
          
          <div className="flex flex-col justify-center fade-in-up delay-100">
            <h3 className="text-2xl font-bold mb-6 text-white">Conoce más sobre Sparkfound</h3>
            <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
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
            <p className="mt-4 text-gray-400">
              En este video te contamos cómo Sparkfound puede ayudarte a proteger tu empresa de las amenazas cibernéticas más sofisticadas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
