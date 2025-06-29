# Button Component

## Description

The `Button` component is a versatile button with various styles and interaction states.

## Usage

```tsx
import { Button } from '@aurora-ui/components';

function App() {
  return <Button onClick={() => alert('Button clicked!')}>Click me</Button>;
}
```

## API

### Props

| Prop      | Type         | Default     | Description                                |
| --------- | ------------ | ----------- | ------------------------------------------ | ------- | ----------- | ------------------- |
| children  | `ReactNode`  |             | The content to display within the button.  |
| onClick   | `() => void` |             | Callback function to be executed on click. |
| variant   | `"primary"   | "secondary" | "outlined"                                 | "text"` | `"primary"` | The button variant. |
| disabled  | `boolean`    | `false`     | Whether the button is disabled.            |
| className | `string`     |             | Additional CSS classes for custom styling. |

### Types

See [`Button.tsx`](./Button.tsx) for detailed type definitions.

## Styling and Theming

The `Button` uses SCSS Modules for styling, following the Material Design 3 guidelines. It leverages custom properties defined in `src/styles/colors.scss`, `src/styles/typography.scss`, and `src/styles/spacing.scss` for theming.

See [`Button.module.scss`](./Button.module.scss) for details.

## Accessibility

The `Button` component provides basic accessibility features. Use ARIA attributes to provide more context.

## Testing

See [`Button.test.tsx`](./Button.test.tsx) for unit tests.

## Storybook

[Link to Storybook story](https://your-storybook-url.com/button)

## FAQ

**Q: How do I change the button's style?**  
A: Use the `variant` prop or override the CSS custom properties in your application's CSS or theme.

**Q: How do I disable the button?**  
A: Use the `disabled` prop.

## Contribution

Contributions are welcome! Please follow the contribution guidelines in the repository.

## License

MIT
