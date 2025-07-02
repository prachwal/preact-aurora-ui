import { screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NotFound } from './NotFound';
import { renderWithTheme } from '../../test-utils';
import '@testing-library/jest-dom';

// Mock window.history
const mockBack = vi.fn();
const mockHistoryLength = vi.fn(() => 2);

beforeEach(() => {
  vi.clearAllMocks();
  Object.defineProperty(window, 'history', {
    value: {
      back: mockBack,
      get length() {
        return mockHistoryLength();
      },
    },
    writable: true,
  });
});

describe('NotFound', () => {
  it('renders with default props', () => {
    renderWithTheme(<NotFound />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
    expect(screen.getByText("The page you're looking for doesn't exist or has been moved.")).toBeInTheDocument();
  });

  it('renders custom title and subtitle', () => {
    renderWithTheme(
      <NotFound
        title="Custom Error Title"
        subtitle="Custom error description"
      />
    );

    expect(screen.getByText('Custom Error Title')).toBeInTheDocument();
    expect(screen.getByText('Custom error description')).toBeInTheDocument();
  });

  it('renders children content', () => {
    renderWithTheme(
      <NotFound>
        <div>Custom children content</div>
      </NotFound>
    );

    expect(screen.getByText('Custom children content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    renderWithTheme(<NotFound className="custom-class" />);

    const container = screen.getByLabelText('404 Page Not Found');
    expect(container).toHaveClass('custom-class');
  });

  it('shows home link by default', () => {
    renderWithTheme(<NotFound />);

    const homeLink = screen.getByRole('link', { name: /go to homepage/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('hides home link when showHomeLink is false', () => {
    renderWithTheme(<NotFound showHomeLink={false} />);

    const homeLink = screen.queryByRole('link', { name: /go to homepage/i });
    expect(homeLink).not.toBeInTheDocument();
  });

  it('shows back button by default', () => {
    renderWithTheme(<NotFound />);

    const backButton = screen.getByRole('button', { name: /go back/i });
    expect(backButton).toBeInTheDocument();
  });

  it('hides back button when showBackLink is false', () => {
    renderWithTheme(<NotFound showBackLink={false} />);

    const backButton = screen.queryByRole('button', { name: /go back/i });
    expect(backButton).not.toBeInTheDocument();
  });

  it('calls window.history.back when back button is clicked and history exists', async () => {
    const user = userEvent.setup();
    mockHistoryLength.mockReturnValue(3); // History has entries

    renderWithTheme(<NotFound />);

    const backButton = screen.getByRole('button', { name: /go back/i });
    await user.click(backButton);

    expect(mockBack).toHaveBeenCalledOnce();
  });

  it('redirects to home when back button is clicked and no history', async () => {
    const user = userEvent.setup();
    mockHistoryLength.mockReturnValue(1); // No history

    // Mock window.location
    const mockLocation = { href: '' };
    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
    });

    renderWithTheme(<NotFound />);

    const backButton = screen.getByRole('button', { name: /go back/i });
    await user.click(backButton);

    expect(mockBack).not.toHaveBeenCalled();
    expect(mockLocation.href).toBe('/');
  });

  it('renders suggestion links', () => {
    renderWithTheme(<NotFound />);

    expect(screen.getByRole('link', { name: /🏠 homepage/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /📚 documentation/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /🎨 storybook/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /💻 github/i })).toBeInTheDocument();
  });

  it('handles keyboard navigation correctly', async () => {
    const user = userEvent.setup();

    renderWithTheme(<NotFound />);

    // Tab through interactive elements
    await user.tab();
    const homeLink = screen.getByRole('link', { name: /go to homepage/i });
    expect(homeLink).toHaveFocus();

    await user.tab();
    const backButton = screen.getByRole('button', { name: /go back/i });
    expect(backButton).toHaveFocus();

    await user.tab();
    const suggestionLink = screen.getByRole('link', { name: /🏠 homepage/i });
    expect(suggestionLink).toHaveFocus();
  });

  it('has proper accessibility attributes', () => {
    renderWithTheme(<NotFound />);

    const container = screen.getByLabelText('404 Page Not Found');
    expect(container).toHaveAttribute('role', 'main');
  });

  it('applies custom aria-label', () => {
    renderWithTheme(<NotFound aria-label="Custom error page" />);

    const container = screen.getByLabelText('Custom error page');
    expect(container).toBeInTheDocument();
  });
});
