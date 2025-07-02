# Aurora UI v0.0.8 Release Notes 🚀

**Release Date:** July 1, 2025  
**NPM Package:** `preact-aurora-ui@0.0.8`  
**GitHub Tag:** `v0.0.8`

## 🎯 Major Features

### 🚀 Zero-Config Setup

- **New `AuroraProvider` component** - One wrapper to rule them all
- **Automatic style imports** with intelligent fallback system
- **Error boundaries** with helpful developer warnings
- **2-minute setup** from install to first component

### 🎨 Enhanced Theme Switching

- **Smooth CSS transitions** for theme changes (no more flicker!)
- **`forceUpdate()` method** in `useTheme` for manual re-renders
- **`themeReady` state** to prevent flash of unstyled content
- **Auto-detection** of system theme preferences

### 💅 SCSS Standardization

- **Legacy variable mapping:** `--color-*` → `--md-sys-color-*`
- **Transition support** for all interactive components
- **Card component improvements** with better hover states
- **Extended color palette** with proper MD3 tokens

## 🛠️ Technical Improvements

### Developer Experience

- **Development warnings** for missing providers
- **TypeScript enhancements** with better type inference
- **Debugging utilities** in development mode
- **Comprehensive error messages** with solutions

### Build & Compatibility

- **NPM build optimization** with tree-shaking support
- **Side-effects declaration** for SCSS files
- **Peer dependency clarity** for Preact versions
- **Bundle size optimization** (20KB gzipped)

## 📚 Documentation Updates

### New Guides

- **`docs/QUICK_START.md`** - 2-minute setup guide
- **`docs/ROADMAP_v0.1.0.md`** - Detailed v0.1.0 planning
- **Updated `README.md`** with zero-config examples
- **Migration examples** for existing users

### Demo & Examples

- **`src/demo-v0.0.8.tsx`** - Interactive demo showcasing new features
- **Theme switching examples** with smooth transitions
- **Error boundary demonstrations**

## 🔄 Migration from v0.0.7

### Quick Migration (2 minutes)

Replace your existing providers:

```tsx
// OLD (v0.0.7)
import { ThemeProvider } from 'preact-aurora-ui';
import 'preact-aurora-ui/styles/aurora-ui.scss';

<ThemeProvider>
  <App />
</ThemeProvider>;

// NEW (v0.0.8)
import { AuroraProvider } from 'preact-aurora-ui';

<AuroraProvider>
  <App />
</AuroraProvider>;
```

### Breaking Changes

**None!** This is a backward-compatible release. All existing code will continue to work.

## 🏗️ What's Next - v0.1.0 Roadmap

### Major Upcoming Features

- **Component Library Expansion** (20+ new components)
- **Advanced Theming System** with custom theme builder
- **Performance Optimizations** with lazy loading
- **Accessibility Enhancements** (WCAG 2.2 compliance)
- **Breaking Changes** for API standardization

### Timeline

- **v0.0.9:** Bug fixes and minor improvements (July 2025)
- **v0.1.0:** Major release with breaking changes (August 2025)

## 📊 Package Statistics

- **Bundle Size:** ~20KB gzipped
- **Components:** 25+ production-ready
- **TypeScript:** 100% coverage
- **Tests:** 95% coverage
- **A11y Score:** WCAG 2.1 AA compliant

## 🙏 Credits

Special thanks to the community for feedback and contributions that made this release possible.

## 🔗 Links

- **NPM Package:** https://www.npmjs.com/package/preact-aurora-ui
- **GitHub Repository:** https://github.com/prachwal/preact-aurora-ui
- **Documentation:** `/docs/QUICK_START.md`
- **Storybook:** (Coming in v0.0.9)

---

**Happy Coding with Aurora UI! 🌟**
