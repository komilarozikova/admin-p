// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.alibekmoyliyev.uz',
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api/, ''), // kerak bo‘lmasa izohda qoldir
      },
    },
  },
});
