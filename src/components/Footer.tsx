import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/90 text-gray-300 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo and Copyright */}
          <div className="flex items-center mb-4 md:mb-0">
            <Link to="/" className="flex items-center">
              <img
                src="/SPF.png"
                alt="SPF Logo"
                className="h-16 w-auto mr-4"
              />
            </Link>
            <span className="mx-4 text-gray-500">|</span>
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Sparkfound
            </p>
          </div>

          {/* Quick Links and Social */}
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-4">
              {[
                ['Servicios', '/servicios'],
                ['Sobre Mí', '/sobre-mi'],
                ['Blog', '/blog'],
              ].map(([title, url]) => (
                <Link
                  key={url}
                  to={url}
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {title}
                </Link>
              ))}
            </div>
            
            <div className="h-4 w-px bg-gray-700 hidden md:block" />
            
            {/* Social Media */}
            <div className="flex space-x-4">
              {[
                [Github, 'https://github.com'],
                [Linkedin, 'https://linkedin.com'],
                [Twitter, 'https://twitter.com'],
              ].map(([Icon, url], index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
