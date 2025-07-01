# Aurora UI v0.1.0 - Roadmap & Breaking Changes

## 📋 Executive Summary

Aurora UI v0.1.0 będzie pierwszą **major release** z breaking changes, skupiającą się na kompletnej modernizacji i standaryzacji. Głównym celem jest eliminacja legacy kodu, wprowadzenie zaawansowanych funkcji developer experience oraz optymalizacja wydajności.

**Planowana data wydania:** 🗓️ Sierpień 2025  
**Status:** 🟡 W planowaniu  
**Breaking changes:** ⚠️ Tak - wymagana migracja z v0.0.x

---

## 🎯 **Główne Cele v0.1.0**

### 1. **🧹 Czyszczenie Legacy Code**

- Usunięcie deprecated CSS variables (--color-_ → --md-sys-color-_)
- Eliminacja starych API i komponentów
- Standaryzacja na Material Design 3

### 2. **⚡ Performance & Bundle Size**

- Redukcja bundle size o 30% (target: <100KB)
- Tree-shaking optimization
- Lazy loading komponentów
- Code splitting dla większych komponentów

### 3. **🔧 Enhanced Developer Experience**

- CLI setup helper (`npx aurora-ui init`)
- ThemeInspector dev tool
- Performance monitoring hooks
- Advanced debugging tools

### 4. **📱 Mobile & Responsive Enhancements**

- Touch gestures support
- Mobile-first responsive design
- PWA components
- Accessibility improvements

---

## ⚠️ **Breaking Changes**

### **CSS Variables Migration**

```scss
/* ❌ v0.0.x - będzie usunięte */
.my-component {
  background: var(--color-primary);
  color: var(--color-on-surface);
  border: 1px solid var(--color-outline);
}

/* ✅ v0.1.0 - wymagane */
.my-component {
  background: var(--md-sys-color-primary);
  color: var(--md-sys-color-on-surface);
  border: 1px solid var(--md-sys-color-outline);
}
```

### **Component API Changes**

#### ThemeProvider → AuroraProvider (Required)

```tsx
// ❌ v0.0.x - będzie deprecated
<ThemeProvider autoGlobalStyles={true}>
  <App />
</ThemeProvider>

// ✅ v0.1.0 - wymagane
<AuroraProvider>
  <App />
</AuroraProvider>
```

#### Button Component Simplification

```tsx
// ❌ v0.0.x - niektóre props będą usunięte
<Button
  color="primary"         // ❌ deprecated
  size="medium"          // ❌ deprecated
  variant="filled"       // ✅ zachowane
  elevation={2}          // ❌ deprecated - użyj variant
>

// ✅ v0.1.0 - uproszczone API
<Button
  variant="filled"       // 'text' | 'outlined' | 'filled' | 'elevated'
  disabled={false}
  loading={false}
>
```

#### Card Component Restructure

```tsx
// ❌ v0.0.x - zmieni się struktura props
<Card
  variant="outlined"
  elevation={4}          // ❌ deprecated
  hoverable={true}       // ❌ deprecated
  padding="lg"           // ❌ deprecated
>

// ✅ v0.1.0 - nowe API
<Card
  variant="outlined"     // 'elevated' | 'outlined' | 'filled'
  interactive={true}     // zastępuje hoverable + clickable
  spacing="comfortable"  // 'compact' | 'comfortable' | 'spacious'
>
```

### **Removed Components**

Komponenty które będą usunięte w v0.1.0:

- ❌ `ExampleButton` - użyj `Button`
- ❌ `Layout` (old) - użyj `AppLayout`
- ❌ `ThemeToggle` (standalone) - użyj `useTheme` hook
- ❌ Legacy `Grid` system - użyj CSS Grid lub Flexbox

---

## 🚀 **Nowe Funkcje v0.1.0**

### **1. CLI Setup Helper**

```bash
# Nowy projekt
npx create-aurora-app my-app
cd my-app
npm start

# Dodanie do istniejącego projektu
npx aurora-ui init

# Interaktywny setup
npx aurora-ui setup
```

