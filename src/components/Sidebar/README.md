# Sidebar Component

## Description

The `Sidebar` component provides a navigation panel, typically located on the left or right side of the page.

## Usage

```tsx
import { Sidebar } from '@aurora-ui/components';

function App() {
  return (
    <Sidebar>
      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
    </Sidebar>
  );
}
```

## API

### Props

| Prop      | Type        | Default | Description                                                              |
| --------- | ----------- | ------- | ------------------------------------------------------------------------ |
| children  | `ReactNode` |         | The content to display within the sidebar (typically a navigation menu). |
| className | `string`    |         | Additional CSS classes for custom styling.                               |

### Types

See [`Sidebar.tsx`](./Sidebar.tsx) for detailed type definitions.

## Styling and Theming

The `Sidebar` uses SCSS Modules for styling, following the Material Design 3 guidelines. It leverages custom properties defined in `src/styles/colors.scss`, `src/styles/typography.scss`, and `src/styles/spacing.scss` for theming.

See [`Sidebar.module.scss`](./Sidebar.module.scss) for details.

## Accessibility

The `Sidebar` component provides basic accessibility features. Use ARIA attributes to provide more context.

## Testing

See [`Sidebar.test.tsx`](./Sidebar.test.tsx) for unit tests.

## Storybook

[Link to Storybook story](https://your-storybook-url.com/sidebar-component)

## FAQ

**Q: How do I add navigation links to the sidebar?**  
A: Add navigation components (e.g., `ul`, `li`, `a`) within the `children` of the `Sidebar` component.

**Q: How do I style the sidebar?**  
A: Modify the CSS styles in `Sidebar.module.scss` or override the CSS custom properties in your application's CSS or theme.

## Contribution

Contributions are welcome! Please follow the contribution guidelines in the repository.

## License

MIT
