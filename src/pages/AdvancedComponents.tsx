import { PageHeader } from '../components/PageHeader';
import { Content } from '../components/Content';
import { SnackbarProvider } from '../components/Snackbar';
import { Tabs, Tab, TabPanel } from '../components/Tabs';

import { FormComponentsTab } from './AdvancedComponents/FormComponentsTab';
import { CommunicationComponentsTab } from './AdvancedComponents/CommunicationComponentsTab';
import { NavigationComponentsTab } from './AdvancedComponents/NavigationComponentsTab';
import { ActionComponentsTab } from './AdvancedComponents/ActionComponentsTab';
import { DataComponentsTab } from './AdvancedComponents/DataComponentsTab';
import { StatusTab } from './AdvancedComponents/StatusTab';

const AdvancedComponentsContent = () => {
  return (
    <Content>
      <PageHeader
        title="Advanced Components"
        subtitle="Testing all completed Material Design 3 components with comprehensive examples"
      />

      <div style={{ maxWidth: '1200px', marginTop: '2rem' }}>
        <Tabs defaultValue="form" variant="primary">
          <Tab value="form" label="📋 Form" />
          <Tab value="communication" label="💬 Communication" />
          <Tab value="navigation" label="🧭 Navigation" />
          <Tab value="action" label="🎯 Action" />
          <Tab value="data" label="📊 Data" />
          <Tab value="status" label="📈 Status" />

          <TabPanel value="form">
            <FormComponentsTab />
          </TabPanel>

          <TabPanel value="communication">
            <CommunicationComponentsTab />
          </TabPanel>

          <TabPanel value="navigation">
            <NavigationComponentsTab />
          </TabPanel>

          <TabPanel value="action">
            <ActionComponentsTab />
          </TabPanel>

          <TabPanel value="data">
            <DataComponentsTab />
          </TabPanel>

          <TabPanel value="status">
            <StatusTab />
          </TabPanel>
        </Tabs>
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
