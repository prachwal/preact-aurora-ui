# Plan zgodności z Material Design 3 (MSUI) - Aurora UI

## 📊 Analiza obecnego stanu vs Material Design 3

### ✅ Komponenty już zgodne z MSUI (Faza 1 - ukończona)

1. **Card** ⭐⭐⭐⭐⭐
   - ✅ Warianty: default, outlined, elevated, filled
   - ✅ System elevation (0-24) zgodny z MD3
   - ✅ Padding variants, interactive states
   - ✅ Loading state z animacją

2. **Sidebar** ⭐⭐⭐⭐⭐ (Navigation Drawer w MD3)
   - ✅ Warianty: default, rail, temporary, permanent
   - ✅ Collapsible behavior z animacjami
   - ✅ Elevation system, pozycja left/right
   - ✅ Responsive behavior

3. **Content** ⭐⭐⭐⭐⭐ (Surface w MD3)
   - ✅ Warianty: default, article, dashboard, form
   - ✅ Padding system, centered layouts
   - ✅ MaxWidth i scrollable props

4. **Footer** ⭐⭐⭐⭐
   - ✅ Warianty: default, minimal, extended
   - ✅ Links i social media support
   - ✅ Elevation system

5. **Grid/Row/Col** ⭐⭐⭐⭐
   - ✅ Responsive 12-column system
   - ✅ Breakpoints (xs, sm, md, lg, xl)
   - ✅ Justify, align, gap properties

---

## 🚧 Komponenty wymagające dopasowania do MSUI (Faza 2)

### 1. **Button Component** (BRAKUJE - WYSOKIJ PRIORYTET)

Material Design 3 Button to jeden z najważniejszych komponentów. Obecnie mamy tylko `ExampleButton`.

**MD3 Button Structure:**

```typescript
interface ButtonProps {
  // MD3 Button variants
  variant?: 'elevated' | 'filled' | 'filled-tonal' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;

  // Icon support
  icon?: ComponentChildren;
  iconPosition?: 'start' | 'end';

  // Link support
  href?: string;
  target?: string;
}
```

**SCSS Structure:**

```scss
// MD3 Button variants
.button--variant-elevated {
  background: var(--md-sys-color-surface-container-low);
  box-shadow: var(--md-sys-elevation-level1);
}

.button--variant-filled {
  background: var(--md-sys-color-primary);
  color: var(--md-sys-color-on-primary);
}

.button--variant-filled-tonal {
  background: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
}

.button--variant-outlined {
  border: 1px solid var(--md-sys-color-outline);
  background: transparent;
}

.button--variant-text {
  background: transparent;
  box-shadow: none;
}
```

### 2. **Menu Component** - rozbudowa do MD3 Menu

**Obecny stan:** ⭐⭐⭐ (podstawowe menu)

**MD3 Menu wymagania:**

```typescript
interface MenuProps {
  // Istniejące
  items: MenuItem[];
  selectedKey?: string;

  // NOWE - MD3 Menu props
  variant?: 'default' | 'dropdown' | 'context' | 'navigation';
  elevation?: 0 | 1 | 2 | 3 | 4;
  dense?: boolean;
  multiSelect?: boolean;
  selectedKeys?: string[];

  // Submenu support
  expandIcon?: ComponentChildren;
  collapseIcon?: ComponentChildren;
}

interface MenuItem {
  // Istniejące
  key: string;
  label: ComponentChildren;
  icon?: ComponentChildren;

  // NOWE - MD3 MenuItem props
  divider?: boolean;
  submenu?: MenuItem[];
  badge?: string | number;
  shortcut?: string;
}
```

### 3. **Loader Component** - MD3 Progress Indicators

**Obecny stan:** ⭐⭐⭐⭐⭐ **UKOŃCZONE** ✅

**MD3 Progress wymagania - ZAIMPLEMENTOWANE:**

```typescript
interface ProgressProps {
  // Podstawowe
  className?: string;
  style?: JSX.CSSProperties;
  'aria-label'?: string;

  // MD3 Progress variants ✅
  variant?: 'circular' | 'linear';

  // Progress modes ✅
  determinate?: boolean;
  value?: number; // 0-100 for determinate
  buffer?: number; // for linear buffering

  // Size system ✅
  size?: 'small' | 'medium' | 'large' | number;

  // Colors ✅
  color?: 'primary' | 'secondary' | 'tertiary';

  // Customization ✅
  thickness?: number;
  trackColor?: string;
  animationDuration?: number;
}
```

