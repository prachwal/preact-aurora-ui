# Badge Component

## Description

The `Badge` component is a small visual indicator used to highlight status, notifications, or counts.

## Usage

```tsx
import { Badge } from '@aurora-ui/components';

function App() {
  return (
    <div>
      <Badge>New</Badge>
      <Badge count={5} />
    </div>
  );
}
```

## API

### Props

| Prop      | Type        | Default     | Description                                |
| --------- | ----------- | ----------- | ------------------------------------------ | ------------------------------------ | ----------- | ----------------------- |
| children  | `string`    |             | The text to display within the badge.      |
| count     | `number`    |             | A numeric value to display in the badge.   |
| max       | `number`    |             | The maximum value to display (e.g., 99+).  |
| variant   | `"standard" | "dot"`      | `"standard"`                               | The badge variant (standard or dot). |
| color     | `"primary"  | "secondary" | "error"                                    | "neutral"`                           | `"primary"` | The color of the badge. |
| className | `string`    |             | Additional CSS classes for custom styling. |

### Types

See [`Badge.tsx`](./Badge.tsx) for detailed type definitions.

## Styling and Theming

The `Badge` uses SCSS Modules for styling, following the Material Design 3 guidelines. It leverages custom properties defined in `src/styles/colors.scss`, `src/styles/typography.scss`, and `src/styles/spacing.scss` for theming.

See [`Badge.module.scss`](./Badge.module.scss) for details.

## Accessibility

The `Badge` component provides basic accessibility features. Use ARIA attributes to provide more context.

## Testing

See [`Badge.test.tsx`](./Badge.test.tsx) for unit tests.

## Storybook

[Link to Storybook story] (Coming soon)

## FAQ

**Q: How do I change the badge's color?**  
A: Use the `color` prop or override the CSS custom properties in your application's CSS or theme.

**Q: How do I display a badge without a number?**  
A: Use the `variant="dot"` prop.

## Contribution

Contributions are welcome! Please follow the contribution guidelines.

## License

MIT
