import { FABDemo } from './FABDemo';
import { IconButtonDemo } from './IconButtonDemo';
import { ChipDemo } from './ChipDemo';
import { StepperDemo } from './StepperDemo';

export function ActionComponentsTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h3>🎯 Action Components</h3>
      <IconButtonDemo />
      <ChipDemo />
      <FABDemo />
      <StepperDemo />
    </div>
  );
}
