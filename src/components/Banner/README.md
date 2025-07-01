# Banner

A prominent notification component that communicates important messages to users with support for different severities, actions, and positioning following Material Design 3 principles.

## Installation

```bash
npm install @preact-aurora-ui/components@0.0.13
```

## Basic Usage

```tsx
import { Banner } from '@preact-aurora-ui/components';

function App() {
  return <Banner message="Your session will expire in 5 minutes" variant="warning" />;
}
```

## API Reference

### Props

| Prop               | Type                                          | Default  | Description                              |
| ------------------ | --------------------------------------------- | -------- | ---------------------------------------- |
| `message`          | `ComponentChildren`                           | -        | Banner message content (required)        |
| `variant`          | `'info' \| 'warning' \| 'error' \| 'success'` | `'info'` | Message severity/type                    |
| `position`         | `'top' \| 'bottom'`                           | -        | Screen position                          |
| `open`             | `boolean`                                     | `true`   | Whether banner is visible                |
| `dismissible`      | `boolean`                                     | `true`   | Whether banner can be dismissed          |
| `autoHideDuration` | `number`                                      | `0`      | Auto-dismiss duration (ms), 0 to disable |
| `action`           | `BannerAction`                                | -        | Primary action button                    |
| `secondaryAction`  | `BannerAction`                                | -        | Secondary action button                  |
| `icon`             | `ComponentChildren`                           | -        | Custom icon element                      |
| `showIcon`         | `boolean`                                     | `true`   | Show default variant icon                |
| `onClose`          | `() => void`                                  | -        | Dismiss callback function                |
| `className`        | `string`                                      | -        | Additional CSS classes                   |
| `style`            | `JSX.CSSProperties`                           | -        | Inline styles                            |

### BannerAction Interface

```tsx
interface BannerAction {
  label: string;
  onClick: () => void;
  variant?: 'text' | 'outlined';
}
```

## Variant Types

### Info Banner

```tsx
<Banner message="New features are available in the settings menu" variant="info" />
```

### Warning Banner

```tsx
<Banner
  message="Your subscription expires in 3 days"
  variant="warning"
  action={{
    label: 'Renew Now',
    onClick: () => navigate('/billing'),
  }}
/>
```

### Error Banner

```tsx
<Banner
  message="Failed to sync your data. Please check your connection."
  variant="error"
  action={{
    label: 'Retry',
    onClick: () => retrySync(),
  }}
/>
```

### Success Banner

```tsx
<Banner
  message="Your changes have been saved successfully!"
  variant="success"
  autoHideDuration={5000}
/>
```

## Positioning

### Top Banner

```tsx
<Banner message="System maintenance scheduled for tonight" position="top" variant="warning" />
```

### Bottom Banner

```tsx
<Banner
  message="Cookie consent notice"
  position="bottom"
  action={{
    label: 'Accept',
    onClick: () => acceptCookies(),
  }}
  secondaryAction={{
    label: 'Settings',
    onClick: () => openCookieSettings(),
    variant: 'text',
  }}
/>
```

## Advanced Usage

### Banner with Multiple Actions

```tsx
import { useState } from 'preact/hooks';

function UpdateBanner() {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <Banner
      message="A new version of the app is available"
      variant="info"
      open={showBanner}
      onClose={() => setShowBanner(false)}
      action={{
        label: 'Update',
        onClick: () => {
          updateApp();
          setShowBanner(false);
        },
      }}
      secondaryAction={{
        label: 'Later',
        onClick: () => setShowBanner(false),
        variant: 'text',
      }}
    />
  );
}
```

### Auto-dismissing Banner

```tsx
function NotificationBanner() {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async () => {
    try {
      await saveData();
      setShowSuccess(true);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <>
      <button onClick={handleSave}>Save</button>

      <Banner
        message="Data saved successfully!"
        variant="success"
        open={showSuccess}
        autoHideDuration={4000}
        onClose={() => setShowSuccess(false)}
      />
    </>
  );
}
```

