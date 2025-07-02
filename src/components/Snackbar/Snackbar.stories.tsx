import type { Meta, StoryObj } from '@storybook/preact';

import { Snackbar } from './Snackbar';
import { SnackbarProvider, useSnackbar } from './SnackbarProvider';

const meta: Meta<typeof Snackbar> = {
  title: 'Communication/Snackbar',
  component: Snackbar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

export const Default: Story = {
  render: () => (
    <Snackbar
      message="This is a basic snackbar message"
      open={true}
      duration={4000}
      severity="info"
      position="bottom"
    />
  ),
};

export const WithAction: Story = {
  render: () => (
    <Snackbar
      message="This snackbar has an action button"
      open={true}
      action={{
        label: 'UNDO',
        onClick: () => alert('Action clicked!'),
      }}
      severity="info"
      position="bottom"
    />
  ),
};

export const Success: Story = {
  render: () => (
    <Snackbar
      message="Operation completed successfully!"
      open={true}
      severity="success"
      position="bottom"
      duration={4000}
    />
  ),
};

export const Error: Story = {
  render: () => (
    <Snackbar
      message="Error: Something went wrong"
      open={true}
      severity="error"
      position="bottom"
      persistent={true}
      showCloseButton={true}
    />
  ),
};

// Interactive demo with provider
const ProviderDemo = () => {
  const { showSnackbar } = useSnackbar();

  return (
    <div style={{ padding: '20px', display: 'flex', gap: '10px', flexDirection: 'column' }}>
      <h3>Click buttons to show different snackbars:</h3>
      <button
        onClick={() =>
          showSnackbar({
            message: 'This is an info message',
            severity: 'info',
          })
        }
      >
        Show Info
      </button>
      <button
        onClick={() =>
          showSnackbar({
            message: 'Operation completed successfully!',
            severity: 'success',
          })
        }
      >
        Show Success
      </button>
      <button
        onClick={() =>
          showSnackbar({
            message: 'Error: Failed to save changes',
            severity: 'error',
            persistent: true,
            showCloseButton: true,
          })
        }
      >
        Show Error
      </button>
      <button
        onClick={() =>
          showSnackbar({
            message: 'File uploaded successfully',
            severity: 'success',
            action: {
              label: 'VIEW',
              onClick: () => alert('Viewing file...'),
            },
          })
        }
      >
        Show with Action
      </button>
    </div>
  );
};

export const WithProvider: Story = {
  render: () => (
    <SnackbarProvider>
      <ProviderDemo />
    </SnackbarProvider>
  ),
};
