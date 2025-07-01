export type ThemeMode = 'light' | 'dark' | 'auto';

// Import enhanced types from our new type system
import type { ThemeBreakpoint } from '../../types/theme';

export interface ThemeColors {
  primary: string;
  'primary-dark': string;
  'primary-light': string;
  secondary: string;
  'secondary-dark': string;
  'secondary-light': string;
  success: string;
  warning: string;
  error: string;
  info: string;
  background: string;
  surface: string;
  'surface-variant': string;
  'on-surface': string;
  'on-surface-variant': string;
  'on-primary': string;
  'on-secondary': string;
  outline: string;
  'outline-variant': string;
}

export interface ThemeConfig {
  mode: ThemeMode;
  colors?: Partial<ThemeColors>;
  customProperties?: Record<string, string>;
}

// Enhanced theme configuration for improved developer experience
export interface EnhancedThemeConfig extends ThemeConfig {
  autoGlobalStyles?: boolean;
  generateUtilities?: boolean;
  cssVariablesPrefix?: string;
  customColors?: Record<string, string>;
  breakpoints?: Partial<Record<ThemeBreakpoint, string>>;
}

// Universal storage interface for different backends (localStorage, Redux, Signal, etc.)
export interface ThemeStorage {
  getTheme: (key: string) => ThemeConfig | null;
  setTheme: (key: string, theme: ThemeConfig) => void;
}

// Universal DOM target interface for different frameworks/environments
export interface ThemeTarget {
  setAttribute: (name: string, value: string) => void;
  getAttribute: (name: string) => string | null;
  setStyleProperty: (property: string, value: string) => void;
}

export interface ThemeContextValue {
  theme: ThemeConfig;
  setTheme: (theme: Partial<ThemeConfig>) => void;
  toggleMode: () => void;
  isDark: boolean;
}

// Enhanced ThemeProvider props with new features
export interface EnhancedThemeProviderProps {
  children: preact.ComponentChildren;
  defaultTheme?: EnhancedThemeConfig;
  storageKey?: string;
  storageAdapter?: ThemeStorage;
  domTarget?: ThemeTarget;
  // New enhanced options
  autoGlobalStyles?: boolean;
  generateUtilities?: boolean;
  cssVariablesPrefix?: string;
}

// Re-export enhanced types for external usage
export type {
  MD3ColorToken,
  ThemeColor,
  ThemeSurface,
  ThemeSpacing,
  ThemeVariant,
  ThemeElevation,
  ThemeBreakpoint,
  ColorProp,
  SpacingProp,
  VariantProp,
} from '../../types/theme';
