import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { configDefaults } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    open: true,
  },
  test: {
    globals: true,          // permite usar expect() sin importar
    environment: 'jsdom',   // necesario para componentes React
    setupFiles: './src/setupTests.ts',
    exclude: [...configDefaults.exclude], // opcional, excluye node_modules etc
  }
})
