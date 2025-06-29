# ExampleButton Component

## Description

The `ExampleButton` component is a basic button component that demonstrates the usage of Material Design 3 styling and theming.

## Usage

```tsx
import { ExampleButton } from '@aurora-ui/components';

function App() {
  return <ExampleButton onClick={() => alert('Button clicked!')}>Click me</ExampleButton>;
}
```

## API

### Props

| Prop      | Type         | Default | Description                                |
| --------- | ------------ | ------- | ------------------------------------------ |
| children  | `string`     |         | The text to display within the button.     |
| onClick   | `() => void` |         | Callback function to be executed on click. |
| className | `string`     |         | Additional CSS classes for custom styling. |

### Types

See [`ExampleButton.tsx`](./ExampleButton.tsx) for detailed type definitions.

## Styling and Theming

The `ExampleButton` uses SCSS Modules for styling, following the Material Design 3 guidelines. It leverages custom properties defined in `src/styles/colors.scss`, `src/styles/typography.scss`, and `src/styles/spacing.scss` for theming.

See [`ExampleButton.module.scss`](./ExampleButton.module.scss) for details.

## Accessibility

The `ExampleButton` is a standard HTML button element and provides basic accessibility features. Ensure proper ARIA attributes are used when extending this component.

## Testing

See [`ExampleButton.test.tsx`](./ExampleButton.test.tsx) for unit tests.

## Storybook

[Link to Storybook story] (Coming soon)

## FAQ

**Q: How do I change the button's color?**  
A: Override the CSS custom properties in your application's CSS or theme.

**Q: Can I use a different font?**  
A: Yes, by overriding the `--font-family-base` CSS custom property.

## Contribution

Contributions are welcome! Please follow the contribution guidelines.

## License

MIT