Co robi CLI:

- ✅ Automatyczna instalacja pakietów
- ✅ Konfiguracja AuroraProvider
- ✅ Przykładowe komponenty
- ✅ TypeScript setup
- ✅ ESLint/Prettier konfiguracja
- ✅ Storybook integration (opcjonalnie)

### **2. ThemeInspector DevTool**

```tsx
import { ThemeInspector } from 'preact-aurora-ui/dev';

// Tylko w development mode
function App() {
  return (
    <AuroraProvider>
      <MyApp />
      {process.env.NODE_ENV === 'development' && <ThemeInspector />}
    </AuroraProvider>
  );
}
```

ThemeInspector features:

- 🎨 Live CSS variables preview
- 🔄 Theme switcher with preview
- 📊 Performance metrics
- 🐛 Debug information
- 📱 Responsive breakpoint indicators
- 🎯 Accessibility checker

### **3. Performance Monitoring Hooks**

```tsx
import { usePerformance, useThemeMetrics } from 'preact-aurora-ui/hooks';

function MyComponent() {
  const perf = usePerformance();
  const themeMetrics = useThemeMetrics();

  console.log({
    renderTime: perf.renderTime, // ms
    memoryUsage: perf.memoryUsage, // bytes
    themeLoadTime: themeMetrics.loadTime,
    transitionTime: themeMetrics.transitionTime,
  });
}
```

### **4. Advanced Components**

#### **DataTable v2**

```tsx
<DataTable
  data={users}
  columns={columns}
  virtualized={true} // Dla dużych zbiorów danych
  sorting={{ enabled: true, multiple: true }}
  filtering={{ enabled: true, global: true }}
  pagination={{ pageSize: 50, total: 10000 }}
  selection={{ type: 'multiple', preserveSelection: true }}
  loading={isLoading}
  error={error}
/>
```

#### **Form Components Suite**

```tsx
<Form onSubmit={handleSubmit} validation={schema}>
  <FormField name="email" label="Email" required>
    <TextField type="email" />
  </FormField>

  <FormField name="country" label="Country">
    <Select options={countries} searchable={true} async={true} loadOptions={loadCountries} />
  </FormField>

  <FormActions>
    <Button type="submit" variant="filled">
      Submit
    </Button>
    <Button type="reset" variant="text">
      Reset
    </Button>
  </FormActions>
</Form>
```

#### **Navigation Components**

```tsx
// Responsive navigation z auto-collapse
<NavigationDrawer
  items={menuItems}
  mode="responsive"        // 'permanent' | 'dismissible' | 'modal' | 'responsive'
  breakpoint="md"
  collapsible={true}
>
  <AppContent />
</NavigationDrawer>

// Advanced breadcrumbs
<Breadcrumbs
  items={breadcrumbItems}
  maxItems={4}
  separator="/"
  showHome={true}
  loading={isNavigating}
/>
```

### **5. Accessibility Enhancements**

```tsx
// Nowy komponent dla skip links
<SkipLinks
  links={[
    { href: '#main', label: 'Skip to main content' },
    { href: '#nav', label: 'Skip to navigation' },
  ]}
/>;

// Enhanced focus management
import { useFocusManagement } from 'preact-aurora-ui/a11y';

function Modal() {
  const { trapFocus, restoreFocus } = useFocusManagement();

  useEffect(() => {
    trapFocus();
    return restoreFocus;
  }, []);
}

// Screen reader utilities
import { announceToScreenReader } from 'preact-aurora-ui/a11y';

function handleSave() {
  // Save logic...
  announceToScreenReader('Document saved successfully', 'polite');
}
```

### **6. Internationalization (i18n)**

