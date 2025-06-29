import styles from './Stepper.module.scss';
import type { StepIndicatorProps } from './types';

// Simple check icon component
function CheckIcon() {
  return (
    <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
    </svg>
  );
}

// Simple error icon component
function ErrorIcon() {
  return (
    <svg className={styles.errorIcon} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
  );
}

export function StepIndicator({
  stepNumber,
  active = false,
  completed = false,
  error = false,
  disabled = false,
  icon,
  onClick,
  className,
}: StepIndicatorProps) {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  const indicatorClasses = [
    styles.stepIndicator,
    active && styles.active,
    completed && styles.completed,
    error && styles.error,
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const renderContent = () => {
    if (error) {
      return <ErrorIcon />;
    }
    if (completed) {
      return <CheckIcon />;
    }
    if (icon) {
      return <div className={styles.stepIcon}>{icon}</div>;
    }
    return stepNumber;
  };

  return (
    <div
      className={indicatorClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="button"
      aria-label={`Step ${stepNumber}${completed ? ' completed' : ''}${error ? ' error' : ''}${active ? ' active' : ''}`}
    >
      {renderContent()}
    </div>
  );
}
