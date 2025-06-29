import { useCallback, useEffect, useRef, useState } from 'preact/hooks';

import styles from './Slider.module.scss';
import type { SliderProps } from './types';

function clsx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function Slider({
  value,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  variant = 'continuous',
  orientation = 'horizontal',
  showTicks = false,
  showValue = false,
  label,
  helperText,
  error = false,
  errorMessage,
  onChange,
  onChangeStart,
  onChangeEnd,
  className,
  style,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  valueFormatter = (val) => val.toString(),
  thumbShape = 'circle',
  thumbSize,
  thumbContent,
}: SliderProps) {
  const isControlled = value !== undefined;

  // Clamp initial values
  const clampInitialValue = useCallback(
    (val: number) => {
      const clampedValue = Math.max(min, Math.min(max, val));
      if (variant === 'discrete' && step > 0) {
        return Math.round((clampedValue - min) / step) * step + min;
      }
      return clampedValue;
    },
    [min, max, step, variant],
  );

  const [internalValue, setInternalValue] = useState(() => clampInitialValue(defaultValue));
  const [isDragging, setIsDragging] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showValueLabel, setShowValueLabel] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const currentValue = isControlled
    ? value !== undefined
      ? clampInitialValue(value)
      : clampInitialValue(defaultValue)
    : internalValue;

  // Clamp value to min/max range and snap to step
  const clampValue = useCallback(
    (val: number) => {
      const clampedValue = Math.max(min, Math.min(max, val));
      if (variant === 'discrete' && step > 0) {
        return Math.round((clampedValue - min) / step) * step + min;
      }
      return clampedValue;
    },
    [min, max, step, variant],
  );

  // Convert value to percentage for positioning
  const valueToPercent = useCallback(
    (val: number) => {
      return ((val - min) / (max - min)) * 100;
    },
    [min, max],
  );

  // Convert pixel position to value
  const pixelToValue = useCallback(
    (pixel: number, rect: DOMRect) => {
      let percent: number;
      if (orientation === 'horizontal') {
        percent = (pixel - rect.left) / rect.width;
      } else {
        percent = 1 - (pixel - rect.top) / rect.height;
      }
      percent = Math.max(0, Math.min(1, percent));
      return min + percent * (max - min);
    },
    [min, max, orientation],
  );

  // Update value
  const updateValue = useCallback(
    (newValue: number) => {
      const clampedValue = clampValue(newValue);
      if (clampedValue !== currentValue) {
        if (!isControlled) {
          setInternalValue(clampedValue);
        }
        onChange?.(clampedValue);
      }
    },
    [clampValue, currentValue, isControlled, onChange],
  );

  // Handle mouse/touch start
  const handleStart = useCallback(
    (event: Event) => {
      if (disabled) return;

      event.preventDefault();
      setIsDragging(true);
      setShowValueLabel(true);

      const rect = sliderRef.current?.getBoundingClientRect();
      if (!rect) return;

      const mouseEvent = event as MouseEvent;
      const touchEvent = event as TouchEvent;
      const clientX = touchEvent.touches ? touchEvent.touches[0].clientX : mouseEvent.clientX;
      const clientY = touchEvent.touches ? touchEvent.touches[0].clientY : mouseEvent.clientY;
      const newValue = pixelToValue(orientation === 'horizontal' ? clientX : clientY, rect);

      onChangeStart?.(currentValue);
      updateValue(newValue);
    },
    [disabled, pixelToValue, orientation, currentValue, onChangeStart, updateValue],
  );

  // Handle mouse/touch move
  const handleMove = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!isDragging || disabled) return;

      event.preventDefault();
      const rect = sliderRef.current?.getBoundingClientRect();
      if (!rect) return;

      const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
      const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
      const newValue = pixelToValue(orientation === 'horizontal' ? clientX : clientY, rect);

      updateValue(newValue);
    },
    [isDragging, disabled, pixelToValue, orientation, updateValue],
  );

  // Handle mouse/touch end
  const handleEnd = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);
    setShowValueLabel(false);
    onChangeEnd?.(currentValue);
  }, [isDragging, currentValue, onChangeEnd]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: Event) => {
      if (disabled) return;

      const keyboardEvent = event as KeyboardEvent;
      let newValue = currentValue;
      const stepSize = step || 1;
      const largeStep = (max - min) / 10;

      switch (keyboardEvent.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
          keyboardEvent.preventDefault();
          newValue = currentValue - stepSize;
          break;
        case 'ArrowRight':
        case 'ArrowUp':
          keyboardEvent.preventDefault();
          newValue = currentValue + stepSize;
          break;
        case 'PageDown':
          keyboardEvent.preventDefault();
          newValue = currentValue - largeStep;
          break;
        case 'PageUp':
          keyboardEvent.preventDefault();
          newValue = currentValue + largeStep;
          break;
        case 'Home':
          keyboardEvent.preventDefault();
          newValue = min;
          break;
        case 'End':
          keyboardEvent.preventDefault();
          newValue = max;
          break;
        default:
          return;
      }

      updateValue(newValue);
    },
    [disabled, currentValue, step, max, min, updateValue],
  );

  // Add global event listeners for dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => handleMove(e);
    const handleMouseUp = () => handleEnd();
    const handleTouchMove = (e: TouchEvent) => handleMove(e);
    const handleTouchEnd = () => handleEnd();

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMove, handleEnd]);

  // Generate tick marks for discrete variant
  const renderTicks = () => {
    if (!showTicks || variant !== 'discrete' || step <= 0) return null;

    const ticks = [];
    for (let val = min; val <= max; val += step) {
      const percent = valueToPercent(val);
      const style =
        orientation === 'horizontal' ? { left: `${percent}%` } : { bottom: `${percent}%` };

      ticks.push(
        <div key={val} className={clsx(styles.tick, disabled && styles.disabled)} style={style} />,
      );
    }

    return <div className={styles.ticks}>{ticks}</div>;
  };

  const thumbPosition = valueToPercent(currentValue);
  const fillStyle =
    orientation === 'horizontal'
      ? { width: `${thumbPosition}%` }
      : { height: `${thumbPosition}%`, bottom: 0 };

  // Custom thumb style with size override
  const customThumbStyle = {
    ...(orientation === 'horizontal'
      ? { left: `${thumbPosition}%` }
      : { bottom: `${thumbPosition}%` }),
    ...(thumbSize && {
      width: `${thumbSize}px`,
      height: `${thumbSize}px`,
    }),
  };

  const sliderClasses = clsx(
    styles.slider,
    orientation === 'vertical' && styles.vertical,
    variant === 'discrete' && styles.discrete,
    disabled && styles.disabled,
    error && styles.error,
    className,
  );

  const thumbClasses = clsx(
    styles.thumb,
    thumbShape && styles[thumbShape],
    isDragging && styles.active,
    isFocused && styles.focused,
    disabled && styles.disabled,
  );

  const helperId = `slider-helper-${Math.random().toString(36).substr(2, 9)}`;
  const labelId = `slider-label-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={sliderClasses} style={style}>
      {label && (
        <label id={labelId} className={clsx(styles.label, error && styles.error)}>
          {label}
        </label>
      )}

      <div className={styles.sliderContainer}>
        <div
          ref={sliderRef}
          className={clsx(styles.track, disabled && styles.disabled)}
          onMouseDown={handleStart}
          onTouchStart={handleStart}
        >
          <div className={clsx(styles.trackFill, disabled && styles.disabled)} style={fillStyle} />
          {renderTicks()}
        </div>

        <div
          ref={thumbRef}
          className={thumbClasses}
          style={customThumbStyle}
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValue}
          aria-valuetext={valueFormatter(currentValue)}
          aria-orientation={orientation}
          aria-label={ariaLabel}
          aria-labelledby={!ariaLabel ? (label ? labelId : ariaLabelledBy) : undefined}
          aria-describedby={ariaDescribedBy || (helperText || errorMessage ? helperId : undefined)}
          aria-disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          onMouseDown={handleStart}
          onTouchStart={handleStart}
        >
          {thumbShape === 'custom' && thumbContent ? (
            thumbContent
          ) : (
            <>
              {(showValue || showValueLabel) && (
                <div
                  className={clsx(
                    styles.valueLabel,
                    (showValue || showValueLabel) && styles.visible,
                  )}
                >
                  {valueFormatter(currentValue)}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {orientation === 'horizontal' && (
        <div className={styles.rangeValues}>
          <span>{valueFormatter(min)}</span>
          <span>{valueFormatter(max)}</span>
        </div>
      )}

      {orientation === 'vertical' && (
        <div className={styles.rangeValues}>
          <span>{valueFormatter(max)}</span>
          <span>{valueFormatter(min)}</span>
        </div>
      )}

      {(helperText || errorMessage) && (
        <div id={helperId} className={clsx(styles.helperText, error && styles.error)}>
          {error ? errorMessage : helperText}
        </div>
      )}
    </div>
  );
}
