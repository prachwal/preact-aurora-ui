# Switch Component

## Description

The `Switch` component is a toggle switch that allows users to turn an option on or off.

## Usage

```tsx
import { Switch } from '@aurora-ui/components';

function App() {
  return (
    <Switch checked={isToggled} onChange={(e) => setIsToggled(e.target.checked)}>
      Enable dark mode
    </Switch>
  );
}
```

## API

### Props

| Prop      | Type                 | Default | Description                                                     |
| --------- | -------------------- | ------- | --------------------------------------------------------------- |
| checked   | `boolean`            | `false` | Whether the switch is toggled on.                               |
| onChange  | `(e: Event) => void` |         | Callback function to be executed when the switch state changes. |
| disabled  | `boolean`            | `false` | Whether the switch is disabled.                                 |
| children  | `ReactNode`          |         | The label for the switch.                                       |
| className | `string`             |         | Additional CSS classes for custom styling.                      |

### Types

See [`Switch.tsx`](./Switch.tsx) for detailed type definitions.

## Styling and Theming

The `Switch` uses SCSS Modules for styling, following the Material Design 3 guidelines. It leverages custom properties defined in `src/styles/colors.scss`, `src/styles/typography.scss`, and `src/styles/spacing.scss` for theming.

See [`Switch.module.scss`](./Switch.module.scss) for details.

## Accessibility

The `Switch` component provides basic accessibility features. Use ARIA attributes to provide more context.

## Testing

See [`Switch.test.tsx`](./Switch.test.tsx) for unit tests.

## Storybook

[Link to Storybook story] (Coming soon)

## FAQ

**Q: How do I handle the switch state?**  
A: Use the `checked` and `onChange` props to manage the switch state in your component.

**Q: How do I disable the switch?**  
A: Use the `disabled` prop.

## Contribution

Contributions are welcome! Please follow the contribution guidelines.

## License

MIT
