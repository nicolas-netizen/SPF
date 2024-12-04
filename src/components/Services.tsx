import React from 'react';

const Services: React.FC = () => {
  return (
    <section className="services py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Nuestros Servicios</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-secondary p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Firewall</h3>
            <p>Protección avanzada para su red.</p>
          </div>
          <div className="bg-secondary p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Monitor</h3>
            <p>Vigilancia constante de su infraestructura.</p>
          </div>
          <div className="bg-secondary p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Seguridad en la Nube</h3>
            <p>Protección para sus datos en la nube.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
