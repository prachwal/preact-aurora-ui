# 🎉 Aurora UI v0.0.8 Successfully Released!

**Release Date:** July 1, 2025  
**NPM Package:** `preact-aurora-ui@0.0.8`  
**GitHub Tag:** `v0.0.8`  
**All Tests:** ✅ 783/783 passed

## 🚀 What's New in v0.0.8

### ⚡ Zero-Config Setup

```tsx
// Just wrap your app - styles auto-import!
import { AuroraProvider } from 'preact-aurora-ui';

<AuroraProvider>
  <App />
</AuroraProvider>;
```

### 🎨 Enhanced Theme Switching

- **Smooth CSS transitions** - no more flicker!
- **`forceUpdate()` method** for manual re-renders
- **`themeReady` state** prevents flash of unstyled content
- **Auto-detection** of system preferences

### 💅 SCSS Standardization

- **Legacy variable mapping:** `--color-*` → `--md-sys-color-*`
- **Transition support** for all interactive components
- **Card component improvements** with better hover states
- **Extended color palette** with proper MD3 tokens

## 📈 Release Statistics

| Metric                  | Value                |
| ----------------------- | -------------------- |
| **Total Tests**         | 783 passed ✅        |
| **Bundle Size**         | ~20KB gzipped        |
| **Components**          | 25+ production-ready |
| **TypeScript Coverage** | 100%                 |
| **A11y Compliance**     | WCAG 2.1 AA          |
| **Build Time**          | <5 seconds           |

## 🔗 Quick Links

- **📦 NPM Package:** https://www.npmjs.com/package/preact-aurora-ui
- **🐙 GitHub Repository:** https://github.com/prachwal/preact-aurora-ui
- **📚 Quick Start Guide:** `/docs/QUICK_START_v0.0.8.md`
- **🗺️ v0.1.0 Roadmap:** `/docs/ROADMAP_v0.1.0.md`

## 🏁 Installation & Setup

```bash
# 1. Install
npm install preact-aurora-ui

# 2. Wrap your app
import { AuroraProvider } from 'preact-aurora-ui';

# 3. Start building!
import { Button, Card, useTheme } from 'preact-aurora-ui';
```

## 🔮 What's Next

- **v0.0.9:** Bug fixes and minor improvements (July 2025)
- **v0.1.0:** Major release with breaking changes (August 2025)
  - 20+ new components
  - Advanced theming system
  - Performance optimizations
  - WCAG 2.2 compliance

---

**Happy coding with Aurora UI! 🌟**

_The Aurora UI Team_
