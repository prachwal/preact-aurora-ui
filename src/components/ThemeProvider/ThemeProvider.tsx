import { createContext } from 'preact';
import { useContext, useEffect, useState, useRef } from 'preact/hooks';

// Local types to avoid module resolution issues
interface UtilityClassConfig {
  prefix?: string;
  generateBackgrounds?: boolean;
  generateTextColors?: boolean;
  generateBorderColors?: boolean;
  generateSpacing?: boolean;
  includeResponsive?: boolean;
}

// Local implementation of injectUtilityStyles to avoid module resolution issues
function injectUtilityStyles(config: UtilityClassConfig = {}): () => void {
  if (typeof document === 'undefined') {
    return () => { };
  }

  const prefix = config.prefix || 'aurora';
  const css = `
    /* Aurora UI Basic Utilities */
    .${prefix}-bg-primary { background-color: var(--md-sys-color-primary); }
    .${prefix}-bg-secondary { background-color: var(--md-sys-color-secondary); }
    .${prefix}-text-primary { color: var(--md-sys-color-primary); }
    .${prefix}-text-on-surface { color: var(--md-sys-color-on-surface); }
    .${prefix}-p-4 { padding: 1rem; }
    .${prefix}-m-4 { margin: 1rem; }
  `;

  const styleId = `aurora-ui-utilities-${prefix}`;

  const existingStyle = document.getElementById(styleId);
  if (existingStyle) existingStyle.remove();

  const styleElement = document.createElement('style');
  styleElement.id = styleId;
  styleElement.textContent = css;
  document.head.appendChild(styleElement);

  return () => {
    const element = document.getElementById(styleId);
    if (element) element.remove();
  };
}

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
  allowHorizontalScroll?: boolean;
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
        if (typeof window !== 'undefined' && window.matchMedia) {
          const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
          domTarget.setAttribute('data-theme', mediaQuery.matches ? 'dark' : 'light');
        } else {
          // Fallback to light theme in test environment
          domTarget.setAttribute('data-theme', 'light');
        }
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
  allowHorizontalScroll = false,
}: ThemeProviderProps) {
  // Initialize theme synchronously to prevent flicker
  const [theme, setThemeState] = useState<ThemeConfig>(() =>
    getInitialTheme(defaultTheme, storageKey, storageAdapter, domTarget),
  );

  // New in v0.0.8: Theme ready state and force update
  const [themeReady, setThemeReady] = useState(false);
  const [updateCounter, setUpdateCounter] = useState(0);

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
        min-height: 100vh;
        height: auto;
        /* Pozwól deweloperom kontrolować overflow */
        overflow-x: ${allowHorizontalScroll ? 'auto' : 'hidden'};
        overflow-y: auto;
        box-sizing: border-box;
      }

      body {
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
    // Mark theme as ready after initial application
    setThemeReady(true);

    // Handle theme mode using universal DOM target
    if (theme.mode === 'auto') {
      if (typeof window !== 'undefined' && window.matchMedia) {
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
        // Fallback to light theme in test environment
        if (domTarget.getAttribute('data-theme') !== 'light') {
          domTarget.setAttribute('data-theme', 'light');
        }
      }
    } else {
      // Only update if different to prevent unnecessary DOM changes
      if (domTarget.getAttribute('data-theme') !== theme.mode) {
        domTarget.setAttribute('data-theme', theme.mode);
      }
    }
  }, [theme.mode, domTarget, updateCounter]);

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

  // New in v0.0.8: Force update function to fix stale theme issues
  const forceUpdate = () => {
    setUpdateCounter((prev) => prev + 1);
    // Force re-application of theme
    setThemeReady(false);
    setTimeout(() => setThemeReady(true), 50);
  };

  const isDark =
    theme.mode === 'dark' ||
    (theme.mode === 'auto' &&
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  const contextValue: ThemeContextValue = {
    theme,
    setTheme,
    toggleMode,
    isDark,
    // New in v0.0.8
    forceUpdate,
    themeReady,
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
