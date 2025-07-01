import { Button, Card, useTheme, AuroraProvider } from './components';

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

// Test the Quick Start Guide setup
function QuickStartDemo() {
  return (
    <AuroraProvider>
      <DemoApp />
    </AuroraProvider>
  );
}

// Export for testing
export { QuickStartDemo };
