# DataTable Component

A comprehensive Material Design 3 data table component for displaying and managing tabular data with advanced features like sorting, filtering, pagination, selection, and virtual scrolling.

## Overview

The DataTable component provides a complete solution for data presentation with:

- **Sorting**: Multi-column sorting with visual indicators
- **Selection**: Single or multiple row selection with select-all
- **Pagination**: Configurable pagination with page size controls
- **Filtering**: Column-based filtering with multiple operators
- **Search**: Global search across all data
- **Virtual Scrolling**: Performance optimization for large datasets
- **Export**: Built-in CSV/JSON export functionality
- **Responsive**: Mobile-friendly with horizontal scrolling

## Basic Usage

```tsx
import { DataTable } from '@aurora-ui/preact-aurora-ui';

function UserList() {
  const columns = [
    { id: 'id', label: 'ID', field: 'id', type: 'number', sortable: true },
    { id: 'name', label: 'Name', field: 'name', type: 'text', sortable: true },
    { id: 'email', label: 'Email', field: 'email', type: 'text' },
    { id: 'age', label: 'Age', field: 'age', type: 'number', sortable: true },
  ];

  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35 },
  ];

  return <DataTable columns={columns} data={data} />;
}
```

## API Reference

### DataTable Props

| Prop                  | Type                                    | Default                 | Description                     |
| --------------------- | --------------------------------------- | ----------------------- | ------------------------------- |
| `columns`             | `Column[]`                              | **required**            | Column definitions              |
| `data`                | `RowData[]`                             | **required**            | Table row data                  |
| `loading`             | `boolean`                               | `false`                 | Show loading state              |
| `error`               | `boolean`                               | `false`                 | Show error state                |
| `errorMessage`        | `string`                                | `'Failed to load data'` | Error message text              |
| `emptyMessage`        | `string`                                | `'No data available'`   | Empty state message             |
| `sortable`            | `boolean`                               | `false`                 | Enable column sorting           |
| `sortConfig`          | `SortConfig`                            |                         | Current sort configuration      |
| `onSort`              | `(sortConfig: SortConfig) => void`      |                         | Sort change handler             |
| `selectable`          | `'none' \| 'single' \| 'multiple'`      | `'none'`                | Row selection mode              |
| `selection`           | `SelectionConfig`                       |                         | Selection configuration         |
| `filterable`          | `boolean`                               | `false`                 | Enable column filtering         |
| `filters`             | `FilterConfig[]`                        |                         | Current filters                 |
| `onFilter`            | `(filters: FilterConfig[]) => void`     |                         | Filter change handler           |
| `searchable`          | `boolean`                               | `false`                 | Enable global search            |
| `searchValue`         | `string`                                |                         | Current search value            |
| `onSearch`            | `(value: string) => void`               |                         | Search change handler           |
| `pagination`          | `PaginationConfig`                      |                         | Pagination configuration        |
| `virtualScroll`       | `boolean`                               | `false`                 | Enable virtual scrolling        |
| `virtualScrollHeight` | `number`                                | `400`                   | Virtual scroll container height |
| `stickyHeader`        | `boolean`                               | `false`                 | Make header sticky              |
| `height`              | `number \| string`                      |                         | Table height                    |
| `maxHeight`           | `number \| string`                      |                         | Table max height                |
| `onRowClick`          | `(row: RowData, index: number) => void` |                         | Row click handler               |
| `onRowDoubleClick`    | `(row: RowData, index: number) => void` |                         | Row double click handler        |
| `onExport`            | `(format: 'csv' \| 'json') => void`     |                         | Export handler                  |
| `className`           | `string`                                |                         | Additional CSS classes          |

### Column Definition

```tsx
interface Column {
  id: string; // Unique identifier
  label: string; // Display label
  field: string; // Data field name
  type?: 'text' | 'number' | 'date' | 'boolean' | 'custom';
  sortable?: boolean; // Enable sorting
  filterable?: boolean; // Enable filtering
  width?: number | string; // Column width
  minWidth?: number; // Minimum width
  maxWidth?: number; // Maximum width
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: RowData, column: Column) => ComponentChildren;
}
```

### Row Data

```tsx
interface RowData {
  id: string | number; // Unique identifier
  [key: string]: any; // Data fields
}
```

## Advanced Examples

### Sortable Table with Pagination

```tsx
function SortableTable() {
  const [sortConfig, setSortConfig] = useState({ field: 'name', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const columns = [
    { id: 'name', label: 'Name', field: 'name', sortable: true },
    { id: 'email', label: 'Email', field: 'email', sortable: true },
    { id: 'department', label: 'Department', field: 'department', sortable: true },
    {
      id: 'salary',
      label: 'Salary',
      field: 'salary',
      type: 'number',
      sortable: true,
      align: 'right',
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      sortable
      sortConfig={sortConfig}
      onSort={setSortConfig}
      pagination={{
        page: currentPage,
        pageSize,
        total: data.length,
        onChange: (page) => setCurrentPage(page),
      }}
    />
  );
}
```

