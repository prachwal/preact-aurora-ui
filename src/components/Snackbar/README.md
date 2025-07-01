# Snackbar

A versatile notification component that displays temporary messages with optional actions, supporting multiple positions, severities, and global state management following Material Design 3 principles.

## Installation

```bash
npm install @preact-aurora-ui/components@0.0.13
```

## Basic Usage

```tsx
import { SnackbarProvider, useSnackbar } from '@preact-aurora-ui/components';

// Wrap your app with SnackbarProvider
function App() {
  return (
    <SnackbarProvider>
      <MyComponent />
    </SnackbarProvider>
  );
}

// Use snackbars in components
function MyComponent() {
  const { showSnackbar } = useSnackbar();

  const handleClick = () => {
    showSnackbar({
      message: 'Item added to cart!',
      severity: 'success',
    });
  };

  return <button onClick={handleClick}>Add to Cart</button>;
}
```

## API Reference

### Snackbar Props

| Prop              | Type                                                                                | Default    | Description                              |
| ----------------- | ----------------------------------------------------------------------------------- | ---------- | ---------------------------------------- |
| `message`         | `string`                                                                            | -          | Message text to display (required)       |
| `open`            | `boolean`                                                                           | -          | Whether snackbar is visible (required)   |
| `onClose`         | `() => void`                                                                        | -          | Close callback function                  |
| `duration`        | `number`                                                                            | `4000`     | Auto-dismiss duration (ms), 0 to disable |
| `severity`        | `'info' \| 'success' \| 'warning' \| 'error'`                                       | `'info'`   | Message severity/type                    |
| `position`        | `'bottom' \| 'top' \| 'bottom-left' \| 'bottom-right' \| 'top-left' \| 'top-right'` | `'bottom'` | Screen position                          |
| `action`          | `SnackbarAction`                                                                    | -          | Optional action button                   |
| `showCloseButton` | `boolean`                                                                           | `false`    | Show close X button                      |
| `persistent`      | `boolean`                                                                           | `false`    | Disable auto-dismiss                     |
| `className`       | `string`                                                                            | -          | Additional CSS classes                   |

### SnackbarAction Interface

```tsx
interface SnackbarAction {
  label: string;
  onClick: () => void;
}
```

### SnackbarProvider Props

| Prop              | Type                | Default    | Description                   |
| ----------------- | ------------------- | ---------- | ----------------------------- |
| `children`        | `ComponentChildren` | -          | App content                   |
| `maxSnackbars`    | `number`            | `3`        | Maximum concurrent snackbars  |
| `defaultDuration` | `number`            | `4000`     | Default auto-dismiss duration |
| `defaultPosition` | `SnackbarPosition`  | `'bottom'` | Default position              |

### useSnackbar Hook

```tsx
const { showSnackbar, hideSnackbar, snackbars } = useSnackbar();
```

## Severity Types

### Info Snackbar

```tsx
showSnackbar({
  message: 'Information updated',
  severity: 'info',
});
```

### Success Snackbar

```tsx
showSnackbar({
  message: 'Changes saved successfully!',
  severity: 'success',
});
```

### Warning Snackbar

```tsx
showSnackbar({
  message: 'Please check your internet connection',
  severity: 'warning',
});
```

### Error Snackbar

```tsx
showSnackbar({
  message: 'Failed to save changes',
  severity: 'error',
  persistent: true,
  showCloseButton: true,
});
```

## Positioning

### Bottom Positions

```tsx
// Center bottom
showSnackbar({ message: 'Default position', position: 'bottom' });

// Bottom left
showSnackbar({ message: 'Bottom left', position: 'bottom-left' });

// Bottom right
showSnackbar({ message: 'Bottom right', position: 'bottom-right' });
```

### Top Positions

```tsx
// Center top
showSnackbar({ message: 'Top center', position: 'top' });

// Top left
showSnackbar({ message: 'Top left', position: 'top-left' });

// Top right
showSnackbar({ message: 'Top right', position: 'top-right' });
```

## Advanced Usage

### Snackbar with Action

