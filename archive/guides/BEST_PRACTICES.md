# Best Practices Guide - Aurora UI

Przewodnik najlepszych praktyk dla efektywnego wykorzystania Aurora UI z naciskiem na funkcjonalności wprowadzone w FAZACH 1-5.

## 🎯 Podstawowe Zasady

### 1. Semantic Color Usage

**✅ Używaj kolorów semantycznie:**

```tsx
// Dobrze - semantic naming
<Container surface="primary-container">
  <Text color="on-primary-container">Content</Text>
</Container>

// Źle - hardcoded colors
<div style={{ backgroundColor: '#6750A4', color: '#FFFFFF' }}>
  Content
</div>
```

**✅ Wykorzystuj theme-aware properties:**

```tsx
// Automatyczne dopasowanie kolorów
<Text color="primary" autoContrast>
  Text with optimal contrast
</Text>
```

### 2. Typography Hierarchy

**✅ Używaj właściwych wariantów:**

```tsx
// Hierarchia typograficzna
<Text variant="display-large" as="h1">Page Title</Text>
<Text variant="headline-medium" as="h2">Section Header</Text>
<Text variant="title-large" as="h3">Subsection</Text>
<Text variant="body-large">Main content</Text>
<Text variant="label-medium">Supporting text</Text>
```

**✅ Polimorficzne komponenty:**

```tsx
// Semantic HTML z proper styling
<Text variant="headline" as="h1">SEO-friendly heading</Text>
<Text variant="body" as="p">Paragraph content</Text>
<Text variant="label" as="span">Inline label</Text>
```

### 3. Layout Best Practices

**✅ Container-based layouts:**

```tsx
// Struktura z Container components
<Container maxWidth="lg" padding="xl">
  <Container surface="surface-variant" padding="lg" radius="lg">
    <Text variant="headline">Card Content</Text>
  </Container>
</Container>
```

**✅ AppLayout dla aplikacji:**

```tsx
// Kompletny layout aplikacji
<AppLayout
  theme="auto"
  responsive={true}
  autoThemeManagement={true}
  header={<Header showThemeToggle />}
  sidebar={<Sidebar />}
>
  <Container padding="lg">
    <PageContent />
  </Container>
</AppLayout>
```

## 🎨 Design System Guidelines

### Color System

#### When to use which colors

**Primary Colors:**

- Main brand elements
- Primary actions (buttons, links)
- Active states

```tsx
<Button variant="filled">Primary Action</Button>
<Text color="primary">Brand accent text</Text>
```

**Secondary Colors:**

- Supporting elements
- Secondary actions
- Complementary UI elements

```tsx
<Button variant="outlined" color="secondary">Secondary Action</Button>
<Container surface="secondary-container">Supporting content</Container>
```

**Surface Colors:**

- Background containers
- Card backgrounds
- Panel surfaces

```tsx
<Container surface="surface">Default surface</Container>
<Container surface="surface-variant">Alternative surface</Container>
```

#### Color Combinations

**✅ Recommended combinations:**

```tsx
// High contrast pairs
surface + on - surface;
primary + on - primary;
error + on - error;

// Container pairs
primary - container + on - primary - container;
surface - variant + on - surface - variant;
```

**❌ Avoid:**

```tsx
// Low contrast combinations
surface + surface-variant (bad contrast)
outline + on-surface (insufficient contrast)
```

### Typography

#### Hierarchy Rules

**Display:** Page titles, hero text
**Headline:** Section headers, important titles
**Title:** Subsection headers, card titles
**Body:** Main content, paragraphs
**Label:** UI labels, captions, metadata

```tsx
// Proper hierarchy
<Text variant="display-large" as="h1">Welcome to Aurora UI</Text>
<Text variant="headline-medium" as="h2">Getting Started</Text>
<Text variant="title-large" as="h3">Installation</Text>
<Text variant="body-large">
  Follow these steps to install Aurora UI in your project...
</Text>
<Text variant="label-medium">Last updated: March 2024</Text>
```

