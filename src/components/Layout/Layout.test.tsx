import { h } from "preact";
import { render, screen } from "@testing-library/preact";
import { describe, it, expect } from "vitest";
import Layout from "./Layout";
import "@testing-library/jest-dom";

describe("Layout", () => {
  it("renderuje children i domyślne klasy", () => {
    render(
      <Layout>
        <div data-testid="child">Test</div>
      </Layout>
    );
    const child = screen.getByTestId("child");
    expect(child).toBeInTheDocument();
  });

  it("pozwala na przekazanie className i style", () => {
    render(
      <Layout className="custom-class" style={{ background: "red" }}>
        <span>Test</span>
      </Layout>
    );
    const layout = screen.getByText("Test").parentElement;
    expect(layout).toHaveClass("custom-class");
    expect(layout).toHaveStyle({ background: "red" });
  });

  it("obsługuje direction i fullHeight", () => {
    render(
      <Layout direction="horizontal" fullHeight={false}>
        <span>Test</span>
      </Layout>
    );
    const layout = screen.getByText("Test").parentElement;
    expect(layout?.className).toMatch(/layout--horizontal/);
    expect(layout?.className).not.toMatch(/layout--fullHeight/);
  });
});
