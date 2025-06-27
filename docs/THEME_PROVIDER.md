# Aurora UI Theme Provider

## Overview

Aurora UI's Theme Provider is a comprehensive theming system that provides:

- **Light/Dark Mode Support** with automatic system preference detection
- **Custom Color Palettes** with CSS custom properties
- **Smooth Transitions** between theme changes
- **Accessibility Features** including high contrast and reduced motion support
- **LocalStorage Persistence** for user preferences
- **TypeScript Support** with full type safety

## Installation & Setup

The Theme Provider is included in Aurora UI by default. To use it:

```tsx
import { ThemeProvider, ThemeToggle } from "aurora-ui";

function App() {
  return (
    <ThemeProvider defaultTheme={{ mode: "light" }}>
      <YourApp />
    </ThemeProvider>
  );
}
```

## Basic Usage

### ThemeProvider

Wrap your application with the `ThemeProvider`:

```tsx
import { ThemeProvider } from "aurora-ui";

function App() {
  return (
    <ThemeProvider defaultTheme={{ mode: "auto" }} storageKey="my-app-theme">
      <YourApp />
    </ThemeProvider>
  );
}
```

### useTheme Hook

Access theme state and controls in any component:

```tsx
import { useTheme } from "aurora-ui";

function MyComponent() {
  const { theme, setTheme, toggleMode, isDark } = useTheme();

  return (
    <div>
      <p>Current mode: {theme.mode}</p>
      <p>Is dark: {isDark ? "Yes" : "No"}</p>
      <button onClick={toggleMode}>Toggle Theme</button>
    </div>
  );
}
```

### ThemeToggle Component

Pre-built theme toggle button:

```tsx
import { ThemeToggle } from "aurora-ui";

function Header() {
  return (
    <header>
      <ThemeToggle variant="icon" size="md" />
      <ThemeToggle variant="button" showLabel />
    </header>
  );
}
```

## Theme Configuration

### Theme Modes

- **`light`** - Light theme
- **`dark`** - Dark theme
- **`auto`** - Follows system preference

### Custom Colors

Override default colors:

```tsx
const customTheme = {
  mode: "light",
  colors: {
    primary: "#6366f1",
    "primary-dark": "#4f46e5",
    success: "#10b981",
    error: "#ef4444",
  },
};

<ThemeProvider defaultTheme={customTheme}>
  <App />
</ThemeProvider>;
```

### Custom Properties

Add custom CSS variables:

```tsx
const customTheme = {
  mode: "light",
  customProperties: {
    "--border-radius": "12px",
    "--font-family-custom": "Inter, sans-serif",
  },
};
```

## Available Colors

### Primary Colors

- `--color-primary`
- `--color-primary-dark`
- `--color-primary-light`
- `--color-secondary`
- `--color-secondary-dark`
- `--color-secondary-light`

### Status Colors

- `--color-success`
- `--color-warning`
- `--color-error`
- `--color-info`

### Surface Colors

- `--color-background`
- `--color-surface`
- `--color-surface-variant`

### Text Colors

- `--color-on-surface`
- `--color-on-surface-variant`
- `--color-on-primary`
- `--color-on-secondary`

### Border Colors

- `--color-outline`
- `--color-outline-variant`

## Available Shadows

- `--shadow-sm` - Small elevation
- `--shadow-md` - Medium elevation
- `--shadow-lg` - Large elevation
- `--shadow-xl` - Extra large elevation

## ThemeToggle Props

```tsx
interface ThemeToggleProps {
  variant?: "icon" | "button"; // Button style
  size?: "sm" | "md" | "lg"; // Button size
  showLabel?: boolean; // Show text label
  className?: string; // Custom CSS class
  style?: CSSProperties; // Inline styles
}
```

## Advanced Usage

### Programmatic Theme Changes

```tsx
const { setTheme } = useTheme();

// Change mode
setTheme({ mode: "dark" });

// Change colors
setTheme({
  colors: {
    primary: "#ff6b6b",
  },
});

// Combine changes
setTheme({
  mode: "dark",
  colors: { primary: "#ff6b6b" },
  customProperties: { "--border-radius": "8px" },
});
```

### Theme Detection

```tsx
const { theme, isDark } = useTheme();

// Check current mode
console.log(theme.mode); // "light" | "dark" | "auto"

// Check if dark theme is active
console.log(isDark); // boolean

// Check system preference
const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
```

## Accessibility Features

### High Contrast Support

Automatically adjusts colors when `prefers-contrast: high` is detected.

### Reduced Motion Support

Disables transitions when `prefers-reduced-motion: reduce` is detected.

### Keyboard Navigation

ThemeToggle supports full keyboard navigation with proper ARIA attributes.

## Best Practices

1. **Place ThemeProvider at the root** of your component tree
2. **Use semantic color names** instead of hardcoded values
3. **Test both themes** during development
4. **Consider system preferences** by using `auto` mode
5. **Provide theme controls** in user settings
6. **Use smooth transitions** for better UX

## Examples

### Complete Theme Setup

```tsx
import { ThemeProvider, ThemeToggle, useTheme } from "aurora-ui";

const customTheme = {
  mode: "auto" as const,
  colors: {
    primary: "#3b82f6",
    success: "#10b981",
    error: "#ef4444",
  },
};

function App() {
  return (
    <ThemeProvider defaultTheme={customTheme} storageKey="my-app-theme">
      <Header />
      <Main />
    </ThemeProvider>
  );
}

function Header() {
  return (
    <header
      style={{
        background: "var(--color-surface)",
        color: "var(--color-on-surface)",
        padding: "var(--space-lg)",
      }}
    >
      <h1>My App</h1>
      <ThemeToggle variant="button" showLabel />
    </header>
  );
}

function Main() {
  const { isDark } = useTheme();

  return (
    <main
      style={{
        background: "var(--color-background)",
        minHeight: "100vh",
      }}
    >
      <p>Current theme: {isDark ? "Dark" : "Light"}</p>
    </main>
  );
}
```

## Browser Support

- Modern browsers with CSS custom properties support
- Graceful degradation for older browsers
- Full TypeScript support
- SSR compatible (with proper hydration)
