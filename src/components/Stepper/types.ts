import type { ComponentChildren } from 'preact';

export type StepperOrientation = 'horizontal' | 'vertical';
export type StepperVariant = 'standard' | 'mobile';

export interface StepperProps {
  /** Current active step index */
  activeStep: number;
  /** Stepper orientation */
  orientation?: StepperOrientation;
  /** Stepper variant */
  variant?: StepperVariant;
  /** Whether stepper is linear (must complete steps in order) */
  linear?: boolean;
  /** Callback when step is changed */
  onStepChange?: (step: number) => void;
  /** Additional CSS class */
  className?: string;
  /** Step components */
  children: ComponentChildren;
}

export interface StepProps {
  /** Step label */
  label: string;
  /** Step description */
  description?: string;
  /** Custom step icon */
  icon?: ComponentChildren;
  /** Whether step is optional */
  optional?: boolean;
  /** Whether step is completed */
  completed?: boolean;
  /** Whether step has error */
  error?: boolean;
  /** Whether step is disabled */
  disabled?: boolean;
  /** Step content */
  children: ComponentChildren;
  /** Additional CSS class */
  className?: string;
}

export interface StepIndicatorProps {
  /** Step number */
  stepNumber: number;
  /** Whether step is active */
  active?: boolean;
  /** Whether step is completed */
  completed?: boolean;
  /** Whether step has error */
  error?: boolean;
  /** Whether step is disabled */
  disabled?: boolean;
  /** Custom icon */
  icon?: ComponentChildren;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS class */
  className?: string;
}

export interface StepLabelProps {
  /** Step label */
  label: string;
  /** Step description */
  description?: string;
  /** Whether step is active */
  active?: boolean;
  /** Whether step is optional */
  optional?: boolean;
  /** Whether step has error */
  error?: boolean;
  /** Whether step is disabled */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
}

export interface StepContentProps {
  /** Content */
  children: ComponentChildren;
  /** Whether content is expanded */
  expanded?: boolean;
  /** Additional CSS class */
  className?: string;
}

export interface StepConnectorProps {
  /** Whether connector is active */
  active?: boolean;
  /** Whether connector is completed */
  completed?: boolean;
  /** Stepper orientation */
  orientation?: StepperOrientation;
  /** Additional CSS class */
  className?: string;
}
