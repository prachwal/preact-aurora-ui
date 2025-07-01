# Breadcrumbs Component

## Overview

The Breadcrumbs component provides hierarchical navigation that follows Material Design 3 guidelines. It shows users their current location within the application structure and allows them to navigate back to previous levels. The component supports smart collapsing, responsive behavior, and extensive customization.

## Installation

```bash
npm install preact-aurora-ui@0.0.13
```

## Usage

### Basic Breadcrumbs

```tsx
import { Breadcrumbs } from 'preact-aurora-ui';

function BasicExample() {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Laptops', href: '/products/electronics/laptops' },
    { label: 'MacBook Pro', isActive: true },
  ];

  return (
    <Breadcrumbs
      items={items}
      onItemClick={(item, index, e) => {
        if (item.href) {
          console.log('Navigate to:', item.href);
        }
      }}
    />
  );
}
```

### Breadcrumbs with Icons

```tsx
function IconBreadcrumbsExample() {
  const items = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: '🏠',
    },
    {
      label: 'Users',
      href: '/users',
      icon: '👥',
    },
    {
      label: 'Profile Settings',
      icon: '⚙️',
      isActive: true,
    },
  ];

  return <Breadcrumbs items={items} separator="›" />;
}
```

### Collapsible Breadcrumbs

```tsx
function CollapsibleExample() {
  const longPath = [
    { label: 'Root', href: '/' },
    { label: 'Level 1', href: '/level1' },
    { label: 'Level 2', href: '/level1/level2' },
    { label: 'Level 3', href: '/level1/level2/level3' },
    { label: 'Level 4', href: '/level1/level2/level3/level4' },
    { label: 'Level 5', href: '/level1/level2/level3/level4/level5' },
    { label: 'Current Page', isActive: true },
  ];

  return (
    <Breadcrumbs items={longPath} maxItems={4} expandText="Show all" showExpandButton={true} />
  );
}
```

## API Reference

### Breadcrumbs Props

| Prop                   | Type                                                          | Default        | Description                                   |
| ---------------------- | ------------------------------------------------------------- | -------------- | --------------------------------------------- |
| `items`                | `BreadcrumbItem[]`                                            | _required_     | Array of breadcrumb items                     |
| `separator`            | `ReactNode`                                                   | `'/'`          | Separator between breadcrumb items            |
| `maxItems`             | `number`                                                      | `undefined`    | Maximum items before collapsing               |
| `variant`              | `'default' \| 'condensed'`                                    | `'default'`    | Visual variant                                |
| `expandText`           | `string`                                                      | `'Show more'`  | Text for expand button                        |
| `collapsedIcon`        | `ReactNode`                                                   | `'...'`        | Icon for collapsed state                      |
| `expandIcon`           | `ReactNode`                                                   | `'▼'`          | Icon for expand button                        |
| `showExpandButton`     | `boolean`                                                     | `true`         | Show expand functionality                     |
| `responsive`           | `boolean`                                                     | `true`         | Auto-collapse on small screens                |
| `responsiveBreakpoint` | `number`                                                      | `768`          | Breakpoint width (px) for responsive behavior |
| `className`            | `string`                                                      | `''`           | Additional CSS classes                        |
| `onItemClick`          | `(item: BreadcrumbItem, index: number, event: Event) => void` | `undefined`    | Item click handler                            |
| `aria-label`           | `string`                                                      | `'Breadcrumb'` | ARIA label for navigation                     |

### BreadcrumbItem Interface

```tsx
interface BreadcrumbItem {
  label: string; // Display text
  href?: string; // Link URL
  isActive?: boolean; // Current page indicator
  icon?: ReactNode; // Leading icon
  description?: string; // Tooltip description
  priority?: number; // Collapse priority (higher = keep visible)
}
```

## Examples

### Custom Separators

```tsx
// Text separators
<Breadcrumbs items={items} separator=" > " />
<Breadcrumbs items={items} separator=" | " />
<Breadcrumbs items={items} separator=" → " />

// Icon separators
<Breadcrumbs items={items} separator={<ChevronRightIcon />} />
<Breadcrumbs items={items} separator="›" />
```

### Responsive Breadcrumbs

