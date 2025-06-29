# Snackbar Component

## Description

The `Snackbar` component is a brief, temporary message that appears at the bottom of the screen to provide feedback about an operation.

## Usage

```tsx
import { Snackbar } from '@aurora-ui/components';

function App() {
  return (
    <Snackbar
      message="Item added to cart"
      open={isSnackbarOpen}
      onClose={() => setIsSnackbarOpen(false)}
    />
  );
}
```

## API

### Props

| Prop      | Type         | Default | Description                                                   |
| --------- | ------------ | ------- | ------------------------------------------------------------- |
| message   | `string`     |         | The message to display in the snackbar.                       |
| open      | `boolean`    | `false` | Whether the snackbar is visible.                              |
| onClose   | `() => void` |         | Callback function to be executed when the snackbar is closed. |
| duration  | `number`     | `5000`  | The duration (in milliseconds) the snackbar is displayed.     |
| action    | `ReactNode`  |         | Optional action button or link to display in the snackbar.    |
| className | `string`     |         | Additional CSS classes for custom styling.                    |

### Types

See [`Snackbar.tsx`](./Snackbar.tsx) for detailed type definitions.

## Styling and Theming

The `Snackbar` uses SCSS Modules for styling, following the Material Design 3 guidelines. It leverages custom properties defined in `src/styles/colors.scss`, `src/styles/typography.scss`, and `src/styles/spacing.scss` for theming.

See [`Snackbar.module.scss`](./Snackbar.module.scss) for details.

## Accessibility

The `Snackbar` component provides basic accessibility features. Use ARIA attributes to provide more context.

## Testing

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
