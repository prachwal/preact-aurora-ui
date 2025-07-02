import type { Meta, StoryObj } from '@storybook/preact';

import { Progress } from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'Advanced/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Progress>;

// Basic variants
export const CircularIndeterminate: Story = {
  render: () => <Progress />,
};

export const CircularDeterminate: Story = {
  render: () => <Progress determinate value={65} />,
};

export const LinearIndeterminate: Story = {
  render: () => <Progress variant="linear" />,
  parameters: {
    layout: 'padded',
  },
};

export const LinearDeterminate: Story = {
  render: () => <Progress variant="linear" determinate value={75} />,
  parameters: {
    layout: 'padded',
  },
};

// Size variants
export const CircularSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Progress variant="circular" size="small" determinate value={25} />
        <div>Small</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Progress variant="circular" size="medium" determinate value={50} />
        <div>Medium</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Progress variant="circular" size="large" determinate value={75} />
        <div>Large</div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
};

export const LinearSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '300px' }}>
      <div>
        <div style={{ marginBottom: '8px' }}>Small</div>
        <Progress variant="linear" size="small" determinate value={25} />
      </div>
      <div>
        <div style={{ marginBottom: '8px' }}>Medium</div>
        <Progress variant="linear" size="medium" determinate value={50} />
      </div>
      <div>
        <div style={{ marginBottom: '8px' }}>Large</div>
        <Progress variant="linear" size="large" determinate value={75} />
      </div>
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
};

// Color variants
export const ColorVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Progress variant="circular" color="primary" determinate value={33} />
        <div>Primary</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Progress variant="circular" color="secondary" determinate value={66} />
        <div>Secondary</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Progress variant="circular" color="tertiary" determinate value={99} />
        <div>Tertiary</div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
};

// Linear with buffer
export const LinearWithBuffer: Story = {
  render: () => <Progress variant="linear" determinate value={60} buffer={85} />,
  parameters: {
    layout: 'padded',
  },
};

// Custom styling
export const CustomStyling: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Progress
          variant="circular"
          determinate
          value={45}
          size={32}
          thickness={6}
          trackColor="#e0e0e0"
        />
        <div>Custom thickness</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Progress variant="circular" determinate value={70} color="secondary" />
        <div>Secondary color</div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
};
