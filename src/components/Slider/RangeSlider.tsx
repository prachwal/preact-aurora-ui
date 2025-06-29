import { useCallback, useEffect, useRef, useState } from 'preact/hooks';

import styles from './Slider.module.scss';
import type { RangeSliderProps } from './types';

function clsx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function RangeSlider({
  value,
  defaultValue = [0, 100],
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
}: RangeSliderProps) {
  const isControlled = value !== undefined;

  // Clamp and order initial values
  const clampAndOrderInitialValue = useCallback(
    (val: [number, number]) => {
      const [val1, val2] = val;
      const clampedVal1 = Math.max(min, Math.min(max, val1));
      const clampedVal2 = Math.max(min, Math.min(max, val2));

      if (variant === 'discrete' && step > 0) {
        const snappedVal1 = Math.round((clampedVal1 - min) / step) * step + min;
        const snappedVal2 = Math.round((clampedVal2 - min) / step) * step + min;
        return [Math.min(snappedVal1, snappedVal2), Math.max(snappedVal1, snappedVal2)] as [
          number,
          number,
        ];
      }

      return [Math.min(clampedVal1, clampedVal2), Math.max(clampedVal1, clampedVal2)] as [
        number,
        number,
      ];
    },
    [min, max, step, variant],
  );

  const [internalValue, setInternalValue] = useState<[number, number]>(() =>
    clampAndOrderInitialValue(defaultValue),
  );
  const [isDragging, setIsDragging] = useState<number | null>(null);
  const [focusedThumb, setFocusedThumb] = useState<number | null>(null);
  const [showValueLabels, setShowValueLabels] = useState<[boolean, boolean]>([false, false]);

  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLDivElement | null)[]>([null, null]);

  const currentValue = isControlled
    ? value !== undefined
      ? clampAndOrderInitialValue(value)
      : clampAndOrderInitialValue(defaultValue)
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

  // Update value ensuring min <= max order
  const updateValue = useCallback(
    (newValue: [number, number]) => {
      const [clampedMin, clampedMax] = [clampValue(newValue[0]), clampValue(newValue[1])];
      const orderedValue: [number, number] = [
        Math.min(clampedMin, clampedMax),
        Math.max(clampedMin, clampedMax),
      ];

      if (orderedValue[0] !== currentValue[0] || orderedValue[1] !== currentValue[1]) {
        if (!isControlled) {
          setInternalValue(orderedValue);
        }
        onChange?.(orderedValue);
      }
    },
    [clampValue, currentValue, isControlled, onChange],
  );

  // Find closest thumb to the clicked position
  const getClosestThumb = useCallback(
    (pixelValue: number) => {
      const [minPos, maxPos] = currentValue.map(valueToPercent);
      const clickPercent = orientation === 'horizontal' ? pixelValue : 100 - pixelValue;

      const distToMin = Math.abs(clickPercent - minPos);
      const distToMax = Math.abs(clickPercent - maxPos);

      return distToMin <= distToMax ? 0 : 1;
    },
    [currentValue, valueToPercent, orientation],
  );

  // Handle mouse/touch start
  const handleStart = useCallback(
    (event: Event, thumbIndex?: number) => {
      if (disabled) return;

      event.preventDefault();
      const rect = sliderRef.current?.getBoundingClientRect();
      if (!rect) return;

      const mouseEvent = event as MouseEvent;
      const touchEvent = event as TouchEvent;
      const clientX = touchEvent.touches ? touchEvent.touches[0].clientX : mouseEvent.clientX;
      const clientY = touchEvent.touches ? touchEvent.touches[0].clientY : mouseEvent.clientY;
      const newValue = pixelToValue(orientation === 'horizontal' ? clientX : clientY, rect);

      let activeThumb: number;
      if (thumbIndex !== undefined) {
        activeThumb = thumbIndex;
      } else {
        activeThumb = getClosestThumb(valueToPercent(newValue));
      }

      setIsDragging(activeThumb);
      setShowValueLabels([activeThumb === 0, activeThumb === 1]);

      onChangeStart?.(currentValue);

      const newRangeValue: [number, number] = [...currentValue];
      newRangeValue[activeThumb] = newValue;
      updateValue(newRangeValue);
    },
    [
      disabled,
      pixelToValue,
      orientation,
      getClosestThumb,
      valueToPercent,
      currentValue,
      onChangeStart,
      updateValue,
    ],
  );

  // Handle mouse/touch move
  const handleMove = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (isDragging === null || disabled) return;

      event.preventDefault();
      const rect = sliderRef.current?.getBoundingClientRect();
      if (!rect) return;

      const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
      const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
      const newValue = pixelToValue(orientation === 'horizontal' ? clientX : clientY, rect);

      const newRangeValue: [number, number] = [...currentValue];
      newRangeValue[isDragging] = newValue;
      updateValue(newRangeValue);
    },
    [isDragging, disabled, pixelToValue, orientation, currentValue, updateValue],
  );

  // Handle mouse/touch end
  const handleEnd = useCallback(() => {
    if (isDragging === null) return;

    setIsDragging(null);
    setShowValueLabels([false, false]);
    onChangeEnd?.(currentValue);
  }, [isDragging, currentValue, onChangeEnd]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: Event, thumbIndex: number) => {
      if (disabled) return;

      const keyboardEvent = event as KeyboardEvent;
      let newValue = currentValue[thumbIndex];
      const stepSize = step || 1;
      const largeStep = (max - min) / 10;

      switch (keyboardEvent.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
          keyboardEvent.preventDefault();
          newValue = currentValue[thumbIndex] - stepSize;
          break;
        case 'ArrowRight':
        case 'ArrowUp':
          keyboardEvent.preventDefault();
          newValue = currentValue[thumbIndex] + stepSize;
          break;
        case 'PageDown':
          keyboardEvent.preventDefault();
          newValue = currentValue[thumbIndex] - largeStep;
          break;
        case 'PageUp':
          keyboardEvent.preventDefault();
          newValue = currentValue[thumbIndex] + largeStep;
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

      const newRangeValue: [number, number] = [...currentValue];
      newRangeValue[thumbIndex] = newValue;
      updateValue(newRangeValue);
    },
    [disabled, currentValue, step, max, min, updateValue],
  );

  // Add global event listeners for dragging
  useEffect(() => {
    if (isDragging === null) return;

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

  const [minPercent, maxPercent] = currentValue.map(valueToPercent);
  const fillStyle =
    orientation === 'horizontal'
      ? { left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }
      : { bottom: `${minPercent}%`, height: `${maxPercent - minPercent}%` };

  const sliderClasses = clsx(
    styles.slider,
    orientation === 'vertical' && styles.vertical,
    variant === 'discrete' && styles.discrete,
    disabled && styles.disabled,
    error && styles.error,
    className,
  );

  const helperId = `range-slider-helper-${Math.random().toString(36).substr(2, 9)}`;
  const labelId = `range-slider-label-${Math.random().toString(36).substr(2, 9)}`;

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

        {currentValue.map((value, index) => {
          const thumbPosition = valueToPercent(value);
          const customThumbStyle = {
            ...(orientation === 'horizontal'
              ? { left: `${thumbPosition}%` }
              : { bottom: `${thumbPosition}%` }),
            ...(thumbSize && {
              width: `${thumbSize}px`,
              height: `${thumbSize}px`,
            }),
          };

          const thumbClasses = clsx(
            styles.thumb,
            thumbShape && styles[thumbShape],
            isDragging === index && styles.active,
            focusedThumb === index && styles.focused,
            disabled && styles.disabled,
          );

          return (
            <div
              key={index}
              ref={(el) => (thumbRefs.current[index] = el)}
              className={thumbClasses}
              style={customThumbStyle}
              role="slider"
              tabIndex={disabled ? -1 : 0}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={value}
              aria-valuetext={`${index === 0 ? 'Minimum' : 'Maximum'}: ${valueFormatter(value)}`}
              aria-orientation={orientation}
              aria-label={
                ariaLabel ? `${ariaLabel} ${index === 0 ? 'minimum' : 'maximum'}` : undefined
              }
              aria-labelledby={!ariaLabel ? (label ? labelId : ariaLabelledBy) : undefined}
              aria-describedby={
                ariaDescribedBy || (helperText || errorMessage ? helperId : undefined)
              }
              aria-disabled={disabled}
              onFocus={() => setFocusedThumb(index)}
              onBlur={() => setFocusedThumb(null)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onMouseDown={(e) => handleStart(e, index)}
              onTouchStart={(e) => handleStart(e, index)}
            >
              {thumbShape === 'custom' && thumbContent ? (
                thumbContent
              ) : (
                <>
                  {(showValue || showValueLabels[index]) && (
                    <div
                      className={clsx(
                        styles.valueLabel,
                        (showValue || showValueLabels[index]) && styles.visible,
                      )}
                    >
                      {valueFormatter(value)}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
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
