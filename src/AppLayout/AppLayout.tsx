import { useState } from 'preact/hooks';

import {
  Layout,
  Header,
  Sidebar,
  Content,
  Footer,
  AppRouter,
  Navigation,
  RouterBreadcrumbs,
  ThemeToggle,
  SidebarToggle,
} from '../components/index';

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

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  const handleMenuSelect = (key: string) => {
    console.log(`Selected: ${key}`);
  };

  return (
    <Layout direction="horizontal" fullHeight>
      {/* Sidebar */}
      <Sidebar
        variant={isMobile ? 'temporary' : 'default'}
        collapsible
        collapsed={sidebarCollapsed}
        elevation={2}
        position="left"
        width={280}
        nav={<Navigation onSelect={handleMenuSelect} />}
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
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-sm)',
                fontWeight: 'bold',
                fontSize: 'var(--font-size-lg)',
              }}
            >
              <SidebarToggle
                collapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                size="md"
                variant="minimal"
                iconType="hamburger"
                style={{ marginRight: 'var(--space-sm)' }}
              />
              <span>🚀</span>
              <span>Aurora UI</span>
            </div>
          }
          actions={
            <div
              style={{
                display: 'flex',
                gap: 'var(--space-sm)',
                alignItems: 'center',
              }}
            >
              <ThemeToggle variant="icon" size="md" />
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
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms of Service', href: '/terms' },
            { label: 'Support', href: '/support' },
          ]}
        />
      </Layout>
    </Layout>
  );
}
