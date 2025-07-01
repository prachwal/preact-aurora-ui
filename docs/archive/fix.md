# Aurora UI v0.0.8+ - Plan ulepszeń i modernizacji

## 📋 Executive Summary

Ten dokument zawiera analizę problemów zidentyfikowanych w Aurora UI v0.0.7 oraz szczegółowy plan ulepszeń na wersje 0.0.8+. Główne obszary do poprawy to: automatyzacja setup'u, ulepszenie przełączania motywów, standaryzacja zmiennych CSS oraz poprawa developer experience.

**Status implementacji:** 🟡 W trakcie planowania
**Cel:** Uproszczenie użytkowania biblioteki o 70% i eliminacja głównych problemów UX

---

## ⚠️ Krytyczne problemy w v0.0.7

### Zidentyfikowane w środowisku produkcyjnym:

1. **🎨 Brak automatycznego importu stylów** - wymaga 3-4 manualnych importów
2. **🔄 Problemy z przełączaniem motywów** - migotanie, brak transitions, wymagane workarounds
3. **📦 Skomplikowany setup** - 8+ kroków konfiguracji dla podstawowego użycia
4. **🐛 Niespójne zmienne CSS** - mieszanie starych i nowych konwencji MD3
5. **🔧 Słaby DX** - brak error handling, warnings, debug tools

---

## 1. 🎨 **Automatyczny import stylów**

**Priorytet:** 🔴 Krytyczny | **Effort:** 2h | **Impact:** Wysoki

### Problem:

Style Aurora UI nie są automatycznie importowane, co wymaga ręcznego dodania w `main.tsx`:

```tsx
// ❌ Obecne - wymaga manualnego importu
import 'preact-aurora-ui/styles/colors-extended.scss';
import 'preact-aurora-ui/styles/spacing.scss';
import 'preact-aurora-ui/styles/typography.scss';
```

### Rozwiązanie - 3 opcje:

#### **Opcja A: Side-effect import (ZALECANA)**

```javascript
// preact-aurora-ui/dist/index.js
import './styles/aurora-ui.css'; // Skonkatenowany CSS
export * from './components';
```

**Użycie:**

```tsx
// ✅ Nowe - wystarczy jeden import
import { Button, Card } from 'preact-aurora-ui';
// Style załadowane automatycznie!
```

#### **Opcja B: Bundle główny plik CSS**

```scss
// preact-aurora-ui/styles/aurora-ui.scss
@use 'colors-extended';
@use 'spacing';
@use 'typography';
@use 'base';
@use 'components'; // Wszystkie style komponentów
```

#### **Opcja C: Conditional import**

```javascript
// Auto-import z flagą
import { setupAuroraUI } from 'preact-aurora-ui/setup';

setupAuroraUI({
  autoImportStyles: true, // default: true
  theme: 'auto',
});
```

### ✅ Plan implementacji:

1. **Dzisiaj:** Utworzyć skonkatenowany `aurora-ui.css`
2. **Dzisiaj:** Dodać side-effect import do index.js
3. **Jutro:** Testy w różnych bundlerach
4. **Pojutrze:** Backwards compatibility check

---

## 2. 🔄 **Lepsze przełączanie motywów**

**Priorytet:** 🔴 Krytyczny | **Effort:** 4h | **Impact:** Wysoki

### Problem:

Komponenty nie reagują automatycznie na zmiany motywu w czasie rzeczywistym, wymagając:

- Dodawania kluczy (`key`) do wymuszenia re-render ❌
- Dodatkowych useEffect do synchronizacji ❌
- CSS overrides z `!important` ❌
- Odświeżania strony w niektórych przypadkach ❌

### Rozwiązanie - kompletne API:

#### **A) ThemeProvider v2 z pełną kontrolą:**

