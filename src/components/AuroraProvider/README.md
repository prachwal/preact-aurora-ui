# AuroraProvider Component

Zero-config setup provider for Aurora UI that automatically configures all essential library features. This is the main wrapper component that should be placed at the highest level of your application.

## Overview

AuroraProvider offers:

- **Zero-Config Setup**: Automatic configuration of theme, styles, and providers
- **Enhanced Theme Management**: Built on ThemeProvider with additional features
- **Development Mode**: Warnings, debugging, and setup validation
- **SSR Safe**: Server-side rendering compatible
- **Error Handling**: Built-in error boundaries and fallback components
- **Performance Optimized**: Smooth transitions and reduced layout shifts
- **Backwards Compatible**: Works with existing ThemeProvider setups

## Basic Usage

### 1. Simple Setup (Zero-Config)

The simplest way to get started with Aurora UI. Just wrap your application in `AuroraProvider`.

```tsx
// src/main.tsx
import { render } from 'preact';
import { AuroraProvider } from '@aurora-ui/preact-aurora-ui';
import App from './App';

render(
  <AuroraProvider>
    <App />
  </AuroraProvider>,
  document.getElementById('app')!,
);
```

### 2. With Theme Selection

```tsx
// src/main.tsx
import { render } from 'preact';
import { AuroraProvider } from '@aurora-ui/preact-aurora-ui';
import App from './App';

render(
  <AuroraProvider theme="dark">
    <App />
  </AuroraProvider>,
  document.getElementById('app')!,
);
```

### 3. Advanced Configuration

```tsx
// src/main.tsx
import { render } from 'preact';
import { AuroraProvider } from '@aurora-ui/preact-aurora-ui';
import App from './App';
import ErrorFallback from './ErrorFallback';

render(
  <AuroraProvider
    theme="auto"
    config={{
      systemThemeSync: true,
      devMode: true,
      cssPrefix: 'my-app',
      disableTransitions: false,
    }}
    fallback={<ErrorFallback />}
    storageKey="my-app-theme"
  >
    <App />
  </AuroraProvider>,
  document.getElementById('app')!,
);
```

## API Reference

### AuroraProvider Props

| Prop         | Type                          | Default             | Description                       |
| ------------ | ----------------------------- | ------------------- | --------------------------------- |
| `children`   | `ComponentChildren`           | **required**        | Application content               |
| `theme`      | `'light' \| 'dark' \| 'auto'` | `'light'`           | Initial theme mode                |
| `config`     | `AuroraProviderConfig`        | `{}`                | Advanced configuration options    |
| `fallback`   | `ComponentChildren`           | `null`              | Error fallback component          |
| `storageKey` | `string`                      | `'aurora-ui-theme'` | Storage key for theme persistence |

### AuroraProviderConfig Interface

```tsx
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
```

### useTheme Hook (Re-exported)

```tsx
import { useTheme } from '@aurora-ui/preact-aurora-ui';

function MyComponent() {
  const { theme, toggleMode, isDark, themeReady } = useTheme();

  return (
    <div>
      <p>Current theme: {theme.mode}</p>
      <button onClick={toggleMode}>Switch to {isDark ? 'light' : 'dark'} mode</button>
    </div>
  );
}
```

## Advanced Usage

### System Theme Synchronization

```tsx
import { AuroraProvider } from '@aurora-ui/preact-aurora-ui';

function App() {
  return (
    <AuroraProvider theme="auto" config={{ systemThemeSync: true }}>
      <MyApp />
    </AuroraProvider>
  );
}
```

### Development Mode Features

```tsx
import { AuroraProvider } from '@aurora-ui/preact-aurora-ui';

function App() {
  return (
    <AuroraProvider
      config={{
        devMode: true, // Enable in development
        cssPrefix: 'my-app',
      }}
    >
      <MyApp />
    </AuroraProvider>
  );
}

// Development console output:
// 🌟 Aurora UI v0.0.13 initialized successfully!
// 🎨 Theme switching available
// 📚 Docs: https://aurora-ui.dev/docs
// 🐛 Issues: https://github.com/prachwal/preact-aurora-ui/issues
```

### Error Handling

