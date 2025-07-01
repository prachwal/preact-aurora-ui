# ThemeProvider Component

A comprehensive theme management system for Aurora UI with Material Design 3 support, providing universal interfaces for state management and DOM manipulation.

## Overview

ThemeProvider offers:

- **Universal Theme Management**: Light, dark, and auto modes with system preference sync
- **CSS Custom Properties**: Complete MD3 color system and theming
- **Storage Adapters**: Flexible storage backend (localStorage, Redux, Signal, etc.)
- **DOM Targets**: Universal DOM manipulation interface
- **SSR Safe**: Server-side rendering compatible
- **Type Safe**: Full TypeScript support with enhanced type definitions
- **Performance Optimized**: Prevents flicker and optimizes theme transitions

## Basic Usage

### Simple Theme Provider

```tsx
import { ThemeProvider, useTheme } from '@aurora-ui/preact-aurora-ui';
import { Button } from '@aurora-ui/preact-aurora-ui';

function App() {
  return (
    <ThemeProvider defaultTheme={{ mode: 'light' }}>
      <MyComponent />
    </ThemeProvider>
  );
}

function MyComponent() {
  const { theme, toggleMode, isDark } = useTheme();

  return (
    <div>
      <p>Current theme: {theme.mode}</p>
      <Button onClick={toggleMode}>Switch to {isDark ? 'light' : 'dark'} mode</Button>
    </div>
  );
}
```

### With Custom Colors

```tsx
import { ThemeProvider } from '@aurora-ui/preact-aurora-ui';

function App() {
  const customTheme = {
    mode: 'light' as const,
    colors: {
      primary: '#6750A4',
      secondary: '#625B71',
      background: '#FFFBFE',
    },
    customProperties: {
      '--md-sys-color-brand': '#1976D2',
      '--aurora-border-radius': '12px',
    },
  };

  return (
    <ThemeProvider defaultTheme={customTheme} autoGlobalStyles={true} generateUtilities={true}>
      <App />
    </ThemeProvider>
  );
}
```

## API Reference

### ThemeProvider Props

| Prop                 | Type                | Default                 | Description                      |
| -------------------- | ------------------- | ----------------------- | -------------------------------- |
| `children`           | `ComponentChildren` | **required**            | Application content              |
| `defaultTheme`       | `ThemeConfig`       | `{ mode: 'light' }`     | Default theme configuration      |
| `storageKey`         | `string`            | `'aurora-ui-theme'`     | Storage key for persistence      |
| `storageAdapter`     | `ThemeStorage`      | `localStorageAdapter`   | Storage backend interface        |
| `domTarget`          | `ThemeTarget`       | `documentElementTarget` | DOM manipulation interface       |
| `autoGlobalStyles`   | `boolean`           | `false`                 | Auto-inject global CSS utilities |
| `generateUtilities`  | `boolean`           | `false`                 | Generate utility classes         |
| `cssVariablesPrefix` | `string`            | `'aurora'`              | CSS variables prefix             |

### ThemeConfig Interface

```tsx
interface ThemeConfig {
  mode: 'light' | 'dark' | 'auto';
  colors?: Partial<ThemeColors>;
  customProperties?: Record<string, string>;
}

interface ThemeColors {
  primary: string;
  'primary-dark': string;
  'primary-light': string;
  secondary: string;
  background: string;
  surface: string;
  'on-surface': string;
  outline: string;
  // ... and more MD3 color tokens
}
```

### useTheme Hook

```tsx
interface ThemeContextValue {
  theme: ThemeConfig;
  setTheme: (theme: Partial<ThemeConfig>) => void;
  toggleMode: () => void;
  isDark: boolean;
  forceUpdate: () => void;
  themeReady: boolean;
}

const { theme, setTheme, toggleMode, isDark, themeReady } = useTheme();
```

## Advanced Usage

### Custom Storage Adapter

```tsx
import { ThemeProvider, type ThemeStorage } from '@aurora-ui/preact-aurora-ui';

// Redux storage adapter
const reduxStorageAdapter: ThemeStorage = {
  getTheme: (key: string) => {
    const state = store.getState();
    return state.theme;
  },
  setTheme: (key: string, theme: ThemeConfig) => {
    store.dispatch(setTheme(theme));
  },
};

function App() {
  return (
    <ThemeProvider storageAdapter={reduxStorageAdapter}>
      <MyApp />
    </ThemeProvider>
  );
}
```

### Custom DOM Target

```tsx
import { ThemeProvider, type ThemeTarget } from '@aurora-ui/preact-aurora-ui';

// Custom DOM target for specific element
const customTarget: ThemeTarget = {
  setAttribute: (name: string, value: string) => {
    document.getElementById('theme-root')?.setAttribute(name, value);
  },
  getAttribute: (name: string) => {
    return document.getElementById('theme-root')?.getAttribute(name) ?? null;
  },
  setStyleProperty: (property: string, value: string) => {
    document.getElementById('theme-root')?.style.setProperty(property, value);
  },
};

function App() {
  return (
    <ThemeProvider domTarget={customTarget}>
      <div id="theme-root">
        <MyApp />
      </div>
    </ThemeProvider>
  );
}
```

### Theme with Auto System Sync

```tsx
import { ThemeProvider } from '@aurora-ui/preact-aurora-ui';

function App() {
  return (
    <ThemeProvider defaultTheme={{ mode: 'auto' }} storageKey="my-app-theme">
      <MyApp />
    </ThemeProvider>
  );
}
```

## CSS Custom Properties

