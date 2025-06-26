import type { Meta, StoryObj } from "@storybook/preact";
import { useState } from "preact/hooks";

import { Drawer } from "./Drawer";

const meta: Meta = {
  title: "Dashboard/Drawer",
  component: Drawer,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Drawer>;

export const Basic: Story = {
  render: () => {
    const [isOpen, setOpen] = useState(true);
    return (
      <>
        <button onClick={() => setOpen(true)}>Open</button>
        <Drawer isOpen={isOpen} onClose={() => setOpen(false)} title="Panel">
          Content
        </Drawer>
      </>
    );
  },
};

export const Left: Story = {
  render: () => {
    const [isOpen, setOpen] = useState(true);
    return (
      <>
        <button onClick={() => setOpen(true)}>Open left</button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setOpen(false)}
          position="left"
          title="Left Drawer"
        >
          Left content
        </Drawer>
      </>
    );
  },
};

export const Modal: Story = {
  render: () => {
    const [isOpen, setOpen] = useState(true);
    return (
      <>
        <button onClick={() => setOpen(true)}>Open modal</button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setOpen(false)}
          isModal
          title="Modal Drawer"
        >
          Modal content
        </Drawer>
      </>
    );
  },
};

export const NoOverlay: Story = {
  render: () => {
    const [isOpen, setOpen] = useState(true);
    return (
      <>
        <button onClick={() => setOpen(true)}>Open no overlay</button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setOpen(false)}
          isModal={false}
          title="No Overlay"
        >
          No overlay content
        </Drawer>
      </>
    );
  },
};
