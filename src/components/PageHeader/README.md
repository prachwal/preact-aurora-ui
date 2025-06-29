# PageHeader Component

## Description

The `PageHeader` component displays the title and optional supplementary information for a page.

## Usage

```tsx
import { PageHeader } from '@aurora-ui/components';

function App() {
  return <PageHeader title="My Page" description="A brief description of the page." />;
}
```

## API

### Props

| Prop        | Type        | Default | Description                                                |
| ----------- | ----------- | ------- | ---------------------------------------------------------- |
| title       | `string`    |         | The title of the page.                                     |
| description | `string`    |         | A brief description of the page (optional).                |
| actions     | `ReactNode` |         | Optional action buttons or links to display in the header. |
| className   | `string`    |         | Additional CSS classes for custom styling.                 |

### Types

See [`PageHeader.tsx`](./PageHeader.tsx) for detailed type definitions.

## Styling and Theming

The `PageHeader` uses SCSS Modules for styling, following the Material Design 3 guidelines. It leverages custom properties defined in `src/styles/colors.scss`, `src/styles/typography.scss`, and `src/styles/spacing.scss` for theming.

See [`PageHeader.module.scss`](./PageHeader.module.scss) for details.

## Accessibility

The `PageHeader` component provides basic accessibility features. Use ARIA attributes to provide more context.

## Testing

See [`PageHeader.test.tsx`](./PageHeader.test.tsx) for unit tests.

## Storybook

[Link to Storybook story](https://your-storybook-url.com/pageheader-component)

## FAQ

**Q: How do I add a description to the page header?**  
A: Use the `description` prop.

**Q: How do I add action buttons to the page header?**  
A: Use the `actions` prop to pass in React elements (e.g., buttons, links).

## Contribution

Contributions are welcome! Please follow the contribution guidelines in the repository.

## License

MIT
