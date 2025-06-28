import type { JSX } from 'preact/jsx-runtime';

import { Progress } from './Progress';

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
  style?: JSX.CSSProperties;
  'aria-label'?: string;
}

/**
 * Loader – uniwersalny spinner ładowania (legacy compatibility wrapper)
 * @deprecated Use Progress component instead for new implementations
 */
export function Loader({
  size = 'md',
  color,
  className = '',
  style,
  'aria-label': ariaLabel = 'Ładowanie...',
}: LoaderProps) {
  // Map old size format to new format
  const mappedSize = size === 'sm' ? 'small' : size === 'lg' ? 'large' : 'medium';

  // If color is a string (old format), use it as style color and use primary color
  const progressStyle = typeof color === 'string' ? { ...style, color } : style;

  return (
    <Progress
      className={className}
      style={progressStyle}
      aria-label={ariaLabel}
      variant="circular"
      size={mappedSize}
      color="primary"
      determinate={false}
    />
  );
}
