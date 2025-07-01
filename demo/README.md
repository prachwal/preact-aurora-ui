# Aurora UI Demo - NPM Package Test

This demo application tests Aurora UI components imported directly from the built NPM package in `/dist` folder.

## 🎯 Purpose

- Test Aurora UI components from built NPM package
- Verify zero-config setup works correctly
- Demonstrate real-world usage scenario
- Validate package distribution

## 🚀 Quick Start

### From Main Project Root:

```bash
# Build NPM package and run demo (one command)
npm run demo:all

# OR step by step:
npm run build:npm      # Build the NPM package
npm run demo:setup     # Install demo dependencies
npm run demo:dev       # Start demo development server
```

### From Demo Folder:

```bash
cd demo
npm install
npm run dev
```

Demo will open at: **http://localhost:3001**

## 📦 Package Configuration

The demo uses Aurora UI as a local NPM package:

```json
{
  "dependencies": {
    "preact": "^10.26.9",
    "preact-aurora-ui": "file:../dist"
  }
}
```

## 🧪 What's Tested

- ✅ **NPM Package Import:** Direct import from built package
- ✅ **AuroraProvider:** Zero-config setup
- ✅ **Theme Switching:** Smooth light/dark mode transitions
- ✅ **Components:** Button variants, Card layouts
- ✅ **useTheme Hook:** All v0.0.8 features (themeReady, forceUpdate)
- ✅ **CSS Styles:** Auto-imported from package
- ✅ **TypeScript:** Full type safety

## 📁 Demo Structure

```
demo/
├── package.json          # Local NPM package dependency
├── vite.config.ts        # Vite configuration (port 3001)
├── tsconfig.json         # TypeScript configuration
├── index.html            # HTML entry point
└── src/
    ├── main.tsx          # Application entry
    └── App.tsx           # Demo components
```

## 🔧 Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start development server (port 3001) |
| `npm run build`   | Build for production                 |
| `npm run preview` | Preview production build             |

## 🎨 Features Showcased

### Zero-Config Setup

```tsx
import { AuroraProvider, Button, Card } from 'preact-aurora-ui';

export function App() {
  return (
    <AuroraProvider>
      <Card title="Hello Aurora UI!">
        <Button>Click me!</Button>
      </Card>
    </AuroraProvider>
  );
}
```

### Theme Management

```tsx
function ThemeDemo() {
  const { toggleMode, isDark, themeReady, forceUpdate } = useTheme();

  return (
    <div>
      <p>Theme: {isDark ? 'Dark' : 'Light'}</p>
      <p>Ready: {themeReady ? 'Yes' : 'Loading...'}</p>
      <Button onClick={toggleMode}>Toggle Theme</Button>
      <Button onClick={forceUpdate}>Force Update</Button>
    </div>
  );
}
```

### Component Variants

```tsx
<Button variant="text">Text</Button>
<Button variant="outlined">Outlined</Button>
<Button variant="filled">Filled</Button>
<Button variant="elevated">Elevated</Button>
```

## 🐛 Troubleshooting

### Package Not Found

If you see "Cannot find module 'preact-aurora-ui'":

```bash
# From main project root
npm run build:npm      # Rebuild the package
npm run demo:setup     # Reinstall demo dependencies
```

### Port Conflicts

Demo runs on port 3001 by default. To change:

```js
// vite.config.ts
server: {
  port: 3002, // Change to different port
}
```

### Style Issues

If styles don't load:

1. Ensure `/dist` package is built: `npm run build:npm`
2. Check that AuroraProvider wraps your app
3. Verify browser console for import errors

## 📋 Testing Checklist

- [ ] Demo starts without errors
- [ ] Components render correctly
- [ ] Theme switching works smoothly
- [ ] No console errors
- [ ] TypeScript compilation successful
- [ ] Production build works
- [ ] All button variants display
- [ ] Cards show proper styling

---

**Aurora UI v0.0.8 Demo** - Testing NPM package distribution ✨
