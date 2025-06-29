import { useState } from 'preact/hooks';

import { BottomNavigation, BottomNavigationTab } from '../../components/BottomNavigation';

export function BottomNavigationDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const [showLabels, setShowLabels] = useState(true);
  const [autoHide, setAutoHide] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2>Bottom Navigation</h2>
        <p>Bottom navigation provides quick navigation between top-level views of an app.</p>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            checked={showLabels}
            onChange={(e) => setShowLabels(e.currentTarget.checked)}
          />
          Show Labels
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            checked={autoHide}
            onChange={(e) => setAutoHide(e.currentTarget.checked)}
          />
          Auto Hide on Scroll
        </label>
      </div>

      {/* Basic Bottom Navigation */}
      <div>
        <h3>Basic Navigation</h3>
        <div
          style={{
            position: 'relative',
            height: '400px',
            border: '1px solid var(--md-sys-color-outline)',
            borderRadius: '8px',
            backgroundColor: 'var(--md-sys-color-surface)',
            display: 'flex',
            flexDirection: 'column',
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
            <h4>App Content Area</h4>
            <p>
              Current tab: <strong>{activeTab}</strong>
            </p>
            <p>
              {activeTab === 0 && 'Home content'}
              {activeTab === 1 && 'Search content'}
              {activeTab === 2 && 'Favorites content'}
              {activeTab === 3 && 'Profile content'}
            </p>
          </div>

          <BottomNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
            showLabels={showLabels}
            autoHide={autoHide}
          >
            <BottomNavigationTab index={0} label="Home" icon="🏠" />
            <BottomNavigationTab index={1} label="Search" icon="🔍" />
            <BottomNavigationTab index={2} label="Favorites" icon="❤️" />
            <BottomNavigationTab index={3} label="Profile" icon="👤" />
          </BottomNavigation>
        </div>
      </div>

      {/* Navigation with Badges */}
      <div>
        <h3>Navigation with Badges</h3>
        <div
          style={{
            position: 'relative',
            height: '400px',
            border: '1px solid var(--md-sys-color-outline)',
            borderRadius: '8px',
            backgroundColor: 'var(--md-sys-color-surface)',
            display: 'flex',
            flexDirection: 'column',
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
            <h4>App with Notifications</h4>
            <p>
              Current tab: <strong>{activeTab}</strong>
            </p>
            <p>
              {activeTab === 0 && 'Home feed with updates'}
              {activeTab === 1 && 'Messages - 3 unread'}
              {activeTab === 2 && 'Notifications - 12 new'}
              {activeTab === 3 && 'Profile settings'}
            </p>
          </div>

          <BottomNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
            showLabels={showLabels}
          >
            <BottomNavigationTab index={0} label="Home" icon="🏠" />
            <BottomNavigationTab index={1} label="Messages" icon="💬" badge={3} />
            <BottomNavigationTab index={2} label="Notifications" icon="🔔" badge={12} />
            <BottomNavigationTab index={3} label="Profile" icon="👤" />
          </BottomNavigation>
        </div>
      </div>

      {/* Compact Navigation */}
      <div>
        <h3>Compact Navigation (No Labels)</h3>
        <div
          style={{
            position: 'relative',
            height: '400px',
            border: '1px solid var(--md-sys-color-outline)',
            borderRadius: '8px',
            backgroundColor: 'var(--md-sys-color-surface)',
            display: 'flex',
            flexDirection: 'column',
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
            <h4>Compact Navigation</h4>
            <p>
              Current tab: <strong>{activeTab}</strong>
            </p>
            <p>Labels are hidden but still accessible via aria-label</p>
          </div>

          <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} showLabels={false}>
            <BottomNavigationTab index={0} label="Home" icon="🏠" />
            <BottomNavigationTab index={1} label="Search" icon="🔍" />
            <BottomNavigationTab index={2} label="Library" icon="📚" />
            <BottomNavigationTab index={3} label="Profile" icon="👤" />
          </BottomNavigation>
        </div>
      </div>

      {/* Features */}
      <div>
        <h3>Features</h3>
        <ul>
          <li>✅ Material Design 3 styling</li>
          <li>✅ Keyboard navigation (Tab, Arrow keys)</li>
          <li>✅ Screen reader support</li>
          <li>✅ Badge notifications</li>
          <li>✅ Show/hide labels</li>
          <li>✅ Auto-hide on scroll</li>
          <li>✅ Focus management</li>
          <li>✅ Touch-friendly tap targets</li>
        </ul>
      </div>

      {/* Usage */}
      <div>
        <h3>Usage</h3>
        <pre
          style={{
            backgroundColor: 'var(--md-sys-color-surface-variant)',
            padding: '1rem',
            borderRadius: '4px',
            overflow: 'auto',
          }}
        >
          {`<BottomNavigation
  activeTab={activeTab}
  onTabChange={setActiveTab}
  showLabels={true}
  autoHide={false}
>
  <BottomNavigationTab index={0} label="Home" icon="🏠" />
  <BottomNavigationTab index={1} label="Search" icon="🔍" />
  <BottomNavigationTab index={2} label="Favorites" icon="❤️" badge={5} />
  <BottomNavigationTab index={3} label="Profile" icon="👤" />
</BottomNavigation>`}
        </pre>
      </div>
    </div>
  );
}
