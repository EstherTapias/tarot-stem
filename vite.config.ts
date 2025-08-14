import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1', // fuerza IPv4
    port: 5173,        // puerto fijo
    strictPort: true,  // no cambiar de puerto automáticamente
    open: true         // abrir navegador al arrancar (opcional)
  }
})
