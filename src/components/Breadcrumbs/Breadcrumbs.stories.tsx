import type { Meta, StoryObj } from "@storybook/preact";

import { Breadcrumbs } from "./Breadcrumbs";
import type { BreadcrumbItem } from "./Breadcrumbs";

const meta: Meta = {
  title: "Dashboard/Breadcrumbs",
  component: Breadcrumbs,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

const items: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Section", href: "/section" },
  { label: "Current", "aria-current": "page" },
];

export const Default: Story = {
  render: () => <Breadcrumbs items={items} />,
};

export const CustomSeparator: Story = {
  render: () => <Breadcrumbs items={items} separator=">" />,
};

export const WithCustomClass: Story = {
  render: () => <Breadcrumbs items={items} className="custom-class" />,
};
