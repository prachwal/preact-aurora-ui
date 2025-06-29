import { useCallback, useEffect, useRef, useState } from 'preact/hooks';

export interface Position {
  x: number;
  y: number;
}

export interface UseDragOptions {
  /** Whether dragging is enabled */
  enabled: boolean;
  /** Initial position */
  initialPosition?: Position;
  /** Callback when position changes */
  onPositionChange?: (position: Position) => void;
}

/**
 * Hook for making dialogs draggable
 */
export function useDrag({
  enabled,
  initialPosition = { x: 0, y: 0 },
  onPositionChange,
}: UseDragOptions) {
  const [position, setPosition] = useState<Position>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const startPosition = useRef<Position>({ x: 0, y: 0 });
  const startMousePosition = useRef<Position>({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (event: MouseEvent) => {
      if (!enabled || !dragRef.current) return;

      // Only start drag if clicking on the header (drag handle)
      const target = event.target as HTMLElement;
      const header = dragRef.current.querySelector('[data-drag-handle]') as HTMLElement;
      if (!header || !header.contains(target)) return;

      event.preventDefault();
      setIsDragging(true);

      startPosition.current = { ...position };
      startMousePosition.current = { x: event.clientX, y: event.clientY };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [enabled, position],
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      const deltaX = event.clientX - startMousePosition.current.x;
      const deltaY = event.clientY - startMousePosition.current.y;

      const newPosition = {
        x: startPosition.current.x + deltaX,
        y: startPosition.current.y + deltaY,
      };

      setPosition(newPosition);
      onPositionChange?.(newPosition);
    },
    [onPositionChange],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  // Add event listener to the drag container
  useEffect(() => {
    const element = dragRef.current;
    if (!element || !enabled) return;

    element.addEventListener('mousedown', handleMouseDown);

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
    };
  }, [enabled, handleMouseDown]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const style = enabled
    ? {
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? 'grabbing' : 'grab',
      }
    : {};

  return {
    dragRef,
    position,
    isDragging,
    style,
  };
}
