import { render, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { expect, test, describe, vi } from 'vitest';
import '@testing-library/jest-dom';

import { BottomNavigation, BottomNavigationTab } from './index';

describe('BottomNavigation', () => {
  test('renders navigation with tabs', () => {
    const onTabChange = vi.fn();

    render(
      <BottomNavigation activeTab={0} onTabChange={onTabChange}>
        <BottomNavigationTab index={0} label="Home" icon="🏠" />
        <BottomNavigationTab index={1} label="Search" icon="🔍" />
        <BottomNavigationTab index={2} label="Profile" icon="👤" />
      </BottomNavigation>,
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
      </BottomNavigation>,
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
      </BottomNavigation>,
    );

    // When showLabels is false, labels should not be rendered in DOM
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    expect(screen.queryByText('Search')).not.toBeInTheDocument();

    // But buttons should still be accessible via aria-label
    expect(screen.getByLabelText('Home')).toBeInTheDocument();
    expect(screen.getByLabelText('Search')).toBeInTheDocument();
  });

  test('calls onTabChange when tab is clicked', async () => {
    const user = userEvent.setup();
    const onTabChange = vi.fn();

    render(
      <BottomNavigation activeTab={0} onTabChange={onTabChange}>
        <BottomNavigationTab index={0} label="Home" icon="🏠" />
        <BottomNavigationTab index={1} label="Search" icon="🔍" />
      </BottomNavigation>,
    );

    const searchTab = screen.getByRole('tab', { name: /search/i });
    await user.click(searchTab);

    expect(onTabChange).toHaveBeenCalledWith(1);
  });

  test('supports keyboard navigation', async () => {
    const user = userEvent.setup();
    const onTabChange = vi.fn();

    render(
      <BottomNavigation activeTab={0} onTabChange={onTabChange}>
        <BottomNavigationTab index={0} label="Home" icon="🏠" />
        <BottomNavigationTab index={1} label="Search" icon="🔍" />
        <BottomNavigationTab index={2} label="Profile" icon="👤" />
      </BottomNavigation>,
    );

    // Get tabs
    const homeTab = screen.getByRole('tab', { name: /home/i });
    const searchTab = screen.getByRole('tab', { name: /search/i });
    const profileTab = screen.getByRole('tab', { name: /profile/i });

    // Focus the active tab (Home at index 0)
    homeTab.focus();

    // Arrow right should move to next tab (from 0 to 1)
    await user.keyboard('{ArrowRight}');
    expect(onTabChange).toHaveBeenCalledWith(1);
    // Focus should have moved to search tab
    expect(searchTab).toHaveFocus();

    // Arrow right again should move to profile tab (from 1 to 2)
    await user.keyboard('{ArrowRight}');
    expect(onTabChange).toHaveBeenCalledWith(2);
    expect(profileTab).toHaveFocus();

    // Arrow right from last tab should wrap to first tab (from 2 to 0)
    await user.keyboard('{ArrowRight}');
    expect(onTabChange).toHaveBeenCalledWith(0);
    expect(homeTab).toHaveFocus();

    // Arrow left from first tab should wrap to last tab (from 0 to 2)
    await user.keyboard('{ArrowLeft}');
    expect(onTabChange).toHaveBeenCalledWith(2);
    expect(profileTab).toHaveFocus();
  });

  test('renders badges on tabs', () => {
    const onTabChange = vi.fn();

    render(
      <BottomNavigation activeTab={0} onTabChange={onTabChange}>
        <BottomNavigationTab index={0} label="Home" icon="🏠" />
        <BottomNavigationTab index={1} label="Messages" icon="💬" badge={5} />
      </BottomNavigation>,
    );

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('applies active state to correct tab', () => {
    const onTabChange = vi.fn();

    render(
      <BottomNavigation activeTab={1} onTabChange={onTabChange}>
        <BottomNavigationTab index={0} label="Home" icon="🏠" />
        <BottomNavigationTab index={1} label="Search" icon="🔍" />
      </BottomNavigation>,
    );

    const homeTab = screen.getByRole('tab', { name: /home/i });
    const searchTab = screen.getByRole('tab', { name: /search/i });

    expect(homeTab).toHaveAttribute('tabindex', '-1');
    expect(searchTab).toHaveAttribute('tabindex', '0');
  });

  test('supports Home and End keys for navigation', async () => {
    const user = userEvent.setup();
    const onTabChange = vi.fn();

    render(
      <BottomNavigation activeTab={1} onTabChange={onTabChange}>
        <BottomNavigationTab index={0} label="Home" icon="🏠" />
        <BottomNavigationTab index={1} label="Search" icon="🔍" />
        <BottomNavigationTab index={2} label="Profile" icon="👤" />
      </BottomNavigation>,
    );

    const homeTab = screen.getByRole('tab', { name: /home/i });
    const searchTab = screen.getByRole('tab', { name: /search/i });
    const profileTab = screen.getByRole('tab', { name: /profile/i });

    // Focus the middle tab (Search at index 1)
    searchTab.focus();

    // Home key should move to first tab
    await user.keyboard('{Home}');
    expect(onTabChange).toHaveBeenCalledWith(0);
    expect(homeTab).toHaveFocus();

    // End key should move to last tab
    await user.keyboard('{End}');
    expect(onTabChange).toHaveBeenCalledWith(2);
    expect(profileTab).toHaveFocus();
  });
});
