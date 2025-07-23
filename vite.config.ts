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
      },
      preload: {
        input: path.join(__dirname, 'preload.cjs'),
      },
      renderer: {},
    }),
  ],
  optimizeDeps: {
    exclude: ['electron']
  },
  server: {
    fs: {
      strict: false
    }
  },
  build: {
    target: 'esnext',
    minify: false,
    rollupOptions: {
      external: ['systeminformation'],
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          vendor: ['class-variance-authority', 'clsx', 'tailwind-merge'],
        },
      },
    },
  },
});
