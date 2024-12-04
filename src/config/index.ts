export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    timeout: 5000,
  },
  app: {
    name: 'Tu Aplicación',
    version: '1.0.0',
  },
  seo: {
    title: 'Tu Título del Sitio',
    description: 'Tu descripción del sitio web aquí',
    keywords: 'palabras clave, relevantes, para tu sitio',
  },
  theme: {
    primary: '#3B82F6',
    secondary: '#1F2937',
    accent: '#10B981',
  },
  contact: {
    email: 'contacto@tudominio.com',
    phone: '+1234567890',
  },
};
