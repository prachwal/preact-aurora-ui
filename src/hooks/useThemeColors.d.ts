/**
 * useThemeColors Hook - Aurora UI Enhanced Theme System
 * Provides runtime access to theme colors with full TypeScript support
 */
import type { ThemeColors } from '../types/theme';
/**
 * Hook that provides access to all theme colors with runtime resolution
 * Colors are resolved from CSS custom properties for real-time theme switching
 */
export declare function useThemeColors(): ThemeColors;
/**
 * Convenience hook for commonly used colors
 * Provides quick access to the most frequently used color tokens
 */
export declare function useCommonColors(): {
    primary: string;
    onPrimary: string;
    primaryContainer: string;
    background: string;
    surface: string;
    surfaceVariant: string;
    onSurface: string;
    onSurfaceVariant: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    outline: string;
    outlineVariant: string;
};
/**
 * Hook for accessing a specific color by name
 * Useful when you need just one color with type safety
 */
export declare function useThemeColor(colorName: keyof ThemeColors): string;
/**
 * Hook for creating theme-aware color functions
 * Provides utilities for color manipulation and contrast checking
 */
export declare function useThemeUtils(): {
    /**
     * Get the appropriate text color for a given background
     */
    getContrastText: (backgroundColor: keyof ThemeColors) => string;
    /**
     * Get surface color for elevation level
     */
    getSurfaceColor: (elevation?: 0 | 1 | 2 | 3 | 4 | 5) => string;
    /**
     * Check if current theme is dark mode
     */
    isDarkMode: () => boolean;
    /**
     * Get CSS custom property name for a color
     */
    getCSSVariable: (colorName: keyof ThemeColors) => string;
    colors: ThemeColors;
};
/**
 * Development-only hook for debugging colors
 * Only works in development mode to avoid production overhead
 */
export declare function useColorDebug(): {
    /**
     * Log all current colors to console
     */
    logColors: () => void;
    /**
     * Get colors as object for inspection
     */
    getColorsObject: () => ThemeColors;
    /**
     * Check for missing color values
     */
    validateColors: () => string[];
};
