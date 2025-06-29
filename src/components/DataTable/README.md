# DataTable Component

## Description

The `DataTable` component displays data in a tabular format with support for sorting, pagination, and selection.

## Usage

```tsx
import { DataTable } from '@aurora-ui/components';

function App() {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
  ];
  const data = [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 },
  ];

  return <DataTable columns={columns} data={data} />;
}
```

## API

### Props

| Prop      | Type       | Default | Description                                |
| --------- | ---------- | ------- | ------------------------------------------ |
| columns   | `Column[]` |         | An array of column definitions.            |
| data      | `any[]`    |         | The data to display in the table.          |
| className | `string`   |         | Additional CSS classes for custom styling. |

### Types

```typescript
interface Column {
  key: string;
  label: string;
}
```

See [`DataTable.tsx`](./DataTable.tsx) for detailed type definitions.

## Styling and Theming

The `DataTable` uses SCSS Modules for styling, following the Material Design 3 guidelines. It leverages custom properties defined in `src/styles/colors.scss`, `src/styles/typography.scss`, and `src/styles/spacing.scss` for theming.

See [`DataTable.module.scss`](./DataTable.module.scss) for details.

## Accessibility

The `DataTable` component provides basic accessibility features. Use ARIA attributes to provide more context.

## Testing

See [`DataTable.test.tsx`](./DataTable.test.tsx) for unit tests.

## Storybook

[Link to Storybook story] (Coming soon)

## FAQ

**Q: How do I add sorting to the table?**  
A: Implement sorting logic in your component and update the data accordingly.

**Q: How do I add pagination to the table?**  
A: Implement pagination logic in your component and display only the current page of data.

## Contribution

Contributions are welcome! Please follow the contribution guidelines.

## License

MIT
