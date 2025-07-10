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
beforeEach(() => {
    // Initialize performance tracking
    window.__startTime = performance.now();
    window.__renderCount = 0;
    window.__performanceMetrics = {
        renderTime: 0,
        componentSize: 0,
        reRenderCount: 0,
    };
});
afterEach(() => {
    // Clean up performance tracking
    delete window.__performanceMetrics;
    delete window.__startTime;
    delete window.__renderCount;
});
// Helper do mierzenia performance
export const measureRenderTime = (callback) => {
    const start = performance.now();
    callback();
    const end = performance.now();
    return end - start;
};
// Helper do sprawdzania bundle size impact
export const estimateComponentSize = (element) => {
    const html = element.outerHTML;
    return new Blob([html]).size;
};
// Helper do sprawdzania re-render count
export const trackReRenders = () => {
    if (window.__renderCount !== undefined) {
        window.__renderCount++;
    }
};
// Performance thresholds - adjusted for test environment
export const PERFORMANCE_THRESHOLDS = {
    RENDER_TIME_MS: 32, // Increased for test environment (previously 16ms)
    COMPONENT_SIZE_KB: 10, // 10KB max for component HTML
    MAX_RE_RENDERS: 5, // Max re-renders during test
};
// Helper do asercji performance
export const expectPerformance = (metrics) => {
    const results = {
        renderTimeOk: !metrics.renderTime || metrics.renderTime <= PERFORMANCE_THRESHOLDS.RENDER_TIME_MS,
        componentSizeOk: !metrics.componentSize ||
            metrics.componentSize <= PERFORMANCE_THRESHOLDS.COMPONENT_SIZE_KB * 1024,
        reRenderCountOk: !metrics.reRenderCount || metrics.reRenderCount <= PERFORMANCE_THRESHOLDS.MAX_RE_RENDERS,
    };
    return {
        ...results,
        allOk: results.renderTimeOk && results.componentSizeOk && results.reRenderCountOk,
        metrics,
    };
};
