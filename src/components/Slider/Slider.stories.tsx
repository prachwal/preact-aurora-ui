import type { Meta, StoryObj } from '@storybook/preact';
import { useState } from 'preact/hooks';

import { Slider } from './Slider';
import { RangeSlider } from './RangeSlider';

const meta: Meta<typeof Slider> = {
  title: 'Form/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material Design 3 Slider component for selecting single values or ranges.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 100, step: 1 },
      description: 'Current value of the slider',
    },
    min: {
      control: { type: 'number' },
      description: 'Minimum value',
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum value',
    },
    step: {
      control: { type: 'number', min: 0.1 },
      description: 'Step value for discrete slider',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the slider is disabled',
    },
    variant: {
      control: 'select',
      options: ['continuous', 'discrete'],
      description: 'Slider variant',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Slider orientation',
    },
    showTicks: {
      control: 'boolean',
      description: 'Show tick marks (discrete variant only)',
    },
    showValue: {
      control: 'boolean',
      description: 'Show value label',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 1,
    label: 'Volume',
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(30);
    return (
      <div>
        <Slider
          value={value}
          onChange={setValue}
          min={0}
          max={100}
          step={1}
          label="Controlled Slider"
        />
        <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>Current value: {value}</p>
      </div>
    );
  },
};

export const Discrete: Story = {
  args: {
    defaultValue: 40,
    min: 0,
    max: 100,
    step: 10,
    variant: 'discrete',
    showTicks: true,
    label: 'Discrete Slider',
    helperText: 'Step value: 10',
  },
};

export const WithValueDisplay: Story = {
  args: {
    defaultValue: 75,
    min: 0,
    max: 100,
    step: 5,
    showValue: true,
    label: 'Brightness',
    helperText: 'Drag to adjust brightness',
  },
};

export const CustomRange: Story = {
  args: {
    defaultValue: 25,
    min: -50,
    max: 50,
    step: 5,
    label: 'Temperature (°C)',
    valueFormatter: (value: number) => `${value}°C`,
    helperText: 'Range: -50°C to 50°C',
  },
};

export const Vertical: Story = {
  render: (args) => (
    <div style={{ height: '300px', display: 'flex', alignItems: 'center' }}>
      <Slider {...args} />
    </div>
  ),
  args: {
    defaultValue: 60,
    min: 0,
    max: 100,
    step: 1,
    orientation: 'vertical',
    label: 'Vertical Slider',
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: 40,
    min: 0,
    max: 100,
    step: 1,
    disabled: true,
    label: 'Disabled Slider',
    helperText: 'This slider is disabled',
  },
};

export const ErrorState: Story = {
  args: {
    defaultValue: 90,
    min: 0,
    max: 100,
    step: 1,
    error: true,
    label: 'Volume Limit',
    errorMessage: 'Volume is too high',
  },
};

export const SmallSteps: Story = {
  args: {
    defaultValue: 2.5,
    min: 0,
    max: 5,
    step: 0.1,
    variant: 'discrete',
    showTicks: true,
    showValue: true,
    label: 'Precision Slider',
    valueFormatter: (value: number) => value.toFixed(1),
    helperText: 'Step: 0.1',
  },
};

// Range Slider Stories
export const RangeSliderDefault: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number]>([20, 80]);
    return (
      <div>
        <RangeSlider
          value={value}
          onChange={setValue}
          min={0}
          max={100}
          step={1}
          label="Price Range"
          helperText="Select your preferred price range"
        />
        <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
          Range: ${value[0]} - ${value[1]}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Range slider for selecting a range of values between minimum and maximum.',
      },
    },
  },
};

export const RangeSliderDiscrete: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number]>([20, 60]);
    return (
      <div>
        <RangeSlider
          value={value}
          onChange={setValue}
          min={0}
          max={100}
          step={10}
          variant="discrete"
          showTicks={true}
          showValue={true}
          label="Discrete Range"
          helperText="Step value: 10"
        />
        <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
          Range: {value[0]} - {value[1]}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Discrete range slider with tick marks and value display.',
      },
    },
  },
};

