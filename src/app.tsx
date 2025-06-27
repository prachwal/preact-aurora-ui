import { LocationProvider } from 'preact-iso';

import { AppLayout, ThemeProvider } from './components';

export function App() {
  return (
    <ThemeProvider defaultTheme={{ mode: 'light' }}>
      <LocationProvider>
        <AppLayout />
      </LocationProvider>
    </ThemeProvider>
  );
}
