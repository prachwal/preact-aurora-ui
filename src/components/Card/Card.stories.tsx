import type { Meta, StoryObj } from '@storybook/preact';

import { Button } from '../Button';

import { Card } from './Card';

const meta: Meta = {
  title: 'Advanced/Card',
  component: Card,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  render: () => <Card>Content</Card>,
};

export const WithTitle: Story = {
  render: () => <Card title="Title">Content</Card>,
};

export const WithSubtitle: Story = {
  render: () => (
    <Card title="Title" subtitle="Subtitle">
      Content
    </Card>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Card
      title="Title"
      actions={
        <Button variant="text" size="small">
          Act
        </Button>
      }
    >
      Content
    </Card>
  ),
};