### Selectable Table with Actions

```tsx
function SelectableTable() {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleDelete = () => {
    console.log('Deleting rows:', selectedRows);
    setSelectedRows([]);
  };

  return (
    <div>
      {selectedRows.length > 0 && (
        <div style={{ padding: '16px', background: '#e3f2fd' }}>
          {selectedRows.length} rows selected
          <button onClick={handleDelete}>Delete Selected</button>
        </div>
      )}

      <DataTable
        columns={columns}
        data={data}
        selectable="multiple"
        selection={{
          selectedRows,
          onSelectionChange: setSelectedRows,
        }}
      />
    </div>
  );
}
```

### Searchable and Filterable Table

```tsx
function SearchableTable() {
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState([]);

  return (
    <DataTable
      columns={columns}
      data={data}
      searchable
      searchValue={searchValue}
      onSearch={setSearchValue}
      filterable
      filters={filters}
      onFilter={setFilters}
    />
  );
}
```

### Virtual Scrolling for Large Datasets

```tsx
function LargeDataTable() {
  const largeDataset = generateLargeDataset(10000); // 10k rows

  return (
    <DataTable
      columns={columns}
      data={largeDataset}
      virtualScroll
      virtualScrollHeight={600}
      stickyHeader
      sortable
    />
  );
}
```

### Custom Cell Rendering

```tsx
function CustomTable() {
  const columns = [
    { id: 'name', label: 'Name', field: 'name' },
    {
      id: 'status',
      label: 'Status',
      field: 'status',
      render: (value, row) => (
        <span className={`status-${value}`}>
          {value === 'active' ? '✅ Active' : '❌ Inactive'}
        </span>
      ),
    },
    {
      id: 'actions',
      label: 'Actions',
      field: 'id',
      render: (value, row) => (
        <div>
          <button onClick={() => editUser(row.id)}>Edit</button>
          <button onClick={() => deleteUser(row.id)}>Delete</button>
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
```

### Data Export

```tsx
function ExportableTable() {
  const handleExport = (format) => {
    if (format === 'csv') {
      // Export as CSV
      const csvContent = generateCSV(data, columns);
      downloadFile(csvContent, 'data.csv', 'text/csv');
    } else if (format === 'json') {
      // Export as JSON
      const jsonContent = JSON.stringify(data, null, 2);
      downloadFile(jsonContent, 'data.json', 'application/json');
    }
  };

  return <DataTable columns={columns} data={data} onExport={handleExport} />;
}
```

## useDataTable Hook

For complex data management, use the provided hook:

```tsx
import { useDataTable } from '@aurora-ui/preact-aurora-ui';

function ManagedTable() {
  const {
    processedData,
    sortConfig,
    handleSort,
    searchValue,
    handleSearch,
    selectedRows,
    handleSelection,
    currentPage,
    handlePageChange,
    // ... other utilities
  } = useDataTable({
    data: rawData,
    columns,
    sortable: true,
    searchable: true,
    pagination: true,
    selectable: 'multiple',
  });

  return (
    <DataTable
      columns={columns}
      data={processedData}
      sortable
      sortConfig={sortConfig}
      onSort={(config) => handleSort(config.field)}
      searchable
      searchValue={searchValue}
      onSearch={handleSearch}
      selectable="multiple"
      selection={{
        selectedRows,
        onSelectionChange: (rows) => rows.forEach((id) => handleSelection(id, true)),
      }}
      pagination={{
        page: currentPage,
        pageSize: 10,
        total: rawData.length,
        onChange: handlePageChange,
      }}
    />
  );
}
```

## Accessibility Features

### Keyboard Navigation

- **Tab**: Navigate between sortable headers and interactive elements
- **Enter/Space**: Activate sort on focused header
- **Arrow Keys**: Navigate between cells when applicable

### Screen Reader Support

```tsx
// Comprehensive ARIA labeling
<DataTable
  columns={columns}
  data={data}
  aria-label="User data table"
  sortConfig={sortConfig}
  onSort={handleSort}
/>
```

### High Contrast Support

- Automatic contrast adjustments in high contrast mode
- Focus indicators for keyboard navigation
- Clear visual separation between elements

## Theming and Customization

### CSS Custom Properties

