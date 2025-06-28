import { createContext } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';

import type { ThemeConfig, ThemeContextValue, ThemeMode, ThemeStorage, ThemeTarget } from './types';
import { localStorageAdapter, documentElementTarget, preventThemeFlicker } from './storageAdapters';

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children: preact.ComponentChildren;
  defaultTheme?: ThemeConfig;
  storageKey?: string;
  // Uniwersalne interfejsy - można podmienić na Redux, Signal, itp.
  storageAdapter?: ThemeStorage;
  domTarget?: ThemeTarget;
}

const DEFAULT_THEME: ThemeConfig = {
  mode: 'light',
};

// Function to get initial theme synchronously to prevent flicker
function getInitialTheme(
  defaultTheme: ThemeConfig,
  storageKey: string,
  storageAdapter: ThemeStorage,
  domTarget: ThemeTarget,
): ThemeConfig {
  // Only access storage in browser environment
  if (typeof window === 'undefined') {
    return defaultTheme;
  }

  try {
    const storedTheme = storageAdapter.getTheme(storageKey);
    if (storedTheme) {
      const initialTheme = { ...defaultTheme, ...storedTheme };

      // Apply theme immediately to prevent flicker using universal interface
      if (initialTheme.mode === 'auto') {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        domTarget.setAttribute('data-theme', mediaQuery.matches ? 'dark' : 'light');
      } else {
        domTarget.setAttribute('data-theme', initialTheme.mode);
      }

      return initialTheme;
    }
  } catch (error) {
    console.warn('Failed to load theme from storage:', error);
  }

  // Apply default theme
  preventThemeFlicker(storageAdapter, domTarget, storageKey, defaultTheme);
  return defaultTheme;
}

export function ThemeProvider({
  children,
  defaultTheme = DEFAULT_THEME,
  storageKey = 'aurora-ui-theme',
  // Domyślne adaptery - localStorage i document.documentElement
  storageAdapter = localStorageAdapter,
  domTarget = documentElementTarget,
}: ThemeProviderProps) {
  // Initialize theme synchronously to prevent flicker
  const [theme, setThemeState] = useState<ThemeConfig>(() =>
    getInitialTheme(defaultTheme, storageKey, storageAdapter, domTarget),
  );

  // Remove the old localStorage loading useEffect since it's now done synchronously

  // Apply theme to document (optimized to prevent flicker)
  useEffect(() => {
    // Handle theme mode using universal DOM target
    if (theme.mode === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const applyAutoTheme = () => {
        const newTheme = mediaQuery.matches ? 'dark' : 'light';
        // Only update if different to prevent unnecessary DOM changes
        if (domTarget.getAttribute('data-theme') !== newTheme) {
          domTarget.setAttribute('data-theme', newTheme);
        }
      };

      applyAutoTheme();
      mediaQuery.addEventListener('change', applyAutoTheme);

      return () => mediaQuery.removeEventListener('change', applyAutoTheme);
    } else {
      // Only update if different to prevent unnecessary DOM changes
      if (domTarget.getAttribute('data-theme') !== theme.mode) {
        domTarget.setAttribute('data-theme', theme.mode);
      }
    }
  }, [theme.mode, domTarget]);

  // Apply custom colors and properties using universal DOM target
  useEffect(() => {
    // Apply custom colors
    if (theme.colors) {
      Object.entries(theme.colors).forEach(([key, value]) => {
        domTarget.setStyleProperty(`--color-${key}`, value);
      });
    }

    // Apply custom properties
    if (theme.customProperties) {
      Object.entries(theme.customProperties).forEach(([key, value]) => {
        domTarget.setStyleProperty(key, value);
      });
    }
  }, [theme.colors, theme.customProperties, domTarget]);

  const setTheme = (newTheme: Partial<ThemeConfig>) => {
    const updatedTheme = { ...theme, ...newTheme };
    setThemeState(updatedTheme);

    // Save using universal storage adapter
    storageAdapter.setTheme(storageKey, updatedTheme);
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
