import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import mkcert from 'vite-plugin-mkcert';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), mkcert()],

  server: {
    proxy: {
      '^/series/*': {
        target: 'https://localhost:7247',
        secure: false
      },

      '^/product/*': {
        target: 'https://localhost:7247',
        secure: false
      },

      '^/favorite/*': {
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
      
      '^/api/*': {
        target: 'https://localhost:7247',
        secure: false
      },
    }
  }
})
