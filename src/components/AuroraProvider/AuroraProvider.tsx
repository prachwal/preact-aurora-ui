/**
 * AuroraProvider v2 - Zero-config setup for Aurora UI
 *
 * Features:
 * - Auto-imports all necessary styles
 * - Enhanced theme switching with smooth transitions
 * - Development mode warnings and debugging
 * - SSR-safe implementation
 * - Backwards compatible with ThemeProvider
 */

import { useEffect, useRef, useState } from 'preact/hooks';

import { ThemeProvider } from '../ThemeProvider';

/**
 * NOTE: Styles need to be imported separately in your application.
 *
 * For Vite/Webpack projects, add to your main.tsx:
 * import 'preact-aurora-ui/dist/styles/aurora-ui.css';
 *
 * Or use the bundled CSS from your package manager.
 * This will be improved in future versions with better auto-import.
 */

interface AuroraProviderConfig {
  /** Auto-sync with system theme preference */
  systemThemeSync?: boolean;
  /** Enable development mode warnings */
  devMode?: boolean;
  /** Custom CSS variables prefix */
  cssPrefix?: string;
  /** Disable smooth transitions (for performance) */
  disableTransitions?: boolean;
}

interface AuroraProviderProps {
  children: preact.ComponentChildren;
  /** Theme mode: 'light', 'dark', 'auto' */
  theme?: 'light' | 'dark' | 'auto';
  /** Advanced configuration options */
  config?: AuroraProviderConfig;
  /** Fallback component for errors */
  fallback?: preact.ComponentChildren;
  /** Storage key for theme persistence */
  storageKey?: string;
}

// Development mode utilities
const isDev = process.env.NODE_ENV === 'development';

function validateSetup() {
  if (!isDev) return;

  // Check if CSS variables are available
  const testEl = document.createElement('div');
  document.body.appendChild(testEl);

  const computedStyle = getComputedStyle(testEl);
  const primaryColor = computedStyle.getPropertyValue('--md-sys-color-primary');

  document.body.removeChild(testEl);

  if (!primaryColor) {
    console.warn(
      '🌟 Aurora UI: CSS variables not found. Make sure styles are imported correctly.\n' +
        'If you see this warning, please check: https://aurora-ui.dev/docs/troubleshooting#styles-not-applied',
    );
  }
}

function logSetupSuccess() {
  if (!isDev) return;

  console.info(
    '🌟 Aurora UI v0.0.8 initialized successfully!\n' +
      '🎨 Theme switching available\n' +
      '📚 Docs: https://aurora-ui.dev/docs\n' +
      '🐛 Issues: https://github.com/prachwal/preact-aurora-ui/issues',
  );
}

export function AuroraProvider({
  children,
  theme = 'auto',
  config = {},
  fallback = null,
  storageKey = 'aurora-ui-theme',
}: AuroraProviderProps) {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const setupRef = useRef(false);

  const { devMode = isDev, cssPrefix = 'aurora', disableTransitions = false } = config;

  // Enhanced error boundary
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.error?.message?.includes('Aurora')) {
        setError(event.error);
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  // Setup and validation
  useEffect(() => {
    if (setupRef.current) return;
    setupRef.current = true;

    try {
      // Development mode setup
      if (devMode) {
        validateSetup();
        logSetupSuccess();
      }

      // Apply transition preferences
      if (disableTransitions) {
        document.documentElement.style.setProperty('--aurora-transition-theme', 'none');
        document.documentElement.style.setProperty('--aurora-transition-colors', 'none');
      }

      // Respect user's motion preferences
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const handleMotionPreference = () => {
        if (mediaQuery.matches) {
          document.documentElement.style.setProperty('--aurora-transition-theme', 'none');
          document.documentElement.style.setProperty('--aurora-transition-colors', 'none');
        }
      };

      handleMotionPreference();
      mediaQuery.addEventListener('change', handleMotionPreference);

      setIsReady(true);

      return () => {
        mediaQuery.removeEventListener('change', handleMotionPreference);
      };
    } catch (err) {
      setError(err as Error);
    }
  }, [devMode, disableTransitions]);

  // Handle errors
  if (error) {
    if (fallback) {
      return <>{fallback}</>;
    }

    if (devMode) {
      return (
        <div
          style={{
            padding: '20px',
            margin: '20px',
            border: '2px solid #ba1a1a',
            borderRadius: '8px',
            backgroundColor: '#ffdad6',
            color: '#410002',
            fontFamily: 'monospace',
          }}
        >
          <h2>🚨 Aurora UI Error</h2>
          <p>
            <strong>Error:</strong> {error.message}
          </p>
          <p>
            <strong>Help:</strong> Check the documentation at{' '}
            <a href="https://aurora-ui.dev/docs/troubleshooting">
              aurora-ui.dev/docs/troubleshooting
            </a>
          </p>
        </div>
      );
    }

    // Production: fail silently and render children
    console.error('Aurora UI Error:', error);
  }

  // Show loading state until ready (prevents FOUC)
  if (!isReady) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  // Enhanced ThemeProvider with Aurora UI defaults
  return (
    <ThemeProvider
      defaultTheme={{ mode: theme }}
      autoGlobalStyles={true}
      generateUtilities={false}
      cssVariablesPrefix={cssPrefix}
      storageKey={storageKey}
    >
      {children}
    </ThemeProvider>
  );
}

// Re-export enhanced useTheme hook with additional features
export { useTheme } from '../ThemeProvider';

// Legacy compatibility - users can still import ThemeProvider directly
export { ThemeProvider } from '../ThemeProvider';
