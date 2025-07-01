# Dialog

A comprehensive modal dialog component with advanced features like drag & drop, resizing, focus management, and multiple variants following Material Design 3 principles.

## Installation

```bash
npm install @preact-aurora-ui/components@0.0.13
```

## Basic Usage

```tsx
import { Dialog, useDialog } from '@preact-aurora-ui/components';

function App() {
  const { isOpen, open, close } = useDialog();

  return (
    <>
      <button onClick={open}>Open Dialog</button>
      <Dialog open={isOpen} onClose={close} title="Simple Dialog">
        <p>This is a basic dialog with some content.</p>
      </Dialog>
    </>
  );
}
```

## API Reference

### Dialog Props

| Prop                  | Type                                                   | Default      | Description                              |
| --------------------- | ------------------------------------------------------ | ------------ | ---------------------------------------- |
| `open`                | `boolean`                                              | -            | Whether dialog is visible (required)     |
| `onClose`             | `() => void`                                           | -            | Close callback function                  |
| `type`                | `'basic' \| 'alert' \| 'confirmation' \| 'fullscreen'` | `'basic'`    | Dialog type/behavior                     |
| `size`                | `'small' \| 'medium' \| 'large' \| 'fullscreen'`       | `'medium'`   | Dialog size                              |
| `title`               | `string`                                               | -            | Dialog title                             |
| `subtitle`            | `string`                                               | -            | Dialog subtitle                          |
| `children`            | `ComponentChildren`                                    | -            | Dialog content                           |
| `actions`             | `DialogAction[]`                                       | -            | Action buttons array                     |
| `variant`             | `'elevated' \| 'outlined'`                             | `'elevated'` | Visual variant                           |
| `modal`               | `boolean`                                              | `true`       | Modal behavior with overlay              |
| `portal`              | `boolean \| string`                                    | `true`       | Render in portal (body or custom target) |
| `draggable`           | `boolean`                                              | `false`      | Enable drag & drop                       |
| `resizable`           | `boolean`                                              | `false`      | Enable resizing                          |
| `closeOnOverlayClick` | `boolean`                                              | `true`       | Close when clicking overlay              |
| `closeOnEscape`       | `boolean`                                              | `true`       | Close with Escape key                    |
| `showCloseButton`     | `boolean`                                              | `true`       | Show X close button                      |
| `icon`                | `ComponentChildren`                                    | -            | Custom icon for header                   |
| `initialPosition`     | `{ x: number; y: number }`                             | -            | Initial position for draggable           |
| `aria-label`          | `string`                                               | -            | Accessibility label                      |
| `aria-labelledby`     | `string`                                               | -            | Reference to title element               |
| `aria-describedby`    | `string`                                               | -            | Reference to description                 |
| `className`           | `string`                                               | -            | Additional CSS classes                   |

### DialogAction Interface

```tsx
interface DialogAction {
  label: string;
  onClick: () => void;
  variant?: 'text' | 'outlined' | 'filled';
  destructive?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
}
```

### useDialog Hook

```tsx
const { isOpen, open, close, toggle } = useDialog({
  initialOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
});
```

## Dialog Types

### Basic Dialog

```tsx
<Dialog
  open={isOpen}
  onClose={close}
  title="Basic Dialog"
  actions={[
    { label: 'Cancel', onClick: close, variant: 'outlined' },
    { label: 'OK', onClick: handleSave, variant: 'filled' },
  ]}
>
  Basic content with actions.
</Dialog>
```

### Alert Dialog

```tsx
<Dialog
  type="alert"
  open={isOpen}
  onClose={close}
  title="Warning"
  icon="⚠️"
  actions={[{ label: 'OK', onClick: close, variant: 'filled', autoFocus: true }]}
>
  This action cannot be undone.
</Dialog>
```

### Confirmation Dialog

```tsx
<Dialog
  type="confirmation"
  open={isOpen}
  onClose={close}
  title="Delete Item?"
  actions={[
    { label: 'Cancel', onClick: close, variant: 'outlined' },
    {
      label: 'Delete',
      onClick: handleDelete,
      variant: 'filled',
      destructive: true,
    },
  ]}
>
  Are you sure you want to delete this item?
</Dialog>
```

