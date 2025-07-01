/// <reference types="vite/client" />

import { render } from 'preact';
import { AuroraProvider } from 'preact-aurora-ui';

import { App } from './app';

render(
  <AuroraProvider
    config={{
      devMode: import.meta.env.DEV, // Vite way to check dev mode
      disableTransitions: false,
    }}
  >
    <App />
  </AuroraProvider>,
  document.getElementById('app')!,
);
