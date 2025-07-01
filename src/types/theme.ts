/**
 * Enhanced TypeScript Types for Aurora UI
 * Material Design 3 Color System with complete type safety
 */

// Material Design 3 Color Tokens
export type MD3ColorToken =
  | 'primary'
  | 'on-primary'
  | 'primary-container'
  | 'on-primary-container'
  | 'secondary'
  | 'on-secondary'
  | 'secondary-container'
  | 'on-secondary-container'
  | 'tertiary'
  | 'on-tertiary'
  | 'tertiary-container'
  | 'on-tertiary-container'
  | 'error'
  | 'on-error'
  | 'error-container'
  | 'on-error-container'
  | 'background'
  | 'on-background'
  | 'surface'
  | 'on-surface'
  | 'surface-variant'
  | 'on-surface-variant'
  | 'outline'
  | 'outline-variant'
  | 'shadow'
  | 'scrim'
  | 'inverse-surface'
  | 'inverse-on-surface'
  | 'inverse-primary'
  | 'surface-dim'
  | 'surface-bright'
  | 'surface-container-lowest'
  | 'surface-container-low'
  | 'surface-container'
  | 'surface-container-high'
  | 'surface-container-highest';

// Semantic color aliases for better developer experience
export type SemanticColor = 'success' | 'warning' | 'info' | 'danger';

// Combined color system
export type ThemeColor = MD3ColorToken | SemanticColor;

// Theme surface types for Container component
export type ThemeSurface =
  | 'background'
  | 'surface'
  | 'surface-variant'
  | 'surface-container-lowest'
  | 'surface-container-low'
  | 'surface-container'
  | 'surface-container-high'
  | 'surface-container-highest'
  | 'primary-container'
  | 'secondary-container'
  | 'tertiary-container'
  | 'error-container';

// Standardized spacing scale
export type ThemeSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

// Typography variants from Material Design 3
export type ThemeVariant =
  | 'display-large'
  | 'display-medium'
  | 'display-small'
  | 'headline-large'
  | 'headline-medium'
  | 'headline-small'
  | 'title-large'
  | 'title-medium'
  | 'title-small'
  | 'label-large'
  | 'label-medium'
  | 'label-small'
  | 'body-large'
  | 'body-medium'
  | 'body-small';

// Simplified variants for easier usage
export type SimpleThemeVariant = 'display' | 'headline' | 'title' | 'body' | 'label';

// Material Design 3 elevation levels
export type ThemeElevation = 0 | 1 | 2 | 3 | 4 | 5;

// Responsive breakpoints
export type ThemeBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Theme mode
export type ThemeMode = 'light' | 'dark' | 'auto';

// CSS Custom Properties mapping type
export type CSSCustomProperty<T extends string> = `--md-sys-color-${T}`;

// Utility type for CSS custom properties
export type ThemeCSSVariables = {
  [K in MD3ColorToken as CSSCustomProperty<K>]: string;
};

// Enhanced theme configuration
export interface EnhancedThemeConfig {
  mode: ThemeMode;
  autoGlobalStyles?: boolean;
  generateUtilities?: boolean;
  cssVariablesPrefix?: string;
  customColors?: Record<string, string>;
  breakpoints?: Partial<Record<ThemeBreakpoint, string>>;
}

// Color mapping for runtime access
export interface ThemeColors extends Record<ThemeColor, string> {}

// Spacing values mapping
export interface ThemeSpacingValues extends Record<ThemeSpacing, string> {}

// Typography scale mapping
export interface ThemeTypographyScale
  extends Record<
    ThemeVariant,
    {
      fontSize: string;
      lineHeight: string;
      fontWeight: string;
      letterSpacing?: string;
    }
  > {}

// Elevation values mapping
export interface ThemeElevationValues extends Record<ThemeElevation, string> {}

// Utility types for component props
export type ColorProp = ThemeColor | 'inherit' | 'currentColor';
export type SpacingProp = ThemeSpacing | number | string;
export type VariantProp = ThemeVariant | SimpleThemeVariant;

// Runtime theme context interface
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

// Type guards for runtime validation
export const isValidThemeColor = (color: string): color is ThemeColor => {
  const validColors: ThemeColor[] = [
    // MD3 Colors
    'primary',
    'on-primary',
    'primary-container',
    'on-primary-container',
    'secondary',
    'on-secondary',
    'secondary-container',
    'on-secondary-container',
    'tertiary',
    'on-tertiary',
    'tertiary-container',
    'on-tertiary-container',
    'error',
    'on-error',
    'error-container',
    'on-error-container',
    'background',
    'on-background',
    'surface',
    'on-surface',
    'surface-variant',
    'on-surface-variant',
    'outline',
    'outline-variant',
    'shadow',
    'scrim',
    'inverse-surface',
    'inverse-on-surface',
    'inverse-primary',
    'surface-dim',
    'surface-bright',
    'surface-container-lowest',
    'surface-container-low',
    'surface-container',
    'surface-container-high',
    'surface-container-highest',
    // Semantic colors
    'success',
    'warning',
    'info',
    'danger',
  ];
  return validColors.includes(color as ThemeColor);
};

export const isValidThemeSpacing = (spacing: string): spacing is ThemeSpacing => {
  const validSpacing: ThemeSpacing[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];
  return validSpacing.includes(spacing as ThemeSpacing);
};

export const isValidThemeVariant = (variant: string): variant is ThemeVariant => {
  const validVariants: ThemeVariant[] = [
    'display-large',
    'display-medium',
    'display-small',
    'headline-large',
    'headline-medium',
    'headline-small',
    'title-large',
    'title-medium',
    'title-small',
    'label-large',
    'label-medium',
    'label-small',
    'body-large',
    'body-medium',
    'body-small',
  ];
  return validVariants.includes(variant as ThemeVariant);
};
