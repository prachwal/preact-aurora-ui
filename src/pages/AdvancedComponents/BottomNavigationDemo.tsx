import { useState } from 'preact/hooks';

import { BottomNavigation, BottomNavigationTab } from '../../components/BottomNavigation';

export function BottomNavigationDemo() {
  const [activeTab, setActiveTab] = useState('home');
  const [compactMode, setCompactMode] = useState(false);
  const [hideOnScroll, setHideOnScroll] = useState(false);

  const basicTabs: BottomNavigationTab[] = [
    {
      id: 'home',
      label: 'Home',
      icon: '🏠',
    },
    {
      id: 'search',
      label: 'Search',
      icon: '🔍',
    },
    {
      id: 'favorites',
      label: 'Favorites',
      icon: '❤️',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: '👤',
    },
  ];

  const tabsWithBadges: BottomNavigationTab[] = [
    {
      id: 'inbox',
      label: 'Inbox',
      icon: '📧',
      badge: 5,
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: '🔔',
      badge: 12,
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: '💬',
      badge: 'new',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
    },
  ];

  return (
    <ComponentDemo
      title="Bottom Navigation"
      subtitle="Material Design 3 bottom navigation component"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Basic Example */}
        <section>
          <h3>Basic Bottom Navigation</h3>
          <p>Standard bottom navigation with icons and labels.</p>

          <div
            style={{
              position: 'relative',
              height: '300px',
              background: 'var(--md-sys-color-surface-variant)',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '2rem',
                textAlign: 'center',
                paddingBottom: '6rem',
              }}
            >
              <h4>App Content Area</h4>
              <p>
                Current tab: <strong>{activeTab}</strong>
              </p>
            </div>

            <BottomNavigation
              tabs={basicTabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              compact={compactMode}
              hideOnScroll={hideOnScroll}
            />
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={compactMode}
                onChange={(e) => setCompactMode((e.target as HTMLInputElement).checked)}
              />
              Compact mode
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={hideOnScroll}
                onChange={(e) => setHideOnScroll((e.target as HTMLInputElement).checked)}
              />
              Hide on scroll
            </label>
          </div>
        </section>

        {/* With Badges */}
        <section>
          <h3>Bottom Navigation with Badges</h3>
          <p>Navigation tabs can display badges for notifications or counts.</p>

          <div
            style={{
              position: 'relative',
              height: '300px',
              background: 'var(--md-sys-color-surface-variant)',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '2rem',
                textAlign: 'center',
                paddingBottom: '6rem',
              }}
            >
              <h4>Mail App</h4>
              <p>
                Check your{' '}
                {activeTab === 'inbox'
                  ? 'inbox'
                  : activeTab === 'notifications'
                    ? 'notifications'
                    : activeTab === 'messages'
                      ? 'messages'
                      : 'settings'}
              </p>
            </div>

            <BottomNavigation
              tabs={tabsWithBadges}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
        </section>

        {/* Three Tab Layout */}
        <section>
          <h3>Three Tab Layout</h3>
          <p>Simplified navigation with only three tabs.</p>

          <div
            style={{
              position: 'relative',
              height: '300px',
              background: 'var(--md-sys-color-surface-variant)',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '2rem',
                textAlign: 'center',
                paddingBottom: '6rem',
              }}
            >
              <h4>Simple App</h4>
              <p>
                Current section: <strong>{activeTab}</strong>
              </p>
            </div>

            <BottomNavigation
              tabs={[
                { id: 'feed', label: 'Feed', icon: '📰' },
                { id: 'explore', label: 'Explore', icon: '🌎' },
                { id: 'account', label: 'Account', icon: '👤' },
              ]}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
        </section>

        {/* Features */}
        <section>
          <h3>Key Features</h3>
          <ul
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem',
              listStyle: 'none',
              padding: 0,
            }}
          >
            <li
              style={{
                padding: '1rem',
                background: 'var(--md-sys-color-surface-container)',
                borderRadius: '8px',
              }}
            >
              <strong>✨ Material Design 3</strong>
              <br />
              Full MD3 theming and color system support
            </li>
            <li
              style={{
                padding: '1rem',
                background: 'var(--md-sys-color-surface-container)',
                borderRadius: '8px',
              }}
            >
              <strong>🎯 Badge Support</strong>
              <br />
              Display notification counts or indicators
            </li>
            <li
              style={{
                padding: '1rem',
                background: 'var(--md-sys-color-surface-container)',
                borderRadius: '8px',
              }}
            >
              <strong>⌨️ Keyboard Navigation</strong>
              <br />
              Full keyboard and screen reader support
            </li>
            <li
              style={{
                padding: '1rem',
                background: 'var(--md-sys-color-surface-container)',
                borderRadius: '8px',
              }}
            >
              <strong>📱 Responsive</strong>
              <br />
              Adapts to different screen sizes
            </li>
            <li
              style={{
                padding: '1rem',
                background: 'var(--md-sys-color-surface-container)',
                borderRadius: '8px',
              }}
            >
              <strong>🎨 Customizable</strong>
              <br />
              Compact mode and auto-hide options
            </li>
            <li
              style={{
                padding: '1rem',
                background: 'var(--md-sys-color-surface-container)',
                borderRadius: '8px',
              }}
            >
              <strong>🏃 Smooth Animations</strong>
              <br />
              Fluid transitions and state changes
            </li>
          </ul>
        </section>
      </div>
    </ComponentDemo>
  );
}
