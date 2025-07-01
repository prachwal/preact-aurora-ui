# Technical Implementation Plan - Developer Experience Improvements

Szczegółowy plan techniczny implementacji ulepszeń Developer Experience dla Aurora UI.

## 🏗️ Architecture Overview

```
src/
├── components/
│   ├── Text/               # Nowy inteligentny komponent tekstowy
│   ├── Container/          # Nowy kontener z auto-theming
│   ├── AppLayout/          # Rozszerzony layout wrapper
│   └── ThemeToggle/        # Standalone theme toggle
├── hooks/
│   ├── useThemeColors.ts   # Hook do zarządzania kolorami
│   ├── useThemeUtils.ts    # Utility hook dla motywów
│   └── useResponsive.ts    # Responsive breakpoints hook
├── types/
│   ├── theme.ts           # Rozszerzone typy motywów
│   ├── components.ts      # Typy komponentów
│   └── utilities.ts       # Typy utility
├── utils/
│   ├── cssUtilities.ts    # Generator utility classes
│   ├── colorUtils.ts      # Narzędzia do kolorów
│   └── themeUtils.ts      # Utilities motywów
├── styles/
│   ├── colors-extended.scss
│   ├── spacing.scss
│   ├── typography.scss
│   ├── elevation.scss
│   └── utilities.scss     # Auto-generated utilities
└── dev-tools/            # Development tools (dev only)
    ├── ThemeDebugger.tsx
    └── ColorInspector.tsx
```

---

## 📋 PHASE 1: Foundation Implementation

### 1.1 Enhanced TypeScript Types

**File: `src/types/theme.ts`**

```typescript
// Material Design 3 Color Tokens
export type MD3ColorToken =
  | 'primary'
  | 'on-primary'
  | 'primary-container'
  | 'on-primary-container'
  | 'secondary'
  | 'on-secondary'
  | 'secondary-container'
  | 'on-secondary-container'
  | 'tertiary'
  | 'on-tertiary'
  | 'tertiary-container'
  | 'on-tertiary-container'
  | 'error'
  | 'on-error'
  | 'error-container'
  | 'on-error-container'
  | 'background'
  | 'on-background'
  | 'surface'
  | 'on-surface'
  | 'surface-variant'
  | 'on-surface-variant'
  | 'outline'
  | 'outline-variant'
  | 'scrim'
  | 'shadow';

export type ThemeSurface =
  | 'background'
  | 'surface'
  | 'surface-variant'
  | 'primary-container'
  | 'secondary-container';

export type ThemeSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type ThemeVariant = 'display' | 'headline' | 'title' | 'body' | 'label';

export type ThemeElevation = 0 | 1 | 2 | 3 | 4 | 5;
```

**Tasks:**

- [ ] Implement complete MD3 color system types
- [ ] Add semantic color aliases (`success`, `warning`, `info`)
- [ ] Create utility types for CSS custom properties
- [ ] Add runtime type validation for development

### 1.2 Expanded SCSS System

**File: `src/styles/colors-extended.scss`**

```scss
// Material Design 3 Color System
:root {
  // Primary Palette
  --md-sys-color-primary: #{$primary-40};
  --md-sys-color-on-primary: #{$primary-100};
  --md-sys-color-primary-container: #{$primary-90};
  --md-sys-color-on-primary-container: #{$primary-10};

  // Secondary Palette
  --md-sys-color-secondary: #{$secondary-40};
  --md-sys-color-on-secondary: #{$secondary-100};
  // ... rest of color tokens
}

[data-theme='dark'] {
  // Dark theme overrides
  --md-sys-color-primary: #{$primary-80};
  --md-sys-color-on-primary: #{$primary-20};
  // ... rest of dark tokens
}
```

**Tasks:**

- [ ] Implement full MD3 color palette
- [ ] Add semantic color aliases
- [ ] Create spacing scale variables
- [ ] Add typography scale
- [ ] Implement elevation system

---

## 📋 PHASE 2: Core Utilities Implementation

### 2.1 useThemeColors Hook

