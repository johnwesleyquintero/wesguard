import { defineConfig } from 'vite';
import path from 'node:path';
import electron from 'vite-plugin-electron/simple';
import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    tsConfigPaths(),
    electron({
      main: {
        entry: 'main.js',
        // Removed outputDir as it's not a valid option here
      },
      preload: {
        input: path.join(__dirname, 'preload.cjs'),
        // Removed outputDir as it's not a valid option here
      },
      renderer: {},
    }),
  ],
  build: {
    rollupOptions: {
      external: ['systeminformation'],
    },
  },
});
