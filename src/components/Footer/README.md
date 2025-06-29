# Footer Component

## Description

The `Footer` component typically displays copyright information, links to terms of service, and other supplementary content at the bottom of the page.

## Usage

```tsx
import { Footer } from '@aurora-ui/components';

function App() {
  return <Footer>&copy; 2023 My App</Footer>;
}
```

## API

### Props

| Prop      | Type        | Default | Description                                |
| --------- | ----------- | ------- | ------------------------------------------ |
| children  | `ReactNode` |         | The content to display within the footer.  |
| className | `string`    |         | Additional CSS classes for custom styling. |

### Types

See [`Footer.tsx`](./Footer.tsx) for detailed type definitions.

## Styling and Theming

The `Footer` uses SCSS Modules for styling, following the Material Design 3 guidelines. It leverages custom properties defined in `src/styles/colors.scss`, `src/styles/typography.scss`, and `src/styles/spacing.scss` for theming.

See [`Footer.module.scss`](./Footer.module.scss) for details.

## Accessibility

The `Footer` component provides basic accessibility features. Use ARIA attributes to provide more context.

## Testing

See [`Footer.test.tsx`](./Footer.test.tsx) for unit tests.

## Storybook

[Link to Storybook story](https://your-storybook-url.com/footer-component)

## FAQ

**Q: How do I add copyright information to the footer?**  
A: Add a text node or `span` element with the copyright information within the `children` of the `Footer` component.

**Q: How do I add links to the footer?**  
A: Add `a` elements with the appropriate `href` attributes within the `children` of the `Footer` component.

## Contribution

Contributions are welcome! Please follow the contribution guidelines in the repository.

## License

MIT