**File: `src/hooks/useThemeColors.ts`**

```typescript
import { useMemo } from 'preact/hooks';
import type { MD3ColorToken } from '../types/theme';

export interface ThemeColors {
  [K in MD3ColorToken]: string;
}

export function useThemeColors(): ThemeColors {
  return useMemo(
    () => ({
      primary: 'var(--md-sys-color-primary)',
      'on-primary': 'var(--md-sys-color-on-primary)',
      // ... all color tokens
    }),
    [],
  );
}

// Convenience hook for common colors
export function useCommonColors() {
  const colors = useThemeColors();
  return {
    background: colors.background,
    surface: colors.surface,
    primary: colors.primary,
    text: colors['on-surface'],
    textSecondary: colors['on-surface-variant'],
  };
}
```

**Tasks:**

- [ ] Implement complete color mapping
- [ ] Add runtime color validation
- [ ] Create memoization for performance
- [ ] Add SSR compatibility

### 2.2 CSS Utilities Generator

**File: `src/utils/cssUtilities.ts`**

```typescript
import type { MD3ColorToken, ThemeSpacing } from '../types/theme';

export function generateUtilityClasses(): string {
  const colors: MD3ColorToken[] = [
    /* all color tokens */
  ];
  const spacing: ThemeSpacing[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'];

  let css = '';

  // Background utilities
  colors.forEach((color) => {
    css += `.aurora-bg-${color} { background-color: var(--md-sys-color-${color}); }\n`;
  });

  // Text utilities
  colors.forEach((color) => {
    css += `.aurora-text-${color} { color: var(--md-sys-color-${color}); }\n`;
  });

  // Spacing utilities
  spacing.forEach((size) => {
    css += `.aurora-p-${size} { padding: var(--spacing-${size}); }\n`;
    css += `.aurora-m-${size} { margin: var(--spacing-${size}); }\n`;
  });

  return css;
}
```

**Tasks:**

- [ ] Implement utility generator
- [ ] Add CSS injection mechanism
- [ ] Create cleanup system
- [ ] Add configuration options

### 2.3 Enhanced ThemeProvider

**File: `src/components/ThemeProvider/ThemeProvider.tsx` (enhancement)**

```typescript
export interface ThemeProviderProps {
  children: ComponentChildren;
  defaultTheme?: ThemeConfig;
  autoGlobalStyles?: boolean;
  generateUtilities?: boolean;
  cssVariablesPrefix?: string;
  // ... existing props
}

export function ThemeProvider({
  autoGlobalStyles = true,
  generateUtilities = false,
  cssVariablesPrefix = 'aurora',
  ...props
}: ThemeProviderProps) {
  // Auto global styles injection
  useEffect(() => {
    if (autoGlobalStyles) {
      const styleElement = injectGlobalStyles();
      return () => removeGlobalStyles(styleElement);
    }
  }, [autoGlobalStyles]);

  // Utility classes generation
  useEffect(() => {
    if (generateUtilities) {
      const utilityElement = injectUtilityClasses();
      return () => removeUtilityClasses(utilityElement);
    }
  }, [generateUtilities]);

  // ... rest of implementation
}
```

**Tasks:**

- [ ] Implement auto global styles
- [ ] Add utility classes injection
- [ ] Create cleanup mechanisms
- [ ] Add configuration validation

---

## 📋 PHASE 3: Smart Components Implementation

### 3.1 Text Component

**File: `src/components/Text/Text.tsx`**

```typescript
import { forwardRef } from 'preact/compat';
import type { ComponentChildren, JSX } from 'preact';
import type { MD3ColorToken, ThemeVariant } from '../../types/theme';
import { useThemeColors } from '../../hooks/useThemeColors';
import styles from './Text.module.scss';

export interface TextProps {
  variant?: ThemeVariant;
  color?: MD3ColorToken | 'auto';
  as?: keyof JSX.IntrinsicElements;
  children: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
}

export const Text = forwardRef<HTMLElement, TextProps>(({
  variant = 'body',
  color = 'auto',
  as: Component = 'p',
  children,
  className,
  style,
  ...props
}, ref) => {
  const colors = useThemeColors();

  const computedColor = useMemo(() => {
    if (color === 'auto') {
      return getAutoColor(variant);
    }
    return colors[color];
  }, [color, variant, colors]);

  return (
    <Component
      ref={ref}
      className={`${styles.text} ${styles[variant]} ${className || ''}`}
      style={{
        color: computedColor,
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
});
```

