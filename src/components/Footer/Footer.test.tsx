import { render, screen } from "@testing-library/preact";
import { describe, it, expect } from "vitest";

import { Footer } from "./Footer";
import "@testing-library/jest-dom";

describe("Footer", () => {
  it("renders children", () => {
    render(
      <Footer>
        <div data-testid="children">Children</div>
      </Footer>,
    );
    expect(screen.getByTestId("children")).toBeInTheDocument();
  });

  it("applies className and style", () => {
    render(<Footer className="test-class" style={{ background: "black" }} />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("test-class");
    expect(footer).toHaveStyle({ background: "black" });
  });

  it("sets aria-label", () => {
    render(<Footer aria-label="CustomFooter" />);
    expect(screen.getByRole("contentinfo")).toHaveAttribute(
      "aria-label",
      "CustomFooter",
    );
  });
});
