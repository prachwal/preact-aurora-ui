/**
 * CSS Utilities Generator - Aurora UI Enhanced Theme System
 * Generates utility classes for colors, spacing, and other design tokens
 */
import type { ThemeColors } from '../types/theme';
export interface UtilityClassConfig {
    /** Prefix for all utility classes (default: 'aurora') */
    prefix?: string;
    /** Whether to generate background color utilities */
    generateBackgrounds?: boolean;
    /** Whether to generate text color utilities */
    generateTextColors?: boolean;
    /** Whether to generate border color utilities */
    generateBorderColors?: boolean;
    /** Whether to generate spacing utilities */
    generateSpacing?: boolean;
    /** Custom spacing scale override */
    customSpacing?: Record<string, string>;
    /** Whether to include responsive variants */
    includeResponsive?: boolean;
}
export interface GeneratedUtilities {
    /** Generated CSS rules as string */
    css: string;
    /** Array of generated class names */
    classNames: string[];
    /** Statistics about generated utilities */
    stats: {
        backgroundClasses: number;
        textClasses: number;
        borderClasses: number;
        spacingClasses: number;
        total: number;
    };
}
/**
 * Default spacing scale based on Material Design 3
 */
declare const DEFAULT_SPACING: Record<string, string>;
/**
 * Main utility class generator function
 */
export declare function generateUtilityClasses(config?: UtilityClassConfig): GeneratedUtilities;
/**
 * Create a style element with generated utilities and inject it into the document
 */
export declare function injectUtilityStyles(config?: UtilityClassConfig): () => void;
/**
 * Get available utility class names for autocomplete/intellisense
 */
export declare function getUtilityClassNames(config?: UtilityClassConfig): string[];
/**
 * Type-safe utility class builder
 */
export type UtilityClass = string;
export interface UtilityBuilder {
    bg: (color: keyof ThemeColors) => UtilityClass;
    text: (color: keyof ThemeColors) => UtilityClass;
    border: (color: keyof ThemeColors) => UtilityClass;
    p: (scale: keyof typeof DEFAULT_SPACING) => UtilityClass;
    px: (scale: keyof typeof DEFAULT_SPACING) => UtilityClass;
    py: (scale: keyof typeof DEFAULT_SPACING) => UtilityClass;
    pt: (scale: keyof typeof DEFAULT_SPACING) => UtilityClass;
    pr: (scale: keyof typeof DEFAULT_SPACING) => UtilityClass;
    pb: (scale: keyof typeof DEFAULT_SPACING) => UtilityClass;
    pl: (scale: keyof typeof DEFAULT_SPACING) => UtilityClass;
    m: (scale: keyof typeof DEFAULT_SPACING) => UtilityClass;
    mx: (scale: keyof typeof DEFAULT_SPACING) => UtilityClass;
    my: (scale: keyof typeof DEFAULT_SPACING) => UtilityClass;
    mt: (scale: keyof typeof DEFAULT_SPACING) => UtilityClass;
    mr: (scale: keyof typeof DEFAULT_SPACING) => UtilityClass;
    mb: (scale: keyof typeof DEFAULT_SPACING) => UtilityClass;
    ml: (scale: keyof typeof DEFAULT_SPACING) => UtilityClass;
}
/**
 * Create a type-safe utility class builder
 */
export declare function createUtilityBuilder(prefix?: string): UtilityBuilder;
export {};
