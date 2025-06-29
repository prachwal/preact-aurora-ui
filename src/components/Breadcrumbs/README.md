# Breadcrumbs Component

## Description

The `Breadcrumbs` component displays a hierarchical navigation path, indicating the user's current location within the application.

## Usage

```tsx
import { Breadcrumbs, Breadcrumb } from '@aurora-ui/components';

function App() {
  return (
    <Breadcrumbs>
      <Breadcrumb href="/">Home</Breadcrumb>
      <Breadcrumb href="/category">Category</Breadcrumb>
      <Breadcrumb>Current Page</Breadcrumb>
    </Breadcrumbs>
  );
}
```

## API

### `Breadcrumbs` Props

| Prop      | Type        | Default | Description                                                    |
| --------- | ----------- | ------- | -------------------------------------------------------------- |
| children  | `ReactNode` |         | The `Breadcrumb` components to display within the breadcrumbs. |
| className | `string`    |         | Additional CSS classes for custom styling.                     |

### `Breadcrumb` Props

| Prop      | Type        | Default | Description                                                       |
| --------- | ----------- | ------- | ----------------------------------------------------------------- |
| href      | `string`    |         | The URL to navigate to when the breadcrumb is clicked (optional). |
| children  | `ReactNode` |         | The text to display in the breadcrumb.                            |
| className | `string`    |         | Additional CSS classes for custom styling.                        |

### Types

See [`Breadcrumbs.tsx`](./Breadcrumbs.tsx) and [`Breadcrumb.tsx`](./Breadcrumb.tsx) for detailed type definitions.

## Styling and Theming

The `Breadcrumbs` and `Breadcrumb` components use SCSS Modules for styling, following the Material Design 3 guidelines. They leverage custom properties defined in `src/styles/colors.scss`, `src/styles/typography.scss`, and `src/styles/spacing.scss` for theming.

See [`Breadcrumbs.module.scss`](./Breadcrumbs.module.scss) for details.

## Accessibility

The `Breadcrumbs` component provides basic accessibility features. Use ARIA attributes to provide more context.

## Testing

See [`Breadcrumbs.test.tsx`](./Breadcrumbs.test.tsx) for unit tests.

## Storybook

[Link to Storybook story](https://your-storybook-url.com/breadcrumbs-component)

## FAQ

**Q: How do I add more breadcrumbs?**  
A: Add more `Breadcrumb` components as children of the `Breadcrumbs` component.

**Q: How do I make a breadcrumb a link?**  
A: Use the `href` prop to specify the URL to navigate to when the breadcrumb is clicked.

## Contribution

Contributions are welcome! Please follow the contribution guidelines in the repository.

## License

MIT
