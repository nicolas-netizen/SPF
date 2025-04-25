import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const serviciosMenu = [
    { label: 'Ciberseguridad', path: '/servicios/ciberseguridad' },
    { label: 'Consultoría IT', path: '/servicios/consultoria' },
    { label: 'Desarrollo Seguro', path: '/servicios/desarrollo' },
    { label: 'Auditoría', path: '/servicios/auditoria' },
  ];

  const industriasMenu = [
    { label: 'Finanzas', path: '/industrias/finanzas' },
    { label: 'Salud', path: '/industrias/salud' },
    { label: 'Gobierno', path: '/industrias/gobierno' },
    { label: 'Educación', path: '/industrias/educacion' },
  ];

  const menuItems = [
    { label: 'Inicio', path: '/' },
    { 
      label: 'Servicios', 
      path: '#',
      submenu: serviciosMenu,
      id: 'servicios'
    },
    { 
      label: 'Industrias', 
      path: '#',
      submenu: industriasMenu,
      id: 'industrias'
    },
    { label: 'Sobre Nosotros', path: '/about' },
  ];

  const handleDropdownClick = (dropdownId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/80 backdrop-blur-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/SPF.png" alt="SPF Logo" className="h-16 w-auto transition-transform duration-300 hover:scale-105" />
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <Link
              to="/reunion"
              className="bg-transparent text-white px-4 py-2 rounded-md font-medium hover:text-[#FF6B00] transition-colors duration-300"
            >
              Agenda tu reunión
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Link
              to="/reunion"
              className="bg-transparent text-white px-4 py-2 font-medium hover:text-[#FF6B00] transition-colors duration-300"
            >
              Agenda
            </Link>
          </div>
        </div>

        {/* No mobile menu needed */}
      </div>
    </nav>
  );
};

export default Navbar;