```tsx
import { AuroraProvider } from '@aurora-ui/preact-aurora-ui';

const ErrorFallback = ({ error }) => (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <h2>Something went wrong</h2>
    <p>{error.message}</p>
    <button onClick={() => window.location.reload()}>Reload Page</button>
  </div>
);

function App() {
  return (
    <AuroraProvider fallback={<ErrorFallback />}>
      <MyApp />
    </AuroraProvider>
  );
}
```

### Performance Optimization

```tsx
import { AuroraProvider } from '@aurora-ui/preact-aurora-ui';

function App() {
  return (
    <AuroraProvider
      config={{
        disableTransitions: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      }}
    >
      <MyApp />
    </AuroraProvider>
  );
}
```

## CSS Integration

### Automatic Style Loading

```tsx
// AuroraProvider automatically handles style injection
// No manual imports needed in most cases
import { AuroraProvider } from '@aurora-ui/preact-aurora-ui';

function App() {
  return (
    <AuroraProvider>
      {/* Styles are automatically available */}
      <MyApp />
    </AuroraProvider>
  );
}
```

### Manual CSS Import (Alternative)

```tsx
// For advanced use cases or custom bundling
import '@aurora-ui/preact-aurora-ui/dist/styles/aurora-ui.css';
import { AuroraProvider } from '@aurora-ui/preact-aurora-ui';

function App() {
  return (
    <AuroraProvider>
      <MyApp />
    </AuroraProvider>
  );
}
```

## Migration from ThemeProvider

### Before (ThemeProvider only)

```tsx
import { ThemeProvider } from '@aurora-ui/preact-aurora-ui';

function App() {
  return (
    <ThemeProvider defaultTheme={{ mode: 'light' }}>
      <MyApp />
    </ThemeProvider>
  );
}
```

### After (AuroraProvider)

```tsx
import { AuroraProvider } from '@aurora-ui/preact-aurora-ui';

function App() {
  return (
    <AuroraProvider theme="light">
      <MyApp />
    </AuroraProvider>
  );
}
```

### Gradual Migration

```tsx
// AuroraProvider is backwards compatible
import { AuroraProvider, ThemeProvider } from '@aurora-ui/preact-aurora-ui';

function App() {
  return (
    <AuroraProvider>
      {/* Existing ThemeProvider still works */}
      <ThemeProvider defaultTheme={{ mode: 'dark' }}>
        <LegacyComponent />
      </ThemeProvider>
    </AuroraProvider>
  );
}
```

## Testing

### Basic Testing

```tsx
import { render, screen } from '@testing-library/preact';
import { describe, it, expect, vi } from 'vitest';
import { AuroraProvider } from './AuroraProvider';

const TestComponent = () => <div data-testid="test-content">Test Content</div>;

describe('AuroraProvider', () => {
  it('renders children successfully', () => {
    render(
      <AuroraProvider>
        <TestComponent />
      </AuroraProvider>,
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });

  it('applies theme correctly', () => {
    render(
      <AuroraProvider theme="dark">
        <TestComponent />
      </AuroraProvider>,
    );

    // Check data-theme attribute on document element
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });
});
```

### Testing with Mock Storage

```tsx
import { render } from '@testing-library/preact';
import { vi } from 'vitest';
import { AuroraProvider } from './AuroraProvider';

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('AuroraProvider with storage', () => {
  it('persists theme to storage', () => {
    render(
      <AuroraProvider theme="dark" storageKey="test-theme">
        <div>Test</div>
      </AuroraProvider>,
    );

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'test-theme',
      expect.stringContaining('dark'),
    );
  });
});
```

### Testing Error Boundaries

```tsx
import { render, screen } from '@testing-library/preact';
import { describe, it, expect } from 'vitest';
import { AuroraProvider } from './AuroraProvider';

const ThrowingComponent = () => {
  throw new Error('Test error');
};

const ErrorFallback = () => <div data-testid="error-fallback">Error occurred</div>;

describe('AuroraProvider error handling', () => {
  it('catches errors and shows fallback', () => {
    render(
      <AuroraProvider fallback={<ErrorFallback />}>
        <ThrowingComponent />
      </AuroraProvider>,
    );

    expect(screen.getByTestId('error-fallback')).toBeInTheDocument();
  });
});
```

## Integration Patterns

### With Routing

