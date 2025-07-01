import type { Preview } from '@storybook/preact-vite';
import { h } from 'preact';

import { ThemeProvider } from '../src/components/ThemeProvider/ThemeProvider';

import '../src/styles/global.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#121212',
        },
        {
          name: 'surface',
          value: 'var(--md-sys-color-surface)',
        },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '360px', height: '640px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1200px', height: '800px' },
        },
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'auto',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'auto', title: 'Auto', icon: 'cog' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme;

      return h(ThemeProvider, {
        defaultTheme: { mode: theme || 'light' },
        autoGlobalStyles: true,
        generateUtilities: true,
        children: h(
          'div',
          {
            style: {
              padding: '16px',
              minHeight: '100vh',
              backgroundColor: 'var(--md-sys-color-surface)',
              color: 'var(--md-sys-color-on-surface)',
            },
          },
          h(Story, {}),
        ),
      });
    },
  ],
};

export default preview;
