# Sidebar

A flexible navigation sidebar component that supports multiple variants, responsive behavior, and Material Design 3 principles.

## Installation

```bash
npm install @preact-aurora-ui/components@0.0.13
```

## Basic Usage

```tsx
import { Sidebar, SidebarToggle } from '@preact-aurora-ui/components';

function App() {
  return (
    <Sidebar
      nav={
        <ul>
          <li>
            <a href="/">Dashboard</a>
          </li>
          <li>
            <a href="/settings">Settings</a>
          </li>
          <li>
            <a href="/profile">Profile</a>
          </li>
        </ul>
      }
      actions={<button>Logout</button>}
    />
  );
}
```

## API Reference

### Sidebar Props

| Prop                 | Type                                                | Default     | Description                                       |
| -------------------- | --------------------------------------------------- | ----------- | ------------------------------------------------- |
| `children`           | `ComponentChildren`                                 | -           | Content displayed in the main area of the sidebar |
| `className`          | `string`                                            | `''`        | Additional CSS classes                            |
| `style`              | `JSX.CSSProperties`                                 | -           | Inline styles                                     |
| `nav`                | `preact.VNode`                                      | -           | Navigation content (usually a menu)               |
| `actions`            | `preact.VNode`                                      | -           | Action buttons/controls                           |
| `aria-label`         | `string`                                            | `'Sidebar'` | Accessibility label                               |
| `variant`            | `'default' \| 'rail' \| 'temporary' \| 'permanent'` | `'default'` | Sidebar display variant                           |
| `width`              | `number \| string`                                  | -           | Custom width when expanded                        |
| `collapsible`        | `boolean`                                           | `false`     | Whether sidebar can be collapsed                  |
| `collapsed`          | `boolean`                                           | `false`     | Collapsed state                                   |
| `onToggle`           | `() => void`                                        | -           | Callback when toggle state changes                |
| `elevation`          | `0 \| 1 \| 2 \| 3 \| 4`                             | `1`         | Material Design elevation level                   |
| `borderless`         | `boolean`                                           | `false`     | Remove border/divider                             |
| `position`           | `'left' \| 'right'`                                 | `'left'`    | Sidebar position                                  |
| `autoCollapse`       | `boolean`                                           | `false`     | Auto-collapse on mobile                           |
| `collapseBreakpoint` | `number`                                            | `768`       | Breakpoint for auto-collapse (px)                 |
| `themeAware`         | `boolean`                                           | `false`     | Apply theme-specific styling                      |
| `overlay`            | `boolean`                                           | `false`     | Show overlay backdrop                             |
| `persistent`         | `boolean`                                           | `false`     | Keep sidebar open on mobile                       |

### SidebarToggle Props

| Prop        | Type                                               | Default       | Description             |
| ----------- | -------------------------------------------------- | ------------- | ----------------------- |
| `collapsed` | `boolean`                                          | -             | Current collapsed state |
| `onToggle`  | `() => void`                                       | -             | Toggle callback         |
| `className` | `string`                                           | `''`          | Additional CSS classes  |
| `style`     | `JSX.CSSProperties`                                | -             | Inline styles           |
| `size`      | `'sm' \| 'md' \| 'lg'`                             | `'md'`        | Button size             |
| `variant`   | `'default' \| 'minimal' \| 'outlined' \| 'filled'` | `'default'`   | Button style variant    |
| `iconType`  | `'hamburger' \| 'arrow' \| 'chevron'`              | `'hamburger'` | Icon type               |

## Variants

### Default Sidebar

```tsx
<Sidebar nav={<nav>...</nav>} />
```

### Rail Sidebar (Narrow)

```tsx
<Sidebar variant="rail" nav={<nav>...</nav>} />
```

### Temporary Sidebar (Modal)

```tsx
<Sidebar variant="temporary" overlay={true} nav={<nav>...</nav>} />
```

### Permanent Sidebar

```tsx
<Sidebar variant="permanent" width={280} nav={<nav>...</nav>} />
```

## Advanced Usage

### Collapsible Sidebar with Toggle

```tsx
import { useState } from 'preact/hooks';
import { Sidebar, SidebarToggle } from '@preact-aurora-ui/components';

function CollapsibleSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <SidebarToggle collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <Sidebar
        collapsed={collapsed}
        collapsible={true}
        onToggle={() => setCollapsed(!collapsed)}
        nav={
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        }
      />
    </>
  );
}
```

