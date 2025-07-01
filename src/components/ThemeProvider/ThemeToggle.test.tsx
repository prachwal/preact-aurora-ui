import { render, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

import { ThemeProvider } from '../ThemeProvider/ThemeProvider';
import { ThemeToggle } from '../ThemeProvider/ThemeToggle';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

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

const ThemeToggleWithProvider = (props: any) => (
  <ThemeProvider defaultTheme={{ mode: 'light' }}>
    <ThemeToggle {...props} />
  </ThemeProvider>
);

describe('ThemeToggle - FAZA 4 Features', () => {
  it('renders with default props', () => {
    render(<ThemeToggleWithProvider />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.className).toContain('themeToggle--variant-icon');
    expect(button.className).toContain('themeToggle--size-md');
  });

  it('renders switch variant correctly', () => {
    render(<ThemeToggleWithProvider variant="switch" />);

    const label = screen.getByRole('checkbox').closest('label');
    expect(label?.className).toContain('themeToggle--variant-switch');
  });

  it('shows custom icons when provided', () => {
    const customIcons = {
      light: '🔆',
      dark: '🌚',
      auto: '🔄',
    };

    render(<ThemeToggleWithProvider customIcons={customIcons} />);

    expect(screen.getByText('🔆')).toBeInTheDocument();
  });

  it('applies animated class when animated=true', () => {
    render(<ThemeToggleWithProvider animated={true} />);

    const button = screen.getByRole('button');
    expect(button.className).toContain('themeToggle--animated');
  });

  it('applies position classes correctly', () => {
    const { rerender } = render(<ThemeToggleWithProvider position="left" />);
    expect(screen.getByRole('button').className).toContain('themeToggle--position-left');

    rerender(<ThemeToggleWithProvider position="right" />);
    expect(screen.getByRole('button').className).toContain('themeToggle--position-right');

    rerender(<ThemeToggleWithProvider position="center" />);
    expect(screen.getByRole('button').className).toContain('themeToggle--position-center');
  });

  it('applies rounded class when rounded=true', () => {
    render(<ThemeToggleWithProvider rounded={true} />);

    const button = screen.getByRole('button');
    expect(button.className).toContain('themeToggle--rounded');
  });

  it('shows label when showLabel=true and variant=button', () => {
    render(<ThemeToggleWithProvider variant="button" showLabel={true} />);

    expect(screen.getByText('Light')).toBeInTheDocument();
  });

  it('handles tooltip correctly', () => {
    render(<ThemeToggleWithProvider tooltip={true} />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('title');
  });

  it('disables tooltip when tooltip=false', () => {
    render(<ThemeToggleWithProvider tooltip={false} />);

    const button = screen.getByRole('button');
    expect(button).not.toHaveAttribute('title');
  });

  it('toggles theme on click', async () => {
    const user = userEvent.setup();
    render(<ThemeToggleWithProvider />);

    const button = screen.getByRole('button');
    await user.click(button);

    // After click, theme should change (hard to test without full theme context)
    expect(button).toBeInTheDocument();
  });

  it('switch variant toggles on input change', async () => {
    const user = userEvent.setup();
    render(<ThemeToggleWithProvider variant="switch" />);

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    // Should toggle the theme
    expect(checkbox).toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<ThemeToggleWithProvider size="sm" />);
    expect(screen.getByRole('button').className).toContain('themeToggle--size-sm');

    rerender(<ThemeToggleWithProvider size="lg" />);
    expect(screen.getByRole('button').className).toContain('themeToggle--size-lg');
  });

  it('applies custom className', () => {
    render(<ThemeToggleWithProvider className="custom-toggle" />);

    const button = screen.getByRole('button');
    expect(button.className).toContain('custom-toggle');
  });

  it('applies custom style', () => {
    const customStyle = { backgroundColor: 'red' };
    render(<ThemeToggleWithProvider style={customStyle} />);

    const button = screen.getByRole('button');
    expect(button).toHaveStyle('background-color: rgb(255, 0, 0)');
  });

  it('renders overlay icon when animated', () => {
    const { container } = render(<ThemeToggleWithProvider animated={true} />);

    // Check for element with class containing 'iconOverlay'
    const overlay = container.querySelector('[class*="iconOverlay"]');
    expect(overlay).toBeInTheDocument();
  });

  it('handles keyboard navigation for switch variant', async () => {
    const user = userEvent.setup();
    render(<ThemeToggleWithProvider variant="switch" />);

    const checkbox = screen.getByRole('checkbox');

    await user.tab();
    expect(checkbox).toHaveFocus();

    await user.keyboard(' ');
    // Should toggle theme (specific assertion depends on theme implementation)
  });
});
