import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api' : {
        target:'https://zany-goldfish-jj9x5jv9jxvqcqqw9-3000.app.github.dev',
        changeOrigin : true
      }
    }
  }
})