```tsx
function ResponsiveBreadcrumbs() {
  const items = [
    { label: 'Home', href: '/', priority: 10 },
    { label: 'Category', href: '/category', priority: 5 },
    { label: 'Subcategory', href: '/category/sub', priority: 3 },
    { label: 'Product', href: '/category/sub/product', priority: 1 },
    { label: 'Details', isActive: true, priority: 10 },
  ];

  return <Breadcrumbs items={items} responsive={true} responsiveBreakpoint={768} maxItems={3} />;
}
```

### E-commerce Breadcrumbs

```tsx
function EcommerceBreadcrumbs() {
  const { pathname } = useRouter();
  const breadcrumbs = generateBreadcrumbs(pathname);

  const items = [
    {
      label: 'Store',
      href: '/',
      icon: '🏪',
    },
    ...breadcrumbs.map((crumb) => ({
      label: crumb.name,
      href: crumb.path,
      description: crumb.description,
    })),
    {
      label: 'Current Product',
      isActive: true,
      icon: '📱',
    },
  ];

  return (
    <Breadcrumbs
      items={items}
      onItemClick={(item, index, e) => {
        if (item.href) {
          e.preventDefault();
          router.push(item.href);
        }
      }}
    />
  );
}
```

### File System Breadcrumbs

```tsx
function FileSystemBreadcrumbs() {
  const [currentPath, setCurrentPath] = useState('/documents/projects/aurora-ui');

  const pathItems = useMemo(() => {
    const segments = currentPath.split('/').filter(Boolean);
    const items = [
      {
        label: 'Root',
        href: '/',
        icon: '💻',
      },
    ];

    let accumulatedPath = '';
    segments.forEach((segment, index) => {
      accumulatedPath += `/${segment}`;
      items.push({
        label: segment,
        href: accumulatedPath,
        icon: index === segments.length - 1 ? '📁' : '📂',
        isActive: index === segments.length - 1,
      });
    });

    return items;
  }, [currentPath]);

  return (
    <div>
      <Breadcrumbs
        items={pathItems}
        separator="/"
        variant="condensed"
        onItemClick={(item) => {
          if (item.href) {
            setCurrentPath(item.href);
          }
        }}
      />
    </div>
  );
}
```

### Admin Dashboard Breadcrumbs

```tsx
function AdminBreadcrumbs() {
  const { user, permissions } = useAuth();

  const items = [
    {
      label: 'Dashboard',
      href: '/admin',
      icon: '📊',
    },
    {
      label: 'User Management',
      href: '/admin/users',
      icon: '👥',
    },
    {
      label: user.name,
      href: `/admin/users/${user.id}`,
      icon: '👤',
      description: `User ID: ${user.id}`,
    },
    {
      label: 'Edit Profile',
      isActive: true,
      icon: '✏️',
    },
  ];

  return (
    <Breadcrumbs
      items={items}
      maxItems={permissions.isAdmin ? undefined : 3}
      aria-label="Admin navigation breadcrumbs"
    />
  );
}
```

### Smart Collapsing

```tsx
function SmartBreadcrumbs() {
  const items = [
    { label: 'Home', href: '/', priority: 10 },
    { label: 'Electronics', href: '/electronics', priority: 8 },
    { label: 'Computers', href: '/electronics/computers', priority: 6 },
    { label: 'Laptops', href: '/electronics/computers/laptops', priority: 7 },
    { label: 'Gaming', href: '/electronics/computers/laptops/gaming', priority: 4 },
    { label: 'MSI Series', href: '/electronics/computers/laptops/gaming/msi', priority: 2 },
    { label: 'MSI Gaming Laptop X1', isActive: true, priority: 10 },
  ];

  return (
    <Breadcrumbs
      items={items}
      maxItems={4}
      // Higher priority items are kept visible when collapsing
    />
  );
}
```

## Accessibility

### ARIA Support

The Breadcrumbs component implements comprehensive ARIA attributes:

- `role="navigation"` on breadcrumb container
- `aria-label` for navigation identification
- `role="list"` on breadcrumb list
- `role="listitem"` on each breadcrumb
- `aria-current="page"` on active/current item
- `aria-expanded` on collapsible sections
- `aria-describedby` for descriptions/tooltips

### Keyboard Navigation

- **Tab/Shift+Tab**: Navigate through breadcrumb links
- **Enter/Space**: Activate links and expand buttons
- **Arrow Keys**: Navigate between breadcrumb items
- **Home/End**: First/last breadcrumb item

