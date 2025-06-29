# Tabs Component

## Description

The `Tabs` component organizes content into separate sections that can be navigated through a tab list.

## Usage

```tsx
import { Tabs, Tab } from '@aurora-ui/components';

function App() {
  return (
    <Tabs>
      <Tab label="Tab 1">Content for Tab 1</Tab>
      <Tab label="Tab 2">Content for Tab 2</Tab>
    </Tabs>
  );
}
```

## API

### `Tabs` Props

| Prop      | Type        | Default | Description                                        |
| --------- | ----------- | ------- | -------------------------------------------------- |
| children  | `ReactNode` |         | The `Tab` components to display within the `Tabs`. |
| className | `string`    |         | Additional CSS classes for custom styling.         |

### `Tab` Props

| Prop      | Type        | Default | Description                                    |
| --------- | ----------- | ------- | ---------------------------------------------- |
| label     | `string`    |         | The label to display in the tab.               |
| children  | `ReactNode` |         | The content to display when the tab is active. |
| className | `string`    |         | Additional CSS classes for custom styling.     |

### Types

See [`Tabs.tsx`](./Tabs.tsx) and [`Tab.tsx`](./Tab.tsx) for detailed type definitions.

## Styling and Theming

The `Tabs` and `Tab` components use SCSS Modules for styling, following the Material Design 3 guidelines. They leverage custom properties defined in `src/styles/colors.scss`, `src/styles/typography.scss`, and `src/styles/spacing.scss` for theming.

See [`Tabs.module.scss`](./Tabs.module.scss) for details.

## Accessibility

The `Tabs` component provides basic accessibility features. Use ARIA attributes to provide more context.

## Testing

See [`Tabs.test.tsx`](./Tabs.test.tsx) for unit tests.

## Storybook

[Link to Storybook story] (Coming soon)

## FAQ

**Q: How do I add more tabs?**  
A: Add more `Tab` components as children of the `Tabs` component.

**Q: How do I style the active tab?**  
A: Override the CSS custom properties in your application's CSS or theme.

## Contribution

Contributions are welcome! Please follow the contribution guidelines.

## License

MIT
