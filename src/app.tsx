import { LocationProvider } from 'preact-iso';

import { AuroraProvider } from './components';
import { AppLayout } from './AppLayout/AppLayout';

export function App() {
  return (
    <AuroraProvider>
      <LocationProvider>
        <AppLayout />
      </LocationProvider>
    </AuroraProvider>
  );
}
