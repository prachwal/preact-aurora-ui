import type { Meta, StoryObj } from '@storybook/preact';

import { Row } from './Row';
import { Col } from './Col';

const meta: Meta = {
  title: 'Dashboard/Row',
  component: Row,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Row>;

export const Basic: Story = {
  render: () => (
    <Row>
      <Col>Col 1</Col>
      <Col>Col 2</Col>
    </Row>
  ),
};

export const AlignJustify: Story = {
  render: () => (
    <Row align="center" justify="between">
      <Col>Col 1</Col>
      <Col>Col 2</Col>
    </Row>
  ),
};
