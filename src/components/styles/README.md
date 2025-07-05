# Aurora UI Styles

Complete SCSS styling system for Aurora UI with Material Design 3 support.

## Overview

This folder contains the complete Aurora UI styling system that can be imported into your projects:

- **Material Design 3 Colors** - Complete MD3 color tokens for light/dark themes
- **Typography System** - Material Design typography scale
- **Spacing System** - Consistent spacing tokens and utilities
- **Elevation System** - Material Design elevation and shadows
- **Utility Classes** - Common CSS utilities for layout and styling
- **Mixins** - Reusable SCSS mixins for common patterns

## Usage

### Import Complete System

```scss
// Import everything (recommended for most projects)
@use '@aurora-ui/preact-aurora-ui/styles' as aurora;

// Access variables
.my-component {
  color: aurora.$primary-color;
  padding: aurora.$space-md;
}
```

### Import Specific Modules

```scss
// Import only what you need
@use '@aurora-ui/preact-aurora-ui/styles/colors' as *;
@use '@aurora-ui/preact-aurora-ui/styles/typography' as *;
@use '@aurora-ui/preact-aurora-ui/styles/spacing' as *;

.my-component {
  color: var(--md-sys-color-primary);
  font-size: var(--font-size-md);
  padding: var(--space-lg);
}
```

### Global Styles (Optional)

```scss
// Import global reset and base styles
@use '@aurora-ui/preact-aurora-ui/styles/global';
```

## Available Modules

### Core System

| Module            | Description            | Variables          |
| ----------------- | ---------------------- | ------------------ |
| `colors`          | MD3 color system       | `--md-sys-color-*` |
| `colors-extended` | Extended color palette | `--md-sys-color-*` |
| `typography`      | Type scale and fonts   | `--font-*`         |
| `spacing`         | Spacing tokens         | `--space-*`        |
| `elevation`       | Shadows and elevation  | `--elevation-*`    |
| `tokens`          | Design tokens          | Various            |

### Layout & Utilities

| Module        | Description             | Classes             |
| ------------- | ----------------------- | ------------------- |
| `utilities`   | Utility classes         | `.scroll-*`, `.h-*` |
| `breakpoints` | Media query breakpoints | `$breakpoint-*`     |
| `mixins`      | Common SCSS mixins      | Various mixins      |
| `base`        | Base component styles   | Base classes        |

### Theme Integration

| Module      | Description           | Purpose              |
| ----------- | --------------------- | -------------------- |
| `global`    | Global reset styles   | Optional base styles |
| `aurora-ui` | Complete theme bundle | All-in-one import    |

## Scroll Control Utilities

The system includes utility classes for scroll behavior:

```scss
// Scroll control
.scroll-auto {
  overflow: auto !important;
}
.scroll-hidden {
  overflow: hidden !important;
}
.scroll-x-auto {
  overflow-x: auto !important;
}
.scroll-y-auto {
  overflow-y: auto !important;
}
.scroll-x-hidden {
  overflow-x: hidden !important;
}
.scroll-y-hidden {
  overflow-y: hidden !important;
}

// Height utilities
.h-screen {
  height: 100vh !important;
}
.h-auto {
  height: auto !important;
}
.min-h-screen {
  min-height: 100vh !important;
}
```

## CSS Custom Properties

All Aurora UI styles use CSS custom properties for theming:

```css
:root {
  /* Material Design 3 Colors */
  --md-sys-color-primary: #6750a4;
  --md-sys-color-on-primary: #ffffff;
  --md-sys-color-secondary: #625b71;

  /* Typography */
  --font-family-base: system-ui, -apple-system, sans-serif;
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.125rem;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
}
```

## Dark Theme Support

All color tokens automatically support dark themes:

```css
[data-theme='dark'] {
  --md-sys-color-primary: #d0bcff;
  --md-sys-color-on-primary: #371e73;
  /* ... other dark theme colors */
}
```

## Layout Best Practices

### Proper Scrolling

```scss
// ✅ Good: Allow natural document scrolling
.layout {
  min-height: 100vh;
  height: auto;
  overflow: visible;
}

// ❌ Bad: Prevents scrolling
.layout {
  height: 100vh;
  overflow: hidden;
}
```

### Theme Provider Integration

```tsx
import { ThemeProvider } from '@aurora-ui/preact-aurora-ui';

function App() {
  return (
    <ThemeProvider allowHorizontalScroll={false} autoGlobalStyles={true}>
      <YourApp />
    </ThemeProvider>
  );
}
```

## NPM Package Integration

When publishing, these styles are included in the npm package:

```json
{
  "files": ["dist/", "src/components/styles/"],
  "exports": {
    "./styles": "./src/components/styles/index.scss",
    "./styles/*": "./src/components/styles/*.scss"
  }
}
```

This allows consumers to import styles directly:

```scss
@use '@aurora-ui/preact-aurora-ui/styles';
@use '@aurora-ui/preact-aurora-ui/styles/colors';
```
