import { render, screen } from '@testing-library/preact';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';

import { AppLayout } from './AppLayout';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock window.addEventListener
const mockAddEventListener = vi.fn();
const mockRemoveEventListener = vi.fn();
Object.defineProperty(window, 'addEventListener', {
  writable: true,
  value: mockAddEventListener,
});
Object.defineProperty(window, 'removeEventListener', {
  writable: true,
  value: mockRemoveEventListener,
});

describe('AppLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  it('renders children correctly', () => {
    render(
      <AppLayout>
        <div>Test Content</div>
      </AppLayout>,
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders header when provided', () => {
    render(
      <AppLayout header={<div>Test Header</div>}>
        <div>Test Content</div>
      </AppLayout>,
    );

    expect(screen.getByText('Test Header')).toBeInTheDocument();
  });

  it('renders sidebar when provided', () => {
    render(
      <AppLayout sidebar={<div>Test Sidebar</div>}>
        <div>Test Content</div>
      </AppLayout>,
    );

    expect(screen.getByText('Test Sidebar')).toBeInTheDocument();
  });

  it('renders footer when provided', () => {
    render(
      <AppLayout footer={<div>Test Footer</div>}>
        <div>Test Content</div>
      </AppLayout>,
    );

    expect(screen.getByText('Test Footer')).toBeInTheDocument();
  });

  it('handles responsive behavior', () => {
    const handleSidebarToggle = vi.fn();

    render(
      <AppLayout
        sidebar={<div>Test Sidebar</div>}
        sidebarCollapsed={false}
        onSidebarToggle={handleSidebarToggle}
        responsive={true}
        sidebarBreakpoint={768}
      >
        <div>Test Content</div>
      </AppLayout>,
    );

    // Check that resize listener is added
    expect(mockAddEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  it('disables responsive behavior when responsive=false', () => {
    render(
      <AppLayout responsive={false}>
        <div>Test Content</div>
      </AppLayout>,
    );

    // Should not add resize listener when responsive is false
    expect(mockAddEventListener).not.toHaveBeenCalledWith('resize', expect.any(Function));
  });

  it('applies custom className', () => {
    const { container } = render(
      <AppLayout className="custom-layout">
        <div>Test Content</div>
      </AppLayout>,
    );

    expect(container.firstChild).toHaveClass('custom-layout');
  });

  it('applies custom style', () => {
    const customStyle = { backgroundColor: 'red' };
    const { container } = render(
      <AppLayout style={customStyle}>
        <div>Test Content</div>
      </AppLayout>,
    );

    expect(container.firstChild).toHaveStyle('background-color: rgb(255, 0, 0)');
  });

  it('enables grid layout when enableGrid=true', () => {
    const { container } = render(
      <AppLayout enableGrid={true}>
        <div>Test Content</div>
      </AppLayout>,
    );

    expect((container.firstChild as HTMLElement)?.className).toContain('appLayout--grid');
  });

  it('sets maxWidth when provided', () => {
    const { container } = render(
      <AppLayout maxWidth={1200}>
        <div>Test Content</div>
      </AppLayout>,
    );

    expect(container.firstChild).toHaveStyle('max-width: 1200px');
  });

  it('sets maxWidth as string when provided as string', () => {
    const { container } = render(
      <AppLayout maxWidth="100rem">
        <div>Test Content</div>
      </AppLayout>,
    );

    expect(container.firstChild).toHaveStyle('max-width: 100rem');
  });

  it('wraps content in ThemeProvider with correct props', () => {
    render(
      <AppLayout theme="dark" autoThemeManagement={true}>
        <div>Test Content</div>
      </AppLayout>,
    );

    // Check if content is rendered (indicating ThemeProvider is working)
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
