import type { ComponentChildren } from 'preact';
import type { JSX } from 'preact/jsx-runtime';
import { useEffect, useRef, useCallback } from 'preact/hooks';

import styles from './Drawer.module.scss';

export type DrawerPosition = 'top' | 'bottom' | 'left' | 'right' | 'center';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
  title?: string;
  position?: DrawerPosition;
  width?: string;
  height?: string;
  isModal?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  'aria-label'?: string;
}

/**
 * Drawer – panel wysuwany/modalny
 */
export function Drawer({
  isOpen,
  onClose,
  children,
  className = '',
  style,
  title,
  position = 'right',
  width = '320px',
  height,
  isModal = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  'aria-label': ariaLabel = 'Panel wysuwany',
}: DrawerProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus trap & Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    // Focus trap
    dialogRef.current?.focus();
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEscape, onClose]);

  const handleOverlayClick = useCallback(
    (e: JSX.TargetedMouseEvent<HTMLDivElement>) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) {
        onClose();
      }
    },
    [closeOnOverlayClick, onClose],
  );

  if (!isOpen) return null;

  return (
    <div
      ref={dialogRef}
      className={[styles.drawer, styles[position], isOpen ? styles.open : styles.closed, className]
        .filter(Boolean)
        .join(' ')}
      style={{
        ...style,
        width: ['left', 'right', 'center'].includes(position) ? width : undefined,
        height: ['top', 'bottom', 'center'].includes(position) ? height : undefined,
      }}
      aria-label={ariaLabel}
      role={isModal ? 'dialog' : undefined}
      aria-modal={isModal ? 'true' : undefined}
      tabIndex={-1}
      data-testid="drawer-root"
    >
      {isModal && (
        <div className={styles.overlay} onClick={handleOverlayClick} data-testid="drawer-overlay" />
      )}
      <div className={styles.panel}>
        {title && (
          <div className={styles.header}>
            <span className={styles.title}>{title}</span>
            {showCloseButton && (
              <button className={styles.close} onClick={onClose} aria-label="Zamknij">
                ×
              </button>
            )}
          </div>
        )}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
