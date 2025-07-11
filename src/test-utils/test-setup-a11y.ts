// --- Exported test utils for a11y tests ---
/**
 * Runs axe-core accessibility tests on a container.
 */
export async function runA11yTest(container: HTMLElement): Promise<any[]> {
  if (!window.axe) {
    const axe = await import('axe-core');
    window.axe = axe.default;
  }
  const results = await window.axe.run(container);
  return results.violations || [];
}

/**
 * Calculates color contrast ratio between two hex colors.
 */
export function checkColorContrast(fg: string, bg: string): number {
  // Simple WCAG contrast ratio calculation
  function hexToRgb(hex: string) {
    const n = hex.replace('#', '');
    const v =
      n.length === 3
        ? n
            .split('')
            .map((c) => c + c)
            .join('')
        : n;
    const num = parseInt(v, 16);
    return [num >> 16, (num >> 8) & 0xff, num & 0xff];
  }
  function luminance([r, g, b]: number[]) {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  }
  const l1 = luminance(hexToRgb(fg));
  const l2 = luminance(hexToRgb(bg));
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
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

// Mock HTMLCanvasElement to prevent axe-core errors
HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
  fillRect: vi.fn(),
  clearRect: vi.fn(),
  getImageData: vi.fn(() => ({ data: new Array(4) })),
  putImageData: vi.fn(),
  createImageData: vi.fn(() => ({ data: new Array(4) })),
  setTransform: vi.fn(),
  drawImage: vi.fn(),
  save: vi.fn(),
  fillText: vi.fn(),
  restore: vi.fn(),
  beginPath: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  closePath: vi.fn(),
  stroke: vi.fn(),
  translate: vi.fn(),
  scale: vi.fn(),
  rotate: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
  measureText: vi.fn(() => ({ width: 0 })),
  transform: vi.fn(),
  rect: vi.fn(),
  clip: vi.fn(),
});

declare global {
  interface Window {
    axe: any;
  }
}

beforeEach(async () => {
  const axe = await import('axe-core');
  window.axe = axe.default;
});

afterEach(() => {
  // ...pozostała część oryginalnego pliku...
});
