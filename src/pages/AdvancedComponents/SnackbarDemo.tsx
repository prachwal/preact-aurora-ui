import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useSnackbar } from '../../components/Snackbar';

export const SnackbarDemo = () => {
  const { showSnackbar } = useSnackbar();

  const buttonStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  };

  const showInfoSnackbar = () => {
    showSnackbar({
      message: 'This is an info message with some helpful information.',
      severity: 'info',
      position: 'bottom',
      duration: 4000,
    });
  };

  const showSuccessSnackbar = () => {
    showSnackbar({
      message: 'Operation completed successfully!',
      severity: 'success',
      position: 'top',
      duration: 3000,
    });
  };

  const showWarningSnackbar = () => {
    showSnackbar({
      message: 'Please check your input and try again.',
      severity: 'warning',
      position: 'bottom-left',
      duration: 5000,
    });
  };

  const showErrorSnackbar = () => {
    showSnackbar({
      message: 'An error occurred while processing your request.',
      severity: 'error',
      position: 'top-left',
      persistent: true,
      showCloseButton: true,
    });
  };

  const showActionSnackbar = () => {
    showSnackbar({
      message: 'Your changes have been saved as draft.',
      severity: 'info',
      position: 'bottom',
      duration: 6000,
      action: {
        label: 'Publish',
        onClick: () => {
          showSnackbar({
            message: 'Published successfully!',
            severity: 'success',
            position: 'bottom',
          });
        },
      },
    });
  };

  const showMultipleSnackbars = () => {
    showSnackbar({ message: 'First notification', severity: 'info' });
    setTimeout(() => showSnackbar({ message: 'Second notification', severity: 'success' }), 500);
    setTimeout(() => showSnackbar({ message: 'Third notification', severity: 'warning' }), 1000);
  };

  const showPersistentSnackbar = () => {
    showSnackbar({
      message: 'This is a persistent notification that stays until manually closed.',
      severity: 'info',
      persistent: true,
      showCloseButton: true,
      position: 'top',
    });
  };

  return (
    <Card title="Snackbar Component" subtitle="MD3 Notification System with queue management">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Severity Variants */}
        <div>
          <h4 style={{ marginBottom: '1rem' }}>Severity Variants</h4>
          <div style={buttonStyle}>
            <Button variant="outlined" onClick={showInfoSnackbar}>
              Show Info
            </Button>
            <Button variant="outlined" onClick={showSuccessSnackbar}>
              Show Success
            </Button>
            <Button variant="outlined" onClick={showWarningSnackbar}>
              Show Warning
            </Button>
            <Button variant="outlined" onClick={showErrorSnackbar}>
              Show Error
            </Button>
          </div>
        </div>

        {/* Advanced Features */}
        <div>
          <h4 style={{ marginBottom: '1rem' }}>Advanced Features</h4>
          <div style={buttonStyle}>
            <Button variant="filled" onClick={showActionSnackbar}>
              With Action Button
            </Button>
            <Button variant="outlined" onClick={showMultipleSnackbars}>
              Test Queue (3x)
            </Button>
            <Button variant="outlined" onClick={showPersistentSnackbar}>
              Persistent Mode
            </Button>
          </div>
        </div>

        {/* Position Demo */}
        <div>
          <h4 style={{ marginBottom: '1rem' }}>Position Variants</h4>
          <div style={buttonStyle}>
            <Button
              variant="text"
              size="small"
              onClick={() =>
                showSnackbar({ message: 'Top position', position: 'top', severity: 'info' })
              }
            >
              Top
            </Button>
            <Button
              variant="text"
              size="small"
              onClick={() =>
                showSnackbar({
                  message: 'Bottom position',
                  position: 'bottom',
                  severity: 'success',
                })
              }
            >
              Bottom
            </Button>
            <Button
              variant="text"
              size="small"
              onClick={() =>
                showSnackbar({
                  message: 'Bottom Left',
                  position: 'bottom-left',
                  severity: 'warning',
                })
              }
            >
              Bottom Left
            </Button>
            <Button
              variant="text"
              size="small"
              onClick={() =>
                showSnackbar({ message: 'Top Left', position: 'top-left', severity: 'error' })
              }
            >
              Top Left
            </Button>
          </div>
        </div>

        {/* Instructions */}
        <div
          style={{
            padding: '1rem',
            backgroundColor: 'var(--color-surface-variant)',
            borderRadius: '8px',
            fontSize: '0.875rem',
            color: 'var(--color-on-surface-variant)',
          }}
        >
          <strong>💡 Testing Tips:</strong>
          <ul style={{ margin: '0.5rem 0 0 1rem', paddingLeft: '1rem' }}>
            <li>Try different snackbar combinations to test the queue system</li>
            <li>Use keyboard (Escape key) to close snackbars</li>
            <li>Persistent snackbars require manual closing</li>
            <li>Resize window to test responsive behavior</li>
            <li>Check accessibility with screen readers</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};
