# Slider Component

## Overview

The Slider component provides continuous and discrete value selection controls that follow Material Design 3 guidelines. Sliders allow users to select a single value from a range by dragging a thumb along a track.

## Installation

```bash
npm install preact-aurora-ui@0.0.13
```

## Usage

### Basic Slider

```tsx
import { Slider } from 'preact-aurora-ui';

function BasicExample() {
  const [volume, setVolume] = useState(50);

  return <Slider label="Volume" value={volume} onChange={setVolume} min={0} max={100} showValue />;
}
```

### Discrete Slider

```tsx
function DiscreteExample() {
  const [rating, setRating] = useState(3);

  return (
    <Slider
      label="Rating"
      value={rating}
      onChange={setRating}
      min={1}
      max={5}
      step={1}
      variant="discrete"
      showTicks
      showValue
    />
  );
}
```

### Vertical Slider

```tsx
function VerticalExample() {
  return (
    <div style={{ height: '200px' }}>
      <Slider
        label="Brightness"
        value={brightness}
        onChange={setBrightness}
        orientation="vertical"
        min={0}
        max={100}
      />
    </div>
  );
}
```

## API Reference

### Slider Props

| Prop             | Type                                            | Default               | Description                         |
| ---------------- | ----------------------------------------------- | --------------------- | ----------------------------------- |
| `value`          | `number`                                        | `undefined`           | Current value (controlled)          |
| `defaultValue`   | `number`                                        | `0`                   | Default value (uncontrolled)        |
| `min`            | `number`                                        | `0`                   | Minimum value                       |
| `max`            | `number`                                        | `100`                 | Maximum value                       |
| `step`           | `number`                                        | `1`                   | Step increment for discrete sliders |
| `disabled`       | `boolean`                                       | `false`               | Disabled state                      |
| `variant`        | `'continuous' \| 'discrete'`                    | `'continuous'`        | Slider behavior type                |
| `orientation`    | `'horizontal' \| 'vertical'`                    | `'horizontal'`        | Slider orientation                  |
| `showTicks`      | `boolean`                                       | `false`               | Show tick marks                     |
| `showValue`      | `boolean`                                       | `false`               | Show value label                    |
| `label`          | `string`                                        | `undefined`           | Slider label                        |
| `helperText`     | `string`                                        | `undefined`           | Helper text below slider            |
| `error`          | `boolean`                                       | `false`               | Error state                         |
| `errorMessage`   | `string`                                        | `undefined`           | Error message                       |
| `thumbShape`     | `'circle' \| 'square' \| 'diamond' \| 'custom'` | `'circle'`            | Thumb shape                         |
| `thumbSize`      | `number`                                        | `undefined`           | Custom thumb size (px)              |
| `thumbContent`   | `ReactNode`                                     | `undefined`           | Custom thumb content                |
| `valueFormatter` | `(value: number) => string`                     | `(v) => v.toString()` | Value display formatter             |
| `className`      | `string`                                        | `undefined`           | Additional CSS classes              |
| `onChange`       | `(value: number) => void`                       | `undefined`           | Value change handler                |
| `onChangeStart`  | `(value: number) => void`                       | `undefined`           | Drag start handler                  |
| `onChangeEnd`    | `(value: number) => void`                       | `undefined`           | Drag end handler                    |

## Examples

### Variants

```tsx
// Continuous slider (smooth)
<Slider
  label="Temperature"
  value={temp}
  onChange={setTemp}
  min={16}
  max={30}
  variant="continuous"
  valueFormatter={(value) => `${value}°C`}
/>

// Discrete slider (stepped)
<Slider
  label="Quality"
  value={quality}
  onChange={setQuality}
  min={1}
  max={10}
  step={1}
  variant="discrete"
  showTicks
  showValue
/>
```

### Custom Formatting

```tsx
function CustomFormattingExample() {
  const [price, setPrice] = useState(50);
  const [percentage, setPercentage] = useState(0.5);
  const [time, setTime] = useState(120);

  return (
    <>
      <Slider
        label="Price"
        value={price}
        onChange={setPrice}
        min={0}
        max={1000}
        showValue
        valueFormatter={(value) => `$${value}`}
      />

      <Slider
        label="Completion"
        value={percentage}
        onChange={setPercentage}
        min={0}
        max={1}
        step={0.01}
        showValue
        valueFormatter={(value) => `${Math.round(value * 100)}%`}
      />

      <Slider
        label="Duration"
        value={time}
        onChange={setTime}
        min={0}
        max={3600}
        step={30}
        showValue
        valueFormatter={(seconds) => {
          const mins = Math.floor(seconds / 60);
          const secs = seconds % 60;
          return `${mins}:${secs.toString().padStart(2, '0')}`;
        }}
      />
    </>
  );
}
```

### Thumb Shapes

```tsx
// Different thumb shapes
<Slider thumbShape="circle" />
<Slider thumbShape="square" />
<Slider thumbShape="diamond" />

// Custom thumb with content
<Slider
  thumbShape="custom"
  thumbContent={<Icon name="volume" />}
  thumbSize={32}
/>
```

