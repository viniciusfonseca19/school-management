import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/students':    { target: 'https://caryl-unbrave-eldon.ngrok-free.dev', changeOrigin: true },
      '/teachers':    { target: 'https://caryl-unbrave-eldon.ngrok-free.dev', changeOrigin: true },
      '/courses':     { target: 'https://caryl-unbrave-eldon.ngrok-free.dev', changeOrigin: true },
      '/classrooms':  { target: 'https://caryl-unbrave-eldon.ngrok-free.dev', changeOrigin: true },
      '/enrollments': { target: 'https://caryl-unbrave-eldon.ngrok-free.dev', changeOrigin: true },
      '/users':       { target: 'https://caryl-unbrave-eldon.ngrok-free.dev', changeOrigin: true },
    },
  },
});