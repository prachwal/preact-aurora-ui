import type { JSX } from 'preact';
import { forwardRef } from 'preact/compat';
import { useState } from 'preact/hooks';

import type { IconButtonProps, ToggleIconButtonProps } from './types';
import styles from './IconButton.module.scss';

// Default icons for various purposes
const HeartIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const StarIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
  >
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

const BookmarkIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16l5.5-3.5L16 21z" />
  </svg>
);

const EditIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const DeleteIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3,6 5,6 21,6" />
    <path d="M19,6V20a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6M8,6V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const ShareIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const MoreIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps | ToggleIconButtonProps>(
  (
    {
      children,
      className,
      style,
      variant = 'standard',
      size = 'medium',
      disabled = false,
      toggle = false,
      selected = false,
      onToggle,
      icon,
      selectedIcon,
      unselectedIcon,
      onClick,
      type = 'button',
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      title,
      ...rest
    },
    ref,
  ) => {
    const [internalSelected, setInternalSelected] = useState(selected);
    const isSelected = toggle ? internalSelected : false;

    const buttonClasses = [
      styles.iconButton,
      styles[variant],
      styles[size],
      disabled ? styles.disabled : '',
      toggle ? styles.toggle : '',
      isSelected ? styles.selected : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleClick = (event: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
      if (disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      if (toggle && onToggle) {
        const newSelected = !isSelected;
        setInternalSelected(newSelected);
        onToggle(newSelected);
      }

      if (onClick) {
        onClick(event);
      }
    };

    // For toggle buttons, show different icons based on state
    let displayIcon = icon || children;
    if (toggle) {
      if (isSelected && selectedIcon) {
        displayIcon = selectedIcon;
      } else if (!isSelected && unselectedIcon) {
        displayIcon = unselectedIcon;
      }
    }

    return (
      <button
        {...rest}
        ref={ref}
        type={type}
        className={buttonClasses}
        style={style}
        disabled={disabled}
        onClick={handleClick}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-pressed={toggle ? isSelected : undefined}
        title={title}
      >
        <span className={styles.icon} aria-hidden="true">
          {displayIcon}
        </span>
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';

// Export some common icons for convenience
export { HeartIcon, StarIcon, BookmarkIcon, EditIcon, DeleteIcon, ShareIcon, MoreIcon, CloseIcon };
