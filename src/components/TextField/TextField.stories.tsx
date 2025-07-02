import type { Meta, StoryObj } from '@storybook/preact';

import { TextField } from './TextField';

const meta: Meta<typeof TextField> = {
  title: 'Form/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Material Design 3 TextField component with support for different variants, states, and features.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  render: () => <TextField label="Default TextField" placeholder="Enter text..." />,
};

export const Outlined: Story = {
  render: () => (
    <TextField variant="outlined" label="Outlined TextField" placeholder="Enter text..." />
  ),
};

export const Filled: Story = {
  render: () => <TextField variant="filled" label="Filled TextField" placeholder="Enter text..." />,
};

export const Standard: Story = {
  render: () => (
    <TextField variant="standard" label="Standard TextField" placeholder="Enter text..." />
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <TextField
      label="TextField with Helper"
      helperText="This is helpful information"
      placeholder="Enter text..."
    />
  ),
};

export const Error: Story = {
  render: () => (
    <TextField
      label="Error TextField"
      error
      helperText="This field has an error"
      placeholder="Enter text..."
    />
  ),
};

export const Required: Story = {
  render: () => <TextField label="Required Field" required placeholder="This field is required" />,
};

export const Disabled: Story = {
  render: () => <TextField label="Disabled TextField" disabled value="Disabled value" />,
};

export const WithIcons: Story = {
  render: () => (
    <TextField
      label="TextField with Icons"
      placeholder="Search..."
      startIcon={
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
      }
      endIcon={
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      }
    />
  ),
};

export const Clearable: Story = {
  render: () => (
    <TextField
      label="Clearable TextField"
      clearable
      defaultValue="Clear me!"
      placeholder="Type something..."
    />
  ),
};

export const WithCharacterCount: Story = {
  render: () => (
    <TextField
      label="TextField with Character Count"
      showCharacterCount
      maxLength={50}
      placeholder="Max 50 characters"
    />
  ),
};

export const Multiline: Story = {
  render: () => (
    <TextField
      label="Multiline TextField"
      multiline
      rows={4}
      placeholder="Enter multiple lines of text..."
    />
  ),
};

export const MultilineAutosize: Story = {
  render: () => (
    <TextField
      label="Auto-resizing Textarea"
      multiline
      minRows={2}
      maxRows={6}
      placeholder="This textarea will auto-resize between 2-6 rows..."
    />
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <TextField size="small" label="Small TextField" />
      <TextField size="medium" label="Medium TextField" />
      <TextField size="large" label="Large TextField" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <TextField variant="outlined" label="Outlined" placeholder="Outlined variant" />
      <TextField variant="filled" label="Filled" placeholder="Filled variant" />
      <TextField variant="standard" label="Standard" placeholder="Standard variant" />
    </div>
  ),
};

export const InputTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <TextField type="text" label="Text" placeholder="Text input" />
      <TextField type="email" label="Email" placeholder="email@example.com" />
      <TextField type="password" label="Password" placeholder="Enter password" />
      <TextField type="number" label="Number" placeholder="Enter number" />
      <TextField type="tel" label="Phone" placeholder="(555) 123-4567" />
      <TextField type="url" label="URL" placeholder="https://example.com" />
      <TextField type="search" label="Search" placeholder="Search..." />
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <TextField label="Full Width TextField" fullWidth placeholder="This field takes full width" />
  ),
  parameters: {
    layout: 'padded',
  },
};

export const ValidationExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <TextField label="Valid Input" value="john@example.com" helperText="Email looks good!" />
      <TextField
        label="Invalid Input"
        value="invalid-email"
        error
        helperText="Please enter a valid email address"
      />
      <TextField
        label="Character Limit"
        showCharacterCount
        maxLength={20}
        value="This is too long text!"
        error
        helperText="Text exceeds maximum length"
      />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <TextField label="First Name" required placeholder="Enter your first name" />
      <TextField label="Last Name" required placeholder="Enter your last name" />
      <TextField
        label="Email"
        type="email"
        required
        placeholder="Enter your email"
        helperText="We'll never share your email"
      />
      <TextField label="Phone" type="tel" placeholder="(555) 123-4567" />
      <TextField
        label="Message"
        multiline
        rows={4}
        placeholder="Tell us about yourself..."
        showCharacterCount
        maxLength={500}
      />
    </form>
  ),
};
