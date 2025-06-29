# ThemeProvider Component

## Description

The `ThemeProvider` component provides a way to customize the theme of the application.

## Usage

```tsx
import { ThemeProvider } from '@aurora-ui/components';

function App() {
  return (
    <ThemeProvider theme={{ primaryColor: 'red' }}>
      <Button>Click me</Button>
    </ThemeProvider>
  );
}
```

## API

### Props

| Prop      | Type        | Default | Description                                                         |
| --------- | ----------- | ------- | ------------------------------------------------------------------- |
| theme     | `object`    |         | An object containing theme variables to override the default theme. |
| children  | `ReactNode` |         | The components to which the theme should be applied.                |
| className | `string`    |         | Additional CSS classes for custom styling.                          |

### Types

The `theme` prop accepts an object with key-value pairs, where the keys are CSS custom property names (e.g., `--color-primary`) and the values are the desired values for those properties.

See [`ThemeProvider.tsx`](./ThemeProvider.tsx) for detailed type definitions.

## Styling and Theming

The `ThemeProvider` uses CSS custom properties to apply the theme. It leverages custom properties defined in `src/styles/colors.scss`, `src/styles/typography.scss`, and `src/styles/spacing.scss` for theming.

See [`ThemeProvider.module.scss`](./ThemeProvider.module.scss) for details.

## Accessibility

The `ThemeProvider` component does not directly affect accessibility. However, it can be used to customize the theme to improve accessibility (e.g., by providing high-contrast color schemes).

## Testing

See [`ThemeProvider.test.tsx`](./ThemeProvider.test.tsx) for unit tests.

## Storybook

[Link to Storybook story](https://your-storybook-url.com/themeprovider-component)

## FAQ

**Q: How do I change the primary color of the application?**  
A: Pass a `theme` prop with a `primaryColor` property to the `ThemeProvider` component.

**Q: Can I use different themes in different parts of the application?**  
A: Yes, you can nest `ThemeProvider` components to apply different themes to different parts of the application.

## Contribution

Contributions are welcome! Please follow the contribution guidelines in the repository.

## License

MIT
