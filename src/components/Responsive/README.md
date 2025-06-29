# Responsive Component

## Description

The `Responsive` component adapts its content based on the screen size.

## Usage

```tsx
import { Responsive } from '@aurora-ui/components';

function App() {
  return (
    <Responsive>
      <div>This content is responsive!</div>
    </Responsive>
  );
}
```

## API

### Props

| Prop      | Type        | Default | Description                                                                                                                             |
| --------- | ----------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| children  | `ReactNode` |         | The content to display within the responsive component.                                                                                 |
| className | `string`    |         | Additional CSS classes for custom styling.                                                                                              |
| query     | `string`    |         | Media query string to determine when the content should be displayed (e.g., `(min-width: 768px)`). Defaults to always show the content. |

### Types

See [`Responsive.tsx`](./Responsive.tsx) for detailed type definitions.

## Styling and Theming

The `Responsive` uses SCSS Modules for styling. It leverages custom properties defined in `src/styles/colors.scss`, `src/styles/typography.scss`, and `src/styles/spacing.scss` for theming.

See [`Responsive.module.scss`](./Responsive.module.scss) for details.

## Accessibility

The `Responsive` component provides basic accessibility features. Use ARIA attributes to provide more context.

## Testing

See [`Responsive.test.tsx`](./Responsive.test.tsx) for unit tests.

## Storybook

[Link to Storybook story] (Coming soon)

## FAQ

**Q: How do I specify the screen size at which the content should be displayed?**  
A: Use the `query` prop with a media query string.

## Contribution

Contributions are welcome! Please follow the contribution guidelines.

## License

MIT
