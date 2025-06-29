import type { ComponentChildren } from 'preact';

export type SliderVariant = 'continuous' | 'discrete';
export type SliderOrientation = 'horizontal' | 'vertical';
export type SliderThumbShape = 'circle' | 'square' | 'diamond' | 'custom';

export interface SliderProps {
  /** Current value of the slider */
  value?: number;
  /** Default value for uncontrolled mode */
  defaultValue?: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step value for discrete slider */
  step?: number;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Slider variant */
  variant?: SliderVariant;
  /** Slider orientation */
  orientation?: SliderOrientation;
  /** Show tick marks */
  showTicks?: boolean;
  /** Show value label */
  showValue?: boolean;
  /** Custom label for the slider */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Callback when value changes */
  onChange?: (value: number) => void;
  /** Callback when dragging starts */
  onChangeStart?: (value: number) => void;
  /** Callback when dragging ends */
  onChangeEnd?: (value: number) => void;
  /** Custom class name */
  className?: string;
  /** Custom styles */
  style?: Record<string, string | number>;
  /** ARIA label */
  'aria-label'?: string;
  /** ARIA labelledby */
  'aria-labelledby'?: string;
  /** ARIA describedby */
  'aria-describedby'?: string;
  /** Custom content for value display */
  valueFormatter?: (value: number) => string;
  /** Custom thumb shape */
  thumbShape?: SliderThumbShape;
  /** Custom thumb size in pixels */
  thumbSize?: number;
  /** Custom thumb content (for custom shape) */
  thumbContent?: ComponentChildren;
}

export interface RangeSliderProps {
  /** Current value range of the slider */
  value?: [number, number];
  /** Default value range for uncontrolled mode */
  defaultValue?: [number, number];
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step value for discrete slider */
  step?: number;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Slider variant */
  variant?: SliderVariant;
  /** Slider orientation */
  orientation?: SliderOrientation;
  /** Show tick marks */
  showTicks?: boolean;
  /** Show value labels */
  showValue?: boolean;
  /** Custom label for the slider */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Callback when value changes */
  onChange?: (value: [number, number]) => void;
  /** Callback when dragging starts */
  onChangeStart?: (value: [number, number]) => void;
  /** Callback when dragging ends */
  onChangeEnd?: (value: [number, number]) => void;
  /** Custom class name */
  className?: string;
  /** Custom styles */
  style?: Record<string, string | number>;
  /** ARIA label */
  'aria-label'?: string;
  /** ARIA labelledby */
  'aria-labelledby'?: string;
  /** ARIA describedby */
  'aria-describedby'?: string;
  /** Custom content for value display */
  valueFormatter?: (value: number) => string;
  /** Custom thumb shape */
  thumbShape?: SliderThumbShape;
  /** Custom thumb size in pixels */
  thumbSize?: number;
  /** Custom thumb content (for custom shape) */
  thumbContent?: ComponentChildren;
}

export interface SliderThumbProps {
  /** Position as percentage (0-100) */
  position: number;
  /** Whether the thumb is active/dragging */
  active: boolean;
  /** Whether the thumb is focused */
  focused: boolean;
  /** Whether the slider is disabled */
  disabled: boolean;
  /** Thumb index for range sliders */
  index?: number;
  /** Current value */
  value: number;
  /** Show value label */
  showValue?: boolean;
  /** Orientation */
  orientation: SliderOrientation;
  /** Value formatter */
  valueFormatter?: (value: number) => string;
}

export interface SliderTrackProps {
  /** Filled portion start position as percentage (0-100) */
  fillStart: number;
  /** Filled portion end position as percentage (0-100) */
  fillEnd: number;
  /** Whether the slider is disabled */
  disabled: boolean;
  /** Orientation */
  orientation: SliderOrientation;
}

export interface SliderTicksProps {
  /** Minimum value */
  min: number;
  /** Maximum value */
  max: number;
  /** Step value */
  step: number;
  /** Orientation */
  orientation: SliderOrientation;
  /** Whether the slider is disabled */
  disabled: boolean;
}