### Screen Reader Support

- Navigation role announced
- Current page clearly identified
- Link relationships communicated
- Expand/collapse state announced
- Item descriptions read when available

```tsx
// Accessibility example
<Breadcrumbs
  items={items}
  aria-label="Page navigation breadcrumbs"
  onItemClick={(item, index, e) => {
    // Announce navigation to screen readers
    announceToScreenReader(`Navigating to ${item.label}`);
    handleNavigation(item.href);
  }}
/>
```

## Theming

### CSS Custom Properties

Breadcrumbs components support extensive theming:

```css
.custom-breadcrumbs {
  --breadcrumbs-font-size: 14px;
  --breadcrumbs-line-height: 1.5;
  --breadcrumbs-spacing: 8px;

  /* Items */
  --breadcrumb-color: var(--md-sys-color-on-surface-variant);
  --breadcrumb-color-hover: var(--md-sys-color-primary);
  --breadcrumb-color-active: var(--md-sys-color-on-surface);
  --breadcrumb-color-disabled: var(--md-sys-color-outline);
  --breadcrumb-background-hover: var(--md-sys-color-secondary-container);
  --breadcrumb-padding: 4px 8px;
  --breadcrumb-border-radius: 4px;
  --breadcrumb-transition: color 150ms ease;

  /* Separators */
  --breadcrumb-separator-color: var(--md-sys-color-outline);
  --breadcrumb-separator-margin: 0 8px;
  --breadcrumb-separator-font-size: 12px;

  /* Icons */
  --breadcrumb-icon-size: 16px;
  --breadcrumb-icon-margin: 0 4px 0 0;

  /* Expand button */
  --breadcrumb-expand-background: var(--md-sys-color-surface-variant);
  --breadcrumb-expand-background-hover: var(--md-sys-color-secondary-container);
  --breadcrumb-expand-padding: 2px 6px;
  --breadcrumb-expand-border-radius: 12px;

  /* Responsive */
  --breadcrumb-mobile-font-size: 12px;
  --breadcrumb-mobile-spacing: 4px;
}
```

### Material Design Tokens

Components use Material Design 3 tokens:

- `--md-sys-color-on-surface-variant` - Default text color
- `--md-sys-color-primary` - Hover and active states
- `--md-sys-color-outline` - Separators and disabled items
- `--md-sys-color-secondary-container` - Hover backgrounds

### Variant Styling

```scss
// Condensed variant
.breadcrumbs-condensed {
  --breadcrumbs-spacing: 4px;
  --breadcrumb-padding: 2px 4px;
  --breadcrumb-separator-margin: 0 4px;
  --breadcrumbs-font-size: 12px;
}

// Dark theme
[data-theme='dark'] .breadcrumbs {
  --breadcrumb-color: var(--md-sys-color-on-surface-variant);
  --breadcrumb-separator-color: var(--md-sys-color-outline-variant);
}
```

## Advanced Usage

### Router Integration

```tsx
import { useRouter } from 'next/router';

function RouterBreadcrumbs() {
  const router = useRouter();

  const generateBreadcrumbs = useCallback(() => {
    const pathnames = router.asPath.split('/').filter((x) => x);

    return [
      { label: 'Home', href: '/' },
      ...pathnames.map((pathname, index) => {
        const href = `/${pathnames.slice(0, index + 1).join('/')}`;
        const label = pathname.charAt(0).toUpperCase() + pathname.slice(1);

        return {
          label: label.replace(/-/g, ' '),
          href,
          isActive: index === pathnames.length - 1,
        };
      }),
    ];
  }, [router.asPath]);

  const breadcrumbs = generateBreadcrumbs();

  return (
    <Breadcrumbs
      items={breadcrumbs}
      onItemClick={(item, index, e) => {
        if (item.href && !item.isActive) {
          e.preventDefault();
          router.push(item.href);
        }
      }}
    />
  );
}
```

### Dynamic Breadcrumbs with Data

