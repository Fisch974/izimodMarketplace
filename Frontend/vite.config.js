import { dirname, resolve } from 'path';
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';

/** @type {import('vite').UserConfig} */
export default {
  root: resolve(__dirname, 'src'),
  base: './',
  build: {
    outDir: '../dist',
  },
  server: {
    port: 8080,
    hot: true,
  },
  plugins: [
    react(),  // Plugin React pour gérer JSX
    legacy({
      targets: [
        'defaults',
        'ie >= 7',
        'firefox ESR',
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      sass: {
        // Si tu as des variables Sass globales, tu peux les ajouter ici
        additionalData: `@import "@/styles/variables.scss";`, // Exemple d'import global
      },
    },
  },
};
