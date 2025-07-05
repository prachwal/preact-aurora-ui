import { render } from 'preact';

import { App } from './app';
import { initTheme } from './components/ThemeProvider/themeInit';
import './components/styles/global.scss';
import './components/ThemeProvider/theme.scss';

// Zapobiegnij flickerowi theme'a przed renderowaniem aplikacji
initTheme({
  defaultTheme: { mode: 'auto' },
  storageKey: 'aurora-ui-theme',
});

render(<App />, document.getElementById('app')!);
