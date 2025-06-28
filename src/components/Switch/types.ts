export interface SwitchProps {
  /** Switch label text */
  label?: string;
  /** Checked state (on/off) */
  checked?: boolean;
  /** Default checked state for uncontrolled component */
  defaultChecked?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Helper text below the switch */
  helperText?: string;
  /** Name attribute for form submission */
  name?: string;
  /** Value attribute for form submission */
  value?: string;
  /** Required field indicator */
  required?: boolean;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Color variant */
  color?: 'primary' | 'secondary' | 'error';
  /** Custom CSS class */
  className?: string;
  /** Additional props */
  [key: string]: unknown;
  /** Change event handler */
  onChange?: (event: Event & { currentTarget: HTMLInputElement }) => void;
  /** Focus event handler */
  onFocus?: (event: FocusEvent & { currentTarget: HTMLInputElement }) => void;
  /** Blur event handler */
  onBlur?: (event: FocusEvent & { currentTarget: HTMLInputElement }) => void;
}
