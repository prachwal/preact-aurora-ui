export interface CheckboxProps {
  /** Checkbox label text */
  label?: string;
  /** Checked state */
  checked?: boolean;
  /** Default checked state for uncontrolled component */
  defaultChecked?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Indeterminate state */
  indeterminate?: boolean;
  /** Error state */
  error?: boolean;
  /** Helper text below the checkbox */
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
