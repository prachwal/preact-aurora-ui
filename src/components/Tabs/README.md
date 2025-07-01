# Tabs Component

## Overview

The Tabs component provides tabbed navigation interfaces that follow Material Design 3 guidelines. It organizes content into separate panels that users can switch between, perfect for settings screens, data views, and content organization.

## Installation

```bash
npm install preact-aurora-ui@0.0.13
```

## Usage

### Basic Tabs

```tsx
import { Tabs, Tab, TabPanel } from 'preact-aurora-ui';

function BasicExample() {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <Tabs value={activeTab} onChange={setActiveTab}>
      <Tab value="tab1" label="Overview" />
      <Tab value="tab2" label="Settings" />
      <Tab value="tab3" label="History" />

      <TabPanel value="tab1">
        <h3>Overview Content</h3>
        <p>This is the overview panel.</p>
      </TabPanel>

      <TabPanel value="tab2">
        <h3>Settings Content</h3>
        <p>This is the settings panel.</p>
      </TabPanel>

      <TabPanel value="tab3">
        <h3>History Content</h3>
        <p>This is the history panel.</p>
      </TabPanel>
    </Tabs>
  );
}
```

### Tabs with Icons

```tsx
function IconTabsExample() {
  const tabs = [
    { value: 'dashboard', label: 'Dashboard', icon: '📊' },
    { value: 'analytics', label: 'Analytics', icon: '📈' },
    { value: 'reports', label: 'Reports', icon: '📋' },
    { value: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <Tabs defaultValue="dashboard">
      {tabs.map((tab) => (
        <Tab key={tab.value} value={tab.value} label={tab.label} icon={tab.icon} />
      ))}

      <TabPanel value="dashboard">
        <DashboardContent />
      </TabPanel>
      <TabPanel value="analytics">
        <AnalyticsContent />
      </TabPanel>
      <TabPanel value="reports">
        <ReportsContent />
      </TabPanel>
      <TabPanel value="settings">
        <SettingsContent />
      </TabPanel>
    </Tabs>
  );
}
```

### Scrollable Tabs

```tsx
function ScrollableTabsExample() {
  const tabs = Array.from({ length: 15 }, (_, i) => ({
    value: `tab${i + 1}`,
    label: `Tab ${i + 1}`,
  }));

  return (
    <Tabs scrollable defaultValue="tab1">
      {tabs.map((tab) => (
        <Tab key={tab.value} value={tab.value} label={tab.label} />
      ))}

      {tabs.map((tab) => (
        <TabPanel key={tab.value} value={tab.value}>
          <h3>Content for {tab.label}</h3>
          <p>This is the content panel for {tab.label}.</p>
        </TabPanel>
      ))}
    </Tabs>
  );
}
```

## API Reference

### Tabs Props

| Prop           | Type                           | Default     | Description                       |
| -------------- | ------------------------------ | ----------- | --------------------------------- |
| `children`     | `ReactNode`                    | `undefined` | Tab and TabPanel components       |
| `value`        | `string`                       | `undefined` | Currently active tab (controlled) |
| `defaultValue` | `string`                       | `undefined` | Default active tab (uncontrolled) |
| `variant`      | `'primary' \| 'secondary'`     | `'primary'` | Visual variant                    |
| `alignment`    | `'start' \| 'center' \| 'end'` | `'start'`   | Tab alignment                     |
| `scrollable`   | `boolean`                      | `false`     | Enable horizontal scrolling       |
| `centered`     | `boolean`                      | `false`     | Center tabs (when not full width) |
| `fullWidth`    | `boolean`                      | `false`     | Tabs take full container width    |
| `className`    | `string`                       | `''`        | Additional CSS classes            |
| `onChange`     | `(value: string) => void`      | `undefined` | Tab change handler                |

### Tab Props

| Prop        | Type               | Default     | Description                        |
| ----------- | ------------------ | ----------- | ---------------------------------- |
| `value`     | `string`           | _required_  | Unique tab identifier              |
| `label`     | `string`           | `undefined` | Tab label text                     |
| `icon`      | `ReactNode`        | `undefined` | Tab icon                           |
| `disabled`  | `boolean`          | `false`     | Disabled state                     |
| `badge`     | `string \| number` | `undefined` | Badge content                      |
| `className` | `string`           | `''`        | Additional CSS classes             |
| `children`  | `ReactNode`        | `undefined` | Tab content (alternative to label) |

### TabPanel Props

| Prop          | Type        | Default     | Description                      |
| ------------- | ----------- | ----------- | -------------------------------- |
| `value`       | `string`    | _required_  | Associated tab identifier        |
| `children`    | `ReactNode` | `undefined` | Panel content                    |
| `lazy`        | `boolean`   | `false`     | Lazy load panel content          |
| `keepMounted` | `boolean`   | `false`     | Keep panel mounted when inactive |
| `className`   | `string`    | `''`        | Additional CSS classes           |