**File: `src/components/Text/Text.module.scss`**

```scss
@use '../../styles/colors-extended' as *;
@use '../../styles/typography' as *;

.text {
  margin: 0;
  line-height: 1.5;
  transition: color 0.2s ease;
}

.display {
  font-size: var(--md-sys-typescale-display-large-size);
  font-weight: var(--md-sys-typescale-display-large-weight);
  line-height: var(--md-sys-typescale-display-large-line-height);
}

.headline {
  font-size: var(--md-sys-typescale-headline-large-size);
  font-weight: var(--md-sys-typescale-headline-large-weight);
  line-height: var(--md-sys-typescale-headline-large-line-height);
}

// ... rest of variants
```

**Tasks:**

- [ ] Implement complete Text component
- [ ] Add responsive typography
- [ ] Create auto color logic
- [ ] Add accessibility features
- [ ] Write comprehensive tests

### 3.2 Container Component

**File: `src/components/Container/Container.tsx`**

```typescript
export interface ContainerProps {
  surface?: ThemeSurface;
  padding?: ThemeSpacing;
  elevation?: ThemeElevation;
  children: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(({
  surface = 'background',
  padding = 'md',
  elevation = 0,
  children,
  className,
  style,
  ...props
}, ref) => {
  const colors = useThemeColors();

  const computedStyles = useMemo(() => ({
    backgroundColor: colors[surface],
    color: colors[`on-${surface}`],
    padding: `var(--spacing-${padding})`,
    boxShadow: elevation > 0 ? `var(--elevation-${elevation})` : undefined,
    ...style,
  }), [colors, surface, padding, elevation, style]);

  return (
    <div
      ref={ref}
      className={`${styles.container} ${className || ''}`}
      style={computedStyles}
      {...props}
    >
      {children}
    </div>
  );
});
```

**Tasks:**

- [ ] Implement Container component
- [ ] Add elevation system
- [ ] Create responsive behavior
- [ ] Add theme-aware styling
- [ ] Write accessibility tests

### 3.3 AppLayout Wrapper

**File: `src/components/AppLayout/AppLayout.tsx`**

```typescript
export interface AppLayoutProps {
  header?: ComponentChildren;
  sidebar?: ComponentChildren;
  footer?: ComponentChildren;
  children: ComponentChildren;
  theme?: ThemeMode;
  sidebarCollapsed?: boolean;
  onSidebarToggle?: (collapsed: boolean) => void;
}

export function AppLayout({
  header,
  sidebar,
  footer,
  children,
  theme = 'auto',
  sidebarCollapsed = false,
  onSidebarToggle,
}: AppLayoutProps) {
  return (
    <ThemeProvider defaultTheme={{ mode: theme }} autoGlobalStyles>
      <div className={styles.appLayout}>
        {header && (
          <Container surface="surface" className={styles.header}>
            {header}
          </Container>
        )}
        <div className={styles.body}>
          {sidebar && (
            <Container
              surface="surface-variant"
              className={`${styles.sidebar} ${sidebarCollapsed ? styles.collapsed : ''}`}
            >
              {sidebar}
            </Container>
          )}
          <Container surface="background" className={styles.main}>
            {children}
          </Container>
        </div>
        {footer && (
          <Container surface="surface" className={styles.footer}>
            {footer}
          </Container>
        )}
      </div>
    </ThemeProvider>
  );
}
```

**Tasks:**

- [ ] Implement AppLayout wrapper
- [ ] Add responsive sidebar
- [ ] Create layout grid system
- [ ] Add animation transitions
- [ ] Test on multiple screen sizes

---

