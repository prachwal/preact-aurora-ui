/**
 * useThemeColors Hook - Aurora UI Enhanced Theme System
 * Provides runtime access to theme colors with full TypeScript support
 */

import { useMemo } from 'preact/hooks';

import type { ThemeColors, MD3ColorToken, SemanticColor } from '../types/theme';

/**
 * Hook that provides access to all theme colors with runtime resolution
 * Colors are resolved from CSS custom properties for real-time theme switching
 */
export function useThemeColors(): ThemeColors {
  return useMemo(() => {
    // Only access DOM in browser environment
    if (typeof window === 'undefined') {
      return {} as ThemeColors;
    }

    const computedStyle = getComputedStyle(document.documentElement);

    // Helper function to get color value
    const getColor = (colorName: string): string =>
      computedStyle.getPropertyValue(`--md-sys-color-${colorName}`).trim();

    // Material Design 3 color tokens
    const md3Colors: Record<MD3ColorToken, string> = {
      // Primary colors
      primary: getColor('primary'),
      'on-primary': getColor('on-primary'),
      'primary-container': getColor('primary-container'),
      'on-primary-container': getColor('on-primary-container'),

      // Secondary colors
      secondary: getColor('secondary'),
      'on-secondary': getColor('on-secondary'),
      'secondary-container': getColor('secondary-container'),
      'on-secondary-container': getColor('on-secondary-container'),

      // Tertiary colors
      tertiary: getColor('tertiary'),
      'on-tertiary': getColor('on-tertiary'),
      'tertiary-container': getColor('tertiary-container'),
      'on-tertiary-container': getColor('on-tertiary-container'),

      // Error colors
      error: getColor('error'),
      'on-error': getColor('on-error'),
      'error-container': getColor('error-container'),
      'on-error-container': getColor('on-error-container'),

      // Background colors
      background: getColor('background'),
      'on-background': getColor('on-background'),

      // Surface colors
      surface: getColor('surface'),
      'on-surface': getColor('on-surface'),
      'surface-variant': getColor('surface-variant'),
      'on-surface-variant': getColor('on-surface-variant'),

      // Surface container colors
      'surface-dim': getColor('surface-dim'),
      'surface-bright': getColor('surface-bright'),
      'surface-container-lowest': getColor('surface-container-lowest'),
      'surface-container-low': getColor('surface-container-low'),
      'surface-container': getColor('surface-container'),
      'surface-container-high': getColor('surface-container-high'),
      'surface-container-highest': getColor('surface-container-highest'),

      // Outline colors
      outline: getColor('outline'),
      'outline-variant': getColor('outline-variant'),

      // Other colors
      shadow: getColor('shadow'),
      scrim: getColor('scrim'),

      // Inverse colors
      'inverse-surface': getColor('inverse-surface'),
      'inverse-on-surface': getColor('inverse-on-surface'),
      'inverse-primary': getColor('inverse-primary'),
    };

    // Semantic color aliases
    const semanticColors: Record<SemanticColor, string> = {
      success: getColor('success'),
      warning: getColor('warning'),
      info: getColor('info'),
      danger: getColor('danger'),
    };

    // Combine all colors
    return {
      ...md3Colors,
      ...semanticColors,
    } as ThemeColors;
  }, []); // Empty dependency array - colors update automatically via CSS custom properties
}

/**
 * Convenience hook for commonly used colors
 * Provides quick access to the most frequently used color tokens
 */
export function useCommonColors() {
  const colors = useThemeColors();

  return useMemo(
    () => ({
      // Primary colors
      primary: colors.primary,
      onPrimary: colors['on-primary'],
      primaryContainer: colors['primary-container'],

      // Surface colors
      background: colors.background,
      surface: colors.surface,
      surfaceVariant: colors['surface-variant'],

      // Text colors
      onSurface: colors['on-surface'],
      onSurfaceVariant: colors['on-surface-variant'],

      // Status colors
      success: colors.success,
      warning: colors.warning,
      error: colors.error,
      info: colors.info,

      // Border colors
      outline: colors.outline,
      outlineVariant: colors['outline-variant'],
    }),
    [colors],
  );
}

/**
 * Hook for accessing a specific color by name
 * Useful when you need just one color with type safety
 */
export function useThemeColor(colorName: keyof ThemeColors): string {
  const colors = useThemeColors();
  return colors[colorName] || '';
}

/**
 * Hook for creating theme-aware color functions
 * Provides utilities for color manipulation and contrast checking
 */
export function useThemeUtils() {
  const colors = useThemeColors();

  return useMemo(
    () => ({
      /**
       * Get the appropriate text color for a given background
       */
      getContrastText: (backgroundColor: keyof ThemeColors): string => {
        // Simple contrast logic - can be enhanced with proper contrast calculation
        const darkBackgrounds = [
          'primary',
          'secondary',
          'tertiary',
          'error',
          'surface-dim',
          'inverse-surface',
        ];

        if (darkBackgrounds.includes(backgroundColor as string)) {
          return colors['on-primary'] || colors['on-surface'];
        }

        return colors['on-surface'];
      },

      /**
       * Get surface color for elevation level
       */
      getSurfaceColor: (elevation: 0 | 1 | 2 | 3 | 4 | 5 = 0): string => {
        const surfaceMap = {
          0: colors.surface,
          1: colors['surface-container-low'],
          2: colors['surface-container'],
          3: colors['surface-container-high'],
          4: colors['surface-container-highest'],
          5: colors['surface-container-highest'],
        };

        return surfaceMap[elevation] || colors.surface;
      },

      /**
       * Check if current theme is dark mode
       */
      isDarkMode: (): boolean => {
        if (typeof window === 'undefined') return false;
        return document.documentElement.getAttribute('data-theme') === 'dark';
      },

      /**
       * Get CSS custom property name for a color
       */
      getCSSVariable: (colorName: keyof ThemeColors): string => {
        // Convert color name to CSS custom property
        return `--md-sys-color-${colorName}`;
      },

      colors,
    }),
    [colors],
  );
}

/**
 * Development-only hook for debugging colors
 * Only works in development mode to avoid production overhead
 */
export function useColorDebug() {
  const colors = useThemeColors();

  return useMemo(() => {
    if (process.env.NODE_ENV !== 'development') {
      return null;
    }

    return {
      /**
       * Log all current colors to console
       */
      logColors: () => {
        console.group('🎨 Aurora UI Theme Colors');
        Object.entries(colors).forEach(([name, value]) => {
          console.log(`${name}:`, value);
        });
        console.groupEnd();
      },

      /**
       * Get colors as object for inspection
       */
      getColorsObject: () => colors,

      /**
       * Check for missing color values
       */
      validateColors: () => {
        const missing = Object.entries(colors)
          .filter(([, value]) => !value || value === '')
          .map(([name]) => name);

        if (missing.length > 0) {
          console.warn('🚨 Missing color values:', missing);
        }

        return missing;
      },
    };
  }, [colors]);
}
