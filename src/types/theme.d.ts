/**
 * Enhanced TypeScript Types for Aurora UI
 * Material Design 3 Color System with complete type safety
 */
export type MD3ColorToken = 'primary' | 'on-primary' | 'primary-container' | 'on-primary-container' | 'secondary' | 'on-secondary' | 'secondary-container' | 'on-secondary-container' | 'tertiary' | 'on-tertiary' | 'tertiary-container' | 'on-tertiary-container' | 'error' | 'on-error' | 'error-container' | 'on-error-container' | 'background' | 'on-background' | 'surface' | 'on-surface' | 'surface-variant' | 'on-surface-variant' | 'outline' | 'outline-variant' | 'shadow' | 'scrim' | 'inverse-surface' | 'inverse-on-surface' | 'inverse-primary' | 'surface-dim' | 'surface-bright' | 'surface-container-lowest' | 'surface-container-low' | 'surface-container' | 'surface-container-high' | 'surface-container-highest';
export type SemanticColor = 'success' | 'warning' | 'info' | 'danger';
export type ThemeColor = MD3ColorToken | SemanticColor;
export type ThemeSurface = 'background' | 'surface' | 'surface-variant' | 'surface-container-lowest' | 'surface-container-low' | 'surface-container' | 'surface-container-high' | 'surface-container-highest' | 'primary-container' | 'secondary-container' | 'tertiary-container' | 'error-container';
export type ThemeSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type ThemeVariant = 'display-large' | 'display-medium' | 'display-small' | 'headline-large' | 'headline-medium' | 'headline-small' | 'title-large' | 'title-medium' | 'title-small' | 'label-large' | 'label-medium' | 'label-small' | 'body-large' | 'body-medium' | 'body-small';
export type SimpleThemeVariant = 'display' | 'headline' | 'title' | 'body' | 'label';
export type ThemeElevation = 0 | 1 | 2 | 3 | 4 | 5;
export type ThemeBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ThemeMode = 'light' | 'dark' | 'auto';
export type CSSCustomProperty<T extends string> = `--md-sys-color-${T}`;
export type ThemeCSSVariables = {
    [K in MD3ColorToken as CSSCustomProperty<K>]: string;
};
export interface EnhancedThemeConfig {
    mode: ThemeMode;
    autoGlobalStyles?: boolean;
    generateUtilities?: boolean;
    cssVariablesPrefix?: string;
    customColors?: Record<string, string>;
    breakpoints?: Partial<Record<ThemeBreakpoint, string>>;
}
export interface ThemeColors extends Record<ThemeColor, string> {
}
export interface ThemeSpacingValues extends Record<ThemeSpacing, string> {
}
export interface ThemeTypographyScale extends Record<ThemeVariant, {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    letterSpacing?: string;
}> {
}
export interface ThemeElevationValues extends Record<ThemeElevation, string> {
}
export type ColorProp = ThemeColor | 'inherit' | 'currentColor';
export type SpacingProp = ThemeSpacing | number | string;
export type VariantProp = ThemeVariant | SimpleThemeVariant;
export interface ThemeContextValue {
    mode: ThemeMode;
    colors: ThemeColors;
    spacing: ThemeSpacingValues;
    typography: ThemeTypographyScale;
    elevation: ThemeElevationValues;
    breakpoints: Record<ThemeBreakpoint, string>;
    toggleMode: () => void;
    setMode: (mode: ThemeMode) => void;
}
export declare const isValidThemeColor: (color: string) => color is ThemeColor;
export declare const isValidThemeSpacing: (spacing: string) => spacing is ThemeSpacing;
export declare const isValidThemeVariant: (variant: string) => variant is ThemeVariant;
