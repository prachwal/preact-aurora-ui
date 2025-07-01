/**
 * Enhanced Types Export - Easy import for all Aurora UI types
 * Centralized export for improved developer experience
 */

import type { ColorProp, SpacingProp, VariantProp, ThemeSurface, ThemeElevation } from './theme';

// Core theme types
export type {
  MD3ColorToken,
  SemanticColor,
  ThemeColor,
  ThemeSurface,
  ThemeSpacing,
  ThemeVariant,
  SimpleThemeVariant,
  ThemeElevation,
  ThemeBreakpoint,
  ThemeMode,
  CSSCustomProperty,
  ThemeCSSVariables,
  EnhancedThemeConfig,
  ThemeColors,
  ThemeSpacingValues,
  ThemeTypographyScale,
  ThemeElevationValues,
  ThemeContextValue,
  ColorProp,
  SpacingProp,
  VariantProp,
} from './theme';

// Type guards
export { isValidThemeColor, isValidThemeSpacing, isValidThemeVariant } from './theme';

// Component specific types will be added here as we create them
export interface ComponentProps {
  children?: preact.ComponentChildren;
  className?: string;
  style?: preact.JSX.CSSProperties;
}

// Common props for enhanced components
export interface BaseComponentProps extends ComponentProps {
  'data-testid'?: string;
}

export interface ThemeAwareComponentProps extends BaseComponentProps {
  color?: ColorProp;
  surface?: ThemeSurface;
}

export interface TypographyComponentProps extends ThemeAwareComponentProps {
  variant?: VariantProp;
  as?: keyof preact.JSX.IntrinsicElements;
}

export interface SpacingComponentProps extends ThemeAwareComponentProps {
  padding?: SpacingProp;
  margin?: SpacingProp;
  gap?: SpacingProp;
}

export interface ElevationComponentProps extends ThemeAwareComponentProps {
  elevation?: ThemeElevation;
}
