import { TabsDemo } from './TabsDemo';
import { BottomNavigationDemo } from './BottomNavigationDemo';

export function NavigationComponentsTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h3>🧭 Navigation Components</h3>
      <TabsDemo />
      <BottomNavigationDemo />
    </div>
  );
}
