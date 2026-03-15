import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/students':    { target: 'https://school-flow-prrt.onrender.com', changeOrigin: true },
      '/teachers':    { target: 'https://school-flow-prrt.onrender.com', changeOrigin: true },
      '/courses':     { target: 'https://school-flow-prrt.onrender.com', changeOrigin: true },
      '/classrooms':  { target: 'https://school-flow-prrt.onrender.com', changeOrigin: true },
      '/enrollments': { target: 'https://school-flow-prrt.onrender.com', changeOrigin: true },
      '/users':       { target: 'https://school-flow-prrt.onrender.com', changeOrigin: true },
    },
  },
});