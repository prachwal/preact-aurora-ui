import type { Meta, StoryObj } from '@storybook/preact';

import { Chip, AddIcon } from './Chip';
import type {
  AssistChipProps,
  FilterChipProps,
  InputChipProps,
  SuggestionChipProps,
} from './types';

const meta: Meta = {
  title: 'Advanced/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Material Design 3 Chip component with support for input, assist, filter, and suggestion types.',
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'The content of the chip',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the chip is disabled',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// Assist Chip Stories
export const AssistChip: Story = {
  render: () => (
    <Chip
      {...({
        type: 'assist',
        onClick: () => alert('Assist chip clicked!'),
      } as AssistChipProps)}
    >
      Add Item
    </Chip>
  ),
};

export const AssistChipWithIcon: Story = {
  render: () => (
    <Chip
      {...({
        type: 'assist',
        icon: <AddIcon />,
        onClick: () => alert('Assist chip with icon clicked!'),
      } as AssistChipProps)}
    >
      Add Item
    </Chip>
  ),
};

// Filter Chip Stories
export const FilterChip: Story = {
  render: () => (
    <Chip
      {...({
        type: 'filter',
        selected: false,
        onSelect: (selected: boolean) =>
          alert(`Filter chip ${selected ? 'selected' : 'deselected'}`),
      } as FilterChipProps)}
    >
      Category
    </Chip>
  ),
};

export const FilterChipSelected: Story = {
  render: () => (
    <Chip
      {...({
        type: 'filter',
        selected: true,
        onSelect: (selected: boolean) =>
          alert(`Filter chip ${selected ? 'selected' : 'deselected'}`),
      } as FilterChipProps)}
    >
      Category
    </Chip>
  ),
};

// Input Chip Stories
export const InputChip: Story = {
  render: () => (
    <Chip
      {...({
        type: 'input',
        removable: true,
        onRemove: () => alert('Input chip removed!'),
      } as InputChipProps)}
    >
      React
    </Chip>
  ),
};

export const InputChipNotRemovable: Story = {
  render: () => (
    <Chip
      {...({
        type: 'input',
        removable: false,
      } as InputChipProps)}
    >
      TypeScript
    </Chip>
  ),
};

// Suggestion Chip Stories
export const SuggestionChip: Story = {
  render: () => (
    <Chip
      {...({
        type: 'suggestion',
        onClick: () => alert('Suggestion chip clicked!'),
      } as SuggestionChipProps)}
    >
      React Tutorial
    </Chip>
  ),
};

// Disabled States
export const DisabledAssistChip: Story = {
  render: () => (
    <Chip
      {...({
        type: 'assist',
        disabled: true,
        onClick: () => alert('This should not fire'),
      } as AssistChipProps)}
    >
      Disabled
    </Chip>
  ),
};

export const DisabledFilterChip: Story = {
  render: () => (
    <Chip
      {...({
        type: 'filter',
        disabled: true,
        selected: false,
        onSelect: () => alert('This should not fire'),
      } as FilterChipProps)}
    >
      Disabled Filter
    </Chip>
  ),
};

// With Avatar
export const ChipWithAvatar: Story = {
  render: () => (
    <Chip
      {...({
        type: 'assist',
        avatar: (
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#6200ea',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            JD
          </div>
        ),
        onClick: () => alert('Avatar chip clicked!'),
      } as AssistChipProps)}
    >
      John Doe
    </Chip>
  ),
};
