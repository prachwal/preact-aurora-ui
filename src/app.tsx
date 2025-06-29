import { LocationProvider } from 'preact-iso';

import { ThemeProvider } from './components';
import { AppLayout } from './AppLayout/AppLayout';

export function App() {
  return (
    <ThemeProvider defaultTheme={{ mode: 'auto' }}>
      <LocationProvider>
        <AppLayout />
      </LocationProvider>
    </ThemeProvider>
  );
}