```tsx
import { useSnackbar } from '@preact-aurora-ui/components';

function UndoExample() {
  const { showSnackbar } = useSnackbar();
  const [items, setItems] = useState(['Item 1', 'Item 2']);

  const deleteItem = (index: number) => {
    const deletedItem = items[index];
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);

    showSnackbar({
      message: `Deleted "${deletedItem}"`,
      severity: 'info',
      action: {
        label: 'Undo',
        onClick: () => {
          setItems((prev) => {
            const restored = [...prev];
            restored.splice(index, 0, deletedItem);
            return restored;
          });
        },
      },
      duration: 8000,
    });
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={item}>
          {item}
          <button onClick={() => deleteItem(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

### Persistent Error Notifications

```tsx
function ErrorHandler() {
  const { showSnackbar } = useSnackbar();

  const handleError = (error: Error) => {
    showSnackbar({
      message: `Error: ${error.message}`,
      severity: 'error',
      persistent: true,
      showCloseButton: true,
      action: {
        label: 'Retry',
        onClick: () => {
          // Retry logic
          console.log('Retrying...');
        },
      },
    });
  };

  return <button onClick={() => handleError(new Error('Network timeout'))}>Trigger Error</button>;
}
```

### Sequential Notifications

```tsx
function SequentialNotifications() {
  const { showSnackbar } = useSnackbar();

  const showSequence = async () => {
    showSnackbar({
      message: 'Step 1: Validating data...',
      severity: 'info',
      duration: 2000,
    });

    setTimeout(() => {
      showSnackbar({
        message: 'Step 2: Saving to database...',
        severity: 'info',
        duration: 2000,
      });
    }, 2000);

    setTimeout(() => {
      showSnackbar({
        message: 'Process completed successfully!',
        severity: 'success',
        duration: 3000,
      });
    }, 4000);
  };

  return <button onClick={showSequence}>Start Process</button>;
}
```

### Standalone Snackbar (without Provider)

```tsx
import { useState } from 'preact/hooks';
import { Snackbar } from '@preact-aurora-ui/components';

function StandaloneExample() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info' as const,
  });

  const showMessage = () => {
    setSnackbar({
      open: true,
      message: 'Standalone snackbar!',
      severity: 'success',
    });
  };

  return (
    <>
      <button onClick={showMessage}>Show Snackbar</button>
      <Snackbar {...snackbar} onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))} />
    </>
  );
}
```

## Provider Configuration

### Global Provider Setup

```tsx
import { SnackbarProvider } from '@preact-aurora-ui/components';

function App() {
  return (
    <SnackbarProvider maxSnackbars={5} defaultDuration={6000} defaultPosition="top-right">
      <MyApp />
    </SnackbarProvider>
  );
}
```

### Custom Portal Root

```tsx
// Add to your HTML
<div id="snackbar-root"></div>

// Snackbars will automatically render in this container
```

## Accessibility

The Snackbar component provides comprehensive accessibility support:

- **Screen Readers**: Uses `role="alert"` and `aria-live="polite"`
- **Keyboard Navigation**: Supports Escape key to dismiss
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

- `Escape`: Dismiss snackbar
- `Tab` / `Shift+Tab`: Navigate action/close buttons
- `Enter` / `Space`: Activate buttons

## Theming

The component supports Material Design 3 theming:

```css
.snackbar {
  --snackbar-bg: var(--md-sys-color-inverse-surface);
  --snackbar-color: var(--md-sys-color-inverse-on-surface);
  --snackbar-action-color: var(--md-sys-color-inverse-primary);
  --snackbar-border-radius: var(--md-sys-shape-corner-extra-small);
  --snackbar-elevation: var(--md-sys-elevation-3);
}

/* Severity-specific colors */
.snackbar--success {
  --snackbar-bg: var(--md-sys-color-primary);
  --snackbar-color: var(--md-sys-color-on-primary);
}

.snackbar--error {
  --snackbar-bg: var(--md-sys-color-error);
  --snackbar-color: var(--md-sys-color-on-error);
}

.snackbar--warning {
  --snackbar-bg: var(--md-sys-color-tertiary);
  --snackbar-color: var(--md-sys-color-on-tertiary);
}
```

### Custom Styling

```css
.custom-snackbar {
  --snackbar-bg: #2d3748;
  --snackbar-color: #fff;
  --snackbar-border-radius: 12px;
}
```

## Integration

### With Form Validation

```tsx
import { useSnackbar } from '@preact-aurora-ui/components';

