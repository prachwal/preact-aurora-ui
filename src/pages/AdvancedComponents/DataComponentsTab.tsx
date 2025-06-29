import { DataTableDemo } from './DataTableDemo';

export function DataComponentsTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h3>📊 Data Components</h3>
      <DataTableDemo />
    </div>
  );
}
