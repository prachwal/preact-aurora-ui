import type { Meta, StoryObj } from '@storybook/preact';
import { useState } from 'preact/hooks';

import { Select } from './Select';
import type { SelectOption, SelectOptionGroup } from './types';

const meta: Meta<typeof Select> = {
  title: 'Form/Select',
  component: Select,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Material Design 3 Select component for dropdown selection with support for single/multiple selection, search, and grouping.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

// Sample data
const fruitOptions: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
  { value: 'honeydew', label: 'Honeydew' },
];

const categoryGroups: SelectOptionGroup[] = [
  {
    label: 'Fruits',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'cherry', label: 'Cherry' },
    ],
  },
  {
    label: 'Vegetables',
    options: [
      { value: 'carrot', label: 'Carrot' },
      { value: 'broccoli', label: 'Broccoli' },
      { value: 'spinach', label: 'Spinach' },
    ],
  },
  {
    label: 'Proteins',
    options: [
      { value: 'chicken', label: 'Chicken' },
      { value: 'beef', label: 'Beef' },
      { value: 'tofu', label: 'Tofu' },
    ],
  },
];

export const Basic: Story = {
  render: () => <Select options={fruitOptions} placeholder="Select a fruit..." />,
};

export const WithLabel: Story = {
  render: () => (
    <Select options={fruitOptions} label="Favorite Fruit" placeholder="Choose your favorite..." />
  ),
};

export const Required: Story = {
  render: () => (
    <Select
      options={fruitOptions}
      label="Required Field"
      placeholder="This field is required"
      required
    />
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <Select
      options={fruitOptions}
      label="Fruit Selection"
      placeholder="Select a fruit..."
      helperText="Choose from our available fruits"
    />
  ),
};

export const WithError: Story = {
  render: () => (
    <Select
      options={fruitOptions}
      label="Fruit Selection"
      placeholder="Select a fruit..."
      error="Please select a valid option"
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select
      options={fruitOptions}
      label="Disabled Select"
      placeholder="Cannot select..."
      disabled
    />
  ),
};

export const Searchable: Story = {
  render: () => (
    <Select
      options={fruitOptions}
      label="Searchable Select"
      placeholder="Search and select..."
      searchable
    />
  ),
};

export const Multiple: Story = {
  render: () => (
    <Select
      options={fruitOptions}
      label="Multiple Selection"
      placeholder="Select multiple fruits..."
      multiple
    />
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Select
        options={fruitOptions}
        label="Outlined (Default)"
        variant="outlined"
        placeholder="Select..."
      />
      <Select options={fruitOptions} label="Filled" variant="filled" placeholder="Select..." />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Select options={fruitOptions} label="Small" size="small" placeholder="Small select..." />
      <Select
        options={fruitOptions}
        label="Medium (Default)"
        size="medium"
        placeholder="Medium select..."
      />
      <Select options={fruitOptions} label="Large" size="large" placeholder="Large select..." />
    </div>
  ),
};

export const WithState: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');
    return (
      <Select
        options={fruitOptions}
        value={value}
        onChange={(newValue) => setValue(newValue as string)}
        label="Controlled Select"
        placeholder="Select a fruit..."
      />
    );
  },
};

export const Clearable: Story = {
  render: () => (
    <Select
      options={fruitOptions}
      label="Clearable Select"
      placeholder="Select and clear..."
      clearable
    />
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Select groups={categoryGroups} label="Grouped Options" placeholder="Select from groups..." />
  ),
};

export const GroupedWithSearch: Story = {
  render: () => (
    <Select
      groups={categoryGroups}
      label="Searchable Grouped"
      placeholder="Search in groups..."
      searchable
    />
  ),
};

export const GroupedMultiple: Story = {
  render: () => (
    <Select
      groups={categoryGroups}
      label="Multiple from Groups"
      placeholder="Select multiple from groups..."
      multiple
      searchable
    />
  ),
};

export const Loading: Story = {
  render: () => (
    <Select
      options={fruitOptions}
      label="Loading Select"
      placeholder="Loading options..."
      loading
    />
  ),
};

export const EmptyState: Story = {
  render: () => <Select options={[]} label="Empty Select" placeholder="No options available" />,
};

export const EmptyWithCustomMessage: Story = {
  render: () => (
    <Select
      options={[]}
      label="Custom Empty Message"
      placeholder="No options..."
      renderEmpty={() => <div>😢 Nothing found here!</div>}
    />
  ),
};

export const CustomRendering: Story = {
  render: () => (
    <Select
      options={fruitOptions}
      label="Custom Option Rendering"
      placeholder="Select a fruit..."
      renderOption={(option) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '16px' }}>🍎</span>
          <span>{option.label}</span>
        </div>
      )}
    />
  ),
};

export const CustomValueRendering: Story = {
  render: () => (
    <Select
      options={[
        { value: 'apple', label: 'Apple', data: { emoji: '🍎' } },
        { value: 'banana', label: 'Banana', data: { emoji: '🍌' } },
        { value: 'cherry', label: 'Cherry', data: { emoji: '🍒' } },
      ]}
      label="Custom Value Display"
      placeholder="Select a fruit..."
      renderValue={(value, options) => {
        const option = options.find((opt) => opt.value === value);
        return option ? `${option.data?.emoji} ${option.label}` : value;
      }}
    />
  ),
};

export const DisabledOptions: Story = {
  render: () => (
    <Select
      options={[
        { value: 'available1', label: 'Available Option 1' },
        { value: 'disabled1', label: 'Disabled Option', disabled: true },
        { value: 'available2', label: 'Available Option 2' },
        { value: 'disabled2', label: 'Another Disabled', disabled: true },
      ]}
      label="With Disabled Options"
      placeholder="Some options are disabled..."
    />
  ),
};

export const LargeDataset: Story = {
  render: () => (
    <Select
      options={Array.from({ length: 20 }, (_, i) => ({
        value: `item-${i}`,
        label: `Item ${i + 1}`,
      }))}
      label="Large Dataset"
      placeholder="Select from many options..."
      searchable
      maxDropdownHeight={200}
    />
  ),
};
