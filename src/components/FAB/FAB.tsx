import { forwardRef } from 'preact/compat';
import { useRef, useImperativeHandle } from 'preact/hooks';

import type { FABProps, FABRef } from './types';
import styles from './FAB.module.scss';

/**
 * Floating Action Button (FAB) component following Material Design 3 guidelines.
 *
 * Features:
 * - Multiple sizes: mini, regular, extended
 * - Color variants: surface, primary, secondary, tertiary
 * - Flexible positioning: static or fixed positions
 * - Icon and label support
 * - Full accessibility support
 * - Ripple effects and Material Design animations
 *
 * @param props - FAB component props
 * @param ref - Forwarded ref for imperative actions
 */
export const FAB = forwardRef<FABRef, FABProps>(
  (
    {
      size = 'regular',
      color = 'surface',
      position = 'static',
      icon,
      label,
      disabled = false,
      className = '',
      style,
      testId,
      onClick,
      onFocus,
      onBlur,
      onKeyDown,
      ariaLabel,
      children,
      ...props
    },
    ref,
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Expose imperative methods via ref
    useImperativeHandle(ref, () => ({
      focus: () => buttonRef.current?.focus(),
      blur: () => buttonRef.current?.blur(),
      getElement: () => buttonRef.current,
    }));

    const fabClasses = [
      styles.fab,
      styles[`fab--${size}`],
      styles[`fab--${color}`],
      position !== 'static' ? styles[`fab--${position}`] : '',
      disabled ? styles['fab--disabled'] : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleClick = (event: MouseEvent) => {
      if (disabled) return;
      onClick?.(event);
    };

    const handleFocus = (event: FocusEvent) => {
      if (disabled) return;
      onFocus?.(event);
    };

    const handleBlur = (event: FocusEvent) => {
      if (disabled) return;
      onBlur?.(event);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (disabled) return;

      // Handle Enter and Space keys
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        // Create a mock MouseEvent and call onClick directly
        const mockClickEvent = {
          ...event,
          type: 'click',
          target: event.target,
          currentTarget: event.currentTarget,
        } as unknown as MouseEvent;
        onClick?.(mockClickEvent);
      }

      onKeyDown?.(event);
    };

    // For extended FAB, ensure we have either label or children
    const hasLabel = size === 'extended' && (label || children);

    // Determine the aria-label
    const computedAriaLabel =
      ariaLabel || (typeof label === 'string' ? label : 'Floating Action Button');

    return (
      <button
        ref={buttonRef}
        type="button"
        className={fabClasses}
        style={style}
        disabled={disabled}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        aria-label={computedAriaLabel}
        data-testid={testId}
        {...props}
      >
        {/* Icon */}
        {icon && (
          <span className={styles.fabIcon} aria-hidden="true">
            {icon}
          </span>
        )}

        {/* Label for extended FAB */}
        {hasLabel && <span className={styles.fabLabel}>{label || children}</span>}

        {/* Custom children when not using icon/label pattern */}
        {!icon && !hasLabel && children}
      </button>
    );
  },
);

FAB.displayName = 'FAB';
