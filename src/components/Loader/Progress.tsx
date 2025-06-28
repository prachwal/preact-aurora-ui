import type { JSX } from 'preact/jsx-runtime';

import styles from './Progress.module.scss';

export interface ProgressProps {
  // Basic props
  className?: string;
  style?: JSX.CSSProperties;
  'aria-label'?: string;

  // MD3 Progress variants
  variant?: 'circular' | 'linear';

  // Progress modes
  determinate?: boolean;
  value?: number; // 0-100 for determinate
  buffer?: number; // 0-100 for linear buffering (advanced)

  // Size system
  size?: 'small' | 'medium' | 'large' | number;

  // Color system
  color?: 'primary' | 'secondary' | 'tertiary';

  // Additional props
  thickness?: number; // For circular - stroke width
  trackColor?: string; // Custom track color

  // Animation
  animationDuration?: number; // ms for custom timing
}

/**
 * Progress – MD3 Progress Indicators component
 */
export function Progress({
  className = '',
  style,
  'aria-label': ariaLabel,
  variant = 'circular',
  determinate = false,
  value = 0,
  buffer,
  size = 'medium',
  color = 'primary',
  thickness,
  trackColor,
  animationDuration,
}: ProgressProps) {
  const normalizedValue = Math.min(Math.max(value, 0), 100);
  const normalizedBuffer = buffer ? Math.min(Math.max(buffer, 0), 100) : undefined;

  const classes = [
    styles.progress,
    styles[`progress--variant-${variant}`],
    typeof size === 'string' ? styles[`progress--size-${size}`] : '',
    styles[`progress--color-${color}`],
    !determinate ? styles.indeterminate : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const getSizeValue = () => {
    if (typeof size === 'number') return size;
    switch (size) {
      case 'small':
        return 16;
      case 'large':
        return 32;
      default:
        return 24;
    }
  };

  const renderCircularProgress = () => {
    const sizeValue = getSizeValue();
    const strokeWidth = thickness || (sizeValue <= 20 ? 2 : sizeValue <= 28 ? 3 : 4);
    const radius = (sizeValue - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = determinate
      ? circumference - (normalizedValue / 100) * circumference
      : 0;

    return (
      <div
        className={classes}
        style={{
          ...style,
          width: sizeValue,
          height: sizeValue,
          animationDuration: animationDuration ? `${animationDuration}ms` : undefined,
        }}
        role="progressbar"
        aria-label={ariaLabel || 'Progress indicator'}
        aria-valuenow={determinate ? normalizedValue : undefined}
        aria-valuemin={determinate ? 0 : undefined}
        aria-valuemax={determinate ? 100 : undefined}
        data-testid="progress-root"
      >
        <svg width={sizeValue} height={sizeValue}>
          <circle
            className={styles.track}
            cx={sizeValue / 2}
            cy={sizeValue / 2}
            r={radius}
            stroke-width={strokeWidth}
            style={{ stroke: trackColor }}
          />
          <circle
            className={styles.indicator}
            cx={sizeValue / 2}
            cy={sizeValue / 2}
            r={radius}
            stroke-width={strokeWidth}
            stroke-dasharray={circumference}
            stroke-dashoffset={strokeDashoffset}
          />
        </svg>
      </div>
    );
  };

  const renderLinearProgress = () => {
    return (
      <div
        className={classes}
        style={{
          ...style,
          animationDuration: animationDuration ? `${animationDuration}ms` : undefined,
        }}
        role="progressbar"
        aria-label={ariaLabel || 'Progress indicator'}
        aria-valuenow={determinate ? normalizedValue : undefined}
        aria-valuemin={determinate ? 0 : undefined}
        aria-valuemax={determinate ? 100 : undefined}
        data-testid="progress-root"
      >
        {normalizedBuffer !== undefined && (
          <div className={styles.buffer} style={{ width: `${normalizedBuffer}%` }} />
        )}
        <div
          className={styles.indicator}
          style={determinate ? { width: `${normalizedValue}%` } : undefined}
        />
      </div>
    );
  };

  if (variant === 'circular') {
    return renderCircularProgress();
  } else {
    return renderLinearProgress();
  }
}