```tsx
// ✅ Nowe API - zero-config
<ThemeProvider
  mode="auto" // 'light' | 'dark' | 'auto'
  enableTransitions={true} // Smooth transitions (default: true)
  transitionDuration="300ms" // Customizable duration
  forceRerender={true} // Auto re-render (default: true)
  persistPreference={true} // LocalStorage sync (default: true)
  systemThemeSync={true} // Sync with OS theme (default: true)
>
  <App />
</ThemeProvider>
```

#### **B) CSS Transitions - automatyczne:**

```scss
// Zostanie dodane do każdego komponentu Aurora UI
.aurora-component {
  // Smooth transitions dla wszystkich theme-related properties
  transition:
    background-color var(--aurora-transition-duration, 300ms) ease-out,
    color var(--aurora-transition-duration, 300ms) ease-out,
    border-color var(--aurora-transition-duration, 300ms) ease-out,
    box-shadow var(--aurora-transition-duration, 300ms) ease-out;

  // Zapobieganie flash of unstyled content
  &:not([data-theme-ready]) {
    visibility: hidden;
  }
}
```

#### **C) Enhanced useTheme hook:**

```tsx
const {
  // Istniejące
  theme,
  setTheme,
  toggleMode,
  isDark,

  // ✅ Nowe API
  forceUpdate, // () => void - Wymusza update całej aplikacji
  isTransitioning, // boolean - Czy theme się zmienia
  themeReady, // boolean - Czy theme jest załadowany
  systemTheme, // 'light' | 'dark' - OS preference

  // Advanced
  prefersReducedMotion, // boolean - Accessibility
  colorScheme, // 'light' | 'dark' | 'auto'
  customVariables, // Record<string, string> - Custom CSS vars
} = useTheme();
```

#### **D) Transition State Management:**

```tsx
// Automatyczne zarządzanie stanem przejść
const ThemeTransition = () => {
  const { isTransitioning } = useTheme();

  return (
    <div
      className={`app ${isTransitioning ? 'theme-transitioning' : ''}`}
      data-theme-ready={!isTransitioning}
    >
      {/* Zawartość */}
    </div>
  );
};
```

### ✅ Plan implementacji:

1. **Dzisiaj:** Refactor ThemeProvider - dodać forceRerender
2. **Dzisiaj:** CSS transitions dla wszystkich komponentów
3. **Jutro:** Enhanced useTheme hook
4. **Jutro:** Testy przełączania w różnych scenariuszach
5. **Pojutrze:** Performance optimization

---

## 3. 🧩 **Standaryzacja CSS Variables**

**Priorytet:** 🟡 Wysoki | **Effort:** 3h | **Impact:** Średni

### Problem:

Komponenty używają mieszanki starych i nowych konwencji CSS variables:

- `--color-*` (legacy) vs `--md-sys-color-*` (MD3 standard)
- Niespójność powoduje błędy w customization
- Trudne debugowanie theme issues

### Audit obecnego stanu:

```scss
// ❌ Znalezione niespójności:
.card {
  background: var(--color-surface); // Legacy
  color: var(--md-sys-color-on-surface); // MD3
}

.button {
  background: var(--primary-color); // Custom
  border: 1px solid var(--md-sys-color-outline); // MD3
}
```

### Rozwiązanie - Migration Strategy:

#### **Faza 1: Automatyczne mapowanie (Backwards compatibility)**

```scss
// colors-extended.scss - Legacy support
:root {
  // Auto-map legacy → MD3 (tylko do czasu migracji)
  --color-surface: var(--md-sys-color-surface);
  --color-background: var(--md-sys-color-background);
  --color-primary: var(--md-sys-color-primary);
  --primary-color: var(--md-sys-color-primary); // Deprecated
}

[data-theme='dark'] {
  // Duplicate mapping for dark mode
  --color-surface: var(--md-sys-color-surface);
  --color-background: var(--md-sys-color-background);
  --color-primary: var(--md-sys-color-primary);
}
```

#### **Faza 2: Standardyzacja komponentów**

