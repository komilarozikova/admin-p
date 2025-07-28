import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // vite.config.js
  server: {
    proxy: {
      '/api': {
        target: 'https://alibekmoyliyev.uz',
        changeOrigin: true,
        secure: false,
      //   rewrite: path => path.replace(/^\/api/, ''),
       }
    }
  }

})
