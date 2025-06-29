import styles from './Stepper.module.scss';
import type { StepLabelProps } from './types';

export function StepLabel({
  label,
  description,
  active: _active = false,
  optional = false,
  error: _error = false,
  disabled: _disabled = false,
  className,
}: StepLabelProps) {
  const labelClasses = [styles.stepLabel, className].filter(Boolean).join(' ');

  return (
    <div className={labelClasses}>
      <h3 className={styles.stepLabelText}>{label}</h3>
      {optional && <span className={styles.stepOptional}>Optional</span>}
      {description && <p className={styles.stepDescription}>{description}</p>}
    </div>
  );
}
