import { FAB } from '../../components';

export function FABDemo() {
  return (
    <div style={{ padding: '24px' }}>
      <h2>FAB Demo</h2>
      <p>Floating Action Button component with Material Design 3 styling</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3>Basic FAB</h3>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <FAB icon="+" onClick={() => console.log('Add clicked')} />
            <FAB icon="✏️" onClick={() => console.log('Edit clicked')} />
            <FAB icon="❤️" onClick={() => console.log('Favorite clicked')} />
          </div>
        </div>

        <div>
          <h3>FAB Sizes</h3>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <FAB size="mini" icon="+" onClick={() => console.log('Mini FAB')} />
            <FAB size="regular" icon="+" onClick={() => console.log('Regular FAB')} />
            <FAB size="extended" icon="+" label="Add" onClick={() => console.log('Extended FAB')} />
          </div>
        </div>

        <div>
          <h3>FAB Colors</h3>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <FAB color="surface" icon="⚙️" onClick={() => console.log('Surface')} />
            <FAB color="primary" icon="⚙️" onClick={() => console.log('Primary')} />
            <FAB color="secondary" icon="⚙️" onClick={() => console.log('Secondary')} />
            <FAB color="tertiary" icon="⚙️" onClick={() => console.log('Tertiary')} />
          </div>
        </div>

        <div>
          <h3>Disabled FAB</h3>
          <FAB icon="🚫" disabled onClick={() => console.log('This should not fire')} />
        </div>
      </div>
    </div>
  );
}