## 📋 PHASE 4: Advanced Features Implementation

### 4.1 Theme Toggle Component

**File: `src/components/ThemeToggle/ThemeToggle.tsx`**

```typescript
export interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'icon' | 'button' | 'switch';
  position?: 'left' | 'right';
  animated?: boolean;
  showLabel?: boolean;
  className?: string;
}

export function ThemeToggle({
  size = 'md',
  variant = 'icon',
  animated = true,
  showLabel = false,
  ...props
}: ThemeToggleProps) {
  const { mode, toggleMode } = useTheme();
  const isDark = mode === 'dark';

  return (
    <IconButton
      variant="standard"
      onClick={toggleMode}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`${styles.themeToggle} ${styles[size]} ${animated ? styles.animated : ''}`}
      {...props}
    >
      <div className={styles.iconContainer}>
        <SunIcon className={`${styles.icon} ${!isDark ? styles.active : ''}`} />
        <MoonIcon className={`${styles.icon} ${isDark ? styles.active : ''}`} />
      </div>
      {showLabel && (
        <Text variant="label" className={styles.label}>
          {isDark ? 'Light' : 'Dark'}
        </Text>
      )}
    </IconButton>
  );
}
```

**Tasks:**

- [ ] Implement ThemeToggle component
- [ ] Add smooth icon transitions
- [ ] Create multiple variants
- [ ] Add keyboard accessibility
- [ ] Test with screen readers

### 4.2 Development Tools

**File: `src/dev-tools/ThemeDebugger.tsx`**

```typescript
export function ThemeDebugger() {
  const colors = useThemeColors();
  const { mode, config } = useTheme();

  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className={styles.debugger}>
      <h3>Theme Debugger</h3>
      <div className={styles.info}>
        <strong>Mode:</strong> {mode}
        <strong>Config:</strong> {JSON.stringify(config, null, 2)}
      </div>
      <div className={styles.colorGrid}>
        {Object.entries(colors).map(([name, value]) => (
          <div key={name} className={styles.colorSwatch}>
            <div
              className={styles.color}
              style={{ backgroundColor: value }}
            />
            <Text variant="caption">{name}</Text>
            <Text variant="caption">{value}</Text>
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Tasks:**

- [ ] Implement ThemeDebugger
- [ ] Add color contrast checker
- [ ] Create accessibility audit
- [ ] Add performance monitor
- [ ] Build Storybook integration

---

## 📋 PHASE 5: Testing Strategy

### 5.1 Unit Tests Structure

```typescript
// src/components/Text/Text.test.tsx
describe('Text Component', () => {
  it('renders with correct variant styles', () => {
    render(<Text variant="headline">Test</Text>);
    expect(screen.getByText('Test')).toHaveClass('headline');
  });

  it('auto-selects appropriate color for variant', () => {
    render(<Text variant="headline" color="auto">Test</Text>);
    const element = screen.getByText('Test');
    expect(element).toHaveStyle({
      color: 'var(--md-sys-color-on-surface)'
    });
  });

  it('overrides auto color when specified', () => {
    render(<Text variant="headline" color="primary">Test</Text>);
    const element = screen.getByText('Test');
    expect(element).toHaveStyle({
      color: 'var(--md-sys-color-primary)'
    });
  });
});
```

### 5.2 Integration Tests

```typescript
// src/components/AppLayout/AppLayout.integration.test.tsx
describe('AppLayout Integration', () => {
  it('properly integrates with ThemeProvider', () => {
    render(
      <AppLayout theme="dark">
        <Text>Content</Text>
      </AppLayout>
    );

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });

  it('handles theme switching', async () => {
    const user = userEvent.setup();
    render(
      <AppLayout
        header={<ThemeToggle />}
        theme="light"
      >
        <Text>Content</Text>
      </AppLayout>
    );

    await user.click(screen.getByRole('button', { name: /switch to dark theme/i }));
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });
});
```

**Tasks:**

- [ ] Write unit tests for all components
- [ ] Create integration test suite
- [ ] Add visual regression tests
- [ ] Implement performance tests
- [ ] Add accessibility tests

---

## 📋 PHASE 6: Documentation & Migration

### 6.1 Migration Guide

**File: `docs/MIGRATION_TO_ENHANCED_API.md`**

````markdown
# Migration to Enhanced Aurora UI API

## Overview

This guide helps you migrate from the basic Aurora UI API to the enhanced Developer Experience API.

## Before & After Examples

### Basic Text Styling

```tsx
// Before - manual color management
<p style={{ color: 'var(--md-sys-color-on-surface)' }}>
  Hello World
