# Loader Component

## Description

The `Loader` component displays a loading indicator.

## Usage

```tsx
import { Loader } from '@aurora-ui/components';

function App() {
  return <Loader />;
}
```

## API

### Props

| Prop      | Type     | Default | Description                                |
| --------- | -------- | ------- | ------------------------------------------ |
| size      | `string` | `"md"`  | Size of the loader.                        |
| className | `string` |         | Additional CSS classes for custom styling. |

### Types

See [`Loader.tsx`](./Loader.tsx) for detailed type definitions.

## Styling and Theming

The `Loader` uses SCSS Modules for styling, following the Material Design 3 guidelines. It leverages custom properties defined in `src/styles/colors.scss`, `src/styles/typography.scss`, and `src/styles/spacing.scss` for theming.

See [`Loader.module.scss`](./Loader.module.scss) for details.

## Accessibility

The `Loader` component provides basic accessibility features. Use ARIA attributes to provide more context.

## Testing

See [`Loader.test.tsx`](./Loader.test.tsx) for unit tests.

## Storybook

[Link to Storybook story] (Coming soon)

## FAQ

**Q: How do I change the loader size?**  
A: Use the `size` prop.

## Contribution

Contributions are welcome! Please follow the contribution guidelines.

## License

MIT
