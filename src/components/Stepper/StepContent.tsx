import styles from './Stepper.module.scss';
import type { StepContentProps } from './types';

export function StepContent({ children, expanded = false, className }: StepContentProps) {
  const contentClasses = [
    styles.stepContent,
    expanded ? styles.expanded : styles.collapsed,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={contentClasses}>{children}</div>;
}
