import type { Meta, StoryObj } from "@storybook/preact";

import { Grid } from "./Grid";
import { Row } from "./Row";
import { Col } from "./Col";

const meta: Meta = {
  title: "Dashboard/Grid",
  component: Grid,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Grid>;

export const Basic: Story = {
  render: () => (
    <Grid>
      <Row>
        <Col>Col 1</Col>
        <Col>Col 2</Col>
        <Col>Col 3</Col>
      </Row>
    </Grid>
  ),
};

export const WithGap: Story = {
  render: () => (
    <Grid gap="32px">
      <Row>
        <Col>Col 1</Col>
        <Col>Col 2</Col>
      </Row>
    </Grid>
  ),
};
