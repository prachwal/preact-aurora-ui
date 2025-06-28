import type { ComponentChildren } from 'preact';

export interface RadioProps {
  /** Radio label text */
  label?: string;
  /** Value for this radio option */
  value: string;
  /** Currently selected value (controlled) */
  checked?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Name attribute for grouping radios */
  name?: string;
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

export interface RadioGroupProps {
  /** Currently selected value */
  value?: string;
  /** Default selected value for uncontrolled component */
  defaultValue?: string;
  /** Name attribute for all radio buttons in the group */
  name?: string;
  /** Disabled state for entire group */
  disabled?: boolean;
  /** Error state for entire group */
  error?: boolean;
  /** Helper text below the radio group */
  helperText?: string;
  /** Group label */
  label?: string;
  /** Required field indicator */
  required?: boolean;
  /** Layout direction */
  orientation?: 'horizontal' | 'vertical';
  /** Size variant for all radios */
  size?: 'small' | 'medium' | 'large';
  /** Color variant for all radios */
  color?: 'primary' | 'secondary' | 'error';
  /** Custom CSS class */
  className?: string;
  /** Children radio components */
  children?: ComponentChildren;
  /** Change event handler */
  onChange?: (value: string, event: Event & { currentTarget: HTMLInputElement }) => void;
}

export interface UseRadioGroupReturn {
  /** Currently selected value */
  value: string | undefined;
  /** Props for individual radio components */
  getRadioProps: (radioValue: string) => {
    name: string;
    checked: boolean;
    onChange: (event: Event & { currentTarget: HTMLInputElement }) => void;
  };
}