```scss
.custom-table {
  // Surface colors
  --md-sys-color-surface: #ffffff;
  --md-sys-color-on-surface: #1a1a1a;
  --md-sys-color-surface-variant: #f5f5f5;

  // Interactive colors
  --md-sys-color-primary: #6750a4;
  --md-sys-color-on-primary: #ffffff;

  // Border and outline
  --md-sys-color-outline: #e0e0e0;
  --md-sys-color-outline-variant: #f0f0f0;
}
```

### Custom Styling

```scss
// Override default styles
.dataTable {
  border-radius: 16px;

  thead th {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  tbody tr:hover {
    background-color: rgba(103, 80, 164, 0.08);
  }
}
```

## Performance Optimization

### Virtual Scrolling

For large datasets (1000+ rows):

```tsx
<DataTable
  data={largeDataset}
  virtualScroll
  virtualScrollHeight={400}
  // Other props...
/>
```

### Memoization

```tsx
const memoizedColumns = useMemo(
  () => [
    { id: 'name', label: 'Name', field: 'name', sortable: true },
    // ... other columns
  ],
  [],
);

const memoizedData = useMemo(() => processData(rawData), [rawData]);
```

## Testing

### Unit Tests

```tsx
import { render, screen, fireEvent } from '@testing-library/preact';
import { DataTable } from '@aurora-ui/preact-aurora-ui';

test('renders table with data', () => {
  render(<DataTable columns={columns} data={data} />);

  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByRole('table')).toBeInTheDocument();
});

test('handles sorting', async () => {
  const onSort = vi.fn();
  render(<DataTable columns={columns} data={data} sortable onSort={onSort} />);

  const nameHeader = screen.getByText('Name');
  fireEvent.click(nameHeader);

  expect(onSort).toHaveBeenCalledWith({
    field: 'name',
    direction: 'asc',
  });
});
```

### Integration Tests

```tsx
test('complete table workflow', async () => {
  const user = userEvent.setup();

  render(<CompleteTable />);

  // Search
  await user.type(screen.getByPlaceholderText('Search...'), 'John');

  // Sort
  await user.click(screen.getByText('Name'));

  // Select rows
  await user.click(screen.getByRole('checkbox', { name: /select row/i }));

  // Verify state
  expect(screen.getByText('1 rows selected')).toBeInTheDocument();
});
```

## Migration Guide

### From Basic Table

```tsx
// Before: Simple table
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
    {data.map(row => (
      <tr key={row.id}>
        <td>{row.name}</td>
        <td>{row.email}</td>
      </tr>
    ))}
  </tbody>
</table>

// After: DataTable
<DataTable
  columns={[
    { id: 'name', label: 'Name', field: 'name' },
    { id: 'email', label: 'Email', field: 'email' },
  ]}
  data={data}
/>
```

## Common Patterns

### Loading States

```tsx
function AsyncTable() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then((result) => {
      setData(result);
      setLoading(false);
    });
  }, []);

  return (
    <DataTable columns={columns} data={data} loading={loading} emptyMessage="No users found" />
  );
}
```

### Error Handling

```tsx
function ErrorHandlingTable() {
  const [error, setError] = useState(false);

  return (
    <DataTable
      columns={columns}
      data={data}
      error={error}
      errorMessage="Failed to load users. Please try again."
    />
  );
}
```

## Browser Support

- **Modern Browsers**: Full feature support
- **Virtual Scrolling**: Requires Intersection Observer API
- **CSS Grid**: Used for responsive column layouts
- **Flexbox**: Used for internal component layouts

## Related Components

- [Button](../Button/README.md) - For table actions and pagination
- [Checkbox](../Checkbox/README.md) - For row selection
- [TextField](../TextField/README.md) - For search and filters
- [Menu](../Menu/README.md) - For column actions and exports

## Troubleshooting

### Common Issues

**Q: Table not sorting correctly?**  
A: Ensure `sortable: true` on columns and implement `onSort` handler properly.

**Q: Virtual scrolling not working?**  
A: Check that `virtualScrollHeight` is set and container has defined dimensions.

**Q: Selection not updating?**  
A: Verify `selection.onSelectionChange` handler is updating parent state.

**Q: Custom rendering not appearing?**  
A: Check that column `render` function returns valid JSX/component.

**Q: Performance issues with large data?**  
A: Enable virtual scrolling and implement server-side pagination.

### Performance Tips

1. **Memoize columns and data** when possible
2. **Use virtual scrolling** for datasets > 1000 rows
3. **Implement server-side operations** for very large datasets
4. **Debounce search input** to avoid excessive filtering
5. **Use React.memo** for custom cell renderers

## Resources

- [Material Design Data Tables](https://m3.material.io/components/data-tables)
- [WCAG Table Guidelines](https://www.w3.org/WAI/tutorials/tables/)
- [React Virtual Scrolling Guide](https://react-virtual.tanstack.com/)
