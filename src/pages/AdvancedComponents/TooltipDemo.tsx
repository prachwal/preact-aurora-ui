import { useState } from 'preact/hooks';

import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { TextField } from '../../components/TextField';
import { Tooltip } from '../../components/Tooltip';

export const TooltipDemo = () => {
  const [controlledOpen, setControlledOpen] = useState(false);

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    justifyItems: 'center',
    alignItems: 'center',
  };

  const flexStyle = {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <Card title="Tooltip Component" subtitle="MD3 Contextual help with positioning and triggers">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Basic Usage */}
        <div>
          <h4 style={{ marginBottom: '1rem' }}>Basic Tooltip</h4>
          <div style={flexStyle}>
            <Tooltip content="This is a simple tooltip">
              <Button variant="outlined">Hover me</Button>
            </Tooltip>
            <Tooltip content="I appear instantly!" enterDelay={0}>
              <Button variant="outlined">Instant</Button>
            </Tooltip>
            <Tooltip content="I take time to appear" enterDelay={1000}>
              <Button variant="outlined">Slow</Button>
            </Tooltip>
          </div>
        </div>

        {/* Positioning */}
        <div>
          <h4 style={{ marginBottom: '1rem' }}>Positioning (12 variants)</h4>
          <div style={gridStyle}>
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
            <Tooltip content="Right" position="right">
              <Button variant="outlined" size="small">
                Right
              </Button>
            </Tooltip>
            <Tooltip content="Right Start" position="right-start">
              <Button variant="outlined" size="small">
                Right Start
              </Button>
            </Tooltip>
            <Tooltip content="Right End" position="right-end">
              <Button variant="outlined" size="small">
                Right End
              </Button>
            </Tooltip>
            <Tooltip content="Bottom" position="bottom">
              <Button variant="outlined" size="small">
                Bottom
              </Button>
            </Tooltip>
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
            <Tooltip content="Left" position="left">
              <Button variant="outlined" size="small">
                Left
              </Button>
            </Tooltip>
            <Tooltip content="Left Start" position="left-start">
              <Button variant="outlined" size="small">
                Left Start
              </Button>
            </Tooltip>
            <Tooltip content="Left End" position="left-end">
              <Button variant="outlined" size="small">
                Left End
              </Button>
            </Tooltip>
          </div>
        </div>

        {/* Triggers */}
        <div>
          <h4 style={{ marginBottom: '1rem' }}>Trigger Types</h4>
          <div style={flexStyle}>
            <Tooltip content="Hover trigger (default)" trigger="hover">
              <Button variant="outlined">Hover</Button>
            </Tooltip>
            <Tooltip content="Focus trigger - tab to me!" trigger="focus">
              <Button variant="outlined">Focus</Button>
            </Tooltip>
            <Tooltip content="Click to toggle" trigger="click">
              <Button variant="outlined">Click</Button>
            </Tooltip>
            <Tooltip content="Multiple triggers" trigger={['hover', 'focus']}>
              <Button variant="outlined">Hover + Focus</Button>
            </Tooltip>
          </div>
        </div>

        {/* Variants */}
        <div>
          <h4 style={{ marginBottom: '1rem' }}>Content Variants</h4>
          <div style={flexStyle}>
            <Tooltip content="Standard tooltip with simple text" variant="standard">
              <Button variant="outlined">Standard</Button>
            </Tooltip>
            <Tooltip
              content={
                <div>
                  <h5 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 600 }}>
                    Rich Content
                  </h5>
                  <p style={{ margin: '0', fontSize: '12px', lineHeight: '1.4' }}>
                    This tooltip contains rich HTML content with multiple elements and better
                    formatting capabilities.
                  </p>
                </div>
              }
              variant="rich"
              maxWidth={280}
            >
              <Button variant="outlined">Rich Content</Button>
            </Tooltip>
            <Tooltip content="No arrow on this tooltip" showArrow={false}>
              <Button variant="outlined">No Arrow</Button>
            </Tooltip>
          </div>
        </div>

        {/* With Form Elements */}
        <div>
          <h4 style={{ marginBottom: '1rem' }}>With Form Elements</h4>
          <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Tooltip content="Enter your full name" position="top-start">
                <TextField label="Full Name" placeholder="John Doe" />
              </Tooltip>
              <Tooltip
                content="We'll never share your email with anyone"
                position="bottom-end"
                variant="rich"
              >
                <TextField label="Email" type="email" placeholder="john@example.com" />
              </Tooltip>
              <Tooltip
                content="Password must be at least 8 characters with numbers and special characters"
                position="right"
                maxWidth={250}
                variant="rich"
              >
                <TextField label="Password" type="password" placeholder="Enter password" />
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Controlled Mode */}
        <div>
          <h4 style={{ marginBottom: '1rem' }}>Controlled Mode</h4>
          <div style={flexStyle}>
            <Tooltip
              content="This tooltip is controlled externally"
              open={controlledOpen}
              onOpenChange={setControlledOpen}
              trigger="manual"
            >
              <Button variant="outlined">Controlled Tooltip</Button>
            </Tooltip>
            <Button variant="filled" onClick={() => setControlledOpen(!controlledOpen)}>
              {controlledOpen ? 'Hide' : 'Show'} Tooltip
            </Button>
          </div>
        </div>

        {/* Disabled State */}
        <div>
          <h4 style={{ marginBottom: '1rem' }}>Disabled State</h4>
          <div style={flexStyle}>
            <Tooltip content="This tooltip works normally">
              <Button variant="outlined">Enabled</Button>
            </Tooltip>
            <Tooltip content="This tooltip is disabled" disabled>
              <Button variant="outlined">Disabled</Button>
            </Tooltip>
          </div>
        </div>

        {/* Instructions */}
        <div
          style={{
            padding: '1rem',
            backgroundColor: 'var(--color-surface-variant)',
            borderRadius: '8px',
            fontSize: '0.875rem',
            color: 'var(--color-on-surface-variant)',
          }}
        >
          <strong>💡 Features Demonstrated:</strong>
          <ul style={{ margin: '0.5rem 0 0 1rem', paddingLeft: '1rem' }}>
            <li>12 positioning variants with automatic boundary detection</li>
            <li>Multiple trigger types: hover, focus, click, and manual control</li>
            <li>Customizable enter/leave delays for better UX</li>
            <li>Standard and rich content variants</li>
            <li>Optional arrow pointers with smart positioning</li>
            <li>Full accessibility support with ARIA attributes</li>
            <li>Portal rendering for proper z-index stacking</li>
            <li>Touch device support with touch-and-hold</li>
            <li>Keyboard navigation (Escape to close)</li>
            <li>Responsive design and boundary collision detection</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};
