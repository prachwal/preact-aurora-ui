import styles from './Stepper.module.scss';
import type { StepConnectorProps } from './types';

export function StepConnector({
  active = false,
  completed = false,
  orientation: _orientation = 'horizontal',
  className,
}: StepConnectorProps) {
  const connectorClasses = [
    styles.stepConnector,
    active && styles.active,
    completed && styles.completed,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={connectorClasses} aria-hidden="true" />;
}
