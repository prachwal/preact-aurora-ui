import type { Meta, StoryObj } from '@storybook/preact';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

// Default story
export const Default: Story = {
  render: () => <Button>Button</Button>,
};

// Material Design 3 Variants
export const Filled: Story = {
  render: () => <Button variant="filled">Filled Button</Button>,
};

export const Elevated: Story = {
  render: () => <Button variant="elevated">Elevated Button</Button>,
};

export const FilledTonal: Story = {
  render: () => <Button variant="filled-tonal">Filled Tonal Button</Button>,
};

export const Outlined: Story = {
  render: () => <Button variant="outlined">Outlined Button</Button>,
};

export const Text: Story = {
  render: () => <Button variant="text">Text Button</Button>,
};

// Sizes
export const Small: Story = {
  render: () => (
    <Button variant="filled" size="small">
      Small Button
    </Button>
  ),
};

export const Medium: Story = {
  render: () => (
    <Button variant="filled" size="medium">
      Medium Button
    </Button>
  ),
};

export const Large: Story = {
  render: () => (
    <Button variant="filled" size="large">
      Large Button
    </Button>
  ),
};

// With Icons
export const WithIconStart: Story = {
  render: () => (
    <Button variant="filled" icon="➕" iconPosition="start">
      Add Item
    </Button>
  ),
};

export const WithIconEnd: Story = {
  render: () => (
    <Button variant="filled" icon="→" iconPosition="end">
      Next Page
    </Button>
  ),
};

export const IconOnly: Story = {
  render: () => <Button variant="filled" icon="×" aria-label="Close" />,
};

// States
export const Disabled: Story = {
  render: () => (
    <Button variant="filled" disabled>
      Disabled Button
    </Button>
  ),
};

export const Loading: Story = {
  render: () => (
    <Button variant="filled" loading>
      Loading...
    </Button>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <Button variant="filled" fullWidth>
        Full Width Button
      </Button>
    </div>
  ),
};

// As Link
export const AsLink: Story = {
  render: () => (
    <Button variant="filled" href="https://example.com" target="_blank" rel="noopener noreferrer">
      External Link
    </Button>
  ),
};

// Showcase Examples
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button variant="filled">Filled</Button>
      <Button variant="elevated">Elevated</Button>
      <Button variant="filled-tonal">Filled Tonal</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Button variant="filled" size="small">
        Small
      </Button>
      <Button variant="filled" size="medium">
        Medium
      </Button>
      <Button variant="filled" size="large">
        Large
      </Button>
    </div>
  ),
};

export const ButtonStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button variant="filled">Normal</Button>
      <Button variant="filled" loading>
        Loading
      </Button>
      <Button variant="filled" disabled>
        Disabled
      </Button>
      <Button variant="filled" icon="⭐" iconPosition="start">
        With Icon
      </Button>
    </div>
  ),
};
