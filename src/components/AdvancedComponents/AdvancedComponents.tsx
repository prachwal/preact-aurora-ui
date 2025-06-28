import { PageHeader } from '../PageHeader';
import { Content } from '../Content';
import { SnackbarProvider } from '../Snackbar';

import { TextFieldDemo } from './TextFieldDemo';
import { CheckboxDemo } from './CheckboxDemo';
import { SnackbarDemo } from './SnackbarDemo';
import { ComponentStatus } from './ComponentStatus';

const AdvancedComponentsContent = () => {
  return (
    <Content>
      <PageHeader
        title="Advanced Components"
        subtitle="Testing TextField, Checkbox, and Snackbar components with Material Design 3"
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px' }}>
        <TextFieldDemo />
        <CheckboxDemo />
        <SnackbarDemo />
        <ComponentStatus />
      </div>
    </Content>
  );
};

export function AdvancedComponents() {
  return (
    <SnackbarProvider maxSnackbars={3}>
      <AdvancedComponentsContent />
    </SnackbarProvider>
  );
}
