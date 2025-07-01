import { defineConfig } from 'vitest/config';
import preact from '@preact/preset-vite';

export default defineConfig({
  plugins: [preact()],
  css: {
    modules: {
      generateScopedName: '[name]--[local]',
    },
  },
  test: {
    name: 'performance',
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test-setup.ts', './test-setup-performance.ts'],
    include: ['src/**/*.performance.test.{ts,tsx}'],
    testTimeout: 30000, // Performance tests may take longer
    coverage: {
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.test.{ts,tsx}', 'src/**/*.stories.{ts,tsx}'],
    },
  },
});
