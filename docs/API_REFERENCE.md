# Aurora UI API Reference

Complete API documentation for all Aurora UI components.

## Core Layout Components

### Layout

Main application layout container with flexible direction control.

```typescript
interface LayoutProps {
  children?: ComponentChildren;
  className?: string;
  direction?: 'row' | 'column';
  fullHeight?: boolean;
  style?: JSX.CSSProperties;
}
```

**Usage Example:**

```tsx
<Layout direction="column" fullHeight>
  <Header />
  <Layout direction="row">
    <Sidebar />
    <Content />
  </Layout>
  <Footer />
</Layout>
```

### Header

Top navigation bar component with MD3 App Bar enhancements.

```typescript
interface HeaderProps {
  children?: ComponentChildren;
  className?: string;
  variant?: 'default' | 'dense' | 'prominent';
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
  position?: 'static' | 'fixed' | 'sticky';

  // MD3 Enhancements
  scrollBehavior?: 'default' | 'hide' | 'elevate';
  scrollTarget?: string | HTMLElement;
  scrollThreshold?: number;
  navigationIcon?: ComponentChildren;
  centerTitle?: boolean;
  actions?: ComponentChildren;
  onNavigationClick?: () => void;
}
```

### Sidebar

Navigation drawer component with MD3 specifications.

```typescript
interface SidebarProps {
  children?: ComponentChildren;
  className?: string;
  variant?: 'default' | 'rail' | 'temporary' | 'permanent';
  open?: boolean;
  width?: number | string;
  onToggle?: (open: boolean) => void;
}
```

### Content

Main content area with surface specifications.

```typescript
interface ContentProps {
  children?: ComponentChildren;
  className?: string;
  variant?: 'default' | 'article' | 'dashboard' | 'form';
  maxWidth?: number | string | false;
  padding?: boolean | 'small' | 'medium' | 'large';
  scrollable?: boolean;
}
```

## Navigation Components

### Breadcrumbs

Navigation hierarchy with MD3 enhancements.

```typescript
interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: ComponentChildren;

  // MD3 Enhancements
  maxItems?: number;
  variant?: 'default' | 'condensed';
  expandText?: string;
  collapseIcon?: ComponentChildren;
  expandIcon?: ComponentChildren;
  onItemClick?: (item: BreadcrumbItem, index: number) => void;
  onToggle?: (expanded: boolean) => void;
}

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ComponentChildren;
  disabled?: boolean;
  onClick?: (event: Event) => void;
}
```

### Menu

Navigation menu with MD3 specifications.

```typescript
interface MenuProps {
  items: MenuItem[];
  className?: string;
  variant?: 'default' | 'dropdown' | 'context' | 'navigation';
  dense?: boolean;
  multiselect?: boolean;
  onItemClick?: (item: MenuItem, event: Event) => void;
  onSelectionChange?: (selectedItems: MenuItem[]) => void;

  // Enhanced features
  collapseIcon?: ComponentChildren;
  expandIcon?: ComponentChildren;
}

interface MenuItem {
  id: string | number;
  label: string;
  icon?: ComponentChildren;
  href?: string;
  disabled?: boolean;
  selected?: boolean;
  children?: MenuItem[];
  badge?: string | number;
  shortcut?: string;
  description?: string;
  divider?: boolean;
  onClick?: (event: Event) => void;
}
```

## UI Components

### Button

Material Design 3 Button component.

```typescript
interface ButtonProps {
  children?: ComponentChildren;
  className?: string;
  variant?: 'elevated' | 'filled' | 'filled-tonal' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;

  // Icon support
  startIcon?: ComponentChildren;
  endIcon?: ComponentChildren;

  // Link support
  href?: string;
  target?: string;

  // Event handlers
  onClick?: (event: MouseEvent) => void;

  // HTML attributes
  type?: 'button' | 'submit' | 'reset';
  form?: string;
  name?: string;
  value?: string;
}
```

### Card

Container component with elevation and variants.

