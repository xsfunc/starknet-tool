import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import swc from 'unplugin-swc'
import Icons from 'unplugin-icons/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Icons({
      autoInstall: true,
      compiler: 'jsx',
      jsx: 'react',
    }),

    swc.vite({
      jsc: {
        experimental: {
          plugins: [
            [
              '@effector/swc-plugin',
              { factories: ['@withease/factories'] },
            ],
          ],
        },
      },
    }),

    react(),
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
