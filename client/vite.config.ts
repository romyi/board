import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@features": path.resolve(__dirname, "./src/features"),
      "@states": path.resolve(__dirname, "./src/states"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@shared": path.resolve(__dirname, "../shared")
    },
  }
})
