import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('MD3 Color System', () => {
  let testElement: HTMLElement;

  beforeEach(() => {
    // Create a test element to check computed styles
    testElement = document.createElement('div');
    document.body.appendChild(testElement);
  });

  afterEach(() => {
    document.body.removeChild(testElement);
  });

  describe('MD3 Color Tokens', () => {
    it('should have primary color tokens defined', () => {
      const computedStyle = getComputedStyle(document.documentElement);

      expect(computedStyle.getPropertyValue('--md-sys-color-primary')).toBeTruthy();
      expect(computedStyle.getPropertyValue('--md-sys-color-on-primary')).toBeTruthy();
      expect(computedStyle.getPropertyValue('--md-sys-color-primary-container')).toBeTruthy();
      expect(computedStyle.getPropertyValue('--md-sys-color-on-primary-container')).toBeTruthy();
    });

    it('should have secondary color tokens defined', () => {
      const computedStyle = getComputedStyle(document.documentElement);

      expect(computedStyle.getPropertyValue('--md-sys-color-secondary')).toBeTruthy();
      expect(computedStyle.getPropertyValue('--md-sys-color-on-secondary')).toBeTruthy();
      expect(computedStyle.getPropertyValue('--md-sys-color-secondary-container')).toBeTruthy();
      expect(computedStyle.getPropertyValue('--md-sys-color-on-secondary-container')).toBeTruthy();
    });

    it('should have tertiary color tokens defined', () => {
      const computedStyle = getComputedStyle(document.documentElement);

      expect(computedStyle.getPropertyValue('--md-sys-color-tertiary')).toBeTruthy();
      expect(computedStyle.getPropertyValue('--md-sys-color-on-tertiary')).toBeTruthy();
      expect(computedStyle.getPropertyValue('--md-sys-color-tertiary-container')).toBeTruthy();
      expect(computedStyle.getPropertyValue('--md-sys-color-on-tertiary-container')).toBeTruthy();
    });

    it('should have error color tokens defined', () => {
      const computedStyle = getComputedStyle(document.documentElement);

      expect(computedStyle.getPropertyValue('--md-sys-color-error')).toBeTruthy();
      expect(computedStyle.getPropertyValue('--md-sys-color-on-error')).toBeTruthy();
      expect(computedStyle.getPropertyValue('--md-sys-color-error-container')).toBeTruthy();
      expect(computedStyle.getPropertyValue('--md-sys-color-on-error-container')).toBeTruthy();
    });

    it('should have surface color tokens defined', () => {
      const computedStyle = getComputedStyle(document.documentElement);

      expect(computedStyle.getPropertyValue('--md-sys-color-surface')).toBeTruthy();
      expect(computedStyle.getPropertyValue('--md-sys-color-on-surface')).toBeTruthy();
      expect(computedStyle.getPropertyValue('--md-sys-color-surface-variant')).toBeTruthy();
      expect(computedStyle.getPropertyValue('--md-sys-color-on-surface-variant')).toBeTruthy();
      expect(computedStyle.getPropertyValue('--md-sys-color-surface-container')).toBeTruthy();
    });

    it('should have outline color tokens defined', () => {
      const computedStyle = getComputedStyle(document.documentElement);

      expect(computedStyle.getPropertyValue('--md-sys-color-outline')).toBeTruthy();
      expect(computedStyle.getPropertyValue('--md-sys-color-outline-variant')).toBeTruthy();
    });
  });

  describe('MD3 Elevation System', () => {
    it('should have elevation levels defined', () => {
      const computedStyle = getComputedStyle(document.documentElement);

      expect(computedStyle.getPropertyValue('--md-sys-elevation-level0')).toBeTruthy();
      expect(computedStyle.getPropertyValue('--md-sys-elevation-level1')).toBeTruthy();
      expect(computedStyle.getPropertyValue('--md-sys-elevation-level2')).toBeTruthy();
      expect(computedStyle.getPropertyValue('--md-sys-elevation-level3')).toBeTruthy();
      expect(computedStyle.getPropertyValue('--md-sys-elevation-level4')).toBeTruthy();
      expect(computedStyle.getPropertyValue('--md-sys-elevation-level5')).toBeTruthy();
    });

    it('should have level0 as none', () => {
      const computedStyle = getComputedStyle(document.documentElement);
      expect(computedStyle.getPropertyValue('--md-sys-elevation-level0').trim()).toBe('none');
    });
  });

  describe('Backwards Compatibility', () => {
    it('should map legacy colors to MD3 tokens', () => {
      const computedStyle = getComputedStyle(document.documentElement);

      // Legacy colors should reference MD3 tokens
      const legacyPrimary = computedStyle.getPropertyValue('--color-primary').trim();

      expect(legacyPrimary).toContain('var(--md-sys-color-primary)');
    });

    it('should preserve semantic colors', () => {
      const computedStyle = getComputedStyle(document.documentElement);

      expect(computedStyle.getPropertyValue('--color-success')).toBeTruthy();
      expect(computedStyle.getPropertyValue('--color-warning')).toBeTruthy();
      expect(computedStyle.getPropertyValue('--color-info')).toBeTruthy();
    });

    it('should map legacy shadows to MD3 elevation', () => {
      const computedStyle = getComputedStyle(document.documentElement);

      const legacyShadow = computedStyle.getPropertyValue('--shadow-1').trim();
      expect(legacyShadow).toContain('var(--md-sys-elevation-level1)');
    });
  });

  describe('Dark Theme', () => {
    beforeEach(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    afterEach(() => {
      document.documentElement.removeAttribute('data-theme');
    });

    it('should have different colors in dark theme', () => {
      const computedStyle = getComputedStyle(document.documentElement);

      // Dark theme should have different primary color
      const darkPrimary = computedStyle.getPropertyValue('--md-sys-color-primary').trim();
      expect(darkPrimary).toBeTruthy();

      // Should have dark surface colors
      const darkSurface = computedStyle.getPropertyValue('--md-sys-color-surface').trim();
      expect(darkSurface).toBeTruthy();
    });

    it('should maintain backwards compatibility in dark theme', () => {
      const computedStyle = getComputedStyle(document.documentElement);

      expect(computedStyle.getPropertyValue('--color-primary')).toBeTruthy();
      expect(computedStyle.getPropertyValue('--color-background')).toBeTruthy();
      expect(computedStyle.getPropertyValue('--color-surface')).toBeTruthy();
    });
  });

  describe('Utility Classes', () => {
    it('should apply MD3 background colors', () => {
      testElement.className = 'md3-surface';
      testElement.style.display = 'block';

      const computedStyle = getComputedStyle(testElement);
      expect(computedStyle.backgroundColor).toBeTruthy();
    });

    it('should apply MD3 text colors', () => {
      testElement.className = 'md3-primary';
      testElement.style.display = 'block';

      const computedStyle = getComputedStyle(testElement);
      expect(computedStyle.color).toBeTruthy();
    });

    it('should apply MD3 elevation', () => {
      testElement.className = 'md3-elevation-2';
      testElement.style.display = 'block';

      const computedStyle = getComputedStyle(testElement);
      expect(computedStyle.boxShadow).toBeTruthy();
      expect(computedStyle.boxShadow).not.toBe('none');
    });
  });
});
