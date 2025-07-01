# Switch Component

## Overview

The Switch component provides on/off toggle controls that follow Material Design 3 guidelines. Switches allow users to toggle a single option between two states - typically on and off, enabled and disabled, or active and inactive.

## Installation

```bash
npm install preact-aurora-ui@0.0.13
```

## Usage

### Basic Switch

```tsx
import { Switch } from 'preact-aurora-ui';

function BasicExample() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      label="Enable notifications"
      checked={enabled}
      onChange={(e) => setEnabled(e.currentTarget.checked)}
    />
  );
}
```

### Uncontrolled Switch

```tsx
function UncontrolledExample() {
  return (
    <Switch
      label="Dark mode"
      defaultChecked={true}
      onChange={(e) => console.log('Switch toggled:', e.currentTarget.checked)}
    />
  );
}
```

## API Reference

### Switch Props

| Prop             | Type                                  | Default     | Description                          |
| ---------------- | ------------------------------------- | ----------- | ------------------------------------ |
| `label`          | `string`                              | `undefined` | Switch label text                    |
| `checked`        | `boolean`                             | `undefined` | Controlled checked state             |
| `defaultChecked` | `boolean`                             | `false`     | Default checked state (uncontrolled) |
| `disabled`       | `boolean`                             | `false`     | Disabled state                       |
| `error`          | `boolean`                             | `false`     | Error state styling                  |
| `helperText`     | `string`                              | `undefined` | Helper text below switch             |
| `name`           | `string`                              | `undefined` | Name attribute for forms             |
| `value`          | `string`                              | `undefined` | Value attribute for forms            |
| `required`       | `boolean`                             | `false`     | Required field indicator             |
| `size`           | `'small' \| 'medium' \| 'large'`      | `'medium'`  | Size variant                         |
| `color`          | `'primary' \| 'secondary' \| 'error'` | `'primary'` | Color variant                        |
| `className`      | `string`                              | `''`        | Additional CSS classes               |
| `onChange`       | `(event: Event) => void`              | `undefined` | Change event handler                 |
| `onFocus`        | `(event: FocusEvent) => void`         | `undefined` | Focus event handler                  |
| `onBlur`         | `(event: FocusEvent) => void`         | `undefined` | Blur event handler                   |

## Examples

### Sizes and Colors

```tsx
// Different sizes
<Switch label="Small" size="small" />
<Switch label="Medium" size="medium" />
<Switch label="Large" size="large" />

// Different colors
<Switch label="Primary" color="primary" />
<Switch label="Secondary" color="secondary" />
<Switch label="Error" color="error" />
```

### States

```tsx
// Disabled state
<Switch label="Disabled" disabled />

// Error state with helper text
<Switch
  label="Sync data"
  error
  helperText="Network connection required"
/>

// Required field
<Switch label="Accept terms" required />
```

### With Helper Text

```tsx
<Switch
  label="Push notifications"
  helperText="Receive alerts on your device"
  checked={notifications}
  onChange={(e) => setNotifications(e.currentTarget.checked)}
/>
```

### Form Integration

```tsx
<form onSubmit={handleSubmit}>
  <Switch
    name="newsletter"
    label="Subscribe to newsletter"
    value="yes"
    checked={formData.newsletter}
    onChange={(e) =>
      setFormData({
        ...formData,
        newsletter: e.currentTarget.checked,
      })
    }
    helperText="Get weekly updates about new features"
  />

  <Switch
    name="marketing"
    label="Marketing emails"
    value="yes"
    required
    error={!!errors.marketing}
    helperText={errors.marketing || 'Required for promotional offers'}
    checked={formData.marketing}
    onChange={(e) =>
      setFormData({
        ...formData,
        marketing: e.currentTarget.checked,
      })
    }
  />

  <Button type="submit">Save Preferences</Button>
</form>
```

### Settings Panel

```tsx
function SettingsPanel() {
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    autoSave: false,
    analytics: true,
  });

  const handleToggle = (key: string) => (e: Event) => {
    const target = e.currentTarget as HTMLInputElement;
    setSettings((prev) => ({
      ...prev,
      [key]: target.checked,
    }));
  };

  return (
    <div className="settings-panel">
      <h3>App Settings</h3>

      <Switch
        label="Dark mode"
        checked={settings.darkMode}
        onChange={handleToggle('darkMode')}
        helperText="Use dark theme throughout the app"
      />

      <Switch
        label="Push notifications"
        checked={settings.notifications}
        onChange={handleToggle('notifications')}
        helperText="Receive important updates"
      />

      <Switch
        label="Auto-save"
        checked={settings.autoSave}
        onChange={handleToggle('autoSave')}
        helperText="Automatically save your work"
      />

      <Switch
        label="Analytics"
        checked={settings.analytics}
        onChange={handleToggle('analytics')}
        helperText="Help improve the app by sharing usage data"
      />
    </div>
  );
}
```

## Accessibility

### ARIA Support

The Switch component implements proper ARIA attributes:

- `role="switch"` indicates toggle functionality
- `aria-checked` reflects current state
- `aria-invalid` for error state
- `aria-describedby` links to helper text
- `aria-required` for required fields

### Keyboard Navigation

- **Tab/Shift+Tab**: Navigate to/from switch
- **Space**: Toggle switch state
- **Enter**: Toggle switch state (in some contexts)

### Screen Reader Support

- Switch role is announced
- Label text is read
- Current state (on/off) is communicated
- Helper text provides additional context
- Error states are announced

```tsx
// Accessibility example
<Switch
  label="Enable two-factor authentication"
  checked={twoFactor}
  onChange={setTwoFactor}
  required
  helperText="Secure your account with an additional verification step"
  aria-describedby="security-info"
/>
<div id="security-info">
  Two-factor authentication adds an extra layer of security to your account
</div>
```

