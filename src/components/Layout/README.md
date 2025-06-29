# Layout Component

## Description

The `Layout` component provides a basic structure for arranging content on a page, typically including a header, sidebar, and main content area.

## Usage

```tsx
import { Layout, Header, Sidebar, Content } from '@aurora-ui/components';

function App() {
  return (
    <Layout>
      <Header>My App</Header>
      <Sidebar>Navigation</Sidebar>
      <Content>Main Content</Content>
    </Layout>
  );
}
```

## API

### `Layout` Props

| Prop      | Type        | Default | Description                                                                    |
| --------- | ----------- | ------- | ------------------------------------------------------------------------------ |
| children  | `ReactNode` |         | The content to display within the layout (typically Header, Sidebar, Content). |
| className | `string`    |         | Additional CSS classes for custom styling.                                     |

### `Header`, `Sidebar`, `Content` Props

These components typically accept children and className props for content and styling. Refer to their individual documentation for details.

### Types

See [`Layout.tsx`](./Layout.tsx), [`Header.tsx`](./Header.tsx), [`Sidebar.tsx`](./Sidebar.tsx), and [`Content.tsx`](./Content.tsx) for detailed type definitions.

## Styling and Theming

The `Layout` and its related components use SCSS Modules for styling, following the Material Design 3 guidelines. They leverage custom properties defined in `src/styles/colors.scss`, `src/styles/typography.scss`, and `src/styles/spacing.scss` for theming.

See [`Layout.module.scss`](./Layout.module.scss) and the individual module files for Header, Sidebar and Content for details.

## Accessibility

The `Layout` component provides basic accessibility features. Use ARIA attributes to provide more context.

## Testing

See [`Layout.test.tsx`](./Layout.test.tsx) for unit tests.

## Storybook

[Link to Storybook story](https://your-storybook-url.com/layout)

## FAQ

**Q: How do I customize the layout structure?**  
A: Modify the CSS styles in `Layout.module.scss` or override the CSS custom properties in your application's CSS or theme.

**Q: Can I use different components within the layout?**  
A: Yes, you can use any React components within the Header, Sidebar, and Content areas.

## Contribution

Contributions are welcome! Please follow the contribution guidelines in the repository.

## License

MIT
