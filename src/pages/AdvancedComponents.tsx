import { PageHeader } from '../components/PageHeader';
import { Content } from '../components/Content';
import { SnackbarProvider } from '../components/Snackbar';

import { TextFieldDemo } from './AdvancedComponents/TextFieldDemo';
import { CheckboxDemo } from './AdvancedComponents/CheckboxDemo';
import { SnackbarDemo } from './AdvancedComponents/SnackbarDemo';
import { TooltipDemo } from './AdvancedComponents/TooltipDemo';
import { TabsDemo } from './AdvancedComponents/TabsDemo';
import { ComponentStatus } from './AdvancedComponents/ComponentStatus';

const AdvancedComponentsContent = () => {
  return (
    <Content>
      <PageHeader
        title="Advanced Components"
        subtitle="Testing TextField, Checkbox, Snackbar, Tooltip, and Tabs components with Material Design 3"
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px' }}>
        <TextFieldDemo />
        <CheckboxDemo />
        <SnackbarDemo />
        <TooltipDemo />
        <TabsDemo />
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
