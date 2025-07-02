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
    name: 'accessibility',
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test-setup.ts', './test-setup-a11y.ts'],
    include: ['../src/**/*.a11y.test.{ts,tsx}'],
    coverage: {
      reporter: ['text', 'html'],
      include: ['../src/**/*.{ts,tsx}'],
      exclude: ['../src/**/*.test.{ts,tsx}', '../src/**/*.stories.{ts,tsx}'],
    },
  },
});
