import styles from './Stepper.module.scss';
import type { StepProps } from './types';
import { StepIndicator } from './StepIndicator';
import { StepLabel } from './StepLabel';
import { StepContent } from './StepContent';
import { StepConnector } from './StepConnector';

interface StepComponentProps extends StepProps {
  /** Step index */
  index: number;
  /** Whether step is active */
  active?: boolean;
  /** Stepper orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Whether stepper is linear */
  linear?: boolean;
  /** Callback when step is clicked */
  onStepClick?: (index: number) => void;
  /** Whether to show connector */
  showConnector?: boolean;
}

export function Step({
  label,
  description,
  icon,
  optional = false,
  completed = false,
  error = false,
  disabled = false,
  children,
  className,
  index,
  active = false,
  orientation = 'horizontal',
  linear = true,
  onStepClick,
  showConnector = true,
}: StepComponentProps) {
  const handleStepClick = () => {
    if (!disabled && onStepClick && (!linear || completed || active)) {
      onStepClick(index);
    }
  };

  const stepClasses = [
    styles.step,
    active && styles.active,
    error && styles.error,
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const isClickable = !disabled && (!linear || completed || active);
  const isExpanded = active || (orientation === 'vertical' && !linear);

  return (
    <div
      className={stepClasses}
      role="tab"
      aria-selected={active}
      aria-disabled={disabled}
      tabIndex={isClickable ? 0 : -1}
      onClick={isClickable ? handleStepClick : undefined}
      onKeyDown={(e) => {
        if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleStepClick();
        }
      }}
      data-testid={`step-${index}`}
    >
      <div className={styles.stepHeader}>
        <StepIndicator
          stepNumber={index + 1}
          active={active}
          completed={completed}
          error={error}
          disabled={disabled}
          icon={icon}
          onClick={isClickable ? handleStepClick : undefined}
        />
        {orientation === 'vertical' && (
          <StepLabel
            label={label}
            description={description}
            active={active}
            optional={optional}
            error={error}
            disabled={disabled}
          />
        )}
      </div>

      {orientation === 'horizontal' && (
        <StepLabel
          label={label}
          description={description}
          active={active}
          optional={optional}
          error={error}
          disabled={disabled}
        />
      )}

      {showConnector && (
        <StepConnector active={active} completed={completed} orientation={orientation} />
      )}

      <StepContent expanded={isExpanded}>{children}</StepContent>
    </div>
  );
}