## Examples

### Variants and Styles

```tsx
// Primary variant (default)
<Tabs variant="primary">
  <Tab value="tab1" label="Primary Tab" />
  <Tab value="tab2" label="Another Tab" />
</Tabs>

// Secondary variant
<Tabs variant="secondary">
  <Tab value="tab1" label="Secondary Tab" />
  <Tab value="tab2" label="Another Tab" />
</Tabs>

// Full width tabs
<Tabs fullWidth>
  <Tab value="tab1" label="Full Width" />
  <Tab value="tab2" label="Equal Size" />
  <Tab value="tab3" label="Tabs" />
</Tabs>

// Centered tabs
<Tabs centered>
  <Tab value="tab1" label="Centered" />
  <Tab value="tab2" label="Tabs" />
</Tabs>
```

### Tabs with Badges

```tsx
function BadgeTabsExample() {
  return (
    <Tabs defaultValue="messages">
      <Tab value="messages" label="Messages" icon="💬" badge={12} />
      <Tab value="notifications" label="Notifications" icon="🔔" badge="99+" />
      <Tab value="tasks" label="Tasks" icon="✅" badge={5} />

      <TabPanel value="messages">
        <MessagesList />
      </TabPanel>
      <TabPanel value="notifications">
        <NotificationsList />
      </TabPanel>
      <TabPanel value="tasks">
        <TasksList />
      </TabPanel>
    </Tabs>
  );
}
```

### Dynamic Tabs

```tsx
function DynamicTabsExample() {
  const [tabs, setTabs] = useState([{ id: '1', title: 'Document 1', content: 'Content 1' }]);
  const [activeTab, setActiveTab] = useState('1');

  const addTab = () => {
    const newId = String(tabs.length + 1);
    setTabs([
      ...tabs,
      {
        id: newId,
        title: `Document ${newId}`,
        content: `Content for document ${newId}`,
      },
    ]);
    setActiveTab(newId);
  };

  const removeTab = (tabId) => {
    const newTabs = tabs.filter((tab) => tab.id !== tabId);
    setTabs(newTabs);
    if (activeTab === tabId && newTabs.length > 0) {
      setActiveTab(newTabs[0].id);
    }
  };

  return (
    <div>
      <Button onClick={addTab}>Add Tab</Button>

      <Tabs value={activeTab} onChange={setActiveTab}>
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            value={tab.id}
            label={
              <div className="tab-with-close">
                {tab.title}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTab(tab.id);
                  }}
                >
                  ×
                </button>
              </div>
            }
          />
        ))}

        {tabs.map((tab) => (
          <TabPanel key={tab.id} value={tab.id}>
            <h3>{tab.title}</h3>
            <p>{tab.content}</p>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
}
```

### Lazy Loading Tabs

```tsx
function LazyTabsExample() {
  return (
    <Tabs defaultValue="overview">
      <Tab value="overview" label="Overview" />
      <Tab value="data" label="Data" />
      <Tab value="analytics" label="Analytics" />

      <TabPanel value="overview">
        <OverviewContent />
      </TabPanel>

      <TabPanel value="data" lazy>
        <ExpensiveDataComponent />
      </TabPanel>

      <TabPanel value="analytics" lazy>
        <HeavyAnalyticsComponent />
      </TabPanel>
    </Tabs>
  );
}
```

### Form Tabs

```tsx
function FormTabsExample() {
  const [formData, setFormData] = useState({
    personal: {},
    contact: {},
    preferences: {},
  });
  const [activeTab, setActiveTab] = useState('personal');
  const [errors, setErrors] = useState({});

  const validateTab = (tabName) => {
    // Validation logic
    const tabErrors = validateTabData(formData[tabName]);
    setErrors((prev) => ({ ...prev, [tabName]: tabErrors }));
    return Object.keys(tabErrors).length === 0;
  };

  const handleTabChange = (newTab) => {
    if (validateTab(activeTab)) {
      setActiveTab(newTab);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab value="personal" label="Personal Info" badge={errors.personal ? '!' : undefined} />
        <Tab value="contact" label="Contact Details" badge={errors.contact ? '!' : undefined} />
        <Tab value="preferences" label="Preferences" />

        <TabPanel value="personal">
          <PersonalInfoForm
            data={formData.personal}
            onChange={(data) => setFormData((prev) => ({ ...prev, personal: data }))}
            errors={errors.personal}
          />
        </TabPanel>

        <TabPanel value="contact">
          <ContactForm
            data={formData.contact}
            onChange={(data) => setFormData((prev) => ({ ...prev, contact: data }))}
            errors={errors.contact}
          />
        </TabPanel>

        <TabPanel value="preferences">
          <PreferencesForm
            data={formData.preferences}
            onChange={(data) => setFormData((prev) => ({ ...prev, preferences: data }))}
          />
        </TabPanel>
      </Tabs>

      <div className="form-actions">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
```

