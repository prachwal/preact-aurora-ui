# BottomNavigation Component

## Description

The `BottomNavigation` component displays a bottom navigation bar for mobile applications.

## Usage

```tsx
import { BottomNavigation, BottomNavigationButton } from '@aurora-ui/components';

function App() {
  return (
    <BottomNavigation>
      <BottomNavigationButton icon="home" label="Home" />
      <BottomNavigationButton icon="search" label="Search" />
      <BottomNavigationButton icon="settings" label="Settings" />
    </BottomNavigation>
  );
}
```

## API

### `BottomNavigation` Props

| Prop      | Type        | Default | Description                                                               |
| --------- | ----------- | ------- | ------------------------------------------------------------------------- |
| children  | `ReactNode` |         | The `BottomNavigationButton` components to display within the navigation. |
| className | `string`    |         | Additional CSS classes for custom styling.                                |

### `BottomNavigationButton` Props

| Prop      | Type         | Default | Description                                                  |
| --------- | ------------ | ------- | ------------------------------------------------------------ |
| icon      | `string`     |         | The icon to display in the button.                           |
| label     | `string`     |         | The label to display below the icon.                         |
| onClick   | `() => void` |         | Callback function to be executed when the button is clicked. |
| className | `string`     |         | Additional CSS classes for custom styling.                   |

### Types

See [`BottomNavigation.tsx`](./BottomNavigation.tsx) and [`BottomNavigationButton.tsx`](./BottomNavigationButton.tsx) for detailed type definitions.

## Styling and Theming

The `BottomNavigation` and `BottomNavigationButton` components use SCSS Modules for styling, following the Material Design 3 guidelines. They leverage custom properties defined in `src/styles/colors.scss`, `src/styles/typography.scss`, and `src/styles/spacing.scss` for theming.

See [`BottomNavigation.module.scss`](./BottomNavigation.module.scss) for details.

## Accessibility

The `BottomNavigation` component provides basic accessibility features. Use ARIA attributes to provide more context.

## Testing

See [`BottomNavigation.test.tsx`](./BottomNavigation.test.tsx) for unit tests.

## Storybook

[Link to Storybook story] (Coming soon)

## FAQ

**Q: How do I add more buttons to the navigation?**  
A: Add more `BottomNavigationButton` components as children of the `BottomNavigation` component.

**Q: How do I handle clicks on the buttons?**  
A: Use the `onClick` prop on the `BottomNavigationButton` component.

## Contribution

Contributions are welcome! Please follow the contribution guidelines.

## License

MIT
