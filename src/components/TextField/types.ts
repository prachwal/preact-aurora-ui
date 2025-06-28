import type { ComponentChildren, JSX, Ref } from 'preact';

export interface TextFieldProps
  extends Omit<
    JSX.HTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
    'type' | 'size' | 'onFocus' | 'onBlur' | 'onChange' | 'onInput'
  > {
  // Content
  label?: string;
  helperText?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;

  // Variants and appearance
  variant?: 'filled' | 'outlined' | 'standard';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
  minRows?: number;
  maxRows?: number;

  // States
  disabled?: boolean;
  error?: boolean;
  required?: boolean;
  readOnly?: boolean;

  // Icons and actions
  startIcon?: ComponentChildren;
  endIcon?: ComponentChildren;
  clearable?: boolean;

  // Character count and validation
  maxLength?: number;
  showCharacterCount?: boolean;

  // Input types
  type?: 'text' | 'email' | 'password' | 'url' | 'tel' | 'search' | 'number';

  // Events
  onClear?: () => void;
  onFocus?: (event: JSX.TargetedFocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (event: JSX.TargetedFocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onChange?: (event: JSX.TargetedEvent<HTMLInputElement | HTMLTextAreaElement, Event>) => void;
  onInput?: (event: JSX.TargetedInputEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

  // Accessibility
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-labelledby'?: string;

  // Ref support
  ref?: Ref<HTMLInputElement | HTMLTextAreaElement>;
}

export interface TextFieldState {
  focused: boolean;
  hasValue: boolean;
  characterCount: number;
}
