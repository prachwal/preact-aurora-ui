import { useState, useRef, useEffect, useCallback } from 'preact/hooks';

import type { SpeedDialProps } from './types';
import { FAB } from './FAB';
import styles from './FAB.module.scss';

/**
 * Speed Dial component for creating expandable FAB menus.
 * Provides a main FAB that expands to reveal multiple action items.
 *
 * Features:
 * - Controlled and uncontrolled modes
 * - Multiple directions: up, down, left, right
 * - Action tooltips on hover
 * - Staggered animations
 * - Click outside to close
 * - Keyboard navigation support
 *
 * @param props - SpeedDial component props
 */
export function SpeedDial({
  fabProps = {},
  actions = [],
  open: controlledOpen,
  defaultOpen = false,
  direction = 'up',
  onToggle,
  closeOnActionClick = true,
  className = '',
  testId,
}: SpeedDialProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const speedDialRef = useRef<HTMLDivElement>(null);

  // Determine if we're in controlled mode
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(newOpen);
      }
      onToggle?.(newOpen);
    },
    [isControlled, onToggle],
  );

  const handleMainFabClick = useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen, setOpen]);

  const handleActionClick = useCallback(
    (action: SpeedDialProps['actions'][0], event: MouseEvent) => {
      action.onClick?.(event);
      if (closeOnActionClick) {
        setOpen(false);
      }
    },
    [closeOnActionClick, setOpen],
  );

  // Handle clicking outside to close
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (isOpen && speedDialRef.current && !speedDialRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setOpen]);

  // Handle keyboard events
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setOpen(false);
      }
    },
    [isOpen, setOpen],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, handleKeyDown]);

  const speedDialClasses = [styles.speedDial, className].filter(Boolean).join(' ');

  const actionsClasses = [
    styles.speedDialActions,
    styles[`speedDialActions--${direction}`],
    isOpen ? styles['speedDialActions--open'] : '',
  ]
    .filter(Boolean)
    .join(' ');

  // Default main FAB icon for speed dial
  const defaultIcon = isOpen ? '✕' : '+';

  // Extract ref from fabProps to avoid type conflicts
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ref: _ref, ...cleanFabProps } = fabProps;

  return (
    <div ref={speedDialRef} className={speedDialClasses} data-testid={testId}>
      {/* Main FAB */}
      <FAB
        {...cleanFabProps}
        icon={cleanFabProps.icon || defaultIcon}
        onClick={handleMainFabClick}
        ariaLabel={cleanFabProps.ariaLabel || 'Speed Dial'}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      />

      {/* Actions */}
      <div className={actionsClasses} role="menu">
        {actions.map((action, index) => (
          <div
            key={action.id}
            className={[styles.speedDialAction, isOpen ? styles['speedDialAction--visible'] : '']
              .filter(Boolean)
              .join(' ')}
            style={{
              animationDelay: isOpen ? `${index * 50}ms` : '0ms',
            }}
          >
            {/* Action label/tooltip */}
            <span className={styles.speedDialActionLabel}>{action.label}</span>

            {/* Action FAB */}
            <FAB
              size="mini"
              color="secondary"
              icon={action.icon}
              disabled={action.disabled}
              onClick={(event) => handleActionClick(action, event)}
              ariaLabel={action.ariaLabel || action.label}
              role="menuitem"
              tabIndex={isOpen ? 0 : -1}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

SpeedDial.displayName = 'SpeedDial';