```tsx
function DataDrivenBreadcrumbs() {
  const { data: breadcrumbData } = useBreadcrumbData();
  const [isLoading, setIsLoading] = useState(true);

  const items = useMemo(() => {
    if (!breadcrumbData) return [];

    return breadcrumbData.map((item, index) => ({
      label: item.title,
      href: item.url,
      icon: item.icon,
      description: item.description,
      isActive: index === breadcrumbData.length - 1,
    }));
  }, [breadcrumbData]);

  if (isLoading) {
    return <BreadcrumbsSkeleton />;
  }

  return <Breadcrumbs items={items} maxItems={5} responsive />;
}
```

### Custom Collapse Logic

```tsx
function CustomCollapseBreadcrumbs() {
  const [items, setItems] = useState(originalItems);

  const customCollapseLogic = useCallback((items, maxItems) => {
    // Keep first item, last 2 items, and highest priority items
    const first = items[0];
    const last = items.slice(-2);
    const middle = items
      .slice(1, -2)
      .sort((a, b) => (b.priority || 0) - (a.priority || 0))
      .slice(0, maxItems - 3);

    return [first, ...middle, ...last];
  }, []);

  return (
    <Breadcrumbs
      items={items}
      maxItems={4}
      // Custom collapse logic could be implemented in a hook
    />
  );
}
```

## Testing

### Unit Tests

```tsx
import { render, screen } from '@testing-library/preact';
import { Breadcrumbs } from 'preact-aurora-ui';
import userEvent from '@testing-library/user-event';

test('renders breadcrumb items', () => {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Current', isActive: true },
  ];

  render(<Breadcrumbs items={items} />);

  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('Products')).toBeInTheDocument();
  expect(screen.getByText('Current')).toBeInTheDocument();
});

test('handles item clicks', async () => {
  const handleClick = vi.fn();
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Current', isActive: true },
  ];

  render(<Breadcrumbs items={items} onItemClick={handleClick} />);

  await userEvent.click(screen.getByText('Home'));
  expect(handleClick).toHaveBeenCalledWith(items[0], 0, expect.any(Object));
});
```

### Integration Tests

```tsx
test('breadcrumbs navigation flow', async () => {
  const mockRouter = {
    push: vi.fn(),
    asPath: '/products/electronics/laptops',
  };

  render(
    <RouterProvider router={mockRouter}>
      <BreadcrumbsNavigation />
    </RouterProvider>,
  );

  await userEvent.click(screen.getByText('Products'));
  expect(mockRouter.push).toHaveBeenCalledWith('/products');
});
```

### Accessibility Tests

```tsx
test('breadcrumbs accessibility', () => {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Current', isActive: true },
  ];

  render(<Breadcrumbs items={items} aria-label="Page navigation" />);

  const nav = screen.getByRole('navigation');
  expect(nav).toHaveAccessibleName('Page navigation');

  const currentItem = screen.getByText('Current');
  expect(currentItem).toHaveAttribute('aria-current', 'page');
});
```

## FAQ

### How do I integrate breadcrumbs with routing?

Use the router's path information to generate breadcrumb items:

```tsx
const breadcrumbs = router.pathname
  .split('/')
  .filter(Boolean)
  .map((segment, index, array) => ({
    label: formatSegment(segment),
    href: '/' + array.slice(0, index + 1).join('/'),
    isActive: index === array.length - 1,
  }));
```

### How do I handle breadcrumbs for dynamic routes?

Fetch route metadata and combine with path segments:

```tsx
const { data: routeData } = useRouteMetadata(router.query);

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: routeData?.category, href: `/category/${router.query.category}` },
  { label: routeData?.title, isActive: true },
];
```

### Can I customize the collapse behavior?

Yes, use the `priority` property on items and customize `maxItems`:

```tsx
const items = [
  { label: 'Home', href: '/', priority: 10 }, // Always keep
  { label: 'Important', href: '/important', priority: 8 },
  { label: 'Less Important', href: '/less', priority: 2 },
  { label: 'Current', isActive: true, priority: 10 }, // Always keep
];
```

### How do I add loading states?

Use skeleton components or loading indicators:

```tsx
{
  isLoading ? <BreadcrumbsSkeleton /> : <Breadcrumbs items={items} />;
}
```

### How do I style breadcrumbs for mobile?

Use the responsive features and CSS:

```css
@media (max-width: 768px) {
  .breadcrumbs {
    --breadcrumbs-font-size: 12px;
    --breadcrumb-separator-margin: 0 4px;
  }
}
```
