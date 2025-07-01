# PageHeader

A page header component that displays page titles, subtitles, and action buttons with Material Design 3 styling.

## Installation

```bash
npm install @preact-aurora-ui/components@0.0.13
```

## Basic Usage

```tsx
import { PageHeader } from '@preact-aurora-ui/components';

function DashboardPage() {
  return <PageHeader title="Dashboard" subtitle="Welcome back to your control panel" />;
}
```

## API Reference

### Props

| Prop         | Type                | Default         | Description                   |
| ------------ | ------------------- | --------------- | ----------------------------- |
| `title`      | `string`            | -               | Main page title (required)    |
| `subtitle`   | `string`            | -               | Optional descriptive subtitle |
| `actions`    | `ComponentChildren` | -               | Action buttons or controls    |
| `className`  | `string`            | `''`            | Additional CSS classes        |
| `style`      | `JSX.CSSProperties` | -               | Inline styles                 |
| `aria-label` | `string`            | `'Page header'` | Accessibility label           |

## Basic Examples

### Simple Title

```tsx
<PageHeader title="User Profile" />
```

### Title with Subtitle

```tsx
<PageHeader title="Analytics" subtitle="Track your website performance and metrics" />
```

### With Action Buttons

```tsx
import { Button } from '@preact-aurora-ui/components';

<PageHeader
  title="Team Members"
  subtitle="Manage your team and permissions"
  actions={
    <>
      <Button variant="outlined">Export</Button>
      <Button variant="filled">Invite Member</Button>
    </>
  }
/>;
```

## Advanced Usage

### Complex Action Bar

```tsx
import { Button, IconButton, Menu } from '@preact-aurora-ui/components';

function ProjectHeader() {
  return (
    <PageHeader
      title="Project Apollo"
      subtitle="Last updated 2 hours ago"
      actions={
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <IconButton icon="share" aria-label="Share project" />
          <IconButton icon="star" aria-label="Star project" />
          <Button variant="outlined" size="sm">
            Settings
          </Button>
          <Button variant="filled" size="sm">
            Deploy
          </Button>
        </div>
      }
    />
  );
}
```

### Responsive Header

```tsx
import { useState } from 'preact/hooks';
import { useMediaQuery } from '../hooks/useMediaQuery';

function ResponsiveHeader() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <PageHeader
      title="Responsive Page"
      subtitle={!isMobile ? 'Full subtitle on desktop' : undefined}
      actions={
        isMobile ? (
          <IconButton icon="menu" aria-label="More actions" />
        ) : (
          <>
            <Button variant="outlined">Secondary</Button>
            <Button variant="filled">Primary</Button>
          </>
        )
      }
    />
  );
}
```

### Header with Breadcrumbs Integration

```tsx
import { Breadcrumbs } from '@preact-aurora-ui/components';

function PageWithBreadcrumbs() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Projects', href: '/projects' },
          { label: 'Project Apollo' },
        ]}
      />
      <PageHeader
        title="Project Apollo"
        subtitle="Mission control dashboard"
        actions={<Button variant="filled">Launch</Button>}
      />
    </>
  );
}
```

### Custom Styled Header

```tsx
<PageHeader
  title="Custom Design"
  subtitle="With custom styling"
  className="custom-header"
  style={{
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    borderRadius: '12px',
  }}
  actions={<Button variant="outlined">Action</Button>}
/>
```

## Accessibility

The PageHeader component follows WAI-ARIA guidelines:

- Uses semantic `header` element
- Title uses proper `h1` heading hierarchy
- Provides descriptive `aria-label` for screen readers
- Action buttons maintain proper focus order
- Supports keyboard navigation
- Color contrast meets WCAG 2.1 AA standards

### Keyboard Navigation

- `Tab` / `Shift+Tab`: Navigate through action buttons
- `Enter` / `Space`: Activate action buttons
- Screen readers announce title and subtitle content

## Theming

The component supports Material Design 3 theming through CSS custom properties:

```css
.pageHeader {
  --color-bg-header: var(--md-sys-color-surface);
  --color-text-primary: var(--md-sys-color-on-surface);
  --color-text-secondary: var(--md-sys-color-on-surface-variant);
  --space-lg: 1.5rem;
  --space-md: 1rem;
  --space-xs: 0.5rem;
  --font-size-xl: 1.75rem;
  --font-size-base: 1rem;
}
```