function ContactForm() {
  const { showSnackbar } = useSnackbar();

  const handleSubmit = async (data) => {
    try {
      await submitForm(data);
      showSnackbar({
        message: 'Message sent successfully!',
        severity: 'success',
      });
    } catch (error) {
      showSnackbar({
        message: 'Failed to send message. Please try again.',
        severity: 'error',
        action: {
          label: 'Retry',
          onClick: () => handleSubmit(data),
        },
      });
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### With API Calls

```tsx
function DataFetcher() {
  const { showSnackbar } = useSnackbar();

  const fetchData = async () => {
    try {
      showSnackbar({
        message: 'Loading data...',
        severity: 'info',
        duration: 0, // Don't auto-dismiss
      });

      const data = await api.getData();

      showSnackbar({
        message: 'Data loaded successfully!',
        severity: 'success',
      });
    } catch (error) {
      showSnackbar({
        message: 'Failed to load data',
        severity: 'error',
        persistent: true,
        showCloseButton: true,
      });
    }
  };

  return <button onClick={fetchData}>Load Data</button>;
}
```

## Testing

### Unit Tests

```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { Snackbar, SnackbarProvider, useSnackbar } from '@preact-aurora-ui/components';

test('displays message when open', () => {
  render(<Snackbar open={true} message="Test message" />);

  expect(screen.getByText('Test message')).toBeInTheDocument();
  expect(screen.getByRole('alert')).toBeInTheDocument();
});

test('handles action button click', async () => {
  const user = userEvent.setup();
  const handleAction = vi.fn();

  render(
    <Snackbar open={true} message="Test" action={{ label: 'Action', onClick: handleAction }} />,
  );

  await user.click(screen.getByRole('button', { name: 'Action' }));
  expect(handleAction).toHaveBeenCalled();
});

test('auto-dismisses after duration', async () => {
  vi.useFakeTimers();
  const handleClose = vi.fn();

  render(<Snackbar open={true} message="Test" duration={1000} onClose={handleClose} />);

  vi.advanceTimersByTime(1000);
  await waitFor(() => {
    expect(handleClose).toHaveBeenCalled();
  });

  vi.useRealTimers();
});
```

### Provider Testing

```tsx
test('useSnackbar hook works with provider', async () => {
  const TestComponent = () => {
    const { showSnackbar } = useSnackbar();
    return <button onClick={() => showSnackbar({ message: 'Test' })}>Show</button>;
  };

  render(
    <SnackbarProvider>
      <TestComponent />
    </SnackbarProvider>,
  );

  await user.click(screen.getByRole('button', { name: 'Show' }));
  expect(screen.getByText('Test')).toBeInTheDocument();
});
```

### Accessibility Testing

```tsx
import { axe, toHaveNoViolations } from 'jest-axe';

test('should not have accessibility violations', async () => {
  const { container } = render(<Snackbar open={true} message="Accessible snackbar" />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## FAQ

**Q: How do I prevent multiple snackbars of the same type?**
A: You can implement deduplication in your app logic before calling `showSnackbar`, or extend the provider to track message types.

**Q: Can I customize the snackbar animations?**
A: Yes, you can override the CSS transition classes in your stylesheet to customize enter/exit animations.

**Q: How do I show snackbars from outside React components?**
A: Create a global snackbar service that interfaces with the SnackbarProvider context, or use event emitters.

**Q: Can I stack snackbars vertically?**
A: Yes, the SnackbarProvider automatically manages multiple snackbars and stacks them appropriately.

**Q: How do I handle very long messages?**
A: Long messages automatically wrap. For very long content, consider using a Dialog instead.

**Q: Can I show snackbars on server-side rendering?**
A: Snackbars require DOM portal rendering, so they're only available on the client side.

**Q: How do I integrate with error boundaries?**
A: You can call `showSnackbar` from error boundary callbacks to display user-friendly error messages.

**Q: Can I customize the close button icon?**
A: The current implementation uses a built-in close icon, but you can override it with custom CSS or extend the component.

See [`Snackbar.test.tsx`](./Snackbar.test.tsx) for unit tests.

## Storybook

[Link to Storybook story] (Coming soon)

## FAQ

**Q: How do I control the snackbar visibility?**  
A: Use the `open` prop to control the snackbar visibility in your component.

**Q: How do I add an action button to the snackbar?**  
A: Use the `action` prop to pass in a React element (e.g., a button or link).

## Contribution

Contributions are welcome! Please follow the contribution guidelines.

## License

MIT
