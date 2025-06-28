import { render, screen, waitFor } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { Tooltip } from './Tooltip';
import '@testing-library/jest-dom';

describe('Tooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('renders trigger element', () => {
    render(
      <Tooltip content="Test tooltip">
        <button>Trigger</button>
      </Tooltip>,
    );

    expect(screen.getByRole('button', { name: 'Trigger' })).toBeInTheDocument();
  });

  it('shows tooltip on hover with delay', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(
      <Tooltip content="Test tooltip" enterDelay={100}>
        <button>Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole('button');
    await user.hover(trigger);

    // Tooltip should not be visible immediately
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    // Fast-forward time
    vi.advanceTimersByTime(100);

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
      expect(screen.getByText('Test tooltip')).toBeInTheDocument();
    });
  });

  it('hides tooltip on unhover with delay', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(
      <Tooltip content="Test tooltip" enterDelay={0} leaveDelay={100}>
        <button>Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole('button');
    await user.hover(trigger);

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });

    await user.unhover(trigger);

    // Tooltip should still be visible
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    // Fast-forward time
    vi.advanceTimersByTime(100);

    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  it('shows tooltip on focus', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(
      <Tooltip content="Test tooltip" trigger="focus" enterDelay={0}>
        <button>Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole('button');
    await user.click(trigger); // This will focus the button

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
  });

  it('hides tooltip on blur', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(
      <Tooltip content="Test tooltip" trigger="focus" enterDelay={0} leaveDelay={0}>
        <button>Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole('button');
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });

    await user.tab(); // This will blur the button

    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  it('toggles tooltip on click', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(
      <Tooltip content="Test tooltip" trigger="click">
        <button>Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole('button');

    // First click - show
    await user.click(trigger);
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });

    // Second click - hide
    await user.click(trigger);
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  it('respects disabled state', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(
      <Tooltip content="Test tooltip" disabled enterDelay={0}>
        <button>Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole('button');
    await user.hover(trigger);

    vi.advanceTimersByTime(100);

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('supports controlled mode', async () => {
    const handleOpenChange = vi.fn();

    const { rerender } = render(
      <Tooltip content="Test tooltip" open={false} onOpenChange={handleOpenChange}>
        <button>Trigger</button>
      </Tooltip>,
    );

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    rerender(
      <Tooltip content="Test tooltip" open={true} onOpenChange={handleOpenChange}>
        <button>Trigger</button>
      </Tooltip>,
    );

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
  });

  it('closes on Escape key', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(
      <Tooltip content="Test tooltip" trigger="click">
        <button>Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole('button');
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });

    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  it('applies custom className and styles', () => {
    render(
      <Tooltip
        content="Test tooltip"
        className="custom-tooltip"
        style={{ color: 'red' }}
        open={true}
      >
        <button>Trigger</button>
      </Tooltip>,
    );

    // Check if tooltip exists at all first
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveClass('custom-tooltip');
    expect(tooltip).toHaveStyle({ color: 'rgb(255, 0, 0)' });
  });

  it('supports rich content variant', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(
      <Tooltip
        content={
          <div>
            <h4>Rich Content</h4>
            <p>This is a rich tooltip with multiple elements.</p>
          </div>
        }
        variant="rich"
        enterDelay={0}
      >
        <button>Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole('button');
    await user.hover(trigger);

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
      expect(screen.getByText('Rich Content')).toBeInTheDocument();
      expect(
        screen.getByText('This is a rich tooltip with multiple elements.'),
      ).toBeInTheDocument();
    });
  });

  it('supports multiple triggers', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(
      <Tooltip content="Test tooltip" trigger={['hover', 'focus']} enterDelay={0} leaveDelay={0}>
        <button>Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole('button');

    // Test hover trigger
    await user.hover(trigger);
    await waitFor(
      () => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      },
      { timeout: 1000 },
    );

    await user.unhover(trigger);
    await waitFor(
      () => {
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      },
      { timeout: 1000 },
    );

    // Test focus trigger
    await user.click(trigger);
    await waitFor(
      () => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });

  it('calls onOpenChange callback', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const handleOpenChange = vi.fn();

    render(
      <Tooltip content="Test tooltip" onOpenChange={handleOpenChange} enterDelay={0} leaveDelay={0}>
        <button>Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole('button');
    await user.hover(trigger);

    await waitFor(
      () => {
        expect(handleOpenChange).toHaveBeenCalledWith(true);
      },
      { timeout: 1000 },
    );

    await user.unhover(trigger);

    await waitFor(
      () => {
        expect(handleOpenChange).toHaveBeenCalledWith(false);
      },
      { timeout: 1000 },
    );
  });

  it('supports custom max width', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(
      <Tooltip content="Test tooltip" maxWidth={300} enterDelay={0}>
        <button>Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole('button');
    await user.hover(trigger);

    await waitFor(() => {
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toHaveStyle({ maxWidth: '300px' });
    });
  });

  it('sets correct ARIA attributes', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(
      <Tooltip content="Test tooltip" enterDelay={0}>
        <button>Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole('button');
    await user.hover(trigger);

    await waitFor(() => {
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toHaveAttribute('role', 'tooltip');
      expect(trigger).toHaveAttribute('aria-describedby', tooltip.id);
    });
  });
});
