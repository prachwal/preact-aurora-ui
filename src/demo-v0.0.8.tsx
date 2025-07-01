/**
 * Aurora UI v0.0.8 Demo
 * Demonstracja nowych funkcji: AuroraProvider, smooth transitions, enhanced useTheme
 */

import { render } from 'preact';
import { useState } from 'preact/hooks';

// Import from local components for demo
import { AuroraProvider, useTheme } from './components/AuroraProvider';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { TextField } from './components/TextField';
import { Switch } from './components/Switch';

// Demo component showing enhanced features
function AuroraDemo() {
  const { theme, toggleMode, isDark, forceUpdate, themeReady } = useTheme();
  const [text, setText] = useState('Aurora UI v0.0.8');

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Card title="🌟 Aurora UI v0.0.8 Demo">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p>
            Welcome to Aurora UI v0.0.8! This demo shows the new zero-config setup and enhanced
            theme switching capabilities.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Button onClick={toggleMode} variant="filled">
              {isDark ? '☀️ Switch to Light' : '🌙 Switch to Dark'}
            </Button>

            <Button onClick={forceUpdate} variant="outlined">
              🔄 Force Update
            </Button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <h4>Theme Information</h4>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                <li>
                  Mode: <strong>{theme.mode}</strong>
                </li>
                <li>
                  Is Dark: <strong>{isDark ? 'Yes' : 'No'}</strong>
                </li>
                <li>
                  Theme Ready: <strong>{themeReady ? 'Yes' : 'No'}</strong>
                </li>
              </ul>
            </div>

            <div>
              <h4>Interactive Components</h4>
              <TextField
                label="Try typing here"
                value={text}
                onChange={(e: any) => setText(e.currentTarget.value)}
                placeholder="Aurora UI rocks!"
              />
              <div style={{ marginTop: '8px' }}>
                <Switch
                  checked={isDark}
                  onChange={toggleMode}
                  label={`${isDark ? 'Dark' : 'Light'} mode`}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card title="🚀 New Features in v0.0.8" style={{ marginTop: '20px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '16px',
          }}
        >
          <div>
            <h4>✅ Zero-Config Setup</h4>
            <p>
              Just wrap your app with <code>&lt;AuroraProvider&gt;</code> and you're done!
            </p>
          </div>

          <div>
            <h4>⚡ Smooth Transitions</h4>
            <p>Notice how theme switching is now smooth without any flickering.</p>
          </div>

          <div>
            <h4>🔧 Enhanced useTheme</h4>
            <p>
              New <code>forceUpdate()</code> and <code>themeReady</code> state.
            </p>
          </div>

          <div>
            <h4>🐛 Better DX</h4>
            <p>Development warnings and helpful error messages.</p>
          </div>
        </div>
      </Card>

      <Card title="📖 Getting Started" style={{ marginTop: '20px' }}>
        <div>
          <h4>1. Install</h4>
          <pre
            style={{
              background: 'var(--md-sys-color-surface-variant)',
              padding: '12px',
              borderRadius: '8px',
              overflow: 'auto',
            }}
          >
            <code>npm install preact-aurora-ui</code>
          </pre>

          <h4>2. Setup</h4>
          <pre
            style={{
              background: 'var(--md-sys-color-surface-variant)',
              padding: '12px',
              borderRadius: '8px',
              overflow: 'auto',
            }}
          >
            <code>{`import { AuroraProvider } from 'preact-aurora-ui';

render(
  <AuroraProvider>
    <App />
  </AuroraProvider>,
  document.getElementById('app')
);`}</code>
          </pre>

          <h4>3. Use Components</h4>
          <pre
            style={{
              background: 'var(--md-sys-color-surface-variant)',
              padding: '12px',
              borderRadius: '8px',
              overflow: 'auto',
            }}
          >
            <code>{`import { Button, Card, useTheme } from 'preact-aurora-ui';

function MyComponent() {
  const { toggleMode, isDark } = useTheme();

  return (
    <Card title="Hello Aurora!">
      <Button onClick={toggleMode}>
        Switch to {isDark ? 'Light' : 'Dark'}
      </Button>
    </Card>
  );
}`}</code>
          </pre>
        </div>
      </Card>
    </div>
  );
}

// Main app with error boundary
function App() {
  return (
    <AuroraProvider
      theme="auto"
      config={{
        devMode: true, // Enable development warnings
      }}
      fallback={
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>⚠️ Aurora UI Error</h2>
          <p>Something went wrong loading Aurora UI. Please check the console.</p>
        </div>
      }
    >
      <AuroraDemo />
    </AuroraProvider>
  );
}

// Render the app
render(<App />, document.getElementById('app')!);

export default App;
