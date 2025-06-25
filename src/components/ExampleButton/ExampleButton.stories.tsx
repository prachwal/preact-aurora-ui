import type { Meta, StoryObj } from "@storybook/preact";

import { ExampleButton } from "./ExampleButton";

const meta: Meta<typeof ExampleButton> = {
  title: "Components/ExampleButton",
  component: ExampleButton,
  args: {
    children: "Click me",
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof ExampleButton>;

export const Default: Story = {
  args: {
    children: "Click me",
  },
};

export const CustomColor: Story = {
  args: {
    children: "Custom color",
    style: { background: "rebeccapurple" },
  },
};
