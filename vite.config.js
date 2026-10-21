import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    // Uses root '/' on Vercel or local dev, or '/Web-Portfolio/' if deploying to GitHub Pages
    base: process.env.VERCEL ? '/' : './',
});