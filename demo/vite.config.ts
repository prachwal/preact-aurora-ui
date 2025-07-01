import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
  plugins: [preact()],
  server: {
    port: 3001,
    open: false, // Disable auto-open to avoid conflicts
  },
  build: {
    outDir: 'build',
  },
  optimizeDeps: {
    include: ['preact', 'preact/hooks'],
  },
});
