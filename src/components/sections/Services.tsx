import React, { useEffect, useState } from 'react';
import { 
  Shield, 
  Lock, 
  Eye, 
  AlertTriangle, 
  Network, 
  Database,
  Cloud,
  Code,
  Search,
  Shield as ShieldCheck,
  FileCheck,
  Bell,
  Monitor,
  Server,
  Mail,
  Layout,
  FileText,
  AlertCircle,
  Cog 
} from 'lucide-react';

const serviceRows = [
  // Row 1 - 6 hexagons
  [
    { icon: Shield, title: "FIREWALL", subtitle: "IPS AS A SERVICE" },
    { icon: Monitor, title: "MONITOR", subtitle: "DATACENTER" },
    { icon: Network, title: "NETWORK", subtitle: "ACCESS CONTROL" },
    { icon: Lock, title: "CASB", subtitle: "" },
    { icon: AlertCircle, title: "LOG", subtitle: "MANAGEMENT (SIEM)" },
    { icon: Cog, title: "NETWORK", subtitle: "PERFORMANCE" } 
  ],
  // Row 2 - 5 hexagons
  [
    { icon: Shield, title: "EDR &", subtitle: "ENDPOINT SECURITY" },
    { icon: Server, title: "SOAR", subtitle: "" },
    { icon: Lock, title: "DRP", subtitle: "" },
    { icon: Cog, title: "REMEDIATION", subtitle: "" }, 
    { icon: Database, title: "DATABASE", subtitle: "MONITORING" }
  ],
  // Row 3 - 6 hexagons
  [
    { icon: Layout, title: "APPLICATION", subtitle: "VULNERABILITY" },
    { icon: FileText, title: "WAF", subtitle: "" },
    { icon: Mail, title: "DLP & EMAIL", subtitle: "SECURITY" },
    { icon: Layout, title: "APPLICATION", subtitle: "SECURITY" },
    { icon: Cloud, title: "CLOUD", subtitle: "SECURITY" },
    { icon: Shield, title: "ADDITIONAL", subtitle: "SERVICE" }
  ],
  // Row 4 - 5 hexagons
  [
    { icon: Monitor, title: "MONITORING", subtitle: "" },
    { icon: AlertCircle, title: "ALERTING", subtitle: "SYSTEM" },
    { icon: Server, title: "SERVER", subtitle: "SECURITY" },
    { icon: Lock, title: "ACCESS", subtitle: "CONTROL" },
    { icon: Cog, title: "NETWORK", subtitle: "TUNING" } 
  ],
  // Row 5 - 6 hexagons
  [
    { icon: Shield, title: "ENDPOINT", subtitle: "PROTECTION" },
    { icon: Monitor, title: "THREAT", subtitle: "DETECTION" },
    { icon: Cloud, title: "CLOUD", subtitle: "SECURITY" },
    { icon: Lock, title: "DATA", subtitle: "PROTECTION" },
    { icon: AlertCircle, title: "INCIDENT", subtitle: "RESPONSE" },
    { icon: Network, title: "SECURE", subtitle: "ACCESS" }
  ]
];

const Services = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const desktopRows = serviceRows;
  const mobileRows = [
    serviceRows[0].slice(0, 3).concat(serviceRows[1].slice(0, 3)),
    serviceRows[1].slice(3, 5).concat(serviceRows[2].slice(0, 3)),
    serviceRows[2].slice(3, 6).concat(serviceRows[3].slice(0, 2)),
    serviceRows[3].slice(2, 5).concat(serviceRows[4].slice(0, 2)),
    serviceRows[4].slice(2, 6)
  ];

  const rows = isMobile ? mobileRows : desktopRows;

  return (
    <section className="relative min-h-screen py-20">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600 mb-4 relative inline-block">
            Nuestros Servicios
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mt-6">
            Soluciones integrales de ciberseguridad para proteger su infraestructura digital.
          </p>
        </div>

        <div className="hex-grid">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className={`hex-row ${isMobile ? 'mobile-row' : ''}`}>
              {row.map((service, index) => (
                <div key={index} className="hex-item group">
                  <div className="hexagon bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm hover:from-gray-800/90 hover:to-gray-700/90 transition-all duration-300">
                    <div className="hex-content">
                      <div className="flex items-center justify-center mb-2">
                        <service.icon className="w-8 h-8 text-orange-500 group-hover:text-orange-400 transition-colors duration-300" />
                      </div>
                      <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-orange-300 transition-colors duration-300">{service.title}</h3>
                      {service.subtitle && (
                        <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{service.subtitle}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
