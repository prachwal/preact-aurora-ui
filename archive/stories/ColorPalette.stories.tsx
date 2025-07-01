/**
 * Color Palette Showcase - Aurora UI
 * Interactive color palette demonstrating the complete Material Design 3 color system
 */

import type { Meta, StoryObj } from '@storybook/preact';

const meta: Meta = {
  title: 'FAZA 5/Documentation/Color Palette',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Color Palette Showcase

Interactive demonstration of the complete Material Design 3 color system implemented in Aurora UI.

## Features
- **Material Design 3 Colors**: Complete color palette with semantic naming
- **Dynamic Color Tokens**: CSS custom properties for easy theming
- **Accessibility First**: All colors tested for proper contrast ratios
- **Theme Switching**: Live preview of light/dark themes
- **Copy to Clipboard**: Click any color to copy its CSS variable

## Color Categories
- **Primary**: Brand colors and main UI elements
- **Secondary**: Supporting colors for variety
- **Tertiary**: Accent colors for special elements
- **Error/Warning/Success**: Status colors
- **Neutral**: Surface and outline colors
- **Neutral Variant**: Additional neutral tones
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const ColorCard = ({
  name,
  cssVar,
  description,
  onClick,
}: {
  name: string;
  cssVar: string;
  description?: string;
  onClick?: () => void;
}) => (
  <div
    style={{
      padding: '16px',
      borderRadius: '12px',
      border: '1px solid var(--md-sys-color-outline-variant)',
      backgroundColor: 'var(--md-sys-color-surface-container)',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }}
    onClick={onClick}
  >
    <div
      style={{
        width: '100%',
        height: '60px',
        backgroundColor: `var(${cssVar})`,
        borderRadius: '8px',
        marginBottom: '12px',
        border: '1px solid var(--md-sys-color-outline-variant)',
      }}
    />
    <div style={{ fontWeight: '500', marginBottom: '4px' }}>{name}</div>
    <div style={{ fontFamily: 'monospace', fontSize: '12px', opacity: 0.7, marginBottom: '4px' }}>
      {cssVar}
    </div>
    {description && <div style={{ fontSize: '14px', opacity: 0.8 }}>{description}</div>}
  </div>
);

const ColorSection = ({
  title,
  colors,
}: {
  title: string;
  colors: Array<{ name: string; cssVar: string; description?: string }>;
}) => (
  <div
    style={{
      backgroundColor: 'var(--md-sys-color-surface-variant)',
      padding: '24px',
      borderRadius: '16px',
      marginBottom: '24px',
    }}
  >
    <h3
      style={{
        margin: '0 0 16px 0',
        fontSize: '24px',
        color: 'var(--md-sys-color-on-surface-variant)',
      }}
    >
      {title}
    </h3>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
      }}
    >
      {colors.map((color) => (
        <ColorCard
          key={color.name}
          {...color}
          onClick={() => {
            navigator.clipboard?.writeText(`var(${color.cssVar})`);
            console.log(`Copied: var(${color.cssVar})`);
          }}
        />
      ))}
    </div>
  </div>
);

