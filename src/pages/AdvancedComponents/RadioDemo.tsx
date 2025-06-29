import { useState } from 'preact/hooks';
import { Radio, RadioGroup } from '../../components/Radio';
import { Card } from '../../components/Card';

export function RadioDemo() {
  const [value, setValue] = useState('option1');
  const [customValue, setCustomValue] = useState('small');

  return (
    <Card>
      <h2>Radio Component Demo</h2>
      <p>Material Design 3 Radio buttons with group management</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <h3>Basic Radio Group</h3>
          <RadioGroup
            name="basic-radio"
            value={value}
            onChange={setValue}
          >
            <Radio value="option1" label="Option 1" />
            <Radio value="option2" label="Option 2" />
            <Radio value="option3" label="Option 3" />
            <Radio value="option4" label="Disabled Option" disabled />
          </RadioGroup>
          <p>Selected: {value}</p>
        </div>

        <div>
          <h3>Horizontal Layout</h3>
          <RadioGroup
            name="horizontal-radio"
            value={customValue}
            onChange={setCustomValue}
            orientation="horizontal"
          >
            <Radio value="small" label="Small" />
            <Radio value="medium" label="Medium" />
            <Radio value="large" label="Large" />
          </RadioGroup>
          <p>Selected size: {customValue}</p>
        </div>

        <div>
          <h3>With Helper Text</h3>
          <RadioGroup
            name="helper-radio"
            value="default"
            helperText="Choose your preferred notification method"
          >
            <Radio value="email" label="Email notifications" />
            <Radio value="sms" label="SMS notifications" />
            <Radio value="push" label="Push notifications" />
            <Radio value="none" label="No notifications" />
          </RadioGroup>
        </div>

        <div>
          <h3>Error State</h3>
          <RadioGroup
            name="error-radio"
            value=""
            error={true}
            helperText="Please select an option"
          >
            <Radio value="yes" label="Yes" />
            <Radio value="no" label="No" />
          </RadioGroup>
        </div>
      </div>
    </Card>
  );
}
