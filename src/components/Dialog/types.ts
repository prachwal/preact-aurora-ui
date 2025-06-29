import type { ComponentChildren } from 'preact';

export type DialogType = 'basic' | 'alert' | 'confirmation' | 'fullscreen';
export type DialogSize = 'small' | 'medium' | 'large' | 'fullscreen';

export interface DialogAction {
  /** Label for the action button */
  label: string;
  /** Callback function when action is clicked */
  onClick: () => void;
  /** Button variant */
  variant?: 'text' | 'outlined' | 'filled';
  /** Whether this action is destructive */
  destructive?: boolean;
  /** Whether this action is disabled */
  disabled?: boolean;
  /** Auto focus this action */
  autoFocus?: boolean;
}

export interface DialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Callback when dialog should close */
  onClose?: () => void;
  /** Dialog type */
  type?: DialogType;
  /** Dialog size */
  size?: DialogSize;
  /** Dialog title */
  title?: string;
  /** Dialog subtitle */
  subtitle?: string;
  /** Dialog content */
  children?: ComponentChildren;
  /** Action buttons */
  actions?: DialogAction[];
  /** Whether dialog is dismissible */
  dismissible?: boolean;
  /** Whether clicking overlay closes dialog */
  closeOnOverlayClick?: boolean;
  /** Whether escape key closes dialog */
  closeOnEscape?: boolean;
  /** Whether dialog is draggable */
  draggable?: boolean;
  /** Whether dialog is resizable */
  resizable?: boolean;
  /** Initial position for draggable dialogs */
  initialPosition?: { x: number; y: number };
  /** Whether dialog is modal (default: true) */
  modal?: boolean;
  /** Portal target or boolean to control portal rendering */
  portal?: boolean | string;
  /** Dialog variant */
  variant?: 'elevated' | 'outlined';
  /** Custom class name */
  className?: string;
  /** Custom styles */
  style?: Record<string, string | number>;
  /** ARIA label */
  'aria-label'?: string;
  /** ARIA labelledby */
  'aria-labelledby'?: string;
  /** ARIA describedby */
  'aria-describedby'?: string;
  /** Custom icon for alert/confirmation dialogs */
  icon?: ComponentChildren;
  /** Whether to show close button */
  showCloseButton?: boolean;
}

export interface DialogHeaderProps {
  /** Header title */
  title?: string;
  /** Header subtitle */
  subtitle?: string;
  /** Custom icon */
  icon?: ComponentChildren;
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Close button callback */
  onClose?: () => void;
  /** Custom class name */
  className?: string;
  /** Custom children */
  children?: ComponentChildren;
  /** Title element ID */
  id?: string;
}

export interface DialogContentProps {
  /** Content children */
  children?: ComponentChildren;
  /** Whether content is scrollable */
  scrollable?: boolean;
  /** Custom class name */
  className?: string;
  /** Custom styles */
  style?: Record<string, string | number>;
}

export interface DialogActionsProps {
  /** Action buttons */
  actions?: DialogAction[];
  /** Custom class name */
  className?: string;
  /** Custom children (overrides actions) */
  children?: ComponentChildren;
}

export interface UseDialogOptions {
  /** Initial open state */
  initialOpen?: boolean;
  /** Callback when dialog opens */
  onOpen?: () => void;
  /** Callback when dialog closes */
  onClose?: () => void;
}

export interface UseDialogReturn {
  /** Whether dialog is open */
  isOpen: boolean;
  /** Open the dialog */
  open: () => void;
  /** Close the dialog */
  close: () => void;
  /** Toggle dialog state */
  toggle: () => void;
}