#### Responsive Typography

**✅ Let components handle responsiveness:**

```tsx
// Automatic responsive scaling
<Text variant="display-large">Auto-responsive title</Text>

// Manual responsive control (when needed)
<Text
  variant="display-large"
  style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}
>
  Custom responsive title
</Text>
```

### Spacing & Layout

#### Container Patterns

**Page Layouts:**

```tsx
// Standard page layout
<Container maxWidth="lg" padding="xl">
  <Container surface="surface-variant" padding="lg" radius="lg">
    <Text variant="headline">Page Content</Text>
  </Container>
</Container>

// Dashboard layout
<AppLayout>
  <Container padding="lg">
    <Grid gap="24px">
      <Row>
        <Col span={8}><MainContent /></Col>
        <Col span={4}><Sidebar /></Col>
      </Row>
    </Grid>
  </Container>
</AppLayout>
```

**Card Patterns:**

```tsx
// Information card
<Container
  surface="surface"
  padding="lg"
  radius="lg"
  elevation={1}
>
  <Text variant="title-medium">Card Title</Text>
  <Text variant="body">Card content goes here...</Text>
</Container>

// Action card
<Container
  surface="primary-container"
  padding="lg"
  radius="lg"
  elevation={2}
  autoTextColor
>
  <Text variant="headline-small">Call to Action</Text>
  <Button variant="filled">Take Action</Button>
</Container>
```

#### Spacing Scale

**Consistent spacing:**

```tsx
// Use theme spacing scale
padding="sm"    // 8px
padding="md"    // 16px
padding="lg"    // 24px
padding="xl"    // 32px

// Grid gaps
<Grid gap="16px">  // Consistent with padding scale
```

## 🛠️ Development Patterns

### Component Composition

#### Smart Defaults

**✅ Leverage automatic features:**

```tsx
// Automatic color management
<Container surface="primary" autoTextColor>
  <Text>Automatically readable text</Text>
</Container>

// Automatic semantic HTML
<Text variant="display-large">Becomes H1 automatically</Text>
<Text variant="headline-medium">Becomes H2 automatically</Text>
```

#### Progressive Enhancement

**✅ Start simple, add complexity:**

```tsx
// Basic usage
<Text>Simple text</Text>

// Enhanced usage
<Text variant="headline" color="primary" autoContrast as="h2">
  Enhanced heading
</Text>

// Advanced usage with custom styling
<Text
  variant="display"
  color="primary"
  autoContrast
  as="h1"
  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}
>
  Advanced heading
</Text>
```

### Theme Integration

#### ThemeProvider Setup

**✅ Application-level setup:**

```tsx
// Root level - automatic theme management
<ThemeProvider
  defaultTheme={{ mode: 'auto' }}
  autoGlobalStyles={true}
  generateUtilities={true}
>
  <App />
</ThemeProvider>

// With AppLayout for complete solution
<AppLayout theme="auto" autoThemeManagement={true}>
  <Routes />
</AppLayout>
```

#### Theme-Aware Components

**✅ Use theme hooks:**

```tsx
import { useThemeColors } from '@aurora-ui/react';

function CustomComponent() {
  const colors = useThemeColors();

  return (
    <div
      style={{
        backgroundColor: colors.surface,
        color: colors.onSurface,
        border: `1px solid ${colors.outline}`,
      }}
    >
      Theme-aware content
    </div>
  );
}
```

### Performance Optimization

#### Bundle Size

**✅ Tree-shaking friendly imports:**

```tsx
// Specific component imports
import { Button } from '@aurora-ui/react/Button';
import { Text } from '@aurora-ui/react/Text';

// Or from main export (also tree-shakeable)
import { Button, Text } from '@aurora-ui/react';
```

**❌ Avoid full library imports:**

```tsx
// Avoid - imports entire library
import * as AuroraUI from '@aurora-ui/react';
```

#### Rendering Performance

**✅ Memoize expensive operations:**

