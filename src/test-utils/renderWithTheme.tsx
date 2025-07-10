// Test helper dla komponenty wymagających ThemeProvider
import { render } from '@testing-library/preact';
import type { RenderResult } from '@testing-library/preact';
import type { ComponentChildren } from 'preact';

import { ThemeProvider } from '../components';

export const renderWithTheme = (
  ui: ComponentChildren,
  options?: {
    mode?: 'light' | 'dark' | 'auto';
    autoGlobalStyles?: boolean;
  },
): RenderResult => {
  const Wrapper = ({ children }: { children: ComponentChildren }) => (
    <ThemeProvider
      defaultTheme={{ mode: options?.mode || 'light' }}
      autoGlobalStyles={options?.autoGlobalStyles || true}
    >
      {children}
    </ThemeProvider>
  );

  return render(ui, { wrapper: Wrapper });
};
