import '@testing-library/jest-dom/vitest';
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
export declare const measureRenderTime: (callback: () => void) => number;
export declare const estimateComponentSize: (element: HTMLElement) => number;
export declare const trackReRenders: () => void;
export declare const PERFORMANCE_THRESHOLDS: {
    RENDER_TIME_MS: number;
    COMPONENT_SIZE_KB: number;
    MAX_RE_RENDERS: number;
};
export declare const expectPerformance: (metrics: Partial<PerformanceMetrics>) => {
    allOk: boolean;
    metrics: Partial<PerformanceMetrics>;
    renderTimeOk: boolean;
    componentSizeOk: boolean;
    reRenderCountOk: boolean;
};
export {};
//# sourceMappingURL=test-setup-performance.d.ts.map