### Available Theme Variables

```css
/* Material Design 3 Color System */
--md-sys-color-primary
--md-sys-color-on-primary
--md-sys-color-secondary
--md-sys-color-on-secondary
--md-sys-color-surface
--md-sys-color-on-surface
--md-sys-color-background
--md-sys-color-on-background
--md-sys-color-outline
--md-sys-color-outline-variant

/* Aurora UI Extensions */
--aurora-border-radius
--aurora-shadow-elevation-1
--aurora-shadow-elevation-2
--aurora-shadow-elevation-3
--aurora-transition-duration
--aurora-transition-easing
```

### Custom Theme Variables

```tsx
const theme = {
  mode: 'light',
  customProperties: {
    '--my-brand-color': '#FF5722',
    '--my-accent-color': '#FFC107',
    '--my-border-radius': '16px',
  },
};
```

## Accessibility Features

### High Contrast Support

```tsx
function App() {
  const highContrastTheme = {
    mode: 'light',
    colors: {
      primary: '#000000',
      background: '#FFFFFF',
      'on-background': '#000000',
      outline: '#000000',
    },
  };

  return (
    <ThemeProvider defaultTheme={highContrastTheme}>
      <MyApp />
    </ThemeProvider>
  );
}
```

### Reduced Motion Support

```tsx
const theme = {
  mode: 'light',
  customProperties: {
    '--aurora-transition-duration': window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? '0ms'
      : '200ms',
  },
};
```

## Testing

### Testing Theme Changes

```tsx
import { render, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { ThemeProvider, useTheme } from './ThemeProvider';

const TestComponent = () => {
  const { theme, toggleMode, isDark } = useTheme();
  return (
    <div>
      <span data-testid="theme-mode">{theme.mode}</span>
      <span data-testid="is-dark">{isDark.toString()}</span>
      <button data-testid="toggle" onClick={toggleMode}>
        Toggle
      </button>
    </div>
  );
};

describe('ThemeProvider', () => {
  it('provides theme context', () => {
    render(
      <ThemeProvider defaultTheme={{ mode: 'light' }}>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('theme-mode')).toHaveTextContent('light');
    expect(screen.getByTestId('is-dark')).toHaveTextContent('false');
  });

  it('toggles theme mode', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider defaultTheme={{ mode: 'light' }}>
        <TestComponent />
      </ThemeProvider>,
    );

    await user.click(screen.getByTestId('toggle'));
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark');
    expect(screen.getByTestId('is-dark')).toHaveTextContent('true');
  });
});
```

### Mock Storage Adapter

```tsx
import { vi } from 'vitest';
import { type ThemeStorage } from './types';

const mockStorageAdapter: ThemeStorage = {
  getTheme: vi.fn().mockReturnValue(null),
  setTheme: vi.fn(),
};

// Use in tests
render(
  <ThemeProvider storageAdapter={mockStorageAdapter}>
    <TestComponent />
  </ThemeProvider>,
);
```

## Integration Patterns

### With Router

```tsx
import { Router, Route } from '@aurora-ui/router';
import { ThemeProvider } from '@aurora-ui/preact-aurora-ui';

function App() {
  return (
    <ThemeProvider defaultTheme={{ mode: 'auto' }}>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/settings" component={Settings} />
      </Router>
    </ThemeProvider>
  );
}
```

### With Error Boundaries

```tsx
import { ErrorBoundary } from '@aurora-ui/error-boundary';
import { ThemeProvider } from '@aurora-ui/preact-aurora-ui';

function App() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <ThemeProvider defaultTheme={{ mode: 'light' }}>
        <MyApp />
      </ThemeProvider>
    </ErrorBoundary>
  );
}
```

## Related Components

- [AuroraProvider](../AuroraProvider/README.md) - Zero-config setup wrapper
- [ThemeToggle](./ThemeToggle.tsx) - Ready-to-use theme switch component
- [AppLayout](../AppLayout/README.md) - Application layout with theme integration

## Troubleshooting

### Common Issues

**Q: Theme not persisting after refresh?**  
A: Check that `storageKey` is unique and storage adapter is working correctly.

**Q: CSS variables not updating?**  
A: Ensure `cssVariablesPrefix` matches your CSS and DOM target is correct.

**Q: SSR hydration mismatch?**  
A: Use `themeReady` state to render theme-dependent content only after hydration.

**Q: Performance issues with theme switching?**  
A: Enable `generateUtilities` for better CSS performance or use CSS-in-JS solutions.

### Performance Tips

1. **Use CSS Custom Properties** for better performance than JS-based styling
2. **Debounce theme changes** in rapid-fire scenarios
3. **Memoize theme-dependent components** to prevent unnecessary re-renders
4. **Use `themeReady`** to prevent flash of unstyled content

## Resources

- [Material Design 3 Theming](https://m3.material.io/styles/color/overview)
- [CSS Custom Properties](https://developer.mozilla.org/docs/Web/CSS/Using_CSS_custom_properties)
- [WCAG Color Contrast](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

## Storybook

[Link to Storybook story](https://your-storybook-url.com/themeprovider-component)

## FAQ

**Q: How do I change the primary color of the application?**  
A: Pass a `theme` prop with a `primaryColor` property to the `ThemeProvider` component.

**Q: Can I use different themes in different parts of the application?**  
A: Yes, you can nest `ThemeProvider` components to apply different themes to different parts of the application.

## Contribution

Contributions are welcome! Please follow the contribution guidelines in the repository.

## License

MIT
