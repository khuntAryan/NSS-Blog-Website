import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      "/v1": {
        target: "https://cloud.appwrite.io/v1",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/v1/, ""),
      },
    },
  },
});