```tsx
import { AuroraProvider, useTranslation } from 'preact-aurora-ui';
import enMessages from './locales/en.json';
import plMessages from './locales/pl.json';

<AuroraProvider locale="pl" messages={{ en: enMessages, pl: plMessages }}>
  <App />
</AuroraProvider>;

function MyComponent() {
  const { t, locale, setLocale } = useTranslation();

  return (
    <div>
      <h1>{t('welcome.title')}</h1>
      <Button onClick={() => setLocale('en')}>{t('switch.language')}</Button>
    </div>
  );
}
```

---

## 📊 **Performance Targets v0.1.0**

| Metric                    | Current v0.0.8 | Target v0.1.0 | Improvement   |
| ------------------------- | -------------- | ------------- | ------------- |
| Bundle Size               | ~120KB         | <100KB        | 17% reduction |
| Theme Switch              | <100ms         | <50ms         | 50% faster    |
| First Paint               | ~200ms         | <150ms        | 25% faster    |
| TTI (Time to Interactive) | ~800ms         | <600ms        | 25% faster    |
| Memory Usage              | ~8MB           | <6MB          | 25% reduction |
| Tree Shaking              | Partial        | Complete      | 100% coverage |

---

## 🛠️ **Migration Guide v0.0.x → v0.1.0**

### **Automated Migration Tool**

```bash
# Aurora UI migration assistant
npx aurora-ui migrate

# Co robi:
# ✅ Scanuje kod i znajduje deprecated API
# ✅ Automatyczne replacements (gdzie możliwe)
# ✅ Generuje raport z wymaganymi zmianami
# ✅ Tworzy backup przed zmianami
# ✅ Dostarcza kod review checklist
```

### **Manual Migration Steps**

#### **1. CSS Variables (Required)**

```bash
# Użyj global find & replace w projekcie:

# Kolory
--color-primary → --md-sys-color-primary
--color-surface → --md-sys-color-surface
--color-on-surface → --md-sys-color-on-surface
--color-outline → --md-sys-color-outline

# Spacing (nowe nazwy)
--space-xs → --md-sys-space-4
--space-sm → --md-sys-space-8
--space-md → --md-sys-space-16
--space-lg → --md-sys-space-24
--space-xl → --md-sys-space-32
```

#### **2. Component Props Updates**

```tsx
// Button component
// ❌ Old
<Button color="primary" size="medium" elevation={2}>

// ✅ New
<Button variant="filled">

// Card component
// ❌ Old
<Card elevation={4} hoverable padding="lg">

// ✅ New
<Card variant="elevated" interactive spacing="comfortable">

// TextField
// ❌ Old
<TextField variant="outlined" size="medium" color="primary">

// ✅ New
<TextField variant="outlined">
```

#### **3. Import Updates**

```tsx
// ❌ Old imports
import { ThemeProvider, ThemeToggle } from 'preact-aurora-ui';

// ✅ New imports
import { AuroraProvider, useTheme } from 'preact-aurora-ui';

// Legacy components
// ❌ Remove
import { ExampleButton, Layout } from 'preact-aurora-ui';

// ✅ Replace with
import { Button, AppLayout } from 'preact-aurora-ui';
```

### **Migration Timeline**

#### **Pre-Migration (Lipiec 2025)**

- 📚 Dokumentacja migracji ready
- 🛠️ Migration tool alpha
- 🧪 Beta testing z community

#### **Migration Period (Sierpień 2025)**

- 🚀 v0.1.0 Release
- 📖 Updated documentation
- 🆘 Migration support

#### **Post-Migration (Wrzesień 2025)**

- ❌ v0.0.x support ends
- 🐛 Bug fixes only dla v0.1.x
- 🚀 Focus on v0.2.0 features

---

## 🧪 **Testing Strategy v0.1.0**

### **Enhanced Test Suite**

```bash
# Nowe kategorie testów
npm run test:migration     # Testy kompatybilności
npm run test:performance   # Benchmarki wydajności
npm run test:a11y         # Accessibility compliance
npm run test:visual       # Visual regression tests
npm run test:e2e          # End-to-end scenarios
```

### **Quality Gates**

