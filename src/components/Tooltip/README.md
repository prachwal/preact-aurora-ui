# Tooltip

A sophisticated tooltip component with intelligent positioning, multiple triggers, and comprehensive accessibility support following Material Design 3 principles.

## Installation

```bash
npm install @preact-aurora-ui/components@0.0.13
```

## Basic Usage

```tsx
import { Tooltip } from '@preact-aurora-ui/components';

function App() {
  return (
    <Tooltip content="This is helpful information">
      <button>Hover me</button>
    </Tooltip>
  );
}
```

## API Reference

### Props

| Prop             | Type                                 | Default         | Description                              |
| ---------------- | ------------------------------------ | --------------- | ---------------------------------------- |
| `content`        | `ComponentChildren`                  | -               | Tooltip content (required)               |
| `children`       | `ComponentChildren`                  | -               | Element that triggers tooltip (required) |
| `position`       | `TooltipPosition`                    | `'top'`         | Tooltip position relative to trigger     |
| `offset`         | `number`                             | `8`             | Distance from trigger element (px)       |
| `showArrow`      | `boolean`                            | `true`          | Show pointing arrow                      |
| `trigger`        | `TooltipTrigger \| TooltipTrigger[]` | `'hover'`       | How tooltip is triggered                 |
| `enterDelay`     | `number`                             | `500`           | Delay before showing (ms)                |
| `leaveDelay`     | `number`                             | `200`           | Delay before hiding (ms)                 |
| `variant`        | `'standard' \| 'rich'`               | `'standard'`    | Visual variant                           |
| `maxWidth`       | `number \| string`                   | -               | Maximum tooltip width                    |
| `open`           | `boolean`                            | -               | Controlled open state                    |
| `disabled`       | `boolean`                            | `false`         | Disable tooltip                          |
| `onOpenChange`   | `(open: boolean) => void`            | -               | Open state change callback               |
| `className`      | `string`                             | -               | Additional CSS classes                   |
| `style`          | `JSX.CSSProperties`                  | -               | Inline styles                            |
| `portal`         | `boolean`                            | `true`          | Render in portal                         |
| `portalTarget`   | `Element \| string`                  | `document.body` | Portal container                         |
| `aria-label`     | `string`                             | -               | Accessibility label                      |
| `touchHoldDelay` | `number`                             | `700`           | Touch hold delay (ms)                    |

### Position Options

```tsx
type TooltipPosition =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';
```

### Trigger Options

```tsx
type TooltipTrigger = 'hover' | 'focus' | 'click' | 'manual';
```

## Position Examples

### Basic Positions

```tsx
// Top (default)
<Tooltip content="Top tooltip" position="top">
  <button>Top</button>
</Tooltip>

// Bottom
<Tooltip content="Bottom tooltip" position="bottom">
  <button>Bottom</button>
</Tooltip>

// Left and Right
<Tooltip content="Left tooltip" position="left">
  <button>Left</button>
</Tooltip>

<Tooltip content="Right tooltip" position="right">
  <button>Right</button>
</Tooltip>
```

### Aligned Positions

```tsx
// Top with start/end alignment
<Tooltip content="Top start" position="top-start">
  <button>Top Start</button>
</Tooltip>

<Tooltip content="Top end" position="top-end">
  <button>Top End</button>
</Tooltip>

// Bottom with alignment
<Tooltip content="Bottom start" position="bottom-start">
  <button>Bottom Start</button>
</Tooltip>

// Left/Right with alignment
<Tooltip content="Left start" position="left-start">
  <button>Left Start</button>
</Tooltip>
```

## Trigger Types

### Hover Trigger (Default)

```tsx
<Tooltip content="Appears on hover" trigger="hover">
  <button>Hover me</button>
</Tooltip>
```

### Focus Trigger

```tsx
<Tooltip content="Appears on focus" trigger="focus">
  <input placeholder="Focus me" />
</Tooltip>
```

### Click Trigger

```tsx
<Tooltip content="Appears on click" trigger="click">
  <button>Click me</button>
</Tooltip>
```

### Multiple Triggers

```tsx
<Tooltip content="Hover or focus" trigger={['hover', 'focus']}>
  <button>Hover or focus me</button>
</Tooltip>
```

### Manual Control

