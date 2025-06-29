import { DataTable } from '../../components';

export function DataTableDemo() {
  // Sample data with correct structure
  const data = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'Active',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      status: 'Inactive',
    },
  ];

  // Column definitions with correct structure
  const columns = [
    {
      id: 'name',
      label: 'Name',
      field: 'name',
      sortable: true,
    },
    {
      id: 'email',
      label: 'Email',
      field: 'email',
      sortable: true,
    },
    {
      id: 'role',
      label: 'Role',
      field: 'role',
    },
    {
      id: 'status',
      label: 'Status',
      field: 'status',
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <h2>DataTable Demo</h2>

      <div style={{ marginBottom: '24px' }}>
        <h3>Basic DataTable</h3>
        <DataTable columns={columns} data={data} />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h3>Loading State</h3>
        <DataTable columns={columns} data={[]} loading={true} />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h3>Error State</h3>
        <DataTable columns={columns} data={[]} error={true} errorMessage="Failed to load data" />
      </div>
    </div>
  );
}
