export { ThemeProvider, useTheme } from './ThemeProvider';
export { ThemeToggle } from './ThemeToggle';
export type {
  ThemeMode,
  ThemeColors,
  ThemeConfig,
  ThemeContextValue,
  ThemeStorage,
  ThemeTarget,
} from './types';
export type { ThemeToggleProps } from './ThemeToggle';

// Universal storage and DOM adapters
export {
  localStorageAdapter,
  sessionStorageAdapter,
  memoryStorageAdapter,
  noStorageAdapter,
  documentElementTarget,
  createCustomElementTarget,
  noOpTarget,
  createCustomStorageAdapter,
  preventThemeFlicker,
} from './storageAdapters';

// Theme initialization utilities
export { initTheme, themeHelpers } from './themeInit';
export type { InitThemeOptions } from './themeInit';
