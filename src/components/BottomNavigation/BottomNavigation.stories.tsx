import type { Meta, StoryObj } from '@storybook/preact';
import { useState } from 'preact/hooks';

import { BottomNavigation } from './BottomNavigation';
import { BottomNavigationTab } from './BottomNavigationTab';

/**
 * BottomNavigation provides quick navigation between top-level views of an app.
 * It follows Material Design 3 specifications with support for badges, labels, and accessibility.
 *
 * ## Features
 *
 * - **Tab Management**: Active tab state and change callbacks
 * - **Labels**: Show/hide labels with compact mode
 * - **Badges**: Notification badges with counts
 * - **Auto-hide**: Hide on scroll functionality
 * - **Accessibility**: Full keyboard navigation and screen reader support
 * - **Responsive**: Touch-friendly targets and mobile-optimized
 */
const meta: Meta<typeof BottomNavigation> = {
  title: 'Navigation/BottomNavigation',
  component: BottomNavigation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Material Design 3 Bottom Navigation component for primary navigation between top-level views.',
      },
    },
  },
  argTypes: {
    activeTab: {
      control: { type: 'number', min: 0, max: 3, step: 1 },
      description: 'Currently active tab index',
    },
    showLabels: {
      control: 'boolean',
      description: 'Whether to show tab labels',
    },
    autoHide: {
      control: 'boolean',
      description: 'Auto-hide on scroll',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BottomNavigation>;

// Interactive wrapper component for stories
const InteractiveBottomNavigation = ({
  showLabels = true,
  autoHide = false,
  withBadges = false,
  ...args
}: any) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--md-sys-color-surface)',
      }}
    >
      {/* Content Area */}
      <div
        style={{
          flex: 1,
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
        }}
      >
        <h2 style={{ color: 'var(--md-sys-color-on-surface)' }}>Content Area</h2>
        <p style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
          Current tab: <strong>{activeTab}</strong>
        </p>
        <p style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
          {activeTab === 0 && 'Home content - Latest updates and news'}
          {activeTab === 1 && 'Search content - Find what you need'}
          {activeTab === 2 && 'Favorites content - Your saved items'}
          {activeTab === 3 && 'Profile content - Account settings'}
        </p>
        {autoHide && (
          <div
            style={{
              padding: '1rem',
              backgroundColor: 'var(--md-sys-color-surface-container)',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <p style={{ margin: 0, color: 'var(--md-sys-color-on-surface)' }}>
              Scroll down to see auto-hide in action!
            </p>
            <div style={{ height: '200vh', padding: '2rem 0' }}>
              <p style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>Keep scrolling...</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        showLabels={showLabels}
        autoHide={autoHide}
        {...args}
      >
        <BottomNavigationTab
          index={0}
          label="Home"
          icon="🏠"
          badge={withBadges ? undefined : undefined}
        />
        <BottomNavigationTab
          index={1}
          label="Search"
          icon="🔍"
          badge={withBadges ? undefined : undefined}
        />
        <BottomNavigationTab
          index={2}
          label="Favorites"
          icon="❤️"
          badge={withBadges ? 5 : undefined}
        />
        <BottomNavigationTab
          index={3}
          label="Profile"
          icon="👤"
          badge={withBadges ? undefined : undefined}
        />
      </BottomNavigation>
    </div>
  );
};

// Default story
export const Default: Story = {
  render: (args) => <InteractiveBottomNavigation {...args} />,
  args: {
    showLabels: true,
    autoHide: false,
  },
};

// With labels
export const WithLabels: Story = {
  render: (args) => <InteractiveBottomNavigation {...args} />,
  args: {
    showLabels: true,
    autoHide: false,
  },
};

// Compact (no labels)
export const Compact: Story = {
  render: (args) => <InteractiveBottomNavigation {...args} />,
  args: {
    showLabels: false,
    autoHide: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact mode hides labels but maintains accessibility through aria-label.',
      },
    },
  },
};

// With badges
export const WithBadges: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--md-sys-color-surface)',
        }}
      >
        <div
          style={{
            flex: 1,
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h2 style={{ color: 'var(--md-sys-color-on-surface)' }}>Navigation with Badges</h2>
          <p style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
            Current tab: <strong>{activeTab}</strong>
          </p>
        </div>

        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} showLabels={true}>
          <BottomNavigationTab index={0} label="Home" icon="🏠" />
          <BottomNavigationTab index={1} label="Messages" icon="💬" badge={3} />
          <BottomNavigationTab index={2} label="Notifications" icon="🔔" badge={12} />
          <BottomNavigationTab index={3} label="Profile" icon="👤" />
        </BottomNavigation>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Bottom navigation with notification badges showing unread counts.',
      },
    },
  },
};

// Auto-hide on scroll
export const AutoHide: Story = {
  render: (args) => <InteractiveBottomNavigation {...args} />,
  args: {
    showLabels: true,
    autoHide: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Navigation automatically hides when scrolling down and shows when scrolling up.',
      },
    },
  },
};

// Custom icons example
export const CustomIcons: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState(0);

    // Custom SVG icons
    const HomeIcon = () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    );

    const SearchIcon = () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
      </svg>
    );

    const FavoriteIcon = () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    );

    const ProfileIcon = () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    );

    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--md-sys-color-surface)',
        }}
      >
        <div
          style={{
            flex: 1,
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h2 style={{ color: 'var(--md-sys-color-on-surface)' }}>Custom SVG Icons</h2>
          <p style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
            Using custom SVG icons instead of emoji
          </p>
        </div>

        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} showLabels={true}>
          <BottomNavigationTab index={0} label="Home" icon={<HomeIcon />} />
          <BottomNavigationTab index={1} label="Search" icon={<SearchIcon />} />
          <BottomNavigationTab index={2} label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationTab index={3} label="Profile" icon={<ProfileIcon />} />
        </BottomNavigation>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Bottom navigation with custom SVG icons for better visual consistency.',
      },
    },
  },
};

// Accessibility demo
export const AccessibilityDemo: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--md-sys-color-surface)',
        }}
      >
        <div
          style={{
            flex: 1,
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <h2 style={{ color: 'var(--md-sys-color-on-surface)' }}>Accessibility Features</h2>
          <div
            style={{
              padding: '1rem',
              backgroundColor: 'var(--md-sys-color-surface-container)',
              borderRadius: '8px',
              maxWidth: '600px',
            }}
          >
            <h3 style={{ color: 'var(--md-sys-color-on-surface)', marginTop: 0 }}>
              Try these interactions:
            </h3>
            <ul style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
              <li>
                <kbd>Tab</kbd> - Navigate between tabs
              </li>
              <li>
                <kbd>Arrow Keys</kbd> - Move between tabs when focused
              </li>
              <li>
                <kbd>Enter</kbd> or <kbd>Space</kbd> - Activate focused tab
              </li>
              <li>Screen readers announce tab labels and states</li>
              <li>Badge counts are announced for assistive technology</li>
            </ul>
          </div>
        </div>

        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} showLabels={true}>
          <BottomNavigationTab index={0} label="Dashboard" icon="📊" />
          <BottomNavigationTab index={1} label="Analytics" icon="📈" />
          <BottomNavigationTab index={2} label="Reports" icon="📋" badge={2} />
          <BottomNavigationTab index={3} label="Settings" icon="⚙️" />
        </BottomNavigation>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates keyboard navigation and screen reader accessibility features.',
      },
    },
  },
};
