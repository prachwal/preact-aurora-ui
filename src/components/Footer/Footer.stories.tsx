import type { Meta, StoryObj } from '@storybook/preact';

import { Footer } from './Footer';

const meta: Meta = {
  title: 'Layout/Footer',
  component: Footer,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  render: () => <Footer>Copyright 2025</Footer>,
};

export const CustomClass: Story = {
  render: () => <Footer className="custom">Custom class</Footer>,
};