### Vertical Sliders

```tsx
function VerticalSlidersExample() {
  return (
    <div className="equalizer" style={{ display: 'flex', height: '300px', gap: '16px' }}>
      {frequencies.map((freq, index) => (
        <div key={freq} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Slider
            orientation="vertical"
            value={levels[index]}
            onChange={(value) => updateLevel(index, value)}
            min={-12}
            max={12}
            step={0.5}
            showValue
            valueFormatter={(value) => `${value > 0 ? '+' : ''}${value}dB`}
          />
          <span className="frequency-label">{freq}Hz</span>
        </div>
      ))}
    </div>
  );
}
```

### Form Integration

```tsx
<form onSubmit={handleSubmit}>
  <Slider
    label="Age"
    value={formData.age}
    onChange={(value) => setFormData({ ...formData, age: value })}
    min={18}
    max={100}
    step={1}
    required
    error={!!errors.age}
    errorMessage={errors.age}
    helperText="Must be 18 or older"
  />

  <Slider
    label="Budget"
    value={formData.budget}
    onChange={(value) => setFormData({ ...formData, budget: value })}
    min={1000}
    max={100000}
    step={1000}
    showValue
    valueFormatter={(value) => `$${value.toLocaleString()}`}
  />

  <Button type="submit">Submit</Button>
</form>
```

### Audio/Video Controls

```tsx
function MediaControls() {
  const [volume, setVolume] = useState(50);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [progress, setProgress] = useState(0);

  return (
    <div className="media-controls">
      <Slider
        label="Volume"
        value={volume}
        onChange={setVolume}
        min={0}
        max={100}
        showValue
        valueFormatter={(value) => `${value}%`}
        thumbContent={<Icon name="volume" />}
      />

      <Slider
        label="Playback Speed"
        value={playbackRate}
        onChange={setPlaybackRate}
        min={0.25}
        max={2}
        step={0.25}
        variant="discrete"
        showTicks
        showValue
        valueFormatter={(value) => `${value}x`}
      />

      <Slider
        label="Progress"
        value={progress}
        onChange={setProgress}
        min={0}
        max={duration}
        variant="continuous"
        showValue
        valueFormatter={(seconds) => formatTime(seconds)}
      />
    </div>
  );
}
```

## Accessibility

### ARIA Support

The Slider component implements proper ARIA attributes:

- `role="slider"` on the thumb element
- `aria-valuemin`, `aria-valuemax`, `aria-valuenow` for value information
- `aria-valuetext` for formatted value display
- `aria-orientation` for vertical sliders
- `aria-labelledby` links to label
- `aria-describedby` links to helper text
- `aria-disabled` for disabled state

### Keyboard Navigation

- **Tab/Shift+Tab**: Navigate to/from slider
- **Arrow Left/Down**: Decrease value
- **Arrow Right/Up**: Increase value
- **Home**: Minimum value
- **End**: Maximum value
- **Page Up/Down**: Large increments

### Screen Reader Support

- Slider role and bounds announced
- Current value communicated
- Label and helper text read
- Value changes announced during interaction

```tsx
// Accessibility example
<Slider
  label="Volume control"
  value={volume}
  onChange={setVolume}
  min={0}
  max={100}
  aria-describedby="volume-help"
  valueFormatter={(value) => `Volume level ${value} percent`}
/>
<div id="volume-help">
  Use arrow keys to adjust volume level
</div>
```

## Theming

### CSS Custom Properties

Slider components support extensive theming:

```css
.custom-slider {
  --slider-track-height: 4px;
  --slider-track-color: var(--md-sys-color-outline-variant);
  --slider-track-color-active: var(--md-sys-color-primary);
  --slider-thumb-size: 20px;
  --slider-thumb-color: var(--md-sys-color-primary);
  --slider-thumb-color-hover: var(--md-sys-color-primary);
  --slider-thumb-color-focus: var(--md-sys-color-primary);
  --slider-thumb-border: 2px solid var(--md-sys-color-outline);
  --slider-focus-ring: 2px solid var(--md-sys-color-primary);
  --slider-disabled-opacity: 0.38;

  /* Ticks */
  --slider-tick-size: 2px;
  --slider-tick-color: var(--md-sys-color-outline);
  --slider-tick-color-active: var(--md-sys-color-primary);

  /* Value label */
  --slider-value-background: var(--md-sys-color-inverse-surface);
  --slider-value-color: var(--md-sys-color-inverse-on-surface);
  --slider-value-padding: 4px 8px;
  --slider-value-border-radius: 4px;
}
```

### Material Design Tokens

Components use Material Design 3 tokens:

- `--md-sys-color-primary` - Active track and thumb
- `--md-sys-color-outline-variant` - Inactive track
- `--md-sys-color-outline` - Thumb border
- `--md-sys-color-inverse-surface` - Value label background

### Custom Styling

```scss
// Volume slider theme
.volume-slider {
  --slider-track-color: #e3f2fd;
  --slider-track-color-active: linear-gradient(90deg, #2196f3, #03a9f4);
  --slider-thumb-color: #ffffff;
  --slider-thumb-border: 2px solid #2196f3;
}

// Temperature slider theme
.temperature-slider {
  --slider-track-color-active: linear-gradient(90deg, #2196f3, #ff9800, #f44336);
}
```

