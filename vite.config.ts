import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  base: process.env.NODE_ENV === 'production' ? '/preact-aurora-ui/' : '/',
  css: {
    modules: {
      // Use simple class names in test environment
      generateScopedName:
        process.env.NODE_ENV === 'test' ? '[name]--[local]' : '[name]_[local]_[hash:base64:6]',
    },
  },
});
