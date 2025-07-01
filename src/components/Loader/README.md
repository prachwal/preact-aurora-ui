# Loader Components

A comprehensive set of loading indicators following Material Design 3 principles.

## Overview

The Loader module provides two components:

- **Loader** (Legacy): Simple loading spinner with backwards compatibility
- **Progress**: Full MD3 Progress Indicators with circular and linear variants

## Components

### Loader (Legacy)

A compatibility wrapper around the Progress component for simple loading states.

#### Basic Usage

```tsx
import { Loader } from '@aurora-ui/preact-aurora-ui';

function App() {
  return <Loader />;
}
```

#### API Reference

| Prop         | Type                   | Default          | Description              |
| ------------ | ---------------------- | ---------------- | ------------------------ |
| `size`       | `'sm' \| 'md' \| 'lg'` | `'md'`           | Size of the loader       |
| `color`      | `string`               |                  | Custom color (CSS value) |
| `className`  | `string`               |                  | Additional CSS classes   |
| `style`      | `JSX.CSSProperties`    |                  | Inline styles            |
| `aria-label` | `string`               | `'Ładowanie...'` | Accessibility label      |

### Progress (Recommended)

Full Material Design 3 Progress Indicators with advanced features.

#### Basic Usage

```tsx
import { Progress } from '@aurora-ui/preact-aurora-ui';

// Circular indeterminate (default)
function LoadingSpinner() {
  return <Progress />;
}

// Circular determinate
function CircularProgress() {
  return <Progress determinate value={65} />;
}

// Linear progress
function LinearProgress() {
  return <Progress variant="linear" determinate value={75} />;
}
```

#### API Reference

| Prop                | Type                                       | Default      | Description                                 |
| ------------------- | ------------------------------------------ | ------------ | ------------------------------------------- |
| `variant`           | `'circular' \| 'linear'`                   | `'circular'` | Progress indicator type                     |
| `determinate`       | `boolean`                                  | `false`      | Whether progress has known completion       |
| `value`             | `number`                                   | `0`          | Progress value (0-100) for determinate mode |
| `buffer`            | `number`                                   |              | Buffer value (0-100) for linear buffering   |
| `size`              | `'small' \| 'medium' \| 'large' \| number` | `'medium'`   | Size or custom pixel size                   |
| `color`             | `'primary' \| 'secondary' \| 'tertiary'`   | `'primary'`  | Theme color                                 |
| `thickness`         | `number`                                   |              | Custom stroke width for circular            |
| `trackColor`        | `string`                                   |              | Custom track color                          |
| `animationDuration` | `number`                                   |              | Custom animation timing (ms)                |
| `className`         | `string`                                   |              | Additional CSS classes                      |
| `style`             | `JSX.CSSProperties`                        |              | Inline styles                               |
| `aria-label`        | `string`                                   |              | Accessibility label                         |

## Examples

### Size Variants

```tsx
// Loader sizes
<Loader size="sm" />
<Loader size="md" />
<Loader size="lg" />

// Progress sizes
<Progress size="small" />
<Progress size="medium" />
<Progress size="large" />
<Progress size={48} /> {/* Custom pixel size */}
```

### Color Variations

```tsx
// Loader custom color
<Loader color="#e91e63" />

// Progress theme colors
<Progress color="primary" />
<Progress color="secondary" />
<Progress color="tertiary" />
```

### Progress States

```tsx
// Indeterminate (unknown completion)
<Progress />
<Progress variant="linear" />

// Determinate (known progress)
<Progress determinate value={45} />
<Progress variant="linear" determinate value={75} />

// Linear with buffer
<Progress variant="linear" determinate value={60} buffer={80} />
```

### Advanced Customization

```tsx
// Custom styling
<Progress
  variant="circular"
  size="large"
  thickness={6}
  trackColor="rgba(0,0,0,0.1)"
  animationDuration={1500}
  style={{ margin: '20px' }}
/>

// Custom linear progress
<Progress
  variant="linear"
  size="large"
  determinate
  value={progress}
  style={{ width: '300px' }}
  aria-label={`Loading: ${progress}% complete`}
/>
```