```tsx
import { Router, Route } from 'preact-router';
import { AuroraProvider } from '@aurora-ui/preact-aurora-ui';

function App() {
  return (
    <AuroraProvider theme="auto">
      <Router>
        <Route path="/" component={Home} />
        <Route path="/settings" component={Settings} />
        <Route path="/profile" component={Profile} />
      </Router>
    </AuroraProvider>
  );
}
```

### With State Management

```tsx
import { Provider } from '@preact/signals';
import { AuroraProvider } from '@aurora-ui/preact-aurora-ui';
import { appState } from './store';

function App() {
  return (
    <Provider value={appState}>
      <AuroraProvider theme="light">
        <MyApp />
      </AuroraProvider>
    </Provider>
  );
}
```

### With Internationalization

```tsx
import { IntlProvider } from 'preact-i18n';
import { AuroraProvider } from '@aurora-ui/preact-aurora-ui';

function App() {
  return (
    <IntlProvider locale="en">
      <AuroraProvider theme="auto">
        <MyApp />
      </AuroraProvider>
    </IntlProvider>
  );
}
```

## Development Features

### Setup Validation

In development mode, AuroraProvider automatically validates:

- CSS variables availability
- Theme system functionality
- Storage adapter compatibility
- DOM target accessibility

### Console Output

```bash
🌟 AuroraProvider: Running validateSetup
🌟 AuroraProvider: Checking CSS variables
🌟 AuroraProvider: CSS validation result { primaryColor: "#6750A4" }
🌟 Aurora UI v0.0.13 initialized successfully!
🎨 Theme switching available
📚 Docs: https://aurora-ui.dev/docs
🐛 Issues: https://github.com/prachwal/preact-aurora-ui/issues
```

### Warning Messages

```bash
⚠️ Aurora UI: CSS variables not found. Make sure styles are imported correctly.
If you see this warning, please check: https://aurora-ui.dev/docs/troubleshooting#styles-not-applied
```

## Related Components

- [ThemeProvider](../ThemeProvider/README.md) - Core theme management system
- [AppLayout](../AppLayout/README.md) - Application layout with theme integration
- [Button](../Button/README.md) - Example themed component

## Troubleshooting

### Common Issues

**Q: CSS styles not applied?**  
A: Ensure you're importing styles correctly or let AuroraProvider handle it automatically.

**Q: Theme not persisting?**  
A: Check `storageKey` and ensure localStorage is available in your environment.

**Q: Console warnings in development?**  
A: These are helpful diagnostics. Disable with `config={{ devMode: false }}` if needed.

**Q: Performance issues?**  
A: Enable `disableTransitions` for reduced motion or performance-critical applications.

### Setup Issues

**Problem**: Styles not loading

```tsx
// Solution: Manual import
import '@aurora-ui/preact-aurora-ui/dist/styles/aurora-ui.css';
```

**Problem**: SSR hydration mismatch

```tsx
// Solution: Wait for theme ready
const { themeReady } = useTheme();
if (!themeReady) return <div>Loading...</div>;
```

**Problem**: Multiple theme providers

```tsx
// Solution: Use single AuroraProvider at root
function App() {
  return (
    <AuroraProvider>
      {' '}
      {/* Single provider */}
      <MyApp />
    </AuroraProvider>
  );
}
```

## Performance Tips

1. **Use single AuroraProvider** at application root
2. **Enable `systemThemeSync`** for better UX
3. **Implement error boundaries** for production resilience
4. **Use `disableTransitions`** for performance-critical scenarios
5. **Monitor console warnings** during development

## Resources

