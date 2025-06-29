# Dialog Component

## Description

The `Dialog` component is a modal window that appears on top of the main content to prompt the user for input or confirmation.

## Usage

```tsx
import { Dialog } from '@aurora-ui/components';

function App() {
  return (
    <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)} title="Confirmation">
      Are you sure you want to proceed?
    </Dialog>
  );
}
```

## API

### Props

| Prop      | Type         | Default | Description                                                 |
| --------- | ------------ | ------- | ----------------------------------------------------------- |
| open      | `boolean`    | `false` | Whether the dialog is open.                                 |
| onClose   | `() => void` |         | Callback function to be executed when the dialog is closed. |
| title     | `string`     |         | The title of the dialog.                                    |
| children  | `ReactNode`  |         | The content to display within the dialog.                   |
| className | `string`     |         | Additional CSS classes for custom styling.                  |

### Types

See [`Dialog.tsx`](./Dialog.tsx) for detailed type definitions.

## Styling and Theming

The `Dialog` uses SCSS Modules for styling, following the Material Design 3 guidelines. It leverages custom properties defined in `src/styles/colors.scss`, `src/styles/typography.scss`, and `src/styles/spacing.scss` for theming.

See [`Dialog.module.scss`](./Dialog.module.scss) for details.

## Accessibility

The `Dialog` component provides basic accessibility features. Use ARIA attributes to provide more context.

## Testing

See [`Dialog.test.tsx`](./Dialog.test.tsx) for unit tests.

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
