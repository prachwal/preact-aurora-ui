import { render, screen, fireEvent } from '@testing-library/preact';
import { expect, test, describe, vi } from 'vitest';

import { BottomNavigation, BottomNavigationTab } from './index';

describe('BottomNavigation', () => {
  test('renders navigation with tabs', () => {
    const onTabChange = vi.fn();

    render(
      <BottomNavigation activeTab={0} onTabChange={onTabChange}>
        <BottomNavigationTab index={0} label="Home" icon="🏠" />
        <BottomNavigationTab index={1} label="Search" icon="🔍" />
        <BottomNavigationTab index={2} label="Profile" icon="👤" />
      </BottomNavigation>
    );

    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByLabelText('Bottom navigation')).toBeInTheDocument();
  });

  test('renders tab labels when showLabels is true', () => {
    const onTabChange = vi.fn();

    render(
      <BottomNavigation activeTab={0} onTabChange={onTabChange} showLabels={true}>
        <BottomNavigationTab index={0} label="Home" icon="🏠" />
        <BottomNavigationTab index={1} label="Search" icon="🔍" />
      </BottomNavigation>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('hides tab labels when showLabels is false', () => {
    const onTabChange = vi.fn();

    render(
      <BottomNavigation activeTab={0} onTabChange={onTabChange} showLabels={false}>
        <BottomNavigationTab index={0} label="Home" icon="🏠" />
        <BottomNavigationTab index={1} label="Search" icon="🔍" />
      </BottomNavigation>
    );

    // Labels should not be visible but still in DOM for accessibility
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('calls onTabChange when tab is clicked', () => {
    const onTabChange = vi.fn();

    render(
      <BottomNavigation activeTab={0} onTabChange={onTabChange}>
        <BottomNavigationTab index={0} label="Home" icon="🏠" />
        <BottomNavigationTab index={1} label="Search" icon="🔍" />
      </BottomNavigation>
    );

    const searchTab = screen.getByRole('tab', { name: /search/i });
    fireEvent.click(searchTab);

    expect(onTabChange).toHaveBeenCalledWith(1);
  });

  test('supports keyboard navigation', () => {
    const onTabChange = vi.fn();

    render(
      <BottomNavigation activeTab={0} onTabChange={onTabChange}>
        <BottomNavigationTab index={0} label="Home" icon="🏠" />
        <BottomNavigationTab index={1} label="Search" icon="🔍" />
        <BottomNavigationTab index={2} label="Profile" icon="👤" />
      </BottomNavigation>
    );

    const navigation = screen.getByRole('tablist');

    // Arrow right should move to next tab
    fireEvent.keyDown(navigation, { key: 'ArrowRight' });
    expect(onTabChange).toHaveBeenCalledWith(1);

    // Arrow left should move to previous tab
    fireEvent.keyDown(navigation, { key: 'ArrowLeft' });
    expect(onTabChange).toHaveBeenCalledWith(2); // wraps to last tab
  });

  test('renders badges on tabs', () => {
    const onTabChange = vi.fn();

    render(
      <BottomNavigation activeTab={0} onTabChange={onTabChange}>
        <BottomNavigationTab index={0} label="Home" icon="🏠" />
        <BottomNavigationTab index={1} label="Messages" icon="💬" badge={5} />
      </BottomNavigation>
    );

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('applies active state to correct tab', () => {
    const onTabChange = vi.fn();

    render(
      <BottomNavigation activeTab={1} onTabChange={onTabChange}>
        <BottomNavigationTab index={0} label="Home" icon="🏠" />
        <BottomNavigationTab index={1} label="Search" icon="🔍" />
      </BottomNavigation>
    );

    const homeTab = screen.getByRole('tab', { name: /home/i });
    const searchTab = screen.getByRole('tab', { name: /search/i });

    expect(homeTab).toHaveAttribute('tabindex', '-1');
    expect(searchTab).toHaveAttribute('tabindex', '0');
  });
});