```tsx
import { memo } from 'preact/compat';

const OptimizedCard = memo(({ data }) => (
  <Container surface="surface" padding="lg">
    <Text variant="title">{data.title}</Text>
    <Text variant="body">{data.content}</Text>
  </Container>
));
```

**✅ Use CSS custom properties for dynamic styling:**

```tsx
// Efficient - uses CSS custom properties
<Container
  surface="primary"
  style={{ '--custom-radius': '20px' }}
>
  Content
</Container>

// Less efficient - inline style calculations
<Container style={{
  backgroundColor: calculateBackgroundColor(),
  borderRadius: calculateBorderRadius(),
}}>
  Content
</Container>
```

## ♿ Accessibility

### Semantic HTML

**✅ Proper heading hierarchy:**

```tsx
<Text variant="display-large" as="h1">Page Title</Text>
<Text variant="headline-medium" as="h2">Section</Text>
<Text variant="title-large" as="h3">Subsection</Text>
```

**✅ Form labels and relationships:**

```tsx
<TextField
  label="Email Address"
  required
  error={emailError}
  helperText="We'll never share your email"
/>
```

### Color Contrast

**✅ Use autoContrast for dynamic backgrounds:**

```tsx
<Container surface="primary">
  <Text color="on-primary">Proper contrast text</Text>
</Container>

// Or automatic contrast adjustment
<Text color="primary" autoContrast>
  Auto-adjusted contrast
</Text>
```

**✅ Test with different themes:**

```tsx
// Always test in both light and dark themes
// Use Storybook theme switcher for testing
```

### Keyboard Navigation

**✅ Focusable interactive elements:**

```tsx
<Button>Keyboard accessible button</Button>
<TextField label="Focusable input" />

// Custom interactive elements need tabIndex
<Container
  as="button"
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={handleKeyDown}
>
  Custom interactive element
</Container>
```

## 📱 Responsive Design

### Breakpoints

**✅ Use consistent breakpoints:**

```tsx
// AppLayout responsive breakpoints
<AppLayout sidebarBreakpoint={768}>
  {/* Sidebar collapses below 768px */}
</AppLayout>

// Custom responsive behavior
<Container
  maxWidth="lg"  // Responsive max-width
  padding={{ mobile: 'md', desktop: 'xl' }}  // Responsive padding
>
  Content
</Container>
```

### Mobile-First Approach

**✅ Design for mobile first:**

```tsx
// Base styles for mobile
<Container padding="md">
  <Text variant="headline-small">Mobile title</Text>

  {/* Enhanced for larger screens */}
  <Text
    variant="display-medium"
    style={{
      '@media (min-width: 768px)': {
        fontSize: '3rem',
      },
    }}
  >
    Desktop title
  </Text>
</Container>
```

## 🧪 Testing

### Component Testing

**✅ Test different themes:**

```tsx
import { render, screen } from '@testing-library/preact';
import { ThemeProvider } from '@aurora-ui/react';

test('component works in both themes', () => {
  // Test light theme
  const { rerender } = render(
    <ThemeProvider defaultTheme={{ mode: 'light' }}>
      <MyComponent />
    </ThemeProvider>,
  );

  expect(screen.getByText('Content')).toBeInTheDocument();

  // Test dark theme
  rerender(
    <ThemeProvider defaultTheme={{ mode: 'dark' }}>
      <MyComponent />
    </ThemeProvider>,
  );

  expect(screen.getByText('Content')).toBeInTheDocument();
});
```

**✅ Test responsive behavior:**

```tsx
import { render } from '@testing-library/preact';

test('responsive layout', () => {
  // Mock window.innerWidth
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 600, // Mobile width
  });

  render(<ResponsiveComponent />);
  // Test mobile layout

  // Change to desktop width
  window.innerWidth = 1200;
  window.dispatchEvent(new Event('resize'));
  // Test desktop layout
});
```

### Accessibility Testing

**✅ Test keyboard navigation:**

