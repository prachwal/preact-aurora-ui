import { cloneElement, isValidElement } from 'preact';
import { createPortal } from 'preact/compat';
import { useRef, useEffect, useLayoutEffect, useState, useCallback } from 'preact/hooks';

import type { TooltipProps } from './types';
import { useTooltip } from './useTooltip';
import { calculatePosition, getArrowPosition } from './positioning';
import styles from './Tooltip.module.scss';

export function Tooltip({
  children,
  content,
  position = 'top',
  offset = 8,
  showArrow = true,
  trigger = 'hover',
  enterDelay = 500,
  leaveDelay = 200,
  variant = 'standard',
  maxWidth,
  open: controlledOpen,
  disabled = false,
  className = '',
  style,
  onOpenChange,
  'aria-label': ariaLabel,
  id: _id,
  portal = true,
  portalTarget,
  boundary: _boundary,
  followCursor: _followCursor = false,
  touchHoldDelay = 700,
}: TooltipProps) {
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [actualPosition, setActualPosition] = useState(position);
  const [isPositioned, setIsPositioned] = useState(false);
  // Add state to track if tooltip has been measured
  const [hasMeasured, setHasMeasured] = useState(false);

  const { open, triggerProps, contentProps } = useTooltip({
    open: controlledOpen,
    onOpenChange,
    trigger,
    enterDelay,
    leaveDelay,
    disabled,
    touchHoldDelay,
  });

  // Position calculation with better error handling
  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !open) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();

    // Check if trigger is visible
    if (triggerRect.width === 0 && triggerRect.height === 0) {
      console.warn('Trigger element not visible, skipping positioning');
      return; // Element not visible, skip positioning
    }

    if (tooltipRef.current && hasMeasured) {
      // Temporarily move tooltip to a measurable position
      const tooltip = tooltipRef.current;
      const originalTransform = tooltip.style.transform;
      const originalTop = tooltip.style.top;
      const originalLeft = tooltip.style.left;
      const originalVisibility = tooltip.style.visibility;

      // Set tooltip to measurable position temporarily
      tooltip.style.visibility = 'hidden';
      tooltip.style.transform = 'none';
      tooltip.style.top = '0px';
      tooltip.style.left = '0px';

      // Force reflow and get dimensions
      tooltip.offsetHeight;
      const tooltipRect = tooltip.getBoundingClientRect();

      // Restore original positioning immediately
      tooltip.style.visibility = originalVisibility;
      tooltip.style.transform = originalTransform;
      tooltip.style.top = originalTop;
      tooltip.style.left = originalLeft;

      // Double-check we have valid dimensions
      if (tooltipRect.width === 0 || tooltipRect.height === 0) {
        console.warn('Tooltip has zero dimensions even after forced measurement');
        return;
      }

      const calculatedPosition = calculatePosition({
        triggerRect,
        tooltipRect,
        position,
        offset,
        showArrow,
      });

      setTooltipPosition(calculatedPosition);
      setActualPosition(position);
      setIsPositioned(true);
    }
  }, [open, position, offset, showArrow, hasMeasured]);

  // First measurement phase - render tooltip off-screen to get dimensions
  useLayoutEffect(() => {
    if (open && !hasMeasured) {
      // Force a measurement by ensuring tooltip is rendered off-screen
      setTooltipPosition({ top: -9999, left: -9999 });
      setIsPositioned(false);

      // Use double RAF to ensure tooltip is fully rendered and styled
      const measureTimeout = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (tooltipRef.current) {
            // Temporarily override positioning styles for measurement
            const tooltip = tooltipRef.current;
            const originalTransform = tooltip.style.transform;
            const originalTop = tooltip.style.top;
            const originalLeft = tooltip.style.left;

            // Force visible positioning for accurate measurement
            tooltip.style.transform = 'none';
            tooltip.style.top = '0px';
            tooltip.style.left = '0px';

            // Force reflow
            tooltip.offsetHeight;

            // Restore positioning
            tooltip.style.transform = originalTransform;
            tooltip.style.top = originalTop;
            tooltip.style.left = originalLeft;

            setHasMeasured(true);
          }
        });
      });

      return () => cancelAnimationFrame(measureTimeout);
    }
  }, [open, hasMeasured]);

  // Second phase - calculate actual position
  useLayoutEffect(() => {
    if (open && hasMeasured) {
      updatePosition();
    }
  }, [open, hasMeasured, updatePosition]);

  // Reset measurement state when tooltip closes
  useLayoutEffect(() => {
    if (!open) {
      setIsPositioned(false);
      setHasMeasured(false);
      setTooltipPosition({ top: 0, left: 0 });
    }
  }, [open]);

  // Handle window resize and scroll
  useEffect(() => {
    if (open && isPositioned) {
      const handleResize = () => {
        // Reset measurement state on resize to recalculate
        setHasMeasured(false);
      };

      const handleScroll = () => {
        updatePosition();
      };

      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll, true);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll, true);
      };
    }
  }, [open, isPositioned, updatePosition]);

  // Enhanced trigger element with proper refs and props
  const triggerElement = isValidElement(children)
    ? cloneElement(children, {
        ...triggerProps,
        ref: (el: HTMLElement) => {
          triggerRef.current = el;
          // Preserve original ref if exists
          if (typeof children.ref === 'function') {
            children.ref(el);
          } else if (children.ref) {
            children.ref.current = el;
          }
        },
      })
    : children;

  // Arrow positioning
  const arrowProps = showArrow ? getArrowPosition(actualPosition) : null;

  // Tooltip content styles with improved positioning logic
  const tooltipClasses = [
    styles.tooltip,
    styles[`tooltip--${variant}`],
    open ? styles['tooltip--visible'] : '',
    !isPositioned || !hasMeasured ? styles['tooltip--positioning'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const tooltipStyles = {
    ...style,
    // Only apply calculated position if we have measured and positioned
    ...(isPositioned && hasMeasured
      ? {
          top: tooltipPosition.top,
          left: tooltipPosition.left,
        }
      : {
          // Keep off-screen during measurement
          top: -9999,
          left: -9999,
        }),
    ...(maxWidth && {
      maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
    }),
    // Ensure tooltip is invisible during positioning
    opacity: isPositioned && hasMeasured ? undefined : 0,
    visibility: isPositioned && hasMeasured ? undefined : 'hidden',
  };

  // Arrow styles
  const arrowClasses = arrowProps
    ? [
        styles.arrow,
        styles[`arrow--position-${arrowProps.position}`],
        styles[`arrow--alignment-${arrowProps.alignment}`],
      ]
        .filter(Boolean)
        .join(' ')
    : '';

  const tooltipContent = (
    <div
      ref={tooltipRef}
      className={tooltipClasses}
      style={tooltipStyles}
      id={contentProps.id}
      role={contentProps.role as any}
      aria-hidden={contentProps['aria-hidden']}
      aria-label={ariaLabel}
    >
      {content}
      {showArrow && <div className={arrowClasses} />}
    </div>
  );

  // Portal rendering with better error handling
  const portalContainer = portal
    ? portalTarget
      ? typeof portalTarget === 'string'
        ? document.querySelector(portalTarget)
        : portalTarget
      : document.body
    : null;

  // Ensure portal container exists before rendering
  const shouldRenderTooltip = open && !disabled && (!portal || portalContainer);

  return (
    <>
      {triggerElement}
      {shouldRenderTooltip &&
        (portal && portalContainer
          ? createPortal(tooltipContent, portalContainer)
          : tooltipContent)}
    </>
  );
}