### Dark Theme Support

```css
[data-theme='dark'] .pageHeader {
  --color-bg-header: var(--md-sys-color-surface-dark);
  --color-text-primary: var(--md-sys-color-on-surface-dark);
  --color-text-secondary: var(--md-sys-color-on-surface-variant-dark);
}
```

## Integration

### With Layout Components

```tsx
import { AppLayout, Header, Sidebar, Content, PageHeader } from '@preact-aurora-ui/components';

function App() {
  return (
    <AppLayout>
      <Header>App Navigation</Header>
      <Sidebar nav={<Navigation />} />
      <Content>
        <PageHeader
          title="Dashboard"
          subtitle="Overview of your account"
          actions={<Button>New Project</Button>}
        />
        <DashboardContent />
      </Content>
    </AppLayout>
  );
}
```

### With Routing

```tsx
import { Router, Route } from '@preact/router';

function AppRoutes() {
  return (
    <Router>
      <Route
        path="/"
        component={() => <PageHeader title="Home" subtitle="Welcome to the application" />}
      />
      <Route
        path="/users"
        component={() => (
          <PageHeader
            title="User Management"
            subtitle="Manage your team members"
            actions={<Button>Add User</Button>}
          />
        )}
      />
    </Router>
  );
}
```

### With Form Pages

```tsx
function UserEditPage({ userId }) {
  return (
    <>
      <PageHeader
        title="Edit User"
        subtitle={`Editing profile for user #${userId}`}
        actions={
          <>
            <Button variant="outlined">Cancel</Button>
            <Button variant="filled" type="submit">
              Save Changes
            </Button>
          </>
        }
      />
      <UserForm userId={userId} />
    </>
  );
}
```

## Testing

### Unit Tests

```tsx
import { render, screen, fireEvent } from '@testing-library/preact';
import { PageHeader } from '@preact-aurora-ui/components';

test('renders title and subtitle', () => {
  render(<PageHeader title="Test Page" subtitle="Test description" />);

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Page');
  expect(screen.getByText('Test description')).toBeInTheDocument();
});

test('renders action buttons', () => {
  const handleClick = vi.fn();

  render(<PageHeader title="Test" actions={<button onClick={handleClick}>Action</button>} />);

  const button = screen.getByRole('button', { name: 'Action' });
  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalled();
});
```

### Accessibility Testing

```tsx
import { axe, toHaveNoViolations } from 'jest-axe';

test('should not have accessibility violations', async () => {
  const { container } = render(
    <PageHeader
      title="Accessible Page"
      subtitle="With proper semantics"
      actions={<button>Action</button>}
    />,
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## FAQ

**Q: Can I use PageHeader without a subtitle?**
A: Yes, the subtitle is optional. Just provide the title prop.

**Q: How do I add multiple action buttons?**
A: Wrap multiple buttons in a fragment or div and pass them to the actions prop.

**Q: Is the header responsive?**
A: Yes, the component adapts to different screen sizes. Action buttons may stack on smaller screens.

**Q: Can I customize the heading level?**
A: The component uses h1 by default. For different heading levels, you might need to use a different component or modify the semantic structure.

**Q: How do I integrate with breadcrumbs?**
A: Place the Breadcrumbs component before the PageHeader for proper visual hierarchy.

**Q: Can I add icons to the title?**
A: You can pass JSX content to the actions prop, but the title prop only accepts strings. For custom title content, you might need to use a custom header structure.

**Q: How do I handle long titles?**
A: The component handles text wrapping automatically. For very long titles, consider using a shorter, more concise title.

**Q: Can I make the header sticky?**
A: The component doesn't include sticky positioning by default. You can add it via CSS or use a layout component that supports sticky headers.

**Q: How do I add a description to the page header?**  
A: Use the `description` prop.

**Q: How do I add action buttons to the page header?**  
A: Use the `actions` prop to pass in React elements (e.g., buttons, links).

## Contribution

Contributions are welcome! Please follow the contribution guidelines in the repository.

## License

MIT