export const RangeSliderVertical: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number]>([30, 70]);
    return (
      <div style={{ height: '300px', display: 'flex', alignItems: 'center' }}>
        <RangeSlider
          value={value}
          onChange={setValue}
          min={0}
          max={100}
          step={5}
          orientation="vertical"
          label="Vertical Range"
          showValue={true}
        />
        <p style={{ marginLeft: '20px', fontSize: '14px', color: '#666' }}>
          Range: {value[0]} - {value[1]}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Vertical range slider for compact layouts.',
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '400px' }}>
      <Slider
        defaultValue={30}
        min={0}
        max={100}
        step={1}
        label="Continuous Slider"
        helperText="Basic continuous slider"
      />

      <Slider
        defaultValue={50}
        min={0}
        max={100}
        step={10}
        variant="discrete"
        showTicks={true}
        label="Discrete Slider"
        helperText="Discrete with tick marks"
      />

      <Slider
        defaultValue={75}
        min={0}
        max={100}
        step={5}
        showValue={true}
        label="With Value Display"
        helperText="Shows current value"
      />

      <div style={{ height: '200px', display: 'flex', alignItems: 'center', gap: '40px' }}>
        <Slider
          defaultValue={40}
          min={0}
          max={100}
          step={1}
          orientation="vertical"
          label="Vertical"
        />

        <Slider
          defaultValue={60}
          min={0}
          max={100}
          step={10}
          orientation="vertical"
          variant="discrete"
          showTicks={true}
          showValue={true}
          label="Vertical Discrete"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All slider variants showcased together.',
      },
    },
  },
};

export const ThumbShapes: Story = {
  render: () => (
    <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div>
        <h3>Different Thumb Shapes</h3>

        <div style={{ marginBottom: '30px' }}>
          <Slider
            defaultValue={25}
            min={0}
            max={100}
            thumbShape="circle"
            label="Circle (Default)"
            showValue={true}
          />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <Slider
            defaultValue={50}
            min={0}
            max={100}
            thumbShape="square"
            label="Square"
            showValue={true}
          />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <Slider
            defaultValue={75}
            min={0}
            max={100}
            thumbShape="diamond"
            label="Diamond"
            showValue={true}
          />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <Slider
            defaultValue={60}
            min={0}
            max={100}
            thumbShape="custom"
            thumbContent={
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 'bold',
                }}
              >
                ★
              </div>
            }
            label="Custom Thumb"
            showValue={true}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different thumb shapes including circle, square, diamond, and custom content.',
      },
    },
  },
};

export const CustomThumbSize: Story = {
  render: () => (
    <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div>
        <h3>Custom Thumb Sizes</h3>

        <div style={{ marginBottom: '30px' }}>
          <Slider
            defaultValue={30}
            min={0}
            max={100}
            thumbSize={16}
            label="Small Thumb (16px)"
            showValue={true}
          />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <Slider
            defaultValue={50}
            min={0}
            max={100}
            thumbSize={20}
            label="Default Thumb (20px)"
            showValue={true}
          />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <Slider
            defaultValue={70}
            min={0}
            max={100}
            thumbSize={28}
            label="Large Thumb (28px)"
            showValue={true}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Custom thumb sizes for different use cases.',
      },
    },
  },
};

export const RangeSliderThumbShapes: Story = {
  render: () => (
    <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div>
        <h3>Range Slider with Different Thumb Shapes</h3>

        <div style={{ marginBottom: '30px' }}>
          <RangeSlider
            defaultValue={[20, 80]}
            min={0}
            max={100}
            thumbShape="circle"
            label="Circle Range"
            showValue={true}
          />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <RangeSlider
            defaultValue={[30, 70]}
            min={0}
            max={100}
            thumbShape="square"
            thumbSize={22}
            label="Square Range (22px)"
            showValue={true}
          />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <RangeSlider
            defaultValue={[25, 75]}
            min={0}
            max={100}
            thumbShape="diamond"
            label="Diamond Range"
            showValue={true}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Range sliders with different thumb shapes and sizes.',
      },
    },
  },
};