```scss
// ✅ Wszystkie komponenty - tylko MD3 variables
.aurora-button {
  background: var(--md-sys-color-primary);
  color: var(--md-sys-color-on-primary);
  border: 1px solid var(--md-sys-color-outline);

  &:hover {
    background: var(--md-sys-color-primary-container);
    color: var(--md-sys-color-on-primary-container);
  }
}

.aurora-card {
  background: var(--md-sys-color-surface);
  color: var(--md-sys-color-on-surface);
  border: 1px solid var(--md-sys-color-outline-variant);
}
```

#### **Faza 3: Validation & Linting**

```javascript
// CSS variable validation (dev mode)
const validateThemeVariables = () => {
  const legacyVars = ['--color-', '--primary-color', '--secondary-color'];
  const usedVars = Array.from(document.styleSheets)
    .flatMap((sheet) => Array.from(sheet.cssRules))
    .filter((rule) => legacyVars.some((legacy) => rule.cssText?.includes(legacy)));

  if (usedVars.length > 0) {
    console.warn('Aurora UI: Legacy CSS variables detected:', usedVars);
  }
};
```

### ✅ Plan implementacji:

1. **Dzisiaj:** Audit wszystkich komponentów (automated scan)
2. **Dzisiaj:** Dodać legacy mapping do colors-extended.scss
3. **Jutro:** Przepisać komponenty na MD3 variables
4. **Jutro:** CSS validation w dev mode
5. **Za tydzień:** Deprecation warnings
6. **Za miesiąc:** Remove legacy variables (v0.1.0)

---

## 4. 📦 **Uproszczone API i setup**

**Priorytet:** 🟡 Wysoki | **Effort:** 5h | **Impact:** Wysoki

### Problem:

Setup Aurora UI wymaga zbyt dużo kroków:

1. Instalacja pakietu
2. Import 3-4 plików CSS
3. Konfiguracja ThemeProvider
4. Dodanie autoGlobalStyles
5. Restart dev server
6. Debugging CSS conflicts
7. Manual theme handling
8. Custom CSS overrides

**Cel:** Zmniejszenie setup'u do 2 kroków!

### Rozwiązanie - Zero-config API:

#### **A) AuroraProvider - All-in-one solution**

```tsx
// ✅ Nowy sposób - 1 komponent, zero config
import { AuroraProvider } from 'preact-aurora-ui';

function App() {
  return (
    <AuroraProvider>
      {' '}
      {/* ← Wszystko skonfigurowane! */}
      <Header />
      <Main />
      <Footer />
    </AuroraProvider>
  );
}

// Lub z customization
<AuroraProvider
  theme="auto" // 'light' | 'dark' | 'auto' | CustomTheme
  autoStyles={true} // Auto-import CSS (default: true)
  transitions={true} // Smooth transitions (default: true)
  persistPreference={true} // Save in localStorage (default: true)
  colorScheme="material" // 'material' | 'custom' (default: 'material')
>
  <App />
</AuroraProvider>;
```

#### **B) Comparison - Before vs After**

```tsx
// ❌ Obecny sposób (8 kroków)
import 'preact-aurora-ui/styles/colors-extended.scss';
import 'preact-aurora-ui/styles/spacing.scss';
import 'preact-aurora-ui/styles/typography.scss';
import { ThemeProvider } from 'preact-aurora-ui';

function App() {
  return (
    <ThemeProvider autoGlobalStyles={true}>
      <div className="app">
        <MyComponent />
      </div>
    </ThemeProvider>
  );
}

// ✅ Nowy sposób (2 kroki)
import { AuroraProvider } from 'preact-aurora-ui';

function App() {
  return (
    <AuroraProvider>
      <MyComponent />
    </AuroraProvider>
  );
}
```

#### **C) Zaawansowana konfiguracja**

