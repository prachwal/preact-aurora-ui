# FAB Component

## Description

The `FAB` (Floating Action Button) component represents the primary action in an application.

## Usage

```tsx
import { FAB } from '@aurora-ui/components';

function App() {
  return <FAB icon="add" onClick={() => alert('FAB clicked!')} />;
}
```

## API

### Props

| Prop      | Type         | Default | Description                                               |
| --------- | ------------ | ------- | --------------------------------------------------------- |
| icon      | `string`     |         | The name of the icon to display in the FAB.               |
| onClick   | `() => void` |         | Callback function to be executed when the FAB is clicked. |
| disabled  | `boolean`    | `false` | Whether the FAB is disabled.                              |
| className | `string`     |         | Additional CSS classes for custom styling.                |

### Types

See [`FAB.tsx`](./FAB.tsx) for detailed type definitions.

## Styling and Theming

The `FAB` uses SCSS Modules for styling, following the Material Design 3 guidelines. It leverages custom properties defined in `src/styles/colors.scss`, `src/styles/typography.scss`, and `src/styles/spacing.scss` for theming.

See [`FAB.module.scss`](./FAB.module.scss) for details.

## Accessibility

The `FAB` component provides basic accessibility features. Use ARIA attributes to provide more context.

## Testing

See [`FAB.test.tsx`](./FAB.test.tsx) for unit tests.

## Storybook

[Link to Storybook story](https://your-storybook-url.com/fab)

## FAQ

**Q: How do I change the FAB's icon?**  
A: Use the `icon` prop.

**Q: How do I disable the FAB?**  
A: Use the `disabled` prop.

## Contribution

Contributions are welcome! Please follow the contribution guidelines in the repository.

## License

MIT
