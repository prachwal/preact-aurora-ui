import { LocationProvider } from "preact-iso";

import { AppLayout } from "./components";

export function App() {
  return (
    <LocationProvider>
      <AppLayout />
    </LocationProvider>
  );
}
