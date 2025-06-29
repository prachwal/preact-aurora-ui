# Radio Component

## Description

The `Radio` component is a radio button that allows users to select one option from a set of mutually exclusive options.

## Usage

```tsx
import { Radio } from '@aurora-ui/components';

function App() {
  return (
    <Radio
      checked={selectedValue === 'option1'}
      onChange={() => setSelectedValue('option1')}
      value="option1"
    >
      Option 1
    </Radio>
  );
}
```

## API

### Props

| Prop      | Type         | Default | Description                                                         |
| --------- | ------------ | ------- | ------------------------------------------------------------------- |
| checked   | `boolean`    | `false` | Whether the radio button is checked.                                |
| onChange  | `() => void` |         | Callback function to be executed when the radio button is selected. |
| disabled  | `boolean`    | `false` | Whether the radio button is disabled.                               |
| value     | `string`     |         | The value of the radio button.                                      |
| children  | `ReactNode`  |         | The label for the radio button.                                     |
| className | `string`     |         | Additional CSS classes for custom styling.                          |

### Types

See [`Radio.tsx`](./Radio.tsx) for detailed type definitions.

## Styling and Theming

The `Radio` uses SCSS Modules for styling, following the Material Design 3 guidelines. It leverages custom properties defined in `src/styles/colors.scss`, `src/styles/typography.scss`, and `src/styles/spacing.scss` for theming.

See [`Radio.module.scss`](./Radio.module.scss) for details.

## Accessibility

The `Radio` component provides basic accessibility features. Use ARIA attributes to provide more context.

## Testing

See [`Radio.test.tsx`](./Radio.test.tsx) for unit tests.

## Storybook

[Link to Storybook story] (Coming soon)

## FAQ

**Q: How do I handle the radio button state?**  
A: Use the `checked` and `onChange` props to manage the radio button state in your component.

**Q: How do I disable the radio button?**  
A: Use the `disabled` prop.

## Contribution

Contributions are welcome! Please follow the contribution guidelines.

## License

MIT
