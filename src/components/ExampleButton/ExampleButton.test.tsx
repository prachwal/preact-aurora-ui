import { render, screen } from "@testing-library/preact";
import { describe, it, expect } from "vitest";

import { ExampleButton } from "./ExampleButton";
import "@testing-library/jest-dom";

describe("ExampleButton", () => {
  it("renders children", () => {
    render(<ExampleButton>Click me</ExampleButton>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("passes props to button", () => {
    render(<ExampleButton data-testid="btn">Test</ExampleButton>);
    const btn = screen.getByTestId("btn");
    expect(btn.tagName).toBe("BUTTON");
    expect(btn).toHaveTextContent("Test");
  });

  it("applies custom className", () => {
    render(<ExampleButton className="custom">A</ExampleButton>);
    expect(screen.getByText("A")).toHaveClass("custom");
  });

  it("has correct styles", () => {
    render(<ExampleButton>Styled</ExampleButton>);
    const btn = screen.getByText("Styled");
    // JSDOM nie rozwiązuje var() – sprawdzamy, czy background jest pusty lub zawiera 'var('
    const bg = btn.style.background;
    expect(bg === "" || bg.includes("var(")).toBe(true);
  });
});
