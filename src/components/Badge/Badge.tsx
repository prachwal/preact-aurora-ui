import { forwardRef } from 'preact/compat';
import type { Ref } from 'preact';

import type { BadgeProps, BadgeWrapperProps } from './types';
import { BadgeVariant, BadgeColor, BadgePosition, BadgeSize } from './types';
import styles from './Badge.module.scss';

/**
 * Badge component for displaying status indicators, notifications, and counts
 * following Material Design 3 specifications.
 */
const Badge = forwardRef<HTMLSpanElement, BadgeProps>((props, ref: Ref<HTMLSpanElement>) => {
  const {
    variant = BadgeVariant.DOT,
    color = BadgeColor.PRIMARY,
    position = BadgePosition.TOP_RIGHT,
    size = BadgeSize.MEDIUM,
    visible = true,
    animated = true,
    className,
    style,
    testId,
    ariaLabel,
  } = props;

  const badgeClasses = [
    styles.badge,
    styles[`badge--${variant}`],
    styles[`badge--${color}`],
    styles[`badge--${position}`],
    styles[`badge--${size}`],
    !visible ? styles['badge--hidden'] : '',
    animated ? styles['badge--animated'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const getBadgeContent = () => {
    switch (variant) {
      case BadgeVariant.DOT:
        return null; // Dot badge has no content

      case BadgeVariant.NUMERIC: {
        const numericProps = props as Extract<BadgeProps, { variant: 'numeric' }>;
        const { count, max = 99, showZero = false } = numericProps;

        if (count === 0 && !showZero) {
          return null;
        }

        if (count > max) {
          return `${max}+`;
        }

        return count.toString();
      }

      case BadgeVariant.STATUS: {
        const statusProps = props as Extract<BadgeProps, { variant: 'status' }>;
        return statusProps.content;
      }

      default:
        return null;
    }
  };

  const content = getBadgeContent();
  const shouldRender = visible && (variant === BadgeVariant.DOT || content !== null);

  if (!shouldRender) {
    return null;
  }

  // Determine aria-label
  const computedAriaLabel = ariaLabel || getDefaultAriaLabel(variant, props);

  return (
    <span
      ref={ref}
      className={badgeClasses}
      style={style}
      data-testid={testId}
      aria-label={computedAriaLabel}
      role={variant === BadgeVariant.DOT ? 'status' : 'img'}
      aria-hidden={!computedAriaLabel}
    >
      {content}
    </span>
  );
});

/**
 * Helper function to generate default aria-label based on variant and props
 */
function getDefaultAriaLabel(variant: BadgeVariant, props: BadgeProps): string {
  switch (variant) {
    case BadgeVariant.DOT:
      return 'Status indicator';

    case BadgeVariant.NUMERIC: {
      const numericProps = props as Extract<BadgeProps, { variant: 'numeric' }>;
      const { count } = numericProps;
      return count === 1 ? `${count} notification` : `${count} notifications`;
    }

    case BadgeVariant.STATUS: {
      const statusProps = props as Extract<BadgeProps, { variant: 'status' }>;
      return `Status: ${statusProps.content}`;
    }

    default:
      return 'Badge';
  }
}

Badge.displayName = 'Badge';

/**
 * BadgeWrapper component that wraps a target element and positions the badge relative to it
 */
const BadgeWrapper = forwardRef<HTMLDivElement, BadgeWrapperProps>(
  ({ badge, children, className, style, testId }, ref: Ref<HTMLDivElement>) => {
    const wrapperClasses = [styles.badgeWrapper, className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={wrapperClasses} style={style} data-testid={testId}>
        {children}
        <Badge {...badge} />
      </div>
    );
  },
);

BadgeWrapper.displayName = 'BadgeWrapper';

export { Badge, BadgeWrapper };
export type { BadgeProps, BadgeWrapperProps };
