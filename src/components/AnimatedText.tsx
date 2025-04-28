import React, { useState, useEffect } from 'react';

interface AnimatedTextProps {
  text?: string;
  children?: React.ReactNode;
  className?: string;
  speed?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, children, className = "", speed = 100 }) => {
  // Utilizar el texto proporcionado o convertir children a string
  const content = text || (children ? React.Children.toArray(children).map(child => 
    typeof child === 'string' ? child : ''
  ).join('') : "");
  
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < content.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + content[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, content, speed]);

  // Si se pasan children como componentes en lugar de texto
  if (children && typeof children !== 'string' && !text) {
    return <span className={className}>{children}</span>;
  }
  
  return (
    <span className={className}>
      {displayText}
      {currentIndex < content.length && <span className="animate-pulse">|</span>}
    </span>
  );
};

export default AnimatedText;