## Theming

### CSS Custom Properties

Switch components support theming through CSS custom properties:

```css
.custom-switch {
  --switch-track-width: 52px;
  --switch-track-height: 32px;
  --switch-thumb-size: 20px;
  --switch-track-color: var(--md-sys-color-surface-variant);
  --switch-track-color-selected: var(--md-sys-color-primary);
  --switch-thumb-color: var(--md-sys-color-outline);
  --switch-thumb-color-selected: var(--md-sys-color-on-primary);
  --switch-focus-ring: 2px solid var(--md-sys-color-primary);
  --switch-disabled-opacity: 0.38;
}
```

### Material Design Tokens

Components use Material Design 3 color tokens:

- `--md-sys-color-primary` - Selected track color
- `--md-sys-color-surface-variant` - Unselected track color
- `--md-sys-color-outline` - Unselected thumb color
- `--md-sys-color-on-primary` - Selected thumb color
- `--md-sys-color-error` - Error state color

### Size Customization

```scss
// Custom sizes
.switch-compact {
  --switch-track-width: 40px;
  --switch-track-height: 24px;
  --switch-thumb-size: 16px;
}

.switch-large {
  --switch-track-width: 64px;
  --switch-track-height: 40px;
  --switch-thumb-size: 28px;
}
```

## Advanced Usage

### Controlled vs Uncontrolled

```tsx
// Controlled - you manage the state
<Switch
  checked={isEnabled}
  onChange={(e) => setIsEnabled(e.currentTarget.checked)}
/>

// Uncontrolled - component manages internal state
<Switch
  defaultChecked={true}
  onChange={(e) => console.log('Changed:', e.currentTarget.checked)}
/>
```

### Custom Styling

```tsx
<Switch
  label="Custom styled switch"
  className="custom-switch-theme"
  checked={value}
  onChange={setValue}
/>
```

```css
.custom-switch-theme {
  --switch-track-color: #e3f2fd;
  --switch-track-color-selected: #1976d2;
  --switch-thumb-color: #ffffff;
  --switch-thumb-color-selected: #ffffff;
}
```

### Switch Lists

```tsx
function FeatureToggles() {
  const [features, setFeatures] = useState({
    feature1: false,
    feature2: true,
    feature3: false,
  });

  const toggleFeature = (key: string) => (e: Event) => {
    const target = e.currentTarget as HTMLInputElement;
    setFeatures((prev) => ({
      ...prev,
      [key]: target.checked,
    }));
  };

  const featureList = [
    { key: 'feature1', label: 'Advanced Analytics', description: 'Detailed usage statistics' },
    { key: 'feature2', label: 'Beta Features', description: 'Try experimental functionality' },
    { key: 'feature3', label: 'Developer Mode', description: 'Additional debugging tools' },
  ];

  return (
    <div className="feature-toggles">
      {featureList.map((feature) => (
        <Switch
          key={feature.key}
          label={feature.label}
          helperText={feature.description}
          checked={features[feature.key]}
          onChange={toggleFeature(feature.key)}
        />
      ))}
    </div>
  );
}
```

## Testing

### Unit Tests

```tsx
import { render, screen } from '@testing-library/preact';
import { Switch } from 'preact-aurora-ui';
import userEvent from '@testing-library/user-event';

test('toggles switch state', async () => {
  const handleChange = vi.fn();

  render(<Switch label="Test switch" onChange={handleChange} />);

  const switchElement = screen.getByRole('switch');

  await userEvent.click(switchElement);

  expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
  expect(switchElement).toBeChecked();
});
```

### Integration Tests

```tsx
test('switch form integration', async () => {
  const handleSubmit = vi.fn();

  render(
    <form onSubmit={handleSubmit}>
      <Switch name="agree" label="I agree" required />
      <button type="submit">Submit</button>
    </form>,
  );

  await userEvent.click(screen.getByRole('switch'));
  await userEvent.click(screen.getByText('Submit'));

  expect(handleSubmit).toHaveBeenCalled();
});
```

### Accessibility Tests

```tsx
test('switch accessibility', () => {
  render(<Switch label="Accessible switch" helperText="Additional context" />);

  const switchElement = screen.getByRole('switch');

  expect(switchElement).toHaveAttribute('aria-checked', 'false');
  expect(switchElement).toHaveAccessibleName('Accessible switch');
  expect(switchElement).toHaveAccessibleDescription('Additional context');
});
```

## FAQ

### How do I handle switch validation in forms?

Use the `error` and `helperText` props for validation feedback:

```tsx
<Switch
  label="Accept terms"
  required
  error={!accepted && submitted}
  helperText={
    !accepted && submitted
      ? 'You must accept the terms'
      : 'Please read and accept our terms of service'
  }
/>
```

### Can I use switches for multi-option selection?

No, switches are for binary (on/off) choices. For multiple options, use Checkbox components or RadioGroup for exclusive selection.

### How do I create a switch group?

Create a custom wrapper component:

```tsx
function SwitchGroup({ label, children }) {
  return (
    <fieldset>
      <legend>{label}</legend>
      {children}
    </fieldset>
  );
}

<SwitchGroup label="Notification Settings">
  <Switch label="Email" />
  <Switch label="SMS" />
  <Switch label="Push" />
</SwitchGroup>;
```

### How do I animate switch transitions?

The component includes built-in transitions. Customize timing with CSS:

```css
.custom-switch {
  --switch-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### How do I handle switches in complex forms?

Use a form library like Formik or react-hook-form with the Switch component:

```tsx
// With react-hook-form (compatible with Preact)
<Switch
  label="Newsletter"
  {...register('newsletter')}
  error={!!errors.newsletter}
  helperText={errors.newsletter?.message}
/>
```
