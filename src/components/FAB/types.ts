import type { ComponentChildren, JSX } from 'preact';

export type FABSize = 'mini' | 'regular' | 'extended';
export type FABColor = 'surface' | 'primary' | 'secondary' | 'tertiary';
export type FABPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'static';

export interface FABProps
  extends Omit<
    JSX.HTMLAttributes<HTMLButtonElement>,
    'onClick' | 'onFocus' | 'onBlur' | 'onKeyDown'
  > {
  /** Size variant of the FAB */
  size?: FABSize;
  /** Color variant of the FAB */
  color?: FABColor;
  /** Position of the FAB */
  position?: FABPosition;
  /** Icon to display */
  icon?: ComponentChildren;
  /** Text label (only for extended FAB) */
  label?: string;
  /** Whether the FAB is disabled */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Custom styles */
  style?: any;
  /** Test ID for testing */
  testId?: string;
  /** Click handler */
  onClick?: (event: MouseEvent) => void;
  /** Focus handler */
  onFocus?: (event: FocusEvent) => void;
  /** Blur handler */
  onBlur?: (event: FocusEvent) => void;
  /** Keyboard handler */
  onKeyDown?: (event: KeyboardEvent) => void;
  /** ARIA label for accessibility */
  ariaLabel?: string;
  /** Children for custom content */
  children?: ComponentChildren;
}

export interface SpeedDialProps {
  /** Main FAB props */
  fabProps?: Omit<FABProps, 'onClick'>;
  /** Actions in the speed dial */
  actions: SpeedDialAction[];
  /** Whether the speed dial is open */
  open?: boolean;
  /** Default open state for uncontrolled mode */
  defaultOpen?: boolean;
  /** Direction of the speed dial */
  direction?: 'up' | 'down' | 'left' | 'right';
  /** Handler for open/close state change */
  onToggle?: (open: boolean) => void;
  /** Close on action click */
  closeOnActionClick?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

export interface SpeedDialAction {
  /** Unique identifier */
  id: string;
  /** Icon for the action */
  icon: ComponentChildren;
  /** Label for the action */
  label: string;
  /** Whether the action is disabled */
  disabled?: boolean;
  /** Click handler */
  onClick?: (event: MouseEvent) => void;
  /** ARIA label */
  ariaLabel?: string;
}

export interface FABRef {
  /** Focus the FAB */
  focus: () => void;
  /** Blur the FAB */
  blur: () => void;
  /** Get the FAB element */
  getElement: () => HTMLButtonElement | null;
}
