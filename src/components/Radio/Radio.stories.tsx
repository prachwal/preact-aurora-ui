import type { Meta, StoryObj } from '@storybook/preact';

import { Radio, RadioGroup } from './index';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Material Design 3 Radio component for single selection within a group. Supports controlled and uncontrolled modes, error states, and accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Radio',
    value: 'default',
  } as any,
};

export const Checked: Story = {
  args: {
    label: 'Checked Radio',
    value: 'checked',
    checked: true,
  } as any,
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Radio',
    value: 'disabled',
    disabled: true,
  } as any,
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled Checked Radio',
    value: 'disabled-checked',
    checked: true,
    disabled: true,
  } as any,
};

export const Error: Story = {
  args: {
    label: 'Error State Radio',
    value: 'error',
    error: true,
  } as any,
};

export const Required: Story = {
  args: {
    label: 'Required Radio',
    value: 'required',
    required: true,
  } as any,
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Radio label="Small Radio" value="small" size="small" />
      <Radio label="Medium Radio" value="medium" size="medium" />
      <Radio label="Large Radio" value="large" size="large" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Radio label="Primary Radio" value="primary" color="primary" checked />
      <Radio label="Secondary Radio" value="secondary" color="secondary" checked />
      <Radio label="Error Radio" value="error" color="error" checked />
    </div>
  ),
};

// RadioGroup Stories
export const RadioGroupMeta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'RadioGroup component manages a group of Radio components with shared state and name. Supports controlled and uncontrolled modes.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>;

type RadioGroupStory = StoryObj<typeof RadioGroupMeta>;

export const BasicGroup: RadioGroupStory = {
  render: () => (
    <RadioGroup label="Choose an option">
      <Radio label="Option 1" value="option1" />
      <Radio label="Option 2" value="option2" />
      <Radio label="Option 3" value="option3" />
    </RadioGroup>
  ),
};

export const HorizontalGroup: RadioGroupStory = {
  render: () => (
    <RadioGroup label="Choose an option" orientation="horizontal">
      <Radio label="Option 1" value="option1" />
      <Radio label="Option 2" value="option2" />
      <Radio label="Option 3" value="option3" />
    </RadioGroup>
  ),
};

export const ControlledGroup: RadioGroupStory = {
  render: () => (
    <RadioGroup label="Choose an option" value="option2">
      <Radio label="Option 1" value="option1" />
      <Radio label="Option 2" value="option2" />
      <Radio label="Option 3" value="option3" />
    </RadioGroup>
  ),
};

export const UncontrolledGroup: RadioGroupStory = {
  render: () => (
    <RadioGroup label="Choose an option" defaultValue="option1">
      <Radio label="Option 1" value="option1" />
      <Radio label="Option 2" value="option2" />
      <Radio label="Option 3" value="option3" />
    </RadioGroup>
  ),
};

export const DisabledGroup: RadioGroupStory = {
  render: () => (
    <RadioGroup label="Choose an option" disabled>
      <Radio label="Option 1" value="option1" />
      <Radio label="Option 2" value="option2" />
      <Radio label="Option 3" value="option3" />
    </RadioGroup>
  ),
};

export const ErrorGroup: RadioGroupStory = {
  render: () => (
    <RadioGroup label="Choose an option" error helperText="Please select a valid option">
      <Radio label="Option 1" value="option1" />
      <Radio label="Option 2" value="option2" />
      <Radio label="Option 3" value="option3" />
    </RadioGroup>
  ),
};

export const RequiredGroup: RadioGroupStory = {
  render: () => (
    <RadioGroup label="Choose an option" required helperText="This field is required">
      <Radio label="Option 1" value="option1" />
      <Radio label="Option 2" value="option2" />
      <Radio label="Option 3" value="option3" />
    </RadioGroup>
  ),
};

export const GroupSizes: RadioGroupStory = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <RadioGroup label="Small Group" size="small">
        <Radio label="Option 1" value="small1" />
        <Radio label="Option 2" value="small2" />
      </RadioGroup>
      <RadioGroup label="Medium Group" size="medium">
        <Radio label="Option 1" value="medium1" />
        <Radio label="Option 2" value="medium2" />
      </RadioGroup>
      <RadioGroup label="Large Group" size="large">
        <Radio label="Option 1" value="large1" />
        <Radio label="Option 2" value="large2" />
      </RadioGroup>
    </div>
  ),
};
