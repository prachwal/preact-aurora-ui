# Chip Component

## Description

The `Chip` component is a compact element that represents an input, attribute, or action.

## Usage

```tsx
import { Chip } from '@aurora-ui/components';

function App() {
  return <Chip>Basic Chip</Chip>;
}
```

## API

### Props

| Prop      | Type         | Default | Description                                                |
| --------- | ------------ | ------- | ---------------------------------------------------------- |
| children  | `ReactNode`  |         | The content to display within the chip.                    |
| onDelete  | `() => void` |         | Callback function to be executed when the chip is deleted. |
| disabled  | `boolean`    | `false` | Whether the chip is disabled.                              |
| className | `string`     |         | Additional CSS classes for custom styling.                 |

### Types

See [`Chip.tsx`](./Chip.tsx) for detailed type definitions.

## Styling and Theming

The `Chip` uses SCSS Modules for styling, following the Material Design 3 guidelines. It leverages custom properties defined in `src/styles/colors.scss`, `src/styles/typography.scss`, and `src/styles/spacing.scss` for theming.

See [`Chip.module.scss`](./Chip.module.scss) for details.

## Accessibility

The `Chip` component provides basic accessibility features. Use ARIA attributes to provide more context.

## Testing

See [`Chip.test.tsx`](./Chip.test.tsx) for unit tests.

## Storybook

[Link to Storybook story] (Coming soon)

## FAQ

**Q: How do I add a delete icon to the chip?**  
A: Use the `onDelete` prop to handle the delete action.

**Q: How do I disable the chip?**  
A: Use the `disabled` prop.

## Contribution

Contributions are welcome! Please follow the contribution guidelines.

## License

MIT