- ✅ 95%+ test coverage
- ✅ 0 accessibility violations
- ✅ Bundle size <100KB
- ✅ Performance budget compliance
- ✅ Cross-browser compatibility
- ✅ SSR compatibility

---

## 📚 **Documentation v0.1.0**

### **New Documentation Structure**

```
docs/
├── getting-started/
│   ├── installation.md
│   ├── quick-start.md
│   └── migration-guide.md
├── components/
│   ├── overview.md
│   ├── button.md
│   ├── card.md
│   └── ...
├── theming/
│   ├── color-system.md
│   ├── typography.md
│   └── custom-themes.md
├── accessibility/
│   ├── guidelines.md
│   ├── testing.md
│   └── screen-readers.md
├── performance/
│   ├── optimization.md
│   ├── bundle-analysis.md
│   └── best-practices.md
└── api-reference/
    ├── hooks.md
    ├── types.md
    └── utilities.md
```

### **Interactive Examples**

- 🎮 Playground z live code editing
- 📱 Mobile/tablet preview modes
- 🎨 Theme customizer
- ♿ Accessibility checker
- 📊 Performance profiler

---

## 🎉 **Community & Ecosystem**

### **Templates & Starters**

```bash
# Official templates
npx create-aurora-app my-app --template minimal
npx create-aurora-app my-app --template dashboard
npx create-aurora-app my-app --template e-commerce
npx create-aurora-app my-app --template landing-page

# Framework integrations
npx create-aurora-app my-app --framework vite
npx create-aurora-app my-app --framework next
npx create-aurora-app my-app --framework astro
```

### **VSCode Extension**

- 🎨 Component snippets
- 🔍 CSS variables IntelliSense
- 📊 Theme preview
- 🐛 Linting rules
- 📚 Inline documentation

### **Figma Plugin**

- 🎨 Design tokens sync
- 📐 Component library
- 🔄 Auto-generate props
- 📱 Responsive preview

---

## ⏰ **Release Timeline**

### **Phase 1: Foundation (Lipiec 2025)**

- ✅ Breaking changes specification
- ✅ Migration tool development
- ✅ CLI helper beta
- ✅ Documentation updates

### **Phase 2: Implementation (Sierpień 2025)**

- 🚀 v0.1.0-alpha releases
- 🧪 Community beta testing
- 🐛 Bug fixes & refinements
- 📚 Final documentation

### **Phase 3: Release (Koniec Sierpnia 2025)**

- 🎉 v0.1.0 stable release
- 📢 Release announcement
- 🆘 Migration support
- 🚀 Marketing & adoption

### **Phase 4: Stabilization (Wrzesień 2025)**

- 🐛 Patch releases (v0.1.1, v0.1.2...)
- 📈 Performance optimizations
- 🔧 Developer feedback integration
- 📋 v0.2.0 planning

---

## 🤝 **How to Contribute**

### **Feedback & Input**

- 💬 [GitHub Discussions](https://github.com/prachwal/preact-aurora-ui/discussions)
- 🐛 [Issue Tracker](https://github.com/prachwal/preact-aurora-ui/issues)
- 📧 Email: feedback@aurora-ui.dev

### **Beta Testing**

- 🧪 Test migration tool
- 📱 Mobile/accessibility testing
- ⚡ Performance benchmarks
- 📚 Documentation review

### **Development**

- 🛠️ CLI tool contributions
- 🎨 Component development
- 🧪 Test suite expansion
- 📖 Documentation improvements

---

## 📞 **Support & Resources**

- 📖 **Documentation:** https://aurora-ui.dev/docs/v0.1.0
- 🎮 **Playground:** https://aurora-ui.dev/playground
- 💬 **Discord Community:** https://discord.gg/aurora-ui
- 📺 **YouTube Tutorials:** https://youtube.com/@aurora-ui
- 🐛 **Issue Tracker:** https://github.com/prachwal/preact-aurora-ui/issues

---

**Aurora UI v0.1.0** - The future of Preact component libraries! ✨

_Last updated: July 1, 2025_
