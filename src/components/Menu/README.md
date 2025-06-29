# Menu Component

## Description

The `Menu` component displays a list of options, typically used for navigation or actions.

## Usage

```tsx
import { Menu, MenuItem } from '@aurora-ui/components';

function App() {
  return (
    <Menu>
      <MenuItem onClick={() => alert('Option 1 clicked!')}>Option 1</MenuItem>
      <MenuItem onClick={() => alert('Option 2 clicked!')}>Option 2</MenuItem>
    </Menu>
  );
}
```

## API

### `Menu` Props

| Prop      | Type        | Default | Description                                           |
| --------- | ----------- | ------- | ----------------------------------------------------- |
| children  | `ReactNode` |         | The `MenuItem` components to display within the menu. |
| className | `string`    |         | Additional CSS classes for custom styling.            |

### `MenuItem` Props

| Prop      | Type         | Default | Description                                                     |
| --------- | ------------ | ------- | --------------------------------------------------------------- |
| onClick   | `() => void` |         | Callback function to be executed when the menu item is clicked. |
| children  | `ReactNode`  |         | The text to display in the menu item.                           |
| className | `string`     |         | Additional CSS classes for custom styling.                      |

### Types

See [`Menu.tsx`](./Menu.tsx) and [`MenuItem.tsx`](./MenuItem.tsx) for detailed type definitions.

## Styling and Theming

The `Menu` and `MenuItem` components use SCSS Modules for styling, following the Material Design 3 guidelines. They leverage custom properties defined in `src/styles/colors.scss`, `src/styles/typography.scss`, and `src/styles/spacing.scss` for theming.

See [`Menu.module.scss`](./Menu.module.scss) for details.

## Accessibility

The `Menu` component provides basic accessibility features. Use ARIA attributes to provide more context.

## Testing

See [`Menu.test.tsx`](./Menu.test.tsx) for unit tests.

## Storybook

[Link to Storybook story](https://your-storybook-url.com/menu-component)

## FAQ

**Q: How do I add more menu items?**  
A: Add more `MenuItem` components as children of the `Menu` component.

**Q: How do I handle clicks on menu items?**  
A: Use the `onClick` prop on the `MenuItem` component.

## Contribution

Contributions are welcome! Please follow the contribution guidelines in the repository.

## License

MIT