## Advanced Usage

### Controlled vs Uncontrolled

```tsx
// Controlled
<Slider
  value={value}
  onChange={setValue}
  min={0}
  max={100}
/>

// Uncontrolled
<Slider
  defaultValue={50}
  onChange={(value) => console.log('Value:', value)}
  min={0}
  max={100}
/>
```

### Custom Thumb Components

```tsx
function CustomThumbSlider() {
  return (
    <Slider
      thumbShape="custom"
      thumbSize={40}
      thumbContent={
        <div className="custom-thumb">
          <Icon name="brightness" size={16} />
        </div>
      }
      value={brightness}
      onChange={setBrightness}
    />
  );
}
```

### Multi-Range Slider

```tsx
// Note: This would be a separate RangeSlider component
import { RangeSlider } from 'preact-aurora-ui';

function PriceRange() {
  const [range, setRange] = useState([100, 500]);

  return (
    <RangeSlider
      label="Price Range"
      value={range}
      onChange={setRange}
      min={0}
      max={1000}
      step={50}
      showValue
      valueFormatter={(values) => `$${values[0]} - $${values[1]}`}
    />
  );
}
```

### Responsive Behavior

```tsx
function ResponsiveSlider() {
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  return (
    <Slider
      orientation={isMobile ? 'horizontal' : 'vertical'}
      value={value}
      onChange={setValue}
      style={{
        height: isMobile ? 'auto' : '200px',
        width: isMobile ? '100%' : 'auto',
      }}
    />
  );
}
```

## Testing

### Unit Tests

```tsx
import { render, screen } from '@testing-library/preact';
import { Slider } from 'preact-aurora-ui';
import userEvent from '@testing-library/user-event';

test('changes value with keyboard', async () => {
  const handleChange = vi.fn();

  render(<Slider value={50} onChange={handleChange} min={0} max={100} />);

  const slider = screen.getByRole('slider');

  await userEvent.type(slider, '{ArrowRight}');
  expect(handleChange).toHaveBeenCalledWith(51);
});
```

### Integration Tests

```tsx
test('slider form integration', async () => {
  const handleSubmit = vi.fn();

  render(
    <form onSubmit={handleSubmit}>
      <Slider name="volume" defaultValue={50} min={0} max={100} />
      <button type="submit">Submit</button>
    </form>,
  );

  const slider = screen.getByRole('slider');
  await userEvent.type(slider, '{ArrowRight}{ArrowRight}');
  await userEvent.click(screen.getByText('Submit'));

  expect(handleSubmit).toHaveBeenCalled();
});
```

### Accessibility Tests

```tsx
test('slider accessibility', () => {
  render(<Slider label="Volume" value={75} min={0} max={100} helperText="Adjust audio volume" />);

  const slider = screen.getByRole('slider');

  expect(slider).toHaveAttribute('aria-valuemin', '0');
  expect(slider).toHaveAttribute('aria-valuemax', '100');
  expect(slider).toHaveAttribute('aria-valuenow', '75');
  expect(slider).toHaveAccessibleName('Volume');
  expect(slider).toHaveAccessibleDescription('Adjust audio volume');
});
```

## FAQ

### How do I create a range slider with two thumbs?

Use the `RangeSlider` component (if available) or implement custom logic with two `Slider` components:

```tsx
function RangeControl() {
  const [min, setMin] = useState(20);
  const [max, setMax] = useState(80);

  return (
    <div className="range-control">
      <Slider value={min} onChange={(value) => setMin(Math.min(value, max))} max={max} />
      <Slider value={max} onChange={(value) => setMax(Math.max(value, min))} min={min} />
    </div>
  );
}
```

### How do I add custom tick marks?

Use the `showTicks` prop for automatic ticks, or create custom ones:

```tsx
<Slider showTicks step={10} min={0} max={100} variant="discrete" />
```

### Can I make the slider snap to specific values?

Yes, use the `step` property with `variant="discrete"`:

```tsx
<Slider variant="discrete" step={25} min={0} max={100} showTicks />
```

### How do I handle real-time value updates?

Use the `onChange` callback for real-time updates, or use `onChangeEnd` for updates only when dragging stops:

```tsx
<Slider
  onChange={(value) => {
    // Real-time updates
    setVolume(value);
    audioElement.volume = value / 100;
  }}
  onChangeEnd={(value) => {
    // Save to preferences when done
    saveVolumePreference(value);
  }}
/>
```

### How do I create logarithmic sliders?

Transform values in your handlers:

```tsx
function LogarithmicSlider() {
  const [displayValue, setDisplayValue] = useState(50);

  const toLog = (linear) => Math.pow(10, linear / 50);
  const fromLog = (log) => Math.log10(log) * 50;

  return (
    <Slider
      value={displayValue}
      onChange={setDisplayValue}
      valueFormatter={(value) => `${toLog(value).toFixed(1)}Hz`}
    />
  );
}
```
