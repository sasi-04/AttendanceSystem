import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      // Unified '/api' prefix for dev when backend runs on 5174
      '/api': {
        target: 'http://localhost:5174',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/qr': { target: 'http://localhost:5174', changeOrigin: true },
      '/sessions': { target: 'http://localhost:5174', changeOrigin: true },
      '/attendance': { target: 'http://localhost:5174', changeOrigin: true },
      '/socket.io': { target: 'http://localhost:5174', ws: true, changeOrigin: true }
    }
  }
});



