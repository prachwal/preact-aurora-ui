import { createContext } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';

import type { ThemeConfig, ThemeContextValue, ThemeMode } from './types';

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children: preact.ComponentChildren;
  defaultTheme?: ThemeConfig;
  storageKey?: string;
}

const DEFAULT_THEME: ThemeConfig = {
  mode: 'light',
};

export function ThemeProvider({
  children,
  defaultTheme = DEFAULT_THEME,
  storageKey = 'aurora-ui-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeConfig>(defaultTheme);

  // Load theme from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsedTheme = JSON.parse(stored);
        setThemeState({ ...defaultTheme, ...parsedTheme });
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error);
    }
  }, [storageKey, defaultTheme]);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;

    // Handle theme mode
    if (theme.mode === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const applyAutoTheme = () => {
        root.setAttribute('data-theme', mediaQuery.matches ? 'dark' : 'light');
      };

      applyAutoTheme();
      mediaQuery.addEventListener('change', applyAutoTheme);

      return () => mediaQuery.removeEventListener('change', applyAutoTheme);
    } else {
      root.setAttribute('data-theme', theme.mode);
    }
  }, [theme.mode]);

  // Apply custom colors and properties
  useEffect(() => {
    const root = document.documentElement;

    // Apply custom colors
    if (theme.colors) {
      Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
      });
    }

    // Apply custom properties
    if (theme.customProperties) {
      Object.entries(theme.customProperties).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    }
  }, [theme.colors, theme.customProperties]);

  const setTheme = (newTheme: Partial<ThemeConfig>) => {
    const updatedTheme = { ...theme, ...newTheme };
    setThemeState(updatedTheme);

    try {
      localStorage.setItem(storageKey, JSON.stringify(updatedTheme));
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  };

  const toggleMode = () => {
    const modes: ThemeMode[] = ['light', 'dark'];
    const currentIndex = modes.indexOf(theme.mode === 'auto' ? 'light' : theme.mode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setTheme({ mode: nextMode });
  };

  const isDark =
    theme.mode === 'dark' ||
    (theme.mode === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const contextValue: ThemeContextValue = {
    theme,
    setTheme,
    toggleMode,
    isDark,
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
