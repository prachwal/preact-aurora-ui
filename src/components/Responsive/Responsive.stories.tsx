import type { Meta, StoryObj } from '@storybook/preact';

import { useBreakpoint } from './useBreakpoint';

const meta: Meta = {
  title: 'Examples/Responsive',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj;

export const Basic: Story = {
  render: () => (
    <div>
      Aktualny breakpoint: <b>{useBreakpoint()}</b>
    </div>
  ),
};
