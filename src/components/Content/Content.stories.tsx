import type { Meta, StoryObj } from '@storybook/preact';

import { Content } from './Content';

const meta: Meta = {
  title: 'Layout/Content',
  component: Content,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Content>;

export const Default: Story = {
  render: () => (
    <Content>
      <div style={{ padding: 32, background: '#f5f5f5', borderRadius: 8 }}>
        Main dashboard content
      </div>
    </Content>
  ),
};

export const WithCustomClass: Story = {
  render: () => (
    <Content className="custom-class">
      <div style={{ padding: 32 }}>Custom class content</div>
    </Content>
  ),
};
