import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the same build works on Vercel (root) and
// GitHub Pages (https://kenabadobee09922.github.io/Web-Portfolio/).
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    // Avoid clashing with the static /assets/photo & /assets/video folders in public/
    assetsDir: 'static'
  }
});
