# Aurora UI v0.0.8 - Quick Start Guide

## 🚀 2-Minute Setup

Aurora UI v0.0.8 introduces **zero-config setup** with automatic style imports and enhanced theme switching.

### 1. Install (30 seconds)

```bash
npm install preact-aurora-ui
```

### 2. Setup (30 seconds)

```tsx
// src/main.tsx
import { render } from 'preact';
import { AuroraProvider } from 'preact-aurora-ui';
import App from './App';

render(
  <AuroraProvider>
    <App />
  </AuroraProvider>,
  document.getElementById('app')!,
);
```

### 3. Use Components (60 seconds)

```tsx
// src/App.tsx
import { Button, Card, useTheme } from 'preact-aurora-ui';

export default function App() {
  const { toggleMode, isDark } = useTheme();

  return (
    <Card title="Hello Aurora UI!">
      <p>Beautiful themes and components with zero configuration.</p>
      <Button onClick={toggleMode}>Switch to {isDark ? 'Light' : 'Dark'} Mode</Button>
    </Card>
  );
}
```

🎉 **Done!** Your app now has beautiful themes and smooth transitions.

## 🆕 What's New in v0.0.8

- ✅ **Auto-import styles** - No more manual CSS imports
- ✅ **Smooth theme transitions** - No more flickering or reloading
- ✅ **Enhanced useTheme hook** - `forceUpdate()` and `themeReady` state
- ✅ **Development warnings** - Helpful debugging in dev mode
- ✅ **Better error handling** - Clear error messages with solutions
- ✅ **Backwards compatible** - All v0.0.7 code works unchanged

## 🔄 Migrating from v0.0.7

v0.0.8 is **100% backwards compatible**. No changes required!

### Recommended Updates (Optional)

#### Replace ThemeProvider with AuroraProvider

```tsx
// ❌ v0.0.7 way (still works)
import 'preact-aurora-ui/styles/colors-extended.scss';
import 'preact-aurora-ui/styles/spacing.scss';
import 'preact-aurora-ui/styles/typography.scss';
import { ThemeProvider } from 'preact-aurora-ui';

<ThemeProvider autoGlobalStyles={true}>
  <App />
</ThemeProvider>;

// ✅ v0.0.8 way (recommended)
import { AuroraProvider } from 'preact-aurora-ui';

<AuroraProvider>
  <App />
</AuroraProvider>;
```

#### Enhanced useTheme Features

```tsx
const {
  theme,
  toggleMode,
  isDark,
  // ✨ New in v0.0.8:
  forceUpdate, // Fixes stale theme issues
  themeReady, // Prevents flash of unstyled content
} = useTheme();

// If you experience theme sync issues (rare):
useEffect(() => {
  if (!themeReady) {
    forceUpdate(); // Force theme re-application
  }
}, [themeReady, forceUpdate]);
```

## 🎨 Theme Customization

### Basic Theme Switching

```tsx
<AuroraProvider theme="auto">
  {' '}
  {/* 'light' | 'dark' | 'auto' */}
  <App />
</AuroraProvider>
```

### Advanced Configuration

```tsx
<AuroraProvider
  theme="auto"
  config={{
    devMode: true, // Development warnings
    disableTransitions: false, // Disable for performance
    cssPrefix: 'my-app', // Custom CSS variable prefix
  }}
  storageKey="my-theme" // Custom localStorage key
>
  <App />
</AuroraProvider>
```

### Manual Theme Control

```tsx
function ThemeControls() {
  const { theme, setTheme, toggleMode, isDark } = useTheme();

  return (
    <div>
      <Button onClick={toggleMode}>{isDark ? '☀️ Light' : '🌙 Dark'}</Button>

      <Button onClick={() => setTheme({ mode: 'auto' })}>🔄 Auto</Button>
    </div>
  );
}
```

## 🐛 Troubleshooting

### "Styles not applied"

**Problem:** Components look unstyled  
**Solution:** Make sure you're using `<AuroraProvider>` at the root level

```tsx
// ✅ Correct
render(
  <AuroraProvider>
    <App />
  </AuroraProvider>,
  document.getElementById('app')!,
);
```

### "Theme not switching"

**Problem:** `toggleMode()` doesn't work  
**Solution:** Use `useTheme()` hook inside `<AuroraProvider>`

```tsx
// ❌ Wrong - outside provider
const theme = useTheme(); // Error!

function App() {
  return (
    <AuroraProvider>
      <MyComponent />
    </AuroraProvider>
  );
}

// ✅ Correct - inside provider
function MyComponent() {
  const { toggleMode } = useTheme(); // Works!
  return <Button onClick={toggleMode}>Toggle</Button>;
}
```

### "CSS conflicts with existing styles"

**Problem:** Your existing styles override Aurora UI  
**Solution:** Use CSS specificity or CSS layers

```css
/* Option 1: Increase specificity */
.my-app .aurora-card {
  /* Your overrides */
}

/* Option 2: CSS Layers (modern browsers) */
@layer aurora-ui, my-styles;

@layer my-styles {
  /* Your styles here - will override Aurora UI */
}
```

### "Bundle too large"

**Problem:** Large bundle size with Aurora UI  
**Solution:** Enable tree-shaking in your bundler

```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      // Tree-shaking enabled by default
    },
  },
};

// webpack.config.js
module.exports = {
  optimization: {
    usedExports: true,
    sideEffects: false,
  },
};
```

## 📚 Next Steps

- [Component Documentation](https://aurora-ui.dev/docs/components)
- [Theme Customization Guide](https://aurora-ui.dev/docs/theming)
- [Examples & Playground](https://aurora-ui.dev/examples)
- [Migration from other libraries](https://aurora-ui.dev/docs/migration)

## 🆘 Need Help?

- 📖 [Full Documentation](https://aurora-ui.dev/docs)
- 🐛 [Report Issues](https://github.com/prachwal/preact-aurora-ui/issues)
- 💬 [Discussions](https://github.com/prachwal/preact-aurora-ui/discussions)
- 📧 [Contact Support](mailto:support@aurora-ui.dev)

---

**Aurora UI v0.0.8** - Zero-config theming for Preact applications ✨
