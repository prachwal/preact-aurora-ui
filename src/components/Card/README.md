# Card Component

## Description

The `Card` component presents content in a contained and visually distinct area, often used for displaying summaries or previews of information.

## Usage

```tsx
import { Card } from '@aurora-ui/components';

function App() {
  return (
    <Card>
      <h2>Card Title</h2>
      <p>This is the card content.</p>
    </Card>
  );
}
```

## API

### Props

| Prop      | Type        | Default | Description                                |
| --------- | ----------- | ------- | ------------------------------------------ |
| children  | `ReactNode` |         | The content to display within the card.    |
| className | `string`    |         | Additional CSS classes for custom styling. |

### Types

See [`Card.tsx`](./Card.tsx) for detailed type definitions.

## Styling and Theming

The `Card` uses SCSS Modules for styling, following the Material Design 3 guidelines. It leverages custom properties defined in `src/styles/colors.scss`, `src/styles/typography.scss`, and `src/styles/spacing.scss` for theming.

See [`Card.module.scss`](./Card.module.scss) for details.

## Accessibility

The `Card` component provides basic accessibility features. Use ARIA attributes to provide more context.

## Testing

See [`Card.test.tsx`](./Card.test.tsx) for unit tests.

## Storybook

[Link to Storybook story](https://your-storybook-url.com/card-component)

## FAQ

**Q: How do I add a title to the card?**  
A: Add an `h1`-`h6` element within the `children` of the `Card` component.

**Q: How do I style the card?**  
A: Modify the CSS styles in `Card.module.scss` or override the CSS custom properties in your application's CSS or theme.

## Contribution

Contributions are welcome! Please follow the contribution guidelines in the repository.

## License

MIT
