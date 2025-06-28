import { cloneElement, isValidElement, toChildArray } from 'preact';

import type { RadioGroupProps, RadioProps } from './types';
import { useRadioGroup } from './useRadioGroup';
import { Radio } from './Radio';
import styles from './Radio.module.scss';

export function RadioGroup({
  value,
  defaultValue,
  name,
  disabled = false,
  error = false,
  helperText,
  label,
  required = false,
  orientation = 'vertical',
  size = 'medium',
  color = 'primary',
  className = '',
  children,
  onChange,
}: RadioGroupProps) {
  const { getRadioProps } = useRadioGroup({
    value,
    defaultValue,
    name,
    onChange,
  });

  const groupClasses = [
    styles.group,
    styles[`group--${orientation}`],
    disabled && styles['group--disabled'],
    error && styles['group--error'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const labelClasses = [
    styles.groupLabel,
    disabled && styles['groupLabel--disabled'],
    error && styles['groupLabel--error'],
  ]
    .filter(Boolean)
    .join(' ');

  const helperClasses = [styles.helper, error && styles['helper--error']].filter(Boolean).join(' ');

  // Clone children and inject radio group props
  const radioChildren = toChildArray(children).map((child) => {
    if (isValidElement(child) && child.type === Radio) {
      const childProps = child.props as unknown as RadioProps;
      const radioValue = childProps.value;
      const radioProps = getRadioProps(radioValue);

      return cloneElement(child, {
        ...radioProps,
        disabled: disabled || childProps.disabled,
        error: error || childProps.error,
        size: childProps.size || size,
        color: childProps.color || color,
        required: required || childProps.required,
      });
    }
    return child;
  });

  return (
    <div className={groupClasses} role="radiogroup" aria-required={required}>
      {label && (
        <div className={labelClasses}>
          {label}
          {required && (
            <span className={styles.required} aria-label="required">
              *
            </span>
          )}
        </div>
      )}
      <div className={styles.options}>{radioChildren}</div>
      {helperText && <div className={helperClasses}>{helperText}</div>}
    </div>
  );
}
