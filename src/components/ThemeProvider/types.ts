export type ThemeMode = "light" | "dark" | "auto";

export interface ThemeColors {
  primary: string;
  "primary-dark": string;
  "primary-light": string;
  secondary: string;
  "secondary-dark": string;
  "secondary-light": string;
  success: string;
  warning: string;
  error: string;
  info: string;
  background: string;
  surface: string;
  "surface-variant": string;
  "on-surface": string;
  "on-surface-variant": string;
  "on-primary": string;
  "on-secondary": string;
  outline: string;
  "outline-variant": string;
}

export interface ThemeConfig {
  mode: ThemeMode;
  colors?: Partial<ThemeColors>;
  customProperties?: Record<string, string>;
}

export interface ThemeContextValue {
  theme: ThemeConfig;
  setTheme: (theme: Partial<ThemeConfig>) => void;
  toggleMode: () => void;
  isDark: boolean;
}
