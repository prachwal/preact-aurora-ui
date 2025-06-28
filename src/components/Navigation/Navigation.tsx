import { useLocation } from 'preact-iso';

import { Menu } from '../Menu';

interface NavigationProps {
  onSelect?: (key: string) => void;
}

export function Navigation({ onSelect }: NavigationProps) {
  const { url } = useLocation();

  const menuItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: '🏠',
      href: '/dashboard',
    },
    {
      key: 'analytics',
      label: 'Analytics',
      icon: '📊',
      href: '/analytics',
    },
    {
      key: 'users',
      label: 'Users',
      icon: '👥',
      href: '/users',
    },
    {
      key: 'theme-demo',
      label: 'Theme Demo',
      icon: '🎨',
      href: '/theme-demo',
    },
    {
      key: 'md3-colors',
      label: 'MD3 Colors',
      icon: '🎨',
      href: '/md3-colors',
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: '⚙️',
      href: '/settings',
    },
  ];

  // Get current active key from URL
  const getCurrentKey = () => {
    const currentPath = url;
    const item = menuItems.find((item) => item.href === currentPath);
    return item?.key || 'dashboard';
  };

  const handleSelect = (key: string) => {
    const item = menuItems.find((item) => item.key === key);
    if (item) {
      // Navigate to the route
      window.history.pushState({}, '', item.href);
      // Trigger a popstate event to update the router
      window.dispatchEvent(new PopStateEvent('popstate'));
      onSelect?.(key);
    }
  };

  return <Menu items={menuItems} selectedKey={getCurrentKey()} onSelect={handleSelect} />;
}
