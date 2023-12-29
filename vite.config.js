import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://shapes-vosk-dynamic.vercel.app',
  server: {
    host: 'localhost',
    cors: '*',
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
  },
  build: {
    minify: false,
    manifest: true,
    outDir: 'build',
    rollupOptions: {
      input: './src/main.jsx',
      output: {
        format: 'umd',
        entryFileNames: 'main.js',
        esModule: false,
        compact: false,
      },
    },
  },
})