```tsx
import userEvent from '@testing-library/user-event';

test('keyboard navigation', async () => {
  const user = userEvent.setup();
  render(<NavigableComponent />);

  // Test Tab navigation
  await user.tab();
  expect(screen.getByRole('button', { name: 'First' })).toHaveFocus();

  await user.tab();
  expect(screen.getByRole('button', { name: 'Second' })).toHaveFocus();
});
```

## 📈 Performance Guidelines

### Bundle Optimization

**✅ Component-level imports:**

```tsx
// Tree-shakeable imports
import { Button } from '@aurora-ui/react/Button';
import { Text } from '@aurora-ui/react/Text';
```

**✅ Lazy loading for heavy components:**

```tsx
import { lazy } from 'preact/compat';

const DataTable = lazy(() => import('@aurora-ui/react/DataTable'));

function MyComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DataTable data={data} />
    </Suspense>
  );
}
```

### Runtime Performance

**✅ Minimize re-renders:**

```tsx
// Use memo for stable components
const StableCard = memo(({ title, content }) => (
  <Container surface="surface" padding="lg">
    <Text variant="title">{title}</Text>
    <Text variant="body">{content}</Text>
  </Container>
));

// Use useCallback for stable functions
const handleClick = useCallback(() => {
  // Handle click
}, [dependency]);
```

## 🔧 Common Pitfalls

### ❌ What to Avoid

**Don't override CSS custom properties directly:**

```tsx
// ❌ Bad - hardcoded theme colors
<div style={{
  backgroundColor: '#6750A4',
  color: '#FFFFFF'
}}>

// ✅ Good - use semantic colors
<Container surface="primary-container" autoTextColor>
```

**Don't ignore semantic HTML:**

```tsx
// ❌ Bad - div for everything
<div>Page Title</div>
<div>Section Header</div>

// ✅ Good - semantic elements
<Text variant="display" as="h1">Page Title</Text>
<Text variant="headline" as="h2">Section Header</Text>
```

**Don't skip responsive testing:**

```tsx
// ❌ Bad - only desktop testing
// ✅ Good - test mobile, tablet, desktop

// Use Storybook viewport controls
// Test with different screen sizes
// Verify touch interactions
```

**Don't ignore accessibility:**

```tsx
// ❌ Bad - missing labels
<input type="text" />
<button>👍</button>

// ✅ Good - proper labels
<TextField label="Search query" />
<Button aria-label="Like this post">👍</Button>
```

## 📚 Resources

### Documentation

- **Storybook**: Interactive component documentation
- **Color Palette**: Complete color system reference
- **API Reference**: Detailed component APIs
- **Migration Guide**: Upgrading between versions

### Tools

- **Theme Switcher**: Test components in different themes
- **Viewport Controls**: Test responsive behavior
- **Accessibility Panel**: Check a11y compliance
- **Performance Monitor**: Track rendering performance

### Community

- **GitHub Issues**: Bug reports and feature requests
- **Discussions**: Best practices and patterns
- **Examples**: Real-world usage examples
- **Contributing**: Guidelines for contributions

---

## 🎯 Quick Reference

### Essential Patterns

```tsx
// Basic page structure
<Container maxWidth="lg" padding="xl">
  <Text variant="display-large" as="h1">Page Title</Text>

  <Container surface="surface-variant" padding="lg" radius="lg">
    <Text variant="headline-medium" as="h2">Section</Text>
    <Text variant="body-large">Content...</Text>
  </Container>
</Container>

// Theme-aware styling
<Container surface="primary" autoTextColor>
  <Text color="on-primary">Proper contrast text</Text>
</Container>

// Responsive layout
<AppLayout theme="auto" responsive>
  <Container padding="lg">
    <Grid gap="24px">
      <Row>
        <Col span={12} md={8}><MainContent /></Col>
        <Col span={12} md={4}><Sidebar /></Col>
      </Row>
    </Grid>
  </Container>
</AppLayout>
```

Follow these patterns for consistent, accessible, and performant Aurora UI applications!
