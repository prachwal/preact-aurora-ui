# Grid Component

## Description

The `Grid` component provides a flexible layout system for arranging content in rows and columns.

## Usage

```tsx
import { Grid } from '@aurora-ui/components';

function App() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        Content 1
      </Grid>
      <Grid item xs={12} sm={6}>
        Content 2
      </Grid>
    </Grid>
  );
}
```

## API

### `Grid` Props

| Prop      | Type        | Default | Description                                           |
| --------- | ----------- | ------- | ----------------------------------------------------- |
| children  | `ReactNode` |         | The content to display within the grid.               |
| container | `boolean`   | `false` | Whether the grid is a container.                      |
| item      | `boolean`   | `false` | Whether the grid is an item.                          |
| spacing   | `number`    | `0`     | The spacing between grid items (in theme units).      |
| xs        | `number`    |         | The number of columns to span on extra small screens. |
| sm        | `number`    |         | The number of columns to span on small screens.       |
| md        | `number`    |         | The number of columns to span on medium screens.      |
| lg        | `number`    |         | The number of columns to span on large screens.       |
| xl        | `number`    |         | The number of columns to span on extra large screens. |
| className | `string`    |         | Additional CSS classes for custom styling.            |

### Types

See [`Grid.tsx`](./Grid.tsx) for detailed type definitions.

## Styling and Theming

The `Grid` uses SCSS Modules for styling, following the Material Design 3 guidelines. It leverages custom properties defined in `src/styles/colors.scss`, `src/styles/typography.scss`, and `src/styles/spacing.scss` for theming.

See [`Grid.module.scss`](./Grid.module.scss) for details.

## Accessibility

The `Grid` component provides basic accessibility features. Use ARIA attributes to provide more context.

## Testing

See [`Grid.test.tsx`](./Grid.test.tsx) for unit tests.

## Storybook

[Link to Storybook story](https://your-storybook-url.com/grid-component)

## FAQ

**Q: How do I create a grid container?**  
A: Set the `container` prop to `true`.

**Q: How do I create a grid item?**  
A: Set the `item` prop to `true`.

**Q: How do I control the spacing between grid items?**  
A: Use the `spacing` prop.

**Q: How do I control the number of columns spanned by a grid item on different screen sizes?**  
A: Use the `xs`, `sm`, `md`, `lg`, and `xl` props.

## Contribution

Contributions are welcome! Please follow the contribution guidelines in the repository.

## License

MIT
