import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import mkcert from 'vite-plugin-mkcert';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), mkcert()],

  server: {
    proxy: {
      '^/product/*': {
        target: 'https://localhost:7247',
        secure: false
      },

      '^/cart/*': {
        target: 'https://localhost:7247',
        secure: false
      },

      '^/order/*': {
        target: 'https://localhost:7247',
        secure: false
      },
      
      '^/user/*': {
        target: 'https://localhost:7247',
        secure: false
      },
      
      '^/admin/*': {
        target: 'https://localhost:7247',
        secure: false
      },
    }
  }
})