```tsx
// Dla power users - pełna kontrola
<AuroraProvider
  config={{
    theme: {
      mode: 'auto',
      customColors: {
        primary: '#1976d2',
        secondary: '#dc004e',
      },
    },
    animations: {
      enabled: true,
      duration: '200ms',
      easing: 'ease-out',
    },
    a11y: {
      respectMotionPreference: true,
      highContrast: false,
    },
  }}
>
  <App />
</AuroraProvider>
```

#### **D) CLI Setup Helper (Future)**

```bash
# Quick start CLI
npx create-aurora-app my-app
# lub
npm init aurora-app

# Add to existing project
npx aurora-ui init

# Co robi:
# ✅ Instaluje preact-aurora-ui
# ✅ Konfiguruje AuroraProvider w main.tsx
# ✅ Dodaje przykładowe komponenty
# ✅ Setup scripts w package.json
```

### ✅ Plan implementacji:

1. **Dzisiaj:** Utworzyć AuroraProvider komponent
2. **Jutro:** Przepisać ThemeProvider żeby był używany wewnętrznie
3. **Jutro:** Auto-import stylów w AuroraProvider
4. **Za tydzień:** CLI helper (opcjonalnie)
5. **Testy:** Verify zero-config experience

---

## 5. 🔧 **Developer Experience i Debugging**

**Priorytet:** 🟢 Średni | **Effort:** 4h | **Impact:** Średni

### Problem:

Brak narzędzi do debugowania, unclear error messages, no guidance.

### Rozwiązanie - Complete DX Package:

#### **A) Development Mode Warnings**

```tsx
// Automatyczna walidacja w dev mode
if (process.env.NODE_ENV === 'development') {
  const AuroraDevTools = {
    checkStylesImported() {
      if (!document.querySelector('[data-aurora-styles]')) {
        console.warn(
          '🎨 Aurora UI: Styles not found!\n' +
            '💡 Fix: import "preact-aurora-ui/styles" or use <AuroraProvider>',
        );
      }
    },

    checkThemeProvider() {
      try {
        useTheme();
      } catch {
        console.error(
          '🎭 Aurora UI: ThemeProvider missing!\n' +
            '💡 Fix: Wrap your app with <AuroraProvider> or <ThemeProvider>',
        );
      }
    },

    checkCSSVariables() {
      const rootStyles = getComputedStyle(document.documentElement);
      const requiredVars = ['--md-sys-color-primary', '--md-sys-color-surface'];

      requiredVars.forEach((varName) => {
        if (!rootStyles.getPropertyValue(varName)) {
          console.warn(`🎨 Missing CSS variable: ${varName}`);
        }
      });
    },
  };

  // Auto-run checks
  AuroraDevTools.checkStylesImported();
  AuroraDevTools.checkThemeProvider();
  AuroraDevTools.checkCSSVariables();
}
```

#### **B) Theme Inspector Component**

```tsx
// Debug component - tylko w development
import { ThemeInspector } from 'preact-aurora-ui/dev';

function App() {
  return (
    <AuroraProvider>
      {process.env.NODE_ENV === 'development' && <ThemeInspector />}
      <YourApp />
    </AuroraProvider>
  );
}

// ThemeInspector pokazuje:
// - Aktualne CSS variables
// - Theme mode (light/dark/auto)
// - Transition state
// - Performance metrics
// - Quick theme switcher
```

#### **C) Component Error Boundaries**

```tsx
// Built-in error handling dla Aurora components
<AuroraProvider
  fallback={<ErrorFallback />} // Custom error UI
  onError={(error, info) => {
    // Error reporting
    console.error('Aurora UI Error:', error, info);
  }}
>
  <App />
</AuroraProvider>
```

#### **D) Performance Monitoring**

```tsx
const { performance } = useTheme();

// Dostępne metryki:
console.log({
  themeLoadTime: performance.themeLoadTime, // ms
  transitionDuration: performance.lastTransition, // ms
  rerenderCount: performance.rerenders, // number
  memoryUsage: performance.memoryFootprint, // bytes
});
```

