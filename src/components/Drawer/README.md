# Drawer

A slide-out panel component that appears from any edge of the screen to display navigation, settings, or additional content with Material Design 3 styling.

## Installation

```bash
npm install @preact-aurora-ui/components@0.0.13
```

## Basic Usage

```tsx
import { Drawer } from '@preact-aurora-ui/components';
import { useState } from 'preact/hooks';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Drawer</button>
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} title="Navigation">
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
      </Drawer>
    </>
  );
}
```

## API Reference

### Props

| Prop                  | Type                                                 | Default            | Description                          |
| --------------------- | ---------------------------------------------------- | ------------------ | ------------------------------------ |
| `isOpen`              | `boolean`                                            | -                  | Whether drawer is visible (required) |
| `onClose`             | `() => void`                                         | -                  | Close callback function (required)   |
| `children`            | `ComponentChildren`                                  | -                  | Drawer content                       |
| `className`           | `string`                                             | `''`               | Additional CSS classes               |
| `style`               | `JSX.CSSProperties`                                  | -                  | Inline styles                        |
| `title`               | `string`                                             | -                  | Drawer title in header               |
| `position`            | `'top' \| 'bottom' \| 'left' \| 'right' \| 'center'` | `'right'`          | Slide direction                      |
| `width`               | `string`                                             | `'320px'`          | Width for left/right/center drawers  |
| `height`              | `string`                                             | -                  | Height for top/bottom/center drawers |
| `isModal`             | `boolean`                                            | `true`             | Modal behavior with overlay          |
| `closeOnOverlayClick` | `boolean`                                            | `true`             | Close when clicking overlay          |
| `closeOnEscape`       | `boolean`                                            | `true`             | Close with Escape key                |
| `showCloseButton`     | `boolean`                                            | `true`             | Show X close button in header        |
| `aria-label`          | `string`                                             | `'Panel wysuwany'` | Accessibility label                  |

## Position Variants

### Right Drawer (Default)

```tsx
<Drawer isOpen={isOpen} onClose={onClose} position="right">
  Right side content
</Drawer>
```

### Left Drawer

```tsx
<Drawer isOpen={isOpen} onClose={onClose} position="left" width="280px">
  Left navigation menu
</Drawer>
```

### Top Drawer

```tsx
<Drawer isOpen={isOpen} onClose={onClose} position="top" height="200px">
  Top notification panel
</Drawer>
```

### Bottom Drawer

```tsx
<Drawer isOpen={isOpen} onClose={onClose} position="bottom" height="300px">
  Bottom action sheet
</Drawer>
```

### Center Drawer (Modal)

```tsx
<Drawer isOpen={isOpen} onClose={onClose} position="center" width="400px" height="300px">
  Center modal content
</Drawer>
```

## Advanced Usage

### Navigation Drawer with Menu

```tsx
import { useState } from 'preact/hooks';
import { Drawer, Button, IconButton } from '@preact-aurora-ui/components';

function NavigationDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'help', label: 'Help', icon: '❓' },
  ];

  return (
    <>
      <IconButton icon="☰" onClick={() => setIsOpen(true)} aria-label="Open navigation" />

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="left"
        title="Navigation"
        width="280px"
      >
        <nav style={{ padding: '1rem 0' }}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: 'none',
                background: activeItem === item.id ? '#e3f2fd' : 'transparent',
                textAlign: 'left',
                cursor: 'pointer',
              }}
              onClick={() => {
                setActiveItem(item.id);
                setIsOpen(false);
              }}
            >
              <span style={{ marginRight: '0.5rem' }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </Drawer>
    </>
  );
}
```

### Settings Drawer

