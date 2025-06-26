import type { Meta, StoryObj } from "@storybook/preact";

import { Footer } from "./Footer";

const meta: Meta = {
  title: "Dashboard/Footer",
  component: Footer,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  render: () => (
    <Footer>
      <span style={{ fontSize: 14, color: "#888" }}>© 2025 Aurora UI</span>
    </Footer>
  ),
};

export const WithCustomClass: Story = {
  render: () => (
    <Footer className="custom-class">
      <span>Custom class footer</span>
    </Footer>
  ),
};
