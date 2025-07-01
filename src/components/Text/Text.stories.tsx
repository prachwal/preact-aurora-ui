/**
 * Text Component Stories - Aurora UI
 * Showcase for intelligent text component with theme-aware styling
 */

import type { Meta, StoryObj } from '@storybook/preact';

import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Components/Smart/Text',
  component: Text,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Text Component

An intelligent text component with automatic theme-aware styling, polymorphic rendering, and built-in accessibility features.

## Features

- **Automatic Color Management**: Intelligently selects appropriate colors based on variant and theme
- **Material Design 3 Typography**: Complete MD3 typography scale support
- **Polymorphic Component**: Renders as semantic HTML elements or custom elements
- **Theme Integration**: Full integration with Aurora UI theme system
- **Contrast Management**: Optional automatic contrast adjustment for accessibility
- **Responsive Design**: Responsive typography that adapts to screen size
- **TypeScript Support**: Full type safety with auto-completion

## Usage Examples

\`\`\`tsx
// Basic usage with automatic color
<Text variant="headline">Page Title</Text>

// With custom color
<Text color="primary" variant="title">Primary Title</Text>

// With automatic contrast
<Text color="primary" autoContrast>High contrast text</Text>

// Polymorphic rendering
<Text as="h1" variant="display">Display Heading</Text>

// With styling overrides
<Text variant="body" align="center" weight="bold">
  Centered bold text
</Text>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

// Basic Examples
export const Default: Story = {};

export const WithPrimaryColor: Story = {
  render: () => <Text color="primary">This text uses the primary theme color.</Text>,
};

export const WithAutoContrast: Story = {
  render: () => (
    <Text color="primary" autoContrast>
      This text automatically adjusts for optimal contrast.
    </Text>
  ),
};

// Typography Variants
export const TypographyScale: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text variant="display-large">Display Large</Text>
      <Text variant="display-medium">Display Medium</Text>
      <Text variant="display-small">Display Small</Text>
      <Text variant="headline-large">Headline Large</Text>
      <Text variant="headline-medium">Headline Medium</Text>
      <Text variant="headline-small">Headline Small</Text>
      <Text variant="title-large">Title Large</Text>
      <Text variant="title-medium">Title Medium</Text>
      <Text variant="title-small">Title Small</Text>
      <Text variant="body-large">Body Large</Text>
      <Text variant="body-medium">Body Medium (Default)</Text>
      <Text variant="body-small">Body Small</Text>
      <Text variant="label-large">Label Large</Text>
      <Text variant="label-medium">Label Medium</Text>
      <Text variant="label-small">Label Small</Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete Material Design 3 typography scale with automatic semantic HTML elements.',
      },
    },
  },
};

export const SimpleVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text variant="display">Display Text (maps to display-large)</Text>
      <Text variant="headline">Headline Text (maps to headline-medium)</Text>
      <Text variant="title">Title Text (maps to title-medium)</Text>
      <Text variant="body">Body Text (maps to body-medium)</Text>
      <Text variant="label">Label Text (maps to label-medium)</Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Simplified variant names that map to common MD3 typography variants.',
      },
    },
  },
};

// Color Examples
export const ColorVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Text color="auto">Auto Color (theme-aware)</Text>
      <Text color="primary">Primary Color</Text>
      <Text color="secondary">Secondary Color</Text>
      <Text color="tertiary">Tertiary Color</Text>
      <Text color="error">Error Color</Text>
      <Text color="success">Success Color</Text>
      <Text color="warning">Warning Color</Text>
      <Text color="info">Info Color</Text>
      <Text color="on-surface-variant">Muted Text</Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Various color options from the theme system.',
      },
    },
  },
};

export const ContrastDemo: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div
        style={{
          background: 'var(--md-sys-color-primary)',
          padding: '16px',
          borderRadius: '8px',
        }}
      >
        <Text color="primary" style={{ color: 'inherit' }}>
          Without contrast: Hard to read on primary background
        </Text>
      </div>
      <div
        style={{
          background: 'var(--md-sys-color-primary)',
          padding: '16px',
          borderRadius: '8px',
        }}
      >
        <Text color="primary" autoContrast>
          With autoContrast: Automatically readable on primary background
        </Text>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of automatic contrast adjustment for better accessibility.',
      },
    },
  },
};

// Polymorphic Examples
export const SemanticHTML: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text variant="display-large">Automatic H1 (display-large)</Text>
      <Text variant="headline-medium">Automatic H2 (headline-medium)</Text>
      <Text variant="title-small">Automatic H4 (title-small)</Text>
      <Text variant="body-medium">Automatic P (body-medium)</Text>
      <Text variant="label-medium">Automatic SPAN (label-medium)</Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text component automatically selects appropriate HTML elements based on variant.',
      },
    },
  },
};

export const CustomElements: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text as="h1" variant="body">
        Body variant as H1 element
      </Text>
      <Text as="div" variant="headline">
        Headline variant as DIV element
      </Text>
      <Text as="strong" variant="label">
        Label variant as STRONG element
      </Text>
      <Text as="em" variant="title">
        Title variant as EM element
      </Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Override the automatic element selection with custom HTML elements.',
      },
    },
  },
};

// Styling Examples
export const TextAlignment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text align="left">Left aligned text (default)</Text>
      <Text align="center">Center aligned text</Text>
      <Text align="right">Right aligned text</Text>
      <Text align="justify">
        Justified text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco.
      </Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text alignment options for layout control.',
      },
    },
  },
};

export const FontWeights: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Text weight="normal">Normal weight text</Text>
      <Text weight="medium">Medium weight text</Text>
      <Text weight="bold">Bold weight text</Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Font weight overrides for emphasis.',
      },
    },
  },
};

export const SizeOverrides: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Text size="xs">Extra small size override</Text>
      <Text size="sm">Small size override</Text>
      <Text size="md">Medium size override (default)</Text>
      <Text size="lg">Large size override</Text>
      <Text size="xl">Extra large size override</Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Size overrides for custom scaling while maintaining variant styles.',
      },
    },
  },
};

// Complex Examples
export const ResponsiveText: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text variant="display-large" align="center">
        Responsive Display Text
      </Text>
      <Text variant="headline-medium" color="primary" align="center">
        This text adapts to screen size
      </Text>
      <Text variant="body-large" align="justify">
        This body text demonstrates responsive typography. On smaller screens, the text size will
        automatically adjust to maintain readability while preserving the design hierarchy. The
        Material Design 3 typography system ensures optimal reading experience across all devices.
      </Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsive typography that adapts to different screen sizes.',
      },
    },
  },
};

export const ThemeAware: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div
        style={{
          background: 'var(--md-sys-color-surface)',
          padding: '16px',
          borderRadius: '8px',
          border: '1px solid var(--md-sys-color-outline-variant)',
        }}
      >
        <Text variant="title" color="auto">
          Theme-aware Title
        </Text>
        <Text variant="body" color="auto">
          This text automatically adapts to the current theme (light/dark) and uses appropriate
          colors for optimal contrast and readability.
        </Text>
      </div>
      <div
        style={{
          background: 'var(--md-sys-color-primary-container)',
          padding: '16px',
          borderRadius: '8px',
        }}
      >
        <Text variant="title" color="on-primary-container">
          Container Title
        </Text>
        <Text variant="body" color="on-primary-container">
          Text on colored container with appropriate contrast color.
        </Text>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of theme-aware color selection and automatic contrast handling.',
      },
    },
  },
};

// Accessibility Examples
export const AccessibilityFeatures: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text variant="headline" as="h1">
        Semantic Heading (H1)
      </Text>
      <Text variant="title" as="h2">
        Semantic Subheading (H2)
      </Text>
      <Text variant="body">
        Regular paragraph text with proper semantic markup for screen readers.
      </Text>
      <Text variant="label" as="span" style={{ fontStyle: 'italic' }}>
        Caption text with custom styling
      </Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Proper semantic HTML structure for accessibility and SEO.',
      },
    },
  },
};

// Interactive Example
export const Interactive: Story = {
  render: () => (
    <Text variant="headline" color="primary">
      Customize this text using the controls below
    </Text>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use the controls panel to experiment with different text properties.',
      },
    },
  },
};
