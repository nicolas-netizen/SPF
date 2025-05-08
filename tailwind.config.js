/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'beam-rotate': 'beam-rotate 20s linear infinite',
        'pulse': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'space-bg': 'space-bg 15s ease infinite',
        'glitch': 'glitch 2s linear infinite',
        'twinkling': 'twinkling 8s ease-in-out infinite',
        'rotate-3d': 'rotate-3d 8s ease-in-out infinite',
        'slide-in': 'slide-in 1s ease-out forwards',
        'fade-in': 'fade-in 1.5s ease-out forwards',
        'data-flow': 'data-flow 15s linear infinite',
        'dataFlow': 'dataFlow 2.5s ease-in-out infinite',
        'dataPacket': 'dataPacket 6s ease-in-out infinite',
        'scrollY': 'scrollY 20s linear infinite',
      },
      keyframes: {
        'beam-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulse: {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 0.1 },
        },
        'space-bg': {
          '0%': { backgroundPosition: '0% 0%' },
          '50%': { backgroundPosition: '100% 100%' },
          '100%': { backgroundPosition: '0% 0%' },
        },
        'glitch': {
          '0%': { clipPath: 'inset(40% 0 61% 0)' },
          '20%': { clipPath: 'inset(92% 0 1% 0)' },
          '40%': { clipPath: 'inset(43% 0 1% 0)' },
          '60%': { clipPath: 'inset(25% 0 58% 0)' },
          '80%': { clipPath: 'inset(54% 0 7% 0)' },
          '100%': { clipPath: 'inset(58% 0 43% 0)' },
        },
        'twinkling': {
          '0%, 100%': { opacity: 0.3, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.2)' },
        },
        'rotate-3d': {
          '0%': { transform: 'perspective(1000px) rotateX(0) rotateY(0)' },
          '50%': { transform: 'perspective(1000px) rotateX(10deg) rotateY(10deg)' },
          '100%': { transform: 'perspective(1000px) rotateX(0) rotateY(0)' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(50px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'data-flow': {
          '0%': { strokeDashoffset: 1000 },
          '100%': { strokeDashoffset: 0 },
        },
        'dataFlow': {
          '0%': { opacity: 0, transform: 'translateY(-100%)' },
          '50%': { opacity: 1 },
          '100%': { opacity: 0, transform: 'translateY(100%)' },
        },
        'dataPacket': {
          '0%': { transform: 'translateX(-200px)', opacity: 0 },
          '10%': { opacity: 1 },
          '90%': { opacity: 1 },
          '100%': { transform: 'translateX(200px)', opacity: 0 },
        },
        'scrollY': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(rgba(6, 37, 70, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 37, 70, 0.1) 1px, transparent 1px)',
        'space-gradient': 'linear-gradient(to bottom right, #0e0b30 0%, #121b3b 25%, #1a1342 50%, #150d35 75%, #0a0521 100%)',
      },
      colors: {
        // Colores base
        primary: '#FF6B00',
        'primary-light': '#FF8A3D',
        // Colores neón
        'neon-cyan': '#0affe9',
        'neon-magenta': '#f837ff',
        'neon-lime': '#ccff00',
        'neon-blue': '#3633ff',
        'neon-orange': '#ff5500',
        // Colores corporate
        'corp-blue': '#0066CC',
        'corp-blue-light': '#0099FF',
        // Colores de fondo
        'space-dark': '#0a0521',
        'cyber-dark': '#080C24',
        'cyber-dark-blue': '#0B1230',
      },
      dropShadow: {
        'neon-cyan': '0 0 5px rgba(10, 255, 233, 0.7)',
        'neon-magenta': '0 0 5px rgba(248, 55, 255, 0.7)',
        'neon-orange': '0 0 5px rgba(255, 85, 0, 0.7)',
      },
      backdropBlur: {
        'glass': '8px',
      },
      transitionProperty: {
        'filter': 'filter',
      },
      gridTemplateColumns: {
        'auto-fill-200': 'repeat(auto-fill, minmax(200px, 1fr))',
      },
    },
  },
  plugins: [],
};
