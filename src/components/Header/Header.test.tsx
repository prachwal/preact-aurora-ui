import { screen, fireEvent } from '@testing-library/preact';
import { describe, it, expect, vi } from 'vitest';

import { renderWithTheme } from '../../test-utils';

import { Header } from './Header';

import '@testing-library/jest-dom';

describe('Header', () => {
  it('renders with logo, nav, actions and children', () => {
    renderWithTheme(
      <Header
        logo={<span data-testid="logo">Logo</span>}
        nav={
          <ul data-testid="nav">
            <li>NavItem</li>
          </ul>
        }
        actions={<button data-testid="action">Action</button>}
      >
        <div data-testid="children">Children</div>
      </Header>,
    );
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('nav')).toBeInTheDocument();
    expect(screen.getByTestId('action')).toBeInTheDocument();
    expect(screen.getByTestId('children')).toBeInTheDocument();
  });

  it('applies className and style', () => {
    renderWithTheme(<Header className="test-class" style={{ background: 'red' }} />);
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('test-class');
    expect(header).toHaveStyle({ background: 'red' });
  });

  it('sets aria-label', () => {
    renderWithTheme(<Header aria-label="CustomHeader" />);
    expect(screen.getByRole('banner')).toHaveAttribute('aria-label', 'CustomHeader');
  });

  // MD3 enhancements tests
  it('renders navigation icon when provided', () => {
    const mockClick = vi.fn();
    renderWithTheme(<Header navigationIcon="☰" onNavigationClick={mockClick} />);

    const navButton = screen.getByRole('button', { name: /open navigation menu/i });
    expect(navButton).toBeInTheDocument();
    expect(navButton).toHaveTextContent('☰');

    fireEvent.click(navButton);
    expect(mockClick).toHaveBeenCalledOnce();
  });

  it('applies scroll behavior classes', () => {
    renderWithTheme(<Header scrollBehavior="elevate" />);
    const header = screen.getByRole('banner');
    expect(header.className).toContain('header--scroll-elevate');
  });

  it('applies center title class', () => {
    renderWithTheme(<Header centerTitle />);
    const header = screen.getByRole('banner');
    expect(header.className).toContain('header--center-title');
  });

  it('renders actions overflow menu when moreActions provided', () => {
    const moreActions = [
      { key: 'settings', label: 'Settings', icon: '⚙️' },
      { key: 'about', label: 'About', icon: 'ℹ️' },
    ];

    renderWithTheme(<Header moreActions={moreActions} moreActionsIcon="⋮" />);

    const moreButton = screen.getByRole('button', { name: /more actions/i });
    expect(moreButton).toBeInTheDocument();
    expect(moreButton).toHaveTextContent('⋮');
  });

  it('toggles overflow menu on more actions button click', () => {
    const moreActions = [{ key: 'settings', label: 'Settings' }];

    renderWithTheme(<Header moreActions={moreActions} />);

    const moreButton = screen.getByRole('button', { name: /more actions/i });
    expect(moreButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(moreButton);
    expect(moreButton).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(moreButton);
    expect(moreButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('applies variant classes correctly', () => {
    renderWithTheme(<Header variant="compact" />);
    const header = screen.getByRole('banner');
    expect(header.className).toContain('header--variant-compact');
  });

  it('applies elevation classes correctly', () => {
    renderWithTheme(<Header elevation={3} />);
    const header = screen.getByRole('banner');
    expect(header.className).toContain('header--elevation-3');
  });

  it('applies sticky class when sticky=true', () => {
    renderWithTheme(<Header sticky />);
    const header = screen.getByRole('banner');
    expect(header.className).toContain('header--sticky');
  });

  it('applies borderless class when borderless=true', () => {
    renderWithTheme(<Header borderless />);
    const header = screen.getByRole('banner');
    expect(header.className).toContain('header--borderless');
  });

  it('works without MD3 props (backwards compatibility)', () => {
    renderWithTheme(
      <Header logo={<span>Logo</span>} nav={<span>Nav</span>} actions={<button>Action</button>} />,
    );

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header.className).toContain('header--scroll-fixed'); // default scroll behavior
  });
});