### Custom Icon Banner

```tsx
const CustomIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

<Banner message="You've earned a 5-star rating!" variant="success" icon={<CustomIcon />} />;
```

### Rich Content Banner

```tsx
<Banner
  message={
    <div>
      <strong>Security Alert:</strong> New login detected from <code>192.168.1.1</code>. If this
      wasn't you, please <a href="/security">review your account security</a>.
    </div>
  }
  variant="warning"
  action={{
    label: 'Secure Account',
    onClick: () => navigate('/security'),
  }}
/>
```

### Persistent Banner

```tsx
<Banner
  message="Maintenance mode is active. Some features may be unavailable."
  variant="warning"
  dismissible={false}
  showIcon={true}
/>
```

### Controlled Banner State

```tsx
import { useState, useEffect } from 'preact/hooks';

function ConnectivityBanner() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <Banner
      message="You're currently offline. Some features may not work."
      variant="error"
      open={!isOnline}
      dismissible={false}
      position="top"
    />
  );
}
```

## Layout Integration

### With App Layout

```tsx
import { AppLayout, Header, Banner, Content } from '@preact-aurora-ui/components';

function App() {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <AppLayout>
      <Header>App Navigation</Header>

      <Banner
        message="Welcome to the new interface!"
        variant="info"
        position="top"
        open={showBanner}
        onClose={() => setShowBanner(false)}
        action={{
          label: 'Take Tour',
          onClick: () => startTour(),
        }}
      />

      <Content>App Content</Content>
    </AppLayout>
  );
}
```

### Multiple Banners

```tsx
function MultiBannerExample() {
  const [banners, setBanners] = useState({
    maintenance: true,
    update: true,
    promotion: true,
  });

  const closeBanner = (type: string) => {
    setBanners((prev) => ({ ...prev, [type]: false }));
  };

  return (
    <>
      <Banner
        message="Scheduled maintenance tonight 10-11 PM"
        variant="warning"
        position="top"
        open={banners.maintenance}
        onClose={() => closeBanner('maintenance')}
      />

      <Banner
        message="New version available"
        variant="info"
        open={banners.update}
        onClose={() => closeBanner('update')}
        action={{
          label: 'Update',
          onClick: () => updateApp(),
        }}
      />

      <Banner
        message="50% off premium features this week!"
        variant="success"
        position="bottom"
        open={banners.promotion}
        onClose={() => closeBanner('promotion')}
        action={{
          label: 'Upgrade',
          onClick: () => navigate('/upgrade'),
        }}
      />
    </>
  );
}
```

## Accessibility

The Banner component provides comprehensive accessibility support:

- **Screen Readers**: Uses `role="alert"` and `aria-live="polite"`
- **Keyboard Navigation**: Supports Tab, Enter, Escape keys
- **Focus Management**: Action buttons are properly focusable
- **High Contrast**: Compatible with high contrast modes
- **Reduced Motion**: Respects user motion preferences

### ARIA Features

```tsx
// Automatically includes proper ARIA attributes
<div role="alert" aria-live="polite" aria-atomic="true">
  {message}
</div>
```

### Keyboard Support

- `Tab` / `Shift+Tab`: Navigate action buttons
- `Enter` / `Space`: Activate action buttons
- `Escape`: Dismiss banner (if dismissible)

## Theming

The component supports Material Design 3 theming:

