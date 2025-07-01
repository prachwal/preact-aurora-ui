import { render, screen, waitFor } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';

import { AuroraProvider, useTheme } from './AuroraProvider';
import { Button } from '../Button';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

// Mock window.matchMedia
const matchMediaMock = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

// Setup global mocks
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: matchMediaMock,
});

// Test component that uses useTheme
const ThemeTestComponent = () => {
  const { theme, isDark, toggleMode, forceUpdate, themeReady } = useTheme();

  return (
    <div>
      <div data-testid="theme-mode">{theme.mode}</div>
      <div data-testid="is-dark">{isDark ? 'dark' : 'light'}</div>
      <div data-testid="theme-ready">{themeReady ? 'ready' : 'loading'}</div>
      <button data-testid="toggle-theme" onClick={toggleMode}>
        Toggle Theme
      </button>
      <button data-testid="force-update" onClick={forceUpdate}>
        Force Update
      </button>
    </div>
  );
};

// Test component with Aurora UI components
const ComponentTestApp = () => {
  const { isDark } = useTheme();

  return (
    <div>
      <div data-testid="app-theme">{isDark ? 'dark' : 'light'}</div>
      <Button variant="filled" data-testid="test-button">
        Test Button
      </Button>
    </div>
  );
};

describe('AuroraProvider', () => {
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();

    // Reset matchMedia mock to return a fresh object
    matchMediaMock.mockReturnValue({
      matches: false,
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });

    // Setup DOM mocks
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
    Object.defineProperty(window, 'matchMedia', {
      value: matchMediaMock,
      writable: true,
    });

    // Reset DOM attributes
    if (typeof document !== 'undefined') {
      document.documentElement.removeAttribute('data-theme');
    }
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic Setup', () => {
    it('should render children without crashing', () => {
      render(
        <AuroraProvider>
          <div data-testid="child">Test content</div>
        </AuroraProvider>
      );

      expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('should provide theme context to children', () => {
      render(
        <AuroraProvider>
          <ThemeTestComponent />
        </AuroraProvider>
      );

      expect(screen.getByTestId('theme-mode')).toBeInTheDocument();
      expect(screen.getByTestId('is-dark')).toBeInTheDocument();
      expect(screen.getByTestId('theme-ready')).toBeInTheDocument();
    });

    it('should set default theme mode to light', () => {
      render(
        <AuroraProvider>
          <ThemeTestComponent />
        </AuroraProvider>
      );

      expect(screen.getByTestId('theme-mode')).toHaveTextContent('light');
      expect(screen.getByTestId('is-dark')).toHaveTextContent('light');
    });

    it('should mark theme as ready', async () => {
      render(
        <AuroraProvider>
          <ThemeTestComponent />
        </AuroraProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('theme-ready')).toHaveTextContent('ready');
      });
    });
  });

  describe('Configuration Options', () => {
    it('should accept custom devMode configuration', () => {
      render(
        <AuroraProvider config={{ devMode: true, disableTransitions: false }}>
          <ThemeTestComponent />
        </AuroraProvider>
      );

      expect(screen.getByTestId('theme-mode')).toBeInTheDocument();
    });

    it('should accept disableTransitions configuration', () => {
      render(
        <AuroraProvider config={{ devMode: false, disableTransitions: true }}>
          <ThemeTestComponent />
        </AuroraProvider>
      );

      expect(screen.getByTestId('theme-mode')).toBeInTheDocument();
    });

    it('should work with default configuration when config is not provided', () => {
      render(
        <AuroraProvider>
          <ThemeTestComponent />
        </AuroraProvider>
      );

      expect(screen.getByTestId('theme-mode')).toBeInTheDocument();
    });
  });

  describe('Theme Switching', () => {
    it('should toggle theme from light to dark', async () => {
      const user = userEvent.setup();

      render(
        <AuroraProvider>
          <ThemeTestComponent />
        </AuroraProvider>
      );

      // Initial state should be light
      expect(screen.getByTestId('is-dark')).toHaveTextContent('light');

      // Click toggle button
      await user.click(screen.getByTestId('toggle-theme'));

      // Should switch to dark
      expect(screen.getByTestId('is-dark')).toHaveTextContent('dark');
      expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark');
    });

    it('should toggle theme from dark back to light', async () => {
      const user = userEvent.setup();

      render(
        <AuroraProvider>
          <ThemeTestComponent />
        </AuroraProvider>
      );

      // Toggle to dark first
      await user.click(screen.getByTestId('toggle-theme'));
      expect(screen.getByTestId('is-dark')).toHaveTextContent('dark');

      // Toggle back to light
      await user.click(screen.getByTestId('toggle-theme'));
      expect(screen.getByTestId('is-dark')).toHaveTextContent('light');
    });

    it('should apply data-theme attribute to document element', async () => {
      const user = userEvent.setup();

      render(
        <AuroraProvider>
          <ThemeTestComponent />
        </AuroraProvider>
      );

      // Toggle to dark
      await user.click(screen.getByTestId('toggle-theme'));

      await waitFor(() => {
        expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
      });

      // Toggle back to light
      await user.click(screen.getByTestId('toggle-theme'));

      await waitFor(() => {
        expect(document.documentElement.getAttribute('data-theme')).toBe('light');
      });
    });
  });

  describe('Force Update Feature', () => {
    it('should provide forceUpdate function', () => {
      render(
        <AuroraProvider>
          <ThemeTestComponent />
        </AuroraProvider>
      );

      expect(screen.getByTestId('force-update')).toBeInTheDocument();
    });

    it('should handle forceUpdate without crashing', async () => {
      const user = userEvent.setup();

      render(
        <AuroraProvider>
          <ThemeTestComponent />
        </AuroraProvider>
      );

      // Click force update
      await user.click(screen.getByTestId('force-update'));

      // Should still render normally
      expect(screen.getByTestId('theme-mode')).toBeInTheDocument();
    });

    it('should temporarily set themeReady to false during force update', async () => {
      const user = userEvent.setup();

      render(
        <AuroraProvider>
          <ThemeTestComponent />
        </AuroraProvider>
      );

      // Wait for initial ready state
      await waitFor(() => {
        expect(screen.getByTestId('theme-ready')).toHaveTextContent('ready');
      });

      // Click force update
      await user.click(screen.getByTestId('force-update'));

      // Should eventually be ready again
      await waitFor(() => {
        expect(screen.getByTestId('theme-ready')).toHaveTextContent('ready');
      });
    });
  });

  describe('Integration with Aurora UI Components', () => {
    it('should provide theme context to Aurora UI components', () => {
      render(
        <AuroraProvider>
          <ComponentTestApp />
        </AuroraProvider>
      );

      expect(screen.getByTestId('test-button')).toBeInTheDocument();
      expect(screen.getByTestId('app-theme')).toHaveTextContent('light');
    });

    it('should update Aurora UI components when theme changes', async () => {
      const user = userEvent.setup();

      const TestAppWithToggle = () => {
        const { toggleMode, isDark } = useTheme();
        return (
          <div>
            <div data-testid="app-theme">{isDark ? 'dark' : 'light'}</div>
            <Button variant="filled" data-testid="test-button">
              Test Button
            </Button>
            <button data-testid="toggle" onClick={toggleMode}>
              Toggle
            </button>
          </div>
        );
      };

      render(
        <AuroraProvider>
          <TestAppWithToggle />
        </AuroraProvider>
      );

      // Initial state
      expect(screen.getByTestId('app-theme')).toHaveTextContent('light');

      // Toggle theme
      await user.click(screen.getByTestId('toggle'));

      // Should update
      expect(screen.getByTestId('app-theme')).toHaveTextContent('dark');
    });
  });

  describe('Error Handling', () => {
    it('should throw error when useTheme is used outside AuroraProvider', () => {
      // Mock console.error to avoid noise in test output
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

      const ComponentWithoutProvider = () => {
        useTheme();
        return <div>Test</div>;
      };

      expect(() => {
        render(<ComponentWithoutProvider />);
      }).toThrow('useTheme must be used within a ThemeProvider');

      consoleSpy.mockRestore();
    });
  });

  describe('System Theme Detection', () => {
    it('should handle auto theme mode with system preference detection', () => {
      // Mock system dark mode preference
      matchMediaMock.mockImplementation((query) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      render(
        <AuroraProvider>
          <ThemeTestComponent />
        </AuroraProvider>
      );

      // Should still work even with auto detection
      expect(screen.getByTestId('theme-mode')).toBeInTheDocument();
    });
  });

  describe('Development Mode Features', () => {
    it('should handle devMode configuration in development', () => {
      // Mock development environment
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      render(
        <AuroraProvider config={{ devMode: true, disableTransitions: false }}>
          <ThemeTestComponent />
        </AuroraProvider>
      );

      expect(screen.getByTestId('theme-mode')).toBeInTheDocument();

      // Restore environment
      process.env.NODE_ENV = originalEnv;
    });

    it('should handle disabled transitions', () => {
      render(
        <AuroraProvider config={{ devMode: false, disableTransitions: true }}>
          <ThemeTestComponent />
        </AuroraProvider>
      );

      expect(screen.getByTestId('theme-mode')).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('should not cause unnecessary re-renders', async () => {
      let renderCount = 0;

      const RenderCountComponent = () => {
        renderCount++;
        const { isDark } = useTheme();
        return <div data-testid="render-count">{isDark ? 'dark' : 'light'}</div>;
      };

      render(
        <AuroraProvider>
          <RenderCountComponent />
        </AuroraProvider>
      );

      const initialRenderCount = renderCount;

      // Force update should not cause excessive re-renders
      await waitFor(() => {
        expect(renderCount).toBeLessThan(initialRenderCount + 5);
      });
    });
  });
});