### Responsive Auto-Collapse

```tsx
<Sidebar autoCollapse={true} collapseBreakpoint={768} nav={<nav>...</nav>} />
```

### Themed Sidebar

```tsx
<Sidebar themeAware={true} elevation={2} nav={<nav>...</nav>} />
```

### Right-positioned Sidebar

```tsx
<Sidebar position="right" width="300px" nav={<nav>...</nav>} />
```

## Accessibility

The Sidebar component follows WAI-ARIA guidelines:

- Uses `aside` element with `role="complementary"`
- Provides proper `aria-label` for screen readers
- Navigation area uses `nav` element with descriptive label
- Toggle button includes `aria-expanded` state
- Supports keyboard navigation
- Maintains focus management in temporary/overlay mode

### Keyboard Navigation

- `Tab` / `Shift+Tab`: Navigate through interactive elements
- `Enter` / `Space`: Activate toggle button
- `Escape`: Close temporary sidebar (when overlay is active)

## Theming

The component supports Material Design 3 theming through CSS custom properties:

```css
.sidebar {
  --sidebar-bg: var(--md-sys-color-surface);
  --sidebar-border: var(--md-sys-color-outline-variant);
  --sidebar-width: 280px;
  --sidebar-rail-width: 72px;
  --sidebar-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Dark Theme

```tsx
<Sidebar themeAware={true} nav={<nav>...</nav>} />
```

## Integration

### With Layout Components

```tsx
import { AppLayout, Sidebar, Header, Content } from '@preact-aurora-ui/components';

function App() {
  return (
    <AppLayout>
      <Header>Header Content</Header>
      <Sidebar nav={<nav>Navigation</nav>} />
      <Content>Main Content</Content>
    </AppLayout>
  );
}
```

### With Routing

```tsx
import { Router } from '@preact/router';

function AppSidebar() {
  return (
    <Sidebar
      nav={
        <nav>
          <a href="/" class={route === '/' ? 'active' : ''}>
            Dashboard
          </a>
          <a href="/settings" class={route === '/settings' ? 'active' : ''}>
            Settings
          </a>
        </nav>
      }
    />
  );
}
```

## Testing

### Unit Tests

```tsx
import { render, screen, fireEvent } from '@testing-library/preact';
import { Sidebar, SidebarToggle } from '@preact-aurora-ui/components';

test('renders navigation content', () => {
  render(<Sidebar nav={<nav data-testid="navigation">Menu</nav>} />);

  expect(screen.getByTestId('navigation')).toBeInTheDocument();
});

test('handles toggle functionality', () => {
  const handleToggle = vi.fn();

  render(<SidebarToggle collapsed={false} onToggle={handleToggle} />);

  fireEvent.click(screen.getByRole('button'));
  expect(handleToggle).toHaveBeenCalled();
});
```

### Accessibility Testing

```tsx
import { axe, toHaveNoViolations } from 'jest-axe';

test('should not have accessibility violations', async () => {
  const { container } = render(<Sidebar nav={<nav>Navigation</nav>} />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## FAQ

**Q: How do I create a responsive sidebar?**
A: Use the `autoCollapse` prop with a `collapseBreakpoint` to automatically collapse the sidebar on smaller screens.

**Q: Can I customize the sidebar width?**
A: Yes, use the `width` prop to set a custom width in pixels or any CSS unit.

**Q: How do I make the sidebar permanent?**
A: Set `variant="permanent"` to create a sidebar that cannot be hidden or collapsed.

**Q: How do I add overlay behavior?**
A: Use `variant="temporary"` with `overlay={true}` for modal-like behavior.

**Q: Can I position the sidebar on the right side?**
A: Yes, set `position="right"` to position the sidebar on the right side of the screen.

**Q: How do I handle keyboard navigation?**
A: The component automatically handles keyboard navigation. Ensure your navigation content is properly structured with focusable elements.

**Q: Can I use custom icons in SidebarToggle?**
A: The current implementation uses text icons, but you can extend the component or use the `iconType` prop to choose between available options.

**Q: How do I synchronize the sidebar state with external state management?**
A: Use the `collapsed` prop to control the state externally and `onToggle` to update your state store.
