import { useSnackbar as useSnackbarFromProvider } from './SnackbarProvider';

// Re-export the hook for easier imports
export const useSnackbar = useSnackbarFromProvider;

// Standalone hook for when provider is not used
export const useSnackbarStandalone = () => {
  const showSnackbar = (options: any) => {
    console.warn('SnackbarProvider not found. Please wrap your app with SnackbarProvider.');
    console.log('Snackbar options:', options);
  };

  const hideSnackbar = () => {
    console.warn('SnackbarProvider not found. Please wrap your app with SnackbarProvider.');
  };

  return { showSnackbar, hideSnackbar };
};
