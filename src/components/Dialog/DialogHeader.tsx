import { useCallback } from 'preact/hooks';

import styles from './Dialog.module.scss';
import type { DialogHeaderProps } from './types';

function clsx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function DialogHeader({
  title,
  icon,
  showCloseButton = false,
  onClose,
  className,
  children,
}: DialogHeaderProps) {
  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleClose();
      }
    },
    [handleClose],
  );

  if (children) {
    return <div className={clsx(styles.header, className)}>{children}</div>;
  }

  return (
    <div className={clsx(styles.header, className)} data-drag-handle>
      {icon && <div className={styles.icon}>{icon}</div>}

      <div className={styles.titleContainer}>
        {title && <h2 className={styles.title}>{title}</h2>}
      </div>

      {showCloseButton && (
        <button
          type="button"
          className={styles.closeButton}
          onClick={handleClose}
          onKeyDown={handleKeyDown}
          aria-label="Close dialog"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      )}
    </div>
  );
}
