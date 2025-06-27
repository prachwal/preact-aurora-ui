import { render, screen } from "@testing-library/preact";
import { describe, it, expect } from "vitest";

import { Loader } from "./Loader";
import "@testing-library/jest-dom";

describe("Loader", () => {
  it("renders with default props", () => {
    render(<Loader />);
    expect(screen.getByTestId("loader-root")).toBeInTheDocument();
  });
  it("applies size classes", () => {
    render(<Loader size="lg" />);
    expect(screen.getByTestId("loader-root")).toHaveClass("lg");
  });
  it("applies custom color", () => {
    render(<Loader color="#f00" />);
    expect(screen.getByTestId("loader-root")).toHaveStyle({ color: "#f00" });
  });
  it("sets aria-label", () => {
    render(<Loader aria-label="Czekaj" />);
    expect(screen.getByLabelText("Czekaj")).toBeInTheDocument();
  });
});