</p>

// After - automatic color management
<Text variant="body" color="auto">
  Hello World
</Text>
```
````

### Container with Theme

```tsx
// Before - manual theme setup
<div style={{
  backgroundColor: 'var(--md-sys-color-surface)',
  color: 'var(--md-sys-color-on-surface)',
  padding: '16px'
}}>
  Content
</div>

// After - automatic theme management
<Container surface="surface" padding="md">
  Content
</Container>
```

````

### 6.2 Storybook Examples

**File: `src/components/Text/Text.stories.tsx`**
```typescript
export default {
  title: 'Components/Text',
  component: Text,
  parameters: {
    docs: {
      description: {
        component: 'Intelligent text component with automatic color management and responsive typography.'
      },
    },
  },
} as Meta<typeof Text>;

export const AllVariants: Story = () => (
  <div>
    <Text variant="display">Display Text</Text>
    <Text variant="headline">Headline Text</Text>
    <Text variant="title">Title Text</Text>
    <Text variant="body">Body Text</Text>
    <Text variant="label">Label Text</Text>
  </div>
);

export const AutoColors: Story = () => (
  <Container surface="surface" padding="lg">
    <Text variant="headline" color="auto">
      This text automatically adapts to the container background
    </Text>
    <Text variant="body" color="auto">
      Even this paragraph text has optimal contrast
    </Text>
  </Container>
);
````

**Tasks:**

- [ ] Create comprehensive Storybook stories
- [ ] Add interactive examples
- [ ] Build migration guide
- [ ] Create video tutorials
- [ ] Add performance comparisons

---

## 🎯 Success Metrics & Validation

### Performance Benchmarks

```typescript
// Performance test example
describe('Performance Tests', () => {
  it('Text component renders in <16ms', async () => {
    const start = performance.now();
    render(<Text variant="body">Test</Text>);
    const end = performance.now();
    expect(end - start).toBeLessThan(16); // 60fps target
  });

  it('ThemeProvider initialization is <100ms', async () => {
    const start = performance.now();
    render(
      <ThemeProvider>
        <AppLayout>
          <Text>Content</Text>
        </AppLayout>
      </ThemeProvider>
    );
    const end = performance.now();
    expect(end - start).toBeLessThan(100);
  });
});
```

### Bundle Size Analysis

- [ ] Measure base bundle size
- [ ] Track size increase with new features
- [ ] Ensure tree-shaking works correctly
- [ ] Optimize for minimal runtime overhead

### Developer Experience Metrics

- [ ] Lines of code reduction in user projects
- [ ] Time to implement common patterns
- [ ] Developer satisfaction surveys
- [ ] Error rate reduction

---

## 🚀 Deployment Strategy

### Semantic Versioning Plan

- **v0.1.0** - Phase 1 & 2 (Foundation + Core Utilities)
- **v0.2.0** - Phase 3 (Smart Components)
- **v0.3.0** - Phase 4 (Advanced Features)
- **v1.0.0** - Complete implementation with documentation

### Backwards Compatibility

- All existing APIs remain functional
- New APIs are additive, not replacement
- Deprecation warnings for old patterns
- Clear migration path for each version

### Rollout Strategy

1. **Alpha release** - Internal testing
2. **Beta release** - Community feedback
3. **RC release** - Production testing
4. **Stable release** - Full deployment

This technical plan provides a comprehensive roadmap for implementing all improvements suggested in the `ulepszenia.md` file while maintaining code quality, performance, and developer experience.
