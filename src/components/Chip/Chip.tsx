import type { JSX } from 'preact';
import { forwardRef } from 'preact/compat';
import { useState } from 'preact/hooks';

import type {
  ChipProps,
  InputChipProps,
  AssistChipProps,
  FilterChipProps,
  SuggestionChipProps,
} from './types';
import styles from './Chip.module.scss';

// Built-in icons for chips
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20,6 9,17 4,12" />
  </svg>
);

const AddIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const Chip = forwardRef<HTMLDivElement, ChipProps>((props, ref) => {
  const {
    children,
    className,
    style,
    disabled = false,
    icon,
    avatar,
    type,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    ...rest
  } = props;

  // Handle different chip types with proper typing
  const [internalSelected, setInternalSelected] = useState(
    type === 'filter' && (props as FilterChipProps).selected
      ? (props as FilterChipProps).selected
      : false,
  );

  const isSelected = type === 'filter' ? internalSelected : false;
  const showRemoveButton = type === 'input' && (props as InputChipProps).removable !== false;

  const chipClasses = [
    styles.chip,
    styles[type],
    disabled ? styles.disabled : '',
    isSelected ? styles.selected : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = (event: JSX.TargetedMouseEvent<HTMLDivElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    // Handle different click behaviors based on chip type
    if (type === 'filter' && (props as FilterChipProps).onSelect) {
      const newSelected = !isSelected;
      setInternalSelected(newSelected);
      (props as FilterChipProps).onSelect!(newSelected);
    } else if (type === 'assist' && (props as AssistChipProps).onClick) {
      (props as AssistChipProps).onClick!(event);
    } else if (type === 'suggestion' && (props as SuggestionChipProps).onClick) {
      (props as SuggestionChipProps).onClick!(event);
    }
  };

  const handleRemove = (event: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (disabled) return;

    if (type === 'input' && (props as InputChipProps).onRemove) {
      (props as InputChipProps).onRemove!();
    }
  };

  const handleKeyDown = (event: JSX.TargetedKeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick(event as any);
    } else if (event.key === 'Delete' || event.key === 'Backspace') {
      if (type === 'input' && (props as InputChipProps).onRemove) {
        event.preventDefault();
        (props as InputChipProps).onRemove!();
      }
    }
  };

  // Determine the appropriate ARIA role based on chip type
  const getAriaRole = () => {
    switch (type) {
      case 'filter':
        return 'option';
      case 'assist':
      case 'suggestion':
        return 'button';
      case 'input':
        return 'option';
      default:
        return 'button';
    }
  };

  // Determine if chip should be clickable
  const isClickable =
    (type === 'filter' && (props as FilterChipProps).onSelect) ||
    (type === 'assist' && (props as AssistChipProps).onClick) ||
    (type === 'suggestion' && (props as SuggestionChipProps).onClick);

  return (
    <div
      {...(rest as any)}
      ref={ref}
      className={chipClasses}
      style={style}
      role={getAriaRole()}
      tabIndex={disabled ? -1 : 0}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-selected={type === 'filter' ? isSelected : undefined}
      aria-pressed={type === 'filter' ? isSelected : undefined}
      aria-disabled={disabled}
      onClick={isClickable ? handleClick : undefined}
      onKeyDown={handleKeyDown}
    >
      {/* Leading icon or avatar */}
      {avatar && (
        <span className={styles.avatar} aria-hidden="true">
          {avatar}
        </span>
      )}

      {icon && !avatar && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}

      {/* Selected state icon for filter chips */}
      {type === 'filter' && isSelected && (
        <span className={styles.selectedIcon} aria-hidden="true">
          <CheckIcon />
        </span>
      )}

      {/* Chip content */}
      <span className={styles.content}>{children}</span>

      {/* Trailing remove button for input chips */}
      {showRemoveButton && (
        <button
          type="button"
          className={styles.removeButton}
          onClick={handleRemove}
          tabIndex={-1}
          aria-label="Remove"
          disabled={disabled}
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
});

Chip.displayName = 'Chip';

// Export icons for external use
export { CloseIcon, CheckIcon, AddIcon };