**Zachowana backwards compatibility:** Loader nadal działa jako wrapper dla Progress.

````

### 4. **Header Component** - MD3 App Bar

**Obecny stan:** ⭐⭐⭐⭐ (dobry, ale może być bardziej zgodny z MD3)

**MD3 App Bar dodatkowe props:**

```typescript
interface HeaderProps {
  // Istniejące są OK

  // NOWE - MD3 App Bar props
  scrollBehavior?: 'fixed' | 'scroll' | 'hide' | 'elevate';
  centerTitle?: boolean;

  // Navigation
  navigationIcon?: ComponentChildren;
  onNavigationClick?: () => void;

  // Action overflow
  moreActions?: MenuItem[];
}
````

---

## 🎨 System Design Tokens - zgodność z MD3

### Material Design 3 Color System

**Potrzebne zmienne CSS:**

```scss
:root {
  // Primary colors
  --md-sys-color-primary: #6750a4;
  --md-sys-color-on-primary: #ffffff;
  --md-sys-color-primary-container: #eaddff;
  --md-sys-color-on-primary-container: #21005d;

  // Secondary colors
  --md-sys-color-secondary: #625b71;
  --md-sys-color-on-secondary: #ffffff;
  --md-sys-color-secondary-container: #e8def8;
  --md-sys-color-on-secondary-container: #1d192b;

  // Tertiary colors
  --md-sys-color-tertiary: #7d5260;
  --md-sys-color-on-tertiary: #ffffff;
  --md-sys-color-tertiary-container: #ffd8e4;
  --md-sys-color-on-tertiary-container: #31111d;

  // Surface colors
  --md-sys-color-surface: #fffbfe;
  --md-sys-color-on-surface: #1c1b1f;
  --md-sys-color-surface-variant: #e7e0ec;
  --md-sys-color-on-surface-variant: #49454f;

  // Outline
  --md-sys-color-outline: #79747e;
  --md-sys-color-outline-variant: #cab4d0;
}
```

### MD3 Elevation System

**Już mamy, ale można doprecyzować:**

```scss
:root {
  --md-sys-elevation-level0: none;
  --md-sys-elevation-level1:
    0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
  --md-sys-elevation-level2:
    0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15);
  --md-sys-elevation-level3:
    0px 1px 3px 0px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15);
  --md-sys-elevation-level4:
    0px 2px 3px 0px rgba(0, 0, 0, 0.3), 0px 6px 10px 4px rgba(0, 0, 0, 0.15);
  --md-sys-elevation-level5:
    0px 4px 4px 0px rgba(0, 0, 0, 0.3), 0px 8px 12px 6px rgba(0, 0, 0, 0.15);
}
```

---

## 📋 Roadmap wdrożenia - Faza 2

### Krok 1: Button Component (KRYTYCZNY)

- [ ] Stworzenie `src/components/Button/`
- [ ] Implementacja 5 wariantów MD3
- [ ] System rozmiarów i stanów
- [ ] Icon support i loading states
- [ ] Link support (button as anchor)
- [ ] Pełne testy i Storybook

### Krok 2: Menu rozbudowa

- [ ] Dodanie wariantów menu (dropdown, context)
- [ ] Submenu support z animacjami
- [ ] Dense variant i multiselect
- [ ] Badge i shortcut support

### Krok 3: Loader jako Progress Indicators

- [x] **Circular i Linear variants** ✅ UKOŃCZONE
- [x] **Determinate i indeterminate modes** ✅ UKOŃCZONE
- [x] **Buffer support dla linear** ✅ UKOŃCZONE
- [x] **Color system integration** ✅ UKOŃCZONE
- [x] **Size system (small, medium, large, custom)** ✅ UKOŃCZONE
- [x] **Comprehensive tests and Storybook** ✅ UKOŃCZONE
- [x] **Backwards compatibility preserved** ✅ UKOŃCZONE

### Krok 4: Header App Bar enhancements

- [ ] Scroll behaviors (hide, elevate)
- [ ] Navigation icon support
- [ ] Center title option
- [ ] Action overflow menu

### Krok 5: Design Tokens System

- [ ] Implementacja pełnej palety MD3
- [ ] Dark theme support
- [ ] Custom theme generator
- [ ] CSS custom properties migration

---

## 🎯 Przykłady użycia docelowego

### Button (do zaimplementowania)

```tsx
// MD3 Button variants
<Button variant="filled">Primary Action</Button>
<Button variant="filled-tonal">Secondary Action</Button>
<Button variant="outlined">Tertiary Action</Button>
<Button variant="text" icon="❤️">Like</Button>
<Button variant="elevated" loading>Loading...</Button>

