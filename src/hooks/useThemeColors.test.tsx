/**
 * @vitest-environment jsdom
 */

import { renderHook } from '@testing-library/preact';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import {
  useThemeColors,
  useCommonColors,
  useThemeColor,
  useThemeUtils,
  useColorDebug,
} from './useThemeColors';

describe('useThemeColors', () => {
  beforeEach(() => {
    // Mock CSS custom properties
    const mockGetComputedStyle = vi.fn(() => ({
      getPropertyValue: vi.fn((prop: string) => {
        const colorMap: Record<string, string> = {
          '--md-sys-color-primary': '#6750a4',
          '--md-sys-color-on-primary': '#ffffff',
          '--md-sys-color-primary-container': '#eaddff',
          '--md-sys-color-on-primary-container': '#21005d',
          '--md-sys-color-secondary': '#625b71',
          '--md-sys-color-on-secondary': '#ffffff',
          '--md-sys-color-surface': '#fef7ff',
          '--md-sys-color-on-surface': '#1d1b20',
          '--md-sys-color-background': '#fef7ff',
          '--md-sys-color-on-background': '#1d1b20',
          '--md-sys-color-success': '#4caf50',
          '--md-sys-color-warning': '#ff9800',
          '--md-sys-color-error': '#b00020',
          '--md-sys-color-info': '#2196f3',
        };
        return colorMap[prop] || '';
      }),
    }));

    Object.defineProperty(window, 'getComputedStyle', {
      value: mockGetComputedStyle,
    });

    // Mock document.documentElement
    Object.defineProperty(document, 'documentElement', {
      value: {
        getAttribute: vi.fn((name: string) => {
          if (name === 'data-theme') return 'light';
          return null;
        }),
      },
      configurable: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('useThemeColors', () => {
    it('should return theme colors from CSS custom properties', () => {
      const { result } = renderHook(() => useThemeColors());

      expect(result.current).toMatchObject({
        primary: '#6750a4',
        'on-primary': '#ffffff',
        'primary-container': '#eaddff',
        'on-primary-container': '#21005d',
        secondary: '#625b71',
        'on-secondary': '#ffffff',
        surface: '#fef7ff',
        'on-surface': '#1d1b20',
        background: '#fef7ff',
        'on-background': '#1d1b20',
        success: '#4caf50',
        warning: '#ff9800',
        error: '#b00020',
        info: '#2196f3',
      });
    });

    it('should return empty object in SSR environment', () => {
      // Mock server environment
      const originalWindow = global.window;
      // @ts-expect-error - intentionally removing window for SSR test
      delete global.window;

      const { result } = renderHook(() => useThemeColors());

      expect(result.current).toEqual({});

      // Restore window
      global.window = originalWindow;
    });
  });

  describe('useCommonColors', () => {
    it('should return commonly used colors with camelCase names', () => {
      const { result } = renderHook(() => useCommonColors());

      expect(result.current).toMatchObject({
        primary: '#6750a4',
        onPrimary: '#ffffff',
        primaryContainer: '#eaddff',
        background: '#fef7ff',
        surface: '#fef7ff',
        onSurface: '#1d1b20',
        success: '#4caf50',
        warning: '#ff9800',
        error: '#b00020',
        info: '#2196f3',
      });
    });
  });

  describe('useThemeColor', () => {
    it('should return specific color by name', () => {
      const { result } = renderHook(() => useThemeColor('primary'));

      expect(result.current).toBe('#6750a4');
    });

    it('should return empty string for non-existent color', () => {
      const { result } = renderHook(() => useThemeColor('non-existent' as any));

      expect(result.current).toBe('');
    });
  });

  describe('useThemeUtils', () => {
    it('should provide utility functions', () => {
      const { result } = renderHook(() => useThemeUtils());

      expect(result.current).toHaveProperty('getContrastText');
      expect(result.current).toHaveProperty('getSurfaceColor');
      expect(result.current).toHaveProperty('isDarkMode');
      expect(result.current).toHaveProperty('getCSSVariable');
      expect(result.current).toHaveProperty('colors');
    });

    it('should detect dark mode correctly', () => {
      const { result } = renderHook(() => useThemeUtils());

      expect(result.current.isDarkMode()).toBe(false);

      // Mock dark mode
      document.documentElement.getAttribute = vi.fn((name: string) => {
        if (name === 'data-theme') return 'dark';
        return null;
      });

      const { result: darkResult } = renderHook(() => useThemeUtils());
      expect(darkResult.current.isDarkMode()).toBe(true);
    });

    it('should generate CSS variable names correctly', () => {
      const { result } = renderHook(() => useThemeUtils());

      expect(result.current.getCSSVariable('primary')).toBe('--md-sys-color-primary');
      expect(result.current.getCSSVariable('on-surface')).toBe('--md-sys-color-on-surface');
    });

    it('should return appropriate surface colors for elevation', () => {
      const { result } = renderHook(() => useThemeUtils());

      expect(result.current.getSurfaceColor(0)).toBe('#fef7ff'); // surface
      // Test fallback behavior for unmocked colors
      expect(result.current.getSurfaceColor(3)).toBe('#fef7ff'); // falls back to surface
    });
  });

  describe('useColorDebug', () => {
    const originalNodeEnv = process.env.NODE_ENV;

    afterEach(() => {
      process.env.NODE_ENV = originalNodeEnv;
    });

    it('should return debug utilities in development mode', () => {
      process.env.NODE_ENV = 'development';

      const { result } = renderHook(() => useColorDebug());

      expect(result.current).not.toBeNull();
      expect(result.current).toHaveProperty('logColors');
      expect(result.current).toHaveProperty('getColorsObject');
      expect(result.current).toHaveProperty('validateColors');
    });

    it('should return null in production mode', () => {
      process.env.NODE_ENV = 'production';

      const { result } = renderHook(() => useColorDebug());

      expect(result.current).toBeNull();
    });

    it('should validate colors and find missing ones', () => {
      process.env.NODE_ENV = 'development';

      const { result } = renderHook(() => useColorDebug());

      if (result.current) {
        const missing = result.current.validateColors();
        expect(Array.isArray(missing)).toBe(true);
        // Should have missing colors since we only mocked a subset
        expect(missing.length).toBeGreaterThan(0);
      }
    });

    it('should log colors to console in development', () => {
      process.env.NODE_ENV = 'development';
      const consoleSpy = vi.spyOn(console, 'group').mockImplementation(() => {});
      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      const consoleGroupEndSpy = vi.spyOn(console, 'groupEnd').mockImplementation(() => {});

      const { result } = renderHook(() => useColorDebug());

      if (result.current) {
        result.current.logColors();

        expect(consoleSpy).toHaveBeenCalledWith('🎨 Aurora UI Theme Colors');
        expect(consoleLogSpy).toHaveBeenCalled();
        expect(consoleGroupEndSpy).toHaveBeenCalled();
      }

      consoleSpy.mockRestore();
      consoleLogSpy.mockRestore();
      consoleGroupEndSpy.mockRestore();
    });
  });
});
