# 🌟 Aurora UI

**Modern Material Design 3 components for Preact applications**

[![NPM Version](https://img.shields.io/npm/v/preact-aurora-ui?style=flat-square&color=6750A4)](https://www.npmjs.com/package/preact-aurora-ui)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/preact-aurora-ui?style=flat-square&color=success)](https://bundlephobia.com/package/preact-aurora-ui)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Documentation](https://img.shields.io/badge/docs-storybook-FF4785?style=flat-square)](https://prachwal.github.io/preact-aurora-ui/)

> A comprehensive, accessible, and performant UI component library built with Preact and Material Design 3 principles.

## ✨ Key Features

🚀 **Zero-Config Setup** - Get started in 2 minutes with automatic style injection  
🎨 **Material Design 3** - Complete MD3 design system with dynamic theming  
⚡ **Smooth Theme Switching** - Flicker-free light/dark/auto modes  
♿ **Full Accessibility** - WCAG 2.1 AA compliant with screen reader support  
💅 **Flexible Theming** - CSS Custom Properties with easy customization  
✅ **TypeScript First** - Complete type safety and IntelliSense support  
📚 **Rich Documentation** - Interactive Storybook + comprehensive guides  
🔧 **Developer Experience** - Helpful warnings, debugging tools, and error messages

## 🚀 Quick Start

### Installation

```bash
npm install preact-aurora-ui
```

### Setup (Zero-Config)

```tsx
// main.tsx
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

### Use Components

```tsx
// App.tsx
import { Button, Card, TextField, useTheme } from 'preact-aurora-ui';

export default function App() {
  const { toggleMode, isDark } = useTheme();

  return (
    <Card>
      <h2>Welcome to Aurora UI! 🌟</h2>
      <TextField label="Your name" placeholder="Enter your name" />
      <Button onClick={toggleMode} variant="filled">
        Switch to {isDark ? 'Light' : 'Dark'} Mode
      </Button>
    </Card>
  );
}
```

That's it! 🎉 Your app now has beautiful, accessible components with automatic theming.

## 📦 What's Included

### Core Components (34 total)

```tsx
// Form Components
import { Button, TextField, Checkbox, Radio, Switch, Select, Slider } from 'preact-aurora-ui';

// Layout Components
import { AppLayout, Container, Grid, Header, Footer, Sidebar } from 'preact-aurora-ui';

// Navigation
import { Menu, Tabs, Breadcrumbs, BottomNavigation } from 'preact-aurora-ui';

// Communication
import { Dialog, Drawer, Snackbar, Tooltip, Banner } from 'preact-aurora-ui';

// Advanced
import { DataTable, Stepper, FAB, IconButton, Chip } from 'preact-aurora-ui';

// Providers
import { AuroraProvider, ThemeProvider, useTheme } from 'preact-aurora-ui';
```

### Theme System

```tsx
// Automatic theme management
const { theme, toggleMode, isDark, themeReady } = useTheme();

// Custom theming
<AuroraProvider theme="auto" config={{ systemThemeSync: true }}>
  <App />
</AuroraProvider>;
```

## 🎨 Theming

Aurora UI provides a complete Material Design 3 theming system:

```tsx
// CSS Custom Properties (automatic)
:root {
  --md-sys-color-primary: #6750A4;
  --md-sys-color-secondary: #625B71;
  --md-sys-color-surface: #FFFBFE;
  /* + 50+ more MD3 tokens */
}

// Programmatic theming
const customTheme = {
  mode: 'light',
  colors: {
    primary: '#1976D2',
    secondary: '#DC004E',
  }
};
```

## 📚 Documentation

- 📖 **[Complete Documentation](https://prachwal.github.io/preact-aurora-ui/)** - Full guides and API reference
- 🧩 **[Interactive Storybook](https://prachwal.github.io/preact-aurora-ui/storybook)** - Live component playground
- � **[Component Library](./src/components/README.md)** - Individual component docs
- 🚀 **[Quick Start Guide](./docs/guides/QUICK_START_v0.0.8.md)** - Detailed setup instructions

## 🆕 What's New in v0.0.13

✅ **Complete Component Documentation** - Every component fully documented with examples  
✅ **Enhanced TypeScript Support** - Improved type definitions and IntelliSense  
✅ **Accessibility Improvements** - WCAG 2.1 AA compliance across all components  
✅ **Performance Optimizations** - Reduced bundle size and faster rendering  
✅ **Better Developer Experience** - Improved error messages and debugging tools  
✅ **Storybook Integration** - Interactive documentation and testing

## � Testing

Aurora UI components come with comprehensive testing utilities:

```tsx
import { render, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { Button } from 'preact-aurora-ui';

test('button interaction', async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();

  render(<Button onClick={handleClick}>Click me</Button>);

  await user.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalled();
});
```

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./docs/CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

---

<div align="center">

**[📖 Documentation](https://prachwal.github.io/preact-aurora-ui/)** •
**[🧩 Storybook](https://prachwal.github.io/preact-aurora-ui/storybook)** •
**[🐛 Issues](https://github.com/prachwal/preact-aurora-ui/issues)** •
**[💬 Discussions](https://github.com/prachwal/preact-aurora-ui/discussions)**

Made with ❤️ for the Preact community

</div>
