import { ComponentStatus } from './ComponentStatus';

export function StatusTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h3>📈 Implementation Status</h3>
      <ComponentStatus />
    </div>
  );
}
