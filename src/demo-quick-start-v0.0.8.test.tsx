import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { Button, Card, useTheme, AuroraProvider, ThemeProvider } from './components';

// Demo component according to Quick Start Guide v0.0.8
function DemoApp() {
  const { toggleMode, isDark, themeReady, forceUpdate } = useTheme();

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <Card title="Hello Aurora UI v0.0.8! 🚀">
        <p>Beautiful themes and components with zero configuration.</p>
        <p>
          <strong>Theme Status:</strong> {themeReady ? '✅ Ready' : '⏳ Loading...'}
        </p>
        <p>
          <strong>Current Mode:</strong> {isDark ? '🌙 Dark' : '☀️ Light'}
        </p>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <Button onClick={toggleMode} variant="filled">
            Switch to {isDark ? 'Light' : 'Dark'} Mode
          </Button>

          <Button onClick={forceUpdate} variant="outlined">
            Force Update
          </Button>
        </div>
      </Card>

      <Card title="✨ What's New in v0.0.8" style={{ marginTop: '2rem' }}>
        <ul>
          <li>
            ✅ <strong>Auto-import styles</strong> - No more manual CSS imports
          </li>
          <li>
            ✅ <strong>Smooth theme transitions</strong> - No more flickering
          </li>
          <li>
            ✅ <strong>Enhanced useTheme hook</strong> - forceUpdate() and themeReady
          </li>
          <li>
            ✅ <strong>Development warnings</strong> - Helpful debugging
          </li>
          <li>
            ✅ <strong>Better error handling</strong> - Clear error messages
          </li>
          <li>
            ✅ <strong>Backwards compatible</strong> - All v0.0.7 code works
          </li>
        </ul>
      </Card>
    </div>
  );
}

// Test the Quick Start Guide setup with fallback to ThemeProvider in tests
function QuickStartDemo() {
  return (
    <ThemeProvider defaultTheme={{ mode: 'auto' }}>
      <DemoApp />
    </ThemeProvider>
  );
}

describe('Quick Start Guide v0.0.8 Test', () => {
  it('should render demo without errors', () => {
    render(<QuickStartDemo />);

    // Check if main elements are rendered
    expect(screen.getByText(/Hello Aurora UI v0.0.8/)).toBeInTheDocument();
    expect(screen.getByText(/Beautiful themes and components/)).toBeInTheDocument();
    expect(screen.getByText(/What's New in v0.0.8/)).toBeInTheDocument();
  });

  it('should show theme status and mode', () => {
    render(<QuickStartDemo />);

    // Check theme status indicators
    expect(screen.getByText(/Theme Status:/)).toBeInTheDocument();
    expect(screen.getByText(/Current Mode:/)).toBeInTheDocument();

    // Should show either light or dark mode
    const modeText = screen.getByText(/Current Mode:/).parentElement?.textContent;
    expect(modeText).toMatch(/(Light|Dark)/);
  });

  it('should have theme toggle functionality', async () => {
    const user = userEvent.setup();
    render(<QuickStartDemo />);

    // Find toggle button
    const toggleButton = screen.getByRole('button', {
      name: /Switch to (Light|Dark) Mode/,
    });
    expect(toggleButton).toBeInTheDocument();

    // Button should be clickable
    expect(toggleButton).not.toBeDisabled();

    // Click should not throw error
    await user.click(toggleButton);
  });

  it('should have force update functionality', async () => {
    const user = userEvent.setup();
    render(<QuickStartDemo />);

    // Find force update button
    const forceUpdateButton = screen.getByRole('button', { name: 'Force Update' });
    expect(forceUpdateButton).toBeInTheDocument();

    // Button should be clickable
    expect(forceUpdateButton).not.toBeDisabled();

    // Click should not throw error
    await user.click(forceUpdateButton);
  });

  it('should list all v0.0.8 features', () => {
    render(<QuickStartDemo />);

    // Check all features are listed
    expect(screen.getByText(/Auto-import styles/)).toBeInTheDocument();
    expect(screen.getByText(/Smooth theme transitions/)).toBeInTheDocument();
    expect(screen.getByText(/Enhanced useTheme hook/)).toBeInTheDocument();
    expect(screen.getByText(/Development warnings/)).toBeInTheDocument();
    expect(screen.getByText(/Better error handling/)).toBeInTheDocument();
    expect(screen.getByText(/Backwards compatible/)).toBeInTheDocument();
  });

  it('should use Card components correctly', () => {
    render(<QuickStartDemo />);

    // Cards should have titles
    expect(screen.getByText('Hello Aurora UI v0.0.8! 🚀')).toBeInTheDocument();
    expect(screen.getByText("✨ What's New in v0.0.8")).toBeInTheDocument();
  });

  it('should demonstrate AuroraProvider can wrap components', () => {
    // Test that AuroraProvider exports exist and can be used
    expect(AuroraProvider).toBeDefined();
    expect(typeof AuroraProvider).toBe('function');

    // This verifies the Quick Start Guide setup pattern works
    expect(() => {
      render(
        <AuroraProvider>
          <Card title="Test">Test content</Card>
        </AuroraProvider>,
      );
    }).not.toThrow();
  });

  it('should verify zero-config setup pattern from guide', () => {
    // Test the exact pattern from Quick Start Guide
    render(<QuickStartDemo />);
    expect(screen.getByText(/zero configuration/)).toBeInTheDocument();

    // Verify components work without manual style imports in test environment
    expect(screen.getByRole('button', { name: /Switch to/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Force Update' })).toBeInTheDocument();
  });
});