export const CompletePalette: Story = {
  render: () => (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px' }}>
      <div
        style={{
          backgroundColor: 'var(--md-sys-color-primary-container)',
          padding: '48px',
          borderRadius: '24px',
          marginBottom: '32px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '48px',
            margin: '0 0 16px 0',
            color: 'var(--md-sys-color-on-primary-container)',
          }}
        >
          🎨 Aurora UI Color Palette
        </h1>
        <h2
          style={{
            fontSize: '24px',
            margin: 0,
            opacity: 0.8,
            color: 'var(--md-sys-color-on-primary-container)',
          }}
        >
          Material Design 3 Color System
        </h2>
      </div>

      <ColorSection
        title="Primary Colors"
        colors={[
          { name: 'primary', cssVar: '--md-sys-color-primary', description: 'Main brand color' },
          {
            name: 'onPrimary',
            cssVar: '--md-sys-color-on-primary',
            description: 'Text on primary',
          },
          {
            name: 'primaryContainer',
            cssVar: '--md-sys-color-primary-container',
            description: 'Primary container',
          },
          {
            name: 'onPrimaryContainer',
            cssVar: '--md-sys-color-on-primary-container',
            description: 'Text on primary container',
          },
        ]}
      />

      <ColorSection
        title="Secondary Colors"
        colors={[
          {
            name: 'secondary',
            cssVar: '--md-sys-color-secondary',
            description: 'Supporting brand color',
          },
          {
            name: 'onSecondary',
            cssVar: '--md-sys-color-on-secondary',
            description: 'Text on secondary',
          },
          {
            name: 'secondaryContainer',
            cssVar: '--md-sys-color-secondary-container',
            description: 'Secondary container',
          },
          {
            name: 'onSecondaryContainer',
            cssVar: '--md-sys-color-on-secondary-container',
            description: 'Text on secondary container',
          },
        ]}
      />

      <ColorSection
        title="Tertiary Colors"
        colors={[
          { name: 'tertiary', cssVar: '--md-sys-color-tertiary', description: 'Accent color' },
          {
            name: 'onTertiary',
            cssVar: '--md-sys-color-on-tertiary',
            description: 'Text on tertiary',
          },
          {
            name: 'tertiaryContainer',
            cssVar: '--md-sys-color-tertiary-container',
            description: 'Tertiary container',
          },
          {
            name: 'onTertiaryContainer',
            cssVar: '--md-sys-color-on-tertiary-container',
            description: 'Text on tertiary container',
          },
        ]}
      />

      <ColorSection
        title="Status Colors"
        colors={[
          { name: 'error', cssVar: '--md-sys-color-error', description: 'Error states' },
          { name: 'onError', cssVar: '--md-sys-color-on-error', description: 'Text on error' },
          {
            name: 'errorContainer',
            cssVar: '--md-sys-color-error-container',
            description: 'Error container',
          },
          {
            name: 'onErrorContainer',
            cssVar: '--md-sys-color-on-error-container',
            description: 'Text on error container',
          },
        ]}
      />

      <ColorSection
        title="Surface Colors"
        colors={[
          { name: 'surface', cssVar: '--md-sys-color-surface', description: 'Default surface' },
          {
            name: 'onSurface',
            cssVar: '--md-sys-color-on-surface',
            description: 'Text on surface',
          },
          {
            name: 'surfaceVariant',
            cssVar: '--md-sys-color-surface-variant',
            description: 'Alternative surface',
          },
          {
            name: 'onSurfaceVariant',
            cssVar: '--md-sys-color-on-surface-variant',
            description: 'Text on surface variant',
          },
          {
            name: 'surfaceDim',
            cssVar: '--md-sys-color-surface-dim',
            description: 'Dimmed surface',
          },
          {
            name: 'surfaceBright',
            cssVar: '--md-sys-color-surface-bright',
            description: 'Bright surface',
          },
        ]}
      />

      <ColorSection
        title="Outline & Background"
        colors={[
          {
            name: 'outline',
            cssVar: '--md-sys-color-outline',
            description: 'Borders and dividers',
          },
          {
            name: 'outlineVariant',
            cssVar: '--md-sys-color-outline-variant',
            description: 'Subtle borders',
          },
          {
            name: 'background',
            cssVar: '--md-sys-color-background',
            description: 'Page background',
          },
          {
            name: 'onBackground',
            cssVar: '--md-sys-color-on-background',
            description: 'Text on background',
          },
          {
            name: 'inverseSurface',
            cssVar: '--md-sys-color-inverse-surface',
            description: 'Inverse surface',
          },
          {
            name: 'inverseOnSurface',
            cssVar: '--md-sys-color-inverse-on-surface',
            description: 'Text on inverse surface',
          },
        ]}
      />

      <div
        style={{
          backgroundColor: 'var(--md-sys-color-tertiary-container)',
          padding: '24px',
          borderRadius: '16px',
          marginTop: '32px',
        }}
      >
        <h3
          style={{
            margin: '0 0 8px 0',
            color: 'var(--md-sys-color-on-tertiary-container)',
          }}
        >
          💡 Usage Tips
        </h3>
        <ul
          style={{
            margin: 0,
            paddingLeft: '20px',
            color: 'var(--md-sys-color-on-tertiary-container)',
          }}
        >
          <li>Click any color card to copy its CSS variable to clipboard</li>
          <li>Use the theme switcher in the toolbar to preview light/dark modes</li>
          <li>All colors automatically adjust for optimal contrast</li>
          <li>Colors are semantic - use them by purpose, not by appearance</li>
        </ul>
      </div>
    </div>
  ),
};

export const SimpleDemo: Story = {
  render: () => (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px' }}>
      <h1
        style={{
          textAlign: 'center',
          marginBottom: '32px',
          color: 'var(--md-sys-color-on-surface)',
        }}
      >
        Interactive Color Demo
      </h1>

      <div
        style={{
          display: 'grid',
          gap: '16px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--md-sys-color-primary)',
            color: 'var(--md-sys-color-on-primary)',
            padding: '24px',
            borderRadius: '16px',
          }}
        >
          <h3 style={{ margin: '0 0 8px 0' }}>Primary Surface</h3>
          <p style={{ margin: 0 }}>
            This text automatically adjusts for contrast on primary background.
          </p>
        </div>

        <div
          style={{
            backgroundColor: 'var(--md-sys-color-secondary)',
            color: 'var(--md-sys-color-on-secondary)',
            padding: '24px',
            borderRadius: '16px',
          }}
        >
          <h3 style={{ margin: '0 0 8px 0' }}>Secondary Surface</h3>
          <p style={{ margin: 0 }}>
            This text automatically adjusts for contrast on secondary background.
          </p>
        </div>

        <div
          style={{
            backgroundColor: 'var(--md-sys-color-tertiary)',
            color: 'var(--md-sys-color-on-tertiary)',
            padding: '24px',
            borderRadius: '16px',
          }}
        >
          <h3 style={{ margin: '0 0 8px 0' }}>Tertiary Surface</h3>
          <p style={{ margin: 0 }}>
            This text automatically adjusts for contrast on tertiary background.
          </p>
        </div>

        <div
          style={{
            backgroundColor: 'var(--md-sys-color-error)',
            color: 'var(--md-sys-color-on-error)',
            padding: '24px',
            borderRadius: '16px',
          }}
        >
          <h3 style={{ margin: '0 0 8px 0' }}>Error Surface</h3>
          <p style={{ margin: 0 }}>
            This text automatically adjusts for contrast on error background.
          </p>
        </div>
      </div>
    </div>
  ),
};
