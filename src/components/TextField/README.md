# TextField Component

## Description

The `TextField` component is a text input field with support for labels, hints, and validation.

## Usage

```tsx
import { TextField } from '@aurora-ui/components';

function App() {
  return <TextField label="Name" value={name} onInput={(e) => setName(e.target.value)} />;
}
```

## API

### Props

| Prop        | Type                 | Default | Description                                                    |
| ----------- | -------------------- | ------- | -------------------------------------------------------------- |
| label       | `string`             |         | The label for the text field.                                  |
| value       | `string`             |         | The current value of the text field.                           |
| onInput     | `(e: Event) => void` |         | Callback function to be executed when the input value changes. |
| placeholder | `string`             |         | Placeholder text for the input field.                          |
| disabled    | `boolean`            | `false` | Whether the text field is disabled.                            |
| className   | `string`             |         | Additional CSS classes for custom styling.                     |

### Types

See [`TextField.tsx`](./TextField.tsx) for detailed type definitions.

## Styling and Theming

The `TextField` uses SCSS Modules for styling, following the Material Design 3 guidelines. It leverages custom properties defined in `src/styles/colors.scss`, `src/styles/typography.scss`, and `src/styles/spacing.scss` for theming.

See [`TextField.module.scss`](./TextField.module.scss) for details.

## Accessibility

The `TextField` component provides basic accessibility features. Use ARIA attributes to provide more context.

## Testing

See [`TextField.test.tsx`](./TextField.test.tsx) for unit tests.

## Storybook

[Link to Storybook story] (Coming soon)

## FAQ

**Q: How do I add a placeholder to the text field?**  
A: Use the `placeholder` prop.

**Q: How do I disable the text field?**  
A: Use the `disabled` prop.

## Contribution

Contributions are welcome! Please follow the contribution guidelines.

## License

MIT