#### **E) Better Error Messages**

```tsx
// ❌ Obecne
Error: Cannot read property 'theme' of undefined

// ✅ Nowe - helpful errors
AuroraUIError: Theme not available

  This usually happens when useTheme() is called outside of ThemeProvider.

  Quick fix:
  1. Wrap your app with <AuroraProvider>
  2. Or use <ThemeProvider> higher in component tree

  Example:
    <AuroraProvider>
      <YourComponent />  ← useTheme() works here
    </AuroraProvider>

  Documentation: https://aurora-ui.dev/docs/theming
```

### ✅ Plan implementacji:

1. **Dzisiaj:** Dev warnings w AuroraProvider
2. **Jutro:** ThemeInspector component
3. **Jutro:** Better error messages
4. **Za tydzień:** Performance monitoring
5. **Testy:** Verify DX improvements

---

## 6. 📚 **Dokumentacja i onboarding**

**Priorytet:** 🟢 Średni | **Effort:** 6h | **Impact:** Wysoki

### Problem:

Brak clear getting started guide, troubleshooting, best practices.

### Rozwiązanie - Complete Documentation:

#### **A) Quick Start Guide - 2 minuty do działającej aplikacji**

```md
# Aurora UI - Quick Start

## 1. Install (30s)

npm install preact-aurora-ui

## 2. Setup (30s)

// src/main.tsx
import { AuroraProvider } from 'preact-aurora-ui';
import App from './App';

render(
<AuroraProvider>
<App />
</AuroraProvider>,
document.getElementById('app')!
);

## 3. Use components (60s)

// src/App.tsx  
import { Button, Card, useTheme } from 'preact-aurora-ui';

export default function App() {
const { toggleMode, isDark } = useTheme();

return (
<Card>
<h1>Hello Aurora UI!</h1>
<Button onClick={toggleMode}>
Switch to {isDark ? 'Light' : 'Dark'} Mode
</Button>
</Card>
);
}

🎉 Done! Your app now has beautiful themes and components.
```

#### **B) Troubleshooting Guide**

```md
# Common Issues & Solutions

## "Styles not applied"

❌ Problem: Components look unstyled
✅ Solution: Wrap app with <AuroraProvider>

## "Theme not switching"

❌ Problem: toggleMode() doesn't work
✅ Solution: Use useTheme() inside AuroraProvider

## "CSS conflicts"

❌ Problem: Existing styles override Aurora UI
✅ Solution: Use CSS layers or increase specificity

## "Bundle size too large"

❌ Problem: 500kb+ bundle with Aurora UI
✅ Solution: Enable tree-shaking, import only needed components

## "TypeScript errors"

❌ Problem: Type definitions not found
✅ Solution: npm install @types/aurora-ui (auto-included in v0.0.8+)
```

#### **C) Migration Guides**

```md
# Migration Guide v0.0.7 → v0.0.8

## Breaking Changes: None! 🎉

v0.0.8 is fully backwards compatible.

## Recommended Updates:

### 1. Replace ThemeProvider with AuroraProvider

// Before (still works)
<ThemeProvider autoGlobalStyles={true}>

// After (recommended)  
<AuroraProvider>

### 2. Remove manual style imports

// Before - delete these lines:
import 'preact-aurora-ui/styles/colors-extended.scss';
import 'preact-aurora-ui/styles/spacing.scss';

// After - no imports needed!
import { Button } from 'preact-aurora-ui'; // Styles auto-loaded

### 3. Update useTheme usage

const {
theme,
toggleMode,
// New in v0.0.8:
forceUpdate, // Fixes stale theme issues
themeReady // Prevents flash of unstyled content
} = useTheme();
```

#### **D) Best Practices Guide**

