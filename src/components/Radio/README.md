# Radio & RadioGroup Components

## Overview

The Radio component provides single-option selection controls that follow Material Design 3 guidelines. Radio buttons allow users to select one option from a set of mutually exclusive choices. Use RadioGroup to manage multiple radio options together.

## Installation

```bash
npm install preact-aurora-ui@0.0.13
```

## Usage

### Basic Radio Button

```tsx
import { Radio } from 'preact-aurora-ui';

function BasicExample() {
  const [selected, setSelected] = useState('');

  return (
    <Radio
      label="Option 1"
      value="option1"
      name="example"
      checked={selected === 'option1'}
      onChange={(e) => setSelected(e.currentTarget.value)}
    />
  );
}
```

### Radio Group

```tsx
import { Radio, RadioGroup } from 'preact-aurora-ui';

function GroupExample() {
  const [value, setValue] = useState('');

  return (
    <RadioGroup label="Select an option" value={value} onChange={(newValue) => setValue(newValue)}>
      <Radio label="Option 1" value="option1" />
      <Radio label="Option 2" value="option2" />
      <Radio label="Option 3" value="option3" />
    </RadioGroup>
  );
}
```

## API Reference

### Radio Props

| Prop        | Type                                  | Default     | Description                 |
| ----------- | ------------------------------------- | ----------- | --------------------------- |
| `label`     | `string`                              | `undefined` | Radio button label text     |
| `value`     | `string`                              | _required_  | Value for this radio option |
| `checked`   | `boolean`                             | `false`     | Whether radio is selected   |
| `disabled`  | `boolean`                             | `false`     | Disabled state              |
| `error`     | `boolean`                             | `false`     | Error state styling         |
| `name`      | `string`                              | `undefined` | Name attribute for grouping |
| `required`  | `boolean`                             | `false`     | Required field indicator    |
| `size`      | `'small' \| 'medium' \| 'large'`      | `'medium'`  | Size variant                |
| `color`     | `'primary' \| 'secondary' \| 'error'` | `'primary'` | Color variant               |
| `className` | `string`                              | `''`        | Additional CSS classes      |
| `onChange`  | `(event: Event) => void`              | `undefined` | Change event handler        |
| `onFocus`   | `(event: FocusEvent) => void`         | `undefined` | Focus event handler         |
| `onBlur`    | `(event: FocusEvent) => void`         | `undefined` | Blur event handler          |

### RadioGroup Props

| Prop           | Type                                    | Default          | Description                           |
| -------------- | --------------------------------------- | ---------------- | ------------------------------------- |
| `value`        | `string`                                | `undefined`      | Currently selected value (controlled) |
| `defaultValue` | `string`                                | `undefined`      | Default value (uncontrolled)          |
| `name`         | `string`                                | _auto-generated_ | Name for all radio buttons            |
| `disabled`     | `boolean`                               | `false`          | Disable entire group                  |
| `error`        | `boolean`                               | `false`          | Error state for group                 |
| `helperText`   | `string`                                | `undefined`      | Helper text below group               |
| `label`        | `string`                                | `undefined`      | Group label                           |
| `required`     | `boolean`                               | `false`          | Required field indicator              |
| `orientation`  | `'horizontal' \| 'vertical'`            | `'vertical'`     | Layout direction                      |
| `size`         | `'small' \| 'medium' \| 'large'`        | `'medium'`       | Size for all radios                   |
| `color`        | `'primary' \| 'secondary' \| 'error'`   | `'primary'`      | Color for all radios                  |
| `className`    | `string`                                | `''`             | Additional CSS classes                |
| `children`     | `ComponentChildren`                     | `undefined`      | Radio components                      |
| `onChange`     | `(value: string, event: Event) => void` | `undefined`      | Selection change handler              |

## Examples

### Sizes and Colors

