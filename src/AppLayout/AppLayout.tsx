import { useState } from 'preact/hooks';

import {
  Header,
  Sidebar,
  Content,
  Footer,
  SidebarToggle,
  AppLayout as EnhancedAppLayout,
} from '../components/index';
import { AppRouter } from '../Router/Router';
import { Navigation } from '../Navigation/Navigation';
import { RouterBreadcrumbs } from '../RouterBreadcrumbs/RouterBreadcrumbs';

export function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleMenuSelect = (key: string) => {
    console.log(`Selected: ${key}`);
  };

  const handleSidebarToggle = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  // Enhanced Header with FAZA 4 features
  const enhancedHeader = (
    <Header
      variant="default"
      elevation={1}
      sticky
      showThemeToggle={true}
      themeTogglePosition="right"
      autoColorManagement={true}
      themeToggleVariant="switch"
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
    />
  );

  // Enhanced Sidebar with FAZA 4 features
  const enhancedSidebar = (
    <Sidebar
      variant="default"
      collapsible
      collapsed={sidebarCollapsed}
      elevation={2}
      position="left"
      width={280}
      autoCollapse={true}
      collapseBreakpoint={768}
      themeAware={true}
      nav={<Navigation onSelect={handleMenuSelect} />}
    />
  );

  // Enhanced Footer
  const enhancedFooter = (
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
  );

  return (
    <EnhancedAppLayout
      theme="auto"
      responsive={true}
      sidebarBreakpoint={768}
      autoThemeManagement={true}
      enableGrid={true}
      sidebarCollapsed={sidebarCollapsed}
      onSidebarToggle={handleSidebarToggle}
      header={enhancedHeader}
      sidebar={enhancedSidebar}
      footer={enhancedFooter}
    >
      <Content variant="dashboard" scrollable>
        {/* Breadcrumbs */}
        <RouterBreadcrumbs />

        {/* Router Content */}
        <AppRouter />
      </Content>
    </EnhancedAppLayout>
  );
}
