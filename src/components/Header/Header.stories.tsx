import type { Meta, StoryObj } from '@storybook/preact';

import { Header } from './Header';

const meta: Meta = {
  title: 'Layout/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'compact', 'prominent', 'minimal'],
    },
    elevation: {
      control: { type: 'range', min: 0, max: 4, step: 1 },
    },
    scrollBehavior: {
      control: { type: 'select' },
      options: ['fixed', 'scroll', 'hide', 'elevate'],
    },
    sticky: {
      control: { type: 'boolean' },
    },
    borderless: {
      control: { type: 'boolean' },
    },
    centerTitle: {
      control: { type: 'boolean' },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Header>;

const sampleLogo = <span style={{ fontWeight: 'bold', color: '#1976d2' }}>Aurora UI</span>;
const sampleNav = (
  <ul style={{ display: 'flex', gap: '16px', listStyle: 'none', margin: 0, padding: 0 }}>
    <li>
      <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
        Dashboard
      </a>
    </li>
    <li>
      <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
        Analytics
      </a>
    </li>
    <li>
      <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
        Settings
      </a>
    </li>
  </ul>
);
const sampleActions = (
  <div style={{ display: 'flex', gap: '8px' }}>
    <button style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #ccc' }}>
      Profile
    </button>
    <button
      style={{
        padding: '8px 16px',
        borderRadius: '4px',
        background: '#1976d2',
        color: 'white',
        border: 'none',
      }}
    >
      Logout
    </button>
  </div>
);

export const Default: Story = {
  args: {
    logo: sampleLogo,
    nav: sampleNav,
    actions: sampleActions,
  },
};

export const WithNavigationIcon: Story = {
  args: {
    logo: sampleLogo,
    nav: sampleNav,
    actions: sampleActions,
    navigationIcon: '☰',
    onNavigationClick: () => alert('Navigation clicked!'),
  },
};

export const CenterTitle: Story = {
  args: {
    logo: <button style={{ background: 'none', border: 'none', fontSize: '18px' }}>‹</button>,
    nav: <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '500' }}>Page Title</h1>,
    actions: <button style={{ background: 'none', border: 'none', fontSize: '18px' }}>⋮</button>,
    centerTitle: true,
    variant: 'compact',
  },
};

export const WithActionsOverflow: Story = {
  args: {
    logo: sampleLogo,
    nav: sampleNav,
    actions: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <button style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
          🔔
        </button>
        <button style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
          👤
        </button>
      </div>
    ),
    moreActions: [
      { key: 'settings', label: 'Settings', icon: '⚙️' },
      { key: 'help', label: 'Help & Support', icon: '❓' },
      { key: 'feedback', label: 'Send Feedback', icon: '💬' },
      { key: 'about', label: 'About', icon: 'ℹ️' },
      { key: 'logout', label: 'Sign Out', icon: '🚪' },
    ],
    moreActionsIcon: '⋮',
  },
};

export const ScrollBehaviorElevate: Story = {
  args: {
    logo: sampleLogo,
    nav: sampleNav,
    actions: sampleActions,
    scrollBehavior: 'elevate',
    sticky: true,
  },
  render: (args) => (
    <div style={{ height: '200vh' }}>
      <Header {...args} />
      <div style={{ padding: '20px' }}>
        <h2>Scroll down to see elevation effect</h2>
        <p>The header will gain elevation (shadow) when you scroll past the threshold.</p>
        {Array.from({ length: 50 }, (_, i) => (
          <p key={i}>Scroll content line {i + 1}</p>
        ))}
      </div>
    </div>
  ),
};

export const ScrollBehaviorHide: Story = {
  args: {
    logo: sampleLogo,
    nav: sampleNav,
    actions: sampleActions,
    scrollBehavior: 'hide',
    sticky: true,
  },
  render: (args) => (
    <div style={{ height: '200vh' }}>
      <Header {...args} />
      <div style={{ padding: '20px' }}>
        <h2>Scroll down to see hide effect</h2>
        <p>The header will hide when scrolling down and show when scrolling up.</p>
        {Array.from({ length: 50 }, (_, i) => (
          <p key={i}>Scroll content line {i + 1}</p>
        ))}
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3>Default</h3>
        <Header logo={sampleLogo} nav={sampleNav} actions={sampleActions} variant="default" />
      </div>
      <div>
        <h3>Compact</h3>
        <Header logo={sampleLogo} nav={sampleNav} actions={sampleActions} variant="compact" />
      </div>
      <div>
        <h3>Prominent</h3>
        <Header logo={sampleLogo} nav={sampleNav} actions={sampleActions} variant="prominent" />
      </div>
      <div>
        <h3>Minimal</h3>
        <Header logo={sampleLogo} nav={sampleNav} actions={sampleActions} variant="minimal" />
      </div>
    </div>
  ),
};

export const ResponsiveDemo: Story = {
  args: {
    logo: sampleLogo,
    nav: sampleNav,
    actions: sampleActions,
    navigationIcon: '☰',
    centerTitle: false,
    moreActions: [
      { key: 'settings', label: 'Settings' },
      { key: 'help', label: 'Help' },
    ],
  },
  render: (args) => (
    <div>
      <Header {...args} />
      <div style={{ padding: '20px' }}>
        <h2>Responsive Header Demo</h2>
        <p>Resize the viewport to see responsive behavior.</p>
        <p>Navigation icon appears on mobile, actions may overflow to menu.</p>
      </div>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    logo: sampleLogo,
    nav: sampleNav,
    actions: sampleActions,
    variant: 'default',
    elevation: 1,
    sticky: false,
    borderless: false,
    scrollBehavior: 'fixed',
    centerTitle: false,
    navigationIcon: undefined,
    moreActions: [],
  },
};
