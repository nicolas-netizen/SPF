import React from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
}

export default function NavLink({ href, children, mobile }: NavLinkProps) {
  const baseClasses = "relative text-gray-300 hover:text-white font-medium px-3 py-2 rounded-md transition-all duration-300";
  const desktopClasses = "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 hover:after:w-full after:transition-all after:duration-300 hover:bg-gray-800/30";
  
  return (
    <a 
      href={href} 
      className={`${baseClasses} ${mobile ? 'text-lg py-3 hover:bg-gray-700' : desktopClasses}`}
    >
      {children}
    </a>
  );
}