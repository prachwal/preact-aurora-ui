import { useId, useState } from 'preact/hooks';

import type { SwitchProps } from './types';
import styles from './Switch.module.scss';

export function Switch({
  label,
  checked: controlledChecked,
  defaultChecked = false,
  disabled = false,
  error = false,
  helperText,
  name,
  value,
  required = false,
  size = 'medium',
  color = 'primary',
  className = '',
  onChange,
  onFocus,
  onBlur,
  ...rest
}: SwitchProps) {
  const id = useId();
  const helperId = useId();

  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  // Determine if component is controlled
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

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

  const switchClasses = [
    styles.switch,
    styles[`switch--${size}`],
    styles[`switch--${color}`],
    disabled && styles['switch--disabled'],
    error && styles['switch--error'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inputClasses = [styles.input].join(' ');

  const trackClasses = [
    styles.track,
    checked && styles['track--checked'],
    disabled && styles['track--disabled'],
    error && styles['track--error'],
  ]
    .filter(Boolean)
    .join(' ');

  const thumbClasses = [
    styles.thumb,
    checked && styles['thumb--checked'],
    disabled && styles['thumb--disabled'],
    error && styles['thumb--error'],
  ]
    .filter(Boolean)
    .join(' ');

  const labelClasses = [
    styles.label,
    disabled && styles['label--disabled'],
    error && styles['label--error'],
  ]
    .filter(Boolean)
    .join(' ');

  const helperClasses = [styles.helper, error && styles['helper--error']].filter(Boolean).join(' ');

  const describedBy = helperText ? helperId : undefined;

  return (
    <div className={switchClasses}>
      <div className={styles.wrapper}>
        <input
          {...rest}
          id={id}
          type="checkbox"
          role="switch"
          checked={checked}
          disabled={disabled}
          required={required}
          name={name}
          value={value}
          className={inputClasses}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          aria-invalid={error}
          aria-describedby={describedBy}
        />
        <div className={trackClasses}>
          <div className={thumbClasses} />
        </div>
      </div>
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
          {required && (
            <span className={styles.required} aria-label="required">
              *
            </span>
          )}
        </label>
      )}
      {helperText && (
        <div id={helperId} className={helperClasses}>
          {helperText}
        </div>
      )}
    </div>
  );
}