- [Aurora UI Documentation](https://aurora-ui.dev/docs)
- [Material Design 3 Guidelines](https://m3.material.io/)
- [Preact Documentation](https://preactjs.com/)
  <AuroraProvider
  theme="auto"
  config={{
        systemThemeSync: true,
        devMode: true,
        disableTransitions: false,
        cssPrefix: 'my-app',
      }}
  fallback={<ErrorFallback />}
  storageKey="my-app-theme"
  >
      <App />
  </AuroraProvider>,
  document.getElementById('app')!,
  );

````

### 4. Użycie w aplikacji

Po skonfigurowaniu `AuroraProvider`, wszystkie komponenty Aurora UI działają automatycznie:

```tsx
// src/App.tsx
import { Button, Card, useTheme } from 'preact-aurora-ui';

export default function App() {
  const { toggleMode, isDark, themeReady } = useTheme();

  if (!themeReady) {
    return <div>Ładowanie motywu...</div>;
  }

  return (
    <Card title="Hello Aurora UI!">
      <p>Beautiful components with zero configuration.</p>
      <Button onClick={toggleMode}>Switch to {isDark ? 'Light' : 'Dark'} Mode</Button>
    </Card>
  );
}
````

## API

| Prop         | Typ                           | Domyślnie        | Opis                                                                |
| :----------- | :---------------------------- | :--------------- | :------------------------------------------------------------------ |
| `children`   | `ComponentChildren`           | **Wymagane**     | Komponenty aplikacji do opakowania.                                 |
| `theme`      | `'light' \| 'dark' \| 'auto'` | `'auto'`         | Początkowy motyw aplikacji. `'auto'` używa preferencji systemowych. |
| `config`     | `AuroraProviderConfig`        | `{}`             | Zaawansowane opcje konfiguracji.                                    |
| `fallback`   | `ComponentChildren`           | `undefined`      | Komponent fallback dla błędów ładowania.                            |
| `storageKey` | `string`                      | `'aurora-theme'` | Klucz localStorage dla persystencji motywu.                         |

### AuroraProviderConfig

| Opcja                | Typ       | Domyślnie     | Opis                                              |
| :------------------- | :-------- | :------------ | :------------------------------------------------ |
| `systemThemeSync`    | `boolean` | `true`        | Automatyczna synchronizacja z motywem systemowym. |
| `devMode`            | `boolean` | `true` (dev)` | Włącza ostrzeżenia deweloperskie i debugging.     |
| `cssPrefix`          | `string`  | `'aurora'`    | Prefiks dla CSS custom properties.                |
| `disableTransitions` | `boolean` | `false`       | Wyłącza płynne przejścia (poprawa wydajności).    |

## Funkcje

### 🚀 Zero-Config Setup

- Automatyczne importowanie stylów
- Wykrywanie i ostrzeżenia o błędach konfiguracji
- Inteligentne fallbacks

### 🎨 Zarządzanie Motywem

- Automatyczna synchronizacja z preferencjami systemu
- Persystencja wyboru użytkownika w localStorage
- Płynne przejścia między motywami bez migotania

### 🔧 Developer Experience

- Ostrzeżenia w trybie deweloperskim
- Pomocne komunikaty błędów z linkami do rozwiązań
- Walidacja CSS variables i stylów

### ♿ Accessibility

- Reduced motion support
- High contrast themes
- Screen reader announcements dla zmian motywu

## Integracja z ThemeProvider

`AuroraProvider` jest wrapper wokół `ThemeProvider` z dodatkowymi funkcjami:

```tsx
// Te dwa podejścia są równoważne:

// 1. Z AuroraProvider (zalecane)
<AuroraProvider theme="dark">
  <App />
</AuroraProvider>

// 2. Z ThemeProvider (legacy)
<ThemeProvider defaultTheme={{ mode: 'dark' }}>
  <App />
</ThemeProvider>
```

## Troubleshooting

### Błąd: "CSS variables not found"

```tsx
// ✅ POPRAWNIE - importuj style w main.tsx
import 'preact-aurora-ui/dist/styles/aurora-ui.css';
import { AuroraProvider } from 'preact-aurora-ui';

// ❌ BŁĘDNIE - brak importu stylów
import { AuroraProvider } from 'preact-aurora-ui';
```

### Problemy z motywem na SSR

```tsx
// ✅ POPRAWNIE - użyj fallback dla SSR
<AuroraProvider
  theme="light" // explicit theme for SSR
  fallback={<div>Loading theme...</div>}
>
  <App />
</AuroraProvider>
```

## Migracja z v0.0.7

```tsx
// Stary kod (v0.0.7)
import { ThemeProvider } from 'preact-aurora-ui';
import 'preact-aurora-ui/dist/styles/main.css';

<ThemeProvider>
  <App />
</ThemeProvider>;

// Nowy kod (v0.0.8+)
import { AuroraProvider } from 'preact-aurora-ui';
// Automatyczny import stylów

<AuroraProvider>
  <App />
</AuroraProvider>;
```
