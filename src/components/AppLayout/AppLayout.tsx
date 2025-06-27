import { useState } from "preact/hooks";

import {
  Layout,
  Header,
  Sidebar,
  Content,
  Footer,
  AppRouter,
  Navigation,
  RouterBreadcrumbs,
} from "../index";

export function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize for responsive behavior
  useState(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const handleMenuSelect = (key: string) => {
    console.log(`Selected: ${key}`);
  };

  return (
    <Layout direction="horizontal" fullHeight>
      {/* Sidebar */}
      <Sidebar
        variant={isMobile ? "temporary" : "default"}
        collapsible
        collapsed={sidebarCollapsed}
        elevation={2}
        position="left"
        width={280}
        nav={<Navigation onSelect={handleMenuSelect} />}
        actions={
          <button
            aria-label={
              sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
            }
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            style={{
              background: "var(--color-primary)",
              color: "var(--color-on-primary)",
              border: "none",
              borderRadius: "8px",
              padding: "var(--space-md)",
              cursor: "pointer",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "var(--space-sm)",
            }}
          >
            <span>{sidebarCollapsed ? "☰" : "◀"}</span>
            {!sidebarCollapsed && <span>Menu</span>}
          </button>
        }
      />

      {/* Main Content Area */}
      <Layout direction="vertical" variant="dashboard">
        {/* Header */}
        <Header
          variant="default"
          elevation={1}
          sticky
          logo={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-sm)",
                fontWeight: "bold",
                fontSize: "var(--font-size-lg)",
              }}
            >
              <span>🚀</span>
              <span>Aurora UI</span>
            </div>
          }
          nav={
            <nav style={{ display: "flex", gap: "var(--space-lg)" }}>
              <a
                href="/dashboard"
                style={{
                  color: "var(--color-primary)",
                  textDecoration: "none",
                }}
              >
                Dashboard
              </a>
              <a
                href="/analytics"
                style={{
                  color: "var(--color-on-surface)",
                  textDecoration: "none",
                }}
              >
                Analytics
              </a>
              <a
                href="/users"
                style={{
                  color: "var(--color-on-surface)",
                  textDecoration: "none",
                }}
              >
                Users
              </a>
            </nav>
          }
          actions={
            <div
              style={{
                display: "flex",
                gap: "var(--space-sm)",
                alignItems: "center",
              }}
            >
              <button
                style={{
                  background: "transparent",
                  border: "1px solid var(--color-outline)",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                aria-label="Notifications"
              >
                🔔
              </button>
              <button
                style={{
                  background: "var(--color-primary)",
                  color: "var(--color-on-primary)",
                  border: "none",
                  borderRadius: "8px",
                  padding: "var(--space-sm) var(--space-md)",
                  cursor: "pointer",
                }}
              >
                Profile
              </button>
            </div>
          }
        />

        {/* Scrollable Content */}
        <Content variant="dashboard" scrollable>
          {/* Breadcrumbs */}
          <RouterBreadcrumbs />

          {/* Router Content */}
          <AppRouter />
        </Content>

        {/* Footer */}
        <Footer
          variant="default"
          elevation={1}
          copyright="Aurora UI © 2025"
          links={[
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
            { label: "Support", href: "/support" },
          ]}
        />
      </Layout>
    </Layout>
  );
}
