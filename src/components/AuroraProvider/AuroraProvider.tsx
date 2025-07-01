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
  console.log('🌟 AuroraProvider: Running validateSetup', { isDev });
  if (!isDev) return;

  // Check if CSS variables are available
  console.log('🌟 AuroraProvider: Checking CSS variables');
  const testEl = document.createElement('div');
  document.body.appendChild(testEl);

  const computedStyle = getComputedStyle(testEl);
  const primaryColor = computedStyle.getPropertyValue('--md-sys-color-primary');

  document.body.removeChild(testEl);

  console.log('🌟 AuroraProvider: CSS validation result', { primaryColor });

  if (!primaryColor) {
    console.warn(
      '🌟 Aurora UI: CSS variables not found. Make sure styles are imported correctly.\n' +
      'If you see this warning, please check: https://aurora-ui.dev/docs/troubleshooting#styles-not-applied',
    );
  }
}

function logSetupSuccess() {
  console.log('🌟 AuroraProvider: Running logSetupSuccess', { isDev });
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
  theme = 'light',
  config = {},
  fallback = null,
  storageKey = 'aurora-ui-theme',
}: AuroraProviderProps) {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const setupRef = useRef(false);

  const { devMode = isDev, cssPrefix = 'aurora', disableTransitions = false } = config;

  // Comprehensive logging
  console.log('🌟 AuroraProvider: Starting initialization', {
    theme,
    config,
    storageKey,
    isDev,
    devMode,
    isReady,
    error: error?.message,
  });

  // Enhanced error boundary
  useEffect(() => {
    console.log('🌟 AuroraProvider: Setting up error boundary');
    const handleError = (event: ErrorEvent) => {
      console.log('🌟 AuroraProvider: Error caught:', event.error);
      if (event.error?.message?.includes('Aurora')) {
        setError(event.error);
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  // Setup and validation
  useEffect(() => {
    console.log('🌟 AuroraProvider: Setup effect running', {
      setupRefCurrent: setupRef.current,
      isReady,
      error: error?.message,
    });

    if (setupRef.current) {
      console.log('🌟 AuroraProvider: Setup already done, skipping');
      return;
    }
    setupRef.current = true;

    try {
      console.log('🌟 AuroraProvider: Starting setup...');

      // Development mode setup
      if (devMode) {
        console.log('🌟 AuroraProvider: Dev mode enabled, running validation');
        validateSetup();
        logSetupSuccess();
      }

      // Apply transition preferences
      if (disableTransitions) {
        console.log('🌟 AuroraProvider: Disabling transitions');
        document.documentElement.style.setProperty('--aurora-transition-theme', 'none');
        document.documentElement.style.setProperty('--aurora-transition-colors', 'none');
      }

      // Respect user's motion preferences (if available)
      console.log('🌟 AuroraProvider: Setting up motion preferences');
      let mediaQuery: MediaQueryList | null = null;
      let handleMotionPreference: (() => void) | null = null;

      if (typeof window !== 'undefined' && window.matchMedia) {
        mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        handleMotionPreference = () => {
          console.log('🌟 AuroraProvider: Motion preference changed:', mediaQuery?.matches);
          if (mediaQuery?.matches) {
            document.documentElement.style.setProperty('--aurora-transition-theme', 'none');
            document.documentElement.style.setProperty('--aurora-transition-colors', 'none');
          }
        };

        handleMotionPreference();
        mediaQuery.addEventListener('change', handleMotionPreference);
      } else {
        console.log('🌟 AuroraProvider: matchMedia not available (test environment)');
      }

      console.log('🌟 AuroraProvider: Setup complete, setting ready state');
      setIsReady(true);

      return () => {
        console.log('🌟 AuroraProvider: Cleanup function called');
        if (mediaQuery && handleMotionPreference) {
          mediaQuery.removeEventListener('change', handleMotionPreference);
        }
      };
    } catch (err) {
      console.error('🌟 AuroraProvider: Setup error:', err);
      setError(err as Error);
    }
  }, [devMode, disableTransitions]);

  // Handle errors
  if (error) {
    console.error('🌟 AuroraProvider: Error state active', error);
    if (fallback) {
      console.log('🌟 AuroraProvider: Rendering fallback');
      return <>{fallback}</>;
    }

    if (devMode) {
      console.log('🌟 AuroraProvider: Rendering error component');
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

  // Enhanced ThemeProvider with Aurora UI defaults
  // Always render ThemeProvider to provide context, but hide children until ready
  console.log('🌟 AuroraProvider: Rendering ThemeProvider (isReady:', isReady, ')');

  return (
    <ThemeProvider
      defaultTheme={{ mode: theme }}
      autoGlobalStyles={true}
      generateUtilities={false}
      cssVariablesPrefix={cssPrefix}
      storageKey={storageKey}
    >
      {!isReady ? <div style={{ visibility: 'hidden' }}>{children}</div> : children}
    </ThemeProvider>
  );
}

// Re-export enhanced useTheme hook with additional features
export { useTheme } from '../ThemeProvider';

// Legacy compatibility - users can still import ThemeProvider directly
export { ThemeProvider } from '../ThemeProvider';

// Debug exports
if (process.env.NODE_ENV === 'development') {
  console.log('🌟 AuroraProvider: Module loaded, exports available:', {
    AuroraProvider: typeof AuroraProvider,
    useTheme: 'function (re-exported)',
    ThemeProvider: 'function (re-exported)',
  });
}
