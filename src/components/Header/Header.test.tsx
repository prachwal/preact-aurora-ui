import { render, screen } from "@testing-library/preact";
import { describe, it, expect } from "vitest";

import { Header } from "./Header";
import "@testing-library/jest-dom";

describe("Header", () => {
  it("renders with logo, nav, actions and children", () => {
    render(
      <Header
        logo={<span data-testid="logo">Logo</span>}
        nav={
          <ul data-testid="nav">
            <li>NavItem</li>
          </ul>
        }
        actions={<button data-testid="action">Action</button>}
      >
        <div data-testid="children">Children</div>
      </Header>,
    );
    expect(screen.getByTestId("logo")).toBeInTheDocument();
    expect(screen.getByTestId("nav")).toBeInTheDocument();
    expect(screen.getByTestId("action")).toBeInTheDocument();
    expect(screen.getByTestId("children")).toBeInTheDocument();
  });

  it("applies className and style", () => {
    render(<Header className="test-class" style={{ background: "red" }} />);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("test-class");
    expect(header).toHaveStyle({ background: "red" });
  });

  it("sets aria-label", () => {
    render(<Header aria-label="CustomHeader" />);
    expect(screen.getByRole("banner")).toHaveAttribute(
      "aria-label",
      "CustomHeader",
    );
  });
});
