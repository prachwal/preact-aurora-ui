import { useEffect, useRef } from 'preact/hooks';
import type { JSX } from 'preact';

import styles from './Banner.module.scss';
import type { BannerProps } from './types';
import { BannerVariant as BannerVariantEnum } from './types';

// Default icons for each variant
const DefaultIcons = {
  [BannerVariantEnum.INFO]: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  ),
  [BannerVariantEnum.WARNING]: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
    </svg>
  ),
  [BannerVariantEnum.ERROR]: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 5h4v6h-4zm0 8h4v2h-4z" />
    </svg>
  ),
  [BannerVariantEnum.SUCCESS]: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 13l-4-4 1.41-1.41L10 12.17l6.59-6.59L18 7l-8 8z" />
    </svg>
  ),
};

// Close icon
const CloseIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

/**
 * Banner component for system messages and notifications
 */
export const Banner = ({
  message,
  variant = BannerVariantEnum.INFO,
  position,
  open = true,
  dismissible = true,
  autoHideDuration = 0,
  action,
  secondaryAction,
  icon,
  showIcon = true,
  onClose,
  className = '',
  style,
  ...props
}: BannerProps): JSX.Element | null => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Handle auto-hide
  useEffect(() => {
    if (open && autoHideDuration > 0 && dismissible) {
      timeoutRef.current = setTimeout(() => {
        onClose?.();
      }, autoHideDuration);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [open, autoHideDuration, dismissible, onClose]);

  // Handle escape key
  useEffect(() => {
    if (!open || !dismissible) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, dismissible, onClose]);

  // Don't render if not open
  if (!open) return null;

  const bannerClasses = [
    styles.banner,
    styles[`banner--${variant}`],
    position && styles[`banner--${position}`],
    !open && styles['banner--hidden'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const displayIcon = icon || (showIcon ? DefaultIcons[variant] : null);

  return (
    <div
      className={bannerClasses}
      style={style}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      {...props}
    >
      {displayIcon && <div className={styles.banner__icon}>{displayIcon}</div>}

      <div className={styles.banner__content}>
        <div className={styles.banner__message}>{message}</div>
      </div>

      {(action || secondaryAction || dismissible) && (
        <div className={styles.banner__actions}>
          {secondaryAction && (
            <button
              type="button"
              className={`${styles.banner__action} ${secondaryAction.variant === 'text' ? styles['banner__action--text'] : ''
                }`}
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </button>
          )}

          {action && (
            <button
              type="button"
              className={`${styles.banner__action} ${action.variant === 'text' ? styles['banner__action--text'] : ''
                }`}
              onClick={action.onClick}
            >
              {action.label}
            </button>
          )}

          {dismissible && (
            <button
              type="button"
              className={styles.banner__close}
              onClick={onClose}
              aria-label="Close banner"
            >
              {CloseIcon}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
