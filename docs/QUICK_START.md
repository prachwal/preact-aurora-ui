# Aurora UI – Quick Start Guide

## 🚀 2-Minute Setup

Aurora UI umożliwia szybkie wdrożenie komponentów Material Design 3 dla Preact.

### 1. Install

```bash
npm install preact-aurora-ui
```

### 2. Setup

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

### 3. Use Components

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

🎉 **Done!** Twoja aplikacja korzysta już z Aurora UI.

## 🎨 Theme Customization

```tsx
<AuroraProvider theme="auto">
  <App />
</AuroraProvider>
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