### Fullscreen Dialog

```tsx
<Dialog
  type="fullscreen"
  open={isOpen}
  onClose={close}
  title="Fullscreen Form"
  actions={[
    { label: 'Cancel', onClick: close, variant: 'outlined' },
    { label: 'Save', onClick: handleSave, variant: 'filled' },
  ]}
>
  <LargeForm />
</Dialog>
```

## Advanced Features

### Draggable Dialog

```tsx
<Dialog
  open={isOpen}
  onClose={close}
  title="Draggable Dialog"
  draggable={true}
  initialPosition={{ x: 100, y: 100 }}
>
  You can drag this dialog around!
</Dialog>
```

### Resizable Dialog

```tsx
<Dialog open={isOpen} onClose={close} title="Resizable Dialog" resizable={true} size="medium">
  Drag the corner to resize this dialog.
</Dialog>
```

### Non-Modal Dialog

```tsx
<Dialog open={isOpen} onClose={close} title="Non-Modal Dialog" modal={false} draggable={true}>
  This dialog doesn't block interaction with the page.
</Dialog>
```

### Custom Portal Target

```tsx
<Dialog open={isOpen} onClose={close} title="Custom Portal" portal="custom-dialog-container">
  Rendered in custom container.
</Dialog>
```

## Advanced Usage

### Form Dialog with Validation

```tsx
import { useState } from 'preact/hooks';
import { TextField, Dialog, useDialog } from '@preact-aurora-ui/components';

function FormDialog() {
  const { isOpen, open, close } = useDialog();
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});

  const handleSave = () => {
    // Validate form
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Save data
      console.log('Saving:', formData);
      close();
    }
  };

  return (
    <>
      <button onClick={open}>Edit User</button>
      <Dialog
        open={isOpen}
        onClose={close}
        title="Edit User"
        size="medium"
        actions={[
          { label: 'Cancel', onClick: close, variant: 'outlined' },
          { label: 'Save', onClick: handleSave, variant: 'filled' },
        ]}
      >
        <TextField
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
        />
        <TextField
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
        />
      </Dialog>
    </>
  );
}
```

### Multi-Step Dialog

```tsx
function MultiStepDialog() {
  const { isOpen, open, close } = useDialog();
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const getActions = () => {
    const actions = [];

    if (step > 1) {
      actions.push({ label: 'Back', onClick: prevStep, variant: 'outlined' });
    }

    actions.push({ label: 'Cancel', onClick: close, variant: 'text' });

    if (step < totalSteps) {
      actions.push({ label: 'Next', onClick: nextStep, variant: 'filled' });
    } else {
      actions.push({ label: 'Finish', onClick: close, variant: 'filled' });
    }

    return actions;
  };

  return (
    <>
      <button onClick={open}>Start Wizard</button>
      <Dialog
        open={isOpen}
        onClose={close}
        title={`Step ${step} of ${totalSteps}`}
        size="large"
        actions={getActions()}
      >
        {step === 1 && <div>Step 1 content</div>}
        {step === 2 && <div>Step 2 content</div>}
        {step === 3 && <div>Step 3 content</div>}
      </Dialog>
    </>
  );
}
```

### Async Actions

```tsx
function AsyncDialog() {
  const { isOpen, open, close } = useDialog();
  const [loading, setLoading] = useState(false);

  const handleAsyncAction = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      close();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={close}
      title="Async Operation"
      actions={[
        {
          label: 'Cancel',
          onClick: close,
          variant: 'outlined',
          disabled: loading,
        },
        {
          label: loading ? 'Processing...' : 'Submit',
          onClick: handleAsyncAction,
          variant: 'filled',
          disabled: loading,
        },
      ]}
    >
      {loading ? 'Processing your request...' : 'Click submit to start.'}
    </Dialog>
  );
}
```

## Accessibility

