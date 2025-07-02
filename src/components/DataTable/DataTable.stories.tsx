import type { Meta, StoryObj } from '@storybook/preact';
import { useState } from 'preact/hooks';

import { DataTable } from './DataTable';
import type { Column, RowData, SortConfig, SelectionConfig } from './types';

const meta: Meta<typeof DataTable> = {
  title: 'Advanced/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Material Design 3 Data Table component for displaying and managing tabular data.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataTable>;

// Sample data
const sampleColumns: Column[] = [
  { id: 'id', label: 'ID', field: 'id', type: 'number', sortable: true, width: 80 },
  { id: 'name', label: 'Name', field: 'name', type: 'text', sortable: true },
  { id: 'email', label: 'Email', field: 'email', type: 'text', sortable: true },
  { id: 'age', label: 'Age', field: 'age', type: 'number', sortable: true, width: 100 },
  { id: 'department', label: 'Department', field: 'department', type: 'text', sortable: true },
  {
    id: 'salary',
    label: 'Salary',
    field: 'salary',
    type: 'number',
    sortable: true,
    align: 'right',
  },
  { id: 'active', label: 'Active', field: 'active', type: 'boolean', width: 100, align: 'center' },
];

const generateSampleData = (count: number): RowData[] => {
  const names = [
    'John Doe',
    'Jane Smith',
    'Bob Johnson',
    'Alice Brown',
    'Charlie Wilson',
    'Diana Lee',
    'Eva Garcia',
    'Frank Miller',
  ];
  const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: names[i % names.length],
    email: `user${i + 1}@example.com`,
    age: 25 + (i % 40),
    department: departments[i % departments.length],
    salary: 50000 + (i % 10) * 10000,
    active: i % 3 !== 0,
  }));
};

const sampleData = generateSampleData(50);

export const Basic: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData.slice(0, 5),
  },
};

export const WithSorting: Story = {
  render: (args: any) => {
    const [sortConfig, setSortConfig] = useState<SortConfig | undefined>();

    return <DataTable {...args} sortable sortConfig={sortConfig} onSort={setSortConfig} />;
  },
  args: {
    columns: sampleColumns,
    data: sampleData.slice(0, 10),
  },
};

export const WithSelection: Story = {
  render: (args: any) => {
    const [selection, setSelection] = useState<SelectionConfig>({
      selectedRows: [],
      onSelectionChange: (selectedRows) => setSelection((prev) => ({ ...prev, selectedRows })),
    });

    return <DataTable {...args} selectable="multiple" selection={selection} />;
  },
  args: {
    columns: sampleColumns,
    data: sampleData.slice(0, 10),
  },
};

export const WithPagination: Story = {
  render: (args: any) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const handlePageChange = (newPage: number, newPageSize: number) => {
      setPage(newPage);
      setPageSize(newPageSize);
    };

    return (
      <DataTable
        {...args}
        pagination={{
          page,
          pageSize,
          total: sampleData.length,
          onChange: handlePageChange,
        }}
      />
    );
  },
  args: {
    columns: sampleColumns,
    data: sampleData,
  },
};

export const WithSearch: Story = {
  render: (args: any) => {
    const [searchValue, setSearchValue] = useState('');

    return <DataTable {...args} searchable searchValue={searchValue} onSearch={setSearchValue} />;
  },
  args: {
    columns: sampleColumns,
    data: sampleData.slice(0, 20),
  },
};

export const FullFeatured: Story = {
  render: (args: any) => {
    const [sortConfig, setSortConfig] = useState<SortConfig | undefined>();
    const [searchValue, setSearchValue] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selection, setSelection] = useState<SelectionConfig>({
      selectedRows: [],
      onSelectionChange: (selectedRows) => setSelection((prev) => ({ ...prev, selectedRows })),
    });

    const handlePageChange = (newPage: number, newPageSize: number) => {
      setPage(newPage);
      setPageSize(newPageSize);
    };

    const handleExport = (format: 'csv' | 'json') => {
      console.log(`Exporting as ${format}`);
    };

    return (
      <DataTable
        {...args}
        sortable
        sortConfig={sortConfig}
        onSort={setSortConfig}
        searchable
        searchValue={searchValue}
        onSearch={setSearchValue}
        selectable="multiple"
        selection={selection}
        pagination={{
          page,
          pageSize,
          total: sampleData.length,
          onChange: handlePageChange,
        }}
        onExport={handleExport}
        stickyHeader
        height={500}
      />
    );
  },
  args: {
    columns: sampleColumns,
    data: sampleData,
  },
};

export const Loading: Story = {
  args: {
    columns: sampleColumns,
    data: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    columns: sampleColumns,
    data: [],
    emptyMessage: 'No employees found',
  },
};

export const Error: Story = {
  args: {
    columns: sampleColumns,
    data: [],
    error: true,
    errorMessage: 'Failed to load employee data',
  },
};

export const CustomRendering: Story = {
  args: {
    columns: [
      { id: 'id', label: 'ID', field: 'id', type: 'number', width: 80 },
      { id: 'name', label: 'Name', field: 'name', type: 'text' },
      {
        id: 'email',
        label: 'Email',
        field: 'email',
        type: 'text',
        render: (value: any) => <a href={`mailto:${value}`}>{value}</a>,
      },
      {
        id: 'salary',
        label: 'Salary',
        field: 'salary',
        type: 'number',
        align: 'right',
        render: (value: any) => `$${value.toLocaleString()}`,
      },
      {
        id: 'actions',
        label: 'Actions',
        field: 'id',
        width: 150,
        render: (_: any, _row: any) => (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ padding: '4px 8px', fontSize: '12px' }}>Edit</button>
            <button style={{ padding: '4px 8px', fontSize: '12px' }}>Delete</button>
          </div>
        ),
      },
    ],
    data: sampleData.slice(0, 5),
  },
};
