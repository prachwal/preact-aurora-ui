# Checkbox Component

## Description

The `Checkbox` component is a boolean input control that allows users to select or deselect an option.

## Usage

```tsx
import { Checkbox } from '@aurora-ui/components';

function App() {
  return (
    <Checkbox checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}>
      Accept terms and conditions
    </Checkbox>
  );
}
```

## API

### Props

| Prop      | Type                 | Default | Description                                                       |
| --------- | -------------------- | ------- | ----------------------------------------------------------------- |
| checked   | `boolean`            | `false` | Whether the checkbox is checked.                                  |
| onChange  | `(e: Event) => void` |         | Callback function to be executed when the checkbox state changes. |
| disabled  | `boolean`            | `false` | Whether the checkbox is disabled.                                 |
| children  | `ReactNode`          |         | The label for the checkbox.                                       |
| className | `string`             |         | Additional CSS classes for custom styling.                        |

### Types

See [`Checkbox.tsx`](./Checkbox.tsx) for detailed type definitions.

## Styling and Theming

The `Checkbox` uses SCSS Modules for styling, following the Material Design 3 guidelines. It leverages custom properties defined in `src/styles/colors.scss`, `src/styles/typography.scss`, and `src/styles/spacing.scss` for theming.

See [`Checkbox.module.scss`](./Checkbox.module.scss) for details.

## Accessibility

The `Checkbox` component provides basic accessibility features. Use ARIA attributes to provide more context.

## Testing

See [`Checkbox.test.tsx`](./Checkbox.test.tsx) for unit tests.

## Storybook

[Link to Storybook story](https://your-storybook-url.com/checkbox)

## FAQ

**Q: How do I handle the checkbox state?**  
A: Use the `checked` and `onChange` props to manage the checkbox state in your component.

**Q: How do I disable the checkbox?**  
A: Use the `disabled` prop.

## Contribution

Contributions are welcome! Please follow the contribution guidelines in the repository.

## License

MIT
