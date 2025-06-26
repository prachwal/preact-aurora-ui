import { renderHook, act } from "@testing-library/preact";

import { describe, it, expect } from "vitest";
import { useBreakpoint } from "./useBreakpoint";

describe("useBreakpoint", () => {
  it("returns correct breakpoint for window width", () => {
    global.innerWidth = 800;
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current).toBe("md");
  });
  it("updates on resize", () => {
    const { result } = renderHook(() => useBreakpoint());
    act(() => {
      global.innerWidth = 1300;
      global.dispatchEvent(new Event("resize"));
    });
    expect(result.current).toBe("xl");
  });
});
