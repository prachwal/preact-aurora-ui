import { toChildArray } from 'preact';

import styles from './Stepper.module.scss';
import type { StepperProps } from './types';
import { Step } from './Step';

export function Stepper({
  activeStep,
  orientation = 'horizontal',
  variant = 'standard',
  linear = true,
  onStepChange,
  className,
  children,
}: StepperProps) {
  const stepperClasses = [
    styles.stepper,
    styles[orientation],
    variant === 'mobile' && styles.mobile,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const childArray = toChildArray(children);
  const totalSteps = childArray.length;

  const handleStepClick = (stepIndex: number) => {
    if (onStepChange) {
      onStepChange(stepIndex);
    }
  };

  return (
    <div
      className={stepperClasses}
      role="tablist"
      aria-orientation={orientation}
      data-testid="stepper"
    >
      {childArray.map((child: any, index: number) => {
        if (child && typeof child === 'object' && 'props' in child) {
          const isActive = activeStep === index;
          const isCompletedByPosition = activeStep > index;
          const isCompletedByProp = child.props.completed || false;
          const isCompleted = isCompletedByPosition || isCompletedByProp;
          const isError = child.props.error || false;
          const isDisabled = child.props.disabled || false;

          return (
            <Step
              key={child.props.key || index}
              {...child.props}
              index={index}
              active={isActive}
              completed={isCompleted}
              error={isError}
              disabled={isDisabled}
              orientation={orientation}
              linear={linear}
              onStepClick={handleStepClick}
              showConnector={index < totalSteps - 1}
            />
          );
        }
        return child;
      })}
    </div>
  );
}