```md
# Aurora UI Best Practices

## Theme Customization

✅ Use CSS custom properties for colors
✅ Follow Material Design 3 conventions  
✅ Test in both light and dark modes
❌ Don't use !important unless absolutely necessary

## Performance

✅ Import only components you use
✅ Enable tree-shaking in bundler
✅ Use AuroraProvider at root level only
❌ Don't nest multiple AuroraProviders

## Accessibility

✅ Test with screen readers
✅ Respect prefers-reduced-motion
✅ Ensure color contrast meets WCAG standards
```

### ✅ Plan implementacji:

1. **Dzisiaj:** Quick Start Guide
2. **Jutro:** Troubleshooting Guide
3. **Jutro:** Migration Guide v0.0.7 → v0.0.8
4. **Za tydzień:** Best Practices + Examples
5. **Za tydzień:** Interactive playground/Storybook

---

## 7. 🧪 **Testing i Quality Assurance**

**Priorytet:** 🟢 Średni | **Effort:** 8h | **Impact:** Długoterminowy

### Problem:

Brak systematycznych testów, manual QA, no regression protection.

### Rozwiązanie - Comprehensive Testing Strategy:

#### **A) Automated Visual Testing**

```javascript
// tests/visual/theme-switching.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Theme switching', () => {
  test('smooth transition between light and dark', async ({ page }) => {
    await page.goto('/');

    // Screenshot light mode
    await expect(page).toHaveScreenshot('light-mode.png');

    // Switch to dark
    await page.click('[data-testid="theme-toggle"]');
    await page.waitForTimeout(300); // Wait for transition

    // Screenshot dark mode
    await expect(page).toHaveScreenshot('dark-mode.png');

    // Verify no flash/flicker during transition
    const transitions = await page.evaluate(() => {
      return performance
        .getEntriesByType('measure')
        .filter((entry) => entry.name.includes('theme-transition'));
    });

    expect(transitions[0].duration).toBeLessThan(500);
  });
});
```

#### **B) Cross-browser Compatibility**

```javascript
// tests/compatibility/browsers.spec.ts
const browsers = ['chromium', 'firefox', 'webkit'];

browsers.forEach((browserName) => {
  test(`Aurora UI works in ${browserName}`, async ({ page }) => {
    // Test CSS variables support
    const cssVariablesWork = await page.evaluate(() => {
      const el = document.createElement('div');
      el.style.setProperty('--test-var', 'red');
      return getComputedStyle(el).getPropertyValue('--test-var') === 'red';
    });

    expect(cssVariablesWork).toBe(true);

    // Test component rendering
    await page.goto('/components');
    await expect(page.locator('.aurora-button')).toBeVisible();
    await expect(page.locator('.aurora-card')).toBeVisible();
  });
});
```

#### **C) Performance Testing**

```javascript
// tests/performance/theme-performance.spec.ts
test('theme switching performance', async ({ page }) => {
  await page.goto('/');

  // Measure theme switch time
  const startTime = Date.now();
  await page.click('[data-testid="theme-toggle"]');

  // Wait for theme to fully apply
  await page.waitForFunction(() => {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  });

  const switchTime = Date.now() - startTime;

  expect(switchTime).toBeLessThan(100); // Should be fast
});

test('bundle size limits', async () => {
  const bundleSize = await getBundleSize('dist/index.js');

  expect(bundleSize).toBeLessThan(150 * 1024); // < 150KB
});
```

#### **D) SSR Compatibility Testing**

```javascript
// tests/ssr/next-js.spec.ts
test('works with Next.js SSR', async ({ page }) => {
  await page.goto('/ssr-test');

  // Should not have hydration mismatches
  const hydrationErrors = await page.evaluate(() => {
    return window.__NEXT_HYDRATION_ERROR___ || null;
  });

  expect(hydrationErrors).toBeNull();

  // Theme should be correct on initial load
  const theme = await page.getAttribute('html', 'data-theme');
  expect(['light', 'dark']).toContain(theme);
});
```

#### **E) Accessibility Testing**

