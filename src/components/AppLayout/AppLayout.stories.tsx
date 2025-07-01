import type { Meta, StoryObj } from '@storybook/preact';

import { Header } from '../Header/Header';

import { AppLayout } from './AppLayout';

const meta: Meta<typeof AppLayout> = {
  title: 'FAZA 4/AppLayout',
  component: AppLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
AppLayout - Inteligentny wrapper aplikacji z automatycznym zarządzaniem motywami i responsywnym layoutem.

## Funkcjonalności FAZY 4:
- 🎨 Automatyczne zarządzanie motywami
- 📱 Responsywny layout z auto-collapse sidebar
- 🔄 Integracja z ThemeProvider
- 📐 Grid layout system
- 🎯 Theme-aware styling

## Kluczowe ulepszenia:
- Automatyczne dopasowanie do mobile (breakpoint)
- Integracja z Container dla surface management
- Optimized layout performance
- Enhanced accessibility features
        `,
      },
    },
  },
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark', 'auto'],
      description: 'Domyślny motyw aplikacji',
    },
    responsive: {
      control: 'boolean',
      description: 'Czy włączyć responsywne zachowanie',
    },
    sidebarBreakpoint: {
      control: { type: 'number', min: 320, max: 1200, step: 1 },
      description: 'Breakpoint dla auto-collapse sidebar (px)',
    },
    autoThemeManagement: {
      control: 'boolean',
      description: 'Automatyczne zarządzanie stylami globalnymi',
    },
    enableGrid: {
      control: 'boolean',
      description: 'Użyj CSS Grid zamiast Flexbox',
    },
    maxWidth: {
      control: 'text',
      description: 'Maksymalna szerokość aplikacji',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AppLayout>;

// Sample components for stories
const SampleHeader = () => (
  <Header
    logo={<span style={{ fontWeight: 'bold' }}>🚀 Aurora UI</span>}
    showThemeToggle={true}
    themeTogglePosition="right"
    autoColorManagement={true}
    actions={
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <span>User</span>
        <span>🔔</span>
      </div>
    }
  />
);

const SampleSidebar = () => (
  <nav style={{ padding: '1rem' }}>
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      <li
        style={{
          padding: '0.5rem',
          background: 'var(--md-sys-color-primary-container)',
          borderRadius: '8px',
          marginBottom: '0.5rem',
        }}
      >
        🏠 Dashboard
      </li>
      <li style={{ padding: '0.5rem', borderRadius: '8px', marginBottom: '0.5rem' }}>
        📊 Analytics
      </li>
      <li style={{ padding: '0.5rem', borderRadius: '8px', marginBottom: '0.5rem' }}>👥 Users</li>
      <li style={{ padding: '0.5rem', borderRadius: '8px', marginBottom: '0.5rem' }}>
        ⚙️ Settings
      </li>
    </ul>
  </nav>
);

const SampleContent = () => (
  <div style={{ padding: '2rem', height: '100%', overflow: 'auto' }}>
    <h1>Welcome to Aurora UI</h1>
    <p>This is a demo of the enhanced AppLayout component from FAZA 4.</p>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem',
        marginTop: '2rem',
      }}
    >
      <div
        style={{
          padding: '1rem',
          background: 'var(--md-sys-color-surface-variant)',
          borderRadius: '12px',
        }}
      >
        <h3>📱 Responsive Design</h3>
        <p>Layout automatycznie dostosowuje się do rozmiaru ekranu.</p>
      </div>
      <div
        style={{
          padding: '1rem',
          background: 'var(--md-sys-color-surface-variant)',
          borderRadius: '12px',
        }}
      >
        <h3>🎨 Theme Integration</h3>
        <p>Automatic color management i theme-aware styling.</p>
      </div>
      <div
        style={{
          padding: '1rem',
          background: 'var(--md-sys-color-surface-variant)',
          borderRadius: '12px',
        }}
      >
        <h3>⚡ Performance</h3>
        <p>Optimized layout z minimal re-renders.</p>
      </div>
    </div>

    {/* Sample content to test scrolling */}
    <div style={{ marginTop: '3rem' }}>
      <h2>Scroll Test Content</h2>
      {Array.from({ length: 20 }, (_, i) => (
        <p key={i} style={{ marginBottom: '1rem' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      ))}
    </div>
  </div>
);

const SampleFooter = () => (
  <div style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem', opacity: 0.8 }}>
    © 2025 Aurora UI - Made with ❤️ using Preact & Material Design 3
  </div>
);

export const Default: Story = {
  args: {
    theme: 'auto',
    responsive: true,
    sidebarBreakpoint: 768,
    autoThemeManagement: true,
    enableGrid: false,
  },
  render: (args) => (
    <AppLayout {...args}>
      <SampleContent />
    </AppLayout>
  ),
};

export const WithFullLayout: Story = {
  args: {
    theme: 'auto',
    responsive: true,
    autoThemeManagement: true,
    enableGrid: false,
  },
  render: (args) => (
    <AppLayout
      {...args}
      header={<SampleHeader />}
      sidebar={<SampleSidebar />}
      footer={<SampleFooter />}
    >
      <SampleContent />
    </AppLayout>
  ),
};

export const GridLayout: Story = {
  args: {
    theme: 'light',
    responsive: true,
    autoThemeManagement: true,
    enableGrid: true,
  },
  render: (args) => (
    <AppLayout
      {...args}
      header={<SampleHeader />}
      sidebar={<SampleSidebar />}
      footer={<SampleFooter />}
    >
      <SampleContent />
    </AppLayout>
  ),
};

export const DarkTheme: Story = {
  args: {
    theme: 'dark',
    responsive: true,
    autoThemeManagement: true,
    enableGrid: false,
  },
  render: (args) => (
    <AppLayout
      {...args}
      header={<SampleHeader />}
      sidebar={<SampleSidebar />}
      footer={<SampleFooter />}
    >
      <SampleContent />
    </AppLayout>
  ),
};

export const MobileBreakpoint: Story = {
  args: {
    theme: 'auto',
    responsive: true,
    sidebarBreakpoint: 1024, // Higher breakpoint for demo
    autoThemeManagement: true,
    enableGrid: false,
  },
  render: (args) => (
    <AppLayout
      {...args}
      header={<SampleHeader />}
      sidebar={<SampleSidebar />}
      footer={<SampleFooter />}
    >
      <SampleContent />
    </AppLayout>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demo z wyższym breakpointem (1024px) - sidebar zwijany na większych ekranach.',
      },
    },
  },
};

export const WithMaxWidth: Story = {
  args: {
    theme: 'auto',
    responsive: true,
    autoThemeManagement: true,
    enableGrid: false,
    maxWidth: '1200px',
  },
  render: (args) => (
    <AppLayout
      {...args}
      header={<SampleHeader />}
      sidebar={<SampleSidebar />}
      footer={<SampleFooter />}
    >
      <SampleContent />
    </AppLayout>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Layout z ograniczoną maksymalną szerokością.',
      },
    },
  },
};

export const NonResponsive: Story = {
  args: {
    theme: 'auto',
    responsive: false,
    autoThemeManagement: true,
    enableGrid: false,
  },
  render: (args) => (
    <AppLayout
      {...args}
      header={<SampleHeader />}
      sidebar={<SampleSidebar />}
      footer={<SampleFooter />}
    >
      <SampleContent />
    </AppLayout>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Layout bez responsywnego zachowania - sidebar zawsze widoczny.',
      },
    },
  },
};
