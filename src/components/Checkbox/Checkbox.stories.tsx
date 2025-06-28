import type { Meta, StoryObj } from '@storybook/preact';

import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: () => <Checkbox label="Default checkbox" />,
};

export const Checked: Story = {
  render: () => <Checkbox label="Checked checkbox" defaultChecked={true} />,
};

export const Disabled: Story = {
  render: () => <Checkbox label="Disabled checkbox" disabled={true} />,
};

export const DisabledChecked: Story = {
  render: () => <Checkbox label="Disabled checked" disabled={true} defaultChecked={true} />,
};

export const Indeterminate: Story = {
  render: () => <Checkbox label="Indeterminate checkbox" indeterminate={true} />,
};

export const WithError: Story = {
  render: () => (
    <Checkbox label="Checkbox with error" error={true} helperText="This field is required" />
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <Checkbox label="Checkbox with helper text" helperText="Additional information about this option" />
  ),
};

export const Required: Story = {
  render: () => (
    <Checkbox label="Required checkbox" required={true} helperText="This field is required" />
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox label="Small checkbox" size="small" />
      <Checkbox label="Medium checkbox (default)" size="medium" />
      <Checkbox label="Large checkbox" size="large" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox label="Primary color (default)" color="primary" defaultChecked />
      <Checkbox label="Secondary color" color="secondary" defaultChecked />
      <Checkbox label="Error color" color="error" defaultChecked />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
      <Checkbox label="Disabled indeterminate" disabled indeterminate />
    </div>
  ),
};

export const WithoutLabel: Story = {
  render: () => <Checkbox aria-label="Checkbox without visible label" />,
  parameters: {
    docs: {
      description: {
        story:
          'Checkbox can be used without a visible label, but should always have an aria-label for accessibility.',
      },
    },
  },
};

export const FormExample: Story = {
  render: () => (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '300px',
      }}
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        console.log('Form data:', Object.fromEntries(formData));
      }}
    >
      <h3>Preferences</h3>
      <Checkbox
        label="Email notifications"
        name="emailNotifications"
        value="enabled"
        helperText="Receive updates via email"
      />
      <Checkbox
        label="SMS notifications"
        name="smsNotifications"
        value="enabled"
        helperText="Receive updates via SMS"
      />
      <Checkbox
        label="Marketing emails"
        name="marketingEmails"
        value="enabled"
        helperText="Receive promotional content"
      />
      <Checkbox
        label="Terms and conditions"
        name="terms"
        value="accepted"
        required
        error
        helperText="You must accept the terms to continue"
      />
      <button type="submit" style={{ padding: '8px 16px', marginTop: '1rem' }}>
        Save Preferences
      </button>
    </form>
  ),
};
