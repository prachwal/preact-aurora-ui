import { defineConfig } from 'vitest/config';
import preact from '@preact/preset-vite';

export default defineConfig({
  plugins: [preact()],
  css: {
    modules: {
      // Use simple class names in test environment for easier testing
      generateScopedName: '[name]--[local]',
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['config/test-setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      reporter: ['text', 'html'],
    },
  },
});
