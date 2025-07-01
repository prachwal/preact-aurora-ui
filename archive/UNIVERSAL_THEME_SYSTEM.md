# Aurora UI - Universal Theme System

Aurora UI implementuje uniwersalny system theme'ów, który może być łatwo zintegrowany z różnymi state management'ami (Redux, Zustand, Signal) oraz różnymi środowiskami DOM.

## Podstawowe użycie

```tsx
import { render } from 'preact';
import { App } from './app';
import { initTheme } from 'aurora-ui';

// Zapobiegnij flickerowi theme'a przed renderowaniem aplikacji
initTheme({
  defaultTheme: { mode: 'auto' },
  storageKey: 'my-app-theme',
});

render(<App />, document.getElementById('app')!);
```

```tsx
// App.tsx
import { ThemeProvider } from 'aurora-ui';

export function App() {
  return (
    <ThemeProvider defaultTheme={{ mode: 'auto' }}>
      <YourApp />
    </ThemeProvider>
  );
}
```

## Integracja z Redux

```tsx
import { initTheme, themeHelpers } from 'aurora-ui';
import { store } from './store';
import { setTheme } from './store/themeSlice';

// Stwórz adapter dla Redux
const reduxStorageAdapter = themeHelpers.createReduxAdapter(store, { setTheme });

// Inicjalizuj theme przed renderowaniem
initTheme({
  storageAdapter: reduxStorageAdapter,
  defaultTheme: { mode: 'auto' },
});

// W komponencie App
<ThemeProvider storageAdapter={reduxStorageAdapter} defaultTheme={{ mode: 'auto' }}>
  <YourApp />
</ThemeProvider>;
```

## Integracja z Zustand

```tsx
import { create } from 'zustand';
import { initTheme, themeHelpers } from 'aurora-ui';

// Store Zustand
const useThemeStore = create((set) => ({
  theme: null,
  setTheme: (theme) => set({ theme }),
}));

// Stwórz adapter
const zustandAdapter = themeHelpers.createZustandAdapter(useThemeStore);

// Inicjalizuj
initTheme({
  storageAdapter: zustandAdapter,
  defaultTheme: { mode: 'auto' },
});

// W komponencie
<ThemeProvider storageAdapter={zustandAdapter} defaultTheme={{ mode: 'auto' }}>
  <YourApp />
</ThemeProvider>;
```

## Integracja z Signal/State

```tsx
import { signal } from '@preact/signals';
import { initTheme, themeHelpers } from 'aurora-ui';

// Signal
const themeSignal = signal(null);

// Adapter
const signalAdapter = themeHelpers.createSignalAdapter({
  value: themeSignal.value,
  set: (value) => (themeSignal.value = value),
});

// Użycie
initTheme({
  storageAdapter: signalAdapter,
  defaultTheme: { mode: 'auto' },
});
```

## Custom Storage Adapter

```tsx
import { createCustomStorageAdapter } from 'aurora-ui';

// Przykład z API
const apiStorageAdapter = createCustomStorageAdapter(
  // Getter - pobierz theme z API/cache
  async (key) => {
    const response = await fetch(`/api/user/theme`);
    return response.ok ? await response.json() : null;
  },
  // Setter - zapisz theme do API
  async (key, theme) => {
    await fetch('/api/user/theme', {
      method: 'POST',
      body: JSON.stringify(theme),
    });
  },
);

<ThemeProvider storageAdapter={apiStorageAdapter} defaultTheme={{ mode: 'auto' }}>
  <YourApp />
</ThemeProvider>;
```

## Custom DOM Target

```tsx
import { createCustomElementTarget } from 'aurora-ui';

// Zastosuj theme do konkretnego elementu zamiast document.documentElement
const customTarget = createCustomElementTarget(document.getElementById('my-custom-root'));

<ThemeProvider domTarget={customTarget} defaultTheme={{ mode: 'auto' }}>
  <YourApp />
</ThemeProvider>;
```

## Web Components / Shadow DOM

```tsx
import { createCustomElementTarget, memoryStorageAdapter } from 'aurora-ui';

class MyWebComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    // Theme tylko w Shadow DOM
    const shadowTarget = createCustomElementTarget(shadow.host);

    // Render Preact app w Shadow DOM
    render(
      <ThemeProvider
        domTarget={shadowTarget}
        storageAdapter={memoryStorageAdapter} // Lub własny adapter
        defaultTheme={{ mode: 'light' }}
      >
        <YourApp />
      </ThemeProvider>,
      shadow,
    );
  }
}
```

## SSR / Node.js

```tsx
import { noStorageAdapter, noOpTarget } from 'aurora-ui';

// W środowisku SSR
<ThemeProvider
  storageAdapter={noStorageAdapter}
  domTarget={noOpTarget}
  defaultTheme={{ mode: 'light' }}
>
  <YourApp />
</ThemeProvider>;
```

## Testowanie

```tsx
import { memoryStorageAdapter, noOpTarget } from 'aurora-ui';

// W testach
<ThemeProvider
  storageAdapter={memoryStorageAdapter}
  domTarget={noOpTarget}
  defaultTheme={{ mode: 'light' }}
>
  <ComponentUnderTest />
</ThemeProvider>;
```

## Migracja z istniejących projektów

### Z localStorage

```tsx
// Istniejący kod - bez zmian
<ThemeProvider defaultTheme={{ mode: 'auto' }}>
  <App />
</ThemeProvider>
```

### Z Redux

```tsx
// Przed
const theme = useSelector((state) => state.theme);

// Po
const reduxAdapter = themeHelpers.createReduxAdapter(store, actions);

<ThemeProvider storageAdapter={reduxAdapter}>
  <App />
</ThemeProvider>;
```

## Dostępne Adaptery

### Storage Adapters

- `localStorageAdapter` - localStorage (domyślny)
- `sessionStorageAdapter` - sessionStorage
- `memoryStorageAdapter` - pamięć (testy)
- `noStorageAdapter` - brak persystencji
- `createCustomStorageAdapter()` - własny adapter

### DOM Targets

- `documentElementTarget` - document.documentElement (domyślny)
- `createCustomElementTarget(element)` - konkretny element
- `noOpTarget` - brak operacji DOM (SSR/testy)

## Backwards Compatibility

Wszystkie istniejące komponenty działają bez zmian. Nowe funkcjonalności są opt-in poprzez dodatkowe propsy.

```tsx
// Stary sposób - nadal działa
<ThemeProvider defaultTheme={{ mode: 'light' }}>
  <App />
</ThemeProvider>

// Nowy sposób - z dodatkowymi funkcjonalnościami
<ThemeProvider
  defaultTheme={{ mode: 'light' }}
  storageAdapter={customAdapter}
  domTarget={customTarget}
>
  <App />
</ThemeProvider>
```
