import { render, screen, fireEvent, waitFor } from '@testing-library/preact';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';

import { Snackbar } from './Snackbar';
import { SnackbarProvider, useSnackbar } from './SnackbarProvider';
import styles from './Snackbar.module.scss';
import '@testing-library/jest-dom';

// Mock timers
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('Snackbar', () => {
  it('renders when open', () => {
    render(<Snackbar message="Test message" open={true} />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<Snackbar message="Test message" open={false} />);
    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
  });

  it('displays action button when provided', () => {
    const handleAction = vi.fn();
    render(
      <Snackbar
        message="Test message"
        open={true}
        action={{ label: 'Action', onClick: handleAction }}
      />,
    );

    const actionButton = screen.getByRole('button', { name: 'Action' });
    expect(actionButton).toBeInTheDocument();
  });

  it('calls action callback when action button is clicked', async () => {
    const handleAction = vi.fn();
    const handleClose = vi.fn();
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(
      <Snackbar
        message="Test message"
        open={true}
        action={{ label: 'Action', onClick: handleAction }}
        onClose={handleClose}
      />,
    );

    const actionButton = screen.getByRole('button', { name: 'Action' });
    await user.click(actionButton);

    expect(handleAction).toHaveBeenCalledTimes(1);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('shows close button when showCloseButton is true', () => {
    render(<Snackbar message="Test message" open={true} showCloseButton={true} />);
    expect(screen.getByRole('button', { name: 'Close notification' })).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(
      <Snackbar message="Test message" open={true} showCloseButton={true} onClose={handleClose} />,
    );

    const closeButton = screen.getByRole('button', { name: 'Close notification' });
    await user.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('auto-dismisses after duration', async () => {
    const handleClose = vi.fn();
    render(<Snackbar message="Test message" open={true} duration={2000} onClose={handleClose} />);

    // Fast-forward time
    vi.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  it('does not auto-dismiss when persistent', async () => {
    const handleClose = vi.fn();
    render(
      <Snackbar
        message="Test message"
        open={true}
        duration={2000}
        persistent={true}
        onClose={handleClose}
      />,
    );

    // Fast-forward time
    vi.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  it('closes on Escape key', async () => {
    const handleClose = vi.fn();
    render(<Snackbar message="Test message" open={true} onClose={handleClose} />);

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('applies severity classes correctly', () => {
    const { rerender } = render(<Snackbar message="Test message" open={true} severity="error" />);
    let snackbar = screen.getByRole('alert');
    expect(snackbar).toHaveClass(styles['snackbar--error']);

    rerender(<Snackbar message="Test message" open={true} severity="success" />);
    snackbar = screen.getByRole('alert');
    expect(snackbar).toHaveClass(styles['snackbar--success']);

    rerender(<Snackbar message="Test message" open={true} severity="warning" />);
    snackbar = screen.getByRole('alert');
    expect(snackbar).toHaveClass(styles['snackbar--warning']);

    rerender(<Snackbar message="Test message" open={true} severity="info" />);
    snackbar = screen.getByRole('alert');
    expect(snackbar).toHaveClass(styles['snackbar--info']);
  });

  it('applies position classes correctly', () => {
    const { rerender } = render(<Snackbar message="Test message" open={true} position="top" />);
    let snackbar = screen.getByRole('alert');
    expect(snackbar).toHaveClass(styles['snackbar--top']);

    rerender(<Snackbar message="Test message" open={true} position="bottom-left" />);
    snackbar = screen.getByRole('alert');
    expect(snackbar).toHaveClass(styles['snackbar--bottom-left']);
  });

  it('has proper accessibility attributes', () => {
    render(<Snackbar message="Test message" open={true} />);
    const snackbar = screen.getByRole('alert');

    expect(snackbar).toHaveAttribute('aria-live', 'polite');
    expect(snackbar).toHaveAttribute('aria-atomic', 'true');
  });
});

// Test component for provider testing
const TestComponent = () => {
  const { showSnackbar, hideSnackbar } = useSnackbar();

  return (
    <div>
      <button onClick={() => showSnackbar({ message: 'Test snackbar' })}>Show Snackbar</button>
      <button onClick={() => hideSnackbar()}>Hide All</button>
    </div>
  );
};

describe('SnackbarProvider', () => {
  it('provides snackbar functionality to children', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(
      <SnackbarProvider>
        <TestComponent />
      </SnackbarProvider>,
    );

    const showButton = screen.getByRole('button', { name: 'Show Snackbar' });
    await user.click(showButton);

    expect(screen.getByText('Test snackbar')).toBeInTheDocument();
  });

  it('hides all snackbars when hideSnackbar is called', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(
      <SnackbarProvider>
        <TestComponent />
      </SnackbarProvider>,
    );

    const showButton = screen.getByRole('button', { name: 'Show Snackbar' });
    const hideButton = screen.getByRole('button', { name: 'Hide All' });

    await user.click(showButton);
    expect(screen.getByText('Test snackbar')).toBeInTheDocument();

    await user.click(hideButton);
    expect(screen.queryByText('Test snackbar')).not.toBeInTheDocument();
  });

  it('limits the number of snackbars', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(
      <SnackbarProvider maxSnackbars={2}>
        <TestComponent />
      </SnackbarProvider>,
    );

    const showButton = screen.getByRole('button', { name: 'Show Snackbar' });

    // Show 3 snackbars
    await user.click(showButton);
    await user.click(showButton);
    await user.click(showButton);

    // Should only show 2 (maxSnackbars)
    const snackbars = screen.getAllByText('Test snackbar');
    expect(snackbars).toHaveLength(2);
  });
});
