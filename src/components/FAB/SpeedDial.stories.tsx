import type { Meta, StoryObj } from '@storybook/preact';

import { SpeedDial } from './SpeedDial';

/**
 * Speed Dial provides an expandable FAB menu for multiple related actions.
 * It expands to reveal a collection of action buttons in a fan pattern.
 *
 * ## Features
 *
 * - **Directions**: Up, Down, Left, Right expansion
 * - **Controlled & Uncontrolled**: Flexible state management
 * - **Action Labels**: Tooltip-style labels on hover
 * - **Animations**: Staggered entrance animations
 * - **Accessibility**: Keyboard navigation and screen reader support
 */
const meta: Meta<typeof SpeedDial> = {
  title: 'Components/Actions/SpeedDial',
  component: SpeedDial,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Speed Dial provides an expandable FAB menu for multiple related actions.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SpeedDial>;

const sampleActions = [
  { id: 'edit', icon: '✏️', label: 'Edit', onClick: () => console.log('Edit clicked') },
  { id: 'share', icon: '📤', label: 'Share', onClick: () => console.log('Share clicked') },
  { id: 'delete', icon: '🗑️', label: 'Delete', onClick: () => console.log('Delete clicked') },
];

export const Default: Story = {
  render: () => <SpeedDial actions={sampleActions} fabProps={{ color: 'primary' }} />,
  parameters: {
    docs: {
      description: {
        story: 'Default Speed Dial with actions expanding upward.',
      },
    },
  },
};

export const Directions: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', padding: '100px' }}>
      <SpeedDial actions={sampleActions} direction="up" fabProps={{ color: 'primary' }} />
      <SpeedDial actions={sampleActions} direction="down" fabProps={{ color: 'secondary' }} />
      <SpeedDial actions={sampleActions} direction="left" fabProps={{ color: 'tertiary' }} />
      <SpeedDial actions={sampleActions} direction="right" fabProps={{ color: 'surface' }} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Speed Dial can expand in four directions: up, down, left, right.',
      },
    },
  },
};

export const Controlled: Story = {
  render: () => <SpeedDial actions={sampleActions} open={true} fabProps={{ color: 'primary' }} />,
  parameters: {
    docs: {
      description: {
        story: 'Speed Dial in controlled mode with open state managed externally.',
      },
    },
  },
};

export const WithDisabledActions: Story = {
  render: () => (
    <SpeedDial
      actions={[
        { id: 'edit', icon: '✏️', label: 'Edit', onClick: () => console.log('Edit clicked') },
        {
          id: 'share',
          icon: '📤',
          label: 'Share',
          disabled: true,
          onClick: () => console.log('Share clicked'),
        },
        { id: 'delete', icon: '🗑️', label: 'Delete', onClick: () => console.log('Delete clicked') },
      ]}
      defaultOpen={true}
      fabProps={{ color: 'primary' }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Speed Dial actions can be individually disabled.',
      },
    },
  },
};

export const Persistent: Story = {
  render: () => (
    <SpeedDial
      actions={sampleActions}
      closeOnActionClick={false}
      defaultOpen={true}
      fabProps={{ color: 'primary' }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Speed Dial that stays open after action clicks.',
      },
    },
  },
};
