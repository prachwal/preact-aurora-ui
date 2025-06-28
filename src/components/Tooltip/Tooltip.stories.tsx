import type { Meta, StoryObj } from '@storybook/preact';
import { useState } from 'preact/hooks';

import { Button } from '../Button';
import { TextField } from '../TextField';

import { Tooltip } from './Tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Material Design 3 Tooltip component for providing contextual help and information.

## Features

- **Positioning**: 12 positions (top, bottom, left, right with start, center, end variants)
- **Triggers**: Hover, focus, click, or manual control
- **Delays**: Customizable enter and leave delays
- **Variants**: Standard and rich content support
- **Accessibility**: Full ARIA support and keyboard navigation
- **Portal Rendering**: Optional portal rendering for better stacking
- **Touch Support**: Touch and hold support for mobile devices

## Usage

\`\`\`tsx
import { Tooltip } from '@/components/Tooltip';

<Tooltip content="This is a helpful tooltip">
  <Button>Hover me</Button>
</Tooltip>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'The content to display in the tooltip',
    },
    position: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
      ],
      description: 'Position of the tooltip relative to the trigger',
    },
    trigger: {
      control: 'select',
      options: ['hover', 'focus', 'click', 'manual'],
      description: 'How the tooltip is triggered',
    },
    variant: {
      control: 'select',
      options: ['standard', 'rich'],
      description: 'Tooltip variant',
    },
    showArrow: {
      control: 'boolean',
      description: 'Whether to show the arrow pointer',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the tooltip is disabled',
    },
    enterDelay: {
      control: 'number',
      description: 'Delay in milliseconds before showing',
    },
    leaveDelay: {
      control: 'number',
      description: 'Delay in milliseconds before hiding',
    },
    offset: {
      control: 'number',
      description: 'Distance between tooltip and trigger in pixels',
    },
    maxWidth: {
      control: 'number',
      description: 'Maximum width of the tooltip in pixels',
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tooltip content="This is a helpful tooltip" {...args}>
      <Button
        variant="outlined"
        style={{
          border: '2px dashed #ff6b6b',
          borderRadius: '4px',
          outline: '1px solid #333',
        }}
      >
        Hover me
      </Button>
    </Tooltip>
  ),
};

export const Positions: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '2rem',
        padding: '4rem',
        justifyItems: 'center',
        alignItems: 'center',
      }}
    >
      <Tooltip content="Top" position="top">
        <Button variant="outlined" size="small">
          Top
        </Button>
      </Tooltip>
      <Tooltip content="Top Start" position="top-start">
        <Button variant="outlined" size="small">
          Top Start
        </Button>
      </Tooltip>
      <Tooltip content="Top End" position="top-end">
        <Button variant="outlined" size="small">
          Top End
        </Button>
      </Tooltip>
      <div />

      <Tooltip content="Left" position="left">
        <Button variant="outlined" size="small">
          Left
        </Button>
      </Tooltip>
      <div />
      <div />
      <Tooltip content="Right" position="right">
        <Button variant="outlined" size="small">
          Right
        </Button>
      </Tooltip>

      <Tooltip content="Left Start" position="left-start">
        <Button variant="outlined" size="small">
          Left Start
        </Button>
      </Tooltip>
      <div />
      <div />
      <Tooltip content="Right Start" position="right-start">
        <Button variant="outlined" size="small">
          Right Start
        </Button>
      </Tooltip>

      <Tooltip content="Left End" position="left-end">
        <Button variant="outlined" size="small">
          Left End
        </Button>
      </Tooltip>
      <div />
      <div />
      <Tooltip content="Right End" position="right-end">
        <Button variant="outlined" size="small">
          Right End
        </Button>
      </Tooltip>

      <div />
      <Tooltip content="Bottom Start" position="bottom-start">
        <Button variant="outlined" size="small">
          Bottom Start
        </Button>
      </Tooltip>
      <Tooltip content="Bottom End" position="bottom-end">
        <Button variant="outlined" size="small">
          Bottom End
        </Button>
      </Tooltip>
      <div />

      <div />
      <Tooltip content="Bottom" position="bottom">
        <Button variant="outlined" size="small">
          Bottom
        </Button>
      </Tooltip>
      <div />
      <div />
    </div>
  ),
};

export const Triggers: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Tooltip content="Hover to see tooltip" trigger="hover">
        <Button variant="outlined">Hover</Button>
      </Tooltip>
      <Tooltip content="Focus to see tooltip" trigger="focus">
        <Button variant="outlined">Focus</Button>
      </Tooltip>
      <Tooltip content="Click to toggle tooltip" trigger="click">
        <Button variant="outlined">Click</Button>
      </Tooltip>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Tooltip content="Standard tooltip with simple text" variant="standard">
        <Button variant="outlined">Standard</Button>
      </Tooltip>
      <Tooltip
        content={
          <div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 600 }}>Rich Tooltip</h4>
            <p style={{ margin: '0', fontSize: '12px', lineHeight: '1.4' }}>
              This tooltip contains rich content with multiple elements and longer text that
              demonstrates the rich variant capabilities.
            </p>
          </div>
        }
        variant="rich"
        maxWidth={280}
      >
        <Button variant="outlined">Rich Content</Button>
      </Tooltip>
    </div>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Tooltip content="Tooltip with arrow" showArrow={true}>
        <Button variant="outlined">With Arrow</Button>
      </Tooltip>
      <Tooltip content="Tooltip without arrow" showArrow={false}>
        <Button variant="outlined">Without Arrow</Button>
      </Tooltip>
    </div>
  ),
};

export const DelayConfiguration: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Tooltip content="Instant tooltip" enterDelay={0} leaveDelay={0}>
        <Button variant="outlined">Instant</Button>
      </Tooltip>
      <Tooltip content="Default delays (500ms enter, 200ms leave)">
        <Button variant="outlined">Default</Button>
      </Tooltip>
      <Tooltip content="Slow tooltip" enterDelay={1000} leaveDelay={500}>
        <Button variant="outlined">Slow</Button>
      </Tooltip>
    </div>
  ),
};

export const WithFormElements: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}>
      <Tooltip content="Enter your full name here" position="top">
        <TextField label="Full Name" placeholder="John Doe" />
      </Tooltip>
      <Tooltip content="We'll never share your email address" position="bottom">
        <TextField label="Email Address" type="email" placeholder="john@example.com" />
      </Tooltip>
      <Tooltip
        content="Password must be at least 8 characters with numbers and special characters"
        variant="rich"
        maxWidth={250}
        position="right"
      >
        <TextField label="Password" type="password" placeholder="Enter password" />
      </Tooltip>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Tooltip content="Controlled tooltip" open={open} onOpenChange={setOpen} trigger="manual">
          <Button variant="outlined">Controlled Tooltip</Button>
        </Tooltip>
        <Button variant="filled" onClick={() => setOpen(!open)}>
          {open ? 'Hide' : 'Show'} Tooltip
        </Button>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Tooltip content="This tooltip is enabled">
        <Button variant="outlined">Enabled</Button>
      </Tooltip>
      <Tooltip content="This tooltip is disabled" disabled>
        <Button variant="outlined">Disabled</Button>
      </Tooltip>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Tooltip
        content="Custom styled tooltip"
        className="custom-tooltip"
        style={{
          backgroundColor: '#6366f1',
          color: 'white',
          borderRadius: '8px',
          fontSize: '14px',
        }}
      >
        <Button variant="outlined">Custom Style</Button>
      </Tooltip>
      <Tooltip content="Large tooltip with custom width" maxWidth={400}>
        <Button variant="outlined">Custom Width</Button>
      </Tooltip>
    </div>
  ),
};
