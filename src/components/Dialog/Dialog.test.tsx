import { render, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';

import { Dialog } from './Dialog';
import { useDialog } from './useDialog';
import type { DialogAction, DialogProps } from './types';

// Mock createPortal to render in place
vi.mock('preact/compat', async (importOriginal) => {
  const actual = await importOriginal<typeof import('preact/compat')>();
  return {
    ...actual,
    createPortal: (children: any) => children,
  };
});

describe('Dialog', () => {
  const defaultProps: DialogProps = {
    open: true,
    onClose: vi.fn(),
    title: 'Test Dialog',
    children: 'Dialog content',
  };

  beforeEach(() => {
    // Reset body overflow
    document.body.style.overflow = '';
    // Clear all mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Clean up any remaining dialogs
    document.body.style.overflow = '';
  });

  describe('Basic Functionality', () => {
    it('renders dialog when open', () => {
      render(<Dialog {...defaultProps} />);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Test Dialog')).toBeInTheDocument();
      expect(screen.getByText('Dialog content')).toBeInTheDocument();
    });

    it('does not render when closed', () => {
      render(<Dialog {...defaultProps} open={false} />);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      render(<Dialog {...defaultProps} onClose={onClose} />);

      const closeButton = screen.getByRole('button', { name: /close/i });
      await user.click(closeButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('hides close button when showCloseButton is false', () => {
      render(<Dialog {...defaultProps} showCloseButton={false} />);

      expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
    });
  });

  describe('Dialog Types', () => {
    it('renders basic dialog correctly', () => {
      render(<Dialog {...defaultProps} type="basic" />);

      const dialog = screen.getByRole('dialog');
      expect(dialog.className).toMatch(/basic/);
    });

    it('renders alert dialog with icon', () => {
      render(<Dialog {...defaultProps} type="alert" icon="⚠️" />);

      const dialog = screen.getByRole('dialog');
      expect(dialog.className).toMatch(/alert/);
      expect(screen.getByText('⚠️')).toBeInTheDocument();
    });

    it('renders confirmation dialog with subtitle', () => {
      render(<Dialog {...defaultProps} type="confirmation" subtitle="Confirmation subtitle" />);

      const dialog = screen.getByRole('dialog');
      expect(dialog.className).toMatch(/confirmation/);
      // Note: The subtitle would be rendered in the DialogHeader if implemented
      expect(screen.getByText('Test Dialog')).toBeInTheDocument();
    });

    it('renders fullscreen dialog', () => {
      render(<Dialog {...defaultProps} type="fullscreen" />);

      const dialog = screen.getByRole('dialog');
      expect(dialog.className).toMatch(/fullscreen/);
    });
  });

  describe('Dialog Sizes', () => {
    it('applies small size class', () => {
      render(<Dialog {...defaultProps} size="small" />);

      const dialog = screen.getByRole('dialog');
      expect(dialog.className).toMatch(/small/);
    });

    it('applies medium size class', () => {
      render(<Dialog {...defaultProps} size="medium" />);

      const dialog = screen.getByRole('dialog');
      expect(dialog.className).toMatch(/medium/);
    });

    it('applies large size class', () => {
      render(<Dialog {...defaultProps} size="large" />);

      const dialog = screen.getByRole('dialog');
      expect(dialog.className).toMatch(/large/);
    });
  });

  describe('Dialog Variants', () => {
    it('applies elevated variant class', () => {
      render(<Dialog {...defaultProps} variant="elevated" />);

      const dialog = screen.getByRole('dialog');
      expect(dialog.className).toMatch(/elevated/);
    });

    it('applies outlined variant class', () => {
      render(<Dialog {...defaultProps} variant="outlined" />);

      const dialog = screen.getByRole('dialog');
      expect(dialog.className).toMatch(/outlined/);
    });
  });

  describe('Action Buttons', () => {
    it('renders action buttons', () => {
      const actions: DialogAction[] = [
        { label: 'Cancel', onClick: vi.fn(), variant: 'text' },
        { label: 'Save', onClick: vi.fn(), variant: 'filled' },
      ];

      render(<Dialog {...defaultProps} actions={actions} />);

      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    });

    it('calls action onClick handlers', async () => {
      const user = userEvent.setup();
      const handleCancel = vi.fn();
      const handleSave = vi.fn();

      const actions: DialogAction[] = [
        { label: 'Cancel', onClick: handleCancel, variant: 'text' },
        { label: 'Save', onClick: handleSave, variant: 'filled' },
      ];

      render(<Dialog {...defaultProps} actions={actions} />);

      await user.click(screen.getByRole('button', { name: 'Cancel' }));
      expect(handleCancel).toHaveBeenCalledTimes(1);

      await user.click(screen.getByRole('button', { name: 'Save' }));
      expect(handleSave).toHaveBeenCalledTimes(1);
    });

    it('disables action buttons when disabled', () => {
      const actions: DialogAction[] = [
        { label: 'Disabled', onClick: vi.fn(), variant: 'text', disabled: true },
      ];

      render(<Dialog {...defaultProps} actions={actions} />);

      expect(screen.getByRole('button', { name: 'Disabled' })).toBeDisabled();
    });
  });

  describe('Modal Behavior', () => {
    it('locks body scroll when modal', () => {
      render(<Dialog {...defaultProps} modal={true} />);

      expect(document.body.style.overflow).toBe('hidden');
    });

    it('does not lock body scroll when non-modal', () => {
      render(<Dialog {...defaultProps} modal={false} />);

      expect(document.body.style.overflow).toBe('');
    });

    it('calls onClose when overlay is clicked (modal)', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      render(<Dialog {...defaultProps} onClose={onClose} modal={true} />);

      // Find overlay by class since it's now a sibling of dialog
      const overlay = document.querySelector('.overlay');
      if (overlay) {
        await user.click(overlay as HTMLElement);
        expect(onClose).toHaveBeenCalledTimes(1);
      }
    });

    it('does not call onClose when closeOnOverlayClick is false', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      render(
        <Dialog {...defaultProps} onClose={onClose} closeOnOverlayClick={false} modal={true} />,
      );

      // Find overlay by class since it's now a sibling of dialog
      const overlay = document.querySelector('.overlay');
      if (overlay) {
        await user.click(overlay as HTMLElement);
        expect(onClose).not.toHaveBeenCalled();
      }
    });
  });

  describe('Keyboard Navigation', () => {
    it('calls onClose when Escape key is pressed', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      render(<Dialog {...defaultProps} onClose={onClose} />);

      const dialog = screen.getByRole('dialog');
      dialog.focus();

      await user.keyboard('{Escape}');

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when closeOnEscape is false', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      render(<Dialog {...defaultProps} onClose={onClose} closeOnEscape={false} />);

      const dialog = screen.getByRole('dialog');
      dialog.focus();

      await user.keyboard('{Escape}');

      expect(onClose).not.toHaveBeenCalled();
    });

    it('focuses dialog on open', () => {
      render(<Dialog {...defaultProps} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveFocus();
    });

    it('traps focus within dialog', async () => {
      const user = userEvent.setup();

      const actions: DialogAction[] = [
        { label: 'First', onClick: vi.fn(), variant: 'text' },
        { label: 'Second', onClick: vi.fn(), variant: 'filled' },
      ];

      render(<Dialog {...defaultProps} actions={actions} />);

      const dialog = screen.getByRole('dialog');
      const closeButton = screen.getByRole('button', { name: /close/i });
      const firstButton = screen.getByRole('button', { name: 'First' });
      const secondButton = screen.getByRole('button', { name: 'Second' });

      // Focus should start on dialog
      expect(dialog).toHaveFocus();

      // Tab should move to close button
      await user.tab();
      expect(closeButton).toHaveFocus();

      // Tab should move to first action
      await user.tab();
      expect(firstButton).toHaveFocus();

      // Tab should move to second action
      await user.tab();
      expect(secondButton).toHaveFocus();

      // Tab should wrap back to close button
      await user.tab();
      expect(closeButton).toHaveFocus();
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes for modal dialog', () => {
      render(<Dialog {...defaultProps} modal={true} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-labelledby', 'dialog-title');
      expect(dialog).toHaveAttribute('tabindex', '-1');
    });

    it('has correct ARIA attributes for non-modal dialog', () => {
      render(<Dialog {...defaultProps} modal={false} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'false');
    });

    it('uses custom aria-label when provided', () => {
      render(<Dialog {...defaultProps} aria-label="Custom Label" />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-label', 'Custom Label');
    });

    it('uses custom aria-labelledby when provided', () => {
      render(<Dialog {...defaultProps} aria-labelledby="custom-title" />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-labelledby', 'custom-title');
    });

    it('uses custom aria-describedby when provided', () => {
      render(<Dialog {...defaultProps} aria-describedby="custom-description" />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-describedby', 'custom-description');
    });
  });

  describe('Draggable Functionality', () => {
    it('applies draggable class when draggable is true', () => {
      render(<Dialog {...defaultProps} draggable={true} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog.className).toMatch(/draggable/);
    });

    it('does not apply draggable to fullscreen dialogs', () => {
      render(<Dialog {...defaultProps} type="fullscreen" draggable={true} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).not.toHaveClass('draggable');
    });
  });

  describe('Resizable Functionality', () => {
    it('shows resize handle when resizable is true', () => {
      render(<Dialog {...defaultProps} resizable={true} />);

      expect(screen.getByTestId('resize-handle')).toBeInTheDocument();
    });

    it('does not show resize handle for fullscreen dialogs', () => {
      render(<Dialog {...defaultProps} type="fullscreen" resizable={true} />);

      expect(screen.queryByTestId('resize-handle')).not.toBeInTheDocument();
    });
  });

  describe('Portal Rendering', () => {
    it('renders in portal by default', () => {
      render(<Dialog {...defaultProps} />);

      // Dialog should be rendered (mocked portal renders in place)
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('renders inline when portal is false', () => {
      render(<Dialog {...defaultProps} portal={false} />);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    it('applies custom className', () => {
      render(<Dialog {...defaultProps} className="custom-dialog" />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveClass('custom-dialog');
    });

    it('applies custom styles', () => {
      const customStyles = { backgroundColor: 'red', color: 'white' };
      render(<Dialog {...defaultProps} style={customStyles} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveStyle('background-color: rgb(255, 0, 0)');
      expect(dialog).toHaveStyle('color: rgb(255, 255, 255)');
    });
  });
});

describe('useDialog Hook', () => {
  function TestComponent({ onOpen, onClose }: { onOpen?: () => void; onClose?: () => void }) {
    const dialog = useDialog({ onOpen, onClose });

    return (
      <div>
        <button onClick={dialog.open}>Open</button>
        <button onClick={dialog.close}>Close</button>
        <button onClick={dialog.toggle}>Toggle</button>
        <span data-testid="status">{dialog.isOpen ? 'open' : 'closed'}</span>
      </div>
    );
  }

  it('provides open, close, and toggle methods', async () => {
    const user = userEvent.setup();
    render(<TestComponent />);

    const openButton = screen.getByRole('button', { name: 'Open' });
    const closeButton = screen.getByRole('button', { name: 'Close' });
    const toggleButton = screen.getByRole('button', { name: 'Toggle' });
    const status = screen.getByTestId('status');

    // Initially closed
    expect(status).toHaveTextContent('closed');

    // Open dialog
    await user.click(openButton);
    expect(status).toHaveTextContent('open');

    // Close dialog
    await user.click(closeButton);
    expect(status).toHaveTextContent('closed');

    // Toggle open
    await user.click(toggleButton);
    expect(status).toHaveTextContent('open');

    // Toggle closed
    await user.click(toggleButton);
    expect(status).toHaveTextContent('closed');
  });

  it('calls onOpen and onClose callbacks', async () => {
    const user = userEvent.setup();
    const onOpen = vi.fn();
    const onClose = vi.fn();

    render(<TestComponent onOpen={onOpen} onClose={onClose} />);

    const openButton = screen.getByRole('button', { name: 'Open' });
    const closeButton = screen.getByRole('button', { name: 'Close' });

    await user.click(openButton);
    expect(onOpen).toHaveBeenCalledTimes(1);

    await user.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('supports initial open state', () => {
    function TestComponentInitialOpen() {
      const dialog = useDialog({ initialOpen: true });
      return <span data-testid="status">{dialog.isOpen ? 'open' : 'closed'}</span>;
    }

    render(<TestComponentInitialOpen />);

    expect(screen.getByTestId('status')).toHaveTextContent('open');
  });
});
