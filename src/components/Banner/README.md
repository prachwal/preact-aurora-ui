# Banner Component

## Description

The `Banner` component is a prominent notification displayed at the top or bottom of a screen to communicate important information.

## Usage

```tsx
import { Banner } from '@aurora-ui/components';

function App() {
  return <Banner message="Important announcement!" />;
}
```

## API

### Props

| Prop      | Type        | Default     | Description                                                |
| --------- | ----------- | ----------- | ---------------------------------------------------------- | ---------- | ----------- | ------------------------ |
| message   | `string`    |             | The message to display in the banner.                      |
| actions   | `ReactNode` |             | Optional action buttons or links to display in the banner. |
| color     | `"primary"  | "secondary" | "error"                                                    | "neutral"` | `"primary"` | The color of the banner. |
| className | `string`    |             | Additional CSS classes for custom styling.                 |

### Types

See [`Banner.tsx`](./Banner.tsx) for detailed type definitions.

## Styling and Theming

The `Banner` uses SCSS Modules for styling, following the Material Design 3 guidelines. It leverages custom properties defined in `src/styles/colors.scss`, `src/styles/typography.scss`, and `src/styles/spacing.scss` for theming.

See [`Banner.module.scss`](./Banner.module.scss) for details.

## Accessibility

The `Banner` component provides basic accessibility features. Use ARIA attributes to provide more context.

## Testing

See [`Banner.test.tsx`](./Banner.test.tsx) for unit tests.

## Storybook

[Link to Storybook story](https://your-storybook-url.com/banner)

## FAQ

**Q: How do I add action buttons to the banner?**  
A: Use the `actions` prop to pass in React elements (e.g., buttons, links).

**Q: How do I change the banner's color?**  
A: Use the `color` prop or override the CSS custom properties in your application's CSS or theme.

## Contribution

Contributions are welcome! Please follow the contribution guidelines in the repository.

## License

MIT
