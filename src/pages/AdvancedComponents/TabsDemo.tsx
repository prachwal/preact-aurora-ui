import { useState } from 'preact/hooks';

import { Tabs, Tab, TabPanel } from '../../components/Tabs';

export function TabsDemo() {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <div style={{ padding: '20px' }}>
      <h1>Tabs Demo</h1>

      <section style={{ marginBottom: '40px' }}>
        <h2>Basic Tabs</h2>
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tab value="tab1" label="Tab 1" />
          <Tab value="tab2" label="Tab 2" />
          <Tab value="tab3" label="Tab 3" />

          <TabPanel value="tab1">
            <h3>Panel 1</h3>
            <p>This is the content for tab 1.</p>
          </TabPanel>

          <TabPanel value="tab2">
            <h3>Panel 2</h3>
            <p>This is the content for tab 2.</p>
          </TabPanel>

          <TabPanel value="tab3">
            <h3>Panel 3</h3>
            <p>This is the content for tab 3.</p>
          </TabPanel>
        </Tabs>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>Secondary Variant</h2>
        <Tabs variant="secondary" defaultValue="sec1">
          <Tab value="sec1" label="Secondary 1" />
          <Tab value="sec2" label="Secondary 2" />

          <TabPanel value="sec1">
            <p>Secondary tab 1 content</p>
          </TabPanel>

          <TabPanel value="sec2">
            <p>Secondary tab 2 content</p>
          </TabPanel>
        </Tabs>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>Centered Tabs</h2>
        <Tabs centered defaultValue="cent1">
          <Tab value="cent1" label="Centered 1" />
          <Tab value="cent2" label="Centered 2" />
          <Tab value="cent3" label="Centered 3" />

          <TabPanel value="cent1">
            <p>Centered tab 1</p>
          </TabPanel>

          <TabPanel value="cent2">
            <p>Centered tab 2</p>
          </TabPanel>

          <TabPanel value="cent3">
            <p>Centered tab 3</p>
          </TabPanel>
        </Tabs>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>Full Width Tabs</h2>
        <Tabs fullWidth defaultValue="full1">
          <Tab value="full1" label="Full 1" />
          <Tab value="full2" label="Full 2" />

          <TabPanel value="full1">
            <p>Full width tab 1</p>
          </TabPanel>

          <TabPanel value="full2">
            <p>Full width tab 2</p>
          </TabPanel>
        </Tabs>
      </section>
    </div>
  );
}
