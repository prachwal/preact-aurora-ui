import { Router, Route } from "preact-iso";

import { Dashboard, Analytics, Users, Settings } from "../../pages";

export function AppRouter() {
  return (
    <Router>
      <Route path="/" component={Dashboard} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/users" component={Users} />
      <Route path="/settings" component={Settings} />
      <Route
        default
        component={() => (
          <div
            style={{
              textAlign: "center",
              padding: "var(--space-2xl)",
              color: "var(--color-on-surface-variant)",
            }}
          >
            <h2>404 - Page Not Found</h2>
            <p>The page you're looking for doesn't exist.</p>
          </div>
        )}
      />
    </Router>
  );
}
