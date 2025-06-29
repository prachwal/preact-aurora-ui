import { useState } from 'preact/hooks';

import { Switch } from '../../components/Switch';
import { Card } from '../../components/Card';

export function SwitchDemo() {
  const [checked1, setChecked1] = useState(false);

  const handleChange = (event: Event & { currentTarget: HTMLInputElement }) => {
    setChecked1(event.currentTarget.checked);
  };

  return (
    <Card>
      <h2>Switch Component Demo</h2>
      <p>Material Design 3 Switch with smooth animations</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <h3>Basic Switch</h3>
          <Switch checked={checked1} onChange={handleChange} label="Enable notifications" />
          <p>
            Note: This is a simplified demo. Check the Switch component documentation for full API
            details.
          </p>
        </div>
      </div>
    </Card>
  );
}
