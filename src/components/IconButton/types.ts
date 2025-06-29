import type { ComponentChildren, JSX } from 'preact';

export interface IconButtonProps
  extends Omit<JSX.HTMLAttributes<HTMLButtonElement>, 'type' | 'onToggle'> {
  children?: ComponentChildren;

  // MD3 IconButton variants
  variant?: 'standard' | 'filled' | 'outlined' | 'tonal';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;

  // Toggle functionality
  toggle?: boolean;
  selected?: boolean;
  onToggle?: (selected: boolean) => void;

  // Icon
  icon?: ComponentChildren;
  selectedIcon?: ComponentChildren;
  unselectedIcon?: ComponentChildren;

  // Accessibility
  'aria-label'?: string;
  'aria-describedby'?: string;
  title?: string;

  // Button specific
  type?: 'button' | 'submit' | 'reset';
}

export interface ToggleIconButtonProps extends Omit<IconButtonProps, 'toggle'> {
  toggle: true;
  selected?: boolean;
  onToggle: (selected: boolean) => void;
  selectedIcon?: ComponentChildren;
  unselectedIcon?: ComponentChildren;
}
