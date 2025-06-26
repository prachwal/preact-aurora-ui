import { render, screen } from "@testing-library/preact";
import { describe, it, expect } from "vitest";

import { Content } from "./Content";
import "@testing-library/jest-dom";

describe("Content", () => {
  it("renders children", () => {
    render(
      <Content>
        <div data-testid="children">Children</div>
      </Content>,
    );
    expect(screen.getByTestId("children")).toBeInTheDocument();
  });

  it("applies className and style", () => {
    render(<Content className="test-class" style={{ background: "yellow" }} />);
    const main = screen.getByRole("main");
    expect(main).toHaveClass("test-class");
    expect(main).toHaveStyle({ background: "yellow" });
  });

  it("sets aria-label", () => {
    render(<Content aria-label="CustomContent" />);
    expect(screen.getByRole("main")).toHaveAttribute(
      "aria-label",
      "CustomContent",
    );
  });
});
