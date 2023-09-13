import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import Icons from 'unplugin-icons/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Icons({
      autoInstall: true,
      compiler: 'jsx',
      jsx: 'react',
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
  },

  server: {
    hmr: false,
  },

  build: {
    target: 'esnext',
  }
})
