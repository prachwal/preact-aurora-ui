import type { ComponentChildren, JSX } from 'preact';

/**
 * Banner variant types according to MD3 specification
 */
export const BannerVariant = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  SUCCESS: 'success',
} as const;

export type BannerVariant = (typeof BannerVariant)[keyof typeof BannerVariant];

/**
 * Banner positioning
 */
export const BannerPosition = {
  TOP: 'top',
  BOTTOM: 'bottom',
} as const;

export type BannerPosition = (typeof BannerPosition)[keyof typeof BannerPosition];

/**
 * Banner action button properties
 */
export interface BannerAction {
  /** Action button text */
  label: string;
  /** Action button click handler */
  onClick: () => void;
  /** Action button variant */
  variant?: 'text' | 'outlined';
}

/**
 * Base Banner component properties
 */
export interface BannerProps {
  /** Banner message content */
  message: ComponentChildren;
  /** Banner variant */
  variant?: BannerVariant;
  /** Banner position */
  position?: BannerPosition;
  /** Whether the banner is visible */
  open?: boolean;
  /** Whether the banner can be dismissed */
  dismissible?: boolean;
  /** Auto-dismiss timer in milliseconds (0 to disable) */
  autoHideDuration?: number;
  /** Primary action button */
  action?: BannerAction;
  /** Secondary action button */
  secondaryAction?: BannerAction;
  /** Custom icon element */
  icon?: ComponentChildren;
  /** Whether to show default variant icon */
  showIcon?: boolean;
  /** Handler called when banner is dismissed */
  onClose?: () => void;
  /** Custom CSS class name */
  className?: string;
  /** Custom inline styles */
  style?: JSX.CSSProperties;
  /** Additional HTML attributes */
  [key: string]: any;
}
