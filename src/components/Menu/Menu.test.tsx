import { render, screen, fireEvent } from "@testing-library/preact";
import { describe, it, expect, vi } from "vitest";

import { Menu } from "./Menu";
import styles from "./Menu.module.scss";
import "@testing-library/jest-dom";

describe("Menu", () => {
  const items = [
    { key: "1", label: "Item 1" },
    { key: "2", label: "Item 2", disabled: true },
    { key: "3", label: "Item 3" },
  ];

  it("renders items", () => {
    render(<Menu items={items} />);
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  it("calls onSelect when item clicked", () => {
    const onSelect = vi.fn();
    render(<Menu items={items} onSelect={onSelect} />);
    fireEvent.click(screen.getByText("Item 1"));
    expect(onSelect).toHaveBeenCalledWith("1");
  });

  it("does not call onSelect for disabled", () => {
    const onSelect = vi.fn();
    render(<Menu items={items} onSelect={onSelect} />);
    fireEvent.click(screen.getByText("Item 2"));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("applies selectedKey", () => {
    render(<Menu items={items} selectedKey="3" />);
    const label = screen.getByText("Item 3");
    const li = label.closest("li");
    expect(li).toHaveClass(styles.selected);
  });
});
