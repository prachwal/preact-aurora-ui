import { defineConfig } from 'vite';
import path from 'path';
import preact from '@preact/preset-vite';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcssDiscardDuplicates from 'postcss-discard-duplicates';
import postcssMergeRules from 'postcss-merge-rules';

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@test-utils': path.resolve(__dirname, 'src/test-utils'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@ThemeProvider': path.resolve(__dirname, 'src/components/ThemeProvider'),
      '@ThemeProvider/index': path.resolve(__dirname, 'src/components/ThemeProvider/index.ts'),
    },
  },
  base: process.env.NODE_ENV === 'production' ? '/preact-aurora-ui/' : '/',
  css: {
    modules: {
      // Use simple class names in test environment
      generateScopedName:
        process.env.NODE_ENV === 'test' ? '[name]--[local]' : '[name]_[local]_[hash:base64:6]',
    },
    postcss: {
      plugins: [
        autoprefixer(),
        ...(process.env.NODE_ENV === 'production'
          ? [
              cssnano({
                preset: [
                  'cssnano-preset-advanced',
                  {
                    // CSS optimization settings for Aurora UI v0.1.0
                    discardDuplicates: true, // Remove duplicate CSS rules
                    mergeRules: true, // Merge identical selectors
                    normalizeWhitespace: true, // Optimize whitespace
                    reduceIdents: false, // Keep CSS custom property names intact
                    discardComments: true, // Remove CSS comments in production
                    minifySelectors: true, // Optimize selector names
                    uniqueSelectors: true, // Remove duplicate selectors
                    // Preserve CSS custom properties for Material Design 3
                    reduceTransforms: false, // Don't optimize transform values
                    normalizeUrl: false, // Don't modify url() functions
                    // Aurora UI specific optimizations
                    autoprefixer: false, // We handle autoprefixer separately
                    cssDeclarationSorter: false, // Preserve declaration order for cascading
                  },
                ],
              }),
              // Additional duplication removal for SCSS @use imports
              postcssDiscardDuplicates(),
              postcssMergeRules(),
            ]
          : []),
      ],
    },
    preprocessorOptions: {
      scss: {
        // SCSS optimization for reduced @use duplications
        quietDeps: true, // Reduce console noise from dependencies
        // Enable modern SCSS features for v0.1.0 migration
        api: 'modern-compiler', // Use modern Sass API
        silenceDeprecations: ['import'], // Silence @import deprecation warnings during migration
      },
    },
  },
});