The Dialog component provides comprehensive accessibility support:

- **Focus Management**: Automatic focus trapping and restoration
- **Keyboard Navigation**: Full keyboard support including Tab, Shift+Tab, Enter, Escape
- **Screen Readers**: Proper ARIA roles, labels, and descriptions
- **High Contrast**: Compatible with high contrast modes
- **Reduced Motion**: Respects user preferences for reduced motion

### ARIA Attributes

```tsx
<Dialog
  open={isOpen}
  onClose={close}
  aria-label="User preferences dialog"
  aria-describedby="dialog-description"
>
  <div id="dialog-description">Configure your account settings and preferences.</div>
</Dialog>
```

### Keyboard Support

- `Tab` / `Shift+Tab`: Navigate through dialog elements
- `Enter`: Activate focused button
- `Escape`: Close dialog (if enabled)
- `Space`: Activate focused button

## Theming

The component supports Material Design 3 theming:

```css
.dialog {
  --dialog-bg: var(--md-sys-color-surface);
  --dialog-color: var(--md-sys-color-on-surface);
  --dialog-border-radius: var(--md-sys-shape-corner-large);
  --dialog-shadow: var(--md-sys-elevation-3);
  --dialog-overlay-bg: rgba(0, 0, 0, 0.32);
  --dialog-max-width: 560px;
  --dialog-padding: 1.5rem;
}
```

### Custom Styling

```css
.custom-dialog {
  --dialog-bg: var(--custom-surface);
  --dialog-border-radius: 16px;
  --dialog-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}
```

## Testing

### Unit Tests

```tsx
import { render, screen, fireEvent } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { Dialog } from '@preact-aurora-ui/components';

test('opens and closes dialog', async () => {
  const user = userEvent.setup();
  const handleClose = vi.fn();

  render(
    <Dialog open={true} onClose={handleClose} title="Test">
      Content
    </Dialog>,
  );

  expect(screen.getByRole('dialog')).toBeInTheDocument();

  // Close with escape key
  await user.keyboard('{Escape}');
  expect(handleClose).toHaveBeenCalled();
});

test('handles action buttons', async () => {
  const user = userEvent.setup();
  const handleAction = vi.fn();

  render(
    <Dialog
      open={true}
      onClose={() => {}}
      title="Test"
      actions={[{ label: 'Action', onClick: handleAction, variant: 'filled' }]}
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
  const { container } = render(
    <Dialog open={true} onClose={() => {}} title="Accessible Dialog">
      Dialog content
    </Dialog>,
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## FAQ

**Q: How do I prevent the dialog from closing?**
A: Set `closeOnOverlayClick={false}` and `closeOnEscape={false}`, and handle closing manually in your actions.

**Q: Can I customize the dialog size?**
A: Yes, use the `size` prop or add custom CSS classes for specific dimensions.

**Q: How do I handle form submission in dialogs?**
A: Use action buttons with form validation logic, or wrap your form in the dialog content.

**Q: Can I stack multiple dialogs?**
A: Yes, but be careful with z-index and focus management. Consider using a dialog queue for better UX.

**Q: How do I make a dialog persistent?**
A: Set `closeOnOverlayClick={false}`, `closeOnEscape={false}`, and `showCloseButton={false}`.

**Q: Can I animate dialog transitions?**
A: The component includes CSS transitions. For custom animations, you can override the CSS classes.

**Q: How do I handle long content?**
A: The dialog content area is scrollable by default. You can also use a larger size or fullscreen type.

**Q: Is the component mobile-friendly?**
A: Yes, dialogs automatically adapt to smaller screens and can switch to fullscreen on mobile.

## Storybook

[Link to Storybook story](https://your-storybook-url.com/dialog)

## FAQ

**Q: How do I control the dialog visibility?**  
A: Use the `open` prop to control the dialog visibility in your component.

**Q: How do I add action buttons to the dialog?**  
A: Add buttons within the `children` of the `Dialog` component.

## Contribution

Contributions are welcome! Please follow the contribution guidelines in the repository.

## License

MIT
