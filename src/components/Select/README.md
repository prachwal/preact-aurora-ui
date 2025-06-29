# Select Component

## Description

The `Select` component is a dropdown list that allows users to select one option from a set of options.

## Usage

```tsx
import { Select, Option } from '@aurora-ui/components';

function App() {
  return (
    <Select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
      <Option value="option1">Option 1</Option>
      <Option value="option2">Option 2</Option>
      <Option value="option3">Option 3</Option>
    </Select>
  );
}
```

## API

### `Select` Props

| Prop      | Type                 | Default | Description                                                       |
| --------- | -------------------- | ------- | ----------------------------------------------------------------- |
| value     | `string`             |         | The current value of the select.                                  |
| onChange  | `(e: Event) => void` |         | Callback function to be executed when the selected value changes. |
| disabled  | `boolean`            | `false` | Whether the select is disabled.                                   |
| children  | `ReactNode`          |         | The `Option` components to display within the select.             |
| className | `string`             |         | Additional CSS classes for custom styling.                        |

### `Option` Props

| Prop      | Type        | Default | Description                                |
| --------- | ----------- | ------- | ------------------------------------------ |
| value     | `string`    |         | The value of the option.                   |
| children  | `ReactNode` |         | The text to display in the option.         |
| className | `string`    |         | Additional CSS classes for custom styling. |

### Types

See [`Select.tsx`](./Select.tsx) and [`Option.tsx`](./Option.tsx) for detailed type definitions.

## Styling and Theming

The `Select` and `Option` components use SCSS Modules for styling, following the Material Design 3 guidelines. They leverage custom properties defined in `src/styles/colors.scss`, `src/styles/typography.scss`, and `src/styles/spacing.scss` for theming.

See [`Select.module.scss`](./Select.module.scss) for details.

## Accessibility

The `Select` component provides basic accessibility features. Use ARIA attributes to provide more context.

## Testing

See [`Select.test.tsx`](./Select.test.tsx) for unit tests.

## Storybook

[Link to Storybook story] (Coming soon)

## FAQ

**Q: How do I handle the select value?**  
A: Use the `value` and `onChange` props to manage the select value in your component.

**Q: How do I disable the select?**  
A: Use the `disabled` prop.

## Contribution

Contributions are welcome! Please follow the contribution guidelines.

## License

MIT
