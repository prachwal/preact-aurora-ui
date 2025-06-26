import { render, screen, fireEvent } from "@testing-library/preact";
import { describe, it, expect, vi } from "vitest";

import { Drawer } from "./Drawer";
import "@testing-library/jest-dom";

describe("Drawer", () => {
  it("renders children when open", () => {
    render(
      <Drawer isOpen onClose={vi.fn()}>
        Test
      </Drawer>,
    );
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
  it("does not render when closed", () => {
    render(
      <Drawer isOpen={false} onClose={vi.fn()}>
        Test
      </Drawer>,
    );
    expect(screen.queryByText("Test")).not.toBeInTheDocument();
  });
  it("calls onClose on overlay click", () => {
    const onClose = vi.fn();
    render(
      <Drawer isOpen onClose={onClose}>
        X
      </Drawer>,
    );
    fireEvent.click(screen.getByTestId("drawer-overlay"));
    expect(onClose).toHaveBeenCalled();
  });
  it("calls onClose on close button", () => {
    const onClose = vi.fn();
    render(
      <Drawer isOpen onClose={onClose} title="T">
        X
      </Drawer>,
    );
    fireEvent.click(screen.getByLabelText("Zamknij"));
    expect(onClose).toHaveBeenCalled();
  });
  it("calls onClose on Escape key", () => {
    const onClose = vi.fn();
    render(
      <Drawer isOpen onClose={onClose}>
        X
      </Drawer>,
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });
  it("does not call onClose on overlay click if closeOnOverlayClick is false", () => {
    const onClose = vi.fn();
    render(
      <Drawer isOpen onClose={onClose} closeOnOverlayClick={false}>
        X
      </Drawer>,
    );
    fireEvent.click(screen.getByTestId("drawer-overlay"));
    expect(onClose).not.toHaveBeenCalled();
  });
  it("does not call onClose on Escape if closeOnEscape is false", () => {
    const onClose = vi.fn();
    render(
      <Drawer isOpen onClose={onClose} closeOnEscape={false}>
        X
      </Drawer>,
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });
});