```tsx
import { useState } from 'preact/hooks';

function ManualTooltip() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(!open)}>Toggle Tooltip</button>

      <Tooltip content="Manually controlled" trigger="manual" open={open} onOpenChange={setOpen}>
        <span>Target element</span>
      </Tooltip>
    </>
  );
}
```

## Advanced Usage

### Rich Content Tooltip

```tsx
<Tooltip
  variant="rich"
  content={
    <div>
      <h4>Rich Tooltip</h4>
      <p>This tooltip contains formatted content.</p>
      <button>Action</button>
    </div>
  }
  maxWidth={300}
  trigger="click"
>
  <button>Rich Content</button>
</Tooltip>
```

### Delayed Tooltips

```tsx
// Quick tooltip
<Tooltip
  content="Quick tooltip"
  enterDelay={100}
  leaveDelay={0}
>
  <button>Quick</button>
</Tooltip>

// Slow tooltip
<Tooltip
  content="Slow tooltip"
  enterDelay={1000}
  leaveDelay={500}
>
  <button>Slow</button>
</Tooltip>
```

### Custom Styling

```tsx
<Tooltip
  content="Custom styled tooltip"
  className="custom-tooltip"
  style={{
    backgroundColor: '#2d3748',
    color: 'white',
    fontSize: '14px',
  }}
>
  <button>Custom Style</button>
</Tooltip>
```

### No Arrow

```tsx
<Tooltip content="No arrow tooltip" showArrow={false}>
  <button>No Arrow</button>
</Tooltip>
```

### Custom Portal

```tsx
// Render in specific container
<div id="tooltip-container"></div>

<Tooltip
  content="Custom portal"
  portalTarget="#tooltip-container"
>
  <button>Custom Portal</button>
</Tooltip>
```

## Advanced Patterns

### Conditional Tooltips

```tsx
function ConditionalTooltip({ showHelp, children }) {
  return (
    <Tooltip content="Help information" disabled={!showHelp}>
      {children}
    </Tooltip>
  );
}
```

### Form Field Tooltips

```tsx
import { TextField, Tooltip } from '@preact-aurora-ui/components';

function FormWithTooltips() {
  return (
    <form>
      <Tooltip content="Enter your full legal name" position="right" trigger={['focus', 'hover']}>
        <TextField label="Full Name" placeholder="John Doe" />
      </Tooltip>

      <Tooltip
        content="Password must be at least 8 characters"
        position="right"
        variant="rich"
        maxWidth={250}
      >
        <TextField type="password" label="Password" />
      </Tooltip>
    </form>
  );
}
```

### Interactive Tooltips

```tsx
function InteractiveTooltip() {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip
      content={
        <div>
          <p>Interactive content</p>
          <button onClick={() => console.log('Action!')}>Click me</button>
          <button onClick={() => setOpen(false)}>Close</button>
        </div>
      }
      trigger="click"
      open={open}
      onOpenChange={setOpen}
      variant="rich"
    >
      <button>Interactive Tooltip</button>
    </Tooltip>
  );
}
```

### Tooltip with useTooltip Hook

```tsx
import { useTooltip } from '@preact-aurora-ui/components';

function CustomTooltip() {
  const { open, triggerProps, contentProps } = useTooltip({
    enterDelay: 300,
    leaveDelay: 100,
    trigger: 'hover',
  });

  return (
    <>
      <button {...triggerProps}>Custom Implementation</button>

      {open && (
        <div
          {...contentProps}
          style={{
            position: 'absolute',
            background: 'black',
            color: 'white',
            padding: '8px',
            borderRadius: '4px',
          }}
        >
          Custom tooltip content
        </div>
      )}
    </>
  );
}
```

## Accessibility

The Tooltip component provides comprehensive accessibility support:

- **Screen Readers**: Uses `role="tooltip"` and proper ARIA attributes
- **Keyboard Navigation**: Supports Tab, Enter, Escape keys
- **Focus Management**: Maintains proper focus behavior
- **High Contrast**: Compatible with high contrast modes
- **Reduced Motion**: Respects motion preferences

### ARIA Support

```tsx
// Automatic ARIA attributes
<Tooltip content="Accessible tooltip">
  <button aria-describedby="tooltip-id">
    Button with tooltip
  </button>
</Tooltip>

// Custom ARIA label
<Tooltip
  content="Help information"
  aria-label="Additional context for this field"
>
  <input type="text" />
</Tooltip>
```

