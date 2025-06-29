import { useCallback, useEffect, useRef } from 'preact/hooks';

/**
 * Hook for managing focus trap in dialogs
 */
export function useFocusTrap(isOpen: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<Element | null>(null);

  // Get all focusable elements
  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];

    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ].join(', ');

    return Array.from(containerRef.current.querySelectorAll(focusableSelectors)) as HTMLElement[];
  }, []);

  // Handle tab navigation
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !isOpen) return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        // Shift + Tab: move to previous element
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: move to next element
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    },
    [isOpen, getFocusableElements],
  );

  // Set up focus trap
  useEffect(() => {
    if (!isOpen) return;

    // Store the currently focused element
    previousActiveElement.current = document.activeElement;

    // Add event listener for tab navigation
    document.addEventListener('keydown', handleKeyDown);

    // Focus the first focusable element or container
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      // Find element with autofocus attribute or focus first element
      const autoFocusElement = focusableElements.find((el: HTMLElement) =>
        el.hasAttribute('autofocus'),
      );
      if (autoFocusElement) {
        autoFocusElement.focus();
      } else {
        focusableElements[0].focus();
      }
    } else if (containerRef.current) {
      containerRef.current.focus();
    }

    return () => {
      // Remove event listener
      document.removeEventListener('keydown', handleKeyDown);

      // Restore focus to the previous element
      if (previousActiveElement.current && previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, handleKeyDown, getFocusableElements]);

  return containerRef;
}
