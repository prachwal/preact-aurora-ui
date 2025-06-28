import { LocationProvider } from 'preact-iso';

import { AppLayout, ThemeProvider } from './components';

export function App() {
  return (
    <ThemeProvider defaultTheme={{ mode: 'auto' }}>
      <LocationProvider>
        <AppLayout />
      </LocationProvider>
    </ThemeProvider>
  );
}
