import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://congenial-invention-97wp97rw69vjfxvv-3000.app.github.dev/',
        changeOrigin: true,
      }
    }
  }
})