```javascript
// tests/a11y/accessibility.spec.ts
import { injectAxe, checkA11y } from 'axe-playwright';

test('passes accessibility audit', async ({ page }) => {
  await page.goto('/');
  await injectAxe(page);

  // Test both themes
  await checkA11y(page, null, {
    detailedReport: true,
    detailedReportOptions: { html: true },
  });

  await page.click('[data-testid="theme-toggle"]');
  await page.waitForTimeout(300);

  await checkA11y(page, null, {
    detailedReport: true,
  });
});
```

#### **F) Component API Testing**

```javascript
// tests/unit/hooks.spec.ts
import { renderHook, act } from '@testing-library/preact';
import { useTheme } from 'preact-aurora-ui';

test('useTheme hook functionality', () => {
  const { result } = renderHook(() => useTheme(), {
    wrapper: AuroraProvider,
  });

  // Initial state
  expect(result.current.theme).toBe('light');
  expect(result.current.isDark).toBe(false);

  // Toggle theme
  act(() => {
    result.current.toggleMode();
  });

  expect(result.current.theme).toBe('dark');
  expect(result.current.isDark).toBe(true);

  // Force update
  act(() => {
    result.current.forceUpdate();
  });

  expect(result.current.themeReady).toBe(true);
});
```

### ✅ Plan implementacji:

1. **Dzisiaj:** Setup Playwright dla visual tests
2. **Jutro:** Cross-browser compatibility tests
3. **Za tydzień:** Performance benchmarks
4. **Za tydzień:** SSR compatibility suite
5. **Za 2 tygodnie:** Full CI/CD integration

---

## 📊 **Implementation Roadmap**

### **🔴 v0.0.8 - Krytyczne poprawki (Release: Za 3 dni)**

**Cel:** Naprawić główne problemy UX, zachować backwards compatibility

| Feature                     | Effort | Status       | Owner |
| --------------------------- | ------ | ------------ | ----- |
| Auto-import stylów          | 2h     | 🟡 Planowane | Dev   |
| Transitions w komponentach  | 2h     | 🟡 Planowane | Dev   |
| ThemeProvider forceRerender | 2h     | 🟡 Planowane | Dev   |
| CSS Variables audit         | 3h     | 🟡 Planowane | Dev   |
| Dev mode warnings           | 1h     | 🟡 Planowane | Dev   |

**Testing required:**

- [ ] Manual testing - theme switching
- [ ] Bundle size check
- [ ] Backwards compatibility
- [ ] Cross-browser basic test

---

### **🟡 v0.0.9 - DX Improvements (Release: Za 2 tygodnie)**

**Cel:** Uprościć API, dodać developer tools

| Feature                   | Effort | Priority |
| ------------------------- | ------ | -------- |
| AuroraProvider component  | 4h     | High     |
| ThemeInspector dev tool   | 3h     | Medium   |
| Enhanced useTheme hook    | 2h     | High     |
| Better error messages     | 2h     | Medium   |
| Quick Start documentation | 4h     | High     |
| Migration guide           | 2h     | Medium   |

---

### **🟢 v0.1.0 - Major Release (Release: Za miesiąc)**

**Cel:** Complete modernization, remove legacy

| Feature                     | Effort | Breaking |
| --------------------------- | ------ | -------- |
| Remove legacy CSS variables | 3h     | ⚠️ Yes   |
| CLI setup helper            | 8h     | No       |
| Complete test suite         | 10h    | No       |
| Performance optimizations   | 6h     | No       |
| SSR compatibility           | 4h     | No       |
| Component API v2            | 12h    | ⚠️ Yes   |

---

## ✅ **Acceptance Criteria dla v0.0.8**

### **Musi działać:**

- [ ] `npm install preact-aurora-ui` + `<AuroraProvider>` = działająca aplikacja
- [ ] Przełączanie motywów bez migotania/reloadowania
- [ ] Wszystkie komponenty używają spójnych CSS variables
- [ ] Zero breaking changes vs v0.0.7
- [ ] Bundle size < 150KB (obecnie ~120KB)

