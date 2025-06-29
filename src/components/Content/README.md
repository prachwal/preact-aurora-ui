# Content Component

## Description

The `Content` component represents the main content area of a page.

## Usage

```tsx
import { Content } from '@aurora-ui/components';

function App() {
  return (
    <Content>
      <h1>Welcome to my app!</h1>
      <p>This is the main content area.</p>
    </Content>
  );
}
```

## API

### Props

| Prop      | Type        | Default | Description                                     |
| --------- | ----------- | ------- | ----------------------------------------------- |
| children  | `ReactNode` |         | The content to display within the content area. |
| className | `string`    |         | Additional CSS classes for custom styling.      |

### Types

See [`Content.tsx`](./Content.tsx) for detailed type definitions.

## Styling and Theming

The `Content` uses SCSS Modules for styling, following the Material Design 3 guidelines. It leverages custom properties defined in `src/styles/colors.scss`, `src/styles/typography.scss`, and `src/styles/spacing.scss` for theming.

See [`Content.module.scss`](./Content.module.scss) for details.

## Accessibility

The `Content` component provides basic accessibility features. Use ARIA attributes to provide more context.

## Testing

See [`Content.test.tsx`](./Content.test.tsx) for unit tests.

## Storybook

[Link to Storybook story](https://your-storybook-url.com/content-component)

## FAQ

**Q: How do I add content to the content area?**  
A: Add any React components within the `children` of the `Content` component.

**Q: How do I style the content area?**  
A: Modify the CSS styles in `Content.module.scss` or override the CSS custom properties in your application's CSS or theme.

## Contribution

Contributions are welcome! Please follow the contribution guidelines in the repository.

## License

MIT