```typescript
interface CardProps {
  children?: ComponentChildren;
  className?: string;
  variant?: 'default' | 'outlined' | 'elevated' | 'filled';
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
  loading?: boolean;
  padding?: boolean | 'small' | 'medium' | 'large';
  onClick?: (event: MouseEvent) => void;
}
```

### Progress

Progress indicators with circular and linear variants.

```typescript
interface ProgressProps {
  className?: string;
  variant?: 'circular' | 'linear';
  value?: number; // 0-100 for determinate
  buffer?: number; // 0-100 for linear with buffer
  size?: 'small' | 'medium' | 'large' | number;
  color?: 'primary' | 'secondary' | 'tertiary';
  thickness?: number; // For circular

  // Animation control
  indeterminate?: boolean;
  animationDuration?: number;

  // Accessibility
  'aria-label'?: string;
  'aria-describedby'?: string;
}

// Legacy Loader component (backwards compatibility)
interface LoaderProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
}
```

## Grid System

### Grid, Row, Col

Responsive 12-column grid system.

```typescript
interface GridProps {
  children?: ComponentChildren;
  className?: string;
  container?: boolean;
  spacing?: number;
  justify?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
}

interface ColProps {
  children?: ComponentChildren;
  className?: string;
  xs?: number | 'auto';
  sm?: number | 'auto';
  md?: number | 'auto';
  lg?: number | 'auto';
  xl?: number | 'auto';
  offset?: number;
}
```

## Utility Components

### Drawer

Modal drawer/panel component.

```typescript
interface DrawerProps {
  children?: ComponentChildren;
  className?: string;
  open: boolean;
  position?: 'left' | 'right' | 'top' | 'bottom';
  variant?: 'temporary' | 'persistent' | 'permanent';
  onClose?: () => void;
  backdrop?: boolean;
  onBackdropClick?: () => void;
}
```

## Theme System

### ThemeProvider

Universal theme management.

```typescript
interface ThemeProviderProps {
  children: ComponentChildren;
  theme?: 'light' | 'dark' | 'auto';
  storage?: 'localStorage' | 'sessionStorage' | 'none' | CustomStorage;
  storageKey?: string;
  defaultTheme?: 'light' | 'dark';
  enableSystem?: boolean;
  onThemeChange?: (theme: string) => void;
}

interface CustomStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}
```

### useTheme Hook

Theme management hook.

```typescript
interface UseThemeReturn {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  toggleTheme: () => void;
  systemTheme: 'light' | 'dark';
  resolvedTheme: 'light' | 'dark';
}

const { theme, setTheme, toggleTheme } = useTheme();
```

## Responsive Utilities

### useBreakpoint Hook

Responsive breakpoint detection.

```typescript
interface UseBreakpointReturn {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const { breakpoint, isMobile, isDesktop } = useBreakpoint();
```

## CSS Custom Properties

### MD3 Color Tokens

```scss
// Primary colors
--md-sys-color-primary
--md-sys-color-on-primary
--md-sys-color-primary-container
--md-sys-color-on-primary-container

// Surface colors
--md-sys-color-surface
--md-sys-color-surface-variant
--md-sys-color-on-surface
--md-sys-color-on-surface-variant

// Error colors
--md-sys-color-error
--md-sys-color-on-error
--md-sys-color-error-container
--md-sys-color-on-error-container
```

### Elevation Tokens

```scss
--md-sys-elevation-level0  // No elevation
--md-sys-elevation-level1  // Cards, buttons
--md-sys-elevation-level2  // FAB
--md-sys-elevation-level3  // Navigation drawers
--md-sys-elevation-level4  // Modal dialogs
--md-sys-elevation-level5  // Menus, dropdowns
```

## TypeScript Support

All components include comprehensive TypeScript definitions with:

- Complete prop interfaces
- Event handler types
- CSS property types
- Generic type support where applicable
- Strict null checking compatibility

## Accessibility

All components follow WCAG 2.1 AA guidelines:

- Semantic HTML elements
- ARIA attributes and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- Color contrast compliance
