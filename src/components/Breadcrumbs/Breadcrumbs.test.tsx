import { render, screen, fireEvent } from "@testing-library/preact";
import { describe, it, expect, vi } from "vitest";

import type { BreadcrumbItem } from "./Breadcrumbs";
import { Breadcrumbs } from "./Breadcrumbs";
import "@testing-library/jest-dom";

describe("Breadcrumbs", () => {
  const items: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Section", href: "/section" },
    { label: "Current", "aria-current": "page" },
  ];

  it("renders all items", () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Section")).toBeInTheDocument();
    expect(screen.getByText("Current")).toBeInTheDocument();
  });

  it("renders separators", () => {
    render(<Breadcrumbs items={items} separator=">" />);
    expect(screen.getAllByText(">").length).toBe(2);
  });

  it("calls onClick for item", () => {
    const onClick = vi.fn();
    const customItems: BreadcrumbItem[] = [
      { label: "Home", href: "/", onClick },
      { label: "Current", "aria-current": "page" },
    ];
    render(<Breadcrumbs items={customItems} />);
    fireEvent.click(screen.getByText("Home"));
    expect(onClick).toHaveBeenCalled();
  });

  it("applies className and style", () => {
    render(
      <Breadcrumbs
        items={items}
        className="test-class"
        style={{ background: "#eee" }}
      />,
    );
    const nav = screen.getByLabelText("Breadcrumbs");
    expect(nav).toHaveClass("test-class");
    expect(nav).toHaveStyle({ background: "#eee" });
  });
});
