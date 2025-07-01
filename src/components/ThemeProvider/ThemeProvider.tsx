import { createContext } from 'preact';
import { useContext, useEffect, useState, useRef } from 'preact/hooks';

import { injectUtilityStyles, type UtilityClassConfig } from '../../utils/cssUtilities';

import type { ThemeConfig, ThemeContextValue, ThemeMode, ThemeStorage, ThemeTarget } from './types';
import { localStorageAdapter, documentElementTarget, preventThemeFlicker } from './storageAdapters';

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children: preact.ComponentChildren;
  defaultTheme?: ThemeConfig;
  storageKey?: string;
  // Universal interfaces - can be swapped for Redux, Signal, etc.
  storageAdapter?: ThemeStorage;
  domTarget?: ThemeTarget;
  // Enhanced features
  autoGlobalStyles?: boolean;
  generateUtilities?: boolean;
  cssVariablesPrefix?: string;
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
  // Default adapters - localStorage and document.documentElement
  storageAdapter = localStorageAdapter,
  domTarget = documentElementTarget,
  // Enhanced features
  autoGlobalStyles = false,
  generateUtilities = false,
  cssVariablesPrefix = 'aurora',
}: ThemeProviderProps) {
  // Initialize theme synchronously to prevent flicker
  const [theme, setThemeState] = useState<ThemeConfig>(() =>
    getInitialTheme(defaultTheme, storageKey, storageAdapter, domTarget),
  );

  // Reference to utility cleanup function
  const utilityCleanupRef = useRef<(() => void) | null>(null);
  const globalStylesCleanupRef = useRef<(() => void) | null>(null);

  // Function to inject global styles
  const injectGlobalStyles = (): (() => void) => {
    if (typeof document === 'undefined') {
      return () => { }; // No-op for SSR
    }

    const globalCSS = `
      /* Aurora UI Global Styles */
      * {
        box-sizing: border-box;
      }

      html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        max-width: 100vw;
        overflow-x: hidden;
        box-sizing: border-box;
      }

      html {
        height: 100%;
      }

      body {
        height: 100%;
        font-family: var(--font-family-base, system-ui, -apple-system, sans-serif);
        background: var(--md-sys-color-background, #fef7ff);
        color: var(--md-sys-color-on-background, #1d1b20);
        line-height: 1.5;
      }
    `;

    const styleId = `aurora-ui-global-styles-${cssVariablesPrefix}`;

    // Remove existing styles with same ID
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
      existingStyle.remove();
    }

    // Create and inject new style element
    const styleElement = document.createElement('style');
    styleElement.id = styleId;
    styleElement.textContent = globalCSS;
    document.head.appendChild(styleElement);

    // Return cleanup function
    return () => {
      const element = document.getElementById(styleId);
      if (element) {
        element.remove();
      }
    };
  };

  // Handle automatic global styles injection
  useEffect(() => {
    if (!autoGlobalStyles) {
      return;
    }

    // Clean up previous global styles
    if (globalStylesCleanupRef.current) {
      globalStylesCleanupRef.current();
    }

    // Inject global styles
    globalStylesCleanupRef.current = injectGlobalStyles();

    // Cleanup on unmount
    return () => {
      if (globalStylesCleanupRef.current) {
        globalStylesCleanupRef.current();
        globalStylesCleanupRef.current = null;
      }
    };
  }, [autoGlobalStyles, cssVariablesPrefix]);

  // Handle utility class generation
  useEffect(() => {
    if (!generateUtilities) {
      return;
    }

    // Clean up previous utilities
    if (utilityCleanupRef.current) {
      utilityCleanupRef.current();
    }

    // Generate and inject new utilities
    const config: UtilityClassConfig = {
      prefix: cssVariablesPrefix,
      generateBackgrounds: true,
      generateTextColors: true,
      generateBorderColors: true,
      generateSpacing: true,
      includeResponsive: false, // Can be made configurable later
    };

    utilityCleanupRef.current = injectUtilityStyles(config);

    // Cleanup on unmount
    return () => {
      if (utilityCleanupRef.current) {
        utilityCleanupRef.current();
        utilityCleanupRef.current = null;
      }
    };
  }, [generateUtilities, cssVariablesPrefix]);

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
