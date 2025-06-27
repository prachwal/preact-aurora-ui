import type { Meta, StoryObj } from '@storybook/preact';

import { Col } from './Col';

const meta: Meta = {
  title: 'Dashboard/Col',
  component: Col,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Col>;

export const Basic: Story = {
  render: () => <Col>Col 1</Col>,
};

export const SpanOffset: Story = {
  render: () => (
    <Col span={2} offset={1}>
      Col 2
    </Col>
  ),
};
