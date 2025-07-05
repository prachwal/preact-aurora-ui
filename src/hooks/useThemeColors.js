"use strict";
/**
 * useThemeColors Hook - Aurora UI Enhanced Theme System
 * Provides runtime access to theme colors with full TypeScript support
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThemeColors = useThemeColors;
exports.useCommonColors = useCommonColors;
exports.useThemeColor = useThemeColor;
exports.useThemeUtils = useThemeUtils;
exports.useColorDebug = useColorDebug;
var hooks_1 = require("preact/hooks");
/**
 * Hook that provides access to all theme colors with runtime resolution
 * Colors are resolved from CSS custom properties for real-time theme switching
 */
function useThemeColors() {
    // State to force re-computation when theme changes
    var _a = (0, hooks_1.useState)({}), forceUpdate = _a[1];
    // Get theme state to trigger re-computation when theme changes
    var isClient = typeof window !== 'undefined';
    var currentTheme = isClient ? document.documentElement.getAttribute('data-theme') : null;
    // Listen for theme changes on the document element
    (0, hooks_1.useEffect)(function () {
        if (!isClient)
            return;
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    // Force re-computation when data-theme changes
                    forceUpdate({});
                }
            });
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme'],
        });
        return function () { return observer.disconnect(); };
    }, [isClient]);
    return (0, hooks_1.useMemo)(function () {
        // Only access DOM in browser environment
        if (typeof window === 'undefined') {
            return {};
        }
        var computedStyle = getComputedStyle(document.documentElement);
        // Helper function to get color value
        var getColor = function (colorName) {
            return computedStyle.getPropertyValue("--md-sys-color-".concat(colorName)).trim();
        };
        // Material Design 3 color tokens
        var md3Colors = {
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
        var semanticColors = {
            success: getColor('success'),
            warning: getColor('warning'),
            info: getColor('info'),
            danger: getColor('danger'),
        };
        // Combine all colors
        return __assign(__assign({}, md3Colors), semanticColors);
    }, [currentTheme, forceUpdate]); // Depend on currentTheme and forceUpdate to trigger re-computation
}
/**
 * Convenience hook for commonly used colors
 * Provides quick access to the most frequently used color tokens
 */
function useCommonColors() {
    var colors = useThemeColors();
    return (0, hooks_1.useMemo)(function () { return ({
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
    }); }, [colors]);
}
/**
 * Hook for accessing a specific color by name
 * Useful when you need just one color with type safety
 */
function useThemeColor(colorName) {
    var colors = useThemeColors();
    return colors[colorName] || '';
}
/**
 * Hook for creating theme-aware color functions
 * Provides utilities for color manipulation and contrast checking
 */
function useThemeUtils() {
    var colors = useThemeColors();
    // Also track theme changes for utilities
    var isClient = typeof window !== 'undefined';
    var currentTheme = isClient ? document.documentElement.getAttribute('data-theme') : null;
    return (0, hooks_1.useMemo)(function () { return ({
        /**
         * Get the appropriate text color for a given background
         */
        getContrastText: function (backgroundColor) {
            // Simple contrast logic - can be enhanced with proper contrast calculation
            var darkBackgrounds = [
                'primary',
                'secondary',
                'tertiary',
                'error',
                'surface-dim',
                'inverse-surface',
            ];
            if (darkBackgrounds.includes(backgroundColor)) {
                return colors['on-primary'] || colors['on-surface'];
            }
            return colors['on-surface'];
        },
        /**
         * Get surface color for elevation level
         */
        getSurfaceColor: function (elevation) {
            if (elevation === void 0) { elevation = 0; }
            var surfaceMap = {
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
        isDarkMode: function () {
            if (typeof window === 'undefined')
                return false;
            return document.documentElement.getAttribute('data-theme') === 'dark';
        },
        /**
         * Get CSS custom property name for a color
         */
        getCSSVariable: function (colorName) {
            // Convert color name to CSS custom property
            return "--md-sys-color-".concat(colorName);
        },
        colors: colors,
    }); }, [colors, currentTheme]);
}
/**
 * Development-only hook for debugging colors
 * Only works in development mode to avoid production overhead
 */
function useColorDebug() {
    var colors = useThemeColors();
    return (0, hooks_1.useMemo)(function () {
        if (process.env.NODE_ENV !== 'development') {
            return null;
        }
        return {
            /**
             * Log all current colors to console
             */
            logColors: function () {
                console.group('🎨 Aurora UI Theme Colors');
                Object.entries(colors).forEach(function (_a) {
                    var name = _a[0], value = _a[1];
                    console.log("".concat(name, ":"), value);
                });
                console.groupEnd();
            },
            /**
             * Get colors as object for inspection
             */
            getColorsObject: function () { return colors; },
            /**
             * Check for missing color values
             */
            validateColors: function () {
                var missing = Object.entries(colors)
                    .filter(function (_a) {
                    var value = _a[1];
                    return !value || value === '';
                })
                    .map(function (_a) {
                    var name = _a[0];
                    return name;
                });
                if (missing.length > 0) {
                    console.warn('🚨 Missing color values:', missing);
                }
                return missing;
            },
        };
    }, [colors]);
}
