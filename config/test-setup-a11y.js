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
beforeEach(async () => {
    // Konfiguracja axe dla każdego testu
    const axe = await import('axe-core');
    window.axe = axe.default;
});
afterEach(() => {
    // Cleanup after each test
    delete window.axe;
});
// Helper do testowania accessibility
export const runA11yTest = async (container) => {
    if (!window.axe) {
        throw new Error('Axe not loaded');
    }
    const results = await window.axe.run(container);
    if (results.violations.length > 0) {
        console.warn('🚨 Accessibility violations found:', results.violations);
        return results.violations;
    }
    return [];
};
// Helper do sprawdzania contrast ratio
export const checkColorContrast = (foreground, background) => {
    // Simplified contrast ratio calculation
    const getLuminance = (color) => {
        const hex = color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16) / 255;
        const g = parseInt(hex.substr(2, 2), 16) / 255;
        const b = parseInt(hex.substr(4, 2), 16) / 255;
        const sRGBToLinear = (c) => {
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        };
        return 0.2126 * sRGBToLinear(r) + 0.7152 * sRGBToLinear(g) + 0.0722 * sRGBToLinear(b);
    };
    const l1 = getLuminance(foreground);
    const l2 = getLuminance(background);
    const lightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    return (lightest + 0.05) / (darkest + 0.05);
};
