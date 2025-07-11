// --- Exported test utils for performance tests ---
/**
 * Estimates the size of a DOM element in bytes (very rough, for test purposes).
 */
export function estimateComponentSize(element: HTMLElement): number {
  if (!element) return 0;
  // Count HTML string length as bytes
  return element.outerHTML.length;
}

/**
 * Performance thresholds for tests.
 */
export const PERFORMANCE_THRESHOLDS = {
  RENDER_TIME_MS: 20,
  COMPONENT_SIZE_KB: 4,
};

/**
 * Checks if render time and component size are within thresholds.
 */
export function expectPerformance({
  renderTime,
  componentSize,
}: {
  renderTime: number;
  componentSize: number;
}) {
  return {
    allOk:
      renderTime < PERFORMANCE_THRESHOLDS.RENDER_TIME_MS &&
      componentSize < PERFORMANCE_THRESHOLDS.COMPONENT_SIZE_KB * 1024,
    renderTimeOk: renderTime < PERFORMANCE_THRESHOLDS.RENDER_TIME_MS,
    componentSizeOk: componentSize < PERFORMANCE_THRESHOLDS.COMPONENT_SIZE_KB * 1024,
  };
}
import { beforeEach, afterEach, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

// Mock window.matchMedia for ThemeProvider tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: query === '(prefers-color-scheme: dark)',
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

interface PerformanceMetrics {
  renderTime: number;
  componentSize: number;
  memoryUsage?: number;
  reRenderCount: number;
}

declare global {
  interface Window {
    __performanceMetrics?: PerformanceMetrics;
    __startTime?: number;
    __renderCount?: number;
  }
}

beforeEach(() => {
  window.__startTime = performance.now();
  window.__renderCount = 0;
  window.__performanceMetrics = {
    renderTime: 0,
    componentSize: 0,
    reRenderCount: 0,
  };
});

afterEach(() => {
  delete window.__performanceMetrics;
  delete window.__startTime;
  delete window.__renderCount;
});

export const measureRenderTime = (callback: () => void): number => {
  const start = performance.now();
  callback();
  const end = performance.now();
  return end - start;
};
