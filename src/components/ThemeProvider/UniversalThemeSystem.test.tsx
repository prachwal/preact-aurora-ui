/**
 * Przykłady użycia nowego uniwersalnego systemu theme'ów
 * Pokazuje jak można łatwo zintegrować z różnymi state management'ami
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/preact';

import {
  ThemeProvider,
  memoryStorageAdapter,
  noOpTarget,
  createCustomStorageAdapter,
  initTheme,
  themeHelpers,
} from './index';

describe('Universal Theme System', () => {
  beforeEach(() => {
    // Reset DOM attributes between tests
    if (typeof document !== 'undefined') {
      document.documentElement.removeAttribute('data-theme');
    }
  });

  it('powinien działać z domyślnym localStorage', () => {
    render(
      <ThemeProvider defaultTheme={{ mode: 'light' }}>
        <div>Test content</div>
      </ThemeProvider>,
    );

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('powinien działać z memory storage', () => {
    render(
      <ThemeProvider storageAdapter={memoryStorageAdapter} defaultTheme={{ mode: 'dark' }}>
        <div>Test content</div>
      </ThemeProvider>,
    );

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('powinien działać z custom storage adapter', () => {
    let storedTheme: any = null;

    const customAdapter = createCustomStorageAdapter(
      () => storedTheme,
      (_key, theme) => {
        storedTheme = theme;
      },
    );

    render(
      <ThemeProvider storageAdapter={customAdapter} defaultTheme={{ mode: 'light' }}>
        <div>Test content</div>
      </ThemeProvider>,
    );

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('powinien działać z no-op target dla SSR', () => {
    render(
      <ThemeProvider
        storageAdapter={memoryStorageAdapter}
        domTarget={noOpTarget}
        defaultTheme={{ mode: 'dark' }}
      >
        <div>Test content</div>
      </ThemeProvider>,
    );

    // No DOM changes should happen
    expect(document.documentElement.getAttribute('data-theme')).toBe(null);
  });

  it('initTheme powinien działać synchronicznie', () => {
    const mockStorage = createCustomStorageAdapter(
      () => ({ mode: 'dark' }),
      () => {},
    );

    initTheme({
      storageAdapter: mockStorage,
      defaultTheme: { mode: 'light' },
    });

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('themeHelpers powinien tworzyć Signal adapter', () => {
    const mockSignal = {
      value: { mode: 'light' } as any,
      set: (value: any) => {
        mockSignal.value = value;
      },
    };

    const adapter = themeHelpers.createSignalAdapter(mockSignal);

    expect(adapter.getTheme()).toEqual({ mode: 'light' });

    adapter.setTheme('test', { mode: 'dark' });
    expect(mockSignal.value).toEqual({ mode: 'dark' });
  });

  it('powinien obsługiwać auto mode', () => {
    // Mock matchMedia for auto mode
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: query.includes('dark'),
        addEventListener: () => {},
        removeEventListener: () => {},
      }),
    });

    render(
      <ThemeProvider storageAdapter={memoryStorageAdapter} defaultTheme={{ mode: 'auto' }}>
        <div>Test content</div>
      </ThemeProvider>,
    );

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
