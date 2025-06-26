import { render, screen, fireEvent } from "@testing-library/preact";
import { describe, it, expect, vi } from "vitest";

import type { BreadcrumbItem } from "./Breadcrumbs";
import { Breadcrumbs } from "./Breadcrumbs";
import "@testing-library/jest-dom";

describe("Breadcrumbs", () => {
  it("renders nothing for empty items", () => {
    const { container } = render(<Breadcrumbs items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders single item as active", () => {
    render(<Breadcrumbs items={[{ label: "Home" }]} />);
    expect(screen.getByText("Home")).toHaveAttribute("aria-current", "page");
  });

  it("renders all items and separators", () => {
    const items: BreadcrumbItem[] = [
      { label: "Home", href: "/" },
      { label: "Section", href: "/section" },
      { label: "Current" },
    ];
    render(<Breadcrumbs items={items} separator=">" />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Section")).toBeInTheDocument();
    expect(screen.getByText("Current")).toBeInTheDocument();
    expect(screen.getAllByText(">", { selector: "span" }).length).toBe(2);
  });

  it("calls onItemClick for link", () => {
    const onItemClick = vi.fn();
    const items: BreadcrumbItem[] = [
      { label: "Home", href: "/" },
      { label: "Current" },
    ];
    render(<Breadcrumbs items={items} onItemClick={onItemClick} />);
    fireEvent.click(screen.getByText("Home"));
    expect(onItemClick).toHaveBeenCalledWith(
      expect.objectContaining({ label: "Home", href: "/" }),
      0,
      expect.any(Object),
    );
  });

  it("does not call onItemClick for last (active) item", () => {
    const onItemClick = vi.fn();
    const items: BreadcrumbItem[] = [
      { label: "Home", href: "/" },
      { label: "Current" },
    ];
    render(<Breadcrumbs items={items} onItemClick={onItemClick} />);
    fireEvent.click(screen.getByText("Current"));
    expect(onItemClick).not.toHaveBeenCalledWith(
      expect.objectContaining({ label: "Current" }),
      1,
      expect.any(Object),
    );
  });

  it("applies className and style", () => {
    const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }];
    render(
      <Breadcrumbs
        items={items}
        className="test-class"
        style={{ background: "#eee" }}
      />,
    );
    const nav = screen.getByLabelText("Breadcrumb");
    expect(nav).toHaveClass("test-class");
    expect(nav).toHaveStyle({ background: "#eee" });
  });

  it("renders icon if provided", () => {
    const items: BreadcrumbItem[] = [
      { label: "Home", href: "/", icon: <span data-testid="icon">🏠</span> },
      { label: "Current" },
    ];
    render(<Breadcrumbs items={items} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });
});
