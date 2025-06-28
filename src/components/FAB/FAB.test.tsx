import { render, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { FAB } from './FAB';
import { SpeedDial } from './SpeedDial';
import styles from './FAB.module.scss';
import '@testing-library/jest-dom';

describe('FAB Component', () => {
  describe('Basic Functionality', () => {
    it('renders FAB with default props', () => {
      render(<FAB />);
      const fab = screen.getByRole('button');
      expect(fab).toBeInTheDocument();
      expect(fab).toHaveClass(styles.fab, styles['fab--regular'], styles['fab--surface']);
    });

    it('renders with custom icon', () => {
      render(<FAB icon="🚀" />);
      const fab = screen.getByRole('button');
      expect(fab).toContainHTML('🚀');
    });

    it('renders extended FAB with label', () => {
      render(<FAB size="extended" label="Create" icon="+" />);
      const fab = screen.getByRole('button');
      expect(fab).toHaveClass(styles['fab--extended']);
      expect(fab).toHaveTextContent('Create');
      expect(fab).toContainHTML('+');
    });

    it('applies custom className', () => {
      render(<FAB className="custom-fab" />);
      const fab = screen.getByRole('button');
      expect(fab).toHaveClass('custom-fab');
    });

    it('applies test ID', () => {
      render(<FAB testId="my-fab" />);
      const fab = screen.getByTestId('my-fab');
      expect(fab).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('renders mini FAB', () => {
      render(<FAB size="mini" />);
      const fab = screen.getByRole('button');
      expect(fab).toHaveClass(styles['fab--mini']);
    });

    it('renders regular FAB', () => {
      render(<FAB size="regular" />);
      const fab = screen.getByRole('button');
      expect(fab).toHaveClass(styles['fab--regular']);
    });

    it('renders extended FAB', () => {
      render(<FAB size="extended" />);
      const fab = screen.getByRole('button');
      expect(fab).toHaveClass(styles['fab--extended']);
    });
  });

  describe('Color Variants', () => {
    it('renders surface color variant', () => {
      render(<FAB color="surface" />);
      const fab = screen.getByRole('button');
      expect(fab).toHaveClass(styles['fab--surface']);
    });

    it('renders primary color variant', () => {
      render(<FAB color="primary" />);
      const fab = screen.getByRole('button');
      expect(fab).toHaveClass(styles['fab--primary']);
    });

    it('renders secondary color variant', () => {
      render(<FAB color="secondary" />);
      const fab = screen.getByRole('button');
      expect(fab).toHaveClass(styles['fab--secondary']);
    });

    it('renders tertiary color variant', () => {
      render(<FAB color="tertiary" />);
      const fab = screen.getByRole('button');
      expect(fab).toHaveClass(styles['fab--tertiary']);
    });
  });

  describe('Position Variants', () => {
    it('renders static position', () => {
      render(<FAB position="static" />);
      const fab = screen.getByRole('button');
      expect(fab).not.toHaveClass(styles['fab--bottom-right']);
    });

    it('renders bottom-right position', () => {
      render(<FAB position="bottom-right" />);
      const fab = screen.getByRole('button');
      expect(fab).toHaveClass(styles['fab--bottom-right']);
    });

    it('renders bottom-left position', () => {
      render(<FAB position="bottom-left" />);
      const fab = screen.getByRole('button');
      expect(fab).toHaveClass(styles['fab--bottom-left']);
    });

    it('renders top-right position', () => {
      render(<FAB position="top-right" />);
      const fab = screen.getByRole('button');
      expect(fab).toHaveClass(styles['fab--top-right']);
    });

    it('renders top-left position', () => {
      render(<FAB position="top-left" />);
      const fab = screen.getByRole('button');
      expect(fab).toHaveClass(styles['fab--top-left']);
    });
  });

  describe('Events', () => {
    it('calls onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<FAB onClick={handleClick} />);

      const fab = screen.getByRole('button');
      await user.click(fab);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('calls onFocus and onBlur', async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();
      render(<FAB onFocus={handleFocus} onBlur={handleBlur} />);

      const fab = screen.getByRole('button');

      await user.click(fab); // Focus
      expect(handleFocus).toHaveBeenCalled();

      await user.tab(); // Blur
      expect(handleBlur).toHaveBeenCalled();
    });

    it('handles keyboard events', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const handleKeyDown = vi.fn();
      render(<FAB onClick={handleClick} onKeyDown={handleKeyDown} />);

      const fab = screen.getByRole('button');

      // Nadaj focus
      fab.focus();
      expect(fab).toHaveFocus();

      // Symuluj naciśnięcie Enter
      await user.keyboard('{Enter}');
      expect(handleKeyDown).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledTimes(1);

      // Sprawdź czy event dla Enter miał preventDefault
      const enterEvent = handleKeyDown.mock.calls[0][0];
      expect(enterEvent.key).toBe('Enter');

      // Symuluj naciśnięcie spacji
      await user.keyboard(' ');
      expect(handleKeyDown).toHaveBeenCalledTimes(2);
      expect(handleClick).toHaveBeenCalledTimes(2);

      // Sprawdź czy event dla Space miał preventDefault
      const spaceEvent = handleKeyDown.mock.calls[1][0];
      expect(spaceEvent.key).toBe(' ');
    });

    it('ignores non-action keyboard events', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const handleKeyDown = vi.fn();
      render(<FAB onClick={handleClick} onKeyDown={handleKeyDown} />);

      const fab = screen.getByRole('button');
      fab.focus();

      // Symuluj inne klawisze - nie powinny wywołać click
      await user.keyboard('{Escape}');
      await user.keyboard('a');
      await user.keyboard('{ArrowUp}');

      expect(handleKeyDown).toHaveBeenCalledTimes(3); // Wszystkie keydown
      expect(handleClick).not.toHaveBeenCalled(); // Ale żaden click
    });

    it('calls preventDefault for Enter and Space keys', () => {
      const handleKeyDown = vi.fn();
      render(<FAB onKeyDown={handleKeyDown} />);

      const fab = screen.getByRole('button');

      // Symuluj naciśnięcie Enter
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      const preventDefaultSpy = vi.spyOn(enterEvent, 'preventDefault');

      fab.dispatchEvent(enterEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(handleKeyDown).toHaveBeenCalledWith(enterEvent);

      // Symuluj naciśnięcie spacji
      const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
      const spacePreventDefaultSpy = vi.spyOn(spaceEvent, 'preventDefault');

      fab.dispatchEvent(spaceEvent);

      expect(spacePreventDefaultSpy).toHaveBeenCalled();
      expect(handleKeyDown).toHaveBeenCalledWith(spaceEvent);
    });

    it('does not call preventDefault for other keys', () => {
      const handleKeyDown = vi.fn();
      render(<FAB onKeyDown={handleKeyDown} />);

      const fab = screen.getByRole('button');

      // Symuluj inne klawisze
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      const escapePreventDefaultSpy = vi.spyOn(escapeEvent, 'preventDefault');

      fab.dispatchEvent(escapeEvent);

      expect(escapePreventDefaultSpy).not.toHaveBeenCalled();
      expect(handleKeyDown).toHaveBeenCalledWith(escapeEvent);

      const tabEvent = new KeyboardEvent('keydown', { key: 'Tab' });
      const tabPreventDefaultSpy = vi.spyOn(tabEvent, 'preventDefault');

      fab.dispatchEvent(tabEvent);

      expect(tabPreventDefaultSpy).not.toHaveBeenCalled();
      expect(handleKeyDown).toHaveBeenCalledWith(tabEvent);
    });

    it('does not call events when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const handleFocus = vi.fn();
      render(<FAB disabled onClick={handleClick} onFocus={handleFocus} />);

      const fab = screen.getByRole('button');
      await user.click(fab);

      expect(handleClick).not.toHaveBeenCalled();
      expect(handleFocus).not.toHaveBeenCalled();
    });
  });

  describe('Disabled State', () => {
    it('applies disabled class and attribute', () => {
      render(<FAB disabled />);
      const fab = screen.getByRole('button');
      expect(fab).toBeDisabled();
      expect(fab).toHaveClass(styles['fab--disabled']);
    });

    it('is not clickable when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<FAB disabled onClick={handleClick} />);

      const fab = screen.getByRole('button');
      await user.click(fab);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('renders as button element', () => {
      render(<FAB />);
      const fab = screen.getByRole('button');
      expect(fab.tagName).toBe('BUTTON');
      expect(fab).toHaveAttribute('type', 'button');
    });

    it('has proper ARIA label', () => {
      render(<FAB ariaLabel="Add item" />);
      const fab = screen.getByRole('button');
      expect(fab).toHaveAttribute('aria-label', 'Add item');
    });

    it('uses label as ARIA label for extended FAB', () => {
      render(<FAB size="extended" label="Create new" />);
      const fab = screen.getByRole('button');
      expect(fab).toHaveAttribute('aria-label', 'Create new');
    });

    it('has default ARIA label when none provided', () => {
      render(<FAB />);
      const fab = screen.getByRole('button');
      expect(fab).toHaveAttribute('aria-label', 'Floating Action Button');
    });

    it('is keyboard navigable', async () => {
      const user = userEvent.setup();
      render(<FAB />);

      const fab = screen.getByRole('button');
      await user.tab();

      expect(fab).toHaveFocus();
    });
  });

  describe('Ref Access', () => {
    it('exposes focus method', () => {
      const ref = { current: null } as any;
      render(<FAB ref={ref} />);

      expect(ref.current).toBeTruthy();
      expect(typeof ref.current.focus).toBe('function');
      expect(typeof ref.current.blur).toBe('function');
      expect(typeof ref.current.getElement).toBe('function');
    });

    it('can programmatically focus', () => {
      const ref = { current: null } as any;
      render(<FAB ref={ref} />);

      ref.current.focus();
      const fab = screen.getByRole('button');
      expect(fab).toHaveFocus();
    });
  });
});

describe('SpeedDial Component', () => {
  const mockActions = [
    { id: 'action1', icon: '📝', label: 'Edit', onClick: vi.fn() },
    { id: 'action2', icon: '🗑️', label: 'Delete', onClick: vi.fn() },
    { id: 'action3', icon: '📋', label: 'Copy', onClick: vi.fn() },
  ];

  beforeEach(() => {
    mockActions.forEach((action) => action.onClick.mockClear());
  });

  describe('Basic Functionality', () => {
    it('renders closed speed dial', () => {
      render(<SpeedDial actions={mockActions} />);
      const fab = screen.getByRole('button');
      expect(fab).toBeInTheDocument();
      expect(fab).toHaveAttribute('aria-expanded', 'false');
    });

    it('shows actions when opened', async () => {
      const user = userEvent.setup();
      render(<SpeedDial actions={mockActions} />);

      const mainFab = screen.getByRole('button');
      await user.click(mainFab);

      expect(mainFab).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();
      expect(screen.getByText('Copy')).toBeInTheDocument();
    });

    it('toggles open/closed on main FAB click', async () => {
      const user = userEvent.setup();
      render(<SpeedDial actions={mockActions} />);

      const mainFab = screen.getByRole('button');

      // Open
      await user.click(mainFab);
      expect(mainFab).toHaveAttribute('aria-expanded', 'true');

      // Close
      await user.click(mainFab);
      expect(mainFab).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Controlled Mode', () => {
    it('respects controlled open prop', () => {
      render(<SpeedDial actions={mockActions} open={true} />);
      const mainFab = screen.getByRole('button');
      expect(mainFab).toHaveAttribute('aria-expanded', 'true');
    });

    it('calls onToggle in controlled mode', async () => {
      const user = userEvent.setup();
      const handleToggle = vi.fn();
      render(<SpeedDial actions={mockActions} open={false} onToggle={handleToggle} />);

      const mainFab = screen.getByRole('button');
      await user.click(mainFab);

      expect(handleToggle).toHaveBeenCalledWith(true);
    });
  });

  describe('Action Interaction', () => {
    it('calls action onClick when clicked', async () => {
      const user = userEvent.setup();
      render(<SpeedDial actions={mockActions} defaultOpen={true} />);

      const editAction = screen.getByLabelText('Edit');
      await user.click(editAction);

      expect(mockActions[0].onClick).toHaveBeenCalledTimes(1);
    });

    it('closes speed dial after action click by default', async () => {
      const user = userEvent.setup();
      render(<SpeedDial actions={mockActions} defaultOpen={true} />);

      const mainFab = screen.getByRole('button');
      const editAction = screen.getByLabelText('Edit');

      expect(mainFab).toHaveAttribute('aria-expanded', 'true');
      await user.click(editAction);
      expect(mainFab).toHaveAttribute('aria-expanded', 'false');
    });

    it('does not close when closeOnActionClick is false', async () => {
      const user = userEvent.setup();
      render(<SpeedDial actions={mockActions} defaultOpen={true} closeOnActionClick={false} />);

      const mainFab = screen.getByRole('button');
      const editAction = screen.getByLabelText('Edit');

      await user.click(editAction);
      expect(mainFab).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Direction Variants', () => {
    it('applies up direction class', () => {
      render(<SpeedDial actions={mockActions} direction="up" defaultOpen={true} />);
      const actionsContainer = screen.getByRole('menu');
      expect(actionsContainer).toHaveClass(styles['speedDialActions--up']);
    });

    it('applies down direction class', () => {
      render(<SpeedDial actions={mockActions} direction="down" defaultOpen={true} />);
      const actionsContainer = screen.getByRole('menu');
      expect(actionsContainer).toHaveClass(styles['speedDialActions--down']);
    });

    it('applies left direction class', () => {
      render(<SpeedDial actions={mockActions} direction="left" defaultOpen={true} />);
      const actionsContainer = screen.getByRole('menu');
      expect(actionsContainer).toHaveClass(styles['speedDialActions--left']);
    });

    it('applies right direction class', () => {
      render(<SpeedDial actions={mockActions} direction="right" defaultOpen={true} />);
      const actionsContainer = screen.getByRole('menu');
      expect(actionsContainer).toHaveClass(styles['speedDialActions--right']);
    });
  });

  describe('Keyboard Navigation', () => {
    it('closes on Escape key', async () => {
      const user = userEvent.setup();
      render(<SpeedDial actions={mockActions} defaultOpen={true} />);

      const mainFab = screen.getByRole('button');
      expect(mainFab).toHaveAttribute('aria-expanded', 'true');

      await user.keyboard('{Escape}');
      expect(mainFab).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Click Outside', () => {
    it('closes when clicking outside', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <SpeedDial actions={mockActions} defaultOpen={true} />
          <button>Outside button</button>
        </div>,
      );

      const mainFab = screen.getByRole('button', { name: /speed dial/i });
      const outsideButton = screen.getByRole('button', { name: 'Outside button' });

      expect(mainFab).toHaveAttribute('aria-expanded', 'true');

      await user.click(outsideButton);
      expect(mainFab).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Custom Props', () => {
    it('applies custom FAB props', () => {
      render(<SpeedDial actions={mockActions} fabProps={{ color: 'primary', size: 'mini' }} />);

      const mainFab = screen.getByRole('button');
      expect(mainFab).toHaveClass(styles['fab--primary'], styles['fab--mini']);
    });

    it('applies test ID', () => {
      render(<SpeedDial actions={mockActions} testId="my-speed-dial" />);
      const speedDial = screen.getByTestId('my-speed-dial');
      expect(speedDial).toBeInTheDocument();
    });
  });

  describe('Disabled Actions', () => {
    it('renders disabled actions', () => {
      const actionsWithDisabled = [{ id: 'action1', icon: '📝', label: 'Edit', disabled: true }];

      render(<SpeedDial actions={actionsWithDisabled} defaultOpen={true} />);
      const editAction = screen.getByLabelText('Edit');
      expect(editAction).toBeDisabled();
    });
  });
});
