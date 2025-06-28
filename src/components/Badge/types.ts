import type { ComponentChildren, JSX } from 'preact';

/**
 * Badge variant types according to MD3 specification
 */
export const BadgeVariant = {
  DOT: 'dot',
  NUMERIC: 'numeric',
  STATUS: 'status',
} as const;

export type BadgeVariant = (typeof BadgeVariant)[keyof typeof BadgeVariant];

/**
 * Badge color variants
 */
export const BadgeColor = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  ERROR: 'error',
  WARNING: 'warning',
  SUCCESS: 'success',
  INFO: 'info',
} as const;

export type BadgeColor = (typeof BadgeColor)[keyof typeof BadgeColor];

/**
 * Badge positioning relative to target element
 */
export const BadgePosition = {
  TOP_RIGHT: 'top-right',
  TOP_LEFT: 'top-left',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_LEFT: 'bottom-left',
} as const;

export type BadgePosition = (typeof BadgePosition)[keyof typeof BadgePosition];

/**
 * Badge size variants
 */
export const BadgeSize = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
} as const;

export type BadgeSize = (typeof BadgeSize)[keyof typeof BadgeSize];

/**
 * Base props shared by all badge variants
 */
export interface BaseBadgeProps {
  /** Badge variant type */
  variant?: BadgeVariant;
  /** Color variant */
  color?: BadgeColor;
  /** Position relative to target element */
  position?: BadgePosition;
  /** Size variant */
  size?: BadgeSize;
  /** Whether the badge is visible */
  visible?: boolean;
  /** Whether the badge has animation */
  animated?: boolean;
  /** Custom CSS class */
  className?: string;
  /** Custom styles */
  style?: JSX.CSSProperties;
  /** Test ID for testing */
  testId?: string;
  /** ARIA label for accessibility */
  ariaLabel?: string;
}

/**
 * Props for dot badge variant
 */
export interface DotBadgeProps extends BaseBadgeProps {
  variant: 'dot';
}

/**
 * Props for numeric badge variant
 */
export interface NumericBadgeProps extends BaseBadgeProps {
  variant: 'numeric';
  /** Numeric value to display */
  count: number;
  /** Maximum count to display before showing "99+" */
  max?: number;
  /** Whether to show zero count */
  showZero?: boolean;
}

/**
 * Props for status badge variant
 */
export interface StatusBadgeProps extends BaseBadgeProps {
  variant: 'status';
  /** Text content for status badge */
  content: string;
}

/**
 * Union type for all badge props
 */
export type BadgeProps = DotBadgeProps | NumericBadgeProps | StatusBadgeProps;

/**
 * Props for BadgeWrapper component that wraps target element
 */
export interface BadgeWrapperProps {
  /** The badge configuration */
  badge: BadgeProps;
  /** Target element to attach badge to */
  children: ComponentChildren;
  /** Custom wrapper className */
  className?: string;
  /** Custom wrapper styles */
  style?: JSX.CSSProperties;
  /** Test ID for wrapper */
  testId?: string;
}
