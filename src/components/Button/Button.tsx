import type { ComponentChildren, JSX } from 'preact';
import { forwardRef } from 'preact/compat';

import styles from './Button.module.scss';

export interface ButtonProps
  extends Omit<JSX.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>, 'type' | 'href'> {
  children?: ComponentChildren;

  // MD3 Button variants
  variant?: 'elevated' | 'filled' | 'filled-tonal' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;

  // Icon support
  icon?: ComponentChildren;
  iconPosition?: 'start' | 'end';

  // Link support
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;

  // Button specific
  type?: 'button' | 'submit' | 'reset';
}

const LoadingSpinner = ({ size }: { size: 'small' | 'medium' | 'large' }) => (
  <span
    className={[styles.spinner, styles[`spinner--${size}`]].filter(Boolean).join(' ')}
    aria-hidden="true"
    data-testid="button-spinner"
  >
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
        clipRule="evenodd"
        opacity="0.2"
      />
      <path d="M10 2a8 8 0 018 8 1 1 0 11-2 0 6 6 0 10-6 6 1 1 0 11-2 0 8 8 0 01-8-8z" />
    </svg>
  </span>
);

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      children,
      className,
      style,
      variant = 'filled',
      size = 'medium',
      disabled = false,
      loading = false,
      fullWidth = false,
      icon,
      iconPosition = 'start',
      href,
      target,
      onClick,
      type = 'button',
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      ...rest
    },
    ref,
  ) => {
    const isLink = Boolean(href);
    const isDisabled = disabled || loading;

    const buttonClasses = [
      styles.button,
      styles[variant],
      styles[size],
      isDisabled ? styles.disabled : '',
      loading ? styles.loading : '',
      fullWidth ? styles.fullWidth : '',
      icon && !children ? styles.iconOnly : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const buttonContent = (
      <>
        {loading && <LoadingSpinner size={size} />}
        {icon && iconPosition === 'start' && !loading && (
          <span className={styles.icon} aria-hidden="true">
            {icon}
          </span>
        )}
        {children && <span className={styles.label}>{children}</span>}
        {icon && iconPosition === 'end' && !loading && (
          <span className={styles.icon} aria-hidden="true">
            {icon}
          </span>
        )}
      </>
    );

    const handleClick = (event: any) => {
      if (isDisabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      if (onClick) {
        onClick(event);
      }
    };

    const commonProps = {
      className: buttonClasses,
      style,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      ...(isDisabled && { 'aria-disabled': true }),
      ...(loading && { 'aria-busy': true }),
      ...rest,
    };

    if (isLink) {
      return (
        <a
          {...commonProps}
          href={isDisabled ? undefined : href}
          target={target}
          onClick={handleClick}
          rel={rest.rel}
          ref={ref as any}
          role="button"
          tabIndex={isDisabled ? -1 : 0}
        >
          {buttonContent}
        </a>
      );
    }

    return (
      <button
        {...commonProps}
        type={type}
        disabled={isDisabled}
        onClick={handleClick}
        ref={ref as any}
      >
        {buttonContent}
      </button>
    );
  },
);

Button.displayName = 'Button';
