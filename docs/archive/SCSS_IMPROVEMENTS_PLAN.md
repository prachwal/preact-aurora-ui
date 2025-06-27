# Plan ulepszeń SCSS - Aurora UI

## 🎯 Cele

- Zwiększenie elastyczności komponentów przez dodanie nowych propsów stylowych
- Implementacja systemu wariantów (variant, elevation, size)
- Poprawa responsywności i accessibility
- Unifikacja podejścia do stylowania w całym projekcie
- Dodanie obsługi motywów (theme system)

## 📋 Status komponentów

### ✅ Ukończone (podstawowe style)

- Layout - nowoczesny flex system, brak przewijania poziomego
- Header - kompaktowy design, Material-like
- Sidebar - większe ikony, lepsze hover effects
- Content - profesjonalna typografia, scroll handling
- Footer - elastyczny layout, responsywność

### 🔄 Do ulepszenia (dodanie propsów i wariantów)

#### 1. Layout Component

**Nowe propsy:**

- `variant`: 'default' | 'dashboard' | 'app' | 'minimal'
- `padding`: boolean | string
- `gap`: string
- `overflow`: 'hidden' | 'auto' | 'visible'

**SCSS ulepszenia:**

```scss
// Warianty layoutu
.layout--dashboard {
  /* Specjalne style dla dashboard */
}
.layout--app {
  /* Style dla aplikacji */
}
.layout--minimal {
  /* Minimalistyczny styl */
}

// Padding variants
.layout--padding-none {
  padding: 0;
}
.layout--padding-sm {
  padding: var(--space-sm);
}
.layout--padding-md {
  padding: var(--space-md);
}

// Gap variants
.layout--gap-none {
  gap: 0;
}
.layout--gap-sm {
  gap: var(--space-sm);
}
.layout--gap-md {
  gap: var(--space-md);
}
```

#### 2. Header Component

**Nowe propsy:**

- `variant`: 'default' | 'compact' | 'prominent' | 'minimal'
- `elevation`: 0 | 1 | 2 | 3 | 4
- `sticky`: boolean
- `borderless`: boolean

**SCSS ulepszenia:**

```scss
// Elevation system
.header--elevation-0 {
  box-shadow: none;
}
.header--elevation-1 {
  box-shadow: var(--shadow-1);
}
.header--elevation-2 {
  box-shadow: var(--shadow-2);
}

// Variants
.header--compact {
  min-height: 48px;
}
.header--prominent {
  min-height: 80px;
}
.header--minimal {
  background: transparent;
  border: none;
}

// Sticky behavior
.header--sticky {
  position: sticky;
  top: 0;
}
```

#### 3. Sidebar Component

**Nowe propsy:**

- `variant`: 'default' | 'rail' | 'temporary' | 'permanent'
- `width`: number | string
- `collapsible`: boolean
- `elevation`: 0 | 1 | 2 | 3 | 4
- `borderless`: boolean

**SCSS ulepszenia:**

```scss
// Width variants
.sidebar--width-sm {
  width: 200px;
}
.sidebar--width-md {
  width: 280px;
}
.sidebar--width-lg {
  width: 320px;
}

// Variants
.sidebar--rail {
  width: 72px;
}
.sidebar--temporary {
  position: fixed;
  z-index: 1200;
}

// Collapsible animations
.sidebar--collapsing {
  transition: width 0.3s ease;
}
```

#### 4. Content Component

**Nowe propsy:**

- `padding`: boolean | 'none' | 'sm' | 'md' | 'lg' | 'xl'
- `maxWidth`: string
- `centered`: boolean
- `scrollable`: boolean

**SCSS ulepszenia:**

```scss
// Padding variants
.content--padding-none {
  padding: 0;
}
.content--padding-sm {
  padding: var(--space-lg);
}
.content--padding-md {
  padding: var(--space-xl);
}
.content--padding-lg {
  padding: var(--space-2xl);
}

// Layout variants
.content--centered {
  margin: 0 auto;
}
.content--max-width {
  max-width: 1200px;
  margin: 0 auto;
}
.content--no-scroll {
  overflow: hidden;
}
```

#### 5. Card Component

**Nowe propsy:**

- `variant`: 'default' | 'outlined' | 'elevated' | 'filled'
- `elevation`: 0 | 1 | 2 | 3 | 4 | 8 | 12 | 16 | 24
- `padding`: 'none' | 'sm' | 'md' | 'lg'
- `hoverable`: boolean

**SCSS ulepszenia:**

