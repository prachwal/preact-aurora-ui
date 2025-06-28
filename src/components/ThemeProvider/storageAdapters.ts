import type { ThemeConfig, ThemeStorage, ThemeTarget } from './types';

// ============================================================================
// STORAGE ADAPTERS - uniwersalne interfejsy dla różnych backend'ów
// ============================================================================

/**
 * LocalStorage adapter - standardowa implementacja
 */
export const localStorageAdapter: ThemeStorage = {
  getTheme: (key: string): ThemeConfig | null => {
    if (typeof window === 'undefined') return null;

    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error);
      return null;
    }
  },

  setTheme: (key: string, theme: ThemeConfig): void => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(key, JSON.stringify(theme));
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  },
};

/**
 * SessionStorage adapter - dla tymczasowego przechowywania
 */
export const sessionStorageAdapter: ThemeStorage = {
  getTheme: (key: string): ThemeConfig | null => {
    if (typeof window === 'undefined') return null;

    try {
      const stored = sessionStorage.getItem(key);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.warn('Failed to load theme from sessionStorage:', error);
      return null;
    }
  },

  setTheme: (key: string, theme: ThemeConfig): void => {
    if (typeof window === 'undefined') return;

    try {
      sessionStorage.setItem(key, JSON.stringify(theme));
    } catch (error) {
      console.warn('Failed to save theme to sessionStorage:', error);
    }
  },
};

/**
 * Memory adapter - dla testów lub gdy nie chcemy persystencji
 */
const memoryStore = new Map<string, ThemeConfig>();

export const memoryStorageAdapter: ThemeStorage = {
  getTheme: (key: string): ThemeConfig | null => {
    return memoryStore.get(key) || null;
  },

  setTheme: (key: string, theme: ThemeConfig): void => {
    memoryStore.set(key, theme);
  },
};

/**
 * No-op adapter - gdy nie chcemy żadnego storage
 */
export const noStorageAdapter: ThemeStorage = {
  getTheme: (): ThemeConfig | null => null,
  setTheme: (): void => {
    // No operation
  },
};

// ============================================================================
// DOM TARGET ADAPTERS - uniwersalne interfejsy dla różnych środowisk DOM
// ============================================================================

/**
 * Standard DOM adapter - dla normalnych aplikacji webowych
 */
export const documentElementTarget: ThemeTarget = {
  setAttribute: (name: string, value: string): void => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute(name, value);
    }
  },

  getAttribute: (name: string): string | null => {
    if (typeof document !== 'undefined') {
      return document.documentElement.getAttribute(name);
    }
    return null;
  },

  setStyleProperty: (property: string, value: string): void => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty(property, value);
    }
  },
};

/**
 * Custom element target - dla Web Components lub custom root
 */
export const createCustomElementTarget = (element: HTMLElement): ThemeTarget => ({
  setAttribute: (name: string, value: string): void => {
    element.setAttribute(name, value);
  },

  getAttribute: (name: string): string | null => {
    return element.getAttribute(name);
  },

  setStyleProperty: (property: string, value: string): void => {
    element.style.setProperty(property, value);
  },
});

/**
 * No-op target - dla SSR lub testów bez DOM
 */
export const noOpTarget: ThemeTarget = {
  setAttribute: (): void => {
    // No operation
  },

  getAttribute: (): string | null => null,

  setStyleProperty: (): void => {
    // No operation
  },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Funkcja do tworzenia custom storage adapter z zewnętrznym state managementem
 * Przykład użycia z Redux/Zustand/Signal:
 *
 * const reduxStorageAdapter = createCustomStorageAdapter(
 *   (key) => store.getState().theme,
 *   (key, theme) => store.dispatch(setTheme(theme))
 * );
 */
export const createCustomStorageAdapter = (
  getter: (key: string) => ThemeConfig | null,
  setter: (key: string, theme: ThemeConfig) => void,
): ThemeStorage => ({
  getTheme: getter,
  setTheme: setter,
});

/**
 * Funkcja do zapobiegania flickerowi - może być wywołana synchronicznie
 * w main.tsx lub app.tsx przed renderowaniem
 */
export const preventThemeFlicker = (
  storageAdapter: ThemeStorage,
  target: ThemeTarget,
  storageKey: string,
  defaultTheme: ThemeConfig,
): void => {
  try {
    const storedTheme = storageAdapter.getTheme(storageKey);
    const theme = storedTheme || defaultTheme;

    // Apply theme immediately
    if (theme.mode === 'auto') {
      if (typeof window !== 'undefined') {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        target.setAttribute('data-theme', mediaQuery.matches ? 'dark' : 'light');
      }
    } else {
      target.setAttribute('data-theme', theme.mode);
    }
  } catch (error) {
    console.warn('Failed to prevent theme flicker:', error);
    // Fallback to light theme
    target.setAttribute('data-theme', 'light');
  }
};
