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
          <div className="hidden md:flex items-center space-x-6" ref={dropdownRef}>
            {menuItems.map((item) => (
              <div key={item.path} className="relative">
                {item.submenu ? (
                  <button
                    onClick={(e) => handleDropdownClick(item.id, e)}
                    className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-black/30 rounded-md transition-all duration-300"
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.id ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-black/30 rounded-md transition-all duration-300"
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.submenu && openDropdown === item.id && (
                  <div className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-black/90 backdrop-blur-md ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50"
                          role="menuitem"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Link
              to="/contacto"
              className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-2 rounded-md font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
            >
              Contactar
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <div key={item.path}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={(e) => handleDropdownClick(item.id, e)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.id ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown === item.id && (
                      <div className="pl-4 space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-600"
                            onClick={() => {
                              setOpenDropdown(null);
                              setIsOpen(false);
                            }}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Link
              to="/contacto"
              className="block w-full text-center mt-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-2 rounded-md font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Contactar
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
