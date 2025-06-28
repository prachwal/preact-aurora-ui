import type { ComponentChildren, JSX } from 'preact';

export type TooltipPosition =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

export type TooltipTrigger = 'hover' | 'focus' | 'click' | 'manual';

export interface TooltipProps {
  // Content
  content: ComponentChildren;
  children: ComponentChildren;

  // Positioning
  position?: TooltipPosition;
  offset?: number;
  showArrow?: boolean;

  // Triggers
  trigger?: TooltipTrigger | TooltipTrigger[];

  // Timing
  enterDelay?: number;
  leaveDelay?: number;

  // Variants
  variant?: 'standard' | 'rich';
  maxWidth?: number | string;

  // States
  open?: boolean;
  disabled?: boolean;

  // Styling
  className?: string;
  style?: JSX.CSSProperties;

  // Events
  onOpenChange?: (open: boolean) => void;

  // Accessibility
  'aria-label'?: string;
  id?: string;

  // Advanced
  portal?: boolean;
  portalTarget?: HTMLElement | string;
  boundary?: HTMLElement | string;
  followCursor?: boolean;

  // Touch support
  touchHoldDelay?: number;
}

export interface TooltipContentProps {
  content: ComponentChildren;
  position: TooltipPosition;
  showArrow: boolean;
  maxWidth?: number | string;
  variant: 'standard' | 'rich';
  className?: string;
  style?: JSX.CSSProperties;
  id?: string;
  'aria-label'?: string;
}

export interface UseTooltipProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: TooltipTrigger | TooltipTrigger[];
  enterDelay?: number;
  leaveDelay?: number;
  disabled?: boolean;
  touchHoldDelay?: number;
}

export interface UseTooltipReturn {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerProps: JSX.HTMLAttributes<HTMLElement>;
  contentProps: {
    id: string;
    role: string;
    'aria-hidden': boolean;
  };
}

export interface TooltipContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  disabled: boolean;
}
