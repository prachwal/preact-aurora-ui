# Tooltip Component

## Description

The `Tooltip` component displays informative text when users hover over, focus on, or touch an element.

## Usage

```tsx
import { Tooltip } from '@aurora-ui/components';

function App() {
  return (
    <Tooltip title="More information">
      <button>Hover me</button>
    </Tooltip>
  );
}
```

## API

### Props

| Prop      | Type        | Default  | Description                                             |
| --------- | ----------- | -------- | ------------------------------------------------------- | -------- | ------- | ----------------------------------------------------- |
| title     | `string`    |          | The text to display in the tooltip.                     |
| children  | `ReactNode` |          | The element to which the tooltip is attached.           |
| placement | `"top"      | "bottom" | "left"                                                  | "right"` | `"top"` | The placement of the tooltip relative to the element. |
| delay     | `number`    | `200`    | The delay (in milliseconds) before the tooltip appears. |
| className | `string`    |          | Additional CSS classes for custom styling.              |

### Types

See [`Tooltip.tsx`](./Tooltip.tsx) for detailed type definitions.

## Styling and Theming

The `Tooltip` uses SCSS Modules for styling, following the Material Design 3 guidelines. It leverages custom properties defined in `src/styles/colors.scss`, `src/styles/typography.scss`, and `src/styles/spacing.scss` for theming.

See [`Tooltip.module.scss`](./Tooltip.module.scss) for details.

## Accessibility

The `Tooltip` component provides basic accessibility features. Use ARIA attributes to provide more context.

## Testing

See [`Tooltip.test.tsx`](./Tooltip.test.tsx) for unit tests.

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
