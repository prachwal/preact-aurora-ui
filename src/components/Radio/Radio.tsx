import { useId } from 'preact/hooks';

import type { RadioProps } from './types';
import styles from './Radio.module.scss';

export function Radio({
  label,
  value,
  checked = false,
  disabled = false,
  error = false,
  name,
  required = false,
  size = 'medium',
  color = 'primary',
  className = '',
  onChange,
  onFocus,
  onBlur,
  ...rest
}: RadioProps) {
  const id = useId();

  const radioClasses = [
    styles.radio,
    styles[`radio--${size}`],
    styles[`radio--${color}`],
    disabled && styles['radio--disabled'],
    error && styles['radio--error'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inputClasses = [styles.input].join(' ');

  const indicatorClasses = [
    styles.indicator,
    checked && styles['indicator--checked'],
    disabled && styles['indicator--disabled'],
    error && styles['indicator--error'],
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

  return (
    <div className={radioClasses}>
      <div className={styles.wrapper}>
        <input
          {...rest}
          id={id}
          type="radio"
          value={value}
          checked={checked}
          disabled={disabled}
          required={required}
          name={name}
          className={inputClasses}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          aria-invalid={error}
        />
        <div className={indicatorClasses}>
          <div className={styles.dot} />
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
    </div>
  );
}
