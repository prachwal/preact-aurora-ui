import type { Meta, StoryObj } from '@storybook/preact';
import { useState } from 'preact/hooks';

import { Tabs, Tab, TabPanel } from './index';

const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Material Design 3 Tabs component for content organization and navigation.

## Features

- **Variants**: Primary and secondary tab styles
- **Navigation**: Keyboard navigation with arrow keys, Home, and End
- **Accessibility**: Full ARIA support and screen reader compatibility
- **Layouts**: Scrollable, centered, and full-width options
- **Icons & Badges**: Support for icons and notification badges
- **Lazy Loading**: Optional lazy loading of tab panels
- **Customization**: Flexible styling and theming support

## Usage

\`\`\`tsx
import { Tabs, Tab, TabPanel } from '@/components/Tabs';

<Tabs defaultValue="tab1">
  <Tab value="tab1" label="Overview" />
  <Tab value="tab2" label="Details" />
  <TabPanel value="tab1">Overview content</TabPanel>
  <TabPanel value="tab2">Details content</TabPanel>
</Tabs>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: '600px' }}>
      <Tabs defaultValue="overview" {...args}>
        <Tab value="overview" label="Overview" />
        <Tab value="features" label="Features" />
        <Tab value="settings" label="Settings" />
        <TabPanel value="overview">
          <div style={{ padding: '16px' }}>
            <h3>Overview</h3>
            <p>
              This is the overview tab panel. It contains general information about the content and
              provides a high-level summary of what users can expect to find.
            </p>
          </div>
        </TabPanel>
        <TabPanel value="features">
          <div style={{ padding: '16px' }}>
            <h3>Features</h3>
            <ul>
              <li>Responsive design</li>
              <li>Keyboard navigation</li>
              <li>Accessibility support</li>
              <li>Customizable styling</li>
            </ul>
          </div>
        </TabPanel>
        <TabPanel value="settings">
          <div style={{ padding: '16px' }}>
            <h3>Settings</h3>
            <p>
              Configure your preferences and customize the behavior of the application to suit your
              needs.
            </p>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '600px' }}>
      <div>
        <h4 style={{ margin: '0 0 1rem 0' }}>Primary (Default)</h4>
        <Tabs variant="primary" defaultValue="tab1">
          <Tab value="tab1" label="Documents" />
          <Tab value="tab2" label="Images" />
          <Tab value="tab3" label="Videos" />
          <TabPanel value="tab1">Documents content</TabPanel>
          <TabPanel value="tab2">Images content</TabPanel>
          <TabPanel value="tab3">Videos content</TabPanel>
        </Tabs>
      </div>
      <div>
        <h4 style={{ margin: '0 0 1rem 0' }}>Secondary</h4>
        <Tabs variant="secondary" defaultValue="tab1">
          <Tab value="tab1" label="Documents" />
          <Tab value="tab2" label="Images" />
          <Tab value="tab3" label="Videos" />
          <TabPanel value="tab1">Documents content</TabPanel>
          <TabPanel value="tab2">Images content</TabPanel>
          <TabPanel value="tab3">Videos content</TabPanel>
        </Tabs>
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <Tabs defaultValue="home">
        <Tab value="home" label="Home" icon="🏠" />
        <Tab value="profile" label="Profile" icon="👤" />
        <Tab value="messages" label="Messages" icon="💬" />
        <Tab value="settings" label="Settings" icon="⚙️" />
        <TabPanel value="home">
          <div style={{ padding: '16px' }}>
            <h3>🏠 Home</h3>
            <p>Welcome to your dashboard. Here you can see an overview of your activity.</p>
          </div>
        </TabPanel>
        <TabPanel value="profile">
          <div style={{ padding: '16px' }}>
            <h3>👤 Profile</h3>
            <p>Manage your personal information and account settings.</p>
          </div>
        </TabPanel>
        <TabPanel value="messages">
          <div style={{ padding: '16px' }}>
            <h3>💬 Messages</h3>
            <p>View and manage your conversations and notifications.</p>
          </div>
        </TabPanel>
        <TabPanel value="settings">
          <div style={{ padding: '16px' }}>
            <h3>⚙️ Settings</h3>
            <p>Configure your application preferences and privacy settings.</p>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <Tabs defaultValue="inbox">
        <Tab value="inbox" label="Inbox" badge="5" />
        <Tab value="sent" label="Sent" />
        <Tab value="drafts" label="Drafts" badge="2" />
        <Tab value="spam" label="Spam" badge="12" />
        <TabPanel value="inbox">
          <div style={{ padding: '16px' }}>
            <h3>Inbox (5 unread)</h3>
            <p>You have 5 new messages in your inbox.</p>
          </div>
        </TabPanel>
        <TabPanel value="sent">
          <div style={{ padding: '16px' }}>
            <h3>Sent Messages</h3>
            <p>View your sent messages and delivery status.</p>
          </div>
        </TabPanel>
        <TabPanel value="drafts">
          <div style={{ padding: '16px' }}>
            <h3>Drafts (2)</h3>
            <p>You have 2 draft messages that haven't been sent yet.</p>
          </div>
        </TabPanel>
        <TabPanel value="spam">
          <div style={{ padding: '16px' }}>
            <h3>Spam (12)</h3>
            <p>12 messages have been automatically filtered as spam.</p>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  ),
};

export const DisabledTabs: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <Tabs defaultValue="available">
        <Tab value="available" label="Available" />
        <Tab value="coming-soon" label="Coming Soon" disabled />
        <Tab value="maintenance" label="Under Maintenance" disabled />
        <TabPanel value="available">
          <div style={{ padding: '16px' }}>
            <h3>Available Content</h3>
            <p>This content is currently available and ready to use.</p>
          </div>
        </TabPanel>
        <TabPanel value="coming-soon">
          <div style={{ padding: '16px' }}>
            <h3>Coming Soon</h3>
            <p>This feature is currently under development.</p>
          </div>
        </TabPanel>
        <TabPanel value="maintenance">
          <div style={{ padding: '16px' }}>
            <h3>Under Maintenance</h3>
            <p>This section is temporarily unavailable due to maintenance.</p>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  ),
};

export const LayoutOptions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ width: '600px' }}>
        <h4 style={{ margin: '0 0 1rem 0' }}>Centered</h4>
        <Tabs centered defaultValue="tab1">
          <Tab value="tab1" label="One" />
          <Tab value="tab2" label="Two" />
          <Tab value="tab3" label="Three" />
          <TabPanel value="tab1">Content One</TabPanel>
          <TabPanel value="tab2">Content Two</TabPanel>
          <TabPanel value="tab3">Content Three</TabPanel>
        </Tabs>
      </div>
      <div style={{ width: '600px' }}>
        <h4 style={{ margin: '0 0 1rem 0' }}>Full Width</h4>
        <Tabs fullWidth defaultValue="tab1">
          <Tab value="tab1" label="One" />
          <Tab value="tab2" label="Two" />
          <Tab value="tab3" label="Three" />
          <TabPanel value="tab1">Content One</TabPanel>
          <TabPanel value="tab2">Content Two</TabPanel>
          <TabPanel value="tab3">Content Three</TabPanel>
        </Tabs>
      </div>
      <div style={{ width: '300px', border: '1px solid #ccc' }}>
        <h4 style={{ margin: '0 0 1rem 0' }}>Scrollable (narrow container)</h4>
        <Tabs scrollable defaultValue="tab1">
          <Tab value="tab1" label="Very Long Tab Name One" />
          <Tab value="tab2" label="Very Long Tab Name Two" />
          <Tab value="tab3" label="Very Long Tab Name Three" />
          <Tab value="tab4" label="Very Long Tab Name Four" />
          <TabPanel value="tab1">Content One</TabPanel>
          <TabPanel value="tab2">Content Two</TabPanel>
          <TabPanel value="tab3">Content Three</TabPanel>
          <TabPanel value="tab4">Content Four</TabPanel>
        </Tabs>
      </div>
    </div>
  ),
};

export const LazyLoading: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <Tabs defaultValue="instant">
        <Tab value="instant" label="Instant Load" />
        <Tab value="lazy1" label="Lazy Panel 1" />
        <Tab value="lazy2" label="Lazy Panel 2" />
        <TabPanel value="instant">
          <div style={{ padding: '16px' }}>
            <h3>Instant Load</h3>
            <p>This panel loads immediately when the component mounts.</p>
          </div>
        </TabPanel>
        <TabPanel value="lazy1" lazy>
          <div style={{ padding: '16px' }}>
            <h3>Lazy Panel 1</h3>
            <p>
              This panel only loads when you first click on its tab. This can improve initial page
              load performance for content that may not be immediately needed.
            </p>
          </div>
        </TabPanel>
        <TabPanel value="lazy2" lazy>
          <div style={{ padding: '16px' }}>
            <h3>Lazy Panel 2</h3>
            <p>Another lazy-loaded panel that demonstrates the loading behavior.</p>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  ),
};

export const ControlledTabs: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('step1');

    const handleNext = () => {
      if (activeTab === 'step1') setActiveTab('step2');
      else if (activeTab === 'step2') setActiveTab('step3');
    };

    const handlePrevious = () => {
      if (activeTab === 'step3') setActiveTab('step2');
      else if (activeTab === 'step2') setActiveTab('step1');
    };

    return (
      <div style={{ width: '600px' }}>
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tab value="step1" label="Step 1" />
          <Tab value="step2" label="Step 2" />
          <Tab value="step3" label="Step 3" />
          <TabPanel value="step1">
            <div style={{ padding: '16px' }}>
              <h3>Step 1: Getting Started</h3>
              <p>Welcome to the setup process. Let's begin with the basic configuration.</p>
              <button
                onClick={handleNext}
                style={{
                  marginTop: '16px',
                  padding: '8px 16px',
                  background: '#1976d2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Next →
              </button>
            </div>
          </TabPanel>
          <TabPanel value="step2">
            <div style={{ padding: '16px' }}>
              <h3>Step 2: Configuration</h3>
              <p>Now let's configure your preferences and settings.</p>
              <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                <button
                  onClick={handlePrevious}
                  style={{
                    padding: '8px 16px',
                    background: '#666',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  ← Previous
                </button>
                <button
                  onClick={handleNext}
                  style={{
                    padding: '8px 16px',
                    background: '#1976d2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Next →
                </button>
              </div>
            </div>
          </TabPanel>
          <TabPanel value="step3">
            <div style={{ padding: '16px' }}>
              <h3>Step 3: Completion</h3>
              <p>Great! You've completed the setup process.</p>
              <button
                onClick={handlePrevious}
                style={{
                  marginTop: '16px',
                  padding: '8px 16px',
                  background: '#666',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                ← Previous
              </button>
            </div>
          </TabPanel>
        </Tabs>
        <div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
          Current tab: {activeTab} | Controlled externally with useState
        </div>
      </div>
    );
  },
};

export const AccessibilityExample: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <h2 id="settings-title" style={{ margin: '0 0 1rem 0' }}>
        Application Settings
      </h2>
      <Tabs aria-labelledby="settings-title" defaultValue="general">
        <Tab value="general" label="General" />
        <Tab value="privacy" label="Privacy" />
        <Tab value="notifications" label="Notifications" />
        <TabPanel value="general">
          <div style={{ padding: '16px' }}>
            <h3>General Settings</h3>
            <p>Configure general application preferences and behavior.</p>
            <ul>
              <li>Language preferences</li>
              <li>Theme selection</li>
              <li>Default behaviors</li>
            </ul>
          </div>
        </TabPanel>
        <TabPanel value="privacy">
          <div style={{ padding: '16px' }}>
            <h3>Privacy Settings</h3>
            <p>Manage your privacy preferences and data handling options.</p>
            <ul>
              <li>Data collection preferences</li>
              <li>Cookie settings</li>
              <li>Third-party integrations</li>
            </ul>
          </div>
        </TabPanel>
        <TabPanel value="notifications">
          <div style={{ padding: '16px' }}>
            <h3>Notification Settings</h3>
            <p>Control how and when you receive notifications.</p>
            <ul>
              <li>Email notifications</li>
              <li>Push notifications</li>
              <li>Notification frequency</li>
            </ul>
          </div>
        </TabPanel>
      </Tabs>
      <div style={{ marginTop: '16px', fontSize: '12px', color: '#666' }}>
        ✓ Proper ARIA labeling with aria-labelledby
        <br />
        ✓ Keyboard navigation support (Arrow keys, Home, End)
        <br />✓ Screen reader compatible
      </div>
    </div>
  ),
};
