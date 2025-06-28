import { render, screen, fireEvent } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

import { DataTable } from './DataTable';
import type { Column, RowData } from './types';

// Mock data
const mockColumns: Column[] = [
  { id: 'id', label: 'ID', field: 'id', type: 'number', sortable: true },
  { id: 'name', label: 'Name', field: 'name', type: 'text', sortable: true },
  { id: 'email', label: 'Email', field: 'email', type: 'text' },
  { id: 'age', label: 'Age', field: 'age', type: 'number', sortable: true },
  { id: 'active', label: 'Active', field: 'active', type: 'boolean' },
];

const mockData: RowData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30, active: true },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25, active: false },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35, active: true },
];

describe('DataTable', () => {
  it('renders table with data', () => {
    render(<DataTable columns={mockColumns} data={mockData} />);

    // Check headers
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();

    // Check data
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('35')).toBeInTheDocument();
  });

  it('renders loading state', () => {
    render(<DataTable columns={mockColumns} data={[]} loading />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    render(<DataTable columns={mockColumns} data={[]} emptyMessage="No data found" />);

    expect(screen.getByText('No data found')).toBeInTheDocument();
  });

  it('renders error state', () => {
    render(<DataTable columns={mockColumns} data={[]} error errorMessage="Failed to load" />);

    expect(screen.getByText('Failed to load')).toBeInTheDocument();
  });

  it('handles sorting', async () => {
    const user = userEvent.setup();
    const handleSort = vi.fn();

    render(<DataTable columns={mockColumns} data={mockData} sortable onSort={handleSort} />);

    const nameHeader = screen.getByText('Name');
    await user.click(nameHeader);

    expect(handleSort).toHaveBeenCalledWith({
      field: 'name',
      direction: 'asc',
    });
  });

  it('handles row selection', async () => {
    const user = userEvent.setup();
    const handleSelectionChange = vi.fn();

    render(
      <DataTable
        columns={mockColumns}
        data={mockData}
        selectable="multiple"
        selection={{
          selectedRows: [],
          onSelectionChange: handleSelectionChange,
        }}
      />,
    );

    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[1]); // First data row checkbox

    expect(handleSelectionChange).toHaveBeenCalledWith([1]);
  });

  it('handles search', async () => {
    const handleSearch = vi.fn();

    render(<DataTable columns={mockColumns} data={mockData} searchable onSearch={handleSearch} />);

    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toBeInTheDocument();

    // Try with fireEvent first to see if event handling works
    fireEvent.change(searchInput, { target: { value: 'John' } });

    expect(handleSearch).toHaveBeenCalledWith('John');
  });

  it('handles pagination', async () => {
    const user = userEvent.setup();
    const handlePageChange = vi.fn();

    render(
      <DataTable
        columns={mockColumns}
        data={mockData}
        pagination={{
          page: 1,
          pageSize: 2,
          total: 3,
          onChange: handlePageChange,
        }}
      />,
    );

    const nextButton = screen.getByLabelText('Go to next page');
    await user.click(nextButton);

    expect(handlePageChange).toHaveBeenCalledWith(2, 2);
  });

  it('renders custom cell content', () => {
    const customColumns: Column[] = [
      {
        id: 'name',
        label: 'Name',
        field: 'name',
        render: (value) => <strong>{value}</strong>,
      },
    ];

    render(<DataTable columns={customColumns} data={mockData} />);

    const strongElement = screen.getByRole('cell', { name: /john doe/i });
    expect(strongElement.querySelector('strong')).toBeInTheDocument();
  });

  it('handles export', async () => {
    const user = userEvent.setup();
    const handleExport = vi.fn();

    render(<DataTable columns={mockColumns} data={mockData} onExport={handleExport} />);

    const csvButton = screen.getByText('Export CSV');
    await user.click(csvButton);

    expect(handleExport).toHaveBeenCalledWith('csv');
  });
});