```tsx
// Different sizes
<Radio label="Small" value="s" size="small" />
<Radio label="Medium" value="m" size="medium" />
<Radio label="Large" value="l" size="large" />

// Different colors
<Radio label="Primary" value="p" color="primary" />
<Radio label="Secondary" value="s" color="secondary" />
<Radio label="Error" value="e" color="error" />
```

### States

```tsx
// Disabled state
<Radio label="Disabled" value="disabled" disabled />

// Error state
<Radio label="Error" value="error" error />

// Required field
<Radio label="Required" value="required" required />
```

### Horizontal Radio Group

```tsx
<RadioGroup label="Layout options" orientation="horizontal" value={layout} onChange={setLayout}>
  <Radio label="Grid" value="grid" />
  <Radio label="List" value="list" />
  <Radio label="Cards" value="cards" />
</RadioGroup>
```

### With Helper Text

```tsx
<RadioGroup
  label="Notification preferences"
  helperText="Choose how you'd like to receive updates"
  value={preference}
  onChange={setPreference}
>
  <Radio label="Email only" value="email" />
  <Radio label="SMS only" value="sms" />
  <Radio label="Both email and SMS" value="both" />
  <Radio label="No notifications" value="none" />
</RadioGroup>
```

### Form Integration

```tsx
<form onSubmit={handleSubmit}>
  <RadioGroup
    name="subscription"
    label="Choose your plan"
    required
    value={plan}
    onChange={setPlan}
    error={!!errors.plan}
    helperText={errors.plan || 'Select a subscription plan'}
  >
    <Radio label="Free - $0/month" value="free" />
    <Radio label="Pro - $10/month" value="pro" />
    <Radio label="Enterprise - $50/month" value="enterprise" />
  </RadioGroup>

  <Button type="submit">Subscribe</Button>
</form>
```

## Accessibility

### ARIA Support

The Radio component implements proper ARIA attributes:

- `role="radio"` on individual radio inputs
- `role="radiogroup"` on RadioGroup container
- `aria-checked` reflects selection state
- `aria-invalid` for error state
- `aria-required` for required fields
- `aria-labelledby` for group labels

### Keyboard Navigation

- **Tab/Shift+Tab**: Navigate between radio groups
- **Arrow Keys**: Navigate within radio group
- **Space**: Select focused radio button

### Screen Reader Support

- Group labels are announced
- Individual radio labels are read
- Selection state is communicated
- Error states are announced
- Required fields are indicated

```tsx
// Accessibility example
<RadioGroup
  label="Payment method"
  required
  value={payment}
  onChange={setPayment}
  aria-describedby="payment-help"
>
  <Radio label="Credit card" value="card" />
  <Radio label="PayPal" value="paypal" />
  <Radio label="Bank transfer" value="bank" />
</RadioGroup>
<div id="payment-help">
  Choose your preferred payment method for this order
</div>
```

## Theming

### CSS Custom Properties

Radio components support theming through CSS custom properties:

```css
.custom-radio {
  --radio-size: 20px;
  --radio-border-width: 2px;
  --radio-border-color: var(--md-sys-color-outline);
  --radio-selected-color: var(--md-sys-color-primary);
  --radio-dot-size: 10px;
  --radio-focus-ring: 2px solid var(--md-sys-color-primary);
  --radio-disabled-opacity: 0.38;
}
```

### Material Design Tokens

Components use Material Design 3 color tokens:

- `--md-sys-color-primary` - Selected state
- `--md-sys-color-outline` - Border color
- `--md-sys-color-outline-variant` - Disabled border
- `--md-sys-color-on-surface` - Label text
- `--md-sys-color-error` - Error state

### Size Customization

```scss
// Custom sizes
.radio-extra-small {
  --radio-size: 16px;
  --radio-dot-size: 6px;
}

.radio-extra-large {
  --radio-size: 28px;
  --radio-dot-size: 14px;
}
```

## Advanced Usage

### useRadioGroup Hook

For custom implementations, use the `useRadioGroup` hook:

