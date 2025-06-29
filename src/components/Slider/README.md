# Slider Component

## Description

The `Slider` component is an input control that allows users to select a value from a continuous range.

## Usage

```tsx
import { Slider } from '@aurora-ui/components';

function App() {
  return <Slider value={volume} onInput={(e) => setVolume(e.target.value)} min={0} max={100} />;
}
```

## API

### Props

| Prop      | Type                 | Default | Description                                                     |
| --------- | -------------------- | ------- | --------------------------------------------------------------- |
| value     | `number`             |         | The current value of the slider.                                |
| onInput   | `(e: Event) => void` |         | Callback function to be executed when the slider value changes. |
| min       | `number`             | `0`     | The minimum value of the slider.                                |
| max       | `number`             | `100`   | The maximum value of the slider.                                |
| step      | `number`             | `1`     | The step interval of the slider.                                |
| disabled  | `boolean`            | `false` | Whether the slider is disabled.                                 |
| className | `string`             |         | Additional CSS classes for custom styling.                      |

### Types

See [`Slider.tsx`](./Slider.tsx) for detailed type definitions.

## Styling and Theming

The `Slider` uses SCSS Modules for styling, following the Material Design 3 guidelines. It leverages custom properties defined in `src/styles/colors.scss`, `src/styles/typography.scss`, and `src/styles/spacing.scss` for theming.

See [`Slider.module.scss`](./Slider.module.scss) for details.

## Accessibility

The `Slider` component provides basic accessibility features. Use ARIA attributes to provide more context.

## Testing

See [`Slider.test.tsx`](./Slider.test.tsx) for unit tests.

## Storybook

[Link to Storybook story] (Coming soon)

## FAQ

**Q: How do I handle the slider value?**  
A: Use the `value` and `onInput` props to manage the slider value in your component.

**Q: How do I disable the slider?**  
A: Use the `disabled` prop.

## Contribution

Contributions are welcome! Please follow the contribution guidelines.

## License

MIT
