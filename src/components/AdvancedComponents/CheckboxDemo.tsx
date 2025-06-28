import { useState } from 'preact/hooks';

import { Card } from '../Card';
import { Checkbox } from '../Checkbox';

export const CheckboxDemo = () => {
  const [basicChecked, setBasicChecked] = useState(false);
  const [indeterminateChecked, setIndeterminateChecked] = useState(false);
  const [errorChecked, setErrorChecked] = useState(true);

  return (
    <Card title="Checkbox Component" subtitle="MD3 Selection Control with various states">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Basic States */}
        <div>
          <h4 style={{ marginBottom: '1rem' }}>Basic States</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Checkbox
              label="Controlled Checkbox"
              checked={basicChecked}
              onChange={(e: Event & { currentTarget: HTMLInputElement }) =>
                setBasicChecked(e.currentTarget.checked)
              }
              helperText="This checkbox state is controlled by React"
            />
            <Checkbox
              label="Uncontrolled Checkbox"
              defaultChecked={false}
              helperText="This checkbox manages its own state"
            />
            <Checkbox
              label="Indeterminate State"
              indeterminate={true}
              checked={indeterminateChecked}
              onChange={(e: Event & { currentTarget: HTMLInputElement }) =>
                setIndeterminateChecked(e.currentTarget.checked)
              }
              helperText="Useful for parent/child relationships"
            />
            <Checkbox label="Disabled Unchecked" disabled={true} checked={false} />
            <Checkbox label="Disabled Checked" disabled={true} checked={true} />
          </div>
        </div>

        {/* Size Variants */}
        <div>
          <h4 style={{ marginBottom: '1rem' }}>Size Variants</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Checkbox label="Small Checkbox" size="small" defaultChecked={true} />
            <Checkbox label="Medium Checkbox (default)" size="medium" defaultChecked={true} />
            <Checkbox label="Large Checkbox" size="large" defaultChecked={true} />
          </div>
        </div>

        {/* Color Variants */}
        <div>
          <h4 style={{ marginBottom: '1rem' }}>Color Variants</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Checkbox label="Primary Color (default)" color="primary" defaultChecked={true} />
            <Checkbox label="Secondary Color" color="secondary" defaultChecked={true} />
            <Checkbox label="Error Color" color="error" defaultChecked={true} />
          </div>
        </div>

        {/* Error States */}
        <div>
          <h4 style={{ marginBottom: '1rem' }}>Validation & Error States</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Checkbox
              label="Required Checkbox"
              required={true}
              checked={errorChecked}
              onChange={(e: Event & { currentTarget: HTMLInputElement }) =>
                setErrorChecked(e.currentTarget.checked)
              }
              error={!errorChecked}
              helperText={!errorChecked ? 'This field is required' : 'All good!'}
            />
            <Checkbox
              label="Terms and Conditions"
              required={true}
              error={true}
              helperText="You must accept the terms and conditions"
            />
          </div>
        </div>

        {/* Instructions */}
        <div
          style={{
            padding: '1rem',
            backgroundColor: 'var(--color-surface-variant)',
            borderRadius: '8px',
            fontSize: '0.875rem',
            color: 'var(--color-on-surface-variant)',
          }}
        >
          <strong>💡 Features Demonstrated:</strong>
          <ul style={{ margin: '0.5rem 0 0 1rem', paddingLeft: '1rem' }}>
            <li>Controlled and uncontrolled checkbox states</li>
            <li>Indeterminate state for parent/child relationships</li>
            <li>Size variants (small, medium, large)</li>
            <li>Color variants (primary, secondary, error)</li>
            <li>Error states with validation helper text</li>
            <li>Disabled states (checked and unchecked)</li>
            <li>Required field indicators</li>
            <li>Full keyboard accessibility support</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};