```scss
// Elevation system
.card--elevation-0 {
  box-shadow: none;
}
.card--elevation-1 {
  box-shadow: var(--shadow-1);
}
.card--elevation-2 {
  box-shadow: var(--shadow-2);
}

// Variants
.card--outlined {
  border: 1px solid var(--color-outline);
  box-shadow: none;
}
.card--filled {
  background: var(--color-surface-variant);
}

// Hover effects
.card--hoverable {
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-3);
  }
}
```

#### 6. Grid/Row/Col Components

**Nowe propsy:**

- `responsive`: boolean
- `breakpoints`: object
- `gutter`: number | [number, number]

**SCSS ulepszenia:**

```scss
// Responsive grid system
@each $breakpoint, $value in $breakpoints {
  @media (min-width: #{$value}) {
    .grid--responsive .col {
      /* Responsive column styles */
    }
  }
}

// Gutter system
.grid--gutter-sm {
  gap: var(--space-sm);
}
.grid--gutter-md {
  gap: var(--space-md);
}
.grid--gutter-lg {
  gap: var(--space-lg);
}
```

## 🎨 Nowy system stylowania

### Theme Provider

```scss
// themes/_light.scss
:root[data-theme="light"] {
  // Light theme variables
}

// themes/_dark.scss
:root[data-theme="dark"] {
  // Dark theme variables
}

// themes/_auto.scss
@media (prefers-color-scheme: dark) {
  :root[data-theme="auto"] {
    // Auto dark theme
  }
}
```

### Utility Classes

```scss
// utilities/_spacing.scss
@each $key, $value in $spacings {
  .p-#{$key} {
    padding: #{$value} !important;
  }
  .m-#{$key} {
    margin: #{$value} !important;
  }
  .pt-#{$key} {
    padding-top: #{$value} !important;
  }
  // ... więcej utility classes
}

// utilities/_colors.scss
.bg-primary {
  background-color: var(--color-primary) !important;
}
.text-primary {
  color: var(--color-primary) !important;
}
// ... więcej color utilities
```

### Component Mixins

```scss
// mixins/_elevation.scss
@mixin elevation($level) {
  box-shadow: var(--shadow-#{$level});
}

// mixins/_typography.scss
@mixin typography($variant) {
  @if $variant == "h1" {
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-bold);
  }
  // ... więcej variant-ów
}

// mixins/_responsive.scss
@mixin mobile-only {
  @media (max-width: #{$breakpoint-sm - 1}) {
    @content;
  }
}
```

## 📱 Plan responsywności

### Breakpoints Enhancement

```scss
// Enhanced breakpoint system
$breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px,
);

// Container max-widths
$container-max-widths: (
  sm: 540px,
  md: 720px,
  lg: 960px,
  xl: 1140px,
  xxl: 1320px,
);
```

### Mobile-First Approach

```scss
// Mobile-first mixins
@mixin respond-above($breakpoint) {
  @media (min-width: map-get($breakpoints, $breakpoint)) {
    @content;
  }
}

@mixin respond-below($breakpoint) {
  @media (max-width: #{map-get($breakpoints, $breakpoint) - 1px}) {
    @content;
  }
}
```

## 🔧 Implementacja

### Faza 1: Core Improvements (Week 1)

1. ✅ Layout - dodać nowe propsy (variant, padding, gap)
2. ✅ Header - dodać elevation i sticky
3. ✅ Sidebar - dodać width variants i collapsible
4. ✅ Content - dodać padding variants
5. ✅ Card - dodać elevation i hover effects

### Faza 2: Advanced Features (Week 2)

1. Theme system implementation
2. Utility classes
3. Enhanced responsive system
4. Component mixins
5. Advanced animations

### Faza 3: Documentation & Tests (Week 3)

1. Storybook stories dla nowych propsów
2. Unit tests updates
3. Documentation updates
4. Performance optimization
5. Accessibility improvements

## 🎯 Oczekiwane rezultaty

Po implementacji planowanych ulepszeń:

1. **Elastyczność**: Komponenty będą obsługiwać znacznie więcej przypadków użycia
2. **Spójność**: Unified design system podobny do Material-UI/Ant Design
3. **Performanse**: Optymalizowane style i animacje
4. **Developer Experience**: Lepsze API komponentów, lepsze type safety
5. **Accessibility**: Pełna zgodność z WCAG 2.1 AA
6. **Responsywność**: Mobile-first approach z zaawansowanym systemem breakpoints

---

_Ten plan będzie aktualizowany w miarę postępów implementacji._
