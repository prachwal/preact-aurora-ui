import type { TooltipPosition } from './types';

export interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface Position {
  top: number;
  left: number;
}

export interface PositionConfig {
  triggerRect: Rect;
  tooltipRect: Rect;
  position: TooltipPosition;
  offset: number;
  showArrow: boolean;
  viewportPadding?: number;
}

export function calculatePosition({
  triggerRect,
  tooltipRect,
  position,
  offset,
  viewportPadding = 8,
}: PositionConfig): Position {
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  // Debug logging to see what dimensions we're working with
  console.log('Positioning Debug:', {
    triggerRect,
    tooltipRect,
    position,
    viewport,
  });

  // Ensure we have valid dimensions
  if (tooltipRect.width === 0 || tooltipRect.height === 0) {
    console.warn('Tooltip has zero dimensions, positioning may be incorrect');
    return { top: triggerRect.top - 50, left: triggerRect.left };
  }

  let top = 0;
  let left = 0;

  // Calculate base position
  switch (position) {
    case 'top':
      top = triggerRect.top - tooltipRect.height - offset;
      left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
      break;

    case 'top-start':
      top = triggerRect.top - tooltipRect.height - offset;
      left = triggerRect.left;
      break;

    case 'top-end':
      top = triggerRect.top - tooltipRect.height - offset;
      left = triggerRect.left + triggerRect.width - tooltipRect.width;
      break;

    case 'bottom':
      top = triggerRect.top + triggerRect.height + offset;
      left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
      break;

    case 'bottom-start':
      top = triggerRect.top + triggerRect.height + offset;
      left = triggerRect.left;
      break;

    case 'bottom-end':
      top = triggerRect.top + triggerRect.height + offset;
      left = triggerRect.left + triggerRect.width - tooltipRect.width;
      break;

    case 'left':
      top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
      left = triggerRect.left - tooltipRect.width - offset;
      break;

    case 'left-start':
      top = triggerRect.top;
      left = triggerRect.left - tooltipRect.width - offset;
      break;

    case 'left-end':
      top = triggerRect.top + triggerRect.height - tooltipRect.height;
      left = triggerRect.left - tooltipRect.width - offset;
      break;

    case 'right':
      top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
      left = triggerRect.left + triggerRect.width + offset;
      break;

    case 'right-start':
      top = triggerRect.top;
      left = triggerRect.left + triggerRect.width + offset;
      break;

    case 'right-end':
      top = triggerRect.top + triggerRect.height - tooltipRect.height;
      left = triggerRect.left + triggerRect.width + offset;
      break;
  }

  // Store original calculated position for debugging
  const originalPosition = { top, left };

  // Boundary detection and adjustment
  // Ensure tooltip stays within viewport
  if (left < viewportPadding) {
    left = viewportPadding;
  } else if (left + tooltipRect.width > viewport.width - viewportPadding) {
    left = viewport.width - tooltipRect.width - viewportPadding;
  }

  if (top < viewportPadding) {
    top = viewportPadding;
  } else if (top + tooltipRect.height > viewport.height - viewportPadding) {
    top = viewport.height - tooltipRect.height - viewportPadding;
  }

  // Log final positioning for debugging
  console.log('Position calculation:', {
    original: originalPosition,
    adjusted: { top, left },
    wasAdjusted: originalPosition.top !== top || originalPosition.left !== left,
  });

  return { top, left };
}

// Enhanced measurement function
export function measureTooltip(element: HTMLElement): Rect {
  if (!element) {
    return { top: 0, left: 0, width: 0, height: 0 };
  }

  // Force the element to be visible for measurement
  const originalStyle = {
    visibility: element.style.visibility,
    position: element.style.position,
    top: element.style.top,
    left: element.style.left,
    opacity: element.style.opacity,
  };

  // Temporarily make it visible but off-screen for measurement
  element.style.visibility = 'hidden';
  element.style.position = 'fixed';
  element.style.top = '-9999px';
  element.style.left = '-9999px';
  element.style.opacity = '0';

  // Get dimensions
  const rect = element.getBoundingClientRect();

  // Also get computed dimensions to ensure accuracy
  const computedStyle = window.getComputedStyle(element);
  const width = Math.max(rect.width, parseFloat(computedStyle.width) || 0);
  const height = Math.max(rect.height, parseFloat(computedStyle.height) || 0);

  // Restore original styles
  Object.entries(originalStyle).forEach(([key, value]) => {
    if (value !== null) {
      (element.style as any)[key] = value;
    }
  });

  const result = {
    top: rect.top,
    left: rect.left,
    width,
    height,
  };

  console.log('Measured tooltip:', result);
  return result;
}

export function getFlippedPosition(position: TooltipPosition): TooltipPosition {
  const flips: Record<TooltipPosition, TooltipPosition> = {
    top: 'bottom',
    'top-start': 'bottom-start',
    'top-end': 'bottom-end',
    bottom: 'top',
    'bottom-start': 'top-start',
    'bottom-end': 'top-end',
    left: 'right',
    'left-start': 'right-start',
    'left-end': 'right-end',
    right: 'left',
    'right-start': 'left-start',
    'right-end': 'left-end',
  };

  return flips[position];
}

export function getArrowPosition(position: TooltipPosition): {
  position: 'top' | 'bottom' | 'left' | 'right';
  alignment: 'start' | 'center' | 'end';
} {
  if (position.startsWith('top')) {
    return {
      position: 'bottom',
      alignment: position.includes('start') ? 'start' : position.includes('end') ? 'end' : 'center',
    };
  }
  if (position.startsWith('bottom')) {
    return {
      position: 'top',
      alignment: position.includes('start') ? 'start' : position.includes('end') ? 'end' : 'center',
    };
  }
  if (position.startsWith('left')) {
    return {
      position: 'right',
      alignment: position.includes('start') ? 'start' : position.includes('end') ? 'end' : 'center',
    };
  }
  if (position.startsWith('right')) {
    return {
      position: 'left',
      alignment: position.includes('start') ? 'start' : position.includes('end') ? 'end' : 'center',
    };
  }

  return { position: 'bottom', alignment: 'center' };
}
