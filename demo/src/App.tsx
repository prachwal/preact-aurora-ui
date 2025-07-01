import { AuroraProvider, Button, Card, useTheme } from 'preact-aurora-ui';

// Demo component showing Aurora UI v0.0.8 features from NPM package
function ThemeDemo() {
  const { toggleMode, isDark, themeReady, forceUpdate } = useTheme();

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Card title="🚀 Aurora UI Demo - From NPM Package">
        <p>
          This demo application is using Aurora UI components directly from the built NPM package in{' '}
          <code>/dist</code> folder.
        </p>

        <div style={{ margin: '1rem 0' }}>
          <strong>Theme Status:</strong> {themeReady ? '✅ Ready' : '⏳ Loading...'}
          <br />
          <strong>Current Mode:</strong> {isDark ? '🌙 Dark' : '☀️ Light'}
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button onClick={toggleMode} variant="filled">
            Switch to {isDark ? 'Light' : 'Dark'} Mode
          </Button>

          <Button onClick={forceUpdate} variant="outlined">
            Force Update
          </Button>
        </div>
      </Card>

      <Card title="✨ Features Tested" style={{ marginTop: '2rem' }}>
        <ul>
          <li>
            ✅ <strong>NPM Package Import:</strong> Using built package from /dist
          </li>
          <li>
            ✅ <strong>AuroraProvider:</strong> Zero-config setup
          </li>
          <li>
            ✅ <strong>Theme Switching:</strong> Smooth transitions
          </li>
          <li>
            ✅ <strong>Components:</strong> Button, Card working correctly
          </li>
          <li>
            ✅ <strong>useTheme Hook:</strong> All v0.0.8 features
          </li>
          <li>
            ✅ <strong>CSS Styles:</strong> Auto-imported from package
          </li>
        </ul>
      </Card>

      <Card title="🧪 Component Showcase" style={{ marginTop: '2rem' }}>
        <div
          style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          }}
        >
          <Button variant="text">Text Button</Button>
          <Button variant="outlined">Outlined Button</Button>
          <Button variant="filled">Filled Button</Button>
          <Button variant="elevated">Elevated Button</Button>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <Button disabled>Disabled Button</Button>
        </div>
      </Card>

      <Card title="📦 Package Info" style={{ marginTop: '2rem' }}>
        <p>
          <strong>Package:</strong> preact-aurora-ui@0.0.8
        </p>
        <p>
          <strong>Source:</strong> file:../dist (local NPM package)
        </p>
        <p>
          <strong>Demo Port:</strong> 3001
        </p>
        <p>
          <strong>Installation:</strong>
        </p>
        <pre
          style={{
            background: 'var(--md-sys-color-surface-variant)',
            padding: '1rem',
            borderRadius: '8px',
            overflow: 'auto',
          }}
        >
          {`npm install preact-aurora-ui

// Usage:
import { AuroraProvider, Button, Card } from 'preact-aurora-ui';

<AuroraProvider>
  <Card title="Hello">
    <Button>Click me!</Button>
  </Card>
</AuroraProvider>`}
        </pre>
      </Card>
    </div>
  );
}

export function App() {
  return (
    <AuroraProvider>
      <ThemeDemo />
    </AuroraProvider>
  );
}
