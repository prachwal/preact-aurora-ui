export interface SnackbarAction {
  label: string;
  onClick: () => void;
}

export type SnackbarSeverity = 'info' | 'success' | 'warning' | 'error';

export type SnackbarPosition =
  | 'bottom'
  | 'top'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-left'
  | 'top-right';

export interface SnackbarProps {
  /** The message to display */
  message: string;

  /** Whether the snackbar is open/visible */
  open: boolean;

  /** Auto-dismiss duration in milliseconds. Set to 0 to disable auto-dismiss */
  duration?: number;

  /** Optional action button */
  action?: SnackbarAction;

  /** Severity/type of the message */
  severity?: SnackbarSeverity;

  /** Position on screen */
  position?: SnackbarPosition;

  /** Callback when snackbar should close */
  onClose?: () => void;

  /** Whether to show close button */
  showCloseButton?: boolean;

  /** Custom className */
  className?: string;

  /** Whether snackbar is persistent (no auto-dismiss) */
  persistent?: boolean;
}

export interface SnackbarContextValue {
  showSnackbar: (options: Omit<SnackbarProps, 'open'>) => void;
  hideSnackbar: () => void;
  snackbars: Array<SnackbarProps & { id: string }>;
}

export interface SnackbarProviderProps {
  children: preact.ComponentChildren;
  maxSnackbars?: number;
  defaultDuration?: number;
  defaultPosition?: SnackbarPosition;
}
