import type { Meta, StoryObj } from '@storybook/preact';

import { Sidebar } from './Sidebar';

const meta: Meta = {
  title: 'Dashboard/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  render: () => (
    <Sidebar
      nav={
        <ul
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            listStyle: 'none',
            margin: 0,
          }}
        >
          <li>Dashboard</li>
          <li>Settings</li>
        </ul>
      }
      actions={<button>Logout</button>}
    />
  ),
};

export const WithChildren: Story = {
  render: () => (
    <Sidebar>
      <div style={{ marginTop: 24 }}>Custom children</div>
    </Sidebar>
  ),
};
