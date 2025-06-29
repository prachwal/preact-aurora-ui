import { useCallback, useState } from 'preact/hooks';

import type { UseDialogOptions, UseDialogReturn } from './types';

/**
 * Hook for managing dialog state
 */
export function useDialog({
  initialOpen = false,
  onOpen,
  onClose,
}: UseDialogOptions = {}): UseDialogReturn {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const open = useCallback(() => {
    setIsOpen(true);
    onOpen?.();
  }, [onOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}
