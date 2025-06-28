/**
 * DEMO: Przykłady różnych konfiguracji Theme System'u
 * Odkomentuj wybrane konfiguracje aby je przetestować
 */

import { render } from 'preact';

import { App } from './app';
import { initTheme } from './components/ThemeProvider/themeInit';
// import { createCustomStorageAdapter, memoryStorageAdapter } from './components/ThemeProvider';
import './styles/global.scss';
import './components/ThemeProvider/theme.scss';

// ============================================================================
// KONFIGURACJA 1: Standardowa (localStorage + document.documentElement)
// ============================================================================
initTheme({
  defaultTheme: { mode: 'auto' },
  storageKey: 'aurora-ui-theme',
});

// ============================================================================
// KONFIGURACJA 2: Memory Storage (dla testów/development)
// ============================================================================
// initTheme({
//   storageAdapter: memoryStorageAdapter,
//   defaultTheme: { mode: 'auto' },
// });

// ============================================================================
// KONFIGURACJA 3: Custom API Storage
// ============================================================================
// const apiStorageAdapter = createCustomStorageAdapter(
//   // Getter - pobierz z API
//   async (key) => {
//     try {
//       const response = await fetch('/api/user/theme');
//       return response.ok ? await response.json() : null;
//     } catch {
//       return null;
//     }
//   },
//   // Setter - zapisz do API
//   async (key, theme) => {
//     try {
//       await fetch('/api/user/theme', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(theme),
//       });
//     } catch (error) {
//       console.warn('Failed to save theme to API:', error);
//     }
//   }
// );

// initTheme({
//   storageAdapter: apiStorageAdapter,
//   defaultTheme: { mode: 'auto' },
// });

// ============================================================================
// KONFIGURACJA 4: Redux Integration (przykład)
// ============================================================================
// import { store } from './store';
// import { setTheme } from './store/themeSlice';
// import { themeHelpers } from './components/ThemeProvider';

// const reduxAdapter = themeHelpers.createReduxAdapter(store, { setTheme });

// initTheme({
//   storageAdapter: reduxAdapter,
//   defaultTheme: { mode: 'auto' },
// });

render(<App />, document.getElementById('app')!);
