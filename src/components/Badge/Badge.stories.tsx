import type { Meta, StoryObj } from '@storybook/preact';

import { Badge, BadgeWrapper } from './Badge';

/**
 * Badge component displays status indicators, notifications, and counts
 * following Material Design 3 specifications.
 *
 * ## Features
 *
 * - **Variants**: Dot, Numeric, Status
 * - **Colors**: Primary, Secondary, Error, Warning, Success, Info
 * - **Positioning**: Top-right, Top-left, Bottom-right, Bottom-left
 * - **Sizes**: Small, Medium, Large
 * - **Animation**: Smooth appearance and hover effects
 * - **Accessibility**: ARIA labels and screen reader support
 */
const meta: Meta<typeof Badge> = {
  title: 'Communication/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Badge component for displaying status indicators, notifications, and counts.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const DotBadge: Story = {
  render: () => <Badge variant="dot" color="primary" />,
  parameters: {
    docs: {
      description: {
        story: 'Simple dot badge for basic status indication.',
      },
    },
  },
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <Badge variant="dot" color="primary" />
      <Badge variant="dot" color="secondary" />
      <Badge variant="dot" color="error" />
      <Badge variant="dot" color="warning" />
      <Badge variant="dot" color="success" />
      <Badge variant="dot" color="info" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge color variants: primary, secondary, error, warning, success, info.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <Badge variant="dot" size="small" color="primary" />
      <Badge variant="dot" size="medium" color="primary" />
      <Badge variant="dot" size="large" color="primary" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge size variants: small, medium, large.',
      },
    },
  },
};

export const Positions: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', padding: '50px' }}>
      <div
        style={{
          position: 'relative',
          width: '60px',
          height: '60px',
          border: '2px dashed #ccc',
        }}
      >
        <Badge variant="dot" position="top-right" color="error" />
      </div>
      <div
        style={{
          position: 'relative',
          width: '60px',
          height: '60px',
          border: '2px dashed #ccc',
        }}
      >
        <Badge variant="dot" position="top-left" color="warning" />
      </div>
      <div
        style={{
          position: 'relative',
          width: '60px',
          height: '60px',
          border: '2px dashed #ccc',
        }}
      >
        <Badge variant="dot" position="bottom-right" color="success" />
      </div>
      <div
        style={{
          position: 'relative',
          width: '60px',
          height: '60px',
          border: '2px dashed #ccc',
        }}
      >
        <Badge variant="dot" position="bottom-left" color="info" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge positioning options: top-right, top-left, bottom-right, bottom-left.',
      },
    },
  },
};

export const WithBadgeWrapper: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
      <BadgeWrapper badge={{ variant: 'dot', color: 'error' }}>
        <button style={{ padding: '12px 24px', border: '1px solid #ccc', borderRadius: '4px' }}>
          Button
        </button>
      </BadgeWrapper>

      <BadgeWrapper badge={{ variant: 'dot', color: 'success', size: 'large' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#e0e0e0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          👤
        </div>
      </BadgeWrapper>

      <BadgeWrapper badge={{ variant: 'dot', color: 'warning', position: 'bottom-right' }}>
        <div
          style={{
            width: '32px',
            height: '32px',
            backgroundColor: '#f5f5f5',
            border: '1px solid #ddd',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          🔔
        </div>
      </BadgeWrapper>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'BadgeWrapper component positions badges relative to target elements.',
      },
    },
  },
};

export const AnimationStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
      <div>
        <div style={{ marginBottom: '8px' }}>Animated (default)</div>
        <Badge variant="dot" color="primary" animated />
      </div>
      <div>
        <div style={{ marginBottom: '8px' }}>No animation</div>
        <Badge variant="dot" color="primary" animated={false} />
      </div>
      <div>
        <div style={{ marginBottom: '8px' }}>Hidden</div>
        <Badge variant="dot" color="primary" visible={false} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge animation and visibility states.',
      },
    },
  },
};

export const Accessibility: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
      <Badge variant="dot" color="primary" ariaLabel="New notification" />
      <Badge variant="dot" color="error" ariaLabel="Error status" />
      <Badge variant="dot" color="success" ariaLabel="Online status" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges with custom ARIA labels for improved accessibility.',
      },
    },
  },
};
