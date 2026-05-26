import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Redirige /api/* al backend de .NET para evitar problemas de CORS y certificado SSL
      '/api': {
        target: 'https://localhost:7083',
        changeOrigin: true,
        secure: false, // acepta el certificado auto-firmado de .NET en desarrollo
      }
    }
  }
})
