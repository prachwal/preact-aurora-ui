import { forwardRef } from 'preact/compat';
import { useState, useEffect, useCallback, useId } from 'preact/hooks';

import type { TextFieldProps } from './types';
import styles from './TextField.module.scss';

const ClearIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

export const TextField = forwardRef<HTMLInputElement | HTMLTextAreaElement, TextFieldProps>(
  (props, ref) => {
    const {
      // Content
      label,
      helperText,
      placeholder,
      value,
      defaultValue,

      // Variants and appearance
      variant = 'outlined',
      size = 'medium',
      fullWidth = false,
      multiline = false,
      rows,
      minRows,
      maxRows,

      // States
      disabled = false,
      error = false,
      required = false,
      readOnly = false,

      // Icons and actions
      startIcon,
      endIcon,
      clearable = false,

      // Character count and validation
      maxLength,
      showCharacterCount = false,

      // Input types
      type = 'text',

      // Events
      onClear,
      onFocus,
      onBlur,
      onChange,
      onInput,

      // Accessibility
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      'aria-labelledby': ariaLabelledBy,

      // Other props
      className,
      id: providedId,
      ...otherProps
    } = props;

    // State management
    const [focused, setFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue || '');

    // Use controlled or uncontrolled value
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const hasValue = Boolean(currentValue && currentValue.toString().length > 0);

    // Character count
    const characterCount = currentValue ? currentValue.toString().length : 0;
    const isOverLimit = maxLength ? characterCount > maxLength : false;

    // Generate unique IDs
    const id = useId();
    const inputId = providedId || `textfield-${id}`;
    const helperTextId = helperText ? `${inputId}-helper` : undefined;
    const characterCountId = showCharacterCount ? `${inputId}-count` : undefined;

    // Compute aria-describedby
    const describedByIds =
      [ariaDescribedBy, helperTextId, characterCountId].filter(Boolean).join(' ') || undefined;

    // Event handlers
    const handleFocus = (event: any) => {
      setFocused(true);
      if (onFocus) {
        onFocus(event);
      }
    };

    const handleBlur = (event: any) => {
      setFocused(false);
      if (onBlur) {
        onBlur(event);
      }
    };

    const handleChange = useCallback(
      (event: any) => {
        if (!isControlled) {
          setInternalValue(event.target.value);
        }
        onChange?.(event);
      },
      [onChange, isControlled],
    );

    const handleInput = useCallback(
      (event: any) => {
        if (!isControlled) {
          setInternalValue(event.target.value);
        }
        onInput?.(event);
      },
      [onInput, isControlled],
    );

    const handleClear = useCallback(() => {
      if (!isControlled) {
        setInternalValue('');
      }
      onClear?.();
    }, [onClear, isControlled]);

    // Auto-resize for multiline
    useEffect(() => {
      if (multiline && ref && 'current' in ref && ref.current) {
        const textarea = ref.current as HTMLTextAreaElement;
        if (minRows || maxRows) {
          textarea.style.height = 'auto';
          const scrollHeight = textarea.scrollHeight;
          const lineHeight = parseInt(getComputedStyle(textarea).lineHeight, 10);

          let newRows = Math.floor(scrollHeight / lineHeight);
          if (minRows) newRows = Math.max(newRows, minRows);
          if (maxRows) newRows = Math.min(newRows, maxRows);

          textarea.style.height = `${newRows * lineHeight}px`;
        }
      }
    }, [currentValue, multiline, minRows, maxRows, ref]);

    // CSS classes
    const rootClassName = [
      styles.textField,
      styles[`textField--${variant}`],
      styles[`textField--${size}`],
      fullWidth ? styles['textField--fullWidth'] : '',
      focused ? styles['textField--focused'] : '',
      error ? styles['textField--error'] : '',
      disabled ? styles['textField--disabled'] : '',
      hasValue ? styles['textField--hasValue'] : '',
      multiline ? styles['textField--multiline'] : '',
      startIcon ? styles['textField--withStartIcon'] : '',
      endIcon || clearable ? styles['textField--withEndIcon'] : '',
      isOverLimit ? styles['textField--overLimit'] : '',
      label ? styles['textField--withLabel'] : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const inputClassName = [styles.input, multiline ? styles['input--multiline'] : '']
      .filter(Boolean)
      .join(' ');

    // Common input props
    const inputProps = {
      id: inputId,
      value: currentValue,
      placeholder: placeholder,
      disabled,
      readOnly,
      required,
      maxLength,
      'aria-label': ariaLabel,
      'aria-describedby': describedByIds,
      'aria-labelledby': ariaLabelledBy,
      'aria-invalid': error,
      className: inputClassName,
      ref: ref as any,
      ...otherProps,
      // My event handlers should override any from otherProps
      onFocus: handleFocus,
      onBlur: handleBlur,
      onChange: handleChange,
      onInput: handleInput,
    };

    // Render input or textarea
    const InputComponent = multiline ? (
      <textarea {...inputProps} rows={rows} data-min-rows={minRows} data-max-rows={maxRows} />
    ) : (
      <input {...inputProps} type={type} />
    );

    return (
      <div className={rootClassName}>
        {/* Input container with background and border */}
        <div className={styles.inputContainer}>
          {/* Start icon */}
          {startIcon && <div className={styles.startIcon}>{startIcon}</div>}

          {/* Input field wrapper */}
          <div className={styles.inputWrapper}>
            {/* Label */}
            {label && (
              <label
                htmlFor={inputId}
                className={[
                  styles.label,
                  focused || hasValue || placeholder ? styles['label--floating'] : '',
                  required ? styles['label--required'] : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {label}
                {required && <span className={styles.requiredIndicator}>*</span>}
              </label>
            )}

            {/* Input element */}
            {InputComponent}
          </div>

          {/* End icon and clear button */}
          {(endIcon || clearable) && (
            <div className={styles.endIcon}>
              {clearable && hasValue && !disabled && !readOnly && (
                <button
                  type="button"
                  className={styles.clearButton}
                  onClick={handleClear}
                  aria-label="Clear input"
                  tabIndex={-1}
                >
                  <ClearIcon />
                </button>
              )}
              {endIcon && <div className={styles.iconWrapper}>{endIcon}</div>}
            </div>
          )}
        </div>

        {/* Helper text and character count */}
        {(helperText || showCharacterCount) && (
          <div className={styles.supportingText}>
            {helperText && (
              <div
                id={helperTextId}
                className={[styles.helperText, error ? styles['helperText--error'] : '']
                  .filter(Boolean)
                  .join(' ')}
              >
                {helperText}
              </div>
            )}

            {showCharacterCount && (
              <div
                id={characterCountId}
                className={[
                  styles.characterCount,
                  isOverLimit ? styles['characterCount--overLimit'] : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {maxLength ? `${characterCount}/${maxLength}` : characterCount}
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);

TextField.displayName = 'TextField';
