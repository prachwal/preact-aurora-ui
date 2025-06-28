import { forwardRef, createPortal } from 'preact/compat';
import { useEffect, useRef, useCallback } from 'preact/hooks';

import type { SnackbarProps } from './types';
import styles from './Snackbar.module.scss';

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

export const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>((props, ref) => {
  const {
    message,
    open,
    duration = 4000,
    action,
    severity = 'info',
    position = 'bottom',
    onClose,
    showCloseButton = false,
    className,
    persistent = false,
    ...otherProps
  } = props;

  const timeoutRef = useRef<number | null>(null);

  // Auto-dismiss functionality
  useEffect(() => {
    if (open && !persistent && duration > 0) {
      timeoutRef.current = window.setTimeout(() => {
        onClose?.();
      }, duration);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [open, duration, persistent, onClose]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        onClose?.();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, onClose]);

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const handleActionClick = useCallback(() => {
    action?.onClick();
    // Optionally close after action
    onClose?.();
  }, [action, onClose]);

  if (!open) return null;

  // CSS classes
  const snackbarClassName = [
    styles.snackbar,
    styles[`snackbar--${severity}`],
    styles[`snackbar--${position}`],
    open ? styles['snackbar--open'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const snackbarContent = (
    <div
      ref={ref}
      className={snackbarClassName}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      {...otherProps}
    >
      <div className={styles.snackbarContent}>
        {/* Message */}
        <div className={styles.message}>{message}</div>

        {/* Actions */}
        <div className={styles.actions}>
          {action && (
            <button type="button" className={styles.actionButton} onClick={handleActionClick}>
              {action.label}
            </button>
          )}

          {showCloseButton && (
            <button
              type="button"
              className={styles.closeButton}
              onClick={handleClose}
              aria-label="Close notification"
            >
              <CloseIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // Render in portal to ensure proper stacking
  const portalRoot = document.getElementById('snackbar-root') || document.body;
  return createPortal(snackbarContent, portalRoot);
});

Snackbar.displayName = 'Snackbar';
