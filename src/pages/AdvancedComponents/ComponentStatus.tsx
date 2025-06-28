import { Card } from '../../components/Card';

export const ComponentStatus = () => {
  return (
    <Card title="Implementation Status" subtitle="Current state of Advanced Components">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem',
        }}
      >
        {/* Completed */}
        <div
          style={{
            padding: '1rem',
            backgroundColor: 'var(--color-success-container)',
            borderRadius: '8px',
          }}
        >
          <h4 style={{ color: 'var(--color-on-success-container)', margin: '0 0 0.5rem 0' }}>
            ✅ Completed (4/10)
          </h4>
          <ul
            style={{
              margin: 0,
              paddingLeft: '1rem',
              color: 'var(--color-on-success-container)',
            }}
          >
            <li>
              <strong>TextField</strong> - Full MD3 implementation
            </li>
            <li>
              <strong>Snackbar</strong> - Complete notification system
            </li>
            <li>
              <strong>Checkbox</strong> - Selection control with all states
            </li>
            <li>
              <strong>Tooltip</strong> - Contextual help with positioning
            </li>
          </ul>
        </div>

        {/* In Progress */}
        <div
          style={{
            padding: '1rem',
            backgroundColor: 'var(--color-warning-container)',
            borderRadius: '8px',
          }}
        >
          <h4 style={{ color: 'var(--color-on-warning-container)', margin: '0 0 0.5rem 0' }}>
            🔄 Next Priority (6/10)
          </h4>
          <ul
            style={{
              margin: 0,
              paddingLeft: '1rem',
              color: 'var(--color-on-warning-container)',
            }}
          >
            <li>Badge - Status indicators</li>
            <li>Radio - Single selection</li>
            <li>Switch - Toggle component</li>
            <li>Tabs - Content organization</li>
            <li>FAB - Floating action button</li>
            <li>Icon Button - Compact actions</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};