```css
.banner {
  --banner-bg: var(--md-sys-color-surface-container);
  --banner-color: var(--md-sys-color-on-surface);
  --banner-border-radius: var(--md-sys-shape-corner-none);
  --banner-padding: 1rem 1.5rem;
  --banner-elevation: var(--md-sys-elevation-1);
}

/* Variant-specific colors */
.banner--info {
  --banner-bg: var(--md-sys-color-secondary-container);
  --banner-color: var(--md-sys-color-on-secondary-container);
  --banner-icon-color: var(--md-sys-color-secondary);
}

.banner--warning {
  --banner-bg: var(--md-sys-color-tertiary-container);
  --banner-color: var(--md-sys-color-on-tertiary-container);
  --banner-icon-color: var(--md-sys-color-tertiary);
}

.banner--error {
  --banner-bg: var(--md-sys-color-error-container);
  --banner-color: var(--md-sys-color-on-error-container);
  --banner-icon-color: var(--md-sys-color-error);
}

.banner--success {
  --banner-bg: var(--md-sys-color-primary-container);
  --banner-color: var(--md-sys-color-on-primary-container);
  --banner-icon-color: var(--md-sys-color-primary);
}
```

### Custom Styling

```css
.custom-banner {
  --banner-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --banner-color: white;
  --banner-border-radius: 8px;
}
```

## Testing

### Unit Tests

```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { Banner } from '@preact-aurora-ui/components';

test('displays message', () => {
  render(<Banner message="Test message" />);

  expect(screen.getByRole('alert')).toBeInTheDocument();
  expect(screen.getByText('Test message')).toBeInTheDocument();
});

test('handles dismiss action', async () => {
  const user = userEvent.setup();
  const handleClose = vi.fn();

  render(<Banner message="Dismissible banner" onClose={handleClose} />);

  await user.click(screen.getByRole('button', { name: 'Close banner' }));
  expect(handleClose).toHaveBeenCalled();
});

test('auto-dismisses after duration', async () => {
  vi.useFakeTimers();
  const handleClose = vi.fn();

  render(<Banner message="Auto-dismiss banner" autoHideDuration={1000} onClose={handleClose} />);

  vi.advanceTimersByTime(1000);

  await waitFor(() => {
    expect(handleClose).toHaveBeenCalled();
  });

  vi.useRealTimers();
});

test('handles action button click', async () => {
  const user = userEvent.setup();
  const handleAction = vi.fn();

  render(
    <Banner
      message="Action banner"
      action={{
        label: 'Action',
        onClick: handleAction,
      }}
    />,
  );

  await user.click(screen.getByRole('button', { name: 'Action' }));
  expect(handleAction).toHaveBeenCalled();
});
```

### Accessibility Testing

```tsx
import { axe, toHaveNoViolations } from 'jest-axe';

test('should not have accessibility violations', async () => {
  const { container } = render(<Banner message="Accessible banner" />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## FAQ

**Q: How do I show multiple banners at once?**
A: Render multiple Banner components. Use different positions (top/bottom) or implement a banner queue system.

**Q: Can I prevent auto-dismiss on hover?**
A: The current implementation doesn't support this, but you can extend the component to pause timers on hover.

**Q: How do I customize the close button icon?**
A: Currently uses a built-in close icon. You can override it with custom CSS or extend the component.

**Q: Can I make banners sticky when scrolling?**
A: Yes, use CSS `position: sticky` or `position: fixed` with appropriate z-index values.

**Q: How do I handle banner state globally?**
A: Consider creating a banner context provider or using your state management solution (Redux, Zustand, etc.).

**Q: Can I animate banner entrance/exit?**
A: The component includes basic CSS transitions. For complex animations, you can override the CSS classes.

**Q: How do I make banners responsive?**
A: The component is responsive by default. Use CSS media queries to adjust styling for different screen sizes.

**Q: Can I use rich HTML content in banners?**
A: Yes, pass JSX elements to the `message` prop for rich content including links, formatting, and icons.

**Q: How do I add action buttons to the banner?**  
A: Use the `actions` prop to pass in React elements (e.g., buttons, links).

**Q: How do I change the banner's color?**  
A: Use the `color` prop or override the CSS custom properties in your application's CSS or theme.

## Contribution

Contributions are welcome! Please follow the contribution guidelines in the repository.

## License

MIT
