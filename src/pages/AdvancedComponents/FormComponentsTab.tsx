import { TextFieldDemo } from './TextFieldDemo';
import { CheckboxDemo } from './CheckboxDemo';
import { RadioDemo } from './RadioDemo';
import { SelectDemo } from './SelectDemo';
import { SwitchDemo } from './SwitchDemo';
import { SliderDemo } from './SliderDemo';

export function FormComponentsTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h3>📋 Form Components</h3>
      <TextFieldDemo />
      <CheckboxDemo />
      <RadioDemo />
      <SelectDemo />
      <SwitchDemo />
      <SliderDemo />
    </div>
  );
}
