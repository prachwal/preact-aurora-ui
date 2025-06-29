# IconButton Component

## Description

The `IconButton` component is a button that displays an icon instead of text.

## Usage

```tsx
import { IconButton } from '@aurora-ui/components';

function App() {
  return <IconButton icon="menu" onClick={() => alert('Menu clicked!')} />;
}
```

## API

### Props

| Prop      | Type       | Default | Description                                |
| --------- | ---------- | ------- | ------------------------------------------ |
| icon      | `string`   |         | The icon to display in the button.         |
| onClick   | `function` |         | Click handler for the button.              |
| disabled  | `boolean`  | `false` | If `true`, the button will be disabled.    |
| className | `string`   |         | Additional CSS classes for custom styling. |

### Types

See [`IconButton.tsx`](./IconButton.tsx) for detailed type definitions.

## Styling and Theming

The `IconButton` uses SCSS Modules for styling, following the Material Design 3 guidelines. It leverages custom properties defined in `src/styles/colors.scss`, `src/styles/typography.scss`, and `src/styles/spacing.scss` for theming.

See [`IconButton.module.scss`](./IconButton.module.scss) for details.

## Accessibility

The `IconButton` component provides basic accessibility features. Use ARIA attributes to provide more context.

## Testing

See [`IconButton.test.tsx`](./IconButton.test.tsx) for unit tests.

## Storybook

[Link to Storybook story](https://your-storybook-url.com/iconbutton-component)

## FAQ

**Q: How do I change the icon displayed in the button?**  
A: Use the `icon` prop.

**Q: How do I disable the icon button?**  
A: Use the `disabled` prop.

## Contribution

Contributions are welcome! Please follow the contribution guidelines in the repository.

## License

MIT
