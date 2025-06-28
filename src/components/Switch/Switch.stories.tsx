import type { Meta, StoryObj } from '@storybook/preact';

import { Switch } from './index';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Material Design 3 Switch component for toggle controls. Supports controlled and uncontrolled modes, smooth animations, and accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Switch',
  } as any,
};

export const Checked: Story = {
  args: {
    label: 'Checked Switch',
    checked: true,
  } as any,
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Switch',
    disabled: true,
  } as any,
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled Checked Switch',
    checked: true,
    disabled: true,
  } as any,
};

export const Error: Story = {
  args: {
    label: 'Error State Switch',
    error: true,
  } as any,
};

export const WithHelperText: Story = {
  args: {
    label: 'Switch with Helper Text',
    helperText: 'This is helpful information about the switch',
  } as any,
};

export const ErrorWithHelperText: Story = {
  args: {
    label: 'Error Switch',
    error: true,
    helperText: 'This field has an error',
  } as any,
};

export const Required: Story = {
  args: {
    label: 'Required Switch',
    required: true,
  } as any,
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Switch label="Small Switch" size="small" />
      <Switch label="Medium Switch" size="medium" />
      <Switch label="Large Switch" size="large" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Switch label="Primary Switch" color="primary" checked />
      <Switch label="Secondary Switch" color="secondary" checked />
      <Switch label="Error Switch" color="error" checked />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Switch label="Off Switch" checked={false} />
      <Switch label="On Switch" checked={true} />
      <Switch label="Disabled Off" disabled checked={false} />
      <Switch label="Disabled On" disabled checked={true} />
      <Switch label="Error Switch" error />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const handleChange = (event: Event) => {
      console.log('Switch changed:', (event.currentTarget as HTMLInputElement).checked);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Switch label="Controlled Off" checked={false} onChange={handleChange} />
        <Switch label="Controlled On" checked={true} onChange={handleChange} />
      </div>
    );
  },
};

export const Uncontrolled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Switch label="Uncontrolled Default Off" defaultChecked={false} />
      <Switch label="Uncontrolled Default On" defaultChecked={true} />
    </div>
  ),
};

export const FormIntegration: Story = {
  render: () => (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '300px' }}>
      <Switch
        label="Email Notifications"
        name="emailNotifications"
        value="enabled"
        helperText="Receive email updates about your account"
      />
      <Switch
        label="SMS Notifications"
        name="smsNotifications"
        value="enabled"
        helperText="Receive text message alerts"
      />
      <Switch
        label="Push Notifications"
        name="pushNotifications"
        value="enabled"
        required
        helperText="Required for important security alerts"
      />
    </form>
  ),
};
