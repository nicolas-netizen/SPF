import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import compression from 'vite-plugin-compression';

export default defineConfig({
  server: {
    port: 3000,
    strictPort: true,
    cors: true,
  },
  plugins: [
    react(),
    compression(),
    visualizer({
      open: true,
      gzipSize: true,
    }),
  ],
  build: {
    target: 'es2015',
    minify: 'terser',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: './src/main.tsx',
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react-router-dom', 'lucide-react'],
  },
});
