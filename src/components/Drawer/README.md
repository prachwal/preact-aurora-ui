# Drawer Component

## Description

The `Drawer` component is a panel that slides in from the side of the screen to display navigation or other content.

## Usage

```tsx
import { Drawer } from '@aurora-ui/components';

function App() {
  return (
    <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
    </Drawer>
  );
}
```

## API

### Props

| Prop      | Type         | Default | Description                                                             |
| --------- | ------------ | ------- | ----------------------------------------------------------------------- | --------- | -------- | ---------------------------- |
| open      | `boolean`    | `false` | Whether the drawer is open.                                             |
| onClose   | `() => void` |         | Callback function to be executed when the drawer is closed.             |
| children  | `ReactNode`  |         | The content to display within the drawer (typically a navigation menu). |
| placement | `"left"      | "right" | "top"                                                                   | "bottom"` | `"left"` | The placement of the drawer. |
| className | `string`     |         | Additional CSS classes for custom styling.                              |

### Types

See [`Drawer.tsx`](./Drawer.tsx) for detailed type definitions.

## Styling and Theming

The `Drawer` uses SCSS Modules for styling, following the Material Design 3 guidelines. It leverages custom properties defined in `src/styles/colors.scss`, `src/styles/typography.scss`, and `src/styles/spacing.scss` for theming.

See [`Drawer.module.scss`](./Drawer.module.scss) for details.

## Accessibility

The `Drawer` component provides basic accessibility features. Use ARIA attributes to provide more context.

## Testing

See [`Drawer.test.tsx`](./Drawer.test.tsx) for unit tests.

## Storybook

[Link to Storybook story] (Coming soon)

## FAQ

**Q: How do I control the drawer visibility?**  
A: Use the `open` prop to control the drawer visibility in your component.

**Q: How do I add navigation links to the drawer?**  
A: Add navigation components (e.g., `ul`, `li`, `a`) within the `children` of the `Drawer` component.

## Contribution

Contributions are welcome! Please follow the contribution guidelines.

## License

MIT