## Accessibility

### ARIA Support

The Tabs component implements comprehensive ARIA attributes:

- `role="tablist"` on the tab container
- `role="tab"` on each tab button
- `role="tabpanel"` on each content panel
- `aria-selected` indicates active tab
- `aria-controls` links tabs to panels
- `aria-labelledby` links panels to tabs
- `aria-disabled` for disabled tabs
- `tabindex` management for keyboard navigation

### Keyboard Navigation

- **Tab/Shift+Tab**: Navigate to/from tab list
- **Arrow Left/Right**: Navigate between tabs
- **Home/End**: First/last tab
- **Enter/Space**: Activate focused tab
- **Ctrl+Page Up/Down**: Navigate between tabs (optional)

### Screen Reader Support

- Tab list role announced
- Active tab state communicated
- Panel content associated with tabs
- Disabled tabs announced
- Badge content read with tab labels

```tsx
// Accessibility example
<Tabs aria-label="Account settings" defaultValue="profile">
  <Tab value="profile" label="Profile" aria-describedby="profile-help" />
  <Tab value="security" label="Security" aria-describedby="security-help" />

  <TabPanel value="profile">
    <div id="profile-help">Update your personal information and avatar</div>
    <ProfileSettings />
  </TabPanel>

  <TabPanel value="security">
    <div id="security-help">Manage passwords and two-factor authentication</div>
    <SecuritySettings />
  </TabPanel>
</Tabs>
```

## Theming

### CSS Custom Properties

Tabs components support extensive theming:

```css
.custom-tabs {
  --tabs-background: var(--md-sys-color-surface);
  --tabs-border-bottom: 1px solid var(--md-sys-color-outline-variant);

  /* Tab styles */
  --tab-height: 48px;
  --tab-padding: 12px 24px;
  --tab-min-width: 90px;
  --tab-text-color: var(--md-sys-color-on-surface-variant);
  --tab-text-color-active: var(--md-sys-color-primary);
  --tab-text-color-disabled: var(--md-sys-color-outline);
  --tab-background-hover: var(--md-sys-color-secondary-container);
  --tab-background-focus: var(--md-sys-color-secondary-container);

  /* Indicator */
  --tab-indicator-color: var(--md-sys-color-primary);
  --tab-indicator-height: 3px;
  --tab-indicator-transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);

  /* Badge */
  --tab-badge-background: var(--md-sys-color-error);
  --tab-badge-color: var(--md-sys-color-on-error);
  --tab-badge-size: 16px;
  --tab-badge-font-size: 12px;

  /* Panel */
  --tab-panel-padding: 24px;
  --tab-panel-background: var(--md-sys-color-surface);
}
```

### Material Design Tokens

Components use Material Design 3 tokens:

- `--md-sys-color-primary` - Active tab and indicator
- `--md-sys-color-on-surface` - Tab text color
- `--md-sys-color-surface` - Background colors
- `--md-sys-color-outline-variant` - Borders and dividers

### Variant Styling

```scss
// Secondary variant
.tabs-secondary {
  --tab-indicator-height: 2px;
  --tab-background-hover: transparent;
  --tab-text-color: var(--md-sys-color-on-surface);
  --tabs-border-bottom: none;
}

// Vertical tabs
.tabs-vertical {
  --tabs-direction: column;
  --tab-indicator-height: 100%;
  --tab-indicator-width: 3px;
}
```

## Advanced Usage

### Controlled vs Uncontrolled

```tsx
// Controlled
<Tabs value={activeTab} onChange={setActiveTab}>
  <Tab value="tab1" label="Tab 1" />
  <Tab value="tab2" label="Tab 2" />
</Tabs>

// Uncontrolled
<Tabs defaultValue="tab1">
  <Tab value="tab1" label="Tab 1" />
  <Tab value="tab2" label="Tab 2" />
</Tabs>
```

### Custom Tab Content

```tsx
function CustomTabContent() {
  return (
    <Tab value="custom">
      <div className="custom-tab-content">
        <Avatar src="/user.jpg" size="small" />
        <span>John Doe</span>
        <Badge count={5} />
      </div>
    </Tab>
  );
}
```

### Nested Tabs