```tsx
import { useRadioGroup } from 'preact-aurora-ui';

function CustomRadioGroup() {
  const { value, getRadioProps } = useRadioGroup({
    defaultValue: 'option1',
    onChange: (value, event) => {
      console.log('Selected:', value);
    },
  });

  return (
    <div>
      <input type="radio" {...getRadioProps('option1')} />
      <input type="radio" {...getRadioProps('option2')} />
      <input type="radio" {...getRadioProps('option3')} />
    </div>
  );
}
```

### Controlled vs Uncontrolled

```tsx
// Controlled
<RadioGroup value={value} onChange={setValue}>
  <Radio label="Option 1" value="1" />
  <Radio label="Option 2" value="2" />
</RadioGroup>

// Uncontrolled
<RadioGroup defaultValue="1">
  <Radio label="Option 1" value="1" />
  <Radio label="Option 2" value="2" />
</RadioGroup>
```

### Dynamic Options

```tsx
function DynamicRadio() {
  const options = [
    { value: 'small', label: 'Small (S)' },
    { value: 'medium', label: 'Medium (M)' },
    { value: 'large', label: 'Large (L)' },
    { value: 'xl', label: 'Extra Large (XL)' },
  ];

  return (
    <RadioGroup label="Size" value={size} onChange={setSize}>
      {options.map((option) => (
        <Radio key={option.value} label={option.label} value={option.value} />
      ))}
    </RadioGroup>
  );
}
```

## Testing

### Unit Tests

```tsx
import { render, screen } from '@testing-library/preact';
import { Radio, RadioGroup } from 'preact-aurora-ui';
import userEvent from '@testing-library/user-event';

test('selects radio option', async () => {
  const handleChange = vi.fn();

  render(
    <RadioGroup onChange={handleChange}>
      <Radio label="Option 1" value="1" />
      <Radio label="Option 2" value="2" />
    </RadioGroup>,
  );

  await userEvent.click(screen.getByLabelText('Option 1'));
  expect(handleChange).toHaveBeenCalledWith('1', expect.any(Object));
});
```

### Integration Tests

```tsx
test('radio group form integration', async () => {
  const handleSubmit = vi.fn();

  render(
    <form onSubmit={handleSubmit}>
      <RadioGroup name="choice" required>
        <Radio label="Yes" value="yes" />
        <Radio label="No" value="no" />
      </RadioGroup>
      <button type="submit">Submit</button>
    </form>,
  );

  await userEvent.click(screen.getByLabelText('Yes'));
  await userEvent.click(screen.getByText('Submit'));

  expect(handleSubmit).toHaveBeenCalled();
});
```

## FAQ

### How do I handle radio button validation?

Use the `error` prop and `helperText` for validation feedback:

```tsx
<RadioGroup error={!selectedValue} helperText={!selectedValue ? 'Please select an option' : ''}>
  <Radio label="Option 1" value="1" />
  <Radio label="Option 2" value="2" />
</RadioGroup>
```

### Can I use radio buttons without RadioGroup?

Yes, but you'll need to manage the `name` attribute and state manually:

```tsx
<Radio
  name="manual-group"
  label="Option 1"
  value="1"
  checked={value === '1'}
  onChange={(e) => setValue(e.currentTarget.value)}
/>
```

### How do I style individual radio buttons differently?

Pass custom classes to individual Radio components:

```tsx
<RadioGroup>
  <Radio label="Basic" value="basic" />
  <Radio label="Premium" value="premium" className="premium-option" />
</RadioGroup>
```

### How do I make radio groups responsive?

Use orientation="horizontal" with CSS for responsive behavior:

```tsx
<RadioGroup orientation="horizontal" className="responsive-radio-group">
  <Radio label="Option 1" value="1" />
  <Radio label="Option 2" value="2" />
</RadioGroup>
```

```css
@media (max-width: 768px) {
  .responsive-radio-group {
    --radio-group-direction: column;
  }
}
```
