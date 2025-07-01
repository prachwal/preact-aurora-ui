import { useState } from 'preact/hooks';
import { Button, Card, IconButton, useTheme, Text, Container } from 'preact-aurora-ui';

import preactLogo from './assets/preact.svg';
import viteLogo from './assets/vite.svg';

const SunIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 17.5C15.0376 17.5 17.5 15.0376 17.5 12C17.5 8.96243 15.0376 6.5 12 6.5C8.96243 6.5 6.5 8.96243 6.5 12C6.5 15.0376 8.96243 17.5 12 17.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M12 1.25V2.75M12 21.25V22.75M22.75 12H21.25M2.75 12H1.25M19.0711 4.92893L17.6569 6.34315M6.34315 17.6569L4.92893 19.0711M19.0711 19.0711L17.6569 17.6569M6.34315 6.34315L4.92893 4.92893"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const MoonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M21.0672 11.8568L20.4253 11.469L21.0672 11.8568ZM12.1432 2.93276L11.7553 2.29085V2.29085L12.1432 2.93276ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM12 21.25C6.89137 21.25 2.75 17.1086 2.75 12H1.25C1.25 17.9371 6.06294 22.75 12 22.75V21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.5828 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C11.9115 2.75 11.8077 2.85885 11.7553 2.29085L12.531 3.57467C12.7163 3.46539 12.8837 3.46539 13.069 3.57467L11.7553 2.29085C11.7023 2.14115 11.8885 2.75 12 2.75Z"
      fill="currentColor"
    />
  </svg>
);

function AppContent() {
  const [count, setCount] = useState(0);
  const { toggleMode, isDark, themeReady, forceUpdate } = useTheme();

  // Debug logging
  console.log('AppContent render:', { isDark, themeReady });

  const handleToggleMode = () => {
    console.log('Toggle clicked! Current state:', { isDark, themeReady });

    // Debug: sprawdź aktualne CSS custom properties przed zmianą
    const rootStyle = getComputedStyle(document.documentElement);
    console.log('Before toggle - CSS vars:', {
      surface: rootStyle.getPropertyValue('--md-sys-color-surface'),
      onSurface: rootStyle.getPropertyValue('--md-sys-color-on-surface'),
      surfaceContainer: rootStyle.getPropertyValue('--md-sys-color-surface-container'),
    });

    toggleMode();

    // Debug: sprawdź CSS custom properties po zmianie (z małym opóźnieniem)
    setTimeout(() => {
      const newRootStyle = getComputedStyle(document.documentElement);
      console.log('After toggle - CSS vars:', {
        surface: newRootStyle.getPropertyValue('--md-sys-color-surface'),
        onSurface: newRootStyle.getPropertyValue('--md-sys-color-on-surface'),
        surfaceContainer: newRootStyle.getPropertyValue('--md-sys-color-surface-container'),
        htmlDataTheme: document.documentElement.getAttribute('data-theme'),
        bodyDataTheme: document.body.getAttribute('data-theme'),
      });
    }, 100);
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <Container
        surface="surface"
        padding="md"
        style={{
          borderBottom: '1px solid var(--md-sys-color-outline-variant)',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          <Text variant="headline-medium" as="h1" color="on-surface">
            Vite + Preact + Aurora UI v0.0.13
          </Text>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Text variant="body-small" color="on-surface-variant">
              Theme: {isDark ? 'Dark' : 'Light'} | Ready: {themeReady ? '✅' : '⏳'}
            </Text>
            <IconButton
              variant="standard"
              onClick={handleToggleMode}
              aria-label={isDark ? 'Przełącz na jasny motyw' : 'Przełącz na ciemny motyw'}
              title={isDark ? 'Przełącz na jasny motyw' : 'Przełącz na ciemny motyw'}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </IconButton>
            <Button variant="text" size="small" onClick={forceUpdate}>
              Force Update
            </Button>
          </div>
        </div>
      </Container>

      {/* Main Content */}
      <Container
        surface="surface-container"
        padding="xl"
        style={{ maxWidth: '1200px', margin: '0 auto' }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}
          >
            <a href="https://vite.dev" target="_blank">
              <img src={viteLogo} class="logo" alt="Vite logo" />
            </a>
            <a href="https://preactjs.com" target="_blank">
              <img src={preactLogo} class="logo preact" alt="Preact logo" />
            </a>
          </div>

          <Text variant="headline-large" as="h1" align="center">
            Vite + Preact + Aurora UI
          </Text>

          <Card
            title="Counter Demo"
            subtitle="Przykład użycia komponentów Aurora UI v0.0.13 🎉"
            variant="elevated"
            padding="lg"
            style={{ maxWidth: '400px', margin: '2rem auto' }}
          >
            <div style={{ marginBottom: '1rem' }}>
              <Button variant="filled" size="large" onClick={() => setCount((count) => count + 1)}>
                Count is {count}
              </Button>
            </div>
            <Text variant="body-medium">
              Edit <code>src/app.tsx</code> and save to test HMR
            </Text>
          </Card>

          <Card
            title="Aurora UI v0.0.13 - Enhanced Theme System!"
            variant="elevated"
            padding="md"
            style={{ maxWidth: '600px', margin: '2rem auto' }}
          >
            <Text variant="body-medium" color="auto">
              ✅ <strong>Auto-import styles</strong> - No more manual CSS imports
            </Text>
            <br />
            <Text variant="body-small" color="auto">
              🎨 <strong>Improved theme switching</strong> - Instant color updates with
              MutationObserver
              <br />
              📝 <strong>Enhanced useThemeColors hook</strong> - Real-time color synchronization
              <br />
              🔧 <strong>Better AuroraProvider tests</strong> - Comprehensive test coverage
              <br />⚡ <strong>Zero-config setup</strong> - Works out of the box!
              <br />
              🚀 <strong>Better performance</strong> - Optimized color propagation
            </Text>
            <br />
            <Text variant="body-small" color="auto">
              Check out{' '}
              <a
                href="https://preactjs.com/guide/v10/getting-started#create-a-vite-powered-preact-app"
                target="_blank"
              >
                create-preact
              </a>
              , the official Preact + Vite starter
            </Text>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export function App() {
  return <AppContent />;
}
