import '@testing-library/jest-dom/vitest';
declare global {
    interface Window {
        axe: any;
    }
}
export declare const runA11yTest: (container: HTMLElement) => Promise<any>;
export declare const checkColorContrast: (foreground: string, background: string) => number;
