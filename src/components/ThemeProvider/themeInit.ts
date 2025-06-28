/**
 * Utility do zapobiegania flickerowi theme'a - wywołaj w main.tsx przed renderowaniem
 *
 * Przykład użycia:
 *
 * ```tsx
 * import { initTheme } from './components/ThemeProvider/themeInit';
 *
 * // Wywołaj przed renderowaniem aplikacji
 * initTheme();
 *
 * render(<App />, document.getElementById('app')!);
 * ```
 */

import { localStorageAdapter, documentElementTarget, preventThemeFlicker } from './storageAdapters';
import type { ThemeConfig, ThemeStorage, ThemeTarget } from './types';

export interface InitThemeOptions {
  storageKey?: string;
  defaultTheme?: ThemeConfig;
  storageAdapter?: ThemeStorage;
  domTarget?: ThemeTarget;
}

const DEFAULT_OPTIONS: Required<InitThemeOptions> = {
  storageKey: 'aurora-ui-theme',
  defaultTheme: { mode: 'auto' },
  storageAdapter: localStorageAdapter,
  domTarget: documentElementTarget,
};

/**
 * Inicjalizuje theme synchronicznie przed renderowaniem aplikacji
 * Zapobiega flickerowi poprzez natychmiastowe zastosowanie zapisanego theme'a
 */
export function initTheme(options: InitThemeOptions = {}): void {
  const config = { ...DEFAULT_OPTIONS, ...options };

  preventThemeFlicker(
    config.storageAdapter,
    config.domTarget,
    config.storageKey,
    config.defaultTheme,
  );
}

/**
 * Wrapper dla custom storage adapters - przykłady użycia
 */
export const themeHelpers = {
  /**
   * Przykład dla Redux
   */
  createReduxAdapter: (store: any, actions: any) => ({
    getTheme: () => store.getState().theme || null,
    setTheme: (_key: string, theme: ThemeConfig) => store.dispatch(actions.setTheme(theme)),
  }),

  /**
   * Przykład dla Zustand
   */
  createZustandAdapter: (useStore: any) => ({
    getTheme: () => useStore.getState().theme || null,
    setTheme: (_key: string, theme: ThemeConfig) => useStore.getState().setTheme(theme),
  }),

  /**
   * Przykład dla prostego Signal/State
   */
  createSignalAdapter: (signal: {
    value: ThemeConfig | null;
    set: (value: ThemeConfig) => void;
  }) => ({
    getTheme: () => signal.value,
    setTheme: (_key: string, theme: ThemeConfig) => signal.set(theme),
  }),
};
