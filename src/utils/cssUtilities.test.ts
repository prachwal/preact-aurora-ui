/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import {
  generateUtilityClasses,
  injectUtilityStyles,
  getUtilityClassNames,
  createUtilityBuilder,
} from './cssUtilities';

describe('cssUtilities', () => {
  beforeEach(() => {
    // Clear any existing styles
    document.head.innerHTML = '';
  });

  afterEach(() => {
    // Clean up
    document.head.innerHTML = '';
  });

  describe('generateUtilityClasses', () => {
    it('should generate utility classes with default config', () => {
      const result = generateUtilityClasses();

      expect(result).toHaveProperty('css');
      expect(result).toHaveProperty('classNames');
      expect(result).toHaveProperty('stats');
      expect(result.css).toContain('Background Color Utilities');
      expect(result.css).toContain('Text Color Utilities');
      expect(result.css).toContain('Border Color Utilities');
      expect(result.css).toContain('Spacing Utilities');
      expect(result.stats.total).toBeGreaterThan(0);
    });

    it('should generate background color utilities', () => {
      const result = generateUtilityClasses({
        generateBackgrounds: true,
        generateTextColors: false,
        generateBorderColors: false,
        generateSpacing: false,
      });

      expect(result.css).toContain(
        '.aurora-bg-primary { background-color: var(--md-sys-color-primary); }',
      );
      expect(result.css).toContain(
        '.aurora-bg-secondary { background-color: var(--md-sys-color-secondary); }',
      );
      expect(result.css).toContain(
        '.aurora-bg-success { background-color: var(--md-sys-color-success); }',
      );
      expect(result.classNames).toContain('aurora-bg-primary');
      expect(result.classNames).toContain('aurora-bg-secondary');
      expect(result.stats.backgroundClasses).toBeGreaterThan(0);
    });

    it('should generate text color utilities', () => {
      const result = generateUtilityClasses({
        generateBackgrounds: false,
        generateTextColors: true,
        generateBorderColors: false,
        generateSpacing: false,
      });

      expect(result.css).toContain('.aurora-text-primary { color: var(--md-sys-color-primary); }');
      expect(result.css).toContain(
        '.aurora-text-on-surface { color: var(--md-sys-color-on-surface); }',
      );
      expect(result.classNames).toContain('aurora-text-primary');
      expect(result.classNames).toContain('aurora-text-on-surface');
      expect(result.stats.textClasses).toBeGreaterThan(0);
    });

    it('should generate border color utilities', () => {
      const result = generateUtilityClasses({
        generateBackgrounds: false,
        generateTextColors: false,
        generateBorderColors: true,
        generateSpacing: false,
      });

      expect(result.css).toContain(
        '.aurora-border-primary { border-color: var(--md-sys-color-primary); }',
      );
      expect(result.css).toContain(
        '.aurora-border-outline { border-color: var(--md-sys-color-outline); }',
      );
      expect(result.classNames).toContain('aurora-border-primary');
      expect(result.classNames).toContain('aurora-border-outline');
      expect(result.stats.borderClasses).toBeGreaterThan(0);
    });

    it('should generate spacing utilities', () => {
      const result = generateUtilityClasses({
        generateBackgrounds: false,
        generateTextColors: false,
        generateBorderColors: false,
        generateSpacing: true,
      });

      expect(result.css).toContain('.aurora-p-4 { padding: 1rem; }');
      expect(result.css).toContain('.aurora-m-8 { margin: 2rem; }');
      expect(result.css).toContain('.aurora-px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }');
      expect(result.css).toContain('.aurora-my-6 { margin-top: 1.5rem; margin-bottom: 1.5rem; }');
      expect(result.classNames).toContain('aurora-p-4');
      expect(result.classNames).toContain('aurora-m-8');
      expect(result.stats.spacingClasses).toBeGreaterThan(0);
    });

    it('should use custom prefix', () => {
      const result = generateUtilityClasses({
        prefix: 'custom',
        generateBackgrounds: true,
        generateTextColors: false,
        generateBorderColors: false,
        generateSpacing: false,
      });

      expect(result.css).toContain('.custom-bg-primary');
      expect(result.classNames).toContain('custom-bg-primary');
    });

    it('should use custom spacing scale', () => {
      const customSpacing = {
        xs: '0.125rem',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '1rem',
      };

      const result = generateUtilityClasses({
        generateBackgrounds: false,
        generateTextColors: false,
        generateBorderColors: false,
        generateSpacing: true,
        customSpacing,
      });

      expect(result.css).toContain('.aurora-p-xs { padding: 0.125rem; }');
      expect(result.css).toContain('.aurora-m-lg { margin: 1rem; }');
      expect(result.classNames).toContain('aurora-p-xs');
      expect(result.classNames).toContain('aurora-m-lg');
    });

    it('should generate responsive variants when enabled', () => {
      const result = generateUtilityClasses({
        generateBackgrounds: true,
        generateTextColors: false,
        generateBorderColors: false,
        generateSpacing: false,
        includeResponsive: true,
      });

      expect(result.css).toContain('@media (min-width: 640px)');
      expect(result.css).toContain('@media (min-width: 768px)');
      expect(result.classNames.some((name) => name.includes('sm\\:'))).toBe(true);
      expect(result.classNames.some((name) => name.includes('md\\:'))).toBe(true);
    });
  });

  describe('injectUtilityStyles', () => {
    it('should inject styles into document head', () => {
      const cleanup = injectUtilityStyles();

      const styleElements = document.querySelectorAll('style[id^="aurora-ui-utilities"]');
      expect(styleElements.length).toBe(1);

      const styleElement = styleElements[0];
      expect(styleElement.textContent).toContain('Background Color Utilities');
      expect(styleElement.textContent).toContain('Text Color Utilities');

      // Test cleanup
      cleanup();
      const styleElementsAfterCleanup = document.querySelectorAll(
        'style[id^="aurora-ui-utilities"]',
      );
      expect(styleElementsAfterCleanup.length).toBe(0);
    });

    it('should replace existing styles with same ID', () => {
      const cleanup1 = injectUtilityStyles({ prefix: 'test' });
      expect(document.querySelectorAll('style[id="aurora-ui-utilities-test"]').length).toBe(1);

      const cleanup2 = injectUtilityStyles({ prefix: 'test' });
      expect(document.querySelectorAll('style[id="aurora-ui-utilities-test"]').length).toBe(1);

      cleanup1();
      cleanup2();
    });

    it('should return no-op function in SSR environment', () => {
      // Mock server environment
      const originalDocument = global.document;
      // @ts-expect-error - intentionally removing document for SSR test
      delete global.document;

      const cleanup = injectUtilityStyles();
      expect(typeof cleanup).toBe('function');

      // Should not throw
      cleanup();

      // Restore document
      global.document = originalDocument;
    });
  });

  describe('getUtilityClassNames', () => {
    it('should return array of utility class names', () => {
      const classNames = getUtilityClassNames();

      expect(Array.isArray(classNames)).toBe(true);
      expect(classNames.length).toBeGreaterThan(0);
      expect(classNames).toContain('aurora-bg-primary');
      expect(classNames).toContain('aurora-text-primary');
      expect(classNames).toContain('aurora-p-4');
      expect(classNames).toContain('aurora-m-8');
    });

    it('should respect custom configuration', () => {
      const classNames = getUtilityClassNames({
        prefix: 'custom',
        generateBackgrounds: true,
        generateTextColors: false,
        generateBorderColors: false,
        generateSpacing: false,
      });

      expect(classNames).toContain('custom-bg-primary');
      expect(classNames.every((name) => !name.includes('text-'))).toBe(true);
      expect(classNames.every((name) => !name.includes('border-'))).toBe(true);
      expect(classNames.every((name) => !name.includes('-p-') && !name.includes('-m-'))).toBe(true);
    });
  });

  describe('createUtilityBuilder', () => {
    it('should create type-safe utility class builder', () => {
      const builder = createUtilityBuilder();

      expect(builder.bg('primary')).toBe('aurora-bg-primary');
      expect(builder.text('on-surface')).toBe('aurora-text-on-surface');
      expect(builder.border('outline')).toBe('aurora-border-outline');
      expect(builder.p('4')).toBe('aurora-p-4');
      expect(builder.m('8')).toBe('aurora-m-8');
      expect(builder.px('2')).toBe('aurora-px-2');
      expect(builder.py('6')).toBe('aurora-py-6');
      expect(builder.mt('4')).toBe('aurora-mt-4');
      expect(builder.mr('2')).toBe('aurora-mr-2');
      expect(builder.mb('8')).toBe('aurora-mb-8');
      expect(builder.ml('1')).toBe('aurora-ml-1');
    });

    it('should use custom prefix', () => {
      const builder = createUtilityBuilder('custom');

      expect(builder.bg('primary')).toBe('custom-bg-primary');
      expect(builder.text('on-surface')).toBe('custom-text-on-surface');
      expect(builder.p('4')).toBe('custom-p-4');
    });
  });
});
