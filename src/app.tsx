import { Router, Route, LocationProvider } from 'preact-iso';
import { AuroraProvider } from './components';
import { DocsLayout } from './AppLayout/DocsLayout';
import { NotFound } from './pages/NotFound';
import { DocsReadmePage, DocsComponentsPage, DocsQuickStartPage } from './pages/DocsPages';

export function App() {
  return (
    <AuroraProvider>
      <LocationProvider>
        <Router>
          {/* Główna strona dokumentacji */}
          <Route path="/" component={DocsLayout} />
          <Route path="/docs" component={DocsLayout} />

          {/* Strony dokumentacji */}
          <Route path="/docs/readme" component={DocsReadmePage} />
          <Route path="/docs/components" component={DocsComponentsPage} />
          <Route path="/docs/quick-start" component={DocsQuickStartPage} />

          {/* 404 dla wszystkich nieznanych ścieżek */}
          <Route default component={NotFound} />
        </Router>
      </LocationProvider>
    </AuroraProvider>
  );
}
