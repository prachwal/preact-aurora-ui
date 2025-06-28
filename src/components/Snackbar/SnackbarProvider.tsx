import { createContext } from 'preact';
import { useContext, useState, useCallback } from 'preact/hooks';

import type { SnackbarProps, SnackbarContextValue, SnackbarProviderProps } from './types';
import { Snackbar } from './Snackbar';

// Context for snackbar management
const SnackbarContext = createContext<SnackbarContextValue | null>(null);

// Hook to use snackbar functionality
export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

// Provider component for managing snackbars globally
export const SnackbarProvider = ({
  children,
  maxSnackbars = 3,
  defaultDuration = 4000,
  defaultPosition = 'bottom',
}: SnackbarProviderProps) => {
  const [snackbars, setSnackbars] = useState<Array<SnackbarProps & { id: string }>>([]);

  const showSnackbar = useCallback(
    (options: Omit<SnackbarProps, 'open'>) => {
      const id = Math.random().toString(36).substring(2, 9);
      const snackbar: SnackbarProps & { id: string } = {
        ...options,
        id,
        open: true,
        duration: options.duration ?? defaultDuration,
        position: options.position ?? defaultPosition,
        onClose: () => {
          hideSnackbar(id);
          options.onClose?.();
        },
      };

      setSnackbars((prev) => {
        const newSnackbars = [...prev, snackbar];
        // Limit the number of snackbars
        if (newSnackbars.length > maxSnackbars) {
          return newSnackbars.slice(-maxSnackbars);
        }
        return newSnackbars;
      });
    },
    [defaultDuration, defaultPosition, maxSnackbars],
  );

  const hideSnackbar = useCallback((id?: string) => {
    if (id) {
      setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id));
    } else {
      // Hide all snackbars
      setSnackbars([]);
    }
  }, []);

  const contextValue: SnackbarContextValue = {
    showSnackbar,
    hideSnackbar: () => hideSnackbar(),
    snackbars,
  };

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      {/* Render all active snackbars */}
      {snackbars.map((snackbar) => (
        <Snackbar key={snackbar.id} {...snackbar} />
      ))}
    </SnackbarContext.Provider>
  );
};
