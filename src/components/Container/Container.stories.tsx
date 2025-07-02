/**
 * Container Component Stories - Aurora UI
 * Storybook documentation for Container component showcasing all features
 */

import type { Meta, StoryObj } from '@storybook/preact';

import { Text } from '../Text';

import { Container } from './Container';

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The Container component is an intelligent container with automatic surface styling,
elevation management, and responsive behavior.

## Features
- **Surface Management**: Automatic background and text color
- **Elevation Support**: Box shadows from 0-5
- **Responsive Padding**: Adaptive spacing
- **Max Width Constraints**: Built-in responsive containers
- **Border Radius**: Material Design 3 shape tokens
- **Auto Text Color**: Intelligent contrast management
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage story
export const Basic: Story = {
  render: () => (
    <Container
      surface="surface"
      padding="md"
      elevation={0}
      maxWidth="none"
      radius="md"
      autoTextColor={true}
      responsive={true}
      as="div"
    >
      <Text>
        This is a basic container with default settings using the surface background with automatic
        text color and medium padding.
      </Text>
    </Container>
  ),
};

// Surface variants showcase
export const SurfaceVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Container surface="surface" padding="md">
        <Text variant="body-large" weight="medium">
          Surface
        </Text>
        <Text>Default surface container with standard background</Text>
      </Container>

      <Container surface="surface-variant" padding="md">
        <Text variant="body-large" weight="medium">
          Surface Variant
        </Text>
        <Text>Alternative surface with different background tone</Text>
      </Container>

      <Container surface="primary-container" padding="md">
        <Text variant="body-large" weight="medium">
          Primary Container
        </Text>
        <Text>Container using primary color with proper contrast text</Text>
      </Container>

      <Container surface="secondary-container" padding="md">
        <Text variant="body-large" weight="medium">
          Secondary Container
        </Text>
        <Text>Container using secondary color scheme</Text>
      </Container>

      <Container surface="error-container" padding="md">
        <Text variant="body-large" weight="medium">
          Error Container
        </Text>
        <Text>Container for error states and alerts</Text>
      </Container>
    </div>
  ),
};

// Elevation showcase
export const Elevation: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px',
        padding: '24px',
      }}
    >
      {([0, 1, 2, 3, 4, 5] as const).map((elevation) => (
        <Container key={elevation} elevation={elevation} padding="lg" radius="lg">
          <Text variant="title-medium" weight="medium">
            Elevation {elevation}
          </Text>
          <Text>Shadow depth level {elevation}</Text>
        </Container>
      ))}
    </div>
  ),
};

// Padding variants
export const PaddingVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {(['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((padding) => (
        <Container
          key={padding}
          padding={padding}
          surface="surface-container"
          style={{ border: '1px dashed #ccc' }}
        >
          <Text variant="body-large" weight="medium">
            Padding: {padding}
          </Text>
          <Text>This container has {padding} padding applied</Text>
        </Container>
      ))}
    </div>
  ),
};

// Max width constraints
export const MaxWidthConstraints: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'] as const).map((maxWidth) => (
        <Container key={maxWidth} maxWidth={maxWidth} padding="md" surface="surface-container">
          <Text variant="body-large" weight="medium">
            Max Width: {maxWidth}
          </Text>
          <Text>This container is constrained to {maxWidth} maximum width</Text>
        </Container>
      ))}
    </div>
  ),
};

// Complex composition
export const ComplexComposition: Story = {
  render: () => (
    <Container maxWidth="lg" padding="xl" surface="surface">
      <Text variant="display-small" weight="bold" style={{ marginBottom: '24px' }}>
        Dashboard Layout
      </Text>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
        }}
      >
        <Container surface="primary-container" padding="lg" elevation={2} radius="lg">
          <Text variant="title-large" weight="medium" style={{ marginBottom: '12px' }}>
            Primary Card
          </Text>
          <Text>Important content with primary styling and elevation</Text>
        </Container>

        <Container surface="secondary-container" padding="lg" elevation={1} radius="lg">
          <Text variant="title-large" weight="medium" style={{ marginBottom: '12px' }}>
            Secondary Card
          </Text>
          <Text>Secondary content with subtle elevation</Text>
        </Container>

        <Container surface="surface-container-high" padding="lg" elevation={3} radius="xl">
          <Text variant="title-large" weight="medium" style={{ marginBottom: '12px' }}>
            Elevated Panel
          </Text>
          <Text>High elevation panel for important actions</Text>
        </Container>
      </div>

      <Container surface="surface-variant" padding="lg" radius="md" style={{ marginTop: '24px' }}>
        <Text variant="body-large">
          This layout demonstrates how Container components can be composed to create complex,
          visually cohesive interfaces with proper surface management and spacing.
        </Text>
      </Container>
    </Container>
  ),
};

// Semantic HTML
export const SemanticHTML: Story = {
  render: () => (
    <Container as="main" maxWidth="md" padding="xl">
      <Container as="header" surface="primary-container" padding="lg" radius="lg">
        <Text as="h1" variant="display-small" weight="bold">
          Article Title
        </Text>
        <Text variant="body-large">Published on March 15, 2024</Text>
      </Container>

      <Container as="article" padding="lg" style={{ marginTop: '24px' }}>
        <Container as="section" surface="surface-container" padding="md" radius="md">
          <Text as="h2" variant="title-large" weight="medium" style={{ marginBottom: '12px' }}>
            Introduction
          </Text>
          <Text>
            This article demonstrates how Container components can be used with semantic HTML
            elements while maintaining proper styling and accessibility.
          </Text>
        </Container>
      </Container>

      <Container
        as="aside"
        surface="tertiary-container"
        padding="md"
        radius="md"
        style={{ marginTop: '24px' }}
      >
        <Text variant="title-medium" weight="medium" style={{ marginBottom: '8px' }}>
          Did you know?
        </Text>
        <Text variant="body-small">
          Containers automatically adjust text color based on surface background for optimal
          contrast.
        </Text>
      </Container>
    </Container>
  ),
};
