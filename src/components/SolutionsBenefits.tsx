import React from 'react';
import { Shield, Lock, CheckCircle, Server, Globe, ExternalLink } from 'lucide-react';

const SolutionsBenefits: React.FC = () => {
  return (
    <div className="mt-8 py-10 px-8 bg-gradient-to-r from-[rgba(13,10,30,0.6)] to-[rgba(40,20,60,0.6)] backdrop-blur-sm rounded-2xl border border-[rgba(255,70,0,0.2)] max-w-6xl mx-auto animate-fade-in shadow-lg overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/cybersecurity-pattern.png')] opacity-5"></div>
      
      <h3 className="text-3xl font-bold text-white mb-8 text-center relative z-10">
        Nuestras soluciones te <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] animate-gradient-x">permitirán</span>
      </h3>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        <div className="flex items-start gap-3 group animate-slide-left delay-100">
          <div className="flex-shrink-0 w-7 h-7 rounded-full bg-orange-500/20 flex items-center justify-center mt-0.5 group-hover:bg-orange-500/30 transition-all duration-300">
            <Shield className="w-4 h-4 text-orange-400" />
          </div>
          <p className="text-orange-400 font-medium">Proteger tu infraestructura digital contra amenazas avanzadas</p>
        </div>
        
        <div className="flex items-start gap-3 group animate-slide-left delay-200">
          <div className="flex-shrink-0 w-7 h-7 rounded-full bg-orange-500/20 flex items-center justify-center mt-0.5 group-hover:bg-orange-500/30 transition-all duration-300">
            <CheckCircle className="w-4 h-4 text-orange-400" />
          </div>
          <p className="text-orange-400 font-medium">Garantizar la continuidad de tus operaciones en todo momento</p>
        </div>
        
        <div className="flex items-start gap-3 group animate-slide-left delay-300">
          <div className="flex-shrink-0 w-7 h-7 rounded-full bg-orange-500/20 flex items-center justify-center mt-0.5 group-hover:bg-orange-500/30 transition-all duration-300">
            <Server className="w-4 h-4 text-orange-400" />
          </div>
          <p className="text-orange-400 font-medium">Ahorrar tiempo y dinero con soluciones flexibles y escalables</p>
        </div>
        
        <div className="flex items-start gap-3 group animate-slide-right delay-400">
          <div className="flex-shrink-0 w-7 h-7 rounded-full bg-orange-500/20 flex items-center justify-center mt-0.5 group-hover:bg-orange-500/30 transition-all duration-300">
            <Globe className="w-4 h-4 text-orange-400" />
          </div>
          <p className="text-orange-400 font-medium">Innovar con seguridad agregando valor a tus productos y servicios</p>
        </div>
        
        <div className="flex items-start gap-3 group animate-slide-right delay-500">
          <div className="flex-shrink-0 w-7 h-7 rounded-full bg-orange-500/20 flex items-center justify-center mt-0.5 group-hover:bg-orange-500/30 transition-all duration-300">
            <ExternalLink className="w-4 h-4 text-orange-400" />
          </div>
          <p className="text-orange-400 font-medium">Aumentar la resiliencia de tu negocio ante ataques cibernéticos</p>
        </div>
        
        <div className="flex items-start gap-3 group animate-slide-right delay-600">
          <div className="flex-shrink-0 w-7 h-7 rounded-full bg-orange-500/20 flex items-center justify-center mt-0.5 group-hover:bg-orange-500/30 transition-all duration-300">
            <Lock className="w-4 h-4 text-orange-400" />
          </div>
          <p className="text-orange-400 font-medium">Ofrecer mejores experiencias y confianza a tus clientes</p>
        </div>
      </div>
    </div>
  );
};

export default SolutionsBenefits;
