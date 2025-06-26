import type { Meta, StoryObj } from "@storybook/preact";

import { Card } from "./Card";

const meta: Meta = {
  title: "Dashboard/Card",
  component: Card,
  tags: ["autodocs"],
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
    <Card title="Title" actions={<button>Act</button>}>
      Content
    </Card>
  ),
};
