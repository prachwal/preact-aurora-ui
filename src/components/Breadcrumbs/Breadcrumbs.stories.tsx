import type { Meta, StoryObj } from "@storybook/preact";
import { useState } from "preact/hooks";

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
  { label: "Home", href: "/", icon: <span>🏠</span> },
  { label: "Products", href: "/products" },
  { label: "Current Page" },
];

export const Default: Story = {
  render: () => <Breadcrumbs items={items} />,
};

export const OnlyCurrent: Story = {
  render: () => <Breadcrumbs items={[{ label: "Current Page" }]} />,
};

export const CustomSeparator: Story = {
  render: () => <Breadcrumbs items={items} separator=">" />,
};

export const WithIcons: Story = {
  render: () => (
    <Breadcrumbs
      items={[
        { label: "Home", href: "/", icon: <span>🏠</span> },
        { label: "Section", href: "/section", icon: <span>📁</span> },
        { label: "Current", icon: <span>📄</span> },
      ]}
    />
  ),
};

export const LongLabels: Story = {
  render: () => (
    <Breadcrumbs
      items={[
        { label: "Very Long Home Label", href: "/" },
        { label: "Section With A Very Long Name", href: "/section" },
        { label: "Current Page With Even Longer Name" },
      ]}
    />
  ),
};

export const ExternalLinks: Story = {
  render: () => (
    <Breadcrumbs
      items={[
        { label: "Home", href: "https://example.com" },
        { label: "Docs", href: "https://docs.example.com" },
        { label: "Current" },
      ]}
    />
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div data-theme="dark" style={{ background: "#222", padding: 16 }}>
      <Breadcrumbs items={items} />
    </div>
  ),
};

export const DynamicPath: Story = {
  render: () => {
    const [path, setPath] = useState<BreadcrumbItem[]>([
      { label: "Home", href: "/" },
      { label: "Section", href: "/section" },
      { label: "Current" },
    ]);
    return (
      <div>
        <Breadcrumbs items={path} />
        <button
          onClick={() => setPath(path.slice(0, -1))}
          disabled={path.length <= 1}
        >
          Remove last
        </button>
        <button
          onClick={() =>
            setPath([...path, { label: `Extra ${path.length + 1}` }])
          }
        >
          Add
        </button>
      </div>
    );
  },
};
