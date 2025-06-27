import type { Meta, StoryObj } from '@storybook/preact';

import { Header } from './Header';

const meta: Meta = {
  title: 'Dashboard/Header',
  component: Header,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  render: () => (
    <Header
      logo={<span style={{ fontWeight: 'bold' }}>Aurora</span>}
      nav={
        <ul style={{ display: 'flex', gap: 16, listStyle: 'none', margin: 0 }}>
          <li>Home</li>
          <li>About</li>
        </ul>
      }
      actions={<button>Logout</button>}
    />
  ),
};

export const WithChildren: Story = {
  render: () => (
    <Header logo={<span>Aurora</span>}>
      <div style={{ marginLeft: 24 }}>Custom children</div>
    </Header>
  ),
};
