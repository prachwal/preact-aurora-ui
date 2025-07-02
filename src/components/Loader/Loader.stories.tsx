import type { Meta, StoryObj } from '@storybook/preact';

import { Loader } from './Loader';

const meta: Meta = {
  title: 'Advanced/Loader',
  component: Loader,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Loader>;

export const Basic: Story = {
  render: () => <Loader />,
};

export const Large: Story = {
  render: () => <Loader size="lg" />,
};

export const CustomColor: Story = {
  render: () => <Loader color="#e91e63" />,
};
