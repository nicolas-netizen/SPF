import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permite acceso desde cualquier IP
    port: 3000,      // Puerto personalizado
    strictPort: true, // Evita cambiar puerto si está ocupado
    hmr: {
      overlay: true  // Muestra errores en pantalla
    },
    watch: {
      usePolling: true // Mejora detección de cambios en algunos entornos
    }
  },
  preview: {
    port: 3000,
    host: '0.0.0.0'
  },
  build: {
    outDir: 'dist'
  }
})