```tsx
import { Drawer, Switch, Select, Button } from '@preact-aurora-ui/components';

function SettingsDrawer({ isOpen, onClose }) {
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} position="right" title="Settings" width="360px">
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label>Theme</label>
          <Select
            value={theme}
            onChange={setTheme}
            options={[
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' },
              { value: 'auto', label: 'Auto' },
            ]}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label>Notifications</label>
          <Switch checked={notifications} onChange={setNotifications} />
        </div>

        <Button
          variant="filled"
          onClick={() => {
            // Save settings
            onClose();
          }}
        >
          Save Settings
        </Button>
      </div>
    </Drawer>
  );
}
```

### Non-Modal Drawer

```tsx
<Drawer
  isOpen={isOpen}
  onClose={onClose}
  position="left"
  isModal={false}
  closeOnOverlayClick={false}
>
  This drawer doesn't block interaction with the page.
</Drawer>
```

### Action Sheet (Bottom Drawer)

```tsx
function ActionSheet({ isOpen, onClose }) {
  const actions = [
    { label: 'Share', icon: '📤', onClick: () => console.log('Share') },
    { label: 'Copy Link', icon: '🔗', onClick: () => console.log('Copy') },
    { label: 'Download', icon: '⬇️', onClick: () => console.log('Download') },
    { label: 'Delete', icon: '🗑️', onClick: () => console.log('Delete'), destructive: true },
  ];

  return (
    <Drawer isOpen={isOpen} onClose={onClose} position="bottom" height="auto" title="Actions">
      <div style={{ padding: '0.5rem' }}>
        {actions.map((action, index) => (
          <button
            key={index}
            style={{
              width: '100%',
              padding: '1rem',
              border: 'none',
              background: 'transparent',
              textAlign: 'left',
              cursor: 'pointer',
              color: action.destructive ? '#d32f2f' : 'inherit',
            }}
            onClick={() => {
              action.onClick();
              onClose();
            }}
          >
            <span style={{ marginRight: '0.75rem' }}>{action.icon}</span>
            {action.label}
          </button>
        ))}
      </div>
    </Drawer>
  );
}
```

### Persistent Drawer

```tsx
function PersistentDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      position="left"
      closeOnOverlayClick={false}
      closeOnEscape={false}
      showCloseButton={false}
    >
      <div style={{ padding: '1rem' }}>
        <p>This drawer stays open until manually closed.</p>
        <Button onClick={() => setIsOpen(false)}>Close Drawer</Button>
      </div>
    </Drawer>
  );
}
```

## Accessibility

The Drawer component provides comprehensive accessibility support:

- **Focus Management**: Automatic focus trapping when modal
- **Keyboard Navigation**: Full keyboard support including Tab, Escape
- **Screen Readers**: Proper ARIA roles and labels
- **High Contrast**: Compatible with high contrast modes
- **Reduced Motion**: Respects user motion preferences

### ARIA Attributes

```tsx
<Drawer isOpen={isOpen} onClose={onClose} aria-label="Navigation drawer" title="Main Navigation">
  <nav aria-label="Primary navigation">{/* Navigation items */}</nav>
</Drawer>
```

### Keyboard Support

- `Tab` / `Shift+Tab`: Navigate through drawer elements
- `Escape`: Close drawer (if enabled)
- `Enter` / `Space`: Activate focused elements

## Theming

The component supports Material Design 3 theming through CSS custom properties:

```css
.drawer {
  --drawer-bg: var(--md-sys-color-surface);
  --drawer-color: var(--md-sys-color-on-surface);
  --drawer-border: var(--md-sys-color-outline-variant);
  --drawer-shadow: var(--md-sys-elevation-2);
  --drawer-overlay-bg: rgba(0, 0, 0, 0.32);
  --drawer-transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  --drawer-z-index: 1200;
}
```

### Custom Styling

```css
.custom-drawer {
  --drawer-bg: var(--custom-surface);
  --drawer-border: 2px solid var(--custom-accent);
  --drawer-transition: transform 0.3s ease-out;
}
```

## Integration

### With Layout Components

