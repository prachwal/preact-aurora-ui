import type { Meta, StoryObj } from '@storybook/preact';

import { Menu } from './Menu';

const meta: Meta = {
  title: 'Dashboard/Menu',
  component: Menu,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Menu>;

const items = [
  { key: '1', label: 'Dashboard' },
  { key: '2', label: 'Settings' },
  { key: '3', label: 'Profile', disabled: true },
];

export const Basic: Story = {
  render: () => <Menu items={items} />,
};

export const Selected: Story = {
  render: () => <Menu items={items} selectedKey="2" />,
};