// With icons
<Button variant="filled" icon="+" iconPosition="start">
  Add Item
</Button>
```

### Enhanced Menu

```tsx
<Menu
  variant="dropdown"
  elevation={2}
  items={[
    { key: '1', label: 'Profile', icon: '👤', badge: '2' },
    { key: '2', label: 'Settings', submenu: settingsItems },
    { key: 'divider', divider: true },
    { key: '3', label: 'Logout', shortcut: '⌘Q' },
  ]}
/>
```

### Enhanced Loader

```tsx
<Loader variant="circular" size="large" />
<Loader variant="linear" determinate value={75} />
<Loader variant="linear" buffer={85} value={60} />
```

---

## 🔧 Szczegółowe propozycje ulepszeń istniejących komponentów

### Card - dodatkowe propsy MD3

**Obecny Card jest już bardzo dobry, ale można dodać:**

```typescript
interface CardProps {
  // Istniejące propsy są OK

  // DODATKOWE MD3 props
  media?: ComponentChildren; // Header image/video
  mediaHeight?: number;
  actions?: ComponentChildren; // Bottom actions area
  secondaryActions?: ComponentChildren; // Overflow menu

  // States
  selected?: boolean;
  draggable?: boolean;
}
```

### Menu - rozbudowa zgodnie z MD3

**Potrzebne ulepszenia w istniejącym Menu:**

```typescript
interface MenuProps {
  // Istniejące są OK

  // DODATKOWE
  variant?: 'default' | 'dropdown' | 'context' | 'navigation';
  dense?: boolean;
  elevation?: 0 | 1 | 2 | 3 | 4;

  // Advanced selection
  multiSelect?: boolean;
  selectedKeys?: string[];
  onSelectionChange?: (keys: string[]) => void;
}

interface MenuItem {
  // Istniejące są OK

  // DODATKOWE
  divider?: boolean;
  submenu?: MenuItem[];
  badge?: string | number;
  shortcut?: string;
  description?: string;
}
```

### Breadcrumbs - dodatkowe MD3 features

```typescript
interface BreadcrumbsProps {
  // Istniejące są OK

  // DODATKOWE MD3 props
  maxItems?: number; // Collapse with ellipsis
  expandText?: string; // "Show more" text
  variant?: 'default' | 'condensed';
}
```

---

**Status:** 📋 PLAN W REALIZACJI - Faza 2B w trakcie  
**Priorytet:** � Średni - rozbudowa istniejących komponentów  
**Ostatnia aktualizacja:** 28 czerwca 2025

### ✅ Ukończone w Fazie 2:

- **Button Component** ✅ UKOŃCZONY 2025-06-27
- **Menu enhancements** ✅ UKOŃCZONY 2025-06-28
- **Loader → MD3 Progress Indicators** ✅ UKOŃCZONY 2025-06-28

---

## 📈 Porównanie z konkurencją

| Feature             | Aurora UI     | Material-UI   | Ant Design     | Chakra UI      |
| ------------------- | ------------- | ------------- | -------------- | -------------- |
| Card variants       | ✅ 4 variants | ✅ 3 variants | ✅ 3 variants  | ✅ 4 variants  |
| Button variants     | ✅ 5 variants | ✅ 6 variants | ✅ 5 variants  | ✅ 4 variants  |
| Navigation Drawer   | ✅ 4 variants | ✅ 3 variants | ✅ 2 variants  | ✅ 2 variants  |
| Progress Indicators | ✅ MD3 Full   | ✅ 2 variants | ✅ 2 variants  | ✅ 2 variants  |
| Menu System         | ✅ MD3 Full   | ✅ 3 variants | ✅ 4 variants  | ✅ 2 variants  |
| Elevation System    | ✅ 0-24       | ✅ 0-24       | ❌ Ograniczone | ❌ Ograniczone |
| Grid System         | ✅ 12-col     | ✅ 12-col     | ✅ 24-col      | ✅ 12-col      |
| Dark Theme          | 🔄 W trakcie  | ✅ Pełne      | ✅ Pełne       | ✅ Pełne       |

**Wniosek:** Aurora UI osiągnęła bardzo dobry poziom zgodności z MD3. Button, Progress i Menu są już w pełni zgodne z Material Design 3.