```tsx
import { AppLayout, Header, Drawer, Content } from '@preact-aurora-ui/components';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <AppLayout>
      <Header>
        <IconButton icon="☰" onClick={() => setDrawerOpen(true)} />
        App Header
      </Header>

      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        position="left"
        title="Navigation"
      >
        <Navigation />
      </Drawer>

      <Content>Main Content</Content>
    </AppLayout>
  );
}
```

### With Router

```tsx
import { Router, route } from '@preact/router';

function NavigationDrawer({ currentRoute }) {
  const navigate = (path) => {
    route(path);
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <nav>
        <button onClick={() => navigate('/')} className={currentRoute === '/' ? 'active' : ''}>
          Home
        </button>
        <button
          onClick={() => navigate('/about')}
          className={currentRoute === '/about' ? 'active' : ''}
        >
          About
        </button>
      </nav>
    </Drawer>
  );
}
```

## Testing

### Unit Tests

```tsx
import { render, screen, fireEvent } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { Drawer } from '@preact-aurora-ui/components';

test('opens and closes drawer', async () => {
  const user = userEvent.setup();
  const handleClose = vi.fn();

  render(
    <Drawer isOpen={true} onClose={handleClose} title="Test">
      Content
    </Drawer>,
  );

  expect(screen.getByText('Content')).toBeInTheDocument();

  // Close with escape key
  await user.keyboard('{Escape}');
  expect(handleClose).toHaveBeenCalled();
});

test('closes on overlay click', async () => {
  const user = userEvent.setup();
  const handleClose = vi.fn();

  render(
    <Drawer isOpen={true} onClose={handleClose}>
      Content
    </Drawer>,
  );

  const overlay = screen.getByTestId('drawer-overlay');
  await user.click(overlay);
  expect(handleClose).toHaveBeenCalled();
});
```

### Accessibility Testing

```tsx
import { axe, toHaveNoViolations } from 'jest-axe';

test('should not have accessibility violations', async () => {
  const { container } = render(
    <Drawer isOpen={true} onClose={() => {}} title="Accessible Drawer">
      <nav>Navigation content</nav>
    </Drawer>,
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## FAQ

**Q: How do I create a persistent navigation drawer?**
A: Set `isModal={false}`, `closeOnOverlayClick={false}`, and `closeOnEscape={false}` for a drawer that stays open.

**Q: Can I customize the drawer size?**
A: Yes, use the `width` prop for left/right drawers and `height` for top/bottom drawers.

**Q: How do I prevent the drawer from closing?**
A: Set `closeOnOverlayClick={false}`, `closeOnEscape={false}`, and `showCloseButton={false}`.

**Q: Can I have multiple drawers open at once?**
A: Yes, but be careful with z-index stacking and focus management. Consider using different positions.

**Q: How do I make the drawer responsive?**
A: You can conditionally change the `position` or `width` based on screen size using media queries or state.

**Q: Can I animate the drawer differently?**
A: Yes, override the CSS transition properties in your custom styles.

**Q: How do I handle drawer content overflow?**
A: The drawer content area is scrollable by default. You can control this with CSS on the content.

**Q: Can I use the drawer as a dialog replacement?**
A: Yes, use `position="center"` with appropriate width and height for a dialog-like experience.

See [`Drawer.module.scss`](./Drawer.module.scss) for details.

## Accessibility

The `Drawer` component provides basic accessibility features. Use ARIA attributes to provide more context.

## Testing

See [`Drawer.test.tsx`](./Drawer.test.tsx) for unit tests.

## Storybook

[Link to Storybook story] (Coming soon)

## FAQ

**Q: How do I control the drawer visibility?**  
A: Use the `open` prop to control the drawer visibility in your component.

**Q: How do I add navigation links to the drawer?**  
A: Add navigation components (e.g., `ul`, `li`, `a`) within the `children` of the `Drawer` component.

## Contribution

Contributions are welcome! Please follow the contribution guidelines.

## License

MIT