```tsx
function NestedTabsExample() {
  return (
    <Tabs defaultValue="main1">
      <Tab value="main1" label="Main Tab 1" />
      <Tab value="main2" label="Main Tab 2" />

      <TabPanel value="main1">
        <Tabs defaultValue="sub1" variant="secondary">
          <Tab value="sub1" label="Sub Tab 1" />
          <Tab value="sub2" label="Sub Tab 2" />

          <TabPanel value="sub1">Sub content 1</TabPanel>
          <TabPanel value="sub2">Sub content 2</TabPanel>
        </Tabs>
      </TabPanel>

      <TabPanel value="main2">Main content 2</TabPanel>
    </Tabs>
  );
}
```

### Router Integration

```tsx
import { useRouter } from 'next/router';

function RouterTabs() {
  const router = useRouter();
  const { tab = 'overview' } = router.query;

  const handleTabChange = (newTab) => {
    router.push(`/dashboard?tab=${newTab}`, undefined, { shallow: true });
  };

  return (
    <Tabs value={tab} onChange={handleTabChange}>
      <Tab value="overview" label="Overview" />
      <Tab value="analytics" label="Analytics" />
      <Tab value="settings" label="Settings" />

      <TabPanel value="overview">
        <OverviewPage />
      </TabPanel>
      <TabPanel value="analytics">
        <AnalyticsPage />
      </TabPanel>
      <TabPanel value="settings">
        <SettingsPage />
      </TabPanel>
    </Tabs>
  );
}
```

## Testing

### Unit Tests

```tsx
import { render, screen } from '@testing-library/preact';
import { Tabs, Tab, TabPanel } from 'preact-aurora-ui';
import userEvent from '@testing-library/user-event';

test('switches between tabs', async () => {
  render(
    <Tabs defaultValue="tab1">
      <Tab value="tab1" label="Tab 1" />
      <Tab value="tab2" label="Tab 2" />

      <TabPanel value="tab1">Content 1</TabPanel>
      <TabPanel value="tab2">Content 2</TabPanel>
    </Tabs>,
  );

  expect(screen.getByText('Content 1')).toBeVisible();
  expect(screen.queryByText('Content 2')).not.toBeVisible();

  await userEvent.click(screen.getByText('Tab 2'));

  expect(screen.getByText('Content 2')).toBeVisible();
  expect(screen.queryByText('Content 1')).not.toBeVisible();
});
```

### Integration Tests

```tsx
test('tabs with form validation', async () => {
  const handleSubmit = vi.fn();

  render(
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="step1">
        <Tab value="step1" label="Step 1" />
        <Tab value="step2" label="Step 2" />

        <TabPanel value="step1">
          <input name="email" required />
        </TabPanel>
        <TabPanel value="step2">
          <button type="submit">Submit</button>
        </TabPanel>
      </Tabs>
    </form>,
  );

  // Fill form and navigate
  await userEvent.type(screen.getByRole('textbox'), 'test@example.com');
  await userEvent.click(screen.getByText('Step 2'));
  await userEvent.click(screen.getByText('Submit'));

  expect(handleSubmit).toHaveBeenCalled();
});
```

### Accessibility Tests

```tsx
test('tabs accessibility', () => {
  render(
    <Tabs aria-label="Settings tabs">
      <Tab value="tab1" label="General" />
      <Tab value="tab2" label="Privacy" disabled />

      <TabPanel value="tab1">General settings</TabPanel>
      <TabPanel value="tab2">Privacy settings</TabPanel>
    </Tabs>,
  );

  const tabList = screen.getByRole('tablist');
  const tabs = screen.getAllByRole('tab');
  const panels = screen.getAllByRole('tabpanel');

  expect(tabList).toHaveAccessibleName('Settings tabs');
  expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
  expect(tabs[1]).toHaveAttribute('aria-disabled', 'true');
  expect(panels[0]).toBeVisible();
});
```

## FAQ

### How do I create vertical tabs?

Use CSS to customize the tab orientation:

```css
.vertical-tabs {
  display: flex;

  .tab-list {
    flex-direction: column;
    border-right: 1px solid var(--md-sys-color-outline-variant);
    border-bottom: none;
  }

  .tab-panels {
    flex: 1;
    padding-left: 24px;
  }
}
```

### Can I disable specific tabs?

Yes, use the `disabled` prop on individual Tab components:

```tsx
<Tab value="disabled-tab" label="Disabled" disabled />
```

### How do I handle tab switching validation?

Use controlled tabs and validation logic:

```tsx
const handleTabChange = (newTab) => {
  if (validateCurrentTab()) {
    setActiveTab(newTab);
  } else {
    showValidationErrors();
  }
};
```

### How do I add animations to tab panels?

Use CSS transitions or animation libraries:

```css
.tab-panel {
  transition: opacity 0.2s ease;
}

.tab-panel[hidden] {
  opacity: 0;
}
```

### Can I use tabs for mobile navigation?

For mobile navigation, consider using BottomNavigation instead. Tabs work better for content organization within a page.
