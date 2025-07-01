import { render, screen, fireEvent } from '@testing-library/preact';
import { describe, it, expect, vi } from 'vitest';

import { ThemeProvider } from '../ThemeProvider/ThemeProvider';

import { Header } from './Header';

import '@testing-library/jest-dom';

// Test wrapper with ThemeProvider
const HeaderWithProvider = (props: any) => (
  <ThemeProvider>
    <Header {...props} />
  </ThemeProvider>
);

describe('Header', () => {
  it('renders with logo, nav, actions and children', () => {
    render(
      <HeaderWithProvider
        logo={<span data-testid="logo">Logo</span>}
        nav={
          <ul data-testid="nav">
            <li>NavItem</li>
          </ul>
        }
        actions={<button data-testid="action">Action</button>}
      >
        <div data-testid="children">Children</div>
      </HeaderWithProvider>,
    );
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('nav')).toBeInTheDocument();
    expect(screen.getByTestId('action')).toBeInTheDocument();
    expect(screen.getByTestId('children')).toBeInTheDocument();
  });

  it('applies className and style', () => {
    render(<Header className="test-class" style={{ background: 'red' }} />);
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('test-class');
    expect(header).toHaveStyle({ background: 'red' });
  });

  it('sets aria-label', () => {
    render(<Header aria-label="CustomHeader" />);
    expect(screen.getByRole('banner')).toHaveAttribute('aria-label', 'CustomHeader');
  });

  // MD3 enhancements tests
  it('renders navigation icon when provided', () => {
    const mockClick = vi.fn();
    render(<Header navigationIcon="☰" onNavigationClick={mockClick} />);

    const navButton = screen.getByRole('button', { name: /open navigation menu/i });
    expect(navButton).toBeInTheDocument();
    expect(navButton).toHaveTextContent('☰');

    fireEvent.click(navButton);
    expect(mockClick).toHaveBeenCalledOnce();
  });

  it('applies scroll behavior classes', () => {
    render(<Header scrollBehavior="elevate" />);
    const header = screen.getByRole('banner');
    expect(header.className).toContain('header--scroll-elevate');
  });

  it('applies center title class', () => {
    render(<Header centerTitle />);
    const header = screen.getByRole('banner');
    expect(header.className).toContain('header--center-title');
  });

  it('renders actions overflow menu when moreActions provided', () => {
    const moreActions = [
      { key: 'settings', label: 'Settings', icon: '⚙️' },
      { key: 'about', label: 'About', icon: 'ℹ️' },
    ];

    render(<Header moreActions={moreActions} moreActionsIcon="⋮" />);

    const moreButton = screen.getByRole('button', { name: /more actions/i });
    expect(moreButton).toBeInTheDocument();
    expect(moreButton).toHaveTextContent('⋮');
  });

  it('toggles overflow menu on more actions button click', () => {
    const moreActions = [{ key: 'settings', label: 'Settings' }];

    render(<Header moreActions={moreActions} />);

    const moreButton = screen.getByRole('button', { name: /more actions/i });
    expect(moreButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(moreButton);
    expect(moreButton).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(moreButton);
    expect(moreButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('applies variant classes correctly', () => {
    render(<Header variant="compact" />);
    const header = screen.getByRole('banner');
    expect(header.className).toContain('header--variant-compact');
  });

  it('applies elevation classes correctly', () => {
    render(<Header elevation={3} />);
    const header = screen.getByRole('banner');
    expect(header.className).toContain('header--elevation-3');
  });

  it('applies sticky class when sticky=true', () => {
    render(<Header sticky />);
    const header = screen.getByRole('banner');
    expect(header.className).toContain('header--sticky');
  });

  it('applies borderless class when borderless=true', () => {
    render(<Header borderless />);
    const header = screen.getByRole('banner');
    expect(header.className).toContain('header--borderless');
  });

  it('works without MD3 props (backwards compatibility)', () => {
    render(
      <Header logo={<span>Logo</span>} nav={<span>Nav</span>} actions={<button>Action</button>} />,
    );

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header.className).toContain('header--scroll-fixed'); // default scroll behavior
  });
});
