import type { Meta, StoryObj } from '@storybook/preact';

const meta: Meta = {
  title: 'Design System/MD3 Colors',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Material Design 3 Color System implementation with complete token support for light and dark themes.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const PrimaryColors: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
      <div
        style={{
          background: 'var(--md-sys-color-primary)',
          color: 'var(--md-sys-color-on-primary)',
          padding: '24px',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        <strong>Primary</strong>
        <br />
        --md-sys-color-primary
      </div>
      <div
        style={{
          background: 'var(--md-sys-color-primary-container)',
          color: 'var(--md-sys-color-on-primary-container)',
          padding: '24px',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        <strong>Primary Container</strong>
        <br />
        --md-sys-color-primary-container
      </div>
    </div>
  ),
};

export const SurfaceColors: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
      <div
        style={{
          background: 'var(--md-sys-color-surface)',
          color: 'var(--md-sys-color-on-surface)',
          padding: '24px',
          borderRadius: '8px',
          border: '1px solid var(--md-sys-color-outline)',
          textAlign: 'center',
        }}
      >
        <strong>Surface</strong>
        <br />
        --md-sys-color-surface
      </div>
      <div
        style={{
          background: 'var(--md-sys-color-surface-container)',
          color: 'var(--md-sys-color-on-surface)',
          padding: '24px',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        <strong>Surface Container</strong>
        <br />
        --md-sys-color-surface-container
      </div>
    </div>
  ),
};

export const ElevationLevels: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
      {[0, 1, 2, 3, 4, 5].map((level) => (
        <div
          key={level}
          style={{
            background: 'var(--md-sys-color-surface)',
            color: 'var(--md-sys-color-on-surface)',
            padding: '24px',
            borderRadius: '8px',
            textAlign: 'center',
            boxShadow: `var(--md-sys-elevation-level${level})`,
          }}
        >
          <strong>Level {level}</strong>
          <br />
          <small>--md-sys-elevation-level{level}</small>
        </div>
      ))}
    </div>
  ),
};

export const UtilityClasses: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
      <div
        className="md3-primary-container md3-elevation-2"
        style={{ padding: '16px', borderRadius: '8px' }}
      >
        <span className="md3-on-primary-container">.md3-primary-container + .md3-elevation-2</span>
      </div>
      <div
        className="md3-secondary-container md3-elevation-3"
        style={{ padding: '16px', borderRadius: '8px' }}
      >
        <span className="md3-on-secondary-container">
          .md3-secondary-container + .md3-elevation-3
        </span>
      </div>
    </div>
  ),
};