### Keyboard Navigation

- `Tab`: Focus trigger element
- `Enter`/`Space`: Activate click triggers
- `Escape`: Close open tooltips
- Focus automatically triggers focus-based tooltips

## Theming

The component supports Material Design 3 theming:

```css
.tooltip {
  --tooltip-bg: var(--md-sys-color-inverse-surface);
  --tooltip-color: var(--md-sys-color-inverse-on-surface);
  --tooltip-border-radius: var(--md-sys-shape-corner-extra-small);
  --tooltip-elevation: var(--md-sys-elevation-2);
  --tooltip-arrow-size: 6px;
  --tooltip-max-width: 320px;
  --tooltip-padding: 0.5rem 0.75rem;
  --tooltip-font-size: 0.875rem;
}

/* Rich variant */
.tooltip--rich {
  --tooltip-bg: var(--md-sys-color-surface-container);
  --tooltip-color: var(--md-sys-color-on-surface);
  --tooltip-padding: 1rem;
  --tooltip-max-width: 400px;
}
```

### Custom Theming

```css
.custom-tooltip {
  --tooltip-bg: #1a202c;
  --tooltip-color: #e2e8f0;
  --tooltip-border-radius: 8px;
  --tooltip-font-size: 0.875rem;
}
```

## Testing

### Unit Tests

```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { Tooltip } from '@preact-aurora-ui/components';

test('shows tooltip on hover', async () => {
  const user = userEvent.setup();

  render(
    <Tooltip content="Tooltip text">
      <button>Trigger</button>
    </Tooltip>,
  );

  const button = screen.getByRole('button');
  await user.hover(button);

  await waitFor(() => {
    expect(screen.getByText('Tooltip text')).toBeInTheDocument();
  });
});

test('hides tooltip on mouse leave', async () => {
  const user = userEvent.setup();

  render(
    <Tooltip content="Tooltip text" leaveDelay={0}>
      <button>Trigger</button>
    </Tooltip>,
  );

  const button = screen.getByRole('button');
  await user.hover(button);
  await user.unhover(button);

  await waitFor(() => {
    expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument();
  });
});

test('handles click trigger', async () => {
  const user = userEvent.setup();

  render(
    <Tooltip content="Tooltip text" trigger="click">
      <button>Trigger</button>
    </Tooltip>,
  );

  await user.click(screen.getByRole('button'));

  await waitFor(() => {
    expect(screen.getByText('Tooltip text')).toBeInTheDocument();
  });
});
```

### Accessibility Testing

```tsx
import { axe, toHaveNoViolations } from 'jest-axe';

test('should not have accessibility violations', async () => {
  const { container } = render(
    <Tooltip content="Accessible tooltip">
      <button>Accessible button</button>
    </Tooltip>,
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## FAQ

**Q: Why doesn't my tooltip show on mobile?**
A: Mobile devices don't have hover states. Use `trigger={['hover', 'focus']}` or `trigger="click"` for mobile support.

**Q: How do I prevent tooltip from going off-screen?**
A: The component automatically repositions tooltips to stay within viewport bounds.

**Q: Can I disable tooltips conditionally?**
A: Yes, use the `disabled` prop to conditionally disable tooltips.

**Q: How do I style the arrow?**
A: The arrow inherits the tooltip's background color. Use CSS custom properties to customize it.

**Q: Can I make tooltips stay open longer?**
A: Yes, adjust `leaveDelay` or use `trigger="click"` for persistent tooltips.

**Q: How do I handle tooltips in scrollable containers?**
A: The component automatically handles scroll events and repositions tooltips.

**Q: Can I use HTML content in tooltips?**
A: Yes, pass JSX elements to the `content` prop. Use `variant="rich"` for complex content.

**Q: How do I test tooltips that appear on hover?**
A: Use `@testing-library/user-event` with `user.hover()` and `user.unhover()` methods.

## Storybook

[Link to Storybook story] (Coming soon)

## FAQ

**Q: How do I change the tooltip placement?**  
A: Use the `placement` prop.

**Q: How do I adjust the delay before the tooltip appears?**  
A: Use the `delay` prop.

## Contribution

Contributions are welcome! Please follow the contribution guidelines.

## License

MIT
