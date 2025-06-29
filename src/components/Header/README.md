# Header Component

## Description

The `Header` component typically displays the application's title, logo, and navigation controls at the top of the page.

## Usage

```tsx
import { Header } from '@aurora-ui/components';

function App() {
  return <Header>My App</Header>;
}
```

## API

### Props

| Prop      | Type        | Default | Description                                |
| --------- | ----------- | ------- | ------------------------------------------ |
| children  | `ReactNode` |         | The content to display within the header.  |
| className | `string`    |         | Additional CSS classes for custom styling. |

### Types

See [`Header.tsx`](./Header.tsx) for detailed type definitions.

## Styling and Theming

The `Header` uses SCSS Modules for styling, following the Material Design 3 guidelines. It leverages custom properties defined in `src/styles/colors.scss`, `src/styles/typography.scss`, and `src/styles/spacing.scss` for theming.

See [`Header.module.scss`](./Header.module.scss) for details.

## Accessibility

The `Header` component provides basic accessibility features. Use ARIA attributes to provide more context.

## Testing

See [`Header.test.tsx`](./Header.test.tsx) for unit tests.

## Storybook

[Link to Storybook story](https://your-storybook-url.com/header)

## FAQ

**Q: How do I add a logo to the header?**  
A: Add an `img` element within the `children` of the `Header` component.

**Q: How do I add navigation controls to the header?**  
A: Add navigation components (e.g., `Button`, `Menu`) within the `children` of the `Header` component.

## Contribution

Contributions are welcome! Please follow the contribution guidelines in the repository.

## License

MIT
