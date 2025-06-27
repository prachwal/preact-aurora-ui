import type { Meta, StoryObj } from '@storybook/preact';

import { Button } from '../Button';

import { PageHeader } from './PageHeader';

const meta: Meta = {
  title: 'Dashboard/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  render: () => <PageHeader title="Dashboard" subtitle="Welcome!" />,
};

export const WithActions: Story = {
  render: () => (
    <PageHeader
      title="Users"
      subtitle="Manage your users"
      actions={<Button variant="filled">Invite</Button>}
    />
  ),
};

export const CustomClass: Story = {
  render: () => (
    <PageHeader title="Custom" className="custom-class" style={{ background: '#eee' }} />
  ),
};