## Accessibility Features

### ARIA Support

- **Role**: Automatically sets `role="progressbar"`
- **Labels**: Customizable `aria-label` for screen readers
- **Values**: Proper `aria-valuenow`, `aria-valuemin`, `aria-valuemax` for determinate progress
- **Focus**: Keyboard focus support with visible indicators

### Reduced Motion

- Respects `prefers-reduced-motion` for accessibility
- Provides static visual feedback when animations are disabled

### High Contrast

- Enhanced visibility in high contrast mode
- Proper color contrast ratios

## Theming

### CSS Custom Properties

```scss
// Color tokens
--md-sys-color-primary
--md-sys-color-secondary
--md-sys-color-tertiary
--md-sys-color-surface-variant

// Override default colors
.custom-progress {
  --progress-color: #your-color;
}
```

### Size Customization

```scss
// Custom sizes
.progress--size-custom {
  --progress-size: 40px;
}

// Linear height customization
.progress--variant-linear.custom-height {
  height: 8px;
  border-radius: 4px;
}
```

## Testing

### Unit Tests

```tsx
import { render, screen } from '@testing-library/preact';
import { Loader, Progress } from '@aurora-ui/preact-aurora-ui';

// Test basic rendering
test('renders loader', () => {
  render(<Loader />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});

// Test progress value
test('shows correct progress value', () => {
  render(<Progress determinate value={75} />);
  expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75');
});
```

### Test Utilities

- `data-testid="progress-root"` for consistent targeting
- Accessibility-compliant test queries using roles and labels

## Migration Guide

### From Legacy Loader to Progress

```tsx
// Old (still supported)
<Loader size="lg" color="#f00" />

// New (recommended)
<Progress size="large" style={{ color: '#f00' }} />
```

### Size Mapping

- `sm` → `small`
- `md` → `medium`
- `lg` → `large`

## Integration Examples

### Loading States

```tsx
function DataComponent() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  if (loading) {
    return (
      <div className="loading-container">
        <Progress aria-label="Loading data..." />
        <p>Loading your data...</p>
      </div>
    );
  }

  return <div>Data content...</div>;
}
```

### Progress Tracking

```tsx
function FileUpload() {
  const [uploadProgress, setUploadProgress] = useState(0);

  return (
    <div>
      <Progress
        variant="linear"
        determinate
        value={uploadProgress}
        aria-label={`Upload progress: ${uploadProgress}%`}
      />
      <p>{uploadProgress}% uploaded</p>
    </div>
  );
}
```

## Performance Notes

- **Animations**: GPU-accelerated CSS animations
- **Reduced Motion**: Automatically respects user preferences
- **Memory**: Lightweight components with minimal DOM footprint

## Browser Support

- Modern browsers with CSS custom properties support
- Graceful fallbacks for older browsers
- SVG support required for circular progress

## Best Practices

1. **Use Progress over Loader** for new implementations
2. **Provide meaningful labels** for screen readers
3. **Show determinate progress** when completion is known
4. **Respect user motion preferences**
5. **Use appropriate sizes** for the context
6. **Consider loading states** in your application flow

## Related Components

- [Button](../Button/README.md) - For loading button states
- [Dialog](../Dialog/README.md) - For modal loading overlays
- [Card](../Card/README.md) - For content loading states

## Troubleshooting

### Common Issues

**Q: Progress not animating?**  
A: Check if `prefers-reduced-motion` is enabled or if CSS animations are disabled.

**Q: Circular progress appears cut off?**  
A: Ensure parent container has adequate space for the stroke width.

**Q: Linear progress not visible?**  
A: Set explicit width on container and check background contrast.

**Q: Legacy Loader not working?**  
A: Ensure you're importing from the correct path and check for TypeScript errors.

## Resources

- [Material Design Progress Indicators](https://m3.material.io/components/progress-indicators)
- [WCAG Progress Indicator Guidelines](https://www.w3.org/WAI/ARIA/apg/patterns/meter/)
- [Preact Documentation](https://preactjs.com/)