### **Developer Experience:**

- [ ] Jasne error messages gdy brakuje AuroraProvider
- [ ] Dev warnings dla częstych problemów
- [ ] Working TypeScript definitions
- [ ] Quick start guide (2 min setup)

### **Performance:**

- [ ] Theme switching < 100ms
- [ ] Smooth transitions (no jank)
- [ ] Memory usage stabilny
- [ ] No layout thrashing

### **Compatibility:**

- [ ] Works in Chrome/Firefox/Safari/Edge
- [ ] Compatible with Vite/Webpack/Rollup
- [ ] SSR-safe (Next.js/Nuxt)
- [ ] Mobile responsive

---

## 🚀 **Quick Wins dla najbliższych dni**

### **Dzisiaj (2h):**

1. ✅ Auto-import CSS w index.js
2. ✅ Basic transitions dla Button/Card
3. ✅ forceRerender w ThemeProvider

### **Jutro (3h):**

1. ✅ CSS variables audit + fix
2. ✅ Dev warnings
3. ✅ Quick test suite

### **Pojutrze (2h):**

1. ✅ Documentation update
2. ✅ Final testing
3. ✅ Release v0.0.8

---

## 🎯 **Success Metrics**

| Metric                 | Current | Target v0.0.8 | Target v0.1.0 |
| ---------------------- | ------- | ------------- | ------------- |
| Setup time             | ~10 min | ~2 min        | ~30 sec       |
| GitHub issues (setup)  | 8 open  | < 3           | < 1           |
| Bundle size            | 120KB   | < 150KB       | < 100KB       |
| Theme switch time      | ~500ms  | < 100ms       | < 50ms        |
| Dev satisfaction       | 3/5     | 4/5           | 5/5           |
| Documentation coverage | 40%     | 80%           | 95%           |

---

## ⚡ **Immediate Action Items**

### **Critical - Do dzisiaj:**

1. **Auto-import setup** - Dodać `import './styles/aurora-ui.css'` do index.js
2. **CSS transitions** - Dodać do wszystkich komponentów Aurora UI
3. **forceRerender** - Poprawić ThemeProvider żeby wymuszał update

### **High Priority - Do jutra:**

1. **CSS Variables audit** - Scan i fix niespójności MD3
2. **Dev warnings** - Basic validation w development mode
3. **Quick testing** - Manual verification że wszystko działa

### **Medium Priority - Do pojutrza:**

1. **Documentation** - Update README z nowym setup
2. **Migration guide** - v0.0.7 → v0.0.8 guide
3. **Release v0.0.8** - Publikacja na NPM

---

## 🏆 **Expected Impact**

**Po v0.0.8:**

- ✅ Setup time: 10 min → 2 min (80% reduction)
- ✅ Theme switching issues: 90% resolved
- ✅ CSS conflicts: 70% reduced
- ✅ Developer frustration: Significantly decreased

**Po v0.1.0:**

- ✅ Aurora UI becomes go-to choice for Preact theming
- ✅ Zero-config experience competitive with major libraries
- ✅ Strong foundation for future features
- ✅ Active community adoption

---

## 💡 **Wniosek**

Aurora UI ma **excellent foundations** i jest blisko bycia production-ready library. Główne bariery adopcji to:

1. **Setup complexity** - rozwiązane przez AuroraProvider
2. **Theme switching issues** - rozwiązane przez improved ThemeProvider
3. **Missing developer tools** - rozwiązane przez dev warnings i debugging

Z planowanymi improvements w v0.0.8-v0.1.0, Aurora UI stanie się **best-in-class** solution dla Preact theme management.

**Recommendation:** Prioritize v0.0.8 release dla quick wins, then focus on v0.1.0 dla complete modernization.
