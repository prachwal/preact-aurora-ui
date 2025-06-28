import { useState, useCallback, useRef, useId } from 'preact/hooks';

import type { UseTooltipProps, UseTooltipReturn } from './types';

export function useTooltip({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  trigger = 'hover',
  enterDelay = 500,
  leaveDelay = 200,
  disabled = false,
  touchHoldDelay = 700,
}: UseTooltipProps = {}): UseTooltipReturn {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const enterTimeoutRef = useRef<NodeJS.Timeout>();
  const leaveTimeoutRef = useRef<NodeJS.Timeout>();
  const touchTimeoutRef = useRef<NodeJS.Timeout>();
  const tooltipId = useId();

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const triggers = Array.isArray(trigger) ? trigger : [trigger];

  const setOpen = useCallback(
    (newOpen: boolean) => {
      if (disabled) return;

      if (!isControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlled, disabled, onOpenChange],
  );

  const clearTimeouts = useCallback(() => {
    if (enterTimeoutRef.current) {
      clearTimeout(enterTimeoutRef.current);
      enterTimeoutRef.current = undefined;
    }
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = undefined;
    }
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
      touchTimeoutRef.current = undefined;
    }
  }, []);

  const handleEnter = useCallback(() => {
    clearTimeouts();
    if (enterDelay > 0) {
      enterTimeoutRef.current = setTimeout(() => setOpen(true), enterDelay);
    } else {
      setOpen(true);
    }
  }, [clearTimeouts, enterDelay, setOpen]);

  const handleLeave = useCallback(() => {
    clearTimeouts();
    if (leaveDelay > 0) {
      leaveTimeoutRef.current = setTimeout(() => setOpen(false), leaveDelay);
    } else {
      setOpen(false);
    }
  }, [clearTimeouts, leaveDelay, setOpen]);

  const handleClick = useCallback(() => {
    clearTimeouts();
    setOpen(!open);
  }, [clearTimeouts, open, setOpen]);

  const handleFocus = useCallback(() => {
    clearTimeouts();
    setOpen(true);
  }, [clearTimeouts, setOpen]);

  const handleBlur = useCallback(() => {
    clearTimeouts();
    setOpen(false);
  }, [clearTimeouts, setOpen]);

  const handleTouchStart = useCallback(() => {
    clearTimeouts();
    touchTimeoutRef.current = setTimeout(() => setOpen(true), touchHoldDelay);
  }, [clearTimeouts, setOpen, touchHoldDelay]);

  const handleTouchEnd = useCallback(() => {
    clearTimeouts();
    if (open) {
      setOpen(false);
    }
  }, [clearTimeouts, open, setOpen]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
      }
    },
    [open, setOpen],
  );

  // Build trigger props based on enabled triggers
  const triggerProps: UseTooltipReturn['triggerProps'] = {
    'aria-describedby': open ? tooltipId : undefined,
  };

  if (triggers.includes('hover')) {
    triggerProps.onMouseEnter = handleEnter;
    triggerProps.onMouseLeave = handleLeave;
  }

  if (triggers.includes('focus')) {
    triggerProps.onFocus = handleFocus;
    triggerProps.onBlur = handleBlur;
  }

  if (triggers.includes('click')) {
    triggerProps.onClick = handleClick;
  }

  // Touch support for hover and focus triggers
  if (triggers.includes('hover') || triggers.includes('focus')) {
    triggerProps.onTouchStart = handleTouchStart;
    triggerProps.onTouchEnd = handleTouchEnd;
  }

  // Keyboard support
  triggerProps.onKeyDown = handleKeyDown;

  const contentProps = {
    id: tooltipId,
    role: 'tooltip',
    'aria-hidden': !open,
  };

  return {
    open,
    setOpen,
    triggerProps,
    contentProps,
  };
}
