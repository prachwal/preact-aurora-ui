import type { Meta, StoryObj } from '@storybook/preact';

import { FAB } from './FAB';

/**
 * FAB (Floating Action Button) is a prominent button used for primary actions in an interface.
 * It follows Material Design 3 guidelines and provides multiple sizes, colors, and positioning options.
 *
 * ## Features
 *
 * - **Sizes**: Mini, Regular, Extended with label
 * - **Colors**: Surface, Primary, Secondary, Tertiary
 * - **Positioning**: Static or fixed positioning (bottom-right, bottom-left, top-right, top-left)
 * - **Speed Dial**: Expandable action menu
 * - **Accessibility**: Full keyboard navigation and screen reader support
 * - **Animations**: Material Design motion and ripple effects
 */
const meta: Meta<typeof FAB> = {
  title: 'Components/Actions/FAB',
  component: FAB,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'FAB (Floating Action Button) component following Material Design 3 guidelines. Used for the primary action in an interface.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FAB>;

export const Default: Story = {
  render: () => <FAB icon="+" />,
};

export const WithIcon: Story = {
  render: () => <FAB icon="🚀" />,
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <FAB size="mini" icon="+" />
      <FAB size="regular" icon="+" />
      <FAB size="extended" icon="+" label="Create" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'FAB comes in three sizes: mini (40px), regular (56px), and extended with label.',
      },
    },
  },
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <FAB color="surface" icon="🎨" />
      <FAB color="primary" icon="🎨" />
      <FAB color="secondary" icon="🎨" />
      <FAB color="tertiary" icon="🎨" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'FAB supports four color variants following Material Design 3 color system.',
      },
    },
  },
};

export const Extended: Story = {
  render: () => <FAB size="extended" icon="✉️" label="Compose" />,
  parameters: {
    docs: {
      description: {
        story: 'Extended FAB includes both an icon and text label.',
      },
    },
  },
};

export const Disabled: Story = {
  render: () => <FAB icon="+" disabled />,
  parameters: {
    docs: {
      description: {
        story: 'Disabled FAB has reduced opacity and no interactions.',
      },
    },
  },
};

export const Positioned: Story = {
  render: () => (
    <div
      style={{ position: 'relative', height: '300px', width: '400px', border: '1px dashed #ccc' }}
    >
      <p style={{ margin: '16px', color: '#666' }}>
        Positioned FABs are typically used for primary actions
      </p>
      <FAB position="bottom-right" icon="+" color="primary" />
      <FAB position="bottom-left" icon="📞" color="secondary" />
      <FAB position="top-right" icon="⭐" color="tertiary" />
      <FAB position="top-left" icon="❤️" color="surface" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'FAB can be positioned in fixed locations within a container.',
      },
    },
  },
};

export const WithCustomStyling: Story = {
  render: () => (
    <FAB icon="🎵" style={{ backgroundColor: '#ff6b35', color: 'white' }} className="custom-fab" />
  ),
  parameters: {
    docs: {
      description: {
        story: 'FAB can be customized with additional styles and classes.',
      },
    },
  },
};
