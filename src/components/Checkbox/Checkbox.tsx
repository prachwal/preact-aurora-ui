import { forwardRef } from 'preact/compat';
import { useEffect, useRef, useState } from 'preact/hooks';

import type { CheckboxProps } from './types';
import styles from './Checkbox.module.scss';

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
);

const IndeterminateIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 13H5v-2h14v2z" />
  </svg>
);

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const {
    label,
    checked,
    defaultChecked = false,
    disabled = false,
    indeterminate = false,
    error = false,
    helperText,
    name,
    value,
    required = false,
    size = 'medium',
    color = 'primary',
    className,
    onChange,
    onFocus,
    onBlur,
    ...otherProps
  } = props;

  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const inputRef = useRef<HTMLInputElement>(null);
  const isControlled = checked !== undefined;

  // Sync internal state when controlled value changes
  useEffect(() => {
    if (isControlled && inputRef.current) {
      inputRef.current.checked = checked!;
    } else if (!isControlled && inputRef.current) {
      inputRef.current.checked = internalChecked;
    }
  }, [checked, internalChecked, isControlled]);

  // Forward ref
  useEffect(() => {
    if (ref && typeof ref === 'object' && inputRef.current) {
      ref.current = inputRef.current;
    } else if (typeof ref === 'function' && inputRef.current) {
      ref(inputRef.current);
    }
  }, [ref]);

  // Handle indeterminate state
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleChange = (event: Event & { currentTarget: HTMLInputElement }) => {
    if (disabled) return;

    if (isControlled) {
      // In controlled mode, prevent the default behavior and let the parent handle the state
      event.preventDefault();
      event.currentTarget.checked = checked!; // Reset to controlled value
    } else {
      // In uncontrolled mode, update internal state
      setInternalChecked(event.currentTarget.checked);
    }

    onChange?.(event);
  };

  const handleFocus = (event: FocusEvent & { currentTarget: HTMLInputElement }) => {
    onFocus?.(event);
  };

  const handleBlur = (event: FocusEvent & { currentTarget: HTMLInputElement }) => {
    onBlur?.(event);
  };

  // CSS classes
  const checkboxClassName = [
    styles.checkbox,
    styles[`checkbox--${size}`],
    styles[`checkbox--${color}`],
    disabled ? styles['checkbox--disabled'] : '',
    error ? styles['checkbox--error'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const labelClassName = [
    styles.label,
    disabled ? styles['label--disabled'] : '',
    error ? styles['label--error'] : '',
  ]
    .filter(Boolean)
    .join(' ');

  const checkboxId = name || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={checkboxClassName}>
      <div className={styles.checkboxWrapper}>
        <input
          ref={inputRef}
          id={checkboxId}
          type="checkbox"
          className={styles.input}
          checked={isControlled ? checked : internalChecked}
          disabled={disabled}
          name={name}
          value={value}
          required={required}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-invalid={error}
          aria-describedby={helperText ? `${checkboxId}-helper` : undefined}
          {...otherProps}
        />

        <div className={styles.checkboxIcon}>
          <div className={styles.checkboxBackground}>
            {indeterminate ? (
              <IndeterminateIcon />
            ) : (isControlled ? checked : internalChecked) ? (
              <CheckIcon />
            ) : null}
          </div>
        </div>

        {label && (
          <label htmlFor={checkboxId} className={labelClassName}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
      </div>

      {helperText && (
        <div
          id={`${checkboxId}-helper`}
          className={styles.helperText}
          role={error ? 'alert' : undefined}
        >
          {helperText}
        </div>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';
