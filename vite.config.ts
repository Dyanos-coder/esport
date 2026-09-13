import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { apiDevMiddleware } from './dev/api-middleware';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load every .env value (no VITE_ prefix filter) into process.env so the
  // /api/*.ts handlers can read DB_HOST, JWT_SECRET, etc. exactly like on Vercel.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return {
    plugins: [react(), apiDevMiddleware()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